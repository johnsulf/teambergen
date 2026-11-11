"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Status = "anonymous" | "checking" | "editor" | "denied";

interface EditorContextValue {
  status: Status;
  email: string | null;
  isEditor: boolean;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  signOut: () => Promise<void>;
}

const EditorContext = React.createContext<EditorContextValue | null>(null);

const EDIT_MODE_KEY = "tb-edit-mode";

/** Supabase lagrer sesjonen i cookies som starter med «sb-». */
function hasAuthCookie() {
  return document.cookie.split(";").some((c) => c.trim().startsWith("sb-"));
}

/**
 * Holder styr på om besøkende er en innlogget redaktør. Supabase-klienten
 * lastes bare inn når det finnes en sesjons-cookie, så vanlige besøkende
 * slipper den ekstra JavaScripten.
 */
export function EditorProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>("anonymous");
  const [email, setEmail] = React.useState<string | null>(null);
  const [editMode, setEditModeState] = React.useState(false);

  React.useEffect(() => {
    if (!hasAuthCookie()) return;

    let active = true;
    let unsubscribe: (() => void) | undefined;
    setStatus("checking");

    (async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const check = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!active) return;
        if (!user) {
          setStatus("anonymous");
          setEmail(null);
          return;
        }
        const { data } = await supabase.rpc("is_editor");
        if (!active) return;
        setEmail(user.email ?? null);
        setStatus(data ? "editor" : "denied");
      };

      await check();
      try {
        setEditModeState(window.localStorage.getItem(EDIT_MODE_KEY) === "1");
      } catch {
        // localStorage kan være blokkert
      }

      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
          setStatus("anonymous");
          setEmail(null);
        }
      });
      unsubscribe = () => data.subscription.unsubscribe();
    })();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const setEditMode = React.useCallback((value: boolean) => {
    setEditModeState(value);
    try {
      window.localStorage.setItem(EDIT_MODE_KEY, value ? "1" : "0");
    } catch {
      // ignorer
    }
  }, []);

  const signOut = React.useCallback(async () => {
    const { createClient } = await import("@/lib/supabase/client");
    await createClient().auth.signOut();
    setStatus("anonymous");
    setEmail(null);
    setEditMode(false);
    router.push("/");
    router.refresh();
  }, [router, setEditMode]);

  const value = React.useMemo<EditorContextValue>(
    () => ({
      status,
      email,
      isEditor: status === "editor",
      editMode: status === "editor" && editMode,
      setEditMode,
      signOut,
    }),
    [status, email, editMode, setEditMode, signOut],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const context = React.useContext(EditorContext);
  if (!context) throw new Error("useEditor må brukes innenfor <EditorProvider>");
  return context;
}

/** Viser innholdet bare for redaktører i redigeringsmodus. */
export function EditorOnly({
  children,
  always = false,
}: {
  children: React.ReactNode;
  /** Vis for redaktører også utenfor redigeringsmodus. */
  always?: boolean;
}) {
  const { isEditor, editMode } = useEditor();
  if (!isEditor || (!always && !editMode)) return null;
  return <>{children}</>;
}
