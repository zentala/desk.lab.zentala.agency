import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

export default function Behavior() {
  return (
    <Section>
      <SectionHeader
        title="Behavior System"
        kicker="UX over hardware"
        lead="The real challenge is behavioral UX. People disable annoying nudges. The system must feel helpful, not punitive."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card">
          <h3 className="text-xl">Flow Loop</h3>
          <ol className="mt-4 space-y-2 text-sm text-ink/70">
            <li>Detect prolonged sitting time.</li>
            <li>Deliver a gentle, contextual nudge.</li>
            <li>Escalate only if ignored.</li>
            <li>Reward compliance with points or streaks.</li>
            <li>Surface progress and recovery options.</li>
          </ol>
        </div>
        <div className="card">
          <h3 className="text-xl">Design Constraints</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li>Non-intrusive UX over mechanical automation.</li>
            <li>Desktop tray app beats custom hardware buttons.</li>
            <li>Personalization: timing, tone, rewards.</li>
            <li>Short-term wins before long-term behavior change.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
