#!/usr/bin/env python3
"""CASE STUDIES logo sting — sound design (whooshes → impact → lock → major-chord shimmer)."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from synth import *
DUR = 6.0
GAIN = dict(whoosh=.6, swish=.5, impact=1.0, ticks=.6, lock=.9, shine=.5)
m = Mix(DUR)
for c in json.load(open(os.path.join(HERE, 'cues.json')))['cues']:
    m.add(sfx(c['name']), c['t'], GAIN[c['name']], 0 if c['name'] in ('impact', 'lock') else (-.4 if int(c['t'] * 100) % 2 else .4))
lock = next(c['t'] for c in json.load(open(os.path.join(HERE, 'cues.json')))['cues'] if c['name'] == 'lock')
m.add(reverb(pad([45, 57, 59, 60, 64], 2.3, 900, .8, 1.0), .5), 0.2, .7)                       # minor "question"
m.add(reverb(pad([36, 48, 55, 60, 64, 67, 74], DUR - lock - .1, 2200, .25, 2.4), .6), lock + .05, 1.0)   # major "answer"
for j, n in enumerate((72, 76, 79, 86)): m.add(reverb(bell(midi(n), 1.6), .5), lock + .12 + j * .09, .5, pan=(-.5, .5, -.2, .2)[j])
os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
m.write(os.path.join(HERE, 'build/logo_mix.wav'), fade_out=.8); print('ok')
