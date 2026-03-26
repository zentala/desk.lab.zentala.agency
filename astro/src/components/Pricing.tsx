/**
 * Pricing section — 3-tier product cards with pre-order threshold progress bars.
 * Reads from canonical pricing config (hardcoded here, sourced from pricing.json).
 */

interface Tier {
  name: string;
  price: number;
  tagline: string;
  contents: string[];
  threshold: number | null;
  thresholdNote?: string;
  currentOrders: number;
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Basic Kit',
    price: 49,
    tagline: 'Awareness — know how much you actually sit',
    contents: [
      'VL53L1X ToF sensor on carrier PCB',
      'Microcontroller (pre-flashed firmware)',
      'USB-C cable',
      'Mounting tape',
      'Desktop app (open source)',
    ],
    threshold: 200,
    currentOrders: 0,
  },
  {
    name: 'Pro Kit',
    price: 79,
    tagline: 'Active Coaching — your desk nudges you',
    contents: [
      'Everything in Basic',
      'Vibration motor (haptic alerts)',
      'Presence sensor (desk activity detection)',
    ],
    threshold: 500,
    currentOrders: 0,
    highlighted: true,
  },
  {
    name: "Founder's Edition",
    price: 149,
    tagline: 'Full Investment — fund the future of desk ergonomics',
    contents: [
      'Everything in Pro',
      '5 years Pro cloud subscription',
      'Smartwatch integration (when available)',
      'Priority feature requests',
      'Direct support channel',
      'Name in credits',
      'Beta access to new features',
    ],
    threshold: null,
    thresholdNote: 'Ships with Pro batch',
    currentOrders: 0,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-gray-800/50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Choose your kit
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
          Pre-order now. Production starts when we hit the threshold.
          Full refund if we don't reach it.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-500">
          All prices include sensor hardware + open source app.
          Shipping calculated at checkout. EU shipping from Poland.
        </p>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const progressPercent = tier.threshold
    ? Math.min(100, Math.round((tier.currentOrders / tier.threshold) * 100))
    : null;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        tier.highlighted
          ? 'border-brand-green/50 bg-dark-700 shadow-glow'
          : 'border-gray-800 bg-dark-800'
      }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-bold text-dark-900">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-100">{tier.name}</h3>
        <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold text-gray-100">
          €{tier.price}
        </span>
        <span className="ml-1 text-muted">one-time</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.contents.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-0.5 text-brand-green">✓</span>
            {item}
          </li>
        ))}
      </ul>

      {/* Threshold progress bar */}
      {tier.threshold !== null && progressPercent !== null && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>{tier.currentOrders} pre-orders</span>
            <span>{tier.threshold} needed</span>
          </div>
          <div className="h-2 rounded-full bg-dark-900">
            <div
              className="h-2 rounded-full bg-brand-green transition-all duration-500"
              style={{ width: `${Math.max(2, progressPercent)}%` }}
            />
          </div>
        </div>
      )}
      {tier.thresholdNote && (
        <p className="mb-6 text-xs text-muted">{tier.thresholdNote}</p>
      )}

      <button className={`w-full rounded-full py-3 font-semibold transition-all ${
        tier.highlighted
          ? 'bg-brand-green text-dark-900 hover:bg-brand-greenLight'
          : 'border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
      }`}>
        Pre-order — €{tier.price}
      </button>
    </div>
  );
}
