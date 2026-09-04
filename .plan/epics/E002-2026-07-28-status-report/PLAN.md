# E002 — Versioned status-report content system + article v0.2

> The homepage becomes a **versioned engineering status report** — a portfolio of how the owner,
> as a technical developer, reaches conclusions. This epic builds the content system (MDX,
> `updates` collection, DecisionRecord, versioned header, `/versions`) **and writes the first
> article (v0.2).** Infra/consolidation is [E001](../E001-2026-07-15-site-rebuild/PLAN.md).

- **Status:** planned. **Program map:** [../../ROADMAP.md](../../ROADMAP.md)
- **Sister epic (infra):** [E001](../E001-2026-07-15-site-rebuild/PLAN.md)
- **Orchestration:** [ORCHESTRATOR.md](ORCHESTRATOR.md) · **Findings:** [JOURNAL.md](JOURNAL.md) · **Catches:** [IMPRO.md](IMPRO.md)
- **Article draft:** [reports/](reports/README.md)

## Why this exists

The site is no longer a product page — it is a **portfolio of the owner's engineering thinking**,
aimed at CTOs / engineering directors / hiring managers, to help land a senior/lead/product/
architect role. The message: here is a real problem, here are the decisions I made, here is what I
got wrong, here is how I reason. **Sharing conclusions is itself the work product.**

## The article — thesis & structure

