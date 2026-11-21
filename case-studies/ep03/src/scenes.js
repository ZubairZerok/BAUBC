/* EP03 v3 · পুরান চাল ভাতে বাড়ে? — chapters 01–02. Every time comes from the voice: S(i) line start, W(i,'word'), F(i,frac).
 * Holds between lines (lines.js `hold`) give every scene's last beat time to land before the cut. */
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
/** a steam plume that keeps drawing upward (side views) */
function steam(pl, x, y, w, h, c = 'rgba(255,244,220,.5)', sp = 1) {
  const el = E(pl, 'a', plume(w, h, c), { left: x - w / 2, top: y - h }), ps = [...el.querySelectorAll('.pl')];
  ps.forEach(p => { p.style.strokeDasharray = '160 420'; });
  binds.push(t => ps.forEach((p, i) => { p.style.strokeDashoffset = (t * 260 * sp + i * 190) % 580; }));
  return el;
}
const GR = '#1f4a1a', GRIM = 'rgba(184,245,60,.45)';   // daylight foreground grass
let A, B, C, D, E1, F1;

/* ═════════ A · hook — Dadi's kitchen (textured mud wall, real fire): "পুরান চাল ভাতে বাড়ে" ═════════ */
{
  const tB = W(0, 'বিজনেস') - .45, c = A = scene('A', 0, tB, { post: .2, push: 1 }), Wd = world(c);
  E(Wd.plane(.12, { left: -60, top: -80, width: 1200, height: 2080 }), 'a', kitchenWall(1200, 2080), { left: 0, top: 0 });
  const mid = Wd.plane(.6);
  E(mid, 'a', '', { left: -500, top: 1250, width: 2100, height: 900, background: 'linear-gradient(#8a4a22,#5a2a10 40%,#3a1a08)' });
  E(mid, 'a', svg(2100, '0 0 2100 300', Array.from({ length: 22 }, (_, i) => `<path d="M0 ${20 + i * 13} Q1050 ${10 + i * 13 + (i % 3) * 6} 2100 ${22 + i * 13}" stroke="#2a1004" stroke-opacity=".25" stroke-width="3" fill="none"/>`).join('')), { left: -500, top: 1260 });
  const ST = clayStove(540), stove = E(mid, 'a', ST.html, { left: 400, top: 1255 - ST.h });
  const sx = 400 + ST.mx, sy = 1255 - ST.h + ST.my;   // centre of the stove's mouth floor
  // fire 1: licking up around the pot bottom (behind the pot); fire 2: inside the mouth (clipped to the arch)
  fireFX(mid, 670, 1000, 520, 260, { base: 330, flame: 150, size: 40, n: 90 });
  const pot = E(mid, 'a', handi(400), { left: 470, top: 652 }), mound = $('.mound', pot);
  const mouth = E(mid, 'a', '', { left: 400, top: 1255 - ST.h, width: ST.w, height: ST.h, clipPath: `path('M${ST.w * .3} ${ST.h} V${ST.h * .58} Q${ST.w / 2} ${ST.h * .3} ${ST.w * .7} ${ST.h * .58} V${ST.h}Z')` });
  fireFX(mouth, ST.mx, ST.my, 280, 230, { base: 150, flame: 190, size: 50, n: 110 });
  fireLight(mid, sx, sy - 120, 700, .55); fireLight(Wd.plane(.15), sx, sy - 200, 1100, .3);
  const st = [steam(mid, 600, 690, 120, 420, 'rgba(255,250,240,.55)'), steam(mid, 760, 670, 110, 380, 'rgba(255,250,240,.45)', .8)];
  const dadi = actor(mid, 330, { top: 'saree', low: 'saree', c1: '#fbf1dc', head: 'veil', hair: 'grey', skin: '#9a6040', expr: 'talk', pose: [[8, 4], [60, 70]], holdR: ladle(1.1) }, { left: 40, top: 1300 - 627 });
  dadi.breathe(0, tB).blink(1.2, 3.6, 5.4).talk(.35, 2.05).talk(2.7, tB);
  dadi.nod(2.7, 2); dadi.swing('R', 0, tB, 14, 1.1);
  fireLight(mid, 230, 900, 380, .25);
  const fg = Wd.plane(1.3);
  E(fg, 'a', svg(460, '0 0 460 220', `<path d="M0 220 Q40 40 230 30 Q420 40 460 220Z" fill="#3a1a08"/><path d="M40 170 Q230 70 420 170" stroke="#7a4a22" stroke-width="10" fill="none"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${60 + i * 30} 200 Q${70 + i * 30} 120 ${80 + i * 30} 60" stroke="#5a2e10" stroke-width="5" fill="none"/>`).join('')}`), { left: -140, top: 1600 });
  E(fg, 'a', svg(300, '0 0 300 300', `<path d="M60 300 V120 Q60 80 100 80 H200 Q240 80 240 120 V300Z" fill="#4a2410"/><rect x="90" y="54" width="120" height="30" rx="10" fill="#6a3418"/><path d="M80 130 V290" stroke="#fff" stroke-opacity=".12" stroke-width="16"/>`), { left: 860, top: 1560 });
  // speech bubble — the proverb, on screen from frame 0
  const bub = E(c, 'a', `<div style="position:relative;width:940px;padding:34px 20px 22px;border-radius:46px;background:${P.cream};box-shadow:0 24px 60px rgba(0,0,0,.5);text-align:center;font:800 84px/1.15 var(--font-bn-display);color:${P.n1}"><span style="color:${P.orange}">‘</span>পুরান চাল <span style="color:${P.red}">ভাতে বাড়ে</span><span style="color:${P.orange}">’</span>
    ${svg(120, '0 0 120 220', `<path d="M10 0 L110 0 L40 210Z" fill="${P.cream}"/>`, 'position:absolute;left:110px;top:150px')}</div>`, { left: 70, top: 250, transformOrigin: '20% 100%' });
  tl.fromTo(bub, { scale: .94, rotation: -2 }, { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1,.4)' }, 0);
  const BR = W(0, 'বাড়ে') - .1;
  tl.fromTo(mound, { scaleY: .5 }, { scaleY: 1, duration: .5, ease: 'power2.out' }, .1)
    .to(mound, { scaleY: 2.6, scaleX: 1.08, duration: .7, ease: 'elastic.out(1,.45)' }, BR);
  sfx(0, 'boil', { d: tB }); sfx(0, 'fire', { d: tB }); sfx(BR, 'squish'); sfx(BR + .1, 'pop', { p: 2 });
  for (let i = 0; i < 9; i++) { const gr = E(mid, 'a', grain(34, 0), { left: 650 + (rnd(i) - .5) * 160, top: 690, opacity: 0 }), a = (rnd(i + 4) - .5) * 560;
    tl.fromTo(gr, { opacity: 1, x: 0, y: 0, rotation: 0 }, { keyframes: [{ x: a * .5, y: -260 - rnd(i + 2) * 200, rotation: 200, duration: .45, ease: 'power2.out' }, { x: a, y: 380, rotation: 420, duration: .55, ease: 'power2.in' }], immediateRender: false }, BR + .05 + i * .05).set(gr, { opacity: 0 }, BR + 1.2 + i * .05); }
  sfx(BR + .3, 'plop', { p: 1 }); sfx(BR + .55, 'plop', { p: 2 });
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1000, 1.08), { duration: BR, ease: 'sine.inOut' }), 0)
    .to(Wd.cam, Object.assign(Wd.aim(205, 800, 1.7, 540, 900), { duration: tB - BR - .2, ease: 'power2.inOut' }), BR + .3)
    .to(bub, { opacity: 0, y: -120, scale: .9, duration: .5, ease: 'power2.in' }, W(0, 'ইতিহাসের') - .2);
}

/* ═════════ B · the 2D brain-wash factory: a real brain is soaked, scrubbed and bleached — memories float away ═════════ */
{
  const tB = W(0, 'বিজনেস') - .45, tC = W(1, 'হাজার') - .35, c = B = scene('B', tB, tC, { pre: .15, post: .2, push: 1.03 }), Wd = world(c);
  zoomThru(tB, A, B, 540, 900, .55);
  const F = brainFactory(c, Wd), { bw, bH, bWs, bx, by, BW, ndl } = F;
  const P0 = tB + .3, P1 = S(1) + 1.6, BWt = W(0, 'ব্রেইনওয়াশ') - .05;
  const bot = E(Wd.plane(.75), 'a', svg(240, '0 0 240 400', `<defs><linearGradient id="btl" x1="0" x2="1"><stop offset="0" stop-color="#1a7ad0"/><stop offset=".35" stop-color="#4fd0ff"/><stop offset=".5" stop-color="#bff0ff"/><stop offset=".65" stop-color="#3fb8f0"/><stop offset="1" stop-color="#145aa0"/></linearGradient></defs>
    <rect x="92" y="0" width="56" height="40" rx="8" fill="#ef4b3f"/><path d="M84 40 H156 L176 100 Q220 120 220 170 V360 Q220 396 184 396 H56 Q20 396 20 360 V170 Q20 120 64 100Z" fill="url(#btl)"/><rect x="34" y="190" width="172" height="130" rx="16" fill="#fff4dc"/>
    <text x="120" y="248" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="36" fill="#c4233b">ব্রেইন</text><text x="120" y="292" text-anchor="middle" font-family="Anek Bangla" font-weight="800" font-size="36" fill="#c4233b">ওয়াশ</text><path d="M44 140 Q50 300 60 380" stroke="#fff" stroke-opacity=".45" stroke-width="12" fill="none" stroke-linecap="round"/>`), { left: 420, top: 60, width: 240, height: 400, transformOrigin: '120px 200px', opacity: 0 });
  tl.fromTo(bot, { opacity: 0, y: -500, rotation: 20 }, { opacity: 1, y: 0, rotation: 140, duration: .7, ease: 'back.out(1.3)', immediateRender: false }, P0 - .55);
  tl.to(bot, { rotation: 150, duration: .3, yoyo: true, repeat: Math.max(1, Math.round((P1 - P0) / .3)) - 1, ease: 'sine.inOut' }, P0 + .2).to(bot, { y: -600, rotation: 60, opacity: 0, duration: .5, ease: 'power2.in' }, P1);
  const sv = E(Wd.plane(.73), 'a', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="position:absolute;left:0;top:0;overflow:visible"><defs><linearGradient id="strm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff0ff"/><stop offset=".5" stop-color="#3fb8f0"/><stop offset="1" stop-color="#1a7ad0"/></linearGradient></defs><path class="s1" fill="none" stroke="url(#strm)" stroke-linecap="round"/><path class="s2" fill="none" stroke="#fff" stroke-opacity=".7" stroke-linecap="round" stroke-dasharray="30 70"/></svg>`, { left: 0, top: 0 });
  const s1 = $('.s1', sv), s2 = $('.s2', sv), MX = 420 + 120 + 109, MY = 60 + 200 + 130, TX = 575, TY = 600;
  binds.push(t => { const on = t > P0 && t < P1 + .25, k = Math.min(1, (t - P0) / .3), e = Math.min(1, (P1 + .25 - t) / .25);
    if (!on) { s1.setAttribute('d', ''); s2.setAttribute('d', ''); return; }
    const ty = MY + (TY - MY) * k, w = (24 + 8 * Math.sin(t * 9)) * Math.min(1, e), wob = Math.sin(t * 6) * 14, d = `M${MX} ${MY} C${MX - 10 + wob} ${MY + 90} ${TX + 30 - wob} ${ty - 100} ${TX} ${ty}`;
    s1.setAttribute('d', d); s1.setAttribute('stroke-width', w); s2.setAttribute('d', d); s2.setAttribute('stroke-width', w * .22); s2.style.strokeDashoffset = -t * 400; });
  sfx(P0, 'pour', { d: P1 - P0 + .2 });
  for (let i = 0; i < 18; i++) { const dr = E(Wd.plane(.73), 'a', `<div style="width:${10 + i % 3 * 6}px;height:${10 + i % 3 * 6}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#4fd0ff 50%,#1a7ad0)"></div>`, { left: TX, top: TY, opacity: 0 });
    binds.push(t => { if (t < P0 + .3 || t > P1 + .4) { dr.style.opacity = 0; return; } const per = .55 + rnd(i) * .3, k = ((t - P0 - .3) / per + rnd(i + 3)) % 1, vx = (rnd(i + 5) - .5) * 420, vy = -240 - rnd(i + 6) * 220;
      dr.style.opacity = 1 - k; dr.style.transform = `translate(${vx * k}px,${vy * k + 900 * k * k}px)`; }); }
  const wash = { k: 0 }; tl.to(wash, { k: 1, duration: P1 - P0 + .4, ease: 'power1.inOut' }, P0 + .2);
  const coat = E(bw, 'a', '', { left: BW * .14, top: BW * .06, width: BW * .76, height: BW * .46, borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 35%,rgba(220,250,255,.7),rgba(79,208,255,.32) 45%,rgba(26,122,208,0) 70%)', mixBlendMode: 'screen', opacity: 0 });
  const NS = Array.from({ length: 18 }, (_, i) => E(bw, 'a', `<div style="width:14px;height:14px;border-radius:50%;background:#fffbd0;box-shadow:0 0 18px 7px rgba(255,230,120,.85)"></div>`, { left: BW * (.2 + rnd(i + 700) * .6), top: BW * (.12 + rnd(i + 701) * .36) }));
  const FM = Array.from({ length: 40 }, (_, i) => E(bw, 'a', bubble(22 + rnd(i + 800) * 50), { left: BW * (.1 + rnd(i + 801) * .74), top: BW * (.03 + rnd(i + 802) * .4), opacity: 0 }));
  // memories (paddy, a lit bulb, a pitha, a heart) drift out of the brain and dissolve
  const MEM = [G.sprig(46), svg(60, '0 0 60 80', '<path d="M30 4 A24 24 0 0 1 44 48 V58 H16 V48 A24 24 0 0 1 30 4Z" fill="#ffe27a"/><rect x="18" y="60" width="24" height="12" rx="4" fill="#9aa8c0"/>'), svg(70, '0 0 70 50', '<ellipse cx="35" cy="28" rx="32" ry="20" fill="#fbf4e2"/><path d="M15 22 Q35 8 55 22 Q45 30 35 30 Q25 30 15 22Z" fill="#8a4a1e"/>'), svg(60, '0 0 60 54', '<path d="M30 52 C-10 26 6 -6 30 14 C54 -6 70 26 30 52Z" fill="#ff6a8a"/>')].map((h, i) => E(Wd.plane(.74), 'a', h, { left: bx - 160 + i * 100, top: by - 380, opacity: 0 }));
  MEM.forEach((m, i) => { const t0 = P0 + .6 + i * .45; tl.fromTo(m, { opacity: 1, y: 60, scale: .4, rotation: 0 }, { opacity: 0, y: -360, scale: 1.2, rotation: (i % 2 ? 1 : -1) * 40, filter: 'blur(6px) grayscale(1)', duration: 1.6, ease: 'power1.out', immediateRender: false }, t0); sfx(t0 + .3, 'bubble'); });
  binds.push(t => { const k = wash.k; bWs.style.opacity = k; coat.style.opacity = Math.min(1, k * 1.5);
    const j = k > .05 && k < 1 ? 3 + 5 * Math.sin(k * Math.PI) : 0; bw.style.transform = `translate(${Math.sin(t * 53) * j}px,${Math.cos(t * 47) * j * .6}px) scale(${1 - .12 * k},${1 - .16 * k})`;
    NS.forEach((n, i) => { n.style.opacity = Math.max(0, (1 - k * 1.4)) * (.4 + .6 * Math.abs(Math.sin(t * 3 + i))); });
    FM.forEach((f, i) => { const on = Math.max(0, Math.min(1, (k - i / 50) * 5)); f.style.opacity = on; f.style.transform = `scale(${on * (1 + .08 * Math.sin(t * 4 + i))})`; });
    ndl.style.transform = `rotate(${180 + 155 * k + Math.sin(t * 13) * 3 * k}deg)`; });
  [[-1, 40], [1, 1040]].forEach(([sd, x]) => { const arm = E(Wd.plane(.71), 'a', `<div style="position:relative;width:300px;height:160px"><div style="position:absolute;left:${sd < 0 ? 0 : 60}px;top:60px;width:240px;height:30px;border-radius:15px;background:linear-gradient(#ffd27a,#e0901a)"></div><div style="position:absolute;left:${sd < 0 ? 0 : 270}px;top:50px;width:30px;height:50px;border-radius:8px;background:#3a4070"></div><div class="br" style="position:absolute;left:${sd < 0 ? 210 : -40}px;top:-10px;width:140px;height:140px;border-radius:50%;background:repeating-conic-gradient(#ff5fa0 0 10deg,#ffa8cc 10deg 20deg);border:10px solid #3a4070"></div></div>`, { left: x - 150 + sd * 30, top: by - 380, opacity: 0 });
    tl.fromTo(arm, { opacity: 0, x: sd * 260 }, { opacity: 1, x: 0, duration: .5, ease: 'back.out(1.6)', immediateRender: false }, P0 + .6);
    tl.to(arm, { x: sd * 40, duration: .35, yoyo: true, repeat: Math.max(1, Math.round((P1 - P0) / .35)) - 1, ease: 'sine.inOut' }, P0 + 1.1);
    const br = $('.br', arm); binds.push(t => { br.style.transform = `rotate(${t * 900}deg)`; }); });
  sfx(P0 + .6, 'machine', { d: P1 - P0 });
  [0, 1, 2, 3].forEach(i => { const z = E(Wd.plane(.74), 'a', svg(90, '0 0 60 100', `<path d="M34 0 L8 54 H28 L18 100 L54 38 H32Z" fill="#fff36a" stroke="#ffb020" stroke-width="3"/>`), { left: bx - 330 + i * 190, top: by - 470 + (i % 2) * 80, opacity: 0 });
    const t0 = P0 + .9 + i * .55; tl.fromTo(z, { opacity: 1, scale: .4 }, { opacity: 0, scale: 1.2, duration: .25, immediateRender: false }, t0); sfx(t0, 'zap'); });
  const imp = E(bw, 'a', `<div style="font:800 52px/1.1 var(--font-bn-display);color:#4a5a6a;white-space:nowrap;transform:rotate(-8deg)">পুরান চাল ভাতে বাড়ে</div>`, { left: BW * .16, top: BW * .2, opacity: 0, mixBlendMode: 'multiply' });
  tl.to(imp, { opacity: .8, duration: .8 }, P1 - .4);
  const stmp = plaqueK(c, 'ব্রেইনওয়াশ!', { left: 560, top: 1150, transform: 'rotate(-8deg)' }, P.red, P.cream, 76);
  tl.fromTo(stmp, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: .22, ease: 'power4.in', immediateRender: false }, BWt); stmp.style.opacity = 0;
  shake(BWt + .22, 14, .35); sfx(BWt + .2, 'stamp'); out(stmp, S(1) + .3);
  const one = chipK(c, 'এক প্রবাদ', { left: 0, width: 1080, top: 1220, textAlign: 'center' }, P.cream, 54); popK(one, W(1, 'প্রবাদের') - .1); out(one, tC - .4);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1.02), Object.assign(Wd.aim(bx, by - 220, 1.22, 540, 900), { duration: tC - tB, ease: 'sine.inOut' }), tB);
}

