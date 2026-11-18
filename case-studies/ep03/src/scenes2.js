/* EP03 v3 — chapters 03–04: অটো মিল · সাদা চাল */
let G1, H1, I1, J1, K1;

/* ═════════ G · the auto rice mill complex rises out of the village (2.5D, textured, daylight) ═════════ */
{
  const tG = S(5) - .2, tH = S(6) - .2, c = G1 = scene('G', tG, tH, { pre: .15, post: .25, push: 1 }), Wd = world(c);
  zoomThru(tG, F1, G1, 540, 560, .5);
  skyDay(Wd, { sx: 120, sy: 300 });
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 600, '#6a9a3a', 71, 6, 70, 'rgba(255,250,200,.6)'), { left: -300, top: 1000 });
  [[40, 930, 170], [860, 950, 150]].forEach(([x, y, w]) => E(far, 'a', hut(w, '#b8743f'), { left: x, top: y }));
  [[-30, 800], [960, 820], [200, 830]].forEach(([x, y]) => E(far, 'a', palm(160, '#2f6a1a'), { left: x, top: y }));
  const fac = Wd.plane(.45), MC = millComplex(1060), fw = E(fac, 'a', '', { left: 10, top: 300, width: MC.w, height: MC.h, transformOrigin: '50% 100%' });
  E(fw, 'a', MC.html, { left: 0, top: 0 });
  // sign text laid on the iso face (skewY 30° = the front-left face)
  const sg = MC.sign; E(fw, 'a', `<div style="width:${sg[1][0] - sg[0][0]}px;text-align:center;font:800 ${(sg[3][1] - sg[0][1]) * -.62}px/1 var(--font-bn-display);color:#fff4dc;white-space:nowrap">অটো রাইস মিল</div>`, { left: sg[3][0], top: sg[3][1] + 4, transform: 'skewY(30deg)', transformOrigin: '0 0' });
  const SM = Array.from({ length: 12 }, (_, i) => E(fw, 'a', `<div style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#f2f2f0,#b8b8b8 60%,rgba(150,150,150,0) 72%)"></div>`, { left: MC.chim[0] - 60, top: MC.chim[1] - 60 }));
  binds.push(t => SM.forEach((s, i) => { const k = ((t * .45 + i / 12) % 1); s.style.transform = `translate(${k * 240 + Math.sin(t + i) * 18}px,${-k * 420}px) scale(${.35 + k * 1.6})`; s.style.opacity = (1 - k) * .85; }));
  const RISE = W(5, 'অটো') - .5;
  tl.fromTo(fw, { y: 820, scaleY: .75 }, { y: 0, scaleY: 1, duration: 1.2, ease: 'back.out(1.25)' }, RISE);
  shake(RISE, 12, 1.1); sfx(RISE, 'rumble'); sfx(RISE + 1, 'impact'); sfx(RISE + 1.1, 'machine', { d: tH - RISE - 1 });
  const dust = Array.from({ length: 16 }, (_, i) => E(fac, 'a', `<div style="width:180px;height:130px;border-radius:50%;background:radial-gradient(rgba(200,180,150,.6),rgba(200,180,150,0) 70%)"></div>`, { left: 60 + i * 60, top: 1180, opacity: 0 }));
  dust.forEach((d, i) => tl.fromTo(d, { opacity: .9, x: 0, y: 0, scale: .5 }, { opacity: 0, x: (i - 8) * 50, y: -120 - rnd(i) * 80, scale: 2, duration: 1.4, ease: 'power2.out', immediateRender: false }, RISE + .8));
  fgStrip(Wd, 'grass', 77, GR, GRIM);
  const ind = chipK(c, 'অটো রাইস মিল ইন্ডাস্ট্রি', { left: 0, width: 1080, top: 250, textAlign: 'center' }, P.red, 50); popK(ind, RISE + 1, 'stamp');
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.12), Object.assign(Wd.aim(540, 980, 1), { duration: tH - tG, ease: 'sine.inOut' }), tG);
}

