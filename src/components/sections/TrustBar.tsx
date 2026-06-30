import { Check } from "lucide-react";

import { trustBar } from "@/lib/content";

/**
 * Persistent trust bar (Website Change Document §2.2) - a thin strip rendered
 * directly under the header on every page. Three short, true safety promises
 * with small check icons. Decorative divider hidden from assistive tech.
 */
export function TrustBar() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-content flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 py-2 text-center">
        {trustBar.map((item, i) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"
          >
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="mr-4 hidden h-3 w-px bg-border sm:inline-block"
              />
            ) : null}
            <Check className="size-3.5 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
