# BAUBC motion brand

**Club:** Bangladesh Agricultural University Business Club (BAUBC) — see [`club-info.md`](club-info.md).

## Colour (`brand.css` / `brand.json`)

| token | hex | use |
|---|---|---|
| `--ink` | `#070806` | stage black |
| `--ink-3` | `#1a1f13` | cards / raised surfaces |
| `--cream` | `#efe9dc` | primary type |
| `--lime` | `#c6ff1f` | series accent, highlights, CTAs |
| `--danger` | `#ff3d2e` | "bad news" beats (surprise costs, drop-offs) |
| `--gold` | `#ffc83d` | reviews / ratings |

## Type (all OFL, self-hosted in `fonts/`)

| family | role |
|---|---|
| **Anek Bangla** 800 | Bangla display — headlines, big numbers |
| **Hind Siliguri** 500–700 | Bangla body — captions, UI text |
| **Unbounded** 500–900 | Latin display — logos, HUD labels, ghost type |

Never split Bangla text per character for animation (it breaks conjuncts) — animate by word.

## Logos

- `logo/baubc-logo-official-white.png` — the official club mark as supplied (white).
- `logo/baubc-mark-lime.svg`, `logo/baubc-mark-white.svg` — vector trace of the mark (6 pieces). Code access: `baubc-mark.js` → `BAUBC_MARK.pieces`, `baubcMarkSVG(size, color)`. Used in the HUD chip from EP02 and as the "A" of the CASE STUDIES logo v2.
- Series logos live with their animations in [`/logo-animations`](../../logo-animations/); static exports are copied to `logo/series/`.
