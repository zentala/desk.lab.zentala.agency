/**
 * Pricing section — 3-tier product cards with Stripe checkout links,
 * pre-order counters fetched from /preorder-count.json, and total raised summary.
 */
import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

// Replace with real Stripe Payment Links after Stripe account setup
const STRIPE_LINKS: Record<string, string> = {
  basic: 'https://checkout.stripe.com/placeholder-basic',
  pro: 'https://checkout.stripe.com/placeholder-pro',
  founder: 'https://checkout.stripe.com/placeholder-founder',
};

interface Tier {
  key: string;
  name: string;
  price: number;
  tagline: string;
  contents: string[];
  threshold: number | null;
  thresholdNote?: string;
  highlighted?: boolean;
  urgencyLabel?: string;
}

const tiers: Tier[] = [
  {
    key: 'basic',
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
    urgencyLabel: 'Early bird pricing — limited to first 200 orders',
  },
  {
    key: 'pro',
    name: 'Pro Kit',
    price: 79,
    tagline: 'Active Coaching — your desk nudges you',
    contents: [
      'Everything in Basic',
      'Vibration motor (haptic alerts)',
      'Presence sensor (desk activity detection)',
    ],
    threshold: 500,
    highlighted: true,
  },
  {
    key: 'founder',
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
  },
];

interface PreorderCounts {
  basic: number;
  pro: number;
  founder: number;
}

export default function Pricing() {
  const [counts, setCounts] = useState<PreorderCounts>({ basic: 0, pro: 0, founder: 0 });

  useEffect(() => {
    fetch('/preorder-count.json')
      .then((res) => res.json())
      .then((data: PreorderCounts) => setCounts(data))
      .catch(() => {});
  }, []);

  const totalRaised =
    counts.basic * 49 + counts.pro * 79 + counts.founder * 149;

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
            <TierCard
              key={tier.key}
              tier={tier}
              orderCount={counts[tier.key as keyof PreorderCounts]}
            />
          ))}
        </div>

        <TotalRaised amount={totalRaised} />

        <p className="mt-8 text-center text-sm text-gray-500">
          All prices include sensor hardware + open source app.
          Shipping calculated at checkout. EU shipping from Poland.
        </p>
      </div>
    </section>
  );
}

function TotalRaised({ amount }: { amount: number }) {
  const formatted = amount.toLocaleString('en-US');
  return (
    <div className="mt-12 text-center">
      <p className="text-2xl font-bold text-gray-100">
        Total raised: <span className="text-brand-green">&euro;{formatted}</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        Every pre-order brings us closer to production
      </p>
    </div>
  );
}

function TierCard({ tier, orderCount }: { tier: Tier; orderCount: number }) {
  const progressPercent = tier.threshold
    ? Math.min(100, Math.round((orderCount / tier.threshold) * 100))
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
          &euro;{tier.price}
        </span>
        <span className="ml-1 text-muted">one-time</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.contents.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-0.5 text-brand-green">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>

      {/* Urgency elements */}
      {tier.urgencyLabel && (
        <p className="mb-3 text-xs font-medium text-amber-400">
          {tier.urgencyLabel}
        </p>
      )}
      {tier.threshold !== null && orderCount > 0 && (
        <p className="mb-3 text-xs font-semibold text-brand-green">
          Only {tier.threshold - orderCount} spots left
        </p>
      )}

      {tier.threshold !== null && progressPercent !== null && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>{orderCount} / {tier.threshold} pre-orders</span>
            <span>{progressPercent}%</span>
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

      <a
        href={STRIPE_LINKS[tier.key]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('preorder-click', { tier: tier.key })}
        className={`block w-full rounded-full py-3 text-center font-semibold transition-all ${
          tier.highlighted
            ? 'bg-brand-green text-dark-900 hover:bg-brand-green-light'
            : 'border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
        }`}
      >
        Pre-order &mdash; &euro;{tier.price}
      </a>
    </div>
  );
}
