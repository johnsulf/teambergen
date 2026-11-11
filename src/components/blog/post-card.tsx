import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/utils";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
  className?: string;
}

/** Kort for et blogginnlegg. Uten bilde får kortet en enkel typografisk flate. */
export function PostCard({ post, featured = false, className }: PostCardProps) {
  return (
    <Link
      href={`/blogg/${post.slug}`}
      className={cn(
        "group flex flex-col border-2 border-border bg-card shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md",
        featured && "md:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-border bg-secondary",
          featured
            ? "aspect-[16/9] border-b-2 md:aspect-auto md:w-1/2 md:border-r-2 md:border-b-0"
            : "aspect-[16/9] border-b-2",
        )}
      >
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 32rem, 100vw" : "(min-width: 768px) 20rem, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-5">
            <span className="font-brand text-4xl leading-none text-primary md:text-5xl">?</span>
          </div>
        )}
      </div>
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-8")}>
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        </p>
        <h3
          className={cn(
            "mt-2 font-bold tracking-tight decoration-primary decoration-4 underline-offset-4 group-hover:underline",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className={cn("mt-3 text-muted-foreground leading-relaxed", !featured && "line-clamp-3")}>
            {post.excerpt}
          </p>
        )}
        <span className="mt-auto pt-5 text-sm font-semibold">
          Les innlegget <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
