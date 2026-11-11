/* EP01 (story cut) core — the timeline is authored directly on the voice-over clock.
 * V(t) converts a time in the ElevenLabs file to video time (the VO starts VO_OFF s into the video). */
const VO_OFF = 0.4, V = t => +(t + VO_OFF).toFixed(3);
const T = { s0: 0, s1: 8.6, s2: 23.6, s3: 40.1, s4: 55.4, s5: 73.9, s6: 82.7, s7: 93.0, s8: 105.6, s9: 117.9, end: 125.1 };
const CHAPS = [['০১', 'হারানো কার্ট'], ['০২', 'সেই মুহূর্ত'], ['০৩', 'রহস্য'], ['০৪', 'সংখ্যা'], ['০৫', 'আসল কারণ'], ['০৬', 'রিভিউ'], ['০৭', '৩ ফ্যাক্টর'], ['০৮', 'লেসন'], ['০৯', 'আপনার পালা']];
const BOUNDS = [T.s0, T.s1, T.s2, T.s3, T.s4, T.s5, T.s6, T.s7, T.s8, T.s9];
Object.keys(T).forEach((k, i) => { if (k !== 'end') sfx(T[k], 'mark', { p: i }); });

/* base + foreground fireflies (drawn above every scene for depth) */
const bg = $('#bg'), g = bg.getContext('2d'), fx = $('#fx').getContext('2d');
const FLY = Array.from({ length: 42 }, (_, i) => ({ x: rnd(i) * 1080, y: 200 + rnd(i + 99) * 1500, z: .35 + rnd(i + 7) * .65, ph: rnd(i + 3) * 6.28 }));
function drawBg(t) {
  g.fillStyle = '#04201a'; g.fillRect(0, 0, 1080, 1920);
  const f = fx; f.clearRect(0, 0, 1080, 1920);
  if (mood.red > 0) { const q = f.createRadialGradient(540, 900, 200, 540, 900, 1300); q.addColorStop(0, `rgba(255,60,40,${.05 * mood.red})`); q.addColorStop(1, `rgba(255,40,30,${.45 * mood.red})`); f.fillStyle = q; f.fillRect(0, 0, 1080, 1920); }
  for (const p of FLY) {
    const x = p.x + Math.sin(t * .5 * p.z + p.ph) * 70 + Math.sin(t * 1.3 + p.ph * 2) * 14, y = p.y + Math.cos(t * .37 * p.z + p.ph) * 50, a = (.25 + .75 * Math.max(0, Math.sin(t * 1.7 * p.z + p.ph * 3))) * p.z * mood.energy * (1 - mood.dim), r = 2 + p.z * 3;
    const q = f.createRadialGradient(x, y, 0, x, y, r * 5); q.addColorStop(0, `rgba(210,255,90,${.55 * a})`); q.addColorStop(1, 'rgba(198,255,31,0)');
    f.fillStyle = q; f.fillRect(x - r * 5, y - r * 5, r * 10, r * 10); f.globalAlpha = a; f.fillStyle = '#f4ffd0'; f.beginPath(); f.arc(x, y, r * .6, 0, 6.283); f.fill(); f.globalAlpha = 1;
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
/** multiplane world: W.plane(parallax) creates a depth plane; tween W.cam {x, y, z} (z = zoom, about ox/oy) */
function world(c, ox = 540, oy = 960) {
  const cam = { x: 0, y: 0, z: 1 }, planes = [];
  binds.push(() => planes.forEach(([el, p]) => { el.style.transform = `translate(${-cam.x * p}px,${-cam.y * p}px) scale(${1 + (cam.z - 1) * p})`; }));
  /** camera values that put world point (X,Y) at screen (sx,sy) with zoom z — spread into a tween */
  const aim = (X, Y, z = 1, sx = 540, sy = 960) => ({ x: ox + (X - ox) * z - sx, y: oy + (Y - oy) * z - sy, z });
  return { cam, aim, plane: (p, css) => { const el = E(c, 'a', '', Object.assign({ left: 0, top: 0, width: 1080, height: 1920, transformOrigin: `${ox}px ${oy}px` }, css)); planes.push([el, p]); return el; } };
}
/** caption on the voice clock */
const vcap = (a, b, text) => cap(V(a), V(b), text);
stageInit(T.end, drawBg, drawHud, drawCaps);
