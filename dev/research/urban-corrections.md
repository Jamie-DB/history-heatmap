# Corrections to make to URBAN_SHARES before it lands

## 1. Mesopotamia: the collapse predates the Mongols by THREE CENTURIES
My table drops Mesopotamia .18 (1200) -> .09 (1400), i.e. it blames 1258. Three independent
evidence streams say the collapse began in the late 9th / early 10th century:
- **Allen & Heldring, Cliometrica 16 (2022)**, from tax data for 27 districts in 812, 846 and
  918: "In the late ninth century, rural settlement, agriculture, and urbanization all
  collapsed in southern Mesopotamia." Cause: collapse of state capacity.
- Abbasid tax receipts, Lower Diyala, 918-19 as a share of 844: Baduraya **2.5%**, Radhanayn
  11%, Buzurjasabur 16%. Seventy to ninety percent of the tax base gone within 75 years.
- **The Nahrawan canal was breached by Ibn Ra'iq in 937 -- 321 years before 1258.**
- **Adams, Land Behind Baghdad (1965)**: "the entire Nahrawan region below 'Aberta went out of
  cultivation a century or more before Hulagu"; Ilkhanid settlement was 46% of pre-Mongol,
  "far less devastating than the putative massacre... would suggest"; Mongol effects "largely
  limited to major cities like Baghdad."
- Adams's settlement-area series, Lower Diyala: Sasanian 3,489 ha -> Early Islamic 2,198 ->
  Late Abbasid 937 -> **Ilkhanid 190 ha (5% of Sasanian)**.
- On 1258 itself: Hulegu's own estimate was ~200,000 dead. Michal Biran: large libraries
  reopened within two years, "Baghdad prospered under Hulegu's Ilkhanate"; it was **Timur
  (1393, 1401) and the Ottomans (1534)** that marginalised the city.

**ACTION: shift Mesopotamia's fall earlier.** Roughly .30 (800) -> .22 (1000) -> .15 (1200) ->
.09 (1400), rather than holding .25 at 1000 and .18 at 1200.

## 2. Italy 1400 should be ~.14, not .19 (Black Death trough, Malanima 1998 Table 6)

## 3. The Mongol conquest of China is invisible as a RATE
Inner China 138.72m (1205) -> 72.60m (1291), a 48% fall. Hangzhou 1.1m -> 575,000. But 24 of
~100 cities over 10,000 fell below the threshold, so the RATE stayed near 12% while numerator
and denominator collapsed together. A heatmap animating the rate alone shows nothing happening.
Worth a README note: this dataset is a share, and a share can hide a catastrophe.

## 4. Japan's castle-town boom is a STEP, not a ramp
6.4% (1600) -> 13.6% (1650) -> flat for two centuries (Bassino/Broadberry/Fukao/Gupta/
Takashima, EEH 72 2019, at 10,000+). Any smooth 1600-1800 interpolation is wrong. My anchors
are 1600 and 1700, so the step lands roughly right, but say so in the README.
Also: at 10,000+ Japan DE-urbanises after 1750; at 2,500+ it does the opposite (Saito 2018:
decadal growth 1750-1873 was -3% for 50,000+, +10% for 2,500-10,000).

## 5. India's trough is around 1871-81, and the share RISES after
A single smooth 1600 -> 1900 decline would be wrong. Broadberry/Custodis/Gupta (EEH 55, 2015)
at 5,000+: 15% (1600), 14 (1700), 13 (1801), 11 (1851), 8.7 (1871). Census 1881 ~9.1%.
Only three years are observed; everything else is interpolated.
Habib's 15% is at **5,000+** and nobody reaches says it is too high -- the objection is
comparability, not level. Modern India's official 31% is an INTERSECTION of three tests
(5,000+ AND 75% male non-agricultural AND 400/km2), not a size cut, and is not comparable with
any foreign threshold figure. On population alone India is 50% urban (2011); on France's
2,500 cut, ~66%; on the UK's 10,000, ~33%.

## 6. Southeast Asia: what Reid actually claimed
Verbatim (Age of Commerce vol 2, p.75): "more than a million people in cities of more than
30,000 population around the middle of the seventeenth century. **About 5 percent** of the
total Southeast Asian population... a proportion larger than contemporary northern Europe,
**though probably not as great as Mughal India or China**."
So: threshold 30,000+, mid-17th century, ~5%, comparator NORTHERN Europe only, and Reid
concedes India and China were probably more urban. The popular "more urban than Europe" is a
compression. Note his denominator rests on McEvedy & Jones, which Guinnane (JEH 2023) calls
"little more than guesses" -- so the rate is not an independent cross-check on either number.

## 7. The honest error bar, for the README
AJR (2002) Appendix 3, **India in 1500**: Bairoch 9.0%, Eggimann (20,000+) 2.9%, Chandler 1.8%,
Davis-Zipf-adjusted 5.8%, AJR base 8.5%. **Indonesia in 1500**: Bairoch 9.0% vs Chandler 0.5%
-- an **18x spread**. Any single number rendered without a band is fiction.

## 8. Do not use Clio-Infra "Urbanization Ratio" (Fink-Jensen 2015)
Threshold-inconsistent by its own metadata: 5,000+ in 1850 but 100,000+ in 2000, while its
Chinese data uses 2,000+. Gives France 12.7% in 1600 against de Vries's 5.9%. Indonesia absent.

## 9. Baghdad: the dispute is about AREA, not density
Kennedy (Iraq 73, 2011): built area ~7,000 ha, "at least 500,000 and it may well have been
more". Morris's density objection to Chandler's 900,000 only bites if you assume a small area:
on Lassner's 7,000 ha, 900,000 is 129 persons/ha, comfortably under the ~200/ha preindustrial
ceiling. Chandler is separately unreliable -- de Vries called his sources' "completely
uncritical use... all but unusable"; Bairoch found he omits ~20% of larger and ~60% of smaller
cities; over 600 of his 1,741 cities have ONE population value.
