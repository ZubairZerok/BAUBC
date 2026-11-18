/* EP03 v2 — chapters 03–04: অটো মিল · সাদা চাল */
let G1, H1, I1, J1, K1;

/* ═════════ G · the auto rice mill rises out of the village ═════════ */
{
  const tG = S(5) - .2, tH = S(6) - .2, c = G1 = scene('G', tG, tH, { pre: .15, post: .25, push: 1 }), Wd = world(c);
  zoomThru(tG, F1, G1, 540, 560, .5);
  skyK(Wd, P.n0, P.n1, '#3a2a6a'); starField(Wd.plane(.05), 90, 1100, 61);
  E(Wd.plane(.07), 'a', `<div style="width:130px;height:130px;border-radius:50%;background:${P.cream};box-shadow:0 0 80px 30px rgba(255,244,220,.25)"></div>`, { left: 140, top: 380 });
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 600, P.n2, 71, 6, 70), { left: -300, top: 1040 });
  [[60, 900, 200], [830, 920, 180]].forEach(([x, y, w]) => E(far, 'a', hut(w, P.n3), { left: x, top: y }));
  [[-30, 780], [960, 800]].forEach(([x, y]) => E(far, 'a', palm(170, P.n1), { left: x, top: y }));
  const fac = Wd.plane(.45), fw = E(fac, 'a', '', { left: 170, top: 520, width: 740, height: 690 });
  E(fw, 'a', factory(740), { left: 0, top: 0 });
  const winGlow = E(fw, 'a', '', { left: 40, top: 430, width: 660, height: 120, background: 'radial-gradient(ellipse,rgba(255,201,60,.55),rgba(255,201,60,0) 70%)' });
  const gears = [[90, 520, 150, P.red], [620, 330, 120, P.gold], [200, 300, 90, P.lime]].map(([x, y, w, col], i) => { const gg = E(fw, 'a', gear(w, col, 9 + i), { left: x, top: y }); binds.push(t => { gg.style.transform = `rotate(${(i % 2 ? -1 : 1) * t * 120}deg)`; }); return gg; });
  const lights = [0, 1].map(i => E(fw, 'a', '', { left: i ? 545 : 395, top: i ? 30 : 100, width: 28, height: 28, borderRadius: '50%', background: P.red, boxShadow: `0 0 30px 10px ${P.red}` }));
  binds.push(t => lights.forEach((l, i) => { l.style.opacity = (Math.floor(t * 2 + i) % 2) ? .25 : 1; }));
  const SM = Array.from({ length: 12 }, (_, i) => E(fw, 'a', `<div style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#8a93b8,#3a4a7a 70%)"></div>`, { left: i % 2 ? 525 : 395, top: i % 2 ? 20 : 90 }));
  binds.push(t => SM.forEach((s, i) => { const k = ((t * .5 + i / 12) % 1); s.style.transform = `translate(${k * 160 + Math.sin(t + i) * 20}px,${-k * 520}px) scale(${.4 + k * 1.4})`; s.style.opacity = (1 - k) * .8; }));
  // the mill rises with a rumble; dust kicks up
  const RISE = W(5, 'অটো') - .5;
  tl.fromTo(fw, { y: 760, scaleY: .7 }, { y: 0, scaleY: 1, duration: 1.1, ease: 'back.out(1.3)' }, RISE);
  shake(RISE, 12, 1.1); sfx(RISE, 'rumble'); sfx(RISE + .9, 'impact'); sfx(RISE + 1, 'machine', { d: tH - RISE - 1 });
  const dust = Array.from({ length: 14 }, (_, i) => E(fac, 'a', `<div style="width:160px;height:120px;border-radius:50%;background:radial-gradient(rgba(150,160,200,.5),rgba(150,160,200,0) 70%)"></div>`, { left: 150 + i * 55, top: 1120, opacity: 0 }));
  dust.forEach((d, i) => tl.fromTo(d, { opacity: .9, x: 0, y: 0, scale: .5 }, { opacity: 0, x: (i - 7) * 50, y: -120 - rnd(i) * 80, scale: 2, duration: 1.4, ease: 'power2.out', immediateRender: false }, RISE + .7));
  const fgp = Wd.plane(1.2); E(fgp, 'a', hillBand(1500, 500, '#050a20', 77, 5, 60, 'rgba(184,245,60,.15)'), { left: -200, top: 1200 });
  E(fgp, 'a', grassFG(1300, '#050a20'), { left: -100, top: 1110 });
  const bg2 = E(Wd.plane(1.3), 'a', gear(520, P.n4, 12), { left: 700, top: 1290, opacity: 0 }); binds.push(t => { bg2.style.transform = `rotate(${t * -60}deg)`; });
  tl.to(bg2, { opacity: .9, duration: .5 }, W(5, 'ঘুরিয়ে') - .2); sfx(W(5, 'ঘুরিয়ে') - .2, 'windup');
  const ind = chipK(c, 'অটো রাইস মিল', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.red, 56); popK(ind, RISE + .9, 'stamp');
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.1), Object.assign(Wd.aim(540, 960, 1), { duration: tH - tG, ease: 'sine.inOut' }), tG);
}

