#!/usr/bin/env python3
"""EP02 soundtrack — ElevenLabs voice-over (vo/ep02_vo_elevenlabs.mp3) + warm explainer score (D major / B minor, soft mallet arps)
re-barred to the voice-synced cuts (chapter 'mark' cues) + SFX from the animation's cue list. Music side-chain-ducks under the voice.

    node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
    python3 audio/build_audio.py      ->  audio/build/ep02_mix.wav (+ stems)
"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from arrange import *
from scipy.signal import lfilter

import subprocess
CJ = json.load(open(os.path.join(HERE, 'cues.json'))); DUR = CJ['duration']
VO_OFF = 1.2
CH = {'D': (38, [62, 66, 69, 74]), 'Bm': (35, [59, 62, 66, 71]), 'G': (31, [59, 62, 67, 71]), 'A': (33, [61, 64, 69, 73]), 'Em': (40, [59, 64, 67, 71]),
      'F#m': (42, [61, 66, 69, 73]), 'Gm': (31, [58, 62, 67, 70]), 'Bb': (34, [58, 62, 65, 70]), 'Dm': (38, [62, 65, 69, 74]), 'Bm9': (35, [59, 61, 62, 66])}
BARS = [
    # 01 paradox — curious, then the rocket
    b('Bm', hat='8q', arp='on', pad=.6, cut=900), b('G', K1, hat='8q', bass='long', arp='on', cut=1000), b('A', K4, [1, 3], '16', '8', 'on', cut=1500, roll='late'),
    # 02 field & tanks — bright and bouncy
    b('D', K2, [1, 3], '8', '8', 'on', cut=1700), b('A', K2, [1, 3], '8', '8', 'on', cut=1700), b('Bm', K2, [1, 3], '8', '8', 'on', cut=1700), b('G', K2, [1, 3], '8', '8', 'on', cut=1800),
    # 03 the rot — the light goes out
    b('Em', hat=None, bass='long', arp='sparse', cut=700), b('Bm9', K1, hat='8q', bass='long', arp='sparse', cut=650), b('Gm', K1, hat='8q', bass='8', cut=800), b('A', [0, 2], hat='8', bass='8', cut=900, roll='late'),
    # 04 imports & the spike — tension, hit, the syndicate
    b('Bm', [0, 2], hat='8', bass='8', arp='sparse', cut=900), b('G', [0, 2], hat='16', bass='8', arp='sparse', cut=1000), b('Bb', K4, [1, 3], '16', '16', cut=1400, kd=2.6), b('Bb', K4, [1, 3], '16', '16', cut=1200, kd=2.4),
    # 05 chain of hands — quirky pluck groove
    b('D', K2, [1, 3], '8', '8', 'on', cut=1600), b('F#m', K2, [1, 3], '8', '8', 'on', cut=1600), b('G', K4, [1, 3], '16', '8', 'on', cut=1600), b('A', K1, hat='8q', bass='long', cut=900),
    # 06 the real crisis → the key
    b('Bm', hat=None, bass='long', arp='sparse', cut=800), b('G', K1, hat='8q', bass='long', arp='sparse', cut=900), b('D', K4, [1, 3], '16', '8', 'on', cut=1900), b('A', K4, [1, 3], '16', '8', 'on', cut=1900),
    # 07 your turn — confident groove
    b('G', K4, [1, 3], '16', '8', 'on', cut=1800), b('A', K4, [1, 3], '16', '8', 'on', cut=1800), b('D', K2, [1, 3], '8', '8', 'on', cut=1500, roll='late'),
    # 08 logo — no drums (the logo carries its own sound design)
    b('Bm9', pad=0), b('D', pad=0), b('D', pad=0),
]
cues = [c for c in CJ['cues'] if c['name'] != 'mark']
MK = sorted(c['t'] for c in CJ['cues'] if c['name'] == 'mark') + [DUR]
NB = [3, 4, 4, 4, 4, 4, 3, 3]; starts = []
for i, n in enumerate(NB): starts += [MK[i] + (MK[i + 1] - MK[i]) * j / n for j in range(n)]
starts.append(DUR)
music = arrange(BARS, CH, DUR, arp_inst='mallet', starts=starts)
LOCK = next(c['t'] for c in cues if c['name'] == 'logo_lock')
sting = Mix(DUR)
sting.add(reverb(pad([35, 47, 54, 59, 61, 62], LOCK - MK[7] + .3, 600, .8, .4), .6), MK[7], 1.0)                 # dark question under the fog
sting.add(reverb(pad([38, 50, 57, 62, 66, 69, 76], DUR - LOCK, 2200, .2, 2.4), .6), LOCK + .03, 1.0)         # D major answer at the lock
for j, n in enumerate((74, 78, 81, 86)): sting.add(reverb(bell(midi(n), 1.6), .5), LOCK + .1 + j * .09, .45, pan=(-.5, .5, -.2, .2)[j])
music = music + sting.bus()
g = np.ones(music.shape[1]); T_ = np.arange(len(g)) / SR
def dip(a, bb, lvl, fa=.03, fb=.03): g[:] = np.minimum(g, 1 - (1 - lvl) * np.clip((T_ - a) / fa, 0, 1) * np.clip((bb - T_) / fb, 0, 1))
SPIKE = next(c['t'] for c in cues if c['name'] == 'impact' and MK[3] < c['t'] < MK[4])
dip(SPIKE - .16, SPIKE, 0.0, .04, .005)   # tape-stop gap right before the ৳200 spike
dip(MK[7] - .15, MK[7] + .1, 0.0, .05, .1)   # breath before the logo
music *= g
GAIN = dict(whoosh=.5, swish=.4, sweep=.55, click=.8, pop=.55, plop=.6, pour=.6, tick=.5, ding=.5, star=.55, impact=1.0, boom=.8, thud=.75, stamp=.85, deny=.5, alarm=.5,
            bubble=.7, flip=.55, riser=.55, count=.5, success=.55, shine=.45, lock=.9, ticks=.6, zoom=.55, iris=.6, flicker=.6, squish=.7, buzz=.5, horn=.6, rocket=.7,
            sub=.9, wobble=.6, coin=.55, sad=.6, creak=.6, smoke=.8, fall=.6)
fx = place_cues(cues, GAIN, DUR)
os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(VO_OFF), '-i', os.path.join(HERE, 'vo/ep02_vo_elevenlabs.mp3'), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
vo = np.frombuffer(raw, np.float32).reshape(-1, 2).T.copy(); vo = np.pad(vo, ((0, 0), (0, max(0, music.shape[1] - vo.shape[1]))))[:, :music.shape[1]]
vo = vo / np.abs(vo).max() * .92
# side-chain: smooth voice envelope → music ducks ~10 dB under speech, SFX ~4 dB
envv = np.sqrt(lfilter([1 - .9995], [1, -.9995], (vo ** 2).mean(0)))
envv = np.clip(envv / (envv.max() * .25), 0, 1)
music = music * (1 - .68 * envv); fxd = fx * (1 - .35 * envv)
x = Mix(DUR).write(os.path.join(HERE, 'build/ep02_mix.wav'), extra=vo * 1.0 + music * .42 + fxd * .5, fade_out=.8)
for nm, st in (('music', music * .42), ('sfx', fxd * .5), ('vo', vo)): Mix(DUR).write(os.path.join(HERE, f'build/ep02_{nm}.wav'), extra=st)
print('mix', x.shape[1] / SR, 's · cues', len(cues), '· lock at', LOCK)
