# Christianity Heatmap (AD 33 to 2026)

An interactive, self-contained animation of the estimated Christian and Muslim share of population across the world, from Pentecost to today. Open `index.html` in any browser; no server, no network, no dependencies.

## Layers

- **Christianity** (blue ramp) and **Islam** (red ramp), individually toggleable.
- A cell renders purple co-presence only when both faiths hold at least 2% of its population AND the larger share is within a ratio band of the smaller; outside the band the winner takes full color, so a 10% / 60% cell reads as the majority, not as purple. The **Frontier** control picks the band: **Blend** (within 4.5x, the default; al-Andalus, the Sahel, Nigeria stay purple) or **Majority** (within 1.5x, near-parity only), which renders the moving battle lines of religion (the Reconquista frontier, the Ottoman Balkans) as crisp lines. Deep link: `?frontier=majority`.
- City-scale overlay regions carry modern diaspora demographics honestly: Wayne County/Dearborn, Greater Paris, the Ruhr, Greater London, each with its own late-era anchors and a tight splat radius.
- The simulation layer is loosely tethered to history (per-cell carrying capacity of 4x the historical share plus 5%), so the model chooses where and when faiths spread while history bounds how much; crank the sliders to fight the tether.

## What you're looking at

- **Heat layer**: log-scaled Christian share of local population, weighted by population density, evaluated analytically over the current viewport (the anchor data lives as gaussian weight points, not pixels). A single-hue blue ramp; brighter = larger share (in dark mode) or darker (in light mode).
- **Timeline**: non-linear (early centuries get extra width). Ticks mark era events (Edict of Milan, Great Schism, Reformation, ...), which are v1 hooks for a future events layer.
- **City markers**: appear at their moment (Jerusalem 33, Constantinople 330, Kyiv 988, Manila 1571, ...), with labels that fade after a few decades.
- **Pan & zoom**: scroll or pinch to zoom toward the cursor (up to 60x), drag to pan, double-click to zoom in, "Reset view" to snap back. Past 3x zoom the coastline switches from Natural Earth 110m to 50m detail (with lakes), and city labels stay visible instead of fading. The camera is captured in the URL as `?view=lon,lat,zoom`.
- **Resolution refinement**: the heat field is not a fixed grid; each frame it is evaluated analytically on a ~320-cell-wide grid fitted to the viewport, so detail sharpens as you zoom at constant cost. City-scale points narrower than the current cell render with sigma clamped up to the cell size and amplitude scaled down by the area ratio (mass-conserving anti-aliasing), so Dearborn honestly dilutes to a few percent of its 2-degree cell at world view and resolves to a purple city-footprint spot at 50x. The simulation layer stays on its 2-degree grid, sampled bilinearly; fine-zoom detail comes from the historical layer.
- **Full window**: the small button in the lower right of the map expands map + HUD to fill the browser window (Esc exits, `?fs=1` deep-links it). Non-map aspect ratios letterbox rather than stretch, which incidentally reveals Antarctica.
- **Deep links**: `index.html?year=1100&theme=dark&play=1&mode=percap&layers=cm&view=-83.1,42.3,16` (`layers=c`, `m`, or `cm`).
- **Display modes**: "Population-weighted" (default) scales brightness by where the people are; "Per capita" renders share alone wherever meaningfully inhabited, so sparse-but-devout regions (the American Plains, the Bible Belt) read at full strength.
- **Time-varying settlement**: weight points may carry a founding year (`[lon, lat, w, year]`); they ramp in over 60 years and each region's population is distributed across its currently active points. The US interior fills in progressively from 1624 (New York) to 1889 (Oklahoma City).

## The hybrid model

Two layers, mixed by the blend slider:

1. **History (anchor data)**: 32 world regions, each with hand-curated estimates of Christian share and population at 19 anchor years (33 to 2026), linearly interpolated. Grounded in standard scholarship: Rodney Stark's early growth estimates (~40% per decade to AD 300), dated conversions (Armenia 301, Ethiopia c. 340, Rus 988), post-Islamic-conquest decline curves, colonial-era spread, and modern Pew / World Christian Database figures. These are rough, contestable estimates; see the in-app data table.
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

Coastlines: Natural Earth 110m land (world view) and 50m land + lakes (zoomed view), public domain, preprocessed to compact polylines (the 50m set delta-encoded in 0.01° integer units) and a 2° land mask, embedded in the HTML. All historical figures are order-of-magnitude estimates curated for this toy; do not cite them.
