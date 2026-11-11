import type { Metadata } from "next";
import { requireEditorPage, displayName } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

// Admin skal alltid rendres per forespørsel med brukerens sesjon.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin | Team Bergen?" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireEditorPage();

  return (
    <div className="grow bg-muted pb-28">
      <div className="border-b-2 border-border bg-background">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-x-6 gap-y-3 px-4 pt-8 sm:px-6">
          <div className="pb-4">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Admin
            </p>
            <p className="mt-1 text-sm">
              Logget inn som <span className="font-semibold">{displayName(user)}</span>
            </p>
          </div>
          <AdminNav />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
