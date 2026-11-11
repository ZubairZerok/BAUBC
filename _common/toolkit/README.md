# Toolkit

## `render.mjs` — HTML → MP4, frame-exact

A composition is a normal web page that exposes four globals:

| global | meaning |
|---|---|
| `window.__ready` | Promise — fonts/assets loaded, scene graph built |
| `window.__duration` | length in seconds |
| `window.__seek(t)` | draw the exact frame at `t` (pure function of `t`) |
| `window.__cues` | optional `[{t, name, …}]` sound cues |

The engine opens the page in headless Chromium (N parallel tabs), seeks frame by frame, screenshots, and encodes with ffmpeg (H.264, yuv420p, bt709, faststart; AAC if `--audio`).

```bash
node render.mjs --html <index.html> --out <video.mp4> [--fps 60] [--w 1080 --h 1920] [--workers 4] [--audio mix.wav] [--from 10 --to 20] [--crf 16]
```

```bash
node render.mjs --html <index.html> --stills "0.5,3,12.4" --stilldir ./preview
```

```bash
node render.mjs --html <index.html> --cues audio/cues.json
```

## `stage.js` — shared reel engine

Timeline helpers used by every episode: `E` (element factory), `scene(name, t0, t1, {pre, post, push})`, `hIn` (word-by-word Bangla-safe headline), `pop`, `out`, `shake`, `flash`, `counter`, the caption engine (`cap(t0, t1, 'text with *lime* words')` / `drawCaps`), the 24px icon set (`ico`), and transitions: `wipe`, `whip(t, A, B, dir)`, `zoomThru(t, A, B, x, y)`, `iris(t, B, x, y)`. An episode adds its own bar grid `T`, background and HUD, then calls `stageInit(duration, ...frameFns)`. EP02 is the reference.

## `audio/synth.py` — procedural sound kit

Drums, bass, pads, plucks, bells and ~35 named SFX (`whoosh`, `pop`, `impact`, `riser`, `alarm`, `success`, …), all synthesized with numpy/scipy — original and royalty-free. `audio/arrange.py` turns a per-bar chord/drum chart into a full score (`arrange(BARS, CH, DUR, arp_inst='pluck'|'mallet')`) and places SFX from `cues.json` (`place_cues`). An episode's `audio/build_audio.py` is then about 40 lines (see EP02).

## `vendor/`

GSAP 3 (core + CustomEase), vendored so renders work offline.
