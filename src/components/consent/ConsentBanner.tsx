"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

/**
 * EU cookie consent banner wired to Google Consent Mode v2.
 * Analytics is opt-in: GA stays in "denied" until the user accepts (defaults
 * are set in the root layout's beforeInteractive script). BUILD.md §6.3.
 */
export function ConsentBanner() {
  useEffect(() => {
    const updateConsent = () => {
      const granted = CookieConsent.acceptedCategory("analytics");
      window.gtag?.("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
      });
    };

    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: "box", position: "bottom left" },
        preferencesModal: { layout: "box" },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
      },
      onConsent: updateConsent,
      onChange: updateConsent,
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We value your privacy",
              description:
                "We use necessary cookies to run this site and, with your consent, analytics cookies to understand how it's used. We never collect your financial data here.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Necessary only",
              showPreferencesBtn: "Manage preferences",
              footer: '<a href="/privacy">Privacy Policy</a> · <a href="/cookies">Cookie Policy</a>',
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Necessary only",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Necessary",
                  description:
                    "Required for the website to function. Always enabled.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description:
                    "Help us understand how the site is used (Google Analytics). Loaded only with your consent.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'See our <a href="/cookies">Cookie Policy</a> for details.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

/** Re-open the preferences modal (used by the footer "Cookie settings" link). */
export function showCookiePreferences() {
  CookieConsent.showPreferences();
}
