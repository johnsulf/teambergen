"use server";

import { updateTag } from "next/cache";
import { displayName, requireEditor } from "@/lib/auth";
import { dbError, run } from "@/lib/cms/actions";
import type { PostStatus } from "@/lib/cms/types";
import { SLUG_PATTERN } from "@/lib/cms/utils";
import { CACHE_TAGS } from "@/lib/supabase/public";

export interface PostInput {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  status: PostStatus;
}

export interface SavedPost {
  id: string;
  slug: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
}

export async function savePost(input: PostInput) {
  return run<SavedPost>(async () => {
    const title = input.title.trim();
    const slug = input.slug.trim();
    if (!title) throw new Error("Innlegget må ha en tittel.");
    if (!SLUG_PATTERN.test(slug)) {
      throw new Error("Adressen kan bare inneholde a–z, 0–9 og bindestrek.");
    }
    if (input.status !== "draft" && input.status !== "published") {
      throw new Error("Ugyldig status.");
    }

    const { supabase, user } = await requireEditor();

    const fields = {
      title,
      slug,
      excerpt: input.excerpt.trim(),
      body: input.body,
      cover_image_url: input.coverImageUrl || null,
      status: input.status,
    };

    let publishedAt: string | null = null;
    if (input.id) {
      const { data: existing, error: readError } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", input.id)
        .single();
      if (readError) throw dbError(readError);
      publishedAt = existing.published_at;
    }
    // Første gang innlegget publiseres, får det publiseringsdato.
    if (input.status === "published" && !publishedAt) {
      publishedAt = new Date().toISOString();
    }

    const query = input.id
      ? supabase
          .from("posts")
          .update({ ...fields, published_at: publishedAt })
          .eq("id", input.id)
      : supabase.from("posts").insert({
          ...fields,
          published_at: publishedAt,
          author_id: user.id,
          author_name: displayName(user),
        });

    const { data, error } = await query
      .select("id, slug, status, published_at, updated_at")
      .single();
    if (error) throw dbError(error);

    updateTag(CACHE_TAGS.posts);
    return {
      id: data.id,
      slug: data.slug,
      status: data.status,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
    };
  });
}

export async function deletePost(id: string) {
  return run(async () => {
    const { supabase } = await requireEditor();
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw dbError(error);
    updateTag(CACHE_TAGS.posts);
  });
}
