# desk.zentala.io — Tasks

> **Start here: [HANDOFF.md](HANDOFF.md)** — full context dump from the 2026-07-15 session.
> Current repo state, the approved E001 site-rebuild plan, what's already built and reusable,
> and the open blockers. Read it before picking up any task below.

This repo covers two tracks: the **product** (Open Smart Desk hardware + app research)
and the **website** (`astro/` active, `legacy/` preserved).

---

# Product — Open Smart Desk

## Next up

- [ ] **Sensor-daemon — packages/daemon — priority #1**
      Oddzielony od apki Electron — crash developmentu nie zatrzymuje zbierania danych.
      Architektura: jeden proces Node.js (bez Electron) który:
        (1) czyta USB Serial z RP2040-Tiny (protokół JSON Lines, 115200 baud)
        (2) loguje do ~/.smart-desk/desk.log (append-only CSV, flush co linię)
        (3) serwuje dane przez WebSocket ws://localhost:3847
      Apka Electron łączy się jako klient WS — nie ma dostępu do portu USB bezpośrednio.
      Startuje automatycznie z systemem: Task Scheduler (Win) / systemd (Linux) / LaunchAgent (macOS).
      Szczegóły: [research/architecture/REPO-ARCHITECTURE.md](research/architecture/REPO-ARCHITECTURE.md)
      → Zbieraj dane od siebie przez 30 dni zanim napiszesz cokolwiek innego.

- [ ] **Design notification algorithm as state machine** — before writing any code.
      Sit with Claude and map: states (sitting/standing/away), transitions, timing rules,
      edge cases (meetings, short stands, night mode).
      → See open questions in [research/SESSION-2026-06-25.md](research/SESSION-2026-06-25.md)

- [ ] **Rewrite Electron app from scratch** — clean v1, not patched experiment.
      Stack: TypeScript + Electron + USB Serial (RP2040-Tiny) + OS notifications.
      Modes: software-only (mouse/keyboard) + hardware (+ VL53L0X height).

- [ ] **Design RP2040-Tiny firmware** — USB Serial, sends height readings as JSON.
      Decide: USB Serial vs HID. Calibration flow.

- [ ] **Design PCB v2** — black PCB, RP2040-Tiny + VL53L0X, I2C traces, USB connector.
      Fab: JLCPCB.

- [ ] **Design enclosure v2** — smoked graphite plexi, laser cut, much smaller than v1.
      New DXF file in `enclosure/v2/`.

## Backlog

- [ ] GitHub release v0.1.0 with binaries (Win + Linux + macOS)
- [ ] Minimal README + notification screenshot
- [ ] Post to r/StandingDesk + r/selfhosted + HA Community
- [ ] `/processize` skill — think through manual hardware kit delivery
- [ ] `/first-customers` skill — when app is live
- [ ] `/pricing` skill — before hardware kit pricing
- [ ] Duolingo-style gamification (streaks, XP) — after 100 active users

## Done

- [x] Validate idea — minimalist-entrepreneur skill session (2026-06-25)
- [x] Community research — real user quotes collected → `research/user-quotes.xml`
- [x] Hardware v2 spec → `research/hardware-v2-spec.md`
- [x] MVP plan defined → `research/SESSION-2026-06-25.md`
- [x] Decision: rewrite from scratch, not patch experiment
- [x] Vision & strategy documented:
  - `research/vision/MISSION.md` — filozofia, misja, target users
  - `research/vision/ECOSYSTEM.md` — model biznesowy, konsorcjum, OEM per-unit
  - `research/vision/ROADMAP.md` — Stage 0→5, Smart Desk→Smart Move→Standard
  - `research/vision/RESEARCH-PLAN.md` — plan badań, PW, granty UE
- [x] Notification algorithm designed → `research/algorithm/NOTIFICATION-ALGORITHM.md`
- [x] Architecture designed (sensor-daemon + WS + Electron) → `research/architecture/REPO-ARCHITECTURE.md`
- [x] Firmware protocol spec → `research/architecture/FIRMWARE-SPEC.md`
- [x] PRD written → `PRD.md`

---

# Website — astro/ + legacy/

## Pre-launch blockers — MUST clear before the site goes public

The Astro site is deployed to **lp.desk.labs.zentala.agency** as a dev preview only.
It is `noindex` on purpose and contains fabricated content. Nothing below is optional:
shipping the site to a real domain with any of these unresolved would mislead visitors.

