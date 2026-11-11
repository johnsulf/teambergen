"use client";

import * as React from "react";
import { Markdown } from "@/components/markdown";
import { fieldBase } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  /** Gir en bildeknapp i verktøylinjen. Returnerer URL til opplastet bilde. */
  onUploadImage?: (file: File) => Promise<string>;
  variant?: "text" | "prose";
}

type Action = {
  label: string;
  title: string;
  apply: (selected: string) => { text: string; select?: [number, number] };
  block?: boolean;
};

const actions: Action[] = [
  { label: "B", title: "Fet", apply: (s) => ({ text: `**${s || "fet tekst"}**`, select: [2, 2 + (s || "fet tekst").length] }) },
  { label: "I", title: "Kursiv", apply: (s) => ({ text: `*${s || "kursiv"}*`, select: [1, 1 + (s || "kursiv").length] }) },
  { label: "H2", title: "Mellomtittel", block: true, apply: (s) => ({ text: `## ${s || "Mellomtittel"}` }) },
  { label: "H3", title: "Undertittel", block: true, apply: (s) => ({ text: `### ${s || "Undertittel"}` }) },
  { label: "•", title: "Punktliste", block: true, apply: (s) => ({ text: (s || "Punkt").split("\n").map((l) => `- ${l}`).join("\n") }) },
  { label: "1.", title: "Nummerert liste", block: true, apply: (s) => ({ text: (s || "Punkt").split("\n").map((l, i) => `${i + 1}. ${l}`).join("\n") }) },
  { label: "❝", title: "Sitat", block: true, apply: (s) => ({ text: (s || "Sitat").split("\n").map((l) => `> ${l}`).join("\n") }) },
  {
    label: "Lenke",
    title: "Lenke",
    apply: (s) => {
      const text = s || "lenketekst";
      return { text: `[${text}](https://)`, select: [text.length + 3, text.length + 11] };
    },
  },
];

/** Enkel markdown-editor med verktøylinje og forhåndsvisning. */
export function MarkdownEditor({
  id,
  value,
  onChange,
  rows = 10,
  placeholder,
  onUploadImage,
  variant = "text",
}: MarkdownEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [tab, setTab] = React.useState<"write" | "preview">("write");
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const insert = React.useCallback(
    (make: (selected: string) => { text: string; select?: [number, number] }, block = false) => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const selected = value.slice(start, end);
      const result = make(selected);
      let before = value.slice(0, start);
      const after = value.slice(end);
      // Blokkelementer trenger egen linje
      if (block && before && !before.endsWith("\n\n")) {
        before += before.endsWith("\n") ? "\n" : "\n\n";
      }
      const next = before + result.text + after;
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        const base = before.length;
        const [a, b] = result.select ?? [result.text.length, result.text.length];
        el.setSelectionRange(base + a, base + b);
      });
    },
    [value, onChange],
  );

  const handleFile = async (file: File | undefined) => {
    if (!file || !onUploadImage) return;
    setUploading(true);
    setUploadError(null);
    try {
      const url = await onUploadImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      insert(() => ({ text: `![${alt}](${url})` }), true);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Opplastingen feilet.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const tabClass = (active: boolean) =>
    cn(
      "px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
      active ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="border-2 border-border bg-card shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-border bg-muted px-1.5 py-1">
        <div role="tablist" className="flex">
          <button type="button" role="tab" aria-selected={tab === "write"} onClick={() => setTab("write")} className={tabClass(tab === "write")}>
            Skriv
          </button>
          <button type="button" role="tab" aria-selected={tab === "preview"} onClick={() => setTab("preview")} className={tabClass(tab === "preview")}>
            Forhåndsvis
          </button>
        </div>
        {tab === "write" && (
          <div className="flex flex-wrap items-center gap-0.5" aria-label="Formatering">
            {actions.map((action) => (
              <button
                key={action.title}
                type="button"
                title={action.title}
                aria-label={action.title}
                onClick={() => insert(action.apply, action.block)}
                className={cn(
                  "h-7 min-w-7 px-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:bg-background hover:text-foreground",
                  action.label === "I" && "italic",
                )}
              >
                {action.label}
              </button>
            ))}
            {onUploadImage && (
              <>
                <button
                  type="button"
                  title="Sett inn bilde"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="h-7 px-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
                >
                  {uploading ? "Laster opp…" : "Bilde"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  tabIndex={-1}
                  onChange={(e) => void handleFile(e.target.files?.[0])}
                />
              </>
            )}
          </div>
        )}
      </div>

      {tab === "write" ? (
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            fieldBase,
            "block resize-y border-0 py-3 font-mono text-[0.85rem] leading-relaxed shadow-none focus-visible:ring-0",
          )}
        />
      ) : (
        <div className="min-h-40 px-4 py-4">
          {value.trim() ? (
            <Markdown variant={variant}>{value}</Markdown>
          ) : (
            <p className="text-sm text-muted-foreground">Ingenting å forhåndsvise ennå.</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/20 px-3 py-1.5 text-[0.7rem] text-muted-foreground">
        <span>
          <code>**fet**</code> · <code>*kursiv*</code> · <code>[lenke](https://…)</code> · tom linje = nytt avsnitt
        </span>
        {uploadError && <span className="text-destructive">{uploadError}</span>}
      </div>
    </div>
  );
}
