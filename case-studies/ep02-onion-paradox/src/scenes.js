/* EP02 scenes — "পেঁয়াজের ধাঁধা: বাড়তি ফলিয়েও কেন দাম আকাশছোঁয়া?"
 * Absolute times on the master timeline (T in core.js, 1 bar = 2.4 s). sfx(t, name) feeds audio/build_audio.py. */
const base = (c, css) => E(c, 'a', '', Object.assign({ left: -80, top: -80, width: 1240, height: 2080 }, css));
const H = (c, html, top, size, css) => E(c, 'a h', html, Object.assign({ left: 0, width: 1080, top, fontSize: size }, css));
const chip = (c, html, css, col) => E(c, 'a', `<span class="chip"${col ? ` style="border-color:${col};color:${col}"` : ''}>${html}</span>`, css);
const icoBig = (n, s, col) => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:${col};display:grid;place-items:center;box-shadow:0 0 50px ${col}88">${ico(n, s * 0.62, '#0a0c06', 3)}</div>`;
let C0, C1, C2, C3, C4, C5, C6;   // scene cams, needed for transitions

/* ═════════ 01 · THE PARADOX  0 → 7.2 ═════════ */
{
  const c = C0 = scene('s0', T.s0, T.s1, { post: 0.3 }), t = T.s0;
  base(c, { background: 'linear-gradient(#0e4635,#062219 70%)' });
  const sky = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const clouds = [[-60, 300, 300, .5], [760, 520, 260, .4], [80, 760, 200, .3], [700, 980, 340, .45], [-40, 1180, 280, .35], [820, 200, 180, .3]]
    .map(([x, y, w, o]) => E(sky, 'a', cloud(w, '#2a7a5c'), { left: x, top: y, opacity: o }));
  const ground = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  hills(ground, 1150, ['#0d4433', '#115a42', '#167152']);
  const glow = E(c, 'a', '', { left: 90, top: 250, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle,rgba(198,255,31,.32),rgba(198,255,31,0) 62%)' });
  const mound = pile(ground, 540, 1330, 5, 112, 0);
  const hero = E(c, 'a', onion(360), { left: 360, top: 470 });
  const h1 = H(c, 'আপনি কি <span class="lime">জানেন?</span>', 250, 124);
  const badge = E(c, 'a panel', '<div style="padding:22px 30px;text-align:center"><div style="font:600 34px/1.2 var(--font-bn-body);color:var(--cream)">চাহিদার চেয়েও</div><div style="font:800 76px/1.05 var(--font-bn-display);color:var(--lime)">+<span class="v">০</span> লাখ টন</div><div style="font:600 30px/1.2 var(--font-bn-body);color:var(--cream-dim)">বাড়তি উৎপাদন</div></div>', { left: 615, top: 470, width: 440, transform: 'rotate(5deg)' });
  hIn(h1, t, { op: 1, y: 30, st: 0.1, d: 0.45 });
  tl.fromTo(hero, { scale: 0.85, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, t)
    .to(hero, { y: -18, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, t + 0.6);
  mound.forEach((o, i) => tl.fromTo(o, { y: -1500 - (i % 5) * 90, opacity: 1 }, { y: 0, duration: 0.55, ease: 'bounce.out' }, t + 0.35 + i * 0.035));
  [0.65, 0.8, 0.95, 1.1, 1.25].forEach((d, i) => sfx(t + d, 'plop', { p: i }));
  pop(badge, t + 1.3, { ease: 'back.out(1.8)' }); sfx(t + 1.3, 'swish');
  counter($('.v', badge), 0, 8, t + 1.45, 0.9); sfx(t + 1.45, 'count', { d: 0.9, soft: 1 }); sfx(t + 2.35, 'ding');
  // …so why is the price sky-high?  The onion becomes a rocket: price takes off.
  out([h1, badge], t + 3.1);
  const h2 = H(c, 'তবু দাম কেন<br><span class="red">আকাশছোঁয়া?</span>', 236, 112);
  hIn(h2, t + 3.3, { st: 0.1 });
  const tag = E(c, 'a ptag', '৳<span class="v">৬০</span>', { left: 690, top: 640 });
  pop(tag, t + 3.45, { from: 2 }); sfx(t + 3.45, 'stamp');
  const flame = E(c, 'a', '<div style="width:110px;height:200px;border-radius:50% 50% 50% 50%/30% 30% 70% 70%;background:radial-gradient(ellipse at 50% 25%,#fff6c0,#ffc83d 40%,rgba(255,74,61,.8) 70%,transparent 72%)"></div>', { left: 485, top: 860, opacity: 0, transformOrigin: '50% 0%' });
  const puffs = Array.from({ length: 22 }, (_, i) => E(c, 'a', '', { left: 470 + (rnd(i) - 0.5) * 60, top: 900, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(239,233,220,.75),rgba(239,233,220,0) 68%)', opacity: 0 }));
  const lines = Array.from({ length: 10 }, (_, i) => E(c, 'a', '', { left: 60 + rnd(i + 30) * 960, top: -400, width: 4, height: 260 + rnd(i) * 200, borderRadius: 4, background: 'linear-gradient(transparent,rgba(239,233,220,.5))' }));
  const L = t + 3.8;
  tl.to(hero, { y: 120, duration: 0.5, ease: 'power2.inOut' }, L - 0.3).to(tag, { y: 120, duration: 0.5, ease: 'power2.inOut' }, L - 0.3)
    .to(ground, { y: 1300, duration: 3.2, ease: 'power2.in' }, L).to(glow, { opacity: 0.5, duration: 1 }, L)
    .to(sky, { y: 1500, duration: 3.4, ease: 'power1.in' }, L)
    .fromTo(flame, { opacity: 0, scaleY: 0.3 }, { opacity: 1, scaleY: 1, duration: 0.25 }, L)
    .to(flame, { scaleY: 0.75, duration: 0.07, yoyo: true, repeat: 40, ease: 'none' }, L + 0.25)
    .to([hero, tag, flame], { x: 6, duration: 0.05, yoyo: true, repeat: 50, ease: 'none' }, L);
  puffs.forEach((p, i) => tl.fromTo(p, { opacity: 0.85, y: 0, scale: 0.35 }, { opacity: 0, y: 900, scale: 2.6, duration: 1.3, ease: 'power1.out', immediateRender: false }, L + i * 0.15));
  lines.forEach((l, i) => tl.fromTo(l, { y: 0 }, { y: 2600, duration: 0.6, ease: 'none', repeat: 4, delay: rnd(i) * 0.5 }, L + 0.6));
  const pv = counter($('.v', tag), 60, 210, L, 2.6, v => bn(Math.round(v / 5) * 5), 'power2.in');
  tl.to(tag, { scale: 1.3, background: '#ff4a3d', color: '#fff', duration: 0.3 }, L + 2.4).to(mood, { red: 0.6, duration: 0.6 }, L + 1.8);
  sfx(L, 'rocket', { d: 3.1 }); sfx(L + 2.4, 'boom');
  const guy = E(c, 'a', person(300, { shirt: '#8fd14f', expr: 'shock', pose: 'shrug' }), { left: 760, top: 1060 });
  tl.fromTo(guy, { y: 1000 }, { y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 5.3);
  const qs = [0, 1, 2].map(i => E(c, 'a en', '?', { left: 760 + i * 95, top: 980 - (i % 2) * 50, fontSize: 90, fontWeight: 900, color: 'var(--lime)' }));
  tl.fromTo(qs, { opacity: 0, scale: 0, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(3)', stagger: 0.12 }, t + 5.7);
  sfx(t + 5.4, 'bubble'); sfx(t + 5.75, 'pop', { p: 4 });
  tl.to(mood, { red: 0, duration: 0.5 }, T.s1 - 0.3);
  cap(0.15, 3.05, 'আপনি কি জানেন? দেশে দরকারের চেয়ে প্রায় *৮ লাখ টন বেশি* পেঁয়াজ ফলে!');
  cap(3.2, 7.1, 'তবু প্রতি বছর পেঁয়াজের দাম কেন *আকাশছোঁয়া* হয়ে যায়?');
}

/* ═════════ 02 · DEMAND vs PRODUCTION  7.2 → 16.8 ═════════ */
{
  const c = C1 = scene('s1', T.s1, T.s2, { pre: 0.25 }), t = T.s1;
  whip(t, C0, c, 'down');
  base(c, { background: 'linear-gradient(#2b8a66,#145a42 55%,#0c3d2d)' });
  const sun = E(c, 'a', '', { left: 720, top: 300, width: 190, height: 190, borderRadius: '50%', background: 'radial-gradient(circle,#fff6b0,#ffd84a 55%,#ffb800)', boxShadow: '0 0 140px 50px rgba(255,216,74,.4)' });
  const cl = [[60, 360, 240], [420, 250, 200], [820, 520, 220]].map(([x, y, w], i) => E(c, 'a', cloud(w, '#4fb088'), { left: x, top: y, opacity: 0.7 }));
  cl.forEach((e, i) => tl.to(e, { x: 60 - i * 30, duration: 9.6, ease: 'none' }, t));
  const field = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  hills(field, 760, ['#1f7a55', '#289262', '#33a86d']);
  const workers = [[600, 830], [750, 810], [890, 840]].map(([x, y]) => E(field, 'a', person(64, { hat: 'straw', shirt: '#efe9dc', expr: 'happy' }), { left: x, top: y }));
  workers.forEach((w, i) => tl.to(w, { y: -10, duration: 0.4, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + i * 0.2));
  const plants = [];
  for (let r = 0; r < 5; r++) for (let i = 0; i < 7 - (r % 2); i++) {
    const s = 60 + r * 22, x = 60 + i * 160 + (r % 2) * 80 + (rnd(r * 9 + i) - 0.5) * 30, y = 1060 + r * 140;
    const p = E(field, 'a', `<div style="position:absolute;left:${s * 0.22}px;top:${s * 0.9}px">${onion(s * 0.55)}</div>` + sprout(s), { left: x, top: y - s });
    plants.push(p);
  }
  const farmer = E(field, 'a', person(360, { shirt: '#efe9dc', hat: 'straw', expr: 'happy', pose: 'hold', apron: true }), { left: 60, top: 640 });
  const basket = E(farmer, 'a', `<div style="position:absolute;left:30px;top:-46px">${[0, 1, 2, 3].map(i => `<div style="position:absolute;left:${i * 44}px;top:${(i % 2) * -12}px">${onion(64)}</div>`).join('')}</div><svg width="240" height="110" viewBox="0 0 240 110"><path d="M6 6 H234 L210 104 H30Z" fill="#c48450"/><path d="M20 30 H222 M26 56 H216 M30 80 H210" stroke="#7d4b26" stroke-width="5"/><path d="M6 6 H234" stroke="#e2ad3f" stroke-width="10" stroke-linecap="round"/></svg>`, { left: 60, top: 500 });
  plants.forEach((p, i) => tl.fromTo(p, { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, t + 0.3 + (i % 9) * 0.06 + Math.floor(i / 9) * 0.1));
  [0.35, 0.55, 0.75, 0.95].forEach((d, i) => sfx(t + d, 'plop', { p: i + 2 }));
  tl.fromTo(farmer, { x: -500 }, { x: 0, duration: 0.6, ease: 'back.out(1.2)' }, t + 0.2).to(farmer, { y: -14, duration: 0.3, yoyo: true, repeat: 3 }, t + 0.8);
  // the camera lifts: field drops, two glass tanks rise
  const U = t + 1.6;
  tl.to(field, { y: 640, duration: 0.9, ease: 'power3.inOut' }, U).to(farmer, { x: -520, duration: 0.6, ease: 'power2.in' }, U)
    .to(sun, { y: -420, scale: 0.6, duration: 0.9, ease: 'power3.inOut' }, U);
  const PX = 19, TB = 1180, TH = 760;
  const tank = (x, col, tint, name) => {
    const k = E(c, 'tank', `<div class="fill" style="background-image:${onionURI};background-color:${tint}"></div><div class="gl"></div>`, { left: x, top: TB - TH, width: 340, height: TH, borderColor: col });
    const lab = E(c, 'a lbl', name, { left: x, width: 340, top: 318, color: col });
    const num = E(c, 'a', `<div style="padding:10px 26px 4px;border-radius:26px;background:rgba(5,33,26,.85);text-align:center;font:800 92px/1 var(--font-bn-display);color:${col}"><span class="v">০</span><div style="font:600 30px/1.4 var(--font-bn-body);color:var(--cream)">লাখ টন</div></div>`, { left: x + 70, width: 200, top: TB - 120 });
    tl.fromTo([k, lab], { y: 900, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' }, U + 0.3);
    return { k, f: $('.fill', k), num, lab };
  };
  const D = tank(150, '#2fd3b5', 'rgba(47,211,181,.3)', 'চাহিদা'), P = tank(590, '#c6ff1f', 'rgba(198,255,31,.28)', 'উৎপাদন');
  sfx(U + 0.3, 'whoosh');
  const fillTo = (o, lakh, at, d) => {
    const st = { v: 0 }; tl.to(st, { v: lakh, duration: d, ease: 'power2.out' }, at);
    binds.push(() => { const h = st.v * PX; o.f.style.height = h + 'px'; o.num.style.transform = `translateY(${-Math.max(0, h / 2 - 20)}px)`; $('.v', o.num).textContent = bn(Math.round(st.v)); });
    tl.fromTo(o.num, { opacity: 0 }, { opacity: 1, duration: 0.2 }, at);
    for (let i = 0; i < 7; i++) {
      const fo = E(c, 'a', onion(64), { left: o.k.offsetLeft + 140, top: 1500 }), a = at + i * (d / 8);
      gsap.set(fo, { opacity: 0 }); tl.set(fo, { opacity: 1, x: (rnd(i + lakh) - 0.5) * 500, y: 0, rotation: 0 }, a).to(fo, { keyframes: [{ x: (rnd(i) - 0.5) * 120, y: -1100, duration: 0.35, ease: 'power2.out' }, { y: -560 - (i / 7) * lakh * PX * 0.6 + 400, opacity: 0, rotation: 200, duration: 0.3, ease: 'power2.in' }] }, a);
    }
    sfx(at, 'pour', { d }); sfx(at, 'count', { d, soft: 1 }); sfx(at + d, 'ding');
  };
  fillTo(D, 28, t + 2.6, 1.5); fillTo(P, 36, t + 4.0, 1.7);
  // the surplus
  const line = E(c, 'a', '', { left: 110, width: 900, top: TB - 28 * PX, height: 0, borderTop: '6px dashed #2fd3b5', transformOrigin: '0 50%' });
  const brace = E(c, 'a', '', { left: 948, top: TB - 36 * PX, width: 34, height: 8 * PX, border: '6px solid var(--lime)', borderLeft: 0, borderRadius: '0 18px 18px 0' });
  const sur = chip(c, '+৮ লাখ টন বাড়তি!', { left: 560, top: TB - 36 * PX - 92 });
  tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, t + 6.35)
    .fromTo(brace, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, t + 6.6);
  pop(sur, t + 6.8, { ease: 'back.out(2.5)' }); sfx(t + 6.35, 'swish'); sfx(t + 6.8, 'success', { soft: 1 });
  tl.to(sur, { scale: 1.06, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 7.3);
  cap(7.35, 10.2, 'দেশে বছরে পেঁয়াজের চাহিদা প্রায় *২৮ লাখ মেট্রিক টন*…');
  cap(10.35, 13.4, 'আর উৎপাদন? প্রায় *৩৬ লাখ টন!*');
  cap(13.55, 16.7, 'হিসাব বলছে, চাহিদা মিটিয়েও *৮ লাখ টন* বাড়তি থাকার কথা!');
}

/* ═════════ 03 · THE ROT  16.8 → 26.4 ═════════ */
{
  const c = C2 = scene('s2', T.s2, T.s3, { pre: 0.12 }), t = T.s2;
  zoomThru(t, C1, c, 760, 540);
  base(c, { background: 'linear-gradient(#123d2f,#0a2a20 55%,#06180f)' });
  const world = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  hills(world, 900, ['#0e3a2b', '#103f2f', '#0f3a2b']);
  E(world, 'a', '', { left: 0, top: 1150, width: 1080, height: 800, background: 'linear-gradient(#33452a,#141c10)' });
  const sh = E(world, 'a', shed(900), { left: 90, top: 420 });
  const lamp = E(world, 'a', '', { left: 340, top: 760, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,224,138,.35),rgba(255,224,138,0) 65%)' });
  const stock = pile(world, 540, 1150, 4, 86, 3);
  const ROT = [1, 4, 7, 9, 12, 15];
  const no = chip(c, `${ico('x', 40, '#ff4a3d', 3.4)} আধুনিক সংরক্ষণাগার নেই`, { left: 0, width: 1080, top: 280, textAlign: 'center' }, '#ff4a3d');
  tl.fromTo(world, { y: 60 }, { y: 0, duration: 1.2, ease: 'power2.out' }, t);
  pop(no, t + 0.5); sfx(t + 0.5, 'deny');
  tl.to(lamp, { opacity: 0.2, duration: 0.06, yoyo: true, repeat: 7, ease: 'none' }, t + 1.2);
  sfx(t + 1.2, 'flicker');
  // humidity & heat: drops fall, onions sweat… then rot
  const drops = Array.from({ length: 8 }, (_, i) => E(world, 'a', '<div style="width:16px;height:24px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;background:#7fe0ff;opacity:.8"></div>', { left: 320 + i * 60, top: 820 }));
  drops.forEach((d, i) => tl.fromTo(d, { y: 0, opacity: 0 }, { y: 260, opacity: 0.8, duration: 0.6, ease: 'power2.in', repeat: 2 }, t + 1.6 + i * 0.13));
  out(no, t + 3.15);
  ROT.forEach((k, i) => {
    const o = stock[k], at = t + 3.3 + i * 0.22;
    tl.to($('.rt', o), { opacity: 1, duration: 0.6, ease: 'power1.in' }, at).to(o, { scaleY: 0.86, scaleX: 1.06, duration: 0.6, transformOrigin: '50% 100%' }, at);
    sfx(at, 'squish', { p: i });
  });
  const haze = E(world, 'a', '', { left: 250, top: 860, width: 580, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(160,170,60,.35),rgba(160,170,60,0) 65%)', opacity: 0 });
  tl.to(haze, { opacity: 1, duration: 1 }, t + 3.6);
  const flies = Array.from({ length: 6 }, (_, i) => E(world, 'a', fly(34), { left: 0, top: 0, opacity: 0 }));
  tl.to(flies, { opacity: 1, duration: 0.3, stagger: 0.1 }, t + 3.9);
  binds.push(T2 => { const k = T2 - t; flies.forEach((f, i) => { const a = k * (2.2 + i * 0.3) + i * 1.7; f.style.transform = `translate(${540 + Math.cos(a) * (130 + i * 25) - 17}px,${980 + Math.sin(a * 1.6) * (60 + i * 10)}px) scaleX(${Math.cos(a) > 0 ? -1 : 1})`; }); });
  sfx(t + 3.9, 'buzz', { d: 4.2 });
  // 30% ring + ≈10 lakh tonnes
  const ring = E(c, 'a', `<svg width="300" height="300" viewBox="0 0 300 300" style="transform:rotate(-90deg)"><circle cx="150" cy="150" r="118" fill="rgba(5,33,26,.85)" stroke="rgba(239,233,220,.15)" stroke-width="34"/><circle class="arc" cx="150" cy="150" r="118" fill="none" stroke="#b8c45a" stroke-width="34" stroke-linecap="round" stroke-dasharray="741" stroke-dashoffset="741"/></svg><div style="position:absolute;inset:0;display:grid;place-items:center;font:800 92px/1 var(--font-bn-display);color:#d8e36a"><span><span class="v">০</span>%</span></div>`, { left: 80, top: 250, width: 300, height: 300 });
  const rr = { v: 0 }; tl.to(rr, { v: 30, duration: 1.2, ease: 'power2.out' }, t + 3.5);
  binds.push(() => { $('.arc', ring).setAttribute('stroke-dashoffset', 741 * (1 - rr.v / 100)); $('.v', ring).textContent = bn(Math.round(rr.v)); });
  const ten = E(c, 'a', '<div style="font:800 84px/1.05 var(--font-bn-display);color:var(--red)">≈ ১০ লাখ টন</div><div style="font:700 50px/1.2 var(--font-bn-display);color:var(--cream)">পচে নষ্ট!</div>', { left: 440, top: 300, width: 600, textAlign: 'center' });
  pop(ring, t + 3.3); hIn(ten, t + 4.5); sfx(t + 3.5, 'count', { d: 1.2, soft: 1 }); sfx(t + 4.6, 'thud');
  // the math: 36 − 10 < 28
  const M = t + 6.5;
  tl.to(world, { y: -1500, duration: 0.7, ease: 'power3.in' }, M).to([ring, ten], { y: -900, opacity: 0, duration: 0.5, ease: 'power3.in' }, M);
  sfx(M, 'whoosh');
  const B0 = 90, PXL = 25, BY = 720;
  const tit = H(c, 'মোট উৎপাদন: <span class="lime">৩৬ লাখ টন</span>', 560, 70);
  const keep = E(c, 'a', '', { left: B0, top: BY, width: 26 * PXL, height: 150, borderRadius: '30px 0 0 30px', backgroundImage: onionURI, backgroundColor: 'rgba(198,255,31,.35)', backgroundSize: '70px 76px', border: '5px solid #c6ff1f', borderRight: 0 });
  const lost = E(c, 'a', '', { left: B0 + 26 * PXL, top: BY, width: 10 * PXL, height: 150, borderRadius: '0 30px 30px 0', backgroundImage: onionURI, backgroundColor: 'rgba(198,255,31,.35)', backgroundSize: '70px 76px', border: '5px solid #c6ff1f', borderLeft: '4px dashed #c6ff1f' });
  const dem = E(c, 'a', '<div style="width:0;height:300px;border-left:7px dashed #2fd3b5"></div>', { left: B0 + 28 * PXL - 3, top: BY - 70 });
  const demL = chip(c, 'চাহিদা ২৮', { left: B0 + 28 * PXL - 125, top: BY + 245 }, '#2fd3b5');
  const gap = E(c, 'a', '', { left: B0 + 26 * PXL, top: BY, width: 2 * PXL, height: 150, background: 'repeating-linear-gradient(45deg,rgba(255,74,61,.9) 0 12px,rgba(255,74,61,.35) 12px 24px)', opacity: 0 });
  const short = H(c, '<span class="red">ঘাটতি!</span>', 1040, 170);
  hIn(tit, M + 0.4, { d: 0.4 });
  tl.fromTo([keep, lost], { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.6, ease: 'expo.out', stagger: 0.25 }, M + 0.5);
  tl.fromTo([dem, demL], { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, M + 1.1);
  tl.to(lost, { backgroundColor: 'rgba(110,90,30,.9)', borderColor: '#8a7a2a', duration: 0.4 }, M + 1.4)
    .to(lost, { rotation: 28, y: 900, x: 120, opacity: 0, duration: 0.8, ease: 'power2.in', transformOrigin: '0 0' }, M + 1.9);
  sfx(M + 1.4, 'squish', { p: 3 }); sfx(M + 1.95, 'fall');
  tl.to(gap, { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, M + 2.6);
  hIn(short, M + 2.6, { d: 0.35 }); shake(M + 2.75, 22, 0.4); sfx(M + 2.7, 'stamp'); sfx(M + 2.72, 'alarm');
  tl.to(mood, { red: 0.7, duration: 0.2 }, M + 2.7).to(mood, { red: 0, duration: 0.5 }, T.s3 - 0.4);
  cap(16.95, 19.8, 'কিন্তু আধুনিক *সংরক্ষণাগারের অভাবে*…');
  cap(19.95, 23.2, 'উৎপাদনের প্রায় *৩০%* — প্রায় *১০ লাখ টন* — রান্নাঘরে পৌঁছানোর আগেই পচে নষ্ট হয়!');
  cap(23.35, 26.3, '৩৬ থেকে ১০ বাদ দিলে… বাড়তি তো দূরের কথা, উল্টো *ঘাটতি!*');
}
