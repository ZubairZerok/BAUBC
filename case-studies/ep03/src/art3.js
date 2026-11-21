/* EP03 v3 — premium kit: baked textures (SVG noise filters rasterised ONCE into canvases), particle fire,
 * isometric (2.5D) machines & buildings, a procedurally drawn brain, oil-drop physics, top-view dishes, daylight skies.
 * Baked SVGs can't use web fonts → all Bangla text is DOM laid over them. */
window.BAKES = [];
const bsvg = (w, h, body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${TXDEFS}${defs}</defs>${body}</svg>`;
/** rasterise an SVG string (filters allowed) into a canvas once; returns the canvas element's HTML */
function bake(svgStr, w, h, sc = 1.5) {
  const id = 'bk' + BAKES.length, url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
  BAKES.push(new Promise(res => { const im = new Image(); im.onload = () => { const c = document.getElementById(id); if (c) c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); else console.error('bake target missing', id); res(); };
    im.onerror = () => { console.error('bake failed', id); res(); }; im.src = url; }));
  return `<canvas id="${id}" width="${Math.round(w * sc)}" height="${Math.round(h * sc)}" style="display:block;width:${w}px;height:${h}px"></canvas>`;
}
/* texture filters: noise is clipped to the shape it is applied to (operator="in") */
const NZ = (id, fx, fy, oct, rgb, k, off, seed = 1, type = 'fractalNoise') => { const [r, g, b] = rgb; return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="${type}" baseFrequency="${fx} ${fy}" numOctaves="${oct}" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${k} 0 0 0 ${off}"/><feComposite in2="SourceGraphic" operator="in"/></filter>`; };
const TXDEFS = [
  NZ('tDark', .035, .035, 4, [0, 0, 0], 1.6, -.62, 3), NZ('tLight', .05, .05, 3, [1, 1, 1], 1.4, -.78, 9),
  NZ('tPlaster', .008, .011, 5, [.25, .12, .05], 2.0, -.85, 21), NZ('tSpeck', .9, .9, 1, [0, 0, 0], 2.2, -1.25, 5),
  NZ('tBrush', .002, .35, 2, [1, 1, 1], 1.5, -.72, 7), NZ('tBrushD', .003, .5, 2, [0, 0, 0], 1.7, -.8, 11),
  NZ('tRust', .006, .05, 4, [.55, .22, .06], 2.6, -1.35, 13), NZ('tWood', .012, .18, 3, [.2, .08, .02], 2.0, -.85, 17, 'turbulence'),
  NZ('tConc', .02, .02, 5, [0, 0, 0], 1.2, -.5, 29), NZ('tCream', .015, .02, 4, [.6, .4, .15], 1.6, -.82, 31),
  '<filter id="fBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>',
  '<filter id="fBlur6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>',
].join('');
/** shape + texture overlays (filters reference TXDEFS ids) */
const tex = (shape, fill, ...fx) => shape.replace('FILL', fill) + fx.map(([f, o]) => shape.replace('FILL', '#fff').replace('/>', ` filter="url(#${f})" opacity="${o}"/>`)).join('');
/* ───── isometric projection ───── */
const ip = (X, Y, Z, ox = 0, oy = 0) => [ox + (X - Y) * .866, oy + (X + Y) * .5 - Z];
const pts = a => a.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
/** iso box: returns svg string; o.t/o.l/o.r face fills; o.tx = [[filter,opacity]] texture on all faces */
function isoBox(X, Y, Z, w, d, h, o) {
  const P = (a, b, c) => ip(a, b, c, o.ox || 0, o.oy || 0);
  const T = [P(X, Y, Z + h), P(X + w, Y, Z + h), P(X + w, Y + d, Z + h), P(X, Y + d, Z + h)], L = [P(X, Y + d, Z), P(X + w, Y + d, Z), P(X + w, Y + d, Z + h), P(X, Y + d, Z + h)], R = [P(X + w, Y, Z), P(X + w, Y + d, Z), P(X + w, Y + d, Z + h), P(X + w, Y, Z + h)];
  const f = (pp, fill) => tex(`<polygon points="${pts(pp)}" fill="FILL"/>`, fill, ...(o.tx || []));
  return (o.noTop ? '' : f(T, o.t)) + f(L, o.l) + f(R, o.r) + (o.edge ? `<polyline points="${pts([L[3], L[2], R[3]])}" fill="none" stroke="${o.edge}" stroke-width="2"/>` : '');
}
/** iso vertical cylinder (silo/tank): base centre X,Y, radius r, height h; ribbed body + cone/flat top */
function isoCyl(X, Y, r, h, o) {
  const [cx, cy] = ip(X, Y, 0, o.ox || 0, o.oy || 0), rx = r * 1.22, ry = r * .7, top = cy - h, id = 'cg' + Math.round(cx * 7 + cy);
  const ribs = Array.from({ length: Math.floor(h / (o.rib || 26)) }, (_, i) => { const y = cy - i * (o.rib || 26); return `<path d="M${cx - rx} ${y} A${rx} ${ry} 0 0 0 ${cx + rx} ${y}" fill="none" stroke="#000" stroke-opacity=".16" stroke-width="2.5"/>`; }).join('');
  return `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${o.c2}"/><stop offset=".35" stop-color="${o.c1}"/><stop offset=".55" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".62" stop-color="${o.c1}"/><stop offset="1" stop-color="${o.c3}"/></linearGradient></defs>
    <path d="M${cx - rx} ${top} V${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy} V${top}Z" fill="url(#${id})"/><path d="M${cx - rx} ${top} V${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy} V${top}Z" fill="#fff" filter="url(#tBrushD)" opacity=".45"/>${(o.rust ?? .5) ? `<path d="M${cx - rx} ${top} V${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy} V${top}Z" fill="#fff" filter="url(#tRust)" opacity="${o.rust ?? .5}"/>` : ''}${ribs}
    ${o.cone ? `<path d="M${cx - rx} ${top} A${rx} ${ry} 0 0 0 ${cx + rx} ${top} L${cx} ${top - o.cone}Z" fill="${o.c3}"/><path d="M${cx - rx} ${top} A${rx} ${ry} 0 0 0 ${cx} ${top + ry} L${cx} ${top - o.cone}Z" fill="${o.c1}"/>` : `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="${o.c1}"/><ellipse cx="${cx}" cy="${top}" rx="${rx * .8}" ry="${ry * .8}" fill="${o.c2}"/>`}`;
}
/* ───── daylight sky ───── */
function skyDay(Wd, o = {}) {
  const sky = Wd.plane(.04, { left: -260, top: -260, width: 1600, height: 2440, background: `linear-gradient(${o.top || '#3f9be0'},${o.mid || '#9fd6ff'} 45%,${o.low || '#fff0cc'} 75%)` });
  if (o.sun !== false) godrays(Wd.plane(.05), (o.sx ?? 760) + 110, (o.sy ?? 260) + 110, 1500, 16);
  if (o.sun !== false) E(Wd.plane(.06), 'a', `<div style="width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,#fffbe8,#fff1b0 45%,rgba(255,220,120,0) 70%);box-shadow:0 0 160px 80px rgba(255,236,170,.55)"></div>`, { left: o.sx ?? 760, top: o.sy ?? 260 });
  const cl = Wd.plane(.1), CL = Array.from({ length: o.clouds ?? 6 }, (_, i) => E(cl, 'a', svg(260 + rnd(i + 3) * 220, '0 0 200 90', `<path d="M30 80 C0 80 0 46 30 46 C30 14 76 6 92 30 C104 8 150 10 152 44 C186 40 196 80 166 80Z" fill="#fff" opacity=".92"/><path d="M30 80 H166 C186 80 190 64 178 58 Q120 78 30 70Z" fill="#cfe4f7" opacity=".9"/>`), { left: 0, top: 150 + rnd(i + 9) * (o.cy ?? 600) }));
  binds.push(t => CL.forEach((c, i) => { c.style.transform = `translateX(${((rnd(i) * 1500 + t * (8 + rnd(i + 5) * 14)) % 1700) - 400}px)`; }));
  return sky;
}
/* ───── fire: additive particle flame with bloom + embers, drawn every frame ───── */
const FIRE_SPR = (() => { const mk = (cols) => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), q = g.createRadialGradient(32, 32, 0, 32, 32, 32); cols.forEach(([o, col]) => q.addColorStop(o, col)); g.fillStyle = q; g.fillRect(0, 0, 64, 64); return c; };
  return [mk([[0, 'rgba(255,255,235,1)'], [.35, 'rgba(255,230,140,.8)'], [1, 'rgba(255,170,40,0)']]), mk([[0, 'rgba(255,210,90,.95)'], [.45, 'rgba(255,130,30,.6)'], [1, 'rgba(230,60,10,0)']]), mk([[0, 'rgba(255,120,30,.8)'], [.5, 'rgba(200,40,10,.4)'], [1, 'rgba(120,10,0,0)']]), mk([[0, 'rgba(90,70,60,.35)'], [1, 'rgba(60,50,45,0)']])]; })();
