import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

export default function Background() {
  return (
    <Section>
      <SectionHeader
        title="Context"
        kicker="Why this matters"
        lead="Knowledge workers spend long hours seated, often forgetting to switch posture. Height-adjustable desks exist, but they rarely change behavior without a motivating system."
      />
      <div className="space-y-4 text-sm text-ink/70">
        <p>
          SmartDesk started as an R&D experiment to test whether automation plus behavioral design
          can create healthier habits. Version 0.1 confirmed the hardware can be built; the real
          challenge is a non-annoying, rewarding UX loop.
        </p>
        <p>
          The long-term vision is a standard protocol that makes desks first-class citizens of the
          smart-home ecosystem, enabling many competing UX experiments on top of the same hardware.
        </p>
      </div>
    </Section>
  );
}