- [ ] **Remove `noindex`** — `robots.txt` (`Disallow: /` → `Allow: /` + Sitemap line) and the
      `<meta name="robots" content="noindex, nofollow">` in `src/pages/index.astro`,
      `src/pages/blog/index.astro`, `src/layouts/BlogPost.astro`.
- [ ] **Delete fabricated testimonials** — `src/components/SocialProof.tsx` invents
      Marcus W. / Lisa K. / Erik N. The file is marked TEMPLATE in code but renders as real.
      There are no users yet, so there are no testimonials.
- [ ] **Delete fabricated results** — the "Real Results" before/after table (8% → 22%
      standing time) in `SocialProof.tsx` presents made-up data as measured.
- [ ] **Delete fake scarcity counters** — `public/preorder-count.json` hardcodes
      `{basic: 34, pro: 12, founder: 5}`, rendering as "Only 166 spots left" and
      "Total raised: €3,359". No pre-orders exist.
- [ ] **Fix or remove pre-order buttons** — `STRIPE_LINKS` in `src/components/Pricing.tsx`
      point to `checkout.stripe.com/placeholder-*` (404). Do not take money for
      hardware that does not exist yet.
- [ ] **Fix or remove the waitlist** — `WaitlistForm.tsx` and `ExitPopup.tsx` POST to
      `waitlist.lp.desk.labs.zentala.agency/api/signup`, a backend that does not exist.
      Today it reports success on failure.
- [ ] **Reconcile the site with `PRD.md`** — the page sells a cloud subscription,
      smartwatch integration and a phone display; the PRD explicitly rules out all three.
      It also says `VL53L1X` where the spec says `VL53L0X`, and sells gamification
      that the PRD defers to Phase 2.
- [ ] **Confirm `lab` vs `labs`** — CNAME on `master` is `desk.lab.zentala.agency`
      (singular); this preview uses `desk.labs.zentala.agency` (plural). One is wrong.
- [ ] **Create the Plausible site** for the final domain, or drop the script —
      `data-domain` currently points at the preview host.

## Current Status

- The actively developed website lives in `astro/`.
- The older static website has been moved into `legacy/`.
- The Astro build works locally, but the Astro website is not yet confirmed as the live production site.
- The repository structure is now separated, but deployment and some documentation decisions are still unresolved.

## Immediate Priorities

### 1. Repository split and cleanup

- [x] Move the old root website into `legacy/`.
- [x] Define the repository structure for two tracks:
  - legacy website in `legacy/`
  - new Astro website in `astro/`
- [x] Move old root-website documentation into legacy-focused docs.
- [ ] Mark every remaining old root-website reference as legacy in docs.
- [x] Make `astro/` the clearly documented active product surface.
- [ ] Decide whether the root website stays as archival source, fallback deployable site, or migration input only.

### 2. Deployment clarification

- [ ] Confirm what is currently live on `desk.zentala.io`.
- [ ] Confirm whether the Astro site is deployed anywhere right now.
- [ ] If Astro is not production-ready, define a temporary preview target such as `dev.desk.zentala.io` or `demo.desk.zentala.io`.
- [ ] Align GitHub workflow, docs, and domain strategy with the real deployment model.

### 3. Documentation repair

- [x] Rewrite the root `README.md` so it explains the dual-state repository.
- [x] Remove or rewrite starter docs in `astro/README.md`.
- [x] Update agent-facing docs so they describe the current state instead of the historical one.
- [x] Add a short architecture note describing legacy root site vs active Astro app.

### 4. Product integration

- [ ] Replace the placeholder waitlist flow with a real backend or a documented temporary capture flow.
- [ ] Stop reporting false-positive signup success on waitlist submission errors.
- [ ] Audit placeholder content such as testimonials, metrics, and OG image references.

### 5. Quality pipeline

- [ ] Add linting and a documented code-quality workflow for `astro/`.
- [ ] Add unit tests for shared logic and critical UI behavior.
- [ ] Add end-to-end coverage for the landing page and waitlist flow.
- [ ] Define the minimum DX pipeline: install, lint, build, test, preview.

## Recommended Order

1. Separate legacy vs Astro in repo structure and docs.
2. Clarify deployment target and preview domain.
3. Repair documentation to match reality.
4. Implement real waitlist behavior.
5. Add tests and DX pipeline.
