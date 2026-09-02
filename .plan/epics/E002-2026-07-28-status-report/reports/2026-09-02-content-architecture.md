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

### 1. Masthead — vision

Headline: “A desk that helps you change position.”

Explain the system in one sentence: MoveUp runs locally on the computer; a small sensor measures desk height; the person still presses the desk controls. Lead with the mission and a sourced global physical-inactivity signal. `Project status` belongs to the update log, not the first screen.

### 2. Mission and problem

Use WHO’s 31% / 1.8 billion estimate and explain that the product addresses the feedback loop around an existing adjustable desk. Keep the founder voice: build universal, ergonomic, multiplatform tools that genuinely improve everyday life, without medical claims.

### 3. What changed

The timeline comes immediately after the mission. It is the narrative spine: v0.1 proof of concept → reduced two-component consumer direction → physical alpha. Keep the current reversal visible.

### 4. Pre-order rationale

Explain that the first product cannot responsibly be sold as an uncertified batch. The working model is a first pre-order round of 200 people paying upfront, so the fixed European certification and preparation costs can be distributed across enough units. Do not call this a live campaign until price, scope, compliance path, refund policy and delivery plan exist.

### 5. Product direction

Show two honest concept blocks: MoveUp and the sensor/enclosure direction. Use approved screenshots or renders when they exist; until then, render the absence of evidence as text.

### 6. Current work

Keep the three-row ledger:

- MoveUp — in use, but source, supported platforms and screenshots still need an evidence record.
- Sensor and carrier board — in review; E003 renders and contract checks exist, fabrication is blocked by open electrical/mechanical review.
- Enclosure — planned; no current design should be presented as validated.

### 7. First version, archived

Import the useful W1 material from `legacy/notes/article-draft.md`, `voice-stream.md`, `postmortem.ts` and the real photos. Use four sub-blocks: what worked, what failed, what it cost, and what changed. Preserve the correction that the controller was built but unfinished/unintegrated.

### 8. Decision reversal

Show the May position (modular ecosystem, MQTT, smart-home integration) and the current position (two USB components, computer-owned UX loop) as a deliberate change of mind. The Decision Record component is the visual device for this section.

### 9. Evidence and next test

Use only sourced numbers: approximately 700 PLN / 200 USD for W1 and approximately 8% standing time in a small sample while nudging. Label both as historical context, not a product-result claim. State the next test: personal daily use with a reproducible sensor and a documented behavioural log.

### 10. Funding, later and separately labelled

This belongs after the evidence, not in the masthead. Suggested framing:

> The simplest way to reach many people may eventually be to certify the sensor board and release it as a product. In Europe, certification for a board that measures distance and may include wireless communication is a meaningful cost and engineering effort. That is why a future crowdfunding campaign could fund certification, additional sensor research, prototypes and the time needed to test them. It is not a claim that certification is complete, nor a promise of a delivery date.

The working target is now explicitly 200 people who will pre-order the first product and pay upfront. They are not subscribers, waitlist contacts or prototype users. The target remains a commercial hypothesis until price, scope, certification path and delivery plan are defined.

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

1. Define the first pre-order unit, price assumptions and refund/delivery policy.
2. Decide whether the first campaign funds a certified sensor, research/prototypes, or both.
3. Produce a certification and manufacturing cost range from a scoped quote.
4. Inventory MoveUp and approve one screenshot plus supported OS wording.
5. Select and caption two or three historical W1 photos for the archive section.
