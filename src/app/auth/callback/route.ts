import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeInternalPath } from "@/lib/cms/utils";

const NEXT_COOKIE = "tb_neste";

/** Google sender brukeren hit via Supabase med en engangskode. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeInternalPath(
    decodeURIComponent(request.cookies.get(NEXT_COOKIE)?.value ?? ""),
  );

  const redirectTo = (path: string) => {
    const response = NextResponse.redirect(new URL(path, origin));
    response.cookies.delete(NEXT_COOKIE);
    return response;
  };

  if (!code) return redirectTo("/logg-inn?feil=innlogging");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirectTo("/logg-inn?feil=innlogging");

  const { data: isEditor } = await supabase.rpc("is_editor");
  if (!isEditor) {
    await supabase.auth.signOut();
    return redirectTo("/logg-inn?feil=ingen-tilgang");
  }

  return redirectTo(next);
}
