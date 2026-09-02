---
id: E003-T24
title: Freeze compact board envelope and mounting contract
status: pending
priority: critical
effort: medium
type: improvement
dependencies: [E003-T14]
tags: [hardware, mechanics, mounting, adhesive]
epic: E003
commit: "docs(hardware): define compact carrier mechanical contract"
created: 2026-09-02
---
# E003-T24: Freeze compact board envelope and mounting contract

## Objective

Turn the frameless direction into measurable constraints shared by all
variants. Decide where the board edge, tape, solder tails, connectors and
optional service hardware may exist.

## Acceptance criteria

- [ ] A mechanical table records each module envelope, datum, connector
      keep-out, optical keep-out, edge margin and board thickness assumption.
- [ ] The default outline has no decorative frame and is derived from the
      union of component/access envelopes plus manufacturing margin.
- [ ] Underside adhesive clearance is checked for copper, solder tails and
      protruding components.
- [ ] Direct soldering and low-profile removable mounting are compared for
      height, area, replacement effort and cable strain.
- [ ] The narrow-frame fallback has an explicit trigger and does not become a
      silent enlargement of the default design.

## Tests

- Dimensioned 1:1 layout and underside clearance drawing.
- Mechanical review checklist covering tape peel, cable pull and service access.
