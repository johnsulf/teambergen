# Team Bergen?

Nettside for Team Bergen? – en gjeng diskgolf-entusiaster fra Bergen og omegn.

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router) med Tailwind CSS 4 og shadcn/ui (Base UI)
- [Supabase](https://supabase.com) – database, Google-innlogging og bildelagring
- [Vercel](https://vercel.com) – hosting og DNS for teambergen.no

## Utvikling

```bash
cp .env.example .env.local   # fyll inn Supabase-verdiene
npm install
npm run dev
```

Uten Supabase-variabler kjører siden med standardinnholdet fra koden.

## Innhold og redigering

- Redaktører logger inn med Google på `/logg-inn` (lenke «For teamet» i bunnteksten).
- Hvem som får redigere, styres av tabellen `public.editors` i Supabase.
- Innlogget får du en verktøylinje nederst på siden:
  - **Rediger siden** markerer tekster som kan endres direkte.
  - **Admin** (`/admin`) har blogginnlegg, spillere og kontaktlenker.
- Tekster lagres i `site_content`. Standardtekstene ligger i koden (`fallback`), så «Tilbakestill» henter dem tilbake.

### Database

Skjema, tilgangsregler (RLS) og startdata ligger i `supabase/migrations/`. Kjør filene i
Supabase → SQL Editor.

Legge til en ny redaktør:

```sql
insert into public.editors (email) values ('navn@gmail.com');
```

## Hosting

Siden hostes på Vercel. Hver push til `main` publiseres til [teambergen.no](https://teambergen.no),
og andre brancher får en egen preview-adresse. En daglig cron-jobb (`vercel.json`) holder
Supabase-prosjektet aktivt.