function fireFX(parent, x, y, w, h, o = {}) {   // x,y = centre of the fire's base
  const cv = E(parent, 'a', `<canvas width="${w}" height="${h}"></canvas>`, { left: x - w / 2, top: y - h, pointerEvents: 'none' }).firstChild, g = cv.getContext('2d');
  const N = o.n || 110, bw = o.base || w * .42, fh = o.flame || h * .62;
  binds.push(t => {
    g.clearRect(0, 0, w, h); const cx = w / 2, by = h - 10, fl = .86 + .14 * Math.sin(t * 9.3) * Math.sin(t * 4.1 + 1);
    let q = g.createRadialGradient(cx, by - fh * .3, 0, cx, by - fh * .3, w * .55); q.addColorStop(0, `rgba(255,170,60,${.55 * fl})`); q.addColorStop(1, 'rgba(255,90,20,0)');
    g.globalCompositeOperation = 'lighter'; g.fillStyle = q; g.fillRect(0, 0, w, h);
    for (let i = 0; i < N; i++) {
      const sp = .9 + rnd(i) * 1.1, life = (t * sp + rnd(i + 7)) % 1, side = (rnd(i + 3) - .5) * bw, sway = Math.sin(t * 5 + i * 1.7) * 10 * life + Math.sin(t * 2.3 + i) * 6 * life;
      const px = cx + side * (1 - life * .85) + sway, py = by - life * fh * (.6 + rnd(i + 11) * .55), s = (o.size || 46) * (1 - life * .7) * (.6 + rnd(i + 5) * .8) * fl;
      const k = life < .25 ? 0 : life < .6 ? 1 : life < .88 ? 2 : 3;
      g.globalAlpha = Math.min(1, (1 - life) * 1.6) * (k === 3 ? .5 : .85); g.globalCompositeOperation = k === 3 ? 'source-over' : 'lighter';
      g.drawImage(FIRE_SPR[k], px - s, py - s * 1.25, s * 2, s * 2.5);
    }
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 18; i++) { const life = (t * (.45 + rnd(i + 40) * .4) + rnd(i + 41)) % 1, px = cx + (rnd(i + 42) - .5) * bw * 1.2 + Math.sin(t * 3 + i) * 24 * life, py = by - fh * .4 - life * h * .7;
      g.globalAlpha = (1 - life) * .9; g.fillStyle = i % 3 ? '#ffcf6a' : '#fff4c0'; g.beginPath(); g.arc(px, py, 1.6 + rnd(i + 43) * 2.2, 0, 6.283); g.fill(); }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  });
  return cv;
}
/** a warm light that flickers with the fire (screen-blended over a scene) */
function fireLight(parent, x, y, r, a = .5) {
  const el = E(parent, 'a', '', { left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: `radial-gradient(circle,rgba(255,150,60,${a}),rgba(255,120,40,${a * .4}) 40%,rgba(255,100,30,0) 70%)`, mixBlendMode: 'screen', pointerEvents: 'none' });
  binds.push(t => { el.style.opacity = .78 + .22 * Math.sin(t * 9.3) * Math.sin(t * 4.1 + 1); });
  return el;
}
/* ───── village kitchen: textured mud wall + clay stove (baked) ───── */
function kitchenWall(w = 1080, h = 1920) {
  const crack = i => { let x = rnd(i) * w, y = 300 + rnd(i + 1) * 900, d = `M${x} ${y}`; for (let k = 0; k < 7; k++) { x += (rnd(i * 9 + k) - .5) * 60; y += 20 + rnd(i * 7 + k) * 40; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; } return `<path d="${d}" stroke="#4a2410" stroke-opacity=".5" stroke-width="${1.5 + rnd(i) * 2}" fill="none"/>`; };
  const patch = i => { const x = rnd(i + 30) * w, y = 200 + rnd(i + 31) * 1000, r = 60 + rnd(i + 32) * 120; return `<ellipse cx="${x}" cy="${y}" rx="${r * 1.4}" ry="${r}" fill="#e2a76c" opacity=".35" filter="url(#fBlur6)"/>`; };
  const body = `<rect width="${w}" height="${h}" fill="#c98552"/>
    <rect width="${w}" height="${h}" fill="url(#wallG)"/>${Array.from({ length: 9 }, (_, i) => patch(i)).join('')}
    <rect width="${w}" height="${h}" fill="#fff" filter="url(#tPlaster)" opacity=".9"/><rect width="${w}" height="${h}" fill="#fff" filter="url(#tDark)" opacity=".35"/><rect width="${w}" height="${h}" fill="#fff" filter="url(#tLight)" opacity=".3"/><rect width="${w}" height="${h}" fill="#fff" filter="url(#tSpeck)" opacity=".25"/>
    ${Array.from({ length: 7 }, (_, i) => crack(i)).join('')}
    <rect y="1180" width="${w}" height="${h - 1180}" fill="#7a3f1e"/>${Array.from({ length: 16 }, (_, i) => `<path d="M0 ${1190 + i * 12} Q${w / 2} ${1180 + i * 12 + (i % 3) * 8} ${w} ${1192 + i * 12}" stroke="#5a2a10" stroke-opacity=".35" stroke-width="3" fill="none"/>`).join('')}
    <rect y="1180" width="${w}" height="${h - 1180}" fill="#fff" filter="url(#tDark)" opacity=".4"/><rect y="1172" width="${w}" height="12" fill="#9a5a2e"/>
    ${[90, 150].map(y => `<rect x="-10" y="${y}" width="${w + 20}" height="34" rx="17" fill="url(#bambooG)"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${60 + i * 190}" y="${y}" width="8" height="34" fill="#8a6a2a" opacity=".6"/>`).join('')}`).join('')}
    <rect x="300" y="520" width="460" height="20" rx="4" fill="url(#woodG)"/><rect x="300" y="520" width="460" height="20" fill="#fff" filter="url(#tWood)" opacity=".7"/><path d="M320 540 L340 600 M740 540 L720 600" stroke="#5a3010" stroke-width="10"/>
    ${[[330, 70, 60], [410, 96, 76], [505, 64, 56], [580, 88, 70], [668, 74, 62]].map(([x, h2, w2], i) => `<ellipse cx="${x + w2 / 2}" cy="${520 - h2 / 2}" rx="${w2 / 2}" ry="${h2 / 2}" fill="url(#potG${i % 2})"/><ellipse cx="${x + w2 / 2}" cy="${520 - h2 + 6}" rx="${w2 * .28}" ry="7" fill="#3a1a0a"/><ellipse cx="${x + w2 * .35}" cy="${520 - h2 * .6}" rx="${w2 * .1}" ry="${h2 * .18}" fill="#fff" opacity=".25"/>`).join('')}
    <path d="M140 230 V420" stroke="#6a4a2a" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${128 + (i % 3) * 13}" cy="${420 + Math.floor(i / 3) * 22}" rx="14" ry="16" fill="${i % 2 ? '#c46a7a' : '#d98a8a'}"/><path d="M${128 + (i % 3) * 13} ${405 + Math.floor(i / 3) * 22} v-8" stroke="#8a6a3a" stroke-width="3"/>`).join('')}
    <g transform="translate(720 560)"><rect width="300" height="380" fill="#4a2810"/><rect x="18" y="18" width="264" height="344" fill="url(#winSky)"/>
      <path d="M40 362 Q60 250 140 220 Q90 280 110 362Z M180 362 Q190 260 270 210 Q230 300 240 362Z" fill="#3f8f3a"/><path d="M110 362 Q150 230 230 180 Q170 260 170 362Z" fill="#5aaa45"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${54 + i * 64}" y="18" width="10" height="344" fill="#2a1608"/>`).join('')}<rect x="0" y="180" width="300" height="12" fill="#3a1e0a"/></g>`;
  const defs = `<linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8743f" stop-opacity=".6"/><stop offset=".5" stop-color="#d8955a" stop-opacity="0"/><stop offset="1" stop-color="#8a4a22" stop-opacity=".5"/></linearGradient>
    <linearGradient id="bambooG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c87a"/><stop offset=".5" stop-color="#c49a4a"/><stop offset="1" stop-color="#7a5a22"/></linearGradient>
    <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a2e"/><stop offset="1" stop-color="#4a2a10"/></linearGradient>
    <radialGradient id="potG0" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#e88a4a"/><stop offset="1" stop-color="#7a3010"/></radialGradient><radialGradient id="potG1" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#b8743f"/><stop offset="1" stop-color="#4a2210"/></radialGradient>
    <linearGradient id="winSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc4f2"/><stop offset="1" stop-color="#e8f6ff"/></linearGradient>`;
  return bake(bsvg(w, h, body, defs), w, h, 1.2);
}
/** clay চুলা with a dark mouth; fire sits at (mouthX, mouthY) relative to the returned element */
function clayStove(w = 520) {
  const h = w * .52, body = `<path d="M10 ${h} L34 ${h * .2} Q${w / 2} ${-h * .05} ${w - 34} ${h * .2} L${w - 10} ${h}Z" fill="#a4552e"/>
    <path d="M10 ${h} L34 ${h * .2} Q${w / 2} ${-h * .05} ${w - 34} ${h * .2} L${w - 10} ${h}Z" fill="#fff" filter="url(#tPlaster)"/><path d="M10 ${h} L34 ${h * .2} Q${w / 2} ${-h * .05} ${w - 34} ${h * .2} L${w - 10} ${h}Z" fill="#fff" filter="url(#tDark)" opacity=".45"/>
    <path d="M34 ${h * .2} Q${w / 2} ${-h * .05} ${w - 34} ${h * .2}" stroke="#d07a45" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M34 ${h * .2} Q${w / 2} ${-h * .05} ${w - 34} ${h * .2}" stroke="#3a1206" stroke-opacity=".5" stroke-width="4" fill="none" transform="translate(0 10)"/>
    <path d="M${w * .3} ${h} V${h * .58} Q${w / 2} ${h * .3} ${w * .7} ${h * .58} V${h}Z" fill="#1a0602"/><path d="M${w * .3} ${h} V${h * .58} Q${w / 2} ${h * .3} ${w * .7} ${h * .58} V${h}Z" fill="none" stroke="#5a1e0a" stroke-width="8"/>
    <path d="M${w * .34} ${h * .99} L${w * .66} ${h * .93}" stroke="#3a2010" stroke-width="12" stroke-linecap="round"/><path d="M${w * .36} ${h * .93} L${w * .62} ${h * .99}" stroke="#4a2a14" stroke-width="10" stroke-linecap="round"/>`;
  return { html: bake(bsvg(w, h, body), w, h), w, h, mx: w / 2, my: h * .98, mw: w * .4 };
}
/* ───── the brain (procedural, drawn into a canvas once per state) ───── */
function brainCanvas(W, mode = 'healthy') {
  const H = W * .78, sc = 1.5, c = document.createElement('canvas'); c.width = W * sc; c.height = H * sc; c.style.cssText = `display:block;width:${W}px;height:${H}px`;
  const g = c.getContext('2d'); g.scale(sc, sc);
  const P2 = mode === 'washed' ? { a: '#f4f8fb', b: '#b4c6d4', s: '#8aa0b2', hi: '#ffffff', side: '#7e93a6', worms: 90, sw: .25 } : { a: '#ffb5bb', b: '#d86a7c', s: '#8e2a46', hi: '#ffe0e3', side: '#9c3b52', worms: 210, sw: .6 };
  const L = W * .52, Wd = W * .44, cx = W / 2, cy = H * .44, TH = H * .12;
  const outline = (dy = 0) => { g.beginPath(); for (let k = 0; k <= 96; k++) { const th = k / 96 * 6.283 - 1.571, s = Math.sin(th), co = Math.cos(th);
      let x = Wd / 2 * co * (.86 + .14 * (s + 1) / 2), y = L / 2 * s; const notch = Math.exp(-Math.pow(co / .08, 2)) * 10; y += s < 0 ? notch : -notch;
      const r = .62, X = x * Math.cos(r) - y * Math.sin(r), Y = (x * Math.sin(r) + y * Math.cos(r)) * .62; k ? g.lineTo(cx + X, cy + Y + dy) : g.moveTo(cx + X, cy + Y + dy); } g.closePath(); };
  // shadow + side (thickness) + cerebellum peeking at the back
  g.save(); g.filter = 'blur(14px)'; g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(cx + 10, cy + TH + 40, Wd * .78, L * .36, 0, 0, 6.283); g.fill(); g.restore();
  g.fillStyle = P2.side; g.beginPath(); g.ellipse(cx - W * .14, cy + TH * 1.4, W * .14, H * .09, -.3, 0, 6.283); g.fill();
  for (let k = 0; k < 6; k++) { g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 2; g.beginPath(); g.ellipse(cx - W * .14, cy + TH * 1.4 - 8 + k * 5, W * .13 - k * 3, H * .02, -.3, 0, 3.14); g.stroke(); }
  for (let d = TH; d > 0; d -= 2) { outline(d); g.fillStyle = P2.side; g.fill(); }
  outline(TH); g.fillStyle = 'rgba(0,0,0,.25)'; g.fill();
  // top surface
  outline(0); const q = g.createRadialGradient(cx - Wd * .25, cy - L * .2, 10, cx, cy, W * .5); q.addColorStop(0, P2.a); q.addColorStop(1, P2.b); g.fillStyle = q; g.fill();
  g.save(); outline(0); g.clip();
  const inside = (x, y) => { outline(0); return g.isPointInPath(x * sc, y * sc); };
  for (let i = 0; i < P2.worms; i++) {
    let x = cx + (rnd(i * 3 + 1) - .5) * W * .7, y = cy + (rnd(i * 3 + 2) - .5) * H * .6, a = rnd(i * 5) * 6.283; const path = [[x, y]];
    for (let k = 0; k < 22; k++) { a += (rnd(i * 31 + k) - .5) * 1.3; const nx = x + Math.cos(a) * 7, ny = y + Math.sin(a) * 7 * .7; if (!inside(nx, ny)) { a += 2.4; continue; } x = nx; y = ny; path.push([x, y]); }
    const line = (dx, dy) => { g.beginPath(); path.forEach(([px, py], k) => k ? g.lineTo(px + dx, py + dy) : g.moveTo(px + dx, py + dy)); g.stroke(); };
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = P2.s; g.globalAlpha = P2.sw; g.lineWidth = 4.2; line(0, 0);
    g.strokeStyle = P2.hi; g.globalAlpha = P2.sw * .7; g.lineWidth = 2; line(-1.8, -1.8);
  }
  g.globalAlpha = 1;
  // longitudinal fissure
  g.strokeStyle = P2.s; g.lineWidth = 7; g.globalAlpha = .85; g.beginPath();
  for (let k = 0; k <= 30; k++) { const s = k / 30 - .5, x = Math.sin(k * .9) * 3, y = s * L * 1.05, r = .62, X = x * Math.cos(r) - y * Math.sin(r), Y = (x * Math.sin(r) + y * Math.cos(r)) * .62; k ? g.lineTo(cx + X, cy + Y) : g.moveTo(cx + X, cy + Y); } g.stroke(); g.globalAlpha = 1;
  // volume shading + wet specular highlights
  const sh = g.createRadialGradient(cx - Wd * .3, cy - L * .25, 20, cx + Wd * .2, cy + L * .1, W * .55); sh.addColorStop(0, 'rgba(255,255,255,.28)'); sh.addColorStop(.55, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(40,0,20,.35)');
  g.fillStyle = sh; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 46; i++) { const x = cx - Wd * .5 + rnd(i + 300) * Wd * .9, y = cy - L * .3 + rnd(i + 301) * L * .35; g.fillStyle = `rgba(255,255,255,${.25 + rnd(i + 302) * .45})`; g.beginPath(); g.ellipse(x, y, 2 + rnd(i + 303) * 5, 1 + rnd(i + 304) * 2, -.4, 0, 6.283); g.fill(); }
  g.restore();
  return c;
}
/* ───── oil droplets with physics: wobble inside → squeezed out → fall (gravity, stretch) → splat → vapour ───── */
function oilDrops(parent, cx, cy, rx, ry, t0, tOut, floorY, n = 10) {
  const D = Array.from({ length: n }, (_, i) => { const a = rnd(i + 500) * 6.283, r = .25 + Math.sqrt(rnd(i + 501)) * .65;
    const el = E(parent, 'a', svg(60, '0 0 60 60', `<defs><radialGradient id="od${i}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff6c8"/><stop offset=".35" stop-color="#ffd24a"/><stop offset=".8" stop-color="#d48a0a"/><stop offset="1" stop-color="#8a5200"/></radialGradient></defs><circle cx="30" cy="30" r="27" fill="url(#od${i})"/><ellipse cx="21" cy="19" rx="8" ry="5" fill="#fff" opacity=".85" transform="rotate(-30 21 19)"/><circle cx="38" cy="41" r="4" fill="#fff" opacity=".35"/>`), { left: 0, top: 0, opacity: 0, transformOrigin: '30px 30px' });
    const vap = E(parent, 'a', `<div style="width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,rgba(255,240,200,.55),rgba(255,240,200,0) 70%)"></div>`, { left: 0, top: 0, opacity: 0 });
    return { el, vap, x0: cx + Math.cos(a) * rx * r, y0: cy + Math.sin(a) * ry * r, s: .8 + rnd(i + 502) * .7, te: tOut + rnd(i + 503) * 1.1, dir: Math.cos(a) >= 0 ? 1 : -1, ph: rnd(i + 504) * 6 }; });
  binds.push(t => D.forEach((d, i) => {
    if (t < t0) { d.el.style.opacity = 0; d.vap.style.opacity = 0; return; }
    const appear = Math.min(1, (t - t0) / .35), G = 2200;
    let x = d.x0 + Math.sin(t * 1.3 + d.ph) * 10, y = d.y0 + Math.cos(t * 1.1 + d.ph) * 8, sx = 1 + .1 * Math.sin(t * 7 + d.ph), sy = 1 - .1 * Math.sin(t * 7 + d.ph), op = appear, rot = 0;
    if (t > d.te) {
      const k = t - d.te, ex = Math.min(1, k / .45), edgeX = cx + d.dir * rx * 1.02, edgeY = d.y0;   // migrate to the skin, bulge, then drip
      x = x + (edgeX - x) * ex; y = y + (edgeY - y) * ex; sx = 1 + .25 * ex; sy = 1 - .15 * ex;
      if (k > .45) { const f = k - .45, v = G * f; x = edgeX + d.dir * 40 * f; y = edgeY + .5 * G * f * f; sy = 1 + Math.min(1.4, v / 1100); sx = 1 / Math.sqrt(sy); rot = d.dir * -8;
        if (y > floorY) { const s2 = Math.min(1, (y - floorY) / 120); y = floorY; sy = Math.max(.18, .3 - s2 * .12); sx = 1.8 + s2 * .8; op = Math.max(0, 1 - (f - Math.sqrt(2 * (floorY - edgeY) / G)) * 1.6);
          const vk = Math.max(0, f - Math.sqrt(2 * (floorY - edgeY) / G)); d.vap.style.opacity = Math.max(0, Math.sin(Math.min(1, vk / 1.4) * Math.PI)) * .9; d.vap.style.transform = `translate(${x - 35 + Math.sin(vk * 4 + i) * 16}px,${floorY - 60 - vk * 260}px) scale(${1 + vk * 1.4})`; } }
    }
    d.el.style.opacity = op; d.el.style.transform = `translate(${x - 30}px,${y - 30}px) rotate(${rot}deg) scale(${d.s * sx},${d.s * sy})`;
  }));
  return D;
}
/* ───── top-view food (baked) ───── */
const grainsTop = (n, cx, cy, R, col = '#fbf8ef', sh = '#d9d0bc', seed = 0, len = 9, wid = 3.6) => Array.from({ length: n }, (_, i) => { const a = rnd(i + seed) * 6.283, r = Math.sqrt(rnd(i + seed + 1)) * R, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, ro = rnd(i + seed + 2) * 180;
  return `<ellipse cx="${(x + 1).toFixed(1)}" cy="${(y + 1.5).toFixed(1)}" rx="${len}" ry="${wid}" transform="rotate(${ro.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${sh}"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${len}" ry="${wid}" transform="rotate(${ro.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${col}"/>`; }).join('');
