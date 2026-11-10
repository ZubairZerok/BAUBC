/* EP01 scenes — "কার্ট রহস্য: ৭০% কেন ফিরে যায়?"
 * Each block = one chapter. Times are absolute seconds on the master timeline (see T in core.js).
 * sfx(t, name) drops a sound cue that audio/build_audio.py turns into the mix. */
const ITEMS = [['shirt', 'জামা', '৳৮৫০', '#ff7a59', 850], ['phones', 'হেডফোন', '৳১,২০০', '#8f7dff', 1200], ['watch', 'স্মার্ট গ্যাজেট', '৳৬৫০', '#29c7ff', 650]];
const chip = (parent, i, size, css) => E(parent, 'a', `<div style="width:${size}px;height:${size}px;border-radius:${size * 0.26}px;background:${ITEMS[i][3]};display:grid;place-items:center;box-shadow:0 18px 40px rgba(0,0,0,.5),inset 0 -8px 0 rgba(0,0,0,.18)">${ico(ITEMS[i][0], size * 0.6, '#0a0c06', 2.2)}</div>`, css);
const money = v => '৳' + bn(Math.round(v).toLocaleString('en-US'));

/* ═════════ 01 · HOOK  0 → 7.2 ═════════ */
{
  const c = scene('s0', T.s0, T.s1), t = T.s0;
  E(c, 'a ghost', 'CART', { left: -40, top: 1040, fontSize: 400 });
  const tagTop = E(c, 'a', `<span class="pill">${ico('search', 34, '#c6ff1f', 2.6)} কেস স্টাডি #০১</span>`, { left: 0, width: 1080, top: 236, textAlign: 'center' });
  const h1 = E(c, 'a h', 'কার্টে তুললেন…', { left: 0, width: 1080, top: 330, fontSize: 156 });
  const h2 = E(c, 'a h', 'কিন্তু <span class="red">কিনলেন না!</span>', { left: 0, width: 1080, top: 340, fontSize: 138 });
  const cart = E(c, 'a glow', ico('cart', 560, '#c6ff1f', 1.5), { left: 250, top: 600 });
  const chips = [0, 1, 2].map(i => chip(cart, i, 130, { left: 150 + i * 96, top: 150 - (i % 2) * 34 }));
  const badge = E(cart, 'badge', '০', { left: 420, top: 96, transform: 'scale(1.5)', opacity: 0 });
  const btn = E(c, 'a', '<div style="width:600px;height:128px;border-radius:40px;background:var(--lime);color:#0a0c06;display:grid;place-items:center;font:800 54px/1 var(--font-bn-display);box-shadow:0 0 70px rgba(198,255,31,.45)">অর্ডার কনফার্ম করুন</div>', { left: 240, top: 1150 });
  const cur = E(c, 'a', CURSOR(110), { left: 720, top: 1210 });
  const q = E(c, 'a h', 'আপনার সাথেও<br><span class="lime">হয়েছে?</span>', { left: 0, width: 1080, top: 410, fontSize: 150, lineHeight: 1.2 });
  const qm = [0, 1, 2, 3, 4, 5].map(i => E(c, 'a en', '?', { left: 60 + (i % 3) * 400 + (i > 2 ? 90 : 0), top: i > 2 ? 940 : 250, fontSize: 150 + (i % 3) * 60, fontWeight: 900, color: 'transparent', webkitTextStroke: '3px rgba(198,255,31,.35)' }));

  hIn(h1, t, { st: 0.1, d: 0.45, op: 1, y: 40 });   // frame 0 already carries the hook (thumbnail-safe)
  tl.fromTo(cart, { opacity: 1, scale: 0.72, rotation: -12 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.8)' }, t);
  sfx(t + 0.05, 'whoosh');
  chips.forEach((ch, i) => {
    const at = t + 0.5 + i * 0.36;
    tl.fromTo(ch, { y: -760, opacity: 0, rotation: -60 + i * 50 }, { y: 0, opacity: 1, rotation: -8 + i * 8, duration: 0.42, ease: 'bounce.out' }, at)
      .set(badge, { innerHTML: bn(i + 1) }, at + 0.2).fromTo(badge, { scale: 2.6 }, { scale: 1.5, duration: 0.3, ease: 'back.out(3)' }, at + 0.2)
      .fromTo(cart, { y: 0 }, { y: 16, duration: 0.08, yoyo: true, repeat: 1 }, at + 0.2);
    sfx(at + 0.2, 'pop', { p: i });
  });
  tl.set(badge, { opacity: 0 }, t).set(badge, { opacity: 1 }, t + 0.7);
  pop(btn, t + 1.55, { d: 0.45 }); sfx(t + 1.55, 'swish');
  tl.fromTo(cur, { x: 400, y: 500, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, t + 1.75)
    .to(cur, { x: -8, duration: 0.07, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 2.3);
  // …but no purchase
  out(h1, t + 2.6, { duration: 0.2 });
  const w2 = hIn(h2, t + 2.75, { st: 0.1, d: 0.4 });
  shake(t + 2.95, 22, 0.45); flash(t + 2.95, '#ff3d2e', 0.35, 0.5); sfx(t + 2.9, 'error');
  tl.set(cart, { filter: 'grayscale(1) brightness(.6)' }, t + 2.95).to(cart, { rotation: 9, y: 30, duration: 0.5, ease: 'power2.out' }, t + 2.9)
    .to(btn, { y: 900, rotation: 24, opacity: 0, duration: 0.7, ease: 'power2.in' }, t + 3.0)
    .to(cur, { x: 520, y: -300, opacity: 0, duration: 0.6, ease: 'power2.in' }, t + 3.0)
    .to(mood, { red: 0.7, duration: 0.3 }, t + 2.9).to(mood, { red: 0, duration: 0.8 }, t + 3.7);
  // the question
  out([h2, tagTop], t + 4.0);
  tl.to(cart, { scale: 0.62, y: 330, duration: 0.6, ease: 'power3.inOut' }, t + 4.0);
  chips.forEach((ch, i) => tl.to(ch, { y: -1500 - i * 120, x: (i - 1) * 420, rotation: (i - 1) * 200, duration: 3, ease: 'power1.in' }, t + 4.2 + i * 0.15));
  tl.to(badge, { opacity: 0, duration: 0.2 }, t + 4.3);
  hIn(q, t + 4.2, { st: 0.14 }); sfx(t + 4.2, 'whoosh'); sfx(t + 4.75, 'ding');
  tl.fromTo(qm, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.08 }, t + 4.5);
  qm.forEach((e, i) => tl.to(e, { rotation: (i % 2 ? 30 : -30), y: (i % 2 ? -50 : 50), duration: 2.6, ease: 'sine.inOut' }, t + 4.6));
  tl.to(q, { scale: 1.07, duration: 2.4, ease: 'none' }, t + 4.8);
  cap(0.15, 2.55, 'অনলাইনে শপিং করতে গিয়ে *কার্টে* জিনিস তুলে রেখেছেন…');
  cap(2.7, 4.05, 'কিন্তু শেষ পর্যন্ত আর *কেনেননি!*');
  cap(4.2, 7.1, 'এমন কি *আপনার সাথেও* হয়েছে?');
  wipe(T.s1, 'up');
}

/* ═════════ 02 · THE MOMENT  7.2 → 16.8 ═════════ */
{
  const c = scene('s1', T.s1, T.s2), t = T.s1;
  E(c, 'a ghost', 'LATER', { left: -30, top: 1060, fontSize: 330 });
  // parallax side-fill
  const side = [[20, 330, 0, .9], [900, 420, 1, 1.1], [-10, 900, 2, 1.2], [925, 1010, 0, .8], [40, 1190, 1, .7], [880, 700, 2, .75]].map(([x, y, i, s]) => chip(c, i, 150 * s, { left: x, top: y, opacity: .5, filter: `blur(${s > 1 ? 5 : 2}px)` }));
  side.forEach((e, i) => tl.fromTo(e, { y: 80 + i * 30 }, { y: -160 - i * 24, rotation: (i % 2 ? 24 : -24), duration: 9.6, ease: 'none' }, t));
  const ph = E(c, 'a phone', `<div class="notch"></div><div class="bar"><span>আমার কার্ট</span><span style="position:relative">${ico('cart', 60, '#efe9dc', 2)}<div class="badge" style="right:-22px;top:-20px">০</div></span></div>`, { left: 240, top: 236 });
  const badge = $('.badge', ph);
  const rows = ITEMS.map((it, i) => E(ph, 'row', `<div class="thumb" style="background:${it[3]}">${ico(it[0], 64, '#0a0c06', 2.2)}</div><div><div class="nm">${it[1]}</div><div class="pr">${it[2]}</div></div><div class="add">${ico('plus', 40, '#0a0c06', 3)}</div>`, { top: 176 + i * 168 }));
  const tot = E(ph, 'line', '<span class="dim">মোট</span><b class="lime" style="font:800 52px/1 var(--font-bn-display)">৳০</b>', { top: 720 });
  const totV = { v: 0 }; binds.push(() => { tot.lastChild.textContent = money(totV.v); });
  E(ph, 'line', '<span class="dim" style="font-size:28px">ডেলিভারি</span><span class="dim" style="font-size:28px">চেকআউটে হিসাব হবে</span>', { top: 792 });
  const cta = E(ph, 'cta', 'অর্ডার কনফার্ম করুন');
  const cur = E(c, 'a', CURSOR(104), { left: 560, top: 1150 });
  const bub = E(c, 'a', `<div style="width:760px;padding:44px 0 40px;border-radius:70px;background:var(--lime);color:#0a0c06;text-align:center;font:800 150px/1.08 var(--font-bn-display);box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 120px rgba(198,255,31,.4)">থাক,<br>পরে কিনব!</div><div style="position:absolute;left:520px;bottom:-56px;width:70px;height:70px;border-radius:50%;background:var(--lime)"></div><div style="position:absolute;left:590px;bottom:-104px;width:36px;height:36px;border-radius:50%;background:var(--lime)"></div>`, { left: 160, top: 420 });
  // "later" calendar
  const cal = E(c, 'a card', `<div style="height:110px;background:var(--danger);border-radius:34px 34px 0 0;display:grid;place-items:center;font:800 56px/1 var(--font-bn-display);color:#fff">পরে কিনব</div><div class="day" style="height:300px;display:grid;place-items:center;font:800 104px/1 var(--font-bn-display)"></div>`, { left: 250, top: 420, width: 580, height: 414, overflow: 'hidden' });
  const DAYS = ['কাল', 'পরশু', 'আগামী সপ্তাহ', 'আগামী মাস', 'কোনো একদিন…', '???'];
  const day = $('.day', cal);
  const clock = E(c, 'a', `<svg width="250" height="250" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#10130c" stroke="#c6ff1f" stroke-width="5"/><g class="hh"><path d="M50 50V24" stroke="#efe9dc" stroke-width="6" stroke-linecap="round"/></g><g class="mh"><path d="M50 50V13" stroke="#c6ff1f" stroke-width="4" stroke-linecap="round"/></g><circle cx="50" cy="50" r="5" fill="#efe9dc"/></svg>`, { left: 415, top: 880 });
  const never = E(c, 'a h', '‘পরে’ আর <span class="red">আসে না</span>', { left: 0, width: 1080, top: 1160, fontSize: 118 });

  tl.fromTo(ph, { y: 900, rotationX: 40, rotationY: -30 }, { y: 0, rotationX: 4, rotationY: -12, duration: 0.8, ease: 'expo.out' }, t + 0.05)
    .to(ph, { rotationY: 10, rotationX: -2, duration: 5, ease: 'sine.inOut' }, t + 0.85);
  let sum = 0;
  rows.forEach((r, i) => {
    const at = t + 0.5 + i * 0.75; sum += ITEMS[i][4];
    tl.fromTo(r, { x: 620, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }, at)
      .fromTo($('.add', r), { scale: 1 }, { scale: 0.6, duration: 0.09, yoyo: true, repeat: 1 }, at + 0.4)
      .to($('.add', r), { background: '#efe9dc', duration: 0.01 }, at + 0.45)
      .set(badge, { innerHTML: bn(i + 1) }, at + 0.47).fromTo(badge, { scale: 2 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, at + 0.47)
      .to(totV, { v: sum, duration: 0.35, ease: 'power2.out' }, at + 0.47);
    sfx(at, 'swish'); sfx(at + 0.42, 'click'); sfx(at + 0.5, 'pop', { p: i });
  });
  tl.fromTo(cta, { scale: 1 }, { scale: 1.05, boxShadow: '0 0 90px rgba(198,255,31,.8)', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 2.9);
  tl.fromTo(cur, { x: 500, y: 520, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, t + 2.9)
    .to(cur, { x: -14, y: 6, duration: 0.06, yoyo: true, repeat: 15, ease: 'sine.inOut' }, t + 3.85);
  sfx(t + 3.85, 'heart'); sfx(t + 4.35, 'heart');
  // thought bubble
  tl.to(ph, { filter: 'brightness(.35) blur(4px)', scale: 0.94, duration: 0.3 }, t + 4.75)
    .to(mood, { dim: 0.35, duration: 0.3 }, t + 4.75);
  tl.fromTo(bub, { opacity: 0, scale: 0.2, rotation: -20, transformOrigin: '75% 110%' }, { opacity: 1, scale: 1, rotation: -4, duration: 0.5, ease: 'back.out(2.2)' }, t + 4.85)
    .to(bub, { rotation: 1, duration: 1.2, ease: 'sine.inOut' }, t + 5.35);
  sfx(t + 4.85, 'bubble');
  tl.to(cur, { x: 420, y: 500, opacity: 0, duration: 0.6, ease: 'power2.in' }, t + 5.2);
  // later never comes
  tl.to(bub, { scale: 0, opacity: 0, y: -200, duration: 0.35, ease: 'back.in(1.6)' }, t + 6.35)
    .to(ph, { y: 1300, rotationX: 30, opacity: 0, duration: 0.6, ease: 'power3.in' }, t + 6.35)
    .to(mood, { dim: 0, duration: 0.4 }, t + 6.4);
  tl.fromTo(cal, { opacity: 0, y: -400, rotationX: 60 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.5, ease: 'back.out(1.5)' }, t + 6.5);
  pop(clock, t + 6.7);
  DAYS.forEach((d, i) => {
    const at = t + 6.5 + i * 0.44;
    tl.set(day, { innerHTML: d, fontSize: d.length > 8 ? 76 : 110 }, at).fromTo(day, { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.22, ease: 'power2.out', transformOrigin: '50% 0%' }, at);
    sfx(at, 'flip', { p: i });
  });
  tl.fromTo($('.mh', clock), { rotation: 0, svgOrigin: '50 50' }, { rotation: 360 * 9, duration: 3, ease: 'power1.in', svgOrigin: '50 50' }, t + 6.7)
    .fromTo($('.hh', clock), { rotation: 0, svgOrigin: '50 50' }, { rotation: 360 * 1.5, duration: 3, ease: 'power1.in', svgOrigin: '50 50' }, t + 6.7);
  sfx(t + 6.7, 'windup', { d: 2.6 });
  hIn(never, t + 8.3); shake(t + 8.65, 12, 0.3); sfx(t + 8.6, 'thud');
  tl.to(cal, { filter: 'grayscale(1) brightness(.6)', rotation: -5, duration: 0.4 }, t + 8.6);
  cap(7.35, 9.95, 'পছন্দের জামা, নতুন হেডফোন, দরকারি গ্যাজেট — এক ক্লিকেই *কার্টে!*');
  cap(10.1, 11.95, 'কিন্তু চেকআউটের ঠিক *আগ মুহূর্তে* মনে হলো…');
  cap(12.05, 13.55, '*‘থাক, পরে কিনব!’*');
  cap(13.7, 16.7, 'আর সেই *‘পরে’* যে কবে আসে, তা আমরা কেউই জানি না।');
  wipe(T.s2, 'left');
}

/* ═════════ 03 · THE MYSTERY GAP  16.8 → 26.4 ═════════ */
{
  const c = scene('s2', T.s2, T.s3), t = T.s2;
  const big = E(c, 'a en', '?', { left: 0, width: 1080, top: 520, textAlign: 'center', fontSize: 820, fontWeight: 900, lineHeight: 1, color: 'transparent', webkitTextStroke: '4px rgba(198,255,31,.5)' });
  const rings = [0, 1, 2].map(i => E(c, 'a', '', { left: 540 - 250 - i * 120, top: 900 - 250 - i * 120, width: 500 + i * 240, height: 500 + i * 240, borderRadius: '50%', border: `2px dashed rgba(239,233,220,${0.28 - i * 0.07})` }));
  const h = E(c, 'a h', 'ই-কমার্সের<br><span class="lime">সবচেয়ে বড় রহস্য</span>', { left: 0, width: 1080, top: 250, fontSize: 122 });
  hIn(h, t + 0.15); sfx(t + 0.15, 'mystery');
  tl.fromTo(big, { opacity: 0, scale: 0.4, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.4)' }, t + 0.2)
    .to(big, { rotation: 8, scale: 1.08, duration: 2.2, ease: 'sine.inOut' }, t + 1.1);
  rings.forEach((r, i) => tl.fromTo(r, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, t + 0.3 + i * 0.1).to(r, { rotation: (i % 2 ? -1 : 1) * 60, duration: 9, ease: 'none' }, t + 0.3));
  // like ≠ buy
  const mk = (icn, label, col, x) => E(c, 'a card', `<div style="display:grid;place-items:center;height:100%;gap:0">${ico(icn, 150, col, 2)}<div style="font:800 76px/1 var(--font-bn-display);margin-top:-30px">${label}</div></div>`, { left: x, top: 640, width: 360, height: 380 });
  const likeC = mk('heart', 'পছন্দ', '#ff5c8a', 60), buyC = mk('check', 'কেনা', '#c6ff1f', 660);
  const ne = E(c, 'a en red', '≠', { left: 420, top: 700, width: 240, textAlign: 'center', fontSize: 230, fontWeight: 900, lineHeight: 1 });
  tl.to([big], { opacity: 0.12, scale: 1.4, duration: 0.5 }, t + 2.8);
  tl.fromTo(likeC, { x: -500, rotationY: 70, opacity: 0 }, { x: 0, rotationY: 12, opacity: 1, duration: 0.55, ease: 'back.out(1.5)' }, t + 2.9)
    .fromTo(buyC, { x: 500, rotationY: -70, opacity: 0 }, { x: 0, rotationY: -12, opacity: 1, duration: 0.55, ease: 'back.out(1.5)' }, t + 3.05)
    .fromTo(ne, { scale: 5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power4.in' }, t + 3.6);
  sfx(t + 2.9, 'swish'); sfx(t + 3.05, 'swish'); sfx(t + 3.9, 'stamp'); shake(t + 3.9, 16, 0.35); flash(t + 3.9, '#ff3d2e', 0.3, 0.4);
  // the chasm
  out(h, t + 5.7);
  const eq = [likeC, ne, buyC];
  tl.to(eq, { y: -400, scale: 0.62, duration: 0.6, ease: 'power3.inOut', transformOrigin: '50% 50%' }, t + 5.8)
    .to(likeC, { x: 110 }, t + 5.8).to(buyC, { x: -110 }, t + 5.8).to([big, ...rings], { opacity: 0, duration: 0.4 }, t + 5.8);
  const cliff = (x, w) => E(c, 'a', `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#232a17,#0b0d07 70%);border-top:8px solid var(--lime);box-shadow:0 -20px 60px rgba(198,255,31,.25)"></div>` + [1, 2, 3, 4].map(i => `<div style="position:absolute;left:0;right:0;top:${i * 85}px;height:2px;background:rgba(239,233,220,.07)"></div>`).join(''), { left: x, top: 800, width: w, height: 620 });
  const cl = cliff(-20, 350), cr = cliff(750, 350);
  const pit = E(c, 'a', '', { left: 330, top: 808, width: 420, height: 612, background: 'linear-gradient(180deg,rgba(0,0,0,.92),rgba(255,61,46,.35) 78%,rgba(255,61,46,.75))', boxShadow: 'inset 30px 0 60px #000,inset -30px 0 60px #000' });
  const lblL = E(c, 'a', `<span class="pill" style="border-color:#ff5c8a;color:#ff5c8a;background:rgba(255,92,138,.1)">পছন্দ ♥</span>`, { left: 40, top: 664 });
  const lblR = E(c, 'a', `<span class="pill">অর্ডার ✓</span>`, { left: 810, top: 664 });
  const meas = E(c, 'a', `<svg width="420" height="60" viewBox="0 0 420 60"><path d="M12 30H408M12 30l22-16M12 30l22 16M408 30l-22-16M408 30l-22 16" fill="none" stroke="#efe9dc" stroke-width="5" stroke-linecap="round"/></svg>`, { left: 330, top: 850 });
  const gapL = E(c, 'a h', 'মনস্তাত্ত্বিক<br><span class="red">ফাঁক</span>', { left: 330, width: 420, top: 925, fontSize: 74, lineHeight: 1.1 });
  tl.fromTo([cl, cr, pit], { y: 700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05 }, t + 5.9);
  sfx(t + 5.9, 'rumble');
  pop(lblL, t + 6.3); pop(lblR, t + 6.4);
  tl.fromTo(meas, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }, t + 6.6);
  hIn(gapL, t + 6.7, { d: 0.4 });
  for (let i = 0; i < 6; i++) {
    const at = t + 6.5 + i * 0.42, ok = i === 5;
    const k = E(c, 'a', ico('cart', 96, ok ? '#c6ff1f' : '#efe9dc', 2), { left: -110, top: 706 });
    tl.set(k, { opacity: 0 }, 0).set(k, { opacity: 1 }, at).fromTo(k, { x: 0 }, { x: 330, duration: 0.5, ease: 'none' }, at);
    if (!ok) { tl.to(k, { x: 520, duration: 0.7, ease: 'none' }, at + 0.5).to(k, { y: 640, rotation: 230, duration: 0.7, ease: 'power2.in' }, at + 0.5).to(k, { opacity: 0, duration: 0.2 }, at + 1.0); sfx(at + 0.55, 'fall', { p: i }); }
    else { tl.to(k, { x: 880, duration: 0.7, ease: 'none' }, at + 0.5).to(k, { y: -230, duration: 0.35, ease: 'power2.out' }, at + 0.5).to(k, { y: 0, duration: 0.35, ease: 'power2.in' }, at + 0.85)
        .to(k, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1 }, at + 1.2); sfx(at + 0.5, 'whoosh'); sfx(at + 1.2, 'ding'); }
  }
  cap(16.95, 19.6, 'শুনতে সাধারণ, কিন্তু ই-কমার্সের *সবচেয়ে বড় রহস্য* লুকিয়ে ঠিক এখানেই।');
  cap(19.7, 22.55, 'আমরা ভাবি, পছন্দ হলেই ক্রেতা কিনে ফেলে। *বাস্তবতা ভিন্ন!*');
  cap(22.7, 26.3, '‘পছন্দ’ আর ‘অর্ডার কনফার্ম’-এর মাঝে লুকিয়ে আছে বিশাল এক *মনস্তাত্ত্বিক ফাঁক।*');
  sfx(T.s3 - 1.5, 'riser', { d: 1.5 });
}

/* ═════════ 04 · THE NUMBER  26.4 → 38.4 ═════════ */
{
  const c = scene('s3', T.s3, T.s4), t = T.s3;
  E(c, 'a ghost', '70%', { left: -90, top: 1010, fontSize: 480 });
  const hero = E(c, 'a', `<svg width="900" height="900" viewBox="0 0 900 900" style="position:absolute;left:0;top:0;transform:rotate(-90deg)"><circle cx="450" cy="450" r="405" fill="none" stroke="rgba(239,233,220,.1)" stroke-width="34"/><circle class="arc" cx="450" cy="450" r="405" fill="none" stroke="#c6ff1f" stroke-width="34" stroke-linecap="round" stroke-dasharray="2545" stroke-dashoffset="2545" style="filter:drop-shadow(0 0 22px rgba(198,255,31,.8))"/></svg>
    <div class="num" style="position:absolute;left:0;width:900px;top:205px;text-align:center;font:800 430px/1 var(--font-bn-display);color:var(--lime);letter-spacing:-.03em;text-shadow:0 0 90px rgba(198,255,31,.5)"><span class="v">০</span><span style="font-size:200px;color:var(--cream)">%</span></div>
    <div style="position:absolute;left:0;width:900px;top:640px;text-align:center;font:700 50px/1 var(--font-bn-body);color:var(--cream-dim);letter-spacing:.04em">কার্ট অ্যাবানডনমেন্ট রেট</div>`, { left: 90, top: 240, width: 900, height: 900 });
  const n = { v: 0 }, arc = $('.arc', hero), nv = $('.v', hero);
  binds.push(() => { nv.textContent = bn(Math.round(n.v)); arc.setAttribute('stroke-dashoffset', 2545 * (1 - n.v / 100)); });
  const lab = E(c, 'a', '<span class="pill" style="font-size:46px;padding:18px 44px 14px">কার্টে উঠেছে, কিন্তু <b style="color:#fff">&nbsp;কেনা হয়নি</b></span>', { left: 0, width: 1080, top: 1180, textAlign: 'center' });
  flash(t, '#c6ff1f', 0.7, 0.6); sfx(t, 'impact');
  tl.fromTo(hero, { scale: 0.3, opacity: 0, rotation: -40 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'expo.out' }, t)
    .to(n, { v: 70, duration: 1.7, ease: 'power2.out' }, t + 0.25)
    .fromTo($('.num', hero), { scale: 1 }, { scale: 1.13, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t + 1.95);
  sfx(t + 0.25, 'count', { d: 1.7 }); sfx(t + 1.95, 'boom'); shake(t + 1.95, 18, 0.4);
  pop(lab, t + 2.3); sfx(t + 2.3, 'swish');
  // 10 shoppers, 7 leave
  tl.to(hero, { scale: 0.4, y: -250, duration: 0.7, ease: 'power3.inOut' }, t + 4.6).to(lab, { opacity: 0, y: -80, duration: 0.3 }, t + 4.6);
  const LEAVE = [0, 2, 3, 5, 6, 8, 9], ppl = [];
  for (let i = 0; i < 10; i++) {
    const p = E(c, 'a', `<div class="pc" style="width:164px;height:200px;border-radius:36px;background:#141910;border:3px solid var(--lime);display:grid;place-items:center;color:var(--lime);box-shadow:0 20px 50px rgba(0,0,0,.5)">${ico('user', 104, 'currentColor', 2)}<div class="st" style="position:absolute;right:-14px;top:-14px;width:60px;height:60px;border-radius:50%;background:var(--lime);display:grid;place-items:center">${ico('cart', 36, '#0a0c06', 2.6)}</div></div>`, { left: 78 + (i % 5) * 190, top: 640 + Math.floor(i / 5) * 236 });
    ppl.push(p); pop(p, t + 4.9 + i * 0.09, { d: 0.35 }); sfx(t + 4.9 + i * 0.09, 'tick', { p: i });
  }
  const say = E(c, 'a h', '১০ জনে <span class="red">৭ জনই</span> ফিরে যান', { left: 0, width: 1080, top: 1150, fontSize: 86 });
  LEAVE.forEach((idx, j) => {
    const p = ppl[idx], at = t + 6.5 + j * 0.3, pc = p.firstChild;
    tl.to(pc, { borderColor: '#ff3d2e', color: '#ff3d2e', background: '#2a0c08', duration: 0.12 }, at)
      .set($('.st', p), { background: '#ff3d2e', innerHTML: ico('x', 34, '#fff', 3.4) }, at)
      .to(p, { rotation: (j % 2 ? 1 : -1) * 14, duration: 0.12 }, at)
      .to(p, { opacity: 0.2, scale: 0.86, filter: 'grayscale(.6)', duration: 0.5, ease: 'power2.out' }, at + 0.25);
    sfx(at, 'deny', { p: j });
  });
  hIn(say, t + 6.6);
  tl.to(ppl.filter((_, i) => !LEAVE.includes(i)), { scale: 1.12, boxShadow: '0 0 60px rgba(198,255,31,.6)', duration: 0.3, yoyo: true, repeat: 1, stagger: 0.08 }, t + 8.7);
  sfx(t + 8.7, 'ding');
  // but why?
  out([hero, say, ...ppl], t + 9.45, { stagger: 0.012 });
  const why = E(c, 'a h', 'কিন্তু<br><span class="lime" style="font-size:330px;line-height:1">কেন?</span>', { left: 0, width: 1080, top: 420, fontSize: 170 });
  hIn(why, t + 9.6, { st: 0.2 }); sfx(t + 9.6, 'whoosh'); sfx(t + 9.85, 'thud');
  tl.to(why, { scale: 1.5, duration: 2, ease: 'power2.in' }, t + 10.2).to(why, { opacity: 0, duration: 0.3 }, t + 11.7);
  sfx(T.s4 - 1.4, 'riser', { d: 1.4 });
  cap(26.55, 31.0, 'গবেষণা বলছে, কার্টে তোলা পণ্যের প্রায় *৭০ শতাংশই* শেষ পর্যন্ত আর কেনা হয় না!');
  cap(31.2, 35.75, 'অর্থাৎ প্রতি ১০ জন ক্রেতার *৭ জনই* কার্ট ভর্তি করে মাঝপথ থেকে ফিরে যান।');
  cap(35.9, 38.3, 'পছন্দ হওয়ার পরও *কেন* সিদ্ধান্ত বদলে যায়?');
  wipe(T.s4, 'down');
}

/* ═════════ 05 · THE REAL REASON  38.4 → 52.8 ═════════ */
{
  const c = scene('s4', T.s4, T.s5), t = T.s4;
  const gh = E(c, 'a ghost', 'SURPRISE', { left: -60, top: 1090, fontSize: 210, webkitTextStroke: '2px rgba(255,61,46,.22)' });
  const h = E(c, 'a h', 'সবচেয়ে বড় কারণ?', { left: 0, width: 1080, top: 262, fontSize: 116 });
  const tag = E(c, 'a', `<div class="glow" style="transform:rotate(-12deg)">${ico('tag', 520, '#c6ff1f', 1.3)}</div><div style="position:absolute;left:150px;top:210px;width:300px;text-align:center;font:800 100px/1 var(--font-bn-display);transform:rotate(-12deg)">পণ্যের<br>দাম?</div>`, { left: 270, top: 520, width: 540, height: 540 });
  const stamp = E(c, 'a', `<div style="border:14px solid var(--danger);color:var(--danger);border-radius:40px;padding:10px 60px 0;font:800 210px/1.15 var(--font-bn-display);background:rgba(20,4,2,.75)">না!</div>`, { left: 300, top: 640, transform: 'rotate(-14deg)' });
  hIn(h, t + 0.15); pop(tag, t + 0.5, { ease: 'back.out(1.4)' }); sfx(t + 0.5, 'swish');
  tl.to(tag, { rotation: 6, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, t + 1.0);
  tl.fromTo(stamp, { scale: 4.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, t + 2.0);
  sfx(t + 2.22, 'stamp'); shake(t + 2.22, 22, 0.4); flash(t + 2.22, '#ff3d2e', 0.3, 0.4);
  tl.to([tag, stamp], { y: 1500, rotation: 40, duration: 0.6, ease: 'power2.in', stagger: 0.05 }, t + 3.25);
  out(h, t + 3.3);
  // checkout — last step
  const ph = E(c, 'a phone', `<div class="notch"></div><div class="bar"><span>চেকআউট</span><span style="font:600 30px/1 var(--font-bn-body);color:var(--lime);border:2px solid var(--lime);border-radius:30px;padding:8px 18px 4px">ধাপ ৩/৩</span></div>`, { left: 240, top: 236 });
  const prog = E(ph, '', '<i style="display:block;height:100%;width:100%;background:var(--lime);border-radius:8px;transform-origin:0 50%"></i>', { position: 'absolute', left: 40, right: 40, top: 168, height: 10, borderRadius: 8, background: '#242b1b' });
  const mini = E(ph, '', ITEMS.map(it => `<div class="thumb" style="width:120px;height:120px;border-radius:26px;background:${it[3]};display:grid;place-items:center">${ico(it[0], 70, '#0a0c06', 2.2)}</div>`).join('') + `<div style="font:700 32px/1.2 var(--font-bn-body);color:var(--cream-dim)">৩টি<br>পণ্য</div>`, { position: 'absolute', left: 40, right: 40, top: 212, display: 'flex', gap: '20px', alignItems: 'center' });
  const l1 = E(ph, 'line', '<span>পণ্যের দাম</span><b>৳২,৭০০</b>', { top: 396 });
  const fee = E(ph, '', `<div style="display:flex;justify-content:space-between;align-items:center;height:100%;padding:0 26px;font:800 40px/1 var(--font-bn-display)"><span style="display:flex;gap:14px;align-items:center">${ico('truck', 54, '#fff', 2.2)}ডেলিভারি চার্জ</span><span>+৳১৫০</span></div>`, { position: 'absolute', left: 16, right: 16, top: 458, height: 112, borderRadius: 26, background: 'var(--danger)', color: '#fff', boxShadow: '0 0 80px rgba(255,61,46,.8)' });
  const sep = E(ph, '', '', { position: 'absolute', left: 40, right: 40, top: 600, height: 0, borderTop: '3px dashed #39422b' });
  const l2 = E(ph, 'line', '<span style="font-size:44px;font-weight:700">মোট</span><b class="tv lime" style="font:800 84px/1 var(--font-bn-display)">৳২,৭০০</b>', { top: 630, alignItems: 'center' });
  const okp = E(ph, '', `<span class="pill" style="font-size:30px;padding:8px 22px 5px">${ico('check', 30, '#c6ff1f', 3)} সব ঠিকঠাক</span>`, { position: 'absolute', left: 40, top: 740 });
  const cta = E(ph, 'cta', 'অর্ডার কনফার্ম করুন');
  const tv = $('.tv', ph), total = { v: 2700 }; binds.push(() => { tv.textContent = money(total.v); });
  const cur = E(c, 'a', CURSOR(104), { left: 560, top: 1150 });
  const warns = [[60, 330, 150, -18], [890, 300, 130, 16], [30, 760, 110, 12], [925, 800, 150, -14], [80, 1130, 130, 20], [880, 1160, 110, -10]].map(([x, y, s, r]) => E(c, 'a', ico('warn', s, '#ff3d2e', 2), { left: x, top: y, transform: `rotate(${r}deg)`, filter: 'drop-shadow(0 0 24px rgba(255,61,46,.8))' }));
  tl.set(ph, { opacity: 0 }, 0).set(ph, { opacity: 1 }, t + 3.5).fromTo(ph, { y: 1400, rotationX: 30, rotationY: 24 }, { y: 0, rotationX: 3, rotationY: 9, duration: 0.8, ease: 'expo.out' }, t + 3.5)
    .to(ph, { rotationY: -7, duration: 3.2, ease: 'sine.inOut' }, t + 4.3);
  sfx(t + 3.5, 'whoosh');
  tl.fromTo(prog.firstChild, { scaleX: 0.66 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, t + 4.0);
  tl.fromTo([mini, l1, sep, l2, okp], { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.14, ease: 'power2.out' }, t + 4.0);
  [0, 1, 2, 3, 4].forEach(i => sfx(t + 4.0 + i * 0.14, 'tick', { p: i }));
  sfx(t + 4.75, 'ding');
  tl.fromTo(cta, { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 5.2);
  tl.fromTo(cur, { x: 480, y: 560, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1, ease: 'power2.inOut' }, t + 5.5)
    .to(cur, { scale: 0.86, duration: 0.2 }, t + 6.75);
  sfx(t + 6.7, 'stop');
  // ——— the surprise (bar 45.6) ———
  const X = t + 7.2;
  tl.set(fee, { opacity: 0 }, 0)
    .fromTo(fee, { opacity: 1, scale: 3, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.2, ease: 'power4.in', immediateRender: false }, X - 0.2)
    .to(l1, { y: -14, duration: 0.15 }, X).to(okp, { opacity: 0, scale: 0, duration: 0.15 }, X)
    .to(total, { v: 2850, duration: 0.45, ease: 'power2.out' }, X + 0.05)
    .to(tv, { color: '#ff3d2e', duration: 0.1 }, X).fromTo(tv, { scale: 1.5 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,.4)', transformOrigin: '100% 50%', immediateRender: false }, X + 0.05)
    .to(cta, { background: '#3a3f31', color: '#8b8f80', duration: 0.2 }, X)
    .to(ph, { borderColor: '#ff3d2e', boxShadow: '0 0 0 12px #040503,0 70px 140px rgba(0,0,0,.7),0 0 160px rgba(255,61,46,.55)', duration: 0.2 }, X)
    .to(mood, { red: 1, energy: 1.8, duration: 0.15 }, X)
    .to(cur, { x: 60, y: 40, rotation: 20, duration: 0.25, ease: 'power3.out' }, X);
  shake(X, 40, 0.75); flash(X, '#ff3d2e', 0.55, 0.6); sfx(X, 'impact'); sfx(X + 0.02, 'alarm'); sfx(X + 0.15, 'glitch');
  tl.fromTo(warns, { opacity: 0, scale: 0, x: i => (i % 2 ? -1 : 1) * 300 }, { opacity: 1, scale: 1, x: 0, duration: 0.45, ease: 'back.out(2.4)', stagger: 0.05 }, X + 0.05);
  warns.forEach((w, i) => tl.to(w, { y: (i % 2 ? 26 : -26), duration: 0.5, yoyo: true, repeat: 9, ease: 'sine.inOut' }, X + 0.5));
  tl.fromTo(gh, { opacity: 0, x: 300 }, { opacity: 1, x: -260, duration: 7, ease: 'none' }, X);
  tl.fromTo(fee, { x: 0 }, { x: 10, duration: 0.05, yoyo: true, repeat: 11 }, X + 0.3);
  // interest meter
  tl.to(ph, { scale: 0.74, y: -150, rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power3.inOut' }, X + 2.5)
    .to(cur, { opacity: 0, duration: 0.2 }, X + 2.4);
  const meter = E(c, 'a card', `<div style="display:flex;justify-content:space-between;align-items:flex-end;padding:30px 44px 0"><span style="font:800 58px/1 var(--font-bn-display)">কেনার আগ্রহ</span><span class="mv" style="font:800 96px/0.9 var(--font-bn-display);color:var(--lime)">১০০%</span></div>
    <div style="margin:26px 44px 0;height:58px;border-radius:30px;background:#0a0c06;border:2px solid #2a3120;overflow:hidden"><div class="mb" style="height:100%;width:100%;border-radius:30px;background:linear-gradient(90deg,#ff3d2e,#ffc83d 45%,#c6ff1f);transform-origin:0 50%"></div></div>`, { left: 70, top: 1056, width: 940, height: 262 });
  const mv = $('.mv', meter), mb = $('.mb', meter), m = { v: 100 };
  binds.push(() => { mv.textContent = bn(Math.round(m.v)) + '%'; mb.style.clipPath = `inset(0 ${100 - m.v}% 0 0 round 30px)`; mv.style.color = m.v > 55 ? '#c6ff1f' : m.v > 25 ? '#ffc83d' : '#ff3d2e'; });
  tl.fromTo(meter, { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, X + 2.6)
    .to(m, { v: 6, duration: 1.7, ease: 'power2.in' }, X + 3.2);
  sfx(X + 2.6, 'swish'); sfx(X + 3.2, 'drain', { d: 1.7 }); sfx(X + 4.9, 'thud'); shake(X + 4.9, 12, 0.3);
  // verdict
  tl.to(ph, { y: 1700, rotation: 30, duration: 0.6, ease: 'power2.in' }, X + 5.2).to(ph, { opacity: 0, duration: 0.3 }, X + 5.25).to(warns, { opacity: 0, scale: 0, duration: 0.3, stagger: 0.03 }, X + 5.2)
    .to(meter, { y: -660, duration: 0.6, ease: 'power3.inOut' }, X + 5.25);
  const v1 = E(c, 'a h', 'সারপ্রাইজ খরচ', { left: 0, width: 1080, top: 730, fontSize: 150 });
  const v2 = E(c, 'a h', '<span class="en red" style="font-size:150px">=</span> <span class="red">আগ্রহ শেষ</span>', { left: 0, width: 1080, top: 930, fontSize: 170 });
  hIn(v1, X + 5.5); hIn(v2, X + 5.9); sfx(X + 5.5, 'whoosh'); sfx(X + 6.1, 'boom'); shake(X + 6.1, 14, 0.3);
  tl.to(mood, { red: 0, energy: 1, duration: 0.6 }, T.s5 - 0.5);
  cap(38.55, 41.85, 'সবচেয়ে বড় কারণটা চমকে দেওয়ার মতো — ক্রেতা *দামের কারণে* পিছিয়ে যান না!');
  cap(42.0, 45.4, 'তাঁরা থমকে যান চেকআউটের একদম *শেষ ধাপে*…');
  cap(45.7, 48.1, 'হঠাৎ ভেসে ওঠা *ডেলিভারি চার্জ* দেখে!');
  cap(48.25, 52.7, 'মনস্তত্ত্ব বলছে: *‘সারপ্রাইজ খরচ’* দেখলেই মানুষ কেনার আগ্রহ হারিয়ে ফেলে।');
  wipe(T.s5, 'right');
}
