"use server";

import { updateTag } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { dbError, run } from "@/lib/cms/actions";
import { slugify } from "@/lib/cms/utils";
import { CACHE_TAGS } from "@/lib/supabase/public";

export interface TeamMemberInput {
  id?: string;
  name: string;
  role: string;
  pdga: number | null;
  image: string | null;
  bio: string;
}

export async function saveTeamMember(input: TeamMemberInput) {
  return run<{ id: string }>(async () => {
    const name = input.name.trim();
    if (!name) throw new Error("Spilleren må ha et navn.");
    const pdga = input.pdga && input.pdga > 0 ? Math.round(input.pdga) : null;

    const { supabase } = await requireEditor();
    const fields = {
      name,
      role: input.role.trim() || "Spiller",
      pdga,
      image_url: input.image || null,
      bio: input.bio.trim(),
    };

    if (input.id) {
      const { error } = await supabase
        .from("team_members")
        .update(fields)
        .eq("id", input.id);
      if (error) throw dbError(error);
      updateTag(CACHE_TAGS.team);
      return { id: input.id };
    }

    // Ny spiller: id brukes som anker (/team#navn) og legges sist.
    const base = slugify(name) || "spiller";
    const { data: existing } = await supabase
      .from("team_members")
      .select("id, sort_order");
    const ids = new Set((existing ?? []).map((row) => row.id as string));
    let id = base;
    for (let i = 2; ids.has(id); i++) id = `${base}-${i}`;
    const sortOrder =
      Math.max(0, ...(existing ?? []).map((row) => row.sort_order as number)) + 1;

    const { error } = await supabase
      .from("team_members")
      .insert({ ...fields, id, sort_order: sortOrder });
    if (error) throw dbError(error);
    updateTag(CACHE_TAGS.team);
    return { id };
  });
}

export async function deleteTeamMember(id: string) {
  return run(async () => {
    const { supabase } = await requireEditor();
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) throw dbError(error);
    updateTag(CACHE_TAGS.team);
  });
}

/** Lagrer ny rekkefølge. ids er spillerne i ønsket rekkefølge. */
export async function reorderTeamMembers(ids: string[]) {
  return run(async () => {
    const { supabase } = await requireEditor();
    const results = await Promise.all(
      ids.map((id, index) =>
        supabase.from("team_members").update({ sort_order: index + 1 }).eq("id", id),
      ),
    );
    const failed = results.find((result) => result.error);
    if (failed?.error) throw dbError(failed.error);
    updateTag(CACHE_TAGS.team);
  });
}
