"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Innlegg", match: (p: string) => p === "/admin" || p.startsWith("/admin/innlegg") },
  { href: "/admin/team", label: "Spillere", match: (p: string) => p.startsWith("/admin/team") },
  { href: "/admin/kontakt", label: "Kontaktlenker", match: (p: string) => p.startsWith("/admin/kontakt") },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="-mb-0.5 flex gap-1 overflow-x-auto">
      {items.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "border-2 border-b-0 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              active
                ? "border-border bg-muted"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
