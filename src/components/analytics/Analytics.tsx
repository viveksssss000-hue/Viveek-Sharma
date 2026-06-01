import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * GA4 loader. Renders nothing unless a real measurement ID is configured.
 * Consent Mode v2 defaults (denied) are set in the root layout before this
 * loads; the ConsentBanner flips analytics_storage to granted on opt-in.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || id === "G-XXXXXXX") return null;
  return <GoogleAnalytics gaId={id} />;
}
