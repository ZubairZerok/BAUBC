/* EP01 scenes, second half — reviews · three factors · the lesson · CTA · logo outro */

/* ═════════ 06 · REVIEWS  52.8 → 62.4 ═════════ */
{
  const c = scene('s5', T.s5, T.s6), t = T.s5;
  tl.to(mood, { gold: 0.75, duration: 0.5 }, t).to(mood, { gold: 0, duration: 0.5 }, T.s6 - 0.3);
  const NAMES = ['তানভীর', 'নুসরাত', 'রাফি', 'মীম', 'সাকিব', 'অর্পা', 'ইমন', 'তৃষা'];
  const TXT = ['দারুণ প্রোডাক্ট!', 'ডেলিভারি দেরি হয়েছে', 'দামে ঠিকঠাক', 'একদম ছবির মতো', 'প্যাকেজিং ভালো', 'আবার কিনব', 'সাইজ মেলেনি', 'কোয়ালিটি সেরা'];
  const stars = (n, s = 34) => Array.from({ length: 5 }, (_, i) => ico('star', s, '#ffc83d', 2, i < n ? '#ffc83d' : 'none')).join('');
  const rcard = (i) => `<div class="card" style="width:480px;height:216px;margin-bottom:26px;padding:26px 30px;border-radius:32px"><div style="display:flex;gap:18px;align-items:center"><div style="width:64px;height:64px;border-radius:50%;background:${ITEMS[i % 3][3]};display:grid;place-items:center;font:800 34px/1 var(--font-bn-display);color:#0a0c06">${NAMES[i % 8][0]}</div><div><div style="font:700 32px/1.1 var(--font-bn-body)">${NAMES[i % 8]}</div><div style="display:flex;gap:3px;margin-top:6px">${stars(5 - (i * 3) % 4 % 3)}</div></div></div><div style="font:600 34px/1.2 var(--font-bn-body);color:var(--cream-dim);margin-top:20px">${TXT[i % 8]}</div></div>`;
  const wall = E(c, 'a', '', { left: -60, top: 60, width: 1200, height: 1500, transform: 'rotate(-7deg)', opacity: .4 });
  const colA = E(wall, 'a', Array.from({ length: 9 }, (_, i) => rcard(i)).join(''), { left: 70, top: 0 });
  const colB = E(wall, 'a', Array.from({ length: 9 }, (_, i) => rcard(i + 4)).join(''), { left: 600, top: -500 });
  tl.fromTo(colA, { y: 0 }, { y: -720, duration: 9.6, ease: 'none' }, t).fromTo(colB, { y: 0 }, { y: 640, duration: 9.6, ease: 'none' }, t);
  const shade = E(c, 'a', '', { inset: 0, background: 'radial-gradient(ellipse 62% 36% at 50% 41%,rgba(7,8,6,.96) 40%,rgba(7,8,6,.2) 100%)' });
  const top = E(c, 'a', `<span class="pill" style="border-color:var(--gold);color:var(--gold);background:rgba(20,16,4,.85);font-size:44px;padding:16px 40px 12px">${ico('bolt', 40, '#ffc83d', 2.4)} আরেকটি অবাক করা তথ্য</span>`, { left: 0, width: 1080, top: 250, textAlign: 'center' });
  const hero = E(c, 'a', `<div class="num" style="text-align:center;font:800 400px/1 var(--font-bn-display);color:var(--gold);letter-spacing:-.03em;text-shadow:0 0 100px rgba(255,200,61,.55)"><span class="v">০</span><span style="font-size:190px;color:var(--cream)">%</span></div>
    <div class="h" style="font-size:92px;margin-top:-26px">ক্রেতা আগে <span style="color:var(--gold)">রিভিউ</span> পড়েন</div>
    <div class="st" style="display:flex;justify-content:center;gap:22px;margin-top:40px">${Array.from({ length: 5 }, () => `<div>${ico('star', 132, '#ffc83d', 1.6, '#ffc83d')}</div>`).join('')}</div>`, { left: 0, width: 1080, top: 390 });
  const n = { v: 0 }, nv = $('.v', hero); binds.push(() => { nv.textContent = bn(Math.round(n.v)); });
  pop(top, t + 0.25); sfx(t + 0.25, 'swish');
  tl.fromTo($('.num', hero), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, t + 1.9)
    .to(n, { v: 99, duration: 1.3, ease: 'power2.out' }, t + 2.0)
    .fromTo($('.num', hero), { scale: 1 }, { scale: 1.1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, t + 3.3);
  sfx(t + 1.9, 'impact', { soft: 1 }); sfx(t + 2.0, 'count', { d: 1.3 }); sfx(t + 3.3, 'boom');
  hIn($('.h', hero), t + 3.5);
  [...$('.st', hero).children].forEach((s, i) => { tl.fromTo(s, { opacity: 0, scale: 0, rotation: -140 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.6)' }, t + 4.3 + i * 0.2); sfx(t + 4.3 + i * 0.2, 'star', { p: i }); });
  // spotlight review
  tl.to(hero, { scale: 0.62, y: -150, duration: 0.6, ease: 'power3.inOut', transformOrigin: '50% 0%' }, t + 5.9).to(top, { opacity: 0, y: -60, duration: 0.3 }, t + 5.9);
  const spot = E(c, 'a card', `<div style="display:flex;gap:26px;align-items:center"><div style="width:120px;height:120px;border-radius:50%;background:#8f7dff;display:grid;place-items:center;font:800 64px/1 var(--font-bn-display);color:#0a0c06">ন</div><div><div style="font:700 50px/1.1 var(--font-bn-body)">নুসরাত <span style="font-size:30px;color:var(--lime)">✓ ভেরিফায়েড ক্রেতা</span></div><div style="display:flex;gap:6px;margin-top:10px">${stars(5, 56)}</div></div></div>
    <div style="font:700 58px/1.3 var(--font-bn-body);margin-top:30px">“ছবির মতোই পেয়েছি, ডেলিভারিও দ্রুত!”</div>
    <div style="display:flex;gap:14px;align-items:center;margin-top:26px;font:600 36px/1 var(--font-bn-body);color:var(--cream-dim)">${ico('eye', 46, '#ffc83d', 2.2)} <span>কেনার আগে পড়েছেন <b class="rd" style="color:var(--gold)">০</b> জন</span></div>`, { left: 70, top: 830, width: 940, height: 440, padding: '44px 48px', borderColor: 'rgba(255,200,61,.6)', boxShadow: '0 50px 120px rgba(0,0,0,.7),0 0 90px rgba(255,200,61,.25)' });
  const rd = { v: 0 }, rdE = $('.rd', spot); binds.push(() => { rdE.textContent = bn(Math.round(rd.v).toLocaleString('en-US')); });
  tl.fromTo(spot, { opacity: 0, y: 500, rotationX: -40, rotation: 6 }, { opacity: 1, y: 0, rotationX: 0, rotation: -2, duration: 0.6, ease: 'back.out(1.4)' }, t + 6.1)
    .to(rd, { v: 1284, duration: 2.6, ease: 'power1.out' }, t + 6.5).to(spot, { rotation: 1.5, duration: 2.6, ease: 'sine.inOut' }, t + 6.7);
  sfx(t + 6.1, 'whoosh'); sfx(t + 6.5, 'count', { d: 2.2, soft: 1 });
  cap(52.95, 54.6, 'সাথে আছে আরেকটি *অবাক করা* তথ্য…');
  cap(54.75, 58.6, 'প্রায় *৯৯ শতাংশ* অনলাইন ক্রেতা যেকোনো কিছু কেনার আগে…');
  cap(58.75, 62.3, '…অন্যদের *রিভিউ* পড়েন!');
  wipe(T.s6, 'up');
}

/* ═════════ 07 · THREE FACTORS  62.4 → 72 ═════════ */
{
  const c = scene('s6', T.s6, T.s7), t = T.s6;
  E(c, 'a ghost', '3 SEC', { left: -40, top: 1080, fontSize: 330 });
  const F = [['tag', 'দাম', '#c6ff1f'], ['truck', 'ডেলিভারি<br>চার্জ', '#ff3d2e'], ['star', 'রিভিউ', '#ffc83d']];
  const cards = F.map((f, i) => E(c, 'a card', `<div style="position:absolute;left:24px;top:18px;font:900 44px/1 var(--font-en-display);color:${f[2]}">0${i + 1}</div><div style="display:grid;place-items:center;height:100%;padding-top:30px"><div style="filter:drop-shadow(0 0 26px ${f[2]})">${ico(f[0], 150, f[2], 1.8)}</div><div style="font:800 62px/1.05 var(--font-bn-display);text-align:center;margin-top:-34px;height:130px;display:grid;place-items:center">${f[1]}</div></div>`, { left: 36 + i * 342, top: 262, width: 324, height: 400, borderColor: f[2] }));
  cards.forEach((cd, i) => {
    const at = t + 0.2 + i * 0.75;
    tl.fromTo(cd, { opacity: 0, x: (1 - i) * 342, y: 330, scale: 2.2, rotation: (i - 1) * 14 + 8 }, { opacity: 1, scale: 2.2, rotation: 0, duration: 0.3, ease: 'back.out(1.6)' }, at)
      .to(cd, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power3.inOut' }, at + 0.42);
    sfx(at, 'pop', { p: i }); sfx(at + 0.45, 'swish');
  });
  // beams → decision switch
  const beams = E(c, 'a', `<svg width="1080" height="400" viewBox="0 0 1080 400">${[198, 540, 882].map((x, i) => `<path class="bm" d="M${x} 0 C ${x} 150, 540 110, 540 300" fill="none" stroke="${F[i][2]}" stroke-width="7" stroke-linecap="round" stroke-dasharray="12 16" pathLength="100"/>`).join('')}</svg>`, { left: 0, top: 668 });
  const sw = E(c, 'a', `<div class="trk" style="width:640px;height:230px;border-radius:120px;background:#16240a;border:6px solid var(--lime);box-shadow:0 0 90px rgba(198,255,31,.35),inset 0 10px 30px rgba(0,0,0,.6);position:relative">
      <div class="lb" style="position:absolute;left:0;right:210px;top:0;bottom:0;display:grid;place-items:center;font:800 92px/1 var(--font-bn-display);color:var(--lime)">কিনব ✓</div>
      <div class="lr" style="position:absolute;left:210px;right:0;top:0;bottom:0;display:grid;place-items:center;font:800 84px/1 var(--font-bn-display);color:var(--danger);opacity:0">কিনব না ✕</div>
      <div class="kn" style="position:absolute;left:426px;top:14px;width:190px;height:190px;border-radius:50%;background:var(--lime);box-shadow:0 10px 30px rgba(0,0,0,.6)"></div></div>`, { left: 220, top: 950 });
  const lblS = E(c, 'a', '<span class="pill" style="font-size:38px">আপনার সিদ্ধান্ত</span>', { left: 0, width: 1080, top: 858, textAlign: 'center' });
  const timer = E(c, 'a', `<div style="display:flex;align-items:center;justify-content:center;gap:24px;font:800 104px/1 var(--font-bn-display)">${ico('clock', 96, '#efe9dc', 2)}<span class="tm">০৩</span><span style="font-size:60px;color:var(--cream-dim)">সেকেন্ড</span></div>`, { left: 0, width: 1080, top: 1210 });
  const tm = $('.tm', timer), kn = $('.kn', sw), trk = $('.trk', sw);
  tl.set(beams.querySelectorAll('.bm'), { opacity: 0 }, 0);
  pop(lblS, t + 2.5); pop(sw, t + 2.6, { ease: 'back.out(1.5)' }); sfx(t + 2.6, 'whoosh');
  [...beams.querySelectorAll('.bm')].forEach((b, i) => {
    const at = t + 4.2 + i * 0.4;
    tl.set(b, { opacity: 1 }, at).fromTo(b, { strokeDashoffset: 0 }, { strokeDashoffset: -300, duration: 5.4 - i * 0.4, ease: 'none' }, at)
      .to(cards[i], { y: 18, duration: 0.1, yoyo: true, repeat: 1 }, at).to(kn, { x: -40 - i * 20, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, at + 0.1);
    sfx(at, 'zap', { p: i });
  });
  pop(timer, t + 3.2);
  [3, 2, 1, 0].forEach((v, i) => { const at = t + 5.6 + i * 0.65; tl.set(tm, { innerHTML: '০' + bn(v), color: v ? '#efe9dc' : '#ff3d2e' }, at).fromTo(tm, { scale: 1.5 }, { scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: false }, at); sfx(at, v ? 'clock' : 'alarm', { p: i }); });
  const X = t + 5.6 + 3 * 0.65;      // flip!
  tl.to(kn, { x: -412, background: '#ff3d2e', duration: 0.3, ease: 'back.out(1.6)' }, X)
    .to(trk, { background: '#2a0c08', borderColor: '#ff3d2e', boxShadow: '0 0 110px rgba(255,61,46,.55),inset 0 10px 30px rgba(0,0,0,.6)', duration: 0.2 }, X)
    .to($('.lb', sw), { opacity: 0, duration: 0.12 }, X).to($('.lr', sw), { opacity: 1, duration: 0.12 }, X + 0.1)
    .to(mood, { red: 0.8, duration: 0.2 }, X).to(mood, { red: 0, duration: 0.6 }, T.s7 - 0.6);
  shake(X + 0.05, 24, 0.5); flash(X + 0.05, '#ff3d2e', 0.45, 0.5); sfx(X, 'switch'); sfx(X + 0.05, 'boom');
  cap(62.55, 66.4, '*পণ্যের দাম, ডেলিভারি চার্জ* আর ক্রেতাদের *রিভিউ* — এই তিনটি ফ্যাক্টর…');
  cap(66.55, 71.9, '…মাত্র *কয়েক সেকেন্ডের* মধ্যে আপনার কেনার সিদ্ধান্ত পুরোপুরি বদলে দিতে পারে!');
  wipe(T.s7, 'left');
}

/* ═════════ 08 · THE LESSON  72 → 81.6 ═════════ */
{
  const c = scene('s7', T.s7, T.s8), t = T.s7;
  E(c, 'a ghost', 'LESSON', { left: -40, top: 1090, fontSize: 280 });
  const top = E(c, 'a', `<span class="pill" style="font-size:46px;padding:16px 42px 12px">${ico('bolt', 42, '#c6ff1f', 2.4)} সবচেয়ে বড় লেসন</span>`, { left: 0, width: 1080, top: 250, textAlign: 'center' });
  const shelf = E(c, 'a', `<div style="position:absolute;left:0;right:0;bottom:0;height:16px;border-radius:8px;background:linear-gradient(90deg,transparent,#efe9dc 15%,#efe9dc 85%,transparent)"></div>`, { left: 110, top: 420, width: 860, height: 330 });
  const prods = [0, 1, 2].map(i => chip(shelf, i, 230, { left: 40 + i * 275, top: 66 }));
  const spark = [[60, 20], [330, -20], [560, 30], [800, 0], [230, 190], [720, 200]].map(([x, y], i) => E(shelf, 'a en', '✦', { left: x, top: y, fontSize: 50 + (i % 3) * 22, color: '#fff' }));
  const price0 = E(c, 'a', `<span class="pill" style="border-color:var(--danger);color:var(--danger);background:rgba(40,8,4,.9);font-size:56px;padding:18px 44px 12px">আজকের বিক্রি: <b>&nbsp;৳০</b></span>`, { left: 0, width: 1080, top: 700, textAlign: 'center' });
  const l1 = E(c, 'a h', 'শুধু পণ্য সাজালেই', { left: 0, width: 1080, top: 850, fontSize: 122 });
  const l2 = E(c, 'a h', '<span class="red">বিক্রি হয় না</span>', { left: 0, width: 1080, top: 1010, fontSize: 190 });
  pop(top, t + 0.2);
  tl.fromTo(shelf, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.4 }, t + 0.3);
  prods.forEach((p, i) => { tl.fromTo(p, { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, t + 0.4 + i * 0.16); sfx(t + 0.62 + i * 0.16, 'pop', { p: i }); });
  spark.forEach((s, i) => tl.fromTo(s, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: 0.45, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 0.9 + i * 0.13));
  sfx(t + 0.95, 'shine');
  hIn(l1, t + 1.2); hIn(l2, t + 1.9, { d: 0.4 }); sfx(t + 2.05, 'stamp'); shake(t + 2.1, 16, 0.35);
  tl.fromTo(price0, { opacity: 0, scale: 2.4, rotation: -10 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.25, ease: 'power3.in' }, t + 2.5); sfx(t + 2.72, 'deny');
  tl.to(prods, { filter: 'grayscale(1) brightness(.6)', duration: 0.4 }, t + 2.1);
  out([shelf, price0, l1, l2], t + 3.75, { stagger: 0.04 });
  // the fix — easy · fast · transparent
  const hh = E(c, 'a h', 'জিতবে <span class="lime">চেকআউট অভিজ্ঞতা</span>', { left: 0, width: 1080, top: 366, fontSize: 78 });
  const N = [['check', 'সহজ'], ['bolt', 'দ্রুত'], ['eye', 'স্বচ্ছ']];
  const path = E(c, 'a', `<svg width="1080" height="60"><path d="M170 30H910" stroke="rgba(239,233,220,.18)" stroke-width="10" stroke-linecap="round"/><path class="pl" d="M170 30H910" stroke="#c6ff1f" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" style="filter:drop-shadow(0 0 14px #c6ff1f)"/></svg>`, { left: 0, top: 620 });
  const nodes = N.map((nd, i) => E(c, 'a', `<div class="nc" style="width:230px;height:230px;border-radius:50%;background:#12160b;border:6px solid #3a442a;display:grid;place-items:center;color:#5c6a44">${ico(nd[0], 120, 'currentColor', 2.2)}</div><div class="h" style="font-size:88px;margin-top:22px;width:230px;color:#5c6a44">${nd[1]}</div>`, { left: 55 + i * 370, top: 535 }));
  const win = E(c, 'a', `<div style="height:100%;border-radius:50px;background:var(--lime);color:#0a0c06;display:flex;align-items:center;justify-content:center;gap:26px;font:800 96px/1 var(--font-bn-display);box-shadow:0 0 130px rgba(198,255,31,.6)">${ico('check', 110, '#0a0c06', 3.4)}অর্ডার কনফার্মড</div>`, { left: 80, top: 950, width: 920, height: 190 });
  const adv = E(c, 'a h', '= সবচেয়ে বড় <span class="lime">প্রতিযোগিতামূলক সুবিধা</span>', { left: 0, width: 1080, top: 1184, fontSize: 57 });
  hIn(hh, t + 4.0); sfx(t + 4.0, 'whoosh');
  tl.fromTo([path, ...nodes], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, t + 4.1);
  tl.to($('.pl', path), { strokeDashoffset: 0, duration: 1.5, ease: 'none' }, t + 4.5);
  nodes.forEach((nd, i) => {
    const at = t + 4.55 + i * 0.7;
    tl.to($('.nc', nd), { borderColor: '#c6ff1f', color: '#0a0c06', background: '#c6ff1f', boxShadow: '0 0 80px rgba(198,255,31,.6)', duration: 0.15 }, at)
      .to($('.h', nd), { color: '#efe9dc', duration: 0.15 }, at).fromTo(nd, { scale: 1 }, { scale: 1.22, duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, at);
    sfx(at, 'star', { p: i + 1 });
  });
  const W = t + 6.75;
  tl.fromTo(win, { opacity: 0, scale: 0.3, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, W);
  flash(W + 0.05, '#c6ff1f', 0.5, 0.6); sfx(W, 'success');
  for (let i = 0; i < 26; i++) {
    const k = E(c, 'a', '', { left: 540, top: 1040, width: 14 + (i % 3) * 8, height: 14 + (i % 4) * 6, background: ['#c6ff1f', '#efe9dc', '#ffc83d', '#29c7ff'][i % 4], borderRadius: i % 2 ? '50%' : '3px' });
    const a = rnd(i + 40) * 6.283, d = 300 + rnd(i + 80) * 520;
    tl.fromTo(k, { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7 - 120, rotation: rnd(i) * 720, duration: 0.9, ease: 'power3.out' }, W + 0.05)
      .to(k, { y: '+=420', opacity: 0, duration: 1.4, ease: 'power1.in' }, W + 0.95);
  }
  hIn(adv, W + 0.6, { st: 0.07 });
  tl.to(win, { scale: 1.04, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W + 0.6);
  cap(72.15, 75.75, 'তাই সবচেয়ে বড় লেসন: শুধু আকর্ষণীয় পণ্য সাজিয়ে রাখলেই *বিক্রি হয় না।*');
  cap(75.9, 81.5, 'চেকআউটের অভিজ্ঞতা *সহজ, দ্রুত* আর *স্বচ্ছ* করাই হয়ে ওঠে সবচেয়ে বড় প্রতিযোগিতামূলক সুবিধা।');
  wipe(T.s8, 'down');
}

/* ═════════ 09 · YOUR TURN  81.6 → 91.2 ═════════ */
{
  const c = scene('s8', T.s8, T.s9), t = T.s8;
  E(c, 'a ghost', 'YOU?', { left: -30, top: 1090, fontSize: 380 });
  const h1 = E(c, 'a h', '<span class="lime">এবার আপনার পালা!</span>', { left: 0, width: 1080, top: 250, fontSize: 106 });
  const h2 = E(c, 'a h', 'সবচেয়ে বেশি কোথায় আটকে যান?', { left: 0, width: 1080, top: 408, fontSize: 66 });
  const O = [['truck', 'ডেলিভারি চার্জ', '#ff3d2e', 'ক'], ['star', 'রিভিউ', '#ffc83d', 'খ'], ['clock', '‘পরে কিনব’ ভেবে ভুলে যাওয়া', '#c6ff1f', 'গ']];
  const opts = O.map((o, i) => E(c, 'a card', `<div class="fill" style="position:absolute;inset:0;border-radius:34px;background:${o[2]};opacity:0"></div><div style="position:relative;display:flex;align-items:center;gap:28px;height:100%;padding:0 34px"><div style="width:110px;height:110px;border-radius:30px;background:${o[2]};color:#0a0c06;display:grid;place-items:center;font:800 76px/1 var(--font-bn-display);flex:none">${o[3]}</div><div class="tx" style="font:800 ${i === 2 ? 52 : 70}px/1.1 var(--font-bn-display);flex:1">${o[1]}</div><div class="ic" style="color:${o[2]}">${ico(o[0], 96, 'currentColor', 2)}</div></div>`, { left: 70, top: 530 + i * 186, width: 940, height: 164, borderColor: o[2] }));
  hIn(h1, t + 0.15, { d: 0.45 }); sfx(t + 0.15, 'success', { soft: 1 });
  hIn(h2, t + 1.0, { st: 0.07 });
  opts.forEach((o, i) => { const at = t + 1.7 + i * 0.5; tl.fromTo(o, { opacity: 0, x: (i % 2 ? 1 : -1) * 700, rotation: (i % 2 ? 8 : -8) }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.5)' }, at); sfx(at, 'swish'); sfx(at + 0.3, 'pop', { p: i }); });
  // poll selector hopping
  const hop = [0, 1, 2, 1, 0, 2, 1, 0, 2, 0, 1, 2, 1, 2];
  hop.forEach((idx, j) => {
    const at = t + 3.6 + j * 0.48, o = opts[idx];
    tl.to($('.fill', o), { opacity: 1, duration: 0.08 }, at).to($('.fill', o), { opacity: 0, duration: 0.2 }, at + 0.4)
      .to([$('.tx', o), $('.ic', o)], { color: '#0a0c06', duration: 0.08 }, at).to($('.tx', o), { color: '#efe9dc', duration: 0.2 }, at + 0.4).to($('.ic', o), { color: O[idx][2], duration: 0.2 }, at + 0.4)
      .fromTo(o, { scale: 1 }, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, at);
    sfx(at, 'tick', { p: idx * 2 });
  });
  const cm = E(c, 'a', `<div style="display:flex;align-items:center;justify-content:center;gap:26px;height:100%;border-radius:50px;background:var(--lime);color:#0a0c06;font:800 96px/1 var(--font-bn-display);box-shadow:0 0 120px rgba(198,255,31,.55)">${ico('chat', 110, '#0a0c06', 2.4)}কমেন্টে জানান</div>`, { left: 110, top: 1112, width: 860, height: 164 });
  const arrows = [0, 1, 2].map(i => E(c, 'a', `<svg width="90" height="60" viewBox="0 0 90 60"><path d="M8 8l37 40L82 8" fill="none" stroke="#c6ff1f" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`, { left: 495, top: 1560 + i * 56, opacity: 0 }));
  tl.fromTo(cm, { opacity: 0, scale: 0.2, y: 200 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2)' }, t + 6.9);
  sfx(t + 6.9, 'bubble'); sfx(t + 7.2, 'ding');
  tl.to(cm, { scale: 1.05, rotation: -1.5, duration: 0.4, yoyo: true, repeat: 4, ease: 'sine.inOut' }, t + 7.5);
  arrows.forEach((a, i) => tl.fromTo(a, { opacity: 0, y: -30 }, { opacity: 1 - i * 0.28, y: 0, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 7.3 + i * 0.12));
  cap(81.75, 84.4, '*এবার আপনার পালা!* অনলাইনে শপিং করতে গিয়ে আপনি সবচেয়ে বেশি কোনটায় আটকে যান?');
  cap(84.55, 88.4, 'ডেলিভারি চার্জ, রিভিউ, নাকি শুধু *‘পরে কিনব’* ভেবে ভুলে যাওয়া?');
  cap(88.55, 91.0, '*কমেন্টে* আপনার অভিজ্ঞতা জানান!');
  sfx(T.s9 - 1.2, 'riser', { d: 1.2 });
  wipe(T.s9, 'up');
}

/* ═════════ 10 · LOGO OUTRO  91.2 → 97.2  (built after fonts load: the logo measures glyphs) ═════════ */
window.__afterFonts = () => {
  const c = scene('s9', T.s9, T.end + 1), t = T.s9;
  tl.to(['#segs', '#hudL', '#hudR'], { opacity: 0, duration: 0.2 }, t - 0.2).to(mood, { dim: 0.3, energy: 0.6, duration: 0.3 }, t);
  const Y0 = 640;
  const rings = [0, 1, 2].map(i => E(c, 'a', '', { left: 540 - 430 - i * 110, top: Y0 + 170 - 430 - i * 110, width: 860 + i * 220, height: 860 + i * 220, borderRadius: '50%', border: `2px dashed rgba(239,233,220,${0.16 - i * 0.04})` }));
  rings.forEach((r, i) => tl.fromTo(r, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }, t + 1.1 + i * 0.1).to(r, { rotation: (i % 2 ? -1 : 1) * 40, duration: 6, ease: 'none' }, t));
  const corners = [[70, 236, 0], [1010, 236, 90], [1010, 1600, 180], [70, 1600, 270]].map(([x, y, r]) => E(c, 'a', '', { left: x, top: y, width: 0, height: 0, transform: `rotate(${r}deg)` })).map(k => E(k, 'a', '', { left: 0, top: 0, width: 90, height: 90, borderLeft: '5px solid var(--lime)', borderTop: '5px solid var(--lime)', opacity: .7 }));
  tl.fromTo(corners, { scale: 0, opacity: 0, transformOrigin: '0 0' }, { scale: 1, opacity: .7, duration: 0.5, ease: 'back.out(2)', stagger: 0.06 }, t + 2.6);
  const holder = E(c, 'a', '', { left: 90, top: Y0 });
  const logo = buildCaseStudiesLogo(holder, { width: 900 });
  tl.add(logo.timeline, t + 0.35);
  logo.cues.forEach(q => sfx(t + 0.35 + q.t, 'logo_' + q.name));
  const y = Y0 + logo.height;
  const rule = E(c, 'a', '', { left: 340, top: y + 70, width: 400, height: 4, background: 'var(--lime)', borderRadius: 4 });
  const by = E(c, 'a en', 'A BAUBC SERIES', { left: 0, width: 1080, top: y + 104, textAlign: 'center', fontWeight: 700, fontSize: 34, letterSpacing: '.5em', color: 'var(--lime)', textIndent: '.5em' });
  const full = E(c, 'a en', 'BANGLADESH AGRICULTURAL UNIVERSITY BUSINESS CLUB', { left: 0, width: 1080, top: y + 170, textAlign: 'center', fontWeight: 500, fontSize: 19, letterSpacing: '.24em', color: 'var(--cream-dim)' });
  const ep = E(c, 'a', '<span class="pill" style="font-size:36px">এপিসোড ০১ · কার্ট রহস্য</span>', { left: 0, width: 1080, top: Y0 - 190, textAlign: 'center' });
  const fol = E(c, 'a h', 'ফলো করুন — পরের কেস স্টাডি আসছে', { left: 0, width: 1080, top: y + 290, fontSize: 52, fontWeight: 700, color: 'var(--cream)' });
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, t + 2.9)
    .fromTo(by, { opacity: 0, letterSpacing: '1.5em' }, { opacity: 1, letterSpacing: '.5em', duration: 0.8, ease: 'expo.out' }, t + 3.0)
    .fromTo(full, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, t + 3.3)
    .fromTo(ep, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 3.2);
  hIn(fol, t + 3.8, { st: 0.06, d: 0.4 });
};
