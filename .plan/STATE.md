---
updated: 2026-07-15
focus: Astro site wired to a noindex dev preview; product track is design-only, no code yet.
next: Decide whether to push `dev` (triggers Cloudflare deploy), resolve `lab` vs `labs`, wire the custom domain.
---

# State

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
| Product | `PRD.md`, `research/` | Fully designed, **zero code**. Repo `smart-desk` does not exist yet. |
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
- **`lab` vs `labs` unresolved.** `master`'s CNAME says `desk.lab.zentala.agency`
  (singular); the preview uses `desk.labs.zentala.agency` (plural). One of them is wrong.
- Waitlist posts to `waitlist.lp.desk.labs.zentala.agency/api/signup` — a backend that
  does not exist (an artifact of the blanket domain swap; the old host was dead too).
  It reports success on failure. Tracked in `TASKS.md`.
- Parked by the owner: writing an article from the research docs, and shrinking the
  images / improving the `master` page. Not now.
