/* EP03 v3 — chapters 03–04: অটো মিল · সাদা চাল */
let G1, H1, I1, J1, K1;

/* ═════════ G · the auto rice mill industry at NIGHT — a living cutaway; the plant powers on ═════════ */
{
  const tG = S(5) - .2, tH = S(6) - .2, c = G1 = scene('G', tG, tH, { pre: .15, post: .25, push: 1 }), Wd = world(c);
  zoomThru(tG, F1, G1, 540, 560, .5);
  const ON = W(5, 'অটো') - .25;
  millNight(c, Wd, ON);
  sfx(ON, 'impact'); sfx(ON + .2, 'machine', { d: tH - ON }); shake(ON, 8, .4);
  const sign = E(Wd.plane(.45), 'a', `<div style="padding:12px 34px 6px;border-radius:16px;background:#c4233b;border:5px solid #ffc93c;color:#fff4dc;font:800 54px/1.1 var(--font-bn-display);white-space:nowrap;box-shadow:0 0 40px rgba(255,201,60,.6)">অটো রাইস মিল</div>`, { left: 330, top: 404, opacity: .25 });
  tl.to(sign, { opacity: 1, duration: .15, yoyo: true, repeat: 3 }, ON).set(sign, { opacity: 1 }, ON + .6);
  fgStrip(Wd, 'grass', 77, '#0a1a10', 'rgba(120,180,255,.25)');
  const ind = chipK(c, 'অটো রাইস মিল ইন্ডাস্ট্রি', { left: 0, width: 1080, top: 250, textAlign: 'center' }, P.gold, 50); popK(ind, ON + .9, 'stamp');
  tl.fromTo(Wd.cam, Wd.aim(560, 1000, .92), Object.assign(Wd.aim(560, 960, 1.04), { duration: tH - tG, ease: 'sine.inOut' }), tG);
}

/* ═════════ H · one ঢেঁকি vs one auto mill: 833 dots, drawn to scale — on a dark-green নকশি কাঁথা ═════════ */
{
  const tH = S(6) - .2, tI = S(7) - .2, c = H1 = scene('H', tH, tI, { pre: .25, post: .25, push: 1.02 }), Wd = world(c);
  whip(tH, G1, H1, 'left', .5);
  nakshiBG(Wd);
  const top = Wd.plane(.6);
  const card = (x, w) => E(top, 'a', '', { left: x, top: 250, width: w, height: 470, borderRadius: 36, background: 'rgba(4,30,16,.55)', border: '3px solid rgba(201,162,58,.6)', boxShadow: '0 20px 50px rgba(0,0,0,.4)' });
  card(30, 490); card(560, 490);
  const dh = E(top, 'a', '', { left: 40, top: 300, width: 470, height: 330 });
  const beam = E(dh, 'a', dheki(470), { left: 0, top: 70, transformOrigin: '47% 58%' });
  binds.push(t => { beam.style.transform = `rotate(${Math.sin(t * 5) * 3.5}deg)`; });
  const wom = actor(dh, 120, { top: 'saree', low: 'saree', c1: P.gold, head: 'veil', skin: '#9a6040', pose: 'hold', expr: 'happy' }, { left: 20, top: 0 });
  binds.push(t => { wom.style.transform = `translateY(${Math.max(0, Math.sin(t * 5)) * -14}px)`; });
  const dl = E(top, 'a', `<div style="display:flex;align-items:center;gap:16px;font:800 46px/1 var(--font-bn-display);color:#fff4dc">ঢেঁকি = <i style="display:block;width:38px;height:38px;border-radius:50%;background:#b8f53c;box-shadow:0 0 18px #b8f53c"></i> ১</div>`, { left: 90, top: 650 });
  const ml = E(top, 'a', millIcon(440), { left: 585, top: 290 });
  const mll = E(top, 'a', `<div style="font:800 46px/1 var(--font-bn-display);color:#fff4dc;text-align:center;width:490px;white-space:nowrap">অটো মিল = ?</div>`, { left: 560, top: 650 });
  popK(dh, tH + .05, 'pop'); popK(dl, tH + .3, null); popK(ml, W(6, 'অটো') + .1, 'thud'); popK(mll, W(6, 'অটো') + .3, null);
  const cv = E(c, 'a', '<canvas width="920" height="420"></canvas>', { left: 80, top: 770 }).firstChild, cx = cv.getContext('2d');
  const AT = W(6, 'আটশো') - .5, DUR = 1.6, N = 833, COLS = 49, SP = 18.6;
  binds.push(t => { cx.clearRect(0, 0, 920, 420); const k = Math.max(0, Math.min(1, (t - AT) / DUR)), n = Math.round(1 + (N - 1) * (1 - Math.pow(1 - k, 2)));
    if (t < W(6, 'ঢেঁকির') - .1) return;
    for (let i = 0; i < n; i++) { const x = 10 + (i % COLS) * SP + SP / 2, y = 20 + Math.floor(i / COLS) * SP + SP / 2, fresh = i > n - 30 && k < 1;
      cx.fillStyle = i === 0 ? '#b8f53c' : fresh ? '#fff4c0' : '#ffc93c'; cx.beginPath(); cx.arc(x, y, i === 0 ? 8.5 : 7.2, 0, 6.283); cx.fill(); }
    if (k >= 1) { cx.strokeStyle = '#ff6a5a'; cx.lineWidth = 5; cx.setLineDash([12, 8]); cx.strokeRect(6, 16, COLS * SP + 8, 17 * SP + 8); } });
  sfx(AT, 'count', { d: DUR }); sfx(AT + DUR, 'impact');
  for (let i = 0; i < 10; i++) sfx(AT + i * DUR / 10, 'coin', { p: i % 3 });
  const big = E(c, 'a', `<div style="text-align:center;font:900 150px/1 var(--font-bn-display);color:${P.gold};text-shadow:0 8px 0 ${P.goldD},0 0 50px rgba(255,201,60,.6)"><span class="n">১</span><span style="font-size:90px"> গুণ</span></div>`, { left: 0, width: 1080, top: 1140, opacity: 0 });
  tl.to(big, { opacity: 1, duration: .2 }, AT); counter($('.n', big), 1, 833, AT, DUR, v => bn(Math.round(v)), 'power2.out');
  tl.fromTo(big, { scale: 1 }, { scale: 1.15, duration: .15, yoyo: true, repeat: 1, immediateRender: false }, AT + DUR);
  binds.push(t => { mll.firstChild.textContent = t > AT + DUR ? 'অটো মিল = ৮৩৩' : 'অটো মিল = ?'; });
  shake(AT + DUR, 10, .3);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 960, 1.04), { duration: tI - tH, ease: 'sine.inOut' }), tH);
}

