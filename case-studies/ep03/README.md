# Case Studies · EP03 — পুরান চাল ভাতে বাড়ে? (নবান্নের আসল হিসাব)

> "পুরান চাল ভাতে বাড়ে" is the proverb our grandmothers taught us, and the episode argues it is a business brain-wash. An auto rice mill costs 833× a village ঢেঁকি, so mills must sell all year. They polish off the nutritious red bran and store rice 3–4 months until its oil dries, so the cooked rice is fluffy and looks like more. Meanwhile new rice smells sweeter (দেশি কালোজিরা, গোবিন্দভোগ beat Basmati) and its stickiness is what makes payesh and pitha creamy. Nabanna should be the day we take that back.

| | |
|---|---|
| Deliverable | [`renders/BAUBC_CaseStudies_EP03_Nabanna_1080x1920_60fps.mp4`](renders/) |
| Format | 1080×1920 · 60 fps · ~126 s · H.264 + AAC |
| Style | ALL 2D Kurzgesagt-style (no 3D, no isometric): daylight scenes with godrays, a night-time cutaway auto rice mill with grains flowing through every machine, a cutaway whitener, a 2D brain-wash factory with a real brain, a wall of newspapers, top-view dishes using the owner's rice photo with vector garnish, a শীতল পাটি mat. No header/HUD. Deep-orange end logo with glowing white letters |
| Voice | owner-supplied recording (`audio/vo/original_v4.aac`); line 16 spliced to "তাই নবান্ন হলো মার্কেটিংয়ের ধোঁকা ভেঙে…". The active voice is always `audio/vo/voice.mp3` |
| Subtitles | automatic: every line in `src/lines.js` is split into chunks of up to 34 characters and timed by character share |
| v1 | the first EP03 ("নবান্নের হিসাব", Maya voice, 18 lines) is kept in [`archive-v1-maya/`](archive-v1-maya/) |

## Story (16 voice lines → 17 shots)

| ch | shots |
|---|---|
| ০১ প্রবাদ | Dadi's kitchen: the proverb in a speech bubble at frame 0, rice swelling out of the হাঁড়ি · dive into her head, where the proverb tumbles in a washing drum ("ব্রেইনওয়াশ!") · a 1000-year festival becomes a phone photoshoot, shrinks to a polaroid and is locked behind bars |
| ০২ নতুন অন্ন | the polaroid rewinds; the clock becomes a dawn sun · নবান্ন = নব (নতুন) + অন্ন (ভাত), then down to a plate of new aman rice · farmers bring paddy home, the অগ্রহায়ণ calendar lands, fireworks, and a new-rice grain is crowned on velvet ("লাক্সারি") · seesaw: new rice turns cheap, the crown hops to old rice (ভিআইপি) · "কেন?" |
| ০৩ অটো মিল | the mill rises out of the village · **833 dots drawn to scale** (49 × 17; one dot = one ঢেঁকি) · the owner at the centre of a 12-month ring: sell all year |
| ০৪ সাদা চাল | the polisher strips the red bran (vitamin B, fibre, minerals and oil fly off); a white, sad grain comes out · godown, 1–4 months tick by · the oil drops leave the grain · the pot: fluffy separate grains and a mound that only *looks* bigger · the proverb is funnelled into the head again (bookend) |
| ০৫ ল্যাবের সত্যি | the scientist's surprise · aroma plumes: Kalijira and Gobindobhog rise higher than Basmati, with medals (qualitative, no scale) · two new grains joined by a sticky strand → creamy payesh and pitha · old grains try, the strand snaps ✕ |
| ০৬ আসল দিন | an eraser wipes the best food off the plate as the mill looms · the saree photoshoot again ("✕ শুধু শাড়ির দিন নয়"), then the proverb billboard **shatters** into a sunrise paddy field, a family, and the crowned new-rice grain → CASE STUDIES logo |

