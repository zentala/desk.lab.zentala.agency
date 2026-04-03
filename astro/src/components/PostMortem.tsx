import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import InfoCard from './ui/InfoCard';
import { postmortemBlocks, postmortemSummary } from '../data/postmortem';

export default function PostMortem() {
  return (
    <Section>
      <SectionHeader
        title="W1 Post-Mortem"
        kicker="Version 0.1"
        lead={postmortemSummary}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {postmortemBlocks.map((block) => (
          <InfoCard key={block.title} tone={block.tone} title={block.title} items={block.items} />
        ))}
      </div>
    </Section>
  );
}
