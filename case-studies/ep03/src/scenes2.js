/* EP03 — chapters 04–06: ঢেঁকি বনাম মিল · সাদা চাল · সুগন্ধ */
let C3, C3b, C4, C5;

/* ═════════ 04a · the mills arrive + the ঢেঁকি (L6–L7) ═════════ */
{
  const c = C3 = scene('c3', T.c3, S(8) - .3, { pre: .12, post: .3, push: 1 }), t = T.c3, Wd = world(c);
  zoomThru(t, C2, c, 540, 1150);
  sky(Wd, '#3a6a8a', '#9fc7c2', '#e8d9a8');
  const smoke = E(Wd.plane(.12), 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const mills = Wd.plane(.2), MI = [[-80, 460, .9], [330, 400, 1.15], [760, 470, .85]].map(([x, y, s]) => E(mills, 'a', factory(560 * s), { left: x, top: y, filter: 'brightness(.75) saturate(.6)' }));
  const puffs = Array.from({ length: 18 }, (_, i) => E(smoke, 'a', '', { left: [200, 640, 1000][i % 3] + (i % 2) * 20, top: [500, 400, 520][i % 3], width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(90,95,110,.75),rgba(90,95,110,0) 68%)', opacity: 0 }));
  puffs.forEach((p, i) => tl.fromTo(p, { opacity: .9, x: 0, y: 0, scale: .4 }, { opacity: 0, x: 120 + rnd(i) * 120, y: -420, scale: 3, duration: 2.6, ease: 'power1.out', repeat: 3 }, S(6) + (i % 6) * .45));
  tl.fromTo(MI, { y: 900 }, { y: 0, duration: 1.1, ease: 'back.out(1.2)', stagger: .18 }, S(6) - .1); sfx(S(6), 'rumble'); sfx(S(6) + .4, 'machine', { d: 3 });
  const gears = [[60, 280, 230, 1], [250, 210, 150, -1], [820, 260, 240, -1], [680, 200, 140, 1]].map(([x, y, w, d]) => { const gg = E(c, 'a', gear(w, '#c98a4a'), { left: x, top: y, opacity: 0 }); tl.to(gg, { opacity: .9, duration: .3 }, S(6) + .3).to(gg, { rotation: 360 * d, duration: 6, ease: 'none' }, S(6) + .3).to(gg, { opacity: 0, duration: .4 }, S(7) - .4); return gg; });
  const t1 = H(c, '<span style="color:#ffd36b">বড় চালের মিল</span>', 240, 100); hIn(t1, W(6, 'বড়')); out(t1, S(7) - .3);
  const vil = Wd.plane(.6); ground(vil, 1060, '#b8743f', '#6e4426');
  E(vil, 'a', hut(420, '#c98a4a'), { left: 600, top: 700 }); E(vil, 'a', tree(360, '#3f7f3a', '#57a14a'), { left: -80, top: 640 });
  const hero = Wd.plane(1);
  const dk = E(hero, 'a', dheki(800), { left: 150, top: 1000 }), beam = $('path', dk);
  E(hero, 'a', '', { left: -300, top: 1490, width: 1700, height: 800, background: 'linear-gradient(#8a5a34,#4a2c18)' });
  const w1 = actor(hero, 170, { top: 'saree', low: 'saree', c1: '#ffd36b', head: 'veil', skin: '#9a6440', pose: 'hip', expr: 'happy' }, { left: 150, top: 1050 - 323 });
  const w2 = actor(hero, 170, { top: 'saree', low: 'saree', c1: '#fbf1dc', head: 'veil', sareeG: 1, skin: '#8a5634', pose: 'hip', expr: 'happy' }, { left: 30, top: 1060 - 323 });
  const D0 = S(7) - .4, nb = Math.round((T.c3 + (S(8) - .3 - T.c3) - D0) / .5);
  tl.fromTo(beam, { rotation: 0, svgOrigin: '330 168' }, { rotation: -6, svgOrigin: '330 168', duration: .25, yoyo: true, repeat: nb * 2 - 1, ease: 'power2.in' }, D0)
    .to([w1, w2], { y: 22, duration: .25, yoyo: true, repeat: nb * 2 - 1, ease: 'power2.in', stagger: .25 }, D0);
  for (let i = 0; i < nb; i++) sfx(D0 + .5 * i + .25, 'thump', { p: i % 2 });
  const grains = Array.from({ length: 14 }, (_, i) => E(hero, 'a', grain(28, 1), { left: 740 + rnd(i) * 100, top: 1230 }));
  grains.forEach((g2, i) => tl.fromTo(g2, { y: 0, x: 0, opacity: 1 }, { keyframes: [{ y: -90 - rnd(i) * 70, x: (rnd(i + 3) - .5) * 120, duration: .25, ease: 'power2.out' }, { y: 0, duration: .25, ease: 'power2.in' }], repeat: 3, immediateRender: false }, D0 + .25 + (i % 4) * .12));
  const NU = [['আঁশ', '#ffd36b'], ['ভিটামিন', '#7fd3d8'], ['খনিজ', '#ff9a6a']].map(([n, col], i) => E(c, 'a', `<div style="width:170px;height:170px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffffffaa,${col} 55%,${col}99);display:grid;place-items:center;font:800 40px/1 var(--font-bn-display);color:#2a1430;box-shadow:0 0 50px ${col}">${n}</div>`, { left: 120 + i * 300, top: 620 }));
  NU.forEach((b, i) => { tl.fromTo(b, { scale: 0, y: 260 }, { scale: 1, y: 0, duration: .55, ease: 'back.out(2)' }, W(7, 'পুষ্টি') - .3 + i * .15).to(b, { y: -24, duration: .8, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W(7, 'পুষ্টি') + .4 + i * .15); sfx(W(7, 'পুষ্টি') - .3 + i * .15, 'bubble'); });
  const dk2 = chip(c, 'ঢেঁকি ছাঁটা লাল চাল', { left: 0, width: 1080, top: 260, textAlign: 'center' }, '#ff9a6a'); pop(dk2, W(7, 'ঢেঁকিতে'));
  tl.fromTo(Wd.cam, Wd.aim(540, 900, 1.0), Object.assign(Wd.aim(540, 900, 1.0), { duration: .1 }), t).to(Wd.cam, Object.assign(Wd.aim(520, 1120, 1.22, 540, 1060), { duration: 1.4, ease: 'power2.inOut' }), S(7) - .5);
}

/* ═════════ 04b · ×৮৩৩ — the coin tower, and the habit lever (L8–L9) ═════════ */
{
  const c = C3b = scene('c3b', S(8) - .3, T.c4, { pre: .25, post: .3, push: 1 }), t = S(8) - .3, Wd = world(c);
  whip(t, C3, c, 'left');
  E(c, 'a', '', { left: 0, top: -2000, width: 1080, height: 4000, background: 'linear-gradient(#1a0f1f,#3b1d3f 50%,#5a2a5e)' });
  const tower = Wd.plane(1);
  E(tower, 'a', '', { left: -300, top: 1380, width: 1700, height: 900, background: 'linear-gradient(#4a2c18,#2a1810)' });
  const dkS = E(tower, 'a', `<div style="width:300px">${dheki(300)}</div><div style="font:800 46px/1 var(--font-bn-display);color:#ffd36b;text-align:center;margin-top:8px">ঢেঁকি</div>`, { left: 40, top: 1230 });
  E(tower, 'a', coinStack(1, 90), { left: 145, top: 1300 });
  const fac = E(tower, 'a', `<div style="width:420px">${factory(420)}</div>`, { left: 600, top: 1000 });
  const col = E(tower, 'a', '', { left: 670, top: 1380, width: 140, height: 0, transformOrigin: '50% 100%', background: 'repeating-linear-gradient(#ffe08a 0 14px,#c98a1c 14px 18px)', boxShadow: '0 0 60px rgba(242,182,50,.6)', borderRadius: '12px 12px 0 0' });
  const cnt = E(c, 'a', '<span>×<span class="v">১</span></span>', { left: 0, width: 1080, top: 300, textAlign: 'center', font: '800 210px/1 var(--font-bn-display)', color: '#ffd36b', textShadow: '0 0 70px rgba(242,182,50,.6),0 8px 0 rgba(0,0,0,.3)' });
  const G0 = W(8, 'আটশো') - 1.0, H0 = { h: 0 };
  tl.fromTo([dkS, fac], { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'back.out(1.3)', stagger: .2 }, t + .1);
  tl.to(H0, { h: 2600, duration: 1.8, ease: 'power2.in' }, G0); binds.push(() => { col.style.height = H0.h + 'px'; col.style.top = (1380 - H0.h) + 'px'; });
  counter($('.v', cnt), 1, 833, G0, 1.8, v => bn(Math.round(v)), 'power2.in'); pop(cnt, G0 - .1);
  tl.fromTo(Wd.cam, Wd.aim(540, 1150, 1, 540, 1150), Object.assign(Wd.aim(540, -400, .55, 540, 1100), { duration: 1.9, ease: 'power2.in' }), G0).to(Wd.cam, Object.assign(Wd.aim(540, 1100, .82, 540, 1150), { duration: 1.2, ease: 'power3.inOut' }), G0 + 2.1);
  sfx(G0, 'count', { d: 1.8 }); sfx(G0, 'riser', { d: 1.8 }); sfx(G0 + 1.8, 'impact'); shake(G0 + 1.85, 26, .5);
  const st = plaque(c, '৮৩৩ গুণ বেশি খরচ!', { left: 140, top: 560, transform: 'rotate(-5deg)' }, '#c8323a', '#fbf1dc'); tl.fromTo(st, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .22, ease: 'power4.in' }, G0 + 1.85); sfx(G0 + 2.05, 'stamp');
  // L9: the mill owner pulls the "অভ্যাস" lever — everyone turns to white rice
  const L9 = S(9) - .15;
  out([st, cnt], L9 - .2); tl.to(col, { opacity: .25, duration: .4 }, L9 - .2).to([dkS, fac], { opacity: .25, duration: .4 }, L9 - .2);
  const own = actor(c, 300, { top: 'suit', c1: '#2a2a36', low: 'pants', c2: '#2a2a36', belly: 1, hair: 'short', must: 1, skin: '#c48a5a', pose: 'pull', expr: 'smug' }, { left: 60, top: 1230 - 570 });
  const lev = E(c, 'a', `<div style="position:relative;width:40px;height:300px;border-radius:20px;background:linear-gradient(90deg,#9aa6b2,#5a606e);transform-origin:50% 100%"><div style="position:absolute;left:-30px;top:-50px;width:100px;height:100px;border-radius:50%;background:#c8323a;box-shadow:inset 0 -10px 0 #8a1420"></div></div><div style="width:200px;margin-left:-80px;padding:10px 0 6px;border-radius:14px;background:#fbf1dc;text-align:center;font:800 44px/1 var(--font-bn-display);color:#7a1f2a">অভ্যাস</div>`, { left: 420, top: 820 });
  tl.fromTo([own, lev], { x: -700 }, { x: 0, duration: .6, ease: 'back.out(1.3)' }, L9);
  tl.fromTo(lev.firstChild, { rotation: -35 }, { rotation: 35, duration: .4, ease: 'back.out(2)' }, W(9, 'অভ্যাসই') - .2); sfx(W(9, 'অভ্যাসই') - .2, 'switch');
  own.talk(L9 + .3, W(9, 'অভ্যাসই')); own.nod(W(9, 'অভ্যাসই') + .3, 2);
  const bill = E(c, 'a', `<div style="width:380px;padding:30px 0 22px;border-radius:26px;background:#fbf8ef;border:10px solid #f2b632;text-align:center;box-shadow:0 0 80px rgba(255,255,255,.35)"><div style="display:flex;justify-content:center">${grain(110, 0, 'happy')}</div><div style="font:800 56px/1 var(--font-bn-display);color:#2a1430;margin-top:10px">সাদা চাল ✨</div></div>`, { left: 650, top: 450 });
  pop(bill, W(9, 'অভ্যাসই'), { ease: 'back.out(2)' });
  const ppl = [0, 1, 2, 3, 4].map(i => actor(c, 110, i % 2 ? { top: 'saree', low: 'saree', c1: ['#ffd36b', '#2a8f8a', '#e8508a'][i % 3], head: 'veil', skin: '#9a6440', expr: 'happy' } : { top: 'kurta', c1: ['#fbf1dc', '#7fd3d8', '#ff9a6a'][i % 3], low: 'lungi', lungi: ['B', 'G', 'P'][i % 3], skin: '#8a5634', must: 1, expr: 'happy' }, { left: 560 + i * 100, top: 1290 - 209 }));
  tl.fromTo(ppl, { y: 900 }, { y: 0, duration: .5, ease: 'back.out(1.4)', stagger: .07 }, L9 + .3);
  ppl.forEach((p, i) => tl.set(p, { scaleX: -1 }, W(9, 'অভ্যাসই') + .2 + i * .08).to(p, { y: -26, duration: .14, yoyo: true, repeat: 1 }, W(9, 'অভ্যাসই') + .2 + i * .08));
  sfx(W(9, 'অভ্যাসই') + .2, 'ticks');
}

/* ═════════ 05 · লালচে আবরণ → ধবধবে সাদা (L10) ═════════ */
{
  const c = C4 = scene('c4', T.c4, T.c5, { pre: .12, post: .3, push: 1 }), t = T.c4;
  zoomThru(t, C3b, c, 840, 600);
  E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'radial-gradient(ellipse at 50% 35%,#4a3a6a,#241434 65%,#160c1c)' });
  E(c, 'a', '', { left: 0, top: 1060, width: 1080, height: 900, background: 'linear-gradient(#2a1d3a,#120a16)' });
  const belt = E(c, 'a', `<div style="width:1300px;height:44px;border-radius:22px;background:repeating-linear-gradient(90deg,#3a3f4e 0 40px,#2a2d38 40px 80px);border:6px solid #1a1c24"></div>`, { left: -110, top: 1150 });
  binds.push(T2 => { if (T2 > t - .2 && T2 < T.c5 + .4) belt.firstChild.style.backgroundPosition = `${(T2 * 120) % 80}px 0`; });
  const mach = E(c, 'a', `<div style="position:relative;width:380px;height:420px"><div style="position:absolute;inset:60px 0 0 0;border-radius:30px;background:linear-gradient(#c8323a,#8a1420);box-shadow:inset 0 -18px 0 rgba(0,0,0,.25)"></div><div style="position:absolute;left:40px;right:40px;top:0;height:90px;border-radius:20px;background:#f2b632;display:grid;place-items:center;font:800 46px/1 var(--font-bn-display);color:#4a1f2a">পলিশ মেশিন</div><div class="g1" style="position:absolute;left:30px;top:140px">${gear(150, '#f2b632')}</div><div class="g2" style="position:absolute;right:30px;top:200px">${gear(120, '#fbf1dc')}</div><div style="position:absolute;left:120px;bottom:0;width:140px;height:150px;border-radius:70px 70px 0 0;background:#160c1c"></div></div>`, { left: 300, top: 690, transform: 'scale(1.25)', transformOrigin: '50% 100%' });
  tl.to($('.g1', mach), { rotation: 720, duration: 6, ease: 'none' }, S(10)).to($('.g2', mach), { rotation: -900, duration: 6, ease: 'none' }, S(10));
  const R0 = S(10) - .1, IN = W(10, 'ছেঁটে'), OUT = W(10, 'ধবধবে') - .3;
  const red = E(c, 'a', grain(200, 1, 'happy'), { left: -230, top: 830 }), wht = E(c, 'a', `<div style="position:relative">${halo(300, 'rgba(255,255,255,.55)')}<div style="position:absolute;left:65px;top:10px">${grain(170, 0, 'sad')}</div></div>`, { left: 700, top: 830, opacity: 0 });
  tl.fromTo(red, { x: 0 }, { x: 560, duration: IN - R0, ease: 'none' }, R0).to(red, { y: -30, duration: .2, yoyo: true, repeat: Math.max(1, Math.round((IN - R0) / .4)) * 2 - 1, ease: 'sine.inOut' }, R0)
    .to(red, { opacity: 0, scale: .6, duration: .25 }, IN);
  tl.to(mach, { x: 10, duration: .05, yoyo: true, repeat: Math.round((OUT - IN) / .05), ease: 'none' }, IN); sfx(IN, 'machine', { d: OUT - IN + .3 });
  const bran = Array.from({ length: 16 }, (_, i) => E(c, 'a', `<div style="width:${20 + (i % 3) * 8}px;height:${12 + (i % 2) * 6}px;border-radius:50%;background:#b5532f"></div>`, { left: 520, top: 760, opacity: 0 }));
  bran.forEach((b, i) => tl.fromTo(b, { opacity: 1, x: 0, y: 0 }, { x: (rnd(i) - .5) * 700, y: -300 - rnd(i + 3) * 300, rotation: 400, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, IN + .1 + (i % 5) * .1));
  const lost = chip(c, 'পুষ্টি ছেঁটে ফেলা হলো', { left: 0, width: 1080, top: 300, textAlign: 'center' }, '#ff9a6a'); pop(lost, IN + .3); sfx(IN + .2, 'squish'); out(lost, OUT + .2);
  tl.set(wht, { opacity: 1 }, OUT).fromTo(wht, { x: -120, scale: .5 }, { x: 0, scale: 1, duration: .5, ease: 'back.out(2)' }, OUT); sfx(OUT, 'shine'); sfx(OUT + .1, 'pop', { p: 6 });
  const wl = chip(c, 'ধবধবে সাদা ✨', { left: 640, top: 1240 }, '#fbf1dc'); pop(wl, OUT + .3);
  // old rice becomes premium; cooks fluffy and swells
  const P1 = W(10, 'পুরোনো') - .2;
  tl.to([belt, mach, wht, wl], { y: -1400, duration: .6, ease: 'power3.in' }, P1);
  const board = E(c, 'a', `<div style="width:520px;padding:24px 30px 18px;border-radius:24px;background:#2a1d3a;border:6px solid #f2b632"><div style="font:800 54px/1.1 var(--font-bn-display);color:#fbf1dc">পুরোনো চাল</div><div style="display:flex;align-items:center;gap:20px;margin-top:10px"><span class="pv" style="font:800 96px/1 var(--font-bn-display);color:#ffd36b">দাম</span><svg width="110" height="110" viewBox="0 0 110 110"><path d="M10 90 L60 40 L60 70 L100 20" stroke="#ff5a48" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M76 14 H104 V42" stroke="#ff5a48" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`, { left: 280, top: 360 });
  tl.fromTo(board, { y: -600 }, { y: 0, duration: .55, ease: 'back.out(1.6)' }, P1 + .2).to(board, { rotation: -3, duration: .4, yoyo: true, repeat: 1 }, P1 + .8); sfx(P1 + .2, 'swish'); sfx(P1 + .7, 'coin', { p: 4 });
  const K2 = W(10, 'রান্না') - .3, pt = E(c, 'a', pot(440), { left: 320, top: 1010 }), fire = E(c, 'a', `<div style="width:300px;height:110px;border-radius:50% 50% 20px 20px;background:radial-gradient(ellipse at 50% 100%,#fff6c8,#ffcf5a 30%,#ff7a2e 60%,rgba(255,90,40,0) 72%)"></div>`, { left: 390, top: 1180 });
  tl.fromTo([pt, fire], { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.3)' }, K2).to(fire, { scaleY: .8, duration: .12, yoyo: true, repeat: 30, transformOrigin: '50% 100%' }, K2 + .5);
  const pops = Array.from({ length: 34 }, (_, i) => E(c, 'a', grain(30, 0), { left: 400 + rnd(i) * 270, top: 1040, opacity: 0, transform: `rotate(${rnd(i + 2) * 360}deg)` }));
  pops.forEach((g2, i) => tl.fromTo(g2, { opacity: 1, y: 0 }, { y: -60 - rnd(i) * (i > 20 ? 260 : 120), duration: .4, ease: 'back.out(2)', immediateRender: false }, W(10, 'ঝরঝরে') - .2 + (i % 12) * .05));
  sfx(K2 + .3, 'boil', { d: 2.5 }); sfx(W(10, 'ঝরঝরে'), 'ticks');
  const fl = chip(c, 'ঝরঝরে ভাত · পরিমাণে বাড়ে', { left: 0, width: 1080, top: 860, textAlign: 'center' }, '#ffd36b'); pop(fl, W(10, 'পরিমাণে') - .2);
  tl.to(pt, { scale: 1.12, duration: .5, ease: 'back.out(3)', transformOrigin: '50% 100%' }, W(10, 'বাড়ে') - .1); sfx(W(10, 'বাড়ে'), 'pop', { p: 8 });
}

/* ═════════ 06 · সুগন্ধ — the lab, then the pitha box (L11–L12) ═════════ */
{
  const c = C5 = scene('c5', T.c5, T.c6, { pre: .25, post: .3, push: 1 }), t = T.c5;
  whip(t, C4, c, 'up');
  E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'linear-gradient(#20485a,#163444 55%,#0e2230)' });
  E(c, 'a', svg(1080, '0 0 1080 700', `${[0, 1, 2].map(i => `<rect x="${60 + i * 340}" y="80" width="280" height="14" rx="7" fill="#9fc7c2" opacity=".4"/>`).join('')}${[0, 1, 2, 3, 4, 5].map(i => `<g transform="translate(${90 + i * 160} 0)" opacity=".55">${''}</g>`).join('')}`), { left: 0, top: 360 });
  [[90, 330, '#7fd3d8'], [300, 320, '#ffd36b'], [760, 330, '#ff9a6a'], [930, 320, '#c6ff1f']].forEach(([x, y, col], i) => { const f = E(c, 'a', flask(110, col), { left: x, top: y }); tl.to(f, { y: -10, duration: .6, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + i * .2); });
  E(c, 'a', '', { left: 0, top: 1190, width: 1080, height: 760, background: 'linear-gradient(#e8e2d2,#b9b39f)' });
  const sci = actor(c, 230, { top: 'coat', low: 'coat', c2: '#f7f7f2', hair: 'bun', glasses: 1, skin: '#a8714a', pose: 'point', expr: 'talk' }, { left: 30, top: 1150 - 437 });
  sci.breathe(t, T.c6).talk(S(11), W(11, 'দেখা') + .4).blink(t + 1.2, t + 3.8);
  const BW = [['কালোজিরা', 1, '#ffd36b', 1], ['গোবিন্দভোগ', 1, '#ffd36b', .94], ['বাসমতি', 0, '#9fc7c2', .62]];
  const bowls = BW.map(([n, loc, col, lvl], i) => {
    const x = 330 + i * 245, b = E(c, 'a', `<div style="position:relative;width:220px;text-align:center"><svg class="ar" width="220" height="380" viewBox="0 0 220 380" style="display:block;overflow:visible">${[0, 1, 2].map(k => `<path d="M${80 + k * 30} 380 C${40 + k * 30} 300 ${150 + k * 20} 240 ${100 + k * 15} 160 C${60 + k * 20} 90 ${140 + k * 10} 40 ${110 + k * 10} 0" stroke="${col}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="40 30" opacity=".85"/>`).join('')}</svg>
      <div style="margin-top:-20px">${svg(220, '0 0 220 120', `<path d="M10 20 H210 Q200 116 110 116 Q20 116 10 20Z" fill="${loc ? '#c8323a' : '#5a606e'}"/><ellipse cx="110" cy="20" rx="100" ry="16" fill="#fbf6ea"/>`)}</div>
      <div style="font:800 ${n.length > 7 ? 38 : 44}px/1.1 var(--font-bn-display);color:#2a1430;margin-top:10px">${n}</div><div style="font:700 28px/1.2 var(--font-bn-body);color:${loc ? '#2f7d5a' : '#7a7f8e'}">${loc ? 'দেশি' : 'বিদেশি'}</div>
      <div style="width:60px;height:170px;margin:14px auto 0;border-radius:30px;background:#d9d4c6;position:relative;overflow:hidden"><div class="mt" style="position:absolute;left:0;right:0;bottom:0;height:${lvl * 100}%;background:linear-gradient(${col},${loc ? '#c98a1c' : '#5a8a8a'})"></div></div></div>`, { left: x - 110, top: 470 });
    const ar = $('.ar', b); tl.fromTo(ar, { opacity: 0 }, { opacity: 1, duration: .5 }, W(11, 'সুগন্ধ') - .3);
    binds.push(T2 => { if (T2 > t - .2 && T2 < T.c6 + .3) ar.querySelectorAll('path').forEach((p, k) => { p.style.strokeDashoffset = (T2 * (60 + k * 15)) % 70; }); });
    tl.fromTo($('.mt', b), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1, ease: 'power2.out' }, W(11, 'বাসমতির') - .4 + i * .15);
    return b; });
  tl.fromTo(bowls, { y: 600 }, { y: 0, duration: .6, ease: 'back.out(1.3)', stagger: .12 }, S(11) + .3); sfx(S(11) + .3, 'swish'); sfx(W(11, 'সুগন্ধ'), 'shine');
  const lab = chip(c, 'ল্যাব পরীক্ষা: সুগন্ধ', { left: 0, width: 1080, top: 250, textAlign: 'center' }, '#7fd3d8'); pop(lab, S(11) + .1);
  const win = E(c, 'a', `<div style="font:800 64px/1 var(--font-bn-display);color:#2a1430;background:#ffd36b;padding:14px 30px 8px;border-radius:20px;box-shadow:0 0 60px rgba(255,211,107,.7)">🏆 দেশি এগিয়ে!</div>`, { left: 380, top: 1460 }); pop(win, W(11, 'বেশি') - .1, { ease: 'back.out(3)' }); sfx(W(11, 'বেশি'), 'success', { soft: 1 });
  // L12: no promotion → new rice locked in the winter pitha box
  const L12 = S(12) - .15;
  tl.to([...bowls, win, lab, sci], { y: 1500, opacity: 0, duration: .55, ease: 'power3.in', stagger: .03 }, L12 - .2);
  const mg = E(c, 'a', `<div style="position:relative">${megaphone(300)}<svg width="300" height="220" viewBox="0 0 300 220" style="position:absolute;left:0;top:-40px"><path d="M30 20 L270 200 M270 20 L30 200" stroke="#ff5a48" stroke-width="18" stroke-linecap="round"/></svg></div><div style="font:800 52px/1 var(--font-bn-display);color:#fbf1dc;text-align:center;margin-top:20px">প্রচার নেই</div>`, { left: 380, top: 330 });
  pop(mg, W(12, 'প্রচারের') - .2); sfx(W(12, 'প্রচারের'), 'deny');
  const box = E(c, 'a', `<div style="position:relative;width:760px;height:520px;border-radius:30px;background:linear-gradient(#6e4426,#3a2414);border:10px solid #c98a4a;box-shadow:0 30px 70px rgba(0,0,0,.5)">
      <div style="position:absolute;left:40px;top:40px">${pot(220, '#d9d4c6')}</div><div style="position:absolute;left:300px;top:70px;width:200px;height:120px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff6e0,#f4d9a8)"></div><div style="position:absolute;left:520px;top:60px;width:180px;height:150px;border-radius:40% 40% 50% 50%;background:radial-gradient(circle at 40% 35%,#fbe8c8,#d9a85a)"></div>
      <div style="position:absolute;left:0;right:0;bottom:30px;text-align:center;font:800 60px/1.1 var(--font-bn-display);color:#ffd36b">শুধু শীতের<br>পিঠা-পায়েস</div></div>`, { left: 160, top: 760 });
  const lock = E(c, 'a', padlock(150), { left: 465, top: 700 });
  tl.fromTo(box, { y: 1400 }, { y: 0, duration: .6, ease: 'back.out(1.3)' }, W(12, 'আটকে') - .4).fromTo(lock, { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: .35, ease: 'bounce.out' }, W(12, 'আটকে') + .2);
  sfx(W(12, 'আটকে') + .45, 'lock'); sfx(W(12, 'শীতের'), 'shine');
  const snow = Array.from({ length: 40 }, (_, i) => E(c, 'a', '', { left: rnd(i) * 1080, top: 0, width: 8 + (i % 3) * 4, height: 8 + (i % 3) * 4, borderRadius: '50%', background: '#f4f8ff', opacity: 0 }));
  tl.to(snow, { opacity: .85, duration: .4 }, W(12, 'শীতের') - .3);
  binds.push(T2 => { if (T2 > L12 && T2 < T.c6 + .4) snow.forEach((f, i) => { f.style.transform = `translate(${Math.sin(T2 + i) * 30}px,${((rnd(i + 3) * 1900 + T2 * (90 + rnd(i) * 80)) % 1900)}px)`; }); });
}
