/* EP03 v3 — chapters 05–06 + logo: ল্যাবের সত্যি · আসল দিন */
let L1, M1, N1, O1, P1, Q1;

/* ═════════ L · "ব্যস" — back in the brain-wash factory: the proverb is funnelled straight into the washed brain ═════════ */
{
  const tL = S(10) - .2, tM = S(11) - .2, c = L1 = scene('L', tL, tM, { pre: .3, post: .25, push: 1.04 }), Wd = world(c);
  iris(tL, L1, 540, 900, .55);
  const F = brainFactory(c, Wd), { bw, bH, bWs, bx, by, BW, ndl } = F;
  bH.style.opacity = 0; bWs.style.opacity = 1; ndl.style.transform = 'rotate(335deg)';
  binds.push(t => { bw.style.transform = `scale(.94,.9) rotate(${Math.sin(t * 2.2) * 1.5}deg)`; });
  const imp = E(bw, 'a', `<div style="font:800 40px/1.1 var(--font-bn-display);color:#4a5a6a;white-space:nowrap;transform:rotate(-8deg)">পুরান চাল ভাতে বাড়ে</div>`, { left: BW * .22, top: BW * .24, opacity: .18, mixBlendMode: 'multiply' });
  const fn = E(Wd.plane(.74), 'a', funnel(300), { left: bx - 150, top: by - 700 }); popK(fn, tL + .05, 'thud');
  const W1 = ['পুরান', 'চাল', 'ভাতে', 'বাড়ে'];
  for (let i = 0; i < 10; i++) { const ch = E(c, 'a', wordChip(W1[i % 4], i % 2 ? P.gold : P.cream, P.n1, 38), { left: bx - 90 + (rnd(i) - .5) * 120, top: -120, opacity: 0 }), t0 = tL + .25 + i * .26;
    tl.fromTo(ch, { opacity: 1, y: 0, rotation: (rnd(i + 3) - .5) * 60, scale: 1 }, { y: by - 520, rotation: 0, scale: .35, duration: .55, ease: 'power2.in', immediateRender: false }, t0).set(ch, { opacity: 0 }, t0 + .55);
    tl.to(imp, { opacity: '+=.03', duration: .1 }, t0 + .6); sfx(t0 + .5, 'plop', { p: i % 3 }); }
  const mg = E(Wd.plane(.75), 'a', megaphone(230), { left: 20, top: 1080, transform: 'rotate(-25deg)' }); popK(mg, tL + .6, 'horn');
  const ST = W(10, 'পুরান') - .05, pl = plaqueK(c, '‘পুরান চাল ভাতে বাড়ে’', { left: 60, top: 1180, transform: 'rotate(-6deg)' }, P.cream, P.red, 60);
  tl.fromTo(pl, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .25, ease: 'power4.in', immediateRender: false }, ST); pl.style.opacity = 0;
  tl.to(imp, { opacity: .6, duration: .2 }, ST + .2).to(mood, { red: .5, duration: .3 }, ST + .2).to(mood, { red: 0, duration: .5 }, tM - .4);
  shake(ST + .25, 16, .35); sfx(ST + .22, 'stamp');
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1.05), Object.assign(Wd.aim(bx, by - 240, 1.2, 540, 900), { duration: tM - tL, ease: 'sine.inOut' }), tL);
}

