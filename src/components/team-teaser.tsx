import Link from "next/link";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/team";
import { PlayerAvatar } from "./player-avatar";

export function TeamTeaser() {
  return (
    <section className="py-16 md:py-24 bg-muted border-y-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Møt folkene i Team Bergen?
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Fire spillere med ulik bakgrunn, men felles mål: å bli bedre og ha det
          gøy med diskgolf.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <Link key={member.id} href={`/team#${member.id}`} className="group">
              <div className="border-2 border-border overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <PlayerAvatar name={member.name} image={member.image} />
              </div>
              <div className="mt-3">
                <p className="font-bold">{member.name.split(" ")[0]}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button render={<Link href="/team" />}>Les mer om spillerne</Button>
        </div>
      </div>
    </section>
  );
}
