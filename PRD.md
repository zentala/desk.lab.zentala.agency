# PRD — Open Smart Desk

## TL;DR

A non-annoying habit system that knows when you've been sitting too long
and actually knows if you stood up afterwards. Hardware sensor + Electron tray app.
Open source. Mission: change sedentary habits at scale.

---

## Problem

Height-adjustable desks were supposed to fix sedentary work. They didn't.
Most sit unused — raised once, forgotten forever.

**Root cause: the problem is psychological, not mechanical.**

Existing solutions fail because they try to force behavior:
- Auto-raise desks → users disable after a week (annoying, removes agency)
- Timer apps (Stretchly, Stand Up!) → ignored after days (notification fatigue)
- Smartwatch reminders → same pattern

None of them know if you actually stood up. They're blind to your response.
We're not.

---

## Solution

A nudge system — not automation. The desk raises when **you** press the button.
We motivate you to press it through context-aware, non-annoying notifications
and Duolingo-style habit mechanics.

**Key differentiator:** we know if you actually stood up (laser sensor measures
desk height). Every other reminder app is blind to whether you acted.

---

## Target Users

### Primary: Remote developer
- Works from home, owns a motorized desk
- Technical enough to install and configure
- Cares about ergonomics, not just reminded by doctor once a year

### Secondary: Coworking user
- No permanent desk — device travels with them
- Clips to any desk, calibrates in seconds
- Data is personal, never shared with coworking space

### Non-target (for now)
- Office employees (fear of employer surveillance — only viable with BYOD + privacy guarantee)
- People without motorized desks (software-only mode still useful but core value is diminished)

---

## Architecture

```
RP2040-Tiny + VL53L0X
      │ USB Serial (JSON Lines)
      ▼
[sensor-daemon]                    ← owns the USB port exclusively
  - reads height from laser (1Hz)
  - appends to desk.log CSV        ← crash-safe, flush every line
  - serves WebSocket ws://localhost:3847
  - starts with OS (autostart)
  - never crashes (minimal deps)
      │ WebSocket (localhost)
      ▼
[Electron tray app]                ← can crash freely, daemon doesn't care
  - connects to WS on startup
  - reads OS mouse/keyboard events (presence detection)
  - runs notification state machine
  - sends OS-native notifications
  - shows timeline in tray popup
```

### Two data sources

| Signal | Source | Tells us |
|---|---|---|
| Desk height (mm) | VL53L0X laser via sensor-daemon | sitting / standing |
| Mouse + keyboard events | OS-level listener in Electron app | present / away |

### Two modes

| Mode | What works | What's missing |
|---|---|---|
| Hardware mode | Full: height + presence | Nothing |
| Software-only | Presence only (no height) | Don't know if actually standing |

---

## Hardware

| Component | Model | Price | Source |
|---|---|---|---|
| Microcontroller | Waveshare RP2040-Tiny + USB adapter | ~20 PLN | AliExpress |
| Laser sensor | VL53L0X (ToF, I2C, up to 2m) | ~20 PLN | AliExpress |
| PCB | Custom black PCB (to be designed) | TBD | JLCPCB |
| Enclosure | Smoked graphite plexi, laser cut | ~20 PLN | Local |

**Total BOM: ~60–80 PLN**

Portable. Clips to any desk. USB-powered from host computer.

---

## Notification Algorithm

See full state machine: [research/algorithm/NOTIFICATION-ALGORITHM.md](research/algorithm/NOTIFICATION-ALGORITHM.md)

**States:** AWAY → SITTING → SITTING_ALERT → SITTING_SNOOZED → STANDING

**Key rules:**
- Away time does NOT count as sitting (pauses timer)
- 2 minutes of standing resets the clock
- Max 3 notifications per sitting session — then gives up quietly, never nags forever
- No notification when away, standing, or outside working hours
- Positive copy: "Time for your standing session" not "You've been sitting 2 hours!!"

---

## Gamification (Duolingo-style) — Phase 2

Not in MVP. Added after first 100 active users.

- Daily streaks (consecutive days with 30+ min standing)
- XP for each standing session
- Milestone celebrations
- Streak protection mechanic
- Weekly trend: are you improving?
- End-of-day summary notification

Philosophy: celebrate what you did, never punish what you didn't.

---

## Data & Privacy

- All data stored **locally** — `~/.smart-desk/desk.log` (CSV)
- No account, no cloud, no server
- Opt-in anonymous aggregate upload (for research) — explicit consent only
- Sensor-daemon logs continuously and crash-safely (append + flush per line)
- User can export own data as CSV/JSON anytime

---

## MVP Scope

### In MVP
- [x] Sensor-daemon: USB Serial reader + CSV logger + WebSocket server
- [ ] Electron tray app: WS client + mouse/keyboard listener + state machine + OS notification
- [ ] Two modes: hardware (with sensor) and software-only (without)
- [ ] Sitting/standing timeline: today's view in tray popup
- [ ] One config: sitting threshold (default 45 min), working hours

### NOT in MVP
- Streaks / XP / gamification
- History database (CSV log is enough)
- Smartwatch integration
- Calendar integration (meeting detection)
- Multi-desk support
- Auto-calibration
- Manufacturer API
- Any server/cloud component

---

## Success Metrics

### MVP (first 30 days after release)
- 20+ GitHub stars in first week
- 5+ people actively using it daily
- Own data: measurable increase in standing time vs. baseline

### Phase 2 (3–6 months)
- 100+ active users (weekly active)
- Average standing time: users stand 2x more than before app adoption
- Retention: 40%+ still active after 30 days

### Phase 3 (1–2 years)
- First manufacturer partnership conversation
- Academic study in progress (PW or similar)
- 500+ active users providing aggregate data

---

## What We Are NOT Building

- An auto-raise desk controller (removes user agency → users disable it)
- An employer surveillance tool (employees won't use it)
- A medical device (we are not doctors, no clinical claims)
- A replacement for ergonomic consultation
- A mobile app (desktop tray is the right UX for this)

---

## Long-term Vision

Smart Desk → Smart Move (full-day activity coaching) → AI health companion
that knows your physical state throughout the day and genuinely helps you
take care of yourself.

Business model: open source software + OEM sensor module sold per-unit to
desk manufacturers. See [research/vision/ECOSYSTEM.md](research/vision/ECOSYSTEM.md).

Full vision: [research/vision/LONG-TERM-VISION.md](research/vision/LONG-TERM-VISION.md)

---

## Open Questions

- [ ] Notification copy — final wording (needs native English speaker review)
- [ ] Sitting threshold default: 45 min or configurable from first launch?
- [ ] Software-only mode: show "posture unknown" or just track active time?
- [ ] CSV format: one row per second or one row per state change?
- [ ] Autostart: Task Scheduler (Windows) + systemd (Linux) + LaunchAgent (macOS)?
- [ ] WebSocket port: 3847 — any conflicts? Should it be configurable?
