import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Reusable eyebrow + heading + supporting copy block. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "reveal flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
