export const reportStates = ['archived', 'in use', 'in review', 'in design', 'planned'] as const;
export type ReportState = (typeof reportStates)[number];
export type Evidence = { href?: string; label?: string; note: string };
export type Workstream = { name: string; state: ReportState; updatedAt: string; summary: string; evidence: Evidence; next: string };
export type VersionEntry = { label: string; state: ReportState; summary: string; why: string; href?: string };

export const workstreams: Workstream[] = [
  { name: 'MoveUp desktop application', state: 'in use', updatedAt: '2026-09-02', summary: 'MoveUp is the companion desktop application in active development; its repository and runnable capabilities are not part of this repo yet.', evidence: { note: 'Open item: add a source link and an approved screenshot before making feature claims.' }, next: 'Inventory the source, supported systems and the smallest demonstrable MVP.' },
  { name: 'Sensor & carrier board', state: 'in review', updatedAt: '2026-09-02', summary: 'E003 has a generated carrier-board review pack with four candidate variants and a passing local contract check.', evidence: { href: '/hardware', label: 'E003 review pack', note: 'Fabrication is still blocked by physical measurements, power characterization, routing review and external electronics review.' }, next: 'Measure the received modules and close the high-severity review findings.' },
  { name: 'Enclosure', state: 'planned', updatedAt: '2026-09-02', summary: 'No current enclosure is being presented as a product. The next enclosure must follow the measured carrier and connector geometry.', evidence: { note: 'Open item: no current prototype image or validated mechanical design.' }, next: 'Start mechanical design after the carrier dimensions and installation constraints are known.' },
];

export const versions: VersionEntry[] = [
  { label: 'v0.1', state: 'archived', summary: 'A working but over-complex proof of concept for desk control, sensing and telemetry.', why: 'It established feasibility and exposed the behavioural problem.', href: '/updates/2026-07-15-status-update-v0-2' },
  { label: 'Reduced sensor direction', state: 'in review', summary: 'Two USB components: an RP2040-Tiny carrier and a VL53L0X distance sensor; the computer owns the decision loop.', why: 'Cost and iteration speed beat reproducing desk electronics in the device.', href: '/updates/2026-07-15-status-update-v0-2' },
  { label: 'Physical alpha', state: 'planned', summary: 'A measured, reviewable carrier and an enclosure that can be installed without guesswork.', why: 'The design needs physical evidence before it can become a usable prototype.' },
];
