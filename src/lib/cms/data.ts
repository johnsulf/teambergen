import { cache } from "react";
import { contactItems, type ContactItem } from "@/data/site";
import { defaultTeamMembers, type TeamMember } from "@/data/team";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { CACHE_TAGS, createPublicClient } from "@/lib/supabase/public";
import type { Post, PostSummary } from "./types";

/**
 * Offentlige lesefunksjoner. Alle er cachet med tags og faller tilbake til
 * innholdet i koden hvis Supabase ikke er satt opp eller ikke svarer, slik at
 * nettsiden aldri står tom.
 */

function logError(scope: string, error: unknown) {
  console.error(`[cms] Klarte ikke å hente ${scope}:`, error);
}

export const getSiteContent = cache(
  async (): Promise<Record<string, string>> => {
    if (!isSupabaseConfigured) return {};
    try {
      const { data, error } = await createPublicClient([CACHE_TAGS.content])
        .from("site_content")
        .select("key, value");
      if (error) throw error;
      return Object.fromEntries(
        (data ?? []).map((row) => [row.key as string, row.value as string]),
      );
    } catch (error) {
      logError("tekster", error);
      return {};
    }
  },
);

interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  pdga: number | null;
  image_url: string | null;
  bio: string;
  sort_order: number;
}

export function mapTeamMember(row: TeamMemberRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    pdga: row.pdga,
    image: row.image_url,
    sortOrder: row.sort_order,
    bio: row.bio,
  };
}

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  if (!isSupabaseConfigured) return defaultTeamMembers;
  try {
    const { data, error } = await createPublicClient([CACHE_TAGS.team])
      .from("team_members")
      .select("id, name, role, pdga, image_url, bio, sort_order")
      .order("sort_order")
      .order("name");
    if (error) throw error;
    return (data as TeamMemberRow[]).map(mapTeamMember);
  } catch (error) {
    logError("spillere", error);
    return defaultTeamMembers;
  }
});

export const getContactLinks = cache(async (): Promise<ContactItem[]> => {
  if (!isSupabaseConfigured) return contactItems;
  try {
    const { data, error } = await createPublicClient([CACHE_TAGS.contact])
      .from("contact_links")
      .select("id, icon, label, href, external")
      .order("sort_order");
    if (error) throw error;
    return data as ContactItem[];
  } catch (error) {
    logError("kontaktlenker", error);
    return contactItems;
  }
});

const SUMMARY_COLUMNS =
  "id, slug, title, excerpt, cover_image_url, published_at, author_name";

export const getPublishedPosts = cache(
  async (limit?: number): Promise<PostSummary[]> => {
    if (!isSupabaseConfigured) return [];
    try {
      let query = createPublicClient([CACHE_TAGS.posts])
        .from("posts")
        .select(SUMMARY_COLUMNS)
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data as PostSummary[];
    } catch (error) {
      logError("innlegg", error);
      return [];
    }
  },
);

export const getPublishedPost = cache(
  async (slug: string): Promise<Post | null> => {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await createPublicClient([CACHE_TAGS.posts])
        .from("posts")
        .select("*")
        .eq("status", "published")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as Post | null;
    } catch (error) {
      logError(`innlegget «${slug}»`, error);
      return null;
    }
  },
);
