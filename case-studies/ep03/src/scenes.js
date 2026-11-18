/* EP03 v2 · পুরান চাল ভাতে বাড়ে? — chapters 01–02. Every time comes from the voice: S(i) line start, W(i,'word'), F(i,frac). */
const H = (c, html, top, size, css) => E(c, 'a h', html, Object.assign({ left: 0, width: 1080, top, fontSize: size }, css));
const chipK = (c, html, css, col = P.lime, fs = 40) => E(c, 'a', `<span style="display:inline-block;padding:10px 28px 6px;border-radius:40px;border:3px solid ${col};color:${col};background:rgba(7,14,42,.85);font:800 ${fs}px/1.2 var(--font-bn-display);white-space:nowrap">${html}</span>`, css);
const plaqueK = (c, html, css, bgc = P.red, fg = P.cream, fs = 64) => E(c, 'a', `<div style="padding:14px 34px 8px;border-radius:22px;background:${bgc};color:${fg};font:800 ${fs}px/1.12 var(--font-bn-display);box-shadow:0 18px 40px rgba(0,0,0,.45);border:6px solid ${fg};white-space:nowrap;text-align:center">${html}</div>`, css);
const skyK = (Wd, a, b, c2) => Wd.plane(.04, { left: -260, top: -260, width: 1600, height: 2440, background: `linear-gradient(${a},${b} 55%,${c2})` });
const floorK = (pl, y, a, b) => E(pl, 'a', '', { left: -500, top: y, width: 2100, height: 1400, background: `linear-gradient(${a},${b} 30%)` });
const glowAt = (pl, x, y, s, col) => E(pl, 'a', halo(s, col), { left: x - s / 2, top: y - s / 2 });
/** gentle bob on a WRAPPER element (keeps the inner element's own tweens free) */
const bob = (el, t0, t1, amp = 12, per = 1.8, rot = 0) => { const n = Math.max(1, Math.round((t1 - t0) / per)); tl.to(el, { y: -amp, rotation: rot, duration: per / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0); };
/** drop-in with squash & stretch; el needs transform-origin 50% 100% */
const land = (el, t, from = -900, snd = 'thud') => { el.style.opacity = 0; tl.fromTo(el, { y: from, scaleY: 1.25, scaleX: .82, opacity: 1 }, { y: 0, duration: .42, ease: 'power2.in', immediateRender: false }, t)
  .to(el, { scaleY: .72, scaleX: 1.22, duration: .08, ease: 'power1.out' }, t + .42).to(el, { scaleY: 1, scaleX: 1, duration: .6, ease: 'elastic.out(1,.35)' }, t + .5); if (snd) sfx(t + .4, snd); };
/** pop with overshoot + anticipation */
const popK = (el, t, s = 'pop') => { el.style.opacity = 0; tl.fromTo(el, { scale: 0, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, duration: .55, ease: 'back.out(2.6)', immediateRender: false }, t); if (s) sfx(t, s); };
/** a flame cluster that flickers */
function flames(pl, x, y, s = 1) {
  const fl = [0, 1, 2, 3].map(i => E(pl, 'a', svg(70 * s, '0 0 70 110', `<path d="M35 108 Q2 90 12 56 Q20 30 35 2 Q50 30 58 56 Q68 90 35 108Z" fill="${['#ff8a3d', '#ffc93c', '#ef4b3f', '#ffe58a'][i]}"/>`), { left: x + (i - 1.5) * 34 * s, top: y - 110 * s + (i % 2) * 14, transformOrigin: '50% 100%' }));
  binds.push(t => fl.forEach((f, i) => { f.style.transform = `scale(${.8 + .25 * Math.sin(t * 13 + i * 2)},${.85 + .3 * Math.sin(t * 9.7 + i * 1.3)})`; }));
}
/** a steam plume that keeps drawing upward */
function steam(pl, x, y, w, h, c = 'rgba(255,244,220,.5)', sp = 1) {
  const el = E(pl, 'a', plume(w, h, c), { left: x - w / 2, top: y - h }), ps = [...el.querySelectorAll('.pl')];
  ps.forEach(p => { p.style.strokeDasharray = '160 420'; });
  binds.push(t => ps.forEach((p, i) => { p.style.strokeDashoffset = (t * 260 * sp + i * 190) % 580; }));
  return el;
}
let A, B, C, D, E1, F1;

/* ═════════ A · hook — Dadi's kitchen: "পুরান চাল ভাতে বাড়ে" ═════════ */
{
  const tB = W(0, 'বিজনেস') - .45, c = A = scene('A', 0, tB, { post: .2, push: 1 }), Wd = world(c);
  skyK(Wd, P.n1, P.n2, P.n3);
  const back = Wd.plane(.15);
  E(back, 'a', `<div style="position:relative;width:290px;height:360px;border-radius:145px 145px 18px 18px;background:linear-gradient(#070e2a,#24397a);border:16px solid ${P.n4};overflow:hidden">
    <div style="position:absolute;left:140px;top:60px;width:96px;height:96px;border-radius:50%;background:#fff4dc;box-shadow:0 0 60px 24px rgba(255,244,220,.35)"></div>${svg(260, '0 0 260 340', Array.from({ length: 16 }, (_, i) => `<circle cx="${rnd(i + 3) * 260}" cy="${rnd(i + 9) * 200}" r="${1.5 + rnd(i) * 2}" fill="#dfe8ff"/>`).join(''), 'position:absolute;left:0;top:0')}
    <div style="position:absolute;left:0;right:0;bottom:0;height:90px;background:#0a1230"></div></div>`, { left: 740, top: 560 });
  E(back, 'a', svg(440, '0 0 440 200', `<rect x="0" y="150" width="440" height="18" rx="6" fill="${P.n4}"/>${[[30, 70, P.orange], [110, 96, P.gold], [196, 60, P.red], [262, 84, P.lime], [340, 74, P.orange]].map(([x, h, col]) => `<path d="M${x} 150 V${150 - h + 14} Q${x} ${150 - h} ${x + 14} ${150 - h} H${x + 46} Q${x + 60} ${150 - h} ${x + 60} ${150 - h + 14} V150Z" fill="${col}" opacity=".85"/><rect x="${x + 8}" y="${150 - h - 12}" width="44" height="14" rx="5" fill="${P.n5}"/>`).join('')}`), { left: 300, top: 540 });
  const lamp = Wd.plane(.35); glowAt(lamp, 640, 860, 900, 'rgba(255,150,60,.35)');
  const mid = Wd.plane(.6);
  floorK(mid, 1250, P.n3, P.n1);
  E(mid, 'a', svg(500, '0 0 500 260', `<path d="M10 260 L30 40 Q250 0 470 40 L490 260Z" fill="#9a4a2a"/><path d="M30 40 Q250 0 470 40" stroke="#c9703f" stroke-width="12" fill="none"/><path d="M160 260 V170 Q250 110 340 170 V260Z" fill="#2a0e0a"/><path d="M50 80 Q60 200 70 250" stroke="#fff" stroke-opacity=".15" stroke-width="14" fill="none"/>`), { left: 420, top: 1040 });
  flames(mid, 670, 1265, 1.1); glowAt(mid, 670, 1200, 360, 'rgba(255,170,60,.55)');
  const pot = E(mid, 'a', handi(400), { left: 470, top: 690 }), mound = $('.mound', pot);
  const st = [steam(mid, 600, 720, 120, 420, 'rgba(255,244,220,.45)'), steam(mid, 760, 700, 110, 380, 'rgba(255,244,220,.35)', .8)];
  const dadi = actor(mid, 330, { top: 'saree', low: 'saree', c1: '#fbf1dc', head: 'veil', hair: 'grey', skin: '#9a6040', expr: 'talk', pose: [[8, 4], [60, 70]], holdR: ladle(1.1) }, { left: 40, top: 1300 - 627 });
  dadi.breathe(0, tB).blink(1.2, 3.6, 5.4).talk(.35, 2.05).talk(2.7, tB);
  dadi.nod(2.7, 2); dadi.swing('R', 0, tB, 14, 1.1);
  fgStrip(Wd, 'wood', 0, '#5a2a18', '#9a4a2a');
  const fg = Wd.plane(1.3);
  E(fg, 'a', svg(420, '0 0 420 200', `<path d="M0 200 Q40 40 210 30 Q380 40 420 200Z" fill="#070e2a"/><path d="M40 160 Q210 60 380 160" stroke="${P.n3}" stroke-width="8" fill="none"/>`), { left: -120, top: 1610 });
  E(fg, 'a', svg(300, '0 0 300 300', `<path d="M60 300 V120 Q60 80 100 80 H200 Q240 80 240 120 V300Z" fill="#070e2a"/><rect x="90" y="54" width="120" height="30" rx="10" fill="#0e1a44"/>`), { left: 860, top: 1560 });
  // speech bubble — the proverb, on screen from frame 0
  const bub = E(c, 'a', `<div style="position:relative;width:940px;padding:34px 20px 22px;border-radius:46px;background:${P.cream};box-shadow:0 24px 60px rgba(0,0,0,.5);text-align:center;font:800 84px/1.15 var(--font-bn-display);color:${P.n1}"><span style="color:${P.orange}">‘</span>পুরান চাল <span style="color:${P.red}">ভাতে বাড়ে</span><span style="color:${P.orange}">’</span>
    ${svg(120, '0 0 120 220', `<path d="M10 0 L110 0 L40 210Z" fill="${P.cream}"/>`, 'position:absolute;left:110px;top:150px')}</div>`, { left: 70, top: 250, transformOrigin: '20% 100%' });
  tl.fromTo(bub, { scale: .94, rotation: -2 }, { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1,.4)' }, 0);
  // the rice "grows" in the pot — squash & stretch, grains jump out
  const BR = W(0, 'বাড়ে') - .1;
  tl.fromTo(mound, { scaleY: .5 }, { scaleY: 1, duration: .5, ease: 'power2.out' }, .1)
    .to(mound, { scaleY: 2.6, scaleX: 1.08, duration: .7, ease: 'elastic.out(1,.45)' }, BR);
  sfx(0, 'boil', { d: tB }); sfx(BR, 'squish'); sfx(BR + .1, 'pop', { p: 2 });
  for (let i = 0; i < 9; i++) { const gr = E(mid, 'a', grain(34, 0), { left: 650 + (rnd(i) - .5) * 160, top: 690, opacity: 0 }), a = (rnd(i + 4) - .5) * 560;
    tl.fromTo(gr, { opacity: 1, x: 0, y: 0, rotation: 0 }, { keyframes: [{ x: a * .5, y: -260 - rnd(i + 2) * 200, rotation: 200, duration: .45, ease: 'power2.out' }, { x: a, y: 380, rotation: 420, duration: .55, ease: 'power2.in' }], immediateRender: false }, BR + .05 + i * .05).set(gr, { opacity: 0 }, BR + 1.2 + i * .05); }
  sfx(BR + .3, 'plop', { p: 1 }); sfx(BR + .55, 'plop', { p: 2 });
  // camera: wide → creeps onto Dadi's face → dive into her head
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1000, 1.08), { duration: BR, ease: 'sine.inOut' }), 0)
    .to(Wd.cam, Object.assign(Wd.aim(205, 800, 1.7, 540, 900), { duration: tB - BR - .2, ease: 'power2.inOut' }), BR + .3)
    .to(bub, { opacity: 0, y: -120, scale: .9, duration: .5, ease: 'power2.in' }, W(0, 'ইতিহাসের') - .2);
  sfx(BR + .4, 'whoosh');
}

