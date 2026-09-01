# Case-Study Candidates: christianity-heatmap

*Sources: the build transcript survives (~/.claude/projects/-Users-jamie-Dev-ai-projects/5a98ac64-8940-433d-8007-77351e9f3089.jsonl, also archived Sep 1), plus 18 issues and 20 commits. Quotes are verbatim. Public framing rules apply to anything excerpted: present the project as a population-dynamics visualization engine whose current dataset is the first lens, and state the unaudited-data caveat plainly.*

## "That's not correct. The county maybe."
Date: Aug 1, 2026 | Evidence: transcript line 751, issue #2, commit 1128b78 | Type: caught a wrong data assumption
Situation: The model had Dearborn, Michigan rendering at roughly 3 percent Muslim.
Moment: "Side question: You're saying dearborn is only 3% muslim? that's not correct. The county maybe." A domain-knowledge eyeball catch: the number described Wayne County, not the city. Instead of a one-cell patch, the fix became a design change: city-scale overlay regions at true footprints with sourced shares (Pew, UK 2021 census) and a documented note on why French figures are softer (France bans religious censuses).
Result: The correction loop that justifies calling the rest of the dataset unaudited: when a number failed the eyeball test, it got audited, sourced, and fixed. Pairs directly with the readiness credo.

## "Honest disparity in blend mode"
Date: Jul 31 to Aug 3, 2026 | Evidence: issues #1 and #8, commits abad0ba and d869c50, README co-presence rule | Type: iterated to a quality bar
Situation: Two overlapping heat layers need a rule for cells where both populations exist.
Moment: The naive blend renders any overlap as purple, which visually equates a 10/60 split with parity. The shipped rule refuses that lie: purple appears only when the larger share is within a ratio band of the smaller, and the band itself became a user control with two honest modes (Blend at 4.5x for cultural co-presence, Majority at 1.5x rendering the moving battle lines as crisp fronts).
Result: A rendering decision that treats truthfulness as a spec requirement. The issue title is the artifact: "honest disparity in blend mode."

## Three visualizations, one engine
Date: Aug 3, 2026 | Evidence: transcript line 1531, issues #12 and #14-#18, commits d187065 through d9dda8e | Type: architecture decision
Situation: The biblical narrative idea (journeys, churches, Pentecost) could have been bolted onto the existing map as more overlays.
Moment: "I want to phase the large parts... These function almost as secondary and tertiary visualizations that happen to share a map, a timeline, and a little more." The insight is separation: World demographics, Apostolic Age, and Old Testament became mutually exclusive modes sharing camera, map, and timeline infrastructure, with a common journey-rendering engine underneath, scoped as an epic and shipped as five ordered phases the same evening.
Result: The church history overlay in the main mode draws with the same engine as Paul's journeys, deliberately, and the mode framework is what makes future dataset lenses (other population types) a swap rather than a rewrite.

## The city that bursts into its new name
Date: Aug 3, 2026 | Evidence: transcript line 1188, issue #10, commit 27a3a3c | Type: creative direction, executed
Situation: Cities appeared at their moment of significance but never fell, flipped, or died.
Moment: The direction came fully formed: "maybe we can also remove cities as they fail and get replaced or renamed. when that happens give the city name visual feedback, like turning red, getting bigger, and bursting into the [new name]." Plus the constraint that makes it engineering rather than animation: every lifecycle event is a pure function of the playhead year, so scrubbing backward replays conquests in reverse with zero extra state.
Result: Byzantium's heir becomes Istanbul in 1453, failed sieges flash and revert, Rome gets sacked four times and never disappears. The feature most viewers remember, specified in two sentences.

## A sandbox with an exit ramp
Date: Jul 29, 2026 | Evidence: transcript line 5, PROJECTS.md status vocabulary | Type: cut scope deliberately, systematized
Situation: The first message of the ai_projects monorepo, before the heatmap existed.
Moment: The sandbox was designed for "small toy projects and one-shot ideas," with a status vocabulary that includes both "parked" and "promoted." Toys are allowed to stay toys, and the path out (promoted) is explicit rather than aspirational.
Result: The heatmap sits at "playable," honestly labeled, with its data caveat attached, while the engine inside it carries a real generalization plan. The filing system is the judgment.
