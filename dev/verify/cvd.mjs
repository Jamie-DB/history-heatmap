// Colour-vision-deficiency check for the faith ramps. Viénot-Brettel-Mollon (1999) linear
// dichromat simulation, then CIE76 dE in Lab. Categorical hues that must be told apart on a
// map need a comfortable margin; ~20 dE is a safe bar, ~10 is marginal.
const srgb2lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lin2srgb = c => { c = Math.max(0, Math.min(1, c)); return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1/2.4) - 0.055); };
const hex2rgb = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];

function simulate(hex, kind) {
  if (kind === 'normal') return hex2rgb(hex);
  const [r,g,b] = hex2rgb(hex).map(srgb2lin);
  const L = 17.8824*r + 43.5161*g + 4.11935*b;
  const M = 3.45565*r + 27.1554*g + 3.86714*b;
  const S = 0.0299566*r + 0.184309*g + 1.46709*b;
  let L2=L, M2=M, S2=S;
  if (kind === 'protan')  L2 = 2.02344*M - 2.52581*S;
  if (kind === 'deutan')  M2 = 0.494207*L + 1.24827*S;
  if (kind === 'tritan')  S2 = -0.395913*L + 0.801109*M;
  return [
    lin2srgb( 0.080944479*L2 - 0.130504409*M2 + 0.116721066*S2),
    lin2srgb(-0.0102485335*L2 + 0.0540193266*M2 - 0.113614708*S2),
    lin2srgb(-0.000365296938*L2 - 0.00412161469*M2 + 0.693511405*S2),
  ];
}
function lab(rgb) {
  let [r,g,b] = rgb.map(srgb2lin);
  let X = (0.4124*r + 0.3576*g + 0.1805*b) / 0.95047;
  let Y = (0.2126*r + 0.7152*g + 0.0722*b);
  let Z = (0.0193*r + 0.1192*g + 0.9505*b) / 1.08883;
  const f = t => t > 0.008856 ? Math.cbrt(t) : (7.787*t + 16/116);
  [X,Y,Z] = [f(X), f(Y), f(Z)];
  return [116*Y - 16, 500*(X - Y), 200*(Y - Z)];
}
const dE = (h1, h2, kind) => {
  const a = lab(simulate(h1, kind)), b = lab(simulate(h2, kind));
  return Math.hypot(a[0]-b[0], a[1]-b[1], a[2]-b[2]);
};

const BLUE = ['#cde2fb','#b7d3f6','#9ec5f4','#86b6ef','#6da7ec','#5598e7','#3987e5','#2a78d6','#256abf','#1c5cab','#184f95','#104281','#0d366b'];
const RED  = ['#fcdcd6','#f8c8c0','#f4b4aa','#efa095','#e98c80','#e2776b','#d96256','#cf4c45','#bc3e3b','#a53431','#8b2b29','#712222','#591b1b'];

// candidate third hues, given as a single mid-ramp stop to screen quickly
const CAND = {
  'saffron/amber': '#d98324', 'gold':    '#c99a1e', 'teal':   '#0f8f86',
  'bluish-green':  '#009e73', 'violet':  '#7a51b5', 'magenta':'#b5478f',
  'olive':         '#7d8a2e', 'cyan':    '#2aa7c4', 'plum':   '#8e4a7d',
};
const MID = 7;   // index used for the pop-HUD swatch in light theme
const KINDS = ['normal','deutan','protan','tritan'];

console.log('STEP 1 — do the existing blue and red survive as a pair?');
console.log('(dE at each ramp position, worst case across positions)');
for (const k of KINDS) {
  let worst = Infinity, at = 0;
  for (let i = 0; i < 13; i++) { const d = dE(BLUE[i], RED[i], k); if (d < worst) { worst = d; at = i; } }
  console.log('  ' + k.padEnd(8) + ' worst dE ' + worst.toFixed(1) + ' at stop ' + at);
}

console.log('\nSTEP 2 — candidate third hue vs blue and red at the same ramp position');
console.log('  name             vs-blue  vs-red   (min across deutan/protan)');
const scored = [];
for (const [name, hex] of Object.entries(CAND)) {
  const vb = Math.min(dE(hex, BLUE[MID], 'deutan'), dE(hex, BLUE[MID], 'protan'));
  const vr = Math.min(dE(hex, RED[MID],  'deutan'), dE(hex, RED[MID],  'protan'));
  scored.push([name, vb, vr, Math.min(vb, vr)]);
}
scored.sort((a,b) => b[3] - a[3]);
for (const [n, vb, vr, m] of scored)
  console.log('  ' + n.padEnd(16) + vb.toFixed(1).padStart(6) + vr.toFixed(1).padStart(8) +
              '   ' + (m > 20 ? 'SAFE' : m > 12 ? 'marginal' : 'FAILS'));

/* ---------------------------------------------------------------------------
   STEP 2 was not a fair test: it compared one candidate swatch against a ramp
   stop whose lightness it did not share, so lightness did the separating. The
   renderer paints competing faiths at the SAME ramp position, i.e. the same
   lightness, so the only channel left is hue and chroma. Rebuild each candidate
   as a full ramp carrying the blue ramp's exact L* profile, then compare stop
   for stop. --------------------------------------------------------------- */
