# Website Content Migration Map

This map separates the historical v0.1 material from the current v0.2 direction. The goal is to preserve the original work without presenting archived experiments as the current product.

## Recommended public information architecture

| Page or article | Role | Source material | Status |
|---|---|---|---|
| `/` | Current project status and short explanation of the problem | `research/vision/MISSION.md`, `astro/src/data/project-status.ts` | Keep as the front door |
| `/versions` | Chronological index of versions and decisions | `legacy/index.html`, `project-status.ts`, update frontmatter | Expand with v0.1, v0.1.1 and v0.2 |
| `v0.1 — The First Smart Desk Prototype` | Historical build report and postmortem | `legacy/index.html`, `legacy/notes/article-draft.md`, `legacy/notes/voice-stream.md` | Add; first article |
| `What v0.1 Taught Me` | Decision record about over-engineering and behaviour | `legacy/notes/article-draft.md`, `.cursor/vision/0001-NOTE-init.md` | Keep the relevant parts of the v0.2 update or split later |
| `v0.2 — The Reduced Sensor Direction` | Current product and architecture decision | `2026-07-15-status-update-v0-2.mdx`, `research/hardware-v2-spec.md` | Revise existing article |
| `/hardware` | Current hardware status, not a historical gallery | `research/hardware-v2-spec.md`, `research/hardware-v2-pcb-commission-brief.md` | Expand with links and evidence |
| `From Prototype to PCB` | Why the carrier PCB exists and what must be validated | `research/hardware-v2-pcb-commission-brief.md` | Add when the review/order status is confirmed |
| `PCB v0.1 — Build Report` | Actual fabrication, assembly and test results | PCB order, measurements, test notes and photos | Add only after fabrication |
| `The Behaviour Loop` | Product hypothesis: height signal + presence + calm UX | `research/algorithm/NOTIFICATION-ALGORITHM.md`, `research/vision/MISSION.md` | Add after the v0.2 article |
| `Architecture: From Smart Home Ecosystem to Local MVP` | Archived alternative architecture | `legacy/notes/voice-stream.md`, `.cursor/vision/0001-NOTE-init.md` | Add later and label as parked |
| `/hardware/v1` or v0.1 article appendix | BOM, wiring, enclosure files and historical images | legacy BOM and `legacy/enclosure/v1/` | Migrate as an appendix, not as current hardware |

## Content from the legacy page

| Legacy section | Destination | Editorial treatment |
|---|---|---|
| Mission and sedentary-work problem | `/` and `/about` | Rewrite once; remove duplication |
| RPi4 + relay board + PIR + laser | v0.1 article | Mark as archived hardware |
| RPi0 and smaller power supply | v0.1.1 entry in `/versions` | Explain this was a small revision of v0.1 |
| Controller / control unit | v0.1 article | Clarify that it was integrated and enabled physical position changes |
| User panel: buttons and display | v0.1 article | Explain its function and its limited relevance to the behaviour hypothesis |
| Wiring images | v0.1 article | Add captions and a safety note because the old assembly involved mains motor wiring |
| Web interface | v0.1 article or software appendix | Present as an experiment, not as the current MoveUp app |
| Problems with heat, relays and PIR | v0.1 postmortem | Keep concrete examples and consequences |
| Open HSP / GPL text | `/licensing` | Reconcile with actual repository licences before making a definitive claim |
| Discord / join-us CTA | `/about` or footer | Add only if the invite is still valid and actively maintained |
| Long-term smart-home and MQTT vision | parked architecture article | Do not mix it into the current v0.2 MVP description |

## Version labels

- **v0.1** — integrated prototype: desk control, height measurement, presence sensing, software interface and physical controller.
- **v0.1.1** — a small hardware revision that replaced the original power supply with a smaller one.
- **v0.2** — reduced sensor direction: RP2040-Zero + VL53L0X over USB, with the computer owning the decision loop.
- **Physical alpha** — planned carrier PCB and enclosure based on measured components; not yet a shipped product.

The controller should not be described as a failed or unintegrated component. It was integrated. The more useful distinction is that it proved the system could change desk position, while the project still had not proved that the overall experience changed the user's habits.

## Editorial rules

1. Historical hardware and current hardware must never appear in the same component list without a version label.
2. A working mechanism is evidence of technical feasibility, not evidence of behaviour change.
3. Use measured numbers only when the measurement method, sample and limitations are known.
4. Treat MQTT, Home Assistant, gamification and the open standard as explored or planned directions unless the current implementation proves them.
5. Treat the PCB commission brief as a specification. The fabrication article needs order data, board files, measurements and test results.
6. Keep the current site in English, but retain Polish source notes in the repository as editorial source material.