/* ═════════ M · but the lab says otherwise ═════════ */
{
  const tM = S(11) - .2, tN = S(12) - .2, c = M1 = scene('M', tM, tN, { pre: .25, post: .25, push: 1.04 }), Wd = world(c);
  whip(tM, L1, M1, 'left', .5);
  E(Wd.plane(.1), 'a', '', { left: -200, top: -200, width: 1480, height: 2320, background: 'linear-gradient(#eaf2f6,#d6e4ec 60%,#c2d2dc)' });
  const back = Wd.plane(.2);
  [400, 640, 880].forEach((y, r) => { E(back, 'a', '', { left: 40, top: y, width: 1000, height: 16, borderRadius: 8, background: '#9aa8b4' });
    for (let i = 0; i < 7; i++) { const col = [P.lime, P.gold, P.orange, P.red, '#4fb8ff'][(i + r) % 5]; E(back, 'a', flask(70 + rnd(i + r * 9) * 30, col), { left: 70 + i * 140, top: y - 110 - rnd(i + r) * 30 }); } });
  const mid = Wd.plane(.6); floorK(mid, 1260, '#c2ccd6', '#8a96a2'); fgStrip(Wd, 'wood', 0, '#6a7a8a', '#b8c6d2');
  E(mid, 'a', '', { left: 80, top: 1170, width: 920, height: 40, borderRadius: 12, background: '#5a6a7a' });
  E(mid, 'a', microscope(240), { left: 720, top: 925 });
  [[560, P.lime], [640, P.gold]].forEach(([x, col]) => E(mid, 'a', flask(110, col), { left: x, top: 1005 }));
  const BB = Array.from({ length: 10 }, (_, i) => E(mid, 'a', `<div style="width:${10 + i % 3 * 6}px;height:${10 + i % 3 * 6}px;border-radius:50%;border:3px solid ${i % 2 ? '#5f9e1a' : P.goldD}"></div>`, { left: 600 + (i % 2) * 80, top: 1000 }));
  binds.push(t => BB.forEach((b, i) => { const k = (t * .8 + i / 10) % 1; b.style.transform = `translate(${Math.sin(t * 3 + i) * 14}px,${-k * 220}px)`; b.style.opacity = 1 - k; }));
  const sw = E(mid, 'a', '', { left: 170, top: 1180 - 589, width: 310, height: 589 });
  const s1 = actor(sw, 310, { top: 'coat', low: 'pants', c2: P.n3, hair: 'bun', glasses: 1, skin: '#9a6040', expr: 'happy', pose: 'hold', holdR: '<g transform="translate(-30 -80) scale(.5)"><path d="M44 0 H76 V56 L112 150 Q116 170 98 170 H22 Q4 170 8 150 L44 56Z" fill="#dff3f6"/><path d="M26 110 H94 L108 150 Q110 166 96 166 H24 Q10 166 12 150Z" fill="#b8f53c"/></g>' }, { left: 0, top: 0 });
  const s2 = actor(sw, 310, { top: 'coat', low: 'pants', c2: P.n3, hair: 'bun', glasses: 1, skin: '#9a6040', expr: 'shock', pose: 'up' }, { left: 0, top: 0, opacity: 0 });
  s1.breathe(tM, tN).blink(tM + .8, tM + 2.4);
  const lab = chipK(c, 'ল্যাব টেস্ট', { left: 0, width: 1080, top: 280, textAlign: 'center' }, '#5f9e1a', 56); popK(lab, W(11, 'ল্যাব') - .1, 'bubble');
  const CM = W(11, 'চমকে') - .1;
  tl.set(s1, { opacity: 0 }, CM).set(s2, { opacity: 1 }, CM); flash(CM, P.lime, .45, .4); shake(CM, 14, .3); sfx(CM, 'zap');
  [[150, 520], [470, 560], [330, 470]].forEach(([x, y], i) => { const ex = E(c, 'a', `<div style="font:900 90px/1 var(--font-en-display);color:${P.orange};text-shadow:0 4px 0 #0003">!</div>`, { left: x, top: y }); popK(ex, CM + .05 + i * .08, null); });
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1.06), Object.assign(Wd.aim(420, 900, 1.15), { duration: tN - tM, ease: 'sine.inOut' }), tM);
}

