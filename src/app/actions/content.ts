"use server";

import { updateTag } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { dbError, run } from "@/lib/cms/actions";
import { CACHE_TAGS } from "@/lib/supabase/public";

const KEY_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;
const MAX_LENGTH = 20_000;

export async function saveSiteContent(key: string, value: string) {
  return run(async () => {
    if (!KEY_PATTERN.test(key)) throw new Error("Ugyldig tekstnøkkel.");
    const text = value.trim();
    if (!text) throw new Error("Teksten kan ikke være tom.");
    if (text.length > MAX_LENGTH) throw new Error("Teksten er for lang.");

    const { supabase, user } = await requireEditor();
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: text, updated_by: user.id });
    if (error) throw dbError(error);

    updateTag(CACHE_TAGS.content);
  });
}

/** Sletter den lagrede teksten, slik at standardteksten i koden vises igjen. */
export async function resetSiteContent(key: string) {
  return run(async () => {
    if (!KEY_PATTERN.test(key)) throw new Error("Ugyldig tekstnøkkel.");
    const { supabase } = await requireEditor();
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) throw dbError(error);
    updateTag(CACHE_TAGS.content);
  });
}
