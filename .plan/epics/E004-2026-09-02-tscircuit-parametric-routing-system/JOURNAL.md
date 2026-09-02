# E004 journal

## 2026-09-02 — architecture planning

The owner requested a reusable implementation system after observing that
Variants B–D contain footprints but no visible copper routing. Current E003
source confirms that A uses hand-authored `pcbPath` traces while B/C/D render
review notes in place of PCB traces. The new epic therefore separates evidence,
components, variant configuration, netlist, placement, routing and verification.

The plan chooses composition and typed configuration over inheritance, a
canonical netlist before traces, and constrained autorouting with explicit
critical-net locks. E003 remains the baseline and is not rewritten during this
planning session. Implementation starts in a new session from `HANDOFF.md`.

Known constraints carried forward: received-board geometry is provisional,
support-part sourcing is incomplete, tscircuit autorouting must be evaluated
against the pinned toolchain, and qualified external review remains mandatory
before fabrication.

## 2026-09-02 — architecture hardening review

The owner accepted the composition/netlist/routing direction and requested
additional architectural improvements. ADR-009 through ADR-011 now add a pure
functional core with edge adapters, typed physical units with named datums, and
a versioned resolved-design contract with computed maturity gates. The existing
tasks were tightened rather than expanded: T02 owns dependency boundaries, T03
owns runtime/schema validation, T07 owns units/datums, T12 owns maturity, and
T13/T14 own semantic design diffs and compatibility checks.

The review also corrected the non-canonical `refactor` task type in T04 and T10
to `improvement`. No implementation code was changed in this planning session.
