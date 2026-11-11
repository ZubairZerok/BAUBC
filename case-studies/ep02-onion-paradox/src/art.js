/* EP02 art kit — flat "explainer" illustration (Kurzgesagt-inspired) in the BAUBC green palette.
 * Every asset is an SVG string built in code; shared gradients live in one hidden <defs>. */
const K = { night: '#05211a', deep: '#0a3427', mid: '#12503a', hill1: '#145c41', hill2: '#1d7a52', hill3: '#2a9a5f', leaf: '#37b26f',
  lime: '#c6ff1f', lime2: '#e4ff7a', cream: '#efe9dc', ink: '#0a0c06', on: '#c9348a', onD: '#6e1a4d', skin: '#f2b48c', skinD: '#d58e66',
  hair: '#1b1530', gold: '#ffc83d', red: '#ff4a3d', wood: '#c48450', woodD: '#7d4b26', teal: '#2fd3b5', mouth: '#7a1d3a' };
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="gOn" cx=".36" cy=".42" r=".8"><stop offset="0" stop-color="#ffa3d0"/><stop offset=".4" stop-color="#d4418f"/><stop offset="1" stop-color="#5e1642"/></radialGradient>
<radialGradient id="gOnR" cx=".36" cy=".42" r=".8"><stop offset="0" stop-color="#c7b46a"/><stop offset=".5" stop-color="#7a6a2e"/><stop offset="1" stop-color="#2e2610"/></radialGradient>
<linearGradient id="gNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead2a8"/><stop offset="1" stop-color="#b8406f"/></linearGradient>
<linearGradient id="gLeaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5f07a"/><stop offset="1" stop-color="#1c7d50"/></linearGradient>
<linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d2925a"/><stop offset="1" stop-color="#8a5530"/></linearGradient>
<linearGradient id="gHi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a8f86"/><stop offset="1" stop-color="#06302e"/></linearGradient>
</defs></svg>`);
const svg = (w, vb, body, css = '') => { const [, , vw, vh] = vb.split(' ').map(Number); return `<svg width="${w}" height="${w * vh / vw}" viewBox="${vb}" style="display:block;overflow:visible;${css}">${body}</svg>`; };

/** onion; o.rot (0-1) pre-sets the rot layer (.rt) which scenes can animate */
function onion(s, o = {}) {
  return svg(s, '0 0 100 112', `<g class="ob">
    <path d="M46 22 C44 12 47 5 50 0 C53 5 56 12 54 22Z" fill="url(#gNeck)"/>
    <path d="M50 17 C28 27 6 47 8 73 C10 97 30 108 50 108 C70 108 90 97 92 73 C94 47 72 27 50 17Z" fill="url(#gOn)"/>
    <g class="rt" opacity="${o.rot || 0}"><path d="M50 17 C28 27 6 47 8 73 C10 97 30 108 50 108 C70 108 90 97 92 73 C94 47 72 27 50 17Z" fill="url(#gOnR)"/>
      <circle cx="64" cy="60" r="9" fill="#3c4a14"/><circle cx="38" cy="84" r="7" fill="#2f3810"/><circle cx="70" cy="88" r="5" fill="#5a6a1c"/><circle cx="30" cy="58" r="4" fill="#3c4a14"/></g>
    <path d="M50 20 C36 36 30 60 36 104 M50 20 C64 36 70 60 64 104 M50 19 C22 40 16 76 26 98 M50 19 C78 40 84 76 74 98" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="2"/>
    <ellipse cx="31" cy="58" rx="7" ry="15" fill="#fff" opacity=".3" transform="rotate(22 31 58)"/>
    <path d="M43 106 l-4 6 M50 107 v6 M57 106 l4 6" stroke="#ead2a8" stroke-width="2.4" stroke-linecap="round"/></g>`, o.css);
}
/** a flat person. o: shirt, hair, skin, hat('straw'|'cap'), expr('happy'|'talk'|'think'|'shock'|'smirk'), pose('down'|'think'|'talk'|'hold'|'shrug'), long, apron */
function person(w, o = {}) {
  const sh = o.shirt || '#8fd14f', hr = o.hair || K.hair, sk = o.skin || K.skin, ex = o.expr || 'happy', po = o.pose || 'down';
  const A = { down: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C160 262 164 292 160 318', 160, 318],
    think: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C178 262 158 198 126 180', 124, 178],
    talk: ['M58 236 C40 262 36 292 40 318', 40, 318, 'M142 236 C184 248 198 214 196 184', 196, 180],
    hold: ['M58 236 C44 262 58 284 78 288', 78, 288, 'M142 236 C156 262 142 284 122 288', 122, 288],
    shrug: ['M58 236 C30 242 22 214 30 194', 30, 190, 'M142 236 C170 242 178 214 170 194', 170, 190] }[po];
  const brow = { happy: 'M68 118 Q80 111 92 118 M108 118 Q120 111 132 118', talk: 'M68 116 Q80 110 92 116 M108 114 Q120 108 132 114', think: 'M68 120 Q80 114 92 120 M108 112 Q120 106 132 114',
    shock: 'M68 108 Q80 100 92 108 M108 108 Q120 100 132 108', smirk: 'M68 120 L92 124 M108 124 L132 118' }[ex];
  const mouth = { happy: `<path d="M84 158 Q100 178 116 158Z" fill="${K.mouth}"/>`, talk: `<ellipse class="mo" cx="100" cy="164" rx="11" ry="8" fill="${K.mouth}"/>`,
    think: `<path d="M90 165 Q100 160 110 166" stroke="${K.mouth}" stroke-width="4" fill="none" stroke-linecap="round"/>`, shock: `<ellipse cx="100" cy="166" rx="8" ry="11" fill="${K.mouth}"/>`,
    smirk: `<path d="M86 164 Q104 170 116 158" stroke="${K.mouth}" stroke-width="4.5" fill="none" stroke-linecap="round"/>` }[ex];
  const hat = o.hat === 'straw' ? `<ellipse cx="100" cy="84" rx="94" ry="20" fill="#e2ad3f"/><path d="M58 86 C58 36 142 36 142 86Z" fill="#f6d06b"/><rect x="58" y="70" width="84" height="12" fill="#b5482f"/><ellipse cx="100" cy="84" rx="94" ry="20" fill="url(#gHi)"/>`
    : o.hat === 'cap' ? `<path d="M48 104 C48 52 152 52 152 104Z" fill="${o.capc || '#e05a3a'}"/><path d="M140 98 L190 106 L146 112Z" fill="${o.capc || '#e05a3a'}"/>` : '';
  const arm = (d, hx, hy, cls) => `<g class="${cls}"><path d="${d}" stroke="${sh}" stroke-width="28" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="13" fill="${sk}"/></g>`;
  return svg(w, '0 0 200 330', `${o.long ? `<path d="M44 128 C38 206 58 226 72 236 L128 236 C142 226 162 206 156 128Z" fill="${hr}"/>` : ''}
    <path d="M38 330 C36 250 58 212 100 212 C142 212 164 250 162 330Z" fill="${sh}"/><path d="M38 330 C36 250 58 212 100 212 C142 212 164 250 162 330Z" fill="url(#gHi)"/>
    ${o.apron ? `<path d="M72 216 L82 330 M128 216 L118 330" stroke="#b5482f" stroke-width="9"/>` : ''}
    <rect x="86" y="176" width="28" height="44" rx="10" fill="${K.skinD}"/>
    ${arm(A[0], A[1], A[2], 'armL')}
    <g class="head"><circle cx="47" cy="134" r="10" fill="${K.skinD}"/><circle cx="153" cy="134" r="10" fill="${K.skinD}"/><circle cx="100" cy="128" r="54" fill="${sk}"/>
    <path d="M46 126 C38 60 92 50 104 62 C124 50 168 70 156 126 C150 98 132 90 112 94 C96 98 76 92 62 104 C54 110 50 118 46 126Z" fill="${hr}"/>
    <g class="eyes"><ellipse cx="80" cy="136" rx="6" ry="8" fill="#161226"/><ellipse cx="120" cy="136" rx="6" ry="8" fill="#161226"/><circle cx="82" cy="133" r="2" fill="#fff"/><circle cx="122" cy="133" r="2" fill="#fff"/></g>
    <path class="brows" d="${brow}" stroke="${hr}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="68" cy="154" r="9" fill="#ff7d7d" opacity=".35"/><circle cx="132" cy="154" r="9" fill="#ff7d7d" opacity=".35"/>${mouth}${hat}</g>
    ${arm(A[3], A[4], A[5], 'armR')}`, o.css);
}
const shed = w => svg(w, '0 0 320 260', `<rect x="30" y="100" width="260" height="160" fill="#2c4a3c"/>
  ${[56, 82, 108, 212, 238, 264].map(x => `<path d="M${x} 104 V260" stroke="#203a2e" stroke-width="3"/>`).join('')}
  <rect x="72" y="134" width="176" height="126" fill="#0b1712"/><path d="M72 134 h176 v16 h-176Z" fill="#000" opacity=".35"/>
  <polygon points="6,104 160,10 314,104 300,114 160,30 20,114" fill="#5b8068"/><polygon points="20,114 160,30 300,114" fill="#3e6150"/>
  <rect x="148" y="122" width="24" height="7" rx="3" fill="#ffe08a"/>`);
function ship(w) {
  const cols = ['#ff4a3d', '#ffc83d', '#2fd3b5', '#c6ff1f', '#ee6fb0', '#efe9dc'];
  let ct = ''; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) ct += `<rect x="${34 + c * 52}" y="${126 - r * 21}" width="48" height="18" rx="2" fill="${cols[(r * 2 + c) % 6]}"/><path d="M${44 + c * 52} ${128 - r * 21} v14 M${56 + c * 52} ${128 - r * 21} v14 M${68 + c * 52} ${128 - r * 21} v14" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`;
  return svg(w, '0 0 380 230', `${ct}<rect x="302" y="92" width="52" height="56" rx="4" fill="${K.cream}"/><rect x="310" y="102" width="36" height="10" rx="3" fill="#2a6f7a"/>
    <rect x="318" y="62" width="18" height="30" fill="${K.red}"/><path d="M6 146 L374 146 L346 210 L34 210Z" fill="#164a58"/><path d="M14 166 H364" stroke="${K.cream}" stroke-width="7"/><path d="M6 146 L374 146 L370 156 L10 156Z" fill="url(#gHi)"/>`);
}
const crate = w => svg(w, '0 0 220 130', `<rect x="0" y="18" width="220" height="112" rx="8" fill="url(#gWood)"/><path d="M8 58 H212 M8 94 H212" stroke="${K.woodD}" stroke-width="5"/><path d="M14 22 V126 M206 22 V126" stroke="${K.woodD}" stroke-width="6"/><rect x="0" y="12" width="220" height="14" rx="5" fill="#dca06a"/>`);
const cloud = (w, c = '#1c5e47') => svg(w, '0 0 200 90', `<path d="M30 80 C0 80 0 46 30 46 C30 14 76 6 92 30 C104 8 150 10 152 44 C186 40 196 80 166 80Z" fill="${c}"/>`);
const sprout = w => svg(w, '0 0 80 100', `<path d="M40 100 C36 60 28 30 18 0 C36 30 44 62 44 100Z M42 100 C44 64 52 36 66 8 C56 40 50 70 48 100Z M38 100 C30 74 18 56 2 44 C22 56 34 72 42 100Z M44 100 C54 78 64 66 80 58 C66 70 56 84 50 100Z" fill="url(#gLeaf)"/>`);
const fly = w => svg(w, '0 0 30 24', `<ellipse cx="9" cy="7" rx="7" ry="5" fill="#dff" opacity=".7"/><ellipse cx="20" cy="6" rx="7" ry="5" fill="#dff" opacity=".7"/><ellipse cx="15" cy="15" rx="7" ry="6" fill="#141a10"/><circle cx="21" cy="13" r="3" fill="#7a1d1d"/>`);
const coin = s => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#ffc83d 45%,#b07a10);box-shadow:inset 0 -${s * .08}px 0 rgba(0,0,0,.25);display:grid;place-items:center;font:800 ${s * .55}px/1 var(--font-bn-display);color:#7a4f00">৳</div>`;
/** layered hills band from y to the bottom of the frame */
function hills(parent, y, cols = [K.hill1, K.hill2, K.hill3], css = {}) {
  return E(parent, 'a', svg(1080, '0 0 1080 900', `<path d="M0 120 C180 40 320 90 470 60 C640 26 820 110 1080 50 V900 H0Z" fill="${cols[0]}"/>
    <path d="M0 230 C220 150 420 230 600 180 C780 132 920 210 1080 170 V900 H0Z" fill="${cols[1]}"/>
    <path d="M0 340 C260 290 520 350 760 310 C900 290 1000 300 1080 296 V900 H0Z" fill="${cols[2]}"/>`), Object.assign({ left: 0, top: y, width: 1080 }, css));
}
/** mound of onions: rows from the bottom, returns the onion elements (bottom row first) */
function pile(parent, cx, baseY, rows, size, seed = 0, o = {}) {
  const out = []; for (let r = 0; r < rows; r++) { const n = rows - r + (o.wide || 2);
    for (let i = 0; i < n; i++) { const k = seed + r * 17 + i, x = cx + (i - (n - 1) / 2) * size * 0.74 + (rnd(k) - 0.5) * size * 0.2, y = baseY - size * 1.05 - r * size * 0.72 + (rnd(k + 5) - 0.5) * 8;
      out.push(E(parent, 'a', onion(size, o), { left: x - size / 2, top: y, transform: `rotate(${(rnd(k + 9) - 0.5) * 40}deg)` })); } }
  return out;
}
