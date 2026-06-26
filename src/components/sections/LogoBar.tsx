import { Plug, ShieldCheck, Globe } from "lucide-react";

import { toolLogos } from "@/lib/content";

/**
 * Trust / integration bar. Per BUILD.md §6.3 we only show real integration
 * logos the client confirms are permitted. When `toolLogos` has confirmed
 * entries we render the logo row; until then we keep the text + trust pills.
 */
export function LogoBar() {
  if (toolLogos.length > 0) {
    return (
      <section className="border-b border-border bg-surface">
        <div className="container-content flex flex-col items-center gap-6 py-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Works with the tools you already use
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {toolLogos.map((tool) => (
              <li key={tool.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="h-7 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
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
