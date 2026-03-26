/**
 * Canonical pricing configuration. All components must import from here
 * instead of hardcoding prices. Values may change or be A/B tested.
 */
export const PRICING = {
  basic: { name: 'Basic Kit', price: 49, threshold: 200, currency: '\u20ac' },
  pro: { name: 'Pro Kit', price: 79, threshold: 500, currency: '\u20ac' },
  founder: { name: "Founder's Edition", price: 149, threshold: null, currency: '\u20ac' },
} as const;

export type TierKey = keyof typeof PRICING;
