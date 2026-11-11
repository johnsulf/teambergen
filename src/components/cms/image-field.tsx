"use client";

import * as React from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/cms/upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageFieldProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: "blogg" | "team";
  aspect?: "wide" | "photo";
  emptyText?: string;
}

/** Velg, last opp, bytt eller fjern ett bilde. */
export function ImageField({ value, onChange, folder, aspect = "wide", emptyText = "Ingen bilde valgt" }: ImageFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const handle = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      onChange(await uploadImage(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Opplastingen feilet.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handle(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "relative grid place-items-center overflow-hidden border-2 border-dashed border-border bg-muted transition-colors",
          aspect === "wide" ? "aspect-[16/9]" : "aspect-[3/2]",
          dragging && "border-solid bg-primary/30",
          value && "border-solid",
        )}
      >
        {value ? (
          <Image src={value} alt="" fill sizes="(min-width: 768px) 40rem, 100vw" className="object-cover" />
        ) : (
          <p className="px-4 text-center text-sm text-muted-foreground">
            {uploading ? "Laster opp…" : `${emptyText}. Dra et bilde hit eller velg fil.`}
          </p>
        )}
        {uploading && value && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 text-sm font-semibold">Laster opp…</div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {value ? "Bytt bilde" : "Velg bilde"}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)} disabled={uploading}>
            Fjern
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => void handle(e.target.files?.[0])}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
