#!/usr/bin/env python3
"""EP01 soundtrack — original BGM (100 BPM, A minor, bar-locked to the scene cuts) + SFX
placed from the animation's own cue list (audio/cues.json, dumped by the renderer).
No voice-over by design: captions carry the narration.

    node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
    python3 audio/build_audio.py            ->  audio/build/ep01_mix.wav (+ music/sfx stems)
"""
import json, os, sys, zlib
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from synth import *

BAR, BEAT = 2.4, 0.6
DUR = 97.2
CH = {  # name: (bass midi, pad voicing)
    'Am': (33, [57, 60, 64, 71]), 'F': (29, [53, 57, 60, 64]), 'C': (36, [55, 60, 64, 67]), 'G': (31, [55, 59, 62, 66 + 1]),
    'Dm': (38, [57, 62, 65]), 'E': (28, [56, 59, 64]), 'Bb': (34, [58, 62, 65]), 'Ao': (33, [57, 60, 63, 66]), 'Am9': (33, [57, 59, 60, 64]), 'C9': (36, [55, 60, 62, 64, 67]),
}
K4, K2, K1 = [0, 1, 2, 3], [0, 2, 2.5], [0]
def b(ch, kick=(), clap=(), hat=None, bass=None, arp=None, pad=.8, cut=1100, roll=None, kd=1.6):
    return dict(ch=ch, kick=kick, clap=clap, hat=hat, bass=bass, arp=arp, pad=pad, cut=cut, roll=roll, kd=kd)
BARS = [
    # 01 hook — sparse, clock-like
    b('Am', K1, hat='8q', pad=.7, cut=700), b('Am', K1, hat='8q', pad=.7, cut=800), b('F', [0, 2], hat='8q', bass='long', pad=.8, cut=900),
    # 02 the moment — groove in, then it stalls with the hesitation
    b('Am', K2, [1, 3], '8', '8', 'on'), b('F', K2, [1, 3], '8', '8', 'on'), b('C', K1, hat=None, bass='long', arp='sparse', cut=800), b('G', K1, hat='8q', bass='long', arp='sparse', cut=800),
    # 03 mystery — drone
    b('Am9', bass='long', arp='sparse', cut=650), b('Am9', bass='long', arp='sparse', cut=700), b('F', K1, hat='8q', bass='long', arp='sparse', cut=800), b('E', K1, hat='8', bass='8', arp='sparse', cut=900, roll='late'),
    # 04 the number — full drop
    b('Am', K4, [1, 3], '16', '8', 'on', cut=1500), b('F', K4, [1, 3], '16', '8', 'on', cut=1500), b('C', K4, [1, 3], '16', '8', 'on', cut=1500), b('G', K4, [1, 3], '16', '8', 'on', cut=1500), b('E', K1, hat='8', bass='long', cut=900, roll='full'),
    # 05 real reason — tension → (stop) → hit
    b('Am', [0, 2], hat='8', bass='8', cut=800), b('Am', [0, 2], hat='8', bass='8', arp='sparse', cut=900), b('Bb', [0, 2], hat='16', bass='8', arp='sparse', cut=1000),
    b('Ao', K4, [1, 3], '16', '16', cut=1400, kd=2.6), b('Bb', K4, [1, 3], '16', '16', cut=1400, kd=2.6), b('E', K1, hat='8q', bass='long', cut=800),
    # 06 reviews — lift
    b('F', K2, [1, 3], '8', '8', 'on', cut=1700), b('G', K2, [1, 3], '8', '8', 'on', cut=1700), b('Am', K2, [1, 3], '8', '8', 'on', cut=1700), b('C', K2, [1, 3], '8', '8', 'on', cut=1700),
    # 07 three factors — build to the flip
    b('Am', K2, hat='8', bass='8', arp='sparse', cut=1000), b('F', K4, [1, 3], '8', '8', 'sparse', cut=1200), b('Dm', K4, [1, 3], '16', '8', 'on', cut=1400), b('E', [0], hat=None, bass=None, pad=.5, cut=600, roll='head'),
    # 08 lesson — sober, then the win
    b('Am', K1, hat='8q', bass='long', cut=800), b('F', K1, hat='8q', bass='long', arp='sparse', cut=900), b('C', K4, [1, 3], '16', '8', 'on', cut=1900), b('G', K4, [1, 3], '16', '8', 'on', cut=1900),
    # 09 your turn — confident groove
    b('F', K4, [1, 3], '16', '8', 'on', cut=1800), b('G', K4, [1, 3], '16', '8', 'on', cut=1800), b('Am', K4, [1, 3], '16', '8', 'on', cut=1800), b('G', K2, [1, 3], '8', '8', 'on', cut=1500, roll='late'),
    # 10 logo sting — no drums; chord swell handled below
    b('Am9', pad=0), b('C9', pad=0), b('C9', pad=0),
]
drums, bassb, padb, arpb = Mix(DUR), Mix(DUR), Mix(DUR), Mix(DUR)
duck = np.ones(int((DUR + 4) * SR))
snare = lambda g: bp(noise(.09), 1200, 6000) * env(.09, .001, .01, 9) * g
for i, B_ in enumerate(BARS):
    t0 = i * BAR; root, voic = CH[B_['ch']]
    for k in B_['kick']:
        drums.add(kick(drive=B_['kd']), t0 + k * BEAT, .95); o = int((t0 + k * BEAT) * SR); n = int(.3 * SR)
        duck[o:o + n] = np.minimum(duck[o:o + n], 1 - .62 * np.exp(-np.arange(n) / (.09 * SR)))
    for k in B_['clap']: drums.add(reverb(clap(), .18), t0 + k * BEAT, .5)
    if B_['hat']:
        step = .25 if B_['hat'] == '16' else .5; q = .28 if B_['hat'] == '8q' else .5
        for j in range(int(4 / step)):
            off = j * step; drums.add(hat(open_=(B_['hat'] != '8q' and off % 1 == .5 and j % 4 == 2)), t0 + off * BEAT, q * (1 if off % 1 == 0 else .55 if off % .5 == 0 else .33), pan=.25 * (-1) ** j)
    if B_['roll']:
        a0 = {'late': 2, 'full': 0, 'head': 0}[B_['roll']]; a1 = 0.55 if B_['roll'] == 'head' else 4
        tcur = a0
        while tcur < a1 - 1e-6:
            pr = (tcur - a0) / (a1 - a0); drums.add(snare(.25 + .55 * pr), t0 + tcur * BEAT, .8); tcur += .25 if pr < .6 else .125
    if B_['bass'] == 'long': bassb.add(bass(root, BAR * .98, 260, 1.1), t0, .55)
    elif B_['bass']:
        step = .5 if B_['bass'] == '8' else .25
        for j in range(int(4 / step)):
            n = root + (12 if (j % 8 in (3, 6)) else 0); bassb.add(bass(n, step * BEAT * .92, 520 if B_['bass'] == '16' else 420), t0 + j * step * BEAT, .6)
    if B_['pad']: padb.add(pad(voic, BAR + .5, B_['cut']), t0 - .1, .5 * B_['pad'], pan=-.2); padb.add(pad([v + 12 for v in voic[:2]], BAR + .5, B_['cut'] * .8), t0 - .1, .2 * B_['pad'], pan=.3)
    if B_['arp']:
        seq = [0, 1, 2, 1, 3 % len(voic), 2, 1, 2] * 2
        for j, s in enumerate(seq):
            if B_['arp'] == 'sparse' and j not in (0, 6, 11): continue
            arpb.add(pluck(voic[s] + 12, .45, 4200 if B_['cut'] > 1400 else 2600), t0 + j * .25 * BEAT, .34 if B_['arp'] == 'on' else .5, pan=.5 * (-1) ** j)
