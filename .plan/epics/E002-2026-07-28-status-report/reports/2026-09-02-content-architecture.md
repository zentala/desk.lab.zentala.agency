# E002 content architecture — evidence to funding

## Editorial goal

The site should let a technically curious visitor answer five questions in order:

1. What is Open Smart Desk and what is MoveUp?
2. What exists today, and what is only a proposal?
3. What did the first prototype teach us?
4. What is the next experiment and how will it be judged?
5. Why might outside support be useful, without pretending that a product is ready?

The homepage is the short answer. The update article is the reasoning. The hardware page is the evidence register. The private `/lp` route is the future conversion surface.

## Proposed homepage blocks

### 1. Masthead — current thesis

Headline: “A desk that helps you change position.”

Explain the system in one sentence: MoveUp runs locally on the computer; a small sensor measures desk height; the person still presses the desk controls. State that this is an active project report, not a finished product page.

### 2. Current work

Keep the three-row ledger:

- MoveUp — in use, but source, supported platforms and screenshots still need an evidence record.
- Sensor and carrier board — in review; E003 renders and contract checks exist, fabrication is blocked by open electrical/mechanical review.
- Enclosure — planned; no current design should be presented as validated.

### 3. First version, archived

Import the useful W1 material from `legacy/notes/article-draft.md`, `voice-stream.md`, `postmortem.ts` and the real photos. Use four sub-blocks: what worked, what failed, what it cost, and what changed. Preserve the correction that the controller was built but unfinished/unintegrated.

### 4. Decision reversal

Show the May position (modular ecosystem, MQTT, smart-home integration) and the current position (two USB components, computer-owned UX loop) as a deliberate change of mind. The Decision Record component is the visual device for this section.

### 5. Evidence and next test

Use only sourced numbers: approximately 700 PLN / 200 USD for W1 and approximately 8% standing time in a small sample while nudging. Label both as historical context, not a product-result claim. State the next test: personal daily use with a reproducible sensor and a documented behavioural log.

### 6. Funding, later and separately labelled

This belongs after the evidence, not in the masthead. Suggested framing:

> The simplest way to reach many people may eventually be to certify the sensor board and release it as a product. In Europe, certification for a board that measures distance and may include wireless communication is a meaningful cost and engineering effort. That is why a future crowdfunding campaign could fund certification, additional sensor research, prototypes and the time needed to test them. It is not a claim that certification is complete, nor a promise of a delivery date.

Do not publish “we are collecting 200 people” until the unit is defined. Decide whether 200 means interested subscribers, first-campaign backers, or prototype users. Those are different audiences and should never share one counter.

### 7. Email interest

The report may have a quiet “follow progress” link or form, but it must not use fake scarcity, a pre-order counter, invented pricing or checkout language. If a campaign is approved later, move the stronger CTA and target explanation to `/lp` behind the planned Access gate.

## Funding narrative to validate before publication

The order should be: prototype works → evidence exposes limits → next version is smaller → certification enables distribution at scale → funding buys certification, iteration, research and prototype capacity → campaign comes only after scope and compliance are understood.

Avoid promising that funding alone will make the product available. The page must name uncertainty: final wireless choice, added sensor value, enclosure, compliance scope, manufacturing cost, fulfilment and user testing.

## Content source map

| Claim | Source | Public treatment |
| --- | --- | --- |
| W1 cost | `legacy/notes/voice-stream.md`, `stats.ts` | Historical sourced estimate |
| W1 failures | photos, notes, `postmortem.ts` | Evidence and lessons |
| E003 state | `hardware/e003-carrier/README.md`, review findings and verification report | In review, not fabrication-ready |
| Product architecture | `PRD.md`, `research/architecture/REPO-ARCHITECTURE.md` | Current intended direction |
| Mission | `research/vision/MISSION.md` | About/mission page |
| MoveUp capabilities | External source still missing | Explicit open item only |
| Funding target/cost | No approved estimate | Do not publish a number yet |

## Next content decisions

1. Confirm the exact meaning of “200 people”.
2. Decide whether the first campaign funds a certified sensor, research/prototypes, or both.
3. Produce a certification and manufacturing cost range from a scoped quote.
4. Inventory MoveUp and approve one screenshot plus supported OS wording.
5. Select and caption two or three historical W1 photos for the archive section.
