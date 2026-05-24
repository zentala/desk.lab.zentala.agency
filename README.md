# desk.zentala.io

This repository now has two clearly separated website generations:

- `astro/` is the active website implementation and the only app currently built by CI.
- `legacy/` contains the older static website that used to live at the repository root.

## Active Website

The active site is an Astro 5 project with React islands.

- Source: [astro/](./astro/)
- Local dev: `cd astro && npm run dev`
- Build: `cd astro && npm run build`
- Preview: `cd astro && npm run preview`

Current CI deployment behavior:

- GitHub Actions builds `astro/`
- Cloudflare Pages deploys `astro/dist`
- Branches currently wired in workflow: `dev` and `master`

This means moving the old root website into `legacy/` does not affect the current Astro deployment path.

## Legacy Website

The previous static site is preserved in [legacy/](./legacy/).

It includes:

- the old `index.html` landing page
- its Bootstrap stylesheet and image assets
- linked enclosure source files
- historical notes

The legacy site remains locally viewable and self-contained, but it is no longer the active implementation.

## Current Priorities

- keep `astro/` as the active product surface
- clean up outdated documentation that still describes the old root website
- clarify whether Astro should go live on `desk.zentala.io` directly or first on a preview subdomain such as `dev.` or `demo.`
- replace placeholder waitlist behavior
- add tests and a DX pipeline for the Astro app

## Reference Docs

- Active work backlog: [TASKS.md](./TASKS.md)
- Planning state: [.plan/STATE.md](./.plan/STATE.md)
- Repository architecture note: [.arch/ARCHITECTURE.md](./.arch/ARCHITECTURE.md)
