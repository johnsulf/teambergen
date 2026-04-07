import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  lead?: string;
  centered?: boolean;
  children?: ReactNode;
}

export function PageHeader({
  title,
  lead,
  centered = false,
  children,
}: PageHeaderProps) {
  return (
    <header className="hero-gradient bg-noise relative overflow-hidden min-h-[40vh] flex items-center">
      {/* Decorative blurred orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-[25rem] h-[25rem] rounded-full bg-team-gold/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <h1 className="animate-fade-up mb-4 text-white">{title}</h1>
          {lead && (
            <p
              className={`text-lg md:text-xl text-white/75 max-w-2xl animate-fade-up stagger-1 leading-relaxed ${centered ? 'mx-auto' : ''}`}
            >
              {lead}
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
