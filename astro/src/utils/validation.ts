/**
 * Shared form validation utilities.
 */

/** Validate an email address format (basic check, not RFC 5322 compliant). */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
