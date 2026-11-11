/* CASE STUDIES — series logo v2 · the BAUBC mark is the "A" · cinematic 3D build with fog & smoke.
 *
 *   const L = buildCaseStudiesLogo(stageEl, { width: 900, cy: 860 });   // fills the whole stage
 *   master.add(L.timeline, t0);  every frame: L.draw(t - t0)            // canvas fog/smoke/rays
 *   L.cues -> [{t,name}] sound cues (local time) · L.bottom -> y of the logo's lower edge
 *
 * Needs: gsap, Unbounded 900 loaded, _common/brand/baubc-mark.js. Deterministic: everything is f(t).
 * v1 (typographic Λ, flat) is kept in logo-v1.js for EP01. */
function buildCaseStudiesLogo(parent, o = {}) {
  const SW = o.stageW || 1080, SH = o.stageH || 1920, W = o.width || 900, CY = o.cy ?? 860;
  const CREAM = '#efe9dc', LIME = '#c6ff1f', DUR = 7.2;
  const R = i => { const x = Math.sin(i * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); };
  const mk = (p, tag, css, html) => { const e = document.createElement(tag); e.style.cssText = css; if (html != null) e.innerHTML = html; p.appendChild(e); return e; };

  /* ── layout (measured, both rows fitted to W) ── */
  const ctx = document.createElement('canvas').getContext('2d');
  const font = px => `900 ${px}px Unbounded`, TR = -0.012, MW = 1.0;   // mark width in cap-heights
  const m = (c, px) => { ctx.font = font(px); return ctx.measureText(c); };
  const cap = px => m('E', px).actualBoundingBoxAscent;
  const rowW = (cs, px) => cs.reduce((s, c, i) => s + (c === 'M' ? cap(px) * MW + px * 0.07 : m(c, px).width) + (i ? TR * px : 0), 0);
  const R1 = ['C', 'M', 'S', 'E'], R2 = ['S', 'T', 'U', 'D', 'I', 'E', 'S'];
  const F1 = 100 * W / rowW(R1, 100), F2 = 100 * W / rowW(R2, 100);
  const c1 = cap(F1), c2 = cap(F2), GAP = c2 * 0.27, H = c1 + GAP + c2;
  const LX = (SW - W) / 2, LY = CY - H / 2;

  /* ── layers ── */
  const root = mk(parent, 'div', `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px;overflow:hidden;`);
  const back = mk(root, 'canvas', 'position:absolute;inset:0;'); back.width = SW; back.height = SH;
  const wrap = mk(root, 'div', `position:absolute;inset:0;perspective:1150px;perspective-origin:50% ${CY}px;`);
  const cam = mk(wrap, 'div', `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px;transform-style:preserve-3d;transform-origin:50% ${CY}px;`);
  const logo = mk(cam, 'div', `position:absolute;left:${LX}px;top:${LY}px;width:${W}px;height:${H}px;transform-style:preserve-3d;`);
  const front = mk(root, 'canvas', 'position:absolute;inset:0;pointer-events:none;'); front.width = SW; front.height = SH;
  const sub = mk(root, 'div', 'position:absolute;inset:0;');                 // caller's taglines go here (above fog)

  const L = {};
  function row(cs, px, ch, top, pre) {
    let x = 0; const mm = m('E', px), asc = mm.fontBoundingBoxAscent, desc = mm.fontBoundingBoxDescent;
    cs.forEach((c, i) => {
      if (c === 'M') { x += px * 0.035; L.mark = { x, y: top, w: ch * MW, h: ch }; x += ch * MW + px * 0.035 + TR * px; return; }
      const e = L[pre + i + c] = mk(logo, 'span', `position:absolute;left:${x}px;top:${top + ch - asc}px;font:${font(px)};line-height:${asc + desc}px;color:${CREAM};white-space:pre;`, c);
      e.dataset.w = m(c, px).width; x += m(c, px).width + TR * px;
    });
  }
  row(R1, F1, c1, 0, 'a'); row(R2, F2, c2, c1 + GAP, 'b');
  const C = L.a0C, S1 = L.a2S, E1 = L.a3E, D = L.b3D, U = L.b2U, row2 = ['b0S', 'b1T', 'b2U', 'b4I', 'b5E', 'b6S'].map(k => L[k]);
  E1.style.color = LIME; D.style.color = LIME;
  // speed-smear inside the letter that trails a lime glyph (letter stays whole)
  const STR = 'linear-gradient(180deg,#000 0 22%,transparent 22% 26%,#000 26% 37%,transparent 37% 43%,#000 43% 58%,transparent 58% 62%,#000 62% 73%,transparent 73% 79%,#000 79% 100%)';
  const smear = el => { const s = el.cloneNode(true); Object.assign(s.style, { color: 'transparent', background: `linear-gradient(90deg,transparent 38%,${LIME} 100%)`, webkitBackgroundClip: 'text', backgroundClip: 'text', webkitMaskImage: STR, maskImage: STR }); logo.appendChild(s); return s; };
  const smC = smear(C), smU = smear(U);

  // the mark: six pieces, each its own 3D layer
  const M = L.mark, mcx = M.x + M.w / 2, mcy = M.y + M.h / 2;
  const pieces = BAUBC_MARK.pieces.map(p => mk(logo, 'div', `position:absolute;left:${M.x}px;top:${M.y + (M.h - M.w * BAUBC_MARK.h / BAUBC_MARK.w) / 2}px;width:${M.w}px;transform-style:preserve-3d;`,
    `<svg width="${M.w}" height="${M.w * BAUBC_MARK.h / BAUBC_MARK.w}" viewBox="${BAUBC_MARK.viewBox}" style="display:block;overflow:visible"><polygon points="${p}" fill="${LIME}" stroke="${LIME}" stroke-width="6" stroke-linejoin="round"/></svg>`));
  const ring = mk(logo, 'div', `position:absolute;left:${mcx - M.w}px;top:${mcy - M.w}px;width:${M.w * 2}px;height:${M.w * 2}px;border-radius:50%;border:${M.w * 0.05}px solid ${LIME};opacity:0;`);
  const streak = (y, h, len) => mk(logo, 'div', `position:absolute;left:0;top:${y}px;height:${h}px;width:${len}px;border-radius:${h}px;background:linear-gradient(90deg,transparent,${LIME});transform-origin:100% 50%;opacity:0;`);
  const dX = parseFloat(D.style.left), dTop = c1 + GAP;
  const stD = [0.2, 0.5, 0.8].map((f, i) => streak(dTop + c2 * f, c2 * 0.09, W * (0.42 + 0.1 * (i % 2))));
  const shine = mk(logo, 'div', `position:absolute;left:0;top:${-H * 0.2}px;width:${W * 0.2}px;height:${H * 1.4}px;background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);mix-blend-mode:overlay;opacity:0;transform:skewX(-18deg);`);

  /* ── fog & smoke sprites (fbm value noise, generated once) ── */
  function sprite(seed, tint) {
    const S = 192, c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d'), im = x.createImageData(S, S);
    const N = (i, j, s) => { const v = Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
    const vn = (px, py, s) => { const i = Math.floor(px), j = Math.floor(py), fx = px - i, fy = py - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy), a = N(i, j, s), b = N(i + 1, j, s), cc = N(i, j + 1, s), d = N(i + 1, j + 1, s); return a + (b - a) * u + (cc - a) * v + (a - b - cc + d) * u * v; };
    const rgb = tint.match(/\w\w/g).map(h => parseInt(h, 16));
    for (let y = 0; y < S; y++) for (let xx = 0; xx < S; xx++) {
      let f = 0, amp = 0.5, fr = 3; for (let k = 0; k < 5; k++) { f += amp * vn(xx / S * fr, y / S * fr, seed + k); amp *= 0.5; fr *= 2; }
      const dx = xx / (S / 2) - 1, dy = y / (S / 2) - 1, r = Math.sqrt(dx * dx + dy * dy), a = Math.pow(Math.max(0, 1 - r), 1.4) * Math.min(1, Math.max(0, (f - 0.28) * 2.2));
      const q = (y * S + xx) * 4; im.data[q] = rgb[0]; im.data[q + 1] = rgb[1]; im.data[q + 2] = rgb[2]; im.data[q + 3] = a * 255;
    }
    x.putImageData(im, 0, 0); return c;
  }
  const SM = [sprite(3, '8f9c86'), sprite(11, 'a7b39b'), sprite(23, '7d8a76')], SL = [sprite(5, 'c6ff1f'), sprite(17, 'd9ff6a')];

  /* ── animation ── */
  const tl = gsap.timeline(), cues = [], cue = (t, name, x) => cues.push(Object.assign({ t: +t.toFixed(3), name }, x || {}));
  const V = { fly: 0, fogF: 0.55, ray: 0, rayX: SW / 2, rayY: SH * 0.47, glow: 0 };   // canvas-side params, tweened
  const bursts = [];                                                                   // {t, x, y, n, pow, lime}
  const BIG = Math.min(620 / M.w, 4.6), bdx = SW / 2 - (LX + mcx), bdy = SH * 0.47 - (LY + mcy);
  gsap.set(logo, { transformOrigin: `${mcx}px ${mcy}px`, x: bdx, y: bdy, scale: BIG });
  gsap.set([C, S1, E1, D, smC, smU, ...row2], { opacity: 0 });
  gsap.set(cam, { rotationY: 34, rotationX: 16, z: -200 });

  // A · flight through the fog — the six pieces converge from depth
  tl.to(V, { fly: 1, duration: 1.5, ease: 'power2.in' }, 0)
    .to(cam, { rotationY: 18, rotationX: 10, z: 0, duration: 1.3, ease: 'sine.inOut' }, 0);
  cue(0, 'riser', { d: 1.25 });
  const order = [2, 0, 4, 1, 5, 3];
  order.forEach((pi, k) => {
    const at = 0.18 + k * 0.17, a = R(pi + 3) * 6.283, el = pieces[pi];
    tl.fromTo(el, { opacity: 0, x: Math.cos(a) * 190, y: Math.sin(a) * 190, z: -2600 - R(pi) * 900, rotationZ: (R(pi + 9) - 0.5) * 360, rotationY: (R(pi + 5) - 0.5) * 180 },
      { opacity: 1, x: 0, y: 0, z: 0, rotationZ: 0, rotationY: 0, duration: 0.55, ease: 'power4.out' }, at);
    tl.set(el, { opacity: 0 }, 0);
    bursts.push({ t: at + 0.32, x: SW / 2 + Math.cos(a) * 170, y: SH * 0.47 + Math.sin(a) * 170, n: 7, pow: 0.7, lime: 0.35 });
    cue(at, 'whoosh'); cue(at + 0.33, 'tick', { p: k * 2 });
  });
  // impact: the mark is whole
  const HIT = 1.32;
  tl.fromTo(ring, { opacity: 1, scale: 0.2 }, { opacity: 0, scale: 3.6, duration: 1, ease: 'power3.out', immediateRender: false }, HIT)
    .fromTo(V, { glow: 1 }, { glow: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, HIT)
    .to(V, { ray: 1, duration: 0.25 }, HIT).to(V, { fogF: 0.34, duration: 1.2 }, HIT);
  pieces.forEach((p, i) => tl.to(p, { z: 40, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' }, HIT + i * 0.012));
  bursts.push({ t: HIT, x: SW / 2, y: SH * 0.47, n: 26, pow: 1.6, lime: 0.5 });
  cue(HIT, 'impact'); cue(HIT + 0.02, 'smoke');
  // B · camera pulls back and swings round as CASE STUDIES lands
  const PB = HIT + 0.3;
  tl.to(logo, { x: 0, y: 0, scale: 1, duration: 1.05, ease: 'expo.inOut' }, PB)
    .to(cam, { rotationY: -12, rotationX: 5, duration: 1.4, ease: 'power3.inOut' }, PB)
    .to(V, { rayX: LX + mcx, rayY: LY + mcy, duration: 1.05, ease: 'expo.inOut' }, PB);
  cue(PB, 'sweep');
  [[C, -1], [S1, 1], [E1, 1]].forEach(([el, s], i) => {
    const at = PB + 0.62 + i * 0.1;
    tl.fromTo(el, { opacity: 0, z: 900, x: s * 120, rotationY: s * -40 }, { opacity: 1, z: 0, x: 0, rotationY: 0, duration: 0.45, ease: 'power3.out' }, at);
    bursts.push({ t: at + 0.3, x: LX + parseFloat(el.style.left) + el.dataset.w / 2, y: LY + c1 * 0.6, n: 6, pow: 0.55, lime: el === E1 ? 0.6 : 0.15 });
    cue(at + 0.28, 'thud', { p: i });
  });
  const RS = PB + 0.95;
  tl.fromTo(row2, { opacity: 0, y: c2 * 1.4, z: -500, rotationX: -70 }, { opacity: 1, y: 0, z: 0, rotationX: 0, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.05, transformOrigin: '50% 100%' }, RS);
  cue(RS, 'ticks');
  const DA = RS + 0.42;
  tl.fromTo(D, { opacity: 1, x: -W * 1.3, skewX: 30 }, { x: 0, skewX: 0, duration: 0.5, ease: 'expo.out' }, DA)
    .fromTo(stD, { opacity: 0.95, x: dX - W * 1.6, scaleX: 1.4 }, { x: i => dX - W * (0.42 + 0.1 * (i % 2)), scaleX: 0, opacity: 0.9, duration: 0.75, ease: 'expo.out', stagger: 0.04 }, DA)
    .set(stD, { opacity: 0 }, DA + 0.9)
    .fromTo(smC, { opacity: 0 }, { opacity: 1, duration: 0.5 }, DA + 0.1).fromTo(smU, { opacity: 0 }, { opacity: 1, duration: 0.45 }, DA + 0.3);
  bursts.push({ t: DA + 0.25, x: LX + dX + 40, y: LY + dTop + c2 / 2, n: 8, pow: 0.8, lime: 0.5, dir: -1 });
  cue(DA, 'whoosh');
  // C · lock, light sweep, slow orbit
  const LK = DA + 0.42;
  tl.fromTo(logo, { scale: 1.05 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1,0.45)', immediateRender: false }, LK)
    .fromTo(V, { glow: 0.55 }, { glow: 0, duration: 0.8, immediateRender: false }, LK)
    .fromTo(shine, { opacity: 1, x: -W * 0.4 }, { x: W * 1.2, duration: 0.85, ease: 'power2.inOut' }, LK + 0.15).set(shine, { opacity: 0 }, LK + 1.0)
    .to(cam, { rotationY: 7, rotationX: -3, z: 70, duration: DUR - LK, ease: 'sine.inOut' }, LK + 0.2);
  bursts.push({ t: LK, x: SW / 2, y: CY, n: 14, pow: 1.1, lime: 0.3 });
  cue(LK, 'lock'); cue(LK + 0.15, 'shine');
  tl.to({}, { duration: 0.01 }, DUR);

  /* ── per-frame canvas: background, rays, fog, smoke, embers ── */
  const bg = back.getContext('2d'), fg = front.getContext('2d');
  const FOG = Array.from({ length: 30 }, (_, i) => ({ x: R(i) * SW, y: CY - 700 + R(i + 40) * 1400, s: 500 + R(i + 7) * 700, sp: (R(i + 3) - 0.5) * 40, k: i % 3, z: R(i + 11) }));
  function puffs(g, t, front) {
    for (const b of bursts) {
      const age = t - b.t; if (age < 0 || age > 3.2) continue;
      for (let j = 0; j < b.n; j++) {
        const sd = b.t * 13 + j, a = (b.dir ? Math.PI + (R(sd) - 0.5) * 1.6 : R(sd) * 6.283), sp = (160 + R(sd + 1) * 340) * b.pow;
        const e = 1 - Math.exp(-age * 2.6), px = b.x + Math.cos(a) * sp * e, py = b.y + Math.sin(a) * sp * e * 0.75 - age * 40;
        const size = (90 + R(sd + 2) * 160) * b.pow * (0.5 + e * 1.4), life = Math.max(0, 1 - age / (2.2 + R(sd + 3)));
        const lime = R(sd + 4) < b.lime;
        if (front !== (R(sd + 5) < 0.3)) continue;
        g.globalAlpha = life * life * (lime ? 0.55 : 0.5); g.globalCompositeOperation = lime ? 'screen' : 'source-over';
        g.save(); g.translate(px, py); g.rotate(R(sd + 6) * 6 + age * (R(sd + 7) - 0.5));
        g.drawImage(lime ? SL[j % 2] : SM[j % 3], -size / 2, -size / 2, size, size); g.restore();
      }
    }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  }
  function draw(t) {
    t = Math.max(0, t);
    const gr = bg.createRadialGradient(SW / 2, CY, 0, SW / 2, CY, SH * 0.75);
    gr.addColorStop(0, '#16210d'); gr.addColorStop(0.5, '#0a0f06'); gr.addColorStop(1, '#030402');
    bg.globalAlpha = 1; bg.fillStyle = gr; bg.fillRect(0, 0, SW, SH);
    // volumetric rays from the mark
    if (V.ray > 0) {
      bg.save(); bg.translate(V.rayX, V.rayY); bg.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 16; i++) {
        const a = i / 16 * 6.283 + t * 0.12 + R(i) * 0.3, len = 1500 + R(i + 2) * 600, w = 0.05 + R(i + 5) * 0.08;
        const lg = bg.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len);
        lg.addColorStop(0, `rgba(198,255,31,${(0.035 + 0.09 * V.glow + 0.05 * Math.max(0, 1 - (t - 1.3) / 2)) * V.ray * (0.5 + R(i + 9) * 0.5) * (0.75 + 0.25 * Math.sin(t * 1.3 + i))})`); lg.addColorStop(1, 'rgba(198,255,31,0)');
        bg.fillStyle = lg; bg.beginPath(); bg.moveTo(0, 0); bg.arc(0, 0, len, a - w, a + w); bg.closePath(); bg.fill();
      }
      bg.restore();
    }
    if (V.glow > 0) { const g2 = bg.createRadialGradient(V.rayX, V.rayY, 0, V.rayX, V.rayY, 900); g2.addColorStop(0, `rgba(198,255,31,${0.55 * V.glow})`); g2.addColorStop(1, 'rgba(198,255,31,0)'); bg.globalCompositeOperation = 'lighter'; bg.fillStyle = g2; bg.fillRect(0, 0, SW, SH); bg.globalCompositeOperation = 'source-over'; }
    // drifting fog banks (back), with fly-through zoom during the flight
    const zoom = 1 + V.fly * 1.6;
    for (const f of FOG) {
      if (f.z > 0.7) continue;
      const x = SW / 2 + ((f.x + t * f.sp + SW) % (SW + 800) - SW / 2 - 400) * zoom, y = CY + (f.y - CY) * zoom, s = f.s * zoom;
      bg.globalAlpha = 0.22 + f.z * 0.16; bg.drawImage(SM[f.k], x - s / 2, y - s / 2, s, s * 0.6);
    }
    puffs(bg, t, false);
    // embers rising
    bg.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 40; i++) {
      const life = (t * (0.18 + R(i) * 0.2) + R(i + 1)) % 1, x = R(i + 2) * SW + Math.sin(t * 1.5 + i) * 30, y = SH * (1.05 - life * 1.1);
      bg.globalAlpha = Math.sin(life * Math.PI) * (0.35 + R(i + 3) * 0.5) * Math.min(1, t / 1.2); bg.fillStyle = i % 4 ? '#c6ff1f' : '#efe9dc';
      bg.beginPath(); bg.arc(x, y, 1.5 + R(i + 4) * 3, 0, 6.283); bg.fill();
    }
    bg.globalCompositeOperation = 'source-over'; bg.globalAlpha = 1;
    // front fog: thick during the flight, a light veil after
    fg.clearRect(0, 0, SW, SH);
    for (const f of FOG) {
      if (f.z <= 0.7) continue;
      const z2 = 1 + V.fly * 3.2, x = SW / 2 + ((f.x - t * f.sp * 1.6 + SW * 2) % (SW + 800) - SW / 2 - 400) * z2, y = CY + (f.y - CY) * z2 * 0.8, s = f.s * 1.3 * z2;
      fg.globalAlpha = V.fogF * (0.6 + f.z * 0.4); fg.drawImage(SM[f.k], x - s / 2, y - s / 2, s, s * 0.55);
    }
    puffs(fg, t, true);
    const vg = fg.createRadialGradient(SW / 2, CY, SH * 0.25, SW / 2, CY, SH * 0.7); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)');
    fg.globalAlpha = 1; fg.fillStyle = vg; fg.fillRect(0, 0, SW, SH);
  }
  draw(0);
  return { el: root, sub, timeline: tl, cues, draw, duration: DUR, bottom: LY + H, top: LY, height: H };
}
