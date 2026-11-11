export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  status: PostStatus;
  published_at: string | null;
  author_id: string | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
}

export type PostSummary = Pick<
  Post,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image_url"
  | "published_at"
  | "author_name"
>;

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };
