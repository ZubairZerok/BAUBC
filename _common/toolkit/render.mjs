#!/usr/bin/env node
// BAUBC render engine — deterministic HTML -> MP4.
// A composition is any HTML page exposing:
//   window.__ready    Promise resolved when fonts/assets are loaded
//   window.__duration seconds
//   window.__seek(t)  renders the exact frame at time t (no wall-clock animation!)
//   window.__cues     optional [{t,name,...}] sound cues (dumped with --cues)
//
// usage: node render.mjs --html <file> --out <mp4> [--fps 60] [--w 1080] [--h 1920]
//          [--workers 4] [--audio mix.wav] [--from s] [--to s] [--crf 16]
//          [--stills "1,2.5,10" --stilldir dir] [--cues cues.json] [--keep]
//          [--frames dir]   keep frames in dir (named by absolute frame number; omit --out to render frames only,
//                           so single ranges can be patched with --from/--to) · [--encode-only] encode what is in --frames
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const a = {}; const av = process.argv.slice(2);
for (let i = 0; i < av.length; i++) if (av[i].startsWith('--')) a[av[i].slice(2)] = (av[i + 1] && !av[i + 1].startsWith('--')) ? av[++i] : true;
const W = +(a.w || 1080), H = +(a.h || 1920), FPS = +(a.fps || 60), WORKERS = +(a.workers || Math.max(1, os.cpus().length));
const url = pathToFileURL(path.resolve(a.html)).href;

async function open(browser) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('[page error]', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('[console]', m.text()); });
  await page.goto(url, { timeout: 180000 });
  await page.evaluate(() => window.__ready);
  page.setDefaultTimeout(120000);
  return page;
}
const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb', '--enable-unsafe-swiftshader'] });
const p0 = await open(browser);
const duration = await p0.evaluate(() => window.__duration);

if (a.cues) { fs.writeFileSync(a.cues, JSON.stringify({ duration, cues: await p0.evaluate(() => window.__cues || []) }, null, 1)); console.log('cues ->', a.cues); }
if (a.stills) {
  fs.mkdirSync(a.stilldir || '.', { recursive: true });
  for (const s of String(a.stills).split(',')) {
    const t = +s; await p0.evaluate(t => { window.__seek(t); }, t);
    const f = path.join(a.stilldir || '.', `still_${t.toFixed(2).padStart(6, '0')}.jpg`);
    await p0.screenshot({ path: f, type: 'jpeg', quality: 88 });
  }
  console.log('stills done');
}
if (!a.out && !a.frames) { await browser.close(); process.exit(0); }

const from = +(a.from || 0), to = +(a.to || duration);
const f0 = Math.round(from * FPS), f1 = Math.round(to * FPS), total = f1 - f0;
const tmp = a.frames || fs.mkdtempSync(path.join(os.tmpdir(), 'baubc-frames-'));
fs.mkdirSync(tmp, { recursive: true });
let next = f0, done = 0; const t0 = Date.now();
async function worker(page) {
  for (;;) {
    const f = next++; if (f >= f1) break;
    await page.evaluate(t => { window.__seek(t); }, f / FPS);
    await page.screenshot({ path: path.join(tmp, `f_${String(f).padStart(6, '0')}.jpg`), type: 'jpeg', quality: 96 });
    if (++done % 120 === 0) { const el = (Date.now() - t0) / 1000; console.log(`${done}/${total} frames  ${(done / el).toFixed(1)} fps  eta ${((total - done) / (done / el)).toFixed(0)}s`); }
  }
}
if (!a['encode-only']) {
  const pages = [p0]; for (let i = 1; i < WORKERS; i++) pages.push(await open(browser));
  await Promise.all(pages.map(worker));
}
await browser.close();
if (!a.out) { console.log('frames ->', tmp); process.exit(0); }

fs.mkdirSync(path.dirname(path.resolve(a.out)), { recursive: true });
const ff = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-start_number', String(f0), '-i', path.join(tmp, 'f_%06d.jpg')];
if (a.audio) ff.push('-ss', String(from), '-i', a.audio);
ff.push('-frames:v', String(total), '-c:v', 'libx264', '-preset', 'slow', '-crf', String(a.crf || 16), '-pix_fmt', 'yuv420p', '-r', String(FPS),
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart');
if (a.audio) ff.push('-c:a', 'aac', '-b:a', '256k', '-shortest');
ff.push(a.out);
await new Promise((res, rej) => spawn('ffmpeg', ff, { stdio: ['ignore', 'ignore', 'ignore'] }).on('exit', c => c ? rej(new Error('ffmpeg ' + c)) : res()));
if (!a.keep && !a.frames) fs.rmSync(tmp, { recursive: true, force: true });
console.log('done ->', a.out, `(${total} frames @ ${FPS}fps, ${((Date.now() - t0) / 1000).toFixed(0)}s)`);
