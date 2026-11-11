/* EP01 · কার্টুর গল্প — a story, not a lecture: a little cart waits at checkout for a shopper who said "পরে কিনব".
 * All times are on the voice clock: V(seconds in the ElevenLabs file) → video time. 2D vector only. */
const H = (c, html, top, size, css) => E(c, 'a h', html, Object.assign({ left: 0, width: 1080, top, fontSize: size }, css));
const chip = (c, html, css, col) => E(c, 'a', `<span class="chip"${col ? ` style="border-color:${col};color:${col}"` : ''}>${html}</span>`, css);
const MV = { happy: { expr: 'happy', pose: 'hold' }, think: { expr: 'think', pose: 'think' }, shrug: { expr: 'talk', pose: 'shrug' }, shock: { expr: 'shock', pose: 'shrug' }, sad: { expr: 'think', pose: 'down' }, talk: { expr: 'happy', pose: 'talk' } };
const bubble = (html, w, fs) => `<div style="width:${w}px;padding:${fs * .3}px 0 ${fs * .22}px;border-radius:${fs * .6}px;background:var(--lime);color:#0a0c06;text-align:center;font:800 ${fs}px/1.1 var(--font-bn-display);box-shadow:0 30px 70px rgba(0,0,0,.5),0 0 90px rgba(198,255,31,.35)">${html}</div><div style="position:absolute;left:18%;bottom:-${fs * .42}px;width:${fs * .5}px;height:${fs * .5}px;border-radius:50%;background:var(--lime)"></div><div style="position:absolute;left:11%;bottom:-${fs * .8}px;width:${fs * .26}px;height:${fs * .26}px;border-radius:50%;background:var(--lime)"></div>`;
const plaque = n => `<div class="sgn" style="font-size:30px;padding:8px 16px 3px;border-width:5px;transform:rotate(4deg)">অপেক্ষা: <span class="v">${n}</span> দিন</div>`;
let S0, S1, CH, S5, S6, S7, S7b, S8;

