import type { Metadata } from "next";
import Link from "next/link";
import { teamMembers } from "@/data/team";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { PlayerAvatar } from "@/components/player-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spillerne i Team Bergen? – Diskgolfteamet fra Vestlandet",
  description:
    "Møt spillerne i Team Bergen? – Morten Dahlberg, Olav Breistein, Michael White og Erlend Johnsen. Diskgolf-entusiaster fra Bergen som konkurrerer lokalt og nasjonalt.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Møt teamet"
        lead="Fire spillere med ulik bakgrunn, men felles mål: å bli bedre og ha det gøy med diskgolf."
      >
        <nav className="flex flex-wrap gap-2 mt-8" aria-label="Gå til spiller">
          {teamMembers.map((member) => (
            <Button
              key={member.id}
              variant="outline"
              size="sm"
              render={<a href={`#${member.id}`} />}
            >
              {member.name.split(" ")[0]}
            </Button>
          ))}
        </nav>
      </PageHeader>

      <Section>
        <div className="grid gap-12">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              id={member.id}
              className="flex flex-col md:flex-row md:items-stretch gap-0 scroll-mt-24 overflow-hidden border-2 border-border shadow-sm"
            >
              <figure className="md:w-2/5 shrink-0 relative">
                <PlayerAvatar
                  name={member.name}
                  size="lg"
                  className="h-64 md:h-full md:absolute md:inset-0"
                />
              </figure>
              <div className="bg-muted md:w-3/5 p-6 md:p-10">
                <h2 className="text-2xl font-bold mb-3">{member.name}</h2>
                <div className="flex gap-2 flex-wrap mb-5">
                  <Badge>{member.role}</Badge>
                  {member.pdga && (
                    <Badge
                      variant="outline"
                      render={
                        <a
                          href={`https://www.pdga.com/player/${member.pdga}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      PDGA #{member.pdga}
                    </Badge>
                  )}
                </div>
                <div className="prose-compact">{member.bio}</div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Vil du vite mer?
        </h2>
        <p className="text-muted-foreground max-w-xl mb-8">
          Ta kontakt om du er interessert i samarbeid eller har spørsmål om
          teamet.
        </p>
        <Button render={<Link href="/kontakt" />}>Kontakt oss</Button>
      </Section>
    </>
  );
}
