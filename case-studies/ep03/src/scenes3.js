/* EP03 v2 — chapters 05–06 + logo: ল্যাবের সত্যি · আসল দিন */
let L1, M1, N1, O1, P1, Q1;

/* ═════════ L · "ব্যস" — the proverb is poured into our heads (bookend of B) ═════════ */
{
  const tL = S(10) - .2, tM = S(11) - .2, c = L1 = scene('L', tL, tM, { pre: .3, post: .25, push: 1.05 }), Wd = world(c);
  iris(tL, L1, 355, 760, .55);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.08), 80, 1900, 113); fgStrip(Wd, 'foam', 9);
  const hp = Wd.plane(.5); E(hp, 'a', headProfile(980), { left: -150, top: 420 });
  const hR = E(hp, 'a', headProfile(980, P.red), { left: -150, top: 420, opacity: 0 });
  const fn = E(hp, 'a', funnel(300), { left: 205, top: 250 }); popK(fn, tL + .05, 'thud');
  // words + adverts pour into the funnel
  const W1 = ['পুরান', 'চাল', 'ভাতে', 'বাড়ে'];
  for (let i = 0; i < 8; i++) { const ch = E(c, 'a', wordChip(W1[i % 4], i % 2 ? P.gold : P.cream, P.n1, 38), { left: 300 + (rnd(i) - .5) * 120, top: -120, opacity: 0 }), t0 = tL + .25 + i * .3;
    tl.fromTo(ch, { opacity: 1, y: 0, rotation: (rnd(i + 3) - .5) * 60, scale: 1 }, { y: 520, rotation: 0, scale: .4, duration: .55, ease: 'power2.in', immediateRender: false }, t0).set(ch, { opacity: 0 }, t0 + .55); sfx(t0 + .5, 'plop', { p: i % 3 }); }
  const tv = E(Wd.plane(.65), 'a', tvBox(300, 'পুরান চাল<br>ভাতে বাড়ে!'), { left: 720, top: 300, transformOrigin: '50% 100%' }); popK(tv, tL + .4, 'switch');
  binds.push(t => { tv.style.filter = `brightness(${1 + .25 * Math.sin(t * 20)})`; });
  const mg = E(Wd.plane(.7), 'a', megaphone(230), { left: 40, top: 1140, transform: 'rotate(-25deg)' }); popK(mg, tL + .6, 'horn');
  [0, 1, 2].forEach(i => { const w = E(c, 'a', svg(120, '0 0 120 120', `<path d="M10 60 Q40 ${30 - i * 6} 10 ${0 - i * 6}" stroke="${P.gold}" stroke-width="7" fill="none" stroke-linecap="round"/>`), { left: 280 + i * 40, top: 1040 - i * 40, opacity: 0 }); tl.fromTo(w, { opacity: 1, scale: .6 }, { opacity: 0, scale: 1.4, duration: .6, repeat: 3, immediateRender: false }, tL + .7 + i * .15); });
  // "…ভাতে বাড়ে!" — stamped on the brain
  const ST = W(10, 'পুরান') - .05, pl = plaqueK(c, '‘পুরান চাল ভাতে বাড়ে’', { left: 60, top: 690, transform: 'rotate(-6deg)' }, P.cream, P.red, 60);
  tl.fromTo(pl, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .25, ease: 'power4.in', immediateRender: false }, ST).to(hR, { opacity: 1, duration: .3 }, ST + .2);
  shake(ST + .25, 16, .35); sfx(ST + .22, 'stamp');
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(400, 900, 1.08), { duration: tM - tL, ease: 'sine.inOut' }), tL);
}

