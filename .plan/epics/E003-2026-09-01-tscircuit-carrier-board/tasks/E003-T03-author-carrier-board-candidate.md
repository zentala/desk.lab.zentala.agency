---
id: E003-T03
title: Author AI-assisted carrier board candidate
status: in-progress
priority: high
effort: large
type: feature
dependencies: [E003-T01, E003-T02]
tags: [hardware, tscircuit, pcb]
epic: E003
commit: "feat(hardware): add carrier board candidate"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T03: Author AI-assisted carrier board candidate

## Objective

Create a TS Circuit carrier-board candidate that connects the verified modules
without loose wiring and records every design assumption for human review.

## Acceptance criteria

- [ ] Power, ground, SDA and SCL follow the verified pin truth table.
- [ ] Module orientation, USB clearance, sensor optical path and mounting are
      represented as explicit mechanical constraints.
- [ ] Source produces the previews and exports proven in E003-T02.
- [ ] The design prompt, tool version and assumptions are stored beside source.

## Tests

- Static design review against the E003-T01 truth table.
- Generated-artifact check using the E003-T02 manifest.

## Implementation note

`hardware/e003-carrier/src/carrier.tsx` is the versioned candidate. It uses
standard pin-row placeholders so it can render, while naming both footprints as
pending and preventing accidental fabrication before T01 evidence is complete.
