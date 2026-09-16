# Urbanisation: validation, caveats, and one structural gap

## Validation (strongest single check)
Population-weighted against the file's own `p` arrays the table gives a world urban share of
8.9% (1800), 10.0% (1850), 15.4% (1900), 27.6% (1950), **46.9% (2000) vs UN 46.8%**, 59.2%
(2026). The 1800-1900 figures sit on Bairoch's world estimates (~9%, ~10%, ~16%).

## The threshold problem is the largest source of error
Bairoch uses 5,000 (the spine here), de Vries uses 10,000, the UN uses each country's OWN
definition. Converting de Vries to a 5,000 basis multiplies his rates by ~1.5-1.8 in
pre-industrial Europe. Applied per territory using Bairoch/Malanima town-size distributions,
not uniformly. This is the assumption most likely to be wrong.

Chandler was used only to BOUND city sizes, never to set a rate: several of its famous numbers
(Cordoba 450k, Baghdad 1M) are rejected by current scholarship.

## Where the threshold changes the answer, not the precision
- West Africa, southern Iberia, southern Italy: 19th-c Yorubaland had towns of 30-100k
  (Ibadan, Abeokuta, Ilorin) whose residents walked out to farm. So did Andalusia and Apulia.
  At 5,000 these read as highly urban; functionally they are farming villages at scale.
- Angkor/Pagan: LiDAR implies several hundred thousand across a dispersed hydraulic landscape.
  Mainland SE Asia's 1200 figure would roughly triple on the generous reading.
- India 1600 rests on Habib/Moosvi's ~15%; published range is 9-15%. India's near-flat
  two-millennium line is the least-tested claim in the table.

## The modern numbers are softer than they look
UN WUP 2025 national definitions. Thresholds run from 200 people (Denmark) to 50,000 (Japan);
78 countries use administrative status alone; 14 declare their entire population urban; 2 have
no definition. Japan reads 92% because *shi* municipalities include their farmland. Sri Lanka
reads 21% because it abolished Town Councils in 1987 and never reclassified. Egypt is flat for
sixty years because its urban list is an administrative fossil. Uzbekistan jumped 15 points in
2009 on reclassification. The UN's own DEGURBA puts Sri Lanka at 85% against its official 21%.
Between the 2018 and 2025 revisions Belgium's **1950** figure moved 91.5% -> 62.9% and Japan's
53.4% -> 37.0%. After 1950 any comparison between regions is a comparison of statistical
offices at least as much as of settlement.

## Two deliberate departures from the UN series
- Nepal's official 67% is a backcast of its 2014-17 municipal restructuring and would put a
  Himalayan region above France. Set to .42 for 2026.
- Sri Lanka's official series FALLS 15.3% (1950) -> 14.6% (2000). Held flat rather than
  rendering a definitional artefact as history.

## Most contested single numbers
Song China .20 at 1200 (Zhao Gang's high estimate; Rozman's method gives about half).
Roman Italy .32 at AD 33 (depends entirely on Beloch's low vs the high count for Italy).
Mesoamerica 1500 (denominator swings fourfold between Rosenblat and Borah-Cook).
Abbasid Mesopotamia .30 at 800 (rests on a Baghdad population nobody can verify).

## Five moments worth scrubbing to (for README / BUILDLOG)
1. AD 100 -> 800, Italy .33 -> .06. Rome fell from ~1M to perhaps 25,000. Italy did not regain
   its Roman urban share until the 20th century. The whole western Mediterranean goes dark.
2. AD 800-1200 the Islamic world holds every top slot. At 800 the six most urban regions are
   Mesopotamia (.30), Levant, Egypt, Persia, Central Asia, China. France .04, Central Europe
   .02: Abbasid Iraq running ~7x Carolingian Europe. Western Europe does not enter the top six
   at any anchor until 1800.
3. 1200 -> 1400 the Mongol century. Four regions collapse at the same two anchors for the same
   reason: Central Asia .20->.08, Mesopotamia .18->.09, China .20->.10, Rus .05->.03.
   Mesopotamia and Central Asia do not recover until the oil age. Baghdad's sack in 1258 took
   the Nahrawan irrigation system with it. Sharpest synchronised fall, and the only permanent one.
4. 1200 -> 1850 China de-urbanises .20 -> .06 across six centuries, the only major region that
   runs downhill through the early modern period. Then .06 -> .66 in the following 175 years.
5. 1800 -> 1900 the lead changes hands. Britain .25 -> .67 in two anchors. By 1900 Mesopotamia,
   Egypt and the Maghreb, the world leaders in AD 800, are dimmer than Poland. Then 1950 ->
   2026 sub-Saharan Africa: East Africa .04->.34, Central Africa .15->.52, West Africa
   .11->.60. Three doublings in one lifetime with no industrial revolution attached.

## Structural gap: the Dutch divergence is invisible
The Netherlands sits inside `Central Europe`, where a German-dominated aggregate averages it
away: the region reads .12 in 1600 while the Dutch Republic was ~34% (de Vries, 10k threshold)
and Holland province alone above 60%, the highest pre-industrial urbanisation anywhere. The
English half shows fine because Britain is its own region. Cheapest fix that matches the file's
existing pattern: a tight-sigma city overlay, pts:[[4.9,52.2,1,1550,.08]].
