/* shared 2D helpers lifted from EP01 (tree, palm, grassFG, fog, burst) */
const tree = (w, a = '#0f4a37', b = '#156048') => svg(w, '0 0 200 260', `<rect x="90" y="150" width="20" height="110" rx="8" fill="#3a2a1a"/><circle cx="100" cy="100" r="78" fill="${a}"/><circle cx="56" cy="134" r="50" fill="${a}"/><circle cx="148" cy="130" r="54" fill="${a}"/><circle cx="118" cy="76" r="50" fill="${b}"/><circle cx="74" cy="92" r="34" fill="${b}"/>`);
const palm = (w, c = '#0c3a2c') => svg(w, '0 0 200 420', `<path d="M96 420 C92 300 100 200 108 96" stroke="${c}" stroke-width="13" fill="none" stroke-linecap="round"/>${[[-78, -8], [-52, -52], [-8, -78], [44, -62], [80, -22], [70, 34], [-66, 40]].map(([x, y]) => `<path d="M108 96 Q${108 + x * .7} ${96 + y * .9 - 22} ${108 + x * 1.15} ${96 + y * 1.15 + 16} Q${108 + x * .6} ${96 + y * .6 + 4} 108 96Z" fill="${c}"/>`).join('')}`);
const grassFG = (w, c = '#061c14') => svg(w, '0 0 400 200', Array.from({ length: 34 }, (_, i) => { const x = i * 12 + rnd(i) * 8, h = 70 + rnd(i + 3) * 120, b = (rnd(i + 6) - .5) * 50; return `<path d="M${x - 7} 200 Q${x + b * .4} ${200 - h * .6} ${x + b} ${200 - h} Q${x + b * .5 + 5} ${200 - h * .55} ${x + 8} 200Z" fill="${c}"/>`; }).join(''));
function fog(el, n, x0, x1, y0, y1, col = '190,220,200', a = .22, seed = 0) {
  const bs = Array.from({ length: n }, (_, i) => E(el, 'a', '', { left: 0, top: y0 + rnd(i + seed) * (y1 - y0), width: 380 + rnd(i + 2) * 300, height: 120 + rnd(i + 4) * 90, borderRadius: '50%', background: `radial-gradient(ellipse,rgba(${col},${a}),rgba(${col},0) 68%)` }));
  binds.push(T2 => bs.forEach((b, i) => { const span = x1 - x0 + 500, x = ((rnd(i + 7 + seed) * span + T2 * (14 + rnd(i) * 22) * (i % 2 ? 1 : -1)) % span + span) % span + x0 - 250; b.style.transform = `translateX(${x}px)`; }));
}
function burst(parent, x, y, t, n = 22, cols = ['#c6ff1f', '#efe9dc', '#ffc83d', '#29c7ff'], R = 300) {
  for (let i = 0; i < n; i++) { const k = E(parent, 'a', '', { left: x, top: y, width: 12 + (i % 3) * 6, height: 12 + (i % 3) * 6, borderRadius: i % 2 ? '50%' : '3px', background: cols[i % cols.length], opacity: 0 });
    const a = i / n * 6.283 + rnd(i + x) * .5, d = R * (.5 + rnd(i + y) * .6);
    tl.fromTo(k, { opacity: 1, x: 0, y: 0, scale: 1 }, { x: Math.cos(a) * d, y: Math.sin(a) * d, duration: .7, ease: 'power3.out', immediateRender: false }, t).to(k, { y: '+=130', opacity: 0, scale: .3, duration: .8, ease: 'power1.in' }, t + .7); }
}
