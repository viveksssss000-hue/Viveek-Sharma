"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackScroll75 } from "@/lib/analytics";
import { useConsent } from "@/lib/hooks";

/**
 * Analytics loader (spec 11.1).
 *
 * GA4 is not loaded until consent is given - a consent-gated loader, not a
 * script that fires and then apologises. The placeholder id "G-XXXXXXX" is
 * ignored so a misconfigured environment cannot start collecting silently, and
 * nothing loads outside production so local work never pollutes the data.
 *
 * Internal traffic filtering (the client's own IP addresses and the
 * developer's) and excluding the staging site are configured inside the GA4
 * property, not here.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const consent = useConsent();

  const enabled =
    consent === "granted" &&
    Boolean(gaId) &&
    gaId !== "G-XXXXXXX" &&
    process.env.NODE_ENV === "production";

  if (!enabled) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId as string} />
      <ScrollDepth />
    </>
  );
}

/** Fires scroll_75 once per page (spec 11.2). */
function ScrollDepth() {
  const pathname = usePathname();
  const fired = useRef(false);

  useEffect(() => {
    fired.current = false;

    const onScroll = () => {
      if (fired.current) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.75) {
        fired.current = true;
        trackScroll75(pathname);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
