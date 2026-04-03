import Section from './ui/Section';
import StatCard from './ui/StatCard';
import { stats } from '../data/stats';

export default function Stats() {
  return (
    <Section className="pt-6">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </Section>
  );
}
