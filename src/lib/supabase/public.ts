import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./env";

export const CACHE_TAGS = {
  content: "site-content",
  team: "team-members",
  contact: "contact-links",
  posts: "posts",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/**
 * Anonym Supabase-klient for offentlig innhold. Alle forespørsler caches av
 * Next.js med tags, slik at sidene kan være statiske og oppdateres med
 * updateTag() når en redaktør lagrer.
 */
export function createPublicClient(tags: CacheTag[], revalidate = 3600) {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: "force-cache",
          next: { revalidate, tags },
        }),
    },
  });
}