/* ═════════ B · inside the head: the brain-wash ═════════ */
{
  const tB = W(0, 'বিজনেস') - .45, tC = W(1, 'হাজার') - .35, c = B = scene('B', tB, tC, { pre: .15, post: .2, push: 1.06 }), Wd = world(c);
  zoomThru(tB, A, B, 540, 900, .55);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.1), 90, 1900, 5); fgStrip(Wd, 'foam', 3);
  glowAt(Wd.plane(.2), 400, 760, 1200, 'rgba(90,120,196,.35)');
  const hp = Wd.plane(.5), hd = E(hp, 'a', headProfile(980), { left: -150, top: 300 }), hdR = E(hp, 'a', headProfile(980, P.red), { left: -150, top: 300, opacity: 0 });
  const wsh = E(hp, 'a', washer(420), { left: 145, top: 549 }), tum = $('.tumble', wsh);
  const items = [[wordChip('পুরান চাল', P.cream, P.n1, 40), 0], [wordChip('ভাতে বাড়ে', P.gold, P.n1, 40), 180], [bubble(70), 90], [bubble(50), 270], [bubble(40), 140]];
  items.forEach(([h, a]) => { const it = E(tum, 'a', h, { left: 210, top: 210 }); it.style.transform = `rotate(${a}deg) translate(0,-96px) translate(-50%,-50%)`; });
  binds.push(t => { const k = Math.max(0, t - tB), ang = k * 160 + Math.pow(k, 2) * 50; tum.style.transform = `rotate(${ang}deg)`; });
  sfx(tB + .1, 'machine', { d: tC - tB });
  // soap bubbles leak out of the head
  const BU = Array.from({ length: 16 }, (_, i) => E(Wd.plane(.7), 'a', bubble(26 + rnd(i) * 54), { left: 150 + rnd(i + 3) * 560, top: 0 }));
  binds.push(t => BU.forEach((b, i) => { const k = t - tB, y = 860 - ((k * (90 + rnd(i) * 80) + rnd(i + 7) * 700) % 760); b.style.transform = `translate(${Math.sin(k * 2 + i) * 30}px,${y}px)`; b.style.opacity = Math.min(1, (860 - y) / 120) * Math.min(1, y / 160 + .2); }));
  const BW = W(0, 'ব্রেইনওয়াশ') - .05, stmp = plaqueK(c, 'ব্রেইনওয়াশ!', { left: 520, top: 330, transform: 'rotate(8deg)' }, P.red, P.cream, 76);
  tl.fromTo(stmp, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .22, ease: 'power4.in' }, BW).to(hdR, { opacity: 1, duration: .25 }, BW + .2).to(mood, { red: .7, duration: .3 }, BW + .2).to(mood, { red: 0, duration: .6 }, tC - .6);
  shake(BW + .22, 18, .35); sfx(BW + .2, 'stamp');
  const biz = chipK(c, 'বাংলার সবচেয়ে বড় বিজনেস চাল', { left: 0, width: 1080, top: 1210, textAlign: 'center' }, P.gold, 38); popK(biz, W(0, 'বিজনেস') - .1, null);
  // "আর এই এক প্রবাদের কারণেই…" — push into the drum window
  out([stmp, biz], S(1) - .1);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(355, 759, 1.25, 540, 900), { duration: tC - tB, ease: 'sine.inOut' }), tB);
  const one = chipK(c, 'এক প্রবাদ', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.cream, 54); popK(one, W(1, 'প্রবাদের') - .1); out(one, tC - .4);
}

