# dev

Development artifacts. **None of this ships** — the app is still one self-contained
`index.html` with no build step, and that does not change. Everything here is for checking
that file and for the research behind the numbers in it.

## verify

A headless-Chrome harness driven over the DevTools protocol. No npm install: it uses Node's
built-in WebSocket client and whatever Chrome is on the machine. Run everything from the
repo root.

| | |
|---|---|
| `node dev/verify/accuracy.mjs` | Scores the rendered share of 36 cities against the share their own region claims. The number to tune data and weighting against. Currently a mean of 5.4 percentage points. |
| `node dev/verify/shoot.mjs <label>` | Renders 17 fixed probes (years across the span, zoomed frontiers, every control state, all deep-link parameters at once) and hashes each. Writes `dev/verify/shots/<label>.json`. |
| `node dev/verify/shoot.mjs --diff <a> <b>` | Compares two runs. Used to prove a refactor changes nothing: the dataset registry landed byte-identical this way. |
| `node dev/verify/probe.mjs '<query>' '<js>'` | Loads the app with a deep-link query and evaluates an expression in it. Ad-hoc inspection. |
| `node dev/verify/cvd.mjs` | Simulates protanopia, deuteranopia and tritanopia over the ramps and scores pairwise separation. This is what ruled saffron out for Buddhism and picked teal. |

`HH_FILE=/path/to/other.html` points any of them at a different copy, which is how a change
gets compared against the commit before it.

Two traps, both of which bit during development:

- **A panel city must be clear of the city-scale diaspora overlays.** Three were not, and
  were silently measuring the overlay rather than the region. If a city reads oddly, check
  whether an overlay sits within one render cell of it before believing the number.
- **`shoot.mjs` pins the year, camera and play state through the deep link**, because the
  app autoplays. A probe that sets `cam` directly without going through the deep link can
  measure a frame the app would never draw.

## research

The working notes behind the four datasets: citation sets, contested-figure tables, the
corrections made against first drafts, and the confidence tiering. The *sources and modelling
assumptions* that a reader needs are in the top-level `README.md`; this is the supporting
detail, including material that was read and not used.

The `.js` files are the share tables as first delivered, before the corrections listed in the
`-corrections` and `-notes` files were applied. They are kept for provenance, not for pasting:
`index.html` is the live version.