/* ═════════ H · one ঢেঁকি vs one auto mill: 833 dots, drawn to scale ═════════ */
{
  const tH = S(6) - .2, tI = S(7) - .2, c = H1 = scene('H', tH, tI, { pre: .25, post: .25, push: 1.02 }), Wd = world(c);
  whip(tH, G1, H1, 'left', .5);
  skyDay(Wd, { sx: 860, sy: 200, clouds: 4, cy: 300 });
  E(Wd.plane(.3), 'a', '', { left: -300, top: 700, width: 1700, height: 1400, background: 'linear-gradient(#e9e2d0,#d6ccb6)' });
  E(Wd.plane(.3), 'a', '', { left: -300, top: 700, width: 1700, height: 10, background: '#b8ad94' });
  fgStrip(Wd, 'grass', 23, GR, GRIM);
  const top = Wd.plane(.6);
  const dh = E(top, 'a', '', { left: 30, top: 300, width: 470, height: 330 });
  const beam = E(dh, 'a', dheki(470), { left: 0, top: 70, transformOrigin: '47% 58%' });
  binds.push(t => { beam.style.transform = `rotate(${Math.sin(t * 5) * 3.5}deg)`; });
  const wom = actor(dh, 120, { top: 'saree', low: 'saree', c1: P.gold, head: 'veil', skin: '#9a6040', pose: 'hold', expr: 'happy' }, { left: 20, top: 0 });
  binds.push(t => { wom.style.transform = `translateY(${Math.max(0, Math.sin(t * 5)) * -14}px)`; });
  const dl = E(top, 'a', `<div style="display:flex;align-items:center;gap:16px;font:800 46px/1 var(--font-bn-display);color:${P.n1}">ঢেঁকি = <i style="display:block;width:38px;height:38px;border-radius:50%;background:#5f9e1a;box-shadow:0 0 0 5px #b8f53c"></i> ১</div>`, { left: 90, top: 650 });
  const MC = millComplex(540), ml = E(top, 'a', MC.html, { left: 530, top: 120 });
  const mll = E(top, 'a', `<div style="font:800 46px/1 var(--font-bn-display);color:${P.n1};text-align:center;width:460px;white-space:nowrap">অটো মিল = ?</div>`, { left: 590, top: 650 });
  popK(dh, tH + .05, 'pop'); popK(dl, tH + .3, null); popK(ml, W(6, 'অটো') + .1, 'thud'); popK(mll, W(6, 'অটো') + .3, null);
  const cv = E(c, 'a', '<canvas width="920" height="420"></canvas>', { left: 80, top: 760 }).firstChild, cx = cv.getContext('2d');
  const AT = W(6, 'আটশো') - .5, DUR = 1.6, N = 833, COLS = 49, SP = 18.6;
  binds.push(t => { cx.clearRect(0, 0, 920, 420); const k = Math.max(0, Math.min(1, (t - AT) / DUR)), n = Math.round(1 + (N - 1) * (1 - Math.pow(1 - k, 2)));
    if (t < W(6, 'ঢেঁকির') - .1) return;
    for (let i = 0; i < n; i++) { const x = 10 + (i % COLS) * SP + SP / 2, y = 20 + Math.floor(i / COLS) * SP + SP / 2, fresh = i > n - 30 && k < 1;
      cx.fillStyle = i === 0 ? '#5f9e1a' : fresh ? '#ffe9a0' : '#e0a010'; cx.beginPath(); cx.arc(x, y, i === 0 ? 8.5 : 7.2, 0, 6.283); cx.fill(); }
    if (k >= 1) { cx.strokeStyle = P.red; cx.lineWidth = 5; cx.setLineDash([12, 8]); cx.strokeRect(6, 16, COLS * SP + 8, 17 * SP + 8); } });
  sfx(AT, 'count', { d: DUR }); sfx(AT + DUR, 'impact');
  for (let i = 0; i < 10; i++) sfx(AT + i * DUR / 10, 'coin', { p: i % 3 });
  const big = E(c, 'a', `<div style="text-align:center;font:900 150px/1 var(--font-bn-display);color:${P.gold};text-shadow:0 8px 0 ${P.goldD},0 0 50px rgba(255,201,60,.5)"><span class="n">১</span><span style="font-size:90px"> গুণ</span></div>`, { left: 0, width: 1080, top: 1135, opacity: 0 });
  tl.to(big, { opacity: 1, duration: .2 }, AT); counter($('.n', big), 1, 833, AT, DUR, v => bn(Math.round(v)), 'power2.out');
  tl.fromTo(big, { scale: 1 }, { scale: 1.15, duration: .15, yoyo: true, repeat: 1, immediateRender: false }, AT + DUR);
  binds.push(t => { mll.firstChild.textContent = t > AT + DUR ? 'অটো মিল = ৮৩৩' : 'অটো মিল = ?'; });
  shake(AT + DUR, 10, .3);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 960, 1.04), { duration: tI - tH, ease: 'sine.inOut' }), tH);
}

