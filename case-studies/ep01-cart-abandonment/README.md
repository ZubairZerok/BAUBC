# Case Studies · EP01 — কার্টুর গল্প: ৭০% কার্ট কেন পড়ে থাকে?

> A little shopping cart, **কার্টু**, has been waiting 47 days at checkout for a shopper who said "থাক, পরে কিনব". Through its story: ~70% of carts are abandoned, the real reason is the **surprise delivery charge** at the last step (not the price), ~99% of shoppers read reviews, and an easy, fast, transparent checkout is the biggest competitive advantage.

| | |
|---|---|
| Deliverable (final) | [`renders/BAUBC_CaseStudies_EP01_CartStory_VO_1080x1920_60fps.mp4`](renders/) — story cut with ElevenLabs voice-over, 125.1 s |
| Earlier cut | `renders/BAUBC_CaseStudies_EP01_CartAbandonment_1080x1920_60fps.mp4` — neon UI explainer, captions only, 97.2 s (source in `archive-v1/`) |
| Format | 1080×1920 · 60 fps · H.264 + AAC |
| Style | **2D vector only** (no 3D), multiplane parallax depth, story-led, night-time green/lime world, everything on screen in Bangla |
| Sound | ElevenLabs VO (`audio/vo/`, tagged script in `docs/vo-script-elevenlabs.md`) + storybook score ducked under the voice + ~170 synced SFX |
| Sync | the timeline is authored directly on the voice clock: `V(t)` in `src/core.js` maps a time in the VO file to video time |
| Skill used | [`../skill/cinematic-vector-explainer.md`](../skill/cinematic-vector-explainer.md) |

| path | |
|---|---|
| `docs/script.md` · `docs/storyboard.md` · `docs/claims-ledger.md` | captions with voice timings, shot plan, every claim and its status |
| `src/core.js` | voice clock, chapter grid, fireflies, HUD, `world()` multiplane camera (`W.plane(parallax)`, `W.aim(X, Y, zoom)`) |
| `src/art.js` | 2D kit: কার্টু (cart with face, moods, rolling wheels), full-body characters with walk cycle, stalls, gate, cobwebs, fog, trees, fireworks |
| `src/scenes.js` | 01 হারানো কার্টের মাঠ (hook) · 02 বাজার → ‘পরে কিনব’ |
| `src/scenes2.js` | 03 রহস্য · 04 ৭০% · 05 the delivery-charge troll (one continuous chasm world) |
| `src/scenes3.js` | 06 রিভিউ গাছ · 07 দাঁড়িপাল্লা · 08 লেসন + নতুন সেতু · 09 আপনার পালা · logo |

## Render

On your own PC: see [`/RENDER-LOCALLY.md`](../../RENDER-LOCALLY.md) (`npm run ep01`).

Full rebuild including sound:

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
```

```bash
python3 audio/build_audio.py
```

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --audio audio/build/ep01_mix.wav --out renders/BAUBC_CaseStudies_EP01_CartStory_VO_1080x1920_60fps.mp4
```
