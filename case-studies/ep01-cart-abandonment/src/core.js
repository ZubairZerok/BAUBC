/* EP01 core — deterministic stage: master timeline, background, HUD, captions, helpers.
 * Nothing here uses wall-clock time; everything is a pure function of window.__seek(t). */
const B = 2.4;                                   // one bar @ 100 BPM — every scene cut lands on a bar
const T = { s0: 0, s1: 7.2, s2: 16.8, s3: 26.4, s4: 38.4, s5: 52.8, s6: 62.4, s7: 72, s8: 81.6, s9: 91.2, end: 97.2 };
const CHAPS = [['০১', 'হুক'], ['০২', 'সেই মুহূর্ত'], ['০৩', 'রহস্য'], ['০৪', 'সংখ্যা'], ['০৫', 'আসল কারণ'], ['০৬', 'রিভিউ'], ['০৭', '৩ ফ্যাক্টর'], ['০৮', 'লেসন'], ['০৯', 'আপনার পালা']];
const BOUNDS = [T.s0, T.s1, T.s2, T.s3, T.s4, T.s5, T.s6, T.s7, T.s8, T.s9];

const tl = gsap.timeline({ paused: true });
const binds = [];                                // per-frame functions (counters etc.)
const cues = [];                                 // sound cues, consumed by audio/build_audio.py
const sfx = (t, name, extra) => cues.push(Object.assign({ t: +t.toFixed(3), name }, extra || {}));
const mood = { red: 0, gold: 0, energy: 1, dim: 0 };

const $ = (s, r) => (r || document).querySelector(s);
const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
function E(parent, cls, html, css) {
  const e = document.createElement('div');
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (css) for (const k in css) e.style[k] = typeof css[k] === 'number' && !/opacity|zIndex|flex|scale|lineHeight|fontWeight/.test(k) ? css[k] + 'px' : css[k];
  parent.appendChild(e); return e;
}
/** split a headline into word spans (Bangla-safe: never split inside a word) */
function words(el) {
  const html = el.innerHTML.split(/(<[^>]+>|\s+)/).map(p => !p ? '' : /^<|^\s+$/.test(p) ? p : `<span class="w">${p}</span>`).join('');
  el.innerHTML = html; return [...el.querySelectorAll('.w')];
}
function scene(name, t0, t1) {
  const s = E($('#scenes'), 'scene'); s.id = name;
  const cam = E(s, 'cam');
  if (t0 === 0) s.style.visibility = 'visible'; else tl.set(s, { visibility: 'visible' }, t0);   // frame 0 must already show the hook
  tl.set(s, { visibility: 'hidden' }, t1);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.045, duration: t1 - t0, ease: 'none' }, t0);   // constant slow push-in
  return cam;
}
/** headline pop-in by words */
function hIn(el, t, o = {}) {
  const ws = words(el);
  tl.fromTo(ws, { opacity: o.op ?? 0, y: o.y ?? 70, rotationX: o.op ? 0 : -70, scale: o.op ? 0.92 : 0.8 }, { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: o.d ?? 0.55, ease: 'back.out(1.7)', stagger: o.st ?? 0.09, transformOrigin: '50% 100%' }, t);
  return ws;
}
const out = (el, t, o = {}) => tl.to(el, Object.assign({ opacity: 0, y: -60, scale: 0.9, duration: 0.35, ease: 'power2.in' }, o), t);
const pop = (el, t, o = {}) => tl.fromTo(el, { opacity: 0, scale: o.from ?? 0.3 }, { opacity: 1, scale: 1, duration: o.d ?? 0.5, ease: o.ease ?? 'back.out(2)' }, t);
function shake(t, amt = 26, d = 0.5) {
  const n = Math.round(d / 0.04), w = $('#world');
  for (let i = 0; i < n; i++) { const k = 1 - i / n, r = (a) => (Math.sin((i + 1) * a) * amt * k); tl.set(w, { x: r(12.9898), y: r(78.233), rotation: r(3.7) * 0.02 }, t + i * 0.04); }
  tl.set(w, { x: 0, y: 0, rotation: 0 }, t + d);
}
function flash(t, color = '#fff', peak = 0.8, d = 0.45) {
  tl.set('#flash', { background: color }, t).fromTo('#flash', { opacity: peak }, { opacity: 0, duration: d, ease: 'power2.out', immediateRender: false }, t);
}
/** bar-synced scene transition: lime slab then ink slab sweep across the cut at time t */
function wipe(t, dir = 'up') {
  const ax = dir === 'up' || dir === 'down' ? 'yPercent' : 'xPercent', s = dir === 'up' || dir === 'left' ? 1 : -1;
  const A = '#wipeA', Bq = '#wipeB', skew = ax === 'xPercent' ? { skewX: -8 * s, scaleX: 1.3 } : { skewY: -4 * s, scaleY: 1.2 };
  tl.set([A, Bq], Object.assign({ visibility: 'visible', xPercent: 0, yPercent: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1 }, skew), t - 0.34)
    .fromTo(A, { [ax]: 125 * s }, { [ax]: -125 * s, duration: 0.62, ease: 'power3.inOut' }, t - 0.34)
    .fromTo(Bq, { [ax]: 125 * s }, { [ax]: -125 * s, duration: 0.62, ease: 'power3.inOut' }, t - 0.26)
    .set([A, Bq], { visibility: 'hidden' }, t + 0.37);
  sfx(t - 0.3, 'sweep');
}

