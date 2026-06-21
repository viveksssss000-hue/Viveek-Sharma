"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

// Calendly scheduling link. Bookings notify the Calendly account owner and the
// invitee gets a calendar invite with a video link - no custom backend needed.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? site.bookingUrl;
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Inline Calendly scheduler. We initialise the widget by hand (rather than
 * relying on the script's auto-scan) so it re-renders correctly after a
 * client-side navigation into this page, where the script is already cached.
 * If no booking URL is configured we never render a broken embed - we link to
 * the contact page instead.
 */
export function DemoEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!bookingUrl || !el) return;

    const url = `${bookingUrl}${bookingUrl.includes("?") ? "&" : "?"}hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=6d5dd3`;

    const init = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
        });
      }
    };

    if (window.Calendly) {
      init();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, []);

  if (!bookingUrl) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
        <p className="max-w-md text-muted-foreground">
          Our scheduler isn&apos;t connected yet. In the meantime, send us a note
          and we&apos;ll find a time that works.
        </p>
        <Button asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-xl border border-border bg-white"
      style={{ minHeight: 700 }}
    />
  );
}
