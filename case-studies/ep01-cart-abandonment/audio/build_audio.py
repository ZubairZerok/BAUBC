#!/usr/bin/env python3
"""EP01 (story cut) soundtrack — ElevenLabs voice-over + storybook score (A minor, mallet arps) barred to the
story beats (chapter marks, the troll reveal, the checkout win) + SFX from the animation cue list.
Music side-chain-ducks under the voice.

    node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
    python3 audio/build_audio.py      ->  audio/build/ep01_mix.wav (+ stems)
"""
import json, os, sys, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from arrange import *
from scipy.signal import lfilter

CJ = json.load(open(os.path.join(HERE, 'cues.json'))); DUR = CJ['duration']
VO_OFF = 0.4                                   # the voice starts this long after frame 0 (see src/core.js)
cues = [c for c in CJ['cues'] if c['name'] != 'mark']
MK = sorted(c['t'] for c in CJ['cues'] if c['name'] == 'mark')
TROLL = next(c['t'] for c in cues if c['name'] == 'alarm' and MK[4] < c['t'] < MK[5])
WIN = next(c['t'] for c in cues if c['name'] == 'lock') - .1
LOCK = next(c['t'] for c in cues if c['name'] == 'logo_lock')
CH = {'Am': (33, [57, 60, 64, 71]), 'F': (29, [53, 57, 60, 64]), 'C': (36, [55, 60, 64, 67]), 'G': (31, [55, 59, 62, 67]), 'Dm': (38, [57, 62, 65]), 'E': (28, [56, 59, 64]),
      'Bb': (34, [58, 62, 65]), 'Ao': (33, [57, 60, 63, 66]), 'Am9': (33, [57, 59, 60, 64])}
SEC = [  # (start, end, bars)
    (MK[0], MK[1], [b('Am', hat='8q', arp='sparse', pad=.7, cut=700), b('F', K1, hat='8q', bass='long', arp='sparse', cut=750), b('Dm', K1, hat='8q', bass='long', arp='sparse', cut=800), b('E', K1, hat='8', bass='long', cut=900, roll='late')]),
    (MK[1], MK[2], [b('C', K2, [1, 3], '8', '8', 'on', cut=1700), b('G', K2, [1, 3], '8', '8', 'on', cut=1700), b('Am', K1, hat='8q', bass='long', arp='sparse', cut=900), b('F', K1, hat='8q', bass='long', arp='sparse', cut=800),
                    b('Dm', [0, 2], hat='16', bass='8', arp='on', cut=1100), b('E', [0, 2], hat='16', bass='8', arp='on', cut=1100, roll='late')]),
    (MK[2], MK[3], [b('Am9', bass='long', arp='sparse', cut=650), b('Am9', bass='long', arp='sparse', cut=700), b('F', K1, hat='8q', bass='long', arp='sparse', cut=800), b('F', K1, hat='8q', bass='long', arp='on', cut=900),
                    b('Dm', K1, hat='8q', bass='long', cut=700), b('Bb', K1, hat='8', bass='8', arp='sparse', cut=800), b('E', K1, hat='8', bass='8', cut=900, roll='full')]),
    (MK[3], MK[4], [b('Am', K1, hat='8', bass='8', cut=1000), b('Am', K4, [1, 3], '16', '8', 'on', cut=1500), b('F', K4, [1, 3], '16', '8', 'on', cut=1500), b('C', K4, [1, 3], '16', '8', 'on', cut=1500),
                    b('G', K4, [1, 3], '16', '8', 'on', cut=1500), b('E', K1, hat='8', bass='long', cut=900, roll='late')]),
    (MK[4], TROLL, [b('Am', [0, 2], hat='8', bass='8', cut=800), b('Am', [0, 2], hat='8', bass='8', arp='sparse', cut=900), b('Dm', [0, 2], hat='8', bass='8', arp='sparse', cut=900), b('Bb', [0, 2], hat='16', bass='8', cut=1000, roll='late')]),
    (TROLL, MK[5], [b('Ao', K4, [1, 3], '16', '16', cut=1400, kd=2.6), b('Bb', K4, [1, 3], '16', '16', cut=1300, kd=2.6), b('E', K1, hat='8q', bass='long', cut=800)]),
    (MK[5], MK[6], [b('F', K2, [1, 3], '8', '8', 'on', cut=1700), b('G', K2, [1, 3], '8', '8', 'on', cut=1700), b('Am', K2, [1, 3], '8', '8', 'on', cut=1700), b('C', K2, [1, 3], '8', '8', 'on', cut=1700)]),
    (MK[6], MK[7], [b('Am', K2, hat='8', bass='8', arp='sparse', cut=1000), b('F', K2, [1, 3], '8', '8', 'sparse', cut=1100), b('Dm', K4, [1, 3], '16', '8', 'on', cut=1300, roll='late'), b('E', [0], bass='long', pad=.6, cut=700)]),
    (MK[7], WIN, [b('Am', K1, hat='8q', bass='long', cut=800), b('F', K1, hat='8q', bass='long', arp='sparse', cut=900), b('G', [0, 2], hat='8', bass='8', arp='on', cut=1200), b('G', K4, hat='16', bass='8', arp='on', cut=1400, roll='full')]),
    (WIN, MK[9], [b('C', K4, [1, 3], '16', '8', 'on', cut=1900), b('G', K4, [1, 3], '16', '8', 'on', cut=1900), b('Am', K4, [1, 3], '16', '8', 'on', cut=1800), b('F', K4, [1, 3], '16', '8', 'on', cut=1800),
                  b('C', K4, [1, 3], '16', '8', 'on', cut=1800), b('G', K2, [1, 3], '8', '8', 'on', cut=1500, roll='late')]),
    (MK[9], DUR, [b('Am9', pad=0), b('C', pad=0), b('C', pad=0)]),
]
BARS, starts = [], []
for a, e, bars in SEC:
    BARS += bars; starts += [a + (e - a) * j / len(bars) for j in range(len(bars))]
