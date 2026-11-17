/* EP03 — chapters 07–08 + logo: ২০২৬ · কার পকেটে? */
let C6, C6b, C7;
const arrowUp = (w, col = '#ff5a48') => svg(w, '0 0 100 140', `<path d="M50 6 L94 60 H66 V134 H34 V60 H6Z" fill="${col}"/>`);

/* ═════════ 07a · ১৫৮৪ → ২০২৬ (L13) ═════════ */
{
  const c = C6 = scene('c6', T.c6, S(14) - .3, { pre: .12, post: .3, push: 1 }), t = T.c6;
  zoomThru(t, C5, c, 540, 1000);
  E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'radial-gradient(ellipse at 50% 40%,#5a2a5e,#2a1430 60%,#120a16)' });
  E(c, 'a', alpona(1100, 'rgba(242,182,50,.12)'), { left: -10, top: 420 });
  const odo = E(c, 'a', `<div style="display:flex;gap:16px">${[0, 1, 2, 3].map(i => `<div style="width:190px;height:260px;border-radius:24px;background:linear-gradient(#fbf1dc,#e8d9b8);overflow:hidden;box-shadow:inset 0 -14px 0 rgba(0,0,0,.12),0 20px 40px rgba(0,0,0,.4)"><div class="rl" style="font:800 200px/260px var(--font-bn-display);color:#4a1f4f;text-align:center">${'০১২৩৪৫৬৭৮৯০১২৩৪৫৬৭৮৯'.split('').map(d => `<div style="height:260px">${d}</div>`).join('')}</div></div>`).join('')}</div>`, { left: 115, top: 560 });
  const FROM = [1, 5, 8, 4], TO = [2, 0, 2, 6], R0 = S(13) + .2, RD = 1.8;
  odo.querySelectorAll('.rl').forEach((r, i) => { const a = FROM[i], b = TO[i] + (TO[i] < a || i > 1 ? 10 : 0); tl.fromTo(r, { y: -a * 260 }, { y: -b * 260, duration: RD + i * .15, ease: 'power3.inOut' }, R0); });
  pop(odo, S(13) - .2); sfx(R0, 'windup', { d: RD + .4 }); sfx(R0 + RD + .5, 'lock');
  const now = chip(c, 'আজ, ২০২৬', { left: 0, width: 1080, top: 880, textAlign: 'center' }, '#ffd36b'); pop(now, R0 + RD + .5);
  const lk = E(c, 'a', `<div style="display:flex;gap:22px;justify-content:center"><div style="padding:16px 36px 10px;border-radius:20px;background:#2f7d5a;font:800 64px/1 var(--font-bn-display);color:#fbf1dc">লাভ</div><div style="padding:16px 36px 10px;border-radius:20px;background:#c8323a;font:800 64px/1 var(--font-bn-display);color:#fbf1dc">ক্ষতি</div></div>`, { left: 0, width: 1080, top: 1080 });
  tl.fromTo(lk, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, ease: 'back.out(2)' }, W(13, 'লাভ-ক্ষতির') - .2).to(lk.firstChild.children[0], { y: -30, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W(13, 'লাভ-ক্ষতির') + .3).to(lk.firstChild.children[1], { y: 30, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W(13, 'লাভ-ক্ষতির') + .3);
  sfx(W(13, 'লাভ-ক্ষতির') - .2, 'pop', { p: 3 });
}

/* ═════════ 07b · কোটি টাকার উৎসব vs ৳৩৫ ধান, then who profits (L14–L15) ═════════ */
{
  const c = C6b = scene('c6b', S(14) - .3, T.c7, { pre: .25, post: .3, push: 1 }), t = S(14) - .3;
  whip(t, C6, c, 'left');
  // top half: Dhaka festival
  const top = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 980, overflow: 'hidden', background: 'linear-gradient(#120a24,#2a1450)' });
  const beams = [0, 1, 2, 3].map(i => E(top, 'a', '', { left: 120 + i * 260, top: 300, width: 120, height: 900, transformOrigin: '50% 100%', background: 'linear-gradient(rgba(255,214,120,0),rgba(255,214,120,.35))', clipPath: 'polygon(40% 100%,60% 100%,100% 0,0 0)' }));
  binds.push(T2 => { if (T2 > t - .3 && T2 < T.c7 + .3) beams.forEach((b, i) => { b.style.transform = `rotate(${Math.sin(T2 * 1.3 + i * 1.7) * 25}deg)`; }); });
  const stg = E(top, 'a', stage(1000), { left: 40, top: 420 });
  const ltz = stg.querySelectorAll('.lt'); binds.push(T2 => { if (T2 > t && T2 < T.c7) ltz.forEach((l, i) => { l.style.opacity = .4 + .6 * (Math.sin(T2 * 6 + i * 2) > 0 ? 1 : 0); }); });
  const crowd = E(top, 'a', svg(1080, '0 0 1080 200', Array.from({ length: 22 }, (_, i) => `<circle cx="${i * 50 + 20}" cy="${90 + (i % 3) * 10}" r="26" fill="#0a0612"/><rect x="${i * 50 - 6}" y="${110 + (i % 3) * 10}" width="52" height="120" rx="20" fill="#0a0612"/>`).join('')), { left: 0, top: 820 });
  tl.to(crowd, { y: -12, duration: .25, yoyo: true, repeat: 40, ease: 'power1.out' }, t);
  [[200, 200], [540, 140], [880, 220], [360, 300], [740, 280]].forEach(([x, y], i) => { burst(top, x, y, S(14) + .4 + i * .55, 18, ['#ffd36b', '#ff7aa8', '#7fd3d8', '#fbf1dc'], 200); sfx(S(14) + .4 + i * .55, 'boom', { p: i }); });
  const crore = plaque(top, 'কোটি টাকার উৎসব', { left: 200, top: 120 }, '#ffd36b', '#4a1f4f'); pop(crore, W(14, 'কোটি') - .1, { ease: 'back.out(2)' }); sfx(W(14, 'কোটি'), 'coin', { p: 2 });
  sfx(t, 'crowd', { d: 4.5 });
  E(c, 'a', '', { left: 0, top: 970, width: 1080, height: 22, background: '#f2b632', boxShadow: '0 0 30px #f2b632' });
  // bottom half: the farmer's side
  const bot = E(c, 'a', '', { left: 0, top: 992, width: 1080, height: 928, overflow: 'hidden', background: 'linear-gradient(#e8c58a,#c98a4a)' });
  const fm = actor(bot, 220, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: 'G', head: 'gamcha', skin: '#6e3f24', beard: 1, hair: 'grey', pose: 'offer', expr: 'sad' }, { left: 10, top: 830 - 418 });
  fm.breathe(t, T.c7).blink(t + 1, t + 4.5, t + 8);
  const bal = E(bot, 'a', scaleBal(400), { left: 270, top: 300 }), sk = E(bot, 'a', sack(190, 'ধান'), { left: 225, top: 200 });
  const price = E(bot, 'a', `<div style="padding:16px 26px 10px;border-radius:20px;background:#2a1430;border:6px solid #fbf1dc;text-align:center"><div style="font:700 32px/1.2 var(--font-bn-body);color:#fbf1dc">সরকারি ক্রয়মূল্য</div><div style="font:800 96px/1 var(--font-bn-display);color:#ffd36b">৳৩৫<span style="font-size:44px">/কেজি</span></div></div>`, { left: 660, top: 90 });
  tl.fromTo(sk, { y: -500 }, { y: 0, duration: .45, ease: 'bounce.out' }, W(14, 'কিনছে') - .4).fromTo($('.beam', bal), { rotation: 0, svgOrigin: '150 46' }, { rotation: -8, svgOrigin: '150 46', duration: .6, ease: 'elastic.out(1,.4)', immediateRender: false }, W(14, 'কিনছে'));
  pop(price, W(14, 'পঁয়ত্রিশ') - .15, { from: 2.2, ease: 'back.out(2)' }); sfx(W(14, 'কিনছে') - .1, 'thud'); sfx(W(14, 'পঁয়ত্রিশ'), 'stamp');
  const C1 = W(14, 'সার') - .2, fert = E(bot, 'a', sack(170, 'সার', '#f4f1e8'), { left: 560, top: 520 }), dz = E(bot, 'a', jerrycan(150), { left: 800, top: 530 });
  const ups = [0, 1].map(i => E(bot, 'a', arrowUp(80), { left: 610 + i * 240, top: 520, opacity: 0 }));
  const pct = E(bot, 'a', '<div style="font:800 84px/1 var(--font-bn-display);color:#c8323a;text-shadow:0 4px 0 #fbf1dc">+১৫–২০%</div>', { left: 600, top: 370, opacity: 0 });
  out([price], C1 - .1);
  tl.fromTo([fert, dz], { y: 500 }, { y: 0, duration: .5, ease: 'back.out(1.5)', stagger: .12 }, C1).to(ups, { opacity: 1, duration: .1 }, W(14, 'বেড়েছে') - .2).fromTo(ups, { y: 120 }, { y: -40, duration: .8, ease: 'power2.out', stagger: .1 }, W(14, 'বেড়েছে') - .2)
    .to(pct, { opacity: 1, duration: .1 }, W(14, 'পনেরো') - .2).fromTo(pct, { scale: 2.4 }, { scale: 1, duration: .35, ease: 'back.out(2)', immediateRender: false }, W(14, 'পনেরো') - .2);
  sfx(C1, 'swish'); sfx(W(14, 'বেড়েছে') - .2, 'riser', { d: 1 }); sfx(W(14, 'পনেরো'), 'alarm');
  tl.to(mood, { red: .45, duration: .3 }, W(14, 'পনেরো')).to(mood, { red: 0, duration: .6 }, S(15) - .2);
  // L15: the per-kg ledger — farmer loses, trader pockets the profit
  const L15 = S(15) - .25;
  tl.to(top, { opacity: .25, filter: 'blur(4px)', duration: .5 }, L15).to([fert, dz, ...ups, pct, bal, sk], { opacity: 0, duration: .3 }, L15);
  const loss = E(c, 'a', `<div style="width:440px;padding:24px 20px 18px;border-radius:26px;background:#fbf1dc;border:8px solid #c8323a;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.45)"><div style="font:700 36px/1.2 var(--font-bn-body);color:#4a1f2a">কৃষকের প্রতি কেজিতে</div><div style="font:800 100px/1.05 var(--font-bn-display);color:#c8323a">−৳২–৩</div><div style="font:800 44px/1 var(--font-bn-display);color:#4a1f2a">লোকসান</div></div>`, { left: 40, top: 200 });
  tl.fromTo(loss, { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: .5, ease: 'back.out(1.4)' }, W(15, 'দুই') - .5); sfx(W(15, 'লোকসান'), 'sad');
  fm.talk(W(15, 'লোকসান'), W(15, 'লোকসান') + .5);
  const tr = actor(c, 300, { top: 'suit', c1: '#3a2a5a', low: 'pants', c2: '#2a1d3a', belly: 1, hair: 'short', must: 1, skin: '#c48a5a', pose: 'hip', expr: 'smug' }, { left: 720, top: 1500 - 570 });
  const pk = E(c, 'a', `<div style="width:260px;padding:26px 10px 18px;border-radius:24px 24px 34px 34px;background:linear-gradient(#fbf8ef,#e6e0d0);border:6px solid #f2b632;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,.4)"><div style="font:800 46px/1 var(--font-bn-display);color:#2a1430">চাল</div><div style="font:800 84px/1.1 var(--font-bn-display);color:#c8323a">৳৪৯</div><div style="font:700 30px/1 var(--font-bn-body);color:#4a1f2a">/কেজি</div></div>`, { left: 520, top: 220 });
  tl.fromTo(tr, { x: 600 }, { x: 0, duration: .6, ease: 'back.out(1.3)' }, W(15, 'ঊনপঞ্চাশ') - .6); pop(pk, W(15, 'ঊনপঞ্চাশ') - .1, { from: 2.2, ease: 'back.out(2)' }); sfx(W(15, 'ঊনপঞ্চাশ'), 'stamp');
  const bag = E(c, 'a', moneyBag(190), { left: 860, top: 1200 }); pop(bag, W(15, 'লাভটা') - .2);
  for (let i = 0; i < 12; i++) { const cn = E(c, 'a', coin(54), { left: 620, top: 420, opacity: 0 }), at = W(15, 'লাভটা') + i * .12;
    tl.set(cn, { opacity: 1 }, at).to(cn, { keyframes: [{ x: 120 + rnd(i) * 60, y: 300, duration: .3, ease: 'power1.out' }, { x: 300, y: 820, rotation: 360, duration: .35, ease: 'power2.in' }, { opacity: 0, duration: .05 }] }, at); if (i % 3 === 0) sfx(at + .6, 'coin', { p: i % 5 }); }
  tr.nod(W(15, 'ব্যবসায়ীরা'), 2); tl.to(tr, { scale: 1.06, duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W(15, 'পকেটে'));
}

