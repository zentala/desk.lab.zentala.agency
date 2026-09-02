# Report design language

The public root is an evidence-led engineering status report, not a sales page. It uses the same dark foundation, container rhythm, focus treatment and link/button primitives as the private funnel, while keeping report surfaces quiet and content-first.

## Information architecture

Read in this order: what this is → what exists now → what changed → why believe it → what happens next → historical archive. The homepage uses a masthead, vertical workstream ledger, chronological version list, evidence/decisions, Now/Next/Later roadmap and archive link. `/versions` is the complete update index.

## Type and layout

Use Space Grotesk for display headings and DM Sans for body copy. Body measure is 65–75ch, with 1.6 line height. Use report-container for a maximum reading width of 1024px. Workstream status is a row-based ledger at every breakpoint; the version list becomes a simple chronological list on mobile. Never depend on a symmetric feature-card grid to explain project state.

## Components

Decision records always expose Context, Considered, Rejected, Why, Decision, Trade-off and Mitigation. Figures use real local assets, descriptive alt text and visible captions. Status/version headers show the date and state plainly. Lucide outline icons are 16–24px, decorative unless labelled, and never replaced by emoji or Unicode glyphs.

Semantic report tokens are report-surface, report-muted, report-divider and status-*. Green is reserved for links and confirmed/in-use signals; report surfaces do not use the LP's green glow.

## Boundary and restraint

The report must not import Hero, Pricing, WaitlistForm, SocialProof, ReferralProgram, StickyCTA or ExitPopup. No public pricing, checkout, pre-order, waitlist, scarcity, testimonials, fabricated metrics or Product JSON-LD. Unknown evidence is rendered as an explicit open item. The funnel remains a separate route and may be gated independently.
