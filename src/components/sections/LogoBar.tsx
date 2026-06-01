import { Plug, ShieldCheck, Globe } from "lucide-react";

/**
 * Trust / integration bar. Per BUILD.md §6.3 we only show real integration
 * logos the client confirms are permitted — until then, use the text fallback.
 */
export function LogoBar() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-content flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-center sm:gap-10">
        <p className="text-sm font-medium text-muted-foreground">
          {/* TODO(client): swap for permitted integration logos (QuickBooks, Xero, Sage…). */}
          Works with the accounting tools you already use
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Plug className="size-4 text-accent" />
            Secure integrations
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-accent" />
            GDPR &amp; data-secure
          </li>
          <li className="flex items-center gap-2">
            <Globe className="size-4 text-accent" />
            Serving the US &amp; EU
          </li>
        </ul>
      </div>
    </section>
  );
}
