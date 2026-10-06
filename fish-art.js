/* fish-art.js: simplified side-view fish drawings, built as inline SVG from a short description.
   These are illustrations, not photos: shapes and colour patterns are approximate and real fish vary.
   No network, no images. Used by the Species guide in index.html. */
(function (root) {
  'use strict';
  var W = 240, H = 120, CY = 60, X0 = 12, X1 = 192, L = X1 - X0;
  var ST = [0, .04, .12, .26, .42, .58, .74, .88, 1];
  var uidN = 0;
  var f = function (n) { return Math.round(n * 10) / 10; };

  function rng(seed) {
    var s = 7;
    for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function shade(hex, amt) { // amt -1..1 (dark..light)
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return hex;
    var n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  function cr(pts) { // Catmull-Rom through pts, as cubic segments (start point already placed)
    var d = '';
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d;
  }

  /* Body templates. U / D = half-depth above / below the centre line at 9 stations from snout to tail base.
     fins: dorsal / anal etc. as [from, to, kind, height, side]. kinds: sp (spiny), soft, sail, fringe, lets (finlets). */
  var T = {
    bass: { U: [1.5, 7, 14, 19.5, 21, 19, 14, 8.5, 5.5], D: [1.5, 6, 12, 17, 19, 17, 12, 8, 5.5], mouth: [.22, 3, 5], eye: [.13, -.16, 3.4], gill: .24,
      fins: [[.27, .50, 'sp', 12, 'u'], [.50, .74, 'soft', 11, 'u'], [.62, .76, 'soft', 9, 'd']], pec: .22, pel: .30, tail: ['notch', 24, 24, .12] },
    sunfish: { U: [1.5, 9, 20, 29, 31, 27, 19, 10, 5.5], D: [1.5, 8, 18, 27, 29, 25, 17, 9, 5.5], mouth: [.09, 3, 4.5], eye: [.13, -.14, 3.6], gill: .26,
      fins: [[.28, .50, 'sp', 12, 'u'], [.50, .72, 'soft', 12, 'u'], [.50, .72, 'soft', 12, 'd']], pec: .26, pel: .32, tail: ['notch', 20, 22, .15], pecLong: 1 },
    crappie: { U: [1.5, 8, 18, 27, 30, 27, 19, 10, 5.5], D: [1.5, 8, 18, 27, 29, 25, 17, 9, 5.5], mouth: [.12, 3, 5], eye: [.12, -.14, 3.6], gill: .22,
      fins: [[.46, .60, 'sp', 9, 'u'], [.60, .76, 'soft', 13, 'u'], [.44, .64, 'soft', 13, 'd']], pec: .22, pel: .30, tail: ['notch', 22, 22, .18] },
    perch: { U: [1.5, 7, 15, 20, 21, 18, 13, 8, 5.5], D: [1.5, 6, 13, 18, 18, 15, 11, 7, 5], mouth: [.14, 3, 4.5], eye: [.12, -.14, 3.6], gill: .22,
      fins: [[.24, .44, 'sp', 13, 'u'], [.52, .72, 'soft', 11, 'u'], [.64, .76, 'soft', 8, 'd']], pec: .22, pel: .30, tail: ['notch', 21, 20, .12] },
    walleye: { U: [1.5, 6, 12, 16.5, 17.5, 15.5, 11.5, 7.5, 5], D: [1.5, 5.5, 11, 15, 15.5, 13.5, 10, 6.5, 4.8], mouth: [.19, 3, 5], eye: [.12, -.12, 4.6], gill: .22,
      fins: [[.28, .47, 'sp', 12, 'u'], [.54, .72, 'soft', 10, 'u'], [.62, .76, 'soft', 8, 'd']], pec: .22, pel: .32, tail: ['notch', 22, 22, .14] },
    pike: { U: [1.5, 5, 8, 10.5, 12, 12.5, 11.5, 9, 6], D: [1.5, 4.5, 7.5, 10, 11, 11.5, 10.5, 8.5, 5.8], mouth: [.24, 3, 5], eye: [.11, -.10, 3.2], gill: .18,
      fins: [[.68, .84, 'soft', 10, 'u'], [.66, .82, 'soft', 8, 'd']], pec: .22, pel: .52, tail: ['notch', 24, 24, .12], snout: 1 },
    catfish: { U: [1.5, 7, 12, 14.5, 15, 14, 11.5, 8.5, 5.5], D: [1.5, 5.5, 9, 11, 12, 11.5, 10, 7.5, 5], mouth: [.16, 2.5, 4], eye: [.12, -.09, 2.4], gill: .18,
      fins: [[.27, .37, 'sp', 11, 'u'], [.62, .74, 'adip', 5, 'u'], [.46, .86, 'soft', 7, 'd']], pec: .20, pel: .45, tail: ['notch', 24, 22, .16], barbels: 6 },
    carp: { U: [1.5, 8, 17, 24, 25, 21, 15, 9, 6], D: [1.5, 7, 14, 20, 22, 19, 14, 8.5, 5.8], mouth: [.08, 3, 4.5], eye: [.12, -.14, 2.8], gill: .22,
      fins: [[.30, .70, 'soft', 10, 'u'], [.64, .76, 'soft', 8, 'd']], pec: .22, pel: .40, tail: ['fork', 24, 23, .30], barbels: 2 },
    trout: { U: [1.5, 6.5, 12, 15.5, 16.5, 14.5, 11, 7.5, 5], D: [1.5, 6, 11.5, 14.5, 15.5, 14, 10.5, 7, 5], mouth: [.17, 3, 5], eye: [.12, -.10, 3.2], gill: .20,
      fins: [[.40, .52, 'soft', 12, 'u'], [.78, .84, 'adip', 5, 'u'], [.64, .76, 'soft', 8, 'd']], pec: .22, pel: .46, tail: ['notch', 22, 20, .12] },
    drum: { U: [1.5, 7, 15, 22, 24, 21, 14, 8, 5], D: [1.5, 6, 12, 17, 17, 14.5, 10, 6.5, 4.5], mouth: [.11, 3, 3.5], eye: [.12, -.13, 3.4], gill: .22,
      fins: [[.28, .42, 'sp', 11, 'u'], [.42, .78, 'soft', 8, 'u'], [.66, .76, 'soft', 6, 'd']], pec: .22, pel: .30, tail: ['round', 24, 18, 0] },
    bowfin: { U: [1.5, 6.5, 12, 15, 16, 15, 12.5, 9, 6.5], D: [1.5, 6, 11, 13.5, 14, 13, 10.5, 8, 6], mouth: [.18, 3, 5], eye: [.10, -.11, 2.6], gill: .20,
      fins: [[.26, .84, 'soft', 9, 'u'], [.70, .82, 'soft', 5, 'd']], pec: .22, pel: .50, tail: ['round', 24, 20, 0] },
    gar: { U: [1, 3, 5, 8, 10, 11, 10, 8, 5], D: [1, 3, 5, 7, 9, 10, 9, 7.5, 4.5], mouth: [.30, 2, 3], eye: [.20, -.04, 2.6], gill: .26,
      fins: [[.70, .84, 'soft', 8, 'u'], [.68, .80, 'soft', 6, 'd']], pec: .30, pel: .50, tail: ['round', 24, 14, 0], snout: 2 },
    sturgeon: { U: [1, 5, 8, 11, 13, 13.5, 11.5, 8.5, 5.5], D: [1, 4, 6, 8, 9, 9.5, 8, 6, 4.5], mouth: [.17, 5, 8], eye: [.14, -.06, 2.2], gill: .24,
      fins: [[.74, .86, 'soft', 9, 'u'], [.70, .80, 'soft', 6, 'd']], pec: .24, pel: .50, tail: ['shark', 28, 22, .2], scutes: 1, barbels: 4 },
    snapper: { U: [1.5, 7, 15, 22, 24, 21, 15, 9, 6], D: [1.5, 7, 14, 20, 21, 18, 13, 8, 5.5], mouth: [.16, 3, 5], eye: [.12, -.13, 3.6], gill: .24,
      fins: [[.27, .50, 'sp', 11, 'u'], [.50, .72, 'soft', 12, 'u'], [.60, .74, 'soft', 9, 'd']], pec: .24, pel: .34, tail: ['notch', 22, 22, .12] },
    seabass: { U: [1.5, 7, 14, 19, 20, 17, 12, 8, 5.5], D: [1.5, 6.5, 13, 17.5, 18, 15.5, 11, 7.5, 5.5], mouth: [.18, 3, 5], eye: [.12, -.13, 3.2], gill: .24,
      fins: [[.28, .76, 'sp', 11, 'u'], [.58, .74, 'soft', 9, 'd']], pec: .24, pel: .32, tail: ['round', 24, 20, 0] },
    cod: { U: [1.5, 7, 13, 17, 17.5, 15, 11, 8, 6], D: [1.5, 6, 11, 14.5, 15, 12.5, 9.5, 7, 5.5], mouth: [.17, 3, 5], eye: [.11, -.13, 4], gill: .20,
      fins: [[.25, .40, 'soft', 10, 'u'], [.42, .60, 'soft', 10, 'u'], [.62, .78, 'soft', 8, 'u'], [.46, .62, 'soft', 9, 'd'], [.64, .78, 'soft', 8, 'd']], pec: .22, pel: .28, tail: ['square', 22, 20, 0], barbels: 1 },
    deep: { U: [1.5, 9, 20, 28, 30, 25, 17, 9, 5.5], D: [1.5, 9, 19, 26, 27, 22, 15, 8.5, 5.5], mouth: [.12, 3.5, 5], eye: [.13, -.14, 3.2], gill: .24,
      fins: [[.24, .50, 'sp', 13, 'u'], [.50, .72, 'soft', 10, 'u'], [.56, .72, 'soft', 10, 'd']], pec: .24, pel: .34, tail: ['notch', 22, 24, .18] },
    jack: { U: [1.5, 8, 16, 23, 24, 20, 14, 8, 5], D: [1.5, 8, 16, 22, 23, 19, 13, 7.5, 4.8], mouth: [.14, 3.5, 5], eye: [.11, -.12, 3.2], gill: .24,
      fins: [[.30, .38, 'sp', 8, 'u'], [.42, .72, 'soft', 9, 'u'], [.52, .72, 'soft', 9, 'd']], pec: .24, pel: .34, tail: ['fork', 26, 28, .38] },
    mack: { U: [1.5, 5, 10, 14, 15.5, 14, 10, 6, 3.6], D: [1.5, 5, 9.5, 13, 14.5, 13, 9.5, 6, 3.6], mouth: [.17, 3, 4.5], eye: [.11, -.09, 3], gill: .22,
      fins: [[.34, .48, 'sp', 10, 'u'], [.56, .64, 'soft', 6, 'u'], [.66, .88, 'lets', 4, 'u'], [.60, .66, 'soft', 6, 'd'], [.68, .88, 'lets', 4, 'd']], pec: .24, pel: .34, tail: ['lunate', 26, 26, .55] },
    tuna: { U: [1.5, 7, 13, 18, 20, 17, 11, 6, 3.4], D: [1.5, 7, 12.5, 17, 18.5, 16, 10.5, 6, 3.4], mouth: [.17, 3, 4.5], eye: [.10, -.08, 3.2], gill: .20,
      fins: [[.32, .44, 'sp', 11, 'u'], [.50, .60, 'sail', 14, 'u'], [.62, .88, 'lets', 4.5, 'u'], [.52, .62, 'sail', 12, 'd'], [.66, .88, 'lets', 4.5, 'd']], pec: .22, pel: .30, tail: ['lunate', 28, 30, .55] },
    mahi: { U: [3, 12, 17, 18.5, 17, 14.5, 11, 7.5, 5], D: [1.5, 6.5, 10, 12, 12.5, 11, 8.5, 6.5, 4.5], mouth: [.14, 3, 4], eye: [.11, -.08, 3.2], gill: .20,
      fins: [[.12, .86, 'sail', 12, 'u'], [.58, .86, 'soft', 8, 'd']], pec: .22, pel: .32, tail: ['fork', 24, 26, .40] },
    tarpon: { U: [1.5, 8, 15, 20, 21, 19, 14, 9, 6], D: [1.5, 7, 13, 17, 18, 16.5, 12, 8, 5.8], mouth: [.19, 3, 7], eye: [.11, -.10, 3.8], gill: .22,
      fins: [[.56, .66, 'tail', 20, 'u'], [.66, .78, 'soft', 8, 'd']], pec: .24, pel: .48, tail: ['fork', 26, 28, .35], bigscales: 1, upmouth: 1 },
    snook: { U: [1.5, 6, 11, 14.5, 15.5, 14, 11, 8, 5.5], D: [1.5, 6, 10.5, 13.5, 14, 12.5, 10, 7.5, 5.2], mouth: [.20, 3, 6], eye: [.11, -.10, 3.2], gill: .22,
      fins: [[.28, .46, 'sp', 11, 'u'], [.54, .72, 'soft', 10, 'u'], [.60, .74, 'soft', 8, 'd']], pec: .24, pel: .36, tail: ['notch', 22, 22, .14], upmouth: 1 },
    bluefish: { U: [1.5, 6, 12, 16, 17, 15, 11, 7, 4.5], D: [1.5, 6, 11.5, 15, 16, 14, 10.5, 6.5, 4.4], mouth: [.19, 3, 6], eye: [.11, -.11, 3.4], gill: .22,
      fins: [[.30, .44, 'sp', 8, 'u'], [.50, .72, 'soft', 8, 'u'], [.52, .72, 'soft', 8, 'd']], pec: .22, pel: .34, tail: ['fork', 24, 26, .30] },
    shad: { U: [1.5, 7, 15, 21, 22, 19, 13, 7.5, 4.8], D: [1.5, 7, 14, 20, 21, 18, 12.5, 7.5, 4.8], mouth: [.11, 3, 5.5], eye: [.11, -.12, 3.4], gill: .22,
      fins: [[.42, .56, 'soft', 12, 'u'], [.64, .84, 'soft', 6, 'd']], pec: .22, pel: .46, tail: ['fork', 24, 26, .36], upmouth: 1 },
    grayling: { U: [1.5, 6, 11, 14.5, 15.5, 14, 11, 7.5, 5], D: [1.5, 6, 11, 14, 14.5, 13, 10, 7, 4.8], mouth: [.11, 3, 3.5], eye: [.11, -.10, 3.2], gill: .20,
      fins: [[.28, .62, 'sail', 24, 'u'], [.78, .84, 'adip', 5, 'u'], [.62, .76, 'soft', 7, 'd']], pec: .22, pel: .44, tail: ['fork', 24, 24, .30] },
    ling: { U: [1.5, 8, 13, 16, 16.5, 14.5, 11, 8, 5.5], D: [1.5, 7, 12, 14.5, 14.5, 12.5, 9.5, 7, 5], mouth: [.27, 3, 7], eye: [.12, -.11, 3.4], gill: .24,
      fins: [[.20, .86, 'soft', 10, 'u'], [.46, .84, 'soft', 7, 'd']], pec: .26, pel: .34, tail: ['square', 18, 17, 0], bigpec: 1 },
    cobia: { U: [1.5, 6, 10, 12, 13, 12, 9.5, 6.5, 4.5], D: [1.5, 5, 9, 11, 11.5, 10.5, 8.5, 6, 4.2], mouth: [.18, 2.5, 4.5], eye: [.11, -.08, 2.8], gill: .22,
      fins: [[.14, .30, 'lets', 5, 'u'], [.36, .78, 'soft', 8, 'u'], [.54, .78, 'soft', 7, 'd']], pec: .22, pel: .34, tail: ['lunate', 24, 24, .35], flathead: 1 },
    flat: { U: [1.5, 12, 24, 30, 31, 28, 21, 12, 5.5], D: [1.5, 12, 24, 30, 31, 28, 21, 12, 5.5], mouth: [.12, 4, 4], eye: [.15, -.34, 3], gill: .22,
      fins: [[.12, .90, 'fringe', 8, 'u'], [.28, .90, 'fringe', 8, 'd']], pec: .22, pel: 2, tail: ['round', 16, 13, 0], twoeyes: 1 }
  };

  function interp(arr, t) { // t in 0..1 across stations
    for (var i = 0; i < ST.length - 1; i++) if (t <= ST[i + 1]) { var k = (t - ST[i]) / (ST[i + 1] - ST[i]); return arr[i] + (arr[i + 1] - arr[i]) * k; }
    return arr[arr.length - 1];
  }

  function draw(spec, opt) {
    opt = opt || {};
    var tp = T[spec.t] || T.bass, id = 'fa' + (++uidN), rnd = rng(spec.s || spec.t || 'x');
    var dep = spec.dep || 1;
    var U = tp.U.map(function (v) { return v * dep; }), D = tp.D.map(function (v) { return v * dep; });
    var back = spec.back || '#5b6b3a', side = spec.side || shade(back, .35), belly = spec.belly || '#efecd8', fin = spec.fin || shade(back, .15);
    var ink = shade(back, -.55), x = function (t) { return X0 + L * t; };
    var yU = function (t) { return CY - interp(U, t); }, yD = function (t) { return CY + interp(D, t); };
    var out = [], defs = [], marks = [], fins = [];

    /* body outline */
    var up = ST.map(function (t, i) { return [x(t), CY - U[i]]; }), dn = ST.map(function (t, i) { return [x(t), CY + D[i]]; });
    var body = 'M' + f(up[0][0]) + ' ' + f(CY) + cr(up) + 'L' + f(dn[8][0]) + ' ' + f(dn[8][1]) + cr(dn.slice().reverse()) + 'Z';
    if (tp.snout === 1) { body = body; }

    /* tail */
    var tl = spec.tt ? [spec.tt, tp.tail[1], tp.tail[2], spec.tn == null ? tp.tail[3] : spec.tn] : tp.tail, tlen = tl[1] * (spec.tail || 1), span = tl[2] * (spec.tail || 1), pU = U[8], pD = D[8], tx = X1 - 2, tpath = '';
    if (tl[0] === 'fork' || tl[0] === 'lunate') {
      var nx = tx + tlen * (1 - tl[3]);
      var sw = tl[0] === 'lunate' ? tlen * .25 : 0;
      tpath = 'M' + tx + ' ' + f(CY - pU) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY - span * .5) + ' ' + f(tx + tlen + sw) + ' ' + f(CY - span) + 'Q' + f(nx) + ' ' + f(CY - span * .25) + ' ' + f(nx) + ' ' + CY + 'Q' + f(nx) + ' ' + f(CY + span * .25) + ' ' + f(tx + tlen + sw) + ' ' + f(CY + span) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY + span * .5) + ' ' + tx + ' ' + f(CY + pD) + 'Z';
    } else if (tl[0] === 'notch') {
      var nx2 = tx + tlen * (1 - tl[3] - .1);
      tpath = 'M' + tx + ' ' + f(CY - pU) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY - span * .55) + ' ' + f(tx + tlen) + ' ' + f(CY - span * .8) + 'Q' + f(nx2) + ' ' + f(CY - 3) + ' ' + f(nx2) + ' ' + CY + 'Q' + f(nx2) + ' ' + f(CY + 3) + ' ' + f(tx + tlen) + ' ' + f(CY + span * .8) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY + span * .55) + ' ' + tx + ' ' + f(CY + pD) + 'Z';
    } else if (tl[0] === 'square') {
      tpath = 'M' + tx + ' ' + f(CY - pU) + 'Q' + f(tx + tlen * .6) + ' ' + f(CY - span * .6) + ' ' + f(tx + tlen) + ' ' + f(CY - span * .7) + 'Q' + f(tx + tlen * .9) + ' ' + CY + ' ' + f(tx + tlen) + ' ' + f(CY + span * .7) + 'Q' + f(tx + tlen * .6) + ' ' + f(CY + span * .6) + ' ' + tx + ' ' + f(CY + pD) + 'Z';
    } else if (tl[0] === 'shark') {
      tpath = 'M' + tx + ' ' + f(CY - pU) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY - span * 1.1) + ' ' + f(tx + tlen * 1.1) + ' ' + f(CY - span * 1.5) + 'Q' + f(tx + tlen * .8) + ' ' + f(CY - span * .2) + ' ' + f(tx + tlen * .7) + ' ' + f(CY + 2) + 'Q' + f(tx + tlen * .95) + ' ' + f(CY + span * .5) + ' ' + f(tx + tlen * .9) + ' ' + f(CY + span * .6) + 'Q' + f(tx + tlen * .5) + ' ' + f(CY + span * .4) + ' ' + tx + ' ' + f(CY + pD) + 'Z';
    } else { // round
      tpath = 'M' + tx + ' ' + f(CY - pU) + 'C' + f(tx + tlen * .6) + ' ' + f(CY - span * .9) + ' ' + f(tx + tlen * 1.1) + ' ' + f(CY - span * .5) + ' ' + f(tx + tlen) + ' ' + CY + 'C' + f(tx + tlen * 1.1) + ' ' + f(CY + span * .5) + ' ' + f(tx + tlen * .6) + ' ' + f(CY + span * .9) + ' ' + tx + ' ' + f(CY + pD) + 'Z';
    }
    var finFill = 'fill="' + fin + '" stroke="' + shade(fin, -.4) + '" stroke-width=".8" stroke-linejoin="round"';
    var rayCol = shade(fin, -.35);
    fins.push('<path d="' + tpath + '" ' + finFill + '/>');
    // tail rays
    var rays = '';
    for (var r = -3; r <= 3; r++) rays += 'M' + (tx + 2) + ' ' + CY + 'L' + f(tx + tlen * .92) + ' ' + f(CY + r * span * .24 * (tl[0] === 'round' ? .7 : 1)) + ' ';
    fins.push('<path d="' + rays + '" stroke="' + rayCol + '" stroke-width=".6" opacity=".45" fill="none"/>');
    if (spec.tailMark) {
      fins.push('<path d="' + tpath + '" fill="' + spec.tailMark + '" opacity=".28"/>');
    }

    /* dorsal / anal / extra fins */
    tp.fins.forEach(function (fn) {
      var a = fn[0], b = fn[1], k = fn[2], h = fn[3] * (spec.finH || 1), side_ = fn[4], n = 16, pts = [], top = side_ === 'u';
      var edge = function (t) { return top ? yU(t) : yD(t); };
      if (k === 'adip') {
        var m = (a + b) / 2;
        fins.push('<path d="M' + f(x(a)) + ' ' + f(edge(a) + 2) + 'Q' + f(x(m)) + ' ' + f(edge(m) - h * 1.5) + ' ' + f(x(b)) + ' ' + f(edge(b) + 2) + 'Z" ' + finFill + (spec.adip ? '' : '') + '/>');
        return;
      }
      if (k === 'tail') { // tarpon: long filament
        fins.push('<path d="M' + f(x(a)) + ' ' + f(edge(a) + 2) + 'L' + f(x(a) + 6) + ' ' + f(edge(a) - h * .45) + 'Q' + f(x(b)) + ' ' + f(edge(b) - h * .15) + ' ' + f(x(b)) + ' ' + f(edge(b) + 2) + 'Z" ' + finFill + '/>');
        fins.push('<path d="M' + f(x(a) + 6) + ' ' + f(edge(a) - h * .45) + 'Q' + f(x(a) + 16) + ' ' + f(edge(a) - h * 1.2) + ' ' + f(x(b) + 8) + ' ' + f(edge(a) - h * 1.45) + '" stroke="' + shade(fin, -.3) + '" stroke-width="1.2" fill="none"/>');
        return;
      }
      if (k === 'lets') {
        var cnt = 6, g = '';
        for (var i = 0; i < cnt; i++) {
          var t0 = a + (b - a) * i / cnt, t1 = a + (b - a) * (i + .75) / cnt, e0 = edge(t0), e1 = edge(t1), dy = top ? -h : h;
          g += 'M' + f(x(t0)) + ' ' + f(e0) + 'L' + f(x(t0) + 3) + ' ' + f(e0 + dy) + 'L' + f(x(t1)) + ' ' + f(e1) + 'Z';
        }
        fins.push('<path d="' + g + '" fill="' + (spec.lets || '#e6c94a') + '" stroke="' + shade(fin, -.4) + '" stroke-width=".5"/>');
        return;
      }
      for (var j = 0; j <= n; j++) {
        var t = j / n, tt = a + (b - a) * t, hh;
        if (k === 'sp') hh = t < .1 ? .55 + t * 4.5 : 1 - .6 * ((t - .1) / .9);
        else if (k === 'sail') hh = t < .15 ? .5 + t * 3.3 : (t > .8 ? 1 - (t - .8) * 3.5 : 1);
        else if (k === 'fringe') hh = .55 + .45 * Math.sin(t * Math.PI);
        else hh = t < .2 ? .35 + t * 3.2 : (1 - .85 * Math.pow((t - .2) / .8, 1.6));
        if (k === 'sp' && j % 2) hh *= .93;
        pts.push([x(tt), edge(tt) + (top ? -hh * h : hh * h)]);
      }
      var d = 'M' + f(x(a)) + ' ' + f(edge(a) + (top ? 3 : -3));
      pts.forEach(function (p) { d += 'L' + f(p[0]) + ' ' + f(p[1]); });
      d += 'L' + f(x(b)) + ' ' + f(edge(b) + (top ? 3 : -3)) + 'Z';
      fins.push('<path d="' + d + '" ' + finFill + '/>');
      // rays / spines
      var rs = '', nr = k === 'sp' ? 8 : 10;
      for (var q = 1; q < nr; q++) {
        var tq = a + (b - a) * q / nr, pidx = Math.min(n, Math.round(q / nr * n));
        rs += 'M' + f(x(tq)) + ' ' + f(edge(tq) + (top ? 1 : -1)) + 'L' + f(pts[pidx][0]) + ' ' + f(pts[pidx][1] + (top ? 1.5 : -1.5));
      }
      fins.push('<path d="' + rs + '" stroke="' + rayCol + '" stroke-width=".6" opacity=".5" fill="none"/>');
    });

    /* pectoral + pelvic fins (near side) */
    var px = x(tp.pec + .05), py = CY + (tp.flathead ? 8 : 6);
    var plen = tp.pecLong ? 30 : (tp.bigpec ? 28 : 18), pw = tp.bigpec ? 11 : 6.5;
    fins.push('<path d="M' + f(px) + ' ' + f(py) + 'Q' + f(px + plen * .5) + ' ' + f(py - pw) + ' ' + f(px + plen) + ' ' + f(py + pw * 1.1) + 'Q' + f(px + plen * .4) + ' ' + f(py + pw * .5) + ' ' + f(px) + ' ' + f(py) + 'Z" ' + finFill + ' opacity=".95"/>');
    if (tp.pel < 1) {
      var vx = x(tp.pel), vy = yD(tp.pel) - 1;
      fins.push('<path d="M' + f(vx) + ' ' + f(vy) + 'L' + f(vx + 12) + ' ' + f(vy + 11) + 'L' + f(vx + 3) + ' ' + f(vy + 12) + 'Z" ' + finFill + '/>');
    }

    /* gradients, clip */
    defs.push('<linearGradient id="g' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + back + '"/><stop offset=".42" stop-color="' + side + '"/><stop offset=".66" stop-color="' + side + '"/><stop offset=".86" stop-color="' + belly + '"/><stop offset="1" stop-color="' + belly + '"/></linearGradient>');
    defs.push('<clipPath id="c' + id + '"><path d="' + body + '"/></clipPath>');
    defs.push('<pattern id="s' + id + '" width="7" height="6" patternUnits="userSpaceOnUse"><path d="M0 3 Q1.75 0 3.5 3 M3.5 6 Q5.25 3 7 6" stroke="#000" stroke-width=".5" fill="none" opacity=".16"/></pattern>');
    defs.push('<linearGradient id="h' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".3" stop-color="#fff" stop-opacity=".30"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>');

    /* markings */
    var Y = function (t, fr) { return fr < 0 ? CY + fr * interp(U, t) : CY + fr * interp(D, t); }; // fr -1 (back) .. +1 (belly)
    (spec.m || []).forEach(function (m) {
      var c = m.c || '#222', o = m.o == null ? .6 : m.o, k = m.k, xr = m.x || [.12, .94], g = '';
      if (k === 'bars') {
        var ya = (m.y || [-.95, .55]);
        (m.at || []).forEach(function (t) {
          var w = (m.w || 5) * (m.taper ? (1 - t * .35) : 1);
          g += '<path d="M' + f(x(t) - w / 2) + ' ' + f(Y(t, ya[0])) + 'Q' + f(x(t) + 2) + ' ' + f(CY) + ' ' + f(x(t) - w / 2) + ' ' + f(Y(t, ya[1])) + 'L' + f(x(t) + w / 2) + ' ' + f(Y(t, ya[1])) + 'Q' + f(x(t) + 4) + ' ' + f(CY) + ' ' + f(x(t) + w / 2) + ' ' + f(Y(t, ya[0])) + 'Z"/>';
        });
        marks.push('<g fill="' + c + '" opacity="' + o + '">' + g + '</g>');
      } else if (k === 'stripe') {
        var d2 = '';
        (m.ys || []).forEach(function (fr) {
          d2 += 'M';
          for (var i = 0; i <= 14; i++) { var t = xr[0] + (xr[1] - xr[0]) * i / 14; d2 += (i ? 'L' : '') + f(x(t)) + ' ' + f(Y(t, fr)); }
        });
        marks.push('<path d="' + d2 + '" stroke="' + c + '" stroke-width="' + (m.w || 1.6) + '" fill="none" opacity="' + o + '"' + (m.dash ? ' stroke-dasharray="' + m.dash + '"' : '') + ' stroke-linecap="round"/>');
      } else if (k === 'spots') {
        var yr = m.y || [-.9, .2], rr = m.r || [1.2, 2.2];
        for (var i = 0; i < (m.n || 30); i++) {
          var t = xr[0] + rnd() * (xr[1] - xr[0]), fr = yr[0] + rnd() * (yr[1] - yr[0]), rad = rr[0] + rnd() * (rr[1] - rr[0]);
          if (m.halo) g += '<circle cx="' + f(x(t)) + '" cy="' + f(Y(t, fr)) + '" r="' + f(rad + 1.3) + '" fill="' + m.halo + '" opacity="' + (m.ho == null ? .85 : m.ho) + '"/>';
          g += '<circle cx="' + f(x(t)) + '" cy="' + f(Y(t, fr)) + '" r="' + f(rad) + '" fill="' + c + '"/>';
        }
        marks.push('<g opacity="' + o + '">' + g + '</g>');
        if (m.tail) {
          var tg = '';
          for (var j = 0; j < m.tail; j++) tg += '<circle cx="' + f(tx + 6 + rnd() * tlen * .7) + '" cy="' + f(CY + (rnd() - .5) * span * 1.1) + '" r="' + f(rr[0] + rnd() * (rr[1] - rr[0])) + '"/>';
          fins.push('<g fill="' + c + '" opacity="' + o + '">' + tg + '</g>');
        }
      } else if (k === 'blotch') {
        var ang = m.y == null ? 0 : m.y, th = m.th || .22, pts2 = [];
        for (var i = 0; i <= 10; i++) { var t = xr[0] + (xr[1] - xr[0]) * i / 10; pts2.push([x(t), Y(t, ang) + (rnd() - .5) * (m.jag ? 6 : 1.5)]); }
        var d3 = 'M' + pts2.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join('L');
        marks.push('<path d="' + d3 + '" stroke="' + c + '" stroke-width="' + f(th * 40) + '" fill="none" opacity="' + o + '" stroke-linejoin="round" stroke-linecap="round"' + (m.dash ? ' stroke-dasharray="' + m.dash + '"' : '') + '/>');
      } else if (k === 'band') {
        var yb = m.y || [-.2, .15], top2 = '', bot2 = '';
        for (var i = 0; i <= 12; i++) { var t = xr[0] + (xr[1] - xr[0]) * i / 12; top2 += (i ? 'L' : 'M') + f(x(t)) + ' ' + f(Y(t, yb[0])); bot2 = 'L' + f(x(t)) + ' ' + f(Y(t, yb[1])) + bot2; }
        marks.push('<path d="' + top2 + bot2 + 'Z" fill="' + c + '" opacity="' + o + '"/>');
      } else if (k === 'worms') {
        var yw = m.y || [-.85, -.2], dw = '';
        for (var i = 0; i < (m.n || 14); i++) {
          var t = xr[0] + rnd() * (xr[1] - xr[0]), fr = yw[0] + rnd() * (yw[1] - yw[0]), cx = x(t), cy = Y(t, fr), len = 7 + rnd() * 7, a = (rnd() - .5) * 1.4;
          dw += 'M' + f(cx) + ' ' + f(cy) + 'q' + f(len * .25 * Math.cos(a) - 2) + ' ' + f(-3) + ' ' + f(len * .5) + ' ' + f(len * .1 * Math.sin(a)) + 't' + f(len * .5) + ' 0 ';
        }
        marks.push('<path d="' + dw + '" stroke="' + c + '" stroke-width="1.6" fill="none" opacity="' + o + '" stroke-linecap="round"/>');
      } else if (k === 'dot') {
        var cx2 = x(m.x), cy2 = Y(m.x, m.y || 0), rd = m.r || 3;
        if (m.halo) g += '<circle cx="' + f(cx2) + '" cy="' + f(cy2) + '" r="' + f(rd + 1.8) + '" fill="' + m.halo + '"/>';
        g += '<ellipse cx="' + f(cx2) + '" cy="' + f(cy2) + '" rx="' + f(rd * (m.ex || 1)) + '" ry="' + f(rd) + '" fill="' + c + '"/>';
        marks.push('<g opacity="' + o + '">' + g + '</g>');
      } else if (k === 'lat') {
        var dl = '';
        for (var i = 0; i <= 14; i++) { var t = xr[0] + (xr[1] - xr[0]) * i / 14; dl += (i ? 'L' : 'M') + f(x(t)) + ' ' + f(Y(t, m.y == null ? -.25 : m.y) + (m.dip ? Math.sin(t * Math.PI) * m.dip : 0)); }
        marks.push('<path d="' + dl + '" stroke="' + c + '" stroke-width="' + (m.w || 1) + '" fill="none" opacity="' + o + '"' + (m.dash ? ' stroke-dasharray="' + m.dash + '"' : '') + '/>');
      } else if (k === 'eyebars') {
        var ex = x(tp.eye[0]), ey = CY + tp.eye[1] * 2.4 * interp(U, tp.eye[0]);
        marks.push('<path d="M' + f(ex) + ' ' + f(ey) + 'L' + f(ex + 24) + ' ' + f(ey - 11) + 'M' + f(ex) + ' ' + f(ey) + 'L' + f(ex + 22) + ' ' + f(ey + 10) + 'M' + f(ex - 2) + ' ' + f(ey + 2) + 'L' + f(ex + 8) + ' ' + f(ey + 18) + '" stroke="' + c + '" stroke-width="1.8" opacity="' + o + '" fill="none" stroke-linecap="round"/>');
      } else if (k === 'saddles') {
        (m.at || []).forEach(function (t) { g += '<path d="M' + f(x(t) - 6) + ' ' + f(yU(t) - 1) + 'Q' + f(x(t)) + ' ' + f(Y(t, -.2)) + ' ' + f(x(t) + 6) + ' ' + f(yU(t) - 1) + 'Z"/>'; });
        marks.push('<g fill="' + c + '" opacity="' + o + '">' + g + '</g>');
      } else if (k === 'ocelli') {
        for (var i = 0; i < (m.n || 5); i++) { var t = xr[0] + rnd() * (xr[1] - xr[0]), fr = (m.y ? m.y[0] + rnd() * (m.y[1] - m.y[0]) : (rnd() - .5) * 1.2); g += '<circle cx="' + f(x(t)) + '" cy="' + f(Y(t, fr)) + '" r="' + (m.r || 4) + '" fill="' + c + '"/><circle cx="' + f(x(t)) + '" cy="' + f(Y(t, fr)) + '" r="' + ((m.r || 4) - 1.4) + '" fill="' + (m.in || '#e8d8a0') + '" opacity=".6"/>'; }
        marks.push('<g opacity="' + o + '">' + g + '</g>');
      }
    });

    /* head details */
    var hx = x(tp.gill), mouth = tp.mouth, ex = x(tp.eye[0]), ey = CY + tp.eye[1] * 2.4 * interp(U, tp.eye[0]), er = tp.eye[2] * (spec.eyeR || 1);
    var mY = tp.upmouth ? -1 : 0;
    var mpath = 'M' + f(X0 + .5) + ' ' + f(CY + mouth[1] + (tp.upmouth ? -3 : 0)) + 'Q' + f(x(mouth[0] * .6)) + ' ' + f(CY + mouth[2] + mY) + ' ' + f(x(mouth[0])) + ' ' + f(CY + mouth[1] - 1 + (tp.upmouth ? -2 : 0));
    var head = '<path d="M' + f(hx) + ' ' + f(CY - U[3] * .78) + 'Q' + f(hx - 5) + ' ' + f(CY + 1) + ' ' + f(hx) + ' ' + f(CY + D[3] * .8) + '" stroke="' + ink + '" stroke-width="1.1" fill="none" opacity=".5"/>' +
      '<path d="' + mpath + '" stroke="' + ink + '" stroke-width="1.2" fill="none" opacity=".75" stroke-linecap="round"/>';
    if (spec.jawspot) head += '<path d="M' + f(x(mouth[0])) + ' ' + f(CY + mouth[1] - 1) + 'l3 -2" stroke="' + ink + '" stroke-width="1.4" opacity=".8"/>';
    var eyes = '<circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="' + f(er + 1) + '" fill="#f7f4e6"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="' + f(er) + '" fill="' + (spec.eye || '#c9a227') + '"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="' + f(er * .55) + '" fill="#111"/><circle cx="' + f(ex - er * .25) + '" cy="' + f(ey - er * .3) + '" r="' + f(er * .22) + '" fill="#fff"/>';
    if (tp.twoeyes) eyes += '<circle cx="' + f(ex + 8) + '" cy="' + f(ey + 11) + '" r="' + f(er + 1) + '" fill="#f7f4e6"/><circle cx="' + f(ex + 8) + '" cy="' + f(ey + 11) + '" r="' + f(er) + '" fill="' + (spec.eye || '#c9a227') + '"/><circle cx="' + f(ex + 8) + '" cy="' + f(ey + 11) + '" r="' + f(er * .55) + '" fill="#111"/>';
    var extra = '';
    if (spec.barbels != null ? spec.barbels : tp.barbels) {
      var nb = spec.barbels != null ? spec.barbels : tp.barbels, bd = '';
      for (var i = 0; i < nb; i++) { var dir = i % 2 ? 1 : -1, ln = 14 + (i % 3) * 3; bd += 'M' + f(X0 + 8) + ' ' + f(CY + 3) + 'q-8 ' + f(dir * 3 + 6 + i * 1.5) + ' ' + f(-ln) + ' ' + f(6 + i * 2.5); }
      extra += '<path d="' + bd + '" stroke="' + ink + '" stroke-width="1.1" fill="none" opacity=".75" stroke-linecap="round"/>';
    }
    if (tp.scutes) {
      var sc = '';
      for (var i = 0; i < 9; i++) { var t = .22 + i * .075; sc += '<circle cx="' + f(x(t)) + '" cy="' + f(CY - interp(U, t) + 3) + '" r="1.6"/><circle cx="' + f(x(t)) + '" cy="' + f(CY + 1) + '" r="1.4"/><circle cx="' + f(x(t)) + '" cy="' + f(CY + interp(D, t) - 3) + '" r="1.4"/>'; }
      extra += '<g fill="' + shade(back, .45) + '" opacity=".7" stroke="' + ink + '" stroke-width=".4">' + sc + '</g>';
    }
    if (tp.bigscales || spec.bigscales) {
      var bs = '';
      for (var i = 0; i < 9; i++) for (var j = -3; j <= 3; j++) { var t = .26 + i * .065; bs += 'M' + f(x(t)) + ' ' + f(CY + j * 5.4 + (i % 2 ? 2.7 : 0)) + 'q4 3 0 6'; }
      marks.push('<path d="' + bs + '" stroke="#fff" stroke-width=".7" fill="none" opacity=".4"/>');
    }
    if (spec.pavement) { /* none */ }

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" class="' + (opt.cls || 'fish-svg') + '"' + (opt.label ? ' role="img" aria-label="' + String(opt.label).replace(/[<>"&]/g, '') + '"' : ' aria-hidden="true" focusable="false"') + '>' +
      '<defs>' + defs.join('') + '</defs>' +
      fins.join('') +
      '<path d="' + body + '" fill="url(#g' + id + ')" stroke="' + ink + '" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<g clip-path="url(#c' + id + ')"><rect x="0" y="0" width="' + W + '" height="' + H + '" fill="url(#s' + id + ')"/>' + marks.join('') +
      '<rect x="0" y="' + f(CY - 24) + '" width="' + W + '" height="48" fill="url(#h' + id + ')"/></g>' +
      head + extra + eyes + '</svg>';
    return svg;
  }

  root.FishArt = { draw: draw, templates: Object.keys(T) };
})(typeof window !== 'undefined' ? window : this);