/* ═════════ 08 · ৪৪০ বছরের হিসাব · কার পকেটে? (L16–L17) ═════════ */
{
  const c = C7 = scene('c7', T.c7, T.c8, { pre: .12, post: .1, push: 1 }), t = T.c7;
  zoomThru(t, C6b, c, 980, 1300);
  E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'radial-gradient(ellipse at 50% 45%,#4a1f4f,#241030 60%,#120a16)' });
  // the 440-year ribbon
  const rib = E(c, 'a', `<svg width="1000" height="200" viewBox="0 0 1000 200"><path class="rp" d="M40 120 C300 20 700 220 960 100" stroke="#f2b632" stroke-width="16" fill="none" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>`, { left: 40, top: 560 });
  tl.to($('.rp', rib), { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, S(16) - .1);
  const ends = [['১৫৮৪', 'খাজনার খাতা', 40, 540], ['২০২৬', 'মিল ও বাজার', 760, 520]].map(([y, n, x, yy], i) => E(c, 'a', `<div style="width:280px;text-align:center"><div style="font:800 76px/1 var(--font-bn-display);color:#ffd36b">${y}</div><div style="font:700 34px/1.3 var(--font-bn-body);color:#fbf1dc">${n}</div></div>`, { left: x, top: yy - 140 }));
  ends.forEach((e, i) => pop(e, S(16) + i * 1.2)); sfx(S(16), 'swish'); sfx(S(16) + 1.2, 'swish');
  const yrs = E(c, 'a', '<span class="v">০</span> বছরের হিসাব', { left: 0, width: 1080, top: 820, textAlign: 'center', font: '800 110px/1 var(--font-bn-display)', color: '#fbf1dc', textShadow: '0 0 50px rgba(242,182,50,.5)' });
  pop(yrs, W(16, 'চারশো') - .3); counter($('.v', yrs), 0, 440, W(16, 'চারশো') - .2, 1.2); sfx(W(16, 'চারশো') - .2, 'count', { d: 1.2 }); sfx(W(16, 'চারশো') + 1, 'boom');
  const biz = chip(c, 'নবান্ন = একটা বড় ব্যবসার হিসাব', { left: 0, width: 1080, top: 980, textAlign: 'center' }, '#ffd36b'); pop(biz, W(16, 'ব্যবসার') - .2);
  // L17: three forces circle your plate; a coin leaves it — whose pocket?
  const L17 = S(17) - .2;
  tl.to([rib, ...ends, yrs, biz], { y: -1300, duration: .6, ease: 'power3.in', stagger: .03 }, L17 - .2);
  const pl = E(c, 'a', `<div style="position:relative;width:560px">${halo(560, 'rgba(255,214,120,.35)')}<div style="position:absolute;left:0;top:200px">${plate(560)}</div></div>`, { left: 260, top: 720 });
  tl.fromTo(pl, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(1.6)' }, L17); sfx(L17, 'pop', { p: 4 });
  const steam = [0, 1, 2].map(i => E(c, 'a', `<svg width="80" height="260" viewBox="0 0 80 260"><path d="M40 260 C10 200 70 160 40 110 C10 60 70 30 40 0" stroke="rgba(251,241,220,.6)" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`, { left: 430 + i * 90, top: 650 }));
  steam.forEach((s2, i) => tl.fromTo(s2, { opacity: 0, y: 40 }, { opacity: 1, y: -40, duration: 1.4, ease: 'sine.inOut', repeat: 5, yoyo: true }, L17 + .3 + i * .2));
  const F3 = [['খাজনার নিয়ম', scroll(110, ''), W(17, 'খাজনার')], ['বড় মিল', gear(120, '#c98a4a'), W(17, 'মিল')], ['বাজারের রাজনীতি', scaleBal(150), W(17, 'রাজনীতি')]];
  const orb = F3.map(([n, art, at], i) => { const e = E(c, 'a', `<div style="width:220px;text-align:center"><div style="height:140px;display:grid;place-items:center">${art}</div><div style="font:800 40px/1.1 var(--font-bn-display);color:#fbf1dc;margin-top:6px">${n}</div></div>`, { left: 430, top: 830 });
    tl.fromTo(e, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, at - .25); sfx(at - .25, 'pop', { p: i * 2 }); return e; });
  const ang = { a: 0 }; tl.to(ang, { a: 360, duration: 8, ease: 'none' }, L17);
  binds.push(() => orb.forEach((e, i) => { const a = (ang.a + i * 120 - 90) * Math.PI / 180; e.style.transform = `translate(${Math.cos(a) * 380}px,${Math.sin(a) * 440}px)`; }));
  const CN = W(17, 'লাভটা') - .3, cn = E(c, 'a', `<div style="position:relative">${halo(220, 'rgba(255,214,120,.7)')}<div style="position:absolute;left:55px;top:55px">${coin(110)}</div></div>`, { left: 430, top: 820, opacity: 0 });
  tl.set(cn, { opacity: 1 }, CN).fromTo(cn, { y: 120, scale: .3 }, { y: -380, scale: 1, duration: 1, ease: 'power2.out' }, CN).to(cn, { rotationY: 720, duration: 2.2, ease: 'none' }, CN);
  const q = E(c, 'a', '<span style="color:#ffd36b">কার পকেটে</span> যাবে?', { left: 0, width: 1080, top: 250, textAlign: 'center', font: '800 104px/1.1 var(--font-bn-display)', color: '#fbf1dc', textShadow: '0 0 60px rgba(242,182,50,.5),0 6px 0 rgba(0,0,0,.3)' });
  hIn(q, W(17, 'কার') - .2, { d: .45 }); sfx(CN, 'riser', { d: 1 }); sfx(W(17, 'কার'), 'impact', { soft: 1 }); sfx(W(17, 'যাবে'), 'ding');
  const pockets = [['কৃষক', '#7a4a2a', 120], ['মিল মালিক', '#2a2a36', 430], ['ব্যবসায়ী', '#3a2a5a', 740]].map(([n, col, x], i) => E(c, 'a', `<div style="width:220px;text-align:center"><div style="width:180px;height:160px;margin:0 auto;border-radius:20px 20px 90px 90px;background:${col};border:6px solid #f2b632;box-shadow:inset 0 30px 0 rgba(0,0,0,.25)"></div><div style="font:800 40px/1.2 var(--font-bn-display);color:#fbf1dc;margin-top:8px">${n}?</div></div>`, { left: x, top: 1080 }));
  tl.fromTo(pockets, { y: 600, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'back.out(1.5)', stagger: .12 }, W(17, 'পকেটে') - .4);
  pockets.forEach((p, i) => tl.to(p, { y: -24, duration: .25, yoyo: true, repeat: 1 }, W(17, 'যাবে') + .2 + i * .25));
}

/* ═════════ logo (built after fonts load) ═════════ */
window.__afterFonts = () => {
  const c = scene('c8', T.c8, T.end + 1, { pre: .55, push: 1 }), t = T.c8;
  iris(t, c, 540, 1000, .55);
  tl.to(['#segs', '#hudL', '#hudR'], { opacity: 0, duration: .2 }, t - .2).to(mood, { energy: 0, duration: .3 }, t - .3);
  const L = buildCaseStudiesLogo(c, { width: 900, cy: 900 });
  tl.add(L.timeline, t); binds.push(T2 => L.draw(T2 - t));
  L.cues.forEach(q => sfx(t + q.t, 'logo_' + q.name, q.p != null ? { p: q.p } : q.d ? { d: q.d } : undefined));
  const bnf = 'var(--font-bn-display)';
  L.sub.innerHTML = `<div class="ep" style="position:absolute;left:0;right:0;top:${L.top - 200}px;text-align:center"><span class="chip" style="font-size:36px">এপিসোড ০৩ · নবান্নের হিসাব</span></div>
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
