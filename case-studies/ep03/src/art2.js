/* EP03 v2 — Kurzgesagt-style kit: navy night world, rim-lit flat shapes, lime / gold / orange light, red accents.
 * Every asset is an SVG/DOM string; animation lives in scenes*.js. */
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="kClay" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e07a3f"/><stop offset=".6" stop-color="#b4502a"/><stop offset="1" stop-color="#6e2a18"/></linearGradient>
<linearGradient id="kMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb2d8"/><stop offset=".5" stop-color="#5a6f9c"/><stop offset="1" stop-color="#2a3a64"/></linearGradient>
<radialGradient id="kGlass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9fd7ff" stop-opacity=".55"/><stop offset=".6" stop-color="#3a5aa0" stop-opacity=".35"/><stop offset="1" stop-color="#0e1a44" stop-opacity=".6"/></radialGradient>
<linearGradient id="kHead" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#35519c"/><stop offset="1" stop-color="#121f52"/></linearGradient>
<linearGradient id="kGoldS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe58a"/><stop offset="1" stop-color="#e09a14"/></linearGradient>
<linearGradient id="kSack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f2dcae"/><stop offset="1" stop-color="#c9a76a"/></linearGradient>
<linearGradient id="kSackW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#eef1f6"/><stop offset="1" stop-color="#aeb6c8"/></linearGradient>
<radialGradient id="kSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7cf"/><stop offset=".5" stop-color="#ffd25a"/><stop offset="1" stop-color="#ff8a3d"/></radialGradient>
<linearGradient id="kMilk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e8"/><stop offset="1" stop-color="#f1d9a8"/></linearGradient>
</defs></svg>`);

/* ───── world pieces ───── */
/** rolling hill band, rim-lit on top */
function hillBand(w, h, col, seed = 0, n = 5, amp = 70, rim = 'rgba(184,245,60,.35)') {
  let d = '', pts = [];
  for (let i = 0; i <= n; i++) pts.push([i * w / n, amp * (.25 + rnd(i * 3 + seed) * .75)]);
  d = `M0 ${pts[0][1]}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; d += ` C${x0 + (x1 - x0) * .5} ${y0} ${x0 + (x1 - x0) * .5} ${y1} ${x1} ${y1}`; }
  return svg(w, `0 0 ${w} ${h}`, `<path d="${d} L${w} ${h} L0 ${h}Z" fill="${col}"/><path d="${d}" stroke="${rim}" stroke-width="5" fill="none"/>`);
}
/** star field (3 twinkle groups) */
function starField(pl, n = 80, y1 = 1100, seed = 0) {
  const grp = [0, 1, 2].map(k => E(pl, 'a', svg(1080, `0 0 1080 ${y1}`, Array.from({ length: n / 3 | 0 }, (_, i) => { const j = i * 3 + k + seed; return `<circle cx="${rnd(j) * 1080}" cy="${rnd(j + 50) * y1}" r="${1.2 + rnd(j + 9) * 2.6}" fill="${j % 7 ? '#dfe8ff' : '#ffe08a'}"/>`; }).join('')), { left: 0, top: 0 }));
  binds.push(t => grp.forEach((s, k) => { s.style.opacity = .45 + .55 * Math.abs(Math.sin(t * .9 + k * 2.1)); }));
}
/** a ripe paddy band made of several rows; rows sway with the wind */
function paddyBand(pl, y, w = 1400, rows = 3, ripe = 1, seed = 0, h0 = 150, x0 = -160) {
  const els = [];
  for (let r = 0; r < rows; r++) { const h = h0 + r * 40; els.push(E(pl, 'a', paddyRow(w, h, 46 + r * 6, ripe, seed + r * 31), { left: x0 - r * 20, top: y + r * 46 - h, transformOrigin: '50% 100%' })); }
  binds.push(t => els.forEach((e, i) => { e.style.transform = `skewX(${Math.sin(t * 1.25 + i * .8 + seed) * 4}deg)`; }));
  return els;
}
const sparkle = (s, c = '#fff4c2') => svg(s, '-50 -50 100 100', `<path d="M0 -50 Q6 -6 50 0 Q6 6 0 50 Q-6 6 -50 0 Q-6 -6 0 -50Z" fill="${c}"/>`);
/** twinkling sparkles around a box */
function sparkles(parent, n, x, y, w, h, t0, t1, seed = 0, c) {
  for (let i = 0; i < n; i++) { const s = E(parent, 'a', sparkle(26 + rnd(i + seed) * 34, c), { left: x + rnd(i + seed + 1) * w, top: y + rnd(i + seed + 2) * h, opacity: 0 });
    const k = Math.max(1, Math.floor((t1 - t0) / .9)); tl.fromTo(s, { opacity: 0, scale: 0, rotation: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: .45, yoyo: true, repeat: k * 2 - 1, ease: 'sine.inOut', immediateRender: false }, t0 + rnd(i + seed + 4) * .8); }
}
/* ───── the brain-wash ───── */
const HEAD_D = 'M170 700 L172 566 Q104 526 96 430 Q58 334 118 222 Q192 88 342 84 Q484 84 542 200 Q572 262 560 322 L602 402 Q608 418 588 424 L566 428 Q578 470 562 490 Q574 512 556 522 Q562 572 520 582 Q470 590 432 582 L422 700Z';
const headProfile = (w, rim = '#b8f53c') => svg(w, '0 0 640 700', `<path d="${HEAD_D}" fill="url(#kHead)"/><path d="${HEAD_D.replace('M170 700 ', 'M172 700 ').replace(' L422 700Z', ' L422 700')}" fill="none" stroke="${rim}" stroke-width="7" opacity=".85"/><path d="M200 300 Q230 160 360 140" stroke="#ffffff" stroke-opacity=".12" stroke-width="26" fill="none" stroke-linecap="round"/><circle cx="470" cy="300" r="10" fill="#0a1230"/>`);
/** washing drum: ring + glass; put tumbling things inside .tumble */
const washer = w => `<div style="position:relative;width:${w}px;height:${w}px">${svg(w, '-160 -160 320 320', `<circle r="156" fill="url(#kMetal)"/><circle r="130" fill="#0e1a44"/><circle r="122" fill="#18295e"/>${Array.from({ length: 24 }, (_, i) => `<circle cx="${Math.cos(i / 24 * 6.283) * 104}" cy="${Math.sin(i / 24 * 6.283) * 104}" r="6" fill="#0e1a44"/>`).join('')}`)}
  <div class="tumble" style="position:absolute;inset:0"></div>${svg(w, '-160 -160 320 320', `<circle r="124" fill="url(#kGlass)"/><path d="M-80 -78 Q-40 -116 20 -112" stroke="#fff" stroke-opacity=".5" stroke-width="12" fill="none" stroke-linecap="round"/><circle r="128" fill="none" stroke="#c9d6f2" stroke-width="10"/>`, 'position:absolute;left:0;top:0')}</div>`;