/* ═════════ M · but the lab says otherwise ═════════ */
{
  const tM = S(11) - .2, tN = S(12) - .2, c = M1 = scene('M', tM, tN, { pre: .25, post: .25, push: 1.04 }), Wd = world(c);
  whip(tM, L1, M1, 'left', .5);
  skyK(Wd, P.n1, P.n2, P.n3);
  const back = Wd.plane(.2);
  [400, 640, 880].forEach((y, r) => { E(back, 'a', '', { left: 40, top: y, width: 1000, height: 16, borderRadius: 8, background: P.n4 });
    for (let i = 0; i < 7; i++) { const col = [P.lime, P.gold, P.orange, P.red, '#7fd3ff'][(i + r) % 5]; E(back, 'a', flask(70 + rnd(i + r * 9) * 30, col), { left: 70 + i * 140, top: y - 110 - rnd(i + r) * 30, opacity: .85 }); } });
  glowAt(back, 540, 640, 1100, 'rgba(184,245,60,.15)');
  const mid = Wd.plane(.6); floorK(mid, 1260, P.n3, P.n0); fgStrip(Wd, 'wood', 0, '#24397a', P.lime);
  E(mid, 'a', '', { left: 80, top: 1170, width: 920, height: 40, borderRadius: 12, background: P.n4 });
  const ms = E(mid, 'a', microscope(240), { left: 720, top: 925 });
  const fl2 = [[560, P.lime], [640, P.gold]].map(([x, col], i) => { const f = E(mid, 'a', flask(110, col), { left: x, top: 1005 }); return f; });
  const BB = Array.from({ length: 10 }, (_, i) => E(mid, 'a', `<div style="width:${10 + i % 3 * 6}px;height:${10 + i % 3 * 6}px;border-radius:50%;border:3px solid ${i % 2 ? P.lime : P.gold}"></div>`, { left: 600 + (i % 2) * 80, top: 1000 }));
  binds.push(t => BB.forEach((b, i) => { const k = (t * .8 + i / 10) % 1; b.style.transform = `translate(${Math.sin(t * 3 + i) * 14}px,${-k * 220}px)`; b.style.opacity = 1 - k; }));
  const sw = E(mid, 'a', '', { left: 170, top: 1180 - 589, width: 310, height: 589 });
  const s1 = actor(sw, 310, { top: 'coat', low: 'pants', c2: P.n3, hair: 'bun', glasses: 1, skin: '#9a6040', expr: 'happy', pose: 'hold', holdR: '<g transform="translate(-30 -80) scale(.5)"><path d="M44 0 H76 V56 L112 150 Q116 170 98 170 H22 Q4 170 8 150 L44 56Z" fill="#dff3f6"/><path d="M26 110 H94 L108 150 Q110 166 96 166 H24 Q10 166 12 150Z" fill="#b8f53c"/></g>' }, { left: 0, top: 0 });
  const s2 = actor(sw, 310, { top: 'coat', low: 'pants', c2: P.n3, hair: 'bun', glasses: 1, skin: '#9a6040', expr: 'shock', pose: 'up' }, { left: 0, top: 0, opacity: 0 });
  s1.breathe(tM, tN).blink(tM + .8, tM + 2.4);
  const lab = chipK(c, 'ল্যাব টেস্ট', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.lime, 56); popK(lab, W(11, 'ল্যাব') - .1, 'bubble');
  const CM = W(11, 'চমকে') - .1;
  tl.set(s1, { opacity: 0 }, CM).set(s2, { opacity: 1 }, CM); flash(CM, P.lime, .55, .4); shake(CM, 14, .3); sfx(CM, 'zap');
  [[150, 520], [470, 560], [330, 470]].forEach(([x, y], i) => { const ex = E(c, 'a', `<div style="font:900 90px/1 var(--font-en-display);color:${P.gold}">!</div>`, { left: x, top: y, opacity: 0 }); popK(ex, CM + .05 + i * .08, null); });
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1.06), Object.assign(Wd.aim(420, 900, 1.15), { duration: tN - tM, ease: 'sine.inOut' }), tM);
}

