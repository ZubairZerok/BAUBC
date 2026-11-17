/* EP03 · নবান্নের হিসাব — chapters 01–03. Every time comes from the voice: S(i) line start, W(i,'word'), F(i,frac). */
const H = (c, html, top, size, css) => E(c, 'a h', html, Object.assign({ left: 0, width: 1080, top, fontSize: size }, css));
const chip = (c, html, css, col) => E(c, 'a', `<span class="chip"${col ? ` style="border-color:${col};color:${col};background:rgba(26,15,31,.85)"` : ' style="background:rgba(26,15,31,.85)"'}>${html}</span>`, css);
const plaque = (c, html, css, bgc = '#fbf1dc', fg = '#7a1f2a') => E(c, 'a', `<div style="padding:14px 34px 8px;border-radius:22px;background:${bgc};color:${fg};font:800 64px/1.1 var(--font-bn-display);box-shadow:0 18px 40px rgba(0,0,0,.45);border:6px solid ${fg};white-space:nowrap;text-align:center">${html}</div>`, css);
const sky = (Wd, a, b, c2) => Wd.plane(.05, { left: -150, top: -150, width: 1380, height: 2220, background: `linear-gradient(${a},${b} 55%,${c2})` });
const ground = (pl, y, a, b) => E(pl, 'a', '', { left: -300, top: y, width: 1700, height: 1200, background: `linear-gradient(${a},${b} 40%)`, borderRadius: '50% 50% 0 0/60px 60px 0 0' });
let C0, C1, C1b, C2;