/* ═════════ C · a thousand-year festival → a seasonal photoshoot → locked in a polaroid ═════════ */
{
  const tC = W(1, 'হাজার') - .35, tD = S(2) - .2, tA = W(1, 'আজ') - .15, tJ = W(1, 'বন্দি') - .1;
  const c = C = scene('C', tC, tD, { pre: .15, post: .45, push: 1 });
  zoomThru(tC, B, C, 540, 900, .5);
  const shot = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wd = world(shot);
  skyK(Wd, '#ff7a3d', '#ffc93c', '#ffe9a8');
  E(Wd.plane(.08), 'a', sunK(360), { left: 360, top: 640 });
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 500, '#c4502a', 3, 6, 90, 'rgba(255,233,168,.5)'), { left: -300, top: 960 });
  [[-40, 760], [160, 800], [820, 770], [1000, 800]].forEach(([x, y], i) => E(far, 'a', palm(150 + i * 10, '#8a3220'), { left: x, top: y }));
  const mid = Wd.plane(.45); E(mid, 'a', hillBand(1800, 600, '#8a2a3a', 8, 5, 70, 'rgba(255,201,60,.5)'), { left: -360, top: 1080 });
  paddyBand(mid, 1240, 1800, 2, 1, 4, 140, -360);
  const crowd = Wd.plane(.7), dancers = [];
  [['#ef4b3f', 1], ['#ffc93c', 0], ['#5a78c4', 1], ['#b8f53c', 0], ['#ff8a3d', 1], ['#fbf1dc', 0], ['#ef4b3f', 1]].forEach(([c1, f], i) => {
    const a = actor(crowd, 150, f ? { top: 'saree', low: 'saree', c1, head: 'veil', sareeG: i % 2, skin: '#a8673e', pose: 'up', expr: 'happy' } : { top: 'genji', c1, low: 'lungi', lungi: 'BGP'[i % 3], head: 'gamcha', skin: '#7a4a2a', pose: i === 3 ? 'head' : 'up', expr: 'happy', must: 1 }, { left: -260 + i * 230, top: 1330 - 285 });
    dancers.push(a); const n = Math.round((tA - tC) / .5); tl.to(a, { y: -34, duration: .25, yoyo: true, repeat: n * 2 - 1, ease: 'power1.out', delay: rnd(i) * .2 }, tC);
  });
  E(crowd, 'a', dhol(230), { left: 520, top: 1180 });
  floorK(crowd, 1320, '#6e2a18', '#2a0e0a');
  fgStrip(Wd, 'paddy', 5, '#3a0e10', 'rgba(255,201,60,.5)');
  const bun = E(Wd.plane(1.1), 'a', bunting(1500, 18, [P.red, P.gold, P.cream, P.lime, P.orange]), { left: -210, top: 240 });
  binds.push(t => bun.querySelectorAll('.fl').forEach((f, i) => { f.style.transformBox = 'fill-box'; f.style.transformOrigin = 'center top'; f.style.transform = `rotate(${Math.sin(t * 3 + i) * 9}deg)`; }));
  [0, 1, 2].forEach(i => { const l = E(Wd.plane(1.15), 'a', lantern(90), { left: 120 + i * 380, top: 330 + (i % 2) * 70, transformOrigin: '50% 0' }); bob(l, tC, tD, 0, 1.6, 6); });
  tl.fromTo(Wd.cam, Wd.aim(300, 1000, 1.05), Object.assign(Wd.aim(780, 1000, 1.05), { duration: tA - tC, ease: 'sine.inOut' }), tC);
  for (let k = tC; k < tA; k += .5) sfx(k, 'dhol', { p: Math.round((k - tC) * 2) % 3 });
  sfx(tC, 'crowd', { d: tA - tC });
  const yr = chipK(c, '<span class="n">০</span> বছরের নবান্ন', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.n1, 52);
  $('span', yr).style.background = P.cream;
  popK(yr, tC + .2); counter($('.n', yr), 0, 1000, tC + .2, 1.4); sfx(tC + .2, 'count', { d: 1.4 }); out(yr, tA - .1);
  // "আজ…" — focus pulls, a phone frame slams in, the girl poses
  tl.to([far, mid, crowd], { filter: 'blur(7px) saturate(.7)', duration: .5 }, tA).to(Wd.cam, Object.assign(Wd.aim(540, 1000, 1.12), { duration: tJ - tA, ease: 'sine.out' }), tA);
  const girl = Wd.plane(1), gw = E(girl, 'a', '', { left: 330, top: 1350 - 627, width: 330, height: 627, transformOrigin: '50% 100%', opacity: 0 });
  const g1 = actor(gw, 330, { top: 'saree', low: 'saree', c1: P.orange, sareeG: 1, head: null, hair: 'bun', skin: '#b07048', pose: [[8, 4], [160, 40]], expr: 'happy' }, { left: 0, top: 0 });
  const g2 = actor(gw, 330, { top: 'saree', low: 'saree', c1: P.orange, sareeG: 1, head: null, hair: 'bun', skin: '#b07048', pose: [[30, -80], [30, -80]], expr: 'smug' }, { left: 0, top: 0, opacity: 0 });
  E(gw, 'a', sheaf(150), { left: -90, top: 250 });
  land(gw, tA + .05, -1100, 'thud');
  const ph = E(c, 'a', phoneFrame(860, 1240), { left: 110, top: 250 });
  tl.fromTo(ph, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(1.4)' }, tA).fromTo(shot, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: 'inset(272px 132px 452px 132px round 50px)', duration: .35, ease: 'power2.out' }, tA);
  sfx(tA, 'whoosh');
  const fl = E(c, 'a', '', { left: 132, top: 272, width: 816, height: 1196, borderRadius: 50, background: '#fff', opacity: 0 });
  [W(1, 'সিজনাল'), W(1, 'ফটোশুটে')].forEach((t, i) => { tl.fromTo(fl, { opacity: .95 }, { opacity: 0, duration: .35, immediateRender: false }, t); sfx(t, 'shutter'); if (i) tl.set(g1, { opacity: 0 }, t).set(g2, { opacity: 1 }, t); });
  binds.push(t => { const r = $('.rec i', ph); if (r) r.style.opacity = Math.floor(t * 2) % 2 ? .25 : 1; });
  // "বন্দি" — the photo shrinks into a polaroid and gets locked behind bars
  const pf = E(c, 'a', '', { left: 160, top: 350, width: 760, height: 920, borderRadius: 12, background: '#fbf8ef', boxShadow: '0 30px 80px rgba(0,0,0,.6)', opacity: 0 });
  c.insertBefore(pf, shot);
  tl.to(ph, { opacity: 0, scale: 1.1, duration: .3 }, tJ).to(shot, { clipPath: 'inset(380px 190px 840px 190px round 6px)', duration: .45, ease: 'power3.inOut' }, tJ)
    .fromTo(pf, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out', immediateRender: false }, tJ);
  const cap2 = E(c, 'a', `<div style="font:800 46px/1 var(--font-bn-display);color:${P.n2};text-align:center;width:760px">#নবান্ন_ফটোশুট</div>`, { left: 160, top: 1140, opacity: 0 }); tl.to(cap2, { opacity: 1, duration: .3 }, tJ + .3);
  const br = E(c, 'a', bars(700, 700), { left: 190, top: 380, opacity: 0 });
  tl.fromTo(br, { y: -1100, opacity: 1 }, { y: 0, duration: .4, ease: 'bounce.out', immediateRender: false }, tJ + .35); sfx(tJ + .45, 'impact');
  const lk = E(c, 'a', padlock(150), { left: 465, top: 1010, transformOrigin: '50% 0' }); popK(lk, tJ + .75, 'lock');
  tl.to([shot, pf, br, lk, cap2], { rotation: -3, duration: .6, ease: 'back.out(2)' }, tJ + .6).to(mood, { dim: .3, duration: .3 }, tJ);
}

/* ═════════ D · rewind → "নবান্ন" = নব (নতুন) + অন্ন (ভাত) → a plate of new aman rice ═════════ */
{
  const tD = S(2) - .2, tE = S(3) - .2, c = D = scene('D', tD, tE, { pre: .4, post: .3, push: 1 }), Wd = world(c);
  tl.to(root(C), { rotation: -540, scale: 0, opacity: 0, duration: .8, ease: 'power3.in', transformOrigin: '540px 860px' }, tD - .4).to(mood, { dim: 0, duration: .5 }, tD);
  tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: .4 }, tD - .2);
  const sky = skyK(Wd, P.n1, '#ff8a3d', '#ffd25a');
  starField(Wd.plane(.06), 40, 700, 13);
  // the rewind clock becomes the rising sun
  const sunP = Wd.plane(.1), sn = E(sunP, 'a', sunK(300), { left: 390, top: 820, opacity: 0 });
  const clk = E(sunP, 'a', `<div style="position:relative;width:420px;height:420px;border-radius:50%;background:${P.cream};box-shadow:0 0 0 18px ${P.gold},0 30px 60px rgba(0,0,0,.4)">${svg(420, '-210 -210 420 420', Array.from({ length: 12 }, (_, i) => `<rect x="-6" y="-190" width="12" height="${i % 3 ? 24 : 44}" rx="6" fill="${P.n2}" transform="rotate(${i * 30})"/>`).join('') + `<g class="hh"><rect x="-9" y="-110" width="18" height="120" rx="9" fill="${P.n1}"/></g><g class="mh"><rect x="-6" y="-170" width="12" height="180" rx="6" fill="${P.red}"/></g><circle r="16" fill="${P.n1}"/>`)}</div>`, { left: 330, top: 340 });
  binds.push(t => { const k = Math.max(0, Math.min(1.3, t - tD + .3)), a = -k * 1300; const m = $('.mh', clk), h = $('.hh', clk); m.setAttribute('transform', `rotate(${a})`); h.setAttribute('transform', `rotate(${a / 12})`); });
  const rw = chipK(c, '◀◀ পেছনে', { left: 70, top: 260 }, P.cream, 40); tl.fromTo(rw, { opacity: 0 }, { opacity: 1, duration: .1, yoyo: true, repeat: 5, immediateRender: false }, tD - .2).set(rw, { opacity: 0 }, tD + 1);
  const scan = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 3px,transparent 3px 9px)', opacity: 0 });
  tl.fromTo(scan, { opacity: 1 }, { opacity: 0, duration: .3, immediateRender: false }, tD + 1); sfx(tD - .3, 'rewind');
  tl.to(clk, { scale: .7, y: 480, opacity: 0, duration: .7, ease: 'power2.inOut' }, tD + 1).fromTo(sn, { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, tD + 1.1);
  tl.fromTo(sky, { filter: 'brightness(.5)' }, { filter: 'brightness(1)', duration: 2, immediateRender: false }, tD + 1);
  const far = Wd.plane(.22); E(far, 'a', hillBand(1700, 500, P.n3, 21, 6, 80, 'rgba(255,201,60,.45)'), { left: -300, top: 960 });
  [[-60, 760], [900, 790], [700, 820]].forEach(([x, y], i) => E(far, 'a', palm(160, P.n2), { left: x, top: y }));
  const mid = Wd.plane(.5); E(mid, 'a', hillBand(1800, 700, P.n2, 33, 5, 60, 'rgba(255,201,60,.5)'), { left: -360, top: 1060 });
  paddyBand(mid, 1230, 1800, 3, 1, 9, 150, -360);
  [[120, 0], [700, 1]].forEach(([x, k]) => { const f = actor(mid, 170, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: k ? 'G' : 'B', head: 'gamcha', must: 1, skin: '#7a4a2a', pose: 'sickle', holdR: sickle(1.2), expr: 'happy' }, { left: x, top: 1250 - 323 }); f.swing('R', tD, tE, 40, .9); });
  sfx(W(2, 'নতুন') , 'birds', { d: 3 });
  const front = Wd.plane(1.25), leaf = E(front, 'a', svg(760, '0 0 760 300', `<path d="M10 200 Q380 0 750 200 Q380 300 10 200Z" fill="#3f8f3a"/><path d="M10 200 Q380 150 750 200" stroke="#6fbf4a" stroke-width="8" fill="none"/>`), { left: 160, top: 1500 });
  const pl = E(front, 'a', plate(520), { left: 280, top: 1480 }); steam(front, 540, 1500, 150, 360, 'rgba(255,244,220,.6)');
  // the word, split
  const NB = W(2, 'নবান্ন') - .1, h1 = H(c, `<span style="color:${P.gold}">নবান্ন</span>`, 330, 170, { textShadow: '0 10px 0 rgba(7,14,42,.6)' });
  hIn(h1, NB, { st: .05 }); sfx(NB, 'impact');
  const MN = W(2, 'মানেই') - .05;
  tl.to(h1, { y: -70, scale: .62, duration: .45, ease: 'power3.inOut' }, MN);
  const tA_ = plaqueK(c, `নব <span style="opacity:.7">=</span> নতুন`, { left: 70, top: 520 }, P.lime, P.n1, 62), tB_ = plaqueK(c, `অন্ন <span style="opacity:.7">=</span> ভাত`, { left: 570, top: 520 }, P.gold, P.n1, 62);
  const pl2 = E(c, 'a', `<div style="font:900 80px/1 var(--font-en-display);color:${P.cream}">+</div>`, { left: 512, top: 538 });
  popK(tA_, W(2, 'নতুন অন্ন') - .05, 'pop'); popK(pl2, W(2, 'নতুন অন্ন') + .2, null); popK(tB_, W(2, 'অন্ন') + .1, 'pop');
  const AM = W(2, 'আমন') - .25;
  out([h1, tA_, tB_, pl2], AM, { y: -120 });
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1010, 1.05), { duration: AM - tD, ease: 'sine.inOut' }), tD)
    .to(Wd.cam, Object.assign(Wd.aim(540, 1560, 1.25, 540, 1050), { duration: tE - AM, ease: 'power2.inOut' }), AM);
  const am = chipK(c, 'নতুন আমন ধানের ভাত', { left: 0, width: 1080, top: 400, textAlign: 'center' }, P.gold, 50); popK(am, AM + .3); sfx(AM, 'whoosh');
}

