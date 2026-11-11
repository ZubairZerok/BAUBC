/* EP02 core — bar grid, sky background, HUD. Shared helpers come from _common/toolkit/stage.js. */
const T = { s0: 0, s1: 7.2, s2: 16.8, s3: 26.4, s4: 36, s5: 45.6, s6: 55.2, s7: 62.4, end: 69.6 };
const CHAPS = [['০১', 'ধাঁধা'], ['০২', 'উৎপাদন'], ['০৩', 'পচন'], ['০৪', 'আমদানি'], ['০৫', 'হাত বদল'], ['০৬', 'আসল সংকট'], ['০৭', 'আপনার পালা']];
const BOUNDS = [T.s0, T.s1, T.s2, T.s3, T.s4, T.s5, T.s6, T.s7];

/* sky: deep green gradient, drifting light, twinkling dust — scenes paint their own illustration on top */
const bg = $('#bg'), g = bg.getContext('2d'), fx = $('#fx').getContext('2d');
const DUST = Array.from({ length: 80 }, (_, i) => ({ x: rnd(i) * 1080, y: rnd(i + 99) * 1920, z: 0.3 + rnd(i + 7) * 0.7, ph: rnd(i + 3) * 6.28 }));
const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
function drawBg(t) {
  const r = mood.red, w = mood.gold;
  let top = mix([12, 66, 50], [70, 18, 14], r), bot = mix([3, 20, 15], [24, 5, 4], r);
  top = mix(top, [70, 60, 18], w);
  const gr = g.createLinearGradient(0, 0, 0, 1920); gr.addColorStop(0, `rgb(${top})`); gr.addColorStop(1, `rgb(${bot})`);
  g.fillStyle = gr; g.fillRect(0, 0, 1080, 1920);
  const orb = (x, y, rad, a, c) => { const q = g.createRadialGradient(x, y, 0, x, y, rad); q.addColorStop(0, `rgba(${c},${a})`); q.addColorStop(1, `rgba(${c},0)`); g.fillStyle = q; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
  orb(540 + Math.sin(t * 0.21) * 300, 560 + Math.cos(t * 0.17) * 200, 800, 0.12, r > 0.3 ? '255,90,60' : '198,255,31');
  orb(200 + Math.cos(t * 0.13) * 160, 1500, 600, 0.07, '47,211,181');
  const f = fx; f.clearRect(0, 0, 1080, 1920);
  if (r > 0) { const q = f.createRadialGradient(540, 900, 200, 540, 900, 1300); q.addColorStop(0, `rgba(255,60,40,${0.06 * r})`); q.addColorStop(1, `rgba(255,40,30,${0.42 * r})`); f.fillStyle = q; f.fillRect(0, 0, 1080, 1920); }
  for (const p of DUST) {
    const y = ((p.y - t * 18 * p.z) % 1920 + 1920) % 1920, x = p.x + Math.sin(t * 0.4 + p.ph) * 18;
    f.globalAlpha = (0.2 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2 * p.z + p.ph))) * p.z * (1 - mood.dim); f.fillStyle = p.z > 0.8 ? '#efe9dc' : '#c6ff1f';
    f.beginPath(); f.arc(x, y, 1 + p.z * 2.4, 0, 6.283); f.fill();
  }
  f.globalAlpha = 1;
  if (mood.dim > 0) { g.fillStyle = `rgba(2,8,6,${mood.dim})`; g.fillRect(0, 0, 1080, 1920); }
}
(() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * 0.37) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); $('#grain').style.backgroundImage = `url(${c.toDataURL()})`; })();

/* HUD */
$('#hudL b').innerHTML = baubcMarkSVG(26, '#0a0c06');
const segEls = CHAPS.map(() => E($('#segs'), '', '<i></i>').firstChild);
function drawHud(t) {
  let ci = 0; for (let i = 0; i < CHAPS.length; i++) if (t >= BOUNDS[i]) ci = i;
  segEls.forEach((s, i) => { s.style.transform = `scaleX(${Math.max(0, Math.min(1, (t - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i])))})`; });
  $('#chapNo').textContent = CHAPS[ci][0]; $('#chapName').textContent = CHAPS[ci][1];
  $('#grain').style.backgroundPosition = `${Math.floor(rnd(Math.floor(t * 30)) * 256)}px ${Math.floor(rnd(Math.floor(t * 30) + 5) * 256)}px`;
}
const onionURI = "url('data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="84" height="92" viewBox="0 0 84 92"><defs><radialGradient id="a" cx=".36" cy=".42" r=".8"><stop offset="0" stop-color="#ffa3d0"/><stop offset=".4" stop-color="#d4418f"/><stop offset="1" stop-color="#5e1642"/></radialGradient></defs><path d="M42 12 C24 20 6 36 8 58 C10 78 26 88 42 88 C58 88 74 78 76 58 C78 36 60 20 42 12Z" fill="url(#a)"/><ellipse cx="27" cy="46" rx="6" ry="12" fill="#fff" opacity=".3" transform="rotate(22 27 46)"/></svg>`) + "')";
stageInit(T.end, drawBg, drawHud, drawCaps);

/* ───── voice-over sync: piecewise-linear time-warp (video time → composition time) ─────
 * VO_ON = onsets of the 19 voice lines in the ElevenLabs file (measured by ASR + silence detection).
 * The VO plays from VO_OFF s into the file at video t=0; each caption's start is pinned 0.1 s before its line. */
const VO_OFF = 1.2, VO_END = 99.51, VO_ON = [1.42, 5.67, 9.32, 13.52, 16.66, 21.21, 24.0, 31.11, 36.53, 41.32, 48.49, 55.08, 62.25, 68.63, 74.73, 78.90, 84.78, 89.62, 93.55];
const LOGO_AT = VO_END - VO_OFF + 0.25, DURATION = LOGO_AT + (T.end - T.s7);
let WARP = null;
const warpBuild = () => { WARP = [[0, 0], ...VO_ON.map((v, i) => [v - VO_OFF - 0.1, CAPS[i].t0]), [LOGO_AT, T.s7], [DURATION, T.end]]; };
const pw = (x, A, a, b) => { if (!WARP) warpBuild(); for (let i = 1; i < WARP.length; i++) if (x <= WARP[i][a] || i === WARP.length - 1) { const [p, q] = [WARP[i - 1], WARP[i]]; return p[b] + (q[b] - p[b]) * (x - p[a]) / (q[a] - p[a]); } };
const warp = n => pw(n, 0, 0, 1), unwarp = o => pw(o, 0, 1, 0);
Object.keys(T).forEach((k, i) => { if (k !== 'end') sfx(T[k], 'mark', { p: i }); });
{ const seek0 = window.__seek; window.__seek = n => seek0(warp(n)); window.__duration = DURATION;
  Object.defineProperty(window, '__cues', { configurable: true, get: () => cues.map(c => Object.assign({}, c, { t: +unwarp(c.t).toFixed(3) }, c.d ? { d: +(unwarp(c.t + c.d) - unwarp(c.t)).toFixed(3) } : {})) }); }
