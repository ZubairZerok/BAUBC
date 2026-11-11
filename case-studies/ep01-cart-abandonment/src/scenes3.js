/* EP01 story, part 3 — রিভিউ গাছ · দাঁড়িপাল্লা · লেসন · নতুন সেতু · আপনার পালা · লোগো (73.9 → 125.1) */
const backdrop = (W, o = {}) => { nightSky(W, o); const far = W.plane(.12); hills(far, o.hy || 850, [N.h1, N.h2, N.h3]); (o.palms || [[30, 720, 150], [870, 690, 180]]).forEach(([x, y, w]) => E(far, 'a', palm(w), { left: x, top: y }));
  const hero = W.plane(1); E(hero, 'a', '', { left: -300, top: o.gy || 1230, width: 1700, height: 1000, background: `linear-gradient(${N.g1},${N.g2} 26%,#04140e)`, borderRadius: '50% 50% 0 0/50px 50px 0 0' }); tufts(hero, o.gy || 1230, 9, -100, 1180, (o.gy || 0) % 7); return hero; };
const fgGrass = W => { const fg = W.plane(1.4); E(fg, 'a', grassFG(640), { left: -200, top: 1610 }); E(fg, 'a', grassFG(640, '#05170f'), { left: 640, top: 1630, transform: 'scaleX(-1)' }); };
const stars5 = (s, n = 5) => `<span style="font:${s}px/1 sans-serif;color:#ffc83d;letter-spacing:${s * .06}px">${'★'.repeat(n)}<span style="color:#b9b39f">${'★'.repeat(5 - n)}</span></span>`;