/* ═════════ E · the real new year — the biggest luxury of the year ═════════ */
{
  const tE = S(3) - .2, tF = S(4) - .2, c = E1 = scene('E', tE, tF, { pre: .25, post: .25, push: 1 }), Wd = world(c);
  whip(tE, D, E1, 'left', .5);
  skyK(Wd, P.n0, '#3a2a6a', '#ff8a3d'); starField(Wd.plane(.06), 60, 900, 31);
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 600, P.n2, 41, 6, 80), { left: -300, top: 980 });
  [[-40, 700], [140, 740], [880, 720]].forEach(([x, y]) => E(far, 'a', palm(170, P.n1), { left: x, top: y }));
  E(far, 'a', hut(330, '#7a3a2a'), { left: 600, top: 860 });
  const mid = Wd.plane(.5); floorK(mid, 1160, '#c9703f', '#5a2a18');
  E(mid, 'a', svg(1600, '0 0 1600 200', Array.from({ length: 14 }, (_, i) => `<ellipse cx="${i * 120 + 40}" cy="${80 + (i % 3) * 30}" rx="40" ry="10" fill="#e8a060" opacity=".4"/>`).join('')), { left: -260, top: 1180 });
  [0, 1, 2, 3].forEach(i => { const l = E(Wd.plane(.8), 'a', lantern(80), { left: 80 + i * 270, top: 300 + (i % 2) * 60, transformOrigin: '50% 0' }); glowAt(Wd.plane(.8), 120 + i * 270, 370 + (i % 2) * 60, 240, 'rgba(255,170,80,.5)'); bob(l, tE, tF, 0, 1.4 + i * .1, 6); });
  const bun = E(Wd.plane(1.1), 'a', bunting(1500, 18, [P.red, P.gold, P.cream, P.lime, P.orange]), { left: -210, top: 220 });
  binds.push(t => bun.querySelectorAll('.fl').forEach((f, i) => { f.style.transformBox = 'fill-box'; f.style.transformOrigin = 'center top'; f.style.transform = `rotate(${Math.sin(t * 3 + i) * 9}deg)`; }));
  fgStrip(Wd, 'grass', 17, '#1a0c10', 'rgba(255,170,80,.4)');
  // farmers walk in with baskets of new paddy on their heads
  const walkers = [0, 1].map(i => { const gw = E(mid, 'a', '', { left: -420 - i * 300, top: 1200 - 361, width: 190, height: 361 });
    actor(gw, 190, { top: 'genji', c1: i ? '#f4ead6' : '#ffc93c', low: 'lungi', lungi: i ? 'G' : 'B', head: null, hair: 'short', must: 1, skin: '#7a4a2a', pose: 'head', expr: 'happy' }, { left: 0, top: 0 }).blink(tE + 1, tE + 3);
    E(gw, 'a', basket(200), { left: -5, top: -60 }); return gw; });
  walkers.forEach((w, i) => { tl.to(w, { x: 760 + i * 120, duration: 3.2, ease: 'power1.out' }, tE + .1); tl.to(w, { y: -10, duration: .16, yoyo: true, repeat: 19, ease: 'sine.inOut' }, tE + .1); });
  sfx(tE + .2, 'crowd', { d: 3, soft: 1 });
  // "আসল নববর্ষ" — the calendar page lands, fireworks
  const NV = W(3, 'আসল') - .1, cal = E(c, 'a', calPage(330, 'অগ্রহায়ণ', '১', P.red), { left: 640, top: 300, transformOrigin: '50% 100%' });
  tl.set(cal, { opacity: 0 }, tE - .3); land(cal, NV, -900, 'thud');
  const nb = plaqueK(c, 'আসল নববর্ষ!', { left: 610, top: 760, transform: 'rotate(-5deg)' }, P.gold, P.n1, 52); popK(nb, NV + .5, 'star');
  [[260, 420, 0], [180, 640, .3], [420, 330, .55]].forEach(([x, y, d]) => { burst(c, x, y, NV + .3 + d, 24, [P.gold, P.lime, P.red, P.cream], 240); sfx(NV + .3 + d, 'pop', { p: 1 }); });
  // "লাক্সারি" — the world dims; one new-rice grain is crowned on a velvet cushion
  const LX = W(3, 'বছরের') - .1, dim = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'rgba(7,14,42,.78)', opacity: 0 });
  tl.to(dim, { opacity: 1, duration: .4 }, LX).to([cal, nb], { opacity: 0, duration: .3 }, LX);
  const spot = E(c, 'a', svg(1080, '0 0 1080 1400', `<path d="M440 0 H640 L960 1300 H120Z" fill="url(#gSun)" opacity=".28"/>`), { left: 0, top: 0, opacity: 0 }); tl.to(spot, { opacity: 1, duration: .3 }, LX + .1); sfx(LX + .1, 'switch');
  const hero = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), cu = E(hero, 'a', cushion(560), { left: 260, top: 1040 }), gr = E(hero, 'a', grain(210, 1, 'happy'), { left: 435, top: 720, transformOrigin: '50% 100%' }), cr = E(hero, 'a', crown(190), { left: 445, top: 600, transformOrigin: '50% 100%' });
  tl.set(hero, { opacity: 0 }, tE - .3).set(hero, { opacity: 1 }, LX + .1);
  popK(cu, LX + .1, null); land(gr, LX + .25, -800, 'plop'); land(cr, W(3, 'লাক্সারি') - .15, -700, 'ding');
  sparkles(hero, 10, 300, 560, 480, 560, W(3, 'লাক্সারি'), tF, 7);
  const lx = H(c, `<span style="color:${P.gold}">লাক্সারি</span>`, 340, 120, { textShadow: '0 0 40px rgba(255,201,60,.6)' }); hIn(lx, W(3, 'লাক্সারি') - .05); sfx(W(3, 'লাক্সারি'), 'shine');
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(600, 900, 1.1), { duration: tF - tE, ease: 'sine.inOut' }), tE);
}