/* ═════════ H · one ঢেঁকি vs one auto mill: 833 coins, drawn to scale ═════════ */
{
  const tH = S(6) - .2, tI = S(7) - .2, c = H1 = scene('H', tH, tI, { pre: .25, post: .25, push: 1.02 }), Wd = world(c);
  whip(tH, G1, H1, 'left', .5);
  skyK(Wd, P.n0, P.n1, P.n2);
  fgStrip(Wd, 'grass', 23);
  const top = Wd.plane(.6);
  const dh = E(top, 'a', '', { left: 40, top: 300, width: 470, height: 330 });
  const beam = E(dh, 'a', dheki(470), { left: 0, top: 70, transformOrigin: '47% 58%' });
  binds.push(t => { beam.style.transform = `rotate(${Math.sin(t * 5) * 3.5}deg)`; });
  const wom = actor(dh, 120, { top: 'saree', low: 'saree', c1: P.gold, head: 'veil', skin: '#9a6040', pose: 'hold', expr: 'happy' }, { left: 20, top: 0 });
  binds.push(t => { wom.style.transform = `translateY(${Math.max(0, Math.sin(t * 5)) * -14}px)`; });
  const dl = E(top, 'a', `<div style="display:flex;align-items:center;gap:16px;font:800 46px/1 var(--font-bn-display);color:${P.cream}">ঢেঁকি = <i style="display:block;width:38px;height:38px;border-radius:50%;background:${P.lime};box-shadow:0 0 20px ${P.lime}"></i> ১</div>`, { left: 90, top: 650 });
  const ml = E(top, 'a', factory(300), { left: 680, top: 330 });
  const mll = E(top, 'a', `<div style="font:800 46px/1 var(--font-bn-display);color:${P.cream};text-align:center;width:460px;white-space:nowrap">অটো মিল = ?</div>`, { left: 600, top: 650 });
  popK(dh, tH + .05, 'pop'); popK(dl, tH + .3, null); popK(ml, W(6, 'অটো') + .1, 'thud'); popK(mll, W(6, 'অটো') + .3, null);
  // the coin grid: 49 × 17 = 833 dots, one dot = the cost of one ঢেঁকি
  const cv = E(c, 'a', '<canvas width="920" height="420"></canvas>', { left: 80, top: 760 }).firstChild, cx = cv.getContext('2d');
  const AT = W(6, 'আটশো') - .5, DUR = 1.6, N = 833, COLS = 49, SP = 18.6;
  binds.push(t => { cx.clearRect(0, 0, 920, 420); const k = Math.max(0, Math.min(1, (t - AT) / DUR)), n = Math.round(1 + (N - 1) * (1 - Math.pow(1 - k, 2)));
    if (t < W(6, 'ঢেঁকির') - .1) return;
    for (let i = 0; i < n; i++) { const x = 10 + (i % COLS) * SP + SP / 2, y = 20 + Math.floor(i / COLS) * SP + SP / 2, fresh = i > n - 30 && k < 1;
      cx.fillStyle = i === 0 ? P.lime : fresh ? '#fff4c2' : P.gold; cx.beginPath(); cx.arc(x, y, i === 0 ? 8.5 : 7.2, 0, 6.283); cx.fill(); }
    if (k >= 1) { cx.strokeStyle = P.red; cx.lineWidth = 5; cx.setLineDash([12, 8]); cx.strokeRect(6, 16, COLS * SP + 8, 17 * SP + 8); } });
  sfx(AT, 'count', { d: DUR }); sfx(AT + DUR, 'impact');
  for (let i = 0; i < 10; i++) sfx(AT + i * DUR / 10, 'coin', { p: i % 3 });
  const big = E(c, 'a', `<div style="text-align:center;font:900 150px/1 var(--font-bn-display);color:${P.gold};text-shadow:0 8px 0 ${P.goldD},0 0 50px rgba(255,201,60,.5)"><span class="n">১</span><span style="font-size:90px"> গুণ</span></div>`, { left: 0, width: 1080, top: 1135, opacity: 0 });
  tl.to(big, { opacity: 1, duration: .2 }, AT); counter($('.n', big), 1, 833, AT, DUR, v => bn(Math.round(v)), 'power2.out');
  tl.fromTo(big, { scale: 1 }, { scale: 1.15, duration: .15, yoyo: true, repeat: 1, immediateRender: false }, AT + DUR);
  tl.call(() => {}, [], AT + DUR); binds.push(t => { mll.firstChild.textContent = t > AT + DUR ? 'অটো মিল = ৮৩৩' : 'অটো মিল = ?'; });
  shake(AT + DUR, 10, .3);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 960, 1.04), { duration: tI - tH, ease: 'sine.inOut' }), tH);
}