**The spine (the owner's own arc):**

1. I built this **for my own desk**.
2. It came out **too complex** — no sense scaling it in that form.
3. Most desks are **already electrically controlled** — so why build custom control? You can press
   the button with a finger. It does not pay off.
4. Therefore, at scale the value is the **algorithm**, not the hardware.
5. Decision: **reduce to an MVP and focus on the algorithm.** Hardware stays minimal and open
   source — this is about conclusions and next steps, **not** an un-copyable moat.

**Draft path:** `reports/2026-07-28-status-update-v0.2.mdx` (task T08 moves it to
`astro/src/content/updates/`). **Frontmatter** (future `updates` collection): `title`,
`description`, `version: "0.2"`, `statusDate`, `status: current`, `supersedes`, `tags`.

**Sections:**

1. **Context** — height-adjustable desks sit unused; the problem is psychological, not mechanical.
2. **What v0.1 actually did** — up/down control, height measurement, presence sensing, admin panel. ~700 PLN.
3. **Evidence** — the photos with their existing captions; overheating plexi, sticking relays, failing PIR, the unfinished User Panel.
4. **Decision 1 — split into modules** (the May position: MQTT, Home Assistant, external radar sensor, open protocol + mDNS). Why it was attractive. **Why it was parked.**
5. **Decision 2 — radical reduction to two USB components** (RP2040-Tiny + VL53L0X), everything delegated to the computer. Trade-off: breaks when you switch machines / have a locked-down laptop. Mitigation: flash your own sensor. Justification: economics — desks are already electric, the algorithm is the value.
6. **What I got wrong** — from `postmortem.ts` + the notes, stated positively: each failure produced a decision.
7. **Where I am now / next steps** — the **W2 hardware is being built right now**; the focus is the MVP algorithm. Honest, in-progress ending.

**The arc that makes it publishable:** Decision 1 and Decision 2 contradict each other, and that is
the point. `astro/src/data/postmortem.ts` still asserts *"Protocol standardization is the real
product"* (May). The current position is the opposite — **the algorithm / UX is the real product.**
The article must **supersede** that claim, not quietly copy it.

**Framing constraint (owner, 2026-07-28):** about *conclusions + next steps*, **not** a moat.
Deliberately excluded (shown only as the position moved away from): "the open protocol is the real
product", the ecosystem/standard-for-manufacturers play, and monetizing user data / ads. Officially
open source.

**Two verified source corrections:**
- The controller *was built, not "never happened"* — the PCB physically exists, partially assembled
  (Arduino Pro Micro, SN74HC595, 7-segment, silkscreen `© 2023 Pawel Zentala`). Accurate claim:
  *"built and never finished or integrated."*
- The two User Panel photos (`20230628_033806.jpg`, `20230628_043425.jpg`) are the only uncaptioned
  images — captions to be written from direct inspection.

## Reuse (orphaned scaffolding to revive, not rewrite)

| Asset (on `dev`) | State | Use |
|---|---|---|
| `astro/src/data/postmortem.ts` | English Worked/Failed/Learned | Evidence + "What I got wrong" |
| `astro/src/data/stats.ts` | Real numbers (`~700 PLN / 200 USD`) | Status header |
| `astro/src/data/parts.ts` | 16 typed BOM entries | The `/hardware` page |
| `astro/src/components/ui/{Section,SectionHeader,InfoCard,StatCard,FigureSwap}.tsx` | Structure good, theming broken | Article primitives |
| `astro/src/components/{HardwareAppendix,PostMortem,Stats,Goals,Licensing,Software,Architecture,Background}.tsx` | Same | Standing pages |
| `legacy/notes/article-draft.md`, `voice-stream.md`, `.cursor/vision/0001-NOTE-init.md` | Polish source notes | Article source — translate, don't invent |

Revived components reference tokens that **do not exist** (`text-ink`, `.card`, `shadow-soft`,
`bg-fog`) — re-theme against the real `--color-dark-*` / `--color-brand-green*` / `--shadow-*`.
`@astrojs/mdx` and `@tailwindcss/typography` are **not installed**; the content glob is `**/*.md` only.

## Scope & constraints

- **In scope:** MDX pipeline, `design.md`, `updates` collection, re-themed primitives, DecisionRecord
  + status-header components, the report homepage `/`, the article v0.2, standing pages, nav/footer/RSS/`/versions`.
- **Out of scope → E001:** funnel move, Access gate, `noindex` inversion, cutover.
- **Restraint (guardrail):** no pricing, no CTAs, no scarcity, no brand-green glow on the report. The
  funnel lives one import away — `design.md` (T02) is the guardrail.

## Acceptance criteria

- Article renders as valid MDX; every claim traceable to `postmortem.ts`, the notes, the photos, or
  `PRD.md`; **no fabricated numbers**; Decision-1 → Decision-2 reversal explicit; excluded framing absent.
- Report homepage at `/` (paired with E001-T08 moving the funnel off `/`).
- `updates` collection with real `z.coerce.date()`; bad frontmatter fails `astro build`.
- Standing pages `/about`, `/hardware`, `/licensing`, `/roadmap`; `/versions` index; RSS parses.

## Test Strategy

- `astro build` exits 0 (Zod validates frontmatter for free).
- Internal link check; per-image budget (~500 KB) — but EXIF/GPS strip is E001-T07.
- Lighthouse/a11y on home + article + hardware (alt text, heading order, contrast — doubles as
  evidence of rigor for the audience).
- **Not tested — prose quality:** the owner's five editorial questions in `legacy/notes/article-draft.md`
  are the manual review checklist.

## Architecture impact

**Minor/additive.** A new content pipeline: the `updates` collection + MDX integration + report
homepage. No new external service. → captured in `.plan/ARCH.md` under E001-T13. No separate ADR.

## Numbers — RESOLVED (owner, 2026-07-28)

**The 8% is real; the 8%→22% "improvement" is not.**

- `~8% standing time` **was genuinely measured** by the v1 sensor — **keep it**, but frame honestly:
  it was a **small time sample**, and — the real point — that 8% happened **while the app was
  nudging**. Without the app the owner stands **essentially never**. So 8% is not a "before" number
  in a before/after; it is *"even with the nudge, only 8% — and the nudge is the only reason it
  wasn't zero."* This directly supports the thesis: **the value is the nudge/algorithm, not the
  hardware.**
- **Cut entirely** (funnel fabrication, stays on `/lp`): the `8% → 22%` before/after
  (`Story.tsx:40`, `SocialProof.tsx:56,65`), the "Real Results" table, the invented testimonials,
  the pre-order counters, "back pain: gone."
- No other measured number is claimed. Any figure that is not the honest 8% gets qualitative
  wording, never an invented digit.

---

## 2026-09-02 Revision — evidence-led project status homepage

### TL;DR

Refine E002's report homepage into a block-based, living project status page
implemented in `astro/`. It will reuse the active landing page's foundational
tokens, layout rhythm, buttons and responsive conventions, but it will not
reuse funnel content, product schema, pre-order components, scarcity or sales
CTAs. The public story changes from a generic v0.1 post-mortem to a clear view
of the present: the MoveUp desktop app, the sensor/carrier board, the future
enclosure, evidence, version history, and what happens next.

This revision refines E002-T02, T04, T06 and T07; it does not create a second
homepage architecture. E001-T08 remains responsible for moving the funnel off
`/` and keeping it private.

### Problem and current state

The current Astro root (`astro/src/pages/index.astro`) is a noindex pre-order
funnel with inaccurate product wording, product JSON-LD, pricing and multiple
conversion components. It cannot truthfully act as the public face of the
current project. The historic R&D page at Git commit `a65a569` had a stronger
information shape — version summary, failures, successes, cost, hardware,
software and next steps — but described obsolete automatic-control hardware
and an old software stack.

The codebase already contains report-oriented building blocks: `stats.ts`,
`postmortem.ts`, `parts.ts`, `Section`, `SectionHeader`, `InfoCard`,
`StatCard` and `FigureSwap`. They are orphaned and their light-theme class
tokens do not exist in `astro/src/styles/global.css`. The active LP already
owns global dark-theme colors, shared container spacing and button primitives.
MoveUp is known to exist by owner statement, but its source location, current
run state, supported platforms, screenshots and independently verifiable
capabilities are not present in this repository.

### Scope

**In scope**

- A current-status homepage at `/` with a masthead, concise current-state
  ledger, version history, evidence/decision sections, roadmap and v0.1
  archive link.
- Honest, separately labelled workstreams for MoveUp, the sensor/carrier board
  and enclosure.
- A typed content/data model for public workstream status and versions.
- A single design language shared with the LP at the token and primitive level,
  with report-specific visual variants.
- Report typography, responsive layout, Lucide outline icons and a visual QA
  pass at desktop and mobile widths.

**Out of scope**

- Any public price, pre-order, waitlist, checkout, testimonial, scarcity,
  unverified metric or product-schema claim.
- Changing the commercial/open-source decision, the name of the product, or
  MoveUp application code.
- PCB manufacture, enclosure design, new imagery or an app demo; this plan
  creates explicit placeholders/statuses until those artefacts exist.
- Funnel relocation, Cloudflare Access, SEO/indexing inversion and production
  cutover; those remain E001.

**Constraints**

- Reuse foundation styles from `astro/src/styles/global.css` and safe UI
  primitives, but do not import `Hero`, `Pricing`, `WaitlistForm`,
  `SocialProof`, `ReferralProgram`, `StickyCTA` or `ExitPopup` into the report.
- Every public status must be `archived`, `in use`, `in review`, `in design`
  or `planned`, with an update date and an evidence link/caption where one
  exists. Absence of evidence is rendered as an explicit open item, not a
  fabricated result.
- The report must preserve an accessible reading order and use line icons only;
  no Unicode/emoji icons.

### Information architecture

The homepage answers questions in this order: **what is this → what exists now
→ what changed → why believe it → what happens next → where is the archive.**

1. **Masthead / current status:** project name, accurate app + sensor sentence,
   last-updated date, and one secondary link to the full status/version log.
2. **Current work:** a vertical status ledger, not a symmetrical feature-card
   grid: MoveUp; Sensor & carrier board; Enclosure. Each row contains status,
   one-sentence truth, evidence or missing-evidence state, and next milestone.
3. **Version history:** `v0.1 — archived` → current reduced sensor direction
   → `physical alpha — planned`. Each entry says what changed, why and the
   linked evidence/decision record. Do not invent a numeric version for an
   unapproved milestone.
4. **Evidence and decisions:** compact W1 post-mortem, selected real photos,
   cost only where sourced, and the Decision-1/Decision-2 reversal.
5. **Now / Next / Later:** clear roadmap and open decisions, including
   enclosure, user testing, commercial/open-source choice and compliance scope.
6. **Archive:** v0.1 materials and legacy component/BOM detail, explicitly
   dated and labelled historical.

### Implementation strategy

**Wave 0 — establish factual inputs and report rules**

1. Inventory MoveUp outside this repository: record source/repository path,
   runnable build, supported OSes, what it demonstrably does, current
   screenshots/recording permission and what remains unfinished. This is a
   content gate: no public MoveUp copy is written before it is complete.
2. Amend `astro/design.md` (E002-T02) with the report's IA, tone and component
   rules. Keep the current dark base and `section-container`, define semantic
   report tokens (`surface`, `muted`, `status-*`, divider, focus) and choose a
   distinct display face while retaining readable body text. Define Lucide icon
   sizing/colour and prohibit pricing/green-glow funnel motifs from report
   surfaces.
3. Create a fact sheet for the three workstreams using only source evidence:
   MoveUp inventory; E003 carrier-board documents; enclosure marked planned.
   Owner signs off the wording, dates and evidence links before implementation.

**Wave 1 — shared foundation and content model**

4. Re-theme `astro/src/components/ui/{Section,SectionHeader,InfoCard,StatCard,
   FigureSwap}.tsx` against the real global tokens, retaining the layout
   contracts but adding report variants. Extract only genuinely shared LP
   primitives into `global.css` (container, text, button/link, focus and
   divider); do not make the report depend on sales components.
5. Add `astro/src/data/project-status.ts` with typed `Workstream` and
   `VersionEntry` records. Each workstream holds a semantic state, `updatedAt`,
   summary, evidence/unknown-evidence field and `next`. Extend the planned
   `updates` collection in `astro/src/content.config.ts` with validated status,
   status date, version/phase, supersession and tags. Migrate only evidence that
   has an owner-approved source.
6. Add `lucide-react` and a small local icon map used by report components; do
   not use arbitrary icon names or Unicode fallback glyphs.

**Wave 2 — compose the report page**

7. Build focused report components under `astro/src/components/report/`:
   `ProjectMasthead`, `StatusLedger`, `VersionTimeline`, `EvidenceSummary`,
   `NowNextLater`, and `ArchiveLink`. The ledger is row-based on all breakpoints;
   the version timeline becomes a simple chronological list on mobile.
8. Replace the root composition in `astro/src/pages/index.astro` only when the
   E001 funnel move is ready. Remove funnel-specific metadata and Product
   JSON-LD from the report route; add report metadata based on confirmed copy.
   Keep the old funnel's components isolated to `/lp` under E001.
9. Seed content: W1 is an archive; present carrier board work as its verified
   E003 state; present enclosure as planned; populate MoveUp only from Wave 0.
   Link detailed version entries to the `updates` collection rather than
   duplicating long narrative on the homepage.

**Wave 3 — evidence, responsive QA and release coordination**

10. Add current, locally hosted and captioned evidence assets only after E001's
    EXIF/GPS gate. Keep broken vendor hotlinks and the giant historic BOM off
    the homepage; move historical detail behind `/hardware` / archive.
11. Add a report navigation/footer variant and `/versions` index as E002-T10
    describes. Every status label links to its evidence, full update or explicit
    open question.
12. Run content validation, build and browser QA. Coordinate the root-route
    swap with E001-T08, then apply E001's noindex/Access/cutover gates; this
    revision alone must not publish the report.

### Architecture impact

Minor and additive within E002: a typed status-data layer plus the existing
planned `updates` content collection feed one report composition. No runtime
backend or application integration is introduced. Add this data ownership and
the LP/report primitive boundary to `astro/design.md`; no new ADR is required.

### Test strategy

- **Content validation:** `astro build` must fail if an `updates` entry lacks a
  valid state/date/version; it would not catch invalid report status today
  because the collection does not exist.
- **Data rendering:** add a component/data test once a project test runner is
  selected, asserting each workstream shows state, update date and a next step;
  an unknown evidence field must render as an open item rather than a link.
- **Route smoke:** browser test for `/` asserts the masthead, the three named
  workstreams, version history and archive link render, and asserts pricing,
  `Pre-order`, checkout and product-offer JSON-LD are absent.
- **Visual/a11y QA:** inspect 1440px and 390px layouts. The status ledger and
  version history must not create horizontal overflow; headings remain ordered;
  Lucide icons are decorative or have accessible labels; body contrast and
  focus states meet the report design rules.
- **Regression gate:** `npm run build`, internal-link check and the E001
  noindex/`/lp` Access assertions before any public cutover.

### Definition of done

- A visitor opening `/` can identify the system, see what is active now and
  distinguish archived, in-review and planned work without reading an article.
- MoveUp copy is traceable to an inventoried source and evidence, or is
  explicitly presented as an open/unverified item; no generic app claim is
  used.
- The root page exposes the three workstreams, version history, evidence,
  roadmap and archive with no pricing, pre-order or fabricated social proof.
- The report and `/versions` use one shared token/primitives layer with the LP,
  while report surfaces visibly follow their own restraint rules.
- At 390px and 1440px the page has no horizontal overflow and all primary
  information remains readable in source/heading order.
- `npm run build` passes; content and route smoke tests pass after their runner
  is selected; browser/a11y QA evidence is attached to the implementation PR.
- The `/` replacement is deployed only together with E001-T08 and E001's
  Access/noindex requirements, never as an isolated route swap.

### Subtasks

| # | Task | Files | Depends on | Points | Tests | Commit |
|---|---|---|---|---:|---|---|
| R1 | Inventory MoveUp and approve public fact sheet | external MoveUp repo/path; E002 report note | owner supplies source | 3 | Manual run + source/screenshot provenance | none — external/content gate |
| R2 | Define report IA, typography and LP/report primitive boundary | `astro/design.md` | R1 facts for final copy | 3 | Design review checklist at 390/1440px | `docs(design): define evidence-led report system` |
| R3 | Re-theme reusable primitives and shared semantic tokens | `astro/src/styles/global.css`, `components/ui/*` | R2 | 5 | visual unit stories or browser component inspection | `style(report): establish shared report primitives` |
| R4 | Add validated status/version data model and content collection | `src/data/project-status.ts`, `src/content.config.ts`, `src/content/updates/*` | R1 | 5 | schema/build invalid-frontmatter check | `feat(report): add project status content model` |
| R5 | Add Lucide dependency and report components | `package.json`, `components/report/*` | R2, R3, R4 | 8 | component/route smoke after runner selection | `feat(report): add status ledger and version timeline` |
| R6 | Compose `/` and archive/current evidence content | `src/pages/index.astro`, metadata, report content/assets | R4, R5, E001-T08 readiness | 8 | route smoke: report present, funnel claims absent | `feat(report): make project status homepage` |
| R7 | Navigation, `/versions`, responsive/a11y and cutover handoff | nav/footer, `src/pages/versions.astro`, tests | R6, E002-T10, E001 gates | 5 | build, links, 390/1440px browser checks | `test(report): cover status homepage journeys` |

Each task's acceptance criterion is the corresponding definition-of-done item
for its surface; R6 specifically cannot be accepted until `/` contains no
funnel Product JSON-LD or sales language.

### Risks and GAPS

- **MoveUp provenance is unknown.** Early signal: no runnable source or
  permission to show a screenshot. Mitigation: leave the workstream as an
  explicit open item and do not claim functionality.
- **Brand/name is unresolved.** Early signal: masthead copy cannot be approved.
  Mitigation: use a neutral project label in the first implementation and keep
  copy in one data/content file.
- **E001 route migration is not implemented.** Early signal: `/` still owns
  funnel imports when report work is ready. Mitigation: land the route swap only
  as the paired E001/E002 change.
- **E003 facts are evolving.** Early signal: carrier-board review state or
  source artefact changes. Mitigation: link the live review artefact and date
  every status rather than freeze a marketing claim.
- **No project test runner is currently declared in `astro/package.json`.**
  The precise component/E2E framework remains unknown; choose it before R5 and
  keep initial verification to `astro build` plus browser evidence.
