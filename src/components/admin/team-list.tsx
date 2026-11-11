"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { reorderTeamMembers } from "@/app/actions/team";
import type { TeamMember } from "@/data/team";
import { PlayerAvatar } from "@/components/player-avatar";

export function TeamList({ members: initial }: { members: TeamMember[] }) {
  const router = useRouter();
  const [members, setMembers] = React.useState(initial);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  React.useEffect(() => setMembers(initial), [initial]);

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= members.length) return;
    const next = [...members];
    [next[index], next[target]] = [next[target], next[index]];
    setMembers(next);
    setError(null);
    startTransition(async () => {
      const result = await reorderTeamMembers(next.map((m) => m.id));
      if (!result.ok) {
        setError(result.error);
        setMembers(members);
        return;
      }
      router.refresh();
    });
  };

  if (members.length === 0) {
    return (
      <div className="border-2 border-dashed border-border bg-background px-6 py-16 text-center text-muted-foreground">
        Ingen spillere ennå.
      </div>
    );
  }

  return (
    <>
      {error && (
        <p role="alert" className="mb-4 border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <ol className="divide-y-2 divide-border border-2 border-border bg-background shadow-sm" aria-busy={pending}>
        {members.map((member, index) => (
          <li key={member.id} className="flex items-center gap-4 px-4 py-3">
            <span className="w-6 text-center font-brand text-xl text-muted-foreground">{index + 1}</span>
            <div className="size-12 shrink-0 overflow-hidden border-2 border-border">
              <PlayerAvatar name={member.name} image={member.image ?? undefined} size="sm" className="size-full border-0 text-sm" />
            </div>
            <Link href={`/admin/team/${member.id}`} className="group min-w-0 flex-1">
              <p className="truncate font-bold decoration-2 underline-offset-4 group-hover:underline">{member.name}</p>
              <p className="truncate text-sm text-muted-foreground">{member.role}</p>
            </Link>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0 || pending}
                aria-label={`Flytt ${member.name} opp`}
                className="grid size-8 place-items-center border-2 border-border bg-card transition-colors hover:bg-primary disabled:opacity-30 disabled:hover:bg-card"
              >
                &uarr;
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === members.length - 1 || pending}
                aria-label={`Flytt ${member.name} ned`}
                className="grid size-8 place-items-center border-2 border-border bg-card transition-colors hover:bg-primary disabled:opacity-30 disabled:hover:bg-card"
              >
                &darr;
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
