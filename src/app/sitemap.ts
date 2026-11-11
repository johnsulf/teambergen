import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/cms/data";

const base = "https://teambergen.no";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const latest = posts[0]?.published_at ? new Date(posts[0].published_at) : undefined;

  return [
    { url: base },
    { url: `${base}/team` },
    { url: `${base}/om-oss` },
    { url: `${base}/podcast` },
    { url: `${base}/blogg`, lastModified: latest },
    { url: `${base}/kontakt` },
    ...posts.map((post) => ({
      url: `${base}/blogg/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : undefined,
    })),
  ];
}
