"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { resetSiteContent, saveSiteContent } from "@/app/actions/content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { EditButton } from "./edit-button";
import { useEditor } from "./editor-provider";
import { MarkdownEditor } from "./markdown-editor";

interface EditableRegionProps {
  contentKey: string;
  value: string;
  fallback: string;
  label: string;
  multiline: boolean;
  markdown: boolean;
  hint?: string;
  children: React.ReactNode;
}

/** Klientdelen av EditableText: markering og redigeringsvindu. */
export function EditableRegion({
  contentKey,
  value,
  fallback,
  label,
  multiline,
  markdown,
  hint,
  children,
}: EditableRegionProps) {
  const { editMode } = useEditor();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  if (!editMode) return <>{children}</>;

  const openEditor = () => {
    setDraft(value);
    setError(null);
    setOpen(true);
  };

  const submit = (action: "save" | "reset") => {
    setError(null);
    startTransition(async () => {
      const result =
        action === "save"
          ? await saveSiteContent(contentKey, draft)
          : await resetSiteContent(contentKey);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  };

  const changed = draft.trim() !== value.trim();
  const isCustom = value !== fallback;

  return (
    <div className="relative -m-2 p-2 outline-2 outline-offset-0 outline-accent/50 outline-dashed transition-[outline-color] hover:outline-accent">
      {children}
      <EditButton onClick={openEditor} className="absolute -top-3 right-2 z-10">
        Rediger
      </EditButton>

      <Dialog open={open} onOpenChange={(next) => !pending && setOpen(next)}>
        <DialogContent>
          <DialogHeader title={label} description={hint ?? (isCustom ? "Tilpasset tekst" : "Standardtekst")} />
          <DialogBody>
            {markdown ? (
              <MarkdownEditor value={draft} onChange={setDraft} rows={8} />
            ) : (
              <Textarea
                aria-label={label}
                value={draft}
                rows={multiline ? 6 : 3}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && changed) submit("save");
                }}
                autoFocus
              />
            )}
            {error && (
              <p role="alert" className="border-2 border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </DialogBody>
          <DialogFooter className="justify-between">
            {isCustom ? (
              <Button variant="ghost" size="sm" onClick={() => submit("reset")} disabled={pending}>
                Tilbakestill til standard
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
                Avbryt
              </Button>
              <Button onClick={() => submit("save")} disabled={pending || !changed || !draft.trim()}>
                {pending ? "Lagrer…" : "Lagre"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
