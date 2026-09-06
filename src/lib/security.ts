/**
 * Security utility: validate identifiers and slugs used in URLs, document IDs,
 * and Firestore paths to prevent injection, path traversal, and SSRF.
 */

const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;
const MAX_SLUG_LENGTH = 128;

export function isValidSlug(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (value.length === 0 || value.length > MAX_SLUG_LENGTH) return false;
  if (value.includes('..') || value.includes('//')) return false;
  return SLUG_REGEX.test(value);
}

export function sanitizeSlug(value: unknown, fallback: string = 'unknown'): string {
  if (isValidSlug(value)) return value;
  return fallback;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_REGEX.test(value);
}

export function escapeHtml(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
