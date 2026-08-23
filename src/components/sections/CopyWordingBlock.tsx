"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { microcopy } from "@/content/global";

/**
 * The engagement-letter wording, in a bordered block with a copy-to-clipboard
 * button (spec 7.4.8).
 *
 * A small feature that firm owners will genuinely use and remember - it is the
 * reason this page gets bookmarked and shared between firm owners, which is
 * worth more than any badge.
 *
 * The wording stays selectable text rather than an image, so someone without
 * clipboard access (or with JavaScript off) can still select and copy it.
 */
export function CopyWordingBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, permission denied). The text is
      // selectable, so the visitor can still copy it by hand.
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 rounded-[12px] border border-border bg-surface p-6">
      <blockquote>
        <p className="measure text-body italic">&ldquo;{text}&rdquo;</p>
      </blockquote>

      <div className="mt-6 flex items-center gap-4">
        <Button variant="secondary" size="compact" onClick={copy}>
          {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          {copied ? microcopy.copied : microcopy.copyWording}
        </Button>
        {/* Announced politely so a screen reader confirms the copy happened. */}
        <span role="status" aria-live="polite" className="text-small text-fern">
          {copied ? microcopy.copied : ""}
        </span>
      </div>
    </div>
  );
}
