import { metrics } from "@/lib/content";

/**
 * Metrics row. Values are {{token}} placeholders by default (BUILD.md §11) —
 * the client drops in real numbers in content.ts. We never invent figures.
 */
export function StatBar() {
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {metrics.map((m) => {
        const isPlaceholder = m.value.startsWith("{{");
        return (
          <div
            key={m.label}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-6 text-center"
          >
            <dt className="sr-only">{m.label}</dt>
            <dd
              className={
                isPlaceholder
                  ? "font-mono text-2xl font-bold text-subtle"
                  : "text-3xl font-bold text-foreground"
              }
              title={isPlaceholder ? "Placeholder — client to provide" : undefined}
            >
              {m.value}
            </dd>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </div>
        );
      })}
    </dl>
  );
}
