import type { ReactNode } from "react";
import { getSiteContent } from "@/lib/cms/data";
import { Markdown } from "@/components/markdown";
import { EditableRegion } from "./editable-region";

type Tag = "p" | "span" | "div" | "h1" | "h2" | "h3";

interface EditableTextProps {
  /** Unik nøkkel, f.eks. «home.hero.lead». */
  id: string;
  /** Teksten som vises når ingen har redigert den. */
  fallback: string;
  /** Navn som vises i redigeringsvinduet. */
  label: string;
  as?: Tag;
  className?: string;
  /** Flere avsnitt, fet/kursiv og lenker via markdown. */
  markdown?: boolean;
  /** Egen visning av verdien, f.eks. en punktliste. */
  render?: (value: string) => ReactNode;
  /** Hjelpetekst i redigeringsvinduet. */
  hint?: string;
}

/**
 * Tekst som redaktører kan endre direkte på siden. Henter verdien fra
 * Supabase (cachet) og faller tilbake til standardteksten.
 */
export async function EditableText({
  id,
  fallback,
  label,
  as: Tag = "p",
  className,
  markdown = false,
  render,
  hint,
}: EditableTextProps) {
  const content = await getSiteContent();
  const value = content[id] ?? fallback;

  let element: ReactNode;
  if (render) {
    element = render(value);
  } else if (markdown) {
    element = <Markdown className={className}>{value}</Markdown>;
  } else {
    element = <Tag className={className}>{value}</Tag>;
  }

  return (
    <EditableRegion
      contentKey={id}
      value={value}
      fallback={fallback}
      label={label}
      multiline={markdown || Boolean(render)}
      markdown={markdown}
      hint={hint}
    >
      {element}
    </EditableRegion>
  );
}
