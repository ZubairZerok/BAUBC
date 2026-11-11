# Render a video on your own PC

Rendering on your PC is free: it uses your computer, not Claude. It only needs to be set up once.

## One-time setup

1. Install **Node.js** (LTS) from nodejs.org.
2. Install **ffmpeg**:
   - Windows: open PowerShell and run `winget install Gyan.FFmpeg`, then close and reopen PowerShell.
   - Mac: `brew install ffmpeg`
3. Download this repo (green **Code** button on GitHub → **Download ZIP**, then unzip), or `git clone` it.
4. Open a terminal **inside the repo folder** and run these two commands:

```bash
npm install
```

```bash
npx playwright install chromium
```

## Render

```bash
npm run ep01
```

That's it. The finished file appears at `case-studies/ep01-cart-abandonment/renders/local-render.mp4` (1080×1920, 60 fps, with sound).
It takes roughly 10–25 minutes depending on your PC. You will see a progress line like `1200/7506 frames`.

| command | renders |
|---|---|
| `npm run ep01` | Case Studies EP01 — কার্টুর গল্প |
| `npm run ep02` | Case Studies EP02 — পেঁয়াজের ধাঁধা (slower: it has 3D scenes) |
| `npm run logo` | CASE STUDIES logo animation (no sound) |

## Useful extras

- **Only a part** (for example seconds 10 to 20), handy for checking a change:

```bash
npm run ep01 -- --from 10 --to 20
```

- **Preview pictures** instead of a video (frames at 3 s, 12 s and 45 s):

```bash
npm run render -- --html case-studies/ep01-cart-abandonment/src/index.html --stills "3,12,45" --stilldir preview
```

- **Smaller or sharper file:** add `-- --crf 24` (smaller) or `-- --crf 17` (sharper) after the command.
- **Slow PC?** add `-- --workers 2`.

## If you change the sound

The commands above use the finished sound mix stored in each episode's `audio/` folder. Rebuilding the mix (new voice-over, new music) also needs Python 3 with `pip install numpy scipy`, then follow the three commands in that episode's `README.md`.

## Problems

| message | fix |
|---|---|
| `ffmpeg` not found | ffmpeg isn't installed or the terminal wasn't reopened after installing |
| `Cannot find module 'playwright'` | run `npm install` inside the repo folder |
| `Executable doesn't exist` | run `npx playwright install chromium` |
