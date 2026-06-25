# Product Roadmap

## Philosophy: ship small, learn fast, never stop

No big launches. No "v2 will fix everything."
Continuous shipping, continuous learning from real users.

---

## Stage 0 — Prototype (done)
- [x] Working prototype on creator's own desk
- [x] VL53L0X height detection
- [x] Mouse/keyboard presence detection
- [x] Electron tray app with OS notifications
- [x] Loose experimental codebase (not for others yet)

---

## Stage 1 — MVP Release (next)

**Goal: first external users, first feedback**

### Hardware v2
- [ ] RP2040-Tiny + VL53L0X on black PCB
- [ ] Smoked graphite plexi enclosure (laser cut)
- [ ] USB connection to computer
- [ ] Portable — clips/attaches to any desk
- [ ] Presence detection via **desk vibration sensor** (no computer needed)
  - Vibrations from typing/mouse = someone present
  - Flat readings = nobody at desk
  - Works independently of PC

### Software v1 (rewrite from scratch)
- [ ] Electron tray app (TypeScript, clean codebase)
- [ ] Two modes:
  - **Software-only**: mouse + keyboard tracking (no hardware needed)
  - **Hardware mode**: + VL53L0X height data via USB Serial
- [ ] Notification algorithm v1 (state machine, designed before coding)
- [ ] Sitting/standing timeline (visual, today's view)
- [ ] Minimal config: threshold time, working hours

### What's NOT in Stage 1
- No streaks/XP/gamification
- No history database
- No smartwatch integration
- No multi-desk support
- No manufacturer API

### Release
- GitHub release with binaries (Windows + Linux + macOS)
- Post to: r/StandingDesk, r/selfhosted, Home Assistant Community
- **Validation signal**: 20+ GitHub stars in first week

---

## Stage 2 — Habit Engine (~100 active users)

**Goal: make the app sticky, prove behavior change**

### Gamification (Duolingo-style)
- [ ] Daily streaks (consecutive days with 30+ min standing)
- [ ] XP for standing sessions
- [ ] Levels and milestones
- [ ] Streak protection mechanic
- [ ] Positive notification copy (celebrate, don't punish)

### Adaptive algorithm v2
- [ ] Learns user patterns (when they usually stand)
- [ ] Adjusts notification timing per user
- [ ] Detects meeting mode (no keyboard bursts = probably in call)
- [ ] AI-assisted interpretation of sensor data

### Data layer
- [ ] Local SQLite history (user-owned, never uploaded)
- [ ] Weekly/monthly trend view
- [ ] Export own data (CSV/JSON)

### Independent controller
- [ ] Physical panel independent of PC
- [ ] Small display (height, session time)
- [ ] Buttons: UP, DOWN, MEM1, MEM2
- [ ] Works without computer connected

---

## Stage 3 — Manufacturer Outreach (~500 users + behavior data)

**Goal: first manufacturer partnership**

### Evidence package for manufacturers
- [ ] Anonymized aggregate data: avg standing time before/after app adoption
- [ ] Academic study (partner with PW or similar — ergonomics dept.)
- [ ] Case studies from real users
- [ ] "Users of Open Smart Desk stand X hours/day vs Y without it"

### Open Smart Desk Standard v0.1
- [ ] Published open specification (API for desk communication)
- [ ] Reference implementation
- [ ] Certification criteria

### Manufacturer conversations
- [ ] Identify 5 target manufacturers (FlexiSpot, Linak, local EU brands)
- [ ] Approach with value proposition + data
- [ ] First "Open Smart Desk Compatible" partnership

---

## Stage 4 — Smart Move (~5 manufacturers, ~2000 users)

**Goal: expand beyond the desk**

- [ ] Smart Move app: full-day activity coaching
- [ ] Smartwatch integration (Apple Watch, Garmin, Wear OS)
- [ ] Steps + movement + desk data unified in one timeline
- [ ] Personalized activity progression (meets you where you are)
- [ ] Same philosophy as Smart Desk: nudge, not force

---

## Stage 5 — Standard & Scale

**Goal: Open Smart Desk Standard becomes market default**

- [ ] 5-10 manufacturers certified
- [ ] Standard pre-installed or offered as option on new desks
- [ ] EU grant / health program funding for research + expansion
- [ ] Open Smart Desk Consortium (formal structure)
- [ ] 70% of new height-adjustable desks ship with compatible interface

---

## Key decisions to make (before Stage 1)

1. **Notification algorithm** — design as state machine (most critical)
2. **USB Serial vs HID** — firmware protocol for RP2040-Tiny
3. **PCB design** — layout for RP2040-Tiny + VL53L0X + vibration sensor
4. **New repo** — clean rewrite, separate from experimental code
