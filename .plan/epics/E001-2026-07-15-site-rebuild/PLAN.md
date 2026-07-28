# E001 — Repo consolidation & one-app infra + cutover

> Make `desk.zentala.io` **one Astro app on one domain**, move the pre-order funnel to `/lp`
> behind Cloudflare Access, and cut over to the new site without downtime — then freeze
> `master`. **Plumbing only.** The report homepage, content system and article are [E002](../E002-2026-07-28-status-report/PLAN.md).

- **Status:** planned, approved. Implementation not started.
- **Program map:** [../../ROADMAP.md](../../ROADMAP.md) · **Sister epic (content):** [E002](../E002-2026-07-28-status-report/PLAN.md)
- **Approved plan (external, full):** `~/.claude/plans/strona-ma-by-artyku-em-keen-hopcroft.md`
- **Session context:** [../../../HANDOFF.md](../../../HANDOFF.md)
- **Orchestration:** [ORCHESTRATOR.md](ORCHESTRATOR.md) · **Findings:** [JOURNAL.md](JOURNAL.md) · **Catches:** [IMPRO.md](IMPRO.md)

## Context

`desk.zentala.io` hosts two unrelated websites on two branches of one repo:

- **`master`** — the live Open Smart Desk R&D page (static `index.html` + Bootstrap CDN, served
  by GitHub Pages at `desk.lab.zentala.agency`).
- **`dev`** — the Astro pre-order funnel (`astro/`), plus `research/`, `PRD.md`, `.plan/`, CI.

This split is the root cause of recurring damage (a hand-merge of `TASKS.md`/`CLAUDE.md` after
five docs commits landed on the wrong branch; the Astro deploy broken since inception by a dead
`@astrojs/tailwind` pin failing `npm ci`). E001 ends the split. **Two branches = two sites** is
the problem this epic exists to remove.

The funnel itself fabricates content (invented testimonials, invented "Real Results", hardcoded
pre-order counters, placeholder Stripe links) and contradicts `PRD.md`. It is **not deleted** —
it moves to `/lp` and is **gated behind Cloudflare Access** (owner's email only), which turns the
fabricated content from a public risk into a private, logged-in-only page. The pre-launch blockers
in `TASKS.md` stay valid but become conditions on *ever un-gating* `/lp`.

Going public forces a `noindex` inversion: the whole app is currently `noindex` (`robots.txt`
`Disallow: /` + meta on all templates, set for the preview). `noindex` must be **removed
everywhere except `/lp`**, and `robots.txt` restored to `Allow: /`.

## Scope & constraints

- **In scope:** branch consolidation, asset relocation, `.arch/` migration + doc alignment, image
  EXIF/GPS strip, funnel → `/lp` + `noindex` inversion, Cloudflare Access, one-job CI, cutover,
  freeze `master`.
- **Out of scope → [E002](../E002-2026-07-28-status-report/PLAN.md):** MDX pipeline, `updates`
  collection, report homepage, DecisionRecord/header components, the article, standing pages, RSS.
- **Out of scope entirely:** the product code (lives in the separate app repo — see ROADMAP).
- Nothing is committed to `master`; work lands on `dev`. `master` stays frozen and serving until T12.

## Cross-epic coordination

- **T08 (funnel → `/lp`)** frees `/`; **E002 builds the report at `/`.** These are paired — do not
  leave `/` empty. Sequence: E002's report homepage is ready → T08 moves the funnel → cutover.
- **T12 (cutover)** is the last thing in the whole program's website stream — it must not run until
  E002's content is live and E001's Access gate (T09) is verified.

## Acceptance criteria

- One branch; `master` frozen (not deleted), tagged `archive/master-static-site-final`.
- One Astro app, one canonical domain; `git log --follow` still resolves the 2023 photo commits.
- Funnel reachable only under `/lp`, behind an Access challenge when logged out.
- `noindex` present on `/lp`, absent on every public page; `robots.txt` = `Allow: /`.
- No committed image carries GPS/EXIF.
- CI: one job, one project, builds `astro/`; no `master` deploy trigger.

## Test Strategy

Release-blocking gates:

1. **No GPS/EXIF on any committed image** — scripted CI assertion, not a one-time pass (photos of
   the owner's home; the site is now meant to be indexed).
2. **`noindex` present on `/lp` and absent from every public page** — catches both the leftover
   preview `noindex` and the funnel leaking into the index.
3. **`/lp` returns an Access challenge when logged out** — the whole fabricated-content mitigation
   rests on this.

Quality gates: `astro build` exits 0 · internal link check over `dist/**/*.html` · per-image
budget (~500 KB) · cutover verified on `*.pages.dev` before DNS flip.

## Architecture impact

**Yes.** Repo topology changes from two-branch/two-site to one app on one domain; CI collapses to
a single job; GitHub Pages is retired in favour of Cloudflare Pages. → **T13 updates
[`.plan/ARCH.md`](../../ARCH.md)** (create it during T06 migration). ADR candidate: *"Consolidate
to one branch; freeze `master`; Cloudflare Pages as the single deploy target."*

## Blockers (owner decisions required)

1. **Canonical domain — RESOLVED (owner, 2026-07-28): `desk.labs.zentala.agency`** (plural).
   `lab` (singular, on `master`'s CNAME) is the bug — fix it to `labs` everywhere. `desk.zentala.io`
   stays abandoned. Unblocks T05/T12.
2. **Analytics.** `master` runs Google Analytics (`G-BZ6M9DBGYJ`); the app runs Plausible. One app
   now — pick one.
