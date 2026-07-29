# CLAUDE.md (ai_projects sandbox)

> Self-learning context file for this sandbox. Inherits everything in `/Users/jamie/Dev/CLAUDE.md`; rules there stay authoritative. This file only adds sandbox-specific context and rules.

## Purpose

A sandbox of small, independent toy projects and one-shot ideas: visualizations, animations, experiments, and full (but small) software. Projects here are built fast, played with, and either abandoned or promoted.

## Structure & Conventions

- One toy per kebab-case subfolder (e.g. `christianity-heatmap/`). Each toy gets its own `README.md` explaining what it is and how to run it.
- Register every new toy in `PROJECTS.md` (one line: name, status, description). Update status when a toy changes state.
- Prefer single-file, zero-build artifacts (one HTML file, one script) unless a toy clearly outgrows that. No frameworks or build tooling by default.
- Self-contained by default: no network requests at runtime, assets embedded, works offline.
- One git repo at this root; commit per toy at natural checkpoints. A toy that grows up gets extracted to its own repo and marked `promoted` in `PROJECTS.md`.
- Data-driven toys document their data sources and modeling assumptions in the toy's `README.md`.

## Statuses

`idea` | `active` | `playable` | `parked` | `promoted`

## Learned Rules

When Jamie corrects an approach or states a preference specific to this sandbox, immediately append a numbered rule here. Format: `N. [CATEGORY] Never/Always do X, because Y.` Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`. Newer rules win conflicts; never delete, supersede instead. General rules (not sandbox-specific) go to `/Users/jamie/Dev/CLAUDE.md` instead.

1. [PROCESS] Always clarify vague ideas with targeted questions before creating artifacts, because Jamie wants to hone in on the idea first and only build once clarity is achieved.