const bubble = s => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.9),rgba(170,220,255,.25) 35%,rgba(120,180,255,.08) 70%);border:2px solid rgba(220,240,255,.6)"></div>`;
const wordChip = (txt, bg = P.cream, fg = P.n1, fs = 44) => `<div style="padding:10px 26px 6px;border-radius:18px;background:${bg};color:${fg};font:800 ${fs}px/1.15 var(--font-bn-display);white-space:nowrap;box-shadow:0 10px 24px rgba(0,0,0,.35)">${txt}</div>`;
const funnel = w => svg(w, '0 0 300 300', `<path d="M10 20 H290 L180 170 V290 H120 V170Z" fill="url(#kMetal)"/><ellipse cx="150" cy="20" rx="140" ry="22" fill="#2a3a64"/><ellipse cx="150" cy="20" rx="124" ry="14" fill="#0e1a44"/><path d="M40 40 L140 168" stroke="#fff" stroke-opacity=".25" stroke-width="10"/>`);
const tvBox = (w, txt) => `<div style="width:${w}px;height:${w * .72}px;border-radius:${w * .08}px;background:#24397a;padding:${w * .06}px;box-shadow:0 20px 40px rgba(0,0,0,.4)"><div style="width:100%;height:100%;border-radius:${w * .05}px;background:radial-gradient(circle at 40% 30%,#ffe58a,#ff8a3d);display:grid;place-items:center;text-align:center;font:800 ${w * .12}px/1.15 var(--font-bn-display);color:#7a1f2a">${txt}</div></div>`;
/* ───── photoshoot ───── */
const phoneFrame = (w, h) => `<div style="position:relative;width:${w}px;height:${h}px;border-radius:70px;border:22px solid #0a1230;box-shadow:0 0 0 6px #35519c,0 40px 80px rgba(0,0,0,.6)">
  <div style="position:absolute;left:50%;top:14px;width:150px;height:34px;margin-left:-75px;border-radius:20px;background:#0a1230"></div>
  ${[[30, 90, '1 0 0 1'], [w - 120, 90, '0 1 1 0'], [30, h - 260, '1 0 0 1'], [w - 120, h - 260, '0 1 1 0']].map(([x, y], i) => `<div style="position:absolute;left:${x}px;top:${y}px;width:46px;height:46px;border:${i < 2 ? '6px 0 0' : '0 0 6px'} solid #fff;border-left-width:${i % 2 ? 0 : 6}px;border-right-width:${i % 2 ? 6 : 0}px;border-top-width:${i < 2 ? 6 : 0}px;border-bottom-width:${i < 2 ? 0 : 6}px;border-style:solid;border-color:#fff;opacity:.9"></div>`).join('')}
  <div class="rec" style="position:absolute;left:46px;top:40px;font:700 30px/1 var(--font-en-display);color:#fff;display:flex;gap:10px;align-items:center"><i style="width:20px;height:20px;border-radius:50%;background:#ef4b3f;display:block"></i>REC</div>
  <div style="position:absolute;left:50%;bottom:40px;width:120px;height:120px;margin-left:-60px;border-radius:50%;border:8px solid #fff"><div class="shut" style="position:absolute;inset:10px;border-radius:50%;background:#fff"></div></div></div>`;
