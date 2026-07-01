import { GoogleAnalytics } from "@next/third-parties/google";

// Owner-provided GA4 Measurement ID. This is a PUBLIC client-side identifier
// (it appears in page source for every visitor), not a secret, so it is safe as
// the built-in default. Override per-environment with NEXT_PUBLIC_GA_ID.
const DEFAULT_GA_ID = "G-8BFL9YEGKE";

/**
 * GA4 loader. Consent Mode v2 defaults (denied) are set in the root layout
 * before this loads; the ConsentBanner flips analytics_storage to granted on
 * opt-in, so no events are sent until the visitor accepts analytics cookies.
 */
export function Analytics() {
  // Accept either env var name (NEXT_PUBLIC_GA_MEASUREMENT_ID is preferred);
  // fall back to the built-in default so tracking works without any env set.
  const envId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA_ID;
  const id = envId && envId !== "G-XXXXXXX" ? envId : DEFAULT_GA_ID;
  if (!id) return null;
  return <GoogleAnalytics gaId={id} />;
}
