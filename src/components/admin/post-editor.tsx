"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost, savePost, type PostInput } from "@/app/actions/posts";
import type { Post, PostStatus } from "@/lib/cms/types";
import { formatDate, formatDateTime, slugify } from "@/lib/cms/utils";
import { uploadImage } from "@/lib/cms/upload";
import { MarkdownEditor } from "@/components/cms/markdown-editor";
import { ImageField } from "@/components/cms/image-field";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Draft {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
}

function toDraft(post?: Post): Draft {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    body: post?.body ?? "",
    coverImageUrl: post?.cover_image_url ?? null,
  };
}

export function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const [draft, setDraft] = React.useState<Draft>(() => toDraft(post));
  const [saved, setSaved] = React.useState<Draft>(() => toDraft(post));
  const [status, setStatus] = React.useState<PostStatus>(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = React.useState(post?.published_at ?? null);
  const [updatedAt, setUpdatedAt] = React.useState(post?.updated_at ?? null);
  const [slugTouched, setSlugTouched] = React.useState(Boolean(post));
  const [error, setError] = React.useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const isNew = !post;

  // Advar før brukeren forlater siden med ulagrede endringer.
  React.useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const setTitle = (title: string) =>
    setDraft((d) => ({ ...d, title, slug: slugTouched ? d.slug : slugify(title) }));

  const save = React.useCallback(
    (nextStatus: PostStatus) => {
      setError(null);
      const input: PostInput = { ...draft, id: post?.id, status: nextStatus };
      startTransition(async () => {
        const result = await savePost(input);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        setSaved(draft);
        setStatus(result.data.status);
        setPublishedAt(result.data.publishedAt);
        setUpdatedAt(result.data.updatedAt);
        if (isNew) {
          router.replace(`/admin/innlegg/${result.data.id}`);
        } else {
          router.refresh();
        }
      });
    },
    [draft, post?.id, isNew, router],
  );

  // Ctrl/Cmd + S lagrer
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!pending) save(status);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, status, pending]);

  const remove = () => {
    if (!post) return;
    startTransition(async () => {
      const result = await deletePost(post.id);
      if (!result.ok) {
        setError(result.error);
        setConfirmDelete(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    });
  };

  const canSave = draft.title.trim().length > 0 && draft.slug.length > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="grid content-start gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            &larr; Alle innlegg
          </Link>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {pending ? "Lagrer…" : dirty ? "Ulagrede endringer" : updatedAt ? `Lagret ${formatDateTime(updatedAt)}` : ""}
          </p>
        </div>

        <label className="sr-only" htmlFor="post-title">Tittel</label>
        <input
          id="post-title"
          value={draft.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tittel på innlegget"
          className="w-full border-b-2 border-border bg-transparent pb-3 font-heading text-3xl font-bold tracking-tight outline-none placeholder:text-muted-foreground/40 focus-visible:border-primary md:text-4xl"
          autoFocus={isNew}
        />

        <Field label="Ingress" htmlFor="post-excerpt" hint="Vises i oversikten, øverst i innlegget og når innlegget deles.">
          <Textarea
            id="post-excerpt"
            value={draft.excerpt}
            rows={3}
            maxLength={400}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="En til to setninger om hva innlegget handler om."
          />
        </Field>

        <Field label="Innhold" htmlFor="post-body">
          <MarkdownEditor
            id="post-body"
            value={draft.body}
            onChange={(value) => update("body", value)}
            rows={22}
            variant="prose"
            placeholder="Skriv innlegget her…"
            onUploadImage={(file) => uploadImage(file, "blogg")}
          />
        </Field>
      </div>

      <aside className="grid content-start gap-6 lg:sticky lg:top-20 lg:self-start">
        <section className="border-2 border-border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b-2 border-border px-4 py-3">
            <h2 className="font-heading text-sm font-bold">Status</h2>
            <span
              className={cn(
                "border-2 border-border px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
                status === "published" ? "bg-primary" : "bg-muted text-muted-foreground",
              )}
            >
              {status === "published" ? "Publisert" : "Utkast"}
            </span>
          </div>
          <div className="grid gap-3 p-4">
            {status === "published" && publishedAt && (
              <p className="text-xs text-muted-foreground">Publisert {formatDate(publishedAt)}</p>
            )}
            {status === "draft" ? (
              <>
                <Button onClick={() => save("published")} disabled={pending || !canSave} size="lg">
                  Publiser
                </Button>
                <Button variant="outline" onClick={() => save("draft")} disabled={pending || !canSave || (!dirty && !isNew)}>
                  Lagre utkast
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => save("published")} disabled={pending || !canSave || !dirty} size="lg">
                  Lagre endringer
                </Button>
                <Button variant="outline" render={<Link href={`/blogg/${saved.slug}`} target="_blank" />}>
                  Se innlegget
                </Button>
                <Button variant="ghost" onClick={() => save("draft")} disabled={pending}>
                  Avpubliser
                </Button>
              </>
            )}
            {error && (
              <p role="alert" className="border-2 border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </section>

        <section className="grid gap-4 border-2 border-border bg-background p-4 shadow-sm">
          <Field
            label="Adresse"
            htmlFor="post-slug"
            hint={`teambergen.no/blogg/${draft.slug || "…"}`}
          >
            <Input
              id="post-slug"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9-]+/g, "-"),
                );
              }}
              onBlur={() => update("slug", slugify(draft.slug))}
            />
          </Field>
          <Field label="Forsidebilde">
            <ImageField
              value={draft.coverImageUrl}
              onChange={(url) => update("coverImageUrl", url)}
              folder="blogg"
            />
          </Field>
        </section>

        {post && (
          <section className="border-2 border-border bg-background p-4">
            {confirmDelete ? (
              <div className="grid gap-2">
                <p className="text-sm">Slette innlegget for godt?</p>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={remove} disabled={pending}>
                    Ja, slett
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirmDelete(false)} disabled={pending}>
                    Avbryt
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" className="text-destructive" onClick={() => setConfirmDelete(true)}>
                Slett innlegg
              </Button>
            )}
          </section>
        )}
      </aside>
    </div>
  );
}
