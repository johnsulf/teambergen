"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

export const NEXT_COOKIE = "tb_neste";

export function GoogleSignInButton({ next }: { next: string }) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const signIn = async () => {
    setPending(true);
    setError(null);
    // Husk hvor brukeren skal tilbake etter innlogging (redirect-URL-en holdes fast).
    document.cookie = `${NEXT_COOKIE}=${encodeURIComponent(next)}; path=/; max-age=600; samesite=lax`;
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setError(error.message);
      setPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => void signIn()}
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-3 border-2 border-border bg-card px-4 font-semibold shadow-sm transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-xs disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.65z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.28a12 12 0 0 0 0 10.8l4.01-3.1z" />
          <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.28 6.6l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75z" />
        </svg>
        {pending ? "Sender deg til Google…" : "Logg inn med Google"}
      </button>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </>
  );
}
