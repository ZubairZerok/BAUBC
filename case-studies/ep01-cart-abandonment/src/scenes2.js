/* EP01 story, part 2 — the chasm between "পছন্দ" and "অর্ডার কনফার্ম" (রহস্য → ৭০% → আসল কারণ), 23.6 → 73.9 */

/** the chasm world: two cliffs, a gate on the far side, a bridge. v2 = the rebuilt, honest bridge (chapter 08) */
function chasm(c, v2) {
  const W = world(c), sky = nightSky(W, { moon: [46, 610, 120] });
  const far = W.plane(.12); hills(far, 810, [N.h1, N.h2, N.h3]);
  [[20, 690, 140], [880, 660, 170], [640, 730, 100]].forEach(([x, y, w]) => E(far, 'a', palm(w), { left: x, top: y }));
  const mid = W.plane(.55);
  E(mid, 'a', '', { left: 180, top: 900, width: 720, height: 1300, background: 'linear-gradient(#0a3024,#03100b 55%,#020806)' });
  for (let i = 0; i < 7; i++) E(mid, 'a', '', { left: 180, top: 980 + i * 120, width: 720, height: 3, background: 'rgba(239,233,220,.05)' });
  E(mid, 'a', '', { left: 240, top: 1250, width: 600, height: 700, borderRadius: '50%', background: `radial-gradient(ellipse,rgba(${v2 ? '198,255,31' : '255,74,61'},.17),rgba(0,0,0,0) 65%)` });
  fog(mid, 6, 150, 930, 1020, 1560, '170,215,190', .2, 3);
  const hero = W.plane(1);
  const cliff = `<svg width="540" height="1100" viewBox="0 0 540 1100" style="display:block;overflow:visible"><defs><linearGradient id="gCl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c6048"/><stop offset=".35" stop-color="#0f3d2e"/><stop offset="1" stop-color="#05150f"/></linearGradient></defs>
    <path d="M0 0 H520 L498 70 L512 150 L484 250 L500 400 L466 600 L490 1100 H0Z" fill="url(#gCl)"/><path d="M0 -12 H524 Q530 6 516 22 H0Z" fill="#3aa35d"/><path d="M0 -12 H524 L522 -4 H0Z" fill="#7fe08a" opacity=".6"/>
    <path d="M0 150 H506 M0 320 H490 M0 520 H472 M0 760 H476" stroke="rgba(0,0,0,.25)" stroke-width="5"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${30 + i * 56} -10 l-8 -22 l12 16 l4 -24 l6 24 l10 -14 l-6 20Z" fill="#3aa35d"/>`).join('')}</svg>`;
  E(hero, 'a', cliff, { left: -200, top: 920 }); E(hero, 'a', cliff, { left: 740, top: 920, transform: 'scaleX(-1)' });
  const gt = E(hero, 'a', gate(240), { left: 812, top: 920 - 360 });
  E(hero, 'a', `<div style="position:absolute;left:46%;top:40px;width:10px;height:90px;background:#5a3a1e"></div><div class="sgn" style="position:relative;font-size:26px;padding:6px 14px 2px;border-width:4px">চেকআউট →</div>`, { left: 172, top: 800 });
  // bridge
  const br = E(hero, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const planks = Array.from({ length: 11 }, (_, i) => E(br, 'a', '', v2 ? { left: 320 + i * 40, top: 908, width: 41, height: 30, background: 'linear-gradient(#e2ad6a,#a8693a)', boxShadow: 'inset 0 4px 0 rgba(255,255,255,.25)' }
    : { left: 321 + i * 40, top: 912 + (rnd(i + 3) - .5) * 8, width: 35, height: 15, borderRadius: 4, background: i % 4 === 2 ? '#7d4b26' : '#b07a48', transform: `rotate(${(rnd(i) - .5) * 14}deg)` }));
  const ropes = E(br, 'a', v2
    ? `<svg width="1080" height="200" viewBox="0 0 1080 200">${[320, 430, 540, 650, 760].map(x => `<path d="M${x} 140 V40" stroke="#7d4b26" stroke-width="10" stroke-linecap="round"/>`).join('')}<path d="M320 52 H760 M320 92 H760" stroke="#c48450" stroke-width="8"/><path d="M320 170 Q540 250 760 170" stroke="#5a3a1e" stroke-width="14" fill="none"/></svg>`
    : `<svg width="1080" height="200" viewBox="0 0 1080 200"><path d="M316 60 Q540 150 764 60 M316 128 Q540 172 764 128" stroke="#c9a06a" stroke-width="5" fill="none"/>${[360, 420, 480, 540, 600, 660, 720].map(x => `<path d="M${x} ${60 + 90 * (1 - Math.pow((x - 540) / 224, 2)) * .5 + 2} V${128 + 44 * (1 - Math.pow((x - 540) / 224, 2)) * .5}" stroke="#c9a06a" stroke-width="3"/>`).join('')}<path d="M316 140 V50 M764 140 V50" stroke="#7d4b26" stroke-width="12" stroke-linecap="round"/></svg>`, { left: 0, top: 780 });
  const fg = W.plane(1.4); E(fg, 'a', grassFG(620), { left: -200, top: 1620 }); E(fg, 'a', grassFG(620, '#05170f'), { left: 660, top: 1640, transform: 'scaleX(-1)' });
  return { W, sky, mid, hero, gt, br, planks, ropes };
}

{
  const c = CH = scene('ch', T.s2, T.s5, { pre: .25, post: .3, push: 1 }), t = T.s2, { W, hero, gt, planks, ropes } = chasm(c);
  whip(t, S1, c, 'left');
  const cam = (a, at, d, ease = 'power2.inOut') => tl.to(W.cam, Object.assign(a, { duration: d, ease }), at);
  // the queue of forgotten carts — ours is the one at the edge
  [[-150, '#3a6a56'], [-70, '#4a7c64'], [10, '#3a6a56'], [86, '#557f6a']].forEach(([x, col], i) => { const k = E(hero, 'a', cartSVG(84, { col, dark: '#1a3a2e', frame: '#7d9a8c', face: false }), { left: x, top: 920 - 78, transform: `rotate(${(rnd(i) - .5) * 8}deg)` }); E(k, 'a', cobweb(44), { left: 8, top: 10, opacity: .7 }); });
  const mitu = actor(hero, 130, MITU, MV, { left: -200, top: 920 - 363 }); gsap.set(mitu.el, { opacity: 0 });
  const ct = mkCart(hero, 150, { left: 150, top: 920 - 137 }); [0, 1, 2].forEach(i => ct.add(i, i));
  const wb = E(ct, 'a', cobweb(80), { left: -6, top: 8 }); cMood(ct, 'sleepy', t - .2); gsap.set($('.pu', ct), { x: -3, y: 6 });
  tl.set([planks, ropes], { opacity: 0 }, 0);

  /* 03 · রহস্য */
  tl.fromTo(W.cam, W.aim(140, 850, 2.0, 540, 1000), Object.assign(W.aim(540, 960, 1), { duration: 4.2, ease: 'power2.inOut', immediateRender: true }), t - .2);
  const h1 = H(c, 'ই-কমার্সের<br><span class="lime">সবচেয়ে বড় রহস্য</span>', 250, 92);
  hIn(h1, V(25.06)); out(h1, V(29.1)); sfx(t + .2, 'mystery'); sfx(V(25.06), 'whoosh');
  const qm = E(hero, 'a h lime glowtxt', '?', { left: 440, width: 200, top: 960, fontSize: 260 });
  tl.fromTo(qm, { opacity: 0, y: 200, scale: .4 }, { opacity: 1, y: 0, scale: 1, duration: .8, ease: 'back.out(1.6)' }, V(27.34)).to(qm, { opacity: 0, y: -80, duration: .4 }, V(29.2));
  sfx(V(27.34), 'sub'); sfx(V(27.6), 'ding');
  // "আমরা ভাবি…" — the straight line we imagine, drawn in the stars
  const I1 = V(29.32), node = (x, ic, col, name) => E(c, 'a', `<div style="width:130px;height:130px;border-radius:50%;background:${col};display:grid;place-items:center;box-shadow:0 0 60px ${col}99">${ico(ic, 80, '#0a0c06', 3)}</div><div class="lbl" style="left:-60px;width:250px;top:-62px;color:${col}">${name}</div>`, { left: x - 65, top: 400 });
  const nL = node(170, 'heart', '#ff7aa8', 'পছন্দ'), nR = node(910, 'check', '#c6ff1f', 'কেনা');
  const ln = k => E(c, 'a', '', { left: k ? 540 : 245, top: 461, width: 295, height: 0, borderTop: '9px dashed #c6ff1f', transformOrigin: k ? '100% 50%' : '0 50%', filter: 'drop-shadow(0 0 10px rgba(198,255,31,.8))' });
  const lA = ln(0), lB = ln(1), gh = E(c, 'a', cartSVG(120, { col: 'rgba(198,255,31,.4)', dark: 'rgba(198,255,31,.6)', frame: 'rgba(239,233,220,.5)', face: false }), { left: 190, top: 355 });
  const th = chip(c, 'আমরা ভাবি…', { left: 0, width: 1080, top: 226, textAlign: 'center' }), gl = gt.lastElementChild;
  tl.to(gl, { opacity: 0, duration: .2 }, I1).to(gl, { opacity: 1, duration: .3 }, V(33.94));
  pop(th, I1); pop(nL, I1 + .25, { ease: 'back.out(2.5)' }); pop(nR, I1 + 1.3, { ease: 'back.out(2.5)' });
  tl.fromTo([lA, lB], { clipPath: 'inset(-20px 100% -20px 0)' }, { clipPath: 'inset(-20px 0% -20px 0)', duration: .5, ease: 'none', stagger: .5 }, I1 + .4)
    .fromTo(gh, { opacity: 0, x: 0 }, { opacity: 1, x: 300, duration: 1.7, ease: 'power1.inOut' }, I1 + .9);
  sfx(I1, 'pop', { p: 2 }); sfx(I1 + .4, 'riser', { d: 1 }); sfx(I1 + 1.3, 'star', { p: 3 });
  // "বাস্তবতা ভিন্ন!" — the line snaps
  const J1 = V(32.36), real = H(c, 'বাস্তবতা <span class="red">ভিন্ন!</span>', 250, 120);
  out(th, J1 - .2); hIn(real, J1, { d: .35 });
  tl.to(lA, { rotation: 46, duration: .5, ease: 'bounce.out' }, J1).to(lB, { rotation: -46, duration: .5, ease: 'bounce.out' }, J1)
    .to(gh, { y: 1300, rotation: 150, opacity: 0, duration: 1.1, ease: 'power2.in' }, J1).to(nR, { filter: 'grayscale(1) brightness(.6)', duration: .3 }, J1);
  shake(J1, 20, .4); flash(J1, '#ff3d2e', .3, .4); sfx(J1, 'stamp'); sfx(J1 + .1, 'fall'); sfx(J1, 'glitch');
  // "…বিশাল এক মনস্তাত্ত্বিক ফাঁক" — look down
  const K1 = V(33.94);
  out([real, nL, nR, lA, lB], K1 - .1, { stagger: .03 });
  cam(W.aim(540, 1090, 1.28, 540, 960), K1 + .2, 2.2);
  const cL = chip(hero, 'পছন্দ ♥', { left: 14, top: 790 }, '#ff7aa8'); pop(cL, K1 + .1); out(cL, T.s3);
  tl.fromTo(gt, { scale: 1 }, { scale: 1.12, duration: .25, yoyo: true, repeat: 3, transformOrigin: '50% 100%', ease: 'sine.inOut' }, V(34.98));
  sfx(K1 + .1, 'pop', { p: 1 }); sfx(V(34.98), 'star', { p: 4 }); sfx(K1 + .3, 'rumble');
  const ms = E(hero, 'a', `<svg width="440" height="50" viewBox="0 0 440 50"><path d="M10 25H430M10 25l20-14M10 25l20 14M430 25l-20-14M430 25l-20 14" fill="none" stroke="#efe9dc" stroke-width="5" stroke-linecap="round"/></svg>`, { left: 320, top: 960 });
  tl.fromTo(ms, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: .5, ease: 'expo.out' }, V(36.34));
  ['পরে…', 'দরকার আছে?', 'দামটা…', 'আরেকটু ভাবি', 'থাক…'].forEach((w, i) => { const e = E(hero, 'a', w, { left: 340 + (i % 3) * 120 + (i > 2 ? 40 : 0), top: 1420, font: '600 34px/1 var(--font-bn-body)', color: 'rgba(239,233,220,.75)', whiteSpace: 'nowrap', opacity: 0 });
    tl.fromTo(e, { y: 0, opacity: 0 }, { keyframes: [{ y: -130, opacity: .9, duration: 1 }, { y: -330, opacity: 0, duration: 1.4 }], ease: 'none' }, V(35.2) + i * .55); });
  const gapT = E(hero, 'a h', 'মনস্তাত্ত্বিক<br><span class="red">ফাঁক</span>', { left: 300, width: 480, top: 1040, fontSize: 70, lineHeight: 1.1 });
  hIn(gapT, V(38.24), { d: .4 }); sfx(V(36.34), 'swish'); sfx(V(38.24), 'boom'); sfx(V(35.2), 'wobble', { d: 2.6 });

  /* 04 · সংখ্যা — ৭০% */
  const t3 = T.s3;
  out([gapT, ms], t3, { duration: .3 }); cam(W.aim(610, 900, 1.2, 540, 1000), t3, .9);
  tl.to(ropes, { opacity: 1, duration: .4 }, t3 + .1).fromTo(planks, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: .25, ease: 'bounce.out', stagger: .05 }, t3 + .15);
  sfx(t3 + .1, 'creak'); sfx(t3 + .2, 'ticks'); sfx(t3 + .5, 'ticks');
  const COL = ['#c6ff1f', '#2fd3b5', '#ffc83d', '#efe9dc', '#ff7aa8'], SAFE = [2, 5, 9];
  for (let i = 0; i < 10; i++) {
    const k = mkCart(hero, 86, { left: -130, top: 920 - 79 }, { col: COL[i % 5], dark: '#0a3024', face: false }), s = t3 + .65 + i * .4; k.add(i % 3, 1);
    tl.set(k, { opacity: 0 }, 0).set(k, { opacity: 1 }, s);
    if (SAFE.includes(i)) { cRoll(k, 1000, s, 2.2); tl.to(k, { opacity: 0, scale: .4, duration: .2 }, s + 2.1); sfx(s + 2.15, 'ding'); }
    else { const xf = 480 + rnd(i + 4) * 240; cRoll(k, xf, s, xf / 460); tl.to(k, { y: 1100, rotation: (i % 2 ? 1 : -1) * 170, duration: 1, ease: 'power2.in' }, s + xf / 460 - .05).set(k, { opacity: 0 }, s + xf / 460 + 1); sfx(s + xf / 460, 'fall', { p: i }); }
  }
  const N70 = V(42.48), big = E(c, 'a h lime glowtxt', '<span class="v">০</span>%', { left: 0, width: 1080, top: 250, fontSize: 300, lineHeight: 1 });
  pop(big, N70, { from: .4, ease: 'back.out(1.6)' }); counter($('.v', big), 0, 70, N70 + .05, 1.3);
  const sub = chip(c, 'কার্টেই পড়ে থাকে — কেনা হয় না', { left: 0, width: 1080, top: 580, textAlign: 'center' }); pop(sub, V(43.98));
  sfx(N70, 'impact', { soft: 1 }); sfx(N70 + .05, 'count', { d: 1.3 }); sfx(N70 + 1.35, 'boom'); sfx(V(43.98), 'swish');
  // 10 shoppers: 7 turn back mid-bridge
  const P1 = V(45.98);
  out([big, sub], P1 - .15);
  const tal = Array.from({ length: 10 }, (_, i) => E(c, 'a', `<div class="tc" style="width:84px;height:84px;border-radius:50%;background:#0a2a20;border:4px solid #efe9dc;display:grid;place-items:center;color:#efe9dc">${ico('user', 52, 'currentColor', 2.4)}</div>`, { left: 58 + i * 97, top: 270 }));
  tl.fromTo(tal, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)', stagger: .04 }, P1);
  const say = H(c, 'প্রতি ১০ জনে <span class="red">৭ জনই</span> ফিরে যান', 390, 72); hIn(say, V(48.38), { st: .06 });
  const LV = [1, 1, 0, 1, 1, 1, 0, 1, 1, 0], SH = ['#8fd14f', '#ff7a59', '#29c7ff', '#efe9dc', '#ffc83d', '#8f7dff', '#2fd3b5'];
  LV.forEach((lv, i) => {
    const s = P1 + .5 + i * .36, a = actor(hero, 60, i % 3 === 1 ? { shirt: SH[i % 7], long: true, hair: '#2a1a12', orna: '#efe9dc' } : { shirt: SH[i % 7], hat: i % 4 === 0 ? 'cap' : null, capc: '#efe9dc' }, { a: { expr: lv ? 'think' : 'happy', pose: 'hold' } }, { left: -170, top: 920 - 168 });
    const k = mkCart(a.el, 74, { left: 52, top: 100 }, { col: COL[i % 5], dark: '#0a3024', face: false }); k.add(i % 3, 1);
    const xm = 560 + rnd(i + 11) * 200, tc = $('.tc', tal[i]);
    a.walk(xm, s, 1.3);
    if (lv) { tl.to(k, { y: 900, rotation: 150, opacity: 0, duration: .8, ease: 'power2.in' }, s + 1.3); a.face(-1, s + 1.4); a.walk(-80, s + 1.45, 1.25);
      tl.to(tc, { background: '#ff3d2e', borderColor: '#ff3d2e', duration: .15 }, s + 1.3).set(tc, { innerHTML: ico('x', 46, '#fff', 3.6) }, s + 1.3); sfx(s + 1.3, 'deny', { p: i % 5 }); }
    else { a.walk(1060, s + 1.3, 1.0); tl.to(a.el, { opacity: 0, duration: .2 }, s + 2.2).to(tc, { background: '#c6ff1f', borderColor: '#c6ff1f', duration: .15 }, s + 2.2).set(tc, { innerHTML: ico('check', 46, '#0a0c06', 3.6) }, s + 2.2); sfx(s + 2.2, 'ding'); }
  });
  // "…কেন সিদ্ধান্ত বদলে যায়?" — she comes back for her cart
  const Q1 = V(51.94), why = H(c, '<span class="lime glowtxt">কেন?</span>', 250, 270);
  out([say, ...tal], Q1, { stagger: .015 }); hIn(why, V(53.28), { d: .45 }); sfx(V(53.28), 'whoosh'); sfx(V(53.28) + .25, 'thud');
  tl.set(mitu.el, { opacity: 1 }, Q1 + .1); mitu.walk(240, Q1 + .2, 1.6); cam(W.aim(250, 840, 1.5, 540, 1000), Q1 + .2, 2.6);
  const heart = E(ct, 'a', `<div style="position:absolute;left:53px;top:118px;width:3px;height:120px;background:rgba(239,233,220,.7)"></div><svg class="hb" width="110" height="120" viewBox="0 0 110 120" style="display:block;overflow:visible"><path d="M55 108 C10 70 0 44 8 26 C18 2 46 4 55 26 C64 4 92 2 102 26 C110 44 100 70 55 108Z" fill="#c6ff1f"/><path d="M55 108 C10 70 0 44 8 26 C18 2 46 4 55 26Z" fill="#fff" opacity=".22"/><text x="55" y="60" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="26" fill="#0a0c06">আগ্রহ</text></svg>`, { left: 40, top: -232, transformOrigin: '50% 100%' });
  const W1 = Q1 + 1.9;
  cMood(ct, 'happy', W1); cLook(ct, -5, -3, W1); cHop(ct, W1, 30);
  tl.to(wb, { y: 160, rotation: 60, opacity: 0, duration: .6, ease: 'power2.in' }, W1).fromTo(heart, { scale: 0 }, { scale: 1, duration: .7, ease: 'elastic.out(1,.5)' }, W1 + .3)
    .to(heart, { rotation: 6, duration: 1.1, yoyo: true, repeat: 13, ease: 'sine.inOut' }, W1 + 1);
  sfx(W1, 'pop', { p: 5 }); sfx(W1 + .3, 'bubble'); mitu.show('happy', W1);

  /* 05 · আসল কারণ */
  const t4 = V(55.06), go = (d, at, dur, ease = 'sine.inOut') => { mitu.walk(240 + d, at, dur, ease); cRoll(ct, d, at, dur, ease); cam(W.aim(250 + d, 840, 1.5, 540, 1000), at, dur, ease); };
  out(why, t4 - .15);
  const big2 = chip(c, 'সবচেয়ে বড় কারণ?', { left: 0, width: 1080, top: 262, textAlign: 'center' }); pop(big2, t4); out(big2, V(58.5));
  go(170, t4 + .4, 3.2); sfx(t4, 'swish'); sfx(t4 + .4, 'riser', { d: 3.0 });
  const tag = E(ct, 'a ptag', 'দাম ৳২,৭০০', { left: 162, top: 24, fontSize: 32 }), ok = E(ct, 'a', `<div style="width:70px;height:70px;border-radius:50%;background:#c6ff1f;display:grid;place-items:center;box-shadow:0 0 40px #c6ff1f">${ico('check', 46, '#0a0c06', 3.6)}</div>`, { left: 262, top: -62 });
  pop(tag, V(58.66), { from: 2 }); pop(ok, V(59.86), { ease: 'back.out(3)' }); sfx(V(58.66), 'stamp'); sfx(V(59.86), 'success', { soft: 1 });
  mitu.show('talk', V(59.86)); mitu.show('happy', V(61.0)); out([tag, ok], V(61.4));
  go(320, V(59.3), 2.4);
  go(420, V(61.62), 1.7, 'power1.out'); mitu.show('think', V(63.5));
  const last = chip(hero, 'শেষ ধাপ', { left: 640, top: 990 }, '#ffc83d'); pop(last, V(64.32));
  tl.to(planks[10], { background: '#ffc83d', boxShadow: '0 0 40px #ffc83d', duration: .25, yoyo: true, repeat: 5 }, V(64.2));
  cam(W.aim(680, 820, 1.55, 540, 1000), V(63.6), 1.6);
  sfx(V(63.7), 'heart'); sfx(V(64.4), 'heart'); sfx(V(65.0), 'stop');
  // the surprise: a toll troll pops out of the chasm
  const X0 = V(65.44);
  const troll = E(hero, 'a', `<svg width="300" height="700" viewBox="0 0 300 700" style="display:block;overflow:visible;-webkit-mask-image:linear-gradient(#000 52%,transparent 80%);mask-image:linear-gradient(#000 52%,transparent 80%)"><defs><linearGradient id="gTr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a48"/><stop offset="1" stop-color="#8a1810"/></linearGradient></defs>
      <path d="M52 132 L28 20 L86 96Z M248 132 L272 20 L214 96Z" fill="#ffc83d"/><path d="M40 -60 V150 M260 -60 V150" stroke="url(#gTr)" stroke-width="38" stroke-linecap="round"/>
      <rect x="30" y="80" width="240" height="640" rx="110" fill="url(#gTr)"/><rect x="30" y="80" width="240" height="640" rx="110" fill="url(#gHi)" opacity=".6"/>
      <circle cx="110" cy="200" r="34" fill="#fff"/><circle cx="190" cy="200" r="34" fill="#fff"/><circle cx="116" cy="206" r="13" fill="#10130c"/><circle cx="184" cy="206" r="13" fill="#10130c"/>
      <path d="M70 160 L140 184 M230 160 L160 184" stroke="#5a0e08" stroke-width="12" stroke-linecap="round"/>
      <path d="M84 270 H216 Q216 340 150 340 Q84 340 84 270Z" fill="#3a0806"/><path d="M92 270 l14 22 l14 -22 l14 22 l14 -22 l14 22 l14 -22 l14 22 l14 -22" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round"/></svg>
    <div style="position:absolute;left:-90px;top:-250px;width:480px;padding:18px 0 12px;border-radius:26px;background:#ff3d2e;border:10px solid #fff;outline:10px solid #ff3d2e;text-align:center;color:#fff;box-shadow:0 0 90px rgba(255,61,46,.8);transform:rotate(-3deg)"><div style="font:800 58px/1.1 var(--font-bn-display)">ডেলিভারি চার্জ</div><div style="font:800 118px/1 var(--font-bn-display)">+৳১৫০</div></div>`, { left: 690, top: 760, opacity: 0 });
  tl.set(troll, { opacity: 1 }, X0 - .12).fromTo(troll, { y: 1000 }, { y: 0, duration: .4, ease: 'back.out(1.5)' }, X0 - .12).to(troll, { y: 16, duration: .7, yoyo: true, repeat: 11, ease: 'sine.inOut' }, X0 + .4);
  cam(W.aim(700, 760, 1.22, 540, 960), X0 - .1, .5, 'power3.out');
  shake(X0, 40, .7); flash(X0, '#ff3d2e', .55, .6); sfx(X0, 'impact'); sfx(X0 + .02, 'alarm'); sfx(X0 + .15, 'glitch');
  tl.to(mood, { red: 1, duration: .15 }, X0).to(mood, { red: .35, duration: 1.5 }, X0 + 1).to(mood, { red: 0, duration: .6 }, T.s5 - .7);
  mitu.show('shock', X0); cMood(ct, 'shock', X0); cLook(ct, 6, -5, X0, .1); out(last, X0, { duration: .15 });
  tl.to(mitu.el, { x: 240 + 420 - 46, duration: .25, ease: 'power3.out' }, X0).to(ct, { x: 420 - 46, duration: .25, ease: 'power3.out' }, X0);
  // "সারপ্রাইজ খরচ" → interest deflates
  const sp = H(c, '<span class="red">‘সারপ্রাইজ খরচ’</span>', 250, 100); hIn(sp, V(69.56), { d: .35 }); sfx(V(69.56), 'stamp'); shake(V(69.56) + .1, 12, .3);
  cMood(ct, 'sad', V(70.6)); cLook(ct, -4, 6, V(70.6));
  tl.to(heart, { scale: .34, y: 150, x: -50, rotation: 110, filter: 'grayscale(1) brightness(.7)', duration: 1.5, ease: 'power1.inOut' }, V(71.5));
  sfx(V(71.5), 'drain', { d: 1.5 }); mitu.show('sad', V(72.2)); mitu.face(-1, V(72.2)); mitu.walk(120, V(72.25), 1.6);
  vcap(23.3, 29.2, 'শুনতে সাধারণ, কিন্তু ই-কমার্সের *সবচেয়ে বড় রহস্য* লুকিয়ে ঠিক এখানেই।');
  vcap(29.32, 32.3, 'আমরা ভাবি, পছন্দ হলেই ক্রেতা কিনে ফেলে।');
  vcap(32.36, 33.85, '*বাস্তবতা ভিন্ন!*');
  vcap(33.94, 39.7, '‘পছন্দ’ আর ‘অর্ডার কনফার্ম’-এর মাঝে লুকিয়ে আছে বিশাল এক *মনস্তাত্ত্বিক ফাঁক।*');
  vcap(39.8, 45.9, 'গবেষণা বলছে, কার্টে তোলা পণ্যের প্রায় *৭০ শতাংশই* শেষ পর্যন্ত আর কেনা হয় না!');
  vcap(45.98, 51.85, 'অর্থাৎ প্রতি ১০ জন ক্রেতার *৭ জনই* কার্ট ভর্তি করে মাঝপথ থেকে ফিরে যান।');
  vcap(51.94, 55.0, 'পছন্দ হওয়ার পরও *কেন* সিদ্ধান্ত বদলে যায়?');
  vcap(55.06, 58.5, 'সবচেয়ে বড় কারণটা চমকে দেওয়ার মতো —');
  vcap(58.66, 61.5, 'ক্রেতা পণ্যের *দামের কারণে* পিছিয়ে যান না!');
  vcap(61.62, 65.3, 'তাঁরা থমকে যান চেকআউটের একদম *শেষ ধাপে*…');
  vcap(65.44, 68.0, 'হঠাৎ ভেসে ওঠা *ডেলিভারি চার্জ* দেখে!');
  vcap(68.08, 73.5, 'মনস্তত্ত্ব বলছে: *‘সারপ্রাইজ খরচ’* দেখলেই মানুষ কেনার আগ্রহ হারিয়ে ফেলে।');
}
