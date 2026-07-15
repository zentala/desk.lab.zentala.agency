# CLAUDE.md — agent guidance for `desk.labs.zentala.agency` (branch `master`)

> **Read this before touching anything.** The previous version of this file described
> an `astro-desk/` project with `src/pages/vision.astro`, `build.astro` and
> `contribute.astro`. **That project does not exist on any branch.** It was stale
> fiction and actively misled agents into wrong diagnoses. What follows is verified
> against the tracked tree.

## What this branch is

`master` is **stage 1** of the Open Smart Desk site: a plain, hand-written static
HTML page. No build step, no framework, no `package.json`.

```
index.html      ← the whole page: mission, parts list, licensing, join-us
style.css       ← Bootstrap conventions, plus a CDN Bootstrap link
images/         ← project photos and diagrams
enclosure/      ← design files for the physical enclosure
CNAME           ← desk.lab.zentala.agency  (note: "lab", singular — see Open questions)
```

To work on it: open `index.html`. That is the entire toolchain.

## What is on `dev` — and why you probably want it

**Stage 2** — the Astro rewrite — lives on the **`dev` branch**, at `astro/`
(Astro 5 + React + Tailwind v4). `dev` also carries `legacy/`, a copy of this
branch's stage-1 page, plus `research/`, `PRD.md`, `.plan/` and `TASKS.md`.

**The owner's direction (2026):** stage-2 *content* is not ready, but the Astro
*machinery* is wanted now. So the plan is to port **this branch's content** into the
Astro shell on `dev`, and hide the stage-2 pages (blog, pricing, FAQ). Stage-1
content stays what visitors see.

**This plan is not yet written down as a task anywhere.** It was searched for across
both branches and does not exist. If you are about to act on it, write it into
`dev:TASKS.md` first — `dev:legacy/CLAUDE.md` requires "an explicit migration or
cleanup decision" before legacy material may be moved.

Note the port is **not a file copy**: stage 1 is Bootstrap, stage 2 is Tailwind v4.
Either re-author the page as an Astro component against the existing Tailwind setup,
or serve the legacy HTML/CSS verbatim from `astro/public/` and bypass the component
system. That is a real decision, not a detail.

## The `astro/` directory you may find here — ignore it

If you see `astro/` in the working tree on `master` containing only `dist/`,
`.astro/` and `node_modules/` with **no `src/` and no `package.json`** — that is
**orphaned build output**, not a project.

It appears when someone builds on `dev` and checks `master` back out: git removes the
*tracked* source but leaves *untracked* build artifacts behind, and `dev`'s own
`astro/.gitignore` disappears along with them. Everything in it is reproducible from
`dev` via `npm ci && npm run build`. It is safe to delete. `.gitignore` here keeps it
from dirtying the tree.

**Do not conclude source has gone missing.** It is on `dev`.

## Deployment — do not trust folklore here

- `master` has **no** `.github/workflows/`.
- `dev` has `.github/workflows/deploy.yml`, which builds `astro/` and deploys to
  **Cloudflare Pages** (project `desk-zentala-io`) on push to `dev` or `master`.
- `dev:.plan/STATE.md` asserts master is "the live GitHub Pages site", but
  `gh api repos/zentala/desk.labs.zentala.agency` returns **`"has_pages": false`**.
  Those two claims cannot both be true.

**Verify in GitHub Settings → Pages before believing either.** Do not repeat the
STATE.md claim as fact.

## Open questions (unresolved by the owner)

- **`lab` vs `labs`.** This branch's `CNAME` says `desk.lab.zentala.agency` (singular).
  `dev:astro/astro.config.mjs` has `site: 'https://lp.desk.labs.zentala.agency'`
  (plural, and the `lp.` preview host). The GitHub repo is named `desk.labs...`
  (plural) with `homepage: https://desk.labs.zentala.agency/`. Three spellings, one
  site. Pick one.
- **What happens to this branch** once the port lands — archival source, fallback
  deployable, or migration input only. Tracked as an open item in `dev:TASKS.md`.

## Naming

The local checkout folder is `desk.zentala.io`; the GitHub repo is
`desk.labs.zentala.agency`. The repo was renamed as part of the org-wide
`zentala.io → zentala.agency` migration; the local folder was never renamed. Same
thing, two names.

## Code style (stage 1)

- HTML5 semantic tags, consistent indentation
- Bootstrap classes where possible
- Minimal JS, simple and accessible
- Responsive and mobile-friendly; keep visual consistency with the existing design