# dotted-eighth ping-pong delay + space on the plucks
ar = arpb.bus(); dl = int(.45 * SR)
for rep, g in ((1, .42), (2, .22), (3, .1)):
    ar[rep % 2, rep * dl:] += arpb.bus()[(rep + 1) % 2, :-rep * dl] * g
music = drums.bus() * .9 + (bassb.bus() * .95 + padb.bus() * 1.0) * duck[:drums.n] + ar * .8
# logo sting: minor question → major answer
sting = Mix(DUR)
sting.add(reverb(pad([45, 57, 59, 60, 64], 2.6, 900, 1.0, 1.2), .5), 91.3, .8)
sting.add(reverb(pad([36, 48, 55, 60, 64, 67, 74], 4.6, 2200, .25, 3.2), .6), 93.25, 1.0)
for j, n in enumerate((72, 76, 79, 86)): sting.add(reverb(bell(midi(n), 1.6), .5), 93.35 + j * .09, .5, pan=(-.5, .5, -.2, .2)[j])
music = music + sting.bus()
# automation: the "record stop" before the delivery-charge slam, and the hush after the flip
g = np.ones(music.shape[1]); T_ = np.arange(len(g)) / SR
def dip(a, bb, lvl, fa=.03, fb=.03): g[:] = np.minimum(g, 1 - (1 - lvl) * np.clip((T_ - a) / fa, 0, 1) * np.clip((bb - T_) / fb, 0, 1))
dip(45.12, 45.6, 0.0, .04, .005); dip(70.0, 72.0, .35, .05, .3); dip(12.0, 13.6, .55, .05, .4); dip(91.2, 91.5, .0, .01, .2)
music *= g

# ───── SFX from the animation cues ─────
cues = json.load(open(os.path.join(HERE, 'cues.json')))['cues']
GAIN = dict(whoosh=.5, swish=.4, sweep=.6, click=.8, pop=.6, tick=.5, clock=.7, ding=.5, star=.55, impact=1.0, boom=.8, thud=.8, stamp=.9, error=.7, deny=.5, alarm=.6, glitch=.7,
            heart=.9, bubble=.8, flip=.6, windup=.6, mystery=.7, rumble=.8, fall=.6, riser=.55, count=.6, drain=.8, stop=.8, zap=.6, switch=.9, success=.6, shine=.5, lock=.9, ticks=.6)
fx = Mix(DUR)
for c in cues:
    name = c['name']; logo = name.startswith('logo_'); name = name.replace('logo_', '')
    y = sfx(name, c.get('p', 0), c.get('d'), c.get('soft', 0))
    pan = 0 if name in ('impact', 'boom', 'thud', 'stamp', 'riser', 'rumble', 'heart', 'stop', 'lock') else ((zlib.crc32(f"{name}{c['t']}".encode()) % 100) / 100 - .5) * .9
    fx.add(y, c['t'], GAIN[name] * (1.25 if logo else 1), pan)

os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
out = Mix(DUR)
x = out.write(os.path.join(HERE, 'build/ep01_mix.wav'), extra=music * .5 + fx.bus() * .62, fade_out=.6)
for nm, st in (('music', music * .5), ('sfx', fx.bus() * .62)): Mix(DUR).write(os.path.join(HERE, f'build/ep01_{nm}.wav'), extra=st)
print('mix written:', x.shape[1] / SR, 's  rms', float(np.sqrt((x ** 2).mean())), ' cues', len(cues))