/* ═════════ F · new rice turns cheap, old rice turns VIP — কেন? ═════════ */
{
  const tF = S(4) - .2, tG = S(5) - .2, c = F1 = scene('F', tF, tG, { pre: .25, post: .2, push: 1.03 }), Wd = world(c);
  whip(tF, E1, F1, 'up', .5);
  skyK(Wd, P.n0, P.n1, P.n2); starField(Wd.plane(.06), 50, 900, 47);
  const stg = Wd.plane(.4); floorK(stg, 1260, P.n3, P.n0); fgStrip(Wd, 'crowd', 0, '#03071a');
  E(stg, 'a', svg(1080, '0 0 1080 1300', `<path d="M380 0 H700 L1000 1300 H80Z" fill="#fff4dc" opacity=".07"/>`), { left: 0, top: 0 });
  const mid = Wd.plane(1);
  E(mid, 'a', svg(200, '0 0 200 180', `<path d="M100 0 L190 180 H10Z" fill="${P.n4}"/><path d="M100 0 L190 180 H140Z" fill="${P.n2}"/>`), { left: 440, top: 1100 });
  const pk = E(mid, 'a', '', { left: 90, top: 820, width: 900, height: 290, transformOrigin: '450px 280px' });
  E(pk, 'a', '', { left: 0, top: 266, width: 900, height: 28, borderRadius: 14, background: `linear-gradient(${P.gold},${P.goldD})` });
  const Ls = E(pk, 'a', sackK(220, 'নতুন চাল'), { left: 30, top: 10, transformOrigin: '50% 100%' }), Rs = E(pk, 'a', sackK(220, 'পুরান চাল', 1), { left: 650, top: 10, transformOrigin: '50% 100%' });
  const cr = E(pk, 'a', crown(130), { left: 75, top: -60, transformOrigin: '50% 100%' });
  tl.fromTo(pk, { rotation: 0 }, { rotation: 0, duration: .1 }, tF);
  bob(cr, tF, W(4, 'ভিআইপি') - 1.2, 8, .9, 4);
  // "সস্তা" — the new rice drops in value
  const CH = W(4, 'সস্তা') - .1, tg1 = E(pk, 'a', priceTag(150, 'সস্তা ▼', P.red), { left: 50, top: 150, transformOrigin: '0 50%', opacity: 0 });
  tl.to(pk, { rotation: -9, duration: .7, ease: 'elastic.out(1,.45)' }, CH).fromTo(tg1, { opacity: 0, rotation: -40 }, { opacity: 1, rotation: 8, duration: .6, ease: 'elastic.out(1,.4)', immediateRender: false }, CH);
  tl.to(Ls, { scaleY: .9, scaleX: 1.08, duration: .2, yoyo: true, repeat: 1 }, CH); sfx(CH, 'fall'); sfx(CH + .2, 'sad');
  // "ভিআইপি" — the crown hops across, shades drop, flashes pop
  const VP = W(4, 'ভিআইপি') - .25;
  tl.to(pk, { rotation: -20, duration: .8, ease: 'elastic.out(1,.4)' }, VP - .25).to(cr, { keyframes: [{ x: 300, y: -340, rotation: 25, duration: .35, ease: 'power2.out' }, { x: 620, y: -40, rotation: 0, duration: .35, ease: 'power2.in' }] }, VP);
  sfx(VP, 'whoosh'); sfx(VP + .7, 'ding');
  const sh = E(pk, 'a', shades(150), { left: 685, top: 60, opacity: 0 }); tl.fromTo(sh, { y: -300, opacity: 1 }, { y: 0, duration: .3, ease: 'bounce.out', immediateRender: false }, VP + .45); sfx(VP + .5, 'click');
  const tg2 = E(pk, 'a', priceTag(150, 'ভিআইপি ▲', P.gold), { left: 640, top: 150, opacity: 0 }); popK(tg2, VP + .6, 'coin');
  const rp = E(mid, 'a', rope(380), { left: 640, top: 1170 }); popK(rp, VP + .4, null);
  [[760, 560], [960, 700], [620, 640]].forEach(([x, y], i) => { const f = E(c, 'a', sparkle(120, '#fff'), { left: x, top: y, opacity: 0 }); tl.fromTo(f, { opacity: 1, scale: .2 }, { opacity: 0, scale: 1.3, duration: .3, immediateRender: false }, VP + .7 + i * .22); sfx(VP + .7 + i * .22, 'shutter'); });
  // "কেন?" — a giant question mark drops; the camera dives into it
  const KN = W(4, 'কেন') - .2, q = E(c, 'a', qMark(420), { left: 0, width: 1080, top: 200, textAlign: 'center', transformOrigin: '50% 100%', opacity: 0 });
  land(q, KN, -900, 'impact'); shake(KN + .42, 14, .3);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1000, 1.06), { duration: tG - tF, ease: 'sine.inOut' }), tF);
}