/* ═════════ C · a thousand-year harvest festival → today it lives only in seasonal photoshoots: a wall of newspapers ═════════ */
{
  const tC = W(1, 'হাজার') - .35, tD = S(2) - .2, tA = W(1, 'আজ') - .15, tJ = W(1, 'বন্দি') - .1;
  const c = C = scene('C', tC, tD, { pre: .15, post: .45, push: 1 });
  zoomThru(tC, B, C, 540, 900, .5);
  const shot = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 }), Wd = world(shot);
  skyDay(Wd, { top: '#5fb0ec', mid: '#ffd98a', low: '#ffb86a', sx: 420, sy: 600 });
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 500, '#6a9a3a', 3, 6, 90, 'rgba(255,240,180,.6)'), { left: -300, top: 960 });
  [[-40, 760], [160, 800], [820, 770], [1000, 800]].forEach(([x, y], i) => E(far, 'a', palm(150 + i * 10, '#2f6a1a'), { left: x, top: y }));
  const mid = Wd.plane(.45); E(mid, 'a', hillBand(1800, 600, '#4f8a2a', 8, 5, 70, 'rgba(255,240,150,.6)'), { left: -360, top: 1080 });
  paddyBand(mid, 1240, 1800, 2, 1, 4, 140, -360);
  const crowd = Wd.plane(.7);
  [['#ef4b3f', 1], ['#ffc93c', 0], ['#5a78c4', 1], ['#b8f53c', 0], ['#ff8a3d', 1], ['#fbf1dc', 0], ['#ef4b3f', 1]].forEach(([c1, f], i) => {
    const a = actor(crowd, 150, f ? { top: 'saree', low: 'saree', c1, head: 'veil', sareeG: i % 2, skin: '#a8673e', pose: 'up', expr: 'happy' } : { top: 'genji', c1, low: 'lungi', lungi: 'BGP'[i % 3], head: 'gamcha', skin: '#7a4a2a', pose: i === 3 ? 'head' : 'up', expr: 'happy', must: 1 }, { left: -260 + i * 230, top: 1330 - 285 });
    const n = Math.round((tD - tC) / .5); tl.to(a, { y: -34, duration: .25, yoyo: true, repeat: n * 2 - 1, ease: 'power1.out', delay: rnd(i) * .2 }, tC); });
  E(crowd, 'a', dhol(230), { left: 520, top: 1180 });
  floorK(crowd, 1320, '#b8743f', '#6a3a18'); fgStrip(Wd, 'paddy', 5, GR, GRIM);
  const bun = E(Wd.plane(1.1), 'a', bunting(1500, 18, [P.red, P.gold, P.cream, P.lime, P.orange]), { left: -210, top: 240 });
  binds.push(t => bun.querySelectorAll('.fl').forEach((f, i) => { f.style.transformBox = 'fill-box'; f.style.transformOrigin = 'center top'; f.style.transform = `rotate(${Math.sin(t * 3 + i) * 9}deg)`; }));
  tl.fromTo(Wd.cam, Wd.aim(300, 1000, 1.05), Object.assign(Wd.aim(780, 1000, 1.05), { duration: tA - tC, ease: 'sine.inOut' }), tC);
  for (let k = tC; k < tA; k += .5) sfx(k, 'dhol', { p: Math.round((k - tC) * 2) % 3 });
  sfx(tC, 'crowd', { d: tA - tC });
  const yr = chipK(c, '<span class="n">০</span> বছরের নবান্ন', { left: 0, width: 1080, top: 330, textAlign: 'center' }, P.n1, 52);
  $('span', yr).style.background = P.cream;
  popK(yr, tC + .2); counter($('.n', yr), 0, 1000, tC + .2, 1.4); sfx(tC + .2, 'count', { d: 1.4 }); out(yr, tA - .1);
  // "আজ…" — newspapers slap down everywhere; the festival shrinks into one photo on the front page
  const wall = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920 });
  E(wall, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'linear-gradient(#5a4a3a,#3a2e24)', opacity: 0 }).classList.add('wbg');
  tl.to($('.wbg', wall), { opacity: 1, duration: .2 }, tA);
  const NP = 36;
  for (let i = 0; i < NP; i++) { const w = 300 + rnd(i + 900) * 140, x = (i % 4) * 290 - 80 + (rnd(i + 901) - .5) * 120, y = Math.floor(i / 4) * 210 - 140 + (rnd(i + 902) - .5) * 100;
    const p = E(wall, 'a', newspaper(Math.round(w), i), { left: x, top: y, transform: `rotate(${(rnd(i + 903) - .5) * 36}deg)`, opacity: 0 }), t0 = tA + .05 + rnd(i + 904) * 1.25;
    tl.fromTo(p, { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: .16, ease: 'power3.in', immediateRender: false }, t0);
    if (i % 3 === 0) sfx(t0 + .14, 'paper', { p: i % 3 }); }
  const fp = E(c, 'a', `<div style="position:relative;width:840px;height:1040px;background:linear-gradient(160deg,#fffaf0,#f1e8d4);box-shadow:0 40px 90px rgba(0,0,0,.6)">
      <div style="position:absolute;left:0;right:0;top:22px;text-align:center;font:800 76px/1 var(--font-bn-display);color:#151515">দৈনিক নবান্ন বার্তা</div>
      <div style="position:absolute;left:36px;right:36px;top:112px;height:6px;background:#151515"></div><div style="position:absolute;left:36px;right:36px;top:124px;height:2px;background:#151515"></div>
      <div style="position:absolute;left:36px;right:36px;top:146px;font:800 66px/1.1 var(--font-bn-display);color:#b01e2e">নবান্ন এখন শুধু ফটোশুট!</div>
      <div style="position:absolute;left:40px;top:250px;width:760px;height:470px;background:#222"></div>
      ${[0, 1, 2].map(k => `<div style="position:absolute;left:${40 + k * 262}px;top:744px;width:236px">${Array.from({ length: 11 }, (_, j) => `<div style="height:9px;margin:0 0 14px;background:#9a9488;width:${70 + rnd(k * 20 + j) * 30}%"></div>`).join('')}</div>`).join('')}</div>`, { left: 120, top: 280, opacity: 0 });
  c.appendChild(shot);
  tl.fromTo(fp, { opacity: 0, scale: 1.5, rotation: -6 }, { opacity: 1, scale: 1, rotation: -2, duration: .3, ease: 'power3.in', immediateRender: false }, tA + .25); sfx(tA + .5, 'impact'); shake(tA + .55, 10, .25);
  tl.fromTo(shot, { clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: 'inset(530px 160px 920px 160px)', duration: .45, ease: 'power3.inOut', immediateRender: false }, tA + .1);
  tl.to(shot, { rotation: -2, transformOrigin: '540px 760px', duration: .3 }, tA + .25).to(Wd.cam, Object.assign(Wd.aim(540, 1150, .95, 540, 790), { duration: .45, ease: 'power3.inOut' }), tA + .1);
  [W(1, 'সিজনাল'), W(1, 'ফটোশুটে'), W(1, 'ফটোশুটে') + .35].forEach((t, i) => { for (let k = 0; k < 4; k++) { const f = E(c, 'a', sparkle(150, '#fff'), { left: rnd(i * 9 + k) * 900, top: 200 + rnd(i * 9 + k + 1) * 1300, opacity: 0 }); tl.fromTo(f, { opacity: 1, scale: .2 }, { opacity: 0, scale: 1.4, duration: .3, immediateRender: false }, t + k * .06); } sfx(t, 'shutter'); });
  // "বন্দি" — bars slam over the photo, a padlock clicks
  const br = E(c, 'a', bars(760, 470), { left: 160, top: 530, opacity: 0, transform: 'rotate(-2deg)' });
  tl.fromTo(br, { y: -1100, opacity: 1 }, { y: 0, duration: .4, ease: 'bounce.out', immediateRender: false }, tJ); sfx(tJ + .1, 'impact');
  const lk = E(c, 'a', padlock(150), { left: 465, top: 930, transformOrigin: '50% 0' }); popK(lk, tJ + .4, 'lock');
  tl.to(mood, { dim: .15, duration: .3 }, tJ).to(mood, { dim: 0, duration: .3 }, tD);
}

