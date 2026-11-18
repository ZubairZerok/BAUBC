#!/usr/bin/env python3
"""EP03 audio — builds three SEPARATE stems + the final mix:

    audio/stems/voice.wav         the voice-over (audio/vo/voice.mp3) placed on the video clock
    audio/stems/music.wav         score, full level (no ducking)
    audio/stems/music_ducked.wav  score, ducked under the voice (what the mix uses)
    audio/stems/sfx.wav           all sound effects
    audio/stems/mix.wav  +  audio/ep03_mix.m4a   voice + ducked music + sfx

Needs audio/cues.json (node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json).
Easiest: run audio/swap_voice.py, which does every step for you.
"""
import json, os, re, sys, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from arrange import *
from scipy.signal import lfilter

CJ = json.load(open(os.path.join(HERE, 'cues.json'))); DUR = CJ['duration']
VO_OFF = float(re.search(r'const VO_OFF = ([\d.]+)', open(os.path.join(ROOT, 'src', 'core.js')).read()).group(1))
cues = [c for c in CJ['cues'] if c['name'] != 'mark']
MK = sorted(c['t'] for c in CJ['cues'] if c['name'] == 'mark') + [DUR]
CH = {'D': (38, [62, 66, 69, 74]), 'G': (31, [59, 62, 67, 71]), 'A': (33, [61, 64, 69, 73]), 'Bm': (35, [59, 62, 66, 71]), 'Em': (40, [59, 64, 67, 71]), 'C': (36, [60, 64, 67, 72]),
      'Am': (33, [57, 60, 64, 69]), 'E': (28, [56, 59, 64, 68]), 'F#m': (42, [61, 66, 69, 73]), 'Bm9': (35, [59, 61, 62, 66])}
FEST = lambda ch: b(ch, K4, [1, 3], '16', '8', 'on', cut=1900)
PAL = [  # per chapter: (chord cycle, bar template) — 01 প্রবাদ · 02 নতুন অন্ন · 03 অটো মিল · 04 সাদা চাল · 05 ল্যাবের সত্যি · 06 আসল দিন
    (['Bm', 'G', 'Em', 'F#m'], lambda ch, k: b(ch, K1 if k % 2 else (), hat='8q', bass='long', arp='sparse', cut=800) if k < 2 else FEST(ch)),
    (['D', 'G', 'Bm', 'A'], lambda ch, k: b(ch, K1, hat='8q', bass='long', arp='on', cut=1300) if k < 2 else FEST(ch)),
    (['Em', 'C', 'Am', 'E'], lambda ch, k: b(ch, K2, [1, 3], '8', '8', 'on', cut=1100, roll='late' if k == 1 else None)),
    (['Bm', 'G', 'Em', 'F#m'], lambda ch, k: b(ch, K4 if k > 1 else K2, [1, 3], '16' if k > 1 else '8', '8', 'on', cut=1300)),
    (['G', 'D', 'Em', 'C'], lambda ch, k: b(ch, K1 if k < 2 else K2, hat='8q', bass='long' if k < 2 else '8', arp='on', cut=1500)),
    (['Bm9', 'G', 'D', 'A'], lambda ch, k: b(ch, () if k < 2 else K4, [] if k < 2 else [1, 3], '8q' if k < 2 else '16', 'long' if k < 2 else '8', 'sparse' if k < 2 else 'on', cut=700 if k < 2 else 1800)),
]
BARS, starts = [], []
for i, (cyc, tpl) in enumerate(PAL):
    a, e = MK[i], MK[i + 1]; n = max(2, round((e - a) / 2.3))
    for k in range(n): BARS.append(tpl(cyc[k % len(cyc)], k)); starts.append(a + (e - a) * k / n)
