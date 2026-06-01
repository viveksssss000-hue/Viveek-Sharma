"use client";

import * as CookieConsent from "vanilla-cookieconsent";

export function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className={className}
    >
      Cookie settings
    </button>
  );
}
