/* pixel-kit.js: a tiny 5x7 pixel font and small weather icons, drawn onto a canvas with plain rectangles.
   Used by the share card in index.html. No network, no images, no font files. */
(function (root) {
  'use strict';
  var F = {
    A: '.XXX.|X...X|X...X|XXXXX|X...X|X...X|X...X', B: 'XXXX.|X...X|X...X|XXXX.|X...X|X...X|XXXX.',
    C: '.XXXX|X....|X....|X....|X....|X....|.XXXX', D: 'XXXX.|X...X|X...X|X...X|X...X|X...X|XXXX.',
    E: 'XXXXX|X....|X....|XXXX.|X....|X....|XXXXX', F: 'XXXXX|X....|X....|XXXX.|X....|X....|X....',
    G: '.XXXX|X....|X....|X..XX|X...X|X...X|.XXXX', H: 'X...X|X...X|X...X|XXXXX|X...X|X...X|X...X',
    I: 'XXXXX|..X..|..X..|..X..|..X..|..X..|XXXXX', J: '..XXX|...X.|...X.|...X.|...X.|X..X.|.XX..',
    K: 'X...X|X..X.|X.X..|XX...|X.X..|X..X.|X...X', L: 'X....|X....|X....|X....|X....|X....|XXXXX',
    M: 'X...X|XX.XX|X.X.X|X.X.X|X...X|X...X|X...X', N: 'X...X|XX..X|X.X.X|X..XX|X...X|X...X|X...X',
    O: '.XXX.|X...X|X...X|X...X|X...X|X...X|.XXX.', P: 'XXXX.|X...X|X...X|XXXX.|X....|X....|X....',
    Q: '.XXX.|X...X|X...X|X...X|X.X.X|X..X.|.XX.X', R: 'XXXX.|X...X|X...X|XXXX.|X.X..|X..X.|X...X',
    S: '.XXXX|X....|X....|.XXX.|....X|....X|XXXX.', T: 'XXXXX|..X..|..X..|..X..|..X..|..X..|..X..',
    U: 'X...X|X...X|X...X|X...X|X...X|X...X|.XXX.', V: 'X...X|X...X|X...X|X...X|X...X|.X.X.|..X..',
    W: 'X...X|X...X|X...X|X.X.X|X.X.X|XX.XX|X...X', X: 'X...X|X...X|.X.X.|..X..|.X.X.|X...X|X...X',
    Y: 'X...X|X...X|.X.X.|..X..|..X..|..X..|..X..', Z: 'XXXXX|....X|...X.|..X..|.X...|X....|XXXXX',
    0: '.XXX.|X...X|X..XX|X.X.X|XX..X|X...X|.XXX.', 1: '..X..|.XX..|..X..|..X..|..X..|..X..|.XXX.',
    2: '.XXX.|X...X|....X|...X.|..X..|.X...|XXXXX', 3: 'XXXX.|....X|....X|.XXX.|....X|....X|XXXX.',
    4: '...X.|..XX.|.X.X.|X..X.|XXXXX|...X.|...X.', 5: 'XXXXX|X....|XXXX.|....X|....X|X...X|.XXX.',
    6: '.XXX.|X....|X....|XXXX.|X...X|X...X|.XXX.', 7: 'XXXXX|....X|...X.|..X..|.X...|.X...|.X...',
    8: '.XXX.|X...X|X...X|.XXX.|X...X|X...X|.XXX.', 9: '.XXX.|X...X|X...X|.XXXX|....X|....X|.XXX.',
    '.': '.....|.....|.....|.....|.....|.....|..X..', ',': '.....|.....|.....|.....|.....|..X..|.X...',
    ':': '.....|..X..|.....|.....|.....|..X..|.....', '-': '.....|.....|.....|XXXXX|.....|.....|.....',
    '+': '.....|..X..|..X..|XXXXX|..X..|..X..|.....', "'": '..X..|..X..|.....|.....|.....|.....|.....',
    '(': '...X.|..X..|.X...|.X...|.X...|..X..|...X.', ')': '.X...|..X..|...X.|...X.|...X.|..X..|.X...',
    '/': '....X|....X|...X.|..X..|.X...|X....|X....', '%': 'XX..X|XX..X|...X.|..X..|.X...|X..XX|X..XX',
    '°': '.XX..|X..X.|.XX..|.....|.....|.....|.....', '!': '..X..|..X..|..X..|..X..|..X..|.....|..X..',
    '?': '.XXX.|X...X|....X|...X.|..X..|.....|..X..', '×': '.....|X...X|.X.X.|..X..|.X.X.|X...X|.....',
    '#': '.X.X.|XXXXX|.X.X.|.X.X.|.X.X.|XXXXX|.X.X.', '&': '.XX..|X..X.|X.X..|.X...|X.X.X|X..X.|.XX.X',
    '\u00b7': '.....|.....|.....|..X..|.....|.....|.....', '"': '.X.X.|.X.X.|.....|.....|.....|.....|.....',
    ' ': '.....|.....|.....|.....|.....|.....|.....'
  };
  var G = {};
  Object.keys(F).forEach(function (k) { G[k] = F[k].split('|'); });

  function clean(t) {
    t = String(t == null ? '' : t);
    try { t = t.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) { }
    return t.toUpperCase().replace(/[\u2019\u2018]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ');
  }
  function width(t, s) { t = clean(t); return t.length ? (t.length * 6 - 1) * s : 0; }
  /* draw text with the top-left at (x, y); align 'left' | 'center' | 'right'. Unknown characters are skipped. */
  function text(g, t, x, y, s, color, align) {
    t = clean(t);
    var w = width(t, s);
    if (align === 'center') x -= w / 2; else if (align === 'right') x -= w;
    x = Math.round(x);
    g.fillStyle = color;
    for (var i = 0; i < t.length; i++) {
      var gl = G[t[i]];
      if (!gl) continue;
      for (var r = 0; r < 7; r++) for (var c = 0; c < 5; c++) if (gl[r][c] === 'X') g.fillRect(x + (i * 6 + c) * s, y + r * s, s, s);
    }
    return w;
  }
  /* shrink the scale until the text fits maxW, then draw it. Returns the scale used. */
  function fit(g, t, x, y, s, maxW, color, align) {
    while (s > 1 && width(t, s) > maxW) s--;
    text(g, t, x, y, s, color, align);
    return s;
  }

  var C = { W: '#ffffff', G: '#b9c4cc', Y: '#f2b640', O: '#e08a1e', B: '#4aa3e0', K: '#8d9aa5' };
  var ICONS = {
    sun: ['....Y....', '.Y..Y..Y.', '..YYYYY..', '..YYYYY..', 'Y.YYYYY.Y', '..YYYYY..', '..YYYYY..', '.Y..Y..Y.', '....Y....'],
    part: ['...Y......', '.Y.Y..Y...', '..YYY.....', '.YYYYYWWW.', '..YYWWWWWW', '...WWWWWWW', '..WWWWWWWW', '...WWWWWW.'],
    cloud: ['....WWW....', '..WWWWWWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.GGGGGGGGG.'],
    dark: ['....KKK....', '..KKKKKKK..', '.KKKKKKKKK.', 'KKKKKKKKKKK', 'KKKKKKKKKKK', '.GGGGGGGGG.'],
    rain: ['....KKK....', '..KKKKKKK..', '.KKKKKKKKK.', 'KKKKKKKKKKK', '.GGGGGGGGG.', '..B..B..B..', '.B..B..B...']
  };
  /* weather icon for a trip's weather record, or null. */
  function wxIcon(w) {
    if (!w || w.tempF == null) return null;
    if (w.precip > 0.05) return 'rain';
    var c = w.cloud;
    if (c == null) return null;
    return c < 20 ? 'sun' : c < 50 ? 'part' : c < 85 ? 'cloud' : 'dark';
  }
  function icon(g, name, x, y, s) {
    var ic = ICONS[name]; if (!ic) return 0;
    for (var r = 0; r < ic.length; r++) for (var c = 0; c < ic[r].length; c++) { var k = ic[r][c]; if (k !== '.') { g.fillStyle = C[k]; g.fillRect(x + c * s, y + r * s, s, s); } }
    return ic[0].length * s;
  }
  /* draw a fish grid from FishArt.grid() at integer scale s */
  function sprite(g, grid, x, y, s) {
    for (var yy = 0; yy < grid.h; yy++) for (var xx = 0; xx < grid.w; xx++) { var c = grid.g[yy * grid.w + xx]; if (c) { g.fillStyle = c; g.fillRect(x + xx * s, y + yy * s, s, s); } }
  }
  root.PixelKit = { text: text, width: width, fit: fit, icon: icon, wxIcon: wxIcon, sprite: sprite };
})(typeof window !== 'undefined' ? window : this);
