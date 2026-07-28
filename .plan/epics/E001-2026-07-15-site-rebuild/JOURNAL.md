# E001 — Journal

Live findings + session summaries. See [live-logging] rhythm: findings real-time, summary at `done.`.

## Session 2026-07-28 — epic formalized

- **Goal:** turn the approved-but-unwritten E001 plan into a proper epic file set, and
  capture the owner's refined article framing.
- **Done:** `PLAN.md`, `ORCHESTRATOR.md`, `IMPRO.md`, `JOURNAL.md`, `tasks/E001-T01..T21`,
  `reports/README.md`; linked from `.plan/BACKLOG.md`.
- **Decisions:**
  - Article language: **English** (owner).
  - Article framing narrowed: it is about *conclusions + next steps*, **not** about building an
    un-copyable moat. The May "protocol/standard is the real product" + data-monetization angle
    is deliberately excluded — shown only as the position the owner moved away from.
  - New reality since the 2026-07-15 plan: **the W2 hardware (RP2040-Tiny + VL53L0X over USB) is
    being built now.** The article's closing section reflects this in-progress status.
- **Next:** owner to answer §Blockers (`lab` vs `labs`, is any measured number real). Then draft
  the article MDX (T15 content), then execute Wave 1.

## Session 2026-07-28 — split into E001 (infra) + E002 (content)

- **Why:** the owner judged E001 too broad (*"Podziel E001/E002"*). Infra plumbing and the
  portfolio/article are independent concerns with different acceptance criteria.
- **Done:** E001 rescoped to infra only — `PLAN.md` and `ORCHESTRATOR.md` rewritten, tasks reduced
  from T01–T21 to **T01–T13** (old T14–T21 deleted; article/content tasks moved out). Added
  `.plan/ROADMAP.md` (program map). Created **[E002](../../E002-2026-07-28-status-report/PLAN.md)**
  with its own PLAN/ORCHESTRATOR/JOURNAL/IMPRO + T01–T10.
- **Cross-epic:** E001-T08 (funnel → `/lp`) pairs with E002-T07 (report at `/`); E001-T11/T12
  (drop `legacy-source`, cutover) depend on E002 content being live.
- **Correction:** product code lives in a **separate existing repo** (owner) — not created here;
  the old "`smart-desk` does not exist yet" note is retired.

## Findings

_(none yet — append immediately on error / surprise / workaround)_
