"use client";

import { createClient } from "@/lib/supabase/client";

const BUCKET = "media";
const MAX_SIDE = 2000;

/** Skalerer ned store bilder og gjør dem om til WebP før opplasting. */
async function prepareImage(file: File): Promise<{ blob: Blob; ext: string; type: string }> {
  if (file.type === "image/gif" || !file.type.startsWith("image/")) {
    return { blob: file, ext: file.name.split(".").pop() ?? "img", type: file.type };
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.85),
    );
    if (blob) return { blob, ext: "webp", type: "image/webp" };
  } catch {
    // Faller tilbake til originalfilen
  }
  return { blob: file, ext: file.name.split(".").pop() ?? "img", type: file.type };
}

/** Laster opp et bilde til Supabase Storage og returnerer offentlig URL. */
export async function uploadImage(file: File, folder: "blogg" | "team"): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Filen må være et bilde.");
  if (file.size > 25 * 1024 * 1024) throw new Error("Bildet er for stort (maks 25 MB).");

  const { blob, ext, type } = await prepareImage(file);
  if (blob.size > 10 * 1024 * 1024) throw new Error("Bildet er for stort etter komprimering (maks 10 MB).");

  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: type,
    cacheControl: "31536000",
  });
  if (error) throw new Error(`Opplastingen feilet: ${error.message}`);

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