/* ═════════ 01 · পহেলা বৈশাখ? (hook) ═════════ */
{
  const c = C0 = scene('c0', T.c0, T.c1, { post: .3, push: 1 }), Wd = world(c), FR = W(0, 'ছিল না') - .15;
  sky(Wd, '#ff8a5a', '#ffc76b', '#ffe6a8');
  const sun = E(Wd.plane(.08), 'a', `<div style="width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,#fff6c8,#ffcf5a 60%,#ff9a2e);box-shadow:0 0 160px 60px rgba(255,200,90,.6)"></div>`, { left: 640, top: 360 });
  const far = Wd.plane(.15); [[-60, 900, 260], [180, 940, 200], [700, 900, 280], [930, 950, 200]].forEach(([x, y, w]) => E(far, 'a', tree(w, '#c7663a', '#d98048'), { left: x, top: y - w * 1.1 }));
  E(far, 'a', hut(240, '#d9925a'), { left: 420, top: 850 }); ground(far, 1050, '#e0a058', '#b8743f');
  const mid = Wd.plane(.45), crowd = [];
  const CR = [['#c8323a', 'B', 1], ['#f2b632', 'G', 0], ['#fbf1dc', 'P', 1], ['#2a8f8a', 'B', 0], ['#ff9a2e', 'G', 1], ['#e8508a', 'P', 0], ['#fbf1dc', 'B', 1]];
  CR.forEach(([c1, lg, f], i) => { const a = actor(mid, 110, f ? { top: 'saree', low: 'saree', c1, head: 'veil', sareeG: i % 2, skin: '#a8673e', pose: 'up', expr: 'happy' } : { top: 'kurta', c1, low: 'pants', c2: '#f4ead6', skin: '#8a5634', pose: 'up', expr: 'happy', must: i % 2 }, { left: -40 + i * 160, top: 1180 - 209 });
    crowd.push(a); const n = Math.round((FR - .2) / .5); tl.to(a, { y: -30, duration: .25, yoyo: true, repeat: n * 2 - 1, ease: 'power1.out', delay: rnd(i) * .2 }, .1); });
  E(mid, 'a', '', { left: -300, top: 1170, width: 1700, height: 1000, background: 'linear-gradient(#c98a4a,#8a5a34 30%,#3a2418)' });
  const hero = Wd.plane(1);
  const al = E(hero, 'a', alpona(820, 'rgba(251,241,220,.5)'), { left: 130, top: 330 });
  binds.push(T2 => { if (T2 < T.c1 + .5) al.style.transform = `rotate(${Math.min(T2, FR) * 8}deg)`; });
  const cal = E(hero, 'a', calPage(520, 'বৈশাখ', '১'), { left: 280, top: 470, transform: 'rotate(-4deg)' });
  const fgp = Wd.plane(1.35), owl = E(fgp, 'a', owlMask(400), { left: -60, top: 1250, transform: 'rotate(-12deg)' }), dh = E(fgp, 'a', dhol(380), { left: 740, top: 1330, transform: 'rotate(10deg)' });
  const bunt = E(Wd.plane(1.3), 'a', bunting(1300, 16), { left: -110, top: 190 });
  binds.push(T2 => { const k = Math.min(T2, FR); bunt.querySelectorAll('.fl').forEach((f, i) => { f.style.transform = `rotate(${Math.sin(k * 3 + i) * 8}deg)`; f.style.transformOrigin = 'center top'; f.style.transformBox = 'fill-box'; }); });
  // confetti — frozen in mid-air at the record scratch
  const CF = Array.from({ length: 60 }, (_, i) => E(c, 'a', '', { left: rnd(i) * 1080, top: 0, width: 12 + (i % 3) * 6, height: 18, borderRadius: 3, background: ['#c8323a', '#f2b632', '#2a8f8a', '#fbf1dc', '#e8508a'][i % 5] }));
  binds.push(T2 => { if (T2 > T.c1 + .5) return; const k = Math.min(T2, FR); CF.forEach((f, i) => { const y = ((rnd(i + 3) * 1900 + k * (160 + rnd(i + 5) * 160)) % 2000) - 60; f.style.transform = `translate(${Math.sin(k * 2 + i) * 30}px,${y}px) rotate(${k * 200 * (i % 2 ? 1 : -1) + i * 20}deg)`; }); });
  const h1 = H(c, 'শুভ <span style="color:#c8323a">নববর্ষ!</span>', 250, 120, { color: '#3a1d2a', textShadow: '0 6px 0 rgba(255,255,255,.4)' });
  hIn(h1, 0, { op: 1, y: 24, st: .1 });
  tl.fromTo(cal, { rotation: -14, scale: .9 }, { rotation: -4, scale: 1, duration: .8, ease: 'elastic.out(1,.5)' }, 0).to(cal, { rotation: 3, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, .8)
    .to(owl, { rotation: 6, y: -20, duration: .5, yoyo: true, repeat: Math.round(FR / .5) - 1, ease: 'sine.inOut' }, 0).to(dh, { scale: 1.06, duration: .25, yoyo: true, repeat: Math.round(FR / .25) - 1, ease: 'power2.out' }, 0)
    .fromTo(Wd.cam, Wd.aim(540, 1000, 1.05, 540, 1000), Object.assign(Wd.aim(540, 980, 1.16, 540, 1000), { duration: FR, ease: 'sine.inOut' }), 0);
  [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4].forEach(o => o < FR && sfx(o, 'dhol', { p: o * 2 % 3 }));
  sfx(0, 'crowd', { d: FR });
  // record scratch → freeze frame, colour drains: "…ছিল না?"
  tl.to(c, { filter: 'grayscale(.9) brightness(.62) contrast(1.1)', duration: .25 }, FR).to(sun, { opacity: .3, duration: .3 }, FR);
  shake(FR, 16, .3); sfx(FR - .05, 'scratch');
  const q = plaque(c, 'সত্যিই?', { left: 300, top: 400, transform: 'rotate(-8deg)', filter: 'none' }, '#c8323a', '#fbf1dc');
  tl.fromTo(q, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .22, ease: 'power4.in' }, FR + .2); sfx(FR + .4, 'stamp');
  out(h1, FR);
  const h2 = H(c, 'বাঙালির <span style="color:#ffd36b">প্রথম</span> নববর্ষ ছিল না?', 250, 82); hIn(h2, FR + .05, { d: .35 });
  // L1: the page tears away → the festival was never the reason: a tax ledger (হালখাতা)
  const T1 = S(1);
  out([q, h2], T1 + .1);
  tl.to(cal, { keyframes: [{ rotation: -30, x: -120, y: 60, duration: .25, ease: 'power2.out' }, { x: -900, y: 900, rotation: -160, duration: .7, ease: 'power2.in' }] }, W(1, 'বদলে'));
  sfx(W(1, 'বদলে'), 'swish');
  const fest = chip(c, 'উৎসব নয় ✕', { left: 0, width: 1080, top: 260, textAlign: 'center' }, '#ff7a6a'); pop(fest, W(1, 'উৎসব')); out(fest, W(1, 'খাজনা') - .2); sfx(W(1, 'উৎসব'), 'deny');
  tl.to(bunt, { y: 300, rotation: 12, opacity: 0, duration: .8, ease: 'power2.in' }, W(1, 'উৎসব'));
  const K = W(1, 'খাজনা') - .1;
  const led = E(c, 'a', ledger(900), { left: 90, top: 560 }), lt = E(c, 'a', `<div style="font:800 76px/1 var(--font-bn-display);color:#7a1f2a;text-align:center">হালখাতা</div>`, { left: 110, width: 420, top: 650 });
  tl.set(c, { filter: 'none' }, K).fromTo(led, { y: -1200, rotation: -20 }, { y: 0, rotation: -3, duration: .45, ease: 'power3.in' }, K).fromTo(lt, { opacity: 0 }, { opacity: 1, duration: .2 }, K + .45);
  led.querySelectorAll('.ln').forEach((l, i) => tl.fromTo(l, { opacity: 0 }, { opacity: 1, duration: .12 }, K + .6 + i * .12));
  shake(K + .45, 26, .4); sfx(K + .45, 'impact'); sfx(K + .6, 'quill', { d: 1.2 });
  const sl = E(c, 'a', seal(220, 'খাজনা'), { left: 640, top: 420 }); tl.fromTo(sl, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .2, ease: 'power4.in' }, W(1, 'ট্যাক্স')); sfx(W(1, 'ট্যাক্স') + .2, 'stamp');
  const coins = Array.from({ length: 18 }, (_, i) => E(c, 'a', coin(64), { left: 200 + rnd(i) * 680, top: -100 }));
  coins.forEach((cn, i) => tl.fromTo(cn, { y: 0, rotation: 0 }, { y: 900 + rnd(i + 3) * 160, rotation: 360 * (i % 2 ? 1 : -1), duration: .7, ease: 'bounce.out', immediateRender: false }, K + .7 + i * .06));
  [0, 4, 8, 12].forEach(i => sfx(K + .7 + i * .06 + .4, 'coin', { p: i % 5 }));
  const h3 = H(c, 'ছিল <span style="color:#ffd36b">খাজনার হিসাব!</span>', 250, 96); hIn(h3, W(1, 'আদায়ের') - .2);
  tl.to(Wd.cam, Object.assign(Wd.aim(540, 1050, 1.3, 540, 1000), { duration: 2, ease: 'power2.inOut' }), K);
}

