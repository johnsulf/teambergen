import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./env";

/** Supabase-klient for nettleseren. createBrowserClient gjenbruker én instans. */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