const leafTop = (w, h) => `<path d="M10 ${h / 2} Q${w * .3} 6 ${w - 10} ${h * .35} Q${w * .7} ${h - 4} 10 ${h / 2}Z" fill="#3f8f3a"/><path d="M10 ${h / 2} Q${w * .3} 6 ${w - 10} ${h * .35} Q${w * .7} ${h - 4} 10 ${h / 2}Z" fill="#fff" filter="url(#tLight)" opacity=".4"/><path d="M10 ${h / 2} Q${w * .5} ${h * .42} ${w - 10} ${h * .35}" stroke="#a8d870" stroke-width="5" fill="none"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${40 + i * (w - 80) / 16} ${h / 2 - i * 2} q-10 ${-h * .3} ${-30} ${-h * .4} M${40 + i * (w - 80) / 16} ${h / 2 - i * 2} q-6 ${h * .3} ${-24} ${h * .38}" stroke="#2f6f2a" stroke-opacity=".6" stroke-width="2" fill="none"/>`).join('')}`;
/** a top-view plate of rice on a banana leaf; rice = 'new' (faintly reddish) or 'white' */
function plateTop(w, rice = 'new') {
  const h = w, c = w / 2, col = rice === 'new' ? '#f6e2d2' : '#fbfaf6', sh = rice === 'new' ? '#d9a88c' : '#dcd6c8';
  const body = `<g transform="translate(${-w * .1} ${h * .18}) rotate(-18 ${c} ${c})">${leafTop(w * 1.2, h * .7)}</g>
    <circle cx="${c}" cy="${c + 8}" r="${w * .4}" fill="#000" opacity=".25" filter="url(#fBlur6)"/><circle cx="${c}" cy="${c}" r="${w * .4}" fill="url(#pl1)"/><circle cx="${c}" cy="${c}" r="${w * .33}" fill="url(#pl2)"/><circle cx="${c}" cy="${c}" r="${w * .4}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>
    <circle cx="${c}" cy="${c}" r="${w * .24}" fill="${sh}"/>${grainsTop(260, c, c, w * .23, col, sh, 7)}<circle cx="${c}" cy="${c}" r="${w * .25}" fill="url(#ricesh)"/>`;
  const defs = `<radialGradient id="pl1" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9cfd8"/></radialGradient><radialGradient id="pl2" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#dfe3ea"/></radialGradient><radialGradient id="ricesh" cx=".4" cy=".35" r=".65"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#5a3a20" stop-opacity=".3"/></radialGradient>`;
  return bake(bsvg(w, h, body, defs), w, h);
}
/** top-view payesh in a brass bowl: malai skin, swollen grains, cashew, raisins, cardamom, bay leaf, saffron, pistachio */
function payeshTop(w) {
  const c = w / 2, R = w * .44;
  const cashew = (x, y, r) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M-14 -4 Q-10 -16 4 -14 Q16 -10 14 4 Q10 0 4 -2 Q-6 -4 -8 4 Q-14 6 -14 -4Z" fill="#e8c48a"/><path transform="translate(${x} ${y}) rotate(${r})" d="M-10 -8 Q0 -14 10 -8" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" fill="none"/>`;
  const raisin = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="6" fill="#5a1e1a"/><path d="M${x - 5} ${y - 1} q5 -3 10 0 M${x - 4} ${y + 2} q4 2 8 0" stroke="#2a0a08" stroke-width="1.5" fill="none"/><circle cx="${x - 3}" cy="${y - 2}" r="1.6" fill="#fff" opacity=".5"/>`;
  const card = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="13" ry="6" fill="#8fa84a"/><path d="M-11 0 H11" stroke="#5f7a2a" stroke-width="1.5"/></g>`;
  const body = `<circle cx="${c}" cy="${c + 10}" r="${R}" fill="#000" opacity=".3" filter="url(#fBlur6)"/><circle cx="${c}" cy="${c}" r="${R}" fill="url(#brass)"/><circle cx="${c}" cy="${c}" r="${R}" fill="#fff" filter="url(#tBrush)" opacity=".25"/>
    <circle cx="${c}" cy="${c}" r="${R * .86}" fill="#8a5a10"/><circle cx="${c}" cy="${c}" r="${R * .83}" fill="url(#milk)"/><circle cx="${c}" cy="${c}" r="${R * .83}" fill="#fff" filter="url(#tCream)" opacity=".85"/>
    ${grainsTop(120, c, c, R * .74, 'rgba(255,253,245,.75)', 'rgba(210,180,130,.35)', 51, 10, 5)}
    ${Array.from({ length: 10 }, (_, i) => { const a = i * .63, r = R * (.2 + (i % 4) * .14); return `<path d="M${c + Math.cos(a) * r} ${c + Math.sin(a) * r} q${18} ${8} ${30} ${-6}" stroke="#d9a860" stroke-opacity=".5" stroke-width="3" fill="none"/>`; }).join('')}
    <g transform="translate(${c - R * .35} ${c - R * .3}) rotate(-35)"><path d="M0 0 Q60 -30 120 0 Q60 30 0 0Z" fill="#4f7f2a"/><path d="M0 0 H118" stroke="#a8c860" stroke-width="2.5"/><path d="M0 0 Q60 -30 120 0" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none"/></g>
    ${[[.15, -.1, 20], [-.25, .25, -40], [.32, .22, 70], [.05, .4, 10], [-.38, -.05, 120]].map(([x, y, r]) => cashew(c + x * R, c + y * R, r)).join('')}
    ${[[-.1, .1], [.25, -.3], [-.3, .42], [.42, .02], [.0, -.42], [.18, .48]].map(([x, y]) => raisin(c + x * R, c + y * R)).join('')}
    ${[[.38, -.32, 30], [-.45, .15, -10]].map(([x, y, r]) => card(c + x * R, c + y * R, r)).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${c + (rnd(i + 70) - .5) * R} ${c + (rnd(i + 71) - .5) * R} l${8 + rnd(i) * 8} ${3 - rnd(i + 1) * 6}" stroke="#e85a0a" stroke-width="2" stroke-linecap="round"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${c + (rnd(i + 80) - .5) * R * 1.1}" cy="${c + (rnd(i + 81) - .5) * R * 1.1}" rx="6" ry="3" fill="#9ac850" transform="rotate(${rnd(i) * 180} ${c} ${c})"/>`).join('')}
    <circle cx="${c}" cy="${c}" r="${R * .83}" fill="url(#gloss)"/>`;
  const defs = `<radialGradient id="brass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#d4a23a"/><stop offset="1" stop-color="#7a5210"/></radialGradient><radialGradient id="milk" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#f6e2bc"/><stop offset="1" stop-color="#e2bf88"/></radialGradient><radialGradient id="gloss" cx=".3" cy=".25" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
  return bake(bsvg(w, w, body, defs), w, w);
}
/** top-view plate of pitha: ভাপা (jaggery + coconut), চিতই, পাটিসাপটা rolls, পাকন (fried flowers) + খেজুর গুড় drizzle */
function pithaTop(w) {
  const c = w / 2, R = w * .46;
  const bhapa = (x, y, r) => `<circle cx="${x}" cy="${y + 4}" r="${r}" fill="#000" opacity=".2" filter="url(#fBlur2)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#rice1)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" filter="url(#tSpeck)" opacity=".35"/><path d="M${x - r * .5} ${y - r * .1} Q${x} ${y - r * .55} ${x + r * .5} ${y - r * .1} Q${x + r * .2} ${y + r * .25} ${x - r * .4} ${y + r * .05}Z" fill="url(#gur)"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${x + (rnd(i + x) - .5) * r * 1.1}" y="${y + (rnd(i + y) - .5) * r * 1.1}" width="7" height="2.5" rx="1" fill="#fffdf6" transform="rotate(${rnd(i) * 180} ${x} ${y})"/>`).join('')}`;
  const chitoi = (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .92}" fill="#f7efe0"/>${Array.from({ length: 22 }, (_, i) => `<circle cx="${x + (rnd(i + 90) - .5) * r * 1.4}" cy="${y + (rnd(i + 91) - .5) * r * 1.3}" r="${2 + rnd(i + 92) * 3}" fill="#e8dcc4"/>`).join('')}<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .92}" fill="none" stroke="#c8a070" stroke-width="5" stroke-opacity=".6"/>`;
  const roll = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-70" y="-20" width="140" height="40" rx="18" fill="#f2d9a8"/><rect x="-70" y="-20" width="140" height="40" rx="18" fill="#fff" filter="url(#tDark)" opacity=".35"/>${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-60 + i * 15}" cy="${(i % 2 ? 6 : -6)}" rx="5" ry="3" fill="#a8641e" opacity=".6"/>`).join('')}<ellipse cx="70" cy="0" rx="8" ry="18" fill="#fff6e0"/><ellipse cx="70" cy="0" rx="5" ry="12" fill="#c98a3a"/></g>`;
  const pakan = (x, y) => `<g transform="translate(${x} ${y})">${Array.from({ length: 8 }, (_, i) => `<ellipse rx="10" ry="22" cy="-18" fill="url(#fry)" transform="rotate(${i * 45})"/>`).join('')}<circle r="14" fill="#c97a1e"/><circle r="6" fill="#ffe08a"/></g>`;
  const body = `<circle cx="${c}" cy="${c + 12}" r="${R}" fill="#000" opacity=".3" filter="url(#fBlur6)"/><circle cx="${c}" cy="${c}" r="${R}" fill="url(#kansa)"/><circle cx="${c}" cy="${c}" r="${R}" fill="#fff" filter="url(#tBrush)" opacity=".3"/><circle cx="${c}" cy="${c}" r="${R * .88}" fill="url(#kansa2)"/>
    ${chitoi(c + R * .38, c + R * .38, R * .3)}${roll(c - R * .3, c + R * .48, -12)}${roll(c - R * .38, c + R * .2, -18)}
    ${bhapa(c - R * .3, c - R * .3, R * .3)}${bhapa(c + R * .32, c - R * .28, R * .26)}${pakan(c + R * .05, c + R * .12)}${pakan(c + R * .62, c - R * .02)}
    <path d="M${c - R * .7} ${c - R * .05} Q${c - R * .2} ${c + R * .05} ${c + R * .2} ${c - R * .02} T${c + R * .7} ${c + R * .2}" stroke="#7a3a0a" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/><path d="M${c - R * .7} ${c - R * .07} Q${c - R * .2} ${c + R * .03} ${c + R * .2} ${c - R * .04}" stroke="#ffc870" stroke-width="2" fill="none" opacity=".6"/>`;
  const defs = `<radialGradient id="kansa" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0c0"/><stop offset=".6" stop-color="#c99a3a"/><stop offset="1" stop-color="#6a4a10"/></radialGradient><radialGradient id="kansa2" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f7dc90"/><stop offset="1" stop-color="#b98a2a"/></radialGradient>
    <radialGradient id="rice1" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1ebde"/><stop offset="1" stop-color="#d8ccb2"/></radialGradient><radialGradient id="gur" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#d8902e"/><stop offset="1" stop-color="#6a2e08"/></radialGradient><radialGradient id="fry" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#b8661a"/></radialGradient>`;
  return bake(bsvg(w, w, body, defs), w, w);
}
/* ───── 2.5D auto rice mill complex (daylight, textured) ───── */
function millComplex(w = 1000) {
  const h = w * .95, ox = w * .44, oy = h * .58, s = w / 1000;
  const O = { ox, oy };
  const tin = [['tBrushD', .5], ['tRust', .55], ['tDark', .25]];
  const corr = (pp, n, col = '#000', op = .18) => { const [a, b, c2, d] = pp; return Array.from({ length: n }, (_, i) => { const k = (i + .5) / n, x1 = a[0] + (b[0] - a[0]) * k, y1 = a[1] + (b[1] - a[1]) * k, x2 = d[0] + (c2[0] - d[0]) * k, y2 = d[1] + (c2[1] - d[1]) * k; return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-opacity="${op}" stroke-width="2.4"/>`; }).join(''); };
  const S = v => v * s;
  // yard
  let body = `<polygon points="${pts([ip(S(-420), S(-120), 0, ox, oy), ip(S(560), S(-120), 0, ox, oy), ip(S(560), S(520), 0, ox, oy), ip(S(-420), S(520), 0, ox, oy)])}" fill="#9a9a92"/><polygon points="${pts([ip(S(-420), S(-120), 0, ox, oy), ip(S(560), S(-120), 0, ox, oy), ip(S(560), S(520), 0, ox, oy), ip(S(-420), S(520), 0, ox, oy)])}" fill="#fff" filter="url(#tConc)" opacity=".8"/>`;
  for (let i = 0; i < 9; i++) body += `<line x1="${ip(S(-420 + i * 110), S(-120), 0, ox, oy)[0]}" y1="${ip(S(-420 + i * 110), S(-120), 0, ox, oy)[1]}" x2="${ip(S(-420 + i * 110), S(520), 0, ox, oy)[0]}" y2="${ip(S(-420 + i * 110), S(520), 0, ox, oy)[1]}" stroke="#000" stroke-opacity=".08" stroke-width="2"/>`;
  // silos (back row)
  [[-300, -60], [-300, 60], [-180, -60]].forEach(([X, Y], i) => { body += isoCyl(S(X), S(Y), S(58), S(330 + i * 20), { ox, oy, c1: '#d9dde2', c2: '#8a929c', c3: '#5f6872', cone: S(60), rib: S(24), rust: .45 }); });
  // main hall: corrugated tin walls, gable roof
  const hx = S(-60), hy = S(-90), hw = S(380), hd = S(260), hh = S(250);
  body += isoBox(hx, hy, 0, hw, hd, hh, { ox, oy, t: '#b8bec6', l: '#c9ced4', r: '#9aa2ac', tx: tin, noTop: true });
  const Lf = [ip(hx, hy + hd, 0, ox, oy), ip(hx + hw, hy + hd, 0, ox, oy), ip(hx + hw, hy + hd, hh, ox, oy), ip(hx, hy + hd, hh, ox, oy)], Rf = [ip(hx + hw, hy, 0, ox, oy), ip(hx + hw, hy + hd, 0, ox, oy), ip(hx + hw, hy + hd, hh, ox, oy), ip(hx + hw, hy, hh, ox, oy)];
  body += corr([Lf[3], Lf[2], Lf[1], Lf[0]], 40) + corr([Rf[3], Rf[2], Rf[1], Rf[0]], 28);
  // roof (gable along X)
  const rz = hh + S(90), r1 = ip(hx - S(10), hy + hd / 2, rz, ox, oy), r2 = ip(hx + hw + S(10), hy + hd / 2, rz, ox, oy), e1 = ip(hx - S(10), hy + hd + S(14), hh - S(6), ox, oy), e2 = ip(hx + hw + S(10), hy + hd + S(14), hh - S(6), ox, oy), b1 = ip(hx - S(10), hy - S(14), hh - S(6), ox, oy), b2 = ip(hx + hw + S(10), hy - S(14), hh - S(6), ox, oy);
  const gab = [ip(hx + hw, hy, hh, ox, oy), ip(hx + hw, hy + hd, hh, ox, oy), ip(hx + hw, hy + hd / 2, rz, ox, oy)];
  body += `<polygon points="${pts(gab)}" fill="#9aa2ac"/>${corr([gab[0], gab[2], gab[2], gab[1]], 10)}`;
  body += tex(`<polygon points="${pts([b1, b2, r2, r1])}" fill="FILL"/>`, '#7a2a24', ['tRust', .4], ['tBrushD', .4]) + tex(`<polygon points="${pts([r1, r2, e2, e1])}" fill="FILL"/>`, '#b83a2e', ['tRust', .5], ['tBrushD', .35]) + corr([r1, r2, e2, e1], 46, '#000', .22) + `<polyline points="${pts([r1, r2])}" stroke="#e8e0d0" stroke-width="5" fill="none"/>`;
  // windows (front-left face) + big door
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const X = hx + S(30 + i * 56), Z = S(120 + j * 70), q = [ip(X, hy + hd, Z, ox, oy), ip(X + S(36), hy + hd, Z, ox, oy), ip(X + S(36), hy + hd, Z + S(44), ox, oy), ip(X, hy + hd, Z + S(44), ox, oy)];
    body += `<polygon points="${pts(q)}" fill="#2a4a6a"/><polygon points="${pts([q[0], q[1], [q[2][0] - 8 * s, q[2][1] + 12 * s], [q[3][0] - 8 * s, q[3][1] + 12 * s]])}" fill="#8fd0ff" opacity=".55"/>`; }
  const dq = [ip(hx + hw, hy + S(70), 0, ox, oy), ip(hx + hw, hy + S(190), 0, ox, oy), ip(hx + hw, hy + S(190), S(150), ox, oy), ip(hx + hw, hy + S(70), S(150), ox, oy)];
  body += `<polygon points="${pts(dq)}" fill="#2a2e36"/>${corr([dq[3], dq[2], dq[1], dq[0]], 0)}${Array.from({ length: 10 }, (_, i) => { const k = (i + 1) / 11, a = [dq[0][0] + (dq[3][0] - dq[0][0]) * k, dq[0][1] + (dq[3][1] - dq[0][1]) * k], b = [dq[1][0] + (dq[2][0] - dq[1][0]) * k, dq[1][1] + (dq[2][1] - dq[1][1]) * k]; return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#4a505a" stroke-width="3"/>`; }).join('')}`;
  // sign board on the front-left face (text is DOM)
  const sb = [ip(hx + S(60), hy + hd, S(200), ox, oy), ip(hx + S(320), hy + hd, S(200), ox, oy), ip(hx + S(320), hy + hd, S(240), ox, oy), ip(hx + S(60), hy + hd, S(240), ox, oy)];
  body += `<polygon points="${pts(sb)}" fill="#c4233b"/><polygon points="${pts(sb)}" fill="none" stroke="#ffc93c" stroke-width="4"/>`;
  // dryer tower + bucket elevator + chutes
  body += isoBox(S(-200), S(150), 0, S(90), S(90), S(420), { ox, oy, t: '#cfd4da', l: '#b9bfc8', r: '#8e96a2', tx: tin }) + isoBox(S(-200), S(150), S(420), S(90), S(90), S(40), { ox, oy, t: '#f2c94c', l: '#d9a92a', r: '#a87a12' });
  for (let k = 0; k < 9; k++) { const a = ip(S(-200), S(240), S(40 + k * 42), ox, oy), b = ip(S(-110), S(240), S(40 + k * 42), ox, oy); body += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#5a626e" stroke-width="3"/>`; }
  body += isoBox(S(-260), S(-40), 0, S(36), S(36), S(520), { ox, oy, t: '#f2c94c', l: '#e0b030', r: '#b0841a', tx: [['tBrushD', .4]] });
  const pipe = (A, B, wd = 14) => { const a = ip(...A, ox, oy), b = ip(...B, ox, oy); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#6a727e" stroke-width="${wd * s + 4}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#c9d0d8" stroke-width="${wd * s}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1] - wd * s * .25}" x2="${b[0]}" y2="${b[1] - wd * s * .25}" stroke="#fff" stroke-opacity=".7" stroke-width="${wd * s * .25}" stroke-linecap="round"/>`; };
  body += pipe([S(-242), S(-22), S(500)], [S(-300), S(-60), S(400)]) + pipe([S(-242), S(-22), S(500)], [S(-300), S(60), S(420)]) + pipe([S(-242), S(-22), S(480)], [S(-180), S(-60), S(410)]) + pipe([S(-200), S(200), S(380)], [hx, hy + S(60), hh + S(40)], 18) + pipe([S(-242), S(-22), S(200)], [hx, hy + S(20), S(180)], 12);
  // chimney
  body += isoCyl(S(260), S(-60), S(26), S(560), { ox, oy, c1: '#c9b8a8', c2: '#8a7a6a', c3: '#5a4a3a', rib: S(40), rust: .3 }) + (() => { const [cx2, cy2] = ip(S(260), S(-60), S(560), ox, oy); return `<ellipse cx="${cx2}" cy="${cy2}" rx="${S(26) * 1.22}" ry="${S(26) * .7}" fill="#2a2420"/><rect x="${cx2 - S(32)}" y="${cy2 + S(40)}" width="${S(64)}" height="${S(14)}" fill="#c4233b"/><rect x="${cx2 - S(32)}" y="${cy2 + S(90)}" width="${S(64)}" height="${S(14)}" fill="#c4233b"/>`; })();
  // sack stacks + truck in the yard
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3 - (i % 2); j++) body += isoBox(S(360 + j * 52), S(250 + i * 40), S(i % 2 ? 0 : 0) + S(j > 1 ? 0 : 0), S(46), S(34), S(26), { ox, oy, t: '#efe2c4', l: '#d9c49a', r: '#b8a070', tx: [['tDark', .3]] });
  body += isoBox(S(150), S(330), S(20), S(180), S(90), S(90), { ox, oy, t: '#3a7a3a', l: '#4f9a4a', r: '#2f6a2a', tx: [['tDark', .3]] }) + isoBox(S(330), S(330), S(20), S(70), S(90), S(70), { ox, oy, t: '#ffc93c', l: '#e8a820', r: '#c48a10', tx: [['tDark', .2]] });
  [[180, 420], [300, 420], [360, 420]].forEach(([X, Y]) => { const [wx, wy] = ip(S(X), S(Y), S(10), ox, oy); body += `<ellipse cx="${wx}" cy="${wy}" rx="${S(22)}" ry="${S(18)}" fill="#1a1a1a"/><ellipse cx="${wx}" cy="${wy}" rx="${S(10)}" ry="${S(8)}" fill="#8a8a8a"/>`; });
  body += isoBox(S(170), S(330), S(110), S(150), S(90), S(16), { ox, oy, t: '#efe2c4', l: '#d9c49a', r: '#b8a070' });
  return { html: bake(bsvg(w, h, body), w, h, 1.4), w, h, chim: ip(S(260), S(-60), S(600), ox, oy), sign: sb, ox, oy };
}
/* ───── 2.5D rice polisher (textured steel), overlays animate ───── */
function polisherRig(parent, x, y, w = 760) {
  const h = w * .95, s = w / 760, ox = w * .5, oy = h * .66, P = (X, Y, Z) => ip(X * s, Y * s, Z * s, ox, oy);
  const steel = [['tBrush', .55], ['tBrushD', .45], ['tSpeck', .15]];
  let body = '';
  // floor shadow + base frame (legs)
  body += `<ellipse cx="${ox}" cy="${oy + 30 * s}" rx="${330 * s}" ry="${120 * s}" fill="#000" opacity=".25" filter="url(#fBlur6)"/>`;
  [[-150, -110], [150, -110], [-150, 110], [150, 110]].forEach(([X, Y]) => { body += isoBox((X - 12) * s, (Y - 12) * s, 0, 24 * s, 24 * s, 80 * s, { ox, oy, t: '#3a3f4a', l: '#4a505c', r: '#2a2e36' }); });
  // main body (blue-painted steel) + steel cover
  body += isoBox(-170 * s, -130 * s, 80 * s, 340 * s, 260 * s, 200 * s, { ox, oy, t: '#5a7ab8', l: '#3f62a8', r: '#2c4a88', tx: [['tBrushD', .35], ['tSpeck', .2], ['tRust', .15]], edge: '#9fb8e8' });
  body += isoBox(-150 * s, -110 * s, 280 * s, 300 * s, 220 * s, 60 * s, { ox, oy, t: '#d9dee6', l: '#c4cad4', r: '#9aa2ae', tx: steel, edge: '#ffffff' });
  // hopper on top (inverted pyramid)
  const hp = [P(-80, -60, 420), P(80, -60, 420), P(80, 60, 420), P(-80, 60, 420)], hb = [P(-30, -20, 340), P(30, -20, 340), P(30, 20, 340), P(-30, 20, 340)];
  body += tex(`<polygon points="${pts([hp[3], hp[2], hb[2], hb[3]])}" fill="FILL"/>`, '#c9ced6', ...steel) + tex(`<polygon points="${pts([hp[1], hp[2], hb[2], hb[1]])}" fill="FILL"/>`, '#9aa2ae', ...steel) + `<polygon points="${pts(hp)}" fill="#3a2a1a"/><polygon points="${pts(hp)}" fill="none" stroke="#e8ecf2" stroke-width="4"/>`;
  body += `${Array.from({ length: 60 }, (_, i) => { const a = rnd(i + 900), b = rnd(i + 901), p = P(-70 + a * 140, -50 + b * 100, 421); return `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${5 * s}" ry="${2.4 * s}" fill="${i % 3 ? '#b5532f' : '#d27a4a'}" transform="rotate(${rnd(i) * 180} ${p[0]} ${p[1]})"/>`; }).join('')}`;
  // inspection window (front-left face) — the roller inside is a DOM overlay
  const wq = [P(-120, 130, 120), P(10, 130, 120), P(10, 130, 240), P(-120, 130, 240)];
  body += `<polygon points="${pts(wq)}" fill="#0e1a2e"/><polygon points="${pts(wq)}" fill="none" stroke="#d9dee6" stroke-width="${6 * s}"/>`;
  [[-120, 120], [10, 120], [10, 240], [-120, 240]].forEach(([X, Z]) => { const p = P(X, 130, Z); body += `<circle cx="${p[0]}" cy="${p[1]}" r="${4 * s}" fill="#e8ecf2"/>`; });
  // control panel (front-right face)
  const cp = [P(170, -100, 150), P(170, -10, 150), P(170, -10, 250), P(170, -100, 250)];
  body += `<polygon points="${pts(cp)}" fill="#1e2430"/>`;
  // outlet chute (front-right, white rice) and bran duct (left)
  body += isoBox(170 * s, 30 * s, 110 * s, 90 * s, 60 * s, 40 * s, { ox, oy, t: '#d9dee6', l: '#c4cad4', r: '#9aa2ae', tx: steel });
  const duct = (A, B, wd) => { const a = P(...A), b = P(...B); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#7a828e" stroke-width="${wd * s + 6}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#c9d0d8" stroke-width="${wd * s}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1] - wd * s * .3}" x2="${b[0]}" y2="${b[1] - wd * s * .3}" stroke="#fff" stroke-opacity=".6" stroke-width="${wd * s * .22}" stroke-linecap="round"/>`; };
  body += duct([-170, -40, 240], [-290, -40, 360], 40) + duct([-290, -40, 360], [-290, -40, 520], 40);
  // motor + belt pulley (side), rivets
  body += isoBox(-90 * s, -230 * s, 0, 120 * s, 90 * s, 90 * s, { ox, oy, t: '#4a8a4a', l: '#3a7a3a', r: '#2a5a2a', tx: [['tBrushD', .35]] });
  for (let i = 0; i < 9; i++) { const p = P(-160 + i * 40, 130, 270); body += `<circle cx="${p[0]}" cy="${p[1]}" r="${3.5 * s}" fill="#e8ecf2"/><circle cx="${p[0] + 1}" cy="${p[1] + 1}" r="${2 * s}" fill="#5a626e"/>`; }
  const el = E(parent, 'a', bake(bsvg(w, h, body), w, h, 1.4), { left: x, top: y, width: w, height: h });
  // overlays: spinning roller in the window, gauge, lamps, belt pulley
  const wc = P(-55, 130, 180), roll = E(el, 'a', `<div style="width:${110 * s}px;height:${110 * s}px;border-radius:50%;background:repeating-conic-gradient(#c9d0d8 0 12deg,#6a727e 12deg 24deg);box-shadow:inset 0 0 ${20 * s}px #000"></div>`, { left: wc[0] - 55 * s, top: wc[1] - 55 * s, transform: 'skewY(30deg)' });
  binds.push(t => { roll.firstChild.style.transform = `rotate(${t * 720}deg)`; });
  const gc = P(170, -75, 215), gauge = E(el, 'a', `<div style="position:relative;width:${44 * s}px;height:${44 * s}px;border-radius:50%;background:#f4f6f8;border:${4 * s}px solid #9aa2ae"><i style="position:absolute;left:50%;top:50%;width:${18 * s}px;height:3px;background:#ef4b3f;transform-origin:0 50%"></i></div>`, { left: gc[0] - 22 * s, top: gc[1] - 22 * s, transform: 'skewY(-30deg)' }), ndl = $('i', gauge);
  binds.push(t => { ndl.style.transform = `rotate(${-150 + 110 + Math.sin(t * 3) * 12}deg)`; });
  const lamps = [0, 1, 2].map(i => { const p = P(170, -40 + i * 12, 180 - i * 0); return E(el, 'a', '', { left: p[0] - 6 * s, top: p[1] - 6 * s - i * 6, width: 12 * s, height: 12 * s, borderRadius: '50%', background: ['#b8f53c', '#ffc93c', '#ef4b3f'][i], boxShadow: `0 0 ${12 * s}px ${['#b8f53c', '#ffc93c', '#ef4b3f'][i]}` }); });
  binds.push(t => lamps.forEach((l, i) => { l.style.opacity = i === 0 ? 1 : (Math.floor(t * 3 + i) % 2 ? .3 : 1); }));
  const pc = P(-30, -230, 60), pul = E(el, 'a', `<div style="width:${70 * s}px;height:${70 * s}px;border-radius:50%;background:repeating-conic-gradient(#3a3f4a 0 30deg,#8a929e 30deg 60deg);border:${5 * s}px solid #2a2e36"></div>`, { left: pc[0] - 35 * s, top: pc[1] - 35 * s, transform: 'skewY(-30deg)' });
  binds.push(t => { pul.firstChild.style.transform = `rotate(${t * 900}deg)`; });
  return { el, inP: P(0, 0, 440), outP: P(260, 60, 130), branP: P(-290, -40, 540), s };
}
/* ───── isometric wood table with three bowls of different rice (baked) ───── */
function riceBowlsIso(w = 1080) {
  const h = 900, ox = w / 2, oy = 330, body = [];
  body.push(isoBox(-260, -330, -40, 520, 660, 40, { ox, oy, t: '#a8642e', l: '#7a4218', r: '#5a2e10', tx: [['tWood', .8], ['tDark', .25]] }));
  const bowl = (X, Y, rice, col) => { const [cx, cy] = ip(X, Y, 0, ox, oy), rx = 130, ry = 75; const len = rice === 'kali' ? 5 : rice === 'gobi' ? 6 : 13, wid = rice === 'basmati' ? 2.6 : 3.4;
    const gr = Array.from({ length: rice === 'kali' ? 300 : 200 }, (_, i) => { const a = rnd(i + X) * 6.283, r = Math.sqrt(rnd(i + Y + 3)), x = cx + Math.cos(a) * rx * .82 * r, y = cy - 28 + Math.sin(a) * ry * .78 * r - (1 - r) * 18, ro = rnd(i + 7) * 180;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${len}" ry="${wid}" transform="rotate(${ro.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${i % 4 ? '#fbf8ef' : '#e6dcc4'}"/>`; }).join('');
    return `<ellipse cx="${cx}" cy="${cy + 30}" rx="${rx * 1.05}" ry="${ry}" fill="#000" opacity=".3" filter="url(#fBlur6)"/><path d="M${cx - rx} ${cy - 28} Q${cx - rx * .9} ${cy + 60} ${cx} ${cy + 66} Q${cx + rx * .9} ${cy + 60} ${cx + rx} ${cy - 28}Z" fill="${col}"/><path d="M${cx - rx} ${cy - 28} Q${cx - rx * .9} ${cy + 60} ${cx} ${cy + 66} Q${cx + rx * .9} ${cy + 60} ${cx + rx} ${cy - 28}Z" fill="#fff" filter="url(#tDark)" opacity=".3"/><path d="M${cx - rx * .8} ${cy} Q${cx - rx * .6} ${cy + 46} ${cx - rx * .1} ${cy + 56}" stroke="#fff" stroke-opacity=".3" stroke-width="10" fill="none"/>
      <ellipse cx="${cx}" cy="${cy - 28}" rx="${rx}" ry="${ry * .62}" fill="#e2d8c2"/><ellipse cx="${cx}" cy="${cy - 30}" rx="${rx * .88}" ry="${ry * .52}" fill="#efe8d8"/>${gr}<ellipse cx="${cx}" cy="${cy - 28}" rx="${rx}" ry="${ry * .62}" fill="none" stroke="${col}" stroke-width="8"/>`; };
  body.push(bowl(-120, 200, 'kali', '#8a2a2a'), bowl(80, 80, 'gobi', '#2f5aa8'), bowl(260, -80, 'basmati', '#7a8494'));
  return { html: bake(bsvg(w, h, body.join('')), w, h), pos: [ip(-120, 200, 0, ox, oy), ip(80, 80, 0, ox, oy), ip(260, -80, 0, ox, oy)] };
}
/* ───── top-view thali for "the best food on our plate" ───── */
function thaliTop(w) {
  const c = w / 2, R = w * .47, sb = (x, y, r, inner) => `<circle cx="${x}" cy="${y + 4}" r="${r}" fill="#000" opacity=".25" filter="url(#fBlur2)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#kansa)"/><circle cx="${x}" cy="${y}" r="${r * .84}" fill="${inner}"/>`;
  const body = `<circle cx="${c}" cy="${c + 12}" r="${R}" fill="#000" opacity=".3" filter="url(#fBlur6)"/><circle cx="${c}" cy="${c}" r="${R}" fill="url(#kansa)"/><circle cx="${c}" cy="${c}" r="${R}" fill="#fff" filter="url(#tBrush)" opacity=".3"/><circle cx="${c}" cy="${c}" r="${R * .9}" fill="url(#kansa2)"/>
    <circle cx="${c - R * .12}" cy="${c + R * .12}" r="${R * .42}" fill="#d9a88c"/>${grainsTop(300, c - R * .12, c + R * .12, R * .4, '#f6e2d2', '#d9a88c', 3)}
    ${sb(c + R * .5, c - R * .38, R * .26, '#f6e2bc')}${grainsTop(30, c + R * .5, c - R * .38, R * .18, 'rgba(255,253,245,.8)', 'rgba(210,180,130,.3)', 9, 8, 4)}<circle cx="${c + R * .45}" cy="${c - R * .42}" r="5" fill="#5a1e1a"/><circle cx="${c + R * .55}" cy="${c - R * .32}" r="5" fill="#e8c48a"/>
    ${sb(c - R * .45, c - R * .45, R * .22, '#c9862a')}${sb(c + R * .55, c + R * .3, R * .2, '#e8c047')}
    <circle cx="${c + R * .15}" cy="${c - R * .62}" r="${R * .14}" fill="url(#rice1)"/><path d="M${c + R * .07} ${c - R * .64} Q${c + R * .15} ${c - R * .72} ${c + R * .23} ${c - R * .64}Z" fill="#7a3a0a"/>
    <path d="M${c - R * .7} ${c + R * .35} q20 -30 50 -40" stroke="#3f8f3a" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M${c - R * .62} ${c + R * .5} q10 -36 40 -50" stroke="#2f7f2a" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M${c - R * .2} ${c + R * .72} a${R * .1} ${R * .1} 0 0 1 ${R * .2} 0Z" fill="#d8e85a"/><circle cx="${c + R * .2}" cy="${c + R * .7}" r="${R * .05}" fill="#fff"/>`;
  const defs = `<radialGradient id="kansa" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0c0"/><stop offset=".6" stop-color="#c99a3a"/><stop offset="1" stop-color="#6a4a10"/></radialGradient><radialGradient id="kansa2" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f7dc90"/><stop offset="1" stop-color="#b98a2a"/></radialGradient><radialGradient id="rice1" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8ccb2"/></radialGradient>`;
  return bake(bsvg(w, w, body, defs), w, w);
}
/* ───── isometric brain-wash station: room + brain + bottle pouring + foam + scrubbers ───── */
function brainStation(c, Wd, t0, t1, o = {}) {
  // room (baked): two walls + tiled floor, windows with daylight, shelves of detergent boxes, pipes
  const ox = 540, oy = 640, body = [];
  const wallL = [ip(0, 0, 0, ox, oy), ip(0, 1400, 0, ox, oy), ip(0, 1400, 1400, ox, oy), ip(0, 0, 1400, ox, oy)], wallR = [ip(0, 0, 0, ox, oy), ip(1400, 0, 0, ox, oy), ip(1400, 0, 1400, ox, oy), ip(0, 0, 1400, ox, oy)];
  body.push(tex(`<polygon points="${pts(wallL)}" fill="FILL"/>`, '#e9e1d2', ['tPlaster', .5], ['tDark', .15]), tex(`<polygon points="${pts(wallR)}" fill="FILL"/>`, '#d6ccbb', ['tPlaster', .5], ['tDark', .2]));
  // tiled floor
  const fl = [ip(0, 0, 0, ox, oy), ip(1400, 0, 0, ox, oy), ip(1400, 1400, 0, ox, oy), ip(0, 1400, 0, ox, oy)];
  body.push(tex(`<polygon points="${pts(fl)}" fill="FILL"/>`, '#9fb4c4', ['tConc', .6]));
  for (let i = 0; i <= 14; i++) { const a = ip(i * 100, 0, 0, ox, oy), b = ip(i * 100, 1400, 0, ox, oy), c2 = ip(0, i * 100, 0, ox, oy), d = ip(1400, i * 100, 0, ox, oy); body.push(`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#7a90a2" stroke-width="2"/><line x1="${c2[0]}" y1="${c2[1]}" x2="${d[0]}" y2="${d[1]}" stroke="#7a90a2" stroke-width="2"/>`); }
  // windows (daylight)
  const win = (pp) => `<polygon points="${pts(pp)}" fill="url(#skyW)"/><polygon points="${pts(pp)}" fill="none" stroke="#f4f0e8" stroke-width="10"/>`;
  body.push(win([ip(0, 260, 520, ox, oy), ip(0, 620, 520, ox, oy), ip(0, 620, 900, ox, oy), ip(0, 260, 900, ox, oy)]), win([ip(320, 0, 520, ox, oy), ip(700, 0, 520, ox, oy), ip(700, 0, 900, ox, oy), ip(320, 0, 900, ox, oy)]));
  // shelf with detergent boxes on the right wall + pipes along both walls
  body.push(isoBox(860, 0, 380, 420, 70, 14, { ox, oy, t: '#a8642e', l: '#7a4218', r: '#5a2e10', tx: [['tWood', .7]] }));
  [[880, P.red], [960, P.lime], [1040, '#3fa0e8'], [1120, P.gold], [1200, P.orange]].forEach(([X, col]) => body.push(isoBox(X, 6, 394, 60, 48, 90, { ox, oy, t: col, l: col, r: '#00000055', tx: [['tDark', .2]] })));
  const pipe = (A, B, wd, col = '#c9d0d8') => { const a = ip(...A, ox, oy), b = ip(...B, ox, oy); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#6a727e" stroke-width="${wd + 5}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1] - wd * .25}" x2="${b[0]}" y2="${b[1] - wd * .25}" stroke="#fff" stroke-opacity=".6" stroke-width="${wd * .25}" stroke-linecap="round"/>`; };
  body.push(pipe([10, 0, 1100], [10, 1400, 1100], 22), pipe([0, 10, 1160], [1400, 10, 1160], 22, '#e8b84a'), pipe([10, 900, 0], [10, 900, 1100], 18));
  // a big basin (iso cylinder) the brain sits in
  body.push(isoCyl(620, 620, 230, 120, { ox, oy, c1: '#e8eef4', c2: '#9aa8b8', c3: '#6a7a8c', rib: 400, rust: 0 }));
  const [bx, by] = ip(620, 620, 120, ox, oy);
  body.push(`<ellipse cx="${bx}" cy="${by}" rx="${230 * 1.22}" ry="${230 * .7}" fill="#5a9ab8"/><ellipse cx="${bx}" cy="${by}" rx="${230 * 1.12}" ry="${230 * .62}" fill="url(#water)"/>`);
  const room = Wd.plane(.5);
  E(room, 'a', bake(bsvg(1080, 1920, body.join(''), '<linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb8f0"/><stop offset="1" stop-color="#e8f6ff"/></linearGradient><radialGradient id="water" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#bff0ff"/><stop offset="1" stop-color="#3a8ab8"/></radialGradient>'), 1080, 1920, 1.1), { left: 0, top: 0 });
  // daylight shafts from the windows
  E(room, 'a', svg(1080, '0 0 1080 1920', `<path d="M90 520 L400 360 L900 1300 L600 1500Z" fill="#fffbe0" opacity=".14"/><path d="M820 560 L1080 420 L1080 1200 L760 1300Z" fill="#fffbe0" opacity=".1"/>`), { left: 0, top: 0 });
  // posters on the walls (iso-skewed DOM so Bangla renders)
  const posterL = E(room, 'a', `<div style="width:300px;padding:18px 10px 10px;background:linear-gradient(160deg,#ff8a3d,#ef4b3f);border:8px solid #fff;text-align:center;font:800 40px/1.2 var(--font-bn-display);color:#fff4dc;box-shadow:0 10px 30px rgba(0,0,0,.3)">পুরান চাল<br>ভাতে বাড়ে!</div>`, { left: 120, top: 270, transform: 'skewY(30deg)', transformOrigin: '0 0' });
  const posterR = E(room, 'a', `<div style="width:260px;padding:16px 10px 10px;background:linear-gradient(160deg,#b8f53c,#5f9e1a);border:8px solid #fff;text-align:center;font:800 38px/1.2 var(--font-bn-display);color:#0e1a44">ধবধবে সাদা<br>মিনিকেট</div>`, { left: 760, top: 120, transform: 'skewY(-30deg)', transformOrigin: '0 0' });
  // the brain: healthy + washed versions crossfade; jitter while being washed
  const BW = o.bw || 820, bw = E(Wd.plane(.62), 'a', '', { left: bx - BW / 2, top: by - BW * .62, width: BW, height: BW * .78, transformOrigin: '50% 70%' });
  const bH = bw.appendChild(brainCanvas(BW, 'healthy')), bWs = bw.appendChild(brainCanvas(BW, 'washed')); bWs.style.position = bH.style.position = 'absolute'; bWs.style.left = bH.style.left = '0'; bWs.style.top = bH.style.top = '0';
  return { room, bw, bH, bWs, bx, by, BW, posterL, posterR };
}
/** full-frame textured wooden table top (for top-view food shots) */
function woodTable(w = 1080, h = 1920, tint = '#8a4f24') {
  const planks = Array.from({ length: 6 }, (_, i) => `<rect x="${i * w / 6}" y="0" width="${w / 6 - 4}" height="${h}" fill="${tint}" opacity="${.85 + (i % 2) * .15}"/>`).join('');
  return bake(bsvg(w, h, `<rect width="${w}" height="${h}" fill="#3a1c08"/>${planks}<rect width="${w}" height="${h}" fill="#fff" filter="url(#tWood)" opacity=".9"/><rect width="${w}" height="${h}" fill="#fff" filter="url(#tDark)" opacity=".3"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${i * w / 6 - 3}" y="0" width="6" height="${h}" fill="#2a1204"/>`).join('')}<rect width="${w}" height="${h}" fill="url(#vg)"/>`, '<radialGradient id="vg" cx=".5" cy=".45" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>'), w, h, 1);
}
/** a top-view steam wisp field over food */
function steamTop(parent, cx, cy, R, n = 7) {
  const S2 = Array.from({ length: n }, (_, i) => E(parent, 'a', `<div style="width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.5),rgba(255,255,255,0) 65%)"></div>`, { left: 0, top: 0 }));
  binds.push(t => S2.forEach((s, i) => { const k = (t * .35 + i / n) % 1, a = rnd(i + 60) * 6.283; s.style.transform = `translate(${cx - 110 + Math.cos(a) * R * k * .6}px,${cy - 110 + Math.sin(a) * R * k * .6 - k * 60}px) scale(${.5 + k * 1.6})`; s.style.opacity = Math.sin(k * Math.PI) * .7; }));
}
