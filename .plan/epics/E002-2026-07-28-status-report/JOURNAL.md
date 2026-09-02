# E002 — Journal

Live lab notebook. Append on error/surprise/wrong-assumption **during** work, timestamped.

## 2026-07-28 — epic created

Split out of E001. E002 owns the content system + article v0.2; E001 keeps infra. Framing locked
by owner: conclusions + next steps, not a moat. Article draft not yet written (T08).

## Session 2026-07-28 (auto — session ended without done.)
- **Note**: Session ended without `done.` command. No journal was written.
- **State at exit**: see STATE.md for last known state
- **Action needed**: next session should review what happened and write proper journal

## Session 2026-09-02 — implementation

- Added the Astro MDX pipeline and validated `updates` collection with coerced dates and constrained states.
- Built the report token layer, Lucide icon map, status ledger, version timeline, evidence summary, roadmap and archive components.
- Moved the pre-order funnel to `/lp` and made `/` the evidence-led status report. The MoveUp card is explicitly unverified because its source is outside this repository.
- Added the v0.2 status update, standing pages, `/versions` and updates RSS.
- `npm run build` passed: 12 static routes generated. Root smoke check found no pricing, checkout, pre-order or Product JSON-LD.
- Follow-up review found and reused `astro/public/favicon.svg` as the existing project mark. Reworked Decision Records into larger numbered panels with field icons, and aligned version timeline markers to the divider.
- Added the content architecture report separating W1 archive, current evidence, MoveUp provenance, and a future certification/crowdfunding narrative. The meaning of any “200 people” target remains intentionally open until defined.
- Owner clarified the target: 200 upfront pre-order customers for the first product. Added this as a labelled funding hypothesis on the report, with certification, iteration, prototype and evidence rationale.
- Follow-up review confirmed `favicon.svg` is the Astro mark, not project branding. Removed it from the report header because no Smart Desk logo exists in the repository or Git history. Shifted the complete version timeline axis one pixel right so its markers remain aligned with the line.
