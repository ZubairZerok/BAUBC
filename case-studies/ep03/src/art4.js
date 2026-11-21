/* EP03 v4 — ALL 2D (no isometric, no 3D): Kurzgesagt-style flat shapes with soft gradients, rim light and glow.
 * The rice dishes use the owner's photo (assets/rice_bowl.png) with vector garnish around it. */
/* ───── the rice photo (preloaded before render starts) ───── */
const RICE_SRC = '../assets/rice_bowl.png';
BAKES.push(new Promise(res => { const im = new Image(); im.onload = () => res(); im.onerror = () => { console.error('rice image missing'); res(); }; im.src = RICE_SRC; }));
const riceImg = (w, shadow = true) => `<img src="${RICE_SRC}" style="display:block;width:${w}px;height:${w}px;${shadow ? `filter:drop-shadow(0 ${w * .05}px ${w * .05}px rgba(40,15,0,.45))` : ''}">`;
/* ───── small vector garnish (top view) ───── */
const G = {
  chili: s => svg(s, '0 0 120 40', `<path d="M8 22 Q40 4 96 14 Q110 18 104 26 Q60 34 8 22Z" fill="#2f9a2a"/><path d="M14 20 Q50 10 92 16" stroke="#8fe06a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M100 18 Q114 14 118 6" stroke="#5a7a2a" stroke-width="6" fill="none" stroke-linecap="round"/>`),
  lemon: s => svg(s, '0 0 100 100', `<circle cx="50" cy="50" r="46" fill="#d9e84a"/><circle cx="50" cy="50" r="39" fill="#f6f9c8"/>${Array.from({ length: 8 }, (_, i) => `<path d="M50 50 L${50 + Math.cos(i * .785) * 36} ${50 + Math.sin(i * .785) * 36} A36 36 0 0 1 ${50 + Math.cos(i * .785 + .7) * 36} ${50 + Math.sin(i * .785 + .7) * 36}Z" fill="#eef26a"/>`).join('')}<circle cx="50" cy="50" r="5" fill="#fff"/>`),
  onion: s => svg(s, '0 0 100 100', `<circle cx="50" cy="50" r="46" fill="#a8326a"/>${[38, 30, 22, 14].map((r, i) => `<circle cx="50" cy="50" r="${r}" fill="${i % 2 ? '#e8a0c8' : '#f4d4e6'}"/>`).join('')}<circle cx="50" cy="50" r="6" fill="#fff"/>`),
  bay: s => svg(s, '0 0 140 60', `<path d="M4 30 Q70 -6 136 30 Q70 66 4 30Z" fill="#4f8a2a"/><path d="M4 30 H134" stroke="#a8d870" stroke-width="3"/>${[30, 55, 80, 105].map(x => `<path d="M${x} 30 l14 -12 M${x} 30 l14 12" stroke="#a8d870" stroke-width="2"/>`).join('')}`),
  card: s => svg(s, '0 0 60 30', `<ellipse cx="30" cy="15" rx="27" ry="12" fill="#8fb84a"/><path d="M6 15 H54" stroke="#5f8a2a" stroke-width="2"/><ellipse cx="22" cy="10" rx="8" ry="3" fill="#c8e88a"/>`),
  cinna: s => svg(s, '0 0 160 40', `<rect x="4" y="8" width="152" height="24" rx="12" fill="#a8582a"/><path d="M4 14 H156" stroke="#7a3a14" stroke-width="3"/><ellipse cx="150" cy="20" rx="8" ry="12" fill="#c87a3a"/><path d="M146 14 Q154 20 146 26" stroke="#7a3a14" stroke-width="2" fill="none"/>`),
  salt: s => svg(s, '0 0 100 100', `<circle cx="50" cy="50" r="44" fill="#3f6ad0"/><circle cx="50" cy="50" r="36" fill="#f8f8f4"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${30 + rnd(i + 40) * 40}" cy="${30 + rnd(i + 41) * 40}" r="2.5" fill="#dfe4ec"/>`).join('')}`),
  sprig: s => svg(s, '0 0 80 260', `<path d="M40 258 Q36 150 46 20" stroke="#c9a23a" stroke-width="4" fill="none"/>${Array.from({ length: 11 }, (_, i) => { const y = 30 + i * 18, sd = i % 2 ? 1 : -1; return `<ellipse cx="${44 + sd * 12}" cy="${y}" rx="7" ry="13" fill="${i % 3 ? '#f2c94c' : '#e0a92a'}" transform="rotate(${sd * 30} ${44 + sd * 12} ${y})"/>`; }).join('')}`),
  leaf: (s, r = 0) => svg(s, '0 0 300 120', `<g transform="rotate(${r} 150 60)"><path d="M6 60 Q150 -20 294 60 Q150 140 6 60Z" fill="#3f9a3a"/><path d="M6 60 Q150 -20 294 60" stroke="#6fca5a" stroke-width="5" fill="none"/><path d="M6 60 H290" stroke="#a8e08a" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${30 + i * 22} 60 q-6 -26 -22 -38 M${30 + i * 22} 60 q-6 26 -22 38" stroke="#2f7a2a" stroke-width="2" fill="none"/>`).join('')}</g>`),
};
/** the rice photo on a banana leaf with garnish around it (top view) — returns a container element */
function riceSpread(parent, x, y, w, o = {}) {
  const el = E(parent, 'a', '', { left: x, top: y, width: w, height: w });
  E(el, 'a', G.leaf(w * 1.9, -22), { left: -w * .45, top: w * .12 }); E(el, 'a', G.leaf(w * 1.3, 160), { left: w * .1, top: w * .45 });
  if (o.plate !== false) E(el, 'a', `<div style="width:${w * 1.08}px;height:${w * 1.08}px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#ffffff,#dfe5ec 60%,#b8c2ce);box-shadow:0 ${w * .04}px ${w * .06}px rgba(40,15,0,.4)"></div>`, { left: -w * .04, top: -w * .04 });
  E(el, 'a', riceImg(w * .92), { left: w * .04, top: w * .04 });
  const gs = o.garnish ?? [['chili', 160, .92, .7, -20], ['chili', 140, .98, .82, 10], ['lemon', 110, -.12, .78, 0], ['onion', 100, -.08, .58, 0], ['salt', 100, .95, .1, 0], ['bay', 120, -.2, .12, 30]];
  const gk = o.gk || 1;
  gs.forEach(([k, s0, fx, fy, r]) => { const s = s0 * gk; E(el, 'a', G[k](s), { left: fx * w - s / 2, top: fy * w - s / 4, transform: `rotate(${r}deg)` }); });
  return el;
}
/* ───── smooth path through points (Catmull-Rom → cubic Bézier) ───── */
function smoothPath(p) {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) { const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`; }
  return d;
}
/* ───── Kurzgesagt brain, side view (frontal lobe left). mode: 'healthy' | 'washed' ───── */
const BRAIN_OUT = 'M95 262 C70 205 82 128 150 82 C215 38 330 30 410 52 C480 72 540 120 556 190 C568 245 545 292 500 304 C470 312 445 308 430 300 C410 326 370 338 335 330 C300 352 245 354 205 338 C160 346 118 318 95 262 Z';
const BRAIN_SULCI = [
  [[300, 44], [312, 84], [298, 124], [318, 164], [306, 204], [326, 238]], [[252, 52], [262, 92], [248, 132], [268, 172], [258, 212]], [[352, 52], [362, 94], [348, 134], [368, 174], [360, 214]],
  [[132, 268], [190, 252], [250, 246], [316, 252], [376, 232], [424, 206]], [[160, 304], [222, 290], [290, 296], [356, 284], [420, 266], [470, 270]], [[200, 334], [262, 326], [330, 330], [394, 314]],
  [[124, 150], [166, 118], [212, 108], [236, 76]], [[106, 212], [148, 190], [198, 196], [232, 172], [240, 140]], [[118, 182], [158, 160], [206, 156]], [[150, 108], [184, 88], [214, 66]],
  [[384, 108], [420, 128], [452, 168], [470, 210]], [[466, 88], [494, 128], [520, 178]], [[498, 236], [526, 256], [536, 286]], [[400, 70], [430, 84], [456, 80]],
  [[408, 168], [436, 198], [428, 236]], [[184, 66], [204, 96], [192, 130]], [[140, 238], [172, 222], [208, 226]], [[214, 140], [232, 162], [220, 196]], [[472, 128], [500, 150], [512, 196]], [[390, 250], [440, 240], [470, 250]],
];
function brain2D(w, mode = 'healthy') {
  const wsh = mode === 'washed', id = 'br' + (wsh ? 'w' : 'h') + Math.round(w);
  const C = wsh ? { a: '#f4f8fb', b: '#b4c2d2', s: '#6a7e98', s2: '#3e4e66', hi: '#ffffff', ol: '#7a8ea4', cb: '#c6d2de', cs: '#93a4b6', st: '#d4dde6' }
    : { a: '#ffc2cf', b: '#e86e90', s: '#c24a72', s2: '#8e2a50', hi: '#ffe2e9', ol: '#b03c64', cb: '#f08aa4', cs: '#c04a6e', st: '#f2b0a8' };
  const sul = BRAIN_SULCI.map(p => smoothPath(p));
  return svg(w, '0 0 600 460', `<defs><radialGradient id="${id}g" cx=".32" cy=".25" r=".85"><stop offset="0" stop-color="${C.a}"/><stop offset="1" stop-color="${C.b}"/></radialGradient>
      <linearGradient id="${id}sh" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="${wsh ? '#30405a' : '#6a0a30'}" stop-opacity=".35"/></linearGradient><clipPath id="${id}c"><path d="${BRAIN_OUT}"/></clipPath></defs>
    <ellipse cx="320" cy="440" rx="230" ry="16" fill="#000" opacity=".25"/>
    <path d="M398 318 C404 360 400 400 386 446 L428 446 C436 400 442 360 448 322Z" fill="${C.st}"/><path d="M410 330 C414 370 410 410 400 446" stroke="#000" stroke-opacity=".12" stroke-width="6" fill="none"/>
    <path d="M418 300 C430 344 486 368 528 350 C566 334 572 290 548 266 C520 296 468 310 418 300Z" fill="${C.cb}"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${436 + i * 4} ${310 + i * 9} Q${490} ${330 + i * 8} ${548 - i * 6} ${284 + i * 11}" stroke="${C.cs}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="${BRAIN_OUT}" fill="url(#${id}g)"/>
    <g clip-path="url(#${id}c)">${sul.map(d => `<path d="${d}" stroke="${C.s}" stroke-width="${wsh ? 10 : 12}" fill="none" stroke-linecap="round" opacity="${wsh ? .8 : 1}"/>`).join('')}
      ${sul.map(d => `<path d="${d}" stroke="${C.s2}" stroke-width="${wsh ? 2.5 : 4}" fill="none" stroke-linecap="round" opacity="${wsh ? .45 : .9}"/>`).join('')}
      ${sul.map(d => `<path d="${d}" stroke="${C.hi}" stroke-width="5" fill="none" stroke-linecap="round" opacity="${wsh ? .9 : .6}" transform="translate(-7 -8)" stroke-dasharray="40 30"/>`).join('')}
      <path d="${BRAIN_OUT}" fill="url(#${id}sh)"/><ellipse cx="220" cy="120" rx="120" ry="50" fill="#fff" opacity="${wsh ? .35 : .22}" transform="rotate(-18 220 120)"/></g>
    <path d="${BRAIN_OUT}" fill="none" stroke="${C.ol}" stroke-width="7"/><path d="M118 160 C150 96 230 58 320 50" stroke="#fff" stroke-opacity=".65" stroke-width="7" fill="none" stroke-linecap="round"/>`);
}
/* ───── the 2D brain-wash factory (B and L) ───── */
function brainFactory(c, Wd, o = {}) {
  // back wall: violet→teal panels, pipes, tanks, screens, lamps
  const back = Wd.plane(.12, { left: -80, top: -120, width: 1240, height: 2160 });
  E(back, 'a', '', { left: 0, top: 0, width: 1240, height: 2160, background: 'linear-gradient(#2a1650,#1a2a5a 45%,#0e3a4a)' });
  E(back, 'a', svg(1240, '0 0 1240 2160', Array.from({ length: 9 }, (_, r) => Array.from({ length: 5 }, (_, k) => `<rect x="${20 + k * 244}" y="${30 + r * 160}" width="228" height="146" rx="18" fill="#ffffff" opacity="${.03 + ((r + k) % 3) * .015}"/><circle cx="${36 + k * 244}" cy="${46 + r * 160}" r="4" fill="#fff" opacity=".18"/>`).join('')).join('')), { left: 0, top: 0 });
  const mid = Wd.plane(.3);
  const pipe = (y, col, col2) => E(mid, 'a', svg(1400, '0 0 1400 60', `<rect x="0" y="8" width="1400" height="40" rx="20" fill="${col}"/><rect x="0" y="14" width="1400" height="10" rx="5" fill="#fff" opacity=".35"/>${[160, 520, 900, 1240].map(x => `<rect x="${x}" y="0" width="34" height="56" rx="8" fill="${col2}"/>`).join('')}`), { left: -160, top: y });
  pipe(430, '#ff8a3d', '#c4561a'); pipe(500, '#3fd0c0', '#1a8a80');
  [[200, 430], [880, 500]].forEach(([x, y], i) => { const v = E(mid, 'a', svg(80, '-40 -40 80 80', `<circle r="34" fill="none" stroke="#ef4b3f" stroke-width="10"/><path d="M-34 0 H34 M0 -34 V34" stroke="#ef4b3f" stroke-width="8"/><circle r="9" fill="#ef4b3f"/>`), { left: x - 40, top: y - 34 }); binds.push(t => { v.style.transform = `rotate(${t * (i ? -40 : 30)}deg)`; }); });
  // tanks with sloshing liquid (left: blue soap, right: pink)
  const tank = (x, col, col2, ph) => { const tk = E(mid, 'a', '', { left: x, top: 560, width: 220, height: 640 });
    E(tk, 'a', '', { left: 0, top: 0, width: 220, height: 640, borderRadius: '40px 40px 24px 24px', background: 'linear-gradient(90deg,rgba(255,255,255,.10),rgba(255,255,255,.22) 30%,rgba(255,255,255,.06))', border: '6px solid rgba(220,240,255,.5)' });
    const sv = E(tk, 'a', `<svg width="220" height="640" viewBox="0 0 220 640"><path class="lq" fill="${col}"/><path class="lq2" fill="${col2}" opacity=".6"/></svg>`, { left: 0, top: 0 }), lq = $('.lq', sv), lq2 = $('.lq2', sv);
    binds.push(t => { const wave = (a, f) => { let d = `M6 640 L6 ${260 + Math.sin(t * 2 + ph) * 10}`; for (let X = 6; X <= 214; X += 13) d += ` L${X} ${260 + Math.sin(t * 2 + ph + X * f) * 10 + a}`; return d + ' L214 640Z'; }; lq.setAttribute('d', wave(0, .04)); lq2.setAttribute('d', wave(12, .06)); });
    for (let i = 0; i < 6; i++) { const b = E(tk, 'a', `<div style="width:${12 + i % 3 * 8}px;height:${12 + i % 3 * 8}px;border-radius:50%;border:3px solid rgba(255,255,255,.7)"></div>`, { left: 30 + i * 28, top: 600 }); binds.push(t => { const k = (t * .5 + i / 6) % 1; b.style.transform = `translate(${Math.sin(t * 3 + i) * 8}px,${-k * 320}px)`; b.style.opacity = 1 - k; }); }
    E(tk, 'a', '', { left: 40, top: 640, width: 140, height: 80, background: '#3a3f5a', borderRadius: 8 });
    return tk; };
  tank(20, '#3fa8ff', '#8fd8ff', 0); tank(840, '#ff5fa0', '#ffa8cc', 2);
  // ad screen + warning lamps + gauge
  const scr = E(mid, 'a', `<div style="width:380px;height:220px;border-radius:24px;background:#141a3a;border:10px solid #3a4070;box-shadow:0 0 50px rgba(255,120,80,.35);display:grid;place-items:center;overflow:hidden"><div style="width:100%;height:100%;display:grid;place-items:center;text-align:center;background:linear-gradient(135deg,#ff8a3d,#ef4b3f);font:800 46px/1.15 var(--font-bn-display);color:#fff4dc">পুরান চাল<br>ভাতে বাড়ে!</div></div>`, { left: 350, top: 170 });
  binds.push(t => { scr.style.filter = `brightness(${1 + .2 * Math.sin(t * 17) * Math.sin(t * 5)})`; });
  [[120, 330], [960, 330]].forEach(([x, y], i) => { const l = E(mid, 'a', `<div style="width:46px;height:46px;border-radius:50%;background:#ffc93c;box-shadow:0 0 40px 16px rgba(255,201,60,.6)"></div>`, { left: x, top: y }); binds.push(t => { l.style.opacity = Math.floor(t * 2.5 + i) % 2 ? .25 : 1; }); });
  const gg = E(mid, 'a', `<div style="position:relative;width:150px;height:150px;border-radius:50%;background:#f4f6f8;border:10px solid #3a4070;box-shadow:0 10px 20px rgba(0,0,0,.4)">${svg(130, '-65 -65 130 130', `<path d="M-50 0 A50 50 0 0 1 50 0" stroke="#5fd06a" stroke-width="12" fill="none"/><path d="M18 -47 A50 50 0 0 1 50 0" stroke="#ef4b3f" stroke-width="12" fill="none"/>`, 'position:absolute;left:0;top:0')}<i style="position:absolute;left:65px;top:65px;width:56px;height:6px;margin-top:-3px;border-radius:3px;background:#1a1a2a;transform-origin:0 50%"></i></div>`, { left: 880, top: 140 }), ndl = $('i', gg);
  const lamp = Wd.plane(.45);
  [[260, 0], [820, 0]].forEach(([x]) => { E(lamp, 'a', `<div style="width:6px;height:200px;background:#1a1a2a;margin-left:57px"></div><div style="width:120px;height:56px;border-radius:60px 60px 10px 10px;background:linear-gradient(#ffb03c,#e0701a)"></div>`, { left: x - 60, top: -40 });
    E(lamp, 'a', svg(600, '0 0 600 1100', `<path d="M260 0 H340 L600 1100 H0Z" fill="#fff4c0" opacity=".08"/>`), { left: x - 300, top: 210 }); });
  // floor: tiles + warning stripe
  const fl = Wd.plane(.6);
  E(fl, 'a', '', { left: -300, top: 1250, width: 1700, height: 900, background: 'linear-gradient(#2a3466,#151a3a)' });
  E(fl, 'a', '', { left: -300, top: 1240, width: 1700, height: 26, background: 'repeating-linear-gradient(45deg,#ffc93c 0 30px,#1a1a2a 30px 60px)' });
  E(fl, 'a', svg(1700, '0 0 1700 700', Array.from({ length: 20 }, (_, i) => `<line x1="${i * 90}" y1="0" x2="${i * 90 - 300}" y2="700" stroke="#fff" stroke-opacity=".06" stroke-width="3"/>`).join('') + Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${30 + i * 80}" x2="1700" y2="${30 + i * 80}" stroke="#fff" stroke-opacity=".06" stroke-width="3"/>`).join('')), { left: -300, top: 1266 });
  // the glass basin + the brain
  const hero = Wd.plane(.72);
  E(hero, 'a', svg(820, '0 0 820 380', `<defs><linearGradient id="bsn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd8ff" stop-opacity=".5"/><stop offset="1" stop-color="#1a6ab0" stop-opacity=".8"/></linearGradient></defs><ellipse cx="410" cy="370" rx="380" ry="14" fill="#000" opacity=".35"/><path d="M20 60 H800 L760 340 Q750 370 720 370 H100 Q70 370 60 340Z" fill="url(#bsn)"/><path d="M40 120 Q410 90 780 120 L760 340 Q750 370 720 370 H100 Q70 370 60 340Z" fill="#3fa8ff" opacity=".55"/><path d="M20 60 H800" stroke="#e8f8ff" stroke-width="14" stroke-linecap="round"/><path d="M80 90 L110 330" stroke="#fff" stroke-opacity=".55" stroke-width="14" stroke-linecap="round"/>`), { left: 130, top: 920 });
  const BW = o.bw || 640, bx = 540, by = 980, bw = E(hero, 'a', '', { left: bx - BW / 2, top: by - BW * .69, width: BW, height: BW * .767, transformOrigin: '50% 85%' });
  const bH = E(bw, 'a', brain2D(BW, 'healthy'), { left: 0, top: 0 }), bWs = E(bw, 'a', brain2D(BW, 'washed'), { left: 0, top: 0, opacity: 0 });
  // basin front lip (in front of the brain) + foam line
  E(Wd.plane(.74), 'a', svg(820, '0 0 820 380', `<path d="M40 200 Q410 175 780 200 L760 340 Q750 370 720 370 H100 Q70 370 60 340Z" fill="#3fa8ff" opacity=".45"/><path d="M48 200 Q410 175 772 200" stroke="#e8f8ff" stroke-width="6" fill="none" opacity=".8"/>`), { left: 130, top: 920 });
  return { bw, bH, bWs, bx, by, BW, ndl, back, mid };
}
/* ───── newspapers (C): fictional mastheads, headlines about the Nabanna photoshoot craze ───── */
const PAPERS = ['দৈনিক নবান্ন বার্তা', 'সকালের খবর', 'শহর প্রতিদিন', 'বিনোদন জগৎ', 'সাপ্তাহিক উৎসব', 'নগর সংবাদ', 'আজকের পাতা', 'রঙিন সময়'];
const HEADS = ['নবান্নে ফটোশুটের ধুম!', 'ধানক্ষেতে সেলফি উৎসব', 'পিঠা মেলায় ক্যামেরার ঝলক', 'নবান্ন লুক: কোনটা ট্রেন্ডে?', 'এক দিনের নবান্ন, হাজার ছবি', 'ধান হাতে পোজ — ভাইরাল!', 'উৎসব মানেই এখন ক্লিক', 'ফিডে শুধু নবান্ন'];
function paperPhoto(w, h, k) {
  const sc = [
    `<rect width="${w}" height="${h}" fill="#ffcf7a"/><circle cx="${w * .7}" cy="${h * .35}" r="${h * .18}" fill="#fff1b0"/><path d="M0 ${h * .62} Q${w * .5} ${h * .5} ${w} ${h * .6} V${h} H0Z" fill="#e8b23a"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${i * w / 13} ${h} q4 -${h * .3} ${(i % 2 ? 8 : -6)} -${h * .42}" stroke="#a87a1a" stroke-width="3" fill="none"/>`).join('')}<rect x="${w * .12}" y="${h * .2}" width="${w * .22}" height="${h * .34}" rx="6" fill="#2a2f45"/><rect x="${w * .14}" y="${h * .23}" width="${w * .18}" height="${h * .26}" fill="#7fc4f2"/>`,
    `<rect width="${w}" height="${h}" fill="#c98552"/><circle cx="${w / 2}" cy="${h / 2}" r="${h * .4}" fill="#e8c07a"/><circle cx="${w / 2}" cy="${h / 2}" r="${h * .33}" fill="#f6e2bc"/>${[[-.15, -.1], [.15, -.12], [0, .14]].map(([a, b]) => `<circle cx="${w / 2 + a * w}" cy="${h / 2 + b * h}" r="${h * .1}" fill="#fff8ec"/><circle cx="${w / 2 + a * w}" cy="${h / 2 + b * h}" r="${h * .04}" fill="#8a4a1e"/>`).join('')}`,
    `<rect width="${w}" height="${h}" fill="#9fd6ff"/><path d="M0 ${h * .7} H${w} V${h} H0Z" fill="#5fae3a"/><path d="M${w * .45} ${h} V${h * .3}" stroke="#c9a23a" stroke-width="8"/>${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${w * .45 + (i % 2 ? 12 : -12)}" cy="${h * .32 + i * h * .05}" rx="7" ry="13" fill="#f2c94c"/>`).join('')}<path d="M${w * .7} ${h * .3} l10 22 24 4 -18 16 4 24 -20 -12 -20 12 4 -24 -18 -16 24 -4Z" fill="#fff"/>`,
  ][k % 3];
  return svg(w, `0 0 ${w} ${h}`, sc + `<rect width="${w}" height="${h}" fill="none" stroke="#2a2a2a" stroke-width="3"/>`);
}
function newspaper(w, i, o = {}) {
  const h = Math.round(w * 1.32), lines = n => Array.from({ length: n }, (_, j) => `<div style="height:${w * .012}px;margin:${w * .012}px 0;background:#9a9488;width:${70 + rnd(i * 13 + j) * 30}%"></div>`).join('');
  return `<div style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#fbf6ea,#efe6d2);box-shadow:0 ${w * .03}px ${w * .06}px rgba(0,0,0,.45);padding:${w * .04}px;box-sizing:border-box;overflow:hidden">
    <div style="font:800 ${w * .085}px/1.1 var(--font-bn-display);color:#1a1a1a;text-align:center;border-bottom:${w * .008}px solid #1a1a1a;padding-bottom:${w * .015}px;white-space:nowrap">${o.paper || PAPERS[i % PAPERS.length]}</div>
    <div style="height:${w * .006}px;background:#1a1a1a;margin:${w * .01}px 0 ${w * .025}px"></div>
    <div style="font:800 ${w * (o.hs || .075)}px/1.12 var(--font-bn-display);color:${o.hcol || '#b01e2e'};margin-bottom:${w * .02}px">${o.head || HEADS[i % HEADS.length]}</div>
    <div class="ph" style="margin-bottom:${w * .02}px">${o.noPhoto ? `<div style="width:${w * .92}px;height:${w * .5}px"></div>` : paperPhoto(Math.round(w * .92), Math.round(w * .5), i)}</div>
    <div style="display:flex;gap:${w * .03}px"><div style="flex:1">${lines(9)}</div><div style="flex:1">${lines(9)}</div><div style="flex:1">${lines(9)}</div></div></div>`;
}
/* ───── sun godrays (rotating, breathing light shafts) ───── */
function godrays(parent, cx, cy, len = 1300, n = 14, col = '255,244,200', a = .22) {
  const gid = 'gr' + (godrays.k = (godrays.k || 0) + 1);
  const el = E(parent, 'a', svg(len * 2, `${-len} ${-len} ${len * 2} ${len * 2}`, `<defs><radialGradient id="${gid}" r=".5"><stop offset="0" stop-color="rgb(${col})" stop-opacity="${a * 2}"/><stop offset=".25" stop-color="rgb(${col})" stop-opacity="${a}"/><stop offset="1" stop-color="rgb(${col})" stop-opacity="0"/></radialGradient></defs>` +
    Array.from({ length: n }, (_, i) => { const a0 = i / n * 6.283 + rnd(i + 7) * .2, w = .05 + rnd(i + 3) * .07; return `<path d="M0 0 L${Math.cos(a0 - w) * len} ${Math.sin(a0 - w) * len} L${Math.cos(a0 + w) * len} ${Math.sin(a0 + w) * len}Z" fill="url(#${gid})"/>`; }).join('')), { left: cx - len, top: cy - len, mixBlendMode: 'screen', pointerEvents: 'none' });
  binds.push(t => { el.style.transform = `rotate(${t * 4}deg)`; el.style.opacity = .75 + .25 * Math.sin(t * .9); });
  return el;
}
/* ───── particles flowing along polylines (grains through machines) ───── */
function flowPaths(cv, paths, on) {
  const g = cv.getContext('2d');
  paths.forEach(p => { p.L = [0]; for (let i = 1; i < p.pts.length; i++) p.L.push(p.L[i - 1] + Math.hypot(p.pts[i][0] - p.pts[i - 1][0], p.pts[i][1] - p.pts[i - 1][1])); });
  const at = (p, s) => { const d = s * p.L[p.L.length - 1]; let i = 1; while (i < p.L.length - 1 && p.L[i] < d) i++; const k = (d - p.L[i - 1]) / (p.L[i] - p.L[i - 1] || 1), a = p.pts[i - 1], b = p.pts[i]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, Math.atan2(b[1] - a[1], b[0] - a[0])]; };
  binds.push(t => { g.clearRect(0, 0, cv.width, cv.height); const pw = on(t); if (pw <= 0) return;
    paths.forEach((p, pi) => { const T0 = p.L[p.L.length - 1] / p.v;
      for (let j = 0; j < p.n; j++) { const s = ((t / T0) + j / p.n + rnd(j + pi * 50) * .02) % 1, [x, y, a] = at(p, s), jx = (rnd(j * 3 + pi) - .5) * (p.spread || 6), jy = (rnd(j * 5 + pi) - .5) * (p.spread || 6);
        g.globalAlpha = pw * (p.alpha || 1); g.fillStyle = typeof p.col === 'function' ? p.col(s) : p.col; g.save(); g.translate(x + jx, y + jy); g.rotate(a + (p.spin ? t * 6 + j : 0));
        g.beginPath(); g.ellipse(0, 0, p.r || 4.5, (p.r || 4.5) * .48, 0, 0, 6.283); g.fill(); g.restore(); } });
    g.globalAlpha = 1; });
}
const mixC = (a, b, k) => { const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
/* ───── the auto rice mill at NIGHT — a living cutaway: paddy → cleaner → husker → polisher → colour sorter → sacks ───── */
function millNight(c, Wd, tOn) {
  const PW = { k: 0 }; tl.to(PW, { k: 1, duration: 1, ease: 'power2.inOut' }, tOn);
  const on = () => PW.k;
  // night sky, stars, moon, village silhouettes
  E(Wd.plane(.03, { left: -260, top: -260, width: 1600, height: 2440 }), 'a', '', { left: 0, top: 0, width: 1600, height: 2440, background: 'linear-gradient(#060a26,#141a4a 45%,#3a2a5e 70%,#5a3a5a)' });
  starField(Wd.plane(.05), 120, 900, 201);
  const mp = Wd.plane(.07); E(mp, 'a', `<div style="width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at 40% 40%,#fffbe8,#f2e6c0);box-shadow:0 0 90px 40px rgba(255,244,210,.3)"></div>`, { left: 120, top: 220 }); godrays(mp, 195, 295, 700, 12, '220,230,255', .12);
  E(Wd.plane(.15), 'a', svg(1500, '0 0 1500 400', `<path d="M0 260 Q180 200 360 240 T720 230 T1080 250 T1500 230 V400 H0Z" fill="#1a1636"/>${[[80, 210], [300, 225], [560, 215], [1200, 220], [1380, 215]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="80" height="44" fill="#120f28"/><path d="M${x - 10} ${y} L${x + 40} ${y - 30} L${x + 90} ${y}Z" fill="#100c22"/><rect x="${x + 30}" y="${y + 14}" width="14" height="14" fill="#ffc96a" opacity="${i % 2 ? .9 : .5}"/>`).join('')}`), { left: -210, top: 1050 });
  const B = Wd.plane(.45); const glow = (x, y, s, col, a) => E(B, 'a', `<div style="width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle,rgba(${col},${a}),rgba(${col},0) 65%)"></div>`, { left: x - s / 2, top: y - s / 2, mixBlendMode: 'screen' });
  // building shell + interior (static)
  const st = `<defs><linearGradient id="mwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2c4e"/><stop offset="1" stop-color="#16203a"/></linearGradient><linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d4e6"/><stop offset=".5" stop-color="#8a9ab6"/><stop offset="1" stop-color="#5a6a88"/></linearGradient>
      <linearGradient id="mteal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fd0c0"/><stop offset="1" stop-color="#1a7a80"/></linearGradient><linearGradient id="mpurp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7aff"/><stop offset="1" stop-color="#5a3ab8"/></linearGradient>
      <linearGradient id="morng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa04a"/><stop offset="1" stop-color="#c4561a"/></linearGradient><linearGradient id="mwhite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset="1" stop-color="#b8c6dc"/></linearGradient></defs>
    <rect x="0" y="1320" width="1080" height="600" fill="#10142a"/><rect x="0" y="1320" width="1080" height="10" fill="#2a3058"/>
    <path d="M120 600 L120 540 L330 480 L330 540 L560 480 L560 540 L790 480 L790 540 L1050 480 V600Z" fill="#2a3462"/>${[[150, 548], [380, 548], [610, 548], [840, 548]].map(([x, y]) => `<path d="M${x} ${y} L${x + 160} ${y - 46} V${y + 4}Z" fill="#ffd27a" opacity=".85"/>`).join('')}
    <rect x="120" y="600" width="930" height="720" fill="url(#mwall)"/>${Array.from({ length: 12 }, (_, i) => `<line x1="${120 + i * 80}" y1="600" x2="${120 + i * 80}" y2="1320" stroke="#fff" stroke-opacity=".035" stroke-width="3"/>`).join('')}
    <rect x="120" y="840" width="930" height="18" fill="#3a4676"/><rect x="120" y="1080" width="930" height="18" fill="#3a4676"/><rect x="120" y="840" width="930" height="4" fill="#6a7ab0"/><rect x="120" y="1080" width="930" height="4" fill="#6a7ab0"/>
    <path d="M110 600 V1320" stroke="#ff8a3d" stroke-width="14"/><path d="M1056 600 V1320" stroke="#ff8a3d" stroke-width="14"/><path d="M104 596 H1062" stroke="#ff8a3d" stroke-width="10"/>
    <rect x="200" y="590" width="50" height="730" rx="10" fill="#3a4676"/><rect x="206" y="600" width="6" height="710" fill="#1a2040"/><rect x="238" y="600" width="6" height="710" fill="#1a2040"/>
    <rect x="280" y="650" width="200" height="140" rx="18" fill="url(#mpurp)"/><rect x="296" y="672" width="168" height="80" rx="10" fill="#1a1440"/><path d="M300 690 L460 740" stroke="#c9b8ff" stroke-width="4" stroke-dasharray="6 5"/>${[300, 460].map(x => `<rect x="${x - 6}" y="790" width="14" height="50" fill="#3a3070"/>`).join('')}
    <rect x="520" y="630" width="190" height="200" rx="22" fill="url(#mteal)"/><circle cx="615" cy="720" r="66" fill="#0e2a30"/><circle cx="615" cy="720" r="66" fill="none" stroke="#c9f8f0" stroke-width="8"/><rect x="560" y="800" width="110" height="30" rx="6" fill="#1a6a70"/>
    <path d="M610 632 V600 H880" stroke="#8a9ab6" stroke-width="26" fill="none" stroke-linejoin="round"/><path d="M610 632 V600 H880" stroke="#c9d4e6" stroke-width="12" fill="none" stroke-linejoin="round"/>
    <rect x="870" y="610" width="150" height="220" rx="20" fill="url(#morng)"/><rect x="900" y="700" width="90" height="80" rx="40" fill="#2a0e04"/><rect x="920" y="300" width="50" height="310" fill="#6a5a5a"/><rect x="920" y="300" width="50" height="16" fill="#ef4b3f"/><rect x="920" y="360" width="50" height="12" fill="#ef4b3f"/>
    <path d="M620 830 L760 890" stroke="#8a9ab6" stroke-width="22" stroke-linecap="round"/><path d="M620 830 L760 890" stroke="#c9d4e6" stroke-width="10" stroke-linecap="round"/>
    <rect x="440" y="895" width="360" height="110" rx="55" fill="url(#steel)"/><rect x="470" y="918" width="300" height="64" rx="32" fill="#0e1a2e"/><rect x="800" y="915" width="90" height="70" rx="12" fill="#3f9a4a"/>${[0, 1, 2, 3].map(i => `<rect x="${808 + i * 20}" y="922" width="8" height="56" rx="4" fill="#2a6a32"/>`).join('')}
    <path d="M700 897 V860 H930" stroke="#8a9ab6" stroke-width="22" fill="none" stroke-linejoin="round"/><path d="M700 897 V860 H930" stroke="#c9d4e6" stroke-width="10" fill="none" stroke-linejoin="round"/>
    <path d="M900 870 H1010 L980 1000 L955 1060 L935 1000Z" fill="url(#morng)"/><path d="M915 890 H995 L972 990 L955 1030 L940 990Z" fill="#2a1408"/>
    <path d="M455 1000 L400 1105" stroke="#8a9ab6" stroke-width="22" stroke-linecap="round"/><path d="M455 1000 L400 1105" stroke="#c9d4e6" stroke-width="10" stroke-linecap="round"/>
    <rect x="300" y="1105" width="200" height="205" rx="18" fill="url(#mwhite)"/><rect x="380" y="1120" width="40" height="160" rx="10" fill="#0e1a2e"/><rect x="316" y="1130" width="48" height="24" rx="5" fill="#1a2a4a"/><rect x="520" y="1250" width="56" height="60" rx="6" fill="#5a3a3a"/>
    <path d="M470 1170 L640 1135" stroke="#8a9ab6" stroke-width="22" stroke-linecap="round"/><path d="M470 1170 L640 1135" stroke="#c9d4e6" stroke-width="10" stroke-linecap="round"/>
    <path d="M620 1112 H740 L700 1180 H660Z" fill="url(#steel)"/><rect x="600" y="1300" width="140" height="14" rx="4" fill="#5a6a88"/><rect x="640" y="1290" width="60" height="10" fill="#8a9ab6"/>
    <rect x="740" y="1286" width="320" height="22" rx="11" fill="#2a3058"/>${Array.from({ length: 9 }, (_, i) => `<circle cx="${756 + i * 36}" cy="1297" r="7" fill="#5a6a98"/>`).join('')}
    <path d="M-60 1210 H120 V1300 H-60Z" fill="#c4233b"/><path d="M40 1180 H150 L190 1260 H40Z" fill="#8a2a2a"/><circle cx="0" cy="1310" r="22" fill="#111"/><circle cx="100" cy="1310" r="22" fill="#111"/><path d="M150 1300 H250 V1330 H150Z" fill="#0a0e1e"/>`;
  E(B, 'a', svg(1080, '0 0 1080 1920', st), { left: 0, top: 0 });
  // animated parts
  const ANIM = E(B, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const buckets = E(ANIM, 'a', svg(50, '0 0 50 760', Array.from({ length: 20 }, (_, i) => `<path d="M8 ${i * 38} H42 L38 ${i * 38 + 16} H12Z" fill="#ffc93c"/>`).join('')), { left: 200, top: 580, clipPath: 'inset(20px 0 10px 0)' });
  const sieve = E(ANIM, 'a', svg(168, '0 0 168 80', `<path d="M4 18 L164 68" stroke="#ffd27a" stroke-width="5" stroke-dasharray="10 6"/>`), { left: 296, top: 672 });
  const rollers = [0, 1].map(i => E(ANIM, 'a', svg(70, '-35 -35 70 70', `<circle r="32" fill="#2a2a2e"/>${Array.from({ length: 6 }, (_, k) => `<rect x="-3" y="-30" width="6" height="22" rx="3" fill="#6a6a72" transform="rotate(${k * 60})"/>`).join('')}<circle r="9" fill="#c9d4e6"/>`), { left: 615 - 35 + (i ? 32 : -32), top: 720 - 35 }));
  const screw = E(ANIM, 'a', '', { left: 470, top: 918, width: 300, height: 64, borderRadius: 32, background: 'repeating-linear-gradient(60deg,#9aa8c0 0 14px,#4a5876 14px 28px)', opacity: .9 });
  const swirl = E(ANIM, 'a', svg(80, '-40 -40 80 80', `<path d="M0 -30 A30 30 0 1 1 -26 15" stroke="#e08a5a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0 -16 A16 16 0 1 1 -14 8" stroke="#c96a3a" stroke-width="5" fill="none" stroke-linecap="round"/>`), { left: 955 - 40, top: 930 - 40 });
  const led = E(ANIM, 'a', '', { left: 316, top: 1130, width: 48, height: 24, borderRadius: 5, background: '#5fff8a', boxShadow: '0 0 24px 8px rgba(95,255,138,.6)' });
  const sack = E(ANIM, 'a', `<div style="width:60px;height:80px;border-radius:12px 12px 20px 20px;background:linear-gradient(90deg,#f4ead6,#c9b48a)"></div>`, { left: 640, top: 1210, transformOrigin: '50% 100%' });
  const SK = Array.from({ length: 5 }, () => E(ANIM, 'a', `<div style="width:58px;height:70px;border-radius:12px 12px 18px 18px;background:linear-gradient(90deg,#f4ead6,#c9b48a);box-shadow:0 4px 8px rgba(0,0,0,.4)"></div>`, { left: 0, top: 1216 }));
  const truckBed = E(ANIM, 'a', svg(170, '0 0 170 100', `<path d="M0 30 H150 L170 100 H0Z" fill="#8a2a2a"/><path d="M10 30 Q80 -10 150 30Z" fill="#f2c94c"/>`), { left: -20, top: 1150, transformOrigin: '0 100%' });
  fireFX(ANIM, 945, 780, 140, 120, { base: 70, flame: 70, size: 22, n: 50 });
  const SMK = Array.from({ length: 10 }, (_, i) => E(ANIM, 'a', `<div style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#8a8aa8,#4a4a68 60%,rgba(60,60,90,0) 72%)"></div>`, { left: 885, top: 240 }));
  const lights = [[350, 640], [615, 640], [620, 870], [400, 1100], [800, 1100]].map(([x, y], i) => { const l = E(ANIM, 'a', `<div style="width:6px;height:40px;background:#0a0e1e;margin-left:47px"></div><div style="width:100px;height:36px;border-radius:50px 50px 8px 8px;background:linear-gradient(#ffd27a,#e0901a)"></div>`, { left: x - 50, top: y - 40 });
    const cone = E(ANIM, 'a', svg(420, '0 0 420 240', `<path d="M170 0 H250 L420 240 H0Z" fill="#fff0b0" opacity=".14"/>`), { left: x - 210, top: y - 4, opacity: 0, mixBlendMode: 'screen' }); return cone; });
  const beacon = E(ANIM, 'a', '', { left: 932, top: 286, width: 26, height: 26, borderRadius: '50%', background: '#ef4b3f', boxShadow: '0 0 30px 12px rgba(239,75,63,.8)' });
  const dark = E(ANIM, 'a', '', { left: 112, top: 480, width: 950, height: 840, background: 'rgba(4,6,20,.72)' });
  const cv = E(B, 'a', '<canvas width="1080" height="1400"></canvas>', { left: 0, top: 0 }).firstChild;
  const BR = '#f2c94c', BN = '#c98a4a', WH = '#fffaf0';
  flowPaths(cv, [
    { pts: [[100, 1180], [190, 1290], [225, 1300], [225, 610], [300, 640], [300, 690], [460, 745], [560, 700], [600, 718]], n: 70, v: 260, col: BR },
    { pts: [[615, 760], [620, 830], [760, 890], [760, 945], [470, 950]], n: 40, v: 200, col: s => mixC(BN, WH, Math.max(0, Math.min(1, (s - .35) / .6))) },
    { pts: [[460, 990], [400, 1105], [400, 1270]], n: 26, v: 240, col: WH },
    { pts: [[400, 1150], [470, 1170], [640, 1135], [680, 1160], [680, 1230]], n: 26, v: 220, col: WH },
    { pts: [[400, 1210], [470, 1240], [545, 1260]], n: 5, v: 160, col: '#4a3a2a' },
    { pts: [[610, 650], [610, 600], [880, 600], [930, 690]], n: 30, v: 260, col: '#e8d8a0', r: 3.5, spin: 1, spread: 10 },
    { pts: [[700, 900], [700, 860], [930, 860], [955, 920], [955, 1040]], n: 34, v: 240, col: '#b5532f', r: 3, spin: 1, spread: 10 },
  ], () => PW.k);
  binds.push(t => { const k = PW.k, tt = Math.max(0, t - tOn);
    buckets.style.transform = `translateY(${-((tt * 60) % 38)}px)`; sieve.style.transform = `translateX(${Math.sin(t * 40) * 3 * k}px)`;
    rollers.forEach((r, i) => { r.style.transform = `rotate(${(i ? -1 : 1) * tt * 500}deg)`; });
    screw.style.backgroundPosition = `${-tt * 90}px 0`; swirl.style.transform = `rotate(${tt * 300}deg)`; led.style.opacity = k * (.6 + .4 * Math.sin(t * 9));
    const fc = (tt % 2.4) / 2.4; sack.style.transform = `scaleY(${.4 + .6 * fc})`; sack.style.opacity = k;
    SK.forEach((s, i) => { s.style.transform = `translateX(${740 + ((tt * 70 + i * 90) % 450) - 20}px)`; s.style.opacity = k; });
    truckBed.style.transform = `rotate(${-14 * k}deg)`;
    SMK.forEach((s, i) => { const q = ((t * .4 + i / 10) % 1); s.style.transform = `translate(${q * 200 + Math.sin(t + i) * 16}px,${-q * 380}px) scale(${.4 + q * 1.6})`; s.style.opacity = (1 - q) * .8 * (.3 + .7 * k); });
    beacon.style.opacity = Math.floor(t * 2) % 2 ? .3 : 1; dark.style.opacity = 1 - k;
    lights.forEach((l, i) => { l.style.opacity = Math.max(0, Math.min(1, (t - tOn - i * .12) / .2)); }); });
  [0, 1, 2, 3, 4].forEach(i => sfx(tOn + i * .12, 'switch'));
  // labels (small, Bangla)
  [['ধান', 150, 560], ['চালনি', 330, 800], ['খোসা ছাড়ানো', 540, 836], ['বয়লার', 900, 836], ['পলিশার', 560, 1012], ['কুঁড়া', 920, 1064], ['রং বাছাই', 320, 1316], ['বস্তা', 650, 1316]].forEach(([s, x, y], i) => {
    const l = E(B, 'a', `<span style="display:inline-block;padding:4px 14px 1px;border-radius:14px;background:rgba(10,14,40,.85);border:2px solid #ffc93c;color:#fff4dc;font:700 24px/1.2 var(--font-bn-display);white-space:nowrap">${s}</span>`, { left: x, top: y, opacity: 0 });
    tl.fromTo(l, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .3, ease: 'back.out(2)', immediateRender: false }, tOn + .9 + i * .12); });
  return B;
}
/* ───── small flat mill (front elevation, lit windows) for the ঢেঁকি comparison ───── */
const millIcon = w => svg(w, '0 0 400 330', `<rect x="300" y="20" width="34" height="200" fill="#6a5a6a"/><rect x="300" y="20" width="34" height="12" fill="#ef4b3f"/><rect x="300" y="60" width="34" height="10" fill="#ef4b3f"/>
  ${[30, 90].map(x => `<rect x="${x}" y="70" width="50" height="170" rx="25" fill="#b8c6dc"/><path d="M${x} 95 Q${x + 25} 60 ${x + 50} 95" fill="#8a9ab6"/>${[0, 1, 2, 3].map(k => `<line x1="${x}" y1="${120 + k * 30}" x2="${x + 50}" y2="${120 + k * 30}" stroke="#7a8aa6" stroke-width="3"/>`).join('')}`).join('')}
  <path d="M150 150 L210 110 V150 L270 110 V150 L330 110 V150 L390 110 V320 H150Z" fill="#2a3462"/><rect x="150" y="150" width="240" height="170" fill="#1e2c4e"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${166 + (i % 4) * 56}" y="${170 + Math.floor(i / 4) * 56}" width="38" height="36" rx="4" fill="#ffd27a"/>`).join('')}
  <rect x="236" y="270" width="68" height="50" fill="#0e1428"/><rect x="0" y="318" width="400" height="12" fill="#3a4676"/>`);
/* ───── dark-green নকশি কাঁথা background (stitched motifs: lotus, fish, sun, paisley) ───── */
function nakshiBG(Wd) {
  const pl = Wd.plane(.08, { left: -200, top: -200, width: 1480, height: 2320 });
  const st = (d, col = '#3f8a4a') => `<path d="${d}" stroke="${col}" stroke-width="5" stroke-dasharray="12 10" fill="none" stroke-linecap="round"/>`;
  const lotus = (x, y, s) => st(`M${x} ${y} q${-30 * s} ${-60 * s} 0 ${-110 * s} q${30 * s} ${50 * s} 0 ${110 * s} M${x} ${y} q${-70 * s} ${-30 * s} ${-90 * s} ${-80 * s} q${60 * s} 0 ${90 * s} ${80 * s} M${x} ${y} q${70 * s} ${-30 * s} ${90 * s} ${-80 * s} q${-60 * s} 0 ${-90 * s} ${80 * s}`, '#c9a23a');
  const fish = (x, y, s, r) => `<g transform="rotate(${r} ${x} ${y})">${st(`M${x - 60 * s} ${y} Q${x} ${y - 40 * s} ${x + 60 * s} ${y} Q${x} ${y + 40 * s} ${x - 60 * s} ${y}Z M${x + 60 * s} ${y} l${30 * s} ${-24 * s} v${48 * s}Z`, '#6fb86a')}<circle cx="${x - 34 * s}" cy="${y - 6 * s}" r="${5 * s}" fill="#c9a23a"/></g>`;
  const sun = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#c9a23a" stroke-width="5" stroke-dasharray="10 9"/>${Array.from({ length: 12 }, (_, i) => st(`M${x + Math.cos(i * .5236) * (r + 12)} ${y + Math.sin(i * .5236) * (r + 12)} L${x + Math.cos(i * .5236) * (r + 40)} ${y + Math.sin(i * .5236) * (r + 40)}`, '#c9a23a')).join('')}`;
  const body = `<rect width="1480" height="2320" fill="url(#ng)"/>` + Array.from({ length: 22 }, (_, i) => { const x = 60 + (i % 4) * 380 + (Math.floor(i / 4) % 2) * 190, y = 120 + Math.floor(i / 4) * 400; return [lotus(x, y, 1), fish(x + 160, y + 160, 1, rnd(i) * 60 - 30), sun(x + 40, y + 260, 34)][i % 3]; }).join('')
    + Array.from({ length: 30 }, (_, i) => st(`M0 ${60 + i * 78} Q370 ${40 + i * 78} 740 ${60 + i * 78} T1480 ${60 + i * 78}`, '#1f5a2e')).join('');
  E(pl, 'a', svg(1480, '0 0 1480 2320', `<defs><radialGradient id="ng" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#145a32"/><stop offset=".6" stop-color="#0c3a22"/><stop offset="1" stop-color="#061e12"/></radialGradient></defs>${body}`), { left: 0, top: 0 });
  return pl;
}
/* ───── the 2D rice whitener (polisher), cut open — red grains in, bran sucked out, white rice down the chute ───── */
function polisher2D(parent, x, y, tOn) {
  const el = E(parent, 'a', '', { left: x, top: y, width: 1000, height: 820 });
  E(el, 'a', svg(1000, '0 0 1000 820', `<defs><linearGradient id="pst" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8f6"/><stop offset=".45" stop-color="#9aaccc"/><stop offset="1" stop-color="#5a6c90"/></linearGradient><linearGradient id="pbl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset="1" stop-color="#2a4ab8"/></linearGradient><linearGradient id="pgl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe8ff" stop-opacity=".35"/><stop offset="1" stop-color="#3a6ab0" stop-opacity=".15"/></linearGradient></defs>
    <ellipse cx="470" cy="800" rx="440" ry="20" fill="#000" opacity=".35"/>
    <rect x="150" y="450" width="24" height="340" fill="#2a3458"/><rect x="740" y="450" width="24" height="340" fill="#2a3458"/><rect x="130" y="620" width="660" height="20" rx="8" fill="#3a4676"/>
    <path d="M150 20 H390 L320 190 H220Z" fill="url(#pst)"/><path d="M172 34 H368 L310 176 H230Z" fill="#1a1430"/>
    <rect x="100" y="190" width="720" height="270" rx="60" fill="url(#pbl)"/><rect x="100" y="190" width="720" height="40" rx="20" fill="#7fb0ff" opacity=".5"/>
    <rect x="140" y="236" width="640" height="180" rx="40" fill="#0b1430"/>
    <rect x="160" y="250" width="600" height="152" rx="34" fill="none" stroke="#9fb8e0" stroke-width="6" stroke-dasharray="3 9"/>
    <circle cx="60" cy="325" r="58" fill="url(#pst)"/><circle cx="60" cy="325" r="20" fill="#2a3458"/>
    <rect x="20" y="560" width="190" height="130" rx="20" fill="#3f9a4a"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${34 + i * 28}" y="572" width="12" height="106" rx="6" fill="#2a6a32"/>`).join('')}<circle cx="115" cy="625" r="34" fill="url(#pst)"/>
    <path d="M820 380 L940 520 L940 560 L880 560 L780 430Z" fill="url(#pst)"/><path d="M880 560 H1000 V800 H880Z" fill="#c98552"/><path d="M880 560 H1000 V590 H880Z" fill="#a8642e"/>
    <path d="M560 192 V70 H760" stroke="#5a6c90" stroke-width="44" fill="none" stroke-linejoin="round"/><path d="M560 192 V70 H760" stroke="#c9d4e6" stroke-width="28" fill="none" stroke-linejoin="round"/>
    <circle cx="800" cy="70" r="62" fill="url(#pst)"/><circle cx="800" cy="70" r="46" fill="#1a2040"/>
    <path d="M850 100 Q930 110 960 180 V420 Q960 450 930 450 H880 Q850 450 850 420Z" fill="#c4834a"/><path d="M858 120 Q920 130 948 190" stroke="#e8b07a" stroke-width="6" fill="none"/>
    <rect x="300" y="480" width="300" height="130" rx="18" fill="#1a2040"/><rect x="316" y="496" width="150" height="56" rx="8" fill="#0a2a1a"/><circle cx="530" cy="545" r="44" fill="#f4f6f8"/><circle cx="530" cy="545" r="44" fill="none" stroke="#9aaccc" stroke-width="6"/>${[0, 1, 2].map(i => `<circle cx="${330 + i * 40}" cy="584" r="10" fill="${['#5fff8a', '#ffc93c', '#ef4b3f'][i]}"/>`).join('')}
    <rect x="140" y="236" width="640" height="180" rx="40" fill="url(#pgl)"/><path d="M170 250 L240 250" stroke="#fff" stroke-opacity=".6" stroke-width="8" stroke-linecap="round"/>`), { left: 0, top: 0 });
  const PW = { k: 0 }; tl.to(PW, { k: 1, duration: .6 }, tOn);
  const roll = E(el, 'a', '', { left: 190, top: 288, width: 540, height: 76, borderRadius: 38, background: 'repeating-linear-gradient(65deg,#c9d4e6 0 16px,#6a7a98 16px 32px)', boxShadow: 'inset 0 -14px 20px rgba(0,0,0,.45),inset 0 10px 14px rgba(255,255,255,.35)' });
  const pul = E(el, 'a', svg(116, '-58 -58 116 116', `<circle r="50" fill="none" stroke="#3a4676" stroke-width="8"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="-4" y="-48" width="8" height="40" fill="#3a4676" transform="rotate(${i * 60})"/>`).join('')}`), { left: 2, top: 267 });
  const fan = E(el, 'a', svg(92, '-46 -46 92 92', [0, 1, 2, 3].map(i => `<path d="M0 0 Q20 -36 0 -44 Q-14 -24 0 0Z" fill="#9fb8e0" transform="rotate(${i * 90})"/>`).join('') + '<circle r="9" fill="#dfe8f6"/>'), { left: 754, top: 24 });
  const belt = E(el, 'a', svg(200, '0 0 200 380', `<path d="M60 0 L110 300" stroke="#1a1a2a" stroke-width="10" stroke-dasharray="14 8" class="b1"/><path d="M0 40 L50 330" stroke="#1a1a2a" stroke-width="10" stroke-dasharray="14 8" class="b2"/>`), { left: 30, top: 300 });
  const ndl = E(el, 'a', '<i style="display:block;width:36px;height:5px;border-radius:3px;background:#ef4b3f;transform-origin:0 50%"></i>', { left: 530, top: 543 }).firstChild;
  const disp = E(el, 'a', `<div style="font:700 34px/1 var(--font-bn-display);color:#5fff8a;text-shadow:0 0 12px #5fff8a">সাদা <span class="n">০</span>%</div>`, { left: 330, top: 504 });
  const cv = E(el, 'a', '<canvas width="1000" height="820"></canvas>', { left: 0, top: 0 }).firstChild;
  flowPaths(cv, [
    { pts: [[270, 140], [270, 200], [220, 300], [720, 320], [800, 420], [920, 540], [940, 600]], n: 80, v: 150, spread: 30, col: s => s < .2 ? '#b5532f' : mixC('#b5532f', '#fffaf0', Math.min(1, (s - .2) / .45)) },
    { pts: [[560, 260], [560, 70], [790, 70], [880, 150], [900, 300]], n: 40, v: 220, col: '#c96a3a', r: 3, spin: 1, spread: 14, alpha: .9 },
  ], () => PW.k);
  binds.push(t => { const tt = Math.max(0, t - tOn) * PW.k; roll.style.backgroundPosition = `${-tt * 140}px 0`; pul.style.transform = `rotate(${tt * 600}deg)`; fan.style.transform = `rotate(${tt * 900}deg)`;
    [...belt.querySelectorAll('path')].forEach(p => { p.style.strokeDashoffset = -tt * 120; }); ndl.style.transform = `rotate(${-160 + 150 * PW.k + Math.sin(t * 7) * 6}deg)`;
    $('.n', disp).textContent = bn(Math.round(Math.min(99, tt * 22))); });
  return { el, hopper: [x + 270, y + 30], chute: [x + 940, y + 560], duct: [x + 900, y + 110] };
}
/* ───── শীতল পাটি — the woven mat (top view), baked ───── */
function shitalPati(w, h) {
  const cell = 26, cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
  const motif = (i, j) => { const cx = w / 2, cy = h / 2, d = Math.abs(i * cell - cx) / cell + Math.abs(j * cell - cy) / cell; const ring = Math.floor(d) % 6; return ['#f3e3b8', '#e8cf8a', '#c4233b', '#f3e3b8', '#2f7a4a', '#e8cf8a'][ring]; };
  let body = `<rect width="${w}" height="${h}" rx="24" fill="#e8cf8a"/>`;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const x = i * cell, y = j * cell, col = motif(i, j), hor = (i + j) % 2;
    body += `<rect x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" rx="4" fill="${col}"/>` + (hor ? `<rect x="${x + 2}" y="${y + cell / 2 - 2}" width="${cell - 4}" height="4" fill="#000" opacity=".08"/>` : `<rect x="${x + cell / 2 - 2}" y="${y + 2}" width="4" height="${cell - 4}" fill="#000" opacity=".08"/>`); }
  body += `<rect x="12" y="12" width="${w - 24}" height="${h - 24}" rx="18" fill="none" stroke="#7a1f2a" stroke-width="16"/><rect x="34" y="34" width="${w - 68}" height="${h - 68}" rx="12" fill="none" stroke="#2f7a4a" stroke-width="8" stroke-dasharray="20 10"/>`;
  return bake(bsvg(w, h, `<rect x="6" y="14" width="${w}" height="${h}" rx="24" fill="#000" opacity=".3" filter="url(#fBlur6)"/>${body}<rect width="${w}" height="${h}" rx="24" fill="#fff" filter="url(#tLight)" opacity=".25"/>`), w, h + 20, 1.2);
}
