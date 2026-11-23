import Link from "next/link";

import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { Logo } from "@/components/layout/Logo";
import { footer } from "@/content/global";
import { site } from "@/lib/site";

/**
 * The footer (spec 6.3). Forest background, four columns on desktop, stacked
 * on mobile, then a bottom bar.
 *
 * Deliberate omissions:
 *  - No phone number. Spec 6.3: do not publish one until it can be answered
 *    reliably in US business hours. Set `site.phone` to show one.
 *  - No social icons beyond LinkedIn. An empty social link is worse than none.
 *  - The copyright year is computed, never hard-coded.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark band-grad text-paper">
      <div className="gutter mx-auto max-w-content py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Column 1 - identity */}
          <div className="lg:col-span-4">
            <Logo height={36} variant="reversed" />
            <p className="mt-6 max-w-[34ch] text-body text-paper">
              {footer.blurb[0]}
            </p>
            <p className="mt-2 max-w-[34ch] text-small text-paper/70">
              {footer.blurb[1]}
            </p>
          </div>

          {/* Columns 2 and 3 - links. "Get started" gets the wider column
              because "Book a 20-minute call" breaks mid-phrase in a narrow
              one, and the button label is fixed by Appendix C. */}
          {footer.columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-4"
            >
              <h2 className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-ochre-light">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-body text-paper/90 underline-offset-4 hover:text-paper hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-paper/15 pt-8">
          <div className="flex flex-col gap-4 text-small text-paper/70 lg:flex-row lg:items-center lg:justify-between">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
              {site.linkedin && (
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* The physical address matters for trust with US buyers and for
              local search (spec 6.3), so it is text, not an image. */}
          <address className="mt-4 flex flex-col gap-1 text-small not-italic text-paper/70 lg:flex-row lg:gap-6">
            <span className="flex min-h-11 items-center">
              {site.address.street}, {site.address.city},{" "}
              {site.address.region} {site.address.postalCode},{" "}
              {site.address.country}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
            >
              {site.email}
            </a>
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
              >
                {site.phone}
              </a>
            )}
          </address>
        </div>
      </div>
    </footer>
  );
}
