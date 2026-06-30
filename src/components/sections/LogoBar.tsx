import { Plug, ShieldCheck, Globe } from "lucide-react";

import { toolLogos } from "@/lib/content";

/**
 * Trust / integration bar. Per BUILD.md §6.3 we only show real integration
 * logos the client confirms are permitted. When `toolLogos` has confirmed
 * entries we render the logo grid (grouped by category, each with its name);
 * until then we keep the text + trust pills fallback.
 */
export function LogoBar() {
  if (toolLogos.length > 0) {
    // Preserve category order as first seen in the data.
    const categories: string[] = [];
    for (const tool of toolLogos) {
      const cat = tool.category ?? "Integrations";
      if (!categories.includes(cat)) categories.push(cat);
    }

    return (
      <section className="border-y border-border bg-surface">
        <div className="container-content flex flex-col items-center gap-10 py-12 text-center md:py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-foreground">
              Works with the tools you already use
            </p>
            <p className="max-w-xl text-sm text-muted-foreground">
              From the AI models we build on to the apps your team lives in -
              we connect to your stack, not the other way around.
            </p>
          </div>

          <div className="flex w-full flex-col gap-9">
            {categories.map((category) => (
              <div key={category} className="flex flex-col items-center gap-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                  {category}
                </p>
                <ul className="flex flex-wrap items-stretch justify-center gap-3">
                  {toolLogos
                    .filter((t) => (t.category ?? "Integrations") === category)
                    .map((tool) => (
                      <li
                        key={tool.name}
                        className="flex w-[104px] flex-col items-center justify-start gap-2.5 rounded-xl border border-border bg-background px-3 py-4 transition hover:-translate-y-0.5 hover:border-border-strong"
                      >
                        <span className="flex h-9 items-center justify-center">
                          {tool.src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={tool.src}
                              alt={tool.name}
                              title={tool.name}
                              className="h-8 max-w-[76px] w-auto object-contain"
                            />
                          ) : (
                            <span className="text-base font-semibold tracking-tight text-foreground/60">
                              {tool.name}
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-medium leading-tight text-muted-foreground">
                          {tool.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-surface">
      <div className="container-content flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-center sm:gap-10">
        <p className="text-sm font-medium text-muted-foreground">
          Works with the tools you already use
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Plug className="size-4 text-primary" />
            Secure integrations
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            GDPR &amp; data-secure
          </li>
          <li className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            Serving the US &amp; EU
          </li>
        </ul>
      </div>
    </section>
  );
}
