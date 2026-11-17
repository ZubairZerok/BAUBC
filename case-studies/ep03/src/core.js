/* EP03 core — the whole timeline is driven by src/vo_timing.js (made by audio/voice_sync.py).
 * Swap the voice-over → re-run voice_sync → every scene, caption and sound re-times itself.
 *   S(i)      video time when line i starts         Z(i) when it ends
 *   W(i,'w')  video time when word 'w' of line i is spoken (estimated from its character position)
 *   F(i, f)   a fraction f (0..1) through line i */
const VO_OFF = 0.35;                                   // the voice starts this long after frame 0
const VL = VO_TIMING.lines, S = i => VL[i][0] + VO_OFF, Z = i => VL[i][1] + VO_OFF, F = (i, f) => S(i) + (Z(i) - S(i)) * f;
const W = (i, w, after = 0) => { const s = LINES[i].say, k = s.indexOf(w); if (k < 0) { console.error('word not in line', i, w); return S(i); }
  const clean = x => x.replace(/[\s.,!?—…‘’'\-।:;]/g, '').length; return F(i, clean(s.slice(0, k + (after ? w.length : 0))) / clean(s)); };
const LOGO_AT = Z(LINES.length - 1) + .45;
const T = { c0: 0, c1: S(2) - .3, c2: S(4) - .3, c3: S(6) - .3, c4: S(10) - .3, c5: S(11) - .3, c6: S(13) - .3, c7: S(16) - .3, c8: LOGO_AT, end: LOGO_AT + 7.2 };
const CHAPS = [['০১', 'নববর্ষ?'], ['০২', 'নবান্ন'], ['০৩', 'আকবরের খাতা'], ['০৪', 'ঢেঁকি বনাম মিল'], ['০৫', 'সাদা চাল'], ['০৬', 'সুগন্ধ'], ['০৭', '২০২৬'], ['০৮', 'কার পকেটে?']];
const BOUNDS = [T.c0, T.c1, T.c2, T.c3, T.c4, T.c5, T.c6, T.c7, T.c8];
Object.keys(T).forEach((k, i) => { if (k !== 'end') sfx(T[k], 'mark', { p: i }); });

/* warm palette (BAUBC lime only as an accent) */
const P = { ink: '#1a0f1f', plum: '#3b1d3f', wine: '#7a1f3a', crim: '#b8283f', gold: '#f2b632', saffron: '#ff9a2e', paddy: '#e8c547', cream: '#fbf1dc', teal: '#2a8f8a', sky: '#7fd3d8', leaf: '#3f8f3a', mud: '#8a5a34', lime: '#c6ff1f' };
const bg = $('#bg'), g = bg.getContext('2d'), fx = $('#fx').getContext('2d');
const MOTE = Array.from({ length: 46 }, (_, i) => ({ x: rnd(i) * 1080, y: 200 + rnd(i + 99) * 1500, z: .35 + rnd(i + 7) * .65, ph: rnd(i + 3) * 6.28 }));
function drawBg(t) {
  g.fillStyle = P.ink; g.fillRect(0, 0, 1080, 1920);
  const f = fx; f.clearRect(0, 0, 1080, 1920);
  if (mood.red > 0) { const q = f.createRadialGradient(540, 900, 200, 540, 900, 1300); q.addColorStop(0, `rgba(255,60,40,${.05 * mood.red})`); q.addColorStop(1, `rgba(200,30,30,${.42 * mood.red})`); f.fillStyle = q; f.fillRect(0, 0, 1080, 1920); }
  for (const p of MOTE) {   // golden dust motes drifting in front of every scene
    const x = p.x + Math.sin(t * .3 * p.z + p.ph) * 60, y = ((p.y - t * 16 * p.z) % 1700 + 1700) % 1700 + 120, a = (.2 + .6 * Math.max(0, Math.sin(t * 1.1 * p.z + p.ph * 3))) * p.z * mood.energy * (1 - mood.dim), r = 1.5 + p.z * 2.5;
    const q = f.createRadialGradient(x, y, 0, x, y, r * 4); q.addColorStop(0, `rgba(255,214,120,${.5 * a})`); q.addColorStop(1, 'rgba(255,190,90,0)'); f.fillStyle = q; f.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
  }
}
(() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * .37) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); $('#grain').style.backgroundImage = `url(${c.toDataURL()})`; })();
$('#hudL b').innerHTML = baubcMarkSVG(30, '#0a0c06');
const segEls = CHAPS.map(() => E($('#segs'), '', '<i></i>').firstChild);
function drawHud(t) {
  let ci = 0; for (let i = 0; i < CHAPS.length; i++) if (t >= BOUNDS[i]) ci = i;
  segEls.forEach((s, i) => { s.style.transform = `scaleX(${Math.max(0, Math.min(1, (t - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i])))})`; });
  $('#chapNo').textContent = CHAPS[ci][0]; $('#chapName').textContent = CHAPS[ci][1];
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
