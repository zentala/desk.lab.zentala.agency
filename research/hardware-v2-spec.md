# Open Smart Desk — Hardware v2 Specification

## Philosophy

v2 radically simplifies v1. No Raspberry Pi, no relay board, no motor control.
The desk raises/lowers manually — the user presses the desk button themselves.
The system only detects desk height and notifies the user when they've been sitting too long.

**One job: measure height → know if sitting or standing → send notification to PC.**

---

## Bill of Materials

| Component | Model | Price | Source |
|---|---|---|---|
| Microcontroller | Waveshare RP2040-Tiny + USB Adapter Board | ~20 PLN | AliExpress |
| Laser distance sensor | VL53L0X (ToF, up to 2m) | ~20 PLN | AliExpress |
| Smoked graphite plexiglass | 3mm, laser-cut enclosure | ~20–30 PLN | Local laser cutting service |
| Black PCB | Custom (to be designed) | TBD | JLCPCB / PCBWay |
| Wiring / connectors | I2C cables, headers | ~5 PLN | AliExpress |

**Estimated total hardware cost: ~65–75 PLN (sensory ~40 PLN + obudowa + PCB)**

---

## Hardware Components

### Microcontroller: Waveshare RP2040-Tiny

- **Chip**: Raspberry Pi RP2040, dual-core ARM Cortex-M0+ @ 133 MHz
- **RAM**: 264 kB SRAM
- **Flash**: 2 MB
- **GPIO**: 20 pins
- **Dimensions**: 18 × 23.5 mm
- **USB**: via FFC flat cable + optional USB adapter daughterboard
- **Connection to PC**: USB (appears as USB-HID or USB-Serial device)
- **Product page**: https://www.waveshare.com/rp2040-tiny.htm

### Laser Distance Sensor: VL53L0X

- **Technology**: Time-of-Flight (ToF) laser ranging
- **Range**: up to 2m
- **Interface**: I2C
- **Purpose**: measures desk height (blat position) → determines sitting vs. standing
- **Mounting**: under the desk surface, pointing down toward floor

**Height detection logic:**
- Low reading (short distance to floor) = desk is low = **sitting**
- High reading (long distance to floor) = desk is raised = **standing**

---

## System Architecture

```
VL53L0X (I2C)                  OS: mouse / keyboard events
    │                                       │
    ▼                                       ▼
RP2040-Tiny ──── USB Serial ──▶  Electron App (system tray)
                                            │
                                  ┌─────────┴──────────┐
                                  │                     │
                             height data          activity data
                           (sitting/standing)    (at computer?)
                                  │                     │
                                  └─────────┬───────────┘
                                            │
                                    smart logic engine
                                            │
                                    OS notification
```

### Data sources

**1. Desk height** — from RP2040-Tiny via USB Serial
- VL53L0X measures distance from sensor to floor
- Low value → desk is down → **sitting**
- High value → desk is raised → **standing**
- Sensor mounted under desk surface

**2. User presence at computer** — from OS events (no PIR needed)
- Mouse movement detected → user is at computer
- Keyboard activity detected → user is at computer
- No activity for X minutes → user is away (no notification sent)

### Application: Electron app in system tray

- Runs in background, visible as tray icon
- Reads USB Serial from RP2040-Tiny
- Listens to OS mouse/keyboard events
- Tracks: how long sitting, how long standing, total active time
- Sends OS-native notifications when user has been sitting too long
- Notifications are non-annoying: smart timing, respects meetings/calls

---

## Enclosure

- **Material**: smoked graphite plexiglass, 3mm
- **Manufacturing**: CNC laser cut
- **Color theme**: black (PCB) + smoked grey (plexi) — matches desk aesthetics
- **v1 DXF files** (reference only, needs redesign for v2 smaller components):
  - `enclosure/v1/plexi_5mm_40x20cm.dxf`
  - `enclosure/v1/plexi_smoked_graphite_3mm_9x13.5cm.dxf`
- **v2 enclosure**: to be designed (much smaller than v1 — no relay board, no big PSU)

---

## PCB

- **Color**: black
- **Purpose**: clean wiring between RP2040-Tiny and VL53L0X, mounting points for enclosure
- **Status**: to be designed
- **Suggested fab**: JLCPCB (cheap black PCBs, ships to Poland)

---

## What v2 Does NOT Include (vs v1)

| v1 Component | Reason removed in v2 |
|---|---|
| Raspberry Pi 4 | Overkill; replaced by RP2040-Tiny |
| Waveshare Relay Board | Not needed — no motor control |
| PIR HC-SR501 | Replaced by height-based presence inference |
| Power supply EPS-35-5 | Not needed — powered via USB |
| SP2112/SP2110 connectors | Not needed — no 230V motor wiring |
| MongoDB | Not needed on microcontroller |
| nginx | Not needed |

---

## Software Interface (to be designed)

The RP2040-Tiny firmware should expose one of:
- **USB Serial** — sends height readings as JSON lines: `{"height_mm": 620, "ts": 1234567890}`
- **USB HID** — custom HID device (more complex but no driver needed on PC)

Recommended: USB Serial (simpler firmware, easier to debug).

The **desktop agent** (PC software) is responsible for:
- Reading serial data from RP2040
- Tracking sitting/standing time
- Triggering OS notifications at the right moment
- Dashboard / gamification (optional, later)

---

## Gamification — Duolingo-style Motivation Algorithms

The core differentiator. Not a dumb timer that sends the same notification every 30 minutes.
A motivation system that adapts, rewards, and builds habits — like Duolingo does for language learning.

### Key mechanics (inspired by Duolingo)

**Streaks**
- Daily standing streak: "7 days in a row you stood for 30+ minutes"
- Losing a streak hurts — creates loss aversion that motivates consistency
- Streak freeze: if you missed one day, grace period before streak breaks

**XP & Progress**
- Earn points for each standing session
- Weekly/monthly standing goals with progress bar
- Levels: Beginner → Consistent → Warrior → Ergonomic Master

**Smart notification timing**
- NOT every 30 minutes at the same time (annoying, ignored)
- Adaptive: learns your patterns (you usually stand after lunch → reinforce that)
- Respects context: no notification during detected meetings (no keyboard/mouse bursts = meeting)
- Celebration on good behavior: "You stood 3 times today already!"

**Positive reinforcement over punishment**
- Duolingo celebrated when you did the thing, not just nagged when you didn't
- Notification: not "You've been sitting for 45 minutes" but "Time for your standing session — keep your streak alive!"

**Dashboard (tray app)**
- Today's sit/stand timeline (visual bar)
- Current streak + XP
- Weekly trend: are you improving?
- Best day / personal records

---

## Open Questions

- [ ] Exact mounting position of VL53L0X (under blat vs. on desk leg)
- [ ] Calibration: how to set "sitting height" vs "standing height" thresholds
- [ ] USB Serial vs HID — firmware decision
- [ ] PCB design: trace RP2040-Tiny + VL53L0X I2C + USB connector
- [ ] Enclosure v2 DXF design (much smaller footprint than v1)
- [ ] Desktop agent: which platforms? (Linux first, then Windows/Mac?)
- [ ] Notification design: what does a non-annoying notification look like?
