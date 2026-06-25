# Repository Architecture — Smart Desk App (rewrite)

## Principles

- TypeScript everywhere
- Monorepo: firmware + app + shared types in one place
- Clean separation: sensor layer / logic layer / UI layer
- Local-first: all data stays on user's machine by default
- Two modes work independently: software-only and hardware

---

## Repository structure

```
smart-desk/
│
├── packages/
│   ├── firmware/              # RP2040-Tiny MicroPython firmware
│   │   ├── main.py
│   │   ├── sensors/
│   │   │   ├── vl53l0x.py    # laser distance sensor driver
│   │   │   └── vibration.py  # desk vibration sensor (presence)
│   │   └── protocol.py       # USB Serial JSON protocol
│   │
│   ├── shared/                # shared TypeScript types
│   │   ├── src/
│   │   │   ├── types.ts       # SensorReading, DeskState, UserState...
│   │   │   └── constants.ts   # defaults, thresholds
│   │   └── package.json
│   │
│   └── app/                   # Electron tray application
│       ├── src/
│       │   ├── main/          # Electron main process
│       │   │   ├── index.ts
│       │   │   ├── tray.ts    # system tray icon + menu
│       │   │   └── ipc.ts     # IPC handlers
│       │   │
│       │   ├── sensor/        # hardware abstraction
│       │   │   ├── serial.ts  # USB Serial reader (RP2040 communication)
│       │   │   ├── mock.ts    # mock sensor for dev without hardware
│       │   │   └── index.ts   # exports unified SensorStream
│       │   │
│       │   ├── activity/      # OS-level activity detection
│       │   │   ├── mouse.ts   # mouse + keyboard event listener
│       │   │   └── index.ts
│       │   │
│       │   ├── engine/        # core logic (no Electron dependency)
│       │   │   ├── state-machine.ts   # THE algorithm (see NOTIFICATION-ALGORITHM.md)
│       │   │   ├── timer.ts           # sitting/standing timers
│       │   │   └── index.ts
│       │   │
│       │   ├── notifications/ # OS notification sender
│       │   │   ├── sender.ts
│       │   │   └── copy.ts    # all notification text strings
│       │   │
│       │   ├── storage/       # local data persistence
│       │   │   ├── db.ts      # SQLite via better-sqlite3
│       │   │   └── sessions.ts # sitting/standing session records
│       │   │
│       │   └── renderer/      # tray popup UI (optional dashboard)
│       │       ├── index.html
│       │       └── timeline.ts
│       │
│       ├── package.json
│       └── electron-builder.yml
│
├── package.json               # workspace root
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Key architectural decisions

### 1. Engine is pure TypeScript, zero Electron dependency

`packages/app/src/engine/` has no imports from Electron.
It takes inputs (DeskState, UserActivity) and outputs (Notification?, StateChange).

This means:
- Engine is unit-testable without launching Electron
- Engine can run in Node.js for CLI testing
- Engine is portable if we ever move to a different shell

### 2. Two sensor modes via unified interface

```typescript
// packages/app/src/sensor/index.ts
interface SensorStream {
  on(event: 'reading', handler: (r: SensorReading) => void): void;
  start(): Promise<void>;
  stop(): void;
}

// hardware mode: reads from USB Serial
class HardwareSensor implements SensorStream { ... }

// software-only mode: returns null height (unknown posture)
class SoftwareSensor implements SensorStream { ... }
```

App detects at startup which mode to use. User can override in settings.

### 3. State machine as explicit enum + transition function

```typescript
type AppState =
  | { kind: 'AWAY' }
  | { kind: 'SITTING'; sittingMinutes: number }
  | { kind: 'STANDING'; standingMinutes: number }
  | { kind: 'SITTING_ALERT'; repeatCount: number }
  | { kind: 'SITTING_SNOOZED'; repeatCount: number };

function transition(
  state: AppState,
  event: AppEvent,
  config: Config
): { nextState: AppState; sideEffects: SideEffect[] }
```

Pure function. No side effects inside. Side effects (send notification, play sound,
update tray icon) are returned as data and executed by the caller.

### 4. Local SQLite for history

```typescript
// one row per completed sitting or standing session
interface Session {
  id: number;
  type: 'sitting' | 'standing' | 'away';
  started_at: number;  // unix timestamp
  ended_at: number;
  duration_sec: number;
}
```

No server, no cloud, no account. File lives in OS app data dir.
User can export as CSV/JSON from settings.

---

## Tech stack

| Layer | Technology | Why |
|---|---|---|
| Runtime | Electron 30+ | Cross-platform tray app, OS notifications, USB Serial |
| Language | TypeScript 5 | Type safety, shared types with firmware types |
| Package manager | pnpm | Workspaces, fast |
| USB Serial | `serialport` npm package | Mature, cross-platform |
| OS mouse/keyboard | `iohook` or Electron `powerMonitor` | Activity detection |
| Database | `better-sqlite3` | Fast, synchronous, local |
| Build | `electron-builder` | Installers for Win/Mac/Linux |
| Testing | Vitest | Fast, ESM native |
| Firmware | MicroPython | Easiest for RP2040, I2C support built-in |

---

## Development modes

### Without hardware (default for contributors)
```bash
pnpm dev          # starts with mock sensor, random height values
```

### With hardware
```bash
SENSOR_PORT=/dev/ttyUSB0 pnpm dev
```

### Firmware development
```bash
cd packages/firmware
# flash with Thonny or mpremote
mpremote connect /dev/ttyUSB0 run main.py
```

---

## First milestone (what to build in order)

1. `packages/shared` — types only, no logic
2. `packages/app/src/engine/state-machine.ts` — pure logic, write tests first
3. `packages/app/src/activity/mouse.ts` — OS activity detection
4. `packages/app/src/notifications/sender.ts` — OS notification
5. Wire it together in `main/index.ts` — working software-only mode
6. `packages/firmware/main.py` — firmware sending height readings
7. `packages/app/src/sensor/serial.ts` — USB Serial reader
8. Hardware mode works end-to-end
9. `packages/app/src/storage/` — persist sessions to SQLite
10. Tray icon + basic popup UI
