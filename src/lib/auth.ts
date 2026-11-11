import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

export interface EditorSession {
  supabase: ServerClient;
  user: User;
}

/** Returnerer innlogget redaktør, eller null. */
export async function getEditor(): Promise<EditorSession | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isEditor } = await supabase.rpc("is_editor");
  if (!isEditor) return null;

  return { supabase, user };
}

/** For server actions: kaster hvis brukeren ikke er redaktør. */
export async function requireEditor(): Promise<EditorSession> {
  const editor = await getEditor();
  if (!editor) {
    throw new Error("Du må være logget inn som redaktør for å gjøre dette.");
  }
  return editor;
}

/** For admin-sider: sender brukeren til innlogging ved manglende tilgang. */
export async function requireEditorPage(path = "/admin"): Promise<EditorSession> {
  const editor = await getEditor();
  if (!editor) {
    redirect(`/logg-inn?neste=${encodeURIComponent(path)}`);
  }
  return editor;
}

export function displayName(user: User): string {
  const meta = user.user_metadata ?? {};
  return (
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    user.email ??
    "Team Bergen?"
  );
}
