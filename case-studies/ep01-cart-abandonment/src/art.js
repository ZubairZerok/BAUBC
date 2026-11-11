/* EP02 art kit — flat "explainer" illustration (Kurzgesagt-inspired) in the BAUBC green palette.
 * Every asset is an SVG string built in code; shared gradients live in one hidden <defs>. */
const K = { night: '#05211a', deep: '#0a3427', mid: '#12503a', hill1: '#145c41', hill2: '#1d7a52', hill3: '#2a9a5f', leaf: '#37b26f',
  lime: '#c6ff1f', lime2: '#e4ff7a', cream: '#efe9dc', ink: '#0a0c06', on: '#c9348a', onD: '#6e1a4d', skin: '#f2b48c', skinD: '#d58e66',
  hair: '#1b1530', gold: '#ffc83d', red: '#ff4a3d', wood: '#c48450', woodD: '#7d4b26', teal: '#2fd3b5', mouth: '#7a1d3a' };
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="gOn" cx=".36" cy=".42" r=".8"><stop offset="0" stop-color="#ffa3d0"/><stop offset=".4" stop-color="#d4418f"/><stop offset="1" stop-color="#5e1642"/></radialGradient>
<radialGradient id="gOnR" cx=".36" cy=".42" r=".8"><stop offset="0" stop-color="#c7b46a"/><stop offset=".5" stop-color="#7a6a2e"/><stop offset="1" stop-color="#2e2610"/></radialGradient>
<linearGradient id="gNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead2a8"/><stop offset="1" stop-color="#b8406f"/></linearGradient>
<linearGradient id="gLeaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5f07a"/><stop offset="1" stop-color="#1c7d50"/></linearGradient>
<linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d2925a"/><stop offset="1" stop-color="#8a5530"/></linearGradient>
<linearGradient id="gHi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a8f86"/><stop offset="1" stop-color="#06302e"/></linearGradient>
</defs></svg>`);
const svg = (w, vb, body, css = '') => { const [, , vw, vh] = vb.split(' ').map(Number); return `<svg width="${w}" height="${w * vh / vw}" viewBox="${vb}" style="display:block;overflow:visible;${css}">${body}</svg>`; };
function person(w, o = {}) {
  const sh = o.shirt || '#8fd14f', hr = o.hair || K.hair, sk = o.skin || K.skin, ex = o.expr || 'happy', po = o.pose || 'down';
  const A = { down: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C160 262 164 292 160 318', 160, 318],
    think: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C178 262 158 198 126 180', 124, 178],
    talk: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C184 248 198 214 196 184', 196, 180],
    hold: ['M58 236 C44 262 58 284 78 288', 78, 288, 'M142 236 C156 262 142 284 122 288', 122, 288],
    shrug: ['M58 236 C30 242 22 214 30 194', 30, 190, 'M142 236 C170 242 178 214 170 194', 170, 190] }[po];
  const brow = { happy: 'M68 118 Q80 111 92 118 M108 118 Q120 111 132 118', talk: 'M68 116 Q80 110 92 116 M108 114 Q120 108 132 114', think: 'M68 120 Q80 114 92 120 M108 112 Q120 106 132 114',
    shock: 'M68 108 Q80 100 92 108 M108 108 Q120 100 132 108', smirk: 'M68 120 L92 124 M108 124 L132 118' }[ex];
  const mouth = { happy: `<path d="M84 158 Q100 178 116 158Z" fill="${K.mouth}"/>`, talk: `<ellipse class="mo" cx="100" cy="164" rx="11" ry="8" fill="${K.mouth}"/>`,
    think: `<path d="M90 165 Q100 160 110 166" stroke="${K.mouth}" stroke-width="4" fill="none" stroke-linecap="round"/>`, shock: `<ellipse cx="100" cy="166" rx="8" ry="11" fill="${K.mouth}"/>`,
    smirk: `<path d="M86 164 Q104 170 116 158" stroke="${K.mouth}" stroke-width="4.5" fill="none" stroke-linecap="round"/>` }[ex];
  const hat = o.hat === 'straw' ? `<ellipse cx="100" cy="84" rx="94" ry="20" fill="#e2ad3f"/><path d="M58 86 C58 36 142 36 142 86Z" fill="#f6d06b"/><rect x="58" y="70" width="84" height="12" fill="#b5482f"/><ellipse cx="100" cy="84" rx="94" ry="20" fill="url(#gHi)"/>`
    : o.hat === 'cap' ? `<path d="M48 104 C48 52 152 52 152 104Z" fill="${o.capc || '#e05a3a'}"/><path d="M140 98 L190 106 L146 112Z" fill="${o.capc || '#e05a3a'}"/>` : '';
  const arm = (d, hx, hy, cls) => `<g class="${cls}"><path d="${d}" stroke="${sh}" stroke-width="28" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="13" fill="${sk}"/></g>`;
  return svg(w, '0 0 200 330', `${o.long ? `<path d="M44 128 C38 206 58 226 72 236 L128 236 C142 226 162 206 156 128Z" fill="${hr}"/>` : ''}
    <path d="M38 330 C36 250 58 212 100 212 C142 212 164 250 162 330Z" fill="${sh}"/><path d="M38 330 C36 250 58 212 100 212 C142 212 164 250 162 330Z" fill="url(#gHi)"/>
    ${o.apron ? `<path d="M72 216 L82 330 M128 216 L118 330" stroke="#b5482f" stroke-width="9"/>` : ''}
    <rect x="86" y="176" width="28" height="44" rx="10" fill="${K.skinD}"/>
    ${arm(A[0], A[1], A[2], 'armL')}
    <g class="head"><circle cx="47" cy="134" r="10" fill="${K.skinD}"/><circle cx="153" cy="134" r="10" fill="${K.skinD}"/><circle cx="100" cy="128" r="54" fill="${sk}"/>
    <path d="M46 126 C38 60 92 50 104 62 C124 50 168 70 156 126 C150 98 132 90 112 94 C96 98 76 92 62 104 C54 110 50 118 46 126Z" fill="${hr}"/>
    <g class="eyes"><ellipse cx="80" cy="136" rx="6" ry="8" fill="#161226"/><ellipse cx="120" cy="136" rx="6" ry="8" fill="#161226"/><circle cx="82" cy="133" r="2" fill="#fff"/><circle cx="122" cy="133" r="2" fill="#fff"/></g>
    <path class="brows" d="${brow}" stroke="${hr}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="68" cy="154" r="9" fill="#ff7d7d" opacity=".35"/><circle cx="132" cy="154" r="9" fill="#ff7d7d" opacity=".35"/>${mouth}${hat}</g>
    ${arm(A[3], A[4], A[5], 'armR')}`, o.css);
}
const cloud = (w, c = '#1c5e47') => svg(w, '0 0 200 90', `<path d="M30 80 C0 80 0 46 30 46 C30 14 76 6 92 30 C104 8 150 10 152 44 C186 40 196 80 166 80Z" fill="${c}"/>`);
const sprout = w => svg(w, '0 0 80 100', `<path d="M40 100 C36 60 28 30 18 0 C36 30 44 62 44 100Z M42 100 C44 64 52 36 66 8 C56 40 50 70 48 100Z M38 100 C30 74 18 56 2 44 C22 56 34 72 42 100Z M44 100 C54 78 64 66 80 58 C66 70 56 84 50 100Z" fill="url(#gLeaf)"/>`);
const fly = w => svg(w, '0 0 30 24', `<ellipse cx="9" cy="7" rx="7" ry="5" fill="#dff" opacity=".7"/><ellipse cx="20" cy="6" rx="7" ry="5" fill="#dff" opacity=".7"/><ellipse cx="15" cy="15" rx="7" ry="6" fill="#141a10"/><circle cx="21" cy="13" r="3" fill="#7a1d1d"/>`);
const coin = s => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#ffc83d 45%,#b07a10);box-shadow:inset 0 -${s * .08}px 0 rgba(0,0,0,.25);display:grid;place-items:center;font:800 ${s * .55}px/1 var(--font-bn-display);color:#7a4f00">৳</div>`;
/** layered hills band from y to the bottom of the frame */
function hills(parent, y, cols = [K.hill1, K.hill2, K.hill3], css = {}) {
  return E(parent, 'a', svg(1080, '0 0 1080 900', `<path d="M0 120 C180 40 320 90 470 60 C640 26 820 110 1080 50 V900 H0Z" fill="${cols[0]}"/>
    <path d="M0 230 C220 150 420 230 600 180 C780 132 920 210 1080 170 V900 H0Z" fill="${cols[1]}"/>
    <path d="M0 340 C260 290 520 350 760 310 C900 290 1000 300 1080 296 V900 H0Z" fill="${cols[2]}"/>`), Object.assign({ left: 0, top: y, width: 1080 }, css));
}

