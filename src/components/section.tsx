import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  variant?: 'default' | 'alt' | 'primary' | 'accent' | 'teal';
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}

const bgClasses: Record<string, string> = {
  default: 'bg-background',
  alt: 'bg-muted',
  primary: 'hero-gradient text-white bg-noise',
  accent: 'bg-accent text-accent-foreground',
  teal: 'bg-team-teal text-white bg-noise',
};

export function Section({
  id,
  variant = 'default',
  narrow = false,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('section-padding', bgClasses[variant], className)}>
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8',
          narrow ? 'max-w-3xl' : 'max-w-6xl'
        )}
      >
        {children}
      </div>
    </section>
  );
}
