---
id: E003-T05
title: Publish carrier board review portal
status: in-progress
priority: medium
effort: medium
type: feature
dependencies: [E003-T04]
tags: [hardware, portal, documentation]
epic: E003
commit: "feat(board): publish review portal"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T05: Publish carrier board review portal

## Objective

Publish the review pack at the preferred internal hostname
`board.desk.zentala.internal` and create a portable static export for external
reviewers.

## Acceptance criteria

- [ ] All seven portal sections from the review-pack specification are present.
- [ ] Images, renders and documents are readable without private tool access.
- [ ] A static export can be sent to an external reviewer.
- [ ] The portal exposes no secrets and makes no claims of professional approval.

## Tests

- Open the portal in a clean browser profile.
- Open the static export from a separate local directory.

## Implementation note

`hardware/e003-carrier/review-portal/index.html` is a self-contained seven-
section static export with relative links to the evidence, design, manifest,
generated proofs, checklist and finding register. It makes no approval claim.
