import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-content max-w-2xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              Back to home
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
