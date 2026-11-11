/* CASE STUDIES — BAUBC series logo (vector, built at runtime) + its animation.
 *
 *   const logo = buildCaseStudiesLogo(parentEl, { width: 880 });
 *   masterTimeline.add(logo.timeline, startTime);      // ~5.2s, GSAP timeline
 *   logo.cues  -> [{t, name}] sound cues relative to the logo start
 *
 * Requires: gsap, the Unbounded 900 font loaded (see _common/brand/brand.css).
 * Design notes live in ../README.md.
 */
function buildCaseStudiesLogo(parent, opts = {}) {
  const W = opts.width || 880, CREAM = '#efe9dc', LIME = '#c6ff1f';
  const ctx = document.createElement('canvas').getContext('2d');
  const font = px => `900 ${px}px Unbounded`;
  const TRACK = -0.012;                       // em, optical tightening
  const meas = (ch, px) => { ctx.font = font(px); return ctx.measureText(ch); };
  // natural width of a row at 100px, "Λ" = custom glyph whose width is given in cap-heights
  const capOf = px => meas('E', px).actualBoundingBoxAscent;
  const A_RATIO = 1.16;
  const rowW = (chars, px) => chars.reduce((s, c, i) => s + (c === 'Λ' ? capOf(px) * A_RATIO + px * 0.05 : meas(c, px).width) + (i ? TRACK * px : 0), 0);
  const R1 = ['C', 'Λ', 'S', 'E'], R2 = ['S', 'T', 'U', 'D', 'I', 'E', 'S'];
  const F1 = 100 * W / rowW(R1, 100), F2 = 100 * W / rowW(R2, 100);
  const cap1 = capOf(F1), cap2 = capOf(F2), GAP = cap2 * 0.27, H = cap1 + GAP + cap2;

  const root = document.createElement('div');
  root.className = 'cslogo';
  root.style.cssText = `position:relative;width:${W}px;height:${H}px;`;
  parent.appendChild(root);
  const mk = (tag, css, html) => { const e = document.createElement(tag); e.style.cssText = css; if (html != null) e.innerHTML = html; root.appendChild(e); return e; };

  const L = {};            // name -> element
  function layRow(chars, px, capH, top, prefix) {
    let x = 0; const m = meas('E', px), asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
    chars.forEach((c, i) => {
      const name = prefix + i + c;
      if (c === 'Λ') {
        const w = capH * A_RATIO; x += px * 0.025;
        L.A = mk('div', `position:absolute;left:${x}px;top:${top}px;width:${w}px;height:${capH}px;`,
          `<svg viewBox="0 0 116 100" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible;display:block">
             <polygon class="legL" fill="${LIME}" points="0,100 41,0 59,0 59,34 33,100"/>
             <polygon class="legR" fill="${LIME}" points="116,100 75,0 58,0 58,34 83,100"/>
             <polygon class="core" fill="${LIME}" points="58,56 73,100 43,100"/>
           </svg>`);
        L.A.dataset.w = w; x += w + px * 0.025 + TRACK * px;
      } else {
        const w = meas(c, px).width;
        // line-height box = asc+desc so the baseline sits exactly at top+capH
        L[name] = mk('span', `position:absolute;left:${x}px;top:${top + capH - asc}px;font:${font(px)};line-height:${asc + desc}px;color:${CREAM};white-space:pre;`, c);
        L[name].dataset.w = w; x += w + TRACK * px;
      }
    });
  }
  layRow(R1, F1, cap1, 0, 'a');
  layRow(R2, F2, cap2, cap1 + GAP, 'b');
  const C = L.a0C, S1 = L.a2S, E1 = L.a3E, D = L.b3D, U = L.b2U;
  const row2 = ['b0S', 'b1T', 'b2U', 'b4I', 'b5E', 'b6S'].map(k => L[k]);
  E1.style.color = LIME; D.style.color = LIME;

  // speed-smear: the letter just behind a lime glyph inherits a striped lime fade (letter stays intact)
  function smear(el, stripes) {
    const s = el.cloneNode(true);
    s.style.color = 'transparent';
    s.style.background = `linear-gradient(90deg, transparent 38%, ${LIME} 100%)`;
    s.style.webkitBackgroundClip = 'text'; s.style.backgroundClip = 'text';
    s.style.webkitMaskImage = s.style.maskImage = stripes;
    root.appendChild(s); return s;
  }
  const STR = 'linear-gradient(180deg,#000 0 22%,transparent 22% 26%,#000 26% 37%,transparent 37% 43%,#000 43% 58%,transparent 58% 62%,#000 62% 73%,transparent 73% 79%,#000 79% 100%)';
  const smC = smear(C, STR), smU = smear(U, STR);
  // free streaks that fly with the lime glyphs during the animation
  const streak = (y, h, len) => mk('div', `position:absolute;left:0;top:${y}px;height:${h}px;width:${len}px;border-radius:${h}px;background:linear-gradient(90deg,transparent,${LIME});transform-origin:100% 50%;opacity:0;`);
  const aX = parseFloat(L.A.style.left), dX = parseFloat(D.style.left), dTop = cap1 + GAP;
  const stA = [0.12, 0.38, 0.62, 0.86].map((f, i) => streak(cap1 * f, cap1 * 0.07, W * (0.5 + 0.12 * ((i * 7) % 3))));
  const stD = [0.2, 0.5, 0.8].map((f, i) => streak(dTop + cap2 * f, cap2 * 0.09, W * (0.42 + 0.1 * (i % 2))));
  // converge shards (the "everything points to the case" idea from the original mark)
  const cx = aX + L.A.dataset.w / 2, cy = cap1 * 0.52;
  const shard = rot => mk('div', `position:absolute;left:${cx}px;top:${cy}px;width:0;height:0;transform:rotate(${rot}deg);`,
    `<div class="sh" style="position:absolute;right:${cap1 * 0.1}px;top:${-cap1 * 0.09}px;width:${cap1 * 1.5}px;height:${cap1 * 0.18}px;background:linear-gradient(90deg,transparent,${LIME} 70%);clip-path:polygon(0 35%,78% 35%,78% 0,100% 50%,78% 100%,78% 65%,0 65%)"></div>`);
  const shards = [0, 125, 235].map(shard);
  const ring = mk('div', `position:absolute;left:${cx}px;top:${cy}px;width:${cap1 * 2}px;height:${cap1 * 2}px;margin:${-cap1}px 0 0 ${-cap1}px;border-radius:50%;border:${cap1 * 0.05}px solid ${LIME};opacity:0;`);
  const flash = mk('div', `position:absolute;left:${cx}px;top:${cy}px;width:${W * 1.6}px;height:${W * 1.6}px;margin:${-W * 0.8}px 0 0 ${-W * 0.8}px;border-radius:50%;background:radial-gradient(circle,${LIME} 0%,rgba(198,255,31,.35) 18%,transparent 60%);opacity:0;pointer-events:none;`);
  const shine = mk('div', `position:absolute;left:0;top:${-H * 0.2}px;width:${W * 0.22}px;height:${H * 1.4}px;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);mix-blend-mode:overlay;opacity:0;transform:skewX(-18deg);`);

  // ───────── animation ─────────
  const tl = gsap.timeline(), cues = [];
  const cue = (t, name) => cues.push({ t, name });
  const sh = shards.map(s => s.firstChild);
  gsap.set([C, S1, E1, D, L.A, smC, smU, ...row2], { opacity: 0 });
  // 1 · three arrows converge on the case point
  tl.fromTo(sh, { x: -W * 1.5, opacity: 0, scaleX: 1.6 }, { x: 0, opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.in', stagger: 0.07, transformOrigin: '100% 50%' }, 0.1);
  cue(0.1, 'whoosh'); cue(0.24, 'whoosh');
  tl.to(sh, { opacity: 0, scaleX: 0.1, duration: 0.1 }, 0.72);
  // 2 · impact → the A is born
  tl.fromTo(flash, { opacity: 0, scale: 0.2 }, { opacity: 0.95, scale: 1, duration: 0.09, ease: 'power2.out' }, 0.72)
    .to(flash, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.81)
    .fromTo(ring, { opacity: 1, scale: 0.1 }, { opacity: 0, scale: 3.4, duration: 0.9, ease: 'power3.out' }, 0.74);
  cue(0.72, 'impact');
  tl.fromTo(L.A, { opacity: 1, scale: 2.6, rotation: -8 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(1.6)', transformOrigin: '50% 55%' }, 0.74);
  tl.fromTo(L.A.querySelector('.core'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2.5)' }, 1.05);
  // 3 · row one snaps around it
  tl.fromTo(C, { opacity: 0, x: -W * 0.6, skewX: 24 }, { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'expo.out' }, 0.98)
    .fromTo(S1, { opacity: 0, x: W * 0.6, skewX: -24 }, { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'expo.out' }, 1.04)
    .fromTo(E1, { opacity: 0, x: W * 0.8, skewX: -24 }, { opacity: 1, x: 0, skewX: 0, duration: 0.55, ease: 'expo.out' }, 1.1);
  cue(0.98, 'swish');
  tl.fromTo(stA, { opacity: 0.9, x: aX - W * 1.0, scaleX: 1.2 }, { x: i => aX - W * (0.5 + 0.12 * ((i * 7) % 3)), scaleX: 0, opacity: 0.9, duration: 0.6, ease: 'expo.out', stagger: 0.03 }, 0.95)
    .fromTo(smC, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.25);
  // 4 · STUDIES rises, D arrives last at speed
  tl.fromTo(row2, { opacity: 0, y: cap2 * 1.1, scaleY: 1.5 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.045, transformOrigin: '50% 100%' }, 1.3);
  cue(1.3, 'ticks');
  tl.fromTo(D, { opacity: 1, x: -W * 1.3, skewX: 30 }, { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'expo.out' }, 1.75)
    .fromTo(stD, { opacity: 0.95, x: dX - W * 1.6, scaleX: 1.4 }, { x: i => dX - W * (0.42 + 0.1 * (i % 2)), scaleX: 0, opacity: 0.9, duration: 0.75, ease: 'expo.out', stagger: 0.04 }, 1.75)
    .fromTo(smU, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 2.1)
    .fromTo(root, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.5)' }, 2.12);
  cue(1.75, 'whoosh'); cue(2.12, 'lock');
  tl.set(stA, { opacity: 0 }, 1.7).set(stD, { opacity: 0 }, 2.6);
  // 5 · polish
  tl.fromTo(shine, { opacity: 1, x: -W * 0.4 }, { x: W * 1.2, duration: 0.8, ease: 'power2.inOut' }, 2.5).set(shine, { opacity: 0 }, 3.3);
  cue(2.5, 'shine');
  tl.to(root, { scale: 1.035, duration: 2.6, ease: 'none' }, 2.62);
  tl.to({}, { duration: 0.01 }, 5.2);
  return { el: root, timeline: tl, cues, width: W, height: H, duration: 5.2 };
}
