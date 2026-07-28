# E002 — Orchestrator

> **What/why:** [PLAN.md](PLAN.md) · **Program map:** [../../ROADMAP.md](../../ROADMAP.md)
> **Infra sister:** [E001](../E001-2026-07-15-site-rebuild/ORCHESTRATOR.md)

Sequence and dependencies for the content system + article v0.2. Ten tasks, three waves.
High-level on purpose (owner: *"jeszcze nie szczegółowo"*) — each task file states goal +
acceptance, not a line-by-line recipe.

## Cross-epic coordination

- **E001-T08** moves the funnel to `/lp` and inverts `noindex`. **E002-T07** puts the report at `/`.
  These are the two halves of one swap — land them together or the home route conflicts.
- **E001-T11 / T12** (drop `legacy-source`, cutover) depend on **E002 content being live**. E002
  Wave 3 must finish before E001 Wave 3.
- No shared files with E001 Wave 1/2 — E002 can start as soon as the merge (E001-T02) lands.

## Wave 1 — content pipeline (foundation, mostly parallel)

| Task | Title | Depends on |
|---|---|---|
| [T01](tasks/E002-T01.md) | Install + wire `@astrojs/mdx` and `@tailwindcss/typography` | E001-T02 merged |
| [T02](tasks/E002-T02.md) | Write `design.md` — the report design language + restraint guardrail | — |
| [T03](tasks/E002-T03.md) | Add the `updates` content collection (Zod, `z.coerce.date()`) | T01 |
| [T04](tasks/E002-T04.md) | Re-theme the orphaned `ui/` primitives against real tokens | T02 |

## Wave 2 — components + the article

| Task | Title | Depends on |
|---|---|---|
| [T05](tasks/E002-T05.md) | `DecisionRecord` component (the Decision-1→Decision-2 device) | T04 |
| [T06](tasks/E002-T06.md) | Versioned status header (`stats.ts`, version, statusDate) | T04 |
| [T07](tasks/E002-T07.md) | Report homepage at `/` | T03, T05, T06 · pairs with **E001-T08** |
| [T08](tasks/E002-T08.md) | **Write article v0.2** (the sharpened thesis) | T03, T05 |

## Wave 3 — standing pages + wiring

| Task | Title | Depends on |
|---|---|---|
| [T09](tasks/E002-T09.md) | Standing pages `/about`, `/hardware`, `/licensing`, `/roadmap` | T04 |
| [T10](tasks/E002-T10.md) | Nav, footer, RSS, `/versions` index | T07, T08, T09 |

**Gate before "done":** `astro build` exits 0, internal links resolve, a11y pass on `/` + article
+ `/hardware`, and the owner's five editorial questions answered on the v0.2 draft.
