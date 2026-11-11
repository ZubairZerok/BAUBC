# BAUBC — Motion Design Vault

Every reel, logo sting and motion asset of the **Bangladesh Agricultural University Business Club (BAUBC)**,
kept as *source code*: each video is an HTML/GSAP composition that renders, frame-exact, to a 1080×1920 · 60 fps MP4.

```
BAUBC/
├── _common/                  ← universal: brand, fonts, render engine, audio kit, templates
│   ├── brand/                   colours · fonts · club info · BAUBC logo (official PNG + traced vector)
│   ├── toolkit/                 render.mjs (HTML → MP4) · stage.js (timeline/captions/transitions) · audio/ (synth + arranger) · vendor/gsap
│   └── templates/               starter project for a new episode
│
├── case-studies/             ← SERIES · business case studies told in ~90 s
│   ├── ep01-cart-abandonment/   ✅ finished — "কার্ট রহস্য: ৭০% কেন ফিরে যায়?"
│   ├── ep02-onion-paradox/      ✅ finished — "পেঁয়াজের ধাঁধা" (flat explainer style)
│   ├── ep03/                    🟡 slot, brief pending
│
├── recruitment/              ← SERIES · recruitment campaign reels
│   └── ep01/ ep02/ ep03/        🟡 slots, brief pending
│
└── logo-animations/          ← SERIES IDENTS · one folder per series logo
    ├── case-studies/            ✅ CASE STUDIES logo v2 (BAUBC mark as the A) + sting
    ├── decoded-season-2/        🟡 slot
    └── recruitment/             🟡 slot
```

## Anatomy of an episode folder

| path | what lives there |
|---|---|
| `README.md` | one-page summary: concept, status, how to render |
| `docs/` | script (Bangla captions), storyboard / timing sheet |
| `src/` | the composition — `index.html`, scenes, styles |
| `audio/` | `build_audio.py` (music + SFX, generated from the animation's cue list), final `.m4a` mix |
| `renders/` | delivered MP4 (+ poster frame) |

## Render anything

```bash
node _common/toolkit/render.mjs --html case-studies/ep01-cart-abandonment/src/index.html --cues case-studies/ep01-cart-abandonment/audio/cues.json
```

```bash
python3 case-studies/ep01-cart-abandonment/audio/build_audio.py
```

```bash
node _common/toolkit/render.mjs --html case-studies/ep01-cart-abandonment/src/index.html --audio case-studies/ep01-cart-abandonment/audio/build/ep01_mix.wav --out case-studies/ep01-cart-abandonment/renders/out.mp4 --fps 60
```

Needs: Node 20+, `playwright` (Chromium), `ffmpeg`, Python 3 with `numpy` + `scipy`. Details in [`_common/toolkit/README.md`](_common/toolkit/README.md).

## House rules

1. **Deterministic or it doesn't ship** — a composition exposes `window.__seek(t)`; no wall-clock animation, no `Math.random()`.
2. **Portrait first** — 1080×1920, 60 fps. Keep key content inside y 230–1560 (Reels UI covers the rest); fill the rest with depth, not information.
3. **Captions are the voice** — Bangla on-screen captions carry the narration; no voice-over. BGM + SFX only.
4. **Cuts land on the bar** — pick a BPM, make every scene boundary a multiple of the bar length; SFX are declared next to the animation they belong to (`sfx(t, name)`).
5. **New series = new folder** at the root, plus its ident under `logo-animations/`.