/* ═════ EP01 story kit — flat 2D vector only (no 3D) ═════ */
const N = { sky0: '#04201a', sky1: '#0c4233', h1: '#0b3a2c', h2: '#0e4a37', h3: '#125a42', g1: '#16684a', g2: '#0d3d2d', moon: '#f4f1cf' };
const STARS = (() => { const c = document.createElement('canvas'); c.width = 1080; c.height = 1300; const x = c.getContext('2d');
  for (let i = 0; i < 260; i++) { const r = .6 + rnd(i + 2) * 1.9; x.globalAlpha = .25 + rnd(i + 5) * .75; x.fillStyle = i % 5 ? '#efe9dc' : '#c6ff1f'; x.beginPath(); x.arc(rnd(i) * 1080, rnd(i + 9) * rnd(i + 9) * 1300, r, 0, 6.283); x.fill(); }
  return c.toDataURL(); })();
/** night sky plane with stars + moon (returns the plane; .moon is inside) */
function nightSky(W, o = {}) {
  const s = W.plane(.04, { background: `linear-gradient(${o.top || N.sky0},${o.bot || N.sky1} 70%)`, left: -150, top: -150, width: 1380, height: 2220 });
  E(s, 'a', '', { left: 150, top: 150, width: 1080, height: 1300, backgroundImage: `url(${STARS})` });
  const [mx, my, ms] = o.moon || [760, 300, 190];
  E(s, 'a moon', `<div style="position:absolute;inset:-90%;border-radius:50%;background:radial-gradient(circle,rgba(198,255,31,.22),rgba(198,255,31,0) 62%)"></div><div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 38% 34%,#fffde0,${N.moon} 60%,#cfd3a0);box-shadow:inset -18px -14px 0 rgba(120,130,70,.28)"></div><div style="position:absolute;left:24%;top:30%;width:18%;height:18%;border-radius:50%;background:rgba(120,130,70,.25)"></div><div style="position:absolute;left:56%;top:54%;width:11%;height:11%;border-radius:50%;background:rgba(120,130,70,.22)"></div>`, { left: 150 + mx, top: 150 + my, width: ms, height: ms });
  return s;
}
const tree = (w, a = '#0f4a37', b = '#156048') => svg(w, '0 0 200 260', `<rect x="90" y="150" width="20" height="110" rx="8" fill="#3a2a1a"/><circle cx="100" cy="100" r="78" fill="${a}"/><circle cx="56" cy="134" r="50" fill="${a}"/><circle cx="148" cy="130" r="54" fill="${a}"/><circle cx="118" cy="76" r="50" fill="${b}"/><circle cx="74" cy="92" r="34" fill="${b}"/>`);
const palm = (w, c = '#0c3a2c') => svg(w, '0 0 200 420', `<path d="M96 420 C92 300 100 200 108 96" stroke="${c}" stroke-width="13" fill="none" stroke-linecap="round"/>${[[-78, -8], [-52, -52], [-8, -78], [44, -62], [80, -22], [70, 34], [-66, 40]].map(([x, y]) => `<path d="M108 96 Q${108 + x * .7} ${96 + y * .9 - 22} ${108 + x * 1.15} ${96 + y * 1.15 + 16} Q${108 + x * .6} ${96 + y * .6 + 4} 108 96Z" fill="${c}"/>`).join('')}`);
const grassFG = (w, c = '#061c14') => svg(w, '0 0 400 200', Array.from({ length: 34 }, (_, i) => { const x = i * 12 + rnd(i) * 8, h = 70 + rnd(i + 3) * 120, b = (rnd(i + 6) - .5) * 50; return `<path d="M${x - 7} 200 Q${x + b * .4} ${200 - h * .6} ${x + b} ${200 - h} Q${x + b * .5 + 5} ${200 - h * .55} ${x + 8} 200Z" fill="${c}"/>`; }).join(''));
const cobweb = (w, c = 'rgba(239,233,220,.75)') => svg(w, '0 0 200 200', `<g stroke="${c}" stroke-width="2.2" fill="none">${[0, 18, 38, 58, 78, 90].map(a => `<path d="M0 0 L${200 * Math.cos(a * Math.PI / 180)} ${200 * Math.sin(a * Math.PI / 180)}"/>`).join('')}${[50, 95, 140, 185].map(r => `<path d="M${r} 0 ${[18, 38, 58, 78, 90].map(a => `Q${r * .93 * Math.cos((a - 10) * Math.PI / 180)} ${r * .93 * Math.sin((a - 10) * Math.PI / 180)} ${r * Math.cos(a * Math.PI / 180)} ${r * Math.sin(a * Math.PI / 180)}`).join(' ')}"/>`).join('')}</g>`);
const ITEMS = [['shirt', '#ff7a59'], ['phones', '#8f7dff'], ['watch', '#29c7ff']];
const item = (i, s) => `<div style="width:${s}px;height:${s}px;border-radius:${s * .26}px;background:${ITEMS[i][1]};display:grid;place-items:center;box-shadow:inset 0 -${s * .07}px 0 rgba(0,0,0,.2),inset 0 ${s * .05}px 0 rgba(255,255,255,.25)">${ico(ITEMS[i][0], s * .62, '#0a0c06', 2.2)}</div>`;
/** the hero: a shopping cart with a face. classes: .wl .wr wheels · .pu pupils · .lid eyelids · .mh/.ms/.mo mouths */
function cartSVG(w, o = {}) {
  const col = o.col || '#c6ff1f', dk = o.dark || '#6f9a00', fr = o.frame || '#efe9dc';
  const wheel = (x, k) => `<g class="${k}"><circle cx="${x}" cy="174" r="18" fill="#10130c"/><circle cx="${x}" cy="174" r="8" fill="${fr}"/><path d="M${x} 158 V190 M${x - 16} 174 H${x + 16}" stroke="${fr}" stroke-width="3"/></g>`;
  return svg(w, '0 0 220 200', `<path d="M6 34 H32 L50 60" stroke="${fr}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M62 134 L54 156 H180" stroke="${fr}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 58 H212 L190 136 H62Z" fill="${col}"/><path d="M40 58 H212 L208 71 H44Z" fill="#fff" opacity=".3"/><path d="M40 58 H212 L190 136 H62Z" fill="url(#gHi)" opacity=".5"/>
    <path d="M84 60 L96 134 M128 60 V134 M172 60 L160 134 M48 84 H205 M56 110 H197" stroke="${dk}" stroke-width="4" opacity=".5"/>
    ${wheel(80, 'wl')}${wheel(166, 'wr')}
    ${o.face === false ? '' : `<g class="face"><ellipse cx="104" cy="95" rx="15" ry="17" fill="#fff"/><ellipse cx="148" cy="95" rx="15" ry="17" fill="#fff"/>
      <g class="pu"><circle cx="106" cy="97" r="8" fill="#10130c"/><circle cx="150" cy="97" r="8" fill="#10130c"/><circle cx="109" cy="94" r="2.6" fill="#fff"/><circle cx="153" cy="94" r="2.6" fill="#fff"/></g>
      <g class="lid"><rect x="86" y="58" width="82" height="20" fill="${col}"/><rect x="86" y="75" width="82" height="4" fill="${dk}" opacity=".6"/></g>
      <path class="mh" d="M112 119 Q126 133 140 119" stroke="#10130c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path class="ms" d="M113 128 Q126 116 139 128" stroke="#10130c" stroke-width="5" fill="none" stroke-linecap="round" opacity="0"/>
      <ellipse class="mo" cx="126" cy="123" rx="7" ry="9" fill="#10130c" opacity="0"/>
      <circle cx="88" cy="116" r="7" fill="#ff7d7d" opacity=".4"/><circle cx="164" cy="116" r="7" fill="#ff7d7d" opacity=".4"/></g>`}`);
}
/** cart element: items sit behind the basket front. returns el with helpers */
function mkCart(parent, w, css, o = {}) {
  const el = E(parent, 'a', `<div class="it" style="position:absolute;left:${w * .22}px;top:${w * .02}px;width:${w * .7}px;height:${w * .5}px"></div>${cartSVG(w, o)}`, Object.assign({ width: w, height: w * 200 / 220 }, css));
  el._w = w; el._x = 0; el.it = el.firstChild;
  el.add = (i, k = 0) => E(el.it, 'a', item(i, w * .26), { left: w * (.02 + k * .2), top: w * (.06 - (k % 2) * .05), transform: `rotate(${(k - 1) * 9}deg)` });
  return el;
}
const cMood = (el, m, t) => { tl.to($('.lid', el), { y: { happy: 0, sad: 11, sleepy: 19, shock: -3 }[m], duration: .18 }, t); ['mh', 'ms', 'mo'].forEach(k => tl.set($('.' + k, el), { opacity: ({ happy: 'mh', sad: 'ms', sleepy: 'ms', shock: 'mo' })[m] === k ? 1 : 0 }, t)); };
const cLook = (el, x, y, t, d = .25) => tl.to($('.pu', el), { x, y, duration: d, ease: 'power2.out' }, t);
function cRoll(el, x1, t, d, ease = 'none') {
  const deg = (x1 - el._x) / (18 * el._w / 220) * 57.3; el._x = x1;
  tl.to(el, { x: x1, duration: d, ease }, t).to($('.wl', el), { rotation: '+=' + deg, svgOrigin: '80 174', duration: d, ease }, t).to($('.wr', el), { rotation: '+=' + deg, svgOrigin: '166 174', duration: d, ease }, t);
}
const cHop = (el, t, h = 40) => tl.to(el, { y: '-=' + h, duration: .16, ease: 'power2.out', yoyo: true, repeat: 1 }, t);
/** full-body flat character = person() + kameez/pants + legs (.lgL .lgR) */
function folk(w, o = {}) {
  const fem = !!o.long, c1 = o.shirt || '#ffc83d', c2 = o.pant || (fem ? '#efe9dc' : '#24332d');
  const leg = (x, k) => `<g class="${k}"><rect x="${x}" y="${fem ? 60 : 0}" width="30" height="${fem ? 158 : 218}" rx="12" fill="${c2}"/><ellipse cx="${x + 20}" cy="226" rx="24" ry="12" fill="#2a1a10"/></g>`;
  return `<div class="folk" style="position:relative;width:${w}px;height:${w * 2.8}px"><svg width="${w}" height="${w * 1.25}" viewBox="0 0 200 250" style="position:absolute;left:0;top:${w * 1.6}px;overflow:visible">${leg(62, 'lgL')}${leg(108, 'lgR')}${fem ? `<path d="M38 -6 H162 L178 118 Q100 140 22 118Z" fill="${c1}"/><path d="M38 -6 H162 L178 118 Q100 140 22 118Z" fill="#000" opacity=".1"/>` : `<rect x="40" y="-6" width="120" height="44" rx="10" fill="${c2}"/>`}</svg>
    <div style="position:absolute;left:0;top:0">${person(w, o)}</div>${fem ? `<svg width="${w}" height="${w * 1.65}" viewBox="0 0 200 330" style="position:absolute;left:0;top:0"><path d="M54 228 Q100 266 146 228 L154 246 Q100 296 46 246Z" fill="${o.orna || '#e8508a'}"/><path d="M140 236 L158 330 L138 330 L128 252Z" fill="${o.orna || '#e8508a'}"/></svg>` : ''}</div>`;
}
/** character with switchable expression/pose variants + walk cycle */
function actor(parent, w, base, variants, css) {
  const el = E(parent, 'a', '', Object.assign({ width: w, height: w * 2.8 }, css)), v = {};
  Object.entries(variants).forEach(([n, o], i) => { v[n] = E(el, 'a', folk(w, Object.assign({}, base, o)), { left: 0, top: 0, opacity: i ? 0 : 1 }); });
  const show = (n, t) => Object.keys(v).forEach(k => tl.set(v[k], { opacity: k === n ? 1 : 0 }, t));
  const walk = (x1, t, d, ease = 'none') => {
    const n = Math.max(2, Math.round(d / .24) * 2);
    tl.to(el, { x: x1, duration: d, ease }, t).to(el, { y: '-=7', duration: d / n / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t);
    el.querySelectorAll('.lgL').forEach(l => tl.fromTo(l, { rotation: -15, svgOrigin: '77 0' }, { rotation: 15, duration: d / n, yoyo: true, repeat: n - 1, ease: 'sine.inOut', immediateRender: false }, t).set(l, { rotation: 0 }, t + d));
    el.querySelectorAll('.lgR').forEach(l => tl.fromTo(l, { rotation: 15, svgOrigin: '123 0' }, { rotation: -15, duration: d / n, yoyo: true, repeat: n - 1, ease: 'sine.inOut', immediateRender: false }, t).set(l, { rotation: 0 }, t + d));
  };
  return { el, show, walk, face: (dir, t) => tl.set(el, { scaleX: dir }, t) };
}
const MITU = { shirt: '#ffc83d', long: true, hair: '#2a1a12', skin: '#d99a6c', orna: '#e8508a' };
/** bazaar stall with awning + Bangla signboard */
function stall(w, col, name, goods) {
  const sc = Array.from({ length: 8 }, (_, i) => `<path d="M${i * 50} 0 h50 v46 a25 25 0 0 1 -50 0z" fill="${i % 2 ? '#efe9dc' : col}"/>`).join('');
  return `<div style="position:relative;width:${w}px;height:${w * 1.02}px"><div style="position:absolute;left:5%;right:5%;top:26%;bottom:0;background:linear-gradient(#17594a,#0b3328);border-radius:10px 10px 0 0"></div>
    <div style="position:absolute;left:8%;right:8%;top:40%;height:36%;display:flex;gap:${w * .03}px;justify-content:center;align-items:flex-end">${goods}</div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:23%;background:linear-gradient(#c48450,#7d4b26);border-radius:8px;box-shadow:inset 0 8px 0 rgba(255,255,255,.18)"></div>
    <svg viewBox="0 0 400 80" style="position:absolute;left:0;top:19%;width:100%;overflow:visible">${sc}<rect width="400" height="10" fill="#000" opacity=".2"/></svg>
    <div style="position:absolute;left:10%;right:10%;top:0;height:19%;display:grid;place-items:center;background:#07140f;border:4px solid ${col};border-radius:16px;color:${col};font:800 ${w * .095}px/1 var(--font-bn-display);box-shadow:0 0 30px ${col}55">${name}</div></div>`;
}
/** the "অর্ডার কনফার্ম" gate: glowing arch */
const gate = (w, label = 'অর্ডার কনফার্ম') => `<div style="position:relative;width:${w}px;height:${w * 1.5}px"><div class="gl" style="position:absolute;left:-40%;right:-40%;top:-10%;bottom:-6%;border-radius:50%;background:radial-gradient(ellipse,rgba(198,255,31,.38),rgba(198,255,31,0) 62%)"></div>
  ${svg(w, '0 0 200 300', `<path d="M10 300 V110 A90 90 0 0 1 190 110 V300 H150 V112 A50 50 0 0 0 50 112 V300Z" fill="#134a39"/><path d="M10 300 V110 A90 90 0 0 1 190 110 V300 H176 V112 A76 76 0 0 0 24 112 V300Z" fill="#1d6a50"/>
    <path class="door" d="M50 300 V112 A50 50 0 0 1 150 112 V300Z" fill="#c6ff1f"/><path d="M50 300 V112 A50 50 0 0 1 150 112 V300Z" fill="url(#gHi)"/><path d="M78 196 l16 16 l30 -34" stroke="#0a0c06" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M100 18 V-14 M100 -14 L128 -4 L100 6" stroke="#efe9dc" stroke-width="5" fill="#ff7a59"/>`)}
  <div style="position:absolute;left:-22%;right:-22%;top:-17%;display:grid;place-items:center"><span class="chip" style="font-size:${w * .15}px;padding:8px 20px 4px;background:#07140f">${label}</span></div></div>`;
/** drifting fog blobs inside el */
function fog(el, n, x0, x1, y0, y1, col = '190,220,200', a = .22, seed = 0) {
  const bs = Array.from({ length: n }, (_, i) => E(el, 'a', '', { left: 0, top: y0 + rnd(i + seed) * (y1 - y0), width: 380 + rnd(i + 2) * 300, height: 120 + rnd(i + 4) * 90, borderRadius: '50%', background: `radial-gradient(ellipse,rgba(${col},${a}),rgba(${col},0) 68%)` }));
  binds.push(T2 => bs.forEach((b, i) => { const span = x1 - x0 + 500, x = ((rnd(i + 7 + seed) * span + T2 * (14 + rnd(i) * 22) * (i % 2 ? 1 : -1)) % span + span) % span + x0 - 250; b.style.transform = `translateX(${x}px)`; }));
}
/** deterministic firework burst */
function burst(parent, x, y, t, n = 22, cols = ['#c6ff1f', '#efe9dc', '#ffc83d', '#29c7ff'], R = 300) {
  for (let i = 0; i < n; i++) { const k = E(parent, 'a', '', { left: x, top: y, width: 12 + (i % 3) * 6, height: 12 + (i % 3) * 6, borderRadius: i % 2 ? '50%' : '3px', background: cols[i % cols.length], opacity: 0 });
    const a = i / n * 6.283 + rnd(i + x) * .5, d = R * (.5 + rnd(i + y) * .6);
    tl.fromTo(k, { opacity: 1, x: 0, y: 0, scale: 1 }, { x: Math.cos(a) * d, y: Math.sin(a) * d, duration: .7, ease: 'power3.out', immediateRender: false }, t).to(k, { y: '+=130', opacity: 0, scale: .3, duration: .8, ease: 'power1.in' }, t + .7); }
}
/** ground detail: grass tufts + stones scattered below the ground line gy */
function tufts(el, gy, n = 9, x0 = -100, x1 = 1180, seed = 0) {
  for (let i = 0; i < n; i++) { const w = 120 + rnd(i + seed) * 170, base = gy + 46 + rnd(i + seed + 6) * 340;
    E(el, 'a', grassFG(w, i % 2 ? '#0c4d38' : '#0a3d2d'), { left: x0 + rnd(i + seed + 3) * (x1 - x0), top: base - w / 2 });
    if (i % 3 === 0) E(el, 'a', '', { left: x0 + rnd(i + seed + 9) * (x1 - x0), top: gy + 70 + rnd(i + seed + 12) * 300, width: 70 + rnd(i) * 60, height: 24, borderRadius: '50%', background: '#0a3024' }); }
}
