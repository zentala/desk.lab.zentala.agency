# Notification Algorithm — State Machine Design

## Philosophy first

- **Never punish** — don't send "you've been sitting 2 hours!!" with alarm urgency
- **Respect context** — don't notify when user is away, in a meeting, or already standing
- **Short stands count** — even 2 minutes of standing resets the clock
- **Away time doesn't count** — if you left the desk, sitting timer pauses
- **One nudge at a time** — never stack notifications

---

## Input signals

| Signal | Source | Values |
|---|---|---|
| `desk_height` | VL53L0X via USB Serial | millimeters (continuous) |
| `input_activity` | OS mouse + keyboard events | active / inactive |

### Derived values (computed)

| Value | How |
|---|---|
| `posture` | `desk_height > STANDING_THRESHOLD` → STANDING, else SITTING |
| `presence` | `input_activity` within last `AWAY_TIMEOUT` seconds → PRESENT, else AWAY |

---

## Configuration (user-adjustable)

```yaml
SITTING_THRESHOLD_MIN: 45        # minutes sitting before first notification
AWAY_TIMEOUT_SEC: 300            # seconds of inactivity = considered away (5 min)
STANDING_RESET_MIN: 2            # minutes standing to fully reset sitting timer
SNOOZE_DURATION_MIN: 10          # minutes before repeating notification after no action
MAX_REPEATS: 3                   # max repeated notifications per sitting session
STANDING_HEIGHT_MM: 950          # desk height threshold for standing (calibrated per user)
WORKING_HOURS_START: "08:00"     # no notifications outside working hours
WORKING_HOURS_END: "20:00"
```

---

## States

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   AWAY ◄──────────────────────────────────────────┐    │
│    │                                              │    │
│    │ input_activity detected                      │    │
│    ▼                                              │    │
│  ┌─────────────────────────────────┐             │    │
│  │         PRESENT                 │             │    │
│  │                                 │  no input   │    │
│  │  ┌──────────┐  ┌─────────────┐  │  > 5 min    │    │
│  │  │ STANDING │  │   SITTING   │  ├─────────────┘    │
│  │  │          │  │             │  │                   │
│  │  │ timer    │  │ timer runs  │  │                   │
│  │  │ paused   │  │             │  │                   │
│  │  └────┬─────┘  └──────┬──────┘  │                   │
│  │       │  desk down    │         │                   │
│  │       └───────────────┘         │                   │
│  │       desk up                   │                   │
│  │                                 │                   │
│  │  ┌──────────────────────────┐   │                   │
│  │  │      SITTING_ALERT       │   │                   │
│  │  │  (timer >= threshold)    │   │                   │
│  │  └──────────────────────────┘   │                   │
│  │                                 │                   │
│  │  ┌──────────────────────────┐   │                   │
│  │  │     SITTING_SNOOZED      │   │                   │
│  │  │  (notified, no action)   │   │                   │
│  │  └──────────────────────────┘   │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## State definitions

### AWAY
- **Condition**: no mouse/keyboard input for > `AWAY_TIMEOUT_SEC`
- **Sitting timer**: PAUSED (away time does not count as sitting)
- **On enter**: nothing
- **On exit** (→ PRESENT): resume timer from where it paused

### SITTING
- **Condition**: PRESENT + `desk_height < STANDING_HEIGHT_MM`
- **Sitting timer**: RUNNING
- **On timer >= `SITTING_THRESHOLD_MIN`**: → SITTING_ALERT

### STANDING
- **Condition**: PRESENT + `desk_height >= STANDING_HEIGHT_MM`
- **Sitting timer**: RESET after `STANDING_RESET_MIN` of continuous standing
- **On enter**: if coming from SITTING_ALERT → trigger celebration
- **Note**: even 2 minutes counts — short stands are valid

### SITTING_ALERT
- **Condition**: SITTING + timer >= threshold
- **Action on enter**: send notification (see copy below)
- **Transitions**:
  - desk raises → STANDING (celebrate!)
  - no action after `SNOOZE_DURATION_MIN` → SITTING_SNOOZED
  - input goes away → AWAY (timer paused, alert cancelled)

### SITTING_SNOOZED
- **Condition**: SITTING_ALERT + no action after snooze duration
- **Action on enter**: send gentler follow-up notification
- **Transitions**:
  - desk raises → STANDING (still celebrate, better late than never)
  - no action after `SNOOZE_DURATION_MIN` again AND repeats < `MAX_REPEATS` → send again
  - repeats >= `MAX_REPEATS` → back to SITTING, reset timer (don't nag forever)
  - input goes away → AWAY

---

## Transition table

| From | Event | To | Action |
|---|---|---|---|
| AWAY | input detected | SITTING or STANDING | resume timer |
| SITTING | no input > 5min | AWAY | pause timer |
| SITTING | desk raised | STANDING | — |
| SITTING | timer >= threshold | SITTING_ALERT | send notification |
| SITTING_ALERT | desk raised | STANDING | celebrate |
| SITTING_ALERT | no action > snooze | SITTING_SNOOZED | send follow-up |
| SITTING_ALERT | no input | AWAY | cancel alert, pause |
| SITTING_SNOOZED | desk raised | STANDING | celebrate (late!) |
| SITTING_SNOOZED | no action > snooze, repeats < max | SITTING_SNOOZED | send again |
| SITTING_SNOOZED | repeats >= max | SITTING | reset timer, give up quietly |
| SITTING_SNOOZED | no input | AWAY | cancel, pause |
| STANDING | desk lowered | SITTING | — |
| STANDING | standing >= reset_min | SITTING | timer = 0 |
| STANDING | no input > 5min | AWAY | — |

---

## Notification copy

### First alert (SITTING → SITTING_ALERT)
```
Title: Time to stand 🙂
Body: You've been sitting for 45 minutes. Your streak is waiting.
Action: [Stand now] [Remind me in 10 min]
```

### Follow-up (SITTING_SNOOZED)
```
Title: Still here?
Body: No rush — but standing for just 2 minutes counts.
```

### Final (max repeats reached — silent)
No notification. Just reset. Never punish.

### Celebration (→ STANDING after alert)
```
Title: Nice! 🎉
Body: Standing session started. Keep it going.
```

### Streak notification (end of day, optional)
```
Title: Good day!
Body: You stood 4 times today. 3-day streak 🔥
```

---

## Edge cases

### Meeting detection (v2 — not in MVP)
- Long period of no keyboard but mouse moves occasionally = possibly in meeting
- Heuristic: no keyboard for 20+ min but mouse active = suppress notifications
- Proper solution: calendar integration (later)

### Short stands (< 2 min)
- Standing for 30 seconds to grab coffee does NOT reset the timer
- Only continuous standing >= `STANDING_RESET_MIN` resets fully
- Partial credit: each minute of standing reduces sitting timer by 1.5x (optional)

### No hardware (software-only mode)
- `desk_height` signal unavailable
- Assume SITTING always (user must manually mark "I stood up" or it's pure timer)
- Notification copy changes: "Take a standing break?" instead of "Time to stand"

### Night mode / outside working hours
- No notifications outside `WORKING_HOURS_START` → `WORKING_HOURS_END`
- Timer still runs (for timeline display) but no alerts sent

---

## What this does NOT do (by design)

- Does not auto-raise the desk
- Does not punish for sitting (no angry copy, no red UI)
- Does not notify more than `MAX_REPEATS` times per sitting session
- Does not notify when user is away
- Does not care about your total daily sitting — only current continuous session
