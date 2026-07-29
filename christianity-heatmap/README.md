# Christianity Heatmap (AD 33 to 2026)

An interactive, self-contained animation of the estimated Christian share of population across the world, from Pentecost to today. Open `index.html` in any browser; no server, no network, no dependencies.

## What you're looking at

- **Heat layer**: log-scaled Christian share of local population, weighted by population density, on a 2° world grid. A single-hue blue ramp; brighter = larger share (in dark mode) or darker (in light mode).
- **Timeline**: non-linear (early centuries get extra width). Ticks mark era events (Edict of Milan, Great Schism, Reformation, ...), which are v1 hooks for a future events layer.
- **City markers**: appear at their moment (Jerusalem 33, Constantinople 330, Kyiv 988, Manila 1571, ...), with labels that fade after a few decades.
- **Deep links**: `index.html?year=1100&theme=dark&play=1`.

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

Sim-affecting sliders trigger a ~1s background recompute (progress shown on the map).

## Ideas for later

- Historical event overlays (wars, crusades, persecutions) with map annotations
- Denominational split (Catholic / Orthodox / Protestant) after 1054 and 1517
- Comparative layers (Islam, Buddhism) on the same engine
- Export animation as GIF/video

## Data provenance

Coastlines: Natural Earth 110m land (public domain), preprocessed to compact polylines and a 2° land mask, embedded in the HTML. All historical figures are order-of-magnitude estimates curated for this toy; do not cite them.
