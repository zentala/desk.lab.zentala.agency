/**
 * Social Proof section — before/after results and testimonial cards.
 * Placed before Pricing to build trust and demonstrate value.
 */

interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
}

{/* <!-- TEMPLATE: replace with real testimonials from early users --> */}
const testimonials: Testimonial[] = [
  {
    name: 'Marcus W.',
    role: 'Remote Developer',
    city: 'Berlin',
    quote:
      'I knew I was sitting too much, but I had no idea it was 6+ hours straight. The overlay bar changed my behavior within a week.',
  },
  {
    name: 'Lisa K.',
    role: 'Data Scientist',
    city: 'Amsterdam',
    quote:
      'Other apps require you to log manually. This just works — mount the sensor, forget about it, and let the nudges do their thing.',
  },
  {
    name: 'Erik N.',
    role: 'Product Manager',
    city: 'Stockholm',
    quote:
      'The gamification hooked me. Seeing a negative score after a long meeting actually motivates me to stand for the next call.',
  },
];

export default function SocialProof() {
  return (
    <section id="results" className="py-24 border-t border-gray-800/50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Real Results
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
          Data from the first 30 days of using zntlDesk.
        </p>

        {/* Before / After comparison */}
        {/* <!-- PLACEHOLDER: replace with real data --> */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          <BeforeAfterCard
            label="Before zntlDesk"
            variant="before"
            stats={[
              { metric: 'Standing time', value: '8%' },
              { metric: 'Position changes/day', value: '1.2' },
              { metric: 'Longest sit session', value: '3.5h' },
            ]}
          />
          <BeforeAfterCard
            label="After 30 days"
            variant="after"
            stats={[
              { metric: 'Standing time', value: '22%' },
              { metric: 'Position changes/day', value: '4.8' },
              { metric: 'Longest sit session', value: '52min' },
            ]}
          />
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold text-gray-300 mb-10">
            What early users say
          </h3>
          {/* <!-- TEMPLATE: replace with real testimonials from early users --> */}
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Stat {
  metric: string;
  value: string;
}

function BeforeAfterCard({
  label,
  variant,
  stats,
}: {
  label: string;
  variant: 'before' | 'after';
  stats: Stat[];
}) {
  const isAfter = variant === 'after';
  return (
    <div
      className={`rounded-2xl border p-6 ${
        isAfter
          ? 'border-brand-green/30 bg-dark-700'
          : 'border-gray-800 bg-dark-800'
      }`}
    >
      <h3
        className={`text-sm font-semibold uppercase tracking-widest mb-6 ${
          isAfter ? 'text-brand-green' : 'text-gray-500'
        }`}
      >
        {label}
      </h3>
      <ul className="space-y-4">
        {stats.map((s) => (
          <li key={s.metric} className="flex justify-between items-baseline">
            <span className="text-sm text-muted">{s.metric}</span>
            <span
              className={`text-2xl font-bold ${
                isAfter ? 'text-brand-green' : 'text-gray-300'
              }`}
            >
              {s.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-dark-800 p-6">
      <p className="text-sm text-gray-300 leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="h-10 w-10 rounded-full bg-dark-600 flex items-center justify-center text-xs text-gray-500">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-200">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted">
            {testimonial.role}, {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
}
