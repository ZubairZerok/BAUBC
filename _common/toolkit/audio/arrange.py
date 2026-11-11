"""Bar-grid music arranger shared by every reel (ported from EP01's build_audio.py).

    from arrange import *
    BARS = [b('Am', K4, [1, 3], '16', '8', 'on', cut=1500), ...]      # one entry per bar
    music = arrange(BARS, CH, DUR)                                     # (2, n) float array
CH maps chord name -> (bass midi, pad voicing). Per-bar keys:
  kick/clap  beats (0-3)      hat  None|'8'|'8q'(quiet)|'16'     bass None|'long'|'8'|'16'
  arp  None|'on'|'sparse'     pad  level 0-1    cut  pad/arp filter Hz    roll None|'late'|'full'|'head'   kd kick drive
"""
from synth import *
K4, K2, K1 = [0, 1, 2, 3], [0, 2, 2.5], [0]
def b(ch, kick=(), clap=(), hat=None, bass=None, arp=None, pad=.8, cut=1100, roll=None, kd=1.6):
    return dict(ch=ch, kick=kick, clap=clap, hat=hat, bass=bass, arp=arp, pad=pad, cut=cut, roll=roll, kd=kd)

def arrange(BARS, CH, DUR, BAR=2.4, arp_inst='pluck', arp_seq=(0, 1, 2, 1, 3, 2, 1, 2), duck_amt=.62, starts=None):
    """starts: optional list of bar start times (len(BARS)+1) for variable-length bars, e.g. when cuts follow a voice-over"""
    BEAT = BAR / 4; BAR0 = BAR
    drums, bassb, padb, arpb = Mix(DUR), Mix(DUR), Mix(DUR), Mix(DUR)
    duck = np.ones(int((DUR + 4) * SR))
    snare = lambda g: bp(noise(.09), 1200, 6000) * env(.09, .001, .01, 9) * g
    for i, B_ in enumerate(BARS):
        t0 = starts[i] if starts else i * BAR0; BAR = (starts[i + 1] - starts[i]) if starts else BAR0; BEAT = BAR / 4; root, voic = CH[B_['ch']]
        for k in B_['kick']:
            drums.add(kick(drive=B_['kd']), t0 + k * BEAT, .95); o = int((t0 + k * BEAT) * SR); n = int(.3 * SR)
            duck[o:o + n] = np.minimum(duck[o:o + n], 1 - duck_amt * np.exp(-np.arange(n) / (.09 * SR)))
        for k in B_['clap']: drums.add(reverb(clap(), .18), t0 + k * BEAT, .5)
        if B_['hat']:
            step = .25 if B_['hat'] == '16' else .5; q = .28 if B_['hat'] == '8q' else .5
            for j in range(int(4 / step)):
                off = j * step; drums.add(hat(open_=(B_['hat'] != '8q' and off % 1 == .5 and j % 4 == 2)), t0 + off * BEAT, q * (1 if off % 1 == 0 else .55 if off % .5 == 0 else .33), pan=.25 * (-1) ** j)
        if B_['roll']:
            a0 = {'late': 2, 'full': 0, 'head': 0}[B_['roll']]; a1 = .55 if B_['roll'] == 'head' else 4; tc = a0
            while tc < a1 - 1e-6:
                pr = (tc - a0) / (a1 - a0); drums.add(snare(.25 + .55 * pr), t0 + tc * BEAT, .8); tc += .25 if pr < .6 else .125
        if B_['bass'] == 'long': bassb.add(bass(root, BAR * .98, 260, 1.1), t0, .55)
        elif B_['bass']:
            step = .5 if B_['bass'] == '8' else .25
            for j in range(int(4 / step)):
                n = root + (12 if (j % 8 in (3, 6)) else 0); bassb.add(bass(n, step * BEAT * .92, 520 if B_['bass'] == '16' else 420), t0 + j * step * BEAT, .6)
        if B_['pad']:
            padb.add(pad(voic, BAR + .5, B_['cut']), t0 - .1, .5 * B_['pad'], pan=-.2); padb.add(pad([v + 12 for v in voic[:2]], BAR + .5, B_['cut'] * .8), t0 - .1, .2 * B_['pad'], pan=.3)
        if B_['arp']:
            seq = list(arp_seq) * 2
            for j, s in enumerate(seq):
                if B_['arp'] == 'sparse' and j not in (0, 6, 11): continue
                nt = voic[s % len(voic)] + 12
                y = mallet(nt, .5) if arp_inst == 'mallet' else pluck(nt, .45, 4200 if B_['cut'] > 1400 else 2600)
                arpb.add(y, t0 + j * .25 * BEAT, .34 if B_['arp'] == 'on' else .5, pan=.5 * (-1) ** j)
    ar = arpb.bus(); dl = int(.75 * BAR0 / 4 * SR); src = arpb.bus().copy()
    for rep, g in ((1, .42), (2, .22), (3, .1)): ar[rep % 2, rep * dl:] += src[(rep + 1) % 2, :-rep * dl] * g
    return drums.bus() * .9 + (bassb.bus() * .95 + padb.bus()) * duck[:drums.n] + ar * .8

def place_cues(cues, GAIN, DUR, center=('impact', 'boom', 'thud', 'stamp', 'riser', 'rumble', 'heart', 'stop', 'lock', 'sub', 'smoke', 'rocket', 'zoom')):
    import zlib
    fx = Mix(DUR)
    for c in cues:
        name = c['name']; logo = name.startswith('logo_'); name = name.replace('logo_', '')
        y = sfx(name, c.get('p', 0), c.get('d'), c.get('soft', 0))
        pan = 0 if name in center else ((zlib.crc32(f"{name}{c['t']}".encode()) % 100) / 100 - .5) * .9
        fx.add(y, c['t'], GAIN.get(name, .6) * (1.2 if logo else 1), pan)
    return fx.bus()
