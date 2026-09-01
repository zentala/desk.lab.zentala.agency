# ADR-002: Require external review before PCB fabrication

- Status: accepted
- Date: 2026-09-01

## Context

The Hardware v2 carrier board will be created through an AI-assisted TS Circuit
workflow. The board is electrically simple, but errors in module pinout, voltage
levels, mechanical fit, USB loading, I2C wiring, or manufacturing output can make
even a simple board fail. The owner does not want to rely on manual self-review
as the sole quality gate.

## Decision

Treat the TS Circuit output as a candidate for review. Before fabrication, obtain
feedback from a qualified electronics professional, firm, or appropriately
experienced community reviewer. Publish the complete context in an internal
review portal, preferably `board.desk.zentala.internal`, and provide a static
export for reviewers who cannot reach it.

The review pack must contain the product goal, architecture, exact component
details, measurements/photos, schematic, PCB render, source, exports, design
prompt/context, known assumptions, and explicit review questions.

## Consequences

Positive:

- the reviewer receives sufficient context to assess the design efficiently;
- AI remains useful for speed and documentation without being treated as the
  accountable engineering authority;
- feedback becomes reusable project knowledge instead of disappearing in a chat.

Trade-offs:

- review introduces cost or outreach time before a prototype can be ordered;
- the portal and static review pack become an additional product-documentation
  surface to maintain;
- feedback may require revising the TS Circuit design and repeating the review.

## Alternatives considered

- **Self-review before fabrication:** fastest, but insufficiently robust for a
  physical device intended to operate continuously under users' desks.
- **Outsource the entire board:** transfers more responsibility, but loses the
  owner-controlled AI-assisted design workflow and its transparent context.
