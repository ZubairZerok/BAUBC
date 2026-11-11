#!/usr/bin/env python3
"""CASE STUDIES logo v2 — sound design: fog riser, six piece whooshes/ticks, impact + smoke, letter thuds,
lock, shimmer; dark Bm9 pad that resolves to D major at the lock."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '../../../_common/toolkit/audio'))
from arrange import *
DUR = 7.5
cues = json.load(open(os.path.join(HERE, 'cues.json')))['cues']
LOCK = next(c['t'] for c in cues if c['name'] == 'lock')
GAIN = dict(riser=.6, whoosh=.45, tick=.5, impact=1.0, smoke=.9, sweep=.6, thud=.8, ticks=.6, lock=.9, shine=.5)
m = Mix(DUR)
m.add(reverb(pad([35, 47, 54, 59, 61, 62], LOCK + .3, 600, .6, .4), .6), 0, 1.0)
m.add(reverb(pad([38, 50, 57, 62, 66, 69, 76], DUR - LOCK, 2200, .2, 2.4), .6), LOCK + .03, 1.0)
for j, n in enumerate((74, 78, 81, 86)): m.add(reverb(bell(midi(n), 1.6), .5), LOCK + .1 + j * .09, .45, pan=(-.5, .5, -.2, .2)[j])
music = m.bus() * .5
os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
Mix(DUR).write(os.path.join(HERE, 'build/logo_mix.wav'), extra=music + place_cues(cues, GAIN, DUR) * .62, fade_out=.8); print('ok, lock', LOCK)
