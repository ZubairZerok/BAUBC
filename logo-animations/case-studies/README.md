# CASE STUDIES — series logo + animation

| file | what |
|---|---|
| `src/logo.js` | **v2 (current)**: the logo with the **BAUBC mark as the "A"**, a 3D camera, volumetric rays, fog and smoke. `buildCaseStudiesLogo(stage, {width, cy})` → `{ timeline, cues, draw(t), sub, top, bottom }`; it fills the whole stage. |
| `src/logo-v1.js` | v1: typographic Λ, flat (used by EP01, kept so EP01 rebuilds identically) |
| `src/index.html` | standalone 7.5 s sting (1080×1920, 60 fps) |
| `audio/build_audio.py` | sting sound design (fog riser → piece whooshes → impact + smoke → letter thuds → lock; dark Bm9 pad resolving to D major) |
| `renders/` | `CaseStudies_LogoAnimation_1080x1920_60fps.mp4`, static PNGs |

## v2 animation beats (local time)

| t | beat |
|---|---|
| 0.0–1.3 | Camera flies forward through fog banks (heavy front fog). The six pieces of the BAUBC mark shoot in from deep Z with spin, each landing with a smoke puff and a tick. |
| 1.32 | **Impact**: the mark is whole, giant and centred. Shockwave ring, lime bloom, radial smoke burst, light rays switch on. |
| 1.6–2.7 | The camera pulls back and swings round (rotateY 34° → −12°) while the mark settles into its slot as the A. C, S and E drop out of the camera into place with smoke, STUDIES flips up from below, and the lime D arrives last at speed with its trail. |
| 3.4 | **Lock**: elastic settle, light sweep. Then a slow orbit and dolly-in with drifting fog, embers rising and rays breathing. |

## Logo design notes (both versions)
Two justified rows of Unbounded 900 cream caps. Lime accents are the A-mark, **E** and **D**, and the letter that trails each lime glyph keeps a striped lime speed-smear inside its own shape (C, U). v1 fixed the reference image's problems: the unreadable "A", the C eaten by the trail, blurry edges, uneven rows, and the stray fade on the E. v2 swaps the typographic Λ for the club's own mark, traced to vector in `_common/brand/baubc-mark.js`.

## Render

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --cues audio/cues.json
```

```bash
python3 audio/build_audio.py
```

```bash
node ../../_common/toolkit/render.mjs --html src/index.html --audio audio/build/logo_mix.wav --out renders/CaseStudies_LogoAnimation_1080x1920_60fps.mp4
```
