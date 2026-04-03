import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const modules = [
  'Motor Control',
  'Height Sensing',
  'Presence Sensing',
  'Physical Controls',
  'Decision Engine',
  'Smart-Home Hub',
];

export default function Architecture() {
  return (
    <Section>
      <SectionHeader
        title="Architecture"
        kicker="Modular core"
        lead="The system should be modular and vendor-agnostic. Each function is a replaceable building block connected through a shared protocol."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module}
            className="rounded-2xl border border-ink/10 bg-white px-4 py-5 text-sm font-semibold shadow-soft"
          >
            {module}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
        <h3 className="text-xl">Protocol First</h3>
        <ul className="mt-4 space-y-2 text-sm text-ink/70">
          <li>Universal communication protocol enables interchangeable modules.</li>
          <li>mDNS / DNS-SD discovery for plug-and-play desks (`desk.local`).</li>
          <li>Standardization makes desks native smart-home devices.</li>
        </ul>
      </div>
    </Section>
  );
}
