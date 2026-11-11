"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const className =
  "inline-flex items-center gap-1.5 border-2 border-border bg-primary px-2 py-0.5 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-2xs transition-transform hover:-translate-y-px";

function Pencil() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" />
    </svg>
  );
}

/** Liten gul «Rediger»-knapp som brukes i redigeringsmodus. */
export function EditButton({
  href,
  onClick,
  children = "Rediger",
  className: extra,
}: {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  if (href) {
    return (
      <Link href={href} className={cn(className, extra)}>
        <Pencil />
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(className, extra)}>
      <Pencil />
      {children}
    </button>
  );
}
