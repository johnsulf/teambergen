import type { Metadata } from 'next';
import Link from 'next/link';
import { teamMembers } from '@/data/team';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { PlayerAvatar } from '@/components/player-avatar';

export const metadata: Metadata = {
  title: 'Spillerne i Team Bergen? – Diskgolfteamet fra Vestlandet',
  description:
    'Møt spillerne i Team Bergen? – Morten Dahlberg, Olav Breistein, Michael White og Erlend Johnsen. Diskgolf-entusiaster fra Bergen som konkurrerer lokalt og nasjonalt.',
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Møt teamet"
        lead="Fire spillere med ulik bakgrunn, men felles mål: å bli bedre og ha det gøy med diskgolf."
      >
        {/* Jump links */}
        <nav
          className="jump-links mt-8 animate-fade-up stagger-2"
          aria-label="Gå til spiller"
        >
          {teamMembers.map((member) => (
            <a key={member.id} href={`#${member.id}`} className="jump-link">
              {member.name.split(' ')[0]}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Section variant="default">
        <div className="grid gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              id={member.id}
              className={`flex flex-col md:flex-row md:items-stretch gap-0 scroll-mt-24 overflow-hidden rounded-xl animate-fade-up stagger-${(index % 4) + 1}`}
            >
              <figure className="md:w-2/5 shrink-0 relative">
                <PlayerAvatar
                  name={member.name}
                  size="lg"
                  className="md:absolute md:inset-0 rounded-none h-64 md:h-full shrink-0"
                />
              </figure>
              <div className="bg-muted md:w-3/5 p-6 md:p-10">
                <h2 className="text-2xl mb-3">{member.name}</h2>
                <div className="flex gap-2 flex-wrap mb-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-team-gold text-[#261900] text-sm font-medium">
                    {member.role}
                  </span>
                  {member.pdga && (
                    <a
                      href={`https://www.pdga.com/player/${member.pdga}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-sm font-medium hover:bg-team-gold/10 transition-colors"
                    >
                      PDGA #{member.pdga}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="prose-compact">{member.bio}</div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="alt">
        <div className="max-w-5xl">
          <h2 className="mb-4">Vil du vite mer?</h2>
          <p className="lead max-w-xl mb-10">
            Ta kontakt om du er interessert i samarbeid eller har spørsmål om
            teamet.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-team-gold text-[#261900] font-medium btn-accent"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Kontakt oss
          </Link>
        </div>
      </Section>
    </>
  );
}