## v4 changes (owner review, 21 Nov)
- New voice-over (owner's recording); line 16 now reads only "তাই নবান্ন হলো মার্কেটিংয়ের ধোঁকা ভেঙে আমাদের আসল স্বাদ আর পুষ্টি ফিরিয়ে আনার দিন!" (the "শুধু ঘোরার দিন নয়" part is cut from text and audio).
- Everything 2D: brain-wash factory with a real 2D brain (bleaches, shrinks, memories float away), night cutaway mill (paddy → cleaner → husker + boiler → polisher + bran cyclone → colour sorter → sacks), cutaway whitener, শীতল পাটি mat for the three bowls.
- Newspapers wall for "সিজনাল ফটোশুট"; godrays on every sun; dark-green নকশি কাঁথা background for ঢেঁকি vs মিল; dark mill-owner scene.
- Rice dishes use the owner's rice photo (`assets/rice_bowl.png`, cut out to PNG) with vector garnish.
- Logo: deeper orange, pure-white letters with a glowing outline.

## v3 changes (owner review)
- No header (progress bar, logo badge, chapter name) — a rule for every future reel.
- Holds after scene-ending lines (`hold` in `src/lines.js`): voice lines are cut from the recording and placed on the video clock, so every last beat lands before the cut.
- No whoosh/swish/sweep/zoom/iris sounds; new real-event sounds: fire, pour, drip, sizzle, eraser rub, shutter, rewind, snap, shatter.
- Saree cliché removed: line 2 now shows a city পিঠা উৎসব photo going on Facebook; line 16 says "তাই নবান্ন শুধু ঘোরার দিন নয়…" over a pitha-fair selfie crowd.
- Day backgrounds; deep-orange logo (`buildCaseStudiesLogo(c, { theme: 'orange' })`).

## Replace the voice-over (one command)

```bash
python3 case-studies/ep03/audio/swap_voice.py path/to/new_voice.mp3
```

That's it. The script:
1. Copies the file in as `audio/vo/voice.mp3`.
2. Finds every line in it.
3. Re-times **all** animation, subtitles, sound effects and music to the new voice.
4. Rebuilds the stems and renders the video.

Add `--no-render` to rebuild only the audio and timings.

Rules for the new recording:
- Record the same 16 lines in the same order as `src/lines.js` (the exact text is in `docs/script.md`).
- Leave a short pause between lines (ElevenLabs does this naturally).
- The ElevenLabs tags (`[shocked]`, `[warm]` …) are not spoken, so they don't matter.

The long line "এত টাকা তুলতে … বেশি দেখায়!" is split into three lines (8–10) in `src/lines.js`. The aligner looks for those pauses, and ElevenLabs puts them there anyway.

The script prints a table of where it found each line. If a line is off, edit its `[start, end]` in `src/vo_timing.js` and run the command again without a file.

## Stems (`audio/stems/`)

| file | what |
|---|---|
| `voice.wav` | voice only, placed on the video clock |
| `music.wav` | music only, full level |
| `music_ducked.wav` | music as used in the mix (dips under the voice) |
| `sfx.wav` | sound effects only |
| `mix.wav` · `../ep03_mix.m4a` | final mix (-14.9 LUFS) |

## Files

| path | |
|---|---|
| `src/lines.js` | the script (single source of truth) |
| `src/vo_timing.js` | generated: where each line sits in the voice file |
| `src/core.js` | voice clock (`S(i)`, `Z(i)`, `W(i,'word')`), navy palette, HUD, auto-subtitles |
| `src/art.js` · `src/art2.js` · `src/art3.js` · `src/art4.js` | characters (Dadi, farmers, the saree girl, the mill owner, the scientist) plus the Kurzgesagt-style kit: head profile, washing drum, phone, polaroid, crown, seesaw, polisher, godown, handi, aroma plumes, payesh, pitha, billboard shards, foreground strips |
| `src/scenes*.js` | 17 shots + logo |
| `audio/voice_sync.py` · `audio/build_audio.py` · `audio/swap_voice.py` | line finder · stems & mix · one-command swap |
| `docs/claims-ledger.md` · `docs/script.md` | every claim and its status · the script with its ElevenLabs tags |

Render on your own PC: `npm run ep03` (see `/RENDER-LOCALLY.md`).
