# Case Studies · EP02 — পেঁয়াজের ধাঁধা: বাড়তি ফলিয়েও কেন দাম আকাশছোঁয়া?

> Bangladesh grows ~36 lakh tonnes of onion against ~28 lakh demand, yet prices explode. About 30% (≈10 lakh t) rots for lack of modern storage, turning the surplus into a shortfall. That leaves the market hostage to imports and syndicates, while 4–5 hands between farm and kitchen multiply the price 3–4×.

| | |
|---|---|
| Deliverable | [`renders/BAUBC_CaseStudies_EP02_OnionParadox_1080x1920_60fps.mp4`](renders/) |
| Format | 1080×1920 · 60 fps · 69.6 s · H.264 + AAC |
| Style | flat explainer illustration (Kurzgesagt-inspired) in BAUBC greens; all art drawn in code (`src/art.js`) |
| Language | Bangla captions, no voice-over · original synthesized score + SFX |
| Outro | CASE STUDIES logo v2 (BAUBC mark as the "A") |

| path | |
|---|---|
| `docs/script.md` · `docs/storyboard.md` | captions with timings, original brief, scene plan |
| `src/index.html` | stage shell: uses `_common/toolkit/stage.js` (timeline helpers, captions, transitions) |
| `src/core.js` | bar grid, sky + foreground dust, HUD |
| `src/art.js` | illustration kit: onion (fresh/rotting), people (poses, expressions), farmer, shed, ship, crate, hills, clouds… |
| `src/scenes.js`, `src/scenes2.js` | the eight chapters |
| `audio/build_audio.py` | score (via `_common/toolkit/audio/arrange.py`) + SFX from `cues.json` |

## Rebuild

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
```

```bash
python3 audio/build_audio.py
```

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --audio audio/build/ep02_mix.wav --out renders/BAUBC_CaseStudies_EP02_OnionParadox_1080x1920_60fps.mp4
```

## Facts used (from the brief)
Demand ≈ 28 lakh t/yr, production ≈ 36 lakh t, ~30% (≈10 lakh t) lost to rot, ৳60–70 → ৳200+ in past import-ban episodes, farm-gate ৳35–40/kg, 4–5 intermediaries, 3–4× retail markup.
**Derived on screen:** 36 − 10 = 26 < 28 → shortfall. Middleman titles are the common Bangladeshi trade chain. The rising price tag in the hook (৳60→৳210) is illustrative.
