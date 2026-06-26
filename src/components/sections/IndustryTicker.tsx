import { industriesTicker } from "@/lib/content";

/**
 * Thin auto-scrolling ticker of industries served - reassures non-finance
 * visitors they're in the right place. Reuses the .marquee utility (which is
 * reduced-motion safe). Decorative, so it's aria-hidden with a labelled region.
 */
export function IndustryTicker() {
  return (
    <section
      aria-label="Industries we serve"
      className="border-b border-border bg-background"
    >
      <div className="marquee relative py-3" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-8 pr-8">
              {industriesTicker.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {item}
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
