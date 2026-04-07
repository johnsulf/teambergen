import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  variant?: "default" | "muted" | "secondary";
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  variant = "default",
  className,
  children,
}: SectionProps) {
  const variantClasses = {
    default: "bg-background",
    muted: "bg-muted",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", variantClasses[variant], className)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}
