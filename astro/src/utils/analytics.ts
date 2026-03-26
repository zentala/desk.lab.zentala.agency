/**
 * Privacy-first analytics wrapper around Plausible.
 * No cookies, no tracking pixels, no Google Analytics.
 * Plausible script is loaded in index.astro head.
 */

type PlausibleEvent =
  | 'preorder-click'
  | 'waitlist-signup'
  | 'diy-click'
  | 'faq-expand';

/**
 * Track a custom event via Plausible Analytics.
 * No-op if Plausible script is not loaded (e.g., blocked by ad blocker).
 */
export function trackEvent(event: PlausibleEvent, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, props ? { props } : undefined);
  }
}
