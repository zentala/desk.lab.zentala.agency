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
