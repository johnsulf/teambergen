import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border-2 border-border bg-card px-3 text-sm text-foreground shadow-2xs transition-[box-shadow,border-color] outline-none placeholder:text-muted-foreground/60 focus-visible:shadow-none focus-visible:ring-3 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-10", className)}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "min-h-24 py-2 leading-relaxed", className)}
      {...props}
    />
  );
}

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(fieldBase, "h-10 pr-8", className)}
      {...props}
    />
  );
}

export { Input, Textarea, NativeSelect, fieldBase };
