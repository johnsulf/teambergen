import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./env";

/**
 * Supabase-klient med brukerens sesjon (cookies). Brukes i admin-sider,
 * server actions og route handlers. Gjør siden dynamisk.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Kalt fra en Server Component – proxy/klienten fornyer sesjonen.
        }
      },
    },
  });
}
