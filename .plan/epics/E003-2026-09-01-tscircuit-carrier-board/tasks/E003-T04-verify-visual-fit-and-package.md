---
id: E003-T04
title: Verify visual fit and assemble review package
status: in-progress
priority: high
effort: medium
type: docs
dependencies: [E003-T03]
tags: [hardware, review, visual-verification]
epic: E003
commit: "docs(hardware): add carrier board review package"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T04: Verify visual fit and assemble review package

## Objective

Make the candidate board visually and mechanically reviewable against the
physical modules, then assemble the complete reviewer-facing artefact set.

## Acceptance criteria

- [ ] Each module has an annotated photo-to-footprint comparison at matching scale.
- [ ] Pin labels, pad count/pitch, USB direction and sensor optical opening pass
      the visual-fit checklist.
- [ ] All evidence, source renders, outputs, assumptions and questions follow
      `reports/2026-09-01-review-pack-spec.md`.
- [ ] The package contains no secrets, credentials or irrelevant private data.

## Tests

- Independent visual inspection by a person who did not create the comparison.
- Review-pack completeness checklist.

## Implementation note

The review package includes `visual-fit-checklist.md`, evidence templates,
mechanical constraints, source context, generated A–D proofs and the export
manifest. `review-portal/visual-fit.html` provides the photo/render comparison;
scale-accurate fit checks remain pending until ruler/caliper evidence exists.
