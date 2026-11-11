import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "@/lib/cms/data";
import { formatDate, readingMinutes } from "@/lib/cms/utils";
import { Markdown } from "@/components/markdown";
import { EditorOnly } from "@/components/cms/editor-provider";
import { EditButton } from "@/components/cms/edit-button";
import { PostCard } from "@/components/blog/post-card";
import { Section } from "@/components/section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Fant ikke innlegget" };

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/blogg/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : undefined,
      ...(post.cover_image_url
        ? { images: [{ url: post.cover_image_url, width: 1200, height: 675, alt: post.title }] }
        : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const others = (await getPublishedPosts(4)).filter((p) => p.id !== post.id).slice(0, 2);
  const minutes = readingMinutes(post.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.cover_image_url ?? undefined,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    publisher: { "@type": "SportsTeam", name: "Team Bergen?" },
    mainEntityOfPage: `https://teambergen.no/blogg/${post.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b-2 border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/blogg"
              className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              &larr; Blogg
            </Link>
            <EditorOnly always>
              <EditButton href={`/admin/innlegg/${post.id}`}>Rediger innlegg</EditButton>
            </EditorOnly>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-secondary-foreground/75 md:text-xl">
              {post.excerpt}
            </p>
          )}
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary-foreground/60">
            {post.author_name && (
              <span className="font-semibold text-secondary-foreground">{post.author_name}</span>
            )}
            <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
            <span aria-hidden className="size-1 bg-primary" />
            <span>{minutes} min lesing</span>
          </p>
        </div>
      </header>

      {post.cover_image_url && (
        <div className="mx-auto -mb-6 max-w-4xl px-4 pt-10 sm:px-6 md:pt-14">
          <figure className="relative aspect-[16/9] overflow-hidden border-2 border-border shadow-md">
            <Image
              src={post.cover_image_url}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <Markdown variant="prose">{post.body}</Markdown>
      </div>

      {others.length > 0 && (
        <Section variant="muted" className="border-t-2 border-border">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Flere innlegg</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((other) => (
              <PostCard key={other.id} post={other} />
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
