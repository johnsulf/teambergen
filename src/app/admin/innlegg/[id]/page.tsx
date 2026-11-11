import { notFound } from "next/navigation";
import { requireEditorPage } from "@/lib/auth";
import type { Post } from "@/lib/cms/types";
import { PostEditor } from "@/components/admin/post-editor";

export const metadata = { title: "Rediger innlegg" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireEditorPage(`/admin/innlegg/${id}`);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return <PostEditor post={data as Post} />;
}
