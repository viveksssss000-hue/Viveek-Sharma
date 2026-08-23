"use client";

import { clearConsent } from "@/lib/consent";
import { microcopy } from "@/content/global";

/**
 * "Cookie settings" in the footer bottom bar (spec 6.5). Clearing the stored
 * choice brings the banner back, which is the whole requirement: there must be
 * a way to change the decision later.
 */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={clearConsent}
      className="flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
    >
      {microcopy.cookieSettings}
    </button>
  );
}