/* ═════════ 02 · অগ্রহায়ণ = প্রথম + ধান → নবান্ন ═════════ */
{
  const c = C1 = scene('c1', T.c1, S(3) - .3, { pre: .25, post: .25, push: 1 }), t = T.c1;
  whip(t, C0, c, 'left');
  E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'radial-gradient(ellipse at 50% 40%,#5a2a5e,#2a1430 60%,#1a0f1f)' });
  E(c, 'a', alpona(1000, 'rgba(242,182,50,.18)'), { left: 40, top: 280 });
  const wA = E(c, 'a', '<span>অগ্র</span>', { left: 150, top: 560, font: '800 190px/1.1 var(--font-bn-display)', color: '#ffd36b', textShadow: '0 0 60px rgba(242,182,50,.5)' });
  const wB = E(c, 'a', '<span>হায়ণ</span>', { left: 520, top: 560, font: '800 190px/1.1 var(--font-bn-display)', color: '#fbf1dc', textShadow: '0 0 60px rgba(251,241,220,.35)' });
  tl.fromTo([wA, wB], { opacity: 0, scale: .4, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)', stagger: .06 }, S(2) - .1); sfx(S(2), 'whoosh');
  const A1 = W(2, 'অগ্র’'), B1 = W(2, 'হায়ণ’ মানে');
  tl.to(wA, { x: -40, y: -170, scale: .9, duration: .5, ease: 'power3.out' }, A1).to(wB, { x: 30, y: 230, scale: .9, duration: .5, ease: 'power3.out' }, B1 - .3);
  const lA = E(c, 'a', `<div style="display:flex;align-items:center;gap:20px;font:800 80px/1 var(--font-bn-display);color:#fbf1dc"><div style="width:110px;height:110px;border-radius:50%;background:#f2b632;display:grid;place-items:center;color:#2a1430;font-size:76px">১</div>= প্রথম</div>`, { left: 520, top: 420 });
  const lB = E(c, 'a', `<div style="display:flex;align-items:center;gap:20px;font:800 80px/1 var(--font-bn-display);color:#fbf1dc">= ধান <div class="sf" style="width:150px">${sheaf(150)}</div></div>`, { left: 150, top: 1060 });
  tl.fromTo(lA, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: .45, ease: 'back.out(1.6)' }, W(2, 'প্রথম') - .15).fromTo(lB, { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: .45, ease: 'back.out(1.6)' }, W(2, 'ধান') - .15);
  sfx(W(2, 'প্রথম') - .15, 'pop', { p: 2 }); sfx(W(2, 'ধান') - .15, 'pop', { p: 5 });
  tl.to($('.sf', lB), { rotation: 8, duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 100%' }, W(2, 'ধান'));
}
{
  const c = C1b = scene('c1b', S(3) - .3, T.c2, { pre: .12, post: .3, push: 1 }), t = S(3) - .3, Wd = world(c);
  zoomThru(t, C1, c, 480, 1140);
  sky(Wd, '#2a6f8a', '#f6b26b', '#ffe6a8');
  const sun = E(Wd.plane(.06), 'a', `<div style="width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,#fff6c8,#ffcf5a 60%,#ff9a2e);box-shadow:0 0 200px 80px rgba(255,200,90,.55)"></div>`, { left: 360, top: 760 });
  tl.fromTo(sun, { y: 260 }, { y: 0, duration: 5, ease: 'power1.out' }, t);
  const birds = E(Wd.plane(.1), 'a', svg(400, '0 0 400 120', [[20, 40], [90, 20], [150, 56], [230, 30], [300, 60]].map(([x, y]) => `<path d="M${x} ${y} q12 -14 24 0 q12 -14 24 0" stroke="#2a1430" stroke-width="5" fill="none"/>`).join('')), { left: -400, top: 520 });
  tl.to(birds, { x: 1600, y: -120, duration: 6.5, ease: 'none' }, t);
  const far = Wd.plane(.18); [[-40, 880, 200], [150, 900, 160], [800, 880, 220], [990, 905, 150]].forEach(([x, y, w]) => E(far, 'a', palm(w * 1.4, '#3a4a2a'), { left: x, top: y - w * 1.6 }));
  E(far, 'a', hut(230, '#b8743f'), { left: 640, top: 860 }); ground(far, 1030, '#c9a03a', '#8a6a1c');
  const rows = [[.32, 1060, 1300, 90, 34], [.55, 1150, 1500, 120, 30], [.8, 1270, 1700, 150, 26], [1.25, 1420, 1900, 210, 22]].map(([p, y, w, h, n], k) => { const pl = Wd.plane(p), r = E(pl, 'a', paddyRow(w, h, n, 1, k * 13), { left: (1080 - w) / 2, top: y - h, transformOrigin: '50% 100%' }); return r; });
  binds.push(T2 => { if (T2 > t - .2 && T2 < T.c2 + .4) rows.forEach((r, k) => { r.style.transform = `skewX(${Math.sin(T2 * 1.4 + k) * 3}deg)`; }); });
  const hero = Wd.plane(.8);
  const f1 = actor(hero, 150, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: 'G', head: 'gamcha', skin: '#7a4a2a', must: 1, pose: 'sickle', holdR: sickle(1.1), expr: 'happy' }, { left: 120, top: 1240 - 285 });
  const f2 = actor(hero, 150, { top: 'kurta', c1: '#fbf1dc', low: 'lungi', lungi: 'B', head: 'hat', skin: '#8a5634', beard: 1, hair: 'grey', pose: 'sickle', holdR: sickle(1.1), expr: 'happy' }, { left: 760, top: 1240 - 285 });
  [f1, f2].forEach((f, i) => { f.swing('R', t + .2, T.c2, -50, .7); tl.to(f, { rotation: 6, duration: .35, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + i * .2); f.blink(t + 1.3 + i, t + 3.4 + i); });
  const wm = actor(hero, 140, { top: 'saree', low: 'saree', c1: '#ffd36b', head: 'veil', skin: '#9a6440', pose: 'head', holdR: '', expr: 'happy' }, { left: -200, top: 1250 - 266 });
  E(wm, 'a', sheaf(130), { left: 6, top: -110, transform: 'rotate(90deg)' }); wm.walk(1300, t + .2, 5.4);
  const fgp = Wd.plane(1.45); E(fgp, 'a', paddyRow(1500, 260, 30, 1, 77), { left: -210, top: 1660 });
  const ban = E(c, 'a', `<div style="position:relative;width:640px;height:640px">${halo(640, 'rgba(255,214,120,.6)')}<div style="position:absolute;inset:0;display:grid;place-items:center">${alpona(520, '#fbf1dc')}</div><div style="position:absolute;inset:0;display:grid;place-items:center;font:800 150px/1 var(--font-bn-display);color:#7a1f2a;text-shadow:0 0 30px #fff6c8">নবান্ন</div></div>`, { left: 220, top: 210 });
  tl.fromTo(ban, { scale: 0, rotation: -90, opacity: 0 }, { scale: .85, rotation: 0, opacity: 1, duration: .8, ease: 'back.out(1.6)' }, W(3, 'নবান্নই') - .2).to(ban, { rotation: 6, duration: 2, ease: 'sine.inOut' }, W(3, 'নবান্নই') + .6);
  sfx(W(3, 'নবান্নই') - .2, 'success', { soft: 1 }); sfx(t, 'birds', { d: 3 }); sfx(t + .5, 'swish');
  const real = chip(c, 'বাংলার আসল নববর্ষ ✓', { left: 0, width: 1080, top: 820, textAlign: 'center', zIndex: 5 }, '#ffd36b'); pop(real, W(3, 'আসল'));
  tl.fromTo(Wd.cam, Wd.aim(520, 1200, 1.55, 540, 1080), Object.assign(Wd.aim(540, 1160, 1.32, 540, 1080), { duration: T.c2 - t, ease: 'sine.inOut' }), t);
}

/* ═════════ 03 · আকবরের খাতা — ১৫৮৪ ═════════ */
{
  const c = C2 = scene('c2', T.c2, T.c3, { pre: .25, post: .3, push: 1 }), t = T.c2, Wd = world(c);
  whip(t, C1b, c, 'up');
  const win = Wd.plane(.2); E(win, 'a', '', { left: -200, top: -200, width: 1500, height: 2400, background: 'linear-gradient(#7fd3d8,#f6e7a8 55%,#e8c547)' });
  E(win, 'a', svg(700, '0 0 700 260', `<path d="M0 260 V170 H60 V120 Q90 70 120 120 V170 H200 V90 Q250 10 300 90 V170 H380 V130 Q410 80 440 130 V170 H520 V100 Q560 40 600 100 V170 H700 V260Z" fill="#4a6a8a" opacity=".7"/>`), { left: 360, top: 520 });
  const wr = E(win, 'a', paddyRow(1200, 160, 40, 1, 5), { left: 0, top: 760 });
  [[480, 'G'], [760, 'B']].forEach(([x, lg], i) => actor(win, 90, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: lg, head: 'gamcha', skin: '#7a4a2a', pose: 'sickle', holdR: sickle(1), expr: 'happy' }, { left: x, top: 920 - 171 }).swing('R', t, T.c3, -45, .8));
  const court = Wd.plane(1);
  E(court, 'a', svg(1080, '0 0 1080 1920', `<path d="M0 0 H1080 V1920 H0Z M420 1100 V520 Q420 300 700 240 Q980 300 980 520 V1100Z" fill="#4a1f4f" fill-rule="evenodd"/><path d="M420 1100 V520 Q420 300 700 240 Q980 300 980 520 V1100" stroke="#c98a4a" stroke-width="22" fill="none"/>
    <path d="M0 0 V1920 H120 V600 Q120 380 260 300 V0Z" fill="#3a173f"/><path d="M60 1920 V640 Q60 420 240 330" stroke="#7a3f6a" stroke-width="16" fill="none"/>${[0, 1, 2, 3].map(i => `<rect x="${130 + i * 70}" y="${1150 + i * 4}" width="28" height="770" fill="#5a2a5e"/>`).join('')}<rect x="0" y="1140" width="1080" height="780" fill="#2a1430"/>`), { left: 0, top: 0 });
  const emp = actor(court, 330, { top: 'robe', low: 'robe', head: 'turban', jewel: 1, turbanC: '#fbf1dc', beard: 1, must: 1, skin: '#c48a5a', pose: 'write', holdR: quill(1.2), expr: 'calm' }, { left: 40, top: 1520 - 627 });
  emp.breathe(t, T.c3).blink(t + 1, t + 3.6, t + 7.2, t + 10.1);
  const desk = E(court, 'a', `<div style="width:780px;height:300px;border-radius:16px 16px 0 0;background:linear-gradient(#8a4a24,#4a2410);box-shadow:inset 0 14px 0 #b8743f"></div>`, { left: 300, top: 1290 });
  const book = E(court, 'a', ledger(460, 6), { left: 340, top: 1150 }); E(court, 'a', `<div style="width:64px;height:70px;border-radius:12px 12px 20px 20px;background:#2a1d3a"></div>`, { left: 820, top: 1220 });
  E(court, 'a', coinStack(6, 80), { left: 900, top: 1170 }); E(court, 'a', coinStack(9, 80), { left: 980, top: 1130 });
  book.querySelectorAll('.ln').forEach((l, i) => tl.fromTo(l, { opacity: 0 }, { opacity: 1, duration: .25 }, t + .4 + i * .5));
  emp.swing('R', t + .3, S(5), 10, .45); sfx(t + .3, 'quill', { d: 3 });
  const yr = plaque(c, '১৫৮৪', { left: 610, top: 250 }, '#f2b632', '#4a1f4f'); tl.fromTo(yr, { scale: 3, opacity: 0, rotation: -15 }, { scale: 1, opacity: 1, rotation: 4, duration: .25, ease: 'power4.in' }, W(4, 'পনেরোশো') - .1); sfx(W(4, 'পনেরোশো') + .15, 'stamp');
  const akb = chip(c, 'সম্রাট আকবর', { left: 70, top: 840 }, '#ffd36b'); pop(akb, W(4, 'সম্রাট'));
  const taxm = actor(court, 170, { top: 'kurta', c1: '#2a8f8a', low: 'pants', c2: '#fbf1dc', head: 'turban', turbanC: '#f2b632', must: 1, skin: '#8a5634', pose: 'offer', holdR: '', expr: 'happy' }, { left: 1100, top: 1300 - 323 });
  E(taxm, 'a', moneyBag(110), { left: 30, top: 150 }); taxm.walk(-330, W(4, 'খাজনা'), 1.4, 'power2.out'); tl.to(taxm, { rotation: -14, duration: .3, yoyo: true, repeat: 1 }, W(4, 'খাজনা') + 1.5);
  sfx(W(4, 'খাজনা') + 1.5, 'coin', { p: 3 });
  // the month wheel turns: the year's start moves from অগ্রহায়ণ to বৈশাখ
  const CW = W(4, 'ক্যালেন্ডার') - .2, wheel = E(c, 'a', svg(720, '-360 -360 720 720', `<circle r="350" fill="#fbf1dc" stroke="#c98a4a" stroke-width="16"/><circle r="230" fill="#f4e6c6"/>${MONTHS.map((m, i) => { const a = i / 12 * 360; return `<g transform="rotate(${a})"><path d="M0 -350 V-230" stroke="#c98a4a" stroke-width="4" transform="rotate(15)"/><text y="-272" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="${m.length > 6 ? 34 : 40}" fill="${m === 'অগ্রহায়ণ' ? '#3f8f3a' : m === 'বৈশাখ' ? '#c8323a' : '#4a1f4f'}">${m}</text></g>`; }).join('')}<circle r="70" fill="#4a1f4f"/>`), { left: 180, top: 460, opacity: 0 });
  const mark = E(c, 'a', `<div style="width:0;height:0;margin:0 auto;border-left:34px solid transparent;border-right:34px solid transparent;border-top:54px solid #c8323a"></div><div style="font:800 40px/1 var(--font-bn-display);color:#fbf1dc;text-align:center;margin-top:6px">বছরের শুরু</div>`, { left: 390, top: 380, width: 300, opacity: 0 });
  tl.to([wheel, mark], { opacity: 1, duration: .3 }, CW).fromTo(wheel, { scale: .3, rotation: -210 }, { scale: 1, rotation: -210, duration: .5, ease: 'back.out(1.5)' }, CW);
  tl.to(wheel, { rotation: 0, duration: 1.4, ease: 'power3.inOut' }, W(4, 'বৈশাখকে') - .9); sfx(CW, 'whoosh'); sfx(W(4, 'বৈশাখকে') - .9, 'windup', { d: 1.4 }); sfx(W(4, 'বৈশাখকে') + .5, 'lock');
  tl.fromTo(Wd.cam, Wd.aim(560, 1170, 1.28, 540, 1060), Object.assign(Wd.aim(540, 1140, 1.2, 540, 1060), { duration: T.c3 - t, ease: 'sine.inOut' }), t).to(mood, { dim: .45, duration: .3 }, CW).to(mood, { dim: 0, duration: .3 }, S(5));
  // L5: a single decree — Nabanna loses its crown
  out([wheel, mark, akb], S(5) - .1);
  const fm = E(c, 'a', scroll(400, 'ফরমান'), { left: 340, top: 380 }); tl.fromTo(fm, { scaleY: 0, transformOrigin: '50% 0' }, { scaleY: 1, duration: .45, ease: 'power2.out' }, S(5)); sfx(S(5), 'creak');
  const fs = E(c, 'a', seal(170, 'মোহর'), { left: 560, top: 640 }); tl.fromTo(fs, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .2, ease: 'power4.in' }, W(5, 'সিদ্ধান্তে')); sfx(W(5, 'সিদ্ধান্তে') + .2, 'thud'); shake(W(5, 'সিদ্ধান্তে') + .2, 14, .3);
  const crown = E(c, 'a', `<div style="width:300px;text-align:center">${svg(300, '0 0 300 200', '<path d="M20 180 L40 60 L100 120 L150 20 L200 120 L260 60 L280 180Z" fill="url(#gPaddy)" stroke="#c98a1c" stroke-width="6"/><circle cx="150" cy="40" r="14" fill="#c8323a"/>')}<div style="font:800 54px/1 var(--font-bn-display);color:#ffd36b;margin-top:6px">নবান্ন</div></div>`, { left: 390, top: 1010 });
  tl.fromTo(crown, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: .35 }, W(5, 'নবান্ন') - .4)
    .to(crown, { y: 260, rotation: 28, filter: 'grayscale(1) brightness(.55)', duration: .9, ease: 'bounce.out' }, W(5, 'মর্যাদা') - .2);
  sfx(W(5, 'মর্যাদা'), 'fall'); sfx(W(5, 'হারায়'), 'sad');
}