/* ───────── icons (24×24 stroke set, drawn in-house) ───────── */
const IC = {
  cart: '<path d="M2 3h3l2.6 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/><circle cx="9.5" cy="19.5" r="1.6"/><circle cx="17.5" cy="19.5" r="1.6"/>',
  shirt: '<path d="M8 3 3 6l2 4 2-1v11h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0Z"/>',
  phones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4.5" height="7" rx="2"/><rect x="17" y="13" width="4.5" height="7" rx="2"/>',
  watch: '<rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="M9 6.5 9.6 2.5h4.8l.6 4M9 17.5l.6 4h4.8l.6-4M12 9.5V12l1.6 1.2"/>',
  star: '<path d="m12 2.6 2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9Z"/>',
  truck: '<path d="M1.5 5.5h12v10h-12zM13.5 9h4.3l3.7 3.6v2.9h-8"/><circle cx="6" cy="17.6" r="2"/><circle cx="17.2" cy="17.6" r="2"/>',
  tag: '<path d="M3 3h8.5L21 12.5 12.5 21 3 11.5Z"/><circle cx="7.6" cy="7.6" r="1.4"/>',
  clock: '<circle cx="12" cy="12" r="9.3"/><path d="M12 6.5V12l3.6 2.2"/>',
  check: '<path d="m4 12.5 5.2 5.2L20 6.5"/>',
  x: '<path d="M5 5l14 14M19 5 5 19"/>',
  heart: '<path d="M12 20.5S3 15 3 8.8A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 9 2.3c0 6.200-9 11.700-9 11.700Z"/>',
  chat: '<path d="M3.500 4.500h17v12h-9l-5 4v-4h-3Z"/><path d="M8 9h8M8 12.500h5"/>',
  warn: '<path d="M12 3 1.800 20.500h20.400Z"/><path d="M12 9.500v5.500M12 17.800v.2"/>',
  bolt: '<path d="M13 2 4.500 13.500H11L10 22l8.500-11.500H12Z"/>',
  eye: '<path d="M1.500 12S5.500 5 12 5s10.500 7 10.500 7-4 7-10.500 7S1.500 12 1.500 12Z"/><circle cx="12" cy="12" r="3.200"/>',
  user: '<circle cx="12" cy="7.500" r="4.200"/><path d="M3.500 21.500a8.500 8.500 0 0 1 17 0"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  box: '<path d="M12 2.500 21 7v10l-9 4.500L3 17V7Z"/><path d="M3 7l9 4.500L21 7M12 11.500v10"/>',
  search: '<circle cx="10.500" cy="10.500" r="7"/><path d="m16 16 5.500 5.500"/>',
};
const ico = (n, size = 64, color = 'currentColor', sw = 2, fill = 'none') =>
  `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${IC[n]}</svg>`;
