import { cn } from "@/lib/utils";

export interface ScoreCardItem {
  title: string;
  description: string;
}

interface ScoreCardProps {
  items: ScoreCardItem[];
  par?: number;
  className?: string;
}

export function ScoreCard({ items, par = 3, className }: ScoreCardProps) {
  return (
    <ol
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 border-2 border-border bg-card shadow-md",
        className
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          className="flex flex-col border-border not-first:border-t-2 md:not-first:border-t-0 md:not-first:border-l-2"
        >
          <div className="flex items-end justify-between gap-4 border-b-2 border-border bg-secondary px-5 py-3 text-secondary-foreground">
            <div className="flex items-end gap-2">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/60">
                Hull
              </span>
              <span className="font-brand text-3xl leading-none text-primary">
                {i + 1}
              </span>
            </div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/60">
              Par {par}
            </span>
          </div>
          <div className="flex-1 px-5 py-6 md:px-6 md:py-7">
            <h3 className="text-xl font-bold tracking-tight mb-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
