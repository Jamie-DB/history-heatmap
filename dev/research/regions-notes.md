# Region split: three findings that need a decision

## 1. The existing "Southeast Asia" p array is ~1.6x too high before 1850
Not rounding. A consistent 0.60-0.69 ratio across eleven anchors (AD 33 to 1800), converging
to correct after 1900. Looks fitted to the modern end and back-extrapolated on a smooth curve.
The replacement reproduces Anthony Reid's series (23M in 1600, 32M in 1800, 82M in 1900)
almost exactly, and McEvedy & Jones at AD 1.

Landing it drops the world tally ~18M in 1800 and ~8M in 1900. That is a correction, not a
regression, but it changes the pop HUD numbers.

Worth spot-checking the other coarse regions: India at 45M for AD 33 and China at 55M both
look low-ish against Maddison, in the opposite direction.

## 2. "Tibet & Himalaya" would recreate the exact smearing bug we are fixing
Nepal is 31M of the region's 35M and 81% Hindu; Tibet and Bhutan are 4.5M and ~75% Buddhist.
Blended, the region renders at 17% Buddhist, which misrepresents Tibet badly. TAKEN: split
into "Tibet & Bhutan" + "Nepal", so seven new regions, not six. Both p arrays sum to the
combined region within rounding at every anchor.

## 3. Pakistan and Bangladesh are missing from the dataset entirely (~430M people, 2026)
`India`'s p is the subcontinent before 1900 and the Republic of India after, with no region
covering the gap, and no weight points west of Delhi or east of Guwahati. A larger honesty
hole than anything these regions fix. OUT OF SCOPE for this work - needs Jamie's call.

## Confidence tiers (attested / estimated / conjecture) for Phase 8
- Mainland SE Asia: attested 33 (Han census AD 2), 1900 (Burma 1901, Siam 1904), 1950+.
  Estimated 1600-1850 (Reid's Siam series, Maddison 1820). Conjecture 100-1500.
- Maritime SE Asia: attested 1900+ (Dutch Java from 1880). Estimated 1800-1850 (Raffles 1815
  under-reported rural by up to 50%). Conjecture 33-1700.
- Philippines: attested 1500 (Newson contact estimate 1.57M), 1600 (905,460), 1800 (Buzeta
  1799), 1900 (1903 US census 7,635,426), 1950+. Best-attested of the set from 1565 on.
- Sri Lanka: attested 1850+ (1871 census 2.4M; 1901 60.06% Buddhist; 2012 70.1%).
  Conjecture 33-1500. The "nearly two million" for Anuradhapura is Mahavamsa chronicle
  material and should not be taken literally.
- Tibet & Bhutan / Nepal: WEAKEST in the set. Attested 1900 (Nepal 1911), 1950 (Tibet 1953:
  1,274,969). Conjecture 33-1700, all of it. The AD 800 imperial bump and the AD 1000
  post-Langdarma dip are storytelling.
- Mongolia: attested 1800 (Qing banner registers ~619,000), 1950 (1956 census 800,000), 2026
  (2020 census 51.7% Buddhist). The AD 1200 ~800,000 is reconstructed from the 95 mingghan of
  1206, not counted. The 1950 value of 0.10 is an interpretative call, not a measurement:
  the 1937-39 purge destroyed the institution but private identification is unmeasurable.

## Vietnam, the single largest uncertainty
2019 state census: 4.8% Buddhist (counts only registered members of recognised organisations,
86% "no religion"). Pew 2024 survey: 38% on self-identification. Reading Mahayana temple
practice and folk religion as one complex: 50-70%. Used ~45%. That one decision moves Mainland
SE Asia's 2026 Buddhist share between 0.57 and 0.83; rendered at 0.72.
