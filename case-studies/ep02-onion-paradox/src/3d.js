/* EP02 3D layer — plates (stills rendered once at load), the live onion-field rig, and the rocket flame. */
const T3 = M3.THREE;
const proj = (cam, x, y, z, W = 1080, Hh = 1920) => { cam.updateMatrixWorld(); const v = new T3.Vector3(x, y, z).project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * Hh]; };

const PLATES = (() => {
  const C = {};
  return {
    /** grassy village hills under the hook (transparent sky so the DOM sky shows) */
    hookLand: () => C.hook || (C.hook = M3.plate(1080, 960, (S, cam) => {
      const L = M3.land({ seed: 5, hutX: -7, trees: 30, grass: 16000, grassDepth: 30 }); S.add(L);
      M3.lights(S, { kp: [-6, 5, -8], ki: 2.2, key: '#d9ff9a', rim: '#ffe2a0', ri: 1.4, sky: '#3a8a6a', gnd: '#0a2014', hi: .9, shadow: 1 });
      S.fog = new T3.Fog('#0b3d2e', 16, 46); cam.fov = 34; cam.updateProjectionMatrix(); cam.position.set(0, 1.5, 9); cam.lookAt(0, 2.6, -10);
    }, { shadow: 1 })),
    /** storage house (mud walls, tin roof) at dusk, onion stock inside: fresh / 30% rotten */
    store: () => C.store || (C.store = (() => {
      let cam0, door, pileP;
      const build = rot => (S, cam) => {
        S.background = M3.skyTex('#071d16', '#123d2e', '#2c5a40'); S.fog = new T3.Fog('#123d2e', 14, 40);
        const L = M3.land({ seed: 7, hut: false, trees: 26, grass: 12000 }); S.add(L); const h = L.userData.h, y0 = h(0, 0);
        const sh = M3.shed(); sh.position.y = y0; S.add(sh);
        const RT = new Set([1, 4, 7, 9, 12, 15, 18, 21]); let k = 0;
        for (let r = 0; r < 4; r++) { const n = 7 - r; for (let i = 0; i < n; i++, k++) {
          const o = M3.onion({ rot: rot && RT.has(k) }); o.scale.setScalar(.3); o.position.set((i - (n - 1) / 2) * .26 + (M3.rnd(k) - .5) * .05, y0 + r * .2, .55 - r * .1 + (M3.rnd(k + 3) - .5) * .1); o.rotation.set((M3.rnd(k + 5) - .5) * .6, M3.rnd(k + 6) * 6, (M3.rnd(k + 7) - .5) * .6); S.add(o); } }
        for (const [x, z, ry] of [[-2.9, 1.6, .4], [2.8, 1.9, -.5]]) { const cr = M3.crate(); cr.scale.setScalar(.9); cr.position.set(x, h(x, z), z); cr.rotation.y = ry; S.add(cr); }
        for (let i = 0; i < 6; i++) { const o = M3.onion({ rot: rot && i % 2 }); o.scale.setScalar(.28); o.position.set(-1.5 + i * .55, h(0, 2.4) + .02, 2.3 + M3.rnd(i) * .5); o.rotation.z = 1.4; S.add(o); }
        M3.lights(S, { kp: [5, 6, 7], ki: 1.4, key: '#ffd9a0', rim: '#9fe0c0', ri: 1.6, sky: '#2a6a5a', gnd: '#0a1a10', hi: .7, shadow: 1 });
        cam.fov = 50; cam.updateProjectionMatrix(); cam.position.set(0, y0 + 1.9, 9.6); cam.lookAt(0, y0 + 1.25, 0); cam0 = cam;
        door = proj(cam, 0, y0 + 1.0, 1.5); pileP = proj(cam, 0, y0 + .35, .4);
      };
      const fresh = M3.plate(1080, 1920, build(false), { shadow: 1, jpg: 1 }), rot = M3.plate(1080, 1920, build(true), { shadow: 1, jpg: 1 });
      return { fresh, rot, door, pile: pileP };
    })()),
  };
})();

