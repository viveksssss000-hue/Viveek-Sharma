/**
 * Dates from front matter.
 *
 * THE TRAP THIS EXISTS TO CLOSE
 * An unquoted `updated: 2026-08-23` in YAML front matter is parsed as a **Date
 * object**, not a string. Interpolating that into a template literal gives
 * "Sun Aug 23 2026 00:00:00 GMT+0000...T12:00:00Z", which `new Date()` rejects -
 * so the page renders "Invalid Date" and nothing throws. Quoting the value in
 * every file would work until somebody forgets, so the parsing is fixed here
 * instead of relying on authors.
 *
 * Everything that reads a date from markdown goes through toIsoDate first.
 */

/** Normalises a front-matter date to "YYYY-MM-DD", or null if unusable. */
export function toIsoDate(value: unknown): string | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    // Already a plain date, or a full timestamp we can shorten.
    const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString().slice(0, 10);
  }

  return null;
}

/**
 * "September 3, 2026" - the date format from Appendix C, used for both articles
 * and the "last updated" line on the legal pages.
 *
 * Fixed to UTC and to en-US so the date never shifts by a day for a reader in
 * another time zone, and never renders as 03/09/2026 to a reader whose browser
 * is set to a different locale.
 */
export function formatDate(value: unknown): string {
  const iso = toIsoDate(value);
  if (!iso) return "";
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
