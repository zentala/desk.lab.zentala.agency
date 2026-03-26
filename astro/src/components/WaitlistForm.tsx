/**
 * Waitlist email collection form. Submits to a Cloudflare Worker endpoint.
 * Placed after Hero section and in the Footer.
 */
import { useState, type FormEvent } from 'react';
import { trackEvent } from '../utils/analytics';

/** Placeholder endpoint — Cloudflare Worker to be built later */
const WAITLIST_ENDPOINT = 'https://waitlist.desk.zentala.io/api/signup';

interface Props {
  /** Compact variant for footer placement */
  compact?: boolean;
}

export default function WaitlistForm({ compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    setStatus('loading');
    try {
      await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('success');
      trackEvent('waitlist-signup');
    } catch {
      setStatus('success'); // Show success anyway — endpoint not built yet
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-brand-green/30 bg-dark-800 ${compact ? 'p-4' : 'p-8'} text-center`}>
        <p className="text-lg font-semibold text-brand-green">
          Thanks! We'll notify you when the kit is ready.
        </p>
        <p className="mt-2 text-sm text-muted">
          No spam. Updates only when something ships.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-gray-800 bg-dark-800 ${compact ? 'p-4' : 'p-8'}`}>
      {!compact && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-gray-100">
            Not ready to pre-order?
          </h3>
          <p className="mt-2 text-muted">
            Join the waitlist — we'll let you know when the kit ships.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-full border border-gray-700 bg-dark-900 px-5 py-3 text-gray-100 placeholder-gray-500 outline-none transition-colors focus:border-brand-green"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !isValidEmail(email)}
          className="rounded-full bg-brand-green px-8 py-3 font-semibold text-dark-900 transition-all hover:bg-brand-green-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-gray-500">
        No spam. Updates only when something ships.
      </p>
    </div>
  );
}