/* ═════════ I · to earn it back, the mill must sell all year ═════════ */
{
  const tI = S(7) - .2, tJ = S(8) - .2, c = I1 = scene('I', tI, tJ, { pre: .25, post: .3, push: 1.04 }), Wd = world(c);
  whip(tI, H1, I1, 'up', .5);
  skyDay(Wd, { sx: 160, sy: 220 }); fgStrip(Wd, 'wood', 0, '#8a5a2e', '#c98552');
  const ring = E(Wd.plane(.4), 'a', '', { left: 90, top: 330, width: 900, height: 900 });
  MONTHS.forEach((m, i) => { const a = i / 12 * 6.283 - 1.571; E(ring, 'a', `<div style="padding:8px 18px 4px;border-radius:26px;background:${i === 7 ? P.gold : P.n3};color:${i === 7 ? P.n1 : P.cream};font:700 30px/1.2 var(--font-bn-display);white-space:nowrap;transform:translate(-50%,-50%)">${m}</div>`, { left: 450 + Math.cos(a) * 400, top: 450 + Math.sin(a) * 400 }); });
  E(ring, 'a', svg(900, '0 0 900 900', `<circle cx="450" cy="450" r="400" fill="none" stroke="${P.n3}" stroke-width="4" stroke-dasharray="10 14"/>`), { left: 0, top: 0 });
  binds.push(t => { const k = Math.max(0, t - tI); ring.style.transform = `rotate(${k * 40}deg)`; ring.querySelectorAll('.a > div').forEach(d => { d.style.rotate = `${-k * 40}deg`; }); });
  popK(ring, tI + .1, null);
  const owner = actor(Wd.plane(.7), 300, { top: 'suit', c1: '#2a2f45', low: 'pants', c2: '#1a1f30', belly: 1, hair: 'short', must: 1, expr: 'smug', skin: '#a8673e', pose: 'offer' }, { left: 390, top: 520 });
  owner.breathe(tI, tJ).blink(tI + 1.2, tI + 2.6);
  const bag = E(Wd.plane(.75), 'a', moneyBag(170), { left: 640, top: 900, transformOrigin: '50% 100%' });
  for (let i = 0; i < 9; i++) { const k = E(c, 'a', coin(54), { left: 1100, top: 760 + (i % 3) * 40, opacity: 0 }), t0 = tI + .6 + i * .32;
    tl.fromTo(k, { opacity: 1, x: 0, y: 0 }, { keyframes: [{ x: -220, y: -120, duration: .25, ease: 'power1.out' }, { x: -360, y: 180, duration: .25, ease: 'power2.in' }], immediateRender: false }, t0).set(k, { opacity: 0 }, t0 + .5);
    tl.to(bag, { scaleY: .9, scaleX: 1.08, duration: .08, yoyo: true, repeat: 1 }, t0 + .5); sfx(t0 + .5, 'coin', { p: i % 3 }); }
  const belt = E(Wd.plane(1), 'a', '', { left: -100, top: 1210, width: 1300, height: 40, borderRadius: 20, background: `repeating-linear-gradient(90deg,#5a626e 0 30px,#3a3f4a 30px 60px)` });
  binds.push(t => { belt.style.backgroundPosition = `${t * 160}px 0`; });
  const SK = Array.from({ length: 6 }, () => E(Wd.plane(1), 'a', sackK(120, 'চাল', 1), { left: 0, top: 1080 }));
  binds.push(t => SK.forEach((s, i) => { s.style.transform = `translateX(${((t * 160 + i * 230) % 1380) - 200}px)`; }));
  const yr = chipK(c, 'সারা বছর বিক্রি', { left: 0, width: 1080, top: 260, textAlign: 'center' }, P.gold, 52); popK(yr, W(7, 'সারা') - .1, 'ding');
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.08), Object.assign(Wd.aim(540, 960, 1), { duration: tJ - tI, ease: 'sine.inOut' }), tI);
}