/* ═════════ D · rewind → "নবান্ন" = নব (নতুন) + অন্ন (ভাত) → top view: a plate of new aman rice ═════════ */
{
  const tD = S(2) - .2, tE = S(3) - .2, c = D = scene('D', tD, tE, { pre: .4, post: .3, push: 1 }), Wd = world(c);
  tl.to(root(C), { rotation: -540, scale: 0, opacity: 0, duration: .8, ease: 'power3.in', transformOrigin: '540px 860px' }, tD - .4);
  tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: .4 }, tD - .2);
  const sky = skyDay(Wd, { top: '#4f9de0', mid: '#ffcf8a', low: '#ff9a5a', sun: false, cy: 300 });
  const sunP = Wd.plane(.1), gdw = E(sunP, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 }); godrays(gdw, 540, 970, 1500, 18, '255,236,180', .26);
  const sn = E(sunP, 'a', sunK(300), { left: 390, top: 820, opacity: 0 });
  const clk = E(sunP, 'a', `<div style="position:relative;width:420px;height:420px;border-radius:50%;background:${P.cream};box-shadow:0 0 0 18px ${P.gold},0 30px 60px rgba(0,0,0,.4)">${svg(420, '-210 -210 420 420', Array.from({ length: 12 }, (_, i) => `<rect x="-6" y="-190" width="12" height="${i % 3 ? 24 : 44}" rx="6" fill="${P.n2}" transform="rotate(${i * 30})"/>`).join('') + `<g class="hh"><rect x="-9" y="-110" width="18" height="120" rx="9" fill="${P.n1}"/></g><g class="mh"><rect x="-6" y="-170" width="12" height="180" rx="6" fill="${P.red}"/></g><circle r="16" fill="${P.n1}"/>`)}</div>`, { left: 330, top: 340 });
  binds.push(t => { const k = Math.max(0, Math.min(1.3, t - tD + .3)), a = -k * 1300; $('.mh', clk).setAttribute('transform', `rotate(${a})`); $('.hh', clk).setAttribute('transform', `rotate(${a / 12})`); });
  const rw = chipK(c, '◀◀ পেছনে', { left: 70, top: 260 }, P.cream, 40); rw.style.opacity = 0; tl.fromTo(rw, { opacity: 0 }, { opacity: 1, duration: .1, yoyo: true, repeat: 5, immediateRender: false }, tD - .2).set(rw, { opacity: 0 }, tD + 1);
  const scan = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 3px,transparent 3px 9px)', opacity: 0 });
  tl.fromTo(scan, { opacity: 1 }, { opacity: 0, duration: .3, immediateRender: false }, tD + 1); sfx(tD - .3, 'rewind');
  tl.fromTo(gdw, { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, tD + 1.1);
  tl.to(clk, { scale: .7, y: 480, opacity: 0, duration: .7, ease: 'power2.inOut' }, tD + 1).fromTo(sn, { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, tD + 1.1);
  tl.fromTo(sky, { filter: 'brightness(.6) sepia(.4)' }, { filter: 'brightness(1) sepia(0)', duration: 2, immediateRender: false }, tD + 1);
  const far = Wd.plane(.22); E(far, 'a', hillBand(1700, 500, '#5f8f3a', 21, 6, 80, 'rgba(255,230,160,.6)'), { left: -300, top: 960 });
  [[-60, 760], [900, 790], [700, 820]].forEach(([x, y]) => E(far, 'a', palm(160, '#2f5a1a'), { left: x, top: y }));
  const mid = Wd.plane(.5); E(mid, 'a', hillBand(1800, 700, '#4a7a22', 33, 5, 60, 'rgba(255,230,140,.6)'), { left: -360, top: 1060 });
  paddyBand(mid, 1230, 1800, 3, 1, 9, 150, -360);
  [[120, 0], [700, 1]].forEach(([x, k]) => { const f = actor(mid, 170, { top: 'genji', c1: '#f4ead6', low: 'lungi', lungi: k ? 'G' : 'B', head: 'gamcha', must: 1, skin: '#7a4a2a', pose: 'sickle', holdR: sickle(1.2), expr: 'happy' }, { left: x, top: 1250 - 323 }); f.swing('R', tD, tE, 40, .9); });
  fgStrip(Wd, 'paddy', 11, GR, GRIM);
  sfx(W(2, 'নতুন'), 'birds', { d: 3 });
  const NB = W(2, 'নবান্ন') - .1, h1 = H(c, `<span style="color:${P.gold}">নবান্ন</span>`, 330, 170, { textShadow: '0 10px 0 rgba(7,14,42,.55)' });
  hIn(h1, NB, { st: .05 }); sfx(NB, 'impact');
  const MN = W(2, 'মানেই') - .05;
  tl.to(h1, { y: -70, scale: .62, duration: .45, ease: 'power3.inOut' }, MN);
  const tA_ = plaqueK(c, `নব <span style="opacity:.7">=</span> নতুন`, { left: 70, top: 520 }, P.lime, P.n1, 62), tB_ = plaqueK(c, `অন্ন <span style="opacity:.7">=</span> ভাত`, { left: 570, top: 520 }, P.gold, P.n1, 62);
  const pl2 = E(c, 'a', `<div style="font:900 80px/1 var(--font-en-display);color:${P.cream};text-shadow:0 4px 0 #0005">+</div>`, { left: 512, top: 538 });
  popK(tA_, W(2, 'নতুন অন্ন') - .05, 'pop'); popK(pl2, W(2, 'নতুন অন্ন') + .2, null); popK(tB_, W(2, 'অন্ন') + .1, 'pop');
  const AM = W(2, 'আমন') - .3;
  out([h1, tA_, tB_, pl2], AM, { y: -120 });
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1010, 1.05), { duration: AM - tD, ease: 'sine.inOut' }), tD);
  // "নতুন আমন ধানের ভাত" — top view: steaming new rice on a banana leaf
  const tv = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 });
  E(tv, 'a', woodTable(1080, 1920), { left: 0, top: 0 }); riceSpread(tv, 200, 560, 680, { gk: 1.7 }); steamTop(tv, 540, 880, 300, 8);
  tl.fromTo(tv, { opacity: 0, clipPath: 'circle(0px at 540px 890px)' }, { opacity: 1, clipPath: 'circle(1400px at 540px 890px)', duration: .7, ease: 'power3.inOut', immediateRender: false }, AM);
  tl.fromTo(tv, { scale: 1.12 }, { scale: 1, duration: tE - AM + .3, ease: 'sine.out', immediateRender: false }, AM);
  const am = chipK(c, 'নতুন আমন ধানের ভাত', { left: 0, width: 1080, top: 300, textAlign: 'center' }, P.gold, 50); popK(am, AM + .4, 'ding');
}

