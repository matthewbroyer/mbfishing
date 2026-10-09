/* pixel-kit.js: a tiny 5x7 pixel font and small 16-bit weather icons, drawn onto a canvas with plain rectangles.
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

  /* 16-bit weather icons: 16x16, shaded, with a coloured outline. Letters are palette keys. */
  var C = { a: '#fff1a0', b: '#ffd23f', c: '#f2a01e', d: '#b8661a', e: '#ffffff', f: '#e6eff6', g: '#bdcfdf', h: '#6f879e', i: '#b1bfcb', j: '#8392a2', k: '#5d6c80', l: '#34425a', m: '#8ad0f4', n: '#3f8fd0' };
  var ICONS = {
    sun: ['................', '.......c........', '.......b........', '...c..dddd..c...', '....bdaabbdb....', '....dbbbbbbd....', '...dbbbbbbbbd...', '...dbbbbbbbbd...', '.cbdbbbbbbccdbc.', '...dbbbcccccd...', '....dccccccd....', '....bdccccdb....', '...c..dddd..c...', '........b.......', '........c.......', '................'],
    part: ['.....b..........', '.c.dddd.bc......', '..daabbd........', '.dbbbbbbd.......', '.dbbbbbbd.......', 'bdbbbbccd.hh....', '.dbccccchhefhh..', '..dcccchffffffh.', '.b.ddddhffffffh.', '.c....hfffffffh.', '.....hfffffffggh', '.....hfffggggggh', '.....hgggggggggh', '......hggggggggh', '.......hhhhhhhh.', '................'],
    cloud: ['................', '................', '.......hhh......', '.....hheefh.....', '....hffffffh....', '...hffffffffh...', '...hffffffffh...', '..hffffffffffh..', '.hffffffffffggh.', '.hffffffgggggggh', '.hffgggggggggggh', '.hggggggggggggh.', '.hgggggggggggh..', '..hhhhhhhhhhh...', '................', '................'],
    dark: ['................', '................', '.......lll......', '.....lliijl.....', '....ljjjjjjl....', '...ljjjjjjjjl...', '...ljjjjjjjjl...', '..ljjjjjjjjjjl..', '.ljjjjjjjjjjkkl.', '.ljjjjjjkkkkkkkl', '.ljjkkkkkkkkkkkl', '.lkkkkkkkkkkkkl.', '.lkkkkkkkkkkkl..', '..lllllllllll...', '................', '................'],
    rain: ['......lllll.....', '.....liiijjl....', '....ljjjjjjl....', '..lljjjjjjjjll..', '.ljjjjjjjjjjjjl.', '.ljjjjjjjjjkkkl.', '.ljjjjkkkkkkkkl.', '.lkkkkkkkkkkkkl.', '.lkkkkkkkkkkkl..', '..lllllllllll...', '................', '.....m.......m..', '.....n...m...n..', '.........n......', '.......m...m....', '................']
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
