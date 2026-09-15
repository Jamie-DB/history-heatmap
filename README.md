# History Heatmap

An engine for watching populations change across the world over time: a scrubbable map where hand-curated historical anchor data blends with a growth-and-diffusion simulation, rendered as a heat field evaluated analytically over whatever the viewport shows rather than as a fixed pixel grid.

**Four datasets ship: the Christian, Muslim and Buddhist share of population, and urbanisation, all AD 33 to 2026.** Adding a population type means adding a registry entry and a share table, not editing the renderer.

**[Open the live demo](https://jamie-db.github.io/history-heatmap/)**, or clone and open `index.html` in any browser. One file, no server, no network requests, no dependencies, no build step.

[BUILDLOG.md](BUILDLOG.md) is the narrative record of how it was built.

---

## Layers

There are two kinds of dataset, because they are two different things.

**Faiths** are mutually exclusive shares of one population, so they contest each other: **Christianity** (blue), **Islam** (red) and **Buddhism** (teal), individually toggleable. Buddhism is off by default.

**Measures** are independent metrics of that same population. A population can be 90% Christian and 90% urban at once, so a measure cannot contest anything and does not compete for hue. It fills the map on its own ramp while the faiths collapse to their frontier lines over it. Measures are a single-select; **Urban population** is the first.

### How contested ground is drawn, and why it changes with three faiths

With **two** faiths visible, a cell renders purple co-presence when both hold at least 2% of its population AND the larger share is within a ratio band of the smaller; outside the band the winner takes full colour, so a 10% / 60% cell reads as the majority rather than as purple. The **Frontier** control picks the band: **Blend** (within 4.5x, the default; al-Andalus, the Sahel, Nigeria stay purple) or **Majority** (within 1.5x, near-parity only), which draws the moving battle lines of religion as crisp lines. Deep link: `?frontier=majority`.

With **three or more**, the blend stops working and is replaced by a diagonal stripe: the leader keeps the cell, the runner-up is striped across it. This is not a stylistic preference. The blue-to-red blend sweeps the entire hue space a third faith would have to occupy, so every candidate third hue measured within a few ΔE of some contested blend under simulated deuteranopia (teal 3.2, magenta 0.9). Desaturating toward a neutral instead fails by a different route: a contested cell never separates from its own pure hue by more than ΔE 4.1 at any parameter. Contest has to leave the hue channel. The blend is valid for a pair and a lie for a trio, so it stays for the pair.

### Colour

Buddhism is teal, not saffron. Saffron is the culturally obvious choice and it is unavailable: under simulated deuteranopia saffron and the Islam red are the same colour. The hue was chosen by scoring the whole hue circle under protanopia and deuteranopia at matched lightness against both existing ramps; teal holds ΔE 21.5 against blue and 23.2 against red, the most balanced survivor. The existing blue and red were checked at the same time and pass on their own (ΔE 51.2 in light theme, 23.6 in dark, worst case 18.4 under protanopia against a floor of 15), so they were left alone.
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
- **Confidence**: figures wash toward a warm neutral in proportion to how much is actually known about them. Three tiers: *conjecture* (no enumeration within centuries; the number carries a direction, not a magnitude), *estimate* (published scholarly reconstruction), *attested* (a census or survey within roughly fifty years). The wash is applied after the hue is chosen, so it never changes which dataset a cell belongs to, only how loudly the map claims it. The tooltip names the tier for every figure. A separate **contested** flag marks quantities that are not measurable even now and do not improve with time. Toggle with the `confidence` checkbox; deep link `?conf=0`.
- **Unmodelled majorities**: faiths are mutually exclusive shares of one population, so whatever is left over is a real majority this model does not carry — Hindus in India, folk religion in China. Switch on `unmodelled` and those regions go neutral while Cairo and Rome keep their colour. Off by default, because blanking half the map should be deliberate. Deep link `?other=1`.
- **Compare two years**: press **Compare from here** to pin the current year, then scrub. The map renders the change rather than the state, on a diverging ramp whose midpoint is transparent so only real movement is drawn — violet for loss, green for gain. AD 600 to 800 is the case it was built for: Christianity loses the Levant, Egypt, Mesopotamia and Iberia while gaining Central Europe, Britain and Scandinavia, and the Islamic expansion and the Carolingian missions sit in one frame. Deep link `?from=600&to=800`.
- **Region inspector**: click any region to open a panel with one sparkline per visible dataset across all nineteen anchor years. The dots are the anchor estimates and the line between them is interpolation, which is the point of drawing both: the map cannot show you where the curated data stops and the model starts, and this can. Each dot carries its year and value on hover. The sparkline's x axis uses the same warp as the timeline, so a position in the chart is the same position on the scrubber, and a cursor tracks the playhead. Click the open region again to close. Deep link: `?region=India`.
- **Pan & zoom**: scroll or pinch to zoom toward the cursor (up to 60x), drag to pan, double-click to zoom in, "Reset view" to snap back. Past 3x zoom the coastline switches from Natural Earth 110m to 50m detail (with lakes), and city labels stay visible instead of fading. The camera is captured in the URL as `?view=lon,lat,zoom`.
- **Resolution refinement**: the heat field is not a fixed grid; each frame it is evaluated analytically on a ~320-cell-wide grid fitted to the viewport, so detail sharpens as you zoom at constant cost. City-scale points narrower than the current cell render with sigma clamped up to the cell size and amplitude scaled down by the area ratio (mass-conserving anti-aliasing), so Dearborn honestly dilutes to a few percent of its 2-degree cell at world view and resolves to a purple city-footprint spot at 50x. The simulation layer stays on its 2-degree grid, sampled bilinearly; fine-zoom detail comes from the historical layer.
- **Full window**: the small button in the lower right of the map expands map + HUD to fill the browser window (Esc exits, `?fs=1` deep-links it). Non-map aspect ratios letterbox rather than stretch, which incidentally reveals Antarctica.
- **Deep links**: every feature has one.

  | Parameter | Meaning |
  |---|---|
  | `year`, `play`, `theme`, `fs` | playhead, autoplay, light/dark, full window |
  | `layers=chr,isl,bud` | visible faiths. The older single-letter form (`c`, `m`, `cm`) still works |
  | `measure=urb` | the measure filling the map, or omit for none |
  | `mode=percap` | per-capita brightness |
  | `frontier=majority` | narrow the contested band |
  | `conf=0` | switch off the confidence wash |
  | `other=1` | grey the unmodelled majorities |
  | `from=600&to=800` | compare two years |
  | `region=Iberia` | open the region inspector |
  | `view=lon,lat,zoom` | camera, written back as you move |
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
| Urban concentration | How tightly heat hugs population centers (render). Nothing to do with the urbanisation dataset; internally `densExp` |
| Decline sensitivity | Response to conquest and suppression eras (sim) |
| History ↔ Simulation | 100% = pure anchor data; 0% = the model runs free |
| Display mode | Population-weighted vs per capita (render) |

Sim-affecting sliders trigger a ~1s background recompute (progress shown on the map).

## Ideas for later

- Historical event overlays (wars, crusades, persecutions) with map annotations
- Denominational split (Catholic / Orthodox / Protestant) after 1054 and 1517
- Export animation as GIF/video
- Fix the pair of known gaps below: Pakistan and Bangladesh, and the Dutch divergence
- Land-mask the analytic render field, so a small region beside a huge one is not diluted by its neighbour's population mass
- Speed up `buildViewField` at high zoom, where a broad gaussian clips to most of the viewport (18.5ms of a 23.6ms frame at 8x)
- Repair the 18 region-anchor cells whose faith shares sum above 1

## Data provenance

### Buddhism

Buddhism is the one dataset here that does not begin at zero. It is roughly five centuries old at the first anchor, already established across the Gangetic plain, Sri Lanka and Gandhara, so the table opens mid-history and the story it tells is mostly retreat. Twenty-one regions carry a curve; the world total lands at 506M in 2026 against Pew's 507M.

Modern anchors rest on census and survey data: Sri Lanka from 1871, India from 1951, Mongolia 2010 and 2020, Nepal 2011 and 2021, Malaysia and Indonesia 2020, South Korea 2015, Vietnam 2019, and Pew's 2020 estimates. Pre-modern anchors are scholarly reconstruction: Johnson and Grim's *World Religion Database*, Barrett's *World Christian Encyclopedia*, Richard Foltz on the Silk Road religions, Johan Elverskog on the Buddhist–Muslim encounter, and regional historiography. Where they disagree we took the middle and widened the caveat rather than narrowing the number.

**"Share of population Buddhist" is not always a well-defined quantity, and in three places it is barely defined at all.** Chinese religion is syncretic by construction: the same household burns incense at a Buddhist temple, honours ancestors under Confucian forms and consults a Daoist almanac, and no survey question puts those in exclusive buckets. Pew's 2010 estimate put China at about 18% Buddhist; its 2020 revision put it at 3.7%; the Chinese Family Panel Studies found roughly a third of adults venerate the Buddha. We model participation in Buddhist institutional and ritual life and hold that definition constant across all nineteen anchors, rather than switching to strict self-identification for the modern ones — which would produce a cliff at 1950 that is an artefact of measurement, not of history. A reader who prefers the strict definition should read the China row down by a factor of about four. Japan is the same problem in reverse: households are temple-affiliated at rates near 70%, a legacy of Tokugawa *danka* registration, while only 37–46% self-identify. Vietnam is the sharpest case in the table — the 2019 census records 4.8% Buddhist, Pew's 2024 survey of the same population finds 38%, an eightfold disagreement about a living country. We use about 45%, which moves Mainland Southeast Asia's 2026 figure anywhere between 0.57 and 0.83; we render 0.72.

**What a knowledgeable reader should challenge.** The Indian peak of about 27% under the Guptas is reconstructed from monastic and epigraphic evidence, not a headcount, and anyone arguing for 15% or 40% can make a case. The Central Asian figures stand in for Gandhara and the Tarim Basin as much as for Transoxiana. Two events the anchor grid cannot show are worth naming because the map cannot: the Khmer Rouge abolition of Cambodian Buddhism in 1975–79 and China's Cultural Revolution both fall entirely between the 1950 and 2000 anchors.

The collapses come free from the decline-pressure model, which reads them out of the anchor drops: Central Asia loses 97.5% between 600 and 1400, the most complete religious erasure in the dataset; India loses 94% between 1000 and 1400 as Nalanda and Vikramashila fall; Mongolia loses 95% between 1900 and 1950 under Choibalsan.

### Urbanisation

The share of each region's population living in settlements of **5,000 or more**. That threshold is a choice, not a standard, and it is the largest single source of error in the dataset. The same England in 1800 is 20.3%, 27.5–29.5% or 33.8% urban depending only on whether the cut is 10,000, 5,000 or 2,500. Acemoglu, Johnson and Robinson's appendix gives Mexico in 1500 as anywhere from 6.5% to 24.6% on the same evidence, purely by method; Indonesia in 1500 spans an eighteenfold range between Bairoch and Chandler. **Any single number here without its threshold attached is fiction**, which is why the legend carries the threshold.

Bairoch's 5,000 is the spine (*Cities and Economic Development*, 1988; Bairoch, Batou & Chèvre 1988). De Vries's *European Urbanization 1500–1800* uses 10,000 and is the best early-modern European data in existence; his territory figures were converted per territory using Bairoch's and Malanima's town-size distributions, not by a uniform factor. Malanima supplies Italy at three thresholds and the only early-medieval Italian figures anywhere. Chandler was used to bound city sizes only, never to set a rate: de Vries called his sources' uncritical use "all but unusable", Bairoch found he omits about 20% of larger and 60% of smaller cities, and over 600 of his 1,741 cities carry a single population value. Post-1950 uses UN *World Urbanization Prospects* 2025.

The result reproduces **46.9% of the world urban in 2000 against the UN's 46.8%**, and 8.9% in 1800 and 15.4% in 1900 against Bairoch's world estimates.

**The modern numbers are softer than they look.** UN figures use each country's own definition, which is not comparable across countries: thresholds run from 200 people in Denmark to 50,000 in Japan, 78 countries use administrative status alone, and 14 declare their entire population urban. Japan reads 92% because *shi* municipalities include their farmland. Egypt has been flat for sixty years because its urban list is an administrative fossil that cannot grow without a decree. Sri Lanka reads 21% because it abolished its Town Councils in 1987 and never reclassified; the UN's own harmonised measure puts it at 85%. Between the 2018 and 2025 revisions Belgium's *1950* figure moved from 91.5% to 62.9%. After 1950, comparing two regions is comparing two statistical offices at least as much as two settlement patterns.

**Where the threshold changes the answer rather than the precision.** Nineteenth-century Yorubaland had towns of 30,000–100,000 whose residents walked out to farm, and so did Andalusia and southern Italy; at 5,000 these read as highly urban. Paul Wheatley's careful conclusion is that Yoruba settlements satisfy every criterion for a city except occupational differentiation — not that they were not towns. Malanima is emphatic that southern Italy's figures are *agro-towns* and should be read at the 10,000 threshold instead.

**Most contested single numbers**: Roman Italy at .32 in AD 33 sits at the top of the credible band and depends on taking the low count for Italy's population, where the scholarly spread is 5.5–6.5M against 13.5–16M. Song China at .20 in 1200 is Zhao Gang's high estimate; Rozman's method gives roughly half. Abbasid Mesopotamia at .30 in 800 rests on a Baghdad population nobody can verify.

**Two corrections made against the first draft.** Italy's 1400 anchor moved from .19 to .14, which is the Black Death trough and the sharpest movement in the series. Mesopotamia's collapse moved three centuries earlier: the Nahrawan canal was breached by Ibn Ra'iq in 937, 321 years before Hulegu, and Abbasid tax receipts in the Lower Diyala fell to between 2.5% and 16% of their 844 level within seventy-five years. Adams found Ilkhanid settlement at 46% of pre-Mongol levels and concluded the Mongol effect was "largely limited to major cities like Baghdad". Blaming 1258 was wrong.

**A share can hide a catastrophe.** The Mongol conquest of China took Inner China from 138.7M to 72.6M, a 48% fall, and Hangzhou from 1.1M to 575,000 — but 24 of about 100 cities over 10,000 fell below the threshold at the same time, so the *rate* stayed near 12% while numerator and denominator collapsed together. Scrub the urbanisation layer across 1200 to 1400 and China barely moves. That is the dataset being honest about what it measures, not the model failing.

### Confidence

Every figure carries a tier, rendered rather than footnoted. The tiers are encoded as two year thresholds per region per dataset — conjecture before the first, attested after the second, estimate between — because confidence moves with era far more than it varies region to region, and authoring nineteen values per region per dataset would be a fiction of its own precision.

A separate **contested** flag marks quantities not measurable even now, which do not improve with time: France bans religious censuses; Russia's census carries no religion question; "Buddhist" is not a well-defined share in China, Japan or Vietnam; and Nigeria's urban series rests on one census, from 1953, against a 20,000-person threshold, with a cancelled census in 2011 and an 8.2-point revision between UN vintages. Any visualisation that renders Nigeria at the same confidence as South Africa is overstating what is known.

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
