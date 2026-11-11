/* BAUBC 3D kit (three.js r149) — procedural "3D-animation film" models rendered in headless Chromium.
 *
 * Live WebGL canvases can't be screenshotted here, so everything renders off-DOM:
 *   M3.sprite(obj, w, h, frame)  -> dataURL PNG (transparent) of a model — used as <img> in 2D scenes
 *   M3.draw(scene, cam, ctx2d)   -> renders a live scene into a 2D canvas (for animated 3D shots)
 * Models: M3.onion({rot}), M3.human({...}), M3.crate(), M3.ship(), M3.shed(), M3.basket(), M3.land({...})
 * Deterministic: no Math.random — everything seeded. */
const M3 = (() => {
  THREE.ColorManagement.legacyMode = false;   // hex colours are sRGB → convert to linear
  const R = new THREE.WebGLRenderer({ canvas: document.createElement('canvas'), antialias: true, alpha: true, preserveDrawingBuffer: true });
  R.outputEncoding = THREE.sRGBEncoding; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = .95;
  R.shadowMap.type = THREE.PCFSoftShadowMap; R.setPixelRatio(1);
  const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const V2 = (x, y) => new THREE.Vector2(x, y);
  const col = c => new THREE.Color(c);

  /* ── canvas textures ── */
  function tex(w, h, paint, rep) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; paint(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
    if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); }
    return t;
  }
  const plaid = (base, a, b, n = 8) => tex(256, 256, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let i = 0; i < n; i++) { const p = i * w / n; g.globalAlpha = .55; g.fillStyle = a; g.fillRect(p, 0, w / n * .35, h); g.fillRect(0, p, w, h / n * .35); g.globalAlpha = .4; g.fillStyle = b; g.fillRect(p + w / n * .55, 0, w / n * .08, h); g.fillRect(0, p + h / n * .55, w, h / n * .08); }
    g.globalAlpha = .08; for (let i = 0; i < 2000; i++) { g.fillStyle = i % 2 ? '#000' : '#fff'; g.fillRect(rnd(i) * w, rnd(i + 5) * h, 2, 1); }
  });
  const weave = (c1, c2) => tex(256, 256, (g, w, h) => {
    g.fillStyle = c1; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) for (let x = 0; x < w; x += 16) { g.fillStyle = ((x + y) / 16) % 2 ? c2 : c1; g.fillRect(x + 1, y + 1, 14, 14); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x, y + 14, 16, 2); }
  }, [4, 2]);
  const noiseTex = (cols, n = 9000, sz = 3, rep) => tex(256, 256, (g, w, h) => {
    g.fillStyle = cols[0]; g.fillRect(0, 0, w, h);
    for (let i = 0; i < n; i++) { g.globalAlpha = .25 + rnd(i + 3) * .4; g.fillStyle = cols[1 + (i % (cols.length - 1))]; g.fillRect(rnd(i) * w, rnd(i + 9) * h, sz * (.5 + rnd(i + 2)), sz * (.5 + rnd(i + 4))); }
  }, rep);
  const ONION = tex(512, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#e7c69a'); gr.addColorStop(.17, '#d9a27a'); gr.addColorStop(.26, '#c43f86'); gr.addColorStop(.7, '#a52a72'); gr.addColorStop(1, '#7e1e57');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) { const x = i / 70 * w + rnd(i) * 6; g.globalAlpha = .18 + rnd(i + 1) * .25; g.strokeStyle = rnd(i + 2) > .5 ? '#ffb3d9' : '#5a0f3c'; g.lineWidth = 1 + rnd(i + 3) * 2.5; g.beginPath(); g.moveTo(x, h * .2); g.bezierCurveTo(x + 6, h * .45, x - 6, h * .75, x, h); g.stroke(); }
    g.globalAlpha = .35; for (let i = 0; i < 400; i++) { g.fillStyle = '#f3dcc0'; g.fillRect(rnd(i + 7) * w, rnd(i + 8) * h * .25, 3, 1); }
  });
  const ROT = tex(512, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#8a7a4a'); gr.addColorStop(.3, '#7a6a2e'); gr.addColorStop(1, '#3c3214');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) { const r = 6 + rnd(i) * 28; g.globalAlpha = .55 + rnd(i + 3) * .4; g.fillStyle = ['#2b3410', '#4a5a1a', '#1b1a0a', '#6b7a2a'][i % 4]; g.beginPath(); g.ellipse(rnd(i + 1) * w, h * .25 + rnd(i + 2) * h * .75, r * 1.4, r, 0, 0, 6.283); g.fill(); }
    g.globalAlpha = .5; for (let i = 0; i < 500; i++) { g.fillStyle = '#c8d6a0'; g.fillRect(rnd(i + 11) * w, rnd(i + 12) * h, 2, 2); }
  });

  /* ── materials ── */
  const std = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: col(c), roughness: .6, metalness: 0 }, o));
  const skinM = c => new THREE.MeshPhysicalMaterial({ color: col(c), roughness: .48, sheen: .6, sheenColor: col('#ff8a66'), sheenRoughness: .5, clearcoat: .08 });
  const M = { onion: new THREE.MeshPhysicalMaterial({ map: ONION, roughness: .32, clearcoat: .7, clearcoatRoughness: .25 }),
    rot: std('#ffffff', { map: ROT, roughness: .85 }), root: std('#e9d6b2', { roughness: .9 }), dark: std('#161210', { roughness: .4 }), white: std('#f4f1ea', { roughness: .3 }),
    hair: std('#14100e', { roughness: .55 }), grey: std('#8c8a86', { roughness: .6 }) };

  /* ── onion ── */
  const onionGeo = (() => {
    const P = [[0, 0], [.18, .02], [.34, .09], [.46, .22], [.5, .36], [.47, .52], [.38, .66], [.24, .79], [.12, .88], [.07, .96], [.055, 1.06], [.035, 1.16], [.012, 1.24], [0, 1.26]].map(([x, y]) => V2(x, y));
    const g = new THREE.LatheGeometry(P, 48), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = p.getY(i), a = Math.atan2(z, x), k = 1 + .025 * Math.sin(a * 7 + y * 3) + .015 * Math.sin(a * 13); p.setX(i, x * k); p.setZ(i, z * k); }
    g.computeVertexNormals(); return g;
  })();
  function onion(o = {}) {
    const G = new THREE.Group(), b = new THREE.Mesh(onionGeo, o.rot ? M.rot : M.onion); G.add(b);
    if (o.rot) { b.scale.set(1.05, .86, 1.05); }
    for (let i = 0; i < 7; i++) { const r = new THREE.Mesh(new THREE.CylinderGeometry(.006, .01, .12, 4), M.root); const a = i / 7 * 6.283; r.position.set(Math.cos(a) * .05, -.04, Math.sin(a) * .05); r.rotation.set(Math.sin(a) * .7, 0, -Math.cos(a) * .7); G.add(r); }
    return G;
  }

  /* ── humans (stylised-realistic, Bangladeshi wardrobe) ── */
  function lathe(points, seg, mat, folds = 0) {
    const g = new THREE.LatheGeometry(points.map(([x, y]) => V2(x, y)), seg);
    if (folds) { const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = p.getY(i), a = Math.atan2(z, x), k = 1 + folds * Math.sin(a * 9 + y * 4) * (1 - y); p.setX(i, x * k); p.setZ(i, z * k); } g.computeVertexNormals(); }
    return new THREE.Mesh(g, mat);
  }
  const cap = (r, len, mat) => new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), mat);
  const sph = (r, mat, s = [1, 1, 1], seg = 24) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * .75)), mat); m.scale.set(...s); return m; };
  /** o: skin, top('vest'|'shirt'|'fatua'|'kameez'|'suit'), topC, bottom('lungi'|'pants'|'none'), lungiC, hat('mathal'|'tupi'|'pagri'|'cap'|null), gamcha('shoulder'|'head'|null),
   *  hair('short'|'bald'|'long'|'bun'), hairC, beard, mustache, expr('happy'|'talk'|'shock'|'smirk'|'think'|'neutral'), pose('down'|'shrug'|'hold'|'think'|'talk'|'head'|'pull'), glow (red eyes), bend */
  function human(o = {}) {
    const skin = skinM(o.skin || '#7c4a2c'), G = new THREE.Group(), U = new THREE.Group(); U.position.y = .94; G.add(U);
    const topM = o.top === 'vest' ? std(o.topC || '#efeae0', { roughness: .8, map: noiseTex(['#ffffff', '#dcd6ca'], 4000, 2, [3, 3]) }) : std(o.topC || '#3b7d5c', { roughness: .75 });
    // legs, feet
    for (const s of [-1, 1]) { const l = cap(.05, .62, o.bottom === 'pants' || o.top === 'suit' ? std(o.pantC || '#2a2a2e', { roughness: .8 }) : skin); l.position.set(s * .08, .38, 0); G.add(l); const f = sph(.055, skin, [1, .5, 1.9]); f.position.set(s * .085, .03, .05); G.add(f); }
    if (o.bottom !== 'pants' && o.top !== 'suit' && o.top !== 'kameez') {
      const lm = std('#ffffff', { map: plaid(o.lungiC || '#1d4f7a', '#2f7fb8', '#e8e2d2', 7), roughness: .85 });
      const lu = lathe([[0, 0], [.2, 0], [.21, .2], [.19, .45], [.175, .64], [.17, .74], [0, .74]], 40, lm, .035); lu.position.y = .2; G.add(lu);
      const kn = sph(.04, lm, [1.4, .9, .8]); kn.position.set(0, .9, .17); G.add(kn);
    }
    if (o.bottom === 'pants' || o.top === 'suit') { const hp = lathe([[0, 0], [.17, 0], [.18, .12], [.165, .26], [0, .26]], 32, std(o.pantC || '#2a2a2e', { roughness: .8 })); hp.position.y = .66; G.add(hp); }
    // torso
    const tor = o.top === 'kameez' ? lathe([[0, -.75], [.25, -.75], [.22, -.3], [.18, 0], [.2, .22], [.23, .38], [.2, .48], [.08, .52], [0, .52]], 40, topM, .02)
      : lathe([[0, -.05], [.17, -.05], [.165, .1], [.19, .28], [.23, .4], [.21, .47], [.1, .52], [0, .52]], 40, topM);
    U.add(tor);
    if (o.top === 'suit') { const lap = new THREE.Mesh(new THREE.ConeGeometry(.08, .3, 3), std('#d9d4ca')); lap.position.set(0, .35, .18); lap.rotation.x = Math.PI; U.add(lap); }
    if (o.top === 'vest') { for (const s of [-1, 1]) { const st = cap(.025, .12, topM); st.position.set(s * .1, .47, 0); U.add(st); } }
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(.05, .06, .12, 16), skin); neck.position.y = .55; U.add(neck);
    // head
    const H = new THREE.Group(); H.position.y = .68; U.add(H);
    H.scale.setScalar(o.headScale || 1.18); const hd = sph(.115, skin, [.92, 1.1, 1], 32); H.add(hd);
    const jaw = sph(.09, skin, [1, .7, 1]); jaw.position.set(0, -.06, .025); H.add(jaw);
    for (const s of [-1, 1]) { const e = sph(.03, skin, [.45, 1, .75]); e.position.set(s * .108, 0, -.005); H.add(e); }
    const nose = sph(.024, skin, [1, 1.15, 1.1]); nose.position.set(0, -.015, .11); H.add(nose);
    const ex = o.expr || 'happy', wide = ex === 'shock' ? 1.35 : 1;
    for (const s of [-1, 1]) {
      const w = sph(.02 * wide, M.white, [1.2, 1, .7]); w.position.set(s * .043, .02, .095); H.add(w);
      const ir = sph(.012 * wide, o.glow ? new THREE.MeshBasicMaterial({ color: '#ff3020' }) : M.dark); ir.position.set(s * .043, .02, .108); H.add(ir);
      const br = new THREE.Mesh(new THREE.BoxGeometry(.05, .011, .015), M.hair); br.position.set(s * .045, .058 + (ex === 'shock' ? .016 : 0), .1);
      br.rotation.z = s * ({ happy: .12, talk: .05, shock: -.15, smirk: s > 0 ? -.25 : .1, think: s > 0 ? -.2 : .2, neutral: 0 }[ex] || 0); H.add(br);
    }
    const lip = std('#5a2418', { roughness: .4 });
    if (ex === 'shock' || ex === 'talk') { const m = sph(.024, M.dark, [1, ex === 'shock' ? 1.25 : .55, .5]); m.position.set(0, -.058, .1); m.name = 'mouth'; H.add(m); }
    else { const m = new THREE.Mesh(new THREE.TorusGeometry(.03, .006, 6, 16, ex === 'smirk' ? 1.6 : 2.2), lip); m.position.set(ex === 'smirk' ? .008 : 0, -.045, .1); m.rotation.z = ex === 'smirk' ? -2.6 : -2.67 - .0; m.rotation.x = .2; H.add(m); }
    if (o.mustache !== false && !o.female) { const mu = cap(.011, .06, M.hair); mu.rotation.z = Math.PI / 2; mu.position.set(0, -.04, .108); mu.scale.set(1, 1, .7); H.add(mu); }
    if (o.beard) { const bd = sph(.095, std(o.hairC || '#2a2420', { roughness: .9 }), [1, .75, .9]); bd.position.set(0, -.085, .03); H.add(bd); }
    const hairM = std(o.hairC || '#14100e', { roughness: .7 });
    if (o.hair !== 'bald') { const hr = new THREE.Mesh(new THREE.SphereGeometry(.122, 32, 16, 0, 6.283, 0, o.hair === 'long' || o.female ? 1.9 : 1.35), hairM); hr.scale.set(.95, 1.1, 1.04); hr.position.set(0, .012, -.012); hr.rotation.x = -.35; H.add(hr); }
    if (o.female) { const bun = sph(.06, hairM); bun.position.set(0, .03, -.13); H.add(bun); const dp = lathe([[.16, 0], [.25, .05], [.27, .14], [.2, .2], [.15, .2]], 32, std(o.duppC || '#e8508a', { roughness: .8 }), .03); dp.position.y = .3; U.add(dp); }
    // headwear
    if (o.hat === 'mathal') { const h = lathe([[0, .13], [.06, .12], [.2, .06], [.34, 0], [.33, -.012], [0, .1]], 40, std('#d8b36a', { map: weave('#d8b36a', '#b88a42'), roughness: .9 })); h.position.y = .07; H.add(h); }
    if (o.hat === 'tupi') { const h = new THREE.Mesh(new THREE.CylinderGeometry(.1, .112, .06, 28), std('#f2f0ea', { map: noiseTex(['#ffffff', '#dad6cc'], 3000, 2, [3, 1]) })); h.position.y = .1; H.add(h); }
    if (o.hat === 'cap') { const h = new THREE.Mesh(new THREE.SphereGeometry(.122, 28, 12, 0, 6.283, 0, 1.3), std(o.capC || '#c8402e')); h.position.y = .02; H.add(h); const v = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .01, 20, 1, false, -1.2, 2.4), std(o.capC || '#c8402e')); v.position.set(0, .06, .09); v.scale.z = 1.1; H.add(v); }
    const gm = std('#ffffff', { map: plaid('#b8322a', '#efe6d6', '#2a6a3a', 6), roughness: .85 });
    if (o.hat === 'pagri' || o.gamcha === 'head') { const p = new THREE.Mesh(new THREE.TorusGeometry(.105, .035, 10, 28), gm); p.rotation.x = Math.PI / 2 - .15; p.position.y = .07; H.add(p); }
    if (o.gamcha === 'shoulder') { const a = new THREE.Mesh(new THREE.BoxGeometry(.09, .5, .02), gm); a.position.set(.13, .2, .17); a.rotation.z = -.15; U.add(a); const b = new THREE.Mesh(new THREE.TorusGeometry(.1, .03, 8, 16, Math.PI), gm); b.position.set(.15, .46, 0); b.rotation.y = Math.PI / 2; U.add(b); }
    // arms
    const arms = [];
    for (const s of [-1, 1]) {
      const sh = new THREE.Group(); sh.position.set(s * .2, .43, 0); U.add(sh);
      const sleeve = o.top === 'vest' ? skin : topM;
      const ua = cap(.045, .2, sleeve); ua.position.y = -.14; sh.add(ua);
      const el = new THREE.Group(); el.position.y = -.28; sh.add(el);
      const fa = cap(.04, .19, o.top === 'shirt' || o.top === 'suit' || o.top === 'kameez' ? topM : skin); fa.position.y = -.13; el.add(fa);
      const hn = sph(.045, skin, [.9, 1.2, .7]); hn.position.y = -.28; el.add(hn);
      arms.push({ sh, el, s });
    }
    const P = { down: [[0, .12, 0, 0, 0]], shrug: [[0, 1.25, 0, -1.6, 0]], hold: [[-1.1, .15, -.5, 0, 0]], think: [[0, .12, 0, 0, 0], [-.4, -.35, -2.3, 0, 1]],
      talk: [[0, .12, 0, 0, 0], [-1.0, .55, -.9, 0, 1]], head: [[0, 2.7, 0, -1.0, 0]], pull: [[-1.35, .1, -.25, 0, 0]], point: [[0, .12, 0, 0, 0], [-1.45, .25, 0, 0, 1]] }[o.pose || 'down'];
    arms.forEach(({ sh, el, s }, i) => { const p = (P.find(q => q[4] === 1) && i === 1) ? P.find(q => q[4] === 1) : P[0]; sh.rotation.set(p[0], 0, s * p[1]); el.rotation.set(p[2], 0, s * p[3]); });
    if (o.bend) U.rotation.x = o.bend;
    if (o.pose === 'head') { const bk = basket(); bk.position.y = .88; bk.scale.setScalar(1.1); U.add(bk); }
    if (o.pose === 'hold') { const bk = basket(); bk.position.set(0, .12, .42); bk.scale.setScalar(.9); U.add(bk); }
    G.userData = { U, H, arms };
    return G;
  }
  function basket() {
    const G = new THREE.Group(), w = std('#c9964f', { map: weave('#c9964f', '#9a6a2e'), roughness: .9 });
    const b = lathe([[0, 0], [.12, 0], [.2, .05], [.25, .14], [.26, .16], [.0, .16]], 32, w); G.add(b);
    for (let i = 0; i < 7; i++) { const on = onion(); on.scale.setScalar(.16); const a = i / 7 * 6.283; on.position.set(Math.cos(a) * .12 * (i ? 1 : 0), .13 + (i ? 0 : .05), Math.sin(a) * .12 * (i ? 1 : 0)); on.rotation.z = Math.sin(a) * .5; G.add(on); }
    return G;
  }
  function crate(fill) {
    const G = new THREE.Group(), w = std('#b77a46', { map: noiseTex(['#b77a46', '#8a5530', '#d39a62'], 3000, 4, [2, 1]), roughness: .85 });
    for (let i = 0; i < 3; i++) { for (const z of [-.3, .3]) { const p = new THREE.Mesh(new THREE.BoxGeometry(1, .14, .03), w); p.position.set(0, .1 + i * .18, z); G.add(p); } for (const x of [-.48, .48]) { const p = new THREE.Mesh(new THREE.BoxGeometry(.03, .14, .6), w); p.position.set(x, .1 + i * .18, 0); G.add(p); } }
    for (const x of [-.48, .48]) for (const z of [-.3, .3]) { const p = new THREE.Mesh(new THREE.BoxGeometry(.06, .55, .06), std('#7d4b26')); p.position.set(x, .27, z); G.add(p); }
    const bot = new THREE.Mesh(new THREE.BoxGeometry(.96, .03, .6), w); bot.position.y = .03; G.add(bot);
    return G;
  }
  function ship() {
    const G = new THREE.Group(), hullS = new THREE.Shape();
    hullS.moveTo(-3, 0); hullS.lineTo(2.6, 0); hullS.quadraticCurveTo(3.3, .2, 3.4, .9); hullS.lineTo(-3.1, .9); hullS.lineTo(-3, 0);
    const hull = new THREE.Mesh(new THREE.ExtrudeGeometry(hullS, { depth: 1.2, bevelEnabled: true, bevelSize: .05, bevelThickness: .05 }), std('#174d5c', { roughness: .5, metalness: .2 }));
    hull.position.z = -.6; G.add(hull);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(6.4, .1, 1.32), std('#efe9dc')); stripe.position.set(.15, .55, 0); G.add(stripe);
    const red = new THREE.Mesh(new THREE.BoxGeometry(6.2, .2, 1.3), std('#b8322a')); red.position.set(.1, .1, 0); G.add(red);
    const C = ['#e2483a', '#f2b632', '#29b8a0', '#a8e01f', '#d0508e', '#e8e2d2', '#3a7ab8'];
    for (let x = 0; x < 8; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 2; z++) { if (y === 2 && rnd(x + z * 9) > .7) continue;
      const c = new THREE.Mesh(new THREE.BoxGeometry(.56, .3, .5), std(C[(x * 3 + y * 2 + z) % 7], { roughness: .6, metalness: .15 })); c.position.set(-2.6 + x * .6, 1.06 + y * .31, -.27 + z * .54); G.add(c); }
    const br = new THREE.Mesh(new THREE.BoxGeometry(.7, .9, 1.1), std('#efe9dc')); br.position.set(2.6, 1.35, 0); G.add(br);
    const win = new THREE.Mesh(new THREE.BoxGeometry(.72, .14, 1.12), std('#1f4a55', { roughness: .2, metalness: .5 })); win.position.set(2.6, 1.6, 0); G.add(win);
    const fun = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, .5, 16), std('#b8322a')); fun.position.set(2.75, 2.0, 0); G.add(fun);
    return G;
  }
  function shed() {
    const G = new THREE.Group(), mud = std('#a9805a', { map: noiseTex(['#a9805a', '#8a6340', '#c49a6c', '#6e4c2e'], 9000, 5, [3, 2]), roughness: .95 });
    const back = new THREE.Mesh(new THREE.BoxGeometry(4, 2, .2), mud); back.position.set(0, 1, -1.5); G.add(back);
    for (const x of [-2, 2]) { const s = new THREE.Mesh(new THREE.BoxGeometry(.2, 2, 3), mud); s.position.set(x, 1, 0); G.add(s); }
    for (const x of [-1.5, 1.5]) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2, .2), mud); s.position.set(x, 1, 1.5); G.add(s); }
    const lint = new THREE.Mesh(new THREE.BoxGeometry(2, .35, .22), mud); lint.position.set(0, 1.83, 1.5); G.add(lint);
    const inside = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2, 2.8), std('#120c08', { side: THREE.BackSide, roughness: 1 })); inside.position.y = 1; G.add(inside);
    // corrugated tin roof
    const rg = new THREE.PlaneGeometry(5, 2.3, 80, 4), rp = rg.attributes.position;
    for (let i = 0; i < rp.count; i++) rp.setZ(i, Math.sin(rp.getX(i) * 18) * .035);
    rg.computeVertexNormals();
    const tin = std('#9aa3a6', { map: noiseTex(['#9aa3a6', '#7a5a3a', '#b8c0c2', '#8a4a2a'], 2500, 6, [2, 1]), roughness: .45, metalness: .6, side: THREE.DoubleSide });
    for (const s of [-1, 1]) { const r = new THREE.Mesh(rg, tin); r.rotation.x = -Math.PI / 2 + s * .5; r.position.set(0, 2.42, s * .95); G.add(r); }
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 5, 10), tin); ridge.rotation.z = Math.PI / 2; ridge.position.y = 2.95; G.add(ridge);
    for (const x of [-2.3, 2.3]) for (const z of [1.7, -1.7]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, 2.4, 8), std('#8a6a3a', { roughness: .9 })); b.position.set(x, 1.2, z); G.add(b); }
    const lamp = new THREE.PointLight('#ffd27a', 1.2, 4); lamp.position.set(0, 1.6, .5); G.add(lamp);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: '#fff2b0' })); bulb.position.set(0, 1.62, 1.2); G.add(bulb);
    return G;
  }

  /* ── landscape (terrain + grass + village trees), used for plates and the live field ── */
  function land(o = {}) {
    const S = new THREE.Group(), N = o.size || 70, seed = o.seed || 1;
    const h = (x, z) => { let y = Math.sin(x * .12 + seed) * .5 + Math.cos(z * .09 + seed * 2) * .7 + Math.sin(x * .31 + z * .23) * .18; const far = Math.max(0, -z - 14); return y + far * far * .012 * (1 + Math.sin(x * .2 + seed) * .5); };
    const field = o.field ? (x, z) => Math.abs(x) < 9 && z > -12 && z < 6 : () => false;
    const g = new THREE.PlaneGeometry(N, N, 160, 160); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position, cols = [];
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i); let y = h(x, z), c;
      if (field(x, z)) { const ridge = Math.sin(z * Math.PI / .7); y += ridge * .07; c = ridge > 0 ? [.36, .24, .15] : [.26, .17, .1]; const e = Math.min(1, Math.min(9 - Math.abs(x), z + 12, 6 - z) / 1.2); c = c.map((v, k) => v * e + [.2, .42, .16][k] * (1 - e)); }
      else { const n = rnd(Math.floor(x * 3) * 7 + Math.floor(z * 3)); c = [.17 + n * .08, .38 + n * .14, .13 + n * .05]; if (z < -18) c = c.map((v, k) => v * .7 + [.25, .4, .35][k] * .3); }
      p.setY(i, y); const cc = new THREE.Color().setRGB(...c).convertSRGBToLinear(); cols.push(cc.r, cc.g, cc.b);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
    const ground = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .95 })); ground.receiveShadow = true; S.add(ground);
    // grass blades
    const bg = new THREE.PlaneGeometry(.04, .32, 1, 2); bg.translate(0, .16, 0); { const q = bg.attributes.position; for (let i = 0; i < q.count; i++) if (q.getY(i) > .3) q.setX(i, 0); }
    const GN = o.grass ?? 14000, grass = new THREE.InstancedMesh(bg, new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .8, side: THREE.DoubleSide }), GN);
    const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s3 = new THREE.Vector3();
    let k = 0;
    for (let i = 0; k < GN && i < GN * 3; i++) {
      const x = (rnd(i * 2 + seed) - .5) * 40, z = 8 - rnd(i * 2 + 1 + seed) * (o.grassDepth || 26); if (field(x, z)) continue;
      e.set((rnd(i + 5) - .5) * .5, rnd(i + 6) * 6, (rnd(i + 7) - .5) * .5); q4.setFromEuler(e); const sc = .6 + rnd(i + 8) * 1.1;
      m4.compose(v.set(x, h(x, z), z), q4, s3.set(sc, sc * (.7 + rnd(i + 9) * .8), sc)); grass.setMatrixAt(k, m4);
      grass.setColorAt(k, col('#2f8a3a').lerp(col(rnd(i + 3) > .5 ? '#9fd14a' : '#1f5a2a'), rnd(i + 4))); k++;
    }
    grass.count = k; S.add(grass);
    // trees: areca palms, banana, bushes on the far side
    const trunkM = std('#7a6a52', { roughness: .9 }), leafM = std('#2f7a35', { roughness: .7, side: THREE.DoubleSide }), leafM2 = std('#4b9a3a', { roughness: .7, side: THREE.DoubleSide });
    const fr = new THREE.PlaneGeometry(.5, 2.2, 1, 6); { const q = fr.attributes.position; for (let i = 0; i < q.count; i++) { const y = q.getY(i) + 1.1; q.setZ(i, -y * y * .18); q.setX(i, q.getX(i) * Math.sin(Math.min(1, y / 2.2) * Math.PI)); } fr.translate(0, 1.1, 0); fr.computeVertexNormals(); }
    const trees = o.trees ?? 34;
    for (let i = 0; i < trees; i++) {
      const x = (rnd(i + 50 + seed) - .5) * 44, z = -15 - rnd(i + 70 + seed) * 16, kind = i % 3, T = new THREE.Group();
      if (kind < 2) { const H = 5 + rnd(i) * 3, tr = new THREE.Mesh(new THREE.CylinderGeometry(.07, .11, H, 8), trunkM); tr.position.y = H / 2; tr.rotation.z = (rnd(i + 1) - .5) * .12; T.add(tr);
        for (let f = 0; f < 9; f++) { const l = new THREE.Mesh(fr, f % 2 ? leafM : leafM2); l.position.y = H; l.rotation.set(-1.1 - rnd(f + i) * .5, f / 9 * 6.283, 0, 'YXZ'); T.add(l); } }
      else { for (let b2 = 0; b2 < 5; b2++) { const bu = sph(1 + rnd(i + b2) * .8, b2 % 2 ? leafM : leafM2, [1, .8, 1], 10); bu.position.set((rnd(i + b2 * 3) - .5) * 2, 1 + rnd(i + b2 * 5), (rnd(i + b2 * 7) - .5) * 1.5); T.add(bu); } }
      T.position.set(x, h(x, z), z); T.traverse(m => { if (m.isMesh) m.castShadow = true; }); S.add(T);
    }
    // village hut with tin roof
    if (o.hut !== false) { const hut = shed(); hut.scale.setScalar(.9); hut.position.set(o.hutX ?? 9, h(9, -16), -16); hut.rotation.y = -.5; S.add(hut); }
    S.userData.h = h; S.userData.field = field;
    return S;
  }
  /** onion crop for a field: instanced leaves + half-buried bulbs on the ridges */
  function crop(L, rows = 24, per = 28) {
    const G = new THREE.Group(), h = L.userData.h;
    const leafG = new THREE.ConeGeometry(.014, .62, 6); leafG.translate(0, .31, 0);
    const n = rows * per, leaves = new THREE.InstancedMesh(leafG, std('#5fae4a', { roughness: .6 }), n * 5), bulbs = new THREE.InstancedMesh(onionGeo, M.onion, n);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(); let k = 0, b = 0;
    for (let r = 0; r < rows; r++) for (let i = 0; i < per; i++) {
      const z = 5.5 - r * .7 - .35 + .35, x = -8.4 + i * .6 + (rnd(r * 99 + i) - .5) * .2, y = h(x, z) + .07;
      m4.compose(v.set(x, y - .07, z), q.identity(), s.setScalar(.13 + rnd(r + i * 7) * .05)); bulbs.setMatrixAt(b++, m4);
      for (let l = 0; l < 5; l++) { e.set((rnd(k) - .5) * .7, rnd(k + 1) * 6.28, (rnd(k + 2) - .5) * .7); q.setFromEuler(e); m4.compose(v.set(x, y + .1, z), q, s.set(1, .8 + rnd(k + 3) * .6, 1)); leaves.setMatrixAt(k, m4);
        leaves.setColorAt(k, col('#4f9e3c').lerp(col(rnd(k + 4) > .5 ? '#b5d86a' : '#2f6e2a'), rnd(k + 5))); k++; }
    }
    leaves.castShadow = true; bulbs.castShadow = true; G.add(leaves, bulbs); return G;
  }
  function lights(S, o = {}) {
    const key = new THREE.DirectionalLight(o.key || '#fff1d6', o.ki ?? 2.4); key.position.set(...(o.kp || [4, 7, 6]));
    if (o.shadow) { key.castShadow = true; key.shadow.mapSize.set(1024, 1024); const c = key.shadow.camera; c.left = -12; c.right = 12; c.top = 12; c.bottom = -12; c.near = 1; c.far = 40; key.shadow.bias = -.0008; }
    const rim = new THREE.DirectionalLight(o.rim || '#c6ff7a', o.ri ?? 1.6); rim.position.set(-4, 3, -5);
    const hemi = new THREE.HemisphereLight(o.sky || '#bfe8d4', o.gnd || '#2a3a1a', o.hi ?? .9);
    S.add(key, rim, hemi); return { key, rim, hemi };
  }

  /* ── rendering ── */
  const out = document.createElement('canvas'), octx = out.getContext('2d');
  /** render obj to a transparent PNG dataURL. frame: {y0, y1} world-y range to fit (orthographic), or {fit:true} to auto-fit, yaw/pitch to turn the model */
  function sprite(obj, w, h, f = {}) {
    const S = new THREE.Scene(); lights(S, f.lights); const piv = new THREE.Group(); piv.add(obj); S.add(piv);
    piv.rotation.set(f.pitch || 0, f.yaw || 0, 0); piv.updateMatrixWorld(true);
    let y0 = f.y0, y1 = f.y1, cx = 0;
    if (f.fit || y0 == null) { const b = new THREE.Box3().setFromObject(piv), c = b.getCenter(new THREE.Vector3()), sz = b.getSize(new THREE.Vector3()); const hh = Math.max(sz.y, sz.x * h / w) * (f.pad || 1.08); y0 = c.y - hh / 2; y1 = c.y + hh / 2; cx = c.x; }
    const hh = y1 - y0, ww = hh * w / h, cam = new THREE.OrthographicCamera(cx - ww / 2, cx + ww / 2, y1, y0, -50, 50);
    cam.position.set(0, 0, 10); cam.lookAt(0, 0, 0); cam.position.set(0, 0, 10);
    R.setSize(w, h, false); R.setClearColor(0, 0); R.shadowMap.enabled = false; R.render(S, cam);
    out.width = w; out.height = h; octx.clearRect(0, 0, w, h); octx.drawImage(R.domElement, 0, 0);
    return out.toDataURL('image/png');
  }
  /** perspective render of a full scene into ctx (stretched to the ctx canvas) */
  function draw(S, cam, ctx, w = 720, h = 1280, o = {}) {
    R.setSize(w, h, false); R.shadowMap.enabled = !!o.shadow; R.setClearColor(o.clear || 0, o.clear ? 1 : 0); R.render(S, cam);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); ctx.drawImage(R.domElement, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  /** a plate: a still 3D scene rendered once (dataURL). build(S, cam) populates the scene. */
  function plate(w, h, build, o = {}) {
    const S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(o.fov || 40, w / h, .1, 400); build(S, cam);
    R.setSize(w, h, false); R.shadowMap.enabled = !!o.shadow; R.setClearColor(0, 0); R.render(S, cam);
    out.width = w; out.height = h; octx.clearRect(0, 0, w, h); octx.drawImage(R.domElement, 0, 0); return out.toDataURL(o.jpg ? 'image/jpeg' : 'image/png', .92);
  }
  const skyTex = (top, mid, bot) => tex(16, 512, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, top); gr.addColorStop(.55, mid); gr.addColorStop(1, bot); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
  const glowTex = c => tex(128, 128, (g, w) => { const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, c); gr.addColorStop(.25, c + 'aa'); gr.addColorStop(1, c + '00'); g.fillStyle = gr; g.fillRect(0, 0, w, w); });
  return { R, THREE, rnd, onion, human, basket, crate, ship, shed, land, crop, lights, sprite, draw, plate, skyTex, glowTex, std, onionGeo, M };
})();