/* ═════════ N · the sweet aroma: Kalijira & Gobindobhog beat foreign Basmati (qualitative — no scale) ═════════ */
{
  const tN = S(12) - .2, tO = S(13) - .2, PB = W(12, 'আমাদের') - .2, c = N1 = scene('N', tN, tO, { pre: .3, post: .25, push: 1 }), Wd = world(c);
  zoomThru(tN, M1, N1, 700, 1000, .5);
  skyK(Wd, P.n0, P.n1, '#3a2a6a');
  glowAt(Wd.plane(.1), 540, 700, 1400, 'rgba(255,201,60,.18)');
  const tbl = Wd.plane(.6); floorK(tbl, 1230, '#7a3a2a', '#3a1a12');
  E(tbl, 'a', '', { left: -300, top: 1215, width: 1700, height: 30, background: '#c9703f' });
  const B3 = [['কালোজিরা', 60, '#7a1f2a', P.gold, 640], ['গোবিন্দভোগ', 390, P.n4, P.lime, 640], ['বাসমতি', 720, '#5a6f9c', '#aab6d0', 330]];
  const pls = [], lbs = [];
  B3.forEach(([nm, x, col, pc, ph], i) => {
    const pw = E(tbl, 'a', '', { left: x + 20, top: 1070 - ph, width: 260, height: ph, transformOrigin: '50% 100%' }); E(pw, 'a', plume(260, ph, pc), { left: 0, top: 0 });
    const ps = [...pw.querySelectorAll('.pl')]; ps.forEach(p => { p.style.strokeDasharray = '140 380'; }); binds.push(t => ps.forEach((p, j) => { p.style.strokeDashoffset = (t * 220 + j * 170) % 520; }));
    pls.push(pw);
    E(tbl, 'a', bowlK(300, '#fbf8ef', col), { left: x, top: 1060 });
    const lb = E(tbl, 'a', `<div style="width:300px;text-align:center;font:800 ${i === 2 ? 38 : 44}px/1.2 var(--font-bn-display);color:${i === 2 ? '#aab6d0' : P.cream}">${nm}${i === 2 ? '<div style="font-size:28px;opacity:.8">বিদেশি</div>' : '<div style="font-size:28px;color:' + P.lime + '">দেশি</div>'}</div>`, { left: x, top: 1240, opacity: 0 });
    lbs.push(lb);
  });
  // close on the middle bowl first: "নতুন চালে যে প্রাকৃতিক মিষ্টি ঘ্রাণ থাকে"
  tl.fromTo(pls[1], { scaleY: .2 }, { scaleY: 1, duration: 1.4, ease: 'power2.out' }, tN);
  tl.set([pls[0], pls[2]], { scaleY: 0 }, tN);
  const sw = chipK(c, 'মিষ্টি ঘ্রাণ', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.gold, 56); popK(sw, W(12, 'মিষ্টি') - .1, 'shine'); out(sw, PB);
  sparkles(c, 7, 340, 420, 400, 400, tN + .5, PB, 33);
  tl.fromTo(Wd.cam, Wd.aim(540, 1060, 2.5, 540, 1050), Object.assign(Wd.aim(540, 1040, 2.6, 540, 1050), { duration: PB - tN, ease: 'sine.inOut' }), tN)
    .to(Wd.cam, Object.assign(Wd.aim(540, 960, 1), { duration: 1.1, ease: 'power3.inOut' }), PB);
  sfx(PB, 'whoosh');
  lbs.forEach((l, i) => popK(l, [W(12, 'কালোজিরা'), W(12, 'গোবিন্দভোগ'), W(12, 'বাসমতির')][i] - .15, 'pop'));
  [0, 1, 2].forEach(i => tl.fromTo(pls[i], { scaleY: i === 1 ? 1 : 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out', immediateRender: false }, [W(12, 'কালোজিরা'), W(12, 'সেই'), W(12, 'বাসমতির')][i] - .1));
  const MD = W(12, 'বেশি') - .15;
  [0, 1].forEach(i => { const m = E(c, 'a', medal(110), { left: B3[i][1] + 160, top: 990, transformOrigin: '50% 0', opacity: 0 }); land(m, MD + i * .15, -700, i ? null : 'ding'); });
  tl.to(pls[2], { opacity: .45, duration: .5 }, MD);
  const bt = plaqueK(c, 'দেশি সুগন্ধ বেশি!', { left: 0, top: 330 }, P.lime, P.n1, 58); tl.set(bt, { left: '50%', xPercent: -50 }, tN); popK(bt, MD + .2, 'success');
}

/* ═════════ O · stickiness → creamy payesh & pitha (old rice can't) ═════════ */
{
  const tO = S(13) - .2, tP = S(14) - .2, P1t = W(13, 'পায়েস') - .3, P3t = W(13, 'যা') - .2;
  const c = O1 = scene('O', tO, tP, { pre: .25, post: .25, push: 1.03 }), Wd = world(c);
  whip(tO, N1, O1, 'up', .5);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.06), 50, 1900, 127); fgStrip(Wd, 'wood', 0, '#7a3a2a', '#c9703f');
  glowAt(Wd.plane(.1), 540, 900, 1200, 'rgba(255,170,80,.18)');
  // O1 — two new grains, joined by a stretchy sticky strand
  const g1 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const st = { d: 0 }, sv = E(g1, 'a', svg(1080, '0 0 1080 600', `<path class="goo" d="" fill="#fff4dc"/>`), { left: 0, top: 650 }), goo = $('.goo', sv);
  const ga = E(g1, 'a', grain(170, 1, 'happy'), { left: 370, top: 760 }), gb = E(g1, 'a', grain(170, 1, 'happy'), { left: 540, top: 760 });
  tl.to(st, { d: 1, duration: 1.3, ease: 'power2.out' }, tO + .3).to(st, { d: .55, duration: .9, ease: 'elastic.out(1,.4)' }, tO + 1.7);
  binds.push(() => { const d = st.d * 260, x1 = 455 - d, x2 = 625 + d, y = 270, th = Math.max(6, 60 - d * .18), sag = 30 + d * .25;
    ga.style.transform = `translateX(${-d}px) rotate(${-st.d * 14}deg)`; gb.style.transform = `translateX(${d}px) rotate(${st.d * 14}deg)`;
    goo.setAttribute('d', `M${x1} ${y - th} Q540 ${y + sag - th * .4} ${x2} ${y - th} L${x2} ${y + th} Q540 ${y + sag + th * .4} ${x1} ${y + th}Z`); });
  sfx(tO + .3, 'squish'); sfx(tO + 1.7, 'wobble');
  const ag = chipK(g1, 'প্রাকৃতিক আঠালো ভাব', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.cream, 50); popK(ag, W(13, 'আঠালো') - .2, null);
  tl.to(g1, { scale: .3, opacity: 0, duration: .4, ease: 'power3.in', transformOrigin: '540px 1000px' }, P1t - .2);
  // O2 — payesh + pitha
  const g2 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  tl.fromTo(g2, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out', immediateRender: false }, P1t - .1);
  E(g2, 'a', '', { left: -100, top: 1150, width: 1280, height: 60, borderRadius: 30, background: '#7a3a2a' });
  const pb = E(g2, 'a', payeshBowl(560), { left: 260, top: 790 }), sw = $('.swirl', pb);
  binds.push(t => { sw.setAttribute('transform', `rotate(${t * 90} 170 74)`); });
  const ld = E(g2, 'a', svg(80, '-40 -150 80 160', ladle(1.1)), { left: 520, top: 640, transformOrigin: '50% 100%' });
  binds.push(t => { ld.style.transform = `translate(${Math.sin(t * 4) * 70}px,${Math.cos(t * 4) * 14}px) rotate(${Math.sin(t * 4) * 18}deg)`; });
  steam(g2, 470, 820, 130, 340, 'rgba(255,244,220,.5)'); steam(g2, 640, 810, 120, 300, 'rgba(255,244,220,.4)', .85);
  [[60, 1010], [830, 1010], [160, 1120], [740, 1120]].forEach(([x, y], i) => { const p = E(g2, 'a', pithaK(190), { left: x, top: y, transformOrigin: '50% 100%', opacity: 0 }); land(p, W(13, 'পিঠা') - .2 + i * .12, -600, i % 2 ? null : 'plop'); });
  const cr = chipK(g2, 'পায়েস আর পিঠা — ক্রিমি!', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.gold, 50); popK(cr, W(13, 'পায়েস') - .1, 'ding');
  sparkles(g2, 8, 280, 560, 520, 320, W(13, 'ক্রিমি'), P3t, 41);
  tl.to(g2, { x: -1100, duration: .45, ease: 'power3.in' }, P3t - .1);
  // O3 — old white grains try… and snap
  const g3 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  tl.fromTo(g3, { opacity: 1, x: 1100 }, { x: 0, duration: .45, ease: 'power3.out', immediateRender: false }, P3t - .1); sfx(P3t - .1, 'whoosh');
  const sb = { d: 0 }, sv2 = E(g3, 'a', svg(1080, '0 0 1080 600', `<path class="goo" d="" fill="#e6e0d0"/>`), { left: 0, top: 650 }), goo2 = $('.goo', sv2);
  const wa = E(g3, 'a', grain(170, 0, 'sad'), { left: 370, top: 760 }), wb = E(g3, 'a', grain(170, 0, 'sad'), { left: 540, top: 760 });
  const SN = P3t + .9;
  tl.to(sb, { d: .45, duration: .6, ease: 'power1.inOut' }, P3t + .3).to(sb, { d: 1.2, duration: .5, ease: 'power3.out' }, SN);
  binds.push(t => { const d = sb.d * 260; wa.style.transform = `translateX(${-d}px)`; wb.style.transform = `translateX(${d}px)`;
    if (t >= SN) { goo2.setAttribute('d', ''); return; } const x1 = 455 - d, x2 = 625 + d, th = Math.max(4, 22 - d * .2); goo2.setAttribute('d', `M${x1} ${270 - th} L${x2} ${270 - th} L${x2} ${270 + th} L${x1} ${270 + th}Z`); });
  sfx(SN, 'snap');
  const xx = E(g3, 'a', svg(260, '0 0 100 100', `<path d="M15 15 L85 85 M85 15 L15 85" stroke="${P.red}" stroke-width="16" stroke-linecap="round"/>`), { left: 410, top: 700, opacity: 0 });
  tl.fromTo(xx, { opacity: 0, scale: 2.5 }, { opacity: 1, scale: 1, duration: .25, ease: 'power4.in', immediateRender: false }, SN + .25); sfx(SN + .45, 'deny');
  const no = chipK(g3, 'পুরান চালে আসবে না', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.red, 50); popK(no, SN + .1, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1.05), Object.assign(Wd.aim(540, 960, 1), { duration: tP - tO, ease: 'sine.inOut' }), tO);
}

/* ═════════ P · an industry made us forget the best food on our plate ═════════ */
{
  const tP = S(14) - .2, tQ = S(15) - .2, c = P1 = scene('P', tP, tQ, { pre: .3, post: .25, push: 1.06 }), Wd = world(c);
  iris(tP, P1, 540, 1000, .55);
  const sky = skyK(Wd, P.n0, P.n1, P.n2);
  const fac = Wd.plane(.2), fs = E(fac, 'a', factory(820), { left: 130, top: 300, opacity: 0, filter: 'brightness(.35)' });
  const IN = W(14, 'ইন্ডাস্ট্রি') - .2;
  tl.fromTo(fs, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, IN).to(mood, { red: .45, duration: 1 }, IN).to(mood, { red: 0, duration: .5 }, tQ - .3);
  sfx(IN, 'rumble');
  const tb = Wd.plane(.7); E(tb, 'a', '', { left: -300, top: 1180, width: 1700, height: 800, background: 'linear-gradient(#c9703f,#5a2a18 30%)' });
  glowAt(tb, 540, 1050, 900, 'rgba(255,190,90,.35)');
  const food = E(tb, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(food, 'a', svg(640, '0 0 640 200', `<path d="M10 120 Q320 -40 630 120 Q320 220 10 120Z" fill="#3f8f3a"/><path d="M10 120 Q320 90 630 120" stroke="#6fbf4a" stroke-width="8" fill="none"/>`), { left: 220, top: 990 });
  E(food, 'a', plate(520, '#e9c9b0'), { left: 280, top: 960 });
  E(food, 'a', payeshBowl(260), { left: 60, top: 1050 }); E(food, 'a', pithaK(200), { left: 800, top: 1080 });
  E(food, 'a', grain(90, 1, 'happy'), { left: 495, top: 900 });
  steam(food, 540, 990, 140, 300, 'rgba(255,244,220,.5)');
  const blank = E(tb, 'a', plate(520, '#f4f1e8'), { left: 280, top: 960, opacity: 0 });
  const ER = W(14, 'ভুলিয়ে') - .45, er = E(c, 'a', eraser(360), { left: 1100, top: 1010, transform: 'rotate(-12deg)' });
  tl.to(er, { keyframes: [{ x: -380, y: 30, duration: .35, ease: 'power2.in' }, { x: -820, y: -20, duration: .35 }, { x: -1500, y: 20, duration: .35, ease: 'power2.out' }] }, ER);
  tl.fromTo(food, { clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: 'inset(0px 0px 0px 1080px)', duration: .9, ease: 'power1.inOut', immediateRender: false }, ER + .1).to(blank, { opacity: 1, duration: .3 }, ER + .8);
  for (let i = 0; i < 16; i++) { const cmb = E(c, 'a', `<div style="width:14px;height:10px;border-radius:4px;background:#ff8aa0"></div>`, { left: 900 - i * 50, top: 1110, opacity: 0 }); tl.fromTo(cmb, { opacity: 1, y: 0 }, { opacity: 0, y: 140 + rnd(i) * 80, x: (rnd(i + 2) - .5) * 80, duration: .8, ease: 'power2.in', immediateRender: false }, ER + .1 + i * .05); }
  sfx(ER, 'swish'); sfx(ER + .3, 'swish'); sfx(ER + .9, 'sad');
  tl.to(sky, { filter: 'grayscale(1) brightness(.8)', duration: .8 }, ER + .4);
  const th = chipK(c, 'ভাবুন তো…', { left: 0, width: 1080, top: 320, textAlign: 'center' }, P.cream, 56); popK(th, tP + .1, 'mystery'); out(th, IN + .3);
  const fg = chipK(c, 'সেরা খাবারটাই ভুলে গেলাম', { left: 0, width: 1080, top: 320, textAlign: 'center' }, P.red, 50); popK(fg, ER + 1, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 1000, 1.25), Object.assign(Wd.aim(540, 960, 1), { duration: tQ - tP, ease: 'sine.inOut' }), tP);
}

/* ═════════ Q · not just a saree day — break the marketing trick, bring back real taste & nutrition ═════════ */
{
  const tQ = S(15) - .2, tE = LOGO_AT, tN = W(15, 'নবান্ন হলো') - .25, SH = W(15, 'ধোঁকা') + .05;
  const c = Q1 = scene('Q', tQ, tE, { pre: .25, post: .55, push: 1.03 });
  whip(tQ, P1, Q1, 'left', .5);
  // the reveal world (behind): sunrise over the paddy, a family, the crowned new-rice grain
  const rv = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wd = world(rv);
  skyK(Wd, '#ff7a3d', '#ffc93c', '#fff1c0');
  E(Wd.plane(.08), 'a', sunK(420), { left: 330, top: 560 });
  const rays = E(Wd.plane(.08), 'a', svg(1600, '-800 -800 1600 1600', Array.from({ length: 16 }, (_, i) => `<path d="M0 0 L${Math.cos(i * .3927 - .1) * 900} ${Math.sin(i * .3927 - .1) * 900} L${Math.cos(i * .3927 + .1) * 900} ${Math.sin(i * .3927 + .1) * 900}Z" fill="#fff6c8" opacity=".18"/>`).join('')), { left: -260, top: -30 });
  binds.push(t => { rays.style.transform = `rotate(${t * 6}deg)`; });
  const far = Wd.plane(.25); E(far, 'a', hillBand(1700, 600, '#5f9e1a', 151, 6, 80, 'rgba(255,244,200,.6)'), { left: -300, top: 980 });
  [[-40, 780], [880, 790], [150, 820]].forEach(([x, y]) => E(far, 'a', palm(170, '#2f6b1a'), { left: x, top: y }));
  const mid = Wd.plane(.5); E(mid, 'a', hillBand(1800, 700, '#3f7f1a', 157, 5, 60, 'rgba(184,245,60,.6)'), { left: -360, top: 1090 });
  paddyBand(mid, 1250, 1800, 3, 1, 61, 150, -360); fgStrip(Wd, 'paddy', 67, '#1f4a10', 'rgba(255,244,200,.6)');
  const fam = Wd.plane(.75);
  [[40, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: 'G', head: 'gamcha', must: 1, skin: '#7a4a2a', pose: 'wave', expr: 'happy' }, 220], [230, { top: 'saree', low: 'saree', c1: P.gold, sareeG: 1, head: 'veil', skin: '#9a6040', pose: 'hold', expr: 'happy' }, 210], [810, { top: 'kurta', c1: P.lime, low: 'pants', c2: P.n3, hair: 'short', skin: '#a8673e', pose: 'up', expr: 'happy' }, 160]].forEach(([x, o, w], i) => {
    const a = actor(fam, w, o, { left: x, top: 1330 - w * 1.9 }); a.breathe(tN, tE).blink(SH + 1 + i * .4, SH + 3 + i * .3); if (i === 2) { const n = Math.round((tE - SH) / .5); tl.to(a, { y: -26, duration: .25, yoyo: true, repeat: Math.max(1, n * 2 - 1), ease: 'power1.out' }, SH + .4); } });
  const hero = Wd.plane(.9), hw = E(hero, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(hw, 'a', halo(700, 'rgba(184,245,60,.45)'), { left: 190, top: 560 });
  E(hw, 'a', cushion(420), { left: 330, top: 1150 }); const hg = E(hw, 'a', grain(180, 1, 'happy'), { left: 450, top: 860, transformOrigin: '50% 100%' }); const hc = E(hw, 'a', crown(160), { left: 460, top: 760, transformOrigin: '50% 100%' });
  bob(hg, SH + 1.2, tE, 16, 1.4); bob(hc, SH + 1.2, tE, 16, 1.4, 4);
  const sd = chipK(rv, 'আসল স্বাদ', { left: 90, top: 560 }, P.n1, 50), nt = chipK(rv, 'পুষ্টি', { left: 720, top: 600 }, P.n1, 50);
  [sd, nt].forEach(e => { $('span', e).style.background = P.cream; });
  popK(sd, W(15, 'স্বাদ') - .1, 'pop'); popK(nt, W(15, 'পুষ্টি') - .1, 'pop');
  sparkles(rv, 10, 200, 600, 680, 600, SH + .8, tE + .5, 71);
  tl.fromTo(Wd.cam, Wd.aim(540, 1100, 1.25), Object.assign(Wd.aim(540, 960, 1), { duration: tE - SH, ease: 'power2.out', immediateRender: false }), SH);
  // the front world: the photoshoot day + the marketing billboard
  const fr = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wf = world(fr);
  skyK(Wf, P.n0, '#3a1a3a', '#7a2a3a');
  const city = Wf.plane(.25); E(city, 'a', svg(1400, '0 0 1400 700', [[0, 300, 140], [150, 220, 120], [290, 340, 160], [470, 180, 110], [600, 280, 150], [770, 240, 130], [920, 320, 150], [1090, 200, 140], [1250, 300, 150]].map(([x, h, w]) => `<rect x="${x}" y="${700 - h - 300}" width="${w}" height="${h + 300}" fill="#24183a"/>${Array.from({ length: 6 }, (_, j) => `<rect x="${x + 20 + (j % 2) * 50}" y="${720 - h - 280 + Math.floor(j / 2) * 60}" width="26" height="30" fill="#ffc93c" opacity=".55"/>`).join('')}`).join('')), { left: -160, top: 700 });
  const BW = 900, BH = 540, BX = 90, BY = 420, bb = E(Wf.plane(.6), 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(bb, 'a', '', { left: 250, top: 940, width: 34, height: 500, background: P.n1 }); E(bb, 'a', '', { left: 800, top: 940, width: 34, height: 500, background: P.n1 });
  const bill = E(bb, 'a', billboardHTML(BW, BH, '‘পুরান চাল<br>ভাতে বাড়ে’'), { left: BX, top: BY, width: BW, height: BH });
  const lights = [0, 1, 2].map(i => E(bb, 'a', '', { left: BX + 140 + i * 300, top: BY - 40, width: 40, height: 30, borderRadius: 8, background: P.gold, boxShadow: '0 0 40px 14px rgba(255,201,60,.5)' }));
  floorK(Wf.plane(.7), 1380, '#2a1a3a', '#0a0612'); fgStrip(Wf, 'crowd', 0, '#07040f');
  const gw = E(Wf.plane(.9), 'a', '', { left: 660, top: 1330 - 494, width: 260, height: 494 });
  const girl = actor(gw, 260, { top: 'saree', low: 'saree', c1: P.orange, sareeG: 1, hair: 'bun', skin: '#b07048', pose: [[8, 4], [150, 40]], holdR: '<g transform="translate(-20 -50)"><rect x="0" y="0" width="40" height="66" rx="8" fill="#0a1230"/><rect x="5" y="6" width="30" height="50" rx="3" fill="#5a78c4"/></g>', expr: 'happy' }, { left: 0, top: 0 });
  girl.blink(tQ + .6, tQ + 2.2);
  tl.fromTo(gw, { x: 300 }, { x: 0, duration: 1.4, ease: 'power2.out' }, tQ);
  [tQ + .9, tQ + 2].forEach(t => { const f = E(c, 'a', sparkle(160, '#fff'), { left: 760, top: 820, opacity: 0 }); tl.fromTo(f, { opacity: 1, scale: .2 }, { opacity: 0, scale: 1.4, duration: .3, immediateRender: false }, t); sfx(t, 'shutter'); });
  const NY = W(15, 'নয়') - .2, xs = E(Wf.plane(.9), 'a', `<div style="padding:12px 30px 6px;border-radius:20px;background:${P.red};color:${P.cream};font:800 46px/1.2 var(--font-bn-display);white-space:nowrap;box-shadow:0 14px 30px rgba(0,0,0,.5)">✕ শুধু শাড়ির দিন নয়</div>`, { left: 150, top: 1010, transform: 'rotate(-4deg)' });
  popK(xs, NY, 'deny');
  tl.fromTo(Wf.cam, Wf.aim(780, 1150, 1.3), Object.assign(Wf.aim(540, 900, 1), { duration: tN - tQ, ease: 'sine.inOut' }), tQ);
  sfx(tN, 'riser'); shake(SH - .5, 6, .5);
  // SHATTER — the trick breaks, the light pours in
  const sh = shards(c, BX, BY, BW, BH, billboardHTML(BW, BH, '‘পুরান চাল<br>ভাতে বাড়ে’'), 6, 4, 9);
  tl.set(sh, { opacity: 0 }, tQ - .3).set(sh, { opacity: 1 }, SH).set(bill, { opacity: 0 }, SH);
  sh.forEach((s, i) => { const dx = (s.cx - .5) * 1400 + (rnd(i) - .5) * 300, dy = (s.cy - .5) * 900 - 200 - rnd(i + 3) * 300;
    tl.fromTo(s, { x: 0, y: 0, rotation: 0, scale: 1 }, { keyframes: [{ x: dx * .5, y: dy * .5, rotation: (rnd(i + 5) - .5) * 160, duration: .35, ease: 'power2.out' }, { x: dx, y: dy + 1400, rotation: (rnd(i + 5) - .5) * 400, scale: .7, duration: 1.1, ease: 'power2.in' }], immediateRender: false }, SH); });
  tl.to(fr, { opacity: 0, duration: .35 }, SH + .05).set(fr, { visibility: 'hidden' }, SH + .45);
  tl.fromTo(rv, { opacity: 0 }, { opacity: 1, duration: .01, immediateRender: false }, SH);
  tl.set(rv, { opacity: 0 }, tQ - .3);
  flash(SH, '#fff6c8', .9, .6); shake(SH, 22, .45); sfx(SH, 'shatter'); sfx(SH + .1, 'impact'); sfx(SH + .4, 'success');
  tl.to(mood, { energy: 1.6, duration: .5 }, SH);
  const fin = H(c, `<span style="color:${P.n1}">নবান্ন = </span><span style="color:${P.redD}">আসল স্বাদের দিন</span>`, 280, 72, { textShadow: '0 4px 0 rgba(255,255,255,.5)' });
  hIn(fin, SH + .6, { st: .07 }); sfx(SH + .6, 'star');
}

/* ═════════ logo (built after fonts load) ═════════ */
window.__afterFonts = () => {
  const c = scene('LOGO', T.c6, T.end + 1, { pre: .55, push: 1 }), t = T.c6;
  iris(t, c, 540, 1000, .55);
  tl.to(['#segs', '#hudL', '#hudR'], { opacity: 0, duration: .2 }, t - .2).to(mood, { energy: 0, duration: .3 }, t - .3);
  const L = buildCaseStudiesLogo(c, { width: 900, cy: 900 });
  tl.add(L.timeline, t); binds.push(T2 => L.draw(T2 - t));
  L.cues.forEach(q => sfx(t + q.t, 'logo_' + q.name, q.p != null ? { p: q.p } : q.d ? { d: q.d } : undefined));
  const bnf = 'var(--font-bn-display)';
  L.sub.innerHTML = `<div class="ep" style="position:absolute;left:0;right:0;top:${L.top - 200}px;text-align:center"><span class="chip" style="font-size:36px">এপিসোড ০৩ · পুরান চাল ভাতে বাড়ে?</span></div>
    <div class="rl" style="position:absolute;left:340px;top:${L.bottom + 70}px;width:400px;height:4px;background:var(--lime);border-radius:4px"></div>
    <div class="by" style="position:absolute;left:0;right:0;top:${L.bottom + 96}px;text-align:center;font:800 44px/1.2 ${bnf};color:var(--lime)">বাকৃবি বিজনেস ক্লাবের আয়োজন</div>
    <div class="fu" style="position:absolute;left:0;right:0;top:${L.bottom + 166}px;text-align:center;font:600 28px/1.2 ${bnf};color:var(--cream-dim)">বাংলাদেশ কৃষি বিশ্ববিদ্যালয় বিজনেস ক্লাব</div>
    <div class="fo" style="position:absolute;left:0;right:0;top:${L.bottom + 262}px;text-align:center;font:700 40px/1 ${bnf};color:var(--cream)">এই নবান্নে নতুন চালের ভাত খেয়েছেন? কমেন্টে বলুন</div>`;
  const q = s => L.sub.querySelector(s);
  tl.fromTo(q('.rl'), { scaleX: 0 }, { scaleX: 1, duration: .6, ease: 'expo.out' }, t + 3.3)
    .fromTo(q('.by'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, t + 3.4)
    .fromTo(q('.fu'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, t + 3.7)
    .fromTo(q('.ep'), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 3.6)
    .fromTo(q('.fo'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 4.2);
};
