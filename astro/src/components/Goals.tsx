import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

export default function Goals() {
  return (
    <Section>
      <SectionHeader
        title="Goals & Challenges"
        kicker="Road to impact"
        lead="Two fronts define the real work: the UX that people actually enjoy, and the ecosystem needed to ship it beyond a single desk."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="text-xl">Seamless and Engaging User Experience</h3>
          <p className="mt-3 text-sm text-ink/70">
            A crucial part of the research process is to develop a way of encouraging the user to take
            a break or work standing up that won’t be irritating or distracting. The goal is to make
            the intelligent desk feel like an extension of the user, much like a driver feels their car.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl">Shipping It to Market</h3>
          <p className="mt-3 text-sm text-ink/70">
            The intent is to integrate an IoT solution with existing desks instead of competing with
            manufacturers. This requires a viable business model, funding, and a UX that is intuitive
            enough for daily adoption.
          </p>
        </div>
      </div>
    </Section>
  );
}
