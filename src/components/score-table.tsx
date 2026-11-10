import { cn } from "@/lib/utils";

export interface ScoreTableColumn {
  title: string;
  items: { title: string; description: string }[];
}

interface ScoreTableProps {
  columns: ScoreTableColumn[];
  className?: string;
}

export function ScoreTable({ columns, className }: ScoreTableProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 border-2 border-border bg-card shadow-md",
        className
      )}
    >
      {columns.map((column) => (
        <div
          key={column.title}
          className="flex flex-col border-border not-first:border-t-2 lg:not-first:border-t-0 lg:not-first:border-l-2"
        >
          <h3 className="border-b-2 border-border bg-secondary px-5 py-4 text-lg font-bold tracking-tight text-secondary-foreground md:px-6">
            {column.title}
          </h3>
          <ul className="flex-1 divide-y divide-border">
            {column.items.map((item) => (
              <li key={item.title} className="px-5 py-4 md:px-6">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
