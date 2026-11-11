"use server";

import { updateTag } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { dbError, run } from "@/lib/cms/actions";
import { CACHE_TAGS } from "@/lib/supabase/public";
import { CONTACT_ICONS, type ContactIcon } from "@/data/site";

export interface ContactLinkInput {
  id?: string;
  icon: ContactIcon;
  label: string;
  href: string;
  external: boolean;
}

/** Erstatter hele listen med kontaktlenker i den rekkefølgen den sendes inn. */
export async function saveContactLinks(links: ContactLinkInput[]) {
  return run(async () => {
    const rows = links.map((link, index) => {
      const label = link.label.trim();
      const href = link.href.trim();
      if (!label) throw new Error(`Lenke ${index + 1} mangler tekst.`);
      if (!/^(https?:\/\/|mailto:)/.test(href)) {
        throw new Error(
          `Lenke ${index + 1} må starte med https://, http:// eller mailto:.`,
        );
      }
      if (!CONTACT_ICONS.includes(link.icon)) {
        throw new Error(`Lenke ${index + 1} har ugyldig ikon.`);
      }
      return {
        ...(link.id ? { id: link.id } : {}),
        icon: link.icon,
        label,
        href,
        external: link.external,
        sort_order: index + 1,
      };
    });

    const { supabase } = await requireEditor();

    const keepIds = rows.flatMap((row) => ("id" in row ? [row.id] : []));
    let remove = supabase.from("contact_links").delete();
    remove =
      keepIds.length > 0
        ? remove.not("id", "in", `(${keepIds.join(",")})`)
        : remove.not("id", "is", null);
    const { error: deleteError } = await remove;
    if (deleteError) throw dbError(deleteError);

    const existing = rows.filter((row) => "id" in row);
    const created = rows.filter((row) => !("id" in row));
    if (existing.length > 0) {
      const { error } = await supabase.from("contact_links").upsert(existing);
      if (error) throw dbError(error);
    }
    if (created.length > 0) {
      const { error } = await supabase.from("contact_links").insert(created);
      if (error) throw dbError(error);
    }

    updateTag(CACHE_TAGS.contact);
  });
}