/* ═════════ 06 · রিভিউ গাছ (73.9 → 82.7) ═════════ */
{
  const c = S5 = scene('s5', T.s5, T.s6, { pre: .25, post: .3, push: 1 }), t = T.s5, W = world(c);
  whip(t, CH, c, 'left');
  const hero = backdrop(W, { moon: [850, 236, 120], top: '#06281f', bot: '#17604a' });
  E(hero, 'a', svg(1000, '0 0 1000 1000', `<path d="M430 1000 C460 820 440 700 380 560 L470 610 L500 470 L545 610 L640 540 C590 700 570 820 600 1000Z" fill="#3a2a1a"/><path d="M300 560 V760 M700 560 V740 M220 520 V660 M790 520 V650" stroke="#3a2a1a" stroke-width="7"/>
    ${[[500, 330, 250, '#0f4d3a'], [270, 420, 190, '#0f4d3a'], [740, 410, 200, '#0f4d3a'], [390, 220, 170, '#14604a'], [640, 230, 180, '#14604a'], [500, 440, 210, '#125843'], [180, 330, 120, '#14604a'], [840, 320, 120, '#125843']].map(([x, y, r, f]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`).join('')}`), { left: 40, top: 236 });
  [[250, 520], [540, 380], [800, 500], [400, 640], [690, 660]].forEach(([x, y]) => E(hero, 'a', '', { left: x - 90, top: y - 90, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,200,61,.5),rgba(255,200,61,0) 62%)' }));
  const tags = Array.from({ length: 20 }, (_, i) => { const x = 110 + (i % 10) * 88 + rnd(i) * 30, L = 50 + rnd(i + 3) * 150;
    return E(hero, 'a', `<div style="width:3px;height:${L}px;background:rgba(239,233,220,.55);margin:0 auto"></div><div style="width:104px;padding:9px 0 8px;border-radius:12px;background:#efe9dc;text-align:center;box-shadow:0 8px 16px rgba(0,0,0,.35)">${stars5(17, 3 + (i * 7) % 3)}<div style="height:6px;margin:7px 12px 0;border-radius:3px;background:#b9b39f"></div><div style="height:6px;margin:5px 30px 0 12px;border-radius:3px;background:#cfc9b6"></div></div>`, { left: x - 52, top: 640 + (i > 9 ? 70 : 0) + rnd(i + 5) * 60, transformOrigin: '50% 0' }); });
  binds.push(T2 => { if (T2 > t - .5 && T2 < T.s6 + .5) tags.forEach((g2, i) => { g2.style.transform = `rotate(${Math.sin(T2 * 1.3 + i * 1.7) * 6}deg)`; }); });
  const mitu = actor(hero, 170, MITU, { think: MV.think, talk: MV.talk }, { left: 110, top: 1236 - 474 });
  [[640, '#29c7ff', 0], [770, '#ff7a59', 1], [900, '#8fd14f', 0]].forEach(([x, col, f], i) => E(hero, 'a', folk(96, f ? { shirt: col, long: true, hair: '#2a1a12', orna: '#efe9dc', expr: 'think', pose: 'think' } : { shirt: col, expr: 'think', pose: i ? 'think' : 'down', hat: i ? 'cap' : null, capc: '#efe9dc' }), { left: x, top: 1240 - 268 }));
  fgGrass(W);
  tl.fromTo(W.cam, W.aim(540, 1000, 1.12, 540, 1000), Object.assign(W.aim(540, 900, 1.0, 540, 900), { duration: 8.8, ease: 'sine.inOut' }), t - .2);
  const top = chip(c, `${ico('bolt', 40, '#ffc83d', 2.6)} আরেকটি অবাক করা তথ্য`, { left: 0, width: 1080, top: 250, textAlign: 'center' }, '#ffc83d');
  pop(top, V(73.58) + .2); out(top, V(76.2)); sfx(V(73.58) + .2, 'swish'); sfx(t, 'crickets', { d: 8 });
  const N99 = V(76.68), big = E(c, 'a h', '<span class="v">০</span>%', { left: 0, width: 1080, top: 250, fontSize: 250, lineHeight: 1, color: '#ffc83d', textShadow: '0 0 80px rgba(255,200,61,.6),0 6px 0 rgba(0,0,0,.3)' });
  pop(big, N99, { from: .4, ease: 'back.out(1.6)' }); counter($('.v', big), 0, 99, N99 + .05, 1.2);
  sfx(N99, 'impact', { soft: 1 }); sfx(N99 + .05, 'count', { d: 1.2 }); sfx(N99 + 1.25, 'boom');
  [0, 1, 2, 3, 4].forEach(i => sfx(V(79.0) + i * .22, 'star', { p: i }));
  tl.to(tags, { scale: 1.18, duration: .25, yoyo: true, repeat: 1, stagger: .05 }, V(79.0));
  const R1 = V(80.72), spot = E(c, 'a', `<div style="width:4px;height:330px;background:rgba(239,233,220,.7);margin:0 auto"></div><div style="padding:26px 30px 24px;border-radius:34px;background:#efe9dc;color:#10130c;box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 80px rgba(255,200,61,.35);text-align:center">${stars5(64)}<div style="font:800 56px/1.2 var(--font-bn-display);margin-top:10px">“ছবির মতোই পেয়েছি!”</div><div style="font:600 34px/1.3 var(--font-bn-body);color:#5a5648;margin-top:6px">— নুসরাত · ভেরিফায়েড ক্রেতা</div></div>`, { left: 300, top: 250, width: 660, transformOrigin: '50% 0' });
  tl.fromTo(spot, { y: -900, rotation: 24 }, { y: 0, rotation: -3, duration: .7, ease: 'back.out(1.3)' }, R1).to(spot, { rotation: 3, duration: .9, yoyo: true, repeat: 1, ease: 'sine.inOut' }, R1 + .7)
    .to(big, { scale: .5, x: -260, y: -60, duration: .5, ease: 'power3.inOut' }, R1 - .1);
  mitu.show('talk', R1 + .5); sfx(R1, 'whoosh'); sfx(R1 + .5, 'success', { soft: 1 });
  vcap(73.58, 76.3, 'সাথে আছে আরেকটি *অবাক করা* তথ্য…');
  vcap(76.4, 80.6, 'প্রায় *৯৯ শতাংশ* অনলাইন ক্রেতা যেকোনো কিছু কেনার আগে…');
  vcap(80.72, 82.3, 'অন্যদের *রিভিউ* পড়েন!');
}

/* ═════════ 07 · দাঁড়িপাল্লা — তিন ফ্যাক্টর (82.7 → 93.0) ═════════ */
{
  const c = S6 = scene('s6', T.s6, T.s7, { pre: .12, post: .3, push: 1 }), t = T.s6, W = world(c);
  zoomThru(t, S5, c, 540, 800);
  const hero = backdrop(W, { moon: [940, 236, 90], gy: 1250 }), PX = 540, PY = 590, ARM = 360, A = { a: 0 };
  E(hero, 'a', `<div style="position:absolute;left:-14px;top:0;width:28px;height:680px;border-radius:14px;background:linear-gradient(90deg,#c9a06a,#7d4b26)"></div><div style="position:absolute;left:-150px;top:660px;width:300px;height:46px;border-radius:20px 20px 6px 6px;background:linear-gradient(#c48450,#5a3a1e)"></div>`, { left: PX, top: PY - 20 });
  const beam = E(hero, 'a', `<div style="height:100%;border-radius:14px;background:linear-gradient(#e2c08a,#a8743a);box-shadow:0 8px 20px rgba(0,0,0,.4)"></div><div style="position:absolute;left:50%;top:-22px;width:70px;height:70px;margin-left:-35px;border-radius:50%;background:#c6ff1f;border:8px solid #0a0c06"></div>`, { left: PX - ARM - 30, top: PY - 13, width: ARM * 2 + 60, height: 26 });
  const pan = (side, label, col) => E(hero, 'a', `<svg width="300" height="250" viewBox="-150 0 300 250" style="position:absolute;left:-150px;top:0;overflow:visible"><path d="M0 0 L-128 226 M0 0 L128 226" stroke="#c9a06a" stroke-width="5"/><path d="M-140 224 H140 Q120 268 0 268 Q-120 268 -140 224Z" fill="${col}"/><path d="M-140 224 H140 L134 236 H-134Z" fill="#fff" opacity=".3"/></svg>
    <div class="wt" style="position:absolute;left:-140px;top:0;width:280px;height:226px"></div><div style="position:absolute;left:-200px;width:400px;top:282px;text-align:center"><span class="chip" style="font-size:44px;border-color:${col};color:${col}">${label}</span></div>`, { left: 0, top: 0 });
  const pL = pan(-1, 'কিনব ✓', '#c6ff1f'), pR = pan(1, 'কিনব না ✕', '#ff4a3d');
  binds.push(() => { const r = A.a * Math.PI / 180; beam.style.transform = `rotate(${A.a}deg)`; pL.style.transform = `translate(${PX - ARM * Math.cos(r)}px,${PY - ARM * Math.sin(r)}px)`; pR.style.transform = `translate(${PX + ARM * Math.cos(r)}px,${PY + ARM * Math.sin(r)}px)`; });
  const WT = [['tag', 'দাম', '#c6ff1f', 0, pL, 6, V(88.2), -8], ['star', 'রিভিউ', '#ffc83d', 2, pL, 142, V(89.3), -14], ['truck', 'ডেলিভারি<br>চার্জ', '#ff4a3d', 1, pR, 40, V(90.5), 17]];
  const wgt = (ic, name, col, s) => `<div style="width:${s}px"><div style="width:${s * .3}px;height:${s * .16}px;margin:0 auto;border-radius:${s * .08}px ${s * .08}px 0 0;background:${col}"></div><div style="height:${s * .78}px;border-radius:${s * .12}px;background:${col};clip-path:polygon(14% 0,86% 0,100% 100%,0 100%);display:grid;place-items:center;box-shadow:inset 0 -${s * .08}px 0 rgba(0,0,0,.2)">${ico(ic, s * .46, '#0a0c06', 2.6)}</div><div style="font:800 ${s * .24}px/1.05 var(--font-bn-display);color:${col};text-align:center;margin-top:8px;white-space:nowrap">${name}</div></div>`;
  WT.forEach(([ic, name, col, slot, p, px, land, ang], i) => {
    const s = i === 2 ? 190 : 124, fl = E(c, 'a', wgt(ic, name, col, 170), { left: 85 + slot * 330, top: 236 }), on = E($('.wt', p), 'a', wgt(ic, '', col, s), { left: px, top: 226 - s * .94 - 8, opacity: 0 });
    pop(fl, [V(82.38), V(84.8), V(83.52)][i] + .1, { ease: 'back.out(2.2)' }); sfx([V(82.38), V(84.8), V(83.52)][i] + .1, 'pop', { p: i * 2 });
    tl.to(fl, { scale: 1.12, duration: .2, yoyo: true, repeat: 1 }, V(86.16) + slot * .18);
    const prev = i ? WT[i - 1][7] : 0, r = prev * Math.PI / 180, sd = p === pL ? -1 : 1, tx = PX + sd * ARM * Math.cos(r) - 85, ty = PY + sd * ARM * Math.sin(r) + 60;
    tl.to(fl, { x: tx - (85 + slot * 330), y: ty - 236, scale: s / 170, duration: .38, ease: 'power2.in' }, land - .38).set(fl, { opacity: 0 }, land).set(on, { opacity: 1 }, land)
      .to(A, { a: ang, duration: i === 2 ? 1.5 : .9, ease: i === 2 ? 'elastic.out(1.1,.35)' : 'elastic.out(1,.5)' }, land);
    sfx(land - .38, 'swish'); sfx(land, i === 2 ? 'impact' : 'thud', i === 2 ? { soft: 1 } : { p: i });
  });
  const ct = mkCart(hero, 250, { left: 415, top: 1256 - 228 }); cLook(ct, -5, -6, V(88.2)); cHop(ct, V(88.3), 24); cHop(ct, V(89.4), 30);
  const X = V(90.5); cMood(ct, 'shock', X); cLook(ct, 6, -6, X, .1); cMood(ct, 'sad', X + 1.3);
  shake(X + .05, 22, .45); flash(X + .05, '#ff3d2e', .35, .5); tl.to(mood, { red: .7, duration: .2 }, X).to(mood, { red: 0, duration: .8 }, T.s7 - .9); sfx(X + .05, 'alarm');
  const tm = E(c, 'a', `<span class="chip" style="font-size:54px;background:#07140f">${ico('clock', 54, '#efe9dc', 2.4)} <span class="tv">৩</span> সেকেন্ড</span>`, { left: 0, width: 1080, top: 926, textAlign: 'center' });
  pop(tm, V(87.44)); [3, 2, 1, 0].forEach((v, i) => { const at = V(87.98) + i * .84; tl.set($('.tv', tm), { innerHTML: bn(v) }, at).fromTo(tm, { scale: 1.15 }, { scale: 1, duration: .25, immediateRender: false }, at); sfx(at, 'clock', { p: i }); });
  const vd = H(c, 'সিদ্ধান্ত <span class="red">বদলে গেল!</span>', 258, 100); hIn(vd, V(91.16), { d: .35 }); sfx(V(91.16), 'stamp');
  fgGrass(W); tl.fromTo(W.cam, W.aim(540, 960, 1.0), Object.assign(W.aim(540, 900, 1.06, 540, 900), { duration: 10, ease: 'sine.inOut' }), t - .2);
  vcap(82.38, 86.1, '*পণ্যের দাম, ডেলিভারি চার্জ* আর ক্রেতাদের *রিভিউ* —');
  vcap(86.16, 87.4, 'এই তিনটি ফ্যাক্টর…');
  vcap(87.44, 92.6, 'মাত্র *কয়েক সেকেন্ডের* মধ্যে আপনার কেনার সিদ্ধান্ত পুরোপুরি বদলে দিতে পারে!');
}

/* ═════════ 08a · ঝলমলে দোকান, বিক্রি শূন্য (93.0 → 98.58) ═════════ */
{
  const B0 = V(98.18), c = S7 = scene('s7', T.s7, B0, { pre: .25, post: .3, push: 1 }), t = T.s7, W = world(c);
  whip(t, S6, c, 'up');
  const hero = backdrop(W, { moon: [950, 222, 80], gy: 1236 });
  E(hero, 'a', `<div style="position:absolute;inset:0;border-radius:26px 26px 0 0;background:linear-gradient(#17594a,#0b3328)"></div><div style="position:absolute;left:60px;right:60px;top:210px;height:400px;border-radius:18px;background:radial-gradient(ellipse at 50% 30%,#fff3c0,#ffd27a 55%,#c98a3a);border:10px solid #07140f;box-shadow:0 0 120px rgba(255,214,120,.55)"></div>
    <svg viewBox="0 0 400 60" style="position:absolute;left:20px;right:20px;top:120px;width:820px">${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 50} 0 h50 v36 a25 25 0 0 1 -50 0z" fill="${i % 2 ? '#efe9dc' : '#c6ff1f'}"/>`).join('')}</svg>
    <div style="position:absolute;left:150px;right:150px;top:10px;height:100px;display:grid;place-items:center;background:#07140f;border:5px solid #c6ff1f;border-radius:20px;color:#c6ff1f;font:800 62px/1 var(--font-bn-display);box-shadow:0 0 40px rgba(198,255,31,.5)">ঝলমলে স্টোর</div>
    ${[0, 1, 2].map(i => `<div style="position:absolute;left:${118 + i * 230}px;top:300px"><div style="margin-left:18px">${item(i, 150)}</div><div style="width:186px;height:110px;margin-top:10px;border-radius:12px 12px 0 0;background:linear-gradient(#fff,#d8cfb8)"></div></div>`).join('')}`, { left: 110, top: 500, width: 860, height: 736 });
  const sp = [[250, 760], [470, 730], [700, 770], [360, 950], [610, 940], [830, 920]].map(([x, y], i) => E(hero, 'a en', '✦', { left: x, top: y, fontSize: 50 + (i % 3) * 20, color: '#fff' }));
  sp.forEach((s, i) => tl.fromTo(s, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: .45, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + .3 + i * .13));
  const keep = actor(hero, 120, { shirt: '#efe9dc', hat: 'cap', capc: '#c6ff1f' }, { a: { expr: 'happy', pose: 'talk' }, b: { expr: 'think', pose: 'down' } }, { left: 820, top: 1240 - 334 });
  [[0, '#29c7ff', 1, V(94.68)], [1, '#ff7a59', 0, V(95.6)]].forEach(([i, col, f, s]) => { const a = actor(hero, 120, f ? { shirt: col, long: true, hair: '#2a1a12', orna: '#efe9dc' } : { shirt: col }, { a: { expr: 'think', pose: 'down' } }, { left: -260, top: 1244 - 334 }); a.walk(1500, s, 2.9); });
  const box = E(hero, 'a', `<div class="lid2" style="position:absolute;left:0;top:-26px;width:230px;height:34px;border-radius:10px;background:linear-gradient(#e2ad6a,#a8693a);transform-origin:0 100%"></div><div style="width:230px;height:130px;border-radius:12px;background:linear-gradient(#c48450,#7d4b26);display:grid;place-items:center;font:800 40px/1 var(--font-bn-display);color:#3a2410">ক্যাশবাক্স</div>`, { left: 140, top: 1100 });
  const moth = E(hero, 'a', fly(60), { left: 220, top: 1060, opacity: 0 });
  const zero = chip(c, 'আজকের বিক্রি: ৳০', { left: 0, width: 1080, top: 1010, textAlign: 'center' }, '#ff4a3d');
  const top = chip(c, `${ico('bolt', 40, '#c6ff1f', 2.6)} সবচেয়ে বড় লেসন`, { left: 0, width: 1080, top: 236, textAlign: 'center' }), hl = H(c, 'শুধু সাজালেই <span class="red">বিক্রি হয় না</span>', 322, 78);
  pop(top, V(92.72) + .15); hIn(hl, V(94.68), { st: .08 }); sfx(V(92.72) + .15, 'swish'); sfx(t + .4, 'shine');
  const Z = V(96.64);
  tl.to($('.lid2', box), { rotation: -60, duration: .4, ease: 'back.out(2)' }, Z).set(moth, { opacity: 1 }, Z + .2).to(moth, { keyframes: [{ x: 80, y: -160, duration: .5 }, { x: -40, y: -330, duration: .5 }, { x: 160, y: -560, opacity: 0, duration: .6 }], ease: 'sine.inOut' }, Z + .2);
  pop(zero, V(97.1), { from: 2.2, ease: 'back.out(2)' }); keep.show('b', Z + .3); sfx(Z, 'creak'); sfx(Z + .2, 'buzz', { d: 1.4 }); sfx(V(97.1), 'deny'); sfx(V(97.1) + .1, 'sad');
  fgGrass(W); tl.fromTo(W.cam, W.aim(540, 960, 1.0), Object.assign(W.aim(540, 930, 1.07, 540, 930), { duration: 5.6, ease: 'sine.inOut' }), t - .2);
  vcap(92.72, 94.6, 'তাই সবচেয়ে বড় *লেসন:*');
  vcap(94.68, 98.1, 'শুধু আকর্ষণীয় পণ্য সাজিয়ে রাখলেই *বিক্রি হয় না।*');
}

/* ═════════ 08b · নতুন সেতু — সহজ · দ্রুত · স্বচ্ছ (98.58 → 105.6) ═════════ */
{
  const t = V(98.18), c = S7b = scene('s7b', t, T.s8, { pre: .12, post: .3, push: 1 }), { W, hero, gt } = chasm(c, true);
  zoomThru(t, S7, c, 540, 820);
  E(hero, 'a', `<div style="position:absolute;left:50%;top:150px;width:10px;height:300px;margin-left:-5px;background:#7d9a8c"></div><div style="width:300px;padding:14px 0 10px;border-radius:22px;background:rgba(47,211,181,.2);border:5px solid #2fd3b5;text-align:center;box-shadow:0 0 50px rgba(47,211,181,.4)"><div style="font:800 58px/1.05 var(--font-bn-display);color:#efe9dc">মোট ৳২,৮৫০</div><div style="font:700 28px/1.3 var(--font-bn-body);color:#2fd3b5">ডেলিভারিসহ · লুকানো খরচ নেই</div></div>`, { left: 6, top: 470 });
  const LS = [['check', 'সহজ', V(99.42)], ['bolt', 'দ্রুত', V(100.16)], ['eye', 'স্বচ্ছ', V(100.98)]].map(([ic, nm, at], i) => {
    const e = E(hero, 'a', `<div class="lc" style="width:120px;height:120px;border-radius:50%;background:#0a2a20;border:5px solid #3a5a4a;display:grid;place-items:center;color:#4a6a5a">${ico(ic, 70, 'currentColor', 2.6)}</div><div class="ln" style="position:absolute;left:-40px;width:200px;top:-70px;text-align:center;font:800 54px/1 var(--font-bn-display);color:#4a6a5a">${nm}</div>`, { left: 380 + i * 160 - 60, top: 468 });
    tl.to($('.lc', e), { background: '#c6ff1f', borderColor: '#c6ff1f', color: '#0a0c06', boxShadow: '0 0 70px rgba(198,255,31,.7)', duration: .15 }, at).to($('.ln', e), { color: '#c6ff1f', duration: .15 }, at).fromTo(e, { scale: 1 }, { scale: 1.25, duration: .14, yoyo: true, repeat: 1, immediateRender: false }, at);
    sfx(at, 'star', { p: i + 2 }); return e; });
  const mitu = actor(hero, 130, MITU, { happy: MV.happy, talk: MV.talk }, { left: -200, top: 920 - 363 }), ct = mkCart(hero, 150, { left: 150, top: 920 - 137 }); [0, 1, 2].forEach(i => ct.add(i, i));
  E(ct, 'a', `<div style="position:absolute;left:53px;top:118px;width:3px;height:120px;background:rgba(239,233,220,.7)"></div><svg width="110" height="120" viewBox="0 0 110 120" style="display:block;overflow:visible"><path d="M55 108 C10 70 0 44 8 26 C18 2 46 4 55 26 C64 4 92 2 102 26 C110 44 100 70 55 108Z" fill="#c6ff1f"/><text x="55" y="60" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="26" fill="#0a0c06">আগ্রহ</text></svg>`, { left: 40, top: -232 });
  gsap.set(mitu.el, { x: 240 }); const D = 520, d = V(102.06) - t - .2;
  mitu.walk(240 + D, t + .2, d, 'sine.inOut'); cRoll(ct, D, t + .2, d, 'sine.inOut');
  tl.fromTo(W.cam, W.aim(330, 840, 1.3, 540, 1010), Object.assign(W.aim(700, 820, 1.3, 540, 1010), { duration: d, ease: 'sine.inOut' }), t - .1);
  sfx(t + .2, 'whoosh'); sfx(t + .3, 'riser', { d: d - .2 });
  const G = V(102.06);
  tl.fromTo(gt, { scale: 1 }, { scale: 1.1, duration: .2, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, G).to(W.cam, Object.assign(W.aim(700, 760, 1.12, 540, 960), { duration: 1.2, ease: 'power2.out' }), G);
  mitu.show('talk', G); [0, .45, .9, 1.35, 1.8, 2.25].forEach(o => cHop(ct, G + o, 46)); flash(G, '#c6ff1f', .5, .6);
  const done = E(c, 'a', `<div style="height:100%;border-radius:50px;background:var(--lime);color:#0a0c06;display:flex;align-items:center;justify-content:center;gap:22px;font:800 84px/1 var(--font-bn-display);box-shadow:0 0 130px rgba(198,255,31,.6)">${ico('check', 100, '#0a0c06', 3.6)}অর্ডার কনফার্মড</div>`, { left: 90, top: 470, width: 900, height: 170 });
  tl.fromTo(done, { opacity: 0, scale: .3, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: .5, ease: 'back.out(2)' }, G + .1);
  [[260, 420], [820, 380], [540, 300], [180, 700], [900, 720]].forEach(([x, y], i) => { burst(c, x, y, G + .15 + i * .32); sfx(G + .15 + i * .32, i % 2 ? 'boom' : 'pop', { p: i }); });
  const adv = H(c, 'সবচেয়ে বড় <span class="lime">প্রতিযোগিতামূলক সুবিধা</span>', 262, 62); hIn(adv, V(102.68), { st: .07 }); sfx(G, 'success'); sfx(G + .1, 'lock');
  vcap(98.18, 101.95, 'চেকআউটের অভিজ্ঞতা *সহজ, দ্রুত* আর *স্বচ্ছ* করাই');
  vcap(102.06, 105.2, 'হয়ে ওঠে সবচেয়ে বড় *প্রতিযোগিতামূলক সুবিধা।*');
}

/* ═════════ 09 · আপনার পালা (105.6 → 117.9) ═════════ */
{
  const c = S8 = scene('s8', T.s8, T.s9, { pre: .25, push: 1 }), t = T.s8, W = world(c);
  whip(t, S7b, c, 'left');
  const hero = backdrop(W, { moon: [60, 600, 120], gy: 1290 });
  E(hero, 'a', '', { left: 716, top: 440, width: 26, height: 860, borderRadius: 10, background: 'linear-gradient(90deg,#c9a06a,#7d4b26)' });
  const BD = [['ডেলিভারি চার্জ', '#ff4a3d', 'truck', V(110.78), 1], ['রিভিউ', '#ffc83d', 'star', V(111.92), -1], ['‘পরে কিনব’ ভেবে ভুলে যাওয়া', '#c6ff1f', 'clock', V(112.86), 1]].map(([nm, col, ic, at, dir], i) => {
    const e = E(hero, 'a', `<div style="height:100%;display:flex;align-items:center;gap:20px;padding:0 ${dir > 0 ? 70 : 34}px 0 ${dir > 0 ? 34 : 70}px;background:linear-gradient(#e9c58e,#c99a5c);clip-path:${dir > 0 ? 'polygon(0 0,90% 0,100% 50%,90% 100%,0 100%)' : 'polygon(10% 0,100% 0,100% 100%,10% 100%,0 50%)'};font:800 ${i === 2 ? 44 : 60}px/1.1 var(--font-bn-display);color:#3a2410"><div style="width:86px;height:86px;border-radius:22px;background:${col};display:grid;place-items:center;flex:none">${ico(ic, 56, '#0a0c06', 2.6)}</div>${nm}</div>`, { left: dir > 0 ? 330 : 200, top: 470 + i * 176, width: 660, height: 140, filter: 'drop-shadow(0 12px 18px rgba(0,0,0,.45))' });
    tl.fromTo(e, { opacity: 0, rotationY: 90 * dir, x: dir * 200 }, { opacity: 1, rotationY: 0, x: 0, duration: .5, ease: 'back.out(1.6)' }, at).to(e, { scale: 1.05, duration: .3, yoyo: true, repeat: 1 }, V(115.4) + i * .15);
    sfx(at, 'swish'); sfx(at + .3, 'pop', { p: i * 2 }); return e; });
  const ct = mkCart(hero, 400, { left: 50, top: 1296 - 364 }); [0, 1, 2].forEach(i => ct.add(i, i)); gsap.set(ct, { x: -700 });
  cRoll(ct, 0, t + .1, 1.0, 'power2.out'); cHop(ct, V(105.3) + .9, 50);
  [[6, -6, V(110.78)], [5, -2, V(111.92)], [6, 2, V(112.86)], [0, 0, V(114.3)]].forEach(([x, y, at]) => cLook(ct, x, y, at + .1));
  const h1 = H(c, 'এবার <span class="lime">আপনার পালা!</span>', 250, 110); hIn(h1, V(105.3), { d: .45 }); sfx(t + .1, 'whoosh'); sfx(V(105.3), 'success', { soft: 1 });
  const cm = E(c, 'a', `<div style="height:100%;border-radius:46px;background:var(--lime);color:#0a0c06;display:flex;align-items:center;justify-content:center;gap:20px;font:800 72px/1 var(--font-bn-display);box-shadow:0 0 110px rgba(198,255,31,.5)">${ico('chat', 84, '#0a0c06', 2.4)}কমেন্টে জানান</div>`, { left: 440, top: 1090, width: 600, height: 150 });
  const K = V(115.24);
  tl.fromTo(cm, { opacity: 0, scale: .2 }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, K).to(cm, { scale: 1.05, rotation: -1.5, duration: .35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, K + .5);
  cHop(ct, K + .1, 60); cHop(ct, K + .6, 40); sfx(K, 'bubble'); sfx(K + .3, 'ding');
  fgGrass(W); tl.fromTo(W.cam, W.aim(540, 960, 1.0), Object.assign(W.aim(540, 930, 1.05, 540, 930), { duration: 12.3, ease: 'sine.inOut' }), t - .2);
  vcap(105.3, 106.65, '*এবার আপনার পালা!*');
  vcap(106.74, 110.7, 'অনলাইনে শপিং করতে গিয়ে আপনি সবচেয়ে বেশি *কোনটায় আটকে যান?*');
  vcap(110.78, 115.15, 'ডেলিভারি চার্জ, রিভিউ, নাকি শুধু *‘পরে কিনব’* ভেবে ভুলে যাওয়া?');
  vcap(115.24, 117.3, '*কমেন্টে* আপনার অভিজ্ঞতা জানান!');
}

/* ═════════ 10 · লোগো (117.9 → 125.1) — built after fonts load ═════════ */
window.__afterFonts = () => {
  const c = scene('s9', T.s9, T.end + 1, { pre: .55, push: 1 }), t = T.s9;
  iris(t, c, 740, 1165, .55);
  tl.to(['#segs', '#hudL', '#hudR'], { opacity: 0, duration: .2 }, t - .2).to(mood, { energy: 0, duration: .3 }, t - .3);
  const L = buildCaseStudiesLogo(c, { width: 900, cy: 900 });
  tl.add(L.timeline, t); binds.push(T2 => L.draw(T2 - t));
  L.cues.forEach(q => sfx(t + q.t, 'logo_' + q.name, q.p != null ? { p: q.p } : q.d ? { d: q.d } : undefined));
  const bnf = 'var(--font-bn-display)';
  L.sub.innerHTML = `<div class="ep" style="position:absolute;left:0;right:0;top:${L.top - 200}px;text-align:center"><span class="chip" style="font-size:36px">এপিসোড ০১ · কার্টুর গল্প</span></div>
    <div class="rl" style="position:absolute;left:340px;top:${L.bottom + 70}px;width:400px;height:4px;background:var(--lime);border-radius:4px"></div>
    <div class="by" style="position:absolute;left:0;right:0;top:${L.bottom + 96}px;text-align:center;font:800 44px/1.2 ${bnf};color:var(--lime)">বাকৃবি বিজনেস ক্লাবের আয়োজন</div>
    <div class="fu" style="position:absolute;left:0;right:0;top:${L.bottom + 166}px;text-align:center;font:600 28px/1.2 ${bnf};color:var(--cream-dim)">বাংলাদেশ কৃষি বিশ্ববিদ্যালয় বিজনেস ক্লাব</div>
    <div class="fo" style="position:absolute;left:0;right:0;top:${L.bottom + 262}px;text-align:center;font:700 50px/1 ${bnf};color:var(--cream)">ফলো করুন — পরের কেস স্টাডি আসছে</div>`;
  const q = s => L.sub.querySelector(s);
  tl.fromTo(q('.rl'), { scaleX: 0 }, { scaleX: 1, duration: .6, ease: 'expo.out' }, t + 3.3)
    .fromTo(q('.by'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, t + 3.4)
    .fromTo(q('.fu'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, t + 3.7)
    .fromTo(q('.ep'), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 3.6)
    .fromTo(q('.fo'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, t + 4.2);
};
