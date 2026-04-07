import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getGradient(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const gradients = [
    'from-team-navy via-secondary to-team-navy-light',
    'from-secondary via-team-navy to-team-navy-light',
    'from-team-navy via-team-gold/60 to-team-navy/80',
    'from-team-navy-light via-secondary to-team-navy',
  ];

  return gradients[Math.abs(hash) % gradients.length];
}

const sizeClasses: Record<string, string> = {
  sm: 'w-12 h-12 text-xl',
  base: 'w-full aspect-square text-4xl md:text-5xl lg:text-6xl',
  lg: 'w-full aspect-square text-6xl md:text-7xl lg:text-8xl',
  xl: 'w-full aspect-square text-7xl md:text-8xl lg:text-9xl',
};

export function PlayerAvatar({ name, size = 'base', className }: PlayerAvatarProps) {
  const initials = getInitials(name);
  const gradientClass = getGradient(name);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl flex items-center justify-center bg-noise group-hover:scale-[1.02] transition-transform duration-500',
        sizeClasses[size],
        className
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-br opacity-90',
          gradientClass
        )}
      />

      {/* Subtle inner shadow/glow */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]" />

      {/* Initials */}
      <span
        className="relative z-10 text-white select-none drop-shadow-2xl translate-y-[0.05em]"
        aria-hidden="true"
        style={{
          fontFamily: "'Bevan', serif",
          textShadow: '2px 2px 0px rgba(0, 44, 77, 0.3)',
        }}
      >
        {initials}
      </span>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 blur-2xl rounded-full" />
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-team-gold/20 blur-xl rounded-full" />
    </div>
  );
}