function lab2rgb([L,a,b]) {
  const fy = (L+16)/116, fx = fy + a/500, fz = fy - b/200;
  const g = t => t**3 > 0.008856 ? t**3 : (t - 16/116)/7.787;
  const X = g(fx)*0.95047, Y = g(fy), Z = g(fz)*1.08883;
  const r =  3.2406*X - 1.5372*Y - 0.4986*Z;
  const gg = -0.9689*X + 1.8758*Y + 0.0415*Z;
  const bb =  0.0557*X - 0.2040*Y + 1.0570*Z;
  return [lin2srgb(r), lin2srgb(gg), lin2srgb(bb)];
}
const rgb2hex = rgb => '#' + rgb.map(v => Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');
const hueOf = hex => { const [,a,b] = lab(hex2rgb(hex)); return Math.atan2(b,a); };

// blue's L* and C* march, reused so every faith ramp has an identical lightness profile
const PROFILE = BLUE.map(h => { const [L,a,b] = lab(hex2rgb(h)); return [L, Math.hypot(a,b)]; });
const rampAtHue = (hRad, chromaScale = 1) => PROFILE.map(([L, C]) =>
  rgb2hex(lab2rgb([L, Math.cos(hRad) * C * chromaScale, Math.sin(hRad) * C * chromaScale])));

const SIGNAL = [4,5,6,7,8,9,10,11,12];   // stops that carry real share; 0-3 are near-neutral
function worstPair(rA, rB) {
  let w = Infinity;
  for (const k of ['deutan','protan'])
    for (const i of SIGNAL) w = Math.min(w, dE(rA[i], rB[i], k));
  return w;
}

console.log('\nSTEP 3 — full ramps at IDENTICAL lightness, worst dE over stops 4-12');
console.log('  blue vs red (shipping pair): ' + worstPair(BLUE, RED).toFixed(1));
console.log('\n  candidate hue      vs-blue  vs-red   verdict');
const results = [];
for (let deg = 0; deg < 360; deg += 10) {
  const r = rampAtHue(deg * Math.PI / 180);
  results.push([deg, worstPair(r, BLUE), worstPair(r, RED)]);
}
results.sort((a,b) => Math.min(b[1],b[2]) - Math.min(a[1],a[2]));
for (const [deg, vb, vr] of results.slice(0, 8)) {
  const m = Math.min(vb, vr);
  console.log('  ' + (deg + '°').padEnd(18) + vb.toFixed(1).padStart(6) + vr.toFixed(1).padStart(8) +
              '   ' + (m > 18 ? 'SAFE' : m > 11 ? 'marginal' : 'fails') + '   ' + rampAtHue(deg*Math.PI/180)[8]);
}
console.log('\n  reference hue angles: blue=' + (hueOf(BLUE[8])*180/Math.PI).toFixed(0) +
            '°  red=' + (hueOf(RED[8])*180/Math.PI).toFixed(0) + '°');

/* ---------------------------------------------------------------------------
   STEP 4 — the check that actually decides it. A third faith must be separable
   not only from blue and red but from every colour the renderer paints where
   blue and red are contested, because that band is a real feature of the map.
   -------------------------------------------------------------------------*/
const mixHex = (a, b, t) => rgb2hex([0,1,2].map(k => hex2rgb(a)[k] + t * (hex2rgb(b)[k] - hex2rgb(a)[k])));
function worstVsContested(r) {
  let w = Infinity, at = '';
  for (const i of SIGNAL)
    for (const t of [0.25, 0.4, 0.5, 0.6, 0.75]) {
      const m = mixHex(BLUE[i], RED[i], t);
      for (const k of ['normal','deutan','protan']) {
        const d = dE(r[i], m, k);
        if (d < w) { w = d; at = 'stop ' + i + ', t=' + t + ', ' + k; }
      }
    }
  return [w, at];
}
const TEAL = rampAtHue(210 * Math.PI / 180);
const MAGENTA = rampAtHue(350 * Math.PI / 180);
console.log('\nSTEP 4 — vs the Christianity/Islam contested blend');
for (const [name, r] of [['teal 210', TEAL], ['magenta 350', MAGENTA]]) {
  const [w, at] = worstVsContested(r);
  console.log('  ' + name.padEnd(13) + 'worst dE ' + w.toFixed(1).padStart(5) + '  (' + at + ')  ' +
              (w > 18 ? 'SAFE' : w > 11 ? 'marginal' : 'COLLIDES'));
}
console.log('\nSTEP 5 — normal-vision separation from blue (is it just "another blue"?)');
for (const [name, r] of [['teal 210', TEAL], ['magenta 350', MAGENTA]]) {
  let w = Infinity;
  for (const i of SIGNAL) w = Math.min(w, dE(r[i], BLUE[i], 'normal'));
  console.log('  ' + name.padEnd(13) + 'worst dE vs blue (normal vision) ' + w.toFixed(1));
}
console.log('\nCHOSEN RAMP:');
console.log(JSON.stringify(TEAL));

/* ---------------------------------------------------------------------------
   STEP 6 — Both candidates collide with the blue/red blend, so hue-blending
   cannot survive a third faith: the blend sweeps the hue space between its two
   parents and under dichromacy there is nowhere left to stand. Test the
   alternative instead: hue stays purely categorical (one hue = one faith,
   never a mixture) and contest is carried by DESATURATION toward a neutral.
   For that to work, a contested cell must still say which faith leads.
   -------------------------------------------------------------------------*/
// warm neutral hued toward --land (#f1f0ea light / #232322 dark) rather than a true grey:
// a neutral grey reads as a fourth category, a land-hued grey reads as "nothing committed"
const NEUTRAL = PROFILE.map(([L]) => rgb2hex(lab2rgb([L, 1.6, 3.4])));
const DESAT_MAX = 0.55;
const desat = (r, u) => r.map((h, i) => mixHex(h, NEUTRAL[i], u * DESAT_MAX));

console.log('\nSTEP 6 — hue categorical, contest carried by desaturation');
console.log('  neutral ramp: ' + NEUTRAL[8] + ' (light-theme mid)\n');
const RAMPS = { blue: BLUE, red: RED, teal: TEAL };
const names = Object.keys(RAMPS);
const worst = (a, b) => {
  let w = Infinity;
  for (const k of ['normal','deutan','protan'])
    for (const i of SIGNAL) w = Math.min(w, dE(a[i], b[i], k));
  return w;
};
console.log('  pure hues, pairwise (must be >18):');
for (let i = 0; i < 3; i++) for (let j = i+1; j < 3; j++)
  console.log('    ' + (names[i]+'/'+names[j]).padEnd(12) + worst(RAMPS[names[i]], RAMPS[names[j]]).toFixed(1));

console.log('\n  fully contested (u=1), pairwise — does a frontier still say who leads?');
for (let i = 0; i < 3; i++) for (let j = i+1; j < 3; j++)
  console.log('    ' + (names[i]+'/'+names[j]).padEnd(12) +
    worst(desat(RAMPS[names[i]],1), desat(RAMPS[names[j]],1)).toFixed(1));

console.log('\n  contested vs its own pure hue — is the desaturation visible at all?');
for (const n of names) console.log('    ' + n.padEnd(12) + worst(RAMPS[n], desat(RAMPS[n],1)).toFixed(1));

console.log('\n  contested vs pure neutral (the unmodeled-majority wash) — must not merge:');
for (const n of names) console.log('    ' + n.padEnd(12) + worst(desat(RAMPS[n],1), NEUTRAL).toFixed(1));

console.log('\nRAMPS:');
console.log('  RAMP_TEAL    = ' + JSON.stringify(TEAL));
console.log('  RAMP_NEUTRAL = ' + JSON.stringify(NEUTRAL));

/* STEP 7 — scan the two free parameters: how far a contested cell desaturates,
   and how much chroma the teal ramp carries. Requirements, in priority order:
     A pure hues pairwise            > 18   (one hue = one faith, at a glance)
     B contested pairs               > 15   (a frontier still says which side leads)
     C contested vs its own pure hue >  8   (the contest is actually visible)
     D contested vs pure neutral     > 12   (does not merge with the unmodeled wash) */
console.log('\nSTEP 7 — parameter scan');
console.log('  desat  chroma |    A     B     C     D  | verdict');
let best = null;
for (const dmax of [0.20,0.25,0.30,0.35,0.40,0.45]) {
  for (const cs of [1.0, 1.2, 1.35, 1.5]) {
    const T = rampAtHue(210*Math.PI/180, cs);
    const R = { blue: BLUE, red: RED, teal: T };
    const ds = r => r.map((h,i) => mixHex(h, NEUTRAL[i], dmax));
    let A = Infinity, B = Infinity, C = Infinity, D = Infinity;
    for (let i = 0; i < 3; i++) for (let j = i+1; j < 3; j++) {
      A = Math.min(A, worst(R[names[i]], R[names[j]]));
      B = Math.min(B, worst(ds(R[names[i]]), ds(R[names[j]])));
    }
    for (const n of names) { C = Math.min(C, worst(R[n], ds(R[n]))); D = Math.min(D, worst(ds(R[n]), NEUTRAL)); }
    const ok = A > 18 && B > 15 && C > 8 && D > 12;
    if (ok && (!best || (A+B+C+D) > best.score)) best = { dmax, cs, A,B,C,D, score: A+B+C+D, T };
    console.log('   ' + dmax.toFixed(2) + '   ' + cs.toFixed(2) + '  |' +
      [A,B,C,D].map(v => v.toFixed(1).padStart(6)).join('') + '  | ' + (ok ? 'OK' : ''));
  }
}
console.log('\nBEST: desat ' + (best ? best.dmax : '-') + ', teal chroma x' + (best ? best.cs : '-'));
if (best) {
  console.log('  RAMP_TEAL    = ' + JSON.stringify(best.T));
  console.log('  RAMP_NEUTRAL = ' + JSON.stringify(NEUTRAL));
}
