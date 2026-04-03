export const postmortemSummary =
  'Version 0.1 was a proof-of-concept. It worked mechanically but failed behaviorally. The project confirmed feasibility of desk digitization, yet it did not create a habit change loop. The bottleneck is UX, not hardware.';

export const postmortemBlocks = [
  {
    tone: 'success',
    title: 'Worked',
    items: [
      'Desk height control via PC/phone commands.',
      'Reliable height measurement using a laser sensor.',
      'Admin panel with basic telemetry.',
      'Legacy desks can be digitized.',
    ],
  },
  {
    tone: 'danger',
    title: 'Failed',
    items: [
      'Plexi enclosure overheated the Raspberry Pi (no airflow).',
      'Relays occasionally stuck under motor load.',
      'PIR sensor produced false signals and was hard to calibrate.',
      'Outsourced LCD/button controller never shipped.',
      'Architecture optimized for my old desk (not universal).',
    ],
  },
  {
    tone: 'learn',
    title: 'Learned',
    items: [
      'Separate modules (motor, sensing, presence, controls, decision engine).',
      'Move the “brain” to smart-home/server layer.',
      'Protocol standardization is the real product.',
      'UX research beats hardware complexity.',
    ],
  },
];
