import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ConversionTracker } from "@/components/analytics/ConversionTracker";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";
import { routes, thankYouChecklist } from "@/content/global";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.thankYouChecklist);

/**
 * /thank-you-checklist (spec 7.10.3) - after the checklist form.
 *
 * The download button points at the PDF on this site's own domain, so the file
 * works even if the email does not arrive, the link never expires, and
 * analytics can see the download (spec 8.5).
 *
 * checklist_downloaded fires here, on the page, not on the form submit.
 */
export default function ThankYouChecklistPage() {
  return (
    <Section tone="paper" width="wide">
      <Suspense fallback={null}>
        <ConversionTracker event="checklist_downloaded" />
      </Suspense>

      <h1>{thankYouChecklist.h1}</h1>
      <p className="mt-6 measure text-lead text-ink-muted">
        {thankYouChecklist.body1}
      </p>

      <div className="mt-8">
        <Button asChild full className="sm:w-auto">
          <a href={thankYouChecklist.downloadHref} download>
            <DownloadIcon size={18} />
            {thankYouChecklist.buttonLabel}
          </a>
        </Button>
      </div>

      <p className="mt-8 measure text-body">{thankYouChecklist.body2}</p>

      <p className="mt-6">
        <Link
          href={thankYouChecklist.linkHref}
          className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {thankYouChecklist.linkLabel}
        </Link>
      </p>
    </Section>
  );
}
