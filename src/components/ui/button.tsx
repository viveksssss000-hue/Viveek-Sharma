import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Buttons (spec 4.4.1).
 *
 * THE ONE COLOUR RULE THAT MATTERS MOST (spec 4.1):
 * ochre is reserved for actions. If something is ochre, it is clickable and it
 * is the most important thing on the screen. There should be exactly one
 * `primary` button visible in any given viewport, apart from the fixed header
 * button. Using ochre for decoration destroys the whole system.
 *
 * Every variant clears the 44x44px minimum touch target, carries the shared
 * 3px fern focus ring from globals.css, and moves for no longer than 150ms.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-semibold text-btn leading-none",
    "rounded-[10px] transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out",
    "disabled:pointer-events-none disabled:opacity-60",
    // Only ever a single right-pointing arrow inside a button (spec 4.4.1).
    "[&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150",
  ],
  {
    variants: {
      variant: {
        /** The single most important action on the screen. */
        primary:
          "btn-sheen bg-ochre text-white hover:bg-ochre-dark hover:-translate-y-px hover:shadow-[0_10px_28px_rgb(154_107_34/0.35)] active:translate-y-0 active:shadow-none hover:[&_svg]:translate-x-1",
        /** The alternative action next to a primary. */
        secondary:
          "border-[1.5px] border-fern bg-transparent text-fern hover:bg-fern/8",
        /** In-page navigation and low-priority actions. */
        tertiary:
          "text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]",
        /** Only inside a forest or fern coloured band. */
        onDark:
          "btn-sheen btn-sheen--ink bg-paper text-forest hover:bg-white hover:-translate-y-px hover:shadow-[0_10px_28px_rgb(0_0_0/0.3)] active:translate-y-0 active:shadow-none hover:[&_svg]:translate-x-1",
        /** Outlined, for use inside a dark band next to an onDark primary. */
        onDarkOutline:
          "border-[1.5px] border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper/10",
      },
      size: {
        /** 16px vertical, 28px horizontal padding (spec 4.4.1). */
        default: "min-h-[56px] px-7 py-4",
        /** Smaller controls that still clear the 44px touch target. */
        compact: "min-h-[44px] px-5 py-3",
        /** No padding - for the tertiary text-link variant. */
        inline: "min-h-[44px]",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "default", full: false },
  }
);

function Button({
  className,
  variant,
  size,
  full,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
