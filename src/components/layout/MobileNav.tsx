"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mainNav, solutionsNav } from "@/lib/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-4">
          <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-subtle">
            Solutions
          </p>
          {solutionsNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-md px-2 py-2.5 text-base font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Separator className="my-2" />
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-md px-2 py-2.5 text-base font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 p-4">
          <Button asChild className="w-full" onClick={close}>
            <Link href="/contact">Book your Workflow Audit</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" onClick={close}>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