/* ═════════ I · to earn it back, the mill must sell all year (dark, spotlit) ═════════ */
{
  const tI = S(7) - .2, tJ = S(8) - .2, c = I1 = scene('I', tI, tJ, { pre: .25, post: .3, push: 1.04 }), Wd = world(c);
  whip(tI, H1, I1, 'up', .5);
  E(Wd.plane(.04, { left: -260, top: -260, width: 1600, height: 2440 }), 'a', '', { left: 0, top: 0, width: 1600, height: 2440, background: 'radial-gradient(circle at 50% 40%,#3a2a5a,#1a1238 45%,#0a0818)' });
  E(Wd.plane(.1), 'a', svg(1080, '0 0 1080 1920', Array.from({ length: 40 }, (_, i) => `<text x="${rnd(i) * 1080}" y="${rnd(i + 5) * 1920}" font-family="Anek Bangla" font-weight="800" font-size="${40 + rnd(i + 9) * 60}" fill="#ffc93c" opacity="${.04 + rnd(i + 3) * .06}">৳</text>`).join('')), { left: 0, top: 0 });
  E(Wd.plane(.3), 'a', svg(1080, '0 0 1080 1400', `<path d="M420 0 H660 L980 1300 H100Z" fill="#fff4c0" opacity=".1"/>`), { left: 0, top: 0 });
  fgStrip(Wd, 'wood', 0, '#2a1a3a', '#5a3a7a');
  const ring = E(Wd.plane(.4), 'a', '', { left: 90, top: 330, width: 900, height: 900 });
  MONTHS.forEach((m, i) => { const a = i / 12 * 6.283 - 1.571; E(ring, 'a', `<div style="padding:8px 18px 4px;border-radius:26px;background:${i === 7 ? P.gold : '#3a2e6a'};color:${i === 7 ? P.n1 : P.cream};font:700 30px/1.2 var(--font-bn-display);white-space:nowrap;transform:translate(-50%,-50%);box-shadow:0 0 18px rgba(255,201,60,.25)">${m}</div>`, { left: 450 + Math.cos(a) * 400, top: 450 + Math.sin(a) * 400 }); });
  E(ring, 'a', svg(900, '0 0 900 900', `<circle cx="450" cy="450" r="400" fill="none" stroke="#ffc93c" stroke-opacity=".4" stroke-width="4" stroke-dasharray="10 14"/>`), { left: 0, top: 0 });
  binds.push(t => { const k = Math.max(0, t - tI); ring.style.transform = `rotate(${k * 40}deg)`; ring.querySelectorAll('.a > div').forEach(d => { d.style.rotate = `${-k * 40}deg`; }); });
  popK(ring, tI + .1, null);
  const owner = actor(Wd.plane(.7), 300, { top: 'suit', c1: '#2a2f45', low: 'pants', c2: '#1a1f30', belly: 1, hair: 'short', must: 1, expr: 'smug', skin: '#a8673e', pose: 'offer' }, { left: 390, top: 520 });
  owner.breathe(tI, tJ).blink(tI + 1.2, tI + 2.6);
  const bag = E(Wd.plane(.75), 'a', moneyBag(170), { left: 640, top: 900, transformOrigin: '50% 100%' });
  for (let i = 0; i < 9; i++) { const k = E(c, 'a', coin(54), { left: 1100, top: 760 + (i % 3) * 40, opacity: 0 }), t0 = tI + .6 + i * .32;
    tl.fromTo(k, { opacity: 1, x: 0, y: 0 }, { keyframes: [{ x: -220, y: -120, duration: .25, ease: 'power1.out' }, { x: -360, y: 180, duration: .25, ease: 'power2.in' }], immediateRender: false }, t0).set(k, { opacity: 0 }, t0 + .5);
    tl.to(bag, { scaleY: .9, scaleX: 1.08, duration: .08, yoyo: true, repeat: 1 }, t0 + .5); sfx(t0 + .5, 'coin', { p: i % 3 }); }
  const belt = E(Wd.plane(1), 'a', '', { left: -100, top: 1210, width: 1300, height: 40, borderRadius: 20, background: `repeating-linear-gradient(90deg,#5a4a7a 0 30px,#3a2e5a 30px 60px)` });
  binds.push(t => { belt.style.backgroundPosition = `${t * 160}px 0`; });
  const SK = Array.from({ length: 6 }, () => E(Wd.plane(1), 'a', sackK(120, 'চাল', 1), { left: 0, top: 1080 }));
  binds.push(t => SK.forEach((s, i) => { s.style.transform = `translateX(${((t * 160 + i * 230) % 1380) - 200}px)`; }));
  const yr = chipK(c, 'সারা বছর বিক্রি', { left: 0, width: 1080, top: 260, textAlign: 'center' }, P.gold, 52); popK(yr, W(7, 'সারা') - .1, 'ding');
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.08), Object.assign(Wd.aim(540, 960, 1), { duration: tJ - tI, ease: 'sine.inOut' }), tI);
}

