# Pakistan + Bangladesh regions — CRITICAL companion fix included

## The catch that was not in the brief
**`India.si` must be rebased or India renders twice as Muslim as it is.** It currently runs
.24 -> .32 at modern anchors, which is the UNDIVIDED SUBCONTINENT's Muslim share (~31%).
The Republic of India is 14.2% Muslim.
```js
"India":  [0,0,0,0,0,0,.002,.004,.015,.04,.05,.07,.085,.1,.11,.128,.1,.131,.152],
```
Anchored on 1901 = 12.8% on Republic territory, 1951 Census = 9.91%, 2001 = 13.4%, 2011 = 14.2%.
Renders Eaton's central finding for free: the imperial heartland barely converts under six
centuries of Muslim rule while the two frontiers convert wholesale.

## Region literals
```js
{n:"Pakistan", pts:[[74.3,31.6,1,0,1.6],[67,24.9,.7,0,1.6],[71.5,30.2,.6,0,1.6],[71.6,34,.45,0,1.6],[68.9,27.7,.25,0,1.6]],
 s:[0,.0003,.0008,.001,.001,.0008,.0005,.0003,.0002,.0001,.0001,.0002,.0003,.0005,.001,.003,.013,.016,.014],
 si:[0,0,0,0,0,0,.08,.15,.3,.5,.6,.68,.72,.75,.75,.77,.97,.96,.96],
 p:[4.6,5.2,5.8,6.2,6.4,6.8,6.9,7,7.3,7.8,8,8.2,8.8,10.5,12.5,16.5,37,150,258]},
{n:"Bangladesh", pts:[[90.4,23.8,1,0,1],[91.8,22.4,.6,0,1],[89.1,24.9,.55,0,1],[89.5,22.8,.4,0,1]],
 s:[0,0,0,0,0,0,0,0,0,0,0,.001,.002,.002,.002,.002,.003,.003,.003],
 si:[0,0,0,0,0,0,.001,.002,.02,.08,.12,.25,.45,.58,.62,.66,.77,.89,.91],
 p:[1.5,1.8,2,2.3,2.8,3.4,4,4.6,5.6,6.8,8,9.3,11.5,16.5,21.5,28.9,38,129,177]},
```
BUDDHIST_SHARES:
"Pakistan":   [.18,.25,.3,.28,.22,.14,.06,.015,.003,.001,0,0,0,0,0,0,0,0,0],
"Bangladesh": [.08,.1,.14,.18,.22,.28,.35,.35,.18,.05,.02,.01,.008,.007,.007,.006,.007,.007,.006],
URBAN_SHARES:
"Pakistan":   [.1,.11,.12,.12,.12,.1,.1,.12,.14,.12,.13,.15,.13,.09,.09,.105,.18,.33,.39],
"Bangladesh": [.02,.02,.03,.03,.04,.04,.05,.05,.05,.06,.07,.07,.1,.05,.035,.024,.043,.24,.4],

## Revised India.p — Republic territory at EVERY anchor
```js
 p:[37,41,45,49,54,58,61,65,73,82,91,99,116,148,181,238,357,1050,1450]},
```
Subcontinent totals preserved 33-1850 and split by territory. Only two anchors move, both onto
attested ground: 1900 270 -> 284 (1901 Census of India was 283.9M excluding Burma; the India
split of 238 reproduces the standard Republic-territory series of 238,396,327 to 3 s.f.), and
1950 375 -> 432 (UN WPP: India 357.0 + Pakistan 37.5 + Bangladesh 37.9). 2000 and 2026 untouched.

## The two curves are deliberately opposite, and that contrast is the payoff
- **Pakistan**: Buddhist peak at AD 200 (Gandhara under the Kushans), HIGHER and two centuries
  EARLIER than India's. Muslim from 711, already 8% at the 800 anchor when India is at 0.2% --
  Sindh is Muslim four centuries before anywhere else in South Asia. Step .77 -> .97 across 1947.
- **Bangladesh**: Buddhist peak at 800-1000 (the Palas), AFTER India's has collapsed. The only
  region where Buddhism is still rising at 800. Muslim near zero in 1200 DESPITE the 1204
  conquest, then .12 -> .58 between 1500 and 1800. That is Eaton: Islam arrived with the plough
  during Mughal frontier settlement, not with Bakhtiyar Khalji's cavalry. Urbanisation FALLS
  .10 -> .024 from 1700 to 1900 as Dhaka collapses from ~450,000 to ~20,000.

## Confidence
CONF.chr: Pakistan [1800,1900], Bangladesh [1500,1900]
CONF.isl: Pakistan [900,1900],  Bangladesh [1500,1900]
CONF.bud: Pakistan [400,1900],  Bangladesh [1200,1900]
CONF.urb: Pakistan [1500,1900], Bangladesh [1600,1900]
CONTESTED.urb: Pakistan 1950, Bangladesh 1950
Bangladesh isl is conjecture through 1200 and 1400 deliberately -- Eaton's book exists because
nobody counted. A greyed-out Buddhist Bengal is the honest image; a confident one is fiction.

## Pre-1947 convention
"Pakistan" = the Indus valley (Sindh, Punjab west of the line, Peshawar valley, Balochistan).
"Bangladesh" = the eastern Bengal delta ONLY, so Kolkata, Murshidabad and Gaur stay with India.
Partition is carried in the data, not smoothed: West Pakistan 77% -> 97% Muslim 1941-51, India
13% -> 9.9%, East Bengal 70% -> 77%, because partition moved ~14 million people in 18 months.
The 1900 and 1950 anchors straddle it, so a step change ramps across fifty years.

## Challenge list
Subcontinent total at 1600 is 116M here against Moosvi's 145M. The Pala-era Bengali Buddhist
share of 35% reads royal patronage as popular affiliation; 15% is as defensible. Bangladesh's
1950 population spans 17% across three sources (37.9M WPP, 41.9M 1951 census, 44.2M adjusted).
