# CLAUDE.md - Agent Guidance for desk.zentala.io

## Purpose
Landing page and blog for the zntlDesk open source sit/stand desk sensor project.
Pre-order validation site with waitlist, pricing tiers, and content marketing.

## Target User
Potential customers evaluating the desk sensor kit (developers, remote workers, ergonomics enthusiasts).

## Stack
- **Framework**: Astro 5 (static site generator)
- **Styling**: Tailwind CSS v4 (dark theme)
- **Components**: React (TSX) for interactive sections
- **Analytics**: Plausible (privacy-first, no cookies)
- **Blog**: Astro Content Collections (Markdown)
- **Deployment**: GitHub Pages (push to `main` branch)

## Development
- Local development: `cd astro && npm run dev`
- Build: `cd astro && npm run build`
- Preview build: `cd astro && npm run preview`
- Package manager: **npm** (not pnpm)

## File Structure
- `astro/` — main Astro project
  - `src/pages/` — page routes (`index.astro`, `blog/`)
  - `src/components/` — React components (Hero, Pricing, FAQ, WaitlistForm, ExitPopup, StickyCTA, etc.)
  - `src/layouts/` — page layouts (`BlogPost.astro`)
  - `src/data/` — shared config (`pricing.ts` — canonical pricing source)
  - `src/utils/` — shared utilities (`analytics.ts`, `validation.ts`)
  - `src/content/blog/` — blog posts (Markdown with frontmatter)
  - `src/styles/` — global CSS (Tailwind)
  - `public/` — static assets (images, favicon)

## Key Components
| Component | Purpose |
|-----------|---------|
| `Hero.tsx` | Primary headline + CTAs |
| `Pricing.tsx` | 3-tier product cards with pre-order progress |
| `WaitlistForm.tsx` | Email capture (hero + footer) |
| `ExitPopup.tsx` | Exit-intent email popup (desktop) |
| `StickyCTA.tsx` | Fixed bottom bar with pre-order link |
| `FAQ.tsx` | Expandable Q&A section |
| `ReferralProgram.tsx` | Share & save referral mechanic |
| `Story.tsx` | Founder story section |
| `SocialProof.tsx` | Trust signals |

## Conventions
- Prices imported from `src/data/pricing.ts` — never hardcoded in components
- Analytics via `trackEvent()` from `src/utils/analytics.ts`
- Email validation via `isValidEmail()` from `src/utils/validation.ts`
- All code, comments, and docs in English

## Blog Content
- Posts in `src/content/blog/` as Markdown
- Frontmatter: title, description, date, author, tags
- Schema defined in `src/content.config.ts`
