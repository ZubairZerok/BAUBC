/* EP02 scenes, second half — import & spike · the chain of hands · the real crisis · your turn · logo */

/* ═════════ 04 · IMPORT & THE SPIKE  26.4 → 36.0 ═════════ */
{
  const c = C3 = scene('s3', T.s3, T.s4, { pre: 0.6 }), t = T.s3;
  iris(t, c, 765, 795);
  base(c, { background: 'linear-gradient(#0f4031,#06231a 60%,#041812)' });
  // A · the stock runs out
  const A = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  const cal = E(A, 'a panel', '<div style="height:96px;border-radius:38px 38px 0 0;background:var(--lime);color:#0a0c06;display:grid;place-items:center;font:800 46px/1 var(--font-bn-display)">মৌসুম</div><div class="m" style="height:250px;display:grid;place-items:center;font:800 96px/1 var(--font-bn-display)"></div>', { left: 80, top: 360, width: 420, height: 350, overflow: 'hidden' });
  const MON = ['মার্চ', 'মে', 'জুলাই', 'সেপ্টেম্বর', 'নভেম্বর'], mEl = $('.m', cal);
  MON.forEach((m, i) => { const at = t + 0.25 + i * 0.42; tl.set(mEl, { innerHTML: m, fontSize: m.length > 5 ? 74 : 96 }, at).fromTo(mEl, { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.2, transformOrigin: '50% 0%', immediateRender: false }, at); sfx(at, 'flip', { p: i }); });
  tl.set(mEl, { innerHTML: '' }, 0);
  const crt = E(A, 'a', crate(400), { left: 590, top: 470 });
  const stk = pile(A, 790, 548, 3, 78, 7);
  const stl = chip(A, 'দেশি মজুদ', { left: 640, top: 330 });
  [cal, crt, stl].forEach(e => pop(e, t + 0.05)); stk.forEach(o => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t + 0.15));
  [...stk].reverse().forEach((o, i) => { tl.to(o, { scale: 0, opacity: 0, y: -40, duration: 0.18, ease: 'power2.in' }, t + 0.5 + i * 0.13); });
  sfx(t + 0.5, 'ticks'); sfx(t + 1.1, 'ticks');
  const empty = E(A, 'a', '<div style="border:10px solid var(--red);color:var(--red);border-radius:30px;padding:6px 40px 0;font:800 110px/1.2 var(--font-bn-display);background:rgba(20,4,2,.7)">শেষ!</div>', { left: 640, top: 520, transform: 'rotate(-10deg)' });
  tl.fromTo(empty, { scale: 3.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'power4.in' }, t + 2.05); sfx(t + 2.25, 'stamp'); shake(t + 2.25, 14, 0.3);
  // B · the ship — the market now hangs on imports
  const P = t + 2.6;
  tl.to(A, { y: -1200, duration: 0.6, ease: 'power3.in' }, P - 0.3);
  const sea = E(c, 'a', `<div style="position:absolute;inset:0;background:linear-gradient(#1a8f86,#06302e)"></div>` + [0, 1, 2, 3].map(i => `<svg class="wv" width="2400" height="40" viewBox="0 0 2400 40" style="position:absolute;left:0;top:${40 + i * 120}px;opacity:${0.45 - i * 0.08}"><path d="${Array.from({ length: 40 }, (_, k) => `${k ? 'Q' : 'M0 20 Q'}${k * 60 + 30} ${k % 2 ? 36 : 4} ${k * 60 + 60} 20`).join(' ')}" stroke="#bff" stroke-width="4" fill="none"/></svg>`).join(''), { left: 0, top: 900, width: 1080, height: 1100 });
  binds.push(T2 => sea.querySelectorAll('.wv').forEach((w, i) => { w.style.transform = `translateX(${-((T2 * (30 + i * 12)) % 120)}px)`; }));
  const dock = E(c, 'a', `<div style="position:absolute;left:0;top:200px;width:250px;height:1000px;background:#2b3a33"></div><div style="position:absolute;left:150px;top:-140px;width:26px;height:360px;background:var(--gold)"></div><div style="position:absolute;left:40px;top:-140px;width:420px;height:22px;background:var(--gold)"></div><div style="position:absolute;left:420px;top:-118px;width:4px;height:170px;background:#efe9dc"></div>`, { left: 0, top: 760 });
  const sp = E(c, 'a', ship(560), { left: 1100, top: 690 });
  const arr = E(c, 'a', '<svg width="300" height="120" viewBox="0 0 300 120"><path d="M290 30 C220 110 110 110 40 60" stroke="#ffc83d" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M14 44 L58 40 L46 84Z" fill="#ffc83d"/></svg>', { left: 250, top: 1060 });
  const hj = H(c, 'বাজার <span class="red">জিম্মি</span><br>আমদানির ওপর', 330, 104);
  tl.fromTo([sea, dock], { y: 1500 }, { y: 0, duration: 0.7, ease: 'power3.out' }, P)
    .fromTo(sp, { x: 0 }, { x: -660, duration: 1.4, ease: 'power2.out' }, P + 0.2)
    .to(sp, { y: 8, rotation: 0.8, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut' }, P + 1.6);
  pop(arr, P + 1.3); hIn(hj, P + 0.3);
  sfx(P, 'whoosh'); sfx(P + 0.9, 'horn'); sfx(P + 1.3, 'swish');
  // C · import halted / duty trouble
  const S = t + 4.6;
  const stop = E(c, 'a', `<svg width="250" height="250" viewBox="0 0 100 100"><polygon points="30,2 70,2 98,30 98,70 70,98 30,98 2,70 2,30" fill="#ff4a3d" stroke="#efe9dc" stroke-width="5"/></svg><div style="position:absolute;inset:0;display:grid;place-items:center;font:800 76px/1 var(--font-bn-display);color:#fff">বন্ধ</div>`, { left: 300, top: 700 });
  const duty = chip(c, 'শুল্ক জটিলতা', { left: 560, top: 650, transform: 'rotate(-6deg)' }, '#ffc83d');
  tl.fromTo(stop, { scale: 4, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, S - 0.2);
  pop(duty, S + 0.25); out(hj, S - 0.3); tl.to(arr, { opacity: 0.2, duration: 0.2 }, S);
  sfx(S, 'stamp'); shake(S, 18, 0.35); sfx(S + 0.25, 'swish');
  // D · the price chart: ৳60-70 → ৳200+ overnight
  const Q = t + 5.2;
  const ch = E(c, 'a panel', `<svg width="960" height="560" viewBox="0 0 960 560">
      ${[50, 100, 150, 200].map(p => { const y = 470 - p / 220 * 400; return `<path d="M110 ${y} H930" stroke="rgba(239,233,220,.12)" stroke-width="2"/><text x="96" y="${y + 10}" text-anchor="end" font-family="Hind Siliguri" font-weight="700" font-size="30" fill="#9a9788">৳${bn(p)}</text>`; }).join('')}
      <path d="M110 470 H930" stroke="rgba(239,233,220,.3)" stroke-width="3"/>
      <polyline class="ln" fill="none" stroke="#ff4a3d" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 12px rgba(255,74,61,.7))"/></svg>
    <div class="lo" style="position:absolute;left:130px;top:250px"><span class="chip" style="font-size:34px">৳৬০–৭০</span></div>
    <div class="hi" style="position:absolute;left:600px;top:20px"><span class="chip" style="font-size:46px;border-color:#ff4a3d;color:#fff;background:#ff4a3d">৳২০০+ !</span></div>
    <div class="mn" style="position:absolute;left:440px;top:140px;font:700 34px/1 var(--font-bn-body);color:var(--cream)">🌙 রাতারাতি</div>`, { left: 60, top: 250, width: 960, height: 560 });
  const ln = $('.ln', ch), PTS = [[120, 65], [220, 62], [320, 68], [420, 64], [500, 70], [560, 120], [610, 190], [660, 212], [760, 205], [820, 214], [880, 210]];
  const prog = { v: 0 }, wig = { v: 0 }, chOn = E(ch, 'a', onion(60), { left: 0, top: 0 });
  binds.push(T2 => {
    const n = prog.v * (PTS.length - 1), k = Math.floor(n), f = n - k, pts = [];
    for (let i = 0; i <= Math.min(k + 1, PTS.length - 1); i++) {
      let [x, p] = PTS[i]; p += wig.v * Math.sin(T2 * 9 + i * 1.9) * (i > 4 ? 45 : 14);
      if (i === k + 1) { const [x0, p0] = pts.length ? pts[pts.length - 1].raw : [x, p]; x = x0 + (x - x0) * f; p = p0 + (p - p0) * f; }
      pts.push({ raw: [x, p], y: 470 - p / 220 * 400 });
    }
    ln.setAttribute('points', pts.map(q => `${q.raw[0]},${q.y}`).join(' '));
    const e = pts[pts.length - 1], sz = 60 + Math.max(0, e.raw[1] - 70) / 140 * 70;
    chOn.style.transform = `translate(${e.raw[0] - sz / 2}px,${e.y - sz * 1.05}px) scale(${sz / 60})`; chOn.style.transformOrigin = '0 0';
  });
  tl.to([sp, sea, dock, stop, duty, arr], { y: '+=1300', duration: 0.6, ease: 'power3.in' }, Q - 0.1)
    .fromTo(ch, { y: 600, opacity: 0 }, { y: 120, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, Q)
    .fromTo($('.lo', ch), { opacity: 0 }, { opacity: 1, duration: 0.3 }, Q + 0.5)
    .to(prog, { v: 0.4, duration: 0.9, ease: 'none' }, Q + 0.4)
    .to(prog, { v: 1, duration: 0.7, ease: 'power3.in' }, Q + 1.3)
    .fromTo($('.mn', ch), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, Q + 1.3)
    .fromTo($('.hi', ch), { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.in' }, Q + 1.95)
    .to(mood, { red: 0.9, duration: 0.15 }, Q + 2.0).to(mood, { red: 0.35, duration: 0.8 }, Q + 2.4);
  sfx(Q, 'whoosh'); sfx(Q + 1.0, 'riser', { d: 1.0 }); sfx(Q + 2.0, 'impact'); shake(Q + 2.0, 30, 0.5); flash(Q + 2.0, '#ff4a3d', 0.4, 0.4);
  // E · the syndicate pulls the strings
  const Y = t + 6.65;
  const bosses = [[640, 240, 300], [90, 330, 230]].map(([x, y, w]) => {
    const b = E(c, 'a', person(w, { shirt: '#06100b', hair: '#06100b', skin: '#0d1a13', expr: 'smirk', pose: 'shrug' }), { left: x, top: y, filter: 'drop-shadow(0 0 30px rgba(255,74,61,.35))' });
    E(b, 'a', '', { left: w * 0.36, top: w * 0.65, width: w * 0.28, height: w * 0.06, background: 'radial-gradient(circle at 15% 50%,#ff4a3d 0 18%,transparent 22%),radial-gradient(circle at 85% 50%,#ff4a3d 0 18%,transparent 22%)', filter: 'drop-shadow(0 0 8px #ff4a3d)' });
    return b;
  });
  bosses.forEach(b => c.insertBefore(b, ch));
  const strings = E(c, 'a', '<svg width="1080" height="1200" viewBox="0 0 1080 1200">' + [0, 1, 2, 3].map(() => '<line stroke="rgba(239,233,220,.55)" stroke-width="3"/>').join('') + '</svg>', { left: 0, top: 0, opacity: 0 });
  binds.push(() => {
    const ls = strings.querySelectorAll('line'), oy = 250 + 120 + (gsap.getProperty(ch, 'y') - 120);
    const hands = [[640 + 45, 240 + 286], [640 + 255, 240 + 286], [90 + 35, 330 + 219], [90 + 196, 330 + 219]], tgt = [6, 9, 2, 4];
    const pts = (ln.getAttribute('points') || '').split(' ').map(s => s.split(',').map(Number));
    ls.forEach((l, i) => { const p = pts[Math.min(tgt[i], pts.length - 1)] || [0, 0]; l.setAttribute('x1', hands[i][0]); l.setAttribute('y1', hands[i][1]); l.setAttribute('x2', 60 + p[0]); l.setAttribute('y2', oy + p[1]); });
  });
  const syn = chip(c, 'সিন্ডিকেটের কারসাজি', { left: 0, width: 1080, top: 1196, textAlign: 'center' }, '#ff4a3d');
  tl.to(ch, { y: 370, duration: 0.5, ease: 'power3.inOut' }, Y - 0.15).fromTo(bosses, { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, Y)
    .to(strings, { opacity: 1, duration: 0.3 }, Y + 0.5).to(wig, { v: 1, duration: 0.6 }, Y + 0.6);
  bosses.forEach((b, i) => tl.to(b, { rotation: i ? 3 : -3, y: -12, transformOrigin: '50% 100%', duration: 0.2, yoyo: true, repeat: 8, ease: 'sine.inOut' }, Y + 0.6 + i * 0.09));
  pop(syn, Y + 0.7); sfx(Y, 'sub'); sfx(Y + 0.7, 'deny'); sfx(Y + 0.6, 'wobble', { d: 2.2 });
  tl.to(mood, { red: 0, duration: 0.4 }, T.s4 - 0.4);
  cap(26.55, 29.0, 'বছর শেষে দেশি মজুদ ফুরালেই বাজার *জিম্মি* হয়ে পড়ে আমদানির ওপর।');
  cap(29.15, 33.0, 'আমদানি বন্ধ বা শুল্ক জটিলতার খবরেই *৬০-৭০ টাকার* পেঁয়াজ রাতারাতি *২০০ টাকা* ছাড়িয়েছিল!');
  cap(33.15, 35.9, 'এ বছরও মৌসুম শেষে আমদানির ধীরগতি আর *সিন্ডিকেটের কারসাজিতে* ফিরেছে সেই অস্থিরতা।');
}

/* ═════════ 05 · THE CHAIN OF HANDS  36.0 → 45.6 ═════════ */
{
  const c = C4 = scene('s4', T.s4, T.s5, { pre: 0.25 }), t = T.s4;
  whip(t, C3, c, 'left');
  base(c, { background: 'linear-gradient(#145a42,#0a3327 55%,#06201a)' });
  const N = [[190, 520], [540, 520], [890, 520], [890, 880], [540, 880], [190, 880], [190, 1190], [540, 1190]];
  const road = E(c, 'a', `<svg width="1080" height="1300" viewBox="0 0 1080 1300"><path d="M${N.map(p => p.join(' ')).join(' L')}" fill="none" stroke="#0b2a20" stroke-width="54" stroke-linejoin="round" stroke-linecap="round"/><path class="rd" d="M${N.map(p => p.join(' ')).join(' L')}" fill="none" stroke="#c6ff1f" stroke-width="6" stroke-dasharray="18 22" stroke-linejoin="round"/></svg>`, { left: 0, top: 0 });
  binds.push(T2 => { $('.rd', road).style.strokeDashoffset = -T2 * 60; });
  const WHO = [['কৃষক', { shirt: '#efe9dc', hat: 'straw', apron: true }], ['ফড়িয়া', { shirt: '#3a7d5c', hat: 'cap', capc: '#2fd3b5', expr: 'smirk' }], ['বেপারী', { shirt: '#1f6f8b', expr: 'smirk' }],
    ['আড়তদার', { shirt: '#8a5a2b', hat: 'cap', capc: '#ffc83d', expr: 'smirk' }], ['পাইকার', { shirt: '#5b4a8a', expr: 'smirk' }], ['খুচরা বিক্রেতা', { shirt: '#a8433a', hat: 'cap', capc: '#efe9dc', expr: 'smirk' }]];
  const busts = WHO.map(([nm, o], i) => {
    const [x, y] = N[i];
    const b = E(c, 'a', `<div style="width:190px;height:190px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 30%,#2a9a6a,#0f4a36);border:6px solid ${i ? '#efe9dc' : '#c6ff1f'};box-shadow:0 18px 40px rgba(0,0,0,.4)">${person(178, Object.assign({ expr: 'happy', bust: 1 }, o))}</div>`, { left: x - 95, top: y - 95 });
    const n = E(c, 'a', `<span class="chip" style="font-size:32px;padding:8px 20px 4px">${nm}</span>`, { left: x - 150, width: 300, top: y + 104, textAlign: 'center' });
    pop(b, t + 0.2 + i * 0.12, { ease: 'back.out(2)' }); pop(n, t + 0.3 + i * 0.12); sfx(t + 0.2 + i * 0.12, 'pop', { p: i });
    return b;
  });
  const me = E(c, 'a', person(240, { shirt: '#ffc83d', long: true, hair: '#2a1a12', expr: 'happy', pose: 'down' }), { left: 420, top: 1000 });
  const meL = chip(c, 'আপনি', { left: 680, top: 1080 }, '#ffc83d');
  tl.fromTo(road, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t);
  pop(me, t + 0.9); pop(meL, t + 1.0);
  const hdr = H(c, 'মাঠ থেকে আপনার <span class="lime">রান্নাঘর</span>', 218, 56);
  hIn(hdr, t + 0.1, { st: 0.06 });
  // the token: onion + price chip, coin markup stacks at every hand
  const tok = E(c, 'a', `<div class="st" style="position:absolute;left:84px;top:6px"></div>${onion(100)}<div class="pc" style="position:absolute;left:50%;top:-56px;transform:translateX(-50%);white-space:nowrap"><span class="chip" style="font-size:36px;background:#ffc83d;color:#3a2600;border-color:#3a2600">৳৩৫–৪০</span></div>`, { left: N[0][0] - 50, top: N[0][1] - 175 });
  pop(tok, t + 0.6, { from: 2 }); sfx(t + 0.6, 'stamp');
  const st = $('.st', tok), coins = [];
  for (let i = 0; i < 5; i++) coins.push(E(st, 'a', coin(52), { left: 0, top: -i * 16, opacity: 0 }));
  const H0 = t + 3.1, hop = 0.4;
  for (let i = 1; i <= 7; i++) {
    const at = H0 + (i - 1) * hop, [x, y] = N[i];
    tl.to(tok, { x: x - N[0][0], y: y - N[0][1] + (i >= 6 ? -20 : 0), duration: hop * 0.75, ease: 'power2.inOut' }, at);
    if (i <= 5) {
      tl.fromTo(coins[i - 1], { opacity: 0, y: -80, scale: 1.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'bounce.out' }, at + hop * 0.7)
        .to(busts[i], { y: -16, duration: 0.12, yoyo: true, repeat: 1 }, at + hop * 0.7)
        .to(tok.querySelector('.ob'), { scale: 1 + i * 0.09, transformOrigin: '50% 100%', duration: 0.25, ease: 'back.out(3)' }, at + hop * 0.7);
      sfx(at + hop * 0.7, 'coin', { p: i });
    }
    sfx(at, 'swish');
  }
  const E0 = H0 + 6 * hop + 0.5;
  tl.set($('.pc .chip', tok), { innerHTML: '৩–৪ গুণ দাম!', background: '#ff4a3d', color: '#fff', borderColor: '#fff' }, E0)
    .fromTo($('.pc .chip', tok), { scale: 2.2 }, { scale: 1, duration: 0.35, ease: 'back.out(2)', immediateRender: false }, E0);
  const meShock = E(c, 'a', person(240, { shirt: '#ffc83d', long: true, hair: '#2a1a12', expr: 'shock', pose: 'shrug' }), { left: 420, top: 1000, opacity: 0 });
  tl.set(meShock, { opacity: 1 }, E0).set(me, { opacity: 0 }, E0);
  sfx(E0, 'boom'); shake(E0, 18, 0.35);
  // money flows back: middlemen keep most, the farmer gets a sliver
  const M = t + 7.0, back = [N[7], N[6], N[5], N[4], N[3], N[2], N[1], N[0]];
  for (let i = 0; i < 11; i++) {
    const stopAt = i < 10 ? 2 + Math.floor(i / 2) : 7, path = back.slice(0, stopAt + 1);
    const cn = E(c, 'a', coin(46), { left: back[0][0] - 23, top: back[0][1] - 23, opacity: 0 });
    const kf = path.slice(1).map(([x, y]) => ({ x: x - back[0][0], y: y - back[0][1], duration: 0.16, ease: 'none' }));
    const [ex, ey] = path[path.length - 1], side = i % 2 ? 1 : -1;
    kf.push({ x: ex - back[0][0] + 110 * (stopAt === 7 ? 1 : side * 0.7 + 0.3), y: ey - back[0][1] + 60 - (i % 2) * 20, duration: 0.2, ease: 'bounce.out' });
    tl.set(cn, { opacity: 1 }, M + i * 0.12).to(cn, { keyframes: kf }, M + i * 0.12);
    if (i % 3 === 0) sfx(M + i * 0.12 + 0.3, 'coin', { p: i % 5 });
  }
  const sliver = chip(c, 'কৃষকের হাতে সামান্য', { left: 230, top: 680 }, '#c6ff1f');
  pop(sliver, M + 1.8); sfx(M + 1.8, 'sad');
  cap(36.15, 39.25, 'সবচেয়ে অবাক তথ্য: মৌসুমের শুরুতে কৃষক পেঁয়াজ বিক্রি করেন মাত্র *৩৫–৪০ টাকা* কেজিতে…');
  cap(39.4, 42.7, '…আর ৪-৫ হাত ঘুরে আপনার রান্নাঘরে পৌঁছাতে দাম বাড়ে *৩ থেকে ৪ গুণ!*');
  cap(42.85, 45.5, 'আপনি দেন অনেক, কৃষক পান সামান্য — মাঝের লাভ যায় *মধ্যস্বত্বভোগীদের* পকেটে।');
}

/* ═════════ 06 · THE REAL CRISIS  45.6 → 55.2 ═════════ */
{
  const c = C5 = scene('s5', T.s5, T.s6, { pre: 0.12 }), t = T.s5;
  zoomThru(t, C4, c, 540, 1190);
  base(c, { background: 'radial-gradient(ellipse at 50% 40%,#17644a,#0a3327 60%,#05190f)' });
  const hdr = H(c, 'সংকট <span class="lime">কোথায়?</span>', 270, 120);
  hIn(hdr, t + 0.1);
  const X = [40, 390, 740], NM = ['উৎপাদন', 'সংরক্ষণ', 'মধ্যস্বত্ব'];
  const crates = X.map((x, i) => {
    const g2 = E(c, 'a', '', { left: x, top: 0, width: 300, height: 1300 });
    if (i === 0) pile(g2, 150, 925, 3, 74, 21);
    if (i === 1) pile(g2, 150, 925, 3, 74, 31, { rot: 1 });
    if (i === 2) for (let k = 0; k < 7; k++) E(g2, 'a', coin(64), { left: 40 + (k % 4) * 52 + (k > 3 ? 26 : 0), top: 860 - (k > 3 ? 50 : 0) - (k % 2) * 8 });
    E(g2, 'a', crate(300), { left: 0, top: 860 });
    E(g2, 'a', `<span class="chip" style="font-size:38px">${NM[i]}</span>`, { left: -20, width: 340, top: 1070, textAlign: 'center' });
    return g2;
  });
  crates.forEach((g2, i) => { tl.fromTo(g2, { y: 900 }, { y: 0, duration: 0.6, ease: 'back.out(1.3)' }, t + 0.3 + i * 0.12); sfx(t + 0.3 + i * 0.12, 'thud', { p: i }); });
  const mk = (i, ok) => E(c, 'a', icoBig(ok ? 'check' : 'x', 130, ok ? '#c6ff1f' : '#ff4a3d'), { left: X[i] + 85, top: 520 });
  const m0 = mk(0, 1), m1 = mk(1, 0), m2 = mk(2, 0);
  pop(m0, t + 0.9, { ease: 'back.out(3)' }); sfx(t + 0.9, 'ding');
  tl.fromTo([m1, m2], { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'power4.in', stagger: 0.55 }, t + 3.2);
  sfx(t + 3.4, 'stamp'); sfx(t + 3.95, 'stamp'); shake(t + 3.4, 12, 0.25); shake(t + 3.95, 12, 0.25);
  tl.to([crates[1], crates[2]], { filter: 'drop-shadow(0 0 40px rgba(255,74,61,.8))', duration: 0.3, yoyo: true, repeat: 3 }, t + 4.1);
  // the key: stop the rot, shorten the chain
  const K2 = t + 6.4;
  tl.to([...crates, m0, m1, m2], { y: 1800, duration: 0.5, ease: 'power3.in', stagger: 0.04 }, K2 - 0.3);
  out(hdr, K2 - 0.3);
  const hk = H(c, 'সমাধানের <span class="lime">চাবি</span>', 270, 120);
  const ctr = E(c, 'a', onion(230), { left: 425, top: 640 });
  const ring = E(c, 'a', '<svg width="760" height="760" viewBox="0 0 760 760"><circle cx="380" cy="380" r="300" fill="none" stroke="#c6ff1f" stroke-width="10" stroke-dasharray="40 30" opacity=".7"/><path d="M380 70 l26 -14 l-6 28z M640 520 l20 22 l-28 2z M120 520 l-6 28 l-20 -22z" fill="#c6ff1f"/></svg>', { left: 160, top: 400 });
  const nodes = [['leaf', 'উৎপাদন', '#c6ff1f', 230, 500], ['box', 'আধুনিক সংরক্ষণ', '#2fd3b5', 850, 500], ['user', 'সরাসরি বাজার', '#ffc83d', 540, 1080]].map(([ic, nm, col, x, y]) =>
    E(c, 'a', `${icoBig(ic === 'leaf' ? 'heart' : ic, 170, col)}<div style="position:absolute;left:50%;top:180px;transform:translateX(-50%);white-space:nowrap;font:800 42px/1 var(--font-bn-display);color:${col}">${nm}</div>`, { left: x - 85, top: y - 85 }));
  nodes[0].firstChild.innerHTML = sprout(90);
  hIn(hk, K2); sfx(K2, 'whoosh');
  tl.fromTo(ring, { scale: 0.3, opacity: 0, rotation: -90 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'expo.out' }, K2 + 0.1).to(ring, { rotation: 60, duration: 2.6, ease: 'none' }, K2 + 0.8);
  pop(ctr, K2 + 0.15, { ease: 'back.out(2)' });
  nodes.forEach((n, i) => { pop(n, K2 + 0.4 + i * 0.25, { ease: 'back.out(2.5)' }); sfx(K2 + 0.4 + i * 0.25, 'star', { p: i + 1 }); });
  tl.to(mood, { gold: 0.35, duration: 0.6 }, K2).to(mood, { gold: 0, duration: 0.4 }, T.s6 - 0.3);
  sfx(K2 + 1.3, 'success', { soft: 1 });
  cap(45.75, 48.6, 'অর্থাৎ আমাদের আসল সংকট পেঁয়াজের *উৎপাদনে নয়*…');
  cap(48.75, 51.9, 'সংকট হলো *৩০% পচন* ঠেকাতে না পারা, আর *মধ্যস্বত্বভোগীদের দৌরাত্ম্য।*');
  cap(52.05, 55.1, 'পচন ঠেকানো আর হাতবদলের শিকল ছোট করাই তাই *সমাধানের চাবি।*');
}

/* ═════════ 07 · YOUR TURN  55.2 → 62.4 ═════════ */
{
  const c = C6 = scene('s6', T.s6, T.s7, { pre: 0.25 }), t = T.s6;
  whip(t, C5, c, 'up');
  base(c, { background: 'linear-gradient(#0d3a2c,#05170f)' });
  const bulbs = E(c, 'a', '<svg width="1080" height="140" viewBox="0 0 1080 140"><path d="M0 30 Q540 140 1080 30" stroke="#0a0c06" stroke-width="4" fill="none"/>' + Array.from({ length: 13 }, (_, i) => { const x = 40 + i * 83, y = 30 + Math.sin(i / 12 * Math.PI) * 52; return `<circle class="bb" cx="${x}" cy="${y + 14}" r="12" fill="#ffe08a" style="filter:drop-shadow(0 0 10px #ffd84a)"/>`; }).join('') + '</svg>', { left: 0, top: 210 });
  const awn = E(c, 'a', `<svg width="1080" height="180" viewBox="0 0 1080 180">${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 90} 0 h90 v120 a45 45 0 0 1 -90 0z" fill="${i % 2 ? '#efe9dc' : '#c6ff1f'}"/>`).join('')}<rect width="1080" height="20" fill="#0a0c06" opacity=".25"/></svg>`, { left: 0, top: 330 });
  E(c, 'a', '', { left: 30, top: 470, width: 26, height: 900, background: '#5a3a1e' }); E(c, 'a', '', { left: 1024, top: 470, width: 26, height: 900, background: '#5a3a1e' });
  const board = E(c, 'a', `<div style="position:absolute;left:120px;top:-60px;width:6px;height:60px;background:#3a2410"></div><div style="position:absolute;right:120px;top:-60px;width:6px;height:60px;background:#3a2410"></div><div style="height:100%;border-radius:30px;background:linear-gradient(#e9c58e,#c99a5c);border:10px solid #7d4b26;display:grid;place-items:center;text-align:center;color:#3a2410"><div><div style="font:800 58px/1.2 var(--font-bn-display)">আজ পেঁয়াজের কেজি</div><div style="font:800 130px/1 var(--font-bn-display);color:#b5482f">৳ <span class="q">?</span></div></div></div>`, { left: 210, top: 560, width: 660, height: 330 });
  const guy = E(c, 'a', person(330, { shirt: '#8fd14f', expr: 'talk', pose: 'talk' }), { left: 30, top: 830 });
  const table = E(c, 'a', '<div style="height:24px;background:#dca06a;border-radius:8px"></div><div style="height:220px;background:linear-gradient(#a8693a,#5a3a1e)"></div>', { left: 0, top: 1170, width: 1080 });
  pile(c, 660, 1180, 3, 92, 41); pile(c, 920, 1180, 2, 92, 51);
  tl.fromTo([awn, bulbs], { y: -500 }, { y: 0, duration: 0.6, ease: 'back.out(1.3)' }, t)
    .fromTo(board, { rotation: -70, transformOrigin: '50% -60px', opacity: 0 }, { rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1,0.4)' }, t + 0.3)
    .fromTo(guy, { x: -420 }, { x: 0, duration: 0.6, ease: 'back.out(1.4)' }, t + 0.5)
    .to($('.mo', guy), { opacity: 1, duration: 0.13, yoyo: true, repeat: 40, ease: 'steps(1)' }, t + 0.8)
    .to(guy, { rotation: 2, transformOrigin: '50% 100%', duration: 0.5, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + 0.8);
  binds.push(T2 => { c.querySelectorAll('.bb').forEach((b, i) => { b.style.opacity = 0.55 + 0.45 * Math.sin(T2 * 3 + i * 1.3); }); $('.q', board).textContent = ['?', '৬০', '৯০', '১২০', '?', '১৫০', '?'][Math.floor(Math.max(0, T2 - t - 1) * 2.6) % 7]; });
  sfx(t + 0.3, 'creak'); sfx(t + 0.5, 'swish');
  // the poll
  const Pq = t + 3.2;
  tl.to(board, { y: -900, duration: 0.5, ease: 'power3.in' }, Pq - 0.2);
  const O = [['আমদানি জটিলতা', '#2fd3b5', ship(200)], ['সংরক্ষণের অভাব', '#c6ff1f', shed(180)], ['সিন্ডিকেট', '#ff4a3d', person(110, { shirt: '#06100b', hair: '#06100b', skin: '#0d1a13', expr: 'smirk' })]];
  const cards = O.map(([nm, col, art], i) => E(c, 'a panel', `<div class="fl" style="position:absolute;inset:0;border-radius:38px;background:${col};opacity:0"></div><div style="position:relative;height:100%;display:grid;grid-template-rows:200px 1fr;place-items:center;padding:20px 10px"><div style="display:grid;place-items:center;height:190px">${art}</div><div class="tx" style="font:800 40px/1.15 var(--font-bn-display);color:${col};text-align:center">${nm}</div></div>`, { left: 40 + i * 340, top: 470, width: 320, height: 340, borderColor: col }));
  cards.forEach((cd, i) => { tl.fromTo(cd, { y: -700, rotation: (i - 1) * 12, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, Pq + i * 0.15); sfx(Pq + i * 0.15, 'pop', { p: i * 2 }); });
  [0, 1, 2, 1, 0, 2, 1, 2].forEach((k, j) => { const at = Pq + 0.8 + j * 0.36, cd = cards[k];
    tl.to($('.fl', cd), { opacity: 0.25, duration: 0.06 }, at).to($('.fl', cd), { opacity: 0, duration: 0.25 }, at + 0.3).fromTo(cd, { scale: 1 }, { scale: 1.07, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, at); sfx(at, 'tick', { p: k * 2 }); });
  const cmt = E(c, 'a', `<div style="height:100%;border-radius:50px;background:var(--lime);color:#0a0c06;display:flex;align-items:center;justify-content:center;gap:22px;font:800 76px/1 var(--font-bn-display);box-shadow:0 0 110px rgba(198,255,31,.5)">${ico('chat', 90, '#0a0c06', 2.4)}কমেন্টে জানান</div>`, { left: 390, top: 900, width: 650, height: 160 });
  tl.fromTo(cmt, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, Pq + 1.6).to(cmt, { scale: 1.05, rotation: -1.5, duration: 0.35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, Pq + 2.2);
  sfx(Pq + 1.6, 'bubble'); sfx(Pq + 1.9, 'ding');
  cap(55.35, 58.3, 'এবার আপনার এলাকার খবর বলুন — আজ বাজারে পেঁয়াজের *কেজি কত?*');
  cap(58.45, 62.3, 'আসল দায়ী কে — আমদানি জটিলতা, সংরক্ষণের অভাব, নাকি *সিন্ডিকেট?* কমেন্টে জানান!');
}

/* ═════════ 08 · LOGO  62.4 → 69.6  (built after fonts load: the logo measures glyphs) ═════════ */
window.__afterFonts = () => {
  const c = scene('s7', T.s7, T.end + 1, { pre: 0.55, push: 1 }), t = T.s7;
  iris(t, c, 715, 980, 0.55);
  tl.to(['#segs', '#hudL', '#hudR'], { opacity: 0, duration: 0.2 }, t - 0.2);
  const L = buildCaseStudiesLogo(c, { width: 900, cy: 900 });
  tl.add(L.timeline, t); binds.push(T2 => L.draw(T2 - t));
  L.cues.forEach(q => sfx(t + q.t, 'logo_' + q.name, q.p != null ? { p: q.p } : q.d ? { d: q.d } : undefined));
  L.sub.innerHTML = `<div class="ep" style="position:absolute;left:0;right:0;top:${L.top - 200}px;text-align:center"><span class="chip" style="font-size:36px">এপিসোড ০২ · পেঁয়াজের ধাঁধা</span></div>
    <div class="rl" style="position:absolute;left:340px;top:${L.bottom + 70}px;width:400px;height:4px;background:var(--lime);border-radius:4px"></div>
    <div class="by" style="position:absolute;left:0;right:0;top:${L.bottom + 100}px;text-align:center;font:700 32px/1 var(--font-en-display);letter-spacing:.5em;text-indent:.5em;color:var(--lime)">A BAUBC SERIES</div>
    <div class="fu" style="position:absolute;left:0;right:0;top:${L.bottom + 160}px;text-align:center;font:500 18px/1 var(--font-en-display);letter-spacing:.24em;color:var(--cream-dim)">BANGLADESH AGRICULTURAL UNIVERSITY BUSINESS CLUB</div>
    <div class="fo" style="position:absolute;left:0;right:0;top:${L.bottom + 260}px;text-align:center;font:700 50px/1 var(--font-bn-display);color:var(--cream)">ফলো করুন — পরের কেস স্টাডি আসছে</div>`;
  const q = s => L.sub.querySelector(s);
  tl.fromTo(q('.rl'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, t + 3.3)
    .fromTo(q('.by'), { opacity: 0, letterSpacing: '1.5em' }, { opacity: 1, letterSpacing: '.5em', duration: 0.8, ease: 'expo.out' }, t + 3.4)
    .fromTo(q('.fu'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, t + 3.7)
    .fromTo(q('.ep'), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 3.6)
    .fromTo(q('.fo'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 4.2);
};