/* ═════════ J · the 2.5D polisher strips the nutritious red bran: white rice comes out ═════════ */
{
  const tJ = S(8) - .2, tK = S(9) - .2, c = J1 = scene('J', tJ, tK, { pre: .3, post: .25, push: 1.03 }), Wd = world(c);
  iris(tJ, J1, 540, 900, .55);
  // mill interior: daylight from high windows, concrete floor
  E(Wd.plane(.1), 'a', '', { left: -200, top: -200, width: 1480, height: 2320, background: 'linear-gradient(#cfd8e2,#e8edf2 50%,#b8c2cc)' });
  const back = Wd.plane(.15);
  [0, 1, 2].forEach(i => E(back, 'a', `<div style="width:260px;height:300px;background:linear-gradient(#7fc4f2,#dff2ff);border:14px solid #8a929e;box-shadow:inset 0 0 0 6px #6a727e"></div>`, { left: 40 + i * 360, top: 260 }));
  E(back, 'a', svg(1080, '0 0 1080 1920', `<path d="M100 580 L360 580 L760 1500 L380 1500Z" fill="#fffbe0" opacity=".25"/><path d="M460 580 L720 580 L1080 1400 L800 1500Z" fill="#fffbe0" opacity=".2"/>`), { left: 0, top: 0 });
  E(Wd.plane(.4), 'a', '', { left: -400, top: 1180, width: 1900, height: 1000, background: 'linear-gradient(#9aa2ac,#6a727e 40%)' });
  fgStrip(Wd, 'wood', 0, '#5a626e', '#9aa2ac');
  const R = polisherRig(Wd.plane(.7), 140, 520, 840);
  const ip0 = [140 + R.inP[0], 520 + R.inP[1]], op0 = [140 + R.outP[0], 520 + R.outP[1]], bp0 = [140 + R.branP[0], 520 + R.branP[1]];
  const hero = Wd.plane(.72);
  const red = E(hero, 'a', grain(200, 1, 'happy'), { left: 0, top: 0, transformOrigin: '50% 100%' }), wht = E(hero, 'a', grain(190, 0, 'sad'), { left: 0, top: 0, opacity: 0, transformOrigin: '50% 100%' });
  const IN = tJ + .2, MID = W(8, 'ছেঁটে') - .3, OUT = W(8, 'ধবধবে') - .3;
  // the red grain bounces in from the left, then leaps into the hopper (squash & stretch)
  tl.fromTo(red, { x: -260, y: 1100 }, { x: 30, y: 1100, duration: .8, ease: 'power2.out' }, IN)
    .to(red, { keyframes: [{ scaleY: .7, scaleX: 1.25, duration: .12 }, { scaleY: 1.2, scaleX: .85, duration: .1 }] }, MID - .55)
    .to(red, { keyframes: [{ x: (40 + ip0[0] - 100) / 2, y: ip0[1] - 360, duration: .3, ease: 'power2.out' }, { x: ip0[0] - 100, y: ip0[1] - 180, scale: .55, duration: .28, ease: 'power2.in' }] }, MID - .33)
    .to(red, { opacity: 0, duration: .05 }, MID - .05);
  sfx(MID - .35, 'windup'); sfx(MID, 'plop');
  const lbl = E(c, 'a', `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="padding:10px 24px 6px;border-radius:30px;background:${P.bran};color:#fff;font:800 40px/1.2 var(--font-bn-display);white-space:nowrap">পুষ্টিকর লালচে আবরণ</div>${svg(30, '0 0 30 80', '<path d="M15 0 V70 M3 58 L15 74 L27 58" stroke="#5a1e0a" stroke-width="5" fill="none"/>')}</div>`, { left: 20, top: 860, opacity: 0 });
  tl.fromTo(lbl, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .4, ease: 'back.out(2)', immediateRender: false }, W(8, 'পুষ্টিকর') - .2).to(lbl, { opacity: 0, duration: .3 }, MID - .3); sfx(W(8, 'পুষ্টিকর') - .2, 'pop');
  sfx(MID, 'machine', { d: OUT - MID + .6 }); shake(MID + .1, 5, OUT - MID);
  // bran blows out of the duct, with the nutrients it carries
  for (let i = 0; i < 26; i++) { const f = E(c, 'a', flake(26 + rnd(i) * 26), { left: bp0[0] - 15, top: bp0[1], opacity: 0 }), a = -1.9 + rnd(i + 3) * .9, d = 220 + rnd(i + 5) * 380;
    tl.fromTo(f, { opacity: 1, x: 0, y: 0, rotation: 0 }, { x: Math.cos(a) * d, y: Math.sin(a) * d + 160, rotation: 500, opacity: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, MID + .1 + i * .05); }
  [['ভিটামিন বি', P.red, -60, -300], ['আঁশ', P.orange, 220, -360], ['খনিজ', '#5f9e1a', -40, -150], ['তেল', P.goldD, 260, -200]].forEach(([s, col, dx, dy], i) => {
    const n = E(c, 'a', nutri(s, col), { left: bp0[0] - 60, top: bp0[1] - 20, opacity: 0 });
    tl.fromTo(n, { opacity: 0, x: 0, y: 0, scale: .3 }, { opacity: 1, x: dx, y: dy, scale: 1, duration: .6, ease: 'back.out(1.6)', immediateRender: false }, MID + .2 + i * .16).to(n, { opacity: 0, y: dy - 160, duration: .7, ease: 'power1.in' }, OUT + .5);
    sfx(MID + .2 + i * .16, 'pop', { p: i % 3 }); });
  // out of the chute comes a polished, bright-white, sad grain
  tl.fromTo(wht, { opacity: 0, x: op0[0] - 60, y: op0[1] + 40, rotation: -40, scale: .5 }, { opacity: 1, x: op0[0] + 40, y: op0[1] + 260, rotation: 0, scale: 1, duration: .55, ease: 'bounce.out', immediateRender: false }, OUT);
  flash(W(8, 'ধবধবে'), '#fff', .7, .5); sfx(W(8, 'ধবধবে'), 'shine');
  sparkles(c, 6, op0[0] + 30, op0[1] + 120, 220, 280, W(8, 'ধবধবে') + .1, tK, 21, '#ffffff');
  const wl = plaqueK(c, 'ধবধবে সাদা', { left: 560, top: 1240, transform: 'rotate(-4deg)' }, P.cream, P.n1, 50); popK(wl, W(8, 'সাদা') - .05, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(560, 960, 1.06), { duration: tK - tJ, ease: 'sine.inOut' }), tJ);
}