/* ═════════ I · to earn it back, the mill must sell all year ═════════ */
{
  const tI = S(7) - .2, tJ = S(8) - .2, c = I1 = scene('I', tI, tJ, { pre: .25, post: .3, push: 1.04 }), Wd = world(c);
  whip(tI, H1, I1, 'up', .5);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.06), 50, 1900, 83); fgStrip(Wd, 'wood', 0, '#24397a', '#5a78c4');
  const ring = E(Wd.plane(.4), 'a', '', { left: 90, top: 330, width: 900, height: 900 });
  MONTHS.forEach((m, i) => { const a = i / 12 * 6.283 - 1.571; E(ring, 'a', `<div style="padding:8px 18px 4px;border-radius:26px;background:${i === 7 ? P.gold : P.n3};color:${i === 7 ? P.n1 : P.cream};font:700 30px/1.2 var(--font-bn-display);white-space:nowrap;transform:translate(-50%,-50%)">${m}</div>`, { left: 450 + Math.cos(a) * 400, top: 450 + Math.sin(a) * 400 }); });
  E(ring, 'a', svg(900, '0 0 900 900', `<circle cx="450" cy="450" r="400" fill="none" stroke="${P.n4}" stroke-width="4" stroke-dasharray="10 14"/>`), { left: 0, top: 0 });
  binds.push(t => { const k = Math.max(0, t - tI); ring.style.transform = `rotate(${k * 40}deg)`; ring.querySelectorAll('.a > div').forEach(d => { d.style.rotate = `${-k * 40}deg`; }); });
  popK(ring, tI + .1, 'whoosh');
  const owner = actor(Wd.plane(.7), 300, { top: 'suit', c1: '#2a2f45', low: 'pants', c2: '#1a1f30', belly: 1, hair: 'short', must: 1, expr: 'smug', skin: '#a8673e', pose: 'offer' }, { left: 390, top: 520 });
  owner.breathe(tI, tJ).blink(tI + 1.2, tI + 2.6);
  const bag = E(Wd.plane(.75), 'a', moneyBag(170), { left: 640, top: 900, transformOrigin: '50% 100%' });
  for (let i = 0; i < 9; i++) { const k = E(c, 'a', coin(54), { left: 1100, top: 760 + (i % 3) * 40, opacity: 0 }), t0 = tI + .6 + i * .32;
    tl.fromTo(k, { opacity: 1, x: 0, y: 0 }, { keyframes: [{ x: -220, y: -120, duration: .25, ease: 'power1.out' }, { x: -360, y: 180, duration: .25, ease: 'power2.in' }], immediateRender: false }, t0).set(k, { opacity: 0 }, t0 + .5);
    tl.to(bag, { scaleY: .9, scaleX: 1.08, duration: .08, yoyo: true, repeat: 1 }, t0 + .5); sfx(t0 + .5, 'coin', { p: i % 3 }); }
  const belt = E(Wd.plane(1), 'a', '', { left: -100, top: 1210, width: 1300, height: 40, borderRadius: 20, background: `repeating-linear-gradient(90deg,${P.n4} 0 30px,${P.n3} 30px 60px)` });
  binds.push(t => { belt.style.backgroundPosition = `${t * 160}px 0`; });
  const SK = Array.from({ length: 6 }, (_, i) => E(Wd.plane(1), 'a', sackK(120, 'চাল', 1), { left: 0, top: 1080 }));
  binds.push(t => SK.forEach((s, i) => { s.style.transform = `translateX(${((t * 160 + i * 230) % 1380) - 200}px)`; }));
  const yr = chipK(c, 'সারা বছর বিক্রি', { left: 0, width: 1080, top: 280, textAlign: 'center' }, P.gold, 52); popK(yr, W(7, 'সারা') - .1, 'ding');
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.08), Object.assign(Wd.aim(540, 960, 1), { duration: tJ - tI, ease: 'sine.inOut' }), tI);
}

