"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/om-oss", label: "Om oss" },
  { href: "/team", label: "Teamet" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-border">
      <nav className="flex items-center justify-between max-w-5xl mx-auto h-14 px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-wide font-brand">
          TEAM <span className="text-primary"> BERGEN?</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              render={<Link href={item.href} />}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Meny"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </Button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden border-t border-border px-4 py-2 bg-background">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
