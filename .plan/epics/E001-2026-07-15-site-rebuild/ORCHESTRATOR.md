# E001 — Orchestrator (infra + cutover)

How & when. See [PLAN.md](PLAN.md) for what & why. Content/article are [E002](../E002-2026-07-28-status-report/ORCHESTRATOR.md).

**Task IDs:** `E001-T<NN>` in [tasks/](tasks/). **Branch:** `feat/E001-T<NN>-<slug>`.

## Wave 1 — consolidation (sequential; tasks share doc/CI files)

`master` and `dev` share ancestor `e1a248e` → a **plain `git merge master`** (no
`--allow-unrelated-histories`). Verified by the T01 rehearsal (2026-07-29).

**Master brings three files, not a site:** `.gitignore` (conflict), `CLAUDE.md` (add/add
conflict), `CNAME` (clean, → `desk.labs.zentala.agency`). The static assets predate the split
and already live on `dev` under `legacy/` — they are never re-added at the root. This rewrites
T04 and narrows T05/T07; see [JOURNAL.md](JOURNAL.md).

| # | Task | Status |
|---|---|---|
| T01 | [Rehearse the merge in a throwaway worktree; document the conflict set](tasks/E001-T01.md) | [x] |
| T02 | [Execute merge on `consolidate/site-rebuild`; resolve conflicts by hand](tasks/E001-T02.md) | [ ] |
| T03 | [Rescue `legacy/notes/*.md`, then `git rm -r legacy/`](tasks/E001-T03.md) | [ ] |
| T04 | [Move master's assets into the app; keep `index.html` as `legacy-source/`](tasks/E001-T04.md) | [ ] |
| T05 | [Resolve canonical domain (blocked); delete root `CNAME`](tasks/E001-T05.md) | [ ] |
| T06 | [Migrate `.arch/` → `.plan/ARCH.md`; align STATE/BACKLOG/CLAUDE/TASKS](tasks/E001-T06.md) | [ ] |

## Wave 2 — one-app plumbing (T07 independent)

| # | Task | Status |
|---|---|---|
| T07 | [EXIF/GPS strip + downscale the 6 raw phone JPEGs](tasks/E001-T07.md) | [ ] |
| T08 | [Move funnel → `/lp`; invert `noindex`; restore `robots.txt`](tasks/E001-T08.md) | [ ] |
| T09 | [Cloudflare Access on `/lp*`, owner's email only](tasks/E001-T09.md) | [ ] |
| T10 | [CI: one job, one project; drop the `master` trigger](tasks/E001-T10.md) | [ ] |

## Wave 3 — cutover (after E002 content is live)

| # | Task | Status |
|---|---|---|
| T11 | [Delete `astro/legacy-source/` after parity check](tasks/E001-T11.md) | [ ] |
| T12 | [Cutover without going dark; freeze `master`](tasks/E001-T12.md) | [ ] |
| T13 | [Update `.plan/ARCH.md` for the one-app topology + ADR](tasks/E001-T13.md) | [ ] |

## Dependencies

- Wave 1 sequential (shared files, one merge).
- **T08 (funnel → `/lp`) is paired with E002's report homepage** — do not empty `/`.
- Wave 3 last: T12 needs T05 (domain), T09 (Access verified), T10 (CI), **and E002 content live**.
