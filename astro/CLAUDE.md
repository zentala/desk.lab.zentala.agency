# CLAUDE.md - Astro App Guidance

## Scope

This file applies only to the active Astro website in `astro/`.

## Purpose

Marketing site and blog for the zntlDesk project.
This is the active implementation currently built by CI.

## Stack

- Astro 5
- React 19 islands
- Tailwind CSS v4
- Astro Content Collections
- Plausible analytics

## Development

- Local development: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Package manager: `npm`

## Conventions

- Prices come from `src/data/pricing.ts`
- Analytics go through `src/utils/analytics.ts`
- Email validation goes through `src/utils/validation.ts`
- Keep all code, comments, and docs in English

## Current Constraints

- Waitlist is still a placeholder integration and must not be treated as production-ready
- Deployment strategy is still being clarified for production vs preview domain
- Prefer changes that keep `npm run build` green
