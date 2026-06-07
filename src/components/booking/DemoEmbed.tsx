"use client";

import { useEffect } from "react";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";

import { Button } from "@/components/ui/button";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

/**
 * Inline scheduler. Cal.com is primary; Calendly is the fallback; if neither is
 * configured we never render a broken embed — we link to the contact page.
 * (BUILD.md §6.2)
 */
export function DemoEmbed() {
  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#7C5CFF" } },
      });
    })();
  }, []);

  if (calLink) {
    return (
      <div className="min-h-[640px] w-full overflow-hidden rounded-xl border border-border bg-surface">
        <Cal calLink={calLink} style={{ width: "100%", height: "100%", minHeight: 640 }} />
      </div>
    );
  }

  if (calendlyUrl) {
    return (
      <iframe
        title="Book a demo with tryacowork"
        src={calendlyUrl}
        className="min-h-[640px] w-full rounded-xl border border-border bg-surface"
      />
    );
  }

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
      <p className="max-w-md text-muted-foreground">
        {/* TODO(client): set NEXT_PUBLIC_CAL_LINK (or NEXT_PUBLIC_CALENDLY_URL) to enable the inline scheduler. */}
        Our scheduler isn&apos;t connected yet. In the meantime, send us a note
        and we&apos;ll find a time that works.
      </p>
      <Button asChild>
        <Link href="/contact">Contact us</Link>
      </Button>
    </div>
  );
}
