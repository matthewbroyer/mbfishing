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
    art: { t: 'bass', dep: 1.12, mouthL: 1.15, eyeY: 1.3, back: '#3f5a22', side: '#8da24a', belly: '#eef0cf', fin: '#7d9448', eye: '#8c3a22', m: [{ k: 'blotch', c: '#1b280e', o: .85, y: .02, th: .13, jag: 1 }, { k: 'lat', c: '#2c3d18', o: .5, y: -.3, x: [.2, .94] }] },
    idm: ['Mouth reaches to or past the back edge of the eye ^1,2,4', 'Dark blotches form a jagged stripe along each side ^2,4', 'Dorsal fin is almost split in two by a deep dip ^1,4', 'Olive-green back, lighter green sides, white belly ^2'],
    lk: [['Smallmouth Bass', 'Its upper jaw does not reach past the eye. ^2'], ['Spotted Bass', 'Scales on the base of the second dorsal fin and rows of spots below the lateral line.']],
    bait: 'Soft plastics (worms, crayfish, minnow shapes), spinnerbaits, crankbaits, topwater lures and jigs. Live bait works too: minnows, nightcrawlers, crayfish. ^1,3,5,6',
    tech: ['Work the outside edge of weed beds. Cast, retrieve with pauses, and drag lures slowly along the bottom. ^5', 'Cast plastic worms with little weight so they sink slowly, and bury the hook in the plastic to make it weedless. ^6', 'Surface lures (frogs, poppers) are best around morning and dusk. ^6'],
    where: ['Weed beds and weedy drop-offs ^2', 'Submerged vegetation, brush piles, stumps, boat docks and standing timber ^3', 'Points, humps, drop-offs and bridge pilings ^3', 'Lily pads, bulrush stands and fallen trees ^6'],
    when: ['New York: shallow weedy areas from mid-June through August, in 60–75°F water. ^5', 'Minnesota: best in spring, fall, early morning and dusk. ^6', 'Spawn in spring when water reaches about 60°F. ^4'],
    tip: ['“Will pretty much eat anything they can fit in their oversized mouths.” Fish predictable patterns and repeat spots that work. ^5'],
    src: [['tmf', 'largemouth-bass', 'Largemouth Bass'], ['me', 'largemouth-bass', 'Largemouth Bass: Species Information'], ['nc', 'largemouth-bass-0', 'Largemouth Bass'], ['tx', 'lmb', 'Largemouth Bass (Micropterus salmoides)'], ['ny', 'fishing-for-largemouth-smallmouth-bass', 'Fishing for Largemouth and Smallmouth Bass'], ['mn', 'largemouth-bass', 'How to catch a largemouth bass']] });

  A({ id: 'smallmouth-bass', n: 'Smallmouth Bass', sci: 'Micropterus dolomieu', w: 'f', r: 'ne3 se2 sc1 gl3 gp2 mw1 pn2', al: ['smallmouth', 'bronzeback', 'bass'],
    art: { t: 'bass', dep: 1.02, mouthL: .8, eyeY: 1.3, back: '#5b4a22', side: '#a58a45', belly: '#ece3bd', fin: '#8c7a40', eye: '#c0332a', m: [{ k: 'bars', at: [.28, .35, .42, .49, .56, .63, .7], w: 3, c: '#3a2e14', o: .5, y: [-.95, .5] }, { k: 'eyebars', c: '#3a2e14', o: .8 }] },
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
    art: { t: 'bass', dep: 1, mouthL: 1.0, eyeY: 1.3, back: '#4f6a2a', side: '#94aa58', belly: '#eef2d6', fin: '#7e9150', m: [{ k: 'blotch', c: '#1e2a10', o: .75, y: -.02, th: .1, dash: 1, x: [.2, .94] }, { k: 'stripes', n: 3, gap: 2, fr: .1, dash: [1, 2], c: '#202a14', o: .8, x: [.22, .9] }] },
    idm: ['Scales on the base of the second dorsal fin; dorsal fins are connected ^1', 'Upper jaw does not extend past the back of the eye ^1', 'No broad midline stripe like a largemouth, and no vertical bars like a smallmouth ^1', 'Rows of dark spots below the lateral line ^1'],
    lk: [['Largemouth Bass', 'Its mouth reaches well past the eye and it has a broad dark stripe.'], ['Smallmouth Bass', 'Vertical bars instead of spots below the lateral line.']],
    bait: 'Jigs, plugs, spinnerbaits, minnows, soft plastics and spoons. ^1',
    tech: ['Bait casting, spin casting, drift fishing and still fishing. ^1'],
    where: ['Central and lower Mississippi Basin to the Gulf of Mexico, including Texas, the Florida panhandle, Georgia, Alabama, Tennessee and Kentucky. ^1', 'Some live as deep as 100 ft. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    src: [['tmf', 'spotted-bass', 'Spotted Bass']] });

  A({ id: 'white-bass', n: 'White Bass', sci: 'Morone chrysops', w: 'f', r: 'se2 sc3 gl2 gp3', al: ['sand bass', 'silver bass'],
    art: { t: 'bass', dep: 1.1, eyeY: 1.3, back: '#4e5e58', side: '#cdd5d0', belly: '#f6f8f4', fin: '#b8c0bc', eye: '#e0e0d0', m: [{ k: 'stripes', n: 6, gap: 2, fr: -.42, c: '#3a4842', o: .4, x: [.22, .95] }, { k: 'stripes', n: 2, gap: 2, fr: .3, c: '#3a4842', o: .3, x: [.3, .9], dash: [3, 2] }] },
    idm: ['Silvery-white sides with black stripes ^1', 'Shorter and stockier than a striped bass ^1', 'Protruding, bass-like lower jaw ^1'],
    lk: [['Striped Bass', 'Longer and slimmer, with more prominent, regular stripes.'], ['Wiper', 'A white bass–striped bass hybrid with broken stripes.']],
    bait: 'Minnows, spinnerbaits, jigs, plugs, spoons and flies. ^1',
    tech: ['Drift fishing, trolling, fly fishing and still fishing. ^1'],
    where: ['Cliffs, gradual shores, inlets and outlets, islands, open water, docks, rocks, spring holes and weed beds. ^1', 'Clear lakes and reservoirs; native to the Mississippi and Ohio valleys and the Great Lakes. ^1'],
    tip: ['“Excellent light tackle fish that will take a bait or lure readily.” ^1'],
    src: [['tmf', 'white-bass', 'White Bass']] });

  A({ id: 'striped-bass', n: 'Striped Bass', sci: 'Morone saxatilis', w: 'b', r: 'ne3 se3 sc2 gp1 ca2 pn1', al: ['striper', 'stripers', 'rockfish', 'linesider', 'bass'],
    art: { t: 'bass', dep: .95, mouthL: 1.2, eyeY: 1.3, back: '#44585f', side: '#b4c0c4', belly: '#f4f6f5', fin: '#7a8e96', eye: '#3a3a3a', m: [{ k: 'stripes', n: 7, gap: 2, fr: -.64, c: '#1f2a2f', o: .9, x: [.22, .96] }] },
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
    art: { t: 'bass', dep: 1.06, eyeY: 1.3, back: '#46544f', side: '#c8d0cb', belly: '#f4f6f2', fin: '#9fa8a3', eye: '#c9c9bd', m: [{ k: 'stripes', n: 6, gap: 2, fr: -.5, dash: [4, 2], c: '#2e3b36', o: .75, x: [.22, .95] }] },
    idm: ['Six to eight dark horizontal stripes on a silver-white body ^1', 'Back is dark charcoal to black ^1', 'Two dorsal fins; the front one has 8–10 sharp spines ^1'],
    lk: [['White Bass', 'Smaller, with a stockier build and unbroken stripes.'], ['Striped Bass', 'Stripes are more regular and the fish is longer.']],
    sz: 'Grows to about 12 lb and 24 in; some exceed 20 lb. ^1',
    bait: 'Flies, jigs, plugs, spoons, insects, minnows and spinnerbaits. ^1',
    tech: ['Trolling, drift fishing, still fishing, fly fishing, bait casting and spin casting. ^1'],
    where: ['Cliffs, gradual shores, inlets and outlets, islands, overhanging trees, points, weed beds, rocks and open water. ^1'],
    tip: ['Aggressive fighters that stay in schools. ^1', 'A hybrid of striped bass and white bass, first produced in South Carolina in the mid-1960s. ^1'],
    src: [['tmf', 'wiper', 'Wiper']] });

  A({ id: 'black-crappie', n: 'Black Crappie', sci: 'Pomoxis nigromaculatus', w: 'f', r: 'ne2 se3 sc3 gl3 gp3 mw1 pn2 ca2', al: ['crappie', 'speckled perch', 'papermouth', 'calico bass', 'specks'],
    art: { t: 'crappie', dep: 1, eyeR: 1.15, back: '#4c5c3c', side: '#bcc6a4', belly: '#f2f1e0', fin: '#8d9a78', m: [{ k: 'spots', n: 44, sz: 1.8, r: [1.6, 3], c: '#1a1a14', o: .85, y: [-.95, .5], x: [.16, .92], gap: 2 }, { k: 'finspots', n: 10, c: '#2a3020', x: [.5, .78] }] },
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
    art: { t: 'crappie', dep: .97, eyeR: 1.15, back: '#5e6e4e', side: '#d2d9c2', belly: '#f4f3e6', fin: '#a3ae90', m: [{ k: 'bars', at: [.3, .38, .46, .54, .62, .7], w: 3, c: '#2f3a2a', o: .5, taper: 1, y: [-.95, .35] }] },
    idm: ['Five to ten dark vertical bars on each side, with a whitish belly ^1', 'Humpbacked, deep silvery body with a green-brown back ^1', 'Five or six dorsal spines ^1'],
    lk: [['Black Crappie', 'Scattered dark spots instead of vertical bars.']],
    bait: 'Live minnows, small jigs and spinners. ^1,2',
    tech: ['In spring, fish brush, stumps and docks. Use submerged “crappie attractors” (sunken trees). ^1', 'In summer, target creek channels, roadbeds and submerged points. ^1', 'Use a slow, steady hookset because of their soft mouths. ^2'],
    where: ['They like warmer, more turbid water than black crappie, around fallen trees, stumps, docks and vegetation. ^1'],
    when: ['They move shallow to spawn in spring, then go deeper in summer and early fall. Active at sunrise, sunset and night. ^1'],
    src: [['nc', 'white-crappie', 'White Crappie'], ['mn', 'crappie', 'How to catch a crappie']] });

  A({ id: 'bluegill', n: 'Bluegill', sci: 'Lepomis macrochirus', w: 'f', r: 'ne3 se3 sc3 gl3 gp3 mw1 pn2 ca2', al: ['bream', 'brim', 'sunfish', 'panfish', 'sunny'],
    art: { t: 'sunfish', dep: 1, back: '#3b5b43', side: '#7f9d62', belly: '#f2b14a', fin: '#7d9a70', m: [{ k: 'bars', at: [.3, .37, .44, .51, .58, .65, .72], w: 3, c: '#1f3a33', o: .5, y: [-.9, .4] }, { k: 'blot', x: .21, y: -.2, w: 4, h: 3, c: '#0c1a22' }, { k: 'blot', x: .66, y: -.78, w: 3, h: 3, c: '#14222a', o: .9 }] },
    idm: ['Compressed, round body with 6–8 vertical bars ^1', 'Small mouth and head, with pointed pectoral fins ^1', 'Coloring ranges from dark blue to yellow ^1'],
    lk: [['Redear Sunfish', 'Black gill flap with a red spot at the tip.'], ['Pumpkinseed', 'Orange-spotted, with a flat, disk-shaped body.']],
    bait: 'Flies, jigs, insects and minnows. ^1',
    tech: ['Fly fishing, still fishing, drift fishing and trolling. ^1'],
    where: ['Bays, lakes and ponds near gradual shores, inlets and outlets, piers, docks and weed beds. ^1'],
    tip: ['Excellent action for their size and increasingly popular with fly fishers. ^1'],
    rng: 'Native to the eastern half of the United States and introduced widely. ^1',
    src: [['tmf', 'bluegill', 'Bluegill']] });

  A({ id: 'redear-sunfish', n: 'Redear Sunfish', sci: 'Lepomis microlophus', w: 'f', r: 'se3 sc3 gl1 gp1 ca1', al: ['shellcracker', 'stump knocker', 'sunfish', 'panfish'],
    art: { t: 'sunfish', dep: .98, back: '#66763f', side: '#b9bf7b', belly: '#f4eebf', fin: '#a8ad74', pecL: 1.1, m: [{ k: 'spots', n: 22, sz: 1.1, r: [.9, 1.5], c: '#8a7a3a', o: .55, y: [-.6, .3], gap: 3 }, { k: 'blot', x: .21, y: -.2, w: 4, h: 3, c: '#0c1a22', edge: '#e0452d' }] },
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
    art: { t: 'sunfish', dep: .95, back: '#566f3f', side: '#c8a63a', belly: '#f4c15e', fin: '#c9852f', m: [{ k: 'bars', at: [.32, .42, .52, .62], w: 3, c: '#4a6a4a', o: .35, y: [-.9, .4] }, { k: 'spots', n: 30, sz: 1, r: [1, 1.7], c: '#e8661a', o: .95, y: [-.6, .3], gap: 2 }, { k: 'stripes', n: 2, gap: 2, fr: .05, x: [.06, .17], c: '#38a8a0', o: .7 }, { k: 'blot', x: .2, y: -.2, w: 4, h: 3, c: '#0c1a22', edge: '#ea5a2a' }] },
    idm: ['Flat, disk-shaped body with a small mouth ^1', 'Upper jaw stops just under the pupil of the eye ^1', 'Olive-green to brown with yellow, green and blue tones; light breast ^1'],
    lk: [['Bluegill', 'Darker body with vertical bars and no orange spots.']],
    bait: 'Worms, small live bait, flies, spinners, poppers, jigs, insects and minnows. ^1',
    tech: ['Drift fishing, still fishing and fly fishing. ^1'],
    where: ['Shallow water with vegetation or brush, farm ponds, small lakes, weedy bays and the upper reaches of creeks; around rocks, logs and docks. ^1'],
    tip: ['Active through the day. They travel in small groups of 2–4 adults. ^1'],
    rng: 'Greatest numbers in the northeastern United States; rarely found in the south-central or southwest. ^1',
    src: [['tmf', 'pumpkinseed-sunfish', 'Pumpkinseed Sunfish']] });

  A({ id: 'rock-bass', n: 'Rock Bass', sci: 'Ambloplites rupestris', w: 'f', r: 'ne2 gl2 gp1 se1', al: ['redeye', 'goggle-eye', 'sunfish'],
    art: { t: 'bass', dep: .95, mouthL: 1.1, eyeY: 1.3, back: '#46462a', side: '#8a7a3e', belly: '#e2dcae', fin: '#7a7a42', eye: '#c0392b', fins: [[.25, .50, 'sp', 12, 'u'], [.50, .73, 'soft', 10, 'u'], [.50, .78, 'soft', 11, 'd']], m: [{ k: 'stripes', n: 4, gap: 2, fr: -.5, dash: [1, 2], c: '#26241a', o: .8, x: [.2, .92] }, { k: 'blot', x: .23, y: -.18, w: 2, h: 2, c: '#101010' }, { k: 'spots', n: 14, sz: 1.4, c: '#2a2a1a', o: .5, y: [-.9, 0], x: [.3, .9], gap: 3 }] },
    idm: ['Black spot at the edge of the gill cover, and red eyes ^1', 'Six anal-fin spines (a warmouth has three) ^1', 'Looks like a cross between a bluegill and a black bass, with a larger, bass-like mouth ^1'],
    sz: 'Up to about 3 lb; typically under 1 lb. ^1',
    bait: 'Cut bait, insects, leeches, minnows, small plugs, spoons, jigs, spinnerbaits and flies. ^1',
    tech: ['Drift fishing, trolling, still fishing, fly fishing, bait casting and spin casting. ^1'],
    where: ['Rocky bottoms in small, cool lakes and streams. Cliffs, coves, overhanging trees, docks and weed beds. ^1'],
    tip: ['“Known as scrappy fighters but tire quickly.” ^1'],
    rng: 'Native to the northeastern US and southeastern Canada through the Great Lakes and Mississippi basin; introduced westward. ^1',
    src: [['tmf', 'rock-bass', 'Rock Bass']] });

  A({ id: 'yellow-perch', n: 'Yellow Perch', sci: 'Perca flavescens', w: 'f', r: 'ne3 gl3 gp2 mw1 pn1', al: ['perch', 'lake perch', 'ring perch', 'jumbo perch'],
    art: { t: 'perch', dep: 1.05, back: '#5a6a2a', side: '#cdb03a', belly: '#f4eeb4', fin: '#e2902e', fins: [[.24, .44, 'sp', 13, 'u', '#7a8030'], [.52, .72, 'soft', 11, 'u', '#c8a030'], [.64, .76, 'soft', 8, 'd']], m: [{ k: 'bars', at: [.27, .34, .41, .48, .55, .62, .69], w: 3, c: '#2f3516', o: .85, y: [-.95, .3], taper: 1 }] },
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
    art: { t: 'perch', dep: 1, back: '#4c5c50', side: '#aab6b0', belly: '#f2f4f2', fin: '#7d8a85', fins: [[.26, .46, 'sp', 11, 'u'], [.46, .72, 'soft', 10, 'u'], [.62, .76, 'soft', 8, 'd']], m: [{ k: 'stripes', n: 4, gap: 2, fr: -.3, c: '#7d8a85', o: .4, dash: [3, 1], x: [.22, .92] }] },
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
    art: { t: 'walleye', dep: 1, eyeR: 1.4, back: '#5c5a24', side: '#b8a54c', belly: '#f5f0d8', fin: '#a29a52', eye: '#e6e6d0', tailTip: '#f4f4e4', m: [{ k: 'saddles', at: [.3, .4, .5, .6, .7], c: '#3a3716', o: .65 }, { k: 'bars', at: [.34, .44, .54, .64], w: 2, c: '#4a4620', o: .3, y: [-.5, .1] }] },
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
    art: { t: 'walleye', dep: .92, eyeR: 1.3, back: '#5a5538', side: '#a89a68', belly: '#eee8d0', fin: '#8f8660', eye: '#d0d0b8', m: [{ k: 'saddles', at: [.3, .42, .54, .66], c: '#2e2a18', o: .5 }, { k: 'finspots', n: 12, c: '#2e2a18', x: [.28, .47] }, { k: 'spots', n: 16, sz: 1, c: '#3a3620', o: .6, y: [-.9, -.2], x: [.28, .74] }] },
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
    art: { t: 'pike', dep: 1, mouthL: 1.15, back: '#34502a', side: '#6e8c48', belly: '#ebe9cb', fin: '#a8683a', m: [{ k: 'spots', shape: 'bean', n: 55, sz: 1, r: [1.2, 1.8], c: '#e0e6a8', o: .95, y: [-.75, .4], x: [.18, .92], gap: 2 }] },
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
    art: { t: 'pike', dep: 1.1, mouthL: 1.15, tt: 'fork', tn: .16, back: '#586038', side: '#9aa066', belly: '#e8e6c6', fin: '#a08a46', m: [{ k: 'bars', at: [.26, .33, .4, .47, .54, .61, .68, .76, .84], w: 3, c: '#2a2a14', o: .5, gap: 3, y: [-.8, .4] }, { k: 'spots', n: 14, sz: 1.2, c: '#2a2a14', o: .6, y: [-.7, .3], gap: 3 }] },
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
    art: { t: 'pike', dep: .9, back: '#44602c', side: '#aab44e', belly: '#efedc8', fin: '#a8a24a', m: [{ k: 'chain', rows: 3, y: -.8, c: '#2a3812', o: .9, x: [.2, .95] }, { k: 'bars', at: [.13], w: 2, y: [.0, .55], c: '#2a3812', o: .85 }] },
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
    art: { t: 'catfish', tt: 'fork', tn: .34, dep: 1, back: '#566d78', side: '#a9b6b6', belly: '#f0efe6', fin: '#6a7e8a', fins: [[.27, .36, 'sp', 12, 'u'], [.72, .84, 'adip', 5, 'u'], [.56, .78, 'soft', 7, 'd']], m: [{ k: 'spots', n: 28, sz: 1, r: [1.2, 2], c: '#20282a', o: .85, y: [-.7, .25], x: [.22, .85], gap: 3 }] },
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
    art: { t: 'catfish', tt: 'fork', tn: .34, dep: 1.12, back: '#5a7388', side: '#a4b4c0', belly: '#f2f2ee', fin: '#6d8494', U: [1.5, 7, 13, 17, 17.5, 15, 11.5, 8.5, 5.5], fins: [[.27, .36, 'sp', 12, 'u'], [.74, .84, 'adip', 5, 'u'], [.46, .80, 'soft', 7, 'd']], m: [] },
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
    art: { t: 'catfish', tt: 'square', tn: 0, dep: 1.12, tailTip: '#ece2b8', tipSide: 'u', back: '#6b5a28', side: '#a88f45', belly: '#ebe0b8', fin: '#8a7440', U: [1, 5, 8.5, 11.5, 14, 14.5, 12, 9, 5.5], D: [1, 4.5, 8, 10.5, 12, 12, 10.5, 8, 5], m: [{ k: 'spots', n: 12, sz: 2.2, r: [3, 5], c: '#3e3216', o: .55, y: [-.8, .4], x: [.2, .9], gap: 4 }] },
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
    art: { t: 'catfish', tt: 'square', tn: 0, dep: .95, back: '#463a22', side: '#6f5c34', belly: '#cdc194', fin: '#5e4c2a', barbelCol: '#8a7a56', m: [{ k: 'spots', n: 18, sz: 1.5, r: [2, 4], c: '#2a2012', o: .35, y: [-.8, .4], gap: 3 }] },
    idm: ['Sharp, tooth-like serrations on the rear edge of the pectoral spine (a black bullhead lacks them) ^1', 'Squarish or slightly notched tail; barbels dark brown to nearly black ^1', 'Yellow-brown to olive or black, often mottled ^1'],
    bait: 'Bread or dough balls, jigs, cut bait and minnows. ^1',
    tech: ['Drift fishing, still fishing, bait casting and spin casting. ^1'],
    where: ['Larger, deeper water than other bullheads: shores, docks, rocks, sunken objects, bridges, coves, drop-offs and current edges. ^1'],
    tip: ['Extremely popular with anglers despite being relatively small. ^1'],
    rng: 'Eastern United States and southern Canada. ^1',
    src: [['tmf', 'brown-bullhead', 'Brown Bullhead']] });

  A({ id: 'common-carp', n: 'Common Carp', sci: 'Cyprinus carpio', w: 'f', r: 'ne2 se2 sc2 gl3 gp3 mw2 pn2 ca2', al: ['carp'],
    art: { t: 'carp', scales: 1, dep: 1, back: '#6a5a2a', side: '#b8963a', belly: '#ecd9a0', fin: '#b0782e', m: [] },
    idm: ['Deep body, small protractile mouth, forked tail, a single long dorsal fin and large scales ^1', 'Olive-brown to gold; one of the largest minnows and a close relative of the goldfish ^1'],
    bait: 'Bread or dough balls, and flies. ^1',
    tech: ['Still fishing and fly fishing. ^1'],
    where: ['Lakes, ponds, rivers, streams, dams, and beneath overhanging trees and bushes. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Widely distributed in North America below the 50th parallel, south to the Florida panhandle. ^1',
    src: [['tmf', 'common-carp', 'Common Carp']] });

  A({ id: 'freshwater-drum', n: 'Freshwater Drum', sci: 'Aplodinotus grunniens', w: 'f', r: 'gl2 gp2 sc2 se2', al: ['drum', 'sheepshead', 'gaspergou', 'gou'],
    art: { t: 'drum', scales: 1, dep: 1.05, chinBarbels: 3, back: '#5e6468', side: '#b1b8b8', belly: '#f0f0ee', fin: '#8a9090', U: [1.5, 7, 16, 24, 26, 22, 14, 8, 5], fins: [[.27, .44, 'sp', 12, 'u'], [.47, .80, 'soft', 8, 'u'], [.64, .74, 'soft', 6, 'd']], m: [] },
    idm: ['Large, round-profiled, humpbacked silvery fish with a small tail ^1', 'Mouth is set toward the bottom of the face ^1', 'The lateral line runs through the tail, unique among freshwater fish ^1', 'Long dorsal fin (10 spines, 29–32 rays); makes grunting sounds ^2'],
    lk: [['Red Drum', 'Freshwater drum lack the red drum’s tail-fin spot. ^2']],
    sz: 'The Texas rod-and-reel record exceeds 30 lb. ^2',
    tip: ['Our sources give little bait advice. They feed on fish, crayfish, insects and mollusks and spawn in open water in April–May. ^2', 'Considered a “rough fish” by some anglers but a prized food fish in some areas. ^2', 'Take Me Fishing rates them easy to catch. ^3'],
    rng: 'Hudson Bay to Guatemala; Midwest and South. ^2,3',
    src: [['url', 'https://www.dnr.state.mn.us/fish/freshwaterdrum.html', 'Freshwater Drum (Sheepshead)', 'Minnesota Dept. of Natural Resources'], ['tx', 'fwd', 'Freshwater Drum (Aplodinotus grunniens)'], ['tmf', 'freshwater-drum', 'Freshwater Drum']] });

  A({ id: 'bowfin', n: 'Bowfin', sci: 'Amia calva', w: 'f', r: 'se2 sc2 gl2 ne1', al: ['dogfish', 'grindle', 'mudfish', 'cypress trout'],
    art: { t: 'bowfin', dep: 1, back: '#4a5a2a', side: '#7a8c3c', belly: '#d5deaa', fin: '#5a9a3c', m: [{ k: 'worms', n: 22, c: '#2c3814', o: .7, y: [-.9, .4] }, { k: 'blot', x: .9, y: -.2, w: 2, h: 2, c: '#101010', halo: '#e8a020', round: 1 }] },
    idm: ['Flattened head, long stout body and a large mouth with small sharp teeth ^1', 'Long dorsal fin and a rounded tail ^1', 'Males have an orange-yellow halo spot on the tail; females lack it ^1'],
    bait: 'Jigs, minnows, spinnerbaits, leeches, plugs and spoons. ^1',
    tech: ['Drift fishing, still fishing and trolling. ^1'],
    where: ['Lakes, rivers and ponds: weed beds, sunken objects, docks, rocky areas, coves and shallow shores. ^1'],
    tip: ['An excellent fighter but poor food. It can breathe air directly and tolerate high temperatures. ^1'],
    rng: 'Eastern United States from the Mississippi basin east to the St. Lawrence, south from Minnesota to the Gulf Coast. ^1',
    src: [['tmf', 'bowfin', 'Bowfin']] });

  A({ id: 'alligator-gar', n: 'Alligator Gar', sci: 'Atractosteus spatula', w: 'f', r: 'sc3 se1 gp1', al: ['gar', 'gator gar'],
    art: { t: 'gar', scales: 1, mouthL: .8, dep: 1.4, back: '#4a4a28', side: '#7c7a4c', belly: '#d8d0a0', fin: '#6a6a3a', U: [2, 5, 7, 9, 10.5, 11, 10, 8, 5], D: [1.5, 4.5, 6.5, 8, 9, 10, 9, 7.5, 4.5], m: [{ k: 'spots', n: 18, sz: 1.7, r: [2, 3], c: '#202012', o: .7, y: [-.9, .1], x: [.5, .95], gap: 3 }, { k: 'finspots', n: 8, c: '#202012', x: [.68, .84] }] },
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
    art: { t: 'trout', tt: 'fork', tn: .42, dep: 1, back: '#454f46', side: '#7c8a7a', belly: '#e6e6da', fin: '#6a756a', lead: '#f2f2ea', m: [{ k: 'spots', n: 70, sz: 1, r: [1.2, 2.2], c: '#dfe3cf', o: .9, y: [-.9, .45], x: [.12, .94], gap: 2, tail: 6 }] },
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
    art: { t: 'trout', tt: 'square', tn: .12, dep: .95, back: '#3f5030', side: '#6b7c44', belly: '#e87a38', fin: '#e0782e', lead: '#f4f4ec', m: [{ k: 'worms', n: 20, len: 6, c: '#e6e6bc', o: .85, y: [-.95, -.35] }, { k: 'spots', n: 10, sz: .9, r: [1, 1.5], c: '#d8382a', halo: '#78b6e8', o: 1, ho: .65, y: [-.2, .35], x: [.2, .9], gap: 4 }, { k: 'spots', n: 18, sz: .9, r: [1, 1.5], c: '#f0e098', o: .9, y: [-.6, .05], gap: 3 }] },
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
    art: { t: 'trout', tt: 'square', tn: .1, dep: 1, back: '#5a4a26', side: '#a28a38', belly: '#efe3b6', fin: '#a88a3a', fins: [[.40, .52, 'soft', 12, 'u'], [.78, .84, 'adip', 5, 'u', '#d4742c'], [.64, .76, 'soft', 8, 'd']], m: [{ k: 'spots', n: 40, sz: .9, r: [1.2, 2], c: '#241a10', halo: '#eadfb8', o: 1, ho: .8, y: [-.9, .25], x: [.14, .94], gap: 3 }, { k: 'spots', n: 8, sz: .9, r: [1.2, 2], c: '#c8322a', halo: '#eadfb8', o: 1, ho: .8, y: [-.3, .25], gap: 4 }] },
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
    art: { t: 'trout', tt: 'square', tn: .15, dep: .95, back: '#4f7a5a', side: '#a8b4a4', belly: '#f1efe4', fin: '#8a9a80', m: [{ k: 'band', y: [-.14, .1], x: [.2, .92], c: '#d9506a', o: .85 }, { k: 'spots', n: 55, sz: .9, r: [1, 1.8], c: '#1a1a1a', o: .9, y: [-.95, .4], x: [.12, .96], gap: 2, tail: 12 }] },
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
    art: { t: 'trout', tt: 'square', tn: .2, dep: .95, back: '#5a6e3a', side: '#a89a50', belly: '#eae0c0', fin: '#a89a52', m: [{ k: 'spots', n: 50, sz: .9, r: [1, 1.7], c: '#1a1a1a', o: .9, y: [-.95, .35], x: [.28, .97], gap: 2, tail: 10 }, { k: 'px', pts: [[.1, .85], [.12, .9], [.14, .9], [.16, .9], [.18, .86], [.2, .8]], c: '#e0321a' }] },
    idm: ['A yellow, orange or red streak in the skin fold under the lower jaw ^1', 'Olive-green to yellowish-green, sometimes with red on the head and belly; sea-run forms are bluish and silvery ^1'],
    bait: 'Flies, jigs, spoons, insects and cured fish roe. ^1',
    tech: ['Fly fishing, still fishing, bait casting and spin casting. ^1'],
    where: ['Rivers and streams: bend outsides, rock pockets, overhanging trees and bushes, undercuts, eddies and current edges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Eel River, California, north to Prince William Sound, Alaska; inland from southern Alberta through Montana, Colorado and New Mexico. ^1',
    src: [['tmf', 'cutthroat-trout', 'Cutthroat Trout']] });

  A({ id: 'steelhead', n: 'Steelhead', sci: 'Oncorhynchus mykiss', w: 'b', r: 'pn3 ca2 gl2 ak2 ne1', al: ['steelie', 'steelies', 'steelhead trout'],
    art: { t: 'trout', tt: 'notch', tn: .16, dep: .95, back: '#40605a', side: '#a8b6ae', belly: '#f2f2ee', fin: '#7a8a82', m: [{ k: 'band', y: [-.1, .1], x: [.22, .9], c: '#d08a90', o: .5 }, { k: 'spots', n: 55, sz: .9, r: [1, 1.8], c: '#1a1a1a', o: .9, y: [-.95, .4], x: [.12, .96], gap: 2, tail: 12 }] },
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
    art: { t: 'trout', tt: 'notch', tn: .1, dep: .95, back: '#46585f', side: '#b2bdbf', belly: '#f4f4f0', fin: '#6e7e86', m: [{ k: 'spots', n: 18, sz: .9, r: [1.2, 1.9], c: '#151515', o: .95, y: [-.85, -.05], x: [.3, .92], gap: 3 }] },
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
    art: { t: 'trout', tt: 'notch', tn: .15, dep: 1, back: '#2a4a5a', side: '#bcc8cc', belly: '#f4f4f0', fin: '#5c707c', m: [{ k: 'spots', n: 26, sz: .9, r: [1, 1.6], c: '#141414', o: .9, y: [-.95, -.2], x: [.25, .94], gap: 3, tail: 8, tailHalf: 'u' }] },
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
    art: { t: 'trout', tt: 'notch', tn: .1, dep: 1.08, back: '#42365a', side: '#b6bcc2', belly: '#f4f4f0', fin: '#6a7580', m: [{ k: 'spots', n: 36, sz: .9, r: [1.2, 2], c: '#141414', o: .9, y: [-.95, -.05], x: [.2, .94], gap: 3, tail: 14 }] },
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
    art: { t: 'trout', tt: 'notch', tn: .2, dep: .92, back: '#2c4a6a', side: '#bdc8cc', belly: '#f4f4f0', fin: '#6a8090', m: [] },
    idm: ['Breeding males are bright red with small, indistinct black speckling on the back ^1', 'Landlocked populations are called kokanee ^1'],
    bait: 'Cured fish roe, small flashy metal spoons, a small hook with worm or maggot, and flies (for surface-feeding kokanee). Cut bait, plugs and spinner baits also listed. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and trolling. ^1'],
    where: ['Rivers, streams, bays, eddies, dams, falls and current edges. ^1'],
    tip: ['Sockeye are plankton feeders, which affects bait choice. ^1', 'Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Pacific Ocean and tributaries from Hokkaido to the Anadyr River, and from the Sacramento River, California to Point Hope, Alaska. ^1',
    src: [['tmf', 'sockeye-salmon', 'Sockeye Salmon']] });

  A({ id: 'pink-salmon', n: 'Pink Salmon', sci: 'Oncorhynchus gorbuscha', w: 'b', r: 'ak3 pn3 gl1', al: ['pink', 'humpy', 'humpback', 'humpies', 'humpback salmon'],
    art: { t: 'trout', tt: 'notch', tn: .15, dep: .98, back: '#38586e', side: '#bcc6ca', belly: '#f4f4f0', fin: '#6a8494', m: [{ k: 'spots', n: 20, sz: 1.3, r: [1.8, 3], c: '#181818', o: .85, y: [-.95, -.1], x: [.25, .94], gap: 3, tail: 10 }] },
    idm: ['The smallest Pacific salmon, averaging 3–5 lb ^1', 'Large, black, oval spots on both halves of the tail and on the back ^1', 'Spawning males develop a humpback and pale red or pink coloring with brown to olive-green blotches ^1'],
    bait: 'Spoons, spinner baits, plugs, flies, cured fish roe and cut bait. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing, trolling and spin casting. ^1'],
    where: ['Bays, estuaries, rivers and streams: eddies, current edges, drop-offs and man-made structures. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Pacific and Arctic oceans; Alaska south to the Sacramento River and northeast to the Mackenzie River. Introduced in Newfoundland and Lake Superior tributaries. ^1',
    src: [['tmf', 'pink-salmon', 'Pink Salmon']] });

  A({ id: 'dolly-varden', n: 'Dolly Varden', sci: 'Salvelinus malma', w: 'b', r: 'ak3 pn2', al: ['dolly', 'dollies', 'char'],
    art: { t: 'trout', tt: 'square', tn: .12, dep: .95, back: '#4a5a3e', side: '#8c9c62', belly: '#e8dcb2', fin: '#a8884e', lead: '#f2f2ea', m: [{ k: 'spots', n: 36, sz: 1.1, r: [1.2, 1.8], c: '#f0a8a0', o: .95, y: [-.85, .4], x: [.18, .94], gap: 2 }] },
    idm: ['A char: spots are usually smaller than the pupil of the eye (Arctic char’s are larger) ^1', 'Gill rakers typically number 21–22, versus 25–30 in Arctic char ^1', 'Bull trout are larger and prefer different habitat ^1'],
    bait: 'Cured fish roe, flies, spoons, spinner baits, plugs, cut bait and saltwater live bait. ^1',
    tech: ['Fly fishing, jigging, still fishing, drift fishing and trolling. ^1'],
    where: ['Bays, estuaries, rivers and streams: current edges, eddies and drop-offs. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Sea of Japan through the Kurils and Kamchatka, the Aleutians and around Alaska to the Yukon and Northwest Territories; anadromous, with some landlocked populations. ^1',
    src: [['tmf', 'dolly-varden', 'Dolly Varden']] });

  A({ id: 'arctic-grayling', n: 'Arctic Grayling', sci: 'Thymallus arcticus', w: 'f', r: 'ak3 pn1 gp1', al: ['grayling', 'graylings'],
    art: { t: 'grayling', tt: 'fork', tn: .3, dep: .9, back: '#4a5062', side: '#9ca2b4', belly: '#d4d6e0', fin: '#7a6a9a', fins: [[.28, .62, 'sail', 24, 'u', '#8a70b0'], [.78, .84, 'adip', 5, 'u'], [.62, .76, 'soft', 7, 'd']], m: [{ k: 'spots', n: 12, sz: 1.1, c: '#1e1e2e', o: .85, y: [-.7, .1], x: [.2, .6], gap: 3 }, { k: 'finspots', n: 16, c: '#e8708a', x: [.28, .62] }] },
    idm: ['A distinctive sail-like dorsal fin followed by a small adipose fin ^1', 'Grayish-silver with gold and/or lavender overtones ^1', 'Dark spots, sometimes shaped like X’s or V’s ^1', 'Males have a higher, rounded rear dorsal fin ^1'],
    bait: 'Flies, plugs, spoons, spinner baits and insects. ^1',
    tech: ['Primarily fly fishing; still fishing is secondary. ^1'],
    where: ['Bend outsides, dams and falls, eddies, undercuts, ripples and swirls, rock pockets, drop-offs, merging currents and current edges. ^1', 'The best fishing is in the cold rivers and lakes of Alaska and northern Canada. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Hudson Bay west through northern and central Canada to Alaska and Siberia; small populations in Montana and Idaho. ^1',
    src: [['tmf', 'arctic-grayling', 'Arctic Grayling']] });

  A({ id: 'white-sturgeon', n: 'White Sturgeon', sci: 'Acipenser transmontanus', w: 'b', r: 'pn3 ca2 ak1', al: ['sturgeon', 'white sturgeon', 'sturgeons'],
    art: { t: 'sturgeon', mouthL: .6, mouthY: 2, dep: 1, back: '#5a5e50', side: '#8a8e78', belly: '#e6e2cc', fin: '#6a6e60', U: [.8, 2.5, 5, 9, 12.5, 13.5, 11.5, 8.5, 5.5], D: [.8, 2, 4, 6, 8.5, 9.5, 8, 6, 4.5], m: [] },
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
    art: { t: 'shad', scales: 1, dep: 1, back: '#3e607a', side: '#b9c6ca', belly: '#f3f3ee', fin: '#7a8e98', m: [{ k: 'blot', x: .27, y: -.3, w: 2, h: 2, c: '#14181c' }, { k: 'stripes', n: 1, gap: 1, fr: -.2, dash: [1, 3], c: '#2a3236', o: .7, x: [.32, .62] }] },
    idm: ['A silvery fish with a single dorsal fin mid-back ^1', 'A large black spot right behind the top of the gill cover, followed by a row of smaller spots (4–27) ^1', 'Lower jaw fits into a deep notch under the upper jaw (unlike hickory shad) ^1'],
    bait: 'Jigs, flies, spoons, plugs, cut bait and saltwater live bait. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and surf casting. ^1'],
    where: ['Rivers and bays: backflow areas, ripples and currents, schools, drop-offs, undercuts, bend outsides, dams and falls, current edges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Atlantic coast from Labrador to the St. Johns River, Florida; also the St. Lawrence to Lakes Huron and Erie; introduced on the Pacific coast from Alaska to Baja California. ^1',
    src: [['tmf', 'american-shad', 'American Shad']] });

  A({ id: 'peacock-bass', n: 'Butterfly Peacock Bass', sci: 'Cichla ocellaris', w: 'f', r: 'se3', al: ['peacock', 'peacock bass', 'butterfly peacock', 'peacocks'],
    art: { t: 'bass', dep: 1.12, eyeY: 1.3, tt: 'notch', back: '#3e5a28', side: '#c0b840', belly: '#e8de98', fin: '#c8581c', eye: '#c8322a', m: [{ k: 'lat', y: 0, c: '#2c3414', o: .6, x: [.15, .88] }, { k: 'bars', at: [.36, .52, .68], w: 6, c: '#1c1c14', o: .9, y: [-.3, .5] }, { k: 'ocelli', x: [.94], y: [-.15], r: 5, c: '#101010', in: '#e8c848' }] },
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
    art: { t: 'bluefish', dep: 1, back: '#3a6a88', side: '#8fb4c4', belly: '#eef0ee', fin: '#7a9aa8', m: [{ k: 'blot', x: .26, y: .22, w: 2, h: 2, c: '#14242c', o: .9 }] },
    idm: ['Blue or blue-green back fading to silver on the sides and belly ^2', 'Two dorsal fins, a forked tail and very sharp teeth ^1,2', 'A spine in the second dorsal fin, no head markings, and no gap between the dorsal fins ^1'],
    sz: 'Usually 20–25 in, up to 42 in. ^2',
    bait: 'Surface plugs, jigs, spoons, spinner baits, squid and live bait; plugs, lures or feathers also work. ^1,2',
    tech: ['Trolling, chumming, casting, jigging, drift fishing, surf casting and still fishing from boats, shore or piers. ^1', 'Look near inlets, shoals and rips where schools feed on baitfish. Surface-feeding schools are prime targets. ^2', 'Use at least 40 lb mono or braid with a wire leader; they can bite through weak line. ^2'],
    where: ['Bays, estuaries, breakers and channel entrances. ^1', 'Pelagic, schooling fish often seen feeding at the surface. ^2'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Temperate to tropical waters worldwide; in the U.S. mainly the South and Northeast. ^1,2',
    src: [['tmf', 'bluefish', 'Bluefish'], ['ma', 'bluefish', 'Learn about Bluefish']] });

  A({ id: 'atlantic-mackerel', n: 'Atlantic Mackerel', sci: 'Scomber scombrus', w: 's', r: 'ne3', al: ['mackerel', 'macks', 'boston mackerel'],
    art: { t: 'mack', dep: .9, back: '#2b6a68', side: '#a2bbbf', belly: '#f2f2ee', fin: '#6a8a90', m: [{ k: 'bars', at: [.22, .26, .3, .34, .38, .42, .46, .5, .54, .58, .62, .66, .7, .74, .78, .82], w: 1, c: '#10282a', o: .9, y: [-.95, -.05], lean: 2 }] },
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
    art: { t: 'flat', dep: 1, mouthL: 1.5, back: '#8a7a50', side: '#9a8860', belly: '#dcd4bc', fin: '#8a7a54', m: [{ k: 'spots', n: 14, sz: 1.3, r: [1.5, 3], c: '#4a3c24', o: .55, y: [-.6, .5], x: [.2, .9], gap: 3 }, { k: 'blot', x: .5, y: -.35, w: 2, h: 2, c: '#241a10', halo: '#e8dcb8' }, { k: 'blot', x: .66, y: -.35, w: 2, h: 2, c: '#241a10', halo: '#e8dcb8' }, { k: 'blot', x: .55, y: .3, w: 2, h: 2, c: '#241a10', halo: '#e8dcb8' }, { k: 'blot', x: .72, y: .25, w: 2, h: 2, c: '#241a10', halo: '#e8dcb8' }, { k: 'blot', x: .84, y: -.05, w: 2, h: 2, c: '#241a10', halo: '#e8dcb8' }] },
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
    art: { t: 'flat', dep: 1.02, mouthL: .5, back: '#5d4a34', side: '#6a5640', belly: '#e0dcc8', fin: '#6a5a40', m: [{ k: 'worms', n: 8, len: 4, c: '#3c2e1e', o: .5, y: [-.7, .6] }] },
    idm: ['An oval, thick-bodied flatfish with both eyes on the right side ^1', 'A straight lateral line ^1', 'The upper side varies from muddy or reddish brown to olive green, dark slate or almost black; the underside is white ^1'],
    lk: [['Summer Flounder (Fluke)', 'Eyes on the left side and a large mouth. ^2']],
    sz: 'Live 15–18 years and grow to more than 2 ft. ^1',
    bait: 'Anglers use bait in nearshore waters. ^1',
    where: ['Estuaries and the continental shelf, over muddy sand, clean sand, clay, and pebbly or gravelly bottoms. ^1', 'They often bury their bodies in the bottom sediment, leaving only the eyes showing. ^1'],
    tip: ['NOAA notes a small recreational fishery with seasons, minimum sizes and possession limits. Check current rules. ^1', 'Their diet is small invertebrates, shrimp, clams and worms. ^1'],
    rng: 'Gulf of St. Lawrence to North Carolina, most common north of Delaware Bay. ^1',
    src: [['url', 'https://www.fisheries.noaa.gov/species/winter-flounder', 'Winter Flounder', 'NOAA Fisheries'], ['ma', 'fluke', 'Learn about Fluke']] });

  A({ id: 'tautog', n: 'Tautog', sci: 'Tautoga onitis', w: 's', r: 'ne3 se1', al: ['blackfish', 'tog', 'black fish'],
    art: { t: 'seabass', dep: 1.18, mouthL: .6, back: '#2e3638', side: '#4c585a', belly: '#9ca6a6', fin: '#38424a', m: [{ k: 'worms', n: 10, len: 4, c: '#6a7a7c', o: .5, y: [-.8, .3] }, { k: 'blot', x: .06, y: .6, w: 3, h: 2, c: '#e8eeee' }] },
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
    art: { t: 'seabass', dep: 1.05, back: '#2a3034', side: '#555f66', belly: '#bfc6c8', fin: '#434e54', m: [{ k: 'stripes', n: 3, gap: 2, fr: -.45, dash: [1, 1], c: '#9aaab2', o: .6, x: [.2, .9] }, { k: 'finspots', n: 12, c: '#e8eeee', x: [.28, .76] }] },
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
    art: { t: 'deep', dep: .95, back: '#5a6670', side: '#a8b2b6', belly: '#eceeed', fin: '#7a8890', mouthL: .7, m: [{ k: 'bars', at: [.3, .4, .5, .6, .7], w: 2, c: '#3a4a54', o: .28, y: [-.9, .4] }, { k: 'stripes', n: 4, gap: 2, fr: -.5, dash: [1, 1], c: '#5aa6c8', o: .85, x: [.25, .85] }] },
    idm: ['A silvery fish with light blue specks and several horizontal stripes, white belly ^1', 'Darker patches on the head, a small mouth, high-set eyes and one long spiny dorsal fin ^1'],
    sz: 'Can reach 18 in and 5 lb; most Massachusetts catches are under 3 lb and 14 in. ^1',
    bait: 'Sea worms, squid strips, and pieces of clam or fish. Most anglers prefer bait to small lures. ^1',
    tech: ['Use a bank sinker on the end of the line with 1–3 snelled hooks (size #1–#8), 6–10 in above the sinker. Set the hook at the slightest dip of the rod tip. ^1'],
    where: ['Piers, rocks, offshore ledges, jetties and mussel beds; smaller fish stay shallower. ^1', 'Fish high tides in harbors and along sandy beaches, or deeper channels at low tide. ^1'],
    when: ['In Massachusetts waters April–October, when sea temperatures exceed 45°F. May–August is peak spawning. ^1'],
    rng: 'Source covers Massachusetts waters only. ^1',
    src: [['ma', 'scup', 'Learn about Scup']] });

  A({ id: 'atlantic-cod', n: 'Atlantic Cod', sci: 'Gadus morhua', w: 's', r: 'ne3', al: ['cod', 'codfish', 'scrod'],
    art: { t: 'cod', dep: 1, eyeR: .9, mouthL: 1.15, back: '#6a6a38', side: '#9a9a5c', belly: '#eae6d4', fin: '#7c7c48', m: [{ k: 'spots', n: 40, sz: 1.2, r: [1, 1.6], c: '#4a4a22', o: .6, y: [-.85, .2], x: [.15, .9], gap: 2 }, { k: 'lat', y: -.22, c: '#f0ecd4', o: .9, x: [.2, .94] }] },
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
    art: { t: 'walleye', dep: .9, eyeR: .75, back: '#46585a', side: '#a6b2ac', belly: '#f0f0ec', fin: '#8a9a94', fins: [[.27, .45, 'sp', 12, 'u'], [.52, .72, 'soft', 9, 'u'], [.62, .76, 'soft', 8, 'd']], m: [{ k: 'spots', n: 34, sz: 1.5, r: [1.2, 1.9], c: '#161616', o: .95, y: [-.95, -.05], x: [.25, .94], gap: 3, tail: 14 }, { k: 'finspots', n: 8, c: '#161616', x: [.52, .72] }] },
    idm: ['Round black spots on the back, upper flanks, tail and second dorsal fin ^1', 'Two large, recurved canine teeth at the front of the upper jaw ^1'],
    bait: 'Shrimp is the most popular and effective bait; also live bait, cut bait, jigs, spoons, plugs and flies. ^1',
    tech: ['Chumming from drifting or anchored boats, trolling, jigging, surf casting, fly fishing, drift fishing and still fishing. ^1'],
    where: ['Shallow areas of bays and estuaries, channel entrances, saltwater weed beds and man-made structures. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic from New York to the Gulf of Mexico, especially off the Carolinas and Texas. ^1',
    src: [['tmf', 'spotted-seatrout', 'Spotted Seatrout']] });

  A({ id: 'weakfish', n: 'Weakfish', sci: 'Cynoscion regalis', w: 's', r: 'ne2 se3', al: ['squeteague', 'gray trout', 'seatrout', 'yellowfin trout', 'tide runner'],
    art: { t: 'walleye', dep: .95, eyeR: .75, back: '#5f6a68', side: '#b6bcae', belly: '#f0eee4', fin: '#c0b070', m: [{ k: 'spots', n: 24, sz: 1, r: [1, 1.5], c: '#4a4636', o: .7, y: [-.95, -.3], x: [.3, .9], gap: 3 }, { k: 'stripes', n: 3, gap: 2, fr: -.5, dash: [3, 2], c: '#7a7468', o: .4, x: [.25, .9] }] },
    idm: ['The lower jaw clearly projects beyond the upper ^1', 'Two large, recurved canine teeth at the front of the upper jaw ^1'],
    bait: 'Shrimp, squid, cut bait, live bait, soft plastics, jigs, plugs, spoons and trolling lures. ^1',
    tech: ['Drift fishing, chumming, bait casting, still fishing, trolling, fly fishing, bottom bouncing and surf casting. ^1'],
    where: ['Surf, bays and estuaries, jetties, piers, docks, tidal flats and channel entrances. ^1', 'Sandy bottoms in summer; deeper water in winter. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic from Florida to Massachusetts; North Carolina to Florida in winter, Delaware to New York in summer. ^1',
    src: [['tmf', 'weakfish', 'Weakfish']] });

  A({ id: 'red-drum', n: 'Red Drum (Redfish)', sci: 'Sciaenops ocellatus', w: 's', r: 'se3 sc3 ne1', al: ['redfish', 'red', 'channel bass', 'puppy drum', 'reds', 'spottail'],
    art: { t: 'drum', tt: 'square', tn: 0, dep: 1, mouthY: 1, mouthL: .7, back: '#98603a', side: '#be8e66', belly: '#f1e6d4', fin: '#b8845c', U: [1.5, 7, 15, 22, 24, 21, 14, 8, 5], m: [{ k: 'blot', x: .88, y: -.4, w: 2, h: 2, c: '#101010' }] },
    idm: ['Coppery red overtones on a silvery-gray body ^1', 'A large black spot, about eye-sized, on each side near the base of the tail ^1'],
    sz: 'Fish up to about 10–15 lb are described as very fine eating. ^1',
    bait: 'Crabs, shrimp, clams, strip bait, jigs, plugs, spoons and streamer flies. ^1',
    tech: ['Drift fishing, bottom fishing, jigging, casting from boats or shore, slow trolling and fly fishing. They can also be stalked on flats. ^1'],
    where: ['Inshore: bays, estuaries, channels and inlets over sandy or muddy bottoms, in salt and brackish water. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from Maine to the Gulf of Mexico. ^1',
    src: [['tmf', 'red-drum', 'Red Drum']] });

  A({ id: 'black-drum', n: 'Black Drum', sci: 'Pogonias cromis', w: 's', r: 'se2 sc3 ne1', al: ['drum', 'puppy drum', 'big drum'],
    art: { t: 'drum', tt: 'square', tn: 0, dep: 1.15, chinBarbels: 4, mouthL: .7, back: '#444444', side: '#7a7a76', belly: '#c4c4bc', fin: '#5a5a56', U: [1.5, 7, 16, 24, 26, 22, 14, 8, 5], m: [{ k: 'bars', at: [.32, .44, .56, .68], w: 3, c: '#1a1a1a', o: .35, y: [-.9, .4] }] },
    idm: ['A large spine in the anal fin and numerous barbels on the chin ^1', 'Large pavement-like teeth in the throat for crushing shellfish ^1', 'Juveniles show 4 or 5 broad, dark vertical bars ^1'],
    sz: 'Drum of about 10–15 lb are said to be good eating. ^1',
    bait: 'Shrimp, clams, crabs, squid, cut fish, metal jigs, spoons and weighted bucktails. ^1',
    tech: ['Bottom fishing, casting from boats or shore, and slow trolling. Jigging, drift fishing and still fishing are also listed. ^1'],
    where: ['Inshore schooling fish near breakwaters, jetties, bridge and pier pilings, clam and oyster beds, channels, estuaries, bays and sandy shorelines. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from Nova Scotia to northern Mexico, including southern Florida. ^1',
    src: [['tmf', 'black-drum', 'Black Drum']] });

  A({ id: 'sheepshead', n: 'Sheepshead', sci: 'Archosargus probatocephalus', w: 's', r: 'se3 sc3 ne1', al: ['convict fish', 'sheepies', 'sheep'],
    art: { t: 'deep', dep: 1.08, mouthL: .7, back: '#3e4448', side: '#aab0b0', belly: '#e6e6e2', fin: '#5e6468', m: [{ k: 'bars', at: [.1], w: 2, c: '#101010', o: .85, y: [-.95, .25] }, { k: 'bars', at: [.26, .36, .46, .56, .66], w: 3, c: '#101010', o: .95, y: [-.95, .55] }] },
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
    art: { t: 'mack', dep: .9, lets: '#5a8080', back: '#2f7a7a', side: '#b8cccc', belly: '#f2f2ee', fin: '#6a9090', m: [{ k: 'spots', n: 16, sz: 1.7, r: [1.8, 2.8], c: '#d8a030', o: .95, y: [-.1, .45], x: [.3, .85], gap: 4 }] },
    idm: ['Bronze or yellow spots but no stripes (unlike cero and king mackerel) ^1', 'The front dorsal fin is black ^1', 'A silvery, typical mackerel body ^1'],
    bait: 'Jigs (nylon jigs retrieved fast are among the best), spoons, plugs, flies, cut bait, live shrimp and minnows. ^1',
    tech: ['Drift fishing, chumming, surf casting, trolling, fly fishing, jigging and still fishing. ^1'],
    where: ['Bays, estuaries, reefs, wrecks, jetties and coastal shore points. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Western Atlantic north to Chesapeake Bay (occasionally Cape Cod) and south to Yucatan. ^1',
    src: [['tmf', 'spanish-mackerel', 'Spanish Mackerel']] });

  A({ id: 'king-mackerel', n: 'King Mackerel', sci: 'Scomberomorus cavalla', w: 's', r: 'se3 sc3', al: ['kingfish', 'king', 'kings', 'king mack'],
    art: { t: 'mack', dep: .95, lets: '#5a7a88', back: '#2c5c74', side: '#b0c2c6', belly: '#f2f2ee', fin: '#6a8a96', m: [{ k: 'lat', y: -.15, dip: 6, c: '#3a5a66', o: .85, x: [.2, .95] }] },
    idm: ['A sharp dip in the lateral line under the second dorsal fin ^1', '14–16 spines in the first dorsal fin, which is uniformly blue (Spanish mackerel’s is black) ^1', 'Young fish have spots that fade with age ^1'],
    bait: 'Live or dead ballyhoo, mullet, jacks, herring, pinfish, croakers and shrimp; spoons, feathers, jigs and plugs. ^1',
    tech: ['Trolling, drifting live bait, casting, chumming, bottom bouncing and jigging. ^1'],
    where: ['Coastal pelagic water of 10–20 fathoms: wrecks, buoys, coral reefs, jetties, breakwaters and nearshore reefs. ^1'],
    when: ['A migratory species; winter is prime around South Florida. In summer it reaches Texas to the west and Virginia to the north. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic tropical and subtropical waters from Maine to Rio de Janeiro, including the Gulf of Mexico. ^1',
    src: [['tmf', 'king-mackerel', 'King Mackerel']] });

  A({ id: 'cobia', n: 'Cobia', sci: 'Rachycentron canadum', w: 's', r: 'se3 sc3 ne1', al: ['ling', 'lemonfish', 'crabeater', 'black kingfish'],
    art: { t: 'cobia', dep: 1, lets: '#3c3024', back: '#4a3a2a', side: '#6a5a46', belly: '#d8d0bc', fin: '#3c3024', U: [1.5, 5, 8, 10.5, 12.5, 12, 9.5, 6.5, 4.5], m: [{ k: 'band', y: [-.25, .2], x: [.14, .95], c: '#2a2018', o: .9 }, { k: 'stripes', n: 1, gap: 1, fr: -.42, c: '#d8ccb0', o: .85, x: [.2, .94] }] },
    idm: ['A long, broad, flattened head ^1', 'Dark chocolate-brown back with lighter sides and alternating horizontal stripes ^1'],
    bait: 'Squid, crabs, small live baits, cut bait, spoons, plugs and weighted feathers. ^1',
    tech: ['Trolling lures or bait, bottom fishing, jigging, chumming and spin casting. ^1'],
    where: ['Coastal waters, reefs, wrecks, shoals and floating debris. Adults gather around buoys, pilings, wrecks, anchored boats and flotsam over the shallow continental shelf. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Tropical and warm temperate waters worldwide, offshore and inshore. ^1',
    src: [['tmf', 'cobia', 'Cobia']] });

  A({ id: 'florida-pompano', n: 'Pompano', sci: 'Trachinotus carolinus', w: 's', r: 'se3 sc2', al: ['florida pompano', 'pompano', 'pomps'],
    art: { t: 'deep', dep: .98, mouthL: .6, back: '#4e7e7e', side: '#bccccc', belly: '#f6f2dc', fin: '#8a9a9a', fins: [[.24, .42, 'sp', 7, 'u'], [.44, .74, 'soft', 12, 'u'], [.50, .74, 'soft', 12, 'd', '#d6c070']], m: [] },
    idm: ['Typically 17–25 in with a short, deep, compressed body ^1', 'Blue to greenish above fading to silver on the sides; deeply forked tail ^1'],
    bait: 'Live sand crabs (sand fleas) are recommended. Live shrimp, dead sand crabs, clams and squid pieces also work. Small jigs, spoons and pencil baits. ^1',
    tech: ['Fly fishing, surf casting, spin casting, bait casting, still fishing and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, piers, docks, surf and shore, breakers, jetties, mangroves and tidal flats. ^1'],
    when: ['Spawning occurs from spring through late fall. They move north in warmer months and south in cooler months. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Western Atlantic from North Carolina down to Florida and along the Gulf states. ^1',
    src: [['tmf', 'pompano', 'Pompano']] });

  A({ id: 'snook', n: 'Snook', sci: 'Centropomus undecimalis', w: 'b', r: 'se3 sc1', al: ['common snook', 'linesider', 'robalo'],
    art: { t: 'snook', dep: .98, back: '#5a5e3c', side: '#bcc08c', belly: '#f0eedc', fin: '#a09a60', m: [{ k: 'lat', y: -.15, c: '#0e0e0e', o: 1, x: [.2, .96] }] },
    idm: ['A protruding lower jaw ^1', 'A highly prominent black lateral line from the top of the gill cover through the tail ^1', 'Back brown, olive green, dark gray or black with silvery flanks and belly ^1'],
    bait: 'Live baitfish (sunfish, mullet), crabs, shrimp, cut bait, plugs, jigs, spoons, soft plastics and flies. ^1',
    tech: ['Jigging, fly fishing, still fishing, drift fishing and surf casting. ^1'],
    where: ['Mangroves, jetties, breakers, channel entrances, tidal flats and structures near ocean inlets. ^1'],
    when: ['Best on the changing tide, especially a high falling tide around river mouths and shores, and at night from bridges. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'American tropics and subtropics in shallow coastal waters, estuaries and brackish lagoons. ^1',
    src: [['tmf', 'snook', 'Snook']] });

  A({ id: 'tarpon', n: 'Tarpon', sci: 'Megalops atlanticus', w: 's', r: 'se3 sc2', al: ['silver king', 'silverking'],
    art: { t: 'tarpon', scales: 1, dep: 1.05, back: '#3a6a6c', side: '#d0d8d8', belly: '#f6f6f2', fin: '#8aa0a0', m: [] },
    idm: ['A compressed body covered in very large scales ^1', 'The lower jaw juts out and up ^1', 'Greenish to bluish back with brilliant silver sides and belly ^1'],
    bait: 'Live mullet, pinfish, crabs and shrimp; spoons, plugs, flies, jigs and soft plastics. ^1',
    tech: ['Still fishing, casting, trolling, jigging, fly fishing, surf casting and drift fishing. ^1'],
    where: ['Bays, breakers, jetties, mangroves, piers, tidal flats and channel entrances. ^1'],
    when: ['Best fishing occurs at night when the tarpon is feeding. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1'],
    rng: 'Warm temperate, tropical and subtropical Atlantic waters, inshore and offshore. ^1',
    src: [['tmf', 'tarpon', 'Tarpon']] });

  A({ id: 'red-snapper', n: 'Red Snapper', sci: 'Lutjanus campechanus', w: 's', r: 'sc3 se3', al: ['snapper', 'reds', 'american red snapper'],
    art: { t: 'snapper', scales: 1, dep: 1.05, back: '#b03a30', side: '#d8706a', belly: '#f6dcd2', fin: '#c04a3e', eye: '#c8322a', fins: [[.27, .50, 'sp', 11, 'u'], [.50, .72, 'soft', 12, 'u'], [.58, .76, 'soft', 10, 'd']], m: [] },
    idm: ['A long, triangular face with the upper part sloping more strongly than the lower ^1', 'Enlarged canine teeth ^1', 'Red coloring that is “redder” in deeper water ^1'],
    sz: 'May reach 40 in and 50 lb. ^1',
    where: ['Adults live on the bottom near hard structure on the continental shelf (coral and artificial reefs, rocks, ledges, caves) at about 30–620 ft. ^1', 'Juveniles live in shallow water over sandy or muddy bottoms. ^1'],
    tip: ['Their diet is fish, shrimp, crab, worms and squid or octopus. ^1', 'Anglers use hook and line. In the Gulf, red snapper have a minimum size and daily limit; check current federal and state rules. ^1', 'Take Me Fishing’s red snapper page appears to contain red grouper text, so we do not use it for identification. ^2'],
    rng: 'Gulf and western Atlantic coasts of North and Central America and northern South America; rare north of the Carolinas. ^1',
    src: [['url', 'https://www.fisheries.noaa.gov/species/red-snapper', 'Red Snapper', 'NOAA Fisheries'], ['tmf', 'red-snapper', 'Red Snapper']] });

  A({ id: 'gray-snapper', n: 'Gray (Mangrove) Snapper', sci: 'Lutjanus griseus', w: 's', r: 'se3 sc2', al: ['mangrove snapper', 'mangrove', 'mango snapper', 'grey snapper'],
    art: { t: 'snapper', dep: .95, back: '#5a5848', side: '#9a8a68', belly: '#e0d4bc', fin: '#8a7a5a', m: [{ k: 'stripes', n: 4, gap: 2, fr: -.35, dash: [1, 2], c: '#d0683a', o: .9, x: [.25, .88] }, { k: 'eyestripe', c: '#2a2418', o: .8 }] },
    idm: ['A slender body, large mouth and pointed snout ^1', 'Gray to green with a reddish tinge, with rows of small reddish to orange spots ^1', 'Young fish show a dark stripe from the snout through the eye ^1'],
    sz: 'Rarely exceeds 18 in or 10 lb. ^1',
    bait: 'Shrimp, crabs, cut bait, squid, live bait, jigs, spoons and flies. ^1',
    tech: ['Drift fishing, chumming, casting, fly fishing, bottom bouncing, still fishing and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, mangroves, reefs, wrecks, jetties and seagrass beds; the largest are on offshore reefs and wrecks. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'The southern half of the eastern U.S. coast and Bermuda south to Brazil, including the Gulf of Mexico and the Caribbean. ^1',
    src: [['tmf', 'mangrove-snapper', 'Mangrove Snapper']] });

  A({ id: 'mahi-mahi', n: 'Mahi-Mahi (Dolphinfish)', sci: 'Coryphaena hippurus', w: 's', r: 'se3 sc2 ne2 ca1', al: ['dolphin', 'dorado', 'dolphinfish', 'mahi', 'dolphin fish'],
    art: { t: 'mahi', dep: 1, back: '#1e8a8c', side: '#d8c83a', belly: '#f2ecc0', fin: '#2a96a0', U: [4, 14, 18.5, 19, 17, 14.5, 11, 7.5, 5], m: [{ k: 'spots', n: 14, sz: 1.3, r: [1.2, 2], c: '#1a64a0', o: .8, y: [-.5, .3], x: [.25, .85], gap: 4 }] },
    idm: ['A distinctive shape and colors; iridescent blue or blue-green back, gold flanks and a silvery white or yellow belly when alive ^1', 'Males have a high, vertical forehead; females have a rounded one ^1'],
    bait: 'Flying fish, mullet, ballyhoo, squid and strip baits; plugs and spoons. Live bait works well. ^1',
    tech: ['Trolling surface baits, drift fishing, jigging, casting and live-bait fishing. ^1'],
    where: ['Baitfish patches, floating foam and debris, merging water, reefs, wrecks and shoals, and deep water near shore. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Tropical and warm temperate seas worldwide; mostly deep water, occasionally from piers. ^1',
    src: [['tmf', 'dolphinfish', 'Dolphinfish']] });

  A({ id: 'yellowfin-tuna', n: 'Yellowfin Tuna', sci: 'Thunnus albacares', w: 's', r: 'se2 sc2 ne2 ca1', al: ['yellowfin', 'ahi', 'tuna'],
    art: { t: 'tuna', dep: 1, lets: '#e8d030', back: '#1c2a52', side: '#b4bec8', belly: '#eeeeea', fin: '#d8c030', fins: [[.30, .44, 'sp', 11, 'u', '#c8b438'], [.52, .62, 'sail', 17, 'u'], [.64, .88, 'lets', 4.5, 'u'], [.54, .64, 'sail', 14, 'd'], [.68, .88, 'lets', 4.5, 'd']], m: [{ k: 'band', y: [-.3, -.18], x: [.14, .94], c: '#e8d030', o: .9 }] },
    idm: ['Blue-black back fading to silver below ^1', 'A golden-yellow or iridescent blue stripe from the eye to the tail ^1', 'Fins are golden yellow and the finlets black-edged; large fish have elongated dorsal and anal fins ^1'],
    bait: 'Cut bait, live bait, squid, small fish, strip baits, plugs and spoons. ^1',
    tech: ['Drift fishing, jigging, trolling with small fish, squid or artificial lures, and chumming with live bait. ^1'],
    where: ['The open ocean and deep water near shore: baitfish patches, floating debris, reefs, wrecks and shoals, and merging water. Look near birds. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as hard. ^1', 'A seasonal migrant; our source gives no months. ^1'],
    rng: 'Deep, warm temperate oceanic waters worldwide. ^1',
    src: [['tmf', 'yellowfin-tuna', 'Yellowfin Tuna']] });

  A({ id: 'false-albacore', n: 'False Albacore (Little Tunny)', sci: 'Euthynnus alletteratus', w: 's', r: 'se3 ne3 sc1', al: ['little tunny', 'albie', 'albies', 'bonito', 'fat albert'],
    art: { t: 'tuna', dep: .92, back: '#27486a', side: '#a8b8c4', belly: '#f0f0ee', fin: '#5c6a7a', fins: [[.30, .48, 'sp', 10, 'u'], [.52, .60, 'soft', 8, 'u'], [.62, .86, 'lets', 4.5, 'u'], [.54, .62, 'soft', 8, 'd'], [.66, .86, 'lets', 4.5, 'd']], m: [{ k: 'worms', n: 22, c: '#142234', o: .9, y: [-.95, -.4], x: [.3, .92] }, { k: 'blot', x: .33, y: .25, w: 2, h: 2, c: '#14202e' }, { k: 'blot', x: .42, y: .3, w: 2, h: 2, c: '#14202e' }] },
    idm: ['A scatter of dark spots resembling fingerprints between the pectoral and ventral fins ^1', 'Wavy, worm-like markings on the back ^1'],
    bait: 'Cut bait, jigs, live bait, spoons, trolling lures, flies, plugs, shrimp and squid. ^1',
    tech: ['Drift fishing, chumming, still fishing, trolling, fly fishing, casting and jigging. ^1'],
    where: ['Bays, estuaries, coastal waters, reefs, wrecks, shoals and open ocean. Look near flocks of diving seabirds and baitfish patches. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as easy. ^1'],
    rng: 'Tropical and warm temperate Atlantic from southern New England and Bermuda to Brazil. ^1',
    src: [['tmf', 'little-tunny', 'Little Tunny']] });

  A({ id: 'atlantic-croaker', n: 'Atlantic Croaker', sci: 'Micropogonias undulatus', w: 's', r: 'se3 sc3 ne2', al: ['croaker', 'hardhead', 'croakers'],
    art: { t: 'drum', tt: 'notch', tn: .12, dep: .9, chinBarbels: 4, mouthL: .7, back: '#7a6a50', side: '#bcac88', belly: '#efe9d8', fin: '#9a8a6a', m: [{ k: 'stripes', n: 3, gap: 2, fr: -.6, dash: [2, 2], c: '#6a5a3a', o: .6, x: [.25, .9] }] },
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
    art: { t: 'flat', tt: 'notch', tn: .1, dep: 1.05, mouthL: 1.5, back: '#4e4636', side: '#665a46', belly: '#e6e2d2', fin: '#5a4c3c', U: [1.5, 10, 20, 26, 28, 26, 19, 10, 5.5], D: [1.5, 10, 20, 26, 28, 26, 19, 10, 5.5], m: [{ k: 'spots', n: 16, sz: 1.6, r: [2, 4], c: '#a89a7a', o: .55, y: [-.7, .5], x: [.2, .9], gap: 3 }] },
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
    art: { t: 'ling', dep: 1, mouthL: 1.15, back: '#3f5a48', side: '#7c8e6c', belly: '#d8dcc2', fin: '#6a7a5c', m: [{ k: 'spots', n: 40, sz: 1.6, r: [1.8, 3.4], c: '#4a3a20', o: .6, y: [-.9, .4], gap: 3 }, { k: 'spots', n: 18, sz: 1.2, r: [1, 2], c: '#dcdcb8', o: .7, y: [-.8, .3], gap: 3 }] },
    idm: ['An elongated body with a large mouth and sharp, canine-like teeth ^1,2', 'Mottled gray or brown, sometimes green or blue (can look like almost any shade) ^1,2', 'Large mouth slightly upturned, with a protruding lower jaw ^1'],
    sz: 'Can reach 5 ft; Oregon catches are typically 2–3 ft. ^2',
    bait: 'Crabs, cut bait, jigs and live bait; they are voracious feeders on flounders, hake, herring, rockfish and cod. ^1,2',
    tech: ['Bounce bait along the bottom with 5/0–6/0 hooks, a 4–6 oz sinker and 20 lb line on a stout rod. ^2', 'Drift fishing, still fishing, bottom bouncing and jigging in about 30–700 ft. ^1'],
    where: ['Adults stay near rocks, inshore out to very deep water; young fish prefer sand or mud bottoms in bays. ^1,2'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'Eastern Pacific from Point San Carlos, Baja California to Kodiak Island, Alaska. ^1',
    src: [['tmf', 'lingcod', 'Lingcod'], ['or', 'lingcod', 'Lingcod Fishing']] });

  A({ id: 'california-halibut', n: 'California Halibut', sci: 'Paralichthys californicus', w: 's', r: 'ca3', al: ['halibut', 'cali halibut', 'flatfish', 'flattie'],
    art: { t: 'flat', tt: 'notch', tn: .1, dep: 1, mouthL: 1.4, back: '#8a7e5c', side: '#8a7e5c', belly: '#e8e2cc', fin: '#7a6e50', m: [{ k: 'spots', n: 12, sz: 1.5, r: [1.8, 3], c: '#3a3020', o: .5, y: [-.6, .5], x: [.2, .9], gap: 3 }, { k: 'spots', n: 12, sz: 1.2, r: [1.2, 2], c: '#f0e8cc', o: .7, y: [-.6, .5], x: [.2, .9], gap: 3 }] },
    idm: ['The largest, most abundant flatfish within its range (south of San Francisco) ^1', 'Brownish eyed side with a white blind side; nearly half the fish have both eyes on the right side ^1'],
    sz: 'Up to 60 lb and 5 ft; females grow larger than males. ^1',
    bait: 'Live anchovies, shrimp, queenfish, clams, cut bait, crabs, squid and jigs. ^1',
    tech: ['“Drift fishing with live anchovies, shrimp, or queenfish is the most successful sportfishing method.” Also slow trolling, still fishing, bottom bouncing and jigging. ^1'],
    where: ['Bays, estuaries, kelp forests, piers, jetties and rocky sea floors. ^1', 'Usually on sandy bottoms in 10–20 fathoms or less. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium. ^1'],
    rng: 'San Francisco to Baja California, with scattered records as far north as Washington. ^1',
    src: [['tmf', 'california-halibut', 'California Halibut']] });

  A({ id: 'white-seabass', n: 'White Seabass', sci: 'Atractoscion nobilis', w: 's', r: 'ca3', al: ['seabass', 'sea bass', 'ws', 'white sea bass'],
    art: { t: 'walleye', dep: .95, eyeR: .75, back: '#4a6072', side: '#a8b6bc', belly: '#f0eee6', fin: '#7a8a96', m: [{ k: 'blot', x: .27, y: .15, w: 2, h: 2, c: '#101010' }, { k: 'bars', at: [.34, .44, .54, .64], w: 2, c: '#3a4a58', o: .25, y: [-.9, .1] }] },
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
    art: { t: 'jack', dep: .95, back: '#2e6070', side: '#a8b6b2', belly: '#f2f2ec', fin: '#d8b030', fins: [[.30, .38, 'sp', 8, 'u', '#8a9a60'], [.42, .72, 'soft', 9, 'u', '#c8b040'], [.52, .72, 'soft', 9, 'd', '#c8b040']], m: [{ k: 'band', y: [-.18, -.04], x: [.14, .96], c: '#d8a82c', o: .95 }, { k: 'eyestripe', c: '#2a3a40', o: .7 }] },
    idm: ['A bright yellow tail ^1', 'A brass-colored stripe along the midline of the flanks from snout to tail ^1'],
    bait: 'Live bait, cut bait, crabs, shrimp, squid, jigs, spoons and flies. ^1',
    tech: ['Drift fishing, chumming, still fishing, jigging, fly fishing, surf casting and spin casting. ^1'],
    where: ['Bays and estuaries, coastal waters, reefs, wrecks and shoals, breakers, piers, rocky sea floor and surf. ^1'],
    when: ['Feeds mainly in the morning and late afternoon. ^1'],
    tip: ['Take Me Fishing rates catch difficulty as medium; it strikes hard and makes a long, hard run. ^1'],
    rng: 'Gulf of California and the Pacific coast from Baja California to Los Angeles; rarely farther north, once as far as Washington. ^1',
    src: [['tmf', 'california-yellowtail', 'California Yellowtail']] });

  A({ id: 'kelp-bass', n: 'Kelp Bass (Calico Bass)', sci: 'Paralabrax clathratus', w: 's', r: 'ca3', al: ['calico bass', 'calico', 'calicos', 'kelpie'],
    art: { t: 'seabass', dep: 1.05, back: '#58602e', side: '#8a9050', belly: '#d6d2ac', fin: '#6c6c3a', m: [{ k: 'spots', n: 22, sz: 1.2, r: [1, 2], c: '#dcd8b8', o: .65, y: [-.9, .2], x: [.2, .9], gap: 3 }, { k: 'blot', x: .34, y: -.7, w: 4, h: 2, c: '#e4e0c4', o: .85 }, { k: 'blot', x: .52, y: -.7, w: 4, h: 2, c: '#e4e0c4', o: .85 }, { k: 'blot', x: .7, y: -.7, w: 4, h: 2, c: '#e4e0c4', o: .85 }] },
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
