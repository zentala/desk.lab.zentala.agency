---
id: E003-T03
title: Author AI-assisted carrier board candidate
status: completed
priority: high
effort: large
type: feature
dependencies: []
tags: [hardware, tscircuit, pcb]
epic: E003
branch: feat/E003-T03-carrier-candidate
commit: "feat(hardware): add carrier board candidate"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: 2026-09-01
---

# E003-T03: Author AI-assisted carrier board candidate

## Objective

Create a TS Circuit carrier-board candidate that connects the verified modules
without loose wiring and records every design assumption for human review.

## Acceptance criteria

- [x] Power, ground, SDA and SCL follow the verified pin truth table.
- [x] Module orientation, USB clearance, sensor optical path and mounting are
      represented as explicit mechanical constraints.
- [x] Source produces the previews and exports proven in E003-T02.
- [x] The design prompt, tool version and assumptions are stored beside source.

## Tests

- Static design review against the E003-T01 truth table.
- Generated-artifact check using the E003-T02 manifest.

## Implementation note

`hardware/e003-carrier/src/carrier.tsx` is the versioned candidate. It uses
standard pin-row placeholders so it can render, while naming both footprints as
pending and preventing accidental fabrication before T01 evidence is complete.

The owner's 2026-09-01 waiver removed T01/T02 as hard execution dependencies
for this provisional review candidate only. Their unresolved evidence and
export limitations remain explicit fabrication gates; neither task is claimed
complete by this waiver.
