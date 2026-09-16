# European urbanisation: cross-check against URBAN_SHARES, and one correction to make

## The design implication that matters most
"Threshold drift dominates scholarly disagreement. England in 1800 is 20.3%, 27.5-29.5%, or
33.8% depending purely on whether the cut is 10,000, 5,000 or 2,500. **If the UI shows one
number per year, the threshold has to travel with it.**"
-> ACTION: the urbanisation legend and tooltip must state "settlements of 5,000+".

## Correction to make when landing URBAN_SHARES
**Italy 1400 should be ~.14, not .19.** Malanima 1998 Table 6, Italy at 5,000+:
1300=20.6, **1400=13.9**, 1500=21.9, 1600=23.6, 1700=22.3, 1800=26.6.
The 1400 trough is the Black Death and it is a signature scrub moment; my table smooths it away.

## Cross-checks that PASS
- Britain & Ireland 1800 = .25 in my table. Wrigley has ENGLAND at 27.5-29.5% (5,000+) but
  Ireland was 7.0% (10,000+, de Vries), so the combined region sitting below England is right.
- France 1700 = .14 vs de Vries 9.2% at 10,000+ -> ~12.9% at 5,000+. Slightly high, acceptable.
- Italy 1600/1700/1800 (.22/.21/.22) against Malanima (23.6/22.3/26.6). Good.

## Reference series worth keeping
**de Vries 1984, Europe, 10,000+:** 1500=5.6, 1600=7.6, 1700=9.2, 1800=10.0, 1850=16.7, 1890=29.0
**de Vries, Europe, 5,000+:** 1500=9.7, 1600=10.8, 1700=11.9, 1800=13.0
**Bairoch 1988 Table 8.2, Europe, 5,000+:** 1000=9.65, 1300=10.47, 1500=10.74, 1600=11.47, 1700=12.31
WARNING: three different Bairoch series at 5,000+ disagree by up to 2 points (1700 is 12.31 in
one table and 11.4 in another). Cite the page.

**Malanima, Centre-North Italy 5,000+, the only early-medieval Italian figure anywhere:**
1000 and 1100 = 5-12% (indirect), 1200 = 12, 1250 = 15, 1300 = 21.4, 1350 = 17.7, 1400 = 17.6.
Italy overall ~10-11.5% in 1000.

**Netherlands peaks by threshold** (the peak DATE moves with the threshold):
10,000+ peaks 1700 at 33.6% | 5,000+ peaks 1700 at 33.9% | 2,500+ peaks 1675 at 42% |
Holland province 2,500+ peaks 1675 at **61%** | city-rights definition peaks 1700 at 46.4%
Belgium at 10,000+ was **21.1% in 1500, the most urbanised territory in de Vries's dataset**,
against a European mean of 5.6%.

## Roman Italy: the figures are not comparable because the disagreement is definitional
- Hopkins 1978: 32% is a **non-agricultural EMPLOYMENT share, not residence**. "Hopkins says
  Roman Italy was 30% urban" is a misreading present even in the specialist literature
  (Malanima repeats it).
- Morley 1996: ~40% incl. Rome on legal urban status. Scheidel declines to give a figure at all
  ("10, 20, 30 per cent?"). Malanima: "as high as 15 per cent, and even 20 per cent or more".
- Underneath it all is the low-count vs high-count fork on Italy's total population: 5.5-6.5m
  vs 13.5-16m, a 2.5x spread that propagates into every derived rate.
- **My table has Italy at .32 for AD 33.** That sits at the top of the credible band and
  depends on taking the low count. Flag it in the README as the most contested number.

## Rome's collapse, well sourced (the signature scrub)
to AD 300 ~1,000,000 | 400: 750-800,000 | 450: 450-500,000 | 500: 80-100,000 |
after the 537 siege: 30,000 | 600: 50,000 (Wickham, Medieval Rome 2015, p.112) |
800: 50,000 | 900: 20-30,000 | 1000: 35,000 | 1300: 40-50,000 | 1350: 15-17,000
Cite Wickham's *Medieval Rome* (2015), NOT *Framing the Early Middle Ages*.
In AD 800 Bairoch records **only 36 European cities above 2,000**.

## Threshold conversion, empirical (no Bairoch rule exists)
Within-source ratios, 5,000+ divided by 10,000+: de Vries Europe 1.73 (1500) falling to 1.30
(1800); Malanima Italy mean 1.45. Working rule: at 5,000+ a pre-modern European rate runs
~1.3-1.5x the 10,000+ rate, ~1.75x for 1500 and earlier, converging to 1.1-1.3x by 1850.
**Do not convert across scholars** - different denominators and territorial definitions.

## Sources to avoid
- Clio Infra "Urbanization Ratio" (Fink-Jensen 2015): threshold undocumented, values
  irreconcilable with every series above (UK 1850 = 30.3% vs Wrigley's 43.5%).
- sociostudies.org / Zinkina et al. Table 1: reproduces de Vries's 10,000+ figures under a
  5,000+ heading.
- An "18%" for Roman Italy circulating in AI search summaries, attributed to Wilson 2011, is
  unsubstantiated. Do not use it.