/* ═════════ 01 · হারানো কার্টের মাঠ — the hook (0 → 8.6) ═════════ */
{
  const c = S0 = scene('s0', T.s0, T.s1, { post: .3, push: 1 }), W = world(c);
  nightSky(W, { moon: [70, 430, 190] });
  const far = W.plane(.15); hills(far, 770, [N.h1, N.h2, N.h3]);
  [[30, 640, 150], [840, 600, 200], [330, 720, 110], [600, 690, 130]].forEach(([x, y, w]) => E(far, 'a', palm(w), { left: x, top: y }));
  // rows of forgotten carts fading into the fog
  [[.3, 880, 64, 13, '#2c5a4a'], [.5, 950, 96, 9, '#3a6a56'], [.75, 1040, 140, 6, '#4a7c64']].forEach(([p, y, w, n, col], r) => {
    const pl = W.plane(p);
    for (let i = 0; i < n; i++) { const k = E(pl, 'a', cartSVG(w, { col, dark: '#1a3a2e', frame: '#7d9a8c', face: false }), { left: -70 + i * (1220 / n) + rnd(r * 9 + i) * 40, top: y - w * .9, transform: `rotate(${(rnd(i + r) - .5) * 14}deg)` }); if ((i + r) % 2) E(k, 'a', cobweb(w * .5), { left: w * .12, top: w * .14, opacity: .6 }); }
    fog(pl, 4, -100, 1180, y - 70, y + 30, '170,215,190', .22, r * 5);
  });
  const hero = W.plane(1);
  E(hero, 'a', '', { left: -300, top: 1150, width: 1700, height: 1000, background: `linear-gradient(${N.g1},${N.g2} 28%,#04140e)`, borderRadius: '50% 50% 0 0/70px 70px 0 0' }); tufts(hero, 1160, 8, -200, 1200, 2);
  E(hero, 'a', `<div style="position:absolute;left:47%;top:70px;width:16px;height:300px;background:#5a3a1e;border-radius:6px"></div><div class="sgn" style="position:relative;transform:rotate(-5deg);font-size:46px">হারানো<br>কার্টের মাঠ</div>`, { left: 36, top: 850 });
  const ct = mkCart(hero, 430, { left: 340, top: 800 }); [0, 1, 2].forEach(i => ct.add(i, i));
  E(ct, 'a', cobweb(220), { left: -14, top: 26 }); E(ct, 'a', cobweb(150), { left: 300, top: 118, transform: 'scaleX(-1)', opacity: .8 });
  const spider = E(ct, 'a', `<div style="width:3px;height:110px;background:rgba(239,233,220,.6);margin:0 auto"></div><svg width="40" height="34" viewBox="0 0 40 34" style="display:block"><path d="M8 6 L2 14 M8 14 L0 22 M32 6 L38 14 M32 14 L40 22 M10 20 L4 30 M30 20 L36 30" stroke="#0a0c06" stroke-width="3" fill="none"/><ellipse cx="20" cy="16" rx="11" ry="12" fill="#0a0c06"/><circle cx="16" cy="13" r="2" fill="#c6ff1f"/><circle cx="24" cy="13" r="2" fill="#c6ff1f"/></svg>`, { left: 6, top: 70, transformOrigin: '50% 0' });
  const days = E(ct, 'a', plaque('৪৭'), { left: 176, top: 262 });
  const tear = E(ct, 'a', '<div style="width:18px;height:26px;border-radius:50% 50% 50% 50%/35% 35% 65% 65%;background:#8fe6ff"></div>', { left: 190, top: 215, opacity: 0 });
  const fg = W.plane(1.5); E(fg, 'a', grassFG(760), { left: -160, top: 1560 }); E(fg, 'a', grassFG(700, '#05170f'), { left: 560, top: 1600, transform: 'scaleX(-1)' });
  E(fg, 'a', cobweb(360, 'rgba(239,233,220,.3)'), { left: -6, top: 214 });
  const t1 = H(c, 'একটা কার্ট <span class="lime">অপেক্ষায়</span> আছে…', 262, 84), t2 = H(c, 'আপনার সাথেও <span class="lime">হয়েছে?</span>', 262, 96);
  gsap.set($('.lid', ct), { y: 11 }); gsap.set($('.mh', ct), { opacity: 0 }); gsap.set($('.ms', ct), { opacity: 1 }); gsap.set($('.pu', ct), { x: -3, y: 5 });
  hIn(t1, 0, { op: 1, y: 24, st: .1, d: .45 });
  tl.fromTo(W.cam, W.aim(555, 1000, 1.22, 540, 1010), Object.assign(W.aim(555, 1000, 1.34, 540, 1010), { duration: 6.4, ease: 'sine.inOut' }), 0)
    .fromTo(spider, { y: -90 }, { y: 0, duration: 2.4, ease: 'sine.inOut' }, .2).to(spider, { rotation: 7, duration: 1.1, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0)
    .to(days, { rotation: 5, duration: 1.3, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 0' }, 0);
  [1.6, 3.4].forEach(b => tl.to($('.lid', ct), { y: 24, duration: .08, yoyo: true, repeat: 1 }, b));
  sfx(0, 'crickets', { d: 8.4 }); sfx(.1, 'mystery'); sfx(.3, 'creak');
  // "…কিন্তু শেষ পর্যন্ত আর কেনেননি!" — a sigh and a tear
  const A = V(3.86);
  tl.to(ct, { scaleY: .93, scaleX: 1.03, transformOrigin: '50% 100%', duration: .4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, A)
    .fromTo(tear, { opacity: 1, y: 0 }, { y: 170, opacity: 0, duration: .9, ease: 'power2.in' }, A + .5)
    .fromTo(days, { scale: 1.5 }, { scale: 1, duration: .4, ease: 'back.out(2)', immediateRender: false }, A + .2);
  cLook(ct, -6, 7, A); sfx(A, 'sad'); sfx(A + 1.3, 'plop', { p: 6 });
  // "এমন কি আপনার সাথেও হয়েছে?" — the cart looks straight at you
  const B = V(6.22);
  out(t1, B - .25); hIn(t2, B, { d: .4 });
  cMood(ct, 'shock', B); cLook(ct, 0, 0, B, .2);
  tl.to(W.cam, Object.assign(W.aim(580, 960, 1.75), { duration: 1.0, ease: 'power3.inOut' }), B).to(ct, { rotation: -5, duration: .5, ease: 'back.out(2)', transformOrigin: '50% 100%' }, B + .2);
  const q = E(hero, 'a h lime glowtxt', '?', { left: 700, top: 640, fontSize: 200 }); pop(q, B + .3, { ease: 'back.out(3)' });
  sfx(B, 'swish'); sfx(B + .3, 'bubble'); sfx(B + .5, 'ding');
  vcap(0.0, 3.8, 'অনলাইনে শপিং করতে গিয়ে *কার্টে* জিনিস তুলে রেখেছেন…');
  vcap(3.86, 6.15, 'কিন্তু শেষ পর্যন্ত আর *কেনেননি!*');
  vcap(6.22, 8.15, 'এমন কি *আপনার সাথেও* হয়েছে?');
}

/* ═════════ 02 · বাজার → চেকআউট → ‘পরে কিনব’ (8.6 → 23.6) ═════════ */
{
  const c = S1 = scene('s1', T.s1, T.s2, { pre: .12, post: .3, push: 1 }), t = T.s1, W = world(c), fr = x => W.aim(x + 285, 1176, 1.3, 540, 1230);
  zoomThru(t, S0, c, 540, 960);
  const sky = nightSky(W, { top: '#073328', bot: '#1c6a50', moon: [110, 250, 150] });
  const far = W.plane(.12, { width: 1500 }); hills(far, 770, ['#0f4a38', '#135a44', '#17694f']);
  [[60, 650, 150], [420, 690, 110], [760, 630, 180], [1130, 680, 130]].forEach(([x, y, w]) => E(far, 'a', palm(w, '#0e4434'), { left: x, top: y }));
  const mid = W.plane(.45, { width: 2200 });
  for (let i = 0; i < 9; i++) E(mid, 'a', tree(230 + (i % 3) * 50, '#0f4d3a', '#14604a'), { left: -60 + i * 250, top: 880 - (i % 3) * 50 });
  E(mid, 'a', `<svg width="2200" height="120" viewBox="0 0 2200 120"><path d="M0 20 ${Array.from({ length: 8 }, (_, i) => `Q${i * 280 + 140} 110 ${i * 280 + 280} 20`).join(' ')}" stroke="#07140f" stroke-width="4" fill="none"/>${Array.from({ length: 40 }, (_, i) => { const x = i * 55 + 20, u = (x % 280) / 280, y = 20 + 90 * (1 - Math.pow(2 * u - 1, 2)) * .5; return `<circle class="bb" cx="${x}" cy="${y + 12}" r="9" fill="${i % 3 ? '#ffe08a' : '#c6ff1f'}"/>`; }).join('')}</svg>`, { left: 0, top: 640 });
  binds.push(T2 => { if (T2 > t - .5 && T2 < T.s2 + .5) mid.querySelectorAll('.bb').forEach((b, i) => { b.style.opacity = .55 + .45 * Math.sin(T2 * 3 + i * 1.3); }); });
  const hero = W.plane(1, { width: 3200 });
  E(hero, 'a', '', { left: -300, top: 1176, width: 3700, height: 900, background: `linear-gradient(#1a7052,${N.g2} 26%,#04140e)` });
  E(hero, 'a', '', { left: -300, top: 1176, width: 3700, height: 14, background: 'rgba(198,255,31,.25)' }); tufts(hero, 1190, 26, -200, 3200, 4);
  const STL = [['#ff7a59', 'জামা ঘর', 0], ['#8f7dff', 'হেডফোন হাট', 1], ['#29c7ff', 'গ্যাজেট গলি', 2]];
  const goods = STL.map(([col, name, i], k) => { E(hero, 'a', stall(540, col, name, [0, 1, 2].map(j => `<div style="opacity:${j === 1 ? 0 : 1}">${item(i, 110)}</div>`).join('')), { left: 200 + k * 700, top: 1176 - 551 }); return E(hero, 'a', item(i, 110), { left: 200 + k * 700 + 215, top: 1176 - 551 + 300 }); });
  E(hero, 'a', gate(300, 'চেকআউট'), { left: 2370, top: 1176 - 450 });
  E(hero, 'a', '', { left: 2700, top: 700, width: 800, height: 1400, background: 'linear-gradient(90deg,rgba(4,20,14,0),#04140e 60%)' });
  const mitu = actor(hero, 150, MITU, MV, { left: 60, top: 1176 - 418 }), ct = mkCart(hero, 200, { left: 190, top: 1176 - 184 });
  const its = [0, 1, 2].map(i => { const e = ct.add(i, i); e.style.opacity = 0; return e; });
  const fg = W.plane(1.5, { width: 4200 });
  for (let i = 0; i < 8; i++) E(fg, 'a', grassFG(520 + (i % 2) * 160, i % 2 ? '#05170f' : '#061c14'), { left: -200 + i * 560, top: 1590 + (i % 3) * 30 });
  const flash0 = chip(c, 'কিছুদিন আগে…', { left: 0, width: 1080, top: 250, textAlign: 'center' }); pop(flash0, t + .15); out(flash0, t + 2.4);
  // walk past three stalls; one item per stall hops into the cart
  const X1 = 1700, X2 = 1890, w1 = 2.8;
  mitu.walk(X1, t, w1); cRoll(ct, X1, t, w1); tl.fromTo(W.cam, fr(0), Object.assign(fr(X1), { duration: w1, ease: 'none' }), t);
  [8.26, 9.32, 10.36].forEach((v, i) => {
    const at = V(v), xc = (at + .4 - t) / w1 * X1 + 190 + 60 + i * 40 - (200 + i * 700 + 215);
    tl.to(goods[i], { keyframes: [{ x: xc * .5, y: -330, rotation: 200, duration: .2, ease: 'power2.out' }, { x: xc, y: 90, rotation: 360, scale: .5, duration: .2, ease: 'power2.in' }] }, at)
      .set(goods[i], { opacity: 0 }, at + .4).set(its[i], { opacity: 1 }, at + .4);
    cHop(ct, at + .4, 26); sfx(at, 'swish'); sfx(at + .4, 'pop', { p: i * 2 });
  });
  sfx(t, 'birds', { d: 2.5 });
  // "এক ক্লিকেই কার্টে!"
  const C1 = V(11.62);
  mitu.walk(X2, t + w1, 1.5, 'power1.out'); cRoll(ct, X2, t + w1, 1.5, 'power1.out'); tl.to(W.cam, Object.assign(W.aim(2310, 1176, 1.3, 540, 1230), { duration: 2.2, ease: 'power2.out' }), t + w1);
  const badge = E(ct, 'badge', '৩', { left: 170, top: -30, transform: 'scale(1.3)' }); pop(badge, C1 + .15, { ease: 'back.out(3)' });
  cHop(ct, C1 + .1, 60); cMood(ct, 'happy', C1); sfx(C1 + .1, 'click'); sfx(C1 + .15, 'success', { soft: 1 });
  burst(hero, 190 + X1 + 160, 1040, C1 + .15, 12, ['#c6ff1f', '#efe9dc', '#ffc83d'], 170);
  // "…চেকআউটের ঠিক আগ মুহূর্তে মনে হলো…"
  const D1 = V(13.02);
  cLook(ct, 5, -1, D1); mitu.show('think', D1 + .9);
  tl.to(W.cam, Object.assign(W.aim(2310, 1176, 1.42, 540, 1230), { duration: 3.2, ease: 'sine.inOut' }), D1 + .3);
  const sweat = E(hero, 'a', '<div style="width:20px;height:30px;border-radius:50% 50% 50% 50%/35% 35% 65% 65%;background:#8fe6ff"></div>', { left: 60 + X2 + 128, top: 1176 - 330, opacity: 0 });
  tl.fromTo(sweat, { opacity: 1, y: 0 }, { y: 60, opacity: 0, duration: .9, ease: 'power1.in', repeat: 2 }, D1 + 1.4);
  [0, 1, 2, 3, 4].forEach(i => sfx(D1 + 1 + i * .55, 'clock', { p: i % 2 }));
  cHop(ct, D1 + 1.6, 16); cHop(ct, D1 + 2.5, 16);
  // ‘থাক, পরে কিনব!’
  const E1 = V(16.88);
  const bub = E(c, 'a', bubble('থাক,<br>পরে কিনব!', 640, 116), { left: 150, top: 270 });
  tl.fromTo(bub, { opacity: 0, scale: .2, transformOrigin: '20% 120%', rotation: -14 }, { opacity: 1, scale: 1, rotation: -3, duration: .45, ease: 'back.out(2.2)' }, E1);
  mitu.show('shrug', E1 + .1); cMood(ct, 'shock', E1 + .5); cLook(ct, -7, -2, E1 + .5); sfx(E1, 'bubble'); sfx(E1 + .5, 'deny');
  tl.to(bub, { scale: 0, opacity: 0, duration: .3, ease: 'back.in(2)' }, E1 + 1.9);
  mitu.show('sad', E1 + 2.0); mitu.face(-1, E1 + 2.0); mitu.walk(X2 - 900, E1 + 2.05, 2.6);
  cMood(ct, 'sad', E1 + 2.3); tl.to(badge, { opacity: 0, duration: .3 }, E1 + 2.3);
  // "আর সেই ‘পরে’ যে কবে আসে…" — days fly by
  const F1 = V(19.2);
  const wheel = E(sky, 'a', `<div style="position:absolute;left:50%;top:-80px;width:150px;height:150px;margin-left:-75px;border-radius:50%;background:radial-gradient(circle,#fff6b0,#ffd84a 60%,#ffb800);box-shadow:0 0 120px 40px rgba(255,216,74,.45)"></div><div style="position:absolute;left:50%;bottom:-70px;width:130px;height:130px;margin-left:-65px;border-radius:50%;background:${N.moon};box-shadow:0 0 80px 20px rgba(198,255,31,.25)"></div>`, { left: 150 + 140, top: 150 + 420, width: 800, height: 800, opacity: 0 });
  const day = E(sky, 'a', '', { left: 0, top: 0, width: 1380, height: 2220, background: 'linear-gradient(#3aa37a,#9fd6b0 70%)', opacity: 0 });
  tl.to($('.moon', sky), { opacity: 0, duration: .3 }, F1 + .2).to(wheel, { opacity: 1, duration: .3 }, F1 + .2)
    .fromTo(wheel, { rotation: 180 }, { rotation: 180 + 360 * 4, duration: 3.7, ease: 'power1.inOut' }, F1 + .2)
    .fromTo(day, { opacity: 0 }, { opacity: .8, duration: 3.7 / 8, yoyo: true, repeat: 7, ease: 'sine.inOut' }, F1 + .2)
    .to(W.cam, Object.assign(W.aim(2190, 1070, 1.9, 540, 900), { duration: 3.6, ease: 'sine.inOut' }), F1 + .3);
  const pq = E(ct, 'a', plaque('০'), { left: 62, top: 120 }); pop(pq, F1 + .4, { ease: 'back.out(2)' });
  counter($('.v', pq), 0, 47, F1 + .6, 3.2, v => bn(Math.round(v)), 'power1.in');
  const wb = E(ct, 'a', cobweb(105), { left: -8, top: 12 }), wb2 = E(ct, 'a', cobweb(70), { left: 140, top: 56, transform: 'scaleX(-1)' });
  tl.fromTo([wb, wb2], { opacity: 0, scale: .2, transformOrigin: '0 0' }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power1.out', stagger: .5 }, F1 + 1.5);
  cMood(ct, 'sleepy', F1 + 2.6); cLook(ct, -3, 6, F1 + 2.6, .6);
  sfx(F1 + .2, 'windup', { d: 3.4 }); sfx(F1 + .6, 'count', { d: 3.2, soft: 1 }); sfx(F1 + 3.8, 'thud');
  vcap(8.26, 11.5, 'পছন্দের জামা, নতুন হেডফোন, দরকারি গ্যাজেট —');
  vcap(11.62, 12.95, 'এক ক্লিকেই *কার্টে!*');
  vcap(13.02, 16.7, 'কিন্তু চেকআউটের ঠিক *আগ মুহূর্তে* মনে হলো…');
  vcap(16.88, 19.1, '*‘থাক, পরে কিনব!’*');
  vcap(19.2, 23.2, 'আর সেই *‘পরে’* যে কবে আসে, তা আমরা কেউই জানি না।');
}