const phoneSmall = (w = 60) => svg(w, '0 0 60 100', `<rect x="2" y="2" width="56" height="96" rx="10" fill="#0a1230"/><rect x="8" y="10" width="44" height="74" rx="4" fill="#5a78c4"/><circle cx="30" cy="90" r="4" fill="#35519c"/>`);
const polaroid = (w, inner, cap = '') => `<div style="width:${w}px;padding:${w * .05}px ${w * .05}px ${w * .2}px;background:#fbf8ef;border-radius:8px;box-shadow:0 30px 70px rgba(0,0,0,.55);position:relative"><div style="position:relative;width:100%;height:${w * .9}px;overflow:hidden;border-radius:4px">${inner}</div><div style="position:absolute;left:0;right:0;bottom:${w * .05}px;text-align:center;font:700 ${w * .075}px/1.2 var(--font-bn-display);color:#24397a">${cap}</div></div>`;
const bars = (w, h, n = 7) => svg(w, `0 0 ${w} ${h}`, Array.from({ length: n }, (_, i) => `<rect x="${(i + .5) * w / n - 9}" y="0" width="18" height="${h}" rx="9" fill="url(#kMetal)"/>`).join('') + `<rect x="0" y="0" width="${w}" height="26" rx="10" fill="#2a3a64"/><rect x="0" y="${h - 26}" width="${w}" height="26" rx="10" fill="#2a3a64"/>`);
/* ───── luxury / VIP ───── */
const crown = w => svg(w, '0 0 200 140', `<path d="M10 130 L20 30 L64 80 L100 10 L136 80 L180 30 L190 130Z" fill="url(#kGoldS)"/><path d="M10 130 H190 V110 H10Z" fill="#cf8a10"/><circle cx="100" cy="10" r="12" fill="#ef4b3f"/><circle cx="20" cy="30" r="10" fill="#b8f53c"/><circle cx="180" cy="30" r="10" fill="#b8f53c"/><circle cx="100" cy="100" r="11" fill="#ef4b3f"/><circle cx="60" cy="102" r="8" fill="#5a78c4"/><circle cx="140" cy="102" r="8" fill="#5a78c4"/>`);
const cushion = w => svg(w, '0 0 300 120', `<path d="M10 60 Q20 10 150 18 Q280 10 290 60 Q280 112 150 104 Q20 112 10 60Z" fill="#c4233b"/><path d="M30 50 Q150 30 270 50" stroke="#ff8aa0" stroke-width="8" fill="none" opacity=".5"/>${[[10, 60], [290, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="#ffc93c"/>`).join('')}`);
const shades = w => svg(w, '0 0 200 60', `<path d="M6 10 H194 V20 H6Z" fill="#0a1230"/><path d="M14 16 H92 Q92 56 54 56 Q14 56 14 16Z M108 16 H186 Q186 56 148 56 Q108 56 108 16Z" fill="#0a1230"/><path d="M26 24 L50 24 M120 24 L144 24" stroke="#5a78c4" stroke-width="6"/>`);
const priceTag = (w, txt, c = P.gold) => `<div style="position:relative;padding:12px 30px 8px 46px;background:${c};border-radius:12px 40px 40px 12px;font:800 ${w * .2}px/1.1 var(--font-bn-display);color:#24170a;white-space:nowrap;box-shadow:0 12px 26px rgba(0,0,0,.4)"><i style="position:absolute;left:16px;top:50%;width:16px;height:16px;margin-top:-8px;border-radius:50%;background:#0e1a44"></i>${txt}</div>`;
const sackK = (w, label, white = 0) => svg(w, '0 0 180 210', `<path d="M30 34 Q90 12 150 34 L164 176 Q90 204 16 176Z" fill="url(#${white ? 'kSackW' : 'kSack'})"/><path d="M30 34 Q90 52 150 34" stroke="${white ? '#8a93a8' : '#a8865a'}" stroke-width="8" fill="none"/><path d="M60 22 Q90 0 120 22" stroke="${white ? '#8a93a8' : '#a8865a'}" stroke-width="10" fill="none"/>
  <rect x="22" y="96" width="136" height="56" rx="10" fill="${white ? '#24397a' : '#5f9e1a'}"/><text x="90" y="134" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="27" fill="#fff">${label}</text>`);
const rope = w => svg(w, '0 0 400 140', `<rect x="10" y="30" width="22" height="110" rx="8" fill="url(#kGoldS)"/><rect x="368" y="30" width="22" height="110" rx="8" fill="url(#kGoldS)"/><circle cx="21" cy="28" r="18" fill="#ffc93c"/><circle cx="379" cy="28" r="18" fill="#ffc93c"/><path d="M21 44 Q200 120 379 44" stroke="#c4233b" stroke-width="18" fill="none" stroke-linecap="round"/>`);
/* ───── mill & money ───── */
const coinRow = (n, s = 40) => Array.from({ length: n }, () => coin(s)).join('');
const rollers = w => svg(w, '0 0 400 260', `<rect x="10" y="10" width="380" height="240" rx="30" fill="#24397a"/><rect x="10" y="10" width="380" height="40" rx="20" fill="#ef4b3f"/>${[120, 280].map(x => `<g class="rl"><circle cx="${x}" cy="150" r="72" fill="url(#kMetal)"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${x} 150 L${x + Math.cos(i * .785) * 72} ${150 + Math.sin(i * .785) * 72}" stroke="#2a3a64" stroke-width="6"/>`).join('')}<circle cx="${x}" cy="150" r="18" fill="#0e1a44"/></g>`).join('')}<text x="200" y="40" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="26" fill="#fff">পলিশার</text>`);
const flake = s => svg(s, '0 0 40 30', `<path d="M4 16 Q8 2 22 4 Q38 6 36 18 Q30 28 16 26 Q2 26 4 16Z" fill="#b5532f"/><path d="M10 12 Q18 8 28 12" stroke="#e08a5a" stroke-width="3" fill="none"/>`);
const nutri = (txt, c) => `<div style="padding:8px 20px 4px;border-radius:30px;background:${c};color:#fff;font:800 32px/1.2 var(--font-bn-display);white-space:nowrap;box-shadow:0 8px 18px rgba(0,0,0,.35)">${txt}</div>`;
const godown = w => svg(w, '0 0 700 470', `<path d="M20 470 V180 L350 40 L680 180 V470Z" fill="#a8553a"/>${Array.from({ length: 16 }, (_, i) => `<path d="M20 ${200 + i * 17} H680" stroke="#7a3a22" stroke-width="2" opacity=".6"/>`).join("")}<path d="M0 190 L350 30 L700 190 L700 160 L350 0 L0 160Z" fill="url(#kMetal)"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${30 + i * 48} ${178 - (i < 7 ? i : 13 - i) * 20} V${190 - (i < 7 ? i : 13 - i) * 20}" stroke="#2a3a64" stroke-width="4"/>`).join('')}
  <rect x="210" y="230" width="280" height="240" fill="#3a2418"/>${Array.from({ length: 9 }, (_, i) => `<path d="M210 ${250 + i * 26} H490" stroke="#5a3a28" stroke-width="5"/>`).join("")}<text x="350" y="214" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="46" fill="#ffc93c">গুদাম</text>`);
const drop = (s, c = '#ffc93c') => svg(s, '0 0 60 80', `<path d="M30 2 Q56 40 54 54 Q52 78 30 78 Q8 78 6 54 Q4 40 30 2Z" fill="${c}"/><ellipse cx="22" cy="50" rx="6" ry="10" fill="#fff" opacity=".6"/>`);
/** handi (cooking pot) with a rice mound whose height is set by .mound scaleY */
const handi = w => `<div style="position:relative;width:${w}px;height:${w * .9}px">${svg(w, '0 0 400 360', `<ellipse cx="200" cy="350" rx="170" ry="12" fill="#000" opacity=".3"/><path d="M50 110 Q20 330 200 350 Q380 330 350 110Z" fill="url(#kClay)"/><path d="M60 140 Q50 300 160 336" stroke="#fff" stroke-opacity=".2" stroke-width="16" fill="none" stroke-linecap="round"/><ellipse cx="200" cy="110" rx="160" ry="34" fill="#6e2a18"/>`)}
  <div class="mound" style="position:absolute;left:${w * .13}px;top:${w * .02}px;width:${w * .74}px;height:${w * .26}px;transform-origin:50% 100%">${svg(w * .74, '0 0 300 110', `<path d="M0 110 Q20 10 150 4 Q280 10 300 110Z" fill="#fbf8ef"/>${Array.from({ length: 50 }, (_, i) => { const x = 30 + rnd(i) * 240, y = 20 + rnd(i + 4) * 80; return `<ellipse cx="${x}" cy="${y}" rx="8" ry="3.4" transform="rotate(${rnd(i + 8) * 180} ${x} ${y})" fill="#e6dcc4"/>`; }).join('')}`)}</div></div>`;
/* ───── lab ───── */
const microscope = w => svg(w, '0 0 200 260', `<rect x="20" y="230" width="160" height="24" rx="10" fill="#24397a"/><path d="M60 230 Q40 150 100 120" stroke="#35519c" stroke-width="22" fill="none" stroke-linecap="round"/><rect x="92" y="20" width="36" height="130" rx="12" fill="#e9eef8" transform="rotate(-22 110 85)"/><rect x="70" y="170" width="90" height="12" rx="5" fill="#5a78c4"/><circle cx="130" cy="182" r="9" fill="#b8f53c"/>`);
const bowlK = (w, rice = '#fbf8ef', c = '#35519c', label = '') => svg(w, '0 0 300 170', `<ellipse cx="150" cy="60" rx="132" ry="30" fill="${rice}"/>${Array.from({ length: 36 }, (_, i) => { const x = 40 + rnd(i + w) * 220, y = 44 + rnd(i + 4) * 30; return `<ellipse cx="${x}" cy="${y}" rx="7" ry="2.6" transform="rotate(${rnd(i + 8) * 180} ${x} ${y})" fill="#000" opacity=".08"/>`; }).join('')}<path d="M18 60 Q30 160 150 164 Q270 160 282 60 Q150 96 18 60Z" fill="${c}"/><path d="M36 84 Q60 140 130 150" stroke="#fff" stroke-opacity=".2" stroke-width="12" fill="none" stroke-linecap="round"/>${label ? `<text x="150" y="128" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="34" fill="#fff">${label}</text>` : ''}`);
/** aroma plume: a wavy ribbon; .pl is animated (dash) by scenes */
const plume = (w, h, c = '#ffc93c') => svg(w, `0 0 ${w} ${h}`, [0, 1, 2].map(k => { let d = `M${w / 2 + (k - 1) * 22} ${h}`; for (let y = h - 60, i = 0; y > 0; y -= 60, i++) d += ` Q${w / 2 + (k - 1) * 22 + (i % 2 ? 1 : -1) * w * .35} ${y + 30} ${w / 2 + (k - 1) * 14} ${y}`; return `<path class="pl" d="${d}" stroke="${c}" stroke-width="${16 - k * 4}" fill="none" stroke-linecap="round" opacity="${.85 - k * .2}"/>`; }).join(''));
const medal = w => svg(w, '0 0 120 170', `<path d="M30 0 L56 70 L66 66 L44 0Z" fill="#ef4b3f"/><path d="M90 0 L64 70 L54 66 L76 0Z" fill="#5a78c4"/><circle cx="60" cy="110" r="52" fill="url(#kGoldS)"/><circle cx="60" cy="110" r="38" fill="none" stroke="#cf8a10" stroke-width="6"/><path d="M60 84 L67 102 L86 102 L71 114 L77 132 L60 121 L43 132 L49 114 L34 102 L53 102Z" fill="#fff4c2"/>`);
const payeshBowl = w => svg(w, '0 0 360 220', `<ellipse cx="180" cy="74" rx="164" ry="40" fill="url(#kMilk)"/><path class="swirl" d="M120 74 Q150 50 190 64 Q230 80 200 92 Q170 100 160 80" stroke="#e8c98a" stroke-width="7" fill="none" stroke-linecap="round"/>${[[110, 66], [240, 70], [200, 54], [150, 90], [270, 84]].map(([x, y], i) => i % 2 ? `<ellipse cx="${x}" cy="${y}" rx="11" ry="6" fill="#7a3a2a"/>` : `<path d="M${x - 12} ${y} Q${x} ${y - 14} ${x + 12} ${y}" stroke="#f0d9a8" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}
  <path d="M16 74 Q30 210 180 214 Q330 210 344 74 Q180 120 16 74Z" fill="url(#kClay)"/><path d="M40 100 Q70 180 160 194" stroke="#fff" stroke-opacity=".2" stroke-width="14" fill="none" stroke-linecap="round"/>`);
const pithaK = w => svg(w, '0 0 200 130', `<ellipse cx="100" cy="110" rx="90" ry="16" fill="#000" opacity=".25"/><path d="M14 80 Q14 20 100 18 Q186 20 186 80 Q186 116 100 118 Q14 116 14 80Z" fill="#fbf4e2"/><path d="M40 46 Q100 20 160 46 Q150 64 100 64 Q50 64 40 46Z" fill="#8a4a1e"/><path d="M30 86 Q60 108 110 108" stroke="#e6dcc4" stroke-width="8" fill="none" stroke-linecap="round"/>`);
const eraser = w => svg(w, '0 0 300 150', `<path d="M40 20 H280 Q296 20 296 36 V110 Q296 130 276 130 H40Z" fill="#ff8aa0"/><path d="M4 30 Q4 20 14 20 H120 V130 H14 Q4 130 4 120Z" fill="#5a78c4"/><path d="M40 20 H280" stroke="#fff" stroke-opacity=".5" stroke-width="8"/>`);
/** billboard as DOM so it can be shattered into clip-path shards */
const billboardHTML = (w, h, txt) => `<div style="position:absolute;inset:0;border-radius:24px;background:linear-gradient(160deg,#ff8a3d,#ef4b3f 60%,#a3262c);border:14px solid #0a1230;box-shadow:inset 0 0 0 6px #ffc93c;display:grid;place-items:center;text-align:center;font:800 ${w * .095}px/1.25 var(--font-bn-display);color:#fff4dc;text-shadow:0 6px 0 rgba(0,0,0,.25)">${txt}</div>`;
/** shatter: n×m jittered triangle shards; returns shard els (each a clipped copy of the html) */
function shards(parent, x, y, w, h, html, nx = 5, ny = 4, seed = 0) {
  const P2 = (i, j) => [i / nx * 100 + (i % nx && j % ny ? (rnd(i * 7 + j + seed) - .5) * 14 : 0), j / ny * 100 + (i % nx && j % ny ? (rnd(i + j * 9 + seed) - .5) * 14 : 0)], out = [];
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
    const a = P2(i, j), b = P2(i + 1, j), c = P2(i + 1, j + 1), d = P2(i, j + 1);
    [[a, b, c], [a, c, d]].forEach(tri => { const el = E(parent, 'a', html, { left: x, top: y, width: w, height: h, clipPath: `polygon(${tri.map(p => `${p[0]}% ${p[1]}%`).join(',')})` });
      el.cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 300; el.cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 300; out.push(el); });
  }
  return out;
}
const sunK = s => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle,#fff7cf,#ffd25a 45%,#ff8a3d 80%);box-shadow:0 0 ${s * .5}px ${s * .2}px rgba(255,190,80,.55)"></div>`;
const qMark = s => `<div style="font:900 ${s}px/1 var(--font-en-display);color:${P.gold};text-shadow:0 ${s * .05}px 0 ${P.goldD},0 0 ${s * .3}px rgba(255,201,60,.5)">?</div>`;
const lantern = s => svg(s, '0 0 60 100', `<path d="M30 0 V14" stroke="#0a1230" stroke-width="3"/><rect x="18" y="12" width="24" height="8" rx="3" fill="#cf8a10"/><path d="M8 50 Q8 20 30 20 Q52 20 52 50 Q52 80 30 80 Q8 80 8 50Z" fill="#ff8a3d"/><path d="M30 20 V80 M18 24 Q12 50 18 76 M42 24 Q48 50 42 76" stroke="#ffc93c" stroke-width="2" fill="none"/><rect x="20" y="80" width="20" height="8" rx="3" fill="#cf8a10"/>`);
const basket = w => svg(w, '0 0 200 110', `<path d="M10 20 H190 L170 104 H30Z" fill="#b8843a"/><path d="M14 40 H186 M20 62 H180 M26 84 H174" stroke="#7a5420" stroke-width="5"/><path d="M10 20 Q100 -30 190 20Z" fill="#ffd25a"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${30 + i * 11} 14 q4 -18 ${(i % 2 ? 8 : -6)} -30" stroke="#e8c547" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}`);
const ladle = (s = 1) => `<g transform="scale(${s})"><rect x="-4" y="-120" width="8" height="120" rx="4" fill="#8a5a34"/><ellipse cx="0" cy="-124" rx="20" ry="12" fill="#6e3f1c"/></g>`;
/** foreground strip for the bottom third (below the subtitles), on a fast parallax plane.
 *  kind: 'grass' (dark grass + rim-lit hill) · 'paddy' (dark ripe paddy) · 'foam' (soap bubbles) · 'crowd' (audience heads + phone flashes) · 'wood' (table edge) */
