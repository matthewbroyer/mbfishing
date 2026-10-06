/* species-data.js: Species guide data for the Fishing app.
   Every how-to-catch and ID statement was summarized from the pages listed in that species' "src"; a trailing ^1,2 on a
   line means "from source 1 and 2 of this species". Regions are our own rough grouping, drawn from the range notes in
   those pages, so treat them as a guide to what is commonly caught, not a range map. Nothing here is legal advice. */
(function (root) {
  'use strict';
  var REGIONS = [
    { id: 'ne', n: 'Northeast', s: 'ME, NH, VT, MA, RI, CT, NY, NJ, PA · Atlantic Canada' },
    { id: 'se', n: 'Southeast', s: 'DE, MD, VA, WV, NC, SC, GA, FL, AL, MS, TN, KY' },
    { id: 'sc', n: 'South-Central & Gulf', s: 'TX, LA, AR, OK, MO · Gulf coast' },
    { id: 'gl', n: 'Great Lakes & Upper Midwest', s: 'MN, WI, MI, IL, IN, OH, IA · Ontario' },
    { id: 'gp', n: 'Great Plains', s: 'ND, SD, NE, KS · Prairie provinces' },
    { id: 'mw', n: 'Rocky Mountains', s: 'MT, WY, ID, CO, UT, NM · Alberta' },
    { id: 'pn', n: 'Pacific Northwest', s: 'WA, OR · British Columbia' },
    { id: 'ca', n: 'California & Southwest', s: 'CA, NV, AZ' },
    { id: 'ak', n: 'Alaska & Yukon', s: 'Alaska · Yukon' }
  ];
  /* Where each kind of source lives. A src entry is [type, slug, optional title]. */
  var SRC_TYPES = {
    tmf: { p: 'Take Me Fishing (Recreational Boating & Fishing Foundation)', u: function (s) { return 'https://www.takemefishing.org/' + s + '/'; } },
    me: { p: 'Maine Dept. of Inland Fisheries & Wildlife', u: function (s) { return 'https://www.maine.gov/ifw/fish-wildlife/fisheries/species-information/' + s + '.html'; } },
    mn: { p: 'Minnesota Dept. of Natural Resources', u: function (s) { return 'https://www.dnr.state.mn.us/gofishing/how-catch-' + s + '.html'; } },
    ma: { p: 'Massachusetts Division of Marine Fisheries', u: function (s) { return 'https://www.mass.gov/info-details/learn-about-' + s; } },
    or: { p: 'Oregon Dept. of Fish & Wildlife', u: function (s) { return 'https://myodfw.com/fishing/species/' + s; } },
    nc: { p: 'North Carolina Wildlife Resources Commission', u: function (s) { return 'https://www.ncwildlife.gov/species/' + s; } },
    tx: { p: 'Texas Parks & Wildlife Department', u: function (s) { return 'https://tpwd.texas.gov/huntwild/wild/species/' + s + '/'; } },
    ny: { p: 'New York State Dept. of Environmental Conservation', u: function (s) { return 'https://dec.ny.gov/things-to-do/freshwater-fishing/learn-to-fish/tips-skills/' + s; } },
    url: { p: '', u: function (s) { return s; } }
  };
  var SP = [];
  var A = function (o) { SP.push(o); };
  /* ---------- bass, temperate bass, panfish, perch family ---------- */
  A({ id: 'largemouth-bass', n: 'Largemouth Bass', sci: 'Micropterus salmoides', w: 'f', r: 'ne3 se3 sc3 gl3 gp3 mw1 pn2 ca3', al: ['largemouth', 'bass', 'black bass', 'bucketmouth'],
    art: { t: 'bass', dep: 1.15, back: '#4e5d2b', side: '#8a9a4f', belly: '#ece8c6', fin: '#7d8c46', eye: '#a24a2a', m: [{ k: 'blotch', c: '#1f2a12', o: .62, y: .02, th: .2, jag: 1 }] },
    idm: ['Mouth reaches to or past the back edge of the eye ^1,2,4', 'Dark blotches form a jagged stripe along each side ^2,4', 'Dorsal fin is almost split in two by a deep dip ^1,4', 'Olive-green back, lighter green sides, white belly ^2'],
    lk: [['Smallmouth Bass', 'Its upper jaw does not reach past the eye. ^2'], ['Spotted Bass', 'Scales on the base of the second dorsal fin and rows of spots below the lateral line.']],
    bait: 'Soft plastics (worms, crayfish, minnow shapes), spinnerbaits, crankbaits, topwater lures and jigs. Live bait works too: minnows, nightcrawlers, crayfish. ^1,3,5,6',
    tech: ['Work the outside edge of weed beds. Cast, retrieve with pauses, and drag lures slowly along the bottom. ^5', 'Cast plastic worms with little weight so they sink slowly, and bury the hook in the plastic to make it weedless. ^6', 'Surface lures (frogs, poppers) are best around morning and dusk. ^6'],
    where: ['Weed beds and weedy drop-offs ^2', 'Submerged vegetation, brush piles, stumps, boat docks and standing timber ^3', 'Points, humps, drop-offs and bridge pilings ^3', 'Lily pads, bulrush stands and fallen trees ^6'],
    when: ['New York: shallow weedy areas from mid-June through August, in 60–75°F water. ^5', 'Minnesota: best in spring, fall, early morning and dusk. ^6', 'Spawn in spring when water reaches about 60°F. ^4'],
    tip: ['“Will pretty much eat anything they can fit in their oversized mouths.” Fish predictable patterns and repeat spots that work. ^5'],
    src: [['tmf', 'largemouth-bass', 'Largemouth Bass'], ['me', 'largemouth-bass', 'Largemouth Bass: Species Information'], ['nc', 'largemouth-bass-0', 'Largemouth Bass'], ['tx', 'lmb', 'Largemouth Bass (Micropterus salmoides)'], ['ny', 'fishing-for-largemouth-smallmouth-bass', 'Fishing for Largemouth and Smallmouth Bass'], ['mn', 'largemouth-bass', 'How to catch a largemouth bass']] });

  A({ id: 'smallmouth-bass', n: 'Smallmouth Bass', sci: 'Micropterus dolomieu', w: 'f', r: 'ne3 se2 sc1 gl3 gp2 mw1 pn2', al: ['smallmouth', 'bronzeback', 'bass'],
    art: { t: 'bass', dep: 1.08, back: '#6b5b2c', side: '#a99553', belly: '#eee5c0', fin: '#8a7a42', eye: '#c2392b', m: [{ k: 'bars', at: [.3, .38, .46, .54, .62, .7], w: 4, c: '#3c3016', o: .35 }, { k: 'eyebars', c: '#3c3016', o: .5 }] },
    idm: ['Dorsal fins are clearly connected, with no deep notch ^1', 'Dark bars along the sides, and bars radiating back from the eye ^1,2', 'Red or orange-ish eyes ^1', 'Green to bronze body ^2', 'Upper jaw does not reach past the eye ^2'],
    lk: [['Largemouth Bass', 'Its mouth reaches past the eye and its dorsal fin is nearly split.']],
    sz: 'In Maine 2–3 lb is typical and over 5 lb is rare ^2. The species can reach almost 12 lb ^1.',
    bait: 'Spinners, crankbaits, stickbaits, jigs, soft plastics (Ned rig, drop shot, tube jigs), plus minnows, worms and nightcrawlers. ^2,3,4',
    tech: ['Start shallow and work deeper: cast, let the lure sink, jig it vertically or drag it along the bottom with pauses. ^3', 'Cast or troll hard plastic lures along rocky shorelines. Bounce jigs along rocky structure in deeper water. ^4'],
    where: ['Rocky areas, rocky drop-offs, woody debris and weed beds ^2,3', 'Rocky shoals, reefs and drop-offs; in rivers, riffles, eddies and pools ^4', 'They prefer deeper water than largemouth, and clear, fast streams over gravel and rubble. ^1'],
    when: ['Maine, spring and summer: rocky areas in 5–15 ft of water. ^2', 'New York: rocky areas in 5–35 ft from mid-June through August, in 60–75°F water. ^3'],
    tip: ['“One of the hardest fighting freshwater fish.” ^3', 'Try different lure colors depending on water clarity and light. ^4'],
    src: [['tmf', 'smallmouth-bass', 'Smallmouth Bass'], ['me', 'smallmouth-bass', 'Smallmouth Bass: Species Information'], ['ny', 'fishing-for-largemouth-smallmouth-bass', 'Fishing for Largemouth and Smallmouth Bass'], ['mn', 'smallmouth-bass', 'How to catch a smallmouth bass']] });

  A({ id: 'spotted-bass', n: 'Spotted Bass', sci: 'Micropterus punctulatus', w: 'f', r: 'se2 sc3 gl1 gp1 ca1', al: ['kentucky bass', 'spots', 'bass'],
    art: { t: 'bass', dep: 1.0, back: '#556b2f', side: '#98a95e', belly: '#eef0d0', fin: '#7e9150', m: [{ k: 'blotch', c: '#222', o: .4, y: -.02, th: .13, dash: '6 5' }, { k: 'spots', n: 34, r: [.8, 1.4], c: '#1c1c1c', o: .6, y: [.1, .55], x: [.2, .8] }] },
    idm: ['Scales on the base of the second dorsal fin; dorsal fins are connected ^1', 'Upper jaw does not extend past the back of the eye ^1', 'No broad midline stripe like a largemouth, and no vertical bars like a smallmouth ^1', 'Rows of dark spots below the lateral line ^1'],
    lk: [['Largemouth Bass', 'Its mouth reaches well past the eye and it has a broad dark stripe.'], ['Smallmouth Bass', 'Vertical bars instead of spots below the lateral line.']],
    bait: 'Jigs, plugs, spinnerbaits, minnows, soft plastics and spoons. ^1',
    tech: ['Bait casting, spin casting, drift fishing and still fishing. ^1'],
    where: ['Central and lower Mississippi Basin to the Gulf of Mexico, including Texas, the Florida panhandle, Georgia, Alabama, Tennessee and Kentucky. ^1', 'Some live as deep as 100 ft. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    src: [['tmf', 'spotted-bass', 'Spotted Bass']] });

  A({ id: 'white-bass', n: 'White Bass', sci: 'Morone chrysops', w: 'f', r: 'se2 sc3 gl2 gp3', al: ['sand bass', 'silver bass'],
    art: { t: 'bass', dep: .98, back: '#5d6a63', side: '#c9d0cc', belly: '#f5f7f4', fin: '#aab3ae', eye: '#d6d6c8', m: [{ k: 'stripe', ys: [-.5, -.28, -.06, .16, .38], c: '#34443e', w: 1.2, o: .65 }] },
    idm: ['Silvery-white sides with black stripes ^1', 'Shorter and stockier than a striped bass ^1', 'Protruding, bass-like lower jaw ^1'],
    lk: [['Striped Bass', 'Longer and slimmer, with more prominent, regular stripes.'], ['Wiper', 'A white bass–striped bass hybrid with broken stripes.']],
    bait: 'Minnows, spinnerbaits, jigs, plugs, spoons and flies. ^1',
    tech: ['Drift fishing, trolling, fly fishing and still fishing. ^1'],
    where: ['Cliffs, gradual shores, inlets and outlets, islands, open water, docks, rocks, spring holes and weed beds. ^1', 'Clear lakes and reservoirs; native to the Mississippi and Ohio valleys and the Great Lakes. ^1'],
    tip: ['“Excellent light tackle fish that will take a bait or lure readily.” ^1'],
    src: [['tmf', 'white-bass', 'White Bass']] });

  A({ id: 'striped-bass', n: 'Striped Bass', sci: 'Morone saxatilis', w: 'b', r: 'ne3 se3 sc2 gp1 ca2 pn1', al: ['striper', 'stripers', 'rockfish', 'linesider', 'bass'],
    art: { t: 'bass', dep: .93, back: '#4b5f6a', side: '#aab7bd', belly: '#f2f4f3', fin: '#7f929b', eye: '#3a3a3a', m: [{ k: 'stripe', ys: [-.62, -.42, -.22, -.02, .18, .36, .52], c: '#1e262b', w: 1.5, o: .75, x: [.14, .95] }] },
    idm: ['Seven or eight prominent black stripes along the scale rows ^1', 'Large mouth and jaws that extend below the eye ^2', 'Bluish to dark olive body with silver sides ^2'],
    lk: [['White Bass', 'Shorter and stockier, with less regular stripes. ^1']],
    sz: 'Typically under 50 lb, with females much larger than males. Over 100 lb is rare. ^2',
    bait: 'Plugs, live eels, herring, menhaden and mackerel. Also mullet, squid, crabs, clams, bloodworms, spoons, flies and jigs. ^1,2',
    tech: ['Surf casting with a 10–12 ft rod (30–40 lb line), or a medium-heavy rod with 12–20 lb line. ^2', 'From a boat, troll plugs, jigs or tubes. ^2', 'Jigging, fly fishing and drift fishing also work. ^1'],
    where: ['Currents, river mouths, shallow bays and rocky shores ^2', 'Bays, rivers and open ocean; some populations are landlocked in fresh water ^1'],
    when: ['Massachusetts: May through November. Best at dusk, dawn or night in summer. They move north in spring and summer and south in fall. ^2'],
    tip: ['Massachusetts requires circle hooks with natural bait (since 2021). Check your own state’s rules. ^2'],
    rng: 'St. Lawrence River to northern Florida on the Atlantic coast, and the Pacific coast from Washington to California. ^1,2',
    src: [['tmf', 'striped-bass', 'Striped Bass'], ['ma', 'striped-bass', 'Learn about striped bass']] });

  A({ id: 'wiper', n: 'Wiper (Hybrid Striped Bass)', sci: 'Morone chrysops × M. saxatilis', w: 'f', r: 'se1 sc2 gp2 mw1 ca1', al: ['hybrid striped bass', 'whiterock bass', 'palmetto bass', 'hybrid'],
    art: { t: 'bass', dep: 1.0, back: '#4f5c58', side: '#c6cec9', belly: '#f4f6f2', fin: '#9fa8a3', eye: '#c9c9bd', m: [{ k: 'stripe', ys: [-.55, -.32, -.1, .12, .34], c: '#2e3b36', w: 1.4, o: .7, dash: '9 4' }] },
    idm: ['Six to eight dark horizontal stripes on a silver-white body ^1', 'Back is dark charcoal to black ^1', 'Two dorsal fins; the front one has 8–10 sharp spines ^1'],
    lk: [['White Bass', 'Smaller, with a stockier build and unbroken stripes.'], ['Striped Bass', 'Stripes are more regular and the fish is longer.']],
    sz: 'Grows to about 12 lb and 24 in; some exceed 20 lb. ^1',
    bait: 'Flies, jigs, plugs, spoons, insects, minnows and spinnerbaits. ^1',
    tech: ['Trolling, drift fishing, still fishing, fly fishing, bait casting and spin casting. ^1'],
    where: ['Cliffs, gradual shores, inlets and outlets, islands, overhanging trees, points, weed beds, rocks and open water. ^1'],
    tip: ['Aggressive fighters that stay in schools. ^1', 'A hybrid of striped bass and white bass, first produced in South Carolina in the mid-1960s. ^1'],
    src: [['tmf', 'wiper', 'Wiper']] });

  A({ id: 'black-crappie', n: 'Black Crappie', sci: 'Pomoxis nigromaculatus', w: 'f', r: 'ne2 se3 sc3 gl3 gp3 mw1 pn2 ca2', al: ['crappie', 'speckled perch', 'papermouth', 'calico bass', 'specks'],
    art: { t: 'crappie', dep: 1.0, back: '#4a5a3a', side: '#b9c1a0', belly: '#f2f1e0', fin: '#8d9a78', m: [{ k: 'spots', n: 36, r: [1.8, 3.4], c: '#1c1c1c', o: .72, y: [-.9, .55], x: [.14, .94] }] },
    idm: ['Irregular, scattered dark spots (a white crappie has vertical bars) ^1,2', 'Six to eight dorsal spines ^1,2', 'Deep, narrow, flattened body in silvery-olive to golden brown ^2'],
    lk: [['White Crappie', 'Vertical bars instead of scattered spots, and fewer dorsal spines.']],
    sz: 'Typically 6–11 in in Maine. ^2',
    bait: 'Minnows (under a bobber), small jigs, beetle-spin spinners and small hard plastics. Also insects and flies. ^1,3',
    tech: ['Cast small jigs (1/8 to 1/32 oz) with a slow retrieve. ^3', 'Use slip bobbers for deeper water, or troll small hard plastics around structure. ^3', 'Use a slow, steady hookset because crappie have soft mouths. ^3'],
    where: ['Brush piles, sunken trees, cattails, lily pads, underwater points, humps and deep weedlines. ^3', 'Shallow, dark-bottomed bays in spring. ^3', 'Large ponds and shallow lake areas with sandy or muddy bottoms and plenty of vegetation. ^1'],
    when: ['Minnesota: peak season is May–June as fish move into shallow bays. Dawn and dusk push them to shore. ^3'],
    tip: ['A light spinning rod with 6 lb line works well. ^3', '“Often as fast as the hook can be rebaited.” ^1'],
    src: [['tmf', 'black-crappie', 'Black Crappie'], ['me', 'black-crappie', 'Black Crappie: Species Information'], ['mn', 'crappie', 'How to catch a crappie']] });

  A({ id: 'white-crappie', n: 'White Crappie', sci: 'Pomoxis annularis', w: 'f', r: 'se3 sc3 gl2 gp3', al: ['crappie', 'sac-a-lait', 'specks'],
    art: { t: 'crappie', dep: .97, back: '#5a6a4a', side: '#cfd6bd', belly: '#f4f3e6', fin: '#a3ae90', m: [{ k: 'bars', at: [.3, .39, .48, .57, .66, .75], w: 4, c: '#2f3a2a', o: .42, taper: 1 }] },
    idm: ['Five to ten dark vertical bars on each side, with a whitish belly ^1', 'Humpbacked, deep silvery body with a green-brown back ^1', 'Five or six dorsal spines ^1'],
    lk: [['Black Crappie', 'Scattered dark spots instead of vertical bars.']],
    bait: 'Live minnows, small jigs and spinners. ^1,2',
    tech: ['In spring, fish brush, stumps and docks. Use submerged “crappie attractors” (sunken trees). ^1', 'In summer, target creek channels, roadbeds and submerged points. ^1', 'Use a slow, steady hookset because of their soft mouths. ^2'],
    where: ['They like warmer, more turbid water than black crappie, around fallen trees, stumps, docks and vegetation. ^1'],
    when: ['They move shallow to spawn in spring, then go deeper in summer and early fall. Active at sunrise, sunset and night. ^1'],
    src: [['nc', 'white-crappie', 'White Crappie'], ['mn', 'crappie', 'How to catch a crappie']] });

  A({ id: 'bluegill', n: 'Bluegill', sci: 'Lepomis macrochirus', w: 'f', r: 'ne3 se3 sc3 gl3 gp3 mw1 pn2 ca2', al: ['bream', 'brim', 'sunfish', 'panfish', 'sunny'],
    art: { t: 'sunfish', dep: 1.0, back: '#3f5a45', side: '#7e9a62', belly: '#f0b24a', fin: '#7d9a70', m: [{ k: 'bars', at: [.3, .38, .46, .54, .62, .7], w: 4, c: '#22342f', o: .35 }, { k: 'dot', x: .2, y: -.2, r: 3, c: '#10202a', o: .95, ex: 1.5 }] },
    idm: ['Compressed, round body with 6–8 vertical bars ^1', 'Small mouth and head, with pointed pectoral fins ^1', 'Coloring ranges from dark blue to yellow ^1'],
    lk: [['Redear Sunfish', 'Black gill flap with a red spot at the tip.'], ['Pumpkinseed', 'Orange-spotted, with a flat, disk-shaped body.']],
    bait: 'Flies, jigs, insects and minnows. ^1',
    tech: ['Fly fishing, still fishing, drift fishing and trolling. ^1'],
    where: ['Bays, lakes and ponds near gradual shores, inlets and outlets, piers, docks and weed beds. ^1'],
    tip: ['Excellent action for their size and increasingly popular with fly fishers. ^1'],
    rng: 'Native to the eastern half of the United States and introduced widely. ^1',
    src: [['tmf', 'bluegill', 'Bluegill']] });

  A({ id: 'redear-sunfish', n: 'Redear Sunfish', sci: 'Lepomis microlophus', w: 'f', r: 'se3 sc3 gl1 gp1 ca1', al: ['shellcracker', 'stump knocker', 'sunfish', 'panfish'],
    art: { t: 'sunfish', dep: 1.0, back: '#6a7a45', side: '#b8bd80', belly: '#f2edc0', fin: '#a8ad74', m: [{ k: 'spots', n: 16, r: [.9, 1.5], c: '#8a7a3a', o: .45, y: [-.6, .3] }, { k: 'dot', x: .21, y: -.18, r: 3.2, c: '#10202a', halo: '#e03a2a', o: .95, ex: 1.4 }] },
    idm: ['Small mouth, connected dorsal fins and a round, flattened body ^1', 'Long, pointed pectoral fins ^1', 'Black gill cover with a red spot at the tip ^1'],
    lk: [['Bluegill', 'Dark gill flap without the red tip, and vertical bars.']],
    sz: 'Reaches over 4.5 lb. ^1',
    bait: 'Small live baits: worms, grubs and insects. They rarely take small flies or lures. ^1',
    tech: ['Still fishing and drift fishing. ^1'],
    where: ['Lakes and ponds, including shoreline areas, weed beds and docks. ^1'],
    tip: ['“Less likely to be caught on artificials… than the other sunfishes.” ^1'],
    rng: 'Native to Gulf states from Texas to Florida, north to Indiana and North Carolina; transplanted to the Great Lakes and West. ^1',
    src: [['tmf', 'redear-sunfish', 'Redear Sunfish']] });

  A({ id: 'pumpkinseed', n: 'Pumpkinseed', sci: 'Lepomis gibbosus', w: 'f', r: 'ne3 gl2 se1 pn1', al: ['pumpkinseed sunfish', 'sunfish', 'sunny', 'panfish'],
    art: { t: 'sunfish', dep: .95, back: '#5a7a4a', side: '#cfa23c', belly: '#f2c064', fin: '#c98a40', m: [{ k: 'bars', at: [.32, .42, .52, .62], w: 3, c: '#5a6a3a', o: .3 }, { k: 'spots', n: 26, r: [1, 1.7], c: '#e86a1a', o: .75, y: [-.7, .3] }, { k: 'dot', x: .2, y: -.2, r: 3.1, c: '#10202a', halo: '#e8452c', o: .95, ex: 1.4 }] },
    idm: ['Flat, disk-shaped body with a small mouth ^1', 'Upper jaw stops just under the pupil of the eye ^1', 'Olive-green to brown with yellow, green and blue tones; light breast ^1'],
    lk: [['Bluegill', 'Darker body with vertical bars and no orange spots.']],
    bait: 'Worms, small live bait, flies, spinners, poppers, jigs, insects and minnows. ^1',
    tech: ['Drift fishing, still fishing and fly fishing. ^1'],
    where: ['Shallow water with vegetation or brush, farm ponds, small lakes, weedy bays and the upper reaches of creeks; around rocks, logs and docks. ^1'],
    tip: ['Active through the day. They travel in small groups of 2–4 adults. ^1'],
    rng: 'Greatest numbers in the northeastern United States; rarely found in the south-central or southwest. ^1',
    src: [['tmf', 'pumpkinseed-sunfish', 'Pumpkinseed Sunfish']] });

  A({ id: 'rock-bass', n: 'Rock Bass', sci: 'Ambloplites rupestris', w: 'f', r: 'ne2 gl2 gp1 se1', al: ['redeye', 'goggle-eye', 'sunfish'],
    art: { t: 'sunfish', dep: .88, back: '#4a4a2a', side: '#8a7a3e', belly: '#e0dcb0', fin: '#7a7a42', eye: '#c0392b', m: [{ k: 'spots', n: 46, r: [.9, 1.6], c: '#2a2a1a', o: .5, y: [-.8, .6] }, { k: 'dot', x: .24, y: -.18, r: 2.4, c: '#12121a', o: .9, ex: 1.2 }] },
    idm: ['Black spot at the edge of the gill cover, and red eyes ^1', 'Six anal-fin spines (a warmouth has three) ^1', 'Looks like a cross between a bluegill and a black bass, with a larger, bass-like mouth ^1'],
    sz: 'Up to about 3 lb; typically under 1 lb. ^1',
    bait: 'Cut bait, insects, leeches, minnows, small plugs, spoons, jigs, spinnerbaits and flies. ^1',
    tech: ['Drift fishing, trolling, still fishing, fly fishing, bait casting and spin casting. ^1'],
    where: ['Rocky bottoms in small, cool lakes and streams. Cliffs, coves, overhanging trees, docks and weed beds. ^1'],
    tip: ['“Known as scrappy fighters but tire quickly.” ^1'],
    rng: 'Native to the northeastern US and southeastern Canada through the Great Lakes and Mississippi basin; introduced westward. ^1',
    src: [['tmf', 'rock-bass', 'Rock Bass']] });

  A({ id: 'yellow-perch', n: 'Yellow Perch', sci: 'Perca flavescens', w: 'f', r: 'ne3 gl3 gp2 mw1 pn1', al: ['perch', 'lake perch', 'ring perch', 'jumbo perch'],
    art: { t: 'perch', dep: 1.05, back: '#5f6a2a', side: '#cdb53a', belly: '#f2ecb0', fin: '#e2902e', m: [{ k: 'bars', at: [.28, .35, .42, .49, .56, .63, .7], w: 5, c: '#2c3318', o: .55 }] },
    idm: ['Golden-yellow body with 6–8 dark bands running from the back toward the belly ^1,2', 'Bright green to olive back ^2', 'Fins pale yellow to bright orange ^2'],
    lk: [['Walleye', 'Longer, with a big pearly eye and no dark bands.']],
    sz: 'Typically 6–12 in and ¼–1 lb in Maine; occasionally 15 in. ^2',
    bait: 'Flies, jigs, minnows, small spinnerbaits, insects, leeches, plugs and spoons. ^1',
    tech: ['Drift fishing, trolling, fly fishing and still fishing. ^1'],
    where: ['Open water, weed beds, coves, docks, bridges, rocks, drop-offs and spring holes. ^1'],
    when: ['Catchable year-round, and an active feeder through winter and ice fishing. ^1'],
    tip: ['They readily take natural bait and artificials. ^1'],
    rng: 'Nova Scotia to South Carolina and west through the Great Lakes to Washington. ^1',
    src: [['tmf', 'yellow-perch', 'Yellow Perch'], ['me', 'yellow-perch', 'Yellow Perch: Species Information']] });

  A({ id: 'white-perch', n: 'White Perch', sci: 'Morone americana', w: 'b', r: 'ne3 se1 gl1', al: ['perch', 'silver perch'],
    art: { t: 'perch', dep: 1.0, back: '#4a5a50', side: '#aab4b0', belly: '#f2f4f2', fin: '#7d8a85', m: [{ k: 'band', y: [.55, .85], c: '#b9d0ea', o: .25, x: [.05, .2] }] },
    idm: ['No stripes, unlike white bass and striped bass ^1', 'Dark gray-green back, silver sides, white belly; large scales ^2', 'Bluish tint on the lower jaw in clear water ^2'],
    lk: [['White Bass', 'Has black stripes.'], ['Striped Bass', 'Much larger, with seven or eight stripes.']],
    sz: 'Average 8–10 in in Maine. ^2',
    bait: 'Clams, cut bait, squid, crabs, jigs, plugs, spoons and flies. ^1',
    tech: ['Jigging, fly fishing, surf casting, drift fishing, bottom bouncing and still fishing. ^1'],
    where: ['Bays, estuaries, rivers, streams, jetties and channel entrances. Look for schools. ^1'],
    tip: ['Easy to catch, and rates highly as food. ^1'],
    rng: 'Brackish water on the Atlantic coast from South Carolina to the upper St. Lawrence; abundant in the Hudson River and Chesapeake Bay; common in Lake Ontario. ^1',
    src: [['tmf', 'white-perch', 'White Perch'], ['me', 'white-perch', 'White Perch: Species Information']] });

  A({ id: 'walleye', n: 'Walleye', sci: 'Sander vitreus', w: 'f', r: 'ne2 gl3 gp3 mw2 pn1 se1 sc1', al: ['eye', 'eyes', 'pickerel', 'yellow pike'],
    art: { t: 'walleye', dep: 1.0, back: '#6a6a2a', side: '#b8a54c', belly: '#f3eed0', fin: '#a09a50', eye: '#d8d8c0', m: [{ k: 'saddles', at: [.3, .42, .54, .66], c: '#3a3a18', o: .5 }, { k: 'dot', x: .52, y: -.85, r: 3, c: '#1a1a10', o: .7 }] },
    idm: ['Pearly, glassy-looking eye with a reflective layer ^2', 'Dorsal fin has no spots except a dark splotch at the rear base ^2', 'White tip on the lower lobe of the tail ^2'],
    lk: [['Sauger', 'Distinct dark spots on the dorsal fin.'], ['Yellow Perch', 'Shorter, with dark vertical bands.']],
    sz: 'Typically 1–2 lb in Minnesota; occasionally over 10 lb. ^2',
    bait: 'Jig and minnow, slip-sinker rigs with minnows, nightcrawlers or leeches, perch-pattern hard plastics, and a bobber with leeches, crawlers or minnows. Also stickbaits, blade baits and bucktail jigs. ^1,3',
    tech: ['Vertical jigging with 1/8–3/8 oz jigs. ^1', 'Slow-troll hard plastics at about 1 mph. ^1', 'Cast and retrieve at a steady pace, or use a jig-and-snap near the bottom. ^3', 'Use slip bobbers for suspended fish and fish wind-blown areas. ^3'],
    where: ['Spring: near-shore sand flats. Summer: deep water and mid-lake structure (humps, saddles, points). Fall: shallow weedlines, gravel bars and points. ^1', 'New York: early season at spawning areas, first drop-offs, humps and points; late summer and fall near shore after dark. ^3'],
    when: ['Minnesota: success tends to be highest in May and June. Dawn and dusk are the traditional feeding times. ^1', '“Walleye tend to feed more actively under low light periods.” ^3'],
    tip: ['A medium-action spinning rod with 6–10 lb line is a good all-round setup. ^1'],
    rng: 'A wide-ranging North American species found across most of the mainland, in lakes and ponds. ^4',
    src: [['mn', 'walleye', 'How to catch a walleye'], ['url', 'https://www.dnr.state.mn.us/fish/walleye/biology.html', 'Walleye biology and identification', 'Minnesota Dept. of Natural Resources'], ['ny', 'fishing-for-walleye', 'Fishing for Walleye'], ['tmf', 'walleye', 'Walleye']] });

  A({ id: 'sauger', n: 'Sauger', sci: 'Sander canadensis', w: 'f', r: 'gl2 gp2 sc1 se1 mw1', al: ['sand pike', 'river walleye'],
    art: { t: 'walleye', dep: .95, back: '#5f5a3a', side: '#a89a68', belly: '#eee8d0', fin: '#8f8660', eye: '#d0d0b8', m: [{ k: 'saddles', at: [.3, .42, .54, .66], c: '#2e2a18', o: .45 }, { k: 'spots', n: 22, r: [1, 1.7], c: '#2e2a18', o: .55, y: [-.9, -.2], x: [.28, .74] }] },
    idm: ['Distinct dark spots on the dorsal fin ^1', 'Smaller than a walleye ^1'],
    lk: [['Walleye', 'No spots on the dorsal fin apart from a splotch at the rear base. ^1']],
    bait: 'Jigs, minnows, spinnerbaits, leeches, plugs and spoons. ^1',
    tech: ['Drift fishing, still fishing and trolling. ^1'],
    where: ['Dams, open water, islands, rocks, weed beds and inlets and outlets. ^1'],
    tip: ['Can hybridize with walleye, producing “saugeye.” ^1'],
    rng: 'Quebec to Tennessee and Arkansas, northwest through Montana to central Alberta, and throughout the Great Lakes. ^1',
    src: [['tmf', 'sauger', 'Sauger']] });
  /* ---------- pike family, catfish, carp, drum, primitive fish ---------- */
  A({ id: 'northern-pike', n: 'Northern Pike', sci: 'Esox lucius', w: 'f', r: 'ne2 gl3 gp3 mw2 ak3', al: ['pike', 'jackfish', 'gator', 'hammer handle'],
    art: { t: 'pike', dep: 1.0, back: '#3a4f2a', side: '#6f8a4a', belly: '#e8e8c8', fin: '#8a7a3a', m: [{ k: 'spots', n: 52, r: [1.6, 2.6], c: '#e5e8b0', o: .75, y: [-.8, .35], x: [.14, .94] }] },
    idm: ['Fully scaled cheek, but only the top half of the gill cover is scaled ^1,2', 'Greenish or yellowish sides with light, oblong horizontal spots ^1', 'Usually five pores under each side of the lower jaw ^1,2'],
    lk: [['Muskellunge', 'Six to nine pores under each side of the lower jaw. ^4'], ['Chain Pickerel', 'Fully scaled cheeks and gill covers, with a chain-like pattern. ^5']],
    sz: 'In Maine, mature pike are 24–30 in and 3½–7½ lb; record catches exceed 30 lb. ^2',
    bait: 'Spoons and jerkbaits that look like injured fish, lures that resemble 4–15 in perch or suckers, and crankbaits. Large plugs, spinnerbaits, flies and minnows also work. ^1,3',
    tech: ['Cast near weeds, rocky points and weedy backwaters, where pike lie in wait. ^3', 'Trolling with large spoons and plugs. ^1', 'Use a steel or fluorocarbon leader because of the “razor sharp teeth.” Carry a net and needle-nose pliers. ^3'],
    where: ['Lakes: weedbeds, cabbage patches and bulrush edges in 2–15 ft. ^3', 'Rivers: scoured holes, sunken timber and eddies. ^3'],
    when: ['Most active early morning and evening, but they can be caught at any time of day. ^3'],
    tip: ['A 7 ft medium-heavy rod with braid of 15 lb or more is recommended. ^3'],
    rng: 'Around the northern world: Labrador to Alaska, south to Pennsylvania, Missouri and Nebraska. ^1',
    src: [['tmf', 'northern-pike', 'Northern Pike'], ['me', 'northern-pike', 'Northern Pike: Species Information'], ['mn', 'northern-pike', 'How to catch a northern pike'], ['tmf', 'muskellunge', 'Muskellunge'], ['tmf', 'chain-pickerel', 'Chain Pickerel']] });

  A({ id: 'muskellunge', n: 'Muskellunge', sci: 'Esox masquinongy', w: 'f', r: 'gl3 ne2 se1', al: ['muskie', 'musky', 'muskies', 'lunge'],
    art: { t: 'pike', dep: 1.1, back: '#5a5a2f', side: '#9a9a5a', belly: '#e6e6c4', fin: '#a08a46', m: [{ k: 'bars', at: [.28, .36, .44, .52, .6, .68, .76, .84], w: 3, c: '#2a2a14', o: .35 }, { k: 'spots', n: 18, r: [1.4, 2.4], c: '#2a2a14', o: .45, y: [-.8, .2] }] },
    idm: ['Mouth reaches back to the middle of the eye and is broad, like a duck’s bill ^1', 'Pelvic fins sit halfway between the pectoral fins and the tail ^1', 'Six to nine pores under each side of the lower jaw ^1', 'May be barred, spotted or unmarked ^1'],
    lk: [['Northern Pike', 'Five pores under each side of the jaw, and a half-scaled gill cover.']],
    bait: 'Large lures, 5–10+ in: bucktail spinners, plastic crankbaits, floating lures that mimic injured fish, and soft tube jigs. Use diving crankbaits for trolling. ^2',
    tech: ['Cast big lures from a slow-moving or drifting boat. ^2', 'Troll along weedlines and structure. ^2', 'If a fish follows your lure to the boat, make a “figure eight” with the rod. ^2'],
    where: ['Weed edges, rocky shoals, drop-offs, shallow weedy bays, island edges, sunken reefs and humps, and sand flats. ^2', 'They prefer shallow, heavily vegetated water under 40 ft deep, usually along rocky shorelines. ^1'],
    when: ['Minnesota: mid-to-late summer is a peak, and October–November is prime. Dawn, dusk and cool, overcast days are best. ^2'],
    tip: ['Gear: a stout 7–9 ft rod, 50 lb+ braid, a steel or fluorocarbon leader and a large net. ^2', '“Very elusive, and is not a common catch, even for those who continually seek it out.” ^1'],
    rng: 'Northeastern United States through the Great Lakes, south to Georgia, and north to Quebec and Ontario. ^1',
    src: [['tmf', 'muskellunge', 'Muskellunge'], ['mn', 'muskellunge', 'How to catch a muskellunge']] });

  A({ id: 'chain-pickerel', n: 'Chain Pickerel', sci: 'Esox niger', w: 'f', r: 'ne3 se3 sc1', al: ['pickerel', 'jack', 'grass pike'],
    art: { t: 'pike', dep: .92, back: '#4a5f2a', side: '#a9b04c', belly: '#ecebc4', fin: '#a8a24a', m: [{ k: 'worms', n: 34, c: '#2e3a14', o: .7, y: [-.9, .6], x: [.14, .94] }] },
    idm: ['A chain-like pattern of black lines over yellowish-green sides ^1,2', 'Fully scaled cheeks and gill covers (pike are scaled only on the top half) ^1', 'Long jaws with sharp teeth, and a dorsal fin set far back ^2'],
    lk: [['Northern Pike', 'Light spots instead of a chain pattern, and a half-scaled gill cover.']],
    sz: 'Typically 14–19 in in Maine; 2–3 lb fish are common. ^2',
    bait: 'Minnows, leeches, insects, plugs, spinnerbaits, jigs, soft plastics and spoons. ^1',
    tech: ['Drift fishing, still fishing and trolling. ^1'],
    where: ['Lakes and ponds near weed beds, overhanging vegetation, docks, rocks, islands and spring holes. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Nova Scotia through the Atlantic states and Florida, west to eastern Texas, and north in the Mississippi drainage to Missouri and Kentucky. ^1',
    src: [['tmf', 'chain-pickerel', 'Chain Pickerel'], ['me', 'chain-pickerel', 'Chain Pickerel: Species Information']] });

  A({ id: 'channel-catfish', n: 'Channel Catfish', sci: 'Ictalurus punctatus', w: 'f', r: 'ne1 se3 sc3 gl2 gp3 mw1 ca1', al: ['channel cat', 'channels', 'catfish', 'cat', 'fiddler'],
    art: { t: 'catfish', tt: 'fork', tn: .3, dep: 1.0, back: '#5c6f78', side: '#a9b3b0', belly: '#f0efe6', fin: '#6f808a', m: [{ k: 'spots', n: 30, r: [1.2, 2], c: '#23282a', o: .6, y: [-.75, .3], x: [.22, .85] }] },
    idm: ['Deeply forked tail and spots on the body ^1', '24–30 anal-fin rays ^1'],
    lk: [['Blue Catfish', 'Longer anal fin (30–36 rays) and usually no spots.']],
    bait: 'Nightcrawlers, chicken liver, cut minnow chunks and commercial stink baits. Bread or dough balls, jigs and cut bait also work. ^1,2',
    tech: ['Use a sliding egg-sinker rig (about 1 oz sinker, 2 ft leader, 4/0–6/0 circle hook) and cast to the bottom. ^2', 'Use as little weight as you can; catfish drop baits when they feel resistance. ^2', 'Drift fishing and still fishing both work. ^1'],
    where: ['Rivers, lakes and ponds. At night, work riffles and shallows. By day or after rain, try pools and timber away from strong current. ^2', 'They like clean sand or gravel bottoms in larger lakes and rivers. ^1'],
    when: ['They feed mainly at night. ^1,2'],
    tip: ['Handle them behind the dorsal fin: there are sharp spines on the dorsal and pectoral fins. ^2'],
    rng: 'Most abundant in the central United States, east to the Appalachians. ^1',
    src: [['tmf', 'channel-catfish', 'Channel Catfish'], ['mn', 'channel-catfish', 'How to catch a channel catfish']] });

  A({ id: 'blue-catfish', n: 'Blue Catfish', sci: 'Ictalurus furcatus', w: 'f', r: 'se3 sc3 gp2 gl1', al: ['blue cat', 'blues', 'catfish', 'cat'],
    art: { t: 'catfish', tt: 'fork', tn: .3, dep: 1.12, back: '#5a7488', side: '#a7b5be', belly: '#f2f2ee', fin: '#6d8494', m: [] },
    idm: ['A forked tail (only blue, channel and white catfish have one) ^1', 'A long anal fin with 30–36 rays ^1'],
    lk: [['Channel Catfish', 'Shorter anal fin (24–30 rays) and usually spotted.']],
    sz: 'Reported to grow to 120 lb. ^1',
    bait: 'Cut bait, minnows, bread or dough balls and jigs. ^1',
    tech: ['Drift fishing and still fishing. ^1'],
    where: ['Deep areas of large rivers with swift current: chutes, pools, rock pockets, drop-offs, current edges and dams. ^1'],
    tip: ['They feed mainly on fish and crayfish and prefer clean, fast-moving water. ^1'],
    rng: 'Native to the Mississippi, Missouri and Ohio basins, north to South Dakota and south to Mexico. ^1',
    src: [['tmf', 'blue-catfish', 'Blue Catfish']] });

  A({ id: 'flathead-catfish', n: 'Flathead Catfish', sci: 'Pylodictis olivaris', w: 'f', r: 'se2 sc3 gp3 gl2', al: ['flathead', 'flat head', 'mudcat', 'yellow cat', 'shovelhead', 'catfish', 'cat'],
    art: { t: 'catfish', tt: 'square', tn: 0, dep: 1.15, back: '#6b5a2a', side: '#a8934a', belly: '#e8e0c0', fin: '#8a7440', m: [{ k: 'spots', n: 14, r: [3, 6], c: '#3a2f14', o: .32, y: [-.8, .4], x: [.2, .9] }] },
    idm: ['A broad, flat head with a protruding lower jaw ^1,2', 'Brown to yellow back and sides mottled with black-olive; smooth, scaleless skin ^1,2', 'Tail is slightly notched; blue and channel catfish have forked tails ^2'],
    lk: [['Channel Catfish', 'Deeply forked tail and spots.']],
    sz: 'In Texas they reach 3–4 ft and can exceed 100 lb. ^2',
    bait: 'Live bait: shad, panfish and bullhead catfish, or crawfish. They rarely take chicken liver or stinkbait. ^1,2',
    tech: ['Use live fish; unlike other catfish, flatheads want live bait. ^2'],
    where: ['Deep, slow stretches near submerged logs, brush and riprap. ^1', 'Deep pools in streams, rivers and reservoirs; Texas’ best success is just below reservoir dams. ^2'],
    when: ['They feed at night and hunt the shallows then. ^2'],
    tip: ['Do not move flathead catfish from one waterbody to another. ^1'],
    src: [['nc', 'flathead-catfish', 'Flathead Catfish'], ['tx', 'catfish', 'Flathead Catfish (Pylodictis olivaris)']] });

  A({ id: 'brown-bullhead', n: 'Brown Bullhead', sci: 'Ameiurus nebulosus', w: 'f', r: 'ne3 gl2 se1 pn1', al: ['bullhead', 'horned pout', 'pout', 'catfish', 'bullheads'],
    art: { t: 'catfish', tt: 'square', tn: 0, dep: .95, back: '#4a3a22', side: '#7a6234', belly: '#d8cfa0', fin: '#6a5430', m: [{ k: 'spots', n: 26, r: [2, 4], c: '#2a2010', o: .3, y: [-.8, .4] }] },
    idm: ['Sharp, tooth-like serrations on the rear edge of the pectoral spine (a black bullhead lacks them) ^1', 'Squarish or slightly notched tail; barbels dark brown to nearly black ^1', 'Yellow-brown to olive or black, often mottled ^1'],
    bait: 'Bread or dough balls, jigs, cut bait and minnows. ^1',
    tech: ['Drift fishing, still fishing, bait casting and spin casting. ^1'],
    where: ['Larger, deeper water than other bullheads: shores, docks, rocks, sunken objects, bridges, coves, drop-offs and current edges. ^1'],
    tip: ['Extremely popular with anglers despite being relatively small. ^1'],
    rng: 'Eastern United States and southern Canada. ^1',
    src: [['tmf', 'brown-bullhead', 'Brown Bullhead']] });

  A({ id: 'common-carp', n: 'Common Carp', sci: 'Cyprinus carpio', w: 'f', r: 'ne2 se2 sc2 gl3 gp3 mw2 pn2 ca2', al: ['carp'],
    art: { t: 'carp', bigscales: 1, dep: 1.0, back: '#6a5a2a', side: '#b8963a', belly: '#ecd9a0', fin: '#a88a3e', m: [] },
    idm: ['Deep body, small protractile mouth, forked tail, a single long dorsal fin and large scales ^1', 'Olive-brown to gold; one of the largest minnows and a close relative of the goldfish ^1'],
    bait: 'Bread or dough balls, and flies. ^1',
    tech: ['Still fishing and fly fishing. ^1'],
    where: ['Lakes, ponds, rivers, streams, dams, and beneath overhanging trees and bushes. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Widely distributed in North America below the 50th parallel, south to the Florida panhandle. ^1',
    src: [['tmf', 'common-carp', 'Common Carp']] });

  A({ id: 'freshwater-drum', n: 'Freshwater Drum', sci: 'Aplodinotus grunniens', w: 'f', r: 'gl2 gp2 sc2 se2', al: ['drum', 'sheepshead', 'gaspergou', 'gou'],
    art: { t: 'drum', dep: 1.05, back: '#6a6e70', side: '#b5bbbb', belly: '#f0f0ee', fin: '#8a9090', m: [] },
    idm: ['Large, round-profiled, humpbacked silvery fish with a small tail ^1', 'Mouth is set toward the bottom of the face ^1', 'The lateral line runs through the tail, unique among freshwater fish ^1', 'Long dorsal fin (10 spines, 29–32 rays); makes grunting sounds ^2'],
    lk: [['Red Drum', 'Freshwater drum lack the red drum’s tail-fin spot. ^2']],
    sz: 'The Texas rod-and-reel record exceeds 30 lb. ^2',
    tip: ['Our sources give little bait advice. They feed on fish, crayfish, insects and mollusks and spawn in open water in April–May. ^2', 'Considered a “rough fish” by some anglers but a prized food fish in some areas. ^2', 'Take Me Fishing rates them easy to catch. ^3'],
    rng: 'Hudson Bay to Guatemala; Midwest and South. ^2,3',
    src: [['url', 'https://www.dnr.state.mn.us/fish/freshwaterdrum.html', 'Freshwater Drum (Sheepshead)', 'Minnesota Dept. of Natural Resources'], ['tx', 'fwd', 'Freshwater Drum (Aplodinotus grunniens)'], ['tmf', 'freshwater-drum', 'Freshwater Drum']] });

  A({ id: 'bowfin', n: 'Bowfin', sci: 'Amia calva', w: 'f', r: 'se2 sc2 gl2 ne1', al: ['dogfish', 'grindle', 'mudfish', 'cypress trout'],
    art: { t: 'bowfin', dep: 1.0, back: '#4a5a2a', side: '#7a8a3a', belly: '#cfd8a0', fin: '#6a8a3a', m: [{ k: 'worms', n: 20, c: '#2f3a18', o: .5, y: [-.9, .5] }, { k: 'dot', x: .96, y: -.15, r: 3, c: '#101010', halo: '#e8a020', o: .9 }] },
    idm: ['Flattened head, long stout body and a large mouth with small sharp teeth ^1', 'Long dorsal fin and a rounded tail ^1', 'Males have an orange-yellow halo spot on the tail; females lack it ^1'],
    bait: 'Jigs, minnows, spinnerbaits, leeches, plugs and spoons. ^1',
    tech: ['Drift fishing, still fishing and trolling. ^1'],
    where: ['Lakes, rivers and ponds: weed beds, sunken objects, docks, rocky areas, coves and shallow shores. ^1'],
    tip: ['An excellent fighter but poor food. It can breathe air directly and tolerate high temperatures. ^1'],
    rng: 'Eastern United States from the Mississippi basin east to the St. Lawrence, south from Minnesota to the Gulf Coast. ^1',
    src: [['tmf', 'bowfin', 'Bowfin']] });

  A({ id: 'alligator-gar', n: 'Alligator Gar', sci: 'Atractosteus spatula', w: 'f', r: 'sc3 se1 gp1', al: ['gar', 'gator gar'],
    art: { t: 'gar', snout: 2, dep: 1.45, back: '#4a4a2a', side: '#7c7c4c', belly: '#d8d0a0', fin: '#6a6a3a', m: [{ k: 'spots', n: 22, r: [2, 3.4], c: '#222', o: .45, y: [-.9, -.1] }] },
    idm: ['Two rows of teeth in the upper jaw and a broader snout than other gars ^1', 'Long body with a toothy snout and a rounded tail ^1'],
    sz: 'Can grow over 300 lb. ^1',
    bait: 'Cut bait, minnows, jigs and spoons. ^1',
    tech: ['Drift fishing, still fishing and bait casting. ^1'],
    where: ['Large rivers, bays and coastal waters: shorelines, inlets and outlets, open water, sunken objects, coves and points. ^1'],
    tip: ['Hard to land because the sharp teeth cut lines. Edible but not highly rated. ^1'],
    rng: 'From the western Florida panhandle west into Mexico and north in the Mississippi River drainage. ^1',
    src: [['tmf', 'alligator-gar', 'Alligator Gar']] });
  /* ---------- trout, char, salmon, grayling, sturgeon, shad, peacock ---------- */
  A({ id: 'lake-trout', n: 'Lake Trout', sci: 'Salvelinus namaycush', w: 'f', r: 'gl3 ne2 ak3 pn1 gp1', al: ['laker', 'mackinaw', 'togue', 'lakers'],
    art: { t: 'trout', tt: 'fork', tn: .45, dep: 1.0, back: '#4a5448', side: '#7c8a7a', belly: '#e6e6da', fin: '#7a847a', m: [{ k: 'spots', n: 70, r: [1.2, 2.2], c: '#e8e8d6', o: .8, y: [-.9, .45], x: [.12, .94], tail: 8 }] },
    idm: ['Light spots on a dark background, extending onto the fins ^1', 'White leading edges on all the lower fins ^1', 'A more deeply forked tail than other chars ^1'],
    lk: [['Brook Trout', 'Worm-like wavy lines on the back and red spots with blue halos. ^2']],
    sz: 'A very large char; known to grow over 100 lb. ^1',
    bait: 'Spoons, jigs and flies, plus cured fish roe and insects. ^1',
    tech: ['Fly fishing, still fishing, bait casting and spin casting. ^1'],
    where: ['In warmer regions they seek out the cooler waters of deep lakes. ^1', 'In streams and rivers: outsides of bends, dams and falls, eddies, undercuts, rock pockets, drop-offs and current edges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Most of Canada, well into Alaska, and the Great Lakes; introduced in parts of the western U.S. ^1',
    src: [['tmf', 'lake-trout', 'Lake Trout'], ['tmf', 'brook-trout', 'Brook Trout']] });

  A({ id: 'brook-trout', n: 'Brook Trout', sci: 'Salvelinus fontinalis', w: 'f', r: 'ne3 gl2 se1 pn1 gp1', al: ['brookie', 'speckled trout', 'speckled', 'squaretail', 'brookies'],
    art: { t: 'trout', tt: 'square', tn: .15, dep: .95, back: '#4c5a34', side: '#6f7e48', belly: '#e07a3a', fin: '#d8702e', m: [{ k: 'worms', n: 18, c: '#e8e8c0', o: .6, y: [-.95, -.35] }, { k: 'spots', n: 18, r: [1.6, 2.2], c: '#d83a2a', o: .9, halo: '#6ab0e0', y: [-.3, .35] }, { k: 'spots', n: 20, r: [1.2, 1.8], c: '#f0e6a0', o: .8, y: [-.6, .1] }] },
    idm: ['Light green to cream wavy lines (vermiculations) on the back ^1,2', 'Pale yellowish or greenish spots, plus red spots with blue halos ^1', 'Lower fins have a milk-white leading edge ^1,2', 'Spawning males have a bright orange-red belly with black edges ^1'],
    lk: [['Lake Trout', 'Light spots on a dark body and a deeply forked tail.']],
    sz: 'In Maine lakes, 3-year-old brook trout average 13.3 in, but same-age fish range from 7.5 to 17.5 in depending on the lake. ^2',
    bait: 'Small dry flies, streamers, nymphs, copper lures, spoons, jigs, worms and insects; cured fish roe also works. ^1,2',
    tech: ['Fly fishing, still fishing, bait casting and spin casting. ^1', 'Spring and fall: fish near shore or the surface with small dry flies, streamers, copper lures and worms. ^2', 'Summer: they hold in 10–35 ft; troll, spin cast or fly fish. ^2', 'Ice fishing: minnows, worms or copper jigs in 4–12 ft close to shore. ^2'],
    where: ['Clear, cold mountain streams and lakes. ^1', 'Maine lakes, ponds, rivers and streams, especially in the north. ^2', 'In streams: bend outsides, rock pockets, undercuts, overhanging trees and bushes, eddies and current edges. ^1'],
    when: ['They prefer water around 50–65°F; Take Me Fishing gives about 57–61°F as the sweet spot and warns that 77–80°F is fatal. ^1,2'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Native to northeastern North America from the Great Lakes to Hudson Bay and the Atlantic, and the Appalachians to northeast Georgia; introduced to high-elevation western waters. ^1',
    src: [['tmf', 'brook-trout', 'Brook Trout'], ['me', 'brook-trout', 'Brook Trout: Species Information']] });

  A({ id: 'brown-trout', n: 'Brown Trout', sci: 'Salmo trutta', w: 'f', r: 'ne3 gl3 gp1 pn2 mw3 se1', al: ['brownie', 'browns', 'german brown', 'brown'],
    art: { t: 'trout', tt: 'square', tn: .1, dep: 1.0, back: '#5a4a2a', side: '#a8903e', belly: '#ece0b4', fin: '#a88a3a', m: [{ k: 'spots', n: 44, r: [1.3, 2.3], c: '#2a2014', o: .85, halo: '#e8dcc0', ho: .6, y: [-.9, .25], x: [.14, .94] }, { k: 'spots', n: 7, r: [1.3, 2], c: '#c8322a', o: .85, halo: '#e8dcc0', y: [-.3, .25] }] },
    idm: ['Black spots on the back, upper sides and gill cover, sometimes with red spots ^1,2', 'Spots are surrounded by lighter halos ^1,2', 'Dark spots on the dorsal and adipose fins; the tail is squarish ^1', 'Light brown or tawny; sometimes confused with landlocked salmon ^2'],
    lk: [['Atlantic / Landlocked Salmon', 'Brown trout are more heavily spotted than Atlantic salmon. ^1 Maine notes browns are occasionally confused with landlocked salmon. ^2']],
    sz: 'Normal size in Maine is 14–20 in and 1–2 lb; browns occasionally reach 10 lb. ^2',
    bait: 'Flies, jigs, insects, worms and minnows; bright spinners and spoons in spring and fall. ^1,2',
    tech: ['Fly fishing and bait casting. ^1', 'Spring and fall: cast dry flies, streamers, spinners and spoons near shore, or still fish with worms or minnows. ^2', 'Summer: trolling, casting and still fishing. ^2', 'Winter: jig close to the bottom in water under about 15 ft. ^2'],
    where: ['Rivers and streams: bend outsides, rock pockets, undercuts, overhanging trees and bushes, eddies and current edges. ^1', 'Close to bottom or suspended, depending on where food is. ^2'],
    when: ['Increasingly active at night in spring and especially summer. ^2'],
    tip: ['“One of the most difficult of trouts to catch by any angling method.” It may be spooked by the bait or fly, or simply ignore it. ^1'],
    rng: 'Native to Europe and parts of Asia. Now in the Great Lakes area, the Appalachians south to north Georgia, and every state west of Texas and Nebraska to the Pacific. ^1',
    src: [['tmf', 'brown-trout', 'Brown Trout'], ['me', 'brown-trout', 'Brown Trout: Species Information']] });

  A({ id: 'rainbow-trout', n: 'Rainbow Trout', sci: 'Oncorhynchus mykiss', w: 'f', r: 'pn3 ca3 ne2 gl2 gp1 mw2 se1 ak2', al: ['rainbow', 'bow', 'rainbows', 'rainbow trout'],
    art: { t: 'trout', tt: 'square', tn: .2, dep: .95, back: '#52684a', side: '#9aa890', belly: '#f0eee4', fin: '#8a9a80', m: [{ k: 'band', y: [-.12, .12], x: [.2, .92], c: '#d8566a', o: .7 }, { k: 'spots', n: 60, r: [1, 1.8], c: '#1c1c1c', o: .8, y: [-.9, .4], x: [.14, .96], tail: 10 }] },
    idm: ['A broad red or pink stripe along the middle of the sides (not on every form) ^1,2', 'Spots extend onto the dorsal fin, adipose fin and tail ^1', 'Greenish-yellow to blue-gray back with silvery sides and small black spots ^2'],
    lk: [['Steelhead', 'The sea-run form: silver with black dots, little “rainbow.” ^1']],
    sz: 'Anglers in Maine typically land 8–16 in fish; 7–8 lb fish are occasionally caught. ^2',
    bait: 'Flies, jigs, insects, cured fish roe; spinners, spoons, worms and minnows. ^1,2',
    tech: ['Fly fishing and bait casting. ^1', 'Spring and fall: cast dry flies, streamers, spinners or spoons near shore, or still fish with worms or minnows. ^2', 'Summer: trolling, casting and still fishing. ^2'],
    where: ['Rivers and streams: bend outsides, riparian zones, dams and falls, merging currents, undercuts, rock pockets and current edges. ^1', 'Cool water, about 55–68°F; may be close to bottom or suspended. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1', 'Unlike most Maine salmonids, rainbows spawn in spring. ^2'],
    rng: 'Native to the west coast from southern Alaska to Mexico; widely introduced across lower Canada, the Great Lakes and the Appalachians. ^1',
    src: [['tmf', 'rainbow-trout', 'Rainbow Trout'], ['me', 'rainbow-trout', 'Rainbow Trout: Species Information']] });

  A({ id: 'cutthroat-trout', n: 'Cutthroat Trout', sci: 'Oncorhynchus clarkii', w: 'f', r: 'pn3 gp2 ca1 ak1', al: ['cutthroat', 'cutts', 'cutt'],
    art: { t: 'trout', tt: 'square', tn: .2, dep: .95, back: '#5a6a3c', side: '#a6a45a', belly: '#e8e0c0', fin: '#a89a52', m: [{ k: 'spots', n: 55, r: [1, 1.7], c: '#1c1c1c', o: .75, y: [-.9, .4], x: [.3, .96], tail: 8 }, { k: 'stripe', ys: [.62], x: [.3, .5], w: 2.2, c: '#d8321a', o: .85 }] },
    idm: ['A yellow, orange or red streak in the skin fold under the lower jaw ^1', 'Olive-green to yellowish-green, sometimes with red on the head and belly; sea-run forms are bluish and silvery ^1'],
    bait: 'Flies, jigs, spoons, insects and cured fish roe. ^1',
    tech: ['Fly fishing, still fishing, bait casting and spin casting. ^1'],
    where: ['Rivers and streams: bend outsides, rock pockets, overhanging trees and bushes, undercuts, eddies and current edges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Eel River, California, north to Prince William Sound, Alaska; inland from southern Alberta through Montana, Colorado and New Mexico. ^1',
    src: [['tmf', 'cutthroat-trout', 'Cutthroat Trout']] });

  A({ id: 'steelhead', n: 'Steelhead', sci: 'Oncorhynchus mykiss', w: 'b', r: 'pn3 ca2 gl2 ak2 ne1', al: ['steelie', 'steelies', 'steelhead trout'],
    art: { t: 'trout', tt: 'fork', tn: .25, dep: .95, back: '#4a5e56', side: '#a8b4ac', belly: '#f2f2ee', fin: '#7a8a82', m: [{ k: 'band', y: [-.1, .1], x: [.22, .9], c: '#c8707a', o: .45 }, { k: 'spots', n: 60, r: [1, 1.8], c: '#1c1c1c', o: .8, y: [-.9, .4], x: [.14, .96], tail: 10 }] },
    idm: ['The sea-run form of rainbow trout: silver with black dots ^1', 'Numerous prominent black spots extend onto the dorsal fin, adipose fin and tail ^1', 'Returning to freshwater, they turn dark olive with a pink to red stripe ^2'],
    lk: [['Rainbow Trout', 'Same species, but resident rainbows stay in fresh water and are smaller. ^1,2']],
    sz: 'Spring and summer runs average two or three pounds; fall runs commonly reach 10–15 lb, with records over 40 lb. ^1',
    bait: 'Jigs, flies, cured fish roe, spinners, spoons, plugs and cut bait. ^1',
    tech: ['Bobber and jig or bait: drift a weighted jig or bait under a float. Easy for beginners from the bank. ^2', 'Drift fishing, plunking, spinners and fly fishing. ^2', 'Trolling and spin casting are also listed. ^1'],
    where: ['Bays, estuaries, coastal waters, rivers and streams: merging currents, current edges, eddies, undercuts, drop-offs, dams. ^1', 'Oregon: coastal streams are mostly winter-run; Columbia basin inland fish are almost all summer-run. ^2'],
    when: ['Oregon summer-run fish return May–October; winter-run fish return November–April. ^2'],
    tip: ['“When the bobber dives, stops or wobbles, set the hook!” ^2', 'Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Native to Pacific tributaries; anadromous, spending most of life at sea before returning after about 2–3 years. ^1',
    src: [['tmf', 'steelhead', 'Steelhead'], ['or', 'steelhead', 'Steelhead Fishing']] });

  A({ id: 'atlantic-salmon', n: 'Atlantic Salmon', sci: 'Salmo salar', w: 'b', r: 'ne3 gl1', al: ['salmon', 'landlocked salmon', 'sebago', 'ouananiche', 'land locked salmon'],
    art: { t: 'trout', tt: 'fork', tn: .3, dep: .95, back: '#4a5a64', side: '#aab5b8', belly: '#f2f2ee', fin: '#7a8a90', m: [{ k: 'spots', n: 16, r: [1.2, 1.9], c: '#1c1c1c', o: .85, y: [-.8, .0], x: [.3, .92] }] },
    idm: ['A trout-shaped body; silvery at sea with a sparse scattering of small black spots, often X- or Y-shaped ^1', 'Maine landlocked salmon: silvery, slightly forked tail and small X-shaped marks on the back and upper sides ^2', 'Spawning fish darken to bronze or brown, with possible red spots, like a brown trout ^1', 'Spawning males develop a hooked jaw (kype) ^2'],
    lk: [['Brown Trout', 'More heavily spotted, with a squarish tail. ^3']],
    sz: 'Maine landlocked salmon average 16–18 in and 1–1½ lb; 3–5 lb fish are not uncommon. ^2',
    bait: 'Flies, plugs, spoons, spinner baits, cut bait and cured fish roe. Smelt-imitating streamers and lures work in Maine lakes. ^1,2',
    tech: ['Fly fishing, jigging, drift fishing, trolling and still fishing. ^1', 'Maine spring and fall: fly fish, cast or troll near the surface and close to shore. ^2', 'Maine summer: troll with lead core line or a downrigger, using copper, gold or silver lures at 30–60 ft. ^2', 'Maine winter: ice fish with smelts or other bait in the first 15 ft below the ice. ^2'],
    where: ['Rivers: backflow areas, ripples and currents, bend outsides, drop-offs, dams and falls, rock pockets. ^1', 'Rainbow smelt is the main forage in Maine lakes. ^2'],
    when: ['Landlocked salmon prefer water below 65°F. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1', 'Anadromous and landlocked fish exist; landlocked details here come from Maine. ^1,2'],
    rng: 'Native to the northern Atlantic from the Connecticut River to Quebec, Iceland and southern Greenland; landlocked populations occur in inland waters. ^1',
    src: [['tmf', 'atlantic-salmon', 'Atlantic Salmon'], ['me', 'landlocked-salmon', 'Landlocked Salmon: Species Information'], ['tmf', 'brown-trout', 'Brown Trout']] });

  A({ id: 'coho-salmon', n: 'Coho Salmon', sci: 'Oncorhynchus kisutch', w: 'b', r: 'pn3 ak3 gl2 ca1', al: ['coho', 'silver salmon', 'silvers', 'silver'],
    art: { t: 'trout', tt: 'fork', tn: .3, dep: 1.0, back: '#2e4a5e', side: '#b6c2c8', belly: '#f4f4f0', fin: '#6a7e8a', m: [{ k: 'spots', n: 26, r: [1, 1.6], c: '#161616', o: .8, y: [-.9, -.2], x: [.25, .94], tail: 6 }] },
    idm: ['A silvery fish at sea with small black spots on the back, upper sides, base of the dorsal fin and the upper lobe of the tail ^1', 'Spots only on the upper half of the tail, unlike chinook ^1', 'White gum line on the lower jaw ^2,3', 'Spawning males develop a hooked jaw (kype); freshwater fish turn red on the sides ^1,2'],
    lk: [['Chinook (King) Salmon', 'Spots on both tail lobes and a black gum line. ^2,3']],
    sz: 'Adults may reach 25 lb or more but typically stay under 15 lb. ^2',
    bait: 'Herring or anchovy pieces, spoons, artificial squid, spinners, plugs and cut bait. ^1,2',
    tech: ['Freshwater: drift fish with bait bouncing along the bottom at current speed, or plunk with spoons or spinners. ^2', 'Ocean: troll within 15 ft of the surface with a spoon or artificial squid, at 3–5 mph, behind a dodger or flasher. ^2', 'Also jigging, fly fishing and still fishing. ^1'],
    where: ['Rivers, streams, lakes, bays, estuaries and the ocean; drop-offs, eddies, current edges, dams. ^1', 'Small, low-gradient tributaries with woody debris and tree-lined banks. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Pacific Ocean from Point Hope, Alaska to Monterey Bay, California; transplanted to the Great Lakes and other lakes. ^1',
    src: [['tmf', 'coho-salmon', 'Coho Salmon'], ['or', 'coho-salmon', 'Coho Salmon Fishing'], ['tmf', 'king-salmon', 'King (Chinook) Salmon']] });

  A({ id: 'chinook-salmon', n: 'Chinook (King) Salmon', sci: 'Oncorhynchus tshawytscha', w: 'b', r: 'pn3 ak3 ca2 gl2', al: ['king', 'king salmon', 'chinook', 'kings', 'tyee', 'chinook salmon'],
    art: { t: 'trout', tt: 'fork', tn: .3, dep: 1.05, back: '#4a3e5e', side: '#b6bcc0', belly: '#f4f4f0', fin: '#6a7580', m: [{ k: 'spots', n: 34, r: [1.2, 2], c: '#161616', o: .8, y: [-.9, -.1], x: [.22, .94], tail: 12 }] },
    idm: ['A silvery fish at sea with spotting on the back, upper sides, top of head and all fins ^1', 'Round black spots on both lobes of the tail ^2', 'Black mouth and gums (coho have white gums) ^1,2', 'A purple hue to the back, with large oblong black spots ^2'],
    lk: [['Coho Salmon', 'Spots only on the upper tail lobe and a white gum line. ^1,2']],
    sz: 'The largest Pacific salmon; can reach upwards of 50 lb, though 10–25 lb is more common. ^1,2',
    bait: 'Rivers: spinners, shrimp and anchovies. Ocean: spoons, imitation squid, or a whole herring or anchovy behind an attractor such as a dodger. ^2',
    tech: ['River fishing with spinners or bait from shore or boat. ^2', 'Ocean: go deep with spoons, imitation squid or whole herring. ^2', 'Also jigging, fly fishing, still fishing, drift fishing and trolling. ^1'],
    where: ['Rivers, streams, bays, estuaries and the ocean; drop-offs, current edges and eddies. ^1', 'Spawners need clean, well-oxygenated fresh water. ^2'],
    when: ['Oregon runs: spring run August–early November, fall run October–early March. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Pacific coast from the Ventura River, California to Point Hope, Alaska. ^1',
    src: [['tmf', 'king-salmon', 'King (Chinook) Salmon'], ['or', 'chinook-salmon', 'Chinook Salmon Fishing']] });

  A({ id: 'sockeye-salmon', n: 'Sockeye Salmon', sci: 'Oncorhynchus nerka', w: 'b', r: 'ak3 pn3', al: ['sockeye', 'red salmon', 'reds', 'kokanee'],
    art: { t: 'trout', tt: 'fork', tn: .3, dep: .95, back: '#2e4a6a', side: '#b8c4c8', belly: '#f4f4f0', fin: '#6a8090', m: [] },
    idm: ['Breeding males are bright red with small, indistinct black speckling on the back ^1', 'Landlocked populations are called kokanee ^1'],
    bait: 'Cured fish roe, small flashy metal spoons, a small hook with worm or maggot, and flies (for surface-feeding kokanee). Cut bait, plugs and spinner baits also listed. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and trolling. ^1'],
    where: ['Rivers, streams, bays, eddies, dams, falls and current edges. ^1'],
    tip: ['Sockeye are plankton feeders, which affects bait choice. ^1', 'Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Pacific Ocean and tributaries from Hokkaido to the Anadyr River, and from the Sacramento River, California to Point Hope, Alaska. ^1',
    src: [['tmf', 'sockeye-salmon', 'Sockeye Salmon']] });

  A({ id: 'pink-salmon', n: 'Pink Salmon', sci: 'Oncorhynchus gorbuscha', w: 'b', r: 'ak3 pn3 gl1', al: ['pink', 'humpy', 'humpback', 'humpies', 'humpback salmon'],
    art: { t: 'trout', tt: 'fork', tn: .3, dep: .95, back: '#3a5a72', side: '#bcc6ca', belly: '#f4f4f0', fin: '#6a8494', m: [{ k: 'spots', n: 22, r: [1.8, 3], c: '#1c1c1c', o: .7, y: [-.9, -.1], x: [.25, .94], tail: 8 }] },
    idm: ['The smallest Pacific salmon, averaging 3–5 lb ^1', 'Large, black, oval spots on both halves of the tail and on the back ^1', 'Spawning males develop a humpback and pale red or pink coloring with brown to olive-green blotches ^1'],
    bait: 'Spoons, spinner baits, plugs, flies, cured fish roe and cut bait. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing, trolling and spin casting. ^1'],
    where: ['Bays, estuaries, rivers and streams: eddies, current edges, drop-offs and man-made structures. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Pacific and Arctic oceans; Alaska south to the Sacramento River and northeast to the Mackenzie River. Introduced in Newfoundland and Lake Superior tributaries. ^1',
    src: [['tmf', 'pink-salmon', 'Pink Salmon']] });

  A({ id: 'dolly-varden', n: 'Dolly Varden', sci: 'Salvelinus malma', w: 'b', r: 'ak3 pn2', al: ['dolly', 'dollies', 'char'],
    art: { t: 'trout', tt: 'square', tn: .15, dep: .95, back: '#4a5a40', side: '#8a9a62', belly: '#e0d8b0', fin: '#a88a52', m: [{ k: 'spots', n: 38, r: [1.2, 1.8], c: '#e8a8a0', o: .85, y: [-.8, .4], x: [.18, .94] }] },
    idm: ['A char: spots are usually smaller than the pupil of the eye (Arctic char’s are larger) ^1', 'Gill rakers typically number 21–22, versus 25–30 in Arctic char ^1', 'Bull trout are larger and prefer different habitat ^1'],
    bait: 'Cured fish roe, flies, spoons, spinner baits, plugs, cut bait and saltwater live bait. ^1',
    tech: ['Fly fishing, jigging, still fishing, drift fishing and trolling. ^1'],
    where: ['Bays, estuaries, rivers and streams: current edges, eddies and drop-offs. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Sea of Japan through the Kurils and Kamchatka, the Aleutians and around Alaska to the Yukon and Northwest Territories; anadromous, with some landlocked populations. ^1',
    src: [['tmf', 'dolly-varden', 'Dolly Varden']] });

  A({ id: 'arctic-grayling', n: 'Arctic Grayling', sci: 'Thymallus arcticus', w: 'f', r: 'ak3 pn1 gp1', al: ['grayling', 'graylings'],
    art: { t: 'grayling', tt: 'fork', tn: .3, dep: .9, back: '#4a5060', side: '#9aa0b0', belly: '#d8d8e0', fin: '#7a6a98', m: [{ k: 'spots', n: 22, r: [1.2, 1.9], c: '#2a2a3a', o: .75, y: [-.7, .2], x: [.2, .6] }] },
    idm: ['A distinctive sail-like dorsal fin followed by a small adipose fin ^1', 'Grayish-silver with gold and/or lavender overtones ^1', 'Dark spots, sometimes shaped like X’s or V’s ^1', 'Males have a higher, rounded rear dorsal fin ^1'],
    bait: 'Flies, plugs, spoons, spinner baits and insects. ^1',
    tech: ['Primarily fly fishing; still fishing is secondary. ^1'],
    where: ['Bend outsides, dams and falls, eddies, undercuts, ripples and swirls, rock pockets, drop-offs, merging currents and current edges. ^1', 'The best fishing is in the cold rivers and lakes of Alaska and northern Canada. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Hudson Bay west through northern and central Canada to Alaska and Siberia; small populations in Montana and Idaho. ^1',
    src: [['tmf', 'arctic-grayling', 'Arctic Grayling']] });

  A({ id: 'white-sturgeon', n: 'White Sturgeon', sci: 'Acipenser transmontanus', w: 'b', r: 'pn3 ca2 ak1', al: ['sturgeon', 'white sturgeon', 'sturgeons'],
    art: { t: 'sturgeon', dep: 1.0, back: '#4a4e48', side: '#7e8478', belly: '#e0dcc8', fin: '#5a5e54', m: [] },
    idm: ['A long, heavy body covered in five rows of large, heavy scutes (bony plates) ^1,2', 'Long flat snout and a deeply forked tail ^2', 'Four barbels like a mustache in front of the mouth ^1', 'Rough, scaleless, shark-like skin ^2'],
    lk: [['Green Sturgeon', 'Olive to dark green back with a green stripe along the belly. In Oregon green sturgeon may not be targeted, and any caught must be released immediately and unharmed. ^2']],
    sz: 'White sturgeon can reach 20 ft, but most rarely exceed 10 ft. ^2',
    bait: 'Cut bait, crabs, saltwater live bait, spoons, plugs and flies; “stinky bait on the bottom.” ^1,2',
    tech: ['They’re bottom feeders and use barbels to find food, so fish bait on the bottom. ^2', 'Still fishing, jigging, drift fishing, trolling and fly fishing are listed. ^1'],
    where: ['Oregon’s largest populations are in the Columbia and Willamette rivers; also bays and estuaries on the coast. ^2', 'Bays, rivers, oceans and estuaries; dams and falls, eddies. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1', 'Oregon bars targeting green sturgeon (any caught must be released immediately and unharmed). Sturgeon rules vary by state, so check yours. ^2'],
    rng: 'White sturgeon live on the Pacific coast from the Aleutian Islands to California. ^1',
    src: [['tmf', 'sturgeon', 'Sturgeon'], ['or', 'sturgeon', 'Sturgeon Fishing in Oregon']] });

  A({ id: 'american-shad', n: 'American Shad', sci: 'Alosa sapidissima', w: 'b', r: 'ne3 se2 pn2 ca1', al: ['shad', 'white shad', 'hickory shad'],
    art: { t: 'shad', dep: 1.0, back: '#3a5a6a', side: '#b8c4c8', belly: '#f2f2ee', fin: '#7a8e98', m: [{ k: 'dot', x: .3, y: -.3, r: 2.2, c: '#1c1c1c', o: .8 }, { k: 'spots', n: 6, r: [1, 1.5], c: '#1c1c1c', o: .5, y: [-.25, -.05], x: [.34, .6] }] },
    idm: ['A silvery fish with a single dorsal fin mid-back ^1', 'A large black spot right behind the top of the gill cover, followed by a row of smaller spots (4–27) ^1', 'Lower jaw fits into a deep notch under the upper jaw (unlike hickory shad) ^1'],
    bait: 'Jigs, flies, spoons, plugs, cut bait and saltwater live bait. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and surf casting. ^1'],
    where: ['Rivers and bays: backflow areas, ripples and currents, schools, drop-offs, undercuts, bend outsides, dams and falls, current edges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Atlantic coast from Labrador to the St. Johns River, Florida; also the St. Lawrence to Lakes Huron and Erie; introduced on the Pacific coast from Alaska to Baja California. ^1',
    src: [['tmf', 'american-shad', 'American Shad']] });

  A({ id: 'peacock-bass', n: 'Butterfly Peacock Bass', sci: 'Cichla ocellaris', w: 'f', r: 'se3', al: ['peacock', 'peacock bass', 'butterfly peacock', 'peacocks'],
    art: { t: 'bass', dep: 1.15, back: '#4a5a28', side: '#b8b840', belly: '#e0d890', fin: '#c85a28', eye: '#c8322a', m: [{ k: 'bars', at: [.36, .52, .68], w: 6, c: '#2a2a14', o: .6, y: [-.3, .5] }, { k: 'ocelli', n: 1, x: [.92, .92], y: [-.15, -.15], r: 4, c: '#1c1c1c', in: '#e8c848' }] },
    idm: ['Yellowish green with three dark, yellow-fringed blotches along the midsection ^1', 'An eyespot near the tail fin and deep reddish eyes ^1', 'No black markings on the gill covers (opercula) ^1', 'The bars fade in fish over three or four pounds ^1'],
    sz: 'Believed to reach 11–12 lb. ^1',
    bait: 'Jigs, plugs, spoons, minnows and spinner baits. ^1',
    tech: ['Drift fishing, trolling, still fishing, fly fishing, bait casting and spin casting. ^1'],
    where: ['Lakes and ponds with rocks, docks, lily pads, weed beds, drop-offs and overhanging vegetation. ^1'],
    when: ['They feed in broad daylight when temperatures are at their peak and seldom bite at night or early morning. ^1'],
    tip: ['“Pound for pound one of the hardest fish to handle on light tackle.” ^1'],
    rng: 'Native to tropical South America; introduced to Florida and Texas in the mid-1980s (and Hawaii in 1957). ^1',
    src: [['tmf', 'butterfly-peacock-bass', 'Butterfly Peacock Bass']] });
  /* ---------- Atlantic & Gulf saltwater ---------- */
  A({ id: 'bluefish', n: 'Bluefish', sci: 'Pomatomus saltatrix', w: 's', r: 'ne3 se3 sc1', al: ['blues', 'chopper', 'choppers', 'snapper blue'],
    art: { t: 'bluefish', dep: 1.0, back: '#3a6a8a', side: '#9ab8c4', belly: '#f0f0ee', fin: '#6a8a9a', m: [] },
    idm: ['Blue or blue-green back fading to silver on the sides and belly ^2', 'Two dorsal fins, a forked tail and very sharp teeth ^1,2', 'A spine in the second dorsal fin, no head markings, and no gap between the dorsal fins ^1'],
    sz: 'Usually 20–25 in, up to 42 in. ^2',
    bait: 'Surface plugs, jigs, spoons, spinner baits, squid and live bait; plugs, lures or feathers also work. ^1,2',
    tech: ['Trolling, chumming, casting, jigging, drift fishing, surf casting and still fishing from boats, shore or piers. ^1', 'Look near inlets, shoals and rips where schools feed on baitfish. Surface-feeding schools are prime targets. ^2', 'Use at least 40 lb mono or braid with a wire leader; they can bite through weak line. ^2'],
    where: ['Bays, estuaries, breakers and channel entrances. ^1', 'Pelagic, schooling fish often seen feeding at the surface. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Temperate to tropical waters worldwide; in the U.S. mainly the South and Northeast. ^1,2',
    src: [['tmf', 'bluefish', 'Bluefish'], ['ma', 'bluefish', 'Learn about Bluefish']] });

  A({ id: 'atlantic-mackerel', n: 'Atlantic Mackerel', sci: 'Scomber scombrus', w: 's', r: 'ne3', al: ['mackerel', 'macks', 'boston mackerel'],
    art: { t: 'mack', dep: .9, back: '#2e6a6a', side: '#a6bcc0', belly: '#f2f2ee', fin: '#6a8a90', m: [{ k: 'bars', at: [.22, .27, .32, .37, .42, .47, .52, .57, .62, .67, .72, .77, .82], w: 1.8, c: '#1c2a2a', o: .6, y: [-.95, -.15] }] },
    idm: ['Metallic blue-green back fading to silver, with 20–30 wavy black bars down the sides ^1', 'Tapered body, large head and mouth, two large dorsal fins and a forked tail ^1'],
    sz: 'Up to about 16 in and 2 lb. ^1',
    bait: 'Quick to bite and go after bait meant for other species; they eat copepods, shrimp, krill, squid and small fish. ^1',
    tech: ['Mackerel are caught by jigging with rod and reel. ^1'],
    where: ['A schooling fish that tends to stay above 180 ft. ^1'],
    when: ['Spawn April–May in the Mid-Atlantic Bight and June–July in the Gulf of St. Lawrence. ^1'],
    tip: ['Our source offers little angling detail beyond the above. ^1'],
    rng: 'Found from the Gulf of St. Lawrence and the Strait of Belle Isle; common in the western North Atlantic. ^1',
    src: [['ma', 'atlantic-mackerel', 'Learn about Atlantic Mackerel']] });

  A({ id: 'summer-flounder', n: 'Summer Flounder (Fluke)', sci: 'Paralichthys dentatus', w: 's', r: 'ne3 se2', al: ['fluke', 'flounder', 'summer flounder', 'flatfish'],
    art: { t: 'flat', dep: 1.0, back: '#7a6a4a', side: '#9a8a62', belly: '#d8d0b8', fin: '#8a7a54', m: [{ k: 'spots', n: 20, r: [2, 3.6], c: '#2a2014', o: .55, y: [-.6, .5], x: [.2, .9] }] },
    idm: ['A left-side flatfish with both eyes on the left side of the body ^1', 'A large mouth that can extend beyond its eyes ^1', 'Can change color: gray, blue, green, orange or black with dark spots ^1'],
    lk: [['Winter Flounder', 'Eyes on the right side; summer flounder’s are on the left. ^1,2']],
    sz: 'Females reach about 20 lb; males rarely exceed 5 lb. ^1',
    bait: 'Squid, sand lance, sea robins and bluefish; also meat strips from the tails or bellies of fish. ^1',
    tech: ['Drift the bait along the bottom with the reel’s bail open and the line held by a finger. When a fluke tugs, let the line run briefly so it takes the bait. ^1'],
    where: ['Inshore Massachusetts in warm months, around eelgrass beds and wharf pilings. In summer they are on sandy and muddy bottoms of bays and harbors; larger fish stay deeper. ^1'],
    tip: ['Take Me Fishing’s general flounder page rates catch difficulty as easy but gives no species detail. ^3'],
    rng: 'Predominant in coastal waters from the Gulf of Maine to Florida; fisheries occur from Cape Cod to North Carolina. ^1',
    src: [['ma', 'fluke', 'Learn about Fluke'], ['url', 'https://www.fisheries.noaa.gov/species/winter-flounder', 'Winter Flounder', 'NOAA Fisheries'], ['tmf', 'flounder', 'Flounder']] });

  A({ id: 'winter-flounder', n: 'Winter Flounder', sci: 'Pseudopleuronectes americanus', w: 's', r: 'ne3', al: ['flounder', 'blackback', 'lemon sole', 'flatfish'],
    art: { t: 'flat', dep: 1.05, back: '#5a4a38', side: '#6a5a40', belly: '#e0dcc8', fin: '#6a5a40', m: [] },
    idm: ['An oval, thick-bodied flatfish with both eyes on the right side ^1', 'A straight lateral line ^1', 'The upper side varies from muddy or reddish brown to olive green, dark slate or almost black; the underside is white ^1'],
    lk: [['Summer Flounder (Fluke)', 'Eyes on the left side and a large mouth. ^2']],
    sz: 'Live 15–18 years and grow to more than 2 ft. ^1',
    bait: 'Anglers use bait in nearshore waters. ^1',
    where: ['Estuaries and the continental shelf, over muddy sand, clean sand, clay, and pebbly or gravelly bottoms. ^1', 'They often bury their bodies in the bottom sediment, leaving only the eyes showing. ^1'],
    tip: ['NOAA notes a small recreational fishery with seasons, minimum sizes and possession limits. Check current rules. ^1', 'Their diet is small invertebrates, shrimp, clams and worms. ^1'],
    rng: 'Gulf of St. Lawrence to North Carolina, most common north of Delaware Bay. ^1',
    src: [['url', 'https://www.fisheries.noaa.gov/species/winter-flounder', 'Winter Flounder', 'NOAA Fisheries'], ['ma', 'fluke', 'Learn about Fluke']] });

  A({ id: 'tautog', n: 'Tautog', sci: 'Tautoga onitis', w: 's', r: 'ne3 se1', al: ['blackfish', 'tog', 'black fish'],
    art: { t: 'seabass', dep: 1.2, back: '#2a3032', side: '#4a5456', belly: '#a8aeae', fin: '#3a4244', m: [{ k: 'worms', n: 12, c: '#8a9496', o: .3, y: [-.8, .3] }] },
    idm: ['A stout fish with a blunt nose and thick lips ^2', 'Large conical front teeth and flat crushing teeth in back ^2', 'First dorsal fin with 16–17 spines of nearly equal length ^1', 'Dark green to black above with mottling, lighter belly; large fish can be nearly all black ^1,2'],
    sz: 'Average angler-caught fish is 2–4 lb; the largest recorded was nearly 23 lb. ^2',
    bait: 'Sea worms, crabs (green, rock, hermit or fiddler), conch pieces, snails, cracked clams, mussels, shrimp and sand fleas. ^1,2',
    tech: ['Use a medium-action rod with 20–30 lb line and a no-hardware 2-hook rig with the sinker at the bottom. When a fish bites, let it tap once or twice, set the hook and lift the fish away from the bottom. ^2', 'Drift fishing, bottom bouncing, still fishing and jigging also listed. ^1'],
    where: ['Rocky bottoms, shell beds, inshore wrecks, jetties, breakwaters, reefs and other structure. ^1', 'Fish from a boat or cast from a rocky shoreline. ^2', 'Massachusetts: best on the Cape, Nantucket Shoal, Vineyard Sound and Buzzards Bay. ^2'],
    when: ['April–May and fall, when they concentrate along shorelines. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Nova Scotia to Georgia (South Carolina per Take Me Fishing), most common between Cape Cod and the Chesapeake or Delaware Bay. ^1,2',
    src: [['tmf', 'tautog', 'Tautog'], ['ma', 'tautog', 'Learn about Tautog']] });

  A({ id: 'black-sea-bass', n: 'Black Sea Bass', sci: 'Centropristis striata', w: 's', r: 'ne3 se3', al: ['sea bass', 'bsb', 'blackfish sea bass', 'humpback'],
    art: { t: 'seabass', dep: 1.05, back: '#2e3438', side: '#5a646a', belly: '#c4c8c8', fin: '#4a545a', m: [{ k: 'spots', n: 30, r: [1, 1.5], c: '#e8ecec', o: .45, y: [-.7, .3], x: [.2, .85] }] },
    idm: ['A stout body, long dorsal fin and large pectoral and pelvic fins ^2', 'Blackish to grayish, with white at the centers of the scales ^2', 'Rounded tail with an elongated top ray in larger fish ^1', 'Large males have a hump behind the head; spawning males show bright blue ^1,2'],
    sz: 'Can reach about 25 in and over 8 lb, but most weigh under 4 lb; typical catches are 0.5–2 lb. ^2',
    bait: 'Crab, fish or squid is generally the most productive; shrimp, cut bait and jigs also work. Occasionally they take plugs, jigs or lures. ^1,2',
    tech: ['Use a smaller hook with a small sinker tied below it. ^2', 'Drift fishing, still fishing, bottom bouncing and jigging are listed. ^1', 'Handle carefully: the dorsal spines and gill covers are very sharp. ^2'],
    where: ['Wrecks, reefs, piers, breakwaters, jetties and rock piles; shell and coral beds. ^1,2', 'Up to about 120 ft in Massachusetts; largest concentrations in Buzzards Bay and Nantucket and Vineyard Sounds. ^2'],
    when: ['Best fishing starts in May and runs through summer in Massachusetts. ^2', 'Take Me Fishing says 6–20 fathoms May–June and November–December, though they can be caught year-round. ^1'],
    tip: ['Black sea bass are hermaphrodites: most start as females and change to males. ^1'],
    rng: 'Massachusetts to the Gulf of Mexico, most common from Long Island to South Carolina. ^1',
    src: [['tmf', 'black-sea-bass', 'Black Sea Bass'], ['ma', 'black-sea-bass', 'Learn about Black Sea Bass']] });

  A({ id: 'scup', n: 'Scup (Porgy)', sci: 'Stenotomus chrysops', w: 's', r: 'ne3', al: ['porgy', 'porgies', 'fluke bait scup', 'scuppers'],
    art: { t: 'deep', dep: 1.0, back: '#5a6a72', side: '#a4b0b4', belly: '#f0f0ee', fin: '#7a8a92', m: [{ k: 'stripe', ys: [-.45, -.2, .05], x: [.2, .85], w: 1, c: '#3a4a54', o: .5 }, { k: 'spots', n: 20, r: [.9, 1.3], c: '#5ab0d8', o: .7, y: [-.7, .1], x: [.25, .85] }] },
    idm: ['A silvery fish with light blue specks and several horizontal stripes, white belly ^1', 'Darker patches on the head, a small mouth, high-set eyes and one long spiny dorsal fin ^1'],
    sz: 'Can reach 18 in and 5 lb; most Massachusetts catches are under 3 lb and 14 in. ^1',
    bait: 'Sea worms, squid strips, and pieces of clam or fish. Most anglers prefer bait to small lures. ^1',
    tech: ['Use a bank sinker on the end of the line with 1–3 snelled hooks (size #1–#8), 6–10 in above the sinker. Set the hook at the slightest dip of the rod tip. ^1'],
    where: ['Piers, rocks, offshore ledges, jetties and mussel beds; smaller fish stay shallower. ^1', 'Fish high tides in harbors and along sandy beaches, or deeper channels at low tide. ^1'],
    when: ['In Massachusetts waters April–October, when sea temperatures exceed 45°F. May–August is peak spawning. ^1'],
    rng: 'Source covers Massachusetts waters only. ^1',
    src: [['ma', 'scup', 'Learn about Scup']] });

  A({ id: 'atlantic-cod', n: 'Atlantic Cod', sci: 'Gadus morhua', w: 's', r: 'ne3', al: ['cod', 'codfish', 'scrod'],
    art: { t: 'cod', dep: 1.05, back: '#6a6a3a', side: '#9a9a62', belly: '#eeeadc', fin: '#7a7a48', m: [{ k: 'spots', n: 40, r: [1, 1.6], c: '#3a3a1c', o: .5, y: [-.85, .2], x: [.15, .9] }, { k: 'lat', y: -.2, c: '#f0ecd4', w: 1.2, o: .8 }] },
    idm: ['A large barbel on the chin and an arch in the lateral line ^1', 'Gray-green or red-brown with dark spots that fade along the sides ^2', 'Three dorsal fins and two anal fins ^2'],
    sz: 'Inshore cod are 27–34 in and 6–12 lb; offshore fish are usually 40–42 in and about 25 lb. ^2',
    bait: 'Clams, squid strips, crabs, sand eels, sand lance, mackerel and herring strips. Chrome diamond jigs, bucktails, spoons and jigs with teasers. ^1,2',
    tech: ['Drift fishing, still fishing, jigging, bottom bouncing and trolling. ^1', 'Massachusetts guidance: 7.5–9 ft rod, 4/0 reel, 50 lb Dacron line. ^2'],
    where: ['Coastal waters, reefs, wrecks, shoals and rocky bottoms in deep water, typically 200–440 ft. ^1,2'],
    when: ['They spawn in winter and adults move offshore to reproduce. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1', 'Massachusetts DMF manages cod within 3 miles of shore, so check current rules. ^2'],
    rng: 'Greenland to North Carolina. ^1,2',
    src: [['tmf', 'atlantic-cod', 'Atlantic Cod'], ['ma', 'atlantic-cod', 'Learn about Atlantic Cod']] });

  A({ id: 'spotted-seatrout', n: 'Spotted Seatrout', sci: 'Cynoscion nebulosus', w: 's', r: 'se3 sc3 ne1', al: ['speckled trout', 'specks', 'trout', 'speck', 'spotted trout', 'seatrout'],
    art: { t: 'snook', dep: .95, back: '#4a5a54', side: '#9aa8a2', belly: '#eeeeea', fin: '#8a9a94', m: [{ k: 'spots', n: 36, r: [1.2, 1.9], c: '#1c1c1c', o: .75, y: [-.9, -.1], x: [.25, .94], tail: 8 }] },
    idm: ['Round black spots on the back, upper flanks, tail and second dorsal fin ^1', 'Two large, recurved canine teeth at the front of the upper jaw ^1'],
    bait: 'Shrimp is the most popular and effective bait; also live bait, cut bait, jigs, spoons, plugs and flies. ^1',
    tech: ['Chumming from drifting or anchored boats, trolling, jigging, surf casting, fly fishing, drift fishing and still fishing. ^1'],
    where: ['Shallow areas of bays and estuaries, channel entrances, saltwater weed beds and man-made structures. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic from New York to the Gulf of Mexico, especially off the Carolinas and Texas. ^1',
    src: [['tmf', 'spotted-seatrout', 'Spotted Seatrout']] });

  A({ id: 'weakfish', n: 'Weakfish', sci: 'Cynoscion regalis', w: 's', r: 'ne2 se3', al: ['squeteague', 'gray trout', 'seatrout', 'yellowfin trout', 'tide runner'],
    art: { t: 'snook', dep: .95, back: '#5a6a5a', side: '#b0b8a6', belly: '#f0eee4', fin: '#a8a888', m: [{ k: 'spots', n: 22, r: [1, 1.5], c: '#3a3a2a', o: .5, y: [-.9, -.3], x: [.3, .9] }] },
    idm: ['The lower jaw clearly projects beyond the upper ^1', 'Two large, recurved canine teeth at the front of the upper jaw ^1'],
    bait: 'Shrimp, squid, cut bait, live bait, soft plastics, jigs, plugs, spoons and trolling lures. ^1',
    tech: ['Drift fishing, chumming, bait casting, still fishing, trolling, fly fishing, bottom bouncing and surf casting. ^1'],
    where: ['Surf, bays and estuaries, jetties, piers, docks, tidal flats and channel entrances. ^1', 'Sandy bottoms in summer; deeper water in winter. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic from Florida to Massachusetts; North Carolina to Florida in winter, Delaware to New York in summer. ^1',
    src: [['tmf', 'weakfish', 'Weakfish']] });

  A({ id: 'red-drum', n: 'Red Drum (Redfish)', sci: 'Sciaenops ocellatus', w: 's', r: 'se3 sc3 ne1', al: ['redfish', 'red', 'channel bass', 'puppy drum', 'reds', 'spottail'],
    art: { t: 'drum', dep: 1.0, back: '#8a5a3a', side: '#b88a62', belly: '#f0e8d8', fin: '#a87a52', m: [{ k: 'dot', x: .88, y: -.35, r: 2.8, c: '#101010', o: .95 }] },
    idm: ['Coppery red overtones on a silvery-gray body ^1', 'A large black spot, about eye-sized, on each side near the base of the tail ^1'],
    sz: 'Fish up to about 10–15 lb are described as very fine eating. ^1',
    bait: 'Crabs, shrimp, clams, strip bait, jigs, plugs, spoons and streamer flies. ^1',
    tech: ['Drift fishing, bottom fishing, jigging, casting from boats or shore, slow trolling and fly fishing. They can also be stalked on flats. ^1'],
    where: ['Inshore: bays, estuaries, channels and inlets over sandy or muddy bottoms, in salt and brackish water. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from Maine to the Gulf of Mexico. ^1',
    src: [['tmf', 'red-drum', 'Red Drum']] });

  A({ id: 'black-drum', n: 'Black Drum', sci: 'Pogonias cromis', w: 's', r: 'se2 sc3 ne1', al: ['drum', 'puppy drum', 'big drum'],
    art: { t: 'drum', dep: 1.15, back: '#4a4a48', side: '#7a7a76', belly: '#c8c8c0', fin: '#5a5a56', m: [{ k: 'bars', at: [.32, .44, .56, .68], w: 5, c: '#1c1c1c', o: .25 }] },
    idm: ['A large spine in the anal fin and numerous barbels on the chin ^1', 'Large pavement-like teeth in the throat for crushing shellfish ^1', 'Juveniles show 4 or 5 broad, dark vertical bars ^1'],
    sz: 'Drum of about 10–15 lb are said to be good eating. ^1',
    bait: 'Shrimp, clams, crabs, squid, cut fish, metal jigs, spoons and weighted bucktails. ^1',
    tech: ['Bottom fishing, casting from boats or shore, and slow trolling. Jigging, drift fishing and still fishing are also listed. ^1'],
    where: ['Inshore schooling fish near breakwaters, jetties, bridge and pier pilings, clam and oyster beds, channels, estuaries, bays and sandy shorelines. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from Nova Scotia to northern Mexico, including southern Florida. ^1',
    src: [['tmf', 'black-drum', 'Black Drum']] });

  A({ id: 'sheepshead', n: 'Sheepshead', sci: 'Archosargus probatocephalus', w: 's', r: 'se3 sc3 ne1', al: ['convict fish', 'sheepies', 'sheep'],
    art: { t: 'deep', dep: 1.15, back: '#4a4e50', side: '#a8aeae', belly: '#e4e4e0', fin: '#6a7072', m: [{ k: 'bars', at: [.22, .32, .42, .52, .62, .72, .82], w: 4.5, c: '#141414', o: .8, y: [-.95, .6] }] },
    idm: ['Seven vertical, very prominent black bars ^1', 'Incisors, molars and grinders for crushing shellfish ^1', 'Black and white bars make it distinctive on the Texas coast (“convict fish”) ^2'],
    sz: 'Almost 30 in and over 20 lb at the most; most catches are 2–8 lb and 15–20 in. ^1',
    bait: 'Shrimp, cut bait, clams or squid; small fiddler and hermit crabs are used by experienced fishermen. Jigs and live bait also work. ^1,2',
    tech: ['Drift fishing, still fishing, jigging, chumming and casting. ^1', 'Scrape barnacles off pilings and rocks to chum. ^1', 'They are adept at stealing bait, so stay alert. ^2'],
    where: ['Rocks, pilings, piers, jetties, mangroves, tidal creeks, bays and estuaries. ^1', 'In Texas: jetties, rock piles and reefs. ^2'],
    when: ['Most active during late-winter and early-spring spawning. Texas spawning occurs in February and March. ^1,2'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic from Nova Scotia south through the Gulf of Mexico. ^1',
    src: [['tmf', 'sheepshead', 'Sheepshead'], ['tx', 'sheepshead', 'Sheepshead (Archosargus probatocephalus)']] });

  A({ id: 'spanish-mackerel', n: 'Spanish Mackerel', sci: 'Scomberomorus maculatus', w: 's', r: 'se3 sc3 ne1', al: ['spanish', 'spanish mack', 'macks'],
    art: { t: 'mack', dep: .9, back: '#3a7a7a', side: '#b0c4c4', belly: '#f2f2ee', fin: '#7a9a9a', m: [{ k: 'spots', n: 18, r: [1.8, 2.8], c: '#d8a032', o: .85, y: [-.1, .35], x: [.3, .85] }] },
    idm: ['Bronze or yellow spots but no stripes (unlike cero and king mackerel) ^1', 'The front dorsal fin is black ^1', 'A silvery, typical mackerel body ^1'],
    bait: 'Jigs (nylon jigs retrieved fast are among the best), spoons, plugs, flies, cut bait, live shrimp and minnows. ^1',
    tech: ['Drift fishing, chumming, surf casting, trolling, fly fishing, jigging and still fishing. ^1'],
    where: ['Bays, estuaries, reefs, wrecks, jetties and coastal shore points. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic north to Chesapeake Bay (occasionally Cape Cod) and south to Yucatan. ^1',
    src: [['tmf', 'spanish-mackerel', 'Spanish Mackerel']] });

  A({ id: 'king-mackerel', n: 'King Mackerel', sci: 'Scomberomorus cavalla', w: 's', r: 'se3 sc3', al: ['kingfish', 'king', 'kings', 'king mack'],
    art: { t: 'mack', dep: .95, back: '#2e5e74', side: '#a4b8bc', belly: '#f0f0ec', fin: '#6a8a96', m: [{ k: 'lat', y: -.2, c: '#3a5a66', w: 1.2, o: .6, dip: 4 }] },
    idm: ['A sharp dip in the lateral line under the second dorsal fin ^1', '14–16 spines in the first dorsal fin, which is uniformly blue (Spanish mackerel’s is black) ^1', 'Young fish have spots that fade with age ^1'],
    bait: 'Live or dead ballyhoo, mullet, jacks, herring, pinfish, croakers and shrimp; spoons, feathers, jigs and plugs. ^1',
    tech: ['Trolling, drifting live bait, casting, chumming, bottom bouncing and jigging. ^1'],
    where: ['Coastal pelagic water of 10–20 fathoms: wrecks, buoys, coral reefs, jetties, breakwaters and nearshore reefs. ^1'],
    when: ['A migratory species; winter is prime around South Florida. In summer it reaches Texas to the west and Virginia to the north. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic tropical and subtropical waters from Maine to Rio de Janeiro, including the Gulf of Mexico. ^1',
    src: [['tmf', 'king-mackerel', 'King Mackerel']] });

  A({ id: 'cobia', n: 'Cobia', sci: 'Rachycentron canadum', w: 's', r: 'se3 sc3 ne1', al: ['ling', 'lemonfish', 'crabeater', 'black kingfish'],
    art: { t: 'cobia', dep: 1.0, back: '#3a2e22', side: '#6a5a46', belly: '#d8d0bc', fin: '#4a3e30', m: [{ k: 'stripe', ys: [-.15], x: [.15, .9], w: 4, c: '#e0d8c4', o: .55 }] },
    idm: ['A long, broad, flattened head ^1', 'Dark chocolate-brown back with lighter sides and alternating horizontal stripes ^1'],
    bait: 'Squid, crabs, small live baits, cut bait, spoons, plugs and weighted feathers. ^1',
    tech: ['Trolling lures or bait, bottom fishing, jigging, chumming and spin casting. ^1'],
    where: ['Coastal waters, reefs, wrecks, shoals and floating debris. Adults gather around buoys, pilings, wrecks, anchored boats and flotsam over the shallow continental shelf. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Tropical and warm temperate waters worldwide, offshore and inshore. ^1',
    src: [['tmf', 'cobia', 'Cobia']] });

  A({ id: 'florida-pompano', n: 'Pompano', sci: 'Trachinotus carolinus', w: 's', r: 'se3 sc2', al: ['florida pompano', 'pompano', 'pomps'],
    art: { t: 'deep', dep: 1.0, back: '#4a7a7a', side: '#b8c8c8', belly: '#f6f4ec', fin: '#8a9a9a', m: [] },
    idm: ['Typically 17–25 in with a short, deep, compressed body ^1', 'Blue to greenish above fading to silver on the sides; deeply forked tail ^1'],
    bait: 'Live sand crabs (sand fleas) are recommended. Live shrimp, dead sand crabs, clams and squid pieces also work. Small jigs, spoons and pencil baits. ^1',
    tech: ['Fly fishing, surf casting, spin casting, bait casting, still fishing and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, piers, docks, surf and shore, breakers, jetties, mangroves and tidal flats. ^1'],
    when: ['Spawning occurs from spring through late fall. They move north in warmer months and south in cooler months. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from North Carolina down to Florida and along the Gulf states. ^1',
    src: [['tmf', 'pompano', 'Pompano']] });

  A({ id: 'snook', n: 'Snook', sci: 'Centropomus undecimalis', w: 'b', r: 'se3 sc1', al: ['common snook', 'linesider', 'robalo'],
    art: { t: 'snook', dep: 1.0, back: '#5a5e3a', side: '#b8bc8a', belly: '#f0eedc', fin: '#9a9a62', m: [{ k: 'lat', y: -.2, c: '#101010', w: 2.4, o: .95 }] },
    idm: ['A protruding lower jaw ^1', 'A highly prominent black lateral line from the top of the gill cover through the tail ^1', 'Back brown, olive green, dark gray or black with silvery flanks and belly ^1'],
    bait: 'Live baitfish (sunfish, mullet), crabs, shrimp, cut bait, plugs, jigs, spoons, soft plastics and flies. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and surf casting. ^1'],
    where: ['Mangroves, jetties, breakers, channel entrances, tidal flats and structures near ocean inlets. ^1'],
    when: ['Best on the changing tide, especially a high falling tide around river mouths and shores, and at night from bridges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'American tropics and subtropics in shallow coastal waters, estuaries and brackish lagoons. ^1',
    src: [['tmf', 'snook', 'Snook']] });

  A({ id: 'tarpon', n: 'Tarpon', sci: 'Megalops atlanticus', w: 's', r: 'se3 sc2', al: ['silver king', 'silverking'],
    art: { t: 'tarpon', dep: 1.05, back: '#3a6a6a', side: '#d0d8d8', belly: '#f6f6f2', fin: '#8aa0a0', bigscales: 1, m: [] },
    idm: ['A compressed body covered in very large scales ^1', 'The lower jaw juts out and up ^1', 'Greenish to bluish back with brilliant silver sides and belly ^1'],
    bait: 'Live mullet, pinfish, crabs and shrimp; spoons, plugs, flies, jigs and soft plastics. ^1',
    tech: ['Still fishing, casting, trolling, jigging, fly fishing, surf casting and drift fishing. ^1'],
    where: ['Bays, breakers, jetties, mangroves, piers, tidal flats and channel entrances. ^1'],
    when: ['Best fishing occurs at night when the tarpon is feeding. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Warm temperate, tropical and subtropical Atlantic waters, inshore and offshore. ^1',
    src: [['tmf', 'tarpon', 'Tarpon']] });

  A({ id: 'red-snapper', n: 'Red Snapper', sci: 'Lutjanus campechanus', w: 's', r: 'sc3 se3', al: ['snapper', 'reds', 'american red snapper'],
    art: { t: 'snapper', dep: 1.05, back: '#b03a32', side: '#d8706a', belly: '#f4d8d0', fin: '#c04a40', m: [] },
    idm: ['A long, triangular face with the upper part sloping more strongly than the lower ^1', 'Enlarged canine teeth ^1', 'Red coloring that is “redder” in deeper water ^1'],
    sz: 'May reach 40 in and 50 lb. ^1',
    where: ['Adults live on the bottom near hard structure on the continental shelf (coral and artificial reefs, rocks, ledges, caves) at about 30–620 ft. ^1', 'Juveniles live in shallow water over sandy or muddy bottoms. ^1'],
    tip: ['Their diet is fish, shrimp, crab, worms and squid or octopus. ^1', 'Anglers use hook and line. In the Gulf, red snapper have a minimum size and daily limit; check current federal and state rules. ^1', 'Take Me Fishing’s red snapper page appears to contain red grouper text, so we do not use it for identification. ^2'],
    rng: 'Gulf and western Atlantic coasts of North and Central America and northern South America; rare north of the Carolinas. ^1',
    src: [['url', 'https://www.fisheries.noaa.gov/species/red-snapper', 'Red Snapper', 'NOAA Fisheries'], ['tmf', 'red-snapper', 'Red Snapper']] });

  A({ id: 'gray-snapper', n: 'Gray (Mangrove) Snapper', sci: 'Lutjanus griseus', w: 's', r: 'se3 sc2', al: ['mangrove snapper', 'mangrove', 'mango snapper', 'grey snapper'],
    art: { t: 'snapper', dep: .95, back: '#5a5e48', side: '#9a8a6a', belly: '#e0d4bc', fin: '#8a7a5a', m: [{ k: 'spots', n: 28, r: [.9, 1.3], c: '#c8683a', o: .6, y: [-.5, .4], x: [.25, .85] }] },
    idm: ['A slender body, large mouth and pointed snout ^1', 'Gray to green with a reddish tinge, with rows of small reddish to orange spots ^1', 'Young fish show a dark stripe from the snout through the eye ^1'],
    sz: 'Rarely exceeds 18 in or 10 lb. ^1',
    bait: 'Shrimp, crabs, cut bait, squid, live bait, jigs, spoons and flies. ^1',
    tech: ['Drift fishing, chumming, casting, fly fishing, bottom bouncing, still fishing and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, mangroves, reefs, wrecks, jetties and seagrass beds; the largest are on offshore reefs and wrecks. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'The southern half of the eastern U.S. coast and Bermuda south to Brazil, including the Gulf of Mexico and the Caribbean. ^1',
    src: [['tmf', 'mangrove-snapper', 'Mangrove Snapper']] });

  A({ id: 'mahi-mahi', n: 'Mahi-Mahi (Dolphinfish)', sci: 'Coryphaena hippurus', w: 's', r: 'se3 sc2 ne2 ca1', al: ['dolphin', 'dorado', 'dolphinfish', 'mahi', 'dolphin fish'],
    art: { t: 'mahi', dep: 1.0, back: '#2a7a8a', side: '#c8c040', belly: '#f2ecc0', fin: '#5aa0a8', m: [{ k: 'spots', n: 14, r: [1.2, 2], c: '#2a6a8a', o: .45, y: [-.3, .3], x: [.3, .85] }] },
    idm: ['A distinctive shape and colors; iridescent blue or blue-green back, gold flanks and a silvery white or yellow belly when alive ^1', 'Males have a high, vertical forehead; females have a rounded one ^1'],
    bait: 'Flying fish, mullet, ballyhoo, squid and strip baits; plugs and spoons. Live bait works well. ^1',
    tech: ['Trolling surface baits, drift fishing, jigging, casting and live-bait fishing. ^1'],
    where: ['Baitfish patches, floating foam and debris, merging water, reefs, wrecks and shoals, and deep water near shore. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Tropical and warm temperate seas worldwide; mostly deep water, occasionally from piers. ^1',
    src: [['tmf', 'dolphinfish', 'Dolphinfish']] });

  A({ id: 'yellowfin-tuna', n: 'Yellowfin Tuna', sci: 'Thunnus albacares', w: 's', r: 'se2 sc2 ne2 ca1', al: ['yellowfin', 'ahi', 'tuna'],
    art: { t: 'tuna', dep: 1.0, back: '#1e2a4a', side: '#b8c0c8', belly: '#eeeeea', fin: '#d8c030', m: [{ k: 'band', y: [-.32, -.22], x: [.14, .94], c: '#e8d030', o: .75 }] },
    idm: ['Blue-black back fading to silver below ^1', 'A golden-yellow or iridescent blue stripe from the eye to the tail ^1', 'Fins are golden yellow and the finlets black-edged; large fish have elongated dorsal and anal fins ^1'],
    bait: 'Cut bait, live bait, squid, small fish, strip baits, plugs and spoons. ^1',
    tech: ['Drift fishing, jigging, trolling with small fish, squid or artificial lures, and chumming with live bait. ^1'],
    where: ['The open ocean and deep water near shore: baitfish patches, floating debris, reefs, wrecks and shoals, and merging water. Look near birds. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1', 'A seasonal migrant; our source gives no months. ^1'],
    rng: 'Deep, warm temperate oceanic waters worldwide. ^1',
    src: [['tmf', 'yellowfin-tuna', 'Yellowfin Tuna']] });

  A({ id: 'false-albacore', n: 'False Albacore (Little Tunny)', sci: 'Euthynnus alletteratus', w: 's', r: 'se3 ne3 sc1', al: ['little tunny', 'albie', 'albies', 'bonito', 'fat albert'],
    art: { t: 'tuna', dep: .95, back: '#2a4a6a', side: '#a8b8c4', belly: '#f0f0ee', fin: '#6a7a8a', m: [{ k: 'worms', n: 22, c: '#1c2a3a', o: .6, y: [-.95, -.35], x: [.3, .92] }, { k: 'spots', n: 4, r: [1.6, 2.2], c: '#1c2a3a', o: .7, y: [.15, .3], x: [.3, .45] }] },
    idm: ['A scatter of dark spots resembling fingerprints between the pectoral and ventral fins ^1', 'Wavy, worm-like markings on the back ^1'],
    bait: 'Cut bait, jigs, live bait, spoons, trolling lures, flies, plugs, shrimp and squid. ^1',
    tech: ['Drift fishing, chumming, still fishing, trolling, fly fishing, casting and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, reefs, wrecks, shoals and open ocean. Look near flocks of diving seabirds and baitfish patches. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Tropical and warm temperate Atlantic from southern New England and Bermuda to Brazil. ^1',
    src: [['tmf', 'little-tunny', 'Little Tunny']] });

  A({ id: 'atlantic-croaker', n: 'Atlantic Croaker', sci: 'Micropogonias undulatus', w: 's', r: 'se3 sc3 ne2', al: ['croaker', 'hardhead', 'croakers'],
    art: { t: 'drum', dep: .9, back: '#7a6a52', side: '#b8a88a', belly: '#eee8d8', fin: '#9a8a6a', m: [{ k: 'stripe', ys: [-.7, -.5, -.3, -.1], x: [.25, .9], w: 1.6, c: '#6a5a3a', o: .35, dash: '5 3' }] },
    idm: ['Three to five pairs of small barbels on the chin ^1', 'Brown to olive vertical stripes on the sides ^1'],
    sz: 'Average about 12 in and 2 lb; up to about 4 lb. ^1',
    bait: 'Shrimp, clams and squid; jigs and spoons. ^1',
    tech: ['Drift fishing, surf casting, spin casting, chumming, still fishing and jigging. ^1'],
    where: ['Bays, estuaries, channel entrances, jetties, piers, docks and coastal waters. ^1'],
    when: ['Nearshore in spring and summer; they move offshore in fall to spawn. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Atlantic coast from Massachusetts south through the Gulf of Mexico. ^1',
    src: [['tmf', 'atlantic-croaker', 'Atlantic Croaker']] });
  /* ---------- Pacific saltwater ---------- */
  A({ id: 'pacific-halibut', n: 'Pacific Halibut', sci: 'Hippoglossus stenolepis', w: 's', r: 'ak3 pn3 ca1', al: ['halibut', 'barn door', 'chicken halibut'],
    art: { t: 'flat', dep: 1.1, back: '#4a4034', side: '#6a5a46', belly: '#e8e4d4', fin: '#5a4c3c', m: [{ k: 'spots', n: 18, r: [2, 4], c: '#a89a7a', o: .45, y: [-.7, .5], x: [.2, .9] }] },
    idm: ['Eyes almost always on the right side of the body ^2', 'Eyed side is greenish-brown to dark brown with lighter blotches; blind side white ^1,2', 'A large, stout but flat, diamond-shaped body ^2'],
    lk: [['California Halibut', 'Found mainly south of San Francisco, and nearly half have both eyes on the right side. ^3']],
    sz: 'Females exceed 470 lb and reach 9 ft; males typically don’t exceed 40 lb or 55 in. Oregon says the average is about 40 lb. ^1,2',
    bait: 'Large herring, jigs, spoons or shrimp flies on wire or very heavy mono leaders; also cod, squid, mackerel, smaller flatfish and crabs. ^1,2',
    tech: ['Boat anglers use heavy rods in deep water. ^2', 'Drift fishing and still fishing on the bottom; bottom bouncing and jigging. ^1'],
    where: ['On or near gravel bottoms in 150–500 ft; they favor cold water. ^2', 'Rocky sea floor; shallow in the north and deeper in warmer southern areas. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Cold North Pacific waters from the Bering Sea south to about Santa Rosa Island, California. ^1',
    src: [['tmf', 'pacific-halibut', 'Pacific Halibut'], ['or', 'pacific-halibut', 'Pacific Halibut Fishing'], ['tmf', 'california-halibut', 'California Halibut']] });

  A({ id: 'lingcod', n: 'Lingcod', sci: 'Ophiodon elongatus', w: 's', r: 'pn3 ca3 ak2', al: ['ling', 'ling cod', 'buckethead'],
    art: { t: 'ling', dep: 1.0, back: '#4a5a44', side: '#7a8a64', belly: '#dcdcc4', fin: '#6a7a58', m: [{ k: 'spots', n: 44, r: [1.8, 3.4], c: '#3a3a28', o: .5, y: [-.9, .35] }] },
    idm: ['An elongated body with a large mouth and sharp, canine-like teeth ^1,2', 'Mottled gray or brown, sometimes green or blue (can look like almost any shade) ^1,2', 'Large mouth slightly upturned, with a protruding lower jaw ^1'],
    sz: 'Can reach 5 ft; Oregon catches are typically 2–3 ft. ^2',
    bait: 'Crabs, cut bait, jigs and live bait; they are voracious feeders on flounders, hake, herring, rockfish and cod. ^1,2',
    tech: ['Bounce bait along the bottom with 5/0–6/0 hooks, a 4–6 oz sinker and 20 lb line on a stout rod. ^2', 'Drift fishing, still fishing, bottom bouncing and jigging in about 30–700 ft. ^1'],
    where: ['Adults stay near rocks, inshore out to very deep water; young fish prefer sand or mud bottoms in bays. ^1,2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Eastern Pacific from Point San Carlos, Baja California to Kodiak Island, Alaska. ^1',
    src: [['tmf', 'lingcod', 'Lingcod'], ['or', 'lingcod', 'Lingcod Fishing']] });

  A({ id: 'california-halibut', n: 'California Halibut', sci: 'Paralichthys californicus', w: 's', r: 'ca3', al: ['halibut', 'cali halibut', 'flatfish', 'flattie'],
    art: { t: 'flat', dep: 1.0, back: '#7a6e50', side: '#8a7e5c', belly: '#e8e2cc', fin: '#7a6e50', m: [{ k: 'spots', n: 14, r: [2, 3.4], c: '#3a3020', o: .4, y: [-.6, .5], x: [.2, .9] }] },
    idm: ['The largest, most abundant flatfish within its range (south of San Francisco) ^1', 'Brownish eyed side with a white blind side; nearly half the fish have both eyes on the right side ^1'],
    sz: 'Up to 60 lb and 5 ft; females grow larger than males. ^1',
    bait: 'Live anchovies, shrimp, queenfish, clams, cut bait, crabs, squid and jigs. ^1',
    tech: ['“Drift fishing with live anchovies, shrimp, or queenfish is the most successful sportfishing method.” Also slow trolling, still fishing, bottom bouncing and jigging. ^1'],
    where: ['Bays, estuaries, kelp forests, piers, jetties and rocky sea floors. ^1', 'Usually on sandy bottoms in 10–20 fathoms or less. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'San Francisco to Baja California, with scattered records as far north as Washington. ^1',
    src: [['tmf', 'california-halibut', 'California Halibut']] });

  A({ id: 'white-seabass', n: 'White Seabass', sci: 'Atractoscion nobilis', w: 's', r: 'ca3', al: ['seabass', 'sea bass', 'ws', 'white sea bass'],
    art: { t: 'snook', dep: 1.0, back: '#4a5e70', side: '#a8b4bc', belly: '#f0eee6', fin: '#7a8a96', m: [{ k: 'dot', x: .38, y: .02, r: 1.8, c: '#101010', o: .85 }] },
    idm: ['Steel blue to gray above with golden highlights, silvery below ^1', 'A raised ridge along the belly and a black spot at the base of the pectoral fin ^1'],
    sz: 'Can reach nearly 100 lb; typical catches are 10–25 lb. ^1',
    bait: 'Live sardines, anchovies, squid and small mackerel; also cut bait, spoons, jigs and soft plastics. ^1',
    tech: ['“The best fishing for white seabass is often at night using natural baits soaked near the bottom.” Also drift fishing, slow trolling, jigging and casting. ^1'],
    where: ['Bays and estuaries, kelp forests, jetties and breakwaters, surf and shore, rocky seafloor and baitfish patches. ^1', 'Typically near mainland shores over sandy bottoms and kelp beds. ^1'],
    when: ['Most plentiful off California May–September. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Eastern Pacific from Magdalena Bay, Mexico to Juneau, Alaska. ^1',
    src: [['tmf', 'white-seabass', 'White Seabass']] });

  A({ id: 'california-yellowtail', n: 'California Yellowtail', sci: 'Seriola dorsalis', w: 's', r: 'ca3', al: ['yellowtail', 'yellows', 'yt'],
    art: { t: 'jack', dep: .95, back: '#2e5e6e', side: '#a8b4b0', belly: '#f2f2ec', fin: '#e8c030', m: [{ k: 'band', y: [-.12, -.02], x: [.14, .94], c: '#c8a030', o: .85 }] },
    idm: ['A bright yellow tail ^1', 'A brass-colored stripe along the midline of the flanks from snout to tail ^1'],
    bait: 'Live bait, cut bait, crabs, shrimp, squid, jigs, spoons and flies. ^1',
    tech: ['Drift fishing, chumming, still fishing, jigging, fly fishing, surf casting and spin casting. ^1'],
    where: ['Bays and estuaries, coastal waters, reefs, wrecks and shoals, breakers, piers, rocky sea floor and surf. ^1'],
    when: ['Feeds mainly in the morning and late afternoon. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium; it strikes hard and makes a long, hard run. ^1'],
    rng: 'Gulf of California and the Pacific coast from Baja California to Los Angeles; rarely farther north, once as far as Washington. ^1',
    src: [['tmf', 'california-yellowtail', 'California Yellowtail']] });

  A({ id: 'kelp-bass', n: 'Kelp Bass (Calico Bass)', sci: 'Paralabrax clathratus', w: 's', r: 'ca3', al: ['calico bass', 'calico', 'calicos', 'kelpie'],
    art: { t: 'seabass', dep: 1.05, back: '#5a5e32', side: '#8a8a52', belly: '#d8d4b0', fin: '#6a6a3a', m: [{ k: 'spots', n: 12, r: [3, 5], c: '#e0dcc0', o: .5, y: [-.9, -.1], x: [.25, .85] }] },
    idm: ['Brown to olive green with pale blotches on the back, lighter below ^1', 'The third, fourth and fifth dorsal spines are about the same length (unlike sand bass) ^1'],
    bait: 'Live bait, squid, crabs, jigs, spoons, plugs, soft plastics and cut bait. A favorite rig is a metal jig with whole squid. ^1',
    tech: ['Drift fishing, bait casting, spin casting, bottom bouncing, still fishing and jigging. ^1'],
    where: ['Kelp forests and beds, reefs, rocky bottom, jetties and breakwaters, in shallow water to about 150 ft. ^1'],
    when: ['Best fishing is summer to fall, though it can be fished year-round in some areas. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Columbia River, Washington to Magdalena Bay, Baja California; common along central and southern California. ^1',
    src: [['tmf', 'kelp-bass', 'Kelp Bass']] });

  /* ---------- helpers ---------- */
  /* "A. ^1 B. ^2,3" -> { t: 'A. B.', s: [1, 2, 3] } (all cited source numbers, markers stripped) */
  function parseNote(str) {
    var seen = [], t = String(str || '').replace(/\s*\^([\d,]+)/g, function (_, g) {
      g.split(',').forEach(function (n) { n = +n; if (seen.indexOf(n) < 0) seen.push(n); });
      return '';
    });
    return { t: t, s: seen };
  }
  /* Source number n (1-based) of a species -> { n, t, p, u } */
  function srcInfo(sp, n) {
    var e = sp.src && sp.src[n - 1];
    if (!e) return null;
    var T = SRC_TYPES[e[0]];
    if (!T) return null;
    return { n: n, t: e[2] || e[1], p: e[0] === 'url' ? (e[3] || '') : T.p, u: T.u(e[1]) };
  }
  root.SPECIES = SP;
  root.SPECIES_REGIONS = REGIONS;
  root.SPECIES_SRC = { types: SRC_TYPES, parse: parseNote, info: srcInfo };
})(typeof window !== 'undefined' ? window : globalThis);
