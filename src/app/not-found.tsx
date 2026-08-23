import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { notFound, routes } from "@/content/global";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/404");

/**
 * The 404 page (spec 6.4). Its job is to recover a lost visitor rather than
 * apologise at them, so it offers the four pages people are actually looking
 * for.
 *
 * Next.js returns a real HTTP 404 status for this route - not a 200 with a
 * 404-looking page - which is what the specification requires. It is noindex
 * via buildMetadata, and no closing call-to-action band appears here.
 *
 * The Pricing link points at the Services page anchor: there is no separate
 * pricing page and no separate contact page on this site.
 */
export default function NotFoundPage() {
  return (
    <Section tone="paper" width="wide">
      <h1>{notFound.h1}</h1>
      <p className="mt-6 measure text-lead text-ink-muted">{notFound.body}</p>

      <ul className="mt-10 grid gap-2">
        {notFound.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
            >
              {link.label}
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button asChild variant="secondary">
          <Link href={routes.home}>{notFound.buttonLabel}</Link>
        </Button>
      </div>
    </Section>
  );
}
