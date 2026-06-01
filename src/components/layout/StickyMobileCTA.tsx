import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Fixed bottom "Book a Demo" bar shown on mobile only (BUILD.md §6.3). */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
      <Button asChild className="w-full" size="lg">
        <Link href="/book-a-demo">Book a Demo</Link>
      </Button>
    </div>
  );
}
