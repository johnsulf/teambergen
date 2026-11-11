import { requireEditorPage } from "@/lib/auth";
import type { ContactItem } from "@/data/site";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ContactLinksEditor } from "@/components/admin/contact-links-editor";

export const metadata = { title: "Kontaktlenker" };

export default async function AdminContactPage() {
  const { supabase } = await requireEditorPage("/admin/kontakt");
  const { data, error } = await supabase
    .from("contact_links")
    .select("id, icon, label, href, external")
    .order("sort_order");

  return (
    <>
      <AdminPageHeader
        title="Kontaktlenker"
        description="Lenkene i «Finn oss her» på kontaktsiden. Endringene vises når du lagrer."
      />
      {error ? (
        <p className="border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Klarte ikke å hente lenker: {error.message}
        </p>
      ) : (
        <ContactLinksEditor links={(data ?? []) as ContactItem[]} />
      )}
    </>
  );
}