/* ═════════ E · once, the real new year — the biggest luxury of the year ═════════ */
{
  const tE = S(3) - .2, tF = S(4) - .2, c = E1 = scene('E', tE, tF, { pre: .25, post: .25, push: 1 }), Wd = world(c);
  whip(tE, D, E1, 'left', .5);
  skyDay(Wd, { top: '#6fb4ea', mid: '#ffd59a', low: '#ffab6a', sx: 160, sy: 520 });
  const far = Wd.plane(.2); E(far, 'a', hillBand(1700, 600, '#5f8a3a', 41, 6, 80, 'rgba(255,230,160,.6)'), { left: -300, top: 980 });
  [[-40, 700], [140, 740], [880, 720]].forEach(([x, y]) => E(far, 'a', palm(170, '#2f5a1a'), { left: x, top: y }));
  E(far, 'a', hut(330, '#b8743f'), { left: 600, top: 860 });
  const mid = Wd.plane(.5); floorK(mid, 1160, '#d98a4f', '#8a4a22');
  E(mid, 'a', svg(1600, '0 0 1600 200', Array.from({ length: 14 }, (_, i) => `<ellipse cx="${i * 120 + 40}" cy="${80 + (i % 3) * 30}" rx="40" ry="10" fill="#f0b070" opacity=".4"/>`).join('')), { left: -260, top: 1180 });
  const bun = E(Wd.plane(1.1), 'a', bunting(1500, 18, [P.red, P.gold, P.cream, P.lime, P.orange]), { left: -210, top: 220 });
  binds.push(t => bun.querySelectorAll('.fl').forEach((f, i) => { f.style.transformBox = 'fill-box'; f.style.transformOrigin = 'center top'; f.style.transform = `rotate(${Math.sin(t * 3 + i) * 9}deg)`; }));
  fgStrip(Wd, 'grass', 17, GR, GRIM);
  const walkers = [0, 1].map(i => { const gw = E(mid, 'a', '', { left: -420 - i * 300, top: 1200 - 361, width: 190, height: 361 });
    actor(gw, 190, { top: 'genji', c1: i ? '#f4ead6' : '#ffc93c', low: 'lungi', lungi: i ? 'G' : 'B', head: null, hair: 'short', must: 1, skin: '#7a4a2a', pose: 'head', expr: 'happy' }, { left: 0, top: 0 }).blink(tE + 1, tE + 3);
    E(gw, 'a', basket(200), { left: -5, top: -60 }); return gw; });
  walkers.forEach((w, i) => { tl.to(w, { x: 760 + i * 120, duration: 3.2, ease: 'power1.out' }, tE + .1); tl.to(w, { y: -10, duration: .16, yoyo: true, repeat: 19, ease: 'sine.inOut' }, tE + .1); });
  sfx(tE + .2, 'crowd', { d: 3, soft: 1 });
  const NV = W(3, 'আসল') - .1, cal = E(c, 'a', calPage(330, 'অগ্রহায়ণ', '১', P.red), { left: 640, top: 300, transformOrigin: '50% 100%' });
  land(cal, NV, -900, 'thud');
  const nb = plaqueK(c, 'আসল নববর্ষ!', { left: 610, top: 760, transform: 'rotate(-5deg)' }, P.gold, P.n1, 52); popK(nb, NV + .5, 'star');
  [[260, 420, 0], [180, 640, .3], [420, 330, .55]].forEach(([x, y, d]) => { burst(c, x, y, NV + .3 + d, 24, [P.gold, P.lime, P.red, P.cream], 240); sfx(NV + .3 + d, 'pop', { p: 1 }); });
  const LX = W(3, 'বছরের') - .1, dim = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, background: 'rgba(40,14,6,.72)', opacity: 0 });
  tl.to(dim, { opacity: 1, duration: .4 }, LX).to([cal, nb], { opacity: 0, duration: .3 }, LX);
  const spot = E(c, 'a', svg(1080, '0 0 1080 1400', `<path d="M440 0 H640 L960 1300 H120Z" fill="url(#gSun)" opacity=".32"/>`), { left: 0, top: 0, opacity: 0 }); tl.to(spot, { opacity: 1, duration: .3 }, LX + .1); sfx(LX + .1, 'switch');
  const hero = E(c, 'a', '', { left: 0, top: 0, width: 1080, height: 1920, opacity: 0 }), cu = E(hero, 'a', cushion(560), { left: 260, top: 1040 }), gr = E(hero, 'a', grain(210, 1, 'happy'), { left: 435, top: 720, transformOrigin: '50% 100%' }), cr = E(hero, 'a', crown(190), { left: 445, top: 600, transformOrigin: '50% 100%' });
  tl.set(hero, { opacity: 1 }, LX + .1);
  popK(cu, LX + .1, null); land(gr, LX + .25, -800, 'plop'); land(cr, W(3, 'লাক্সারি') - .15, -700, 'ding');
  sparkles(hero, 10, 300, 560, 480, 560, W(3, 'লাক্সারি'), tF, 7);
  const lx = H(c, `<span style="color:${P.gold}">লাক্সারি</span>`, 340, 120, { textShadow: '0 0 40px rgba(255,201,60,.6)' }); hIn(lx, W(3, 'লাক্সারি') - .05); sfx(W(3, 'লাক্সারি'), 'shine');
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(600, 900, 1.1), { duration: tF - tE, ease: 'sine.inOut' }), tE);
}