const CURSOR = (s = 84) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="filter:drop-shadow(0 8px 10px rgba(0,0,0,.6))"><path d="M5 2.500 19.500 12l-6.300 1.300 3.600 6.900-2.900 1.500-3.600-6.900L5 19.500Z" fill="#fff" stroke="#0a0c06" stroke-width="1.600" stroke-linejoin="round"/></svg>`;

/* ───────── background canvas ───────── */
const bg = $('#bg'), g = bg.getContext('2d');
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const PARTS = Array.from({ length: 46 }, (_, i) => ({ x: rnd(i) * 1080, y: rnd(i + 99) * 1920, z: 0.25 + rnd(i + 7) * 0.75, k: i % 4, ph: rnd(i + 3) * 6.28 }));
function drawBg(t) {
  const r = mood.red, gd = mood.gold, en = mood.energy;
  const ar = Math.round(198 + (255 - 198) * r + (255 - 198) * gd), ag = Math.round(255 + (61 - 255) * r + (200 - 255) * gd), ab = Math.round(31 + (46 - 31) * r + (61 - 31) * gd);
  const acc = a => `rgba(${ar},${ag},${ab},${a})`;
  g.fillStyle = '#070806'; g.fillRect(0, 0, 1080, 1920);
  // drifting light pools
  const orb = (x, y, rad, a) => { const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, acc(a)); gr.addColorStop(1, acc(0)); g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
  orb(540 + Math.sin(t * 0.23) * 330, 620 + Math.cos(t * 0.19) * 240, 760, 0.13 * en);
  orb(540 + Math.cos(t * 0.17 + 2) * 420, 1420 + Math.sin(t * 0.21) * 200, 620, 0.09 * en);
  orb(160 + Math.sin(t * 0.31 + 1) * 120, 240, 420, 0.06 * en);
  // dot matrix, slow diagonal drift
  const sp = 60, ox = (t * 9) % sp, oy = (t * 14) % sp;
  g.fillStyle = 'rgba(239,233,220,0.085)';
  for (let y = -sp + oy; y < 1320; y += sp) for (let x = -sp + ox; x < 1080 + sp; x += sp) g.fillRect(x, y, 3, 3);
  // perspective floor — gives the bottom third real depth
  const hy = 1330, cx = 540;
  g.lineWidth = 2;
  for (let i = 0; i < 16; i++) {
    const p = ((i + (t * 0.22 * en) % 1) / 16); const y = hy + Math.pow(p, 2.3) * 620;
    g.strokeStyle = acc(0.04 + p * 0.3); g.beginPath(); g.moveTo(0, y); g.lineTo(1080, y); g.stroke();
  }
  for (let i = -14; i <= 14; i++) {
    const gr = g.createLinearGradient(0, hy, 0, 1920); gr.addColorStop(0, acc(0)); gr.addColorStop(1, acc(0.26));
    g.strokeStyle = gr; g.beginPath(); g.moveTo(cx + i * 26, hy); g.lineTo(cx + i * 230, 1920); g.stroke();
  }
  const hg = g.createLinearGradient(0, hy - 140, 0, hy + 90); hg.addColorStop(0, acc(0)); hg.addColorStop(0.6, acc(0.10 * en)); hg.addColorStop(1, acc(0));
  g.fillStyle = hg; g.fillRect(0, hy - 140, 1080, 230);
  // floating glyph particles with depth
  for (const p of PARTS) {
    const y = ((p.y - t * 46 * p.z * en) % 2000 + 2000) % 2000 - 40, x = p.x + Math.sin(t * 0.6 + p.ph) * 26 * p.z, s = 5 + p.z * 13;
    g.globalAlpha = 0.1 + p.z * 0.34; g.strokeStyle = g.fillStyle = p.k === 3 ? '#efe9dc' : acc(1); g.lineWidth = 2.4;
    g.save(); g.translate(x, y); g.rotate(t * 0.5 * (p.k % 2 ? 1 : -1) + p.ph);
    if (p.k === 0) g.fillRect(-s / 2, -s / 2, s, s);
    else if (p.k === 1) { g.beginPath(); g.moveTo(-s, 0); g.lineTo(s, 0); g.moveTo(0, -s); g.lineTo(0, s); g.stroke(); }
    else if (p.k === 2) { g.beginPath(); g.arc(0, 0, s * 0.7, 0, 6.283); g.stroke(); }
    else { g.beginPath(); g.moveTo(0, -s); g.lineTo(s, s); g.lineTo(-s, s); g.closePath(); g.stroke(); }
    g.restore();
  }
  g.globalAlpha = 1;
  if (mood.dim > 0) { g.fillStyle = `rgba(4,5,3,${mood.dim})`; g.fillRect(0, 0, 1080, 1920); }
}
// film grain tile
(() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * 0.37) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); $('#grain').style.backgroundImage = `url(${c.toDataURL()})`; })();

/* ───────── HUD ───────── */
const segEls = CHAPS.map(() => E($('#segs'), '', '<i></i>').firstChild);
$('#tickerIn').innerHTML = Array(6).fill('CART ABANDONMENT <em>✦</em> 70% <em>✦</em> THE CHECKOUT GAP <em>✦</em> CASE STUDIES <em>✦</em> ').join('');
function drawHud(t) {
  let ci = 0; for (let i = 0; i < CHAPS.length; i++) if (t >= BOUNDS[i]) ci = i;
  segEls.forEach((s, i) => { const p = Math.max(0, Math.min(1, (t - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]))); s.style.transform = `scaleX(${p})`; });
  $('#chapNo').textContent = CHAPS[ci][0]; $('#chapName').textContent = CHAPS[ci][1];
  $('#tickerIn').style.transform = `translateX(${-((t * 70) % 2400)}px)`;
  $('#grain').style.backgroundPosition = `${Math.floor(rnd(Math.floor(t * 30)) * 256)}px ${Math.floor(rnd(Math.floor(t * 30) + 5) * 256)}px`;
}

/* ───────── captions (the narration — there is no voice-over) ───────── */
const CAPS = [];
function cap(t0, t1, text) {
  const d = E($('#caps'), 'cap'); E(d, 'bar');
  let k = false; const ws = [];
  text.split(/(\*)/).forEach(part => { if (part === '*') { k = !k; return; }
    part.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) { d.appendChild(document.createTextNode(' ')); return; }
      const s = document.createElement('span'); s.className = 'cw' + (k ? ' k' : ''); s.textContent = w; d.appendChild(s); ws.push(s); }); });
  CAPS.push({ t0, t1, d, ws });
}
function drawCaps(t) {
  for (const c of CAPS) {
    const on = t >= c.t0 && t < c.t1; c.d.style.display = on ? 'block' : 'none'; if (!on) continue;
    const dur = c.t1 - c.t0, per = Math.min(0.2, dur * 0.5 / c.ws.length), fade = Math.min(1, (c.t1 - t) / 0.16);
    c.ws.forEach((w, i) => {
      const p = Math.max(0, Math.min(1, (t - c.t0 - i * per) / 0.2)), e = 1 - Math.pow(1 - p, 3);
      w.style.opacity = (0.0 + e) * fade; w.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.86 + 0.14 * e + (w.classList.contains('k') ? Math.sin(Math.min(1, p) * Math.PI) * 0.1 : 0)})`;
    });
    c.d.firstChild.style.transform = `scaleX(${Math.min(1, (t - c.t0) / dur)})`;
    c.d.firstChild.style.opacity = fade;
  }
}

window.__duration = T.end;
window.__cues = cues;
window.__seek = t => { t = Math.max(0, Math.min(T.end - 1e-4, t)); tl.time(t, false); binds.forEach(f => f(t)); drawBg(t); drawHud(t); drawCaps(t); };
