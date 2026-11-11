/* BAUBC club mark — 6-piece pinwheel, vector-traced from the official logo (2000×2000 artboard, scaled 0.966).
 * BAUBC_MARK.pieces are polygon point lists in the shared viewBox; use baubcMarkSVG() or animate pieces separately. */
const BAUBC_MARK = {
  viewBox: '270 204 1528 1524', w: 1528, h: 1524,
  pieces: [
    '512,420 707,224 1061,580 1065,667 760,667',                       // top blade
    '1144,654 1332,466 1537,670 1350,857',                             // diamond
    '290,718 1066,718 799,998 290,998',                                // left bar
    '1066,718 1073,950 1272,940 1004,1204 644,1562 440,1360 799,998',  // long diagonal
    '1004,1204 1272,940 1274,1708 1005,1708',                          // vertical stem
    '1327,944 1417,934 1778,1290 1583,1485 1327,1230',                 // right blade
  ],
};
function baubcMarkSVG(size, color = '#c6ff1f', css = '') {
  return `<svg width="${size}" height="${size * BAUBC_MARK.h / BAUBC_MARK.w}" viewBox="${BAUBC_MARK.viewBox}" style="display:block;overflow:visible;${css}">` +
    BAUBC_MARK.pieces.map(p => `<polygon points="${p}" fill="${color}" stroke="${color}" stroke-width="6" stroke-linejoin="round"/>`).join('') + '</svg>';
}