/* ═════════ N · on a শীতল পাটি (top view): Kalijira & Gobindobhog out-smell foreign Basmati (qualitative — no scale) ═════════ */
{
  const tN = S(12) - .2, tO = S(13) - .2, PB = W(12, 'আমাদের') - .2, c = N1 = scene('N', tN, tO, { pre: .3, post: .25, push: 1 }), Wd = world(c);
  zoomThru(tN, M1, N1, 700, 1000, .5);
  E(Wd.plane(.1, { left: -100, top: -100, width: 1280, height: 2120 }), 'a', woodTable(1280, 2120, '#8a4f24'), { left: 0, top: 0 });
  const mat = Wd.plane(.4); E(mat, 'a', shitalPati(1040, 1060), { left: 20, top: 420 });
  const deco = Wd.plane(.42);
  [['sprig', 120, 70, 470, -30], ['sprig', 110, 930, 450, 35], ['bay', 150, 860, 1240, 20], ['bay', 130, 70, 1250, -40], ['card', 60, 480, 1180, 10], ['card', 54, 560, 1220, -30], ['card', 60, 620, 1170, 60],
   ['cinna', 180, 420, 470, 8], ['lemon', 110, 900, 640, 0], ['chili', 160, 60, 620, 30], ['salt', 100, 470, 1270, 0], ['onion', 100, 610, 1300, 0]].forEach(([k, s, x, y, r]) => E(deco, 'a', G[k](s), { left: x, top: y, transform: `rotate(${r}deg)` }));
  const BW3 = 300, BC = [[210, 930], [540, 790], [870, 930]];
  const bowlsP = Wd.plane(.45);
  BC.forEach(([x, y]) => E(bowlsP, 'a', riceImg(BW3), { left: x - BW3 / 2, top: y - BW3 / 2 }));
  const B3 = [['কালোজিরা', '#ffc93c', 620, 'দেশি', 'kali'], ['গোবিন্দভোগ', P.lime, 560, 'দেশি', 'gobi'], ['বাসমতি', '#dfe6f0', 300, 'বিদেশি', 'bas']];
  const pls = B3.map(([nm, pc, ph], i) => { const pw = E(bowlsP, 'a', '', { left: BC[i][0] - 130, top: BC[i][1] - 60 - ph, width: 260, height: ph, transformOrigin: '50% 100%' }); E(pw, 'a', plume(260, ph, pc), { left: 0, top: 0 });
    const ps = [...pw.querySelectorAll('.pl')]; ps.forEach(p => { p.style.strokeDasharray = '140 380'; p.style.filter = `drop-shadow(0 0 8px ${pc})`; }); binds.push(t => ps.forEach((p, j) => { p.style.strokeDashoffset = (t * 220 + j * 170) % 520; })); return pw; });
  const gIcon = k => svg(90, '0 0 90 30', k === 'kali' ? Array.from({ length: 5 }, (_, j) => `<ellipse cx="${10 + j * 17}" cy="15" rx="5" ry="4" fill="#fffaf0"/>`).join('') : k === 'gobi' ? Array.from({ length: 4 }, (_, j) => `<ellipse cx="${12 + j * 21}" cy="15" rx="8" ry="5" fill="#fffaf0"/>`).join('') : `<ellipse cx="45" cy="15" rx="40" ry="5" fill="#fffaf0"/>`);
  const lbs = B3.map(([nm, , , tag, k], i) => E(bowlsP, 'a', `<div style="padding:8px 22px 6px;border-radius:20px;background:${i === 2 ? '#5a6a7c' : '#7a1f2a'};text-align:center;font:800 ${i === 2 ? 36 : 40}px/1.15 var(--font-bn-display);color:#fff4dc;white-space:nowrap;box-shadow:0 8px 18px rgba(0,0,0,.35)">${nm}<div style="font-size:26px;color:${i === 2 ? '#dfe6f0' : '#ffe08a'}">${tag}</div><div style="display:flex;justify-content:center">${gIcon(k)}</div></div>`, { left: BC[i][0] - 120, top: BC[i][1] + 150, opacity: 0 }));
  tl.fromTo(pls[1], { scaleY: .2 }, { scaleY: 1, duration: 1.4, ease: 'power2.out' }, tN); tl.set([pls[0], pls[2]], { scaleY: 0 }, tN);
  const sw = chipK(c, 'মিষ্টি ঘ্রাণ', { left: 0, width: 1080, top: 260, textAlign: 'center' }, P.gold, 56); popK(sw, W(12, 'মিষ্টি') - .1, 'shine'); out(sw, PB);
  sparkles(c, 7, 340, 420, 400, 400, tN + .5, PB, 33);
  tl.fromTo(Wd.cam, Wd.aim(540, 760, 1.9, 540, 1000), Object.assign(Wd.aim(540, 740, 2.0, 540, 1000), { duration: PB - tN, ease: 'sine.inOut' }), tN)
    .to(Wd.cam, Object.assign(Wd.aim(540, 960, 1), { duration: 1.1, ease: 'power3.inOut' }), PB);
  lbs.forEach((l, i) => popK(l, [W(12, 'কালোজিরা'), W(12, 'গোবিন্দভোগ'), W(12, 'বাসমতির')][i] - .15, 'pop'));
  [0, 1, 2].forEach(i => tl.fromTo(pls[i], { scaleY: i === 1 ? 1 : 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out', immediateRender: false }, [W(12, 'কালোজিরা'), W(12, 'সেই'), W(12, 'বাসমতির')][i] - .1));
  const MD = W(12, 'বেশি') - .15;
  [0, 1].forEach(i => { const m = E(bowlsP, 'a', medal(110), { left: BC[i][0] + 60, top: BC[i][1] - 200, transformOrigin: '50% 100%' }); land(m, MD + i * .15, -700, i ? null : 'ding'); });
  tl.to(pls[2], { opacity: .4, duration: .5 }, MD);
  const bt = plaqueK(c, 'দেশি সুগন্ধ বেশি!', { left: 0, top: 260 }, P.lime, P.n1, 58); tl.set(bt, { left: '50%', xPercent: -50 }, tN); popK(bt, MD + .25, 'success');
}

/* ═════════ O · stickiness → top view: creamy payesh & a plate of pitha (old rice can't) ═════════ */
{
  const tO = S(13) - .2, tP = S(14) - .2, P1t = W(13, 'পায়েস') - .3, P3t = W(13, 'যা') - .2;
  const c = O1 = scene('O', tO, tP, { pre: .25, post: .25, push: 1.03 }), Wd = world(c);
  whip(tO, N1, O1, 'up', .5);
  E(Wd.plane(.1), 'a', '', { left: -200, top: -200, width: 1480, height: 2320, background: 'radial-gradient(circle at 50% 40%,#fff6e0,#f2d9a8 55%,#d9a868)' });
  // O1 — two new grains, joined by a stretchy sticky strand
  const g1 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const st = { d: 0 }, sv = E(g1, 'a', svg(1080, '0 0 1080 600', `<path class="goo" d="" fill="#fffaf0" stroke="#e8d8b8" stroke-width="3"/>`), { left: 0, top: 650 }), goo = $('.goo', sv);
  const ga = E(g1, 'a', grain(170, 1, 'happy'), { left: 370, top: 760 }), gb = E(g1, 'a', grain(170, 1, 'happy'), { left: 540, top: 760 });
  tl.to(st, { d: 1, duration: 1.3, ease: 'power2.out' }, tO + .3).to(st, { d: .55, duration: .9, ease: 'elastic.out(1,.4)' }, tO + 1.7);
  binds.push(() => { const d = st.d * 260, x1 = 455 - d, x2 = 625 + d, y = 270, th = Math.max(6, 60 - d * .18), sag = 30 + d * .25;
    ga.style.transform = `translateX(${-d}px) rotate(${-st.d * 14}deg)`; gb.style.transform = `translateX(${d}px) rotate(${st.d * 14}deg)`;
    goo.setAttribute('d', `M${x1} ${y - th} Q540 ${y + sag - th * .4} ${x2} ${y - th} L${x2} ${y + th} Q540 ${y + sag + th * .4} ${x1} ${y + th}Z`); });
  sfx(tO + .3, 'squish'); sfx(tO + 1.7, 'wobble');
  const ag = chipK(g1, 'প্রাকৃতিক আঠালো ভাব', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.goldD, 50); popK(ag, W(13, 'আঠালো') - .2, null);
  tl.to(g1, { scale: .3, opacity: 0, duration: .4, ease: 'power3.in', transformOrigin: '540px 1000px' }, P1t - .2);
  // O2 — top view: payesh in a brass bowl (ladle stirring), a kansa plate of pitha
  const g2 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  E(g2, 'a', woodTable(1080, 1920), { left: 0, top: 0 });
  tl.fromTo(g2, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out', immediateRender: false }, P1t - .1);
  E(g2, 'a', payeshTop(620), { left: 40, top: 300 });
  const ld = E(g2, 'a', svg(340, '0 0 340 120', `<defs><linearGradient id="ldl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#9a6a10"/></linearGradient></defs><rect x="90" y="48" width="250" height="22" rx="11" fill="url(#ldl)"/><ellipse cx="62" cy="60" rx="58" ry="44" fill="url(#ldl)"/><ellipse cx="62" cy="60" rx="46" ry="33" fill="#f6e2bc"/><ellipse cx="48" cy="50" rx="16" ry="8" fill="#fff" opacity=".6"/>`), { left: 0, top: 0, transformOrigin: '62px 60px' });
  binds.push(t => { const a = t * 1.6; ld.style.transform = `translate(${350 - 62 + Math.cos(a) * 120}px,${610 - 60 + Math.sin(a) * 120}px) rotate(${a * 57.3 + 40}deg)`; });
  steamTop(g2, 350, 610, 260, 7);
  const pp = E(g2, 'a', pithaTop(600), { left: 440, top: 900, transformOrigin: '50% 50%' });
  tl.fromTo(pp, { opacity: 0, scale: .4, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: .6, ease: 'back.out(1.8)', immediateRender: false }, W(13, 'পিঠা') - .25); pp.style.opacity = 0; sfx(W(13, 'পিঠা') - .2, 'plop');
  steamTop(g2, 740, 1200, 260, 6);
  const cr = chipK(g2, 'পায়েস আর পিঠা — ক্রিমি!', { left: 0, width: 1080, top: 230, textAlign: 'center' }, P.goldD, 50); popK(cr, W(13, 'পায়েস') - .1, 'ding');
  sparkles(g2, 8, 120, 380, 460, 460, W(13, 'ক্রিমি'), P3t, 41);
  tl.to(g2, { x: -1100, duration: .45, ease: 'power3.in' }, P3t - .1);
  // O3 — old white grains try… and snap
  const g3 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  tl.fromTo(g3, { opacity: 1, x: 1100 }, { x: 0, duration: .45, ease: 'power3.out', immediateRender: false }, P3t - .1);
  const sb = { d: 0 }, sv2 = E(g3, 'a', svg(1080, '0 0 1080 600', `<path class="goo" d="" fill="#e6e0d0"/>`), { left: 0, top: 650 }), goo2 = $('.goo', sv2);
  const wa = E(g3, 'a', grain(170, 0, 'sad'), { left: 370, top: 760 }), wb = E(g3, 'a', grain(170, 0, 'sad'), { left: 540, top: 760 });
  const SN = P3t + .9;
  tl.to(sb, { d: .45, duration: .6, ease: 'power1.inOut' }, P3t + .3).to(sb, { d: 1.2, duration: .5, ease: 'power3.out' }, SN);
  binds.push(t => { const d = sb.d * 260; wa.style.transform = `translateX(${-d}px)`; wb.style.transform = `translateX(${d}px)`;
    if (t >= SN) { goo2.setAttribute('d', ''); return; } const x1 = 455 - d, x2 = 625 + d, th = Math.max(4, 22 - d * .2); goo2.setAttribute('d', `M${x1} ${270 - th} L${x2} ${270 - th} L${x2} ${270 + th} L${x1} ${270 + th}Z`); });
  sfx(SN, 'snap');
  const xx = E(g3, 'a', svg(260, '0 0 100 100', `<path d="M15 15 L85 85 M85 15 L15 85" stroke="${P.red}" stroke-width="16" stroke-linecap="round"/>`), { left: 410, top: 700, opacity: 0 });
  tl.fromTo(xx, { opacity: 0, scale: 2.5 }, { opacity: 1, scale: 1, duration: .25, ease: 'power4.in', immediateRender: false }, SN + .25); sfx(SN + .45, 'deny');
  const no = chipK(g3, 'পুরান চালে আসবে না', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.red, 50); popK(no, SN + .1, null);
}

/* ═════════ P · top view: the best food on our plate — erased, under the mill's shadow ═════════ */
{
  const tP = S(14) - .2, tQ = S(15) - .2, c = P1 = scene('P', tP, tQ, { pre: .3, post: .25, push: 1.05 }), Wd = world(c);
  iris(tP, P1, 540, 1000, .55);
  const tbP = Wd.plane(.3); E(tbP, 'a', woodTable(1200, 2100, '#9a5a2a'), { left: -60, top: -90 });
  const food = E(Wd.plane(.5), 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(food, 'a', thaliTop(900), { left: 90, top: 470 });
  E(food, 'a', riceImg(390), { left: 294, top: 776 });
  steamTop(food, 480, 990, 300, 7);
  const blank = E(Wd.plane(.5), 'a', bake(bsvg(900, 900, `<circle cx="450" cy="462" r="423" fill="#000" opacity=".3" filter="url(#fBlur6)"/><circle cx="450" cy="450" r="423" fill="url(#k)"/><circle cx="450" cy="450" r="380" fill="url(#k2)"/><circle cx="450" cy="450" r="423" fill="#fff" filter="url(#tBrush)" opacity=".3"/>`, '<radialGradient id="k" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0c0"/><stop offset=".6" stop-color="#c99a3a"/><stop offset="1" stop-color="#6a4a10"/></radialGradient><radialGradient id="k2" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f7dc90"/><stop offset="1" stop-color="#b98a2a"/></radialGradient>'), 900, 900), { left: 90, top: 470, opacity: 0 });
  // the mill's shadow creeps over the table (top view)
  const IN = W(14, 'ইন্ডাস্ট্রি') - .2, shd = E(c, 'a', svg(1300, '0 0 1300 900', `<path d="M0 0 H1300 V420 L1120 420 L1120 260 L1040 260 L1040 520 L860 520 L860 300 L780 300 L780 560 L560 560 L560 380 L420 380 L420 640 L200 640 L200 460 L0 460Z" fill="#1a0a04"/>`), { left: -110, top: -900, opacity: .55 });
  tl.to(shd, { y: 760, duration: 2.2, ease: 'power2.inOut' }, IN); sfx(IN, 'rumble');
  tl.to(mood, { red: .4, duration: 1 }, IN).to(mood, { red: 0, duration: .5 }, tQ - .3);
  const ER = W(14, 'ভুলিয়ে') - .45, er = E(c, 'a', eraser(380), { left: 1100, top: 900, transform: 'rotate(-12deg)' });
  tl.to(er, { keyframes: [{ x: -380, y: 30, duration: .35, ease: 'power2.in' }, { x: -820, y: -20, duration: .35 }, { x: -1500, y: 20, duration: .35, ease: 'power2.out' }] }, ER);
  tl.fromTo(food, { clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: 'inset(0px 0px 0px 1080px)', duration: .9, ease: 'power1.inOut', immediateRender: false }, ER + .1).to(blank, { opacity: 1, duration: .3 }, ER + .1);
  for (let i = 0; i < 16; i++) { const cmb = E(c, 'a', `<div style="width:14px;height:10px;border-radius:4px;background:#ff8aa0"></div>`, { left: 900 - i * 50, top: 1010, opacity: 0 }); tl.fromTo(cmb, { opacity: 1, y: 0 }, { opacity: 0, y: 140 + rnd(i) * 80, x: (rnd(i + 2) - .5) * 80, duration: .8, ease: 'power2.in', immediateRender: false }, ER + .1 + i * .05); }
  sfx(ER, 'rub'); sfx(ER + .9, 'sad');
  tl.to(tbP, { filter: 'grayscale(.8) brightness(.8)', duration: .8 }, ER + .4);
  const th = chipK(c, 'ভাবুন তো…', { left: 0, width: 1080, top: 280, textAlign: 'center' }, P.cream, 56); popK(th, tP + .1, 'mystery'); out(th, IN + .3);
  const fg = chipK(c, 'সেরা খাবারটাই ভুলে গেলাম', { left: 0, width: 1080, top: 280, textAlign: 'center' }, P.red, 50); popK(fg, ER + 1, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 1000, 1.2), Object.assign(Wd.aim(540, 960, 1), { duration: tQ - tP, ease: 'sine.inOut' }), tP);
}

/* ═════════ Q · not just a day out at the pitha fair — break the marketing trick, bring back real taste & nutrition ═════════ */
{
  const tQ = S(15) - .2, tE = LOGO_AT, tN = S(15) + .2, SH = W(15, 'ধোঁকা') + .05;
  const c = Q1 = scene('Q', tQ, tE, { pre: .25, post: .55, push: 1.03 });
  whip(tQ, P1, Q1, 'left', .5);
  // the reveal world (behind): sunrise over the paddy, a village family, the crowned new-rice grain
  const rv = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wd = world(rv);
  skyK(Wd, '#ff9a4a', '#ffd25a', '#fff1c0');
  E(Wd.plane(.08), 'a', sunK(420), { left: 330, top: 560 });
  const rays = E(Wd.plane(.08), 'a', svg(1600, '-800 -800 1600 1600', Array.from({ length: 16 }, (_, i) => `<path d="M0 0 L${Math.cos(i * .3927 - .1) * 900} ${Math.sin(i * .3927 - .1) * 900} L${Math.cos(i * .3927 + .1) * 900} ${Math.sin(i * .3927 + .1) * 900}Z" fill="#fff6c8" opacity=".18"/>`).join('')), { left: -260, top: -30 });
  binds.push(t => { rays.style.transform = `rotate(${t * 6}deg)`; });
  const far = Wd.plane(.25); E(far, 'a', hillBand(1700, 600, '#5f9e1a', 151, 6, 80, 'rgba(255,244,200,.6)'), { left: -300, top: 980 });
  [[-40, 780], [880, 790], [150, 820]].forEach(([x, y]) => E(far, 'a', palm(170, '#2f6b1a'), { left: x, top: y }));
  const mid = Wd.plane(.5); E(mid, 'a', hillBand(1800, 700, '#3f7f1a', 157, 5, 60, 'rgba(184,245,60,.6)'), { left: -360, top: 1090 });
  paddyBand(mid, 1250, 1800, 3, 1, 61, 150, -360); fgStrip(Wd, 'paddy', 67, '#1f4a10', 'rgba(255,244,200,.6)');
  const fam = Wd.plane(.75);
  [[40, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: 'G', head: 'gamcha', must: 1, skin: '#7a4a2a', pose: 'wave', expr: 'happy' }, 220], [230, { top: 'kurta', c1: '#2f8a7a', low: 'pants', c2: '#f4ead6', hair: 'bun', skin: '#9a6040', pose: 'hold', expr: 'happy' }, 200], [810, { top: 'kurta', c1: P.lime, low: 'pants', c2: P.n3, hair: 'short', skin: '#a8673e', pose: 'up', expr: 'happy' }, 160]].forEach(([x, o, w], i) => {
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
  // the front world: a city pitha fair (people out for selfies) + the marketing billboard
  const fr = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wf = world(fr);
  skyDay(Wf, { sx: 860, sy: 200 });
  const city = Wf.plane(.25); E(city, 'a', svg(1400, '0 0 1400 700', [[0, 300, 140], [150, 220, 120], [290, 340, 160], [470, 180, 110], [600, 280, 150], [770, 240, 130], [920, 320, 150], [1090, 200, 140], [1250, 300, 150]].map(([x, h, w], k) => `<rect x="${x}" y="${700 - h - 300}" width="${w}" height="${h + 300}" fill="${['#c9b8a8', '#b8a898', '#d6c8b8'][k % 3]}"/>${Array.from({ length: 6 }, (_, j) => `<rect x="${x + 20 + (j % 2) * 50}" y="${720 - h - 280 + Math.floor(j / 2) * 60}" width="26" height="30" fill="#6fa8d8" opacity=".8"/>`).join('')}`).join('')), { left: -160, top: 640 });
  const BW = 900, BH = 520, BX = 90, BY = 380, bb = E(Wf.plane(.6), 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(bb, 'a', '', { left: 250, top: 880, width: 34, height: 500, background: '#3a3f4a' }); E(bb, 'a', '', { left: 800, top: 880, width: 34, height: 500, background: '#3a3f4a' });
  const BTXT = '‘পুরান চাল<br>ভাতে বাড়ে’', bill = E(bb, 'a', billboardHTML(BW, BH, BTXT), { left: BX, top: BY, width: BW, height: BH });
  // pitha-fair stalls + a crowd in everyday clothes, phones up
  E(Wf.plane(.7), 'a', svg(1300, '0 0 1300 360', Array.from({ length: 5 }, (_, i) => `<rect x="${i * 270}" y="120" width="250" height="240" fill="#f4e6c6"/><path d="M${i * 270 - 10} 130 L${i * 270 + 125} 40 L${i * 270 + 260} 130Z" fill="${['#c4233b', '#e8a020', '#2f7aa8', '#3f8f3a', '#ff8a3d'][i]}"/><rect x="${i * 270 + 20}" y="200" width="210" height="20" fill="#c98552"/>${Array.from({ length: 5 }, (_, j) => `<circle cx="${i * 270 + 45 + j * 40}" cy="196" r="14" fill="${j % 2 ? '#f7efe0' : '#c9862a'}"/>`).join('')}`).join('')), { left: -110, top: 1060 });
  E(Wf.plane(.7), 'a', `<div style="padding:10px 28px 4px;background:#c4233b;color:#fff4dc;border-radius:12px;font:800 44px/1.2 var(--font-bn-display)">পিঠা উৎসব</div>`, { left: 380, top: 1000 });
  const crowd = Wf.plane(.95);
  [[40, '#2f7aa8', 'short'], [200, '#e8a020', 'bun'], [380, '#3f8f3a', 'short'], [560, '#c4233b', 'bun'], [740, '#5a6a7a', 'short'], [900, '#ff8a3d', 'bun']].forEach(([x, col, hr], i) => {
    const a = actor(crowd, 190, { top: 'kurta', c1: col, low: 'pants', c2: i % 2 ? '#2a3a5a' : '#3a3f4a', hair: hr, skin: ['#a8673e', '#9a6040', '#b07048'][i % 3], pose: [[8, 4], [150, 40]], holdR: '<g transform="translate(-14 -36)"><rect x="0" y="0" width="28" height="46" rx="6" fill="#0a1230"/><rect x="3" y="4" width="22" height="36" rx="2" fill="#5a78c4"/></g>', expr: 'happy' }, { left: x - 40, top: 1930 - 361 });
    a.blink(tQ + .5 + i * .2, tQ + 2.5); });
  [tQ + .7, tQ + 1.3, tQ + 2.1].forEach((t, i) => { const f = E(c, 'a', sparkle(150, '#fff'), { left: 120 + i * 330, top: 1080, opacity: 0 }); tl.fromTo(f, { opacity: 1, scale: .2 }, { opacity: 0, scale: 1.4, duration: .3, immediateRender: false }, t); sfx(t, 'shutter'); });
  tl.fromTo(Wf.cam, Wf.aim(540, 1150, 1.2), Object.assign(Wf.aim(540, 960, 1), { duration: tN - tQ, ease: 'sine.inOut' }), tQ);
  sfx(tN, 'riser'); shake(SH - .5, 6, .5);
  // SHATTER — the trick breaks; every shard flies right off the screen
  const sh = shards(c, BX, BY, BW, BH, billboardHTML(BW, BH, BTXT), 6, 4, 9);
  tl.set(sh, { opacity: 0 }, tQ - .3).set(sh, { opacity: 1 }, SH).set(bill, { opacity: 0 }, SH);
  sh.forEach((s, i) => { const ang = Math.atan2(s.cy - .5 + (rnd(i) - .5) * .4, s.cx - .5 + (rnd(i + 1) - .5) * .4), sp = 1500 + rnd(i + 2) * 900, dx = Math.cos(ang) * sp, dy = Math.sin(ang) * sp * .6 - 300;
    tl.fromTo(s, { x: 0, y: 0, rotation: 0, scale: 1 }, { keyframes: [{ x: dx * .25, y: dy * .25, rotation: (rnd(i + 5) - .5) * 160, scale: 1.05, duration: .3, ease: 'power2.out' }, { x: dx, y: dy + 2600, rotation: (rnd(i + 5) - .5) * 720, scale: .8, duration: 1.2, ease: 'power2.in' }], immediateRender: false }, SH)
      .set(s, { opacity: 0 }, SH + 1.55); });
  tl.to(fr, { opacity: 0, duration: .35 }, SH + .05).set(fr, { visibility: 'hidden' }, SH + .45);
  rv.style.opacity = 0; tl.fromTo(rv, { opacity: 0 }, { opacity: 1, duration: .01, immediateRender: false }, SH);
  flash(SH, '#fff6c8', .9, .6); shake(SH, 22, .45); sfx(SH, 'shatter'); sfx(SH + .1, 'impact'); sfx(SH + .4, 'success');
  tl.to(mood, { energy: 1.6, duration: .5 }, SH);
  const fin = H(c, `<span style="color:${P.n1}">নবান্ন = </span><span style="color:${P.redD}">আসল স্বাদের দিন</span>`, 260, 72, { textShadow: '0 4px 0 rgba(255,255,255,.5)' });
  hIn(fin, SH + .6, { st: .07 }); sfx(SH + .6, 'star');
}

/* ═════════ logo (built after fonts load) — deep-orange theme ═════════ */
window.__afterFonts = () => {
  const c = scene('LOGO', T.c6, T.end + 1, { pre: .55, push: 1 }), t = T.c6;
  iris(t, c, 540, 1000, .55);
  tl.to(mood, { energy: 0, duration: .3 }, t - .3);
  const L = buildCaseStudiesLogo(c, { width: 900, cy: 900, theme: 'orange' });
  tl.add(L.timeline, t); binds.push(T2 => L.draw(T2 - t));
  L.cues.forEach(q => sfx(t + q.t, 'logo_' + q.name, q.p != null ? { p: q.p } : q.d ? { d: q.d } : undefined));
  const bnf = 'var(--font-bn-display)';
  L.sub.innerHTML = `<div class="ep" style="position:absolute;left:0;right:0;top:${L.top - 200}px;text-align:center"><span class="chip" style="font-size:36px;background:rgba(60,10,0,.35);color:#ffffff;border-color:#ffffff;text-shadow:0 0 14px rgba(255,255,255,.8);box-shadow:0 0 24px rgba(255,255,255,.5)">এপিসোড ০৩ · পুরান চাল ভাতে বাড়ে?</span></div>
    <div class="rl" style="position:absolute;left:340px;top:${L.bottom + 70}px;width:400px;height:4px;background:#ffffff;border-radius:4px;box-shadow:0 0 16px #fff"></div>
    <div class="by" style="position:absolute;left:0;right:0;top:${L.bottom + 96}px;text-align:center;font:800 44px/1.2 ${bnf};color:#ffffff;text-shadow:0 0 14px rgba(255,255,255,.85),0 0 32px rgba(255,214,150,.6)">বাকৃবি বিজনেস ক্লাবের আয়োজন</div>
    <div class="fu" style="position:absolute;left:0;right:0;top:${L.bottom + 166}px;text-align:center;font:600 28px/1.2 ${bnf};color:#ffffff;text-shadow:0 0 14px rgba(255,255,255,.85),0 0 32px rgba(255,214,150,.6)">বাংলাদেশ কৃষি বিশ্ববিদ্যালয় বিজনেস ক্লাব</div>
    <div class="fo" style="position:absolute;left:0;right:0;top:${L.bottom + 262}px;text-align:center;font:700 40px/1 ${bnf};color:#ffffff;text-shadow:0 0 14px rgba(255,255,255,.85),0 0 32px rgba(255,214,150,.6)">এই নবান্নে নতুন চালের ভাত খেয়েছেন? কমেন্টে বলুন</div>`;
  const q = s => L.sub.querySelector(s);
  tl.fromTo(q('.rl'), { scaleX: 0 }, { scaleX: 1, duration: .6, ease: 'expo.out' }, t + 3.3)
    .fromTo(q('.by'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, t + 3.4)
    .fromTo(q('.fu'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, t + 3.7)
    .fromTo(q('.ep'), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 3.6)
    .fromTo(q('.fo'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 4.2);
};