/* ═════════ F · in the bazaar: new rice turns cheap, old rice turns VIP — কেন? ═════════ */
{
  const tF = S(4) - .2, tG = S(5) - .2, c = F1 = scene('F', tF, tG, { pre: .25, post: .2, push: 1.03 }), Wd = world(c);
  whip(tF, E1, F1, 'up', .5);
  skyDay(Wd, { sx: 820, sy: 300 });
  const far = Wd.plane(.25);
  E(far, 'a', svg(1500, '0 0 1500 520', Array.from({ length: 8 }, (_, i) => { const x = i * 190; return `<rect x="${x}" y="200" width="170" height="320" fill="${['#c98552', '#b8743f', '#d9a060'][i % 3]}"/><path d="M${x - 14} 210 L${x + 85} 130 L${x + 184} 210Z" fill="${['#c4233b', '#2f7aa8', '#e8a020', '#3f8f3a'][i % 4]}"/>${Array.from({ length: 6 }, (_, j) => `<path d="M${x - 14 + j * 33} 210 l16 22 l17 -22" fill="#fff" opacity=".85"/>`).join('')}<rect x="${x + 20}" y="300" width="130" height="150" fill="#3a1e0a"/>${Array.from({ length: 5 }, (_, j) => `<ellipse cx="${x + 40 + j * 24}" cy="440" rx="16" ry="12" fill="${['#efe2c4', '#d9c49a'][j % 2]}"/>`).join('')}`; }).join('')), { left: -210, top: 760 });
  const stg = Wd.plane(.4); floorK(stg, 1260, '#c9a070', '#7a5a3a'); fgStrip(Wd, 'crowd', 0, '#3a2414');
  const mid = Wd.plane(1);
  E(mid, 'a', svg(200, '0 0 200 180', `<path d="M100 0 L190 180 H10Z" fill="#8a5a2e"/><path d="M100 0 L190 180 H140Z" fill="#5a3418"/>`), { left: 440, top: 1100 });
  const pk = E(mid, 'a', '', { left: 90, top: 820, width: 900, height: 290, transformOrigin: '450px 280px' });
  E(pk, 'a', '', { left: 0, top: 266, width: 900, height: 28, borderRadius: 14, background: `linear-gradient(${P.gold},${P.goldD})` });
  const Ls = E(pk, 'a', sackK(220, 'নতুন চাল'), { left: 30, top: 10, transformOrigin: '50% 100%' }), Rs = E(pk, 'a', sackK(220, 'পুরান চাল', 1), { left: 650, top: 10, transformOrigin: '50% 100%' });
  const cr = E(pk, 'a', crown(130), { left: 75, top: -60, transformOrigin: '50% 100%' });
  bob(cr, tF, W(4, 'ভিআইপি') - 1.2, 8, .9, 4);
  const CH = W(4, 'সস্তা') - .1, tg1 = E(pk, 'a', priceTag(150, 'সস্তা ▼', P.red), { left: 50, top: 150, transformOrigin: '0 50%', opacity: 0 });
  tl.to(pk, { rotation: -9, duration: .7, ease: 'elastic.out(1,.45)' }, CH).fromTo(tg1, { opacity: 0, rotation: -40 }, { opacity: 1, rotation: 8, duration: .6, ease: 'elastic.out(1,.4)', immediateRender: false }, CH);
  tl.to(Ls, { scaleY: .9, scaleX: 1.08, duration: .2, yoyo: true, repeat: 1 }, CH); sfx(CH, 'fall'); sfx(CH + .2, 'sad');
  const VP = W(4, 'ভিআইপি') - .25;
  tl.to(pk, { rotation: -20, duration: .8, ease: 'elastic.out(1,.4)' }, VP - .25).to(cr, { keyframes: [{ x: 300, y: -340, rotation: 25, duration: .35, ease: 'power2.out' }, { x: 620, y: -40, rotation: 0, duration: .35, ease: 'power2.in' }] }, VP);
  sfx(VP + .7, 'ding');
  const sh = E(pk, 'a', shades(150), { left: 685, top: 60, opacity: 0 }); tl.fromTo(sh, { y: -300, opacity: 1 }, { y: 0, duration: .3, ease: 'bounce.out', immediateRender: false }, VP + .45); sfx(VP + .5, 'click');
  const tg2 = E(pk, 'a', priceTag(150, 'ভিআইপি ▲', P.gold), { left: 640, top: 150, opacity: 0 }); popK(tg2, VP + .6, 'coin');
  const rp = E(mid, 'a', rope(380), { left: 640, top: 1170 }); popK(rp, VP + .4, null);
  [[760, 560], [960, 700], [620, 640]].forEach(([x, y], i) => { const f = E(c, 'a', sparkle(120, '#fff'), { left: x, top: y, opacity: 0 }); tl.fromTo(f, { opacity: 1, scale: .2 }, { opacity: 0, scale: 1.3, duration: .3, immediateRender: false }, VP + .7 + i * .22); sfx(VP + .7 + i * .22, 'shutter'); });
  const KN = W(4, 'কেন') - .2, q = E(c, 'a', qMark(420), { left: 0, width: 1080, top: 200, textAlign: 'center', transformOrigin: '50% 100%', opacity: 0 });
  land(q, KN, -900, 'impact'); shake(KN + .42, 14, .3);
  tl.fromTo(Wd.cam, Wd.aim(540, 960, 1), Object.assign(Wd.aim(540, 1000, 1.06), { duration: tG - tF, ease: 'sine.inOut' }), tF);
}
