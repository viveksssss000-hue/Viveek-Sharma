"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

/**
 * "Copy link" (spec 7.8.2).
 *
 * The only sharing control on an article. No third-party share widgets: they
 * are slow, they add requests the performance budget cannot spare, and they
 * track readers who did not ask to be tracked.
 */
export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="secondary"
        size="compact"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
        {copied ? "Copied" : "Copy link"}
      </Button>
      <span role="status" aria-live="polite" className="text-small text-fern">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
