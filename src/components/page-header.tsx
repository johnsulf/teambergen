import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  lead?: string;
  children?: ReactNode;
}

export function PageHeader({ title, lead, children }: PageHeaderProps) {
  return (
    <div className="bg-secondary text-secondary-foreground border-b-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 text-lg text-secondary-foreground/70 max-w-2xl">
            {lead}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
