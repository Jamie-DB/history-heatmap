# Buddhism dataset: findings to act on

## Pre-existing data bug, independent of Buddhism
`s + si > 1.0` in 18 cells of the SHIPPED data. Phase 4's validator will fire on these.

| Region | Anchors | s+si | Diagnosis |
|---|---|---|---|
| Caucasus | 1000-1900 (9 anchors) | 1.03-1.07 | `s` flat at .85-.88 while `si` rises to .22. Azerbaijan is in this region and is overwhelmingly Muslim; `s` should fall to ~.78 from 1400. |
| Rus & Russia | 1400-1900 (7 anchors) | 1.01-1.06 | `s` pinned at .92 with `si` .11-.15 leaves no room for Tatar/Bashkir Muslims plus Finno-Ugric and Siberian animists. `s` ~.84 fits. |
| Iberia | 1200, 1400 | 1.05 | Reconquista years; `s` and `si` each authored against the whole peninsula rather than partitioning it. |

Fix belongs in `s`, not in the new datasets.

## Constraint for the new regions (Phase 5)
Maritime Southeast Asia @2026 has NO slack. Honest decomposition: Muslim .845, Christian .103,
Buddhist .025, Hindu .022 = .995. Use `si = .845`, NOT .87 (Indonesia alone). Rounding up
breaches 1.0 and squeezes out Bali's Hindus.

Max `s + si` headroom my `sb` leaves the other new regions:
| Region | 1500 | 1700 | 1900 | 2026 |
|---|---|---|---|---|
| Mainland SE Asia | .22 | .22 | .27 | .32 |
| Sri Lanka | .22 | .30 | .40 | .30 |
| Tibet & Himalaya | .35 | .30 | .31 | .53 |
| Maritime SE Asia | .96 | .995 | .99 | .975 |
| Mongolia | .95 | .10 | .05 | .50 |

## Decline curves the pressure model will read
Mongolia 1900->1950 -95% (Choibalsan) | India 1200->1400 -83%, 1000->1400 -94% cumulative
(Nalanda, Vikramashila) | Central Asia 600->1400 -97.5% cumulative (most complete erasure in
the table) | Maritime SE Asia 1200->1600 -94% (Islamisation) | Tibet 800->1000 -51%
(Langdarma) | China 800->1000 -43% (Huichang 845)

## Confidence tiers (for Phase 8): attestedFrom per region
India 1900 | Central Asia never | China 2000 (contested, all anchors) | Korea & Japan 1900
(contested 1700+) | Mongolia 2000 | Tibet & Himalaya 2000 (contested 2000+) | Sri Lanka 1850 |
Mainland SE Asia 1900 (contested, Vietnam 1950+) | Maritime SE Asia 1900 | Philippines 1950 |
Rus & Russia 2000 (contested 2000+, no census religion question) | France never (contested
1950+, religious censuses prohibited) | Western diaspora regions 2000 | Persia never

## Open judgement calls the agent flagged
- Vietnam: 2019 census says 4.8% Buddhist, Pew 2024 says 38%. Eightfold disagreement about a
  living country. Largest single uncertainty in the table.
- China: Pew 2010 said 18%, Pew 2020 said 3.7%, CFPS found ~1/3 venerate. Table models
  participation in Buddhist institutional and ritual life, held constant across all anchors
  rather than switching definitions at 1950 (which would create a measurement artefact cliff).
- Japan: ~70% temple-affiliated (Tokugawa danka legacy), 37-46% self-identify. Buddhist and
  Shinto shares both approach 1.0 and sum to ~2.0.
- Persia row is a tiny conjecture (Kartir's 3rd-c inscription lists shaman among suppressed
  groups). Droppable.
- Central Asia 1700 bump is the Gelug Dzungars, erased by the Qing 1755-58. Thinnest number.