/* ═════════ J · the polisher strips the nutritious red bran: white rice ═════════ */
{
  const tJ = S(8) - .2, tK = S(9) - .2, c = J1 = scene('J', tJ, tK, { pre: .3, post: .25, push: 1.03 }), Wd = world(c);
  iris(tJ, J1, 540, 900, .55);
  skyK(Wd, P.n0, P.n1, P.n2);
  glowAt(Wd.plane(.1), 540, 900, 1300, 'rgba(90,120,196,.3)'); fgStrip(Wd, 'wood', 0, '#18295e', '#35519c');
  const belt = E(Wd.plane(.6), 'a', '', { left: -200, top: 1150, width: 1500, height: 46, borderRadius: 23, background: `repeating-linear-gradient(90deg,${P.n4} 0 30px,${P.n3} 30px 60px)` });
  binds.push(t => { belt.style.backgroundPosition = `${t * 200}px 0`; });
  const mach = E(Wd.plane(.7), 'a', rollers(560), { left: 260, top: 790 });
  const hop = E(Wd.plane(.7), 'a', funnel(240), { left: 420, top: 560 });
  const HG = Array.from({ length: 8 }, (_, i) => E(Wd.plane(.7), 'a', grain(34, 1), { left: 510 + (i % 3) * 18, top: 300 }));
  binds.push(t => HG.forEach((h, i) => { const k = (t * .9 + i / 8) % 1; h.style.transform = `translateY(${k * 300}px) rotate(${k * 300 + i * 40}deg)`; h.style.opacity = k < .85 ? 1 : 0; }));
  mach.querySelectorAll('.rl').forEach((r, i) => { r.style.transformBox = 'fill-box'; r.style.transformOrigin = 'center'; binds.push(t => { r.style.transform = `rotate(${(i ? -1 : 1) * t * 400}deg)`; }); });
  const hero = Wd.plane(.8);
  const red = E(hero, 'a', grain(220, 1, 'happy'), { left: 70, top: 800, transformOrigin: '50% 100%' }), wht = E(hero, 'a', grain(220, 0, 'sad'), { left: 790, top: 800, opacity: 0, transformOrigin: '50% 100%' });
  const IN = tJ + .2, MID = W(8, 'ছেঁটে') - .2, OUT = W(8, 'ধবধবে') - .25;
  tl.fromTo(red, { x: -320 }, { x: 0, duration: .7, ease: 'back.out(1.6)' }, IN).to(red, { y: -12, duration: .14, yoyo: true, repeat: Math.max(1, Math.round((MID - IN - .3) / .14)) - 1 }, IN);
  const lbl = E(c, 'a', `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="padding:10px 24px 6px;border-radius:30px;background:${P.bran};color:#fff;font:800 40px/1.2 var(--font-bn-display);white-space:nowrap">পুষ্টিকর লালচে আবরণ</div>${svg(30, '0 0 30 80', '<path d="M15 0 V70 M3 58 L15 74 L27 58" stroke="#fff" stroke-width="5" fill="none"/>')}</div>`, { left: 40, top: 560, opacity: 0 });
  tl.fromTo(lbl, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .4, ease: 'back.out(2)', immediateRender: false }, W(8, 'পুষ্টিকর') - .2).to(lbl, { opacity: 0, duration: .3 }, MID); sfx(W(8, 'পুষ্টিকর') - .2, 'pop');
  tl.to(red, { x: 330, scaleX: .4, opacity: 0, duration: .35, ease: 'power2.in' }, MID);
  sfx(MID, 'machine', { d: OUT - MID + .3 }); shake(MID + .2, 6, OUT - MID);
  // bran flakes + nutrients fly off
  for (let i = 0; i < 18; i++) { const f = E(c, 'a', flake(30 + rnd(i) * 26), { left: 520, top: 900, opacity: 0 }), a = -2.6 + rnd(i + 3) * 2.2, d = 260 + rnd(i + 5) * 300;
    tl.fromTo(f, { opacity: 1, x: 0, y: 0, rotation: 0 }, { x: Math.cos(a) * d, y: Math.sin(a) * d + 200, rotation: 400, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, MID + .1 + i * .04); }
  [['ভিটামিন বি', P.red, -320, -300], ['আঁশ', P.orange, 330, -330], ['খনিজ', P.lime, -380, -40], ['তেল', P.goldD, 360, -60]].forEach(([s, col, dx, dy], i) => {
    const n = E(c, 'a', nutri(s, col), { left: 470, top: 880, opacity: 0 });
    tl.fromTo(n, { opacity: 0, x: 0, y: 0, scale: .3 }, { opacity: 1, x: dx, y: dy, scale: 1, duration: .6, ease: 'back.out(1.6)', immediateRender: false }, MID + .2 + i * .14).to(n, { opacity: 0, y: dy - 180, duration: .7, ease: 'power1.in' }, OUT + .3);
    sfx(MID + .2 + i * .14, 'pop', { p: i % 3 }); });
  // out comes a polished, bright-white, sad grain
  tl.fromTo(wht, { opacity: 0, x: -120, scaleX: .4 }, { opacity: 1, x: 0, scaleX: 1, duration: .45, ease: 'back.out(2)', immediateRender: false }, OUT);
  flash(W(8, 'ধবধবে'), '#fff', .7, .5); sfx(W(8, 'ধবধবে'), 'shine');
  sparkles(c, 6, 760, 760, 260, 320, W(8, 'ধবধবে') + .1, tK, 21, '#ffffff');
  const wl = plaqueK(c, 'ধবধবে সাদা', { left: 640, top: 1200, transform: 'rotate(-4deg)' }, P.cream, P.n1, 50); popK(wl, W(8, 'সাদা') - .05, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(560, 940, 1.06), { duration: tK - tJ, ease: 'sine.inOut' }), tJ);
}

