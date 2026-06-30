import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { mainNav, solutions } from "@/lib/content";

const navLinkClass =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {/* Solutions dropdown (CSS hover/focus-within for keyboard access) */}
            <li className="group relative">
              <Link
                href="/solutions"
                className={navLinkClass}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="rounded-xl border border-border bg-surface p-2 shadow-lg">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/solutions/${s.slug}`}
                        className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="text-sm font-semibold text-foreground">
                          {s.navLabel}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {s.outcome}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">Book your Workflow Audit</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
