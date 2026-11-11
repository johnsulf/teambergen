import type { ActionResult } from "./types";

/** Pakker inn en server action slik at feil returneres som tekst til klienten. */
export async function run<T = undefined>(
  fn: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return (data === undefined ? { ok: true } : { ok: true, data }) as ActionResult<T>;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.";
    return { ok: false, error: message };
  }
}

/** Forklaringer på check-constraints i databasen (se supabase/migrations). */
const checkMessages: Record<string, string> = {
  contact_links_icon_check:
    "Databasen godtar ikke denne lenketypen ennå. Kjør den nyeste migrasjonen i supabase/migrations.",
  contact_links_href_check: "Lenken må starte med https://, http:// eller mailto:.",
  contact_links_label_check: "Alle lenker må ha en tekst.",
  posts_slug_check: "Adressen kan bare inneholde a–z, 0–9 og bindestrek.",
  posts_title_check: "Innlegget må ha en tittel.",
  team_members_name_check: "Spilleren må ha et navn.",
  team_members_pdga_check: "PDGA-nummeret må være et positivt tall.",
};

/** Gjør om Postgres-feil til forståelige meldinger. */
export function dbError(error: { code?: string; message: string }): Error {
  if (error.code === "23505") {
    return new Error("Adressen er allerede i bruk. Velg en annen.");
  }
  if (error.code === "42501") {
    return new Error("Du har ikke tilgang til å gjøre denne endringen.");
  }
  if (error.code === "23514") {
    const constraint = /check constraint "([^"]+)"/.exec(error.message)?.[1];
    const known = constraint ? checkMessages[constraint] : undefined;
    return new Error(
      known ?? `Noen av feltene har ugyldig format${constraint ? ` (${constraint})` : ""}.`,
    );
  }
  return new Error(error.message);
}
