# desk.zentala.io — Tasks

This repo covers two tracks: the **product** (Open Smart Desk hardware + app research)
and the **website** (`astro/` active, `legacy/` preserved).

---

# Product — Open Smart Desk

## Next up

- [ ] **Standalone data logger — osobny proces, startuje z systemem**
      Oddzielony od głównej apki — crash developmentu nie zatrzymuje zbierania danych.
      Minimalne: śledzi aktywność myszy/klawiatury → append-only CSV, flush co linię.
      Opcjonalnie: jeśli sensor podłączony → dodaje posture (sitting/standing).
      Działa na każdym komputerze (pracowy bez sensora = partial data, lepsza niż zero).
      Startuje automatycznie z systemem (autostart), nie wymaga uruchomienia apki.
      Stack: osobny skrypt Node.js/Python, systemd/Task Scheduler, plik CSV w home dir.
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

---

# Website — astro/ + legacy/

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
