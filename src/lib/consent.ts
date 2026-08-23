/**
 * Cookie consent, self-hosted (spec 6.5).
 *
 * A third-party consent platform typically adds 100KB or more, so this is a
 * few dozen lines instead. The rules it has to satisfy:
 *
 *  - The banner never blocks the page.
 *  - Accept and Decline carry equal visual weight. A Decline that does nothing
 *    is unlawful in the EU and dishonest everywhere, so Decline is recorded and
 *    respected: analytics never loads.
 *  - The choice is remembered for 12 months and can be changed later from the
 *    "Cookie settings" link in the footer.
 *
 * The value lives in localStorage rather than a cookie, which means the
 * consent record itself sets no cookie - the tidiest possible answer to
 * "which cookies does this site set before I have chosen?": none.
 */

export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "tryacowork.consent";
const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000;

/** Fired on the window whenever consent changes, so listeners can react. */
export const CONSENT_EVENT = "tryacowork:consent";

type StoredConsent = { value: ConsentValue; at: number };

function read(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.value !== "granted" && parsed.value !== "denied") return null;
    // Expired choices are treated as no choice, so the banner asks again.
    if (Date.now() - parsed.at > TWELVE_MONTHS_MS) return null;
    return parsed;
  } catch {
    // Private browsing, blocked storage, corrupt value - ask again.
    return null;
  }
}

/** `null` means the visitor has not chosen yet. */
export function getConsent(): ConsentValue | null {
  return read()?.value ?? null;
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value, at: Date.now() } satisfies StoredConsent)
    );
  } catch {
    // If we cannot persist the choice we still honour it for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Clears the record so the banner reappears - the "Cookie settings" route. */
export function clearConsent() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to do */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
