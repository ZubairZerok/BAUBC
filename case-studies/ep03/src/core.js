/* EP03 v2 core — the whole timeline is driven by src/vo_timing.js (made by audio/voice_sync.py).
 * Swap the voice-over → re-run voice_sync → every scene, caption and sound re-times itself.
 *   S(i)      video time when line i starts         Z(i) when it ends
 *   W(i,'w')  video time when word 'w' of line i is spoken (estimated from its character position)
 *   F(i, f)   a fraction f (0..1) through line i */
const VO_OFF = 0.35;                                   // the voice starts this long after frame 0
const VL = VO_TIMING.lines, VS = [];
// video clock: each line keeps its natural pause from the recording, plus its `hold` from lines.js
VL.forEach(([a], i) => { VS[i] = i ? VS[i - 1] + (VL[i - 1][1] - VL[i - 1][0]) + Math.max(.3, a - VL[i - 1][1]) + (LINES[i - 1].hold || 0) : VO_OFF; });
const S = i => VS[i], Z = i => VS[i] + VL[i][1] - VL[i][0], F = (i, f) => S(i) + (Z(i) - S(i)) * f;
VL.forEach(([a, b], i) => sfx(S(i), 'vo', { i, a, b }));   // build_audio.py places each voice line here
const W = (i, w, after = 0) => { const s = LINES[i].say, k = s.indexOf(w); if (k < 0) { console.error('word not in line', i, w); return S(i); }
  const clean = x => x.replace(/[\s.,!?—…‘’'\-।:;]/g, '').length; return F(i, clean(s.slice(0, k + (after ? w.length : 0))) / clean(s)); };
const LOGO_AT = Z(LINES.length - 1) + 2.2;
const T = { c0: 0, c1: S(2) - .3, c2: S(5) - .3, c3: S(7) - .3, c4: S(11) - .3, c5: S(14) - .3, c6: LOGO_AT, end: LOGO_AT + 7.2 };
const CHAPS = [['০১', 'প্রবাদ'], ['০২', 'নতুন অন্ন'], ['০৩', 'অটো মিল'], ['০৪', 'সাদা চাল'], ['০৫', 'ল্যাবের সত্যি'], ['০৬', 'আসল দিন']];
const BOUNDS = [T.c0, T.c1, T.c2, T.c3, T.c4, T.c5, T.c6];
Object.keys(T).forEach((k, i) => { if (k !== 'end') sfx(T[k], 'mark', { p: i }); });

/* Kurzgesagt-style palette: deep navy world, lime / gold / orange light, red for the bad guys */
const P = { n0: '#070e2a', n1: '#0e1a44', n2: '#18295e', n3: '#24397a', n4: '#35519c', n5: '#5a78c4', lime: '#b8f53c', limeD: '#5f9e1a', gold: '#ffc93c', goldD: '#cf8a10',
  orange: '#ff8a3d', red: '#ef4b3f', redD: '#a3262c', cream: '#fff4dc', white: '#fbf8ef', bran: '#b5532f' };
const bg = $('#bg'), g = bg.getContext('2d'), fx = $('#fx').getContext('2d');
const MOTE = Array.from({ length: 50 }, (_, i) => ({ x: rnd(i) * 1080, y: 200 + rnd(i + 99) * 1500, z: .35 + rnd(i + 7) * .65, ph: rnd(i + 3) * 6.28, c: i % 3 }));
const MC = ['184,245,60', '255,201,60', '255,170,90'];
function drawBg(t) {
  const q0 = g.createLinearGradient(0, 0, 0, 1920); q0.addColorStop(0, '#fbe9cc'); q0.addColorStop(1, '#e8b47a'); g.fillStyle = q0; g.fillRect(0, 0, 1080, 1920);   // warm daylight base
  const f = fx; f.clearRect(0, 0, 1080, 1920);
  if (mood.red > 0) { const q = f.createRadialGradient(540, 900, 200, 540, 900, 1300); q.addColorStop(0, `rgba(255,60,40,${.05 * mood.red})`); q.addColorStop(1, `rgba(190,25,35,${.45 * mood.red})`); f.fillStyle = q; f.fillRect(0, 0, 1080, 1920); }
  for (const p of MOTE) {   // lime / gold light motes drifting in front of every scene (Kurzgesagt "dust")
    const x = p.x + Math.sin(t * .3 * p.z + p.ph) * 60, y = ((p.y - t * 18 * p.z) % 1700 + 1700) % 1700 + 120, a = (.2 + .6 * Math.max(0, Math.sin(t * 1.1 * p.z + p.ph * 3))) * p.z * mood.energy * (1 - mood.dim), r = 1.5 + p.z * 2.5;
    const q = f.createRadialGradient(x, y, 0, x, y, r * 4); q.addColorStop(0, `rgba(${MC[p.c]},${.5 * a})`); q.addColorStop(1, `rgba(${MC[p.c]},0)`); f.fillStyle = q; f.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
  }
}
(() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * .37) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); $('#grain').style.backgroundImage = `url(${c.toDataURL()})`; })();
function drawHud(t) {   // no on-screen header (owner rule: no progress bar, logo, chapter name)
  $('#grain').style.backgroundPosition = `${Math.floor(rnd(Math.floor(t * 30)) * 256)}px ${Math.floor(rnd(Math.floor(t * 30) + 5) * 256)}px`;
}
/** multiplane world: W.plane(parallax); tween W.cam {x,y,z}; W.aim(X,Y,zoom,sx,sy) puts world point X,Y at screen sx,sy */
function world(c, ox = 540, oy = 960) {
  const cam = { x: 0, y: 0, z: 1 }, planes = [];
  binds.push(() => planes.forEach(([el, p]) => { el.style.transform = `translate(${-cam.x * p}px,${-cam.y * p}px) scale(${1 + (cam.z - 1) * p})`; }));
  const aim = (X, Y, z = 1, sx = 540, sy = 960) => ({ x: ox + (X - ox) * z - sx, y: oy + (Y - oy) * z - sy, z });
  return { cam, aim, plane: (p, css) => { const el = E(c, 'a', '', Object.assign({ left: 0, top: 0, width: 1080, height: 1920, transformOrigin: `${ox}px ${oy}px` }, css)); planes.push([el, p]); return el; } };
}
/** subtitles: every line's caption text is split into ≤ 34-char chunks, timed by character share — automatic for any voice */
function autoCaps() {
  LINES.forEach((L, i) => {
    const words = L.cap.split(/\s+/), chunks = []; let cur = '';
    const vis = s => s.replace(/\*/g, '').length;
    words.forEach(w => { if (cur && vis(cur + ' ' + w) > 34) { chunks.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; if (/[,—…।!?]$/.test(w) && vis(cur) > 18) { chunks.push(cur); cur = ''; } });
    if (cur) { if (chunks.length && vis(cur) < 9) chunks[chunks.length - 1] += ' ' + cur; else chunks.push(cur); }
    let open = false; const fixed = chunks.map(c => { let s = (open ? '*' : '') + c; const n = (c.match(/\*/g) || []).length; if ((n + (open ? 1 : 0)) % 2) { s += '*'; open = true; } else open = false; return s; });
    const tot = fixed.reduce((a, c) => a + vis(c), 0); let acc = 0;
    fixed.forEach(c => { const a = F(i, acc / tot); acc += vis(c); const b = Math.min(F(i, acc / tot), Z(i)) - .05; cap(a, Math.max(b, a + .6), c); });
  });
}
autoCaps();
stageInit(T.end, drawBg, drawHud, drawCaps);
