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

## `audio/synth.py` — procedural sound kit

Drums, bass, pads, plucks, bells and ~35 named SFX (`whoosh`, `pop`, `impact`, `riser`, `alarm`, `success`, …), all synthesized with numpy/scipy — original and royalty-free. Each episode's `audio/build_audio.py` arranges the music and drops SFX at the times listed in `cues.json`.

## `vendor/`

GSAP 3 (core + CustomEase), vendored so renders work offline.
