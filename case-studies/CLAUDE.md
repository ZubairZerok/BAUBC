# CASE STUDIES — production instructions

**Read this before making any Case Studies episode**, together with the skill file [`skill/cinematic-vector-explainer.md`](skill/cinematic-vector-explainer.md) (the owner's chosen method for all future Case Studies videos: claims ledger, angle before script, shot cards, depth planes, hold rule, camera tied to the voice, sound that reinforces meaning). It holds the owner's preferences, the rules they set, and the production workflow that works in this repo. (Named `CLAUDE.md` so Claude Code loads it automatically when working in this folder.)

---

## 1. What the series is
BAUBC (Bangladesh Agricultural University Business Club) explains one sharp business or economy insight per reel, in Bangla, for Facebook, Instagram and TikTok Reels.
Story spine: **hook → the puzzle → the number(s) → the real reason → the lesson → "your turn" (comment CTA) → CASE STUDIES logo**.

## 2. Non-negotiables (owner's rules)
| # | rule |
|---|---|
| 1 | **Portrait 1080×1920, 60 fps**, H.264 MP4. Deliver the final render inside the episode's `renders/` folder, then commit and push. |
| 2 | **Bangla captions** on every spoken line. When there is a voice-over, captions match the VO words exactly (e.g. VO says "টাকা", so the caption says "টাকা", not "৳"). |
| 3 | **An exceptional hook.** Frame 0 must already show the hook (big visual plus question/claim); never open on an empty or fading frame. |
| 4 | The brief is a concept, not a fixed script. Improve it for punch and reading speed, **but don't make it very different**. |
| 5 | **Sound:** BGM plus SFX, accurate and thoughtful, every visual hit has its sound. No AI voice unless the owner supplies one. When a VO is supplied, **the video follows the VO** (sync every line, slow the visuals down if needed). |
| 6 | **Depth and detail everywhere: no empty space, think about every pixel.** Use layered backgrounds, foreground elements, particles, fog, light. Grass and land need real texture and depth, not flat shapes. |
| 7 | **Colour: green / lime and their shades** (`_common/brand/brand.css`). Reference images in other colours (blue, indigo…) give the *style*, never the palette. Red only for bad news, gold for money and ratings, magenta for onions and other hero products. |
| 8 | **Always end on the CASE STUDIES logo animation** (`/logo-animations/case-studies`, v2: the BAUBC mark is the "A", 3D camera, fog, smoke, light rays). |
| 9 | **Bangladeshi context must look Bangladeshi.** Farmers wear a lungi (checked), gamcha, vest or fatua, mathal (bamboo hat) or tupi, have sun-tanned brown skin and a moustache, carry baskets (tukri) on the head; villages have tin-roof mud houses, areca and banana trees, and real BD market and trade terms (ফড়িয়া, বেপারী, আড়তদার, পাইকার, খুচরা). |
| 10 | **Charts must be correct and readable.** Scales consistent across scenes, reference lines at the true value, labels next to the thing they label. (EP02 was sent back because the demand-28 line looked misplaced, so show quantities with the same visual device, e.g. tanks, every time.) |
| 11 | Visual style may change per episode when the owner asks (EP01 neon UI · EP02 Kurzgesagt-like explainer + Zack D Films-style 3D models). Palette, HUD, captions and logo outro stay constant. |
| 12 | **Save tokens and effort:** reuse the toolkit (below), extend shared files instead of copying, and render only the changed frame ranges when fixing. |
| 14 | **Default style from EP01 story cut onward: 2D vector, NO 3D** (unless the owner asks for 3D again). Depth comes from 4–6 parallax planes, fog, foreground grass and fireflies, not from 3D models. |
| 15 | **Story, not lecture.** Visuals should play like an animated story with recurring characters (e.g. the cart কার্টু and the shopper মিতু), a setting, cause and effect, and a bookend, not a slideshow of charts. Numbers appear inside the story world. |
| 16 | **Everything on screen in Bangla**: HUD, signs, labels, credits. Only the CASE STUDIES logo itself stays English. |
| 17 | **The hook must be thoughtful and creative**: open on an intriguing story image that raises a question (EP01: a cart that has waited 47 days), not on a title card. |
| 18 | When the owner supplies the voice-over first, **author the timeline directly on the voice clock** (`V(t)` in EP01 `src/core.js`); measure line onsets with ASR first. |
| 13 | Never invent statistics. Illustrative numbers (example prices etc.) are fine only if labelled as such in `docs/`. Facts come from the brief. |

## 3. Episode folder layout
```
case-studies/epNN-slug/
├── README.md            summary, deliverable, rebuild commands, facts used
├── docs/                script.md (captions + timings + original brief) · storyboard.md · vo-script-elevenlabs.md
├── src/                 index.html · core.js (bar grid, bg, HUD, VO warp) · art.js · 3d.js · scenes*.js
├── docs/claims-ledger.md  every spoken/on-screen claim with its type and source (skill rule)
├── audio/               build_audio.py · cues.json · vo/ (supplied voice) · epNN_mix.m4a
└── renders/             final MP4 (+ poster.jpg)
```
Copy the closest previous episode rather than starting from the template: **EP01 (story cut) for 2D story videos with a supplied voice-over**, EP02 for explainer/3D.

## 4. Toolkit (in `/_common/toolkit`)
| file | use |
|---|---|
| `render.mjs` | HTML → MP4, frame-exact. `--stills "t1,t2"` for contact sheets, `--cues` to dump sound cues, `--frames dir` + `--from/--to` to re-render only a range, `--encode-only` to re-encode. |
| `stage.js` | `scene()`, `hIn()` (word-by-word Bangla-safe), `pop/out/shake/flash/counter`, captions `cap(t0,t1,'text *lime*')`, transitions `whip`, `zoomThru`, `iris`, `wipe`, icons. |
| `m3d.js` + `vendor/three.min.js` | 3D kit: `M3.onion({rot})`, `M3.human({...Bangladeshi wardrobe, pose, expr})`, `crate`, `ship`, `shed` (mud + tin roof), `land({field})` (terrain, grass, areca palms, hut), `crop()` (onion rows). `M3.sprite()` renders a model to PNG, `M3.plate()` renders a still scene, `M3.draw()` renders a live scene into a 2D canvas. |
| `audio/synth.py` | ~50 synthesized SFX (whoosh, pop, plop, impact, stamp, coin, rocket, buzz, horn, birds, smoke…), drums, bass, pads, mallet. |
| `audio/arrange.py` | bar-grid score from a chord chart; `starts=` for variable bar lengths (voice-synced); `place_cues()` for SFX. |
| `/_common/brand/` | colours, fonts (Anek Bangla, Hind Siliguri, Unbounded), BAUBC mark (`baubc-mark.js`, SVGs, official PNG). |

## 5. Workflow that works
1. **Script:** tighten the brief into ~2.5 words/sec caption lines; write `docs/script.md`. Offer the owner a VO version with **ElevenLabs v3 audio tags** (`[curious]`, `[serious]`, `[shocked]`, `[pause]`…) before each line (see EP02 `docs/vo-script-elevenlabs.md`).
2. **Plan:** a chapter per beat on a 100 BPM grid (1 bar = 2.4 s); cuts on bar lines; storyboard in `docs/storyboard.md`.
3. **Build** scenes with `stage.js`; everything must be a pure function of time (`window.__seek(t)`); no `Math.random`, use `rnd(i)`.
4. **Check** with contact sheets (`--stills`), read them, fix, repeat. Look specifically for: things visible before they should be (GSAP `fromTo` renders its from-state immediately; use `immediateRender:false` for later tweens), clipped text, overlaps with the caption band (y 1352–1580), and empty areas.
5. **Voice-over supplied?** Get line onsets with `faster-whisper` (medium model, `language="bn"`, word timestamps; decode with ffmpeg to f32 first) plus `ffmpeg silencedetect`. Pin each caption start to its line in `core.js` (`VO_ON`, piecewise time-warp); cues and music bars follow automatically (chapter `mark` cues).
6. **Audio:** `render.mjs --cues`, then `python3 audio/build_audio.py` (music ducks ~10 dB under the voice). Target ≈ -14 to -15 LUFS integrated, peak ≤ -1 dBFS.
7. **Render** to a frames dir in the scratchpad, review frames across the whole timeline, patch-render ranges, `--encode-only` with the mix, ffprobe the result.
8. Update the episode README, the `case-studies/README.md` table and the root README tree; commit and push.

## 6. Known pitfalls in this environment
- Live WebGL canvases can't be screenshotted headless. Render off-DOM and `drawImage` into a 2D canvas (`M3.draw`). Cost is ~0.5–1 s/frame for a full 3D scene, so use live 3D only for hero shots and pre-render everything else as sprites or plates. Cache a scene's last render when its state is static.
- three r149: set `THREE.ColorManagement.legacyMode = false` (done in `m3d.js`) or hex colours wash out.
- Bangla text: never split by character (conjuncts break); animate by word.
- The background render command should write to a log; poll the log with an until-loop, never sleep blindly.

## 7. Rendering cost and local rendering
Rendering itself uses the machine's CPU, not Claude tokens; tokens are spent on writing code, running commands and reading preview sheets. The owner can render any episode free on their own PC: see [`/RENDER-LOCALLY.md`](../RENDER-LOCALLY.md) (`npm run ep01`). Keep `package.json` scripts updated for each new episode and always commit the final `audio/epNN_mix.m4a` so local renders need no Python.

## 8. Owner's style references so far
- EP01: neon / UI explainer, lime on ink black.
- EP02: Kurzgesagt-style flat explainer + **Zack D Films-style 3D models** (glossy, stylised-realistic), slower pacing to match a calm ElevenLabs narrator ("Dr Mahmood – Calm Telecasting Host").
- EP01 story cut: "no 3D", "more like a story/animation than an explainer", "everything Bangla", "ultra creative hook", "have depth".
- Logo v2 feedback: wanted *more dynamic camera, more fog, more smoke*.
