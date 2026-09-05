# CLAUDE.md (history-heatmap)

> Self-learning context file for this project. Inherits the machine-wide rules in the user's global `CLAUDE.md`; those stay authoritative. This file only adds project-specific context and rules.

## Purpose

An engine for rendering how populations move and change across the world over time: a scrubbable map where historical anchor data blends with a growth-and-diffusion simulation. The first dataset is Christian and Muslim population share, AD 33 to 2026. Other population types (cultures, movements, migrations) are intended to be swappable datasets, not rewrites.

## Structure & Conventions

- **One file.** Everything ships in `index.html`: markup, styles, data, engine. No build step, no bundler, no dependencies, no frameworks.
- **Self-contained.** No network requests at runtime. Coastlines, land masks, and all historical data are embedded. It must work offline from a `file://` URL.
- **Zero install.** "Open `index.html` in a browser" is the whole setup, and stays that way.
- Every user-facing feature gets a deep-link parameter so a view can be shared as a URL.
- Animations are pure functions of the playhead year, so scrubbing backwards replays history in reverse for free. Keep it that way; no stateful animation accumulators.

## Data conventions

- Historical figures are order-of-magnitude estimates, not scholarship. Say so in the README, say so in-app, and never let a number imply more precision than it has.
- Every dataset addition documents its source and its modeling assumptions in `README.md`.
- Where a number is genuinely unknowable (France bans religious censuses, Old Testament dating is contested), state the uncertainty in the UI rather than picking a figure silently.
- Render provenance rather than footnoting it: attested, historical, and traditional sources are visually distinguishable, and the weakest tier can be toggled off.

## Work log

`BUILDLOG.md` is the narrative record of how this was built. Append to it at real milestones; it is not a changelog and should not list every commit.

## Learned Rules

When Jamie corrects an approach or states a preference specific to this project, immediately append a numbered rule here. Format: `N. [CATEGORY] Never/Always do X, because Y.` Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`. Newer rules win conflicts; never delete, supersede instead. General rules (not project-specific) go to the global `CLAUDE.md` instead.

1. [PROCESS] Always clarify vague ideas with targeted questions before creating artifacts, because Jamie wants to hone in on the idea first and only build once clarity is achieved.
