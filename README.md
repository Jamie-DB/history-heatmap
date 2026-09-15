# History Heatmap

An engine for watching populations change across the world over time: a scrubbable map where hand-curated historical anchor data blends with a growth-and-diffusion simulation, rendered as a heat field evaluated analytically over whatever the viewport shows rather than as a fixed pixel grid.

**The current dataset is the estimated Christian and Muslim share of population, AD 33 to 2026.** The engine is built so other population types — cultures, movements, migrations — are swappable datasets rather than rewrites.

**[Open the live demo](https://jamie-db.github.io/history-heatmap/)**, or clone and open `index.html` in any browser. One file, no server, no network requests, no dependencies, no build step.

[BUILDLOG.md](BUILDLOG.md) is the narrative record of how it was built.

---

## Layers

- **Christianity** (blue ramp) and **Islam** (red ramp), individually toggleable.
- A cell renders purple co-presence only when both faiths hold at least 2% of its population AND the larger share is within a ratio band of the smaller; outside the band the winner takes full color, so a 10% / 60% cell reads as the majority, not as purple. The **Frontier** control picks the band: **Blend** (within 4.5x, the default; al-Andalus, the Sahel, Nigeria stay purple) or **Majority** (within 1.5x, near-parity only), which renders the moving battle lines of religion (the Reconquista frontier, the Ottoman Balkans) as crisp lines. Deep link: `?frontier=majority`.
- City-scale overlay regions carry modern diaspora demographics honestly at true footprints: Wayne County and Dearborn, Greater Paris, the Ruhr, Greater London, plus ~16 post-1975 migration hotspots (Hamtramck, Paterson, Cedar-Riverside, Bridgeview, Brussels, Marseille, Roubaix, Seine-Saint-Denis, Birmingham, Bradford, Luton, Tower Hamlets, Rotterdam, Neukölln, Malmö, Vienna). Scrubbing 1950 to 2026 shows the migration waves ignite: guest workers in the 1960s, family reunification from ~1975, refugee waves in the 1990s. Shares from Pew and the UK 2021 census; France bans religious censuses, so French figures are softer estimates.
- The simulation layer is loosely tethered to history (per-cell carrying capacity of 4x the historical share plus 5%), so the model chooses where and when faiths spread while history bounds how much; crank the sliders to fight the tether.

## Views

The Apostolic Age and Old Testament views, and the church-history overlay that rode on top of
the demographic map, are **currently switched off**. They did not render correctly and are
parked behind a single flag rather than deleted: every journey and site is still in
`index.html`, dormant, and reviving them is one constant. While they are off the **View**
control hides itself, and `?mode=apostolic`, `?mode=ot`, `?bib=` and `?tradition=` parse
harmlessly and land on the demographic view.

## What you're looking at

- **Heat layer**: log-scaled Christian share of local population, weighted by population density, evaluated analytically over the current viewport (the anchor data lives as gaussian weight points, not pixels). A single-hue blue ramp; brighter = larger share (in dark mode) or darker (in light mode).
- **Timeline**: non-linear (early centuries get extra width). Ticks mark era events (Edict of Milan, Great Schism, Reformation, ...), which are v1 hooks for a future events layer.
- **City markers**: ~100 cities appear at their moment of significance (Jerusalem 33, Ctesiphon 226, Mecca 622, Baghdad 762, Timbuktu 1100, Khanbaliq 1294, Mbanza-Kongo 1491, ...), with labels that fade after a few decades. Activation year means "when the city matters to the story," not founding date. Minor cities (rank 2) always debut visibly at world view, then persist only under zoom; majors keep their dots everywhere. No stretch of history goes more than ~95 years without a new city.
- **City lifecycle**: cities fall, flip, and get renamed. A conquest telegraphs (the name swells in the attacker's color), then bursts into the new name or ruler: Byzantium's heir becomes Istanbul in 1453, Tenochtitlán becomes Mexico City in 1521, Jerusalem flips red-blue-red across 638/1099/1187. Cities that die fade off the map for good (Carthage 698 with Tunis rising in its place, Antioch 1268, Dongola 1365). Failed sieges flash the attacker's color and revert (Vienna 1529 and 1683, Malta 1565). Rome gets sacked four times and never disappears, which is the point. All animations are pure functions of the playhead year, so scrubbing backwards replays history in reverse.
- **Region inspector**: click any region to open a panel with one sparkline per visible dataset across all nineteen anchor years. The dots are the anchor estimates and the line between them is interpolation, which is the point of drawing both: the map cannot show you where the curated data stops and the model starts, and this can. Each dot carries its year and value on hover. The sparkline's x axis uses the same warp as the timeline, so a position in the chart is the same position on the scrubber, and a cursor tracks the playhead. Click the open region again to close. Deep link: `?region=India`.
- **Pan & zoom**: scroll or pinch to zoom toward the cursor (up to 60x), drag to pan, double-click to zoom in, "Reset view" to snap back. Past 3x zoom the coastline switches from Natural Earth 110m to 50m detail (with lakes), and city labels stay visible instead of fading. The camera is captured in the URL as `?view=lon,lat,zoom`.
- **Resolution refinement**: the heat field is not a fixed grid; each frame it is evaluated analytically on a ~320-cell-wide grid fitted to the viewport, so detail sharpens as you zoom at constant cost. City-scale points narrower than the current cell render with sigma clamped up to the cell size and amplitude scaled down by the area ratio (mass-conserving anti-aliasing), so Dearborn honestly dilutes to a few percent of its 2-degree cell at world view and resolves to a purple city-footprint spot at 50x. The simulation layer stays on its 2-degree grid, sampled bilinearly; fine-zoom detail comes from the historical layer.
- **Full window**: the small button in the lower right of the map expands map + HUD to fill the browser window (Esc exits, `?fs=1` deep-links it). Non-map aspect ratios letterbox rather than stretch, which incidentally reveals Antarctica.
- **Deep links**: `index.html?year=1100&theme=dark&play=1&mode=percap&layers=chr,isl&view=-83.1,42.3,16&region=Iberia`. `layers` takes a comma list of dataset ids; the older single-letter form (`layers=c`, `m`, `cm`) still works.
- **Population tally**: a small health-bar chart pinned mid-left of the viewport tracks running world totals as time plays: estimated world population (grey), Christians (blue), Muslims (red), with counts and shares. Bar length uses a square-root scale against the 2026 world total, so the first millennium stays legible instead of collapsing into slivers. Sums come from the region anchors, so the city overlays double-count slightly against their base regions, the same way the heat layer treats them.
- **Display modes**: "Population-weighted" (default) scales brightness by where the people are; "Per capita" renders share alone wherever meaningfully inhabited, so sparse-but-devout regions (the American Plains, the Bible Belt) read at full strength.
- **Time-varying settlement**: weight points may carry a founding year (`[lon, lat, w, year]`); they ramp in over 60 years and each region's population is distributed across its currently active points. The US interior fills in progressively from 1624 (New York) to 1889 (Oklahoma City).

## The hybrid model

Two layers, mixed by the blend slider:

1. **History (anchor data)**: 38 world regions (plus 21 city-scale and diaspora overlays), each with hand-curated estimates of every dataset's share and of population at 19 anchor years (33 to 2026), linearly interpolated. Grounded in standard scholarship: Rodney Stark's early growth estimates (~40% per decade to AD 300), dated conversions (Armenia 301, Ethiopia c. 340, Rus 988), post-Islamic-conquest decline curves, colonial-era spread, and modern Pew / World Christian Database figures. These are rough, contestable estimates; see the in-app data table.
2. **Simulation**: logistic growth + diffusion on the land grid, seeded at Jerusalem in AD 33. Spreads along populated cells, weakly across narrow seas, and over dated ocean routes (Atlantic 1493, Cape route 1498, Pacific 1565). Decline eras are derived from drops in the anchor data, scaled by the decline slider.

## Parameters

| Slider | Effect |
|---|---|
| Growth rate | Conversion growth inside a community (sim) |
| Spread speed | Diffusion speed along land and sea routes (sim) |
| Urban concentration | How tightly heat hugs population centers (render) |
| Decline sensitivity | Response to conquest and suppression eras (sim) |
| History ↔ Simulation | 100% = pure anchor data; 0% = the model runs free |
| Display mode | Population-weighted vs per capita (render) |

Sim-affecting sliders trigger a ~1s background recompute (progress shown on the map).

## Ideas for later

- Historical event overlays (wars, crusades, persecutions) with map annotations
- Denominational split (Catholic / Orthodox / Protestant) after 1054 and 1517
- Comparative layers (Islam, Buddhism) on the same engine
- Export animation as GIF/video

## Data provenance

### Regions

Southeast Asia was one region until it was split three ways. Averaged, it asserted a blend
nobody lives in: the mainland is roughly 80% Buddhist, the archipelago roughly 85% Muslim, and
the Philippines, roughly 90% Christian and 120 million people, was buried inside both. It is
now **Mainland Southeast Asia**, **Maritime Southeast Asia** and **Philippines**. The Himalaya
needed the same treatment, because Nepal holds seven eighths of the combined population and is
about 81% Hindu while Tibet and Bhutan are about 90% Buddhist; they are **Tibet & Bhutan** and
**Nepal**. **Sri Lanka** comes out of India. **Mongolia** was in no region at all.

Two corrections came with the split. The old Southeast Asia population array ran about 1.6
times high before 1850, a consistent 0.60 to 0.69 ratio across eleven anchors that converged to
correct after 1900, which reads like a modern figure back-extrapolated on a smooth curve. The
replacement follows Anthony Reid's *Southeast Asia in the Age of Commerce* (23M in 1600, 32M in
1800, 82M in 1900) and McEvedy & Jones for the first millennium, and drops the world tally 17M
at 1800. India sheds Sri Lanka and Nepal for anchors up to 1950 only, because its 2000 and 2026
figures are already the Republic alone.

The seven carry a tighter gaussian (2.0 grid cells rather than the 3.2 default) because they
are an order of magnitude smaller than China or India and the wide splat bled Malaysia's Muslim
share up the peninsula.

**Known gaps.** Pakistan and Bangladesh are absent, roughly 430 million people in 2026: India's
population array is the subcontinent before 1900 and the Republic after, with nothing covering
the difference. The Netherlands is inside Central Europe, where a German-dominated aggregate
averages away the Dutch divergence: the region reads 12% urban in 1600 while the Dutch Republic
was near 34% and Holland province alone above 60%.

### Data integrity

Faiths are mutually exclusive shares of one population, so they cannot sum above 1 in a region
at an anchor year. A boot-time check reports violations to the console. It currently finds 18,
all pre-existing: Caucasus at 1.07 across nine anchors (it holds Azerbaijan, which is
overwhelmingly Muslim, against a Christian share pinned at .85 to .88), Rus & Russia at 1.06
across seven (Tatar and Bashkir Muslims plus Finno-Ugric and Siberian animists against a
Christian share pinned at .92), and Iberia at 1.05 in 1200 and 1400, where both shares were
authored against the whole peninsula rather than partitioning it. They are reported rather than
silently corrected: which way to move those numbers is a question about history.

### Coastlines

Coastlines: Natural Earth 110m land (world view) and 50m land + lakes (zoomed view), public domain, preprocessed to compact polylines (the 50m set delta-encoded in 0.01° integer units) and a 2° land mask, embedded in the HTML. All historical figures are order-of-magnitude estimates curated for this toy; do not cite them.
