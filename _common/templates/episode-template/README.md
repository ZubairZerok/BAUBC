# Episode template

Copy this folder to `<series>/epNN-short-slug/`, then:

1. Fill `docs/brief.md` (concept, hook, beats, CTA) and write the Bangla caption script.
2. Build scenes in `src/index.html` (keep the `__ready / __duration / __seek / __cues` contract).
3. Dump cues → write `audio/build_audio.py` (see `case-studies/ep01-cart-abandonment/audio/` for a full example).
4. Render with `_common/toolkit/render.mjs` into `renders/`.
