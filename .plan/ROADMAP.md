# Open Smart Desk — program roadmap

> Widest-framing map of everything this endeavour needs: the streams, the epics, and where
> each one lives. Deliberately high-level — epic scope in one line, detail lives in each
> epic's `PLAN.md`. Linked from [BACKLOG.md](BACKLOG.md).

## The thesis (why any of this exists)

A height-adjustable desk that raises electrically is already common — so *custom hardware
control does not pay off at scale*. The value that does not yet exist is the **algorithm**:
the behavioral system that makes a knowledge worker actually alternate sitting and standing,
without being annoying enough to get switched off. The project is **open source** — this is
about conclusions and next steps, not about building an un-copyable moat.

The public site is a **versioned engineering status report** — a portfolio of how the owner,
as a technical developer, reaches conclusions: *built it for my own desk → too complex to
scale → desks are already electric → the value is the algorithm → reduce to an MVP focused
on the algorithm.*

## Two homes

| Home | Holds | Epic prefix |
|---|---|---|
| **`desk.zentala.io`** (this repo) | Research, vision, and the public site / portfolio | `E0xx` |
| **Existing app repo** (product code — actively developed) | Firmware, sensor-daemon, algorithm, desktop app | `P0x` (managed there) |

> The product code lives in its own repo (confirm the canonical name/URL and link it here).
> Product epics `P0x` below are mapped for the whole-picture view; their authoritative
> `PLAN.md`/tasks live in that repo, not here.

## Streams & epics

### Stream 1 — Portfolio / website (this repo, active now)

| Epic | Scope (one line) | Status |
|---|---|---|
| [E001](epics/E001-2026-07-15-site-rebuild/PLAN.md) | Consolidate to one Astro app + one domain; funnel → `/lp` behind Access; cutover without downtime; freeze `master`. **Plumbing only.** | planned |
| [E002](epics/E002-2026-07-28-status-report/PLAN.md) | Versioned status-report content system **+ the v0.2 article**: report homepage, `DecisionRecord`, `updates` collection, `/versions`, standing pages. **The portfolio.** | planned |

### Stream 2 — Product: minimal, open hardware (app repo)

| Epic | Scope | Status |
|---|---|---|
| P01 | Bootstrap / structure the product monorepo (shared types) per `research/architecture/REPO-ARCHITECTURE.md`. | app repo |
| P02 | **W2 sensor module** — RP2040-Tiny + VL53L0X, USB-serial firmware (`research/architecture/FIRMWARE-SPEC.md`). | **being built now** |

### Stream 3 — Product: data + algorithm (app repo — this is the MVP)

| Epic | Scope | Status |
|---|---|---|
| P03 | Sensor-daemon + **30 days of the owner's own data** (desk height + input activity). Measure before building. | app repo |
| P04 | **Notification / motivation algorithm** — state machine per `research/algorithm/NOTIFICATION-ALGORITHM.md`. The real value. | app repo |
| P05 | Desktop (Electron tray) app — surfaces notifications + sit/stand stats. | app repo |

### Stream 4 — Validation (vision, not an epic yet)

| Item | Scope | Status |
|---|---|---|
| V01 | Behavioral/UX research: which messages & gamification keep the user from switching it off. Feeds P04. | vision / backlog |

## Critical path

- **Portfolio (E001 → E002) is independent of the product** — it is about past work + current
  direction, so it can proceed now. This is the active stream.
- **Product:** P01 → P02 (hardware) ‖ P03 (daemon) → **P04 (algorithm; needs P03's data)** → P05.
- The article (E002) *references* P02 ("being built now") but does not depend on it.

## Architecture impact (this repo)

`.plan/ARCH.md` will change under E001 (two-branch two-site topology → one app, one domain;
CI collapses to one job) and E002 (a new content pipeline: `updates` collection + MDX). ADR
candidates: *"consolidate to one branch, freeze `master`"* (E001) and *"the algorithm is the
product; hardware stays minimal and open"* (program-level; may live in the app repo's ADRs).
