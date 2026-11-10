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

- `logo/` — **drop the official club logo files here** (SVG + PNG, light & dark). Compositions currently use a typographic `BAUBC` chip so nothing unofficial is passed off as the club mark.
- Series logos live with their animations in [`/logo-animations`](../../logo-animations/); static exports are copied to `logo/series/`.
