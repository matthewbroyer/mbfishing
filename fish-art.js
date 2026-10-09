/* fish-art.js: 16-bit pixel-art fish and wildlife, returned as inline SVG (one <path> per colour).
   Each animal is drawn on a 72x30 grid with a smooth colour ramp, then a 16-bit pass adds a coloured outline, light from the top left
   (highlight and shadow tones) and squeezes the picture into at most 16 colours. FishArt.bits = 8 gives the old flat look, 32 a
   double-resolution version (not used by the app).
   These are illustrations, not photos: shapes and colour patterns are approximate and real fish vary.
   No network, no images. Used by the Species guide in index.html. */
(function (root) {
  'use strict';
  var W = 72, H = 30, CY = 15, S = .3, X0 = 5, L = 52;
  var ST = [0, .04, .12, .26, .42, .58, .74, .88, 1];
  var cache = {}, M16 = false;

  function rng(seed) {
    var s = 7;
    for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function rgb(hex) { var n = parseInt((hex || '#888888').slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function hx(a) { return '#' + ((1 << 24) | (a[0] << 16) | (a[1] << 8) | a[2]).toString(16).slice(1); }
  function mix(a, b, k) { var x = rgb(a), y = rgb(b); return hx([0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * k); })); }
  function shade(c, amt) { return amt < 0 ? mix(c, '#000000', -amt) : mix(c, '#ffffff', amt); }
  function interp(arr, t) {
    for (var i = 0; i < ST.length - 1; i++) if (t <= ST[i + 1]) { var k = (t - ST[i]) / (ST[i + 1] - ST[i]); return arr[i] + (arr[i + 1] - arr[i]) * k; }
    return arr[arr.length - 1];
  }

  /* Body templates (half-depth above/below the centre line at 9 stations, snout to tail base), in drawing units. */
  var T = {
    bass: { U: [1.5, 7, 14, 19.5, 21, 19, 14, 8.5, 5.5], D: [1.5, 6, 12, 17, 19, 17, 12, 8, 5.5], mouth: [.22, 3, 5], eye: [.13, -.16, 3.4], gill: .24,
      fins: [[.27, .48, 'sp', 13, 'u'], [.53, .74, 'soft', 11, 'u'], [.60, .76, 'soft', 9, 'd']], pec: .22, pel: .30, tail: ['notch', 24, 24, .12] },
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
      fins: [[.27, .37, 'sp', 11, 'u'], [.62, .74, 'adip', 5, 'u'], [.46, .86, 'soft', 7, 'd']], pec: .20, pel: .45, tail: ['notch', 24, 22, .16], barbels: 6, bstyle: 'cat' },
    carp: { U: [1.5, 8, 17, 24, 25, 21, 15, 9, 6], D: [1.5, 7, 14, 20, 22, 19, 14, 8.5, 5.8], mouth: [.08, 3, 4.5], eye: [.12, -.14, 2.8], gill: .22,
      fins: [[.30, .70, 'soft', 10, 'u'], [.64, .76, 'soft', 8, 'd']], pec: .22, pel: .40, tail: ['fork', 24, 23, .30], barbels: 2, bstyle: 'carp' },
    trout: { U: [1.5, 6.5, 12, 15.5, 16.5, 14.5, 11, 7.5, 5], D: [1.5, 6, 11.5, 14.5, 15.5, 14, 10.5, 7, 5], mouth: [.17, 3, 5], eye: [.12, -.10, 3.2], gill: .20,
      fins: [[.40, .52, 'soft', 12, 'u'], [.78, .84, 'adip', 5, 'u'], [.64, .76, 'soft', 8, 'd']], pec: .22, pel: .46, tail: ['notch', 22, 20, .12] },
    drum: { U: [1.5, 7, 15, 22, 24, 21, 14, 8, 5], D: [1.5, 6, 12, 17, 17, 14.5, 10, 6.5, 4.5], mouth: [.11, 3, 3.5], eye: [.12, -.13, 3.4], gill: .22,
      fins: [[.28, .42, 'sp', 11, 'u'], [.42, .78, 'soft', 8, 'u'], [.66, .76, 'soft', 6, 'd']], pec: .22, pel: .30, tail: ['round', 24, 18, 0] },
    bowfin: { U: [1.5, 6.5, 12, 15, 16, 15, 12.5, 9, 6.5], D: [1.5, 6, 11, 13.5, 14, 13, 10.5, 8, 6], mouth: [.18, 3, 5], eye: [.10, -.11, 2.6], gill: .20,
      fins: [[.26, .84, 'soft', 9, 'u'], [.70, .82, 'soft', 5, 'd']], pec: .22, pel: .50, tail: ['round', 24, 20, 0] },
    gar: { U: [1, 3, 5, 8, 10, 11, 10, 8, 5], D: [1, 3, 5, 7, 9, 10, 9, 7.5, 4.5], mouth: [.30, 2, 3], eye: [.20, -.04, 2.6], gill: .26,
      fins: [[.70, .84, 'soft', 8, 'u'], [.68, .80, 'soft', 6, 'd']], pec: .30, pel: .50, tail: ['round', 24, 14, 0], snout: 2 },
    sturgeon: { U: [1, 5, 8, 11, 13, 13.5, 11.5, 8.5, 5.5], D: [1, 4, 6, 8, 9, 9.5, 8, 6, 4.5], mouth: [.17, 5, 8], eye: [.14, -.06, 2.2], gill: .24,
      fins: [[.74, .86, 'soft', 9, 'u'], [.70, .80, 'soft', 6, 'd']], pec: .24, pel: .50, tail: ['shark', 28, 22, .2], scutes: 1, barbels: 4, bstyle: 'stur' },
    snapper: { U: [1.5, 7, 15, 22, 24, 21, 15, 9, 6], D: [1.5, 7, 14, 20, 21, 18, 13, 8, 5.5], mouth: [.16, 3, 5], eye: [.12, -.13, 3.6], gill: .24,
      fins: [[.27, .50, 'sp', 11, 'u'], [.50, .72, 'soft', 12, 'u'], [.60, .74, 'soft', 9, 'd']], pec: .24, pel: .34, tail: ['notch', 22, 22, .12] },
    seabass: { U: [1.5, 7, 14, 19, 20, 17, 12, 8, 5.5], D: [1.5, 6.5, 13, 17.5, 18, 15.5, 11, 7.5, 5.5], mouth: [.18, 3, 5], eye: [.12, -.13, 3.2], gill: .24,
      fins: [[.28, .76, 'sp', 11, 'u'], [.58, .74, 'soft', 9, 'd']], pec: .24, pel: .32, tail: ['round', 24, 20, 0] },
    cod: { U: [1.5, 7, 13, 17, 17.5, 15, 11, 8, 6], D: [1.5, 6, 11, 14.5, 15, 12.5, 9.5, 7, 5.5], mouth: [.17, 3, 5], eye: [.11, -.13, 4], gill: .20,
      fins: [[.25, .40, 'soft', 10, 'u'], [.42, .60, 'soft', 10, 'u'], [.62, .78, 'soft', 8, 'u'], [.46, .62, 'soft', 9, 'd'], [.64, .78, 'soft', 8, 'd']], pec: .22, pel: .28, tail: ['square', 22, 20, 0], barbels: 1, bstyle: 'cod' },
    deep: { U: [1.5, 9, 20, 28, 30, 25, 17, 9, 5.5], D: [1.5, 9, 19, 26, 27, 22, 15, 8.5, 5.5], mouth: [.12, 3.5, 5], eye: [.13, -.14, 3.2], gill: .24,
      fins: [[.24, .50, 'sp', 13, 'u'], [.50, .72, 'soft', 10, 'u'], [.56, .72, 'soft', 10, 'd']], pec: .24, pel: .34, tail: ['notch', 22, 24, .18] },
    jack: { U: [1.5, 8, 16, 23, 24, 20, 14, 8, 5], D: [1.5, 8, 16, 22, 23, 19, 13, 7.5, 4.8], mouth: [.14, 3.5, 5], eye: [.11, -.12, 3.2], gill: .24,
      fins: [[.30, .38, 'sp', 8, 'u'], [.42, .72, 'soft', 9, 'u'], [.52, .72, 'soft', 9, 'd']], pec: .24, pel: .34, tail: ['fork', 26, 28, .38] },
    mack: { U: [1.5, 5, 10, 14, 15.5, 14, 10, 6, 3.6], D: [1.5, 5, 9.5, 13, 14.5, 13, 9.5, 6, 3.6], mouth: [.17, 3, 4.5], eye: [.11, -.09, 3], gill: .22,
      fins: [[.34, .48, 'sp', 10, 'u'], [.56, .64, 'soft', 6, 'u'], [.66, .88, 'lets', 4, 'u'], [.60, .66, 'soft', 6, 'd'], [.68, .88, 'lets', 4, 'd']], pec: .24, pel: .34, tail: ['lunate', 26, 26, .55] },
    tuna: { U: [1.5, 7, 13, 18, 20, 17, 11, 6, 3.4], D: [1.5, 7, 12.5, 17, 18.5, 16, 10.5, 6, 3.4], mouth: [.17, 3, 4.5], eye: [.10, -.08, 3.2], gill: .20,
      fins: [[.32, .44, 'sp', 11, 'u'], [.50, .60, 'sail', 14, 'u'], [.62, .88, 'lets', 4.5, 'u'], [.52, .62, 'sail', 12, 'd'], [.66, .88, 'lets', 4.5, 'd']], pec: .22, pel: .30, tail: ['lunate', 28, 30, .55] },
    mahi: { U: [8, 15, 18.5, 19, 17, 14.5, 11, 7.5, 5], D: [3.5, 8, 10.5, 12, 12.5, 11, 8.5, 6.5, 4.5], mouth: [.14, 3, 4], eye: [.11, -.08, 3.2], gill: .20,
      fins: [[.12, .86, 'sail', 12, 'u'], [.58, .86, 'soft', 8, 'd']], pec: .22, pel: .32, tail: ['fork', 24, 26, .40] },
    tarpon: { U: [1.5, 8, 15, 20, 21, 19, 14, 9, 6], D: [1.5, 7, 13, 17, 18, 16.5, 12, 8, 5.8], mouth: [.19, 3, 7], eye: [.11, -.10, 3.8], gill: .22,
      fins: [[.56, .66, 'tail', 14, 'u'], [.66, .78, 'soft', 8, 'd']], pec: .24, pel: .48, tail: ['fork', 26, 28, .35], bigscales: 1, upmouth: 1 },
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

  /* the cached 8-bit drawing, and (when bits is 32) its 32-bit version */
  function entry(spec, bits) {
    var key = JSON.stringify(spec), e = cache[key] || (cache[key] = {});
    if (!e.g) e.g = render(spec);
    if (bits === 16 && !e.g16) { M16 = true; try { e.g16 = render(spec); } finally { M16 = false; } }
    if (bits >= 32 && !e.h) e.h = up32(e.g, W, H);
    if (bits === 16 && !e.m) e.m = up16(e.g16, W, H);
    return e;
  }
  function draw(spec, opt) {
    opt = opt || {};
    var bits = opt.bits || root.FishArt.bits, hi = bits >= 32, e = entry(spec, bits), w = hi ? W2 : W, h = hi ? H2 : H;
    var body = hi ? (e.sh || (e.sh = toSvg(e.h, W2, H2))) : bits === 16 ? (e.s16 || (e.s16 = toSvg(e.m, W, H))) : (e.s || (e.s = toSvg(e.g, W, H)));
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" class="' + (opt.cls || 'fish-svg') + '"' +
      (opt.label ? ' role="img" aria-label="' + String(opt.label).replace(/[<>"&]/g, '') + '"' : ' aria-hidden="true" focusable="false"') +
      ' shape-rendering="crispEdges">' + body + '</svg>';
  }

  /* Shape mode (turtles, birds, mammals, crabs...): spec.sh is a list of ops painted in order on the same grid, then outlined.
       ['e', cx, cy, rx, ry, colour]   filled ellipse (cx, cy, rx, ry in grid units; pixel corners)
       ['r', x, y, w, h, colour]       rectangle
       ['p', [[x, y], ...], colour]    filled polygon
       ['l', x0, y0, x1, y1, colour]   one-pixel line
       ['px', [[x, y], ...], colour]   single pixels
       ['c', x, y, w, h]               clear a rectangle (carve a shape)
     A trailing flag: 'on' paints only pixels that already have colour (shading, markings); 'post' draws after the outline (thin details).
     spec.flip mirrors left-right; spec.ink sets the outline colour. */
  function renderSh(spec) {
    var G = new Array(W * H), ink = spec.ink || '#1b2028', i, j, post = [];
    function put(x, y, c, on) { x = Math.round(x); y = Math.round(y); if (x < 0 || x >= W || y < 0 || y >= H) return; if (on && G[y * W + x] == null) return; G[y * W + x] = c; }
    function ln(x0, y0, x1, y1, c, on) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      var dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, er = dx + dy, e2;
      for (;;) { put(x0, y0, c, on); if (x0 === x1 && y0 === y1) break; e2 = 2 * er; if (e2 >= dy) { er += dy; x0 += sx; } if (e2 <= dx) { er += dx; y0 += sy; } }
    }
    function run(o, late) {
      var k = o[0], flag = o[o.length - 1], on = flag === 'on', isPost = flag === 'post';
      if (isPost !== late) return;
      var y, x;
      if (k === 'e') { for (y = Math.floor(o[2] - o[4]); y <= Math.ceil(o[2] + o[4]); y++) for (x = Math.floor(o[1] - o[3]); x <= Math.ceil(o[1] + o[3]); x++) { var dx = (x + .5 - o[1]) / o[3], dy = (y + .5 - o[2]) / o[4]; if (dx * dx + dy * dy <= 1) put(x, y, o[5], on); } }
      else if (k === 'r') { for (y = o[2]; y < o[2] + o[4]; y++) for (x = o[1]; x < o[1] + o[3]; x++) put(x, y, o[5], on); }
      else if (k === 'p') {
        var pts = o[1], c = o[2], ys = pts.map(function (p) { return p[1]; }), y0 = Math.floor(Math.min.apply(null, ys)), y1 = Math.ceil(Math.max.apply(null, ys));
        for (y = y0; y < y1; y++) {
          var xs = [], yc = y + .5;
          for (i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; if ((a[1] <= yc && b[1] > yc) || (b[1] <= yc && a[1] > yc)) xs.push(a[0] + (yc - a[1]) / (b[1] - a[1]) * (b[0] - a[0])); }
          xs.sort(function (m, n) { return m - n; });
          for (i = 0; i + 1 < xs.length; i += 2) for (x = Math.ceil(xs[i] - .5); x < xs[i + 1] - .5 + 1e-9; x++) put(x, y, c, on);
        }
      }
      else if (k === 'c') { for (y = o[2]; y < o[2] + o[4]; y++) for (x = o[1]; x < o[1] + o[3]; x++) if (x >= 0 && x < W && y >= 0 && y < H) G[y * W + x] = null; }
      else if (k === 'l') ln(o[1], o[2], o[3], o[4], o[5], on);
      else if (k === 'px') o[1].forEach(function (p) { put(p[0], p[1], o[2], on); });
    }
    (spec.sh || []).forEach(function (o) { run(o, false); });
    var O = [], fill = function (x, y) { return x >= 0 && x < W && y >= 0 && y < H && G[y * W + x] != null; };
    for (j = 0; j < H; j++) for (i = 0; i < W; i++) if (G[j * W + i] == null && (fill(i - 1, j) || fill(i + 1, j) || fill(i, j - 1) || fill(i, j + 1))) O.push([i, j]);
    O.forEach(function (p) { G[p[1] * W + p[0]] = ink; });
    (spec.sh || []).forEach(function (o) { run(o, true); });
    if (spec.flip) for (j = 0; j < H; j++) for (i = 0; i < W >> 1; i++) { var t = G[j * W + i]; G[j * W + i] = G[j * W + W - 1 - i]; G[j * W + W - 1 - i] = t; }
    G.ink = ink;
    return G;
  }

  function render(spec) {
    if (spec.sh) return renderSh(spec);
    var tp = T[spec.t] || T.bass, rnd = rng(spec.s || spec.t || 'x'), dep = spec.dep || 1;
    var G = new Array(W * H), BODY = new Array(W * H), TAILM = new Array(W * H), FINM = new Array(W * H);
    var back = spec.back || '#5b6b3a', side = spec.side || shade(back, .35), belly = spec.belly || '#efecd8', fin = spec.fin || shade(back, .15);
    var ink = spec.ink || shade(back, -.72), finEdge = shade(fin, -.42), finRay = shade(fin, -.2);
    var fins = spec.fins || tp.fins;
    var U = (spec.U || tp.U).map(function (v) { return v * dep; }), D = (spec.D || tp.D).map(function (v) { return v * dep; });
    var topA = [], botA = [], c, post = [];
    function put(x, y, col) { if (x >= 0 && x < W && y >= 0 && y < H) G[y * W + x] = col; }
    function get(x, y) { return (x >= 0 && x < W && y >= 0 && y < H) ? G[y * W + x] : null; }
    function isB(x, y) { return x >= 0 && x < W && y >= 0 && y < H && BODY[y * W + x]; }
    function over(x, y, col, o) { var b = get(x, y); put(x, y, b && o < 1 ? mix(b, col, o) : col); }
    function ovB(x, y, col, o) { if (isB(x, y)) over(x, y, col, o == null ? 1 : o); }
    function line(x0, y0, x1, y1, fn) {
      var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, er = dx - dy;
      for (var n = 0; n < 200; n++) { fn(x0, y0); if (x0 === x1 && y0 === y1) break; var e2 = 2 * er; if (e2 > -dy) { er -= dy; x0 += sx; } if (e2 < dx) { er += dx; y0 += sy; } }
    }

    /* body silhouette */
    for (c = 0; c <= L; c++) {
      var t = c / L;
      topA[c] = CY - Math.max(1, Math.round(interp(U, t) * S));
      botA[c] = CY + Math.max(1, Math.round(interp(D, t) * S));
    }
    var X = function (t) { return X0 + Math.round(L * t); };
    var rowAt = function (cc, fr) {
      cc = Math.max(0, Math.min(L, cc));
      var y = fr < 0 ? CY + fr * (CY - topA[cc]) : CY + fr * (botA[cc] - CY);
      return Math.max(topA[cc], Math.min(botA[cc] - 1, Math.floor(y + (fr < 0 ? .0001 : 0))));
    };
    var cOf = function (t) { return Math.max(0, Math.min(L, Math.round(L * t))); };

    /* tail */
    var tl = spec.tt ? [spec.tt, tp.tail[1], tp.tail[2], spec.tn == null ? tp.tail[3] : spec.tn] : tp.tail;
    var tlen = Math.round(tl[1] * S * 1.25 * (spec.tail || 1)), span = tl[2] * S * 1.2 * (spec.tail || 1), tx0 = X0 + L;
    var pU = CY - topA[L], pD = botA[L] - CY, tt = tl[0];
    var tailTop = 1, tailBot = 1;
    for (var j = 0; j < tlen; j++) {
      var f = j / (tlen - 1 || 1), hu, hd, carve = 0;
      var grow = Math.min(1, j / (tlen * .55 || 1));
      if (tt === 'round') { var q = j < tlen * .5 ? Math.min(1, j / (tlen * .5)) : Math.sqrt(Math.max(0, 1 - Math.pow((j - tlen * .5) / (tlen * .5), 2))); hu = hd = Math.max(1, pU + (span - pU) * q); if (j >= tlen * .5) hu = hd = Math.max(1, span * q); }
      else if (tt === 'square') { hu = pU + (span - pU) * grow; hd = pD + (span - pD) * grow; }
      else if (tt === 'notch') { hu = pU + (span * .92 - pU) * Math.pow(f, .8); hd = pD + (span * .92 - pD) * Math.pow(f, .8); var nj = tlen * (1 - tl[3] - .12); if (j > nj) carve = span * .5 * (j - nj) / (tlen - nj); }
      else if (tt === 'fork') { hu = pU + (span - pU) * Math.pow(f, .85); hd = pD + (span - pD) * Math.pow(f, .85); var fj = tlen * (1 - tl[3]); if (j > fj) carve = span * .9 * (j - fj) / (tlen - 1 - fj || 1); }
      else if (tt === 'lunate') { hu = pU + (span - pU) * Math.pow(f, .9); hd = pD + (span - pD) * Math.pow(f, .9); var lj = tlen * (1 - tl[3] * .9); if (j > lj) carve = span * .92 * Math.pow((j - lj) / (tlen - 1 - lj || 1), .75); }
      else if (tt === 'shark') { hu = pU + (span * 1.25 - pU) * Math.pow(f, .9); hd = pD + (span * .55 - pD) * Math.pow(f, .9); carve = j > tlen * .75 ? span * .25 * (j - tlen * .75) / (tlen * .25) : 0; }
      else { hu = hd = pU + (span - pU) * grow; }
      hu = Math.round(hu); hd = Math.round(hd); carve = Math.round(carve);
      for (var dy = 1; dy <= hu; dy++) if (dy > carve) { put(tx0 + j, CY - dy, fin); TAILM[(CY - dy) * W + tx0 + j] = 1; }
      for (dy = 1; dy <= hd; dy++) if (dy > carve) { put(tx0 + j, CY + dy - 1, fin); TAILM[(CY + dy - 1) * W + tx0 + j] = 1; }
    }
    /* tail rays */
    [-3, -2, -1, 0, 1, 2, 3].forEach(function (r) {
      var ex = tx0 + tlen - 1, ey = CY + Math.round(r * span * .3);
      line(tx0 - 1, CY, ex, ey, function (x, y) { if (TAILM[y * W + x] && ((x + y) % 2 === 0 || Math.abs(r) < 2)) put(x, y, finRay); });
    });
    if (spec.tailTip) for (j = tlen - 2; j < tlen; j++) for (dy = 1; dy <= 14; dy++) { var ty = spec.tipSide === 'u' ? CY - dy : CY + dy - 1; if (TAILM[ty * W + tx0 + j]) put(tx0 + j, ty, spec.tailTip); }
    if (spec.tailMark) for (var y0 = 0; y0 < H; y0++) for (var x0 = 0; x0 < W; x0++) if (TAILM[y0 * W + x0] && ((x0 + y0) & 1) === 0) put(x0, y0, mix(get(x0, y0), spec.tailMark, .55));

    /* dorsal / anal / extra fins (drawn before the body so the body covers their base) */
    var finPix = function (x, y, col) { put(x, y, col); FINM[y * W + x] = 1; };
    fins.forEach(function (fn) {
      var a = cOf(fn[0]), b = cOf(fn[1]), k = fn[2], h = Math.max(1, Math.round(fn[3] * S * (spec.finH || 1))), top = fn[4] === 'u', fc = fn[5] || fin;
      var edge = function (cc) { return top ? topA[cc] : botA[cc]; };
      var dirn = top ? -1 : 1;
      var place = function (cc, hh, col) { var e = edge(cc); for (var i = 0; i < hh; i++) finPix(X0 + cc, top ? e - 1 - i : e + i, col); finPix(X0 + cc, top ? e : e - 1, col); };
      var n = b - a;
      if (k === 'adip') {
        for (var cc = a; cc <= b; cc++) { var u = (cc - a) / (n || 1), hh = Math.max(1, Math.round(h * 4 * u * (1 - u) * .95)); place(cc, hh, fn[5] || fin); }
        return;
      }
      if (k === 'tail') { // tarpon: small dorsal with one long trailing ray
        for (cc = a; cc <= b; cc++) { var uu = (cc - a) / (n || 1); place(cc, Math.max(2, Math.round(h * (uu < .3 ? .55 + uu * 1.4 : 1 - (uu - .3) * 1.1))), fc); }
        var fx = X0 + a + 1, fy = topA[a] - Math.round(h * .85);
        post.push(function () { line(fx, fy, fx + 2, fy - 3, function (x, y) { put(x, y, ink); }); line(fx + 2, fy - 3, fx + 8, fy - 4, function (x, y) { put(x, y, ink); }); });
        return;
      }
      if (k === 'lets') {
        var cnt = 5;
        for (var q2 = 0; q2 < cnt; q2++) {
          var c0 = a + Math.round(n * q2 / (cnt - .6)), e0 = edge(Math.min(L, c0)), hgt = Math.max(2, Math.round(h * .6));
          for (var m = 0; m < hgt; m++) finPix(X0 + c0, top ? e0 - 1 - m : e0 + m, spec.lets || fin);
          finPix(X0 + c0 + 1, top ? e0 - 1 : e0, spec.lets || fin);
          finPix(X0 + c0 + 1, top ? e0 - 2 : e0 + 1, spec.lets || fin);
        }
        return;
      }
      for (cc = a; cc <= b; cc++) {
        var u2 = (cc - a) / (n || 1), hh3;
        if (k === 'sp') { hh3 = u2 < .12 ? .6 + u2 * 3 : 1 - .55 * ((u2 - .12) / .88); hh3 = Math.max(1, Math.round(hh3 * h)); if ((cc - a) % 2) hh3 = Math.max(1, hh3 - 1); }
        else if (k === 'sail') { hh3 = u2 < .15 ? .45 + u2 * 3.6 : (u2 > .82 ? 1 - (u2 - .82) * 3.8 : 1); hh3 = Math.max(1, Math.round(hh3 * h)); }
        else if (k === 'fringe') { hh3 = Math.max(1, Math.round(h * (.55 + .45 * Math.sin(u2 * Math.PI)))); }
        else { hh3 = u2 < .2 ? .4 + u2 * 3 : 1 - .82 * Math.pow((u2 - .2) / .8, 1.5); hh3 = Math.max(1, Math.round(hh3 * h)); }
        place(cc, hh3, (spec.lead && !top && cc - a < 2) ? spec.lead : ((cc % 2 === 0) ? finRay : fc));
        if (cc % 2) { var e = edge(cc); finPix(X0 + cc, top ? e - 1 - (hh3 - 1) : e + (hh3 - 1), fc); }
      }
    });

    /* body fill: colour bands with a one-pixel checker dither where bands meet */
    var mid = mix(back, side, .5), bandBelly = spec.bandBelly == null ? .66 : spec.bandBelly, bandSide = spec.bandSide == null ? .42 : spec.bandSide;
    var bellyEdge = mix(side, belly, .5);
    for (c = 0; c <= L; c++) {
      for (var y = topA[c]; y < botA[c]; y++) {
        var fr = (y + .5 - topA[c]) / (botA[c] - topA[c]), dd = M16 ? 0 : ((c + y) & 1) ? .045 : -.045, g = fr + dd, col;
        if (M16) {
          /* 16-bit: smooth ramp from a dark back to a light belly, no checker dither, a soft highlight along the upper side and a shaded underside */
          if (g < .07) col = shade(back, -.12); else if (g < .17) col = back; else if (g < bandSide - .1) col = mid; else if (g < bandBelly - .15) col = side; else if (g < bandBelly - .1) col = mix(side, bellyEdge, .5); else if (g < bandBelly + .04) col = bellyEdge; else col = belly;
          if (g >= .17 && g < .17 + 1.5 / (botA[c] - topA[c]) && c > L * .12 && c < L * .8) col = hl16(col, .1);
          if (y === botA[c] - 1 && fr > .6) col = sh16(belly, .3); else if (y === botA[c] - 2 && fr > .75) col = sh16(belly, .12);
        } else {
        if (g < .17) col = back; else if (g < bandSide - .1) col = mid; else if (g < bandBelly - .1) col = side; else if (g < bandBelly + .04) col = bellyEdge; else col = belly;
        if (y === topA[c] && spec.rim !== 0) col = shade(back, -.12);
        if (y === botA[c] - 1 && fr > .6) col = shade(belly, -.1);
        }
        put(X0 + c, y, col); BODY[y * W + X0 + c] = 1;
      }
    }

    /* scale texture */
    if (!M16 && (spec.scales || tp.bigscales || spec.bigscales)) {
      for (c = Math.round(L * .26); c < Math.round(L * .88); c++) for (y = topA[c] + 1; y < botA[c] - 1; y++) {
        if (c % 3 === 0 && (y + (Math.floor(c / 3) % 2) * 2) % 4 === 0) over(X0 + c, y, shade(side, -.55), .32);
      }
    }
    if (tp.scutes) { // sturgeon: rows of bony plates
      [[topA, 1], [null, 0], [botA, -1]].forEach(function (rw) {
        for (c = Math.round(L * .22); c < Math.round(L * .9); c += 3) {
          var yy = rw[1] === 1 ? topA[c] + 1 : (rw[1] === 0 ? CY : botA[c] - 2);
          ovB(X0 + c, yy, shade(back, .5), .9); ovB(X0 + c + 1, yy, shade(back, -.3), .7);
        }
      });
    }

    /* markings */
    (spec.m || []).forEach(function (m) {
      var col = m.c || '#222', o = m.o == null ? .7 : Math.min(1, m.o + .15), k = m.k, xr = m.x || [.12, .94], rr;
      var c0 = cOf(xr[0]), c1 = cOf(xr[1]);
      if (k === 'bars') {
        var ya = m.y || [-.95, .55], wpx = Math.max(1, Math.round((m.w || 5) * S * (m.wm || 1)));
        (m.at || []).forEach(function (t, bi) {
          var bc = cOf(t), ww = wpx; if (m.taper) ww = Math.max(1, Math.round(wpx * (1 - t * .3)));
          for (var wi = 0; wi < ww; wi++) {
            var cc2 = bc + wi, lean = m.lean ? Math.round(m.lean * 1) : 0;
            var r0 = rowAt(cc2, ya[0]), r1 = rowAt(cc2, ya[1]);
            for (var yy2 = r0; yy2 <= r1; yy2++) {
              if (m.gap && ((yy2 + bi) % m.gap === 0)) continue;
              ovB(X0 + cc2 + Math.round(lean * (yy2 - CY) / 6), yy2, col, o);
            }
          }
        });
      } else if (k === 'stripe') {
        var dash = m.dash ? String(m.dash).split(' ').map(function (v) { return Math.max(1, Math.round(+v * S)); }) : null, thick = (m.w || 1.4) * S * 1.4 > 1.3 ? 2 : 1;
        (m.ys || []).forEach(function (fr0, si) {
          for (var cc = c0; cc <= c1; cc++) {
            if (dash) { var per = dash[0] + dash[1]; if (((cc + si * 2) % per) >= dash[0]) continue; }
            var r = rowAt(cc, fr0); ovB(X0 + cc, r, col, o);
            if (thick > 1) ovB(X0 + cc, Math.min(botA[cc] - 1, r + 1), col, o);
          }
        });
      } else if (k === 'spots') {
        var yr = m.y || [-.9, .2], rg = m.r || [1.2, 2.2], placed = [], md = m.gap == null ? 2 : m.gap, tries = 0, np = 0;
        while (np < (m.n || 30) && tries < (m.n || 30) * 25) {
          tries++;
          var t2 = xr[0] + rnd() * (xr[1] - xr[0]), fr2 = yr[0] + rnd() * (yr[1] - yr[0]), rad = (rg[0] + rnd() * (rg[1] - rg[0])) * S * (m.sz || 1.5);
          var cc3 = cOf(t2), r2 = rowAt(cc3, fr2), ok = true;
          for (var pi = 0; pi < placed.length; pi++) if (Math.abs(placed[pi][0] - cc3) < md + (rad > 1 ? 1 : 0) && Math.abs(placed[pi][1] - r2) < md + (rad > 1 ? 1 : 0)) { ok = false; break; }
          if (!ok) continue;
          placed.push([cc3, r2]); np++;
          var px = X0 + cc3;
          var pts = m.shape === 'bean' ? [[0, 0], [1, 0]] : rad < 1 ? [[0, 0]] : (rad < 2.2 ? [[0, 0], [1, 0], [0, 1], [1, 1]] : (rad < 3 ? [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]] : [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]));
          if (m.halo) pts.forEach(function (p) { [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].forEach(function (d) { var hx2 = px + p[0] + d[0], hy2 = r2 + p[1] + d[1]; if (isB(hx2, hy2)) over(hx2, hy2, m.halo, m.ho == null ? .85 : m.ho); }); });
          pts.forEach(function (p) { ovB(px + p[0], r2 + p[1], col, o); });
        }
        if (m.tail) {
          for (var ti = 0, tp2 = 0; ti < m.tail * 30 && tp2 < m.tail; ti++) {
            var txx = tx0 + 1 + Math.floor(rnd() * Math.max(1, tlen - 2)), tyy = (m.tailHalf === 'u' ? CY - 7 : CY - 7) + Math.floor(rnd() * (m.tailHalf === 'u' ? 7 : 14));
            if (TAILM[tyy * W + txx]) { put(txx, tyy, col); tp2++; }
          }
        }
      } else if (k === 'blotch') {
        var ang = m.y == null ? 0 : m.y, th = Math.max(1, Math.round((m.th || .22) * 40 * S * (m.thm || 1))), jy = 0;
        for (var cc4 = c0; cc4 <= c1; cc4++) {
          if (m.dash && ((cc4 - c0) % 4) >= 3) continue;
          if (m.jag && cc4 % 3 === 0) jy = Math.floor(rnd() * 3) - 1;
          var r4 = rowAt(cc4, ang) + jy;
          for (var ti2 = 0; ti2 < th; ti2++) ovB(X0 + cc4, r4 + ti2 - Math.floor(th / 2), col, o);
        }
      } else if (k === 'band') {
        var yb = m.y || [-.2, .15];
        for (var cc5 = c0; cc5 <= c1; cc5++) { var ra = rowAt(cc5, yb[0]), rb = rowAt(cc5, yb[1]); for (var yy3 = ra; yy3 <= rb; yy3++) ovB(X0 + cc5, yy3, col, o); }
      } else if (k === 'worms') {
        var yw = m.y || [-.85, -.2], shape = [[0, 0], [1, 0], [2, -1], [3, -1], [4, 0], [5, 0]], np2 = 0, tr2 = 0, placed2 = [];
        while (np2 < (m.n || 14) && tr2 < 400) {
          tr2++;
          var tw = xr[0] + rnd() * (xr[1] - xr[0]), fw = yw[0] + rnd() * (yw[1] - yw[0]), cw = cOf(tw), rw = rowAt(cw, fw), flip = rnd() < .5 ? -1 : 1, bad = false;
          for (var pj = 0; pj < placed2.length; pj++) if (Math.abs(placed2[pj][0] - cw) < 5 && Math.abs(placed2[pj][1] - rw) < 2) { bad = true; break; }
          if (bad) continue; placed2.push([cw, rw]); np2++;
          shape.slice(0, m.len || 5).forEach(function (p) { ovB(X0 + cw + p[0], rw + p[1] * flip, col, o); });
        }
      } else if (k === 'dot') {
        var dcx = X0 + cOf(m.x), dcy = rowAt(cOf(m.x), m.y || 0), ry = Math.max(1, Math.round((m.r || 3) * S * 1.25)), rx = Math.max(1, Math.round((m.r || 3) * (m.ex || 1) * S * 1.25));
        if (m.halo) for (var hy = -ry - 1; hy <= ry + 1; hy++) for (var hx3 = -rx - 1; hx3 <= rx + 1; hx3++) if (Math.pow(hx3 / (rx + 1.1), 2) + Math.pow(hy / (ry + 1.1), 2) <= 1) ovB(dcx + hx3, dcy + hy, m.halo, 1);
        for (hy = -ry; hy <= ry; hy++) for (hx3 = -rx; hx3 <= rx; hx3++) if (Math.pow(hx3 / (rx + .35), 2) + Math.pow(hy / (ry + .35), 2) <= 1) ovB(dcx + hx3, dcy + hy, col, 1);
      } else if (k === 'lat') {
        for (var cc6 = c0; cc6 <= c1; cc6++) {
          if (m.dash && cc6 % 2) continue;
          var dip = m.dip ? Math.round(Math.sin((cc6 - c0) / Math.max(1, c1 - c0) * Math.PI) * m.dip * S) : 0;
          ovB(X0 + cc6, rowAt(cc6, m.y == null ? -.25 : m.y) + dip, col, o);
          if ((m.w || 1) >= 2) ovB(X0 + cc6, rowAt(cc6, m.y == null ? -.25 : m.y) + dip + 1, col, o);
        }
      } else if (k === 'eyebars') {
        var ex0 = X0 + Math.round(tp.eye[0] * L), ey0 = CY + Math.round(tp.eye[1] * 2.4 * (CY - topA[Math.round(tp.eye[0] * L)]));
        [[7, -4], [8, 3], [2, 6]].forEach(function (d) { line(ex0, ey0, ex0 + d[0], ey0 + d[1], function (x, y) { ovB(x, y, col, o); }); });
      } else if (k === 'saddles') {
        (m.at || []).forEach(function (t) {
          var sc = cOf(t); for (var sw = -1; sw <= 1; sw++) { var hh4 = sw === 0 ? 4 : 3; for (var sy = 0; sy < hh4; sy++) ovB(X0 + sc + sw, topA[Math.min(L, sc + sw)] + sy, col, o); }
        });
      } else if (k === 'ocelli') {
        var oc = X0 + cOf((m.x && m.x[0]) || .9), oy = rowAt(cOf((m.x && m.x[0]) || .9), (m.y && m.y[0]) || -.1), orad = Math.max(2, Math.round((m.r || 4) * S * 1.5));
        for (var oyy = -orad; oyy <= orad; oyy++) for (var oxx = -orad; oxx <= orad; oxx++) { var dd2 = Math.sqrt(oxx * oxx + oyy * oyy); if (dd2 <= orad + .2) { put(oc + oxx, oy + oyy, dd2 <= orad - 1.2 ? col : (m.in || '#e8c848')); } }
      } else if (k === 'blot') { // small rectangle, optional halo
        var bw = m.w || 2, bh = m.h || 2, bc0 = cOf(m.x), br0 = rowAt(bc0, m.y || 0) - Math.floor(bh / 2);
        if (m.halo) for (var hy2 = -1; hy2 <= bh; hy2++) for (var hx4 = -1; hx4 <= bw; hx4++) { if (m.round && (hy2 === -1 || hy2 === bh) && (hx4 === -1 || hx4 === bw)) continue; ovB(X0 + bc0 + hx4, br0 + hy2, m.halo, 1); }
        for (var by2 = 0; by2 < bh; by2++) for (var bx2 = 0; bx2 < bw; bx2++) ovB(X0 + bc0 + bx2, br0 + by2, (m.edge && bx2 === bw - 1) ? m.edge : col, o);
      } else if (k === 'stripes') { // n one-pixel lines, gap rows apart, following the back's curve
        var gp = m.gap || 2;
        for (var si2 = 0; si2 < (m.n || 5); si2++) {
          for (var cc7 = c0; cc7 <= c1; cc7++) {
            if (m.dash && ((cc7 + si2 * 2) % (m.dash[0] + m.dash[1])) >= m.dash[0]) continue;
            ovB(X0 + cc7, rowAt(cc7, m.fr == null ? -.6 : m.fr) + si2 * gp, col, o);
          }
        }
      } else if (k === 'chain') { // chain-link rings
        var ring = [[1, 0], [2, 0], [0, 1], [3, 1], [1, 2], [2, 2]];
        for (var rr2 = 0, ry0 = (m.y || -.75); rr2 < (m.rows || 3); rr2++) {
          for (var rc = c0 + (rr2 % 2) * 3; rc < c1; rc += 6) {
            var rrow = rowAt(rc, ry0) + rr2 * 3;
            ring.forEach(function (p) { ovB(X0 + rc + p[0], rrow + p[1], col, o); });
          }
        }
      } else if (k === 'eyestripe') { // dark line from the snout through the eye
        var ecc = Math.round(tp.eye[0] * L), eyy = CY + Math.round(tp.eye[1] * 2.4 * (CY - topA[ecc]) * (spec.eyeY || 1.25));
        for (var ec = 1; ec <= Math.round(tp.gill * L); ec++) ovB(X0 + ec, eyy + (m.slope ? Math.floor((ec - ecc) * m.slope) : 0), col, o);
      } else if (k === 'finspots') { // dots on the big fins above the body
        var fpl = [];
        for (var fy2 = 0; fy2 < CY - 4; fy2++) for (var fx2 = X0 + c0; fx2 <= X0 + c1; fx2++) if (FINM[fy2 * W + fx2] && !BODY[fy2 * W + fx2]) fpl.push([fx2, fy2]);
        for (var fi = 0, fn2 = 0; fi < 400 && fn2 < (m.n || 8) && fpl.length; fi++) { var pp = fpl[Math.floor(rnd() * fpl.length)]; if ((pp[0] + pp[1]) % 2 === 0) { put(pp[0], pp[1], col); fn2++; } }
      } else if (k === 'px') { // hand-placed pixels: pts is a list of [t, fr] pairs
        (m.pts || []).forEach(function (p) { var pc = cOf(p[0]); ovB(X0 + pc, rowAt(pc, p[1]), col, o); });
      }
    });

    /* gill cover, mouth, barbels */
    var gx = X0 + Math.round(tp.gill * L), gh = Math.max(2, Math.round((CY - topA[Math.round(tp.gill * L)]) * .85)), gcol = spec.gillCol || shade(mix(back, side, .5), -.45);
    for (var gy = -gh; gy <= Math.round(gh * (tp.flathead ? .9 : .9)); gy++) { var gd = Math.round(Math.pow(gy / (gh + 1), 2) * 1.6); ovB(gx - 1 + gd, CY + gy, gcol, .95); }
    if (spec.gillFlap) { for (var gy2 = -gh + 1; gy2 <= 1; gy2++) ovB(gx - 2, CY + gy2, gcol, .6); }
    var mlen = Math.max(3, Math.round(tp.mouth[0] * L * .72 * (spec.mouthL || 1))), mrow = CY + Math.round((tp.mouth[1] - 1.5) * S * 1.2) + (tp.upmouth ? -1 : 0) + (spec.mouthY || 0), mcol = shade(back, -.6);
    var snoutCut = topA[0];
    for (var mm = 0; mm < mlen; mm++) {
      var my = mrow + (mm > mlen - 3 && !tp.upmouth ? -(mm - (mlen - 3)) * 0 : 0);
      if (tp.upmouth) my = mrow + Math.round((mlen - mm) * .22); else if (mm >= mlen - 2) my = mrow - 1;
      if (isB(X0 + 1 + mm, my)) put(X0 + 1 + mm, my, mcol);
    }
    if (spec.jawspot) ovB(X0 + mlen, mrow - 1, mcol, 1);
    var nb = spec.barbels != null ? spec.barbels : tp.barbels, bst = spec.bstyle || tp.bstyle;
    if (nb || spec.chinBarbels) {
      var bcol = spec.barbelCol || shade(back, -.35);
      post.push(function () {
        var snx = X0, sny = mrow;
        if (bst === 'cat') {
          line(snx, sny - 1, snx - 6, sny + 1, function (x, y) { put(x, y, bcol); });
          line(snx, sny, snx - 5, sny + 4, function (x, y) { put(x, y, bcol); });
          for (var q = 0; q < 3; q++) line(snx + 3 + q * 2, botA[3 + q] - 1, snx + 1 + q * 2, botA[3 + q] + 3, function (x, y) { put(x, y, bcol); });
        } else if (bst === 'carp') {
          line(snx, sny, snx - 2, sny + 2, function (x, y) { put(x, y, bcol); });
          line(snx + 2, sny + 1, snx, sny + 3, function (x, y) { put(x, y, bcol); });
        } else if (bst === 'cod') {
          line(snx + 3, botA[2], snx + 2, botA[2] + 3, function (x, y) { put(x, y, bcol); });
        } else if (bst === 'stur') {
          for (var q2 = 0; q2 < 4; q2++) line(snx + 6 + q2 * 2, botA[2] - 1, snx + 5 + q2 * 2, botA[2] + 2, function (x, y) { put(x, y, bcol); });
        }
        if (spec.chinBarbels) for (var q3 = 0; q3 < spec.chinBarbels; q3++) put(snx + 3 + q3 * 2, botA[2 + q3] + 1, bcol);
      });
    }

    /* pectoral and pelvic fins (near side), over the body */
    var plen = Math.round((tp.pecLong ? 30 : (tp.bigpec ? 28 : 18)) * S * (spec.pecL || 1)), pw = tp.bigpec ? 3 : 2, pxs = X0 + Math.round((tp.pec + .05) * L), pys = CY + (tp.flathead ? 3 : 2);
    var pcol = shade(fin, .08), pedge = shade(fin, -.38);
    for (var pi2 = 0; pi2 < plen; pi2++) {
      var ph = Math.max(1, Math.round(pw * (1 - Math.abs(pi2 / plen - .35) * 1.0)));
      for (var pj2 = 0; pj2 < ph; pj2++) { put(pxs + pi2, pys + pj2 + Math.floor(pi2 / 4), pcol); }
      put(pxs + pi2, pys + Math.floor(pi2 / 4) - 1, pedge); put(pxs + pi2, pys + ph + Math.floor(pi2 / 4), pedge);
    }
    if (tp.pel < 1) {
      var vx = X0 + Math.round(tp.pel * L), vy = botA[Math.round(tp.pel * L)];
      for (var vi = 0; vi < 4; vi++) { put(vx + vi, vy - 1 + Math.floor(vi * .9), vi % 2 ? pcol : finRay); put(vx + vi, vy + Math.floor(vi * .9), pcol); if (vi < 3) put(vx + vi, vy + 1 + Math.floor(vi * .9), pedge); }
    }

    /* eyes */
    var ect = Math.round(tp.eye[0] * L), ex = X0 + ect, ey = CY + Math.round(tp.eye[1] * 2.4 * (CY - topA[ect]) * (spec.eyeY || 1.25)), er = tp.eye[2] * S * (spec.eyeR || 1), ic = spec.eye || '#e3c04a';
    var eyeAt = function (x, y) {
      if (er >= 1.8) { // large glassy eye
        for (var i = -2; i <= 2; i++) for (var j2 = -2; j2 <= 2; j2++) if (Math.abs(i) + Math.abs(j2) < 4) put(x + i, y + j2, ic);
        put(x, y, '#101418'); put(x + 1, y, '#101418'); put(x, y + 1, '#101418'); put(x + 1, y + 1, '#101418');
      } else if (er >= 1.2) { // 3x3
        for (var i = -1; i <= 1; i++) for (var j2 = -1; j2 <= 1; j2++) if (Math.abs(i) + Math.abs(j2) < 2) put(x + i, y + j2, ic);
        put(x, y, '#101418'); put(x - 1, y - 1, spec.eyeHi || '#f4efe0'); if (er >= 1.5) put(x + 1, y, '#101418');
      } else { put(x, y, ic); put(x + 1, y, ic); put(x, y + 1, ic); put(x + 1, y + 1, '#101418'); put(x, y, spec.eyeHi || '#f4efe0'); }
    };
    eyeAt(ex, ey);
    var eyes = [[ex, ey]];
    if (tp.twoeyes) { eyeAt(ex + 3, ey + 4); eyes.push([ex + 3, ey + 4]); }

    /* outline: any empty pixel touching the fish; fins get a darker version of their colour on the body side */
    var fill = function (x, y) { return x >= 0 && x < W && y >= 0 && y < H && G[y * W + x] != null; }, O = [];
    for (y = 0; y < H; y++) for (var xx = 0; xx < W; xx++) {
      if (G[y * W + xx] == null && (fill(xx - 1, y) || fill(xx + 1, y) || fill(xx, y - 1) || fill(xx, y + 1))) O.push([xx, y]);
    }
    O.forEach(function (p) { G[p[1] * W + p[0]] = ink; });
    /* where a fin meets the body, a darker seam */
    for (y = 0; y < H; y++) for (xx = 0; xx < W; xx++) {
      if ((FINM[y * W + xx] || TAILM[y * W + xx]) && !BODY[y * W + xx] && (isB(xx - 1, y) || isB(xx, y - 1) || isB(xx, y + 1)) && G[y * W + xx] !== ink) G[y * W + xx] = finEdge;
    }

    post.forEach(function (fn) { fn(); });

    G.ink = ink; G.eyes = eyes; G.body = BODY; G.scaly = SCALY.indexOf(spec.t) >= 0 && !spec.smooth;
    return G;
  }

  /* ---- the 16-bit pass: same size as the 8-bit drawing, but a colored (selective) outline, three-step shading from one light
     (top left), softened outline corners, and a palette of at most 16 colours, like a SNES sprite ---- */
  function quant(cells, K) {
    var cnt = {}, k, i, j;
    cells.forEach(function (c) { if (c) cnt[c] = (cnt[c] || 0) + 1; });
    var cols = Object.keys(cnt);
    if (cols.length <= K) return cells;
    var P = cols.map(function (c) { return { c: c, n: cnt[c], v: rgb(c) }; });
    var d2 = function (a, b) { var dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2]; return dr * dr * .3 + dg * dg * .59 + db * db * .11; };
    /* seeds: biggest colour first, then whichever colour is furthest from the seeds so far, weighted by sqrt of its pixel count */
    P.sort(function (a, b) { return b.n - a.n; });
    var seeds = [P[0].v];
    while (seeds.length < K) {
      var best = null, bs = -1;
      P.forEach(function (p) { var m = 1e9; seeds.forEach(function (s) { m = Math.min(m, d2(p.v, s)); }); var sc = m * Math.sqrt(p.n); if (sc > bs) { bs = sc; best = p; } });
      seeds.push(best.v);
    }
    for (var it = 0; it < 6; it++) {
      var sum = seeds.map(function () { return [0, 0, 0, 0]; });
      P.forEach(function (p) { var bi = 0, bd = 1e9; seeds.forEach(function (s, i2) { var d = d2(p.v, s); if (d < bd) { bd = d; bi = i2; } }); p.k = bi; for (j = 0; j < 3; j++) sum[bi][j] += p.v[j] * p.n; sum[bi][3] += p.n; });
      seeds = seeds.map(function (s, i2) { return sum[i2][3] ? [0, 1, 2].map(function (j2) { return sum[i2][j2] / sum[i2][3]; }) : s; });
    }
    var map = {};
    P.forEach(function (p) { var bi = 0, bd = 1e9; seeds.forEach(function (s, i2) { var d = d2(p.v, s); if (d < bd) { bd = d; bi = i2; } }); map[p.c] = hx(seeds[bi].map(Math.round)); });
    return cells.map(function (c) { return c ? map[c] : null; });
  }
  function up16(G, W, H, K) {
    var ink = G.ink, N = W * H, x, y, k, c, i, j, O = G.slice(0, N);
    var at = function (x, y) { return x >= 0 && y >= 0 && x < W && y < H ? G[y * W + x] : null; };
    var isOut = function (x, y) { var v = at(x, y); return v === ink && (at(x - 1, y) == null || at(x + 1, y) == null || at(x, y - 1) == null || at(x, y + 1) == null); };
    var solid = function (x, y) { var v = at(x, y); return v != null && !isOut(x, y); };
    /* distance (in pixels, 8-neighbour chamfer) from the edge of the coloured area */
    var d = new Float32Array(N), INF = 99, dv = function (x, y) { return x < 0 || y < 0 || x >= W || y >= H ? 0 : d[y * W + x]; };
    for (k = 0; k < N; k++) d[k] = solid(k % W, (k / W) | 0) ? INF : 0;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) if (d[y * W + x]) d[y * W + x] = Math.min(d[y * W + x], dv(x - 1, y) + 1, dv(x, y - 1) + 1, dv(x - 1, y - 1) + 1.4, dv(x + 1, y - 1) + 1.4);
    for (y = H - 1; y >= 0; y--) for (x = W - 1; x >= 0; x--) if (d[y * W + x]) d[y * W + x] = Math.min(d[y * W + x], dv(x + 1, y) + 1, dv(x, y + 1) + 1, dv(x + 1, y + 1) + 1.4, dv(x - 1, y + 1) + 1.4);
    var hh = function (x, y) { x = Math.max(0, Math.min(W - 1, x)); y = Math.max(0, Math.min(H - 1, y)); return Math.min(2.2, d[y * W + x]); };
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      k = y * W + x; c = G[k]; if (c == null) continue;
      if (isOut(x, y)) {
        /* selective outline: a dark version of the colours it touches, darker on the shadow side */
        var r = 0, g = 0, b = 0, n = 0;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; var v = at(x + dx, y + dy); if (v != null && v !== ink && !isOut(x + dx, y + dy)) { var a = rgb(v); r += a[0]; g += a[1]; b += a[2]; n++; } }
        if (n) { var base = hx([Math.round(r / n), Math.round(g / n), Math.round(b / n)]); O[k] = mix(shade(base, -.46 - (at(x, y + 1) == null || at(x + 1, y) == null ? .1 : 0)), '#1a1030', .16); }
        continue;
      }
      if (c === ink) continue;
      var gx = (hh(x + 1, y) - hh(x - 1, y)) / 2, gy = (hh(x, y + 1) - hh(x, y - 1)) / 2, lit = (-gx * -.45 + -gy * -.9);
      var l = lit > .32 ? 1 : lit < -.32 ? -1 : 0;
      O[k] = l ? (l > 0 ? hl16(c, .12) : sh16(c, .22)) : c;
    }
    /* soften stair-steps on the outline: a mid-tone pixel in each inside corner */
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) if (G[y * W + x] == null) {
      var L = at(x - 1, y) != null, R = at(x + 1, y) != null, U = at(x, y - 1) != null, D = at(x, y + 1) != null;
      if (!(L || R || U || D)) {
        var nb = [[-1, -1], [1, -1], [-1, 1], [1, 1]].filter(function (o) { return at(x + o[0], y + o[1]) != null; });
        if (nb.length === 1) { var ref = O[(y + nb[0][1]) * W + x + nb[0][0]]; if (ref && ref !== at(x + nb[0][0], y + nb[0][1]) || true) O[y * W + x] = null; }
      }
    }
    return quant(O.map(function (c) { return c ? sat(c, 1.14) : c; }), K || 16);
  }

  /* ---- the 32-bit pass ---- */
  var SCALY = ['bass', 'sunfish', 'crappie', 'perch', 'walleye', 'drum', 'carp', 'snapper', 'seabass', 'jack', 'tuna', 'mahi', 'tarpon', 'snook', 'bluefish', 'shad', 'deep', 'grayling', 'cod'];
  var W2 = W * 2, H2 = H * 2, BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], tcache = {};
  /* lighter and a little warmer for l > 0, darker and a little cooler for l < 0 */
  function tone(c, l) {
    var k = c + '|' + l; if (tcache[k]) return tcache[k];
    return tcache[k] = l === 0 ? c : l > 0 ? mix(shade(c, .10 * l), '#fff0c0', .06 * l) : mix(shade(c, .13 * l), '#2a2c6e', -.05 * l);
  }
  /* 16-bit tones: shadows turn warmer on light colours and bluer on dark ones, highlights turn warmer */
  function sat(c, k) { var a = rgb(c), l = a[0] * .3 + a[1] * .59 + a[2] * .11; return hx(a.map(function (v) { return Math.max(0, Math.min(255, Math.round(l + (v - l) * k))); })); }
  function sh16(c, a) { var t = luma(c) > 150 ? '#a8683a' : '#1c2a66'; return mix(shade(c, -a * .6), t, a * .28); }
  function hl16(c, a) { return mix(shade(c, a), '#fff0b0', .14); }
  function luma(c) { var a = rgb(c); return a[0] * .3 + a[1] * .59 + a[2] * .11; }
  function up32(G, W, H) {
    var W2 = W * 2, H2 = H * 2, ink = G.ink, i, j, x, y, k, c;
    var sol = function (x, y) { return x >= 0 && x < W && y >= 0 && y < H && G[y * W + x] != null; };
    /* 1. drop the old one-pixel outline, we draw a finer one later */
    var A = new Array(W * H);
    for (j = 0; j < H; j++) for (i = 0; i < W; i++) {
      c = G[j * W + i];
      A[j * W + i] = c != null && !(c === ink && (!sol(i - 1, j) || !sol(i + 1, j) || !sol(i, j - 1) || !sol(i, j + 1))) ? c : null;
    }
    /* whiskers, legs and other one-pixel lines stay as thin as they were: no growing, no outline */
    var th = function (x, y) {
      if (!A[y * W + x]) return false;
      var s = function (xx, yy) { return xx >= 0 && yy >= 0 && xx < W && yy < H && A[yy * W + xx] != null; };
      return !((s(x + 1, y) && s(x, y + 1) && s(x + 1, y + 1)) || (s(x - 1, y) && s(x, y + 1) && s(x - 1, y + 1)) || (s(x + 1, y) && s(x, y - 1) && s(x + 1, y - 1)) || (s(x - 1, y) && s(x, y - 1) && s(x - 1, y - 1)));
    };
    var TH = new Uint8Array(W2 * H2);
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) if (th(x, y)) { TH[2 * y * W2 + 2 * x] = TH[2 * y * W2 + 2 * x + 1] = TH[(2 * y + 1) * W2 + 2 * x] = TH[(2 * y + 1) * W2 + 2 * x + 1] = 1; }
    /* 2. double it, rounding off the stair-steps (EPX) */
    var B = new Array(W2 * H2), a = function (x, y) { return x >= 0 && x < W && y >= 0 && y < H && !TH[2 * y * W2 + 2 * x] ? A[y * W + x] : null; };
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var P = A[y * W + x], tp0 = TH[2 * y * W2 + 2 * x], U = a(x, y - 1), R = a(x + 1, y), Lf = a(x - 1, y), Dn = a(x, y + 1), p1 = P, p2 = P, p3 = P, p4 = P;
      if (Lf === U && Lf !== Dn && U !== R) p1 = U;
      if (U === R && U !== Lf && R !== Dn) p2 = R;
      if (Dn === Lf && Dn !== R && Lf !== U) p3 = Lf;
      if (R === Dn && R !== U && Dn !== Lf) p4 = Dn;
      if (tp0) { p1 = p2 = p3 = p4 = P; }
      B[2 * y * W2 + 2 * x] = p1; B[2 * y * W2 + 2 * x + 1] = p2; B[(2 * y + 1) * W2 + 2 * x] = p3; B[(2 * y + 1) * W2 + 2 * x + 1] = p4;
    }
    /* 3. grow the shape by one fine pixel to take the place of the old outline */
    var F = B.slice(), b2 = function (x, y) { return x >= 0 && x < W2 && y >= 0 && y < H2 ? B[y * W2 + x] : null; };
    for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) if (B[y * W2 + x] == null) {
      var nb = (!TH[y * W2 + x - 1] && b2(x - 1, y)) || (!TH[(y - 1) * W2 + x] && b2(x, y - 1)) || (!TH[y * W2 + x + 1] && b2(x + 1, y)) || (!TH[(y + 1) * W2 + x] && b2(x, y + 1));
      if (nb) F[y * W2 + x] = nb;
    }
    var M = function (x, y) { return x >= 0 && x < W2 && y >= 0 && y < H2 && F[y * W2 + x] != null; };
    /* 4. distance from the edge, then a height bump from it, for the light */
    var N = W2 * H2, d = new Float32Array(N), INF = 1e5, at = function (x, y) { return x < 0 || y < 0 || x >= W2 || y >= H2 ? 0 : d[y * W2 + x]; };
    for (k = 0; k < N; k++) d[k] = F[k] != null ? INF : 0;
    for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) if (d[y * W2 + x]) d[y * W2 + x] = Math.min(d[y * W2 + x], at(x - 1, y) + 3, at(x, y - 1) + 3, at(x - 1, y - 1) + 4, at(x + 1, y - 1) + 4);
    for (y = H2 - 1; y >= 0; y--) for (x = W2 - 1; x >= 0; x--) if (d[y * W2 + x]) d[y * W2 + x] = Math.min(d[y * W2 + x], at(x + 1, y) + 3, at(x, y + 1) + 3, at(x + 1, y + 1) + 4, at(x - 1, y + 1) + 4);
    var hgt = new Float32Array(N), hb = new Float32Array(N);
    for (k = 0; k < N; k++) hgt[k] = Math.min(2.6, Math.sqrt(d[k] / 3));
    for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) { var sm = 0, cn = 0; for (var yy = -1; yy <= 1; yy++) for (var xx = -1; xx <= 1; xx++) { var X = x + xx, Y = y + yy; if (X >= 0 && Y >= 0 && X < W2 && Y < H2) { sm += hgt[Y * W2 + X]; cn++; } } hb[y * W2 + x] = sm / cn; }
    var Lx = -.35, Ly = -.78, Lz = .55, ll = Math.sqrt(Lx * Lx + Ly * Ly + Lz * Lz); Lx /= ll; Ly /= ll; Lz /= ll;
    var H_ = function (x, y) { x = Math.max(0, Math.min(W2 - 1, x)); y = Math.max(0, Math.min(H2 - 1, y)); return hb[y * W2 + x]; };
    var OUT = new Array(N), lvl = new Int8Array(N);
    for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) {
      k = y * W2 + x; if (F[k] == null) continue;
      var gx = (H_(x + 1, y) - H_(x - 1, y)) / 2, gy = (H_(x, y + 1) - H_(x, y - 1)) / 2, nx = -gx * 1.2, ny = -gy * 1.2, nl = Math.sqrt(nx * nx + ny * ny + 1);
      var delta = (nx * Lx + ny * Ly + Lz) / nl - Lz, v = delta * 3.4 * (G.amp == null ? 1 : G.amp) + (BAY[(y & 3) * 4 + (x & 3)] / 16 - .5) * .4;
      var lv = Math.max(-2, Math.min(2, Math.round(v))); lvl[k] = lv;
      OUT[k] = tone(F[k], lv);
    }
    /* 5. fish scales: a faint diamond pattern on scaly bodies */
    if (G.scaly && G.body) for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) {
      k = y * W2 + x; if (OUT[k] == null || !G.body[(y >> 1) * W + (x >> 1)] || d[k] < 9) continue;
      if ((y & 1) === 1 && ((x + ((y >> 1) & 1) * 2) & 7) === 0 && lvl[k] >= 0) OUT[k] = tone(F[k], lvl[k] - 1);
    }
    /* 6. glint in the eye: a small bright pixel on the upper left of each dark round spot */
    var seen = new Uint8Array(N), nearEye = function (kk) { var qx = kk % W2, qy = (kk - qx) / W2; return (G.eyes || []).some(function (e) { return Math.abs(qx - 2 * e[0] - 2) <= 5 && Math.abs(qy - 2 * e[1] - 2) <= 5; }); };
    for (k = 0; k < N; k++) if (OUT[k] != null && !seen[k] && luma(F[k]) < 55 && d[k] >= 6 && nearEye(k)) {
      var st = [k], comp = [], mnx = 1e9, mny = 1e9, mxx = -1, mxy = -1, edgeish = false; seen[k] = 1;
      while (st.length && comp.length < 60) {
        var q = st.pop(), qx = q % W2, qy = (q - qx) / W2; comp.push(q);
        mnx = Math.min(mnx, qx); mxx = Math.max(mxx, qx); mny = Math.min(mny, qy); mxy = Math.max(mxy, qy);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (o) { var X = qx + o[0], Y = qy + o[1]; if (X < 0 || Y < 0 || X >= W2 || Y >= H2) return; var kk = Y * W2 + X; if (!seen[kk] && OUT[kk] != null && luma(F[kk]) < 55) { seen[kk] = 1; st.push(kk); if (d[kk] < 6) edgeish = true; } });
      }
      var bw = mxx - mnx + 1, bh = mxy - mny + 1;
      if (!edgeish && comp.length >= 3 && comp.length <= 30 && bw <= 6 && bh <= 6 && comp.length >= bw * bh * .6) { var hx0 = mnx + (bw > 2 ? 1 : 0), hy0 = mny + (bh > 2 ? 1 : 0); OUT[hy0 * W2 + hx0] = '#f4efe0'; }
    }
    /* 7. a fine outline, in a dark tone of whatever it touches (selective outlining) */
    var ok = function (x, y) { return x >= 0 && x < W2 && y >= 0 && y < H2 && F[y * W2 + x] != null; };
    for (y = 0; y < H2; y++) for (x = 0; x < W2; x++) if (F[y * W2 + x] == null) {
      var nc = (ok(x, y + 1) && !TH[(y + 1) * W2 + x] && F[(y + 1) * W2 + x]) || (ok(x - 1, y) && !TH[y * W2 + x - 1] && F[y * W2 + x - 1]) || (ok(x + 1, y) && !TH[y * W2 + x + 1] && F[y * W2 + x + 1]) || (ok(x, y - 1) && !TH[(y - 1) * W2 + x] && F[(y - 1) * W2 + x]);
      if (nc) OUT[y * W2 + x] = G.fixInk || mix(shade(nc, -.5), '#0b0f18', .45);
    }
    return OUT;
  }

  /* grid -> SVG runs, one path per colour */
  function toSvg(G, W, H) {
    var byCol = {}, y, xx;
    for (y = 0; y < H; y++) {
      var run = null;
      for (xx = 0; xx <= W; xx++) {
        var cv = xx < W ? G[y * W + xx] : null;
        if (run && cv !== run.c) { (byCol[run.c] = byCol[run.c] || []).push('M' + run.x + ' ' + y + 'h' + (xx - run.x) + 'v1h-' + (xx - run.x) + 'z'); run = null; }
        if (!run && cv) run = { c: cv, x: xx };
      }
    }
    return Object.keys(byCol).map(function (cc) { return '<path fill="' + cc + '" d="' + byCol[cc].join('') + '"/>'; }).join('');
  }
  /* the raw pixel grid (for drawing onto a canvas): { w, h, g } where g[y * w + x] is a colour or null */
  /* grid(spec): { w, h, g, k, lw, lh }: k cells make one 8-bit pixel, lw x lh is the size in 8-bit pixels */
  function grid(spec, opt) {
    var bits = (opt && opt.bits) || root.FishArt.bits, e = entry(spec, bits);
    return bits >= 32 ? { w: W2, h: H2, g: e.h, k: 2, lw: W, lh: H } : { w: W, h: H, g: bits === 16 ? e.m : e.g, k: 1, lw: W, lh: H };
  }

  /* up(cells, w, h, ink, opts): the 32-bit pass on any small grid (used for the logo); cells is an array of colours or null */
  function up(cells, w, h, ink, opts) { var G = cells.slice(); G.ink = ink; G.scaly = false; G.eyes = (opts && opts.eyes) || null; G.amp = opts && opts.amp; G.fixInk = opts && opts.fixInk; return up32(G, w, h); }
  /* sprite16(cells, w, h, ink, opts): a small hand-built picture (colours or null) gets a one-pixel outline, then the 16-bit pass.
     Used for the logo and the weather icons. Leave a one-pixel empty border for the outline. */
  function sprite16(cells, w, h, ink, opts) {
    var G = cells.slice(), x, y;
    var f = function (x, y) { return x >= 0 && y >= 0 && x < w && y < h && cells[y * w + x] != null; };
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) if (cells[y * w + x] == null && (f(x - 1, y) || f(x + 1, y) || f(x, y - 1) || f(x, y + 1))) G[y * w + x] = ink;
    G.ink = ink; G.scaly = false;
    var out = up16(G, w, h, opts && opts.k);
    if (opts && opts.solid) for (var q = 0; q < G.length; q++) if (G[q] === ink && out[q]) out[q] = ink;
    if (opts && opts.keep) opts.keep.forEach(function (k) { out[k[1] * w + k[0]] = k[2]; });
    return out;
  }
  root.FishArt = { sprite16: sprite16, up: up, draw: draw, grid: grid, bits: 16, templates: Object.keys(T) };
})(typeof window !== 'undefined' ? window : this);
