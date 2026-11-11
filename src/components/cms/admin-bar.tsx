"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "@base-ui/react/switch";
import { useEditor } from "./editor-provider";
import { cn } from "@/lib/utils";

const linkClass =
  "px-2.5 py-1.5 text-xs font-semibold text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/10 hover:text-secondary-foreground";

/** Flytende verktøylinje som bare vises for innloggede redaktører. */
export function AdminBar() {
  const { isEditor, editMode, setEditMode, signOut, email } = useEditor();
  const pathname = usePathname();
  if (!isEditor) return null;

  const inAdmin = pathname.startsWith("/admin");

  return (
    <div
      role="toolbar"
      aria-label="Redaktørverktøy"
      className="fixed bottom-4 left-1/2 z-[80] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto border-2 border-border bg-secondary p-1 text-secondary-foreground shadow-md"
    >
      <span
        className="hidden items-center gap-2 px-2 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary-foreground/60 sm:flex"
        title={email ?? undefined}
      >
        <span className="size-2 bg-primary" aria-hidden />
        Redaktør
      </span>

      {!inAdmin && (
        <label className="flex cursor-pointer items-center gap-2 border-x border-secondary-foreground/15 px-2.5 py-1 text-xs font-semibold">
          <Switch.Root
            checked={editMode}
            onCheckedChange={(checked) => setEditMode(checked)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 items-center border-2 border-secondary-foreground/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              editMode ? "bg-primary" : "bg-transparent",
            )}
          >
            <Switch.Thumb
              className={cn(
                "block size-3 transition-transform",
                editMode
                  ? "translate-x-[1.05rem] bg-secondary"
                  : "translate-x-0.5 bg-secondary-foreground/80",
              )}
            />
          </Switch.Root>
          Rediger siden
        </label>
      )}

      <Link href="/admin" className={linkClass}>
        Admin
      </Link>
      <Link href="/admin/innlegg/ny" className={linkClass}>
        Nytt innlegg
      </Link>
      <button type="button" onClick={() => void signOut()} className={linkClass}>
        Logg ut
      </button>
    </div>
  );
}