/* ═════════ K · 3–4 months in the godown → the oil dries out → fluffy rice that only LOOKS like more ═════════ */
{
  const tK = S(9) - .2, tL = S(10) - .2, tO = W(9, 'ভেতরের') - .2, tP = W(9, 'যাতে') - .2;
  const c = K1 = scene('K', tK, tL, { pre: .3, post: .25, push: 1 }), Wd = world(c);
  whip(tK, J1, K1, 'left', .5);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.05), 70, 1000, 97); fgStrip(Wd, 'grass', 29);
  // K1 — the godown, months pass (moon arcs over)
  const g1 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const mo = E(g1, 'a', `<div style="width:110px;height:110px;border-radius:50%;background:${P.cream};box-shadow:0 0 70px 24px rgba(255,244,220,.3)"></div>`, { left: 0, top: 0 });
  binds.push(t => { const k = Math.max(0, Math.min(1, (t - tK) / (tO - tK))) * 3.6 % 1, a = Math.PI * (1 - k); mo.style.transform = `translate(${485 + Math.cos(a) * 460}px,${700 - Math.sin(a) * 360}px)`; mo.style.opacity = Math.sin(k * Math.PI); });
  E(g1, 'a', hillBand(1500, 700, P.n2, 101, 5, 60), { left: -200, top: 1080 });
  E(g1, 'a', godown(720), { left: 180, top: 660 });
  [0, 1, 2, 3, 4, 5, 6].forEach(i => { const s = E(g1, 'a', sackK(120, 'চাল', 1), { left: 400 + (i % 4) * 70 - (i > 3 ? -35 : 0), top: 1010 - (i > 3 ? 90 : 0), opacity: 0 }); land(s, tK + .1 + i * .18, -500, i % 2 ? 'thud' : null); });
  const mc = E(g1, 'a', `<div style="display:flex;gap:14px">${[1, 2, 3, 4].map(m => `<div class="m" style="width:110px;padding:10px 0 6px;border-radius:16px;background:${P.cream};color:${P.n1};text-align:center;font:800 40px/1.1 var(--font-bn-display);opacity:0">${bn(m)}<div style="font-size:24px">মাস</div></div>`).join('')}</div>`, { left: 290, top: 300 });
  [...mc.querySelectorAll('.m')].forEach((m, i) => { const t = W(9, 'তিন-চার') - .5 + i * .32; tl.fromTo(m, { opacity: 0, y: -60, rotationX: 90 }, { opacity: 1, y: 0, rotationX: 0, duration: .35, ease: 'back.out(2)', immediateRender: false }, t); sfx(t, 'flip'); });
  tl.to(g1, { scale: 3, opacity: 0, transformOrigin: '540px 960px', duration: .5, ease: 'power3.in' }, tO - .35);
  // K2 — inside one grain: the natural oil dries out
  const g2 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  tl.fromTo(g2, { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out', immediateRender: false }, tO - .15);
  E(g2, 'a', halo(900, 'rgba(255,201,60,.25)'), { left: 90, top: 380 });
  const big = E(g2, 'a', grain(360, 0, 'calm'), { left: 360, top: 470 });
  const crk = E(g2, 'a', svg(360, '0 0 120 200', '<path d="M40 50 L52 80 L44 104 L58 130 M84 70 L74 96 L86 120" stroke="#b9ad92" stroke-width="3" fill="none" stroke-linecap="round"/>'), { left: 360, top: 470, opacity: 0 });
  const DR = W(9, 'তেল') - .1;
  for (let i = 0; i < 9; i++) { const d = E(g2, 'a', drop(34 + rnd(i) * 22), { left: 400 + rnd(i + 2) * 260, top: 540 + rnd(i + 5) * 420, opacity: 0 });
    tl.fromTo(d, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)', immediateRender: false }, tO + .1 + i * .05)
      .to(d, { y: -300 - rnd(i) * 200, x: (rnd(i + 9) - .5) * 200, opacity: 0, scale: .3, duration: .9, ease: 'power1.in' }, DR + i * .07); }
  sfx(tO + .1, 'bubble'); sfx(DR, 'drain');
  tl.to(crk, { opacity: 1, duration: .4 }, DR + .6).to(big, { filter: 'saturate(.3) brightness(.95)', duration: .6 }, DR + .4);
  const oil = chipK(g2, 'প্রাকৃতিক তেল শুকিয়ে গেল', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.gold, 44); popK(oil, W(9, 'প্রাকৃতিক') - .1, null);
  tl.to(g2, { y: -1400, duration: .55, ease: 'power3.in' }, tP - .3);
  // K3 — the pot: separate fluffy grains, a mound that LOOKS bigger
  const g3 = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  tl.fromTo(g3, { opacity: 1, y: 1400 }, { y: 0, duration: .55, ease: 'power3.out', immediateRender: false }, tP - .3); sfx(tP - .3, 'whoosh');
  flames(g3, 540, 1260, 1.2); glowAt(g3, 540, 1180, 420, 'rgba(255,150,60,.5)');
  const pot = E(g3, 'a', handi(520), { left: 280, top: 760 }), mnd = $('.mound', pot);
  steam(g3, 460, 780, 130, 380, 'rgba(255,244,220,.45)'); steam(g3, 640, 760, 110, 340, 'rgba(255,244,220,.35)', .8);
  const JH = W(9, 'ঝরঝরে') - .15;
  for (let i = 0; i < 14; i++) { const gg = E(g3, 'a', grain(30, 0), { left: 470 + (i % 7) * 22, top: 770, opacity: 0 }), a = (i / 13 - .5) * 2.6;
    tl.fromTo(gg, { opacity: 1, x: 0, y: 0, rotation: 0 }, { x: Math.sin(a) * 300, y: -Math.cos(a) * 220 - 60, rotation: 360 * (i % 2 ? 1 : -1), duration: .5, ease: 'power2.out', immediateRender: false }, JH + i * .025).to(gg, { y: '+=60', opacity: 0, duration: .5, ease: 'power2.in' }, JH + .5 + i * .025); }
  sfx(JH, 'pop', { p: 0 }); sfx(JH + .15, 'pop', { p: 1 }); sfx(JH + .3, 'pop', { p: 2 });
  const jr = chipK(g3, 'ঝরঝরে', { left: 0, width: 1080, top: 320, textAlign: 'center' }, P.cream, 56); popK(jr, JH, null);
  const MO = W(9, 'পরিমাণে') - .1;
  tl.fromTo(mnd, { scaleY: 1 }, { scaleY: 2.2, duration: .9, ease: 'elastic.out(1,.5)', immediateRender: false }, MO); sfx(MO, 'squish');
  const ln = E(g3, 'a', svg(620, '0 0 620 20', `<path d="M0 10 H620" stroke="${P.red}" stroke-width="6" stroke-dasharray="18 12"/>`), { left: 230, top: 600, opacity: 0 });
  tl.to(ln, { opacity: 1, duration: .3 }, MO + .5);
  const ey = plaqueK(g3, 'বেশি <span style="color:#ffd9b0">দেখায়</span>', { left: 330, top: 440, transform: 'rotate(-4deg)' }, P.red, P.cream, 54); popK(ey, W(9, 'বেশি') - .1, 'deny');
  out(jr, MO);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 960, 1.05), { duration: tL - tK, ease: 'sine.inOut' }), tK);
}
