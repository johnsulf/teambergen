import Link from "next/link";
import { getPublishedPosts } from "@/lib/cms/data";
import { Button } from "@/components/ui/button";
import { PostCard } from "./post-card";

/** «Siste fra bloggen» på forsiden. Vises ikke før det finnes innlegg. */
export async function LatestPosts() {
  const posts = await getPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted border-t-2 border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Blogg
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Siste fra bloggen</h2>
          </div>
          <Button variant="outline" render={<Link href="/blogg" />}>
            Alle innlegg
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
