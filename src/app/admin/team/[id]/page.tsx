import { notFound } from "next/navigation";
import { requireEditorPage } from "@/lib/auth";
import { mapTeamMember } from "@/lib/cms/data";
import { TeamMemberForm } from "@/components/admin/team-member-form";

export const metadata = { title: "Rediger spiller" };

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireEditorPage(`/admin/team/${id}`);
  const { data } = await supabase
    .from("team_members")
    .select("id, name, role, pdga, image_url, bio, sort_order")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return <TeamMemberForm member={mapTeamMember(data)} />;
}