NL = len(PAL)
for k in range(3): BARS.append(b(['Bm9', 'D', 'D'][k], pad=0)); starts.append(MK[NL] + (DUR - MK[NL]) * k / 3)
starts.append(DUR)
music = arrange(BARS, CH, DUR, arp_inst='mallet', starts=starts)
LOCK = next(c['t'] for c in cues if c['name'] == 'logo_lock')
st = Mix(DUR)
st.add(reverb(pad([35, 47, 54, 59, 61, 62], LOCK - MK[NL] + .3, 600, .8, .4), .6), MK[NL], 1.0)
st.add(reverb(pad([38, 50, 57, 62, 66, 69, 76], DUR - LOCK, 2200, .2, 2.4), .6), LOCK + .03, 1.0)
for j, n in enumerate((74, 78, 81, 86)): st.add(reverb(bell(midi(n), 1.6), .5), LOCK + .1 + j * .09, .45, pan=(-.5, .5, -.2, .2)[j])
music = music + st.bus()
g = np.ones(music.shape[1]); T_ = np.arange(len(g)) / SR
def dip(a, bb, lvl, fa=.03, fb=.03): g[:] = np.minimum(g, 1 - (1 - lvl) * np.clip((T_ - a) / fa, 0, 1) * np.clip((bb - T_) / fb, 0, 1))
SHT = next(c['t'] for c in cues if c['name'] == 'shatter')
dip(SHT - .55, SHT + .02, .15, .4, .02)          # breath before the billboard shatters
dip(MK[NL] - .15, MK[NL] + .1, 0.0, .05, .1)
music *= g
GAIN = dict(whoosh=.5, swish=.4, sweep=.55, click=.8, pop=.55, plop=.6, tick=.5, clock=.6, ding=.5, star=.55, impact=1.0, boom=.6, thud=.75, stamp=.85, deny=.5, alarm=.45, glitch=.6,
            bubble=.6, riser=.5, count=.5, success=.55, shine=.45, lock=.85, ticks=.6, zoom=.5, iris=.6, sub=.9, sad=.6, creak=.6, smoke=.8, fall=.55, rumble=.7, windup=.5, coin=.55,
            birds=.6, dhol=.75, crowd=.55, scratch=.5, quill=.7, machine=.6, thump=.7, boil=.6, switch=.8, shutter=.8, rewind=.55, snap=.7, shatter=.8, squish=.6, wobble=.5, zap=.5, mystery=.5, drain=.5, flip=.5, horn=.4)
fx = place_cues(cues, GAIN, DUR)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(HERE, 'vo', 'voice.mp3'), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
v = np.frombuffer(raw, np.float32).reshape(-1, 2).T; vo = np.zeros_like(music); o = int(VO_OFF * SR); n = min(v.shape[1], vo.shape[1] - o); vo[:, o:o + n] = v[:, :n]
vo = vo / max(1e-9, np.abs(vo).max()) * .92
envv = np.sqrt(lfilter([1 - .9995], [1, -.9995], (vo ** 2).mean(0))); envv = np.clip(envv / (envv.max() * .25), 0, 1)
md = music * (1 - .68 * envv); fxd = fx * (1 - .35 * envv)
os.makedirs(os.path.join(HERE, 'stems'), exist_ok=True)
x = Mix(DUR).write(os.path.join(HERE, 'stems', 'mix.wav'), extra=vo + md * .42 + fxd * .5, fade_out=.8)
for nm, s2 in (('voice', vo), ('music', music * .42), ('music_ducked', md * .42), ('sfx', fxd * .5)): Mix(DUR).write(os.path.join(HERE, 'stems', f'{nm}.wav'), extra=s2)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(HERE, 'stems', 'mix.wav'), '-c:a', 'aac', '-b:a', '256k', os.path.join(HERE, 'ep03_mix.m4a')])
print(f'mix {x.shape[1] / SR:.2f}s · {len(cues)} cues · {len(BARS)} bars -> audio/stems/ (voice, music, music_ducked, sfx, mix) + audio/ep03_mix.m4a')