/* ═════════ K · 3–4 months in the godown → the oil drips out (physics) → fluffy rice that only LOOKS like more ═════════ */
{
  const tK = S(9) - .2, tL = S(10) - .2, tO = W(9, 'ভেতরের') - .2, tP = W(9, 'যাতে') - .2;
  const c = K1 = scene('K', tK, tL, { pre: .3, post: .25, push: 1 }), Wd = world(c);
  whip(tK, J1, K1, 'left', .5);
  // K1 — the godown; the sun arcs over, months pass
  const g1 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), W1 = world(g1);
  skyDay(W1, { sun: false, clouds: 5 });
  const su = E(g1, 'a', sunK(150), { left: 0, top: 0 });
  binds.push(t => { const k = Math.max(0, Math.min(1, (t - tK) / (tO - tK))) * 3.6 % 1, a = Math.PI * (1 - k); su.style.transform = `translate(${465 + Math.cos(a) * 460}px,${720 - Math.sin(a) * 380}px)`; su.style.opacity = Math.sin(k * Math.PI); });
  E(g1, 'a', hillBand(1500, 700, '#5f8f3a', 101, 5, 60, 'rgba(255,250,200,.6)'), { left: -200, top: 1080 });
  E(g1, 'a', godown(720), { left: 180, top: 660 });
  [0, 1, 2, 3, 4, 5, 6].forEach(i => { const s = E(g1, 'a', sackK(120, 'চাল', 1), { left: 400 + (i % 4) * 70 - (i > 3 ? -35 : 0), top: 1010 - (i > 3 ? 90 : 0), opacity: 0 }); land(s, tK + .1 + i * .18, -500, i % 2 ? 'thud' : null); });
  fgStrip(W1, 'grass', 29, GR, GRIM);
  const mc = E(g1, 'a', `<div style="display:flex;gap:14px">${[1, 2, 3, 4].map(m => `<div class="m" style="width:110px;padding:10px 0 6px;border-radius:16px;background:${P.cream};color:${P.n1};text-align:center;font:800 40px/1.1 var(--font-bn-display);opacity:0;box-shadow:0 8px 20px rgba(0,0,0,.25)">${bn(m)}<div style="font-size:24px">মাস</div></div>`).join('')}</div>`, { left: 290, top: 300 });
  [...mc.querySelectorAll('.m')].forEach((m, i) => { const t = W(9, 'তিন-চার') - .5 + i * .32; tl.fromTo(m, { opacity: 0, y: -60, rotationX: 90 }, { opacity: 1, y: 0, rotationX: 0, duration: .35, ease: 'back.out(2)', immediateRender: false }, t); sfx(t, 'flip'); });
  tl.to(g1, { scale: 3, opacity: 0, transformOrigin: '540px 960px', duration: .5, ease: 'power3.in' }, tO - .35);
  // K2 — inside one grain: the natural oil wobbles, squeezes out, drips (gravity) and evaporates
  const g2 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  E(g2, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'radial-gradient(circle at 50% 45%,#fff6dc,#f2d9a0 50%,#c99a50)' });
  E(g2, 'a', '', { left: 0, top: 1240, width: 1080, height: 700, background: 'linear-gradient(#a8742e,#6a4418)' });
  tl.fromTo(g2, { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out', immediateRender: false }, tO - .15);
  const big = E(g2, 'a', grain(400, 0, 'calm'), { left: 340, top: 470 });
  const crk = E(g2, 'a', svg(400, '0 0 120 200', '<path d="M40 50 L52 80 L44 104 L58 130 M84 70 L74 96 L86 120" stroke="#b9ad92" stroke-width="3" fill="none" stroke-linecap="round"/>'), { left: 340, top: 470, opacity: 0 });
  const DR = W(9, 'তেল') - .2;
  oilDrops(g2, 540, 800, 175, 300, tO + .1, DR, 1240, 13);
  sfx(tO + .1, 'bubble'); sfx(DR + .5, 'drip', { p: 0 }); sfx(DR + .9, 'drip', { p: 1 }); sfx(DR + 1.3, 'drip', { p: 2 }); sfx(DR + 1.1, 'sizzle', { d: 1.6 });
  tl.to(crk, { opacity: 1, duration: .4 }, DR + 1.4).to(big, { filter: 'saturate(.3) brightness(.95)', duration: .6 }, DR + 1.2);
  const oil = chipK(g2, 'প্রাকৃতিক তেল শুকিয়ে গেল', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.goldD, 44); popK(oil, W(9, 'প্রাকৃতিক') - .1, null);
  tl.to(g2, { y: -1400, duration: .55, ease: 'power3.in' }, tP - .3);
  // K3 — the pot over a real fire: separate fluffy grains, a mound that LOOKS bigger
  const g3 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  E(g3, 'a', kitchenWall(1080, 1920), { left: 0, top: 0 });
  tl.fromTo(g3, { opacity: 1, y: 1400 }, { y: 0, duration: .55, ease: 'power3.out', immediateRender: false }, tP - .3);
  const ST = clayStove(560); E(g3, 'a', ST.html, { left: 260, top: 1290 - ST.h });
  fireFX(g3, 540, 1060, 560, 260, { base: 360, flame: 150, size: 40, n: 90 });
  const pot = E(g3, 'a', handi(520), { left: 280, top: 600 }), mnd = $('.mound', pot);
  const mo = E(g3, 'a', '', { left: 260, top: 1290 - ST.h, width: ST.w, height: ST.h, clipPath: `path('M${ST.w * .3} ${ST.h} V${ST.h * .58} Q${ST.w / 2} ${ST.h * .3} ${ST.w * .7} ${ST.h * .58} V${ST.h}Z')` });
  fireFX(mo, ST.mx, ST.my, 280, 230, { base: 160, flame: 190, size: 50, n: 100 });
  fireLight(g3, 540, 1150, 700, .5);
  steam(g3, 460, 620, 130, 380, 'rgba(255,250,240,.5)'); steam(g3, 640, 600, 110, 340, 'rgba(255,250,240,.4)', .8);
  const JH = W(9, 'ঝরঝরে') - .15;
  for (let i = 0; i < 14; i++) { const gg = E(g3, 'a', grain(30, 0), { left: 470 + (i % 7) * 22, top: 610, opacity: 0 }), a = (i / 13 - .5) * 2.6;
    tl.fromTo(gg, { opacity: 1, x: 0, y: 0, rotation: 0 }, { x: Math.sin(a) * 300, y: -Math.cos(a) * 220 - 60, rotation: 360 * (i % 2 ? 1 : -1), duration: .5, ease: 'power2.out', immediateRender: false }, JH + i * .025).to(gg, { y: '+=60', opacity: 0, duration: .5, ease: 'power2.in' }, JH + .5 + i * .025); }
  sfx(JH, 'pop', { p: 0 }); sfx(JH + .15, 'pop', { p: 1 }); sfx(JH + .3, 'pop', { p: 2 });
  const jr = chipK(g3, 'ঝরঝরে', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.cream, 56); popK(jr, JH, null);
  const MO = W(9, 'পরিমাণে') - .1;
  tl.fromTo(mnd, { scaleY: 1 }, { scaleY: 2.2, duration: .9, ease: 'elastic.out(1,.5)', immediateRender: false }, MO); sfx(MO, 'squish');
  const ln = E(g3, 'a', svg(620, '0 0 620 20', `<path d="M0 10 H620" stroke="${P.red}" stroke-width="6" stroke-dasharray="18 12"/>`), { left: 230, top: 430, opacity: 0 });
  tl.to(ln, { opacity: 1, duration: .3 }, MO + .5);
  const ey = plaqueK(g3, 'বেশি <span style="color:#ffd9b0">দেখায়</span>', { left: 330, top: 290, transform: 'rotate(-4deg)' }, P.red, P.cream, 54); popK(ey, W(9, 'বেশি') - .1, 'deny');
  out(jr, MO);
  sfx(tP, 'fire', { d: tL - tP });
}
