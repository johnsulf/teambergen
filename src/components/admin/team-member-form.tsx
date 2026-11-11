"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteTeamMember, saveTeamMember } from "@/app/actions/team";
import type { TeamMember } from "@/data/team";
import { MarkdownEditor } from "@/components/cms/markdown-editor";
import { ImageField } from "@/components/cms/image-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function TeamMemberForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const [name, setName] = React.useState(member?.name ?? "");
  const [role, setRole] = React.useState(member?.role ?? "Spiller");
  const [pdga, setPdga] = React.useState(member?.pdga ? String(member.pdga) : "");
  const [image, setImage] = React.useState<string | null>(member?.image ?? null);
  const [bio, setBio] = React.useState(member?.bio ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const pdgaNumber = pdga.trim() ? Number(pdga) : null;
    if (pdgaNumber !== null && (!Number.isInteger(pdgaNumber) || pdgaNumber <= 0)) {
      setError("PDGA-nummeret må være et heltall.");
      return;
    }
    startTransition(async () => {
      const result = await saveTeamMember({ id: member?.id, name, role, pdga: pdgaNumber, image, bio });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin/team");
      router.refresh();
    });
  };

  const remove = () => {
    if (!member) return;
    startTransition(async () => {
      const result = await deleteTeamMember(member.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin/team");
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit}>
      <Link href="/admin/team" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        &larr; Alle spillere
      </Link>
      <div className="mt-4">
        <AdminPageHeader
          title={member ? member.name : "Ny spiller"}
          actions={
            member && (
              <Button variant="outline" render={<Link href={`/team#${member.id}`} target="_blank" />}>
                Se på teamsiden
              </Button>
            )
          }
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid content-start gap-6 border-2 border-border bg-background p-5 shadow-sm md:p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Navn" htmlFor="member-name">
              <Input id="member-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Field>
            <Field label="Rolle" htmlFor="member-role">
              <Input id="member-role" value={role} onChange={(e) => setRole(e.target.value)} />
            </Field>
          </div>
          <Field label="PDGA-nummer" htmlFor="member-pdga" hint="Valgfritt. Gir lenke til spillerprofilen på pdga.com.">
            <Input
              id="member-pdga"
              inputMode="numeric"
              value={pdga}
              onChange={(e) => setPdga(e.target.value.replace(/\D/g, ""))}
              className="max-w-48"
            />
          </Field>
          <Field label="Om spilleren" htmlFor="member-bio">
            <MarkdownEditor id="member-bio" value={bio} onChange={setBio} rows={10} />
          </Field>
        </div>

        <aside className="grid content-start gap-6">
          <section className="grid gap-4 border-2 border-border bg-background p-4 shadow-sm">
            <Field label="Bilde" hint="Uten bilde vises initialene.">
              <ImageField value={image} onChange={setImage} folder="team" aspect="photo" />
            </Field>
          </section>

          <section className="grid gap-3 border-2 border-border bg-background p-4 shadow-sm">
            <Button type="submit" size="lg" disabled={pending || !name.trim()}>
              {pending ? "Lagrer…" : member ? "Lagre endringer" : "Legg til spiller"}
            </Button>
            {error && (
              <p role="alert" className="border-2 border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </section>

          {member && (
            <section className="border-2 border-border bg-background p-4">
              {confirmDelete ? (
                <div className="grid gap-2">
                  <p className="text-sm">Fjerne {member.name} fra teamsiden?</p>
                  <div className="flex gap-2">
                    <Button type="button" variant="destructive" onClick={remove} disabled={pending}>
                      Ja, fjern
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setConfirmDelete(false)}>
                      Avbryt
                    </Button>
                  </div>
                </div>
              ) : (
                <Button type="button" variant="ghost" className="text-destructive" onClick={() => setConfirmDelete(true)}>
                  Fjern spiller
                </Button>
              )}
            </section>
          )}
        </aside>
      </div>
    </form>
  );
}
