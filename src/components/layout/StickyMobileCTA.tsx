import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Fixed bottom "Book your Workflow Audit" bar shown on mobile only (§6.3). */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
      <Button asChild className="w-full" size="lg">
        <Link href="/contact">Book your Workflow Audit</Link>
      </Button>
    </div>
  );
}
