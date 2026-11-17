# Case Studies · EP03 — নবান্নের হিসাব: পহেলা বৈশাখ কি আসল নববর্ষ?

> Nabanna (অগ্রহায়ণ — "first paddy") was Bengal's original new year; in 1584 Akbar moved the year's start to Boishakh for tax collection. Then rice mills (833× the cost of a ঢেঁকি) changed how we eat rice, aromatic local varieties stayed unpromoted, and in 2026 the farmer sells paddy at ৳35/kg at a loss while traders sell rice at ৳49/kg.

| | |
|---|---|
| Deliverable | [`renders/BAUBC_CaseStudies_EP03_Nabanna_1080x1920_60fps.mp4`](renders/) |
| Format | 1080×1920 · 60 fps · ~133 s · H.264 + AAC |
| Style | 2D cartoon motion design, warm palette (crimson, gold, paddy-yellow, indigo dusk); BAUBC lime only as accent |
| Voice | ElevenLabs "Maya – South Asian Female" (`audio/vo/original_maya.mp3`); the active voice is always `audio/vo/voice.mp3` |
| Subtitles | automatic: every line in `src/lines.js` is split into ≤ 34-character chunks and timed by character share |

## Replace the voice-over (one command)

```bash
python3 case-studies/ep03/audio/swap_voice.py path/to/new_voice.mp3
```

That's all. It copies the file in as `audio/vo/voice.mp3`, finds every line in it, re-times **all** animation, subtitles, sound effects and music to the new voice, rebuilds the stems and renders the video. Add `--no-render` to only rebuild audio and timings.

Rules for the new recording: the same 18 lines in the same order as `src/lines.js`, with a short pause between lines (ElevenLabs does this naturally). The script prints a table of where it found each line; if one is off, edit its `[start, end]` in `src/vo_timing.js` and run the command again without a file.

Changing the **words** too? Edit `say` (spoken) and `cap` (subtitle) in `src/lines.js` first. Keep 18 lines; scenes reference words like `W(14, 'পঁয়ত্রিশ')`, so if you rename a word that a scene uses, the console names it and that one hit falls back to the line's start.

## Stems (`audio/stems/`)

| file | what |
|---|---|
| `voice.wav` | voice only, placed on the video clock |
| `music.wav` | music only, full level |
| `music_ducked.wav` | music as used in the mix (dips under the voice) |
| `sfx.wav` | sound effects only |
| `mix.wav` · `../ep03_mix.m4a` | final mix |

All stems are the full video length and start at 0:00, so they line up in any editor.

## Files

| path | |
|---|---|
| `src/lines.js` | the script (single source of truth) |
| `src/vo_timing.js` | generated: where each line sits in the voice file |
| `src/core.js` | voice clock (`S(i)`, `Z(i)`, `W(i,'word')`), palette, HUD, auto-subtitles |
| `src/art.js` | cartoon kit: characters (farmer, woman in saree, emperor, mill owner, scientist…) with poses, blinking, talking, walking; ~30 props |
| `src/scenes*.js` | 8 chapters + logo |
| `audio/voice_sync.py` · `audio/build_audio.py` · `audio/swap_voice.py` | line finder · stems & mix · one-command swap |
| `docs/claims-ledger.md` | every claim and its status |

Render on your own PC: `npm run ep03` (see `/RENDER-LOCALLY.md`).
