import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/cms/data";
import { PageHeader, pageHeaderLeadClass } from "@/components/page-header";
import { Section } from "@/components/section";
import { PostCard } from "@/components/blog/post-card";
import { EditableText } from "@/components/cms/editable-text";
import { EditorOnly } from "@/components/cms/editor-provider";
import { EditButton } from "@/components/cms/edit-button";

export const metadata: Metadata = {
  title: "Blogg – Nytt fra Team Bergen?",
  description:
    "Nytt fra Team Bergen?: turneringer, trening og det som skjer i diskgolfmiljøet i Bergen.",
  alternates: { canonical: "/blogg" },
};

export default async function BloggPage() {
  const posts = await getPublishedPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <PageHeader
        title="Blogg"
        lead={
          <EditableText
            id="blogg.lead"
            label="Blogg: ingress"
            fallback="Nytt fra teamet: turneringer, trening og det som skjer i diskgolfmiljøet i Bergen."
            className={pageHeaderLeadClass}
          />
        }
      >
        <EditorOnly always>
          <div className="mt-8">
            <EditButton href="/admin/innlegg/ny">Skriv nytt innlegg</EditButton>
          </div>
        </EditorOnly>
      </PageHeader>

      <Section>
        {first ? (
          <div className="grid gap-8">
            <PostCard post={first} featured />
            {rest.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border px-6 py-16 text-center">
            <p className="font-heading text-xl font-bold">Ingen innlegg ennå</p>
            <p className="mt-2 text-muted-foreground">
              Det første innlegget er på vei. Følg med!
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