/** live onion field: Bangladeshi farmers harvesting; pose(u) sets the camera/actors for scene-local time u and returns a cache key */
function FIELD3D() {
  const S = new T3.Scene();
  S.background = M3.skyTex('#1e6e54', '#8ccaa2', '#e9f2c6'); S.fog = new T3.Fog('#cfe6c0', 15, 52);
  const L = M3.land({ field: 1, seed: 3, grass: 15000, hutX: 8 }); S.add(L, M3.crop(L)); const h = L.userData.h;
  M3.lights(S, { shadow: 1, kp: [7, 9, 6], ki: 2.6, key: '#fff0cc', rim: '#d9ff9a', ri: 1.4, sky: '#bfe8d0', gnd: '#3a4a20', hi: .85 });
  const sun = new T3.Sprite(new T3.SpriteMaterial({ map: M3.glowTex('#fff3b0'), depthWrite: false, fog: false, transparent: true })); sun.scale.set(26, 26, 1); sun.position.set(14, 20, -44); S.add(sun);
  const mk = (o, x, z, ry) => { const m = M3.human(o); m.position.set(x, h(x, z), z); m.rotation.y = ry; m.traverse(q => { if (q.isMesh) q.castShadow = true; }); S.add(m); return m; };
  const A = mk({ hat: 'mathal', top: 'vest', gamcha: 'shoulder', pose: 'hold', expr: 'happy', skin: '#5e3520', hairC: '#2e2c2a', lungiC: '#1d4f7a' }, -.5, 2.6, .3);
  const B = mk({ gamcha: 'head', top: 'vest', pose: 'pull', bend: .95, expr: 'happy', skin: '#6a3c22', lungiC: '#2f5a2a' }, 1.9, .6, -.7);
  const Cc = mk({ pose: 'head', top: 'vest', gamcha: 'head', expr: 'happy', skin: '#5a321c', lungiC: '#7a2a3a' }, -3.6, -1.6, 1.4);
  const D = mk({ hat: 'mathal', top: 'shirt', topC: '#c9b48a', pose: 'pull', bend: 1.0, skin: '#5e3520', lungiC: '#4a4a7a' }, 3.4, -4.2, -.3);
  const cam = new T3.PerspectiveCamera(36, 1080 / 1920, .1, 200);
  const ease = k => k < 0 ? 0 : k > 1 ? 1 : k * k * (3 - 2 * k), lerp = (a, b, k) => a + (b - a) * k;
  function pose(u) {
    const a = ease((u + .3) / 2.1), b = ease((u - 1.6) / 1.0), q = Math.min(u, 2.7);
    const cx = lerp(2.2, .6, a), cz = lerp(11.5, 7.6, a) + b * .8, gy = h(cx, cz), ly = h(0, 1.5);
    cam.position.set(cx, gy + lerp(2.4, 1.75, a) + b * 2.6, cz);
    cam.lookAt(lerp(.2, -.4, a), ly + lerp(.7, 1.05, a) + b * 7.5, lerp(-.5, 1.4, a) - b * 6);
    B.userData.U.rotation.x = .95 + Math.sin(q * 4.2) * .14; B.userData.arms.forEach(r => r.sh.rotation.x = -1.35 + Math.sin(q * 4.2 + .6) * .3);
    D.userData.U.rotation.x = 1.0 + Math.sin(q * 3.6 + 1) * .12;
    Cc.position.x = -3.6 + (q + .3) * .75; Cc.position.y = h(Cc.position.x, -1.6) + Math.abs(Math.sin(q * 6)) * .03;
    A.rotation.y = .3 + Math.sin(q * 1.3) * .06; A.userData.H.rotation.x = Math.sin(q * 2.1) * .06;
    return u >= 2.7 ? 'still' : String(Math.round(u * 120));
  }
  return { S, cam, pose };
}

/** layered rocket flame + sparks + heat glow (k = intensity 0-1), drawn into a 460×820 canvas, nozzle at top centre */
function drawFlame(g, t, k) {
  const W = g.canvas.width, Hc = g.canvas.height, ox = W / 2, oy = 60;
  g.clearRect(0, 0, W, Hc); g.globalCompositeOperation = 'lighter';
  const glow = g.createRadialGradient(ox, oy + 80, 0, ox, oy + 80, 210); glow.addColorStop(0, `rgba(255,160,60,${.5 * k})`); glow.addColorStop(1, 'rgba(255,90,40,0)');
  g.fillStyle = glow; g.beginPath(); g.arc(ox, oy + 80, 210, 0, 6.283); g.fill();
  const fl = (.85 + .1 * Math.sin(t * 31) + .07 * Math.sin(t * 53 + 1)) * k, LAY = [['255,70,40', 1, 1, .55], ['255,140,40', .72, .82, .75], ['255,214,80', .48, .6, .9], ['255,250,220', .24, .34, 1]];
  LAY.forEach(([c, wf, lf, a], i) => {
    const w = 120 * wf * k, len = 640 * lf * fl, wob = Math.sin(t * (17 + i * 5) + i) * w * .22, wob2 = Math.sin(t * (11 + i * 3) + i * 2) * w * .3;
    const gr = g.createLinearGradient(0, oy, 0, oy + len); gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(.55, `rgba(${c},${a * .6})`); gr.addColorStop(1, `rgba(${c},0)`);
    g.fillStyle = gr; g.beginPath(); g.moveTo(ox - w, oy);
    g.bezierCurveTo(ox - w * 1.1 + wob, oy + len * .35, ox - w * .4 + wob2, oy + len * .75, ox + wob2 * .6, oy + len);
    g.bezierCurveTo(ox + w * .4 + wob2, oy + len * .75, ox + w * 1.1 + wob, oy + len * .35, ox + w, oy); g.closePath(); g.fill();
  });
  for (let i = 0; i < 46; i++) {
    const life = (t * (1.4 + M3.rnd(i) * 1.2) + M3.rnd(i + 1)) % 1, x = ox + (M3.rnd(i + 3) - .5) * 240 * life + Math.sin(t * 9 + i) * 14, y = oy + 40 + life * 700 * k;
    g.globalAlpha = (1 - life) * k; g.fillStyle = i % 3 ? '#ffd27a' : '#fff6d0'; g.beginPath(); g.arc(x, y, 1.5 + 3.5 * (1 - life), 0, 6.283); g.fill();
  }
  g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}
