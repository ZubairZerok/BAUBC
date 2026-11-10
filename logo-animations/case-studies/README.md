# CASE STUDIES — series logo + animation

| file | what |
|---|---|
| `src/logo.js` | the logo, built as live vector/type + its GSAP animation — `buildCaseStudiesLogo(parent, {width})` → `{ timeline, cues, height }`. Episodes import this for their outro. |
| `src/index.html` | standalone 6 s sting (1080×1920, 60 fps) |
| `audio/build_audio.py` | the sting's sound design |
| `renders/` | `CaseStudies_LogoAnimation_1080x1920_60fps.mp4`, static PNGs (on black + transparent) |

## Design — what was kept from the reference, what was fixed

**Kept:** two justified rows of ultra-wide heavy caps, cream on black, lime accent letters (the A-mark, **E**, **D**), speed-trail motif, arrows converging on a point.

**Fixed:**
1. **The "A" was unreadable** (a 3-arrow icon stood in for it, so it read "C✳SE"). Now the A is a lime **Λ arrowhead** with a small inner arrow as its counter — still "arrows pointing at the case", but it reads **CASE** instantly.
2. **The C was eaten by the trail.** Trails no longer overlap and erase letters: the neighbouring letter stays whole and only carries a striped lime speed-smear *inside* its own shape.
3. **Blurry / smeared edges** → everything is live vector type (Unbounded 900), razor sharp at any size.
4. **Uneven rows** → both rows are measured and fitted to exactly the same width; cap-heights and the row gap are computed, not eyeballed.
5. **The stray fade on the right of E** (it broke the block's right edge) → removed; E is a clean lime letter.
6. The converging arrows moved into the **animation**: three lime arrows fly in and collide at the case point, the impact gives birth to the Λ, CASE snaps around it, STUDIES rises, and the D arrives last at speed, leaving its trail.

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
