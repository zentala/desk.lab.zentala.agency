/**
 * Referral Program section — "Give €5, Get €5" mechanic with copy-to-clipboard link.
 * Placed after Pricing, before SocialWall/FAQ.
 */
import { useState } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Share your link',
    description: 'Copy your unique referral link and send it to a friend or colleague.',
  },
  {
    number: 2,
    title: 'Friend pre-orders',
    description: 'They get €5 off their kit when they use your link to pre-order.',
  },
  {
    number: 3,
    title: 'Both save €5',
    description: 'Once their order is confirmed, you get €5 credited to your order too.',
  },
];

const REFERRAL_LINK = 'desk.zentala.io/?ref=YOUR_CODE';

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`https://${REFERRAL_LINK}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="referral" className="py-24 border-t border-gray-800/50">
      <div className="section-container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Share &amp; Save
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
          Give <span className="text-brand-green font-semibold">&euro;5</span>,
          Get <span className="text-brand-green font-semibold">&euro;5</span>
          &mdash; share with a friend, both of you save.
        </p>

        {/* 3-step flow */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* Copy link */}
        <div className="mx-auto mt-12 max-w-lg">
          <div className="flex items-stretch rounded-xl border border-gray-800 bg-dark-800 overflow-hidden">
            <span className="flex-1 px-4 py-3 text-sm text-gray-400 truncate select-all">
              {REFERRAL_LINK}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 bg-brand-green px-6 py-3 text-sm font-semibold text-dark-900 transition-colors hover:bg-brand-green-light"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Referral codes activate after your pre-order
          </p>
        </div>

        {/* Small print */}
        <p className="mt-6 text-center text-xs text-gray-600">
          One referral per purchase. Can be combined with any tier.
        </p>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-dark-800 p-6 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-dark-900">
        {step.number}
      </div>
      <h3 className="text-lg font-semibold text-gray-100">{step.title}</h3>
      <p className="mt-2 text-sm text-muted">{step.description}</p>
    </div>
  );
}
