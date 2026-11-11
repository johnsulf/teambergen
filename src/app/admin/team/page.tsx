import Link from "next/link";
import { requireEditorPage } from "@/lib/auth";
import { mapTeamMember } from "@/lib/cms/data";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { TeamList } from "@/components/admin/team-list";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Spillere" };

export default async function AdminTeamPage() {
  const { supabase } = await requireEditorPage("/admin/team");
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, pdga, image_url, bio, sort_order")
    .order("sort_order")
    .order("name");

  return (
    <>
      <AdminPageHeader
        title="Spillere"
        description="Rekkefølgen her er rekkefølgen på /team og på forsiden."
        actions={<Button render={<Link href="/admin/team/ny" />}>Legg til spiller</Button>}
      />
      {error ? (
        <p className="border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Klarte ikke å hente spillere: {error.message}
        </p>
      ) : (
        <TeamList members={(data ?? []).map(mapTeamMember)} />
      )}
    </>
  );
}
