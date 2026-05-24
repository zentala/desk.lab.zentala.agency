# Astro Website

This is the active website implementation for `desk.zentala.io`.

## Stack

- Astro 5
- React 19 islands
- Tailwind CSS v4
- static blog content collections
- Plausible analytics

## Commands

Run from `astro/`:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |

## Current State

- This is the only website currently built by the repository deployment workflow.
- The old root-level static site has been moved to `../legacy/`.
- Deployment and documentation are still being clarified before the Astro app is treated as the confirmed live production site.

## Near-Term Work

- clean up repository docs after the legacy split
- confirm preview or production domain strategy
- replace placeholder waitlist integration
- add linting, tests, and a developer-quality pipeline
