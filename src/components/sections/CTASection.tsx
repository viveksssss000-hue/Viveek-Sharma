import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  title?: string;
  description?: string;
  reassurance?: string;
  className?: string;
};

/** Reusable final CTA band - Flowline contact-card style. Foot of most pages. */
export function CTASection({
  title = "Let's automate something real.",
  description = "Start with one task. Book a 30-minute demo and we'll show you the automated version of it - and the hours it gives back.",
  reassurance = "30-minute call · No obligation · No credit card",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("section-y", className)}>
      <div className="container-content">
        <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-[linear-gradient(140deg,#171d27,#1f2736)] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-44 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(109,93,211,.16),transparent_64%)]"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl sm:text-4xl">{title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/book-a-demo">
                  Book a Demo
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
            {reassurance ? (
              <p className="font-mono text-xs tracking-wide text-subtle">
                {reassurance}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
