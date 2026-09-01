---
updated: 2026-09-01T09:00:00+02:00
focus: E003-T04 visual-fit verification for the provisional RP2040-Zero carrier.
next: Verify the generated PCB and schematic package against the T04 checklist.
executing_epic: E003
executing_epic_path: .plan/epics/E003-2026-09-01-tscircuit-carrier-board
current_wave:
  - "Wave 1 started: evidence template and minimal TS Circuit output proof are committed."
  - "Wave 2 started: placeholder candidate and static review portal are committed; fabrication remains blocked."
  - "Owner selected RP2040-Zero as the canonical Hardware v2 module; ADR-004 records the decision."
  - "E003-T03 completed: provisional carrier source, constraints, tests and generated review artefacts are committed."
handoff: HANDOFF.md
---

# State

> **Full context: [../HANDOFF.md](../HANDOFF.md)** — read that first. This file is the short version.

## E003 implementation in progress; E001/E002 remain separate website work

**2026-07-29 — E001-T01 done.** The `master` merge was rehearsed in a throwaway worktree:
**two conflicts** (`.gitignore`, `CLAUDE.md`), `CNAME` clean at `desk.labs.zentala.agency`,
merge-base exactly `e1a248e`. Master carries no assets — they already sit on `dev` under
`legacy/`, duplicated into `astro/public/images/` (19.7 MB twice). T04 was rewritten around
that, T05/T07 narrowed. Findings: [E001 JOURNAL](epics/E001-2026-07-15-site-rebuild/JOURNAL.md).

## E001 + E002 — the plan as written 2026-07-28

One Astro app, one domain. Homepage becomes a versioned engineering status report aimed at
CTOs/hiring managers; the pre-order funnel moves to `/lp` behind Cloudflare Access. Repo
consolidates to one branch; `master` gets frozen. Program map: [ROADMAP.md](ROADMAP.md).

**2026-07-28 — E001 split into two epics** (the old E001 was too broad):

- **[E001](epics/E001-2026-07-15-site-rebuild/PLAN.md)** — infra/plumbing: consolidation,
  funnel → `/lp` + Cloudflare Access, `noindex` inversion, EXIF strip, CI, cutover, freeze `master`.
  13 tasks, 3 waves.
- **[E002](epics/E002-2026-07-28-status-report/PLAN.md)** — content: MDX pipeline, `updates`
  collection, DecisionRecord, versioned header, report homepage, **the article v0.2**, standing
  pages, RSS/`/versions`. 10 tasks, 3 waves.

Cross-epic: E001-T08 (funnel → `/lp`) pairs with E002-T07 (report at `/`); E001-T11/T12 (drop
legacy-source, cutover) wait for E002 content live.

Article framing (owner): about *conclusions + next steps*, not an un-copyable moat — the May
"protocol/standard is the real product" + data-monetization angle is excluded, shown only as the
superseded position. New reality: the **W2 hardware is being built now** (RP2040-Zero + ToF
breakout over USB-C), reflected in the article's closing section.

Next: answer blockers, then write article v0.2 (E002-T08), then execute.

## Branches — read this first

`master` and `dev` are not two versions of one site; they are two different sites.

- **`master`** — the live GitHub Pages site: a static R&D project page
  (`index.html` + `style.css`, mission / parts list / licensing / join-us).
  Serves the domain via `CNAME` → `desk.lab.zentala.agency`. Deliberately untouched.
- **`dev`** — everything else and the real working branch: `astro/`, `legacy/`,
  `research/`, `PRD.md`, `.plan/`, CI. Deploys to Cloudflare Pages via
  `.github/workflows/deploy.yml` (project `desk-zentala-io`).

On 2026-07-15 the five product-docs commits were moved off `master` onto `dev`
(cherry-pick; `master` force-pushed back to its base, keeping only the CNAME commit).
`TASKS.md` and `CLAUDE.md` had diverged into separate website/product versions and were
merged by hand into a two-track structure. Backup of the old `master`: tag
`backup/master-pre-move` (local only, not pushed).

## Two tracks

| Track | Where | State |
|---|---|---|
| Product | `PRD.md`, `research/` (design) + **separate product repo** (code) | Firmware/daemon/algorithm/app live in their own existing repo — see [ROADMAP.md](ROADMAP.md). This repo holds design + the portfolio site only. |
| Website | `astro/` (active), `legacy/` | Builds green; deployable as preview only. |

## Website — current state

- Deploy was broken for its whole life: `@astrojs/tailwind@6` pins peer
  `tailwindcss@^3` against the project's v4, so `npm ci` (and therefore CI) always
  failed with ERESOLVE. Dead package, removed 2026-07-15. Build is now green (4 pages).
- All references moved off the abandoned `desk.zentala.io` to
  **`lp.desk.labs.zentala.agency`** (19 occurrences, 11 files).
- Site is **noindex on purpose**: `robots.txt` `Disallow: /` plus `noindex, nofollow`
  in `src/pages/index.astro`, `src/pages/blog/index.astro`, `src/layouts/BlogPost.astro`.
- **The site ships fabricated content** — invented testimonials, invented "Real Results"
  data, hardcoded pre-order counters — and placeholder Stripe links. This is a known,
  accepted state for a noindex preview. It is a hard blocker for any public launch:
  see `TASKS.md` → **Pre-launch blockers**.
- The site also contradicts `PRD.md` (sells cloud subscription, smartwatch, phone display
  — all three explicitly ruled out in the PRD).

## Open threads

- **2 commits sit unpushed on `dev`** (`a8948d2`, `d56cb83`). Pushing triggers a public
  Cloudflare deploy — awaiting the go-ahead.
- **Custom domain not wired.** The workflow deploys to `desk-zentala-io` with
  `--branch=dev`, which yields a `*.pages.dev` URL. `lp.desk.labs.zentala.agency`
  needs a Pages custom domain + DNS record — account config, not repo config.
- **`lab` vs `labs` — RESOLVED (owner, 2026-07-28): `labs` (plural) is canonical.** `master`'s
  CNAME `desk.lab.zentala.agency` (singular) is the bug; fix it to `labs` during E001-T05.
- Waitlist posts to `waitlist.lp.desk.labs.zentala.agency/api/signup` — a backend that
  does not exist (an artifact of the blanket domain swap; the old host was dead too).
  It reports success on failure. Tracked in `TASKS.md`.
- Parked by the owner: writing an article from the research docs, and shrinking the
  images / improving the `master` page. Not now.
