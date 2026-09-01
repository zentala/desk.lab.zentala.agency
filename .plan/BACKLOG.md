# Backlog

## Program map

- [ROADMAP.md](ROADMAP.md) — the whole program: streams, critical path, the two homes.

## Epics

- [E001 — Site rebuild: consolidation + funnel/infra plumbing + cutover](epics/E001-2026-07-15-site-rebuild/PLAN.md) — planned, approved; infra scope after the 2026-07-28 split.
- [E002 — Versioned status-report content system + article v0.2](epics/E002-2026-07-28-status-report/PLAN.md) — planned; the portfolio/article half of the old E001.
- [E003 — TS Circuit carrier board for Hardware v2](epics/E003-2026-09-01-tscircuit-carrier-board/PLAN.md) — in progress; candidate source and review portal exist, physical evidence and external review are pending.

## Active

- Finish cleanup after separating the repository into explicit legacy and active website tracks.
- Move or rewrite legacy root documentation so it does not describe the Astro app.
- Confirm the real deployment state of `desk.zentala.io`.
- Define a temporary preview deployment for Astro, likely `dev.` or `demo.`.
- Replace the placeholder waitlist implementation with a real integration.
- Add tests and a basic DX pipeline for `astro/`.

## Notes

- Keep the old website as migration input or archive material unless a later decision says otherwise.
- Do not delete legacy assets before the new information architecture is stable.

## 2026-09-01 — Hardware v3 sensor and haptic variants

Build follow-on Open Smart Desk PCB variants from JLCPCB-available parts after
the E003 carrier-board review is complete. These variants should remain
compatible with the same desktop application and USB data model where practical:

- **Presence/vibration experiment:** add a vibration or accelerometer sensor and
  test the hypothesis that desk vibration can help distinguish a person actively
  working at the desk from an empty desk. Treat this as an experiment, not a
  product assumption: compare it with keyboard/mouse activity and test false
  positives from desk motors, typing, floor movement and nearby equipment.
- **Haptic feedback experiment:** add a small vibration motor/actuator to test
  whether a local physical nudge helps a user change posture. Define intensity,
  duration, opt-out behaviour and noise/comfort constraints before productizing.
- **Button-panel board:** design a separate board for desk-facing controls such
  as up/down buttons and related user input. Clarify later whether it observes
  controls only or integrates with a particular desk controller; do not assume
  mains or motor-control scope.
- **Reusable board family:** retain a common USB protocol, firmware/application
  compatibility, manufacturing documentation and review-portal structure so the
  simple carrier board, extended sensor board and button panel can evolve as one
  product family.

Before promoting any item to an epic, choose the exact sensors/actuator,
validate voltage/current requirements, confirm JLCPCB availability and assembly
constraints, and obtain an external electronics review.
