import Link from "next/link";
import { requireEditorPage } from "@/lib/auth";
import type { Post } from "@/lib/cms/types";
import { formatDate, formatDateTime } from "@/lib/cms/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Innlegg" };

type Row = Pick<Post, "id" | "slug" | "title" | "status" | "published_at" | "updated_at" | "author_name">;

export default async function AdminPostsPage() {
  const { supabase } = await requireEditorPage();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, status, published_at, updated_at, author_name")
    .order("updated_at", { ascending: false });
  const posts = (data ?? []) as Row[];

  return (
    <>
      <AdminPageHeader
        title="Innlegg"
        description="Utkast er bare synlige for redaktører. Publiserte innlegg vises på /blogg."
        actions={<Button render={<Link href="/admin/innlegg/ny" />}>Nytt innlegg</Button>}
      />

      {error && (
        <p className="mb-6 border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Klarte ikke å hente innlegg: {error.message}
        </p>
      )}

      {posts.length === 0 ? (
        <div className="border-2 border-dashed border-border bg-background px-6 py-16 text-center">
          <p className="font-heading text-xl font-bold">Ingen innlegg ennå</p>
          <p className="mt-2 text-muted-foreground">Skriv det første – det tar ikke lang tid.</p>
          <Button className="mt-6" render={<Link href="/admin/innlegg/ny" />}>
            Skriv innlegg
          </Button>
        </div>
      ) : (
        <ul className="divide-y-2 divide-border border-2 border-border bg-background shadow-sm">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/innlegg/${post.id}`}
                className="group flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-primary/25"
              >
                <StatusBadge status={post.status} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold group-hover:underline decoration-2 underline-offset-4">
                    {post.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">/blogg/{post.slug}</p>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  {post.status === "published" ? `Publisert ${formatDate(post.published_at)}` : "Utkast"}
                  <br />
                  Endret {formatDateTime(post.updated_at)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: Post["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex w-24 justify-center border-2 border-border px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
        status === "published" ? "bg-primary" : "bg-muted text-muted-foreground",
      )}
    >
      {status === "published" ? "Publisert" : "Utkast"}
    </span>
  );
}