/* ═════════ J · the whitener, cut open: red rice in → bran sucked out → white rice down the chute ═════════ */
{
  const tJ = S(8) - .2, tK = S(9) - .2, c = J1 = scene('J', tJ, tK, { pre: .3, post: .25, push: 1.03 }), Wd = world(c);
  iris(tJ, J1, 540, 900, .55);
  E(Wd.plane(.05, { left: -260, top: -260, width: 1600, height: 2440 }), 'a', '', { left: 0, top: 0, width: 1600, height: 2440, background: 'linear-gradient(#141a3a,#1e2650 50%,#2a2448)' });
  const back = Wd.plane(.15);
  [0, 1, 2].forEach(i => E(back, 'a', `<div style="width:240px;height:280px;background:linear-gradient(#0a0f2e,#1a1a4a);border:12px solid #3a4676;box-shadow:inset 0 0 0 5px #2a3462;position:relative;overflow:hidden">${i === 1 ? '<div style="position:absolute;left:120px;top:40px;width:70px;height:70px;border-radius:50%;background:#fffbe8;box-shadow:0 0 40px 14px rgba(255,244,210,.35)"></div>' : ''}${svg(240, '0 0 240 280', Array.from({ length: 8 }, (_, k) => `<circle cx="${rnd(k + i * 10) * 240}" cy="${rnd(k + i * 10 + 3) * 200}" r="2" fill="#dfe8ff"/>`).join(''), 'position:absolute;left:0;top:0')}</div>`, { left: 60 + i * 340, top: 200 }));
  E(back, 'a', svg(1080, '0 0 1080 300', `<path d="M0 40 H1080" stroke="#ff8a3d" stroke-width="28"/><path d="M0 34 H1080" stroke="#ffc08a" stroke-width="6"/><path d="M0 100 H1080" stroke="#3fd0c0" stroke-width="22"/>`), { left: 0, top: 120 });
  [[200], [880]].forEach(([x]) => { E(back, 'a', `<div style="width:6px;height:120px;background:#0a0e1e;margin-left:57px"></div><div style="width:120px;height:46px;border-radius:60px 60px 8px 8px;background:linear-gradient(#ffd27a,#e0901a)"></div>`, { left: x - 60, top: 0 });
    E(back, 'a', svg(700, '0 0 700 1300', `<path d="M310 0 H390 L700 1300 H0Z" fill="#fff0b0" opacity=".1"/>`), { left: x - 350, top: 160 }); });
  E(Wd.plane(.4), 'a', '', { left: -400, top: 1330, width: 1900, height: 900, background: 'linear-gradient(#3a4070,#1a1e3a 40%)' });
  const PL = polisher2D(Wd.plane(.7), 40, 520, tJ + .3);
  const hero = Wd.plane(.72);
  const red = E(hero, 'a', grain(170, 1, 'happy'), { left: 0, top: 0, transformOrigin: '50% 100%' }), wht = E(hero, 'a', grain(160, 0, 'sad'), { left: 0, top: 0, opacity: 0, transformOrigin: '50% 100%' });
  const IN = tJ + .2, MID = W(8, 'ছেঁটে') - .3, OUT = W(8, 'ধবধবে') - .3;
  tl.fromTo(red, { x: -240, y: 250 }, { x: 10, y: 250, duration: .8, ease: 'power2.out' }, IN)
    .to(red, { keyframes: [{ scaleY: .7, scaleX: 1.25, duration: .12 }, { scaleY: 1.2, scaleX: .85, duration: .1 }] }, MID - .55)
    .to(red, { keyframes: [{ x: (10 + PL.hopper[0] - 85) / 2, y: 80, duration: .3, ease: 'power2.out' }, { x: PL.hopper[0] - 85, y: PL.hopper[1] - 60, scale: .5, duration: .28, ease: 'power2.in' }] }, MID - .33)
    .to(red, { opacity: 0, duration: .05 }, MID - .05);
  sfx(MID - .35, 'windup'); sfx(MID, 'plop'); sfx(MID, 'machine', { d: OUT - MID + .6 });
  const lbl = E(c, 'a', `<div style="padding:10px 24px 6px;border-radius:30px;background:${P.bran};color:#fff;font:800 40px/1.2 var(--font-bn-display);white-space:nowrap;box-shadow:0 0 30px rgba(181,83,47,.6)">পুষ্টিকর লালচে আবরণ</div>`, { left: 30, top: 230, opacity: 0 });
  tl.fromTo(lbl, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .4, ease: 'back.out(2)', immediateRender: false }, W(8, 'পুষ্টিকর') - .2).to(lbl, { opacity: 0, duration: .3 }, MID - .3); sfx(W(8, 'পুষ্টিকর') - .2, 'pop');
  [['ভিটামিন বি', P.red, -380, -120], ['আঁশ', P.orange, -220, -230], ['খনিজ', '#3f9a4a', -60, -150], ['তেল', P.goldD, -260, -40]].forEach(([s, col, dx, dy], i) => {
    const n = E(c, 'a', nutri(s, col), { left: PL.duct[0] - 40, top: PL.duct[1], opacity: 0 });
    tl.fromTo(n, { opacity: 0, x: 0, y: 0, scale: .3 }, { opacity: 1, x: dx, y: dy, scale: 1, duration: .6, ease: 'back.out(1.6)', immediateRender: false }, MID + .3 + i * .16).to(n, { opacity: 0, y: dy - 120, duration: .6, ease: 'power1.in' }, OUT + .5);
    sfx(MID + .3 + i * .16, 'pop', { p: i % 3 }); });
  tl.fromTo(wht, { opacity: 0, x: PL.chute[0] - 80, y: PL.chute[1] - 60, rotation: -40, scale: .5 }, { opacity: 1, x: PL.chute[0] - 150, y: PL.chute[1] + 120, rotation: 0, scale: 1, duration: .55, ease: 'bounce.out', immediateRender: false }, OUT);
  flash(W(8, 'ধবধবে'), '#fff', .6, .5); sfx(W(8, 'ধবধবে'), 'shine');
  sparkles(c, 6, PL.chute[0] - 180, PL.chute[1] + 80, 220, 260, W(8, 'ধবধবে') + .1, tK, 21, '#ffffff');
  const wl = plaqueK(c, 'ধবধবে সাদা', { left: 560, top: 1150, transform: 'rotate(-4deg)' }, P.cream, P.n1, 50); popK(wl, W(8, 'সাদা') - .05, null);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 940, 1.05), { duration: tK - tJ, ease: 'sine.inOut' }), tJ);
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
