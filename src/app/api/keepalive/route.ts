import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

/**
 * Kalles daglig av Vercel Cron (vercel.json), slik at Supabase-prosjektet
 * på gratisplanen ikke settes på pause på grunn av lite aktivitet.
 */
export async function GET() {
  if (!isSupabaseConfigured) {
    return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  const { error } = await supabase.from("site_content").select("key").limit(1);
  return Response.json({ ok: !error }, { status: error ? 500 : 200 });
}
