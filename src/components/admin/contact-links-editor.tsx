"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveContactLinks, type ContactLinkInput } from "@/app/actions/contact";
import { CONTACT_ICONS, contactIconLabels, type ContactIcon, type ContactItem } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";

type Row = ContactLinkInput & { key: string };

const toRows = (links: ContactItem[]): Row[] =>
  links.map((link) => ({
    key: link.id ?? crypto.randomUUID(),
    id: link.id,
    icon: link.icon,
    label: link.label,
    href: link.href,
    external: link.external ?? true,
  }));

const iconButton =
  "grid size-9 place-items-center border-2 border-border bg-card text-sm transition-colors hover:bg-primary disabled:opacity-30 disabled:hover:bg-card";

export function ContactLinksEditor({ links }: { links: ContactItem[] }) {
  const router = useRouter();
  const [rows, setRows] = React.useState<Row[]>(() => toRows(links));
  const [saved, setSaved] = React.useState(() => JSON.stringify(toRows(links).map(({ key: _k, ...r }) => r)));
  const [message, setMessage] = React.useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = React.useTransition();

  const serialized = JSON.stringify(rows.map(({ key: _k, ...r }) => r));
  const dirty = serialized !== saved;

  const patch = (key: string, values: Partial<Row>) =>
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...values } : row)));

  const move = (index: number, delta: -1 | 1) =>
    setRows((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const add = () =>
    setRows((current) => [
      ...current,
      { key: crypto.randomUUID(), icon: "link", label: "", href: "https://", external: true },
    ]);

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveContactLinks(rows.map(({ key: _k, ...row }) => row));
      if (!result.ok) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      setSaved(serialized);
      setMessage({ type: "ok", text: "Lagret." });
      router.refresh();
    });
  };

  return (
    <div className="grid gap-6">
      <ol className="grid gap-3">
        {rows.map((row, index) => (
          <li key={row.key} className="grid gap-3 border-2 border-border bg-background p-4 shadow-sm md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-end">
            <label className="grid gap-1.5">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">Type</span>
              <NativeSelect
                value={row.icon}
                onChange={(e) => {
                  const icon = e.target.value as ContactIcon;
                  patch(row.key, { icon, external: icon !== "email" });
                }}
              >
                {CONTACT_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {contactIconLabels[icon]}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <label className="grid gap-1.5">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">Tekst</span>
              <Input value={row.label} onChange={(e) => patch(row.key, { label: e.target.value })} placeholder="@teambergendg" />
            </label>
            <label className="grid gap-1.5">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">Lenke</span>
              <Input
                value={row.href}
                onChange={(e) => patch(row.key, { href: e.target.value })}
                placeholder={row.icon === "email" ? "mailto:navn@eksempel.no" : "https://"}
              />
            </label>
            <div className="flex gap-1">
              <button type="button" className={iconButton} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Flytt opp">
                &uarr;
              </button>
              <button type="button" className={iconButton} onClick={() => move(index, 1)} disabled={index === rows.length - 1} aria-label="Flytt ned">
                &darr;
              </button>
              <button
                type="button"
                className={`${iconButton} hover:bg-destructive hover:text-destructive-foreground`}
                onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
                aria-label={`Fjern ${row.label || "lenke"}`}
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={add}>
          Legg til lenke
        </Button>
        <div className="flex flex-wrap items-center gap-3">
          {message && (
            <p role="status" className={message.type === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
              {message.text}
            </p>
          )}
          <Button variant="ghost" render={<Link href="/kontakt" target="_blank" />}>
            Se kontaktsiden
          </Button>
          <Button onClick={save} disabled={pending || !dirty} size="lg">
            {pending ? "Lagrer…" : "Lagre endringer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
