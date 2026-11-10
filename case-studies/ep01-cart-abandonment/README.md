# Case Studies · EP01 — কার্ট রহস্য: ৭০% কেন ফিরে যায়?

> Why do shoppers fill the cart and leave? ~70% of carts are abandoned — and the #1 trigger isn't the price, it's the **surprise delivery charge** at the last step.

| | |
|---|---|
| Deliverable | [`renders/BAUBC_CaseStudies_EP01_CartAbandonment_1080x1920_60fps.mp4`](renders/) |
| Format | 1080×1920 portrait · 60 fps · 97.2 s (5,832 frames) · H.264 + AAC |
| Language | Bangla on-screen captions — **no voice-over** |
| Sound | original BGM (100 BPM, A minor) + 160-odd synced SFX, all synthesized in-repo |
| Outro | CASE STUDIES logo animation (`/logo-animations/case-studies`) |

## Folder

| path | |
|---|---|
| [`docs/script.md`](docs/script.md) | final Bangla caption script with timings + the original concept text |
| [`docs/storyboard.md`](docs/storyboard.md) | chapter-by-chapter animation plan, hook logic, sound map |
| `src/index.html` | stage shell (layers: bg canvas → scenes → HUD → captions → grain/vignette → wipes) |
| `src/core.js` | master timeline, bar grid, background renderer, HUD, caption engine, helpers, icon set |
| `src/scenes.js` / `scenes2.js` | the ten chapters |
| `audio/build_audio.py` | music arrangement + SFX placement (reads `audio/cues.json`) |
| `audio/ep01_mix.m4a` | final mix |

## Rebuild

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
```

```bash
python3 audio/build_audio.py
```

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --audio audio/build/ep01_mix.wav --out renders/BAUBC_CaseStudies_EP01_CartAbandonment_1080x1920_60fps.mp4 --fps 60
```

## Facts used

- ~70% average online cart abandonment rate (Baymard Institute's long-running aggregate ≈ 70%).
- Unexpected extra costs (shipping, fees) are the most-cited reason for abandoning at checkout.
- ~99% of online shoppers read reviews before buying (as given in the brief; commonly cited from PowerReviews research).

The example prices in the mock checkout (৳850 / ৳1,200 / ৳650, delivery ৳150) are illustrative.