function fgStrip(Wd, kind = 'grass', seed = 0, col = '#050a20', rim = 'rgba(184,245,60,.28)') {
  const pl = Wd.plane(1.3);
  if (kind === 'grass' || kind === 'paddy') {
    E(pl, 'a', hillBand(1600, 560, col, seed, 6, 80, rim), { left: -260, top: 1640 });
    if (kind === 'paddy') paddyBand(pl, 1760, 1600, 2, 1, seed, 170, -260).forEach(e => { e.style.filter = 'brightness(.35) saturate(.6)'; });
    else [0, 1].forEach(i => E(pl, 'a', grassFG(800, col), { left: -200 + i * 760, top: 1560 }));
    const ff = Array.from({ length: 9 }, (_, i) => E(pl, 'a', `<div style="width:14px;height:14px;border-radius:50%;background:#e9ff9a;box-shadow:0 0 18px 8px rgba(184,245,60,.55)"></div>`, { left: 40 + rnd(i + seed) * 1000, top: 1640 + rnd(i + seed + 4) * 200 }));
    binds.push(t => ff.forEach((f, i) => { f.style.transform = `translate(${Math.sin(t * .7 + i) * 26}px,${Math.cos(t * .9 + i * 2) * 18}px)`; f.style.opacity = .3 + .7 * Math.abs(Math.sin(t * 1.3 + i)); }));
  } else if (kind === 'foam') {
    const bs = Array.from({ length: 22 }, (_, i) => E(pl, 'a', bubble(70 + rnd(i + seed) * 130), { left: -60 + i * 52 + rnd(i) * 30, top: 1640 + rnd(i + seed + 2) * 160 }));
    binds.push(t => bs.forEach((b, i) => { b.style.transform = `translate(${Math.sin(t * .8 + i) * 12}px,${Math.sin(t * 1.1 + i * 1.7) * 14}px)`; }));
  } else if (kind === 'crowd') {
    E(pl, 'a', svg(1300, '0 0 1300 360', Array.from({ length: 13 }, (_, i) => { const x = i * 100 + 50 + (i % 2) * 20, y = 120 + (i % 3) * 26; return `<circle cx="${x}" cy="${y}" r="56" fill="${col}"/><path d="M${x - 90} 360 Q${x - 90} ${y + 60} ${x} ${y + 60} Q${x + 90} ${y + 60} ${x + 90} 360Z" fill="${col}"/>`; }).join('') + `<path d="M0 60 H1300" stroke="${rim}" stroke-width="0"/>`), { left: -110, top: 1600 });
    const ph = [0, 1, 2, 3].map(i => E(pl, 'a', `<div style="width:46px;height:70px;border-radius:8px;background:#5a78c4;box-shadow:0 0 30px 8px rgba(160,190,255,.5)"></div>`, { left: 120 + i * 250 + (i % 2) * 60, top: 1600 + (i % 2) * 40 }));
    binds.push(t => ph.forEach((p, i) => { p.style.opacity = .35 + .65 * (Math.sin(t * 2.3 + i * 1.9) > .7 ? 1 : 0); }));
  } else if (kind === 'wood') {
    E(pl, 'a', '', { left: -300, top: 1640, width: 1700, height: 520, background: `linear-gradient(${col},#1a0a06 60%)`, borderTop: `10px solid ${rim}` });
    E(pl, 'a', svg(1600, '0 0 1600 300', Array.from({ length: 9 }, (_, i) => `<path d="M0 ${40 + i * 30} Q400 ${30 + i * 30 + (i % 2) * 14} 800 ${44 + i * 30} T1600 ${40 + i * 30}" stroke="#000" stroke-opacity=".18" stroke-width="3" fill="none"/>`).join('')), { left: -260, top: 1660 });
  }
  return pl;
}
