import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { footer, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-content py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand + region */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI automation built specifically for accounting &amp; bookkeeping.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {site.region}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-sm text-accent hover:underline"
            >
              {site.email}
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {footer.columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-sm font-semibold text-foreground">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Utility row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · DPA available on request
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.utility.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
