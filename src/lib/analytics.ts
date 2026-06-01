type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "consent",
      action: string,
      params?: GtagParams
    ) => void;
  }
}

/** Fire a GA4 event if gtag is loaded (it loads only after cookie consent). */
export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
