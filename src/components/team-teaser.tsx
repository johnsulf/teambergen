import Link from 'next/link';
import { teamMembers } from '@/data/team';
import { PlayerAvatar } from './player-avatar';

export function TeamTeaser() {
  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric header */}
        <div className="max-w-5xl mb-14 md:mb-20">
          <h2 className="mb-4 animate-fade-up">Møt folkene i Team Bergen?</h2>
          <p className="lead max-w-xl animate-fade-up stagger-1">
            Fire spillere med ulik bakgrunn, men felles mål: å bli bedre og ha
            det gøy med diskgolf.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <Link
              key={member.id}
              href={`/team#${member.id}`}
              className={`group relative animate-fade-up stagger-${index + 1}`}
            >
              <div className="overflow-hidden rounded-xl">
                <PlayerAvatar name={member.name} />
              </div>
              <div className="mt-4">
                <h3 className="text-base md:text-lg font-medium tracking-tight">
                  {member.name.split(' ')[0]}
                </h3>
                <span className="text-sm text-foreground/60">
                  {member.role}
                </span>
              </div>
              {/* Overlapping accent chip */}
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-team-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-[#261900]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 animate-fade-up stagger-4">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-team-gold text-[#261900] font-medium btn-accent"
          >
            Les mer om spillerne
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
