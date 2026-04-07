'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/om-oss', label: 'Om oss' },
  { href: '/team', label: 'Teamet' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-surface">
        <nav className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="title text-xl">
            tb?
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-white/80 hover:text-team-gold font-medium tracking-tight transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Meny"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden glass-surface border-t border-white/10">
            <ul className="px-4 py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-white/90 hover:text-team-gold font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