starts.append(DUR)
music = arrange(BARS, CH, DUR, arp_inst='mallet', starts=starts)
sting = Mix(DUR)
sting.add(reverb(pad([33, 45, 57, 59, 60, 64], LOCK - MK[9] + .3, 600, .8, .4), .6), MK[9], 1.0)
sting.add(reverb(pad([36, 48, 55, 60, 64, 67, 74], DUR - LOCK, 2200, .2, 2.4), .6), LOCK + .03, 1.0)
for j, n in enumerate((72, 76, 79, 86)): sting.add(reverb(bell(midi(n), 1.6), .5), LOCK + .1 + j * .09, .45, pan=(-.5, .5, -.2, .2)[j])
music = music + sting.bus()
g = np.ones(music.shape[1]); T_ = np.arange(len(g)) / SR
def dip(a, bb, lvl, fa=.03, fb=.03): g[:] = np.minimum(g, 1 - (1 - lvl) * np.clip((T_ - a) / fa, 0, 1) * np.clip((bb - T_) / fb, 0, 1))
dip(TROLL - .75, TROLL, 0.0, .1, .005)        # held breath before the delivery-charge troll
dip(MK[9] - .15, MK[9] + .1, 0.0, .05, .1)    # breath before the logo
music *= g
GAIN = dict(whoosh=.5, swish=.4, sweep=.55, click=.8, pop=.55, plop=.6, tick=.5, clock=.6, ding=.5, star=.55, impact=1.0, boom=.75, thud=.75, stamp=.85, deny=.5, alarm=.5, glitch=.6,
            heart=.9, bubble=.7, riser=.5, count=.5, success=.55, shine=.45, lock=.85, ticks=.6, zoom=.55, iris=.6, buzz=.5, sub=.9, wobble=.5, sad=.6, creak=.6, smoke=.8,
            fall=.55, mystery=.7, rumble=.8, windup=.55, drain=.8, stop=.8, birds=.6, crickets=1.0)
fx = place_cues(cues, GAIN, DUR)
os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(HERE, 'vo/ep01_vo_elevenlabs.mp3'), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
v = np.frombuffer(raw, np.float32).reshape(-1, 2).T; vo = np.zeros_like(music); o = int(VO_OFF * SR); n = min(v.shape[1], vo.shape[1] - o); vo[:, o:o + n] = v[:, :n]
vo = vo / np.abs(vo).max() * .92
envv = np.sqrt(lfilter([1 - .9995], [1, -.9995], (vo ** 2).mean(0))); envv = np.clip(envv / (envv.max() * .25), 0, 1)
music = music * (1 - .68 * envv); fxd = fx * (1 - .35 * envv)
x = Mix(DUR).write(os.path.join(HERE, 'build/ep01_mix.wav'), extra=vo + music * .42 + fxd * .5, fade_out=.8)
for nm, st in (('music', music * .42), ('sfx', fxd * .5), ('vo', vo)): Mix(DUR).write(os.path.join(HERE, f'build/ep01_{nm}.wav'), extra=st)
print('mix', round(x.shape[1] / SR, 2), 's · cues', len(cues), '· bars', len(BARS), '· troll', TROLL, '· win', round(WIN, 2), '· lock', LOCK)
