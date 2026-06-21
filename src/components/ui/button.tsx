import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-out active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  {
    variants: {
      variant: {
        // Primary CTA - violet fill (brand-kit .btn--primary).
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-[#5631e0] hover:-translate-y-0.5 hover:shadow-md [&_svg]:group-hover:translate-x-0.5 hover:[&_svg]:translate-x-0.5",
        // Spark - the ONE key action on a screen (lime). Keep it scarce.
        spark:
          "bg-accent text-accent-foreground shadow-[0_8px_22px_-10px_rgba(168,224,0,0.5)] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(168,224,0,0.6)] [&_svg]:group-hover:translate-x-0.5 hover:[&_svg]:translate-x-0.5",
        // Soft violet fill - brand-kit secondary button
        navy: "bg-primary/10 border border-primary/20 text-[#4424b8] hover:bg-primary/20 hover:-translate-y-0.5",
        // Ghost outline - brand-kit tertiary button
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-muted hover:border-border-strong",
        secondary: "bg-muted text-foreground hover:bg-muted/70",
        ghost: "text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
