-- Team Bergen? CMS
-- Kjør hele filen i Supabase → SQL Editor. Den kan kjøres flere ganger.
--
-- Sikkerhetsmodell:
--   * Alle kan lese offentlig innhold (anon).
--   * Bare innloggede brukere med e-post i public.editors kan skrive.
--   * Dette håndheves med Row Level Security, uavhengig av koden i appen.

-- ---------------------------------------------------------------------------
-- Felles: updated_at-trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Redaktører
-- ---------------------------------------------------------------------------
create table if not exists public.editors (
  email text primary key check (email = lower(email)),
  name text,
  created_at timestamptz not null default now()
);

alter table public.editors enable row level security;
-- Ingen policies og ingen grants: tabellen leses kun via is_editor().

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.editors e
    where e.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_editor() from public;
grant execute on function public.is_editor() to anon, authenticated;

insert into public.editors (email) values
  ('erlendjohns@gmail.com'),
  ('eirik.lauritsen@gmail.com'),
  ('goldengoal11@gmail.com'),
  ('cool.olav@gmail.com')
on conflict (email) do nothing;

-- ---------------------------------------------------------------------------
-- Redigerbare tekster (nøkkel → tekst/markdown)
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key check (key ~ '^[a-z0-9][a-z0-9._-]*$'),
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null default auth.uid()
);

-- ---------------------------------------------------------------------------
-- Spillere
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  role text not null default 'Spiller',
  pdga integer check (pdga is null or pdga > 0),
  image_url text,
  bio text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Kontaktlenker («Finn oss her»)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_links (
  id uuid primary key default gen_random_uuid(),
  icon text not null check (
    icon in ('email', 'instagram', 'facebook', 'youtube', 'tiktok', 'snapchat', 'spotify', 'discord', 'link')
  ),
  label text not null check (length(trim(label)) > 0),
  href text not null check (href ~ '^(https?://|mailto:)'),
  external boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Blogginnlegg
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(trim(title)) > 0),
  excerpt text not null default '',
  body text not null default '',
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  author_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx
  on public.posts (status, published_at desc);

-- ---------------------------------------------------------------------------
-- updated_at-triggere
-- ---------------------------------------------------------------------------
drop trigger if exists set_updated_at on public.site_content;
create trigger set_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.team_members;
create trigger set_updated_at before update on public.team_members
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.contact_links;
create trigger set_updated_at before update on public.contact_links
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.posts;
create trigger set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Grants (Data API eksponerer ikke nye tabeller automatisk)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on public.site_content, public.team_members, public.contact_links, public.posts
  to anon, authenticated;

grant insert, update, delete on public.site_content, public.team_members, public.contact_links, public.posts
  to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.site_content enable row level security;
alter table public.team_members enable row level security;
alter table public.contact_links enable row level security;
alter table public.posts enable row level security;

-- site_content
drop policy if exists "Alle kan lese tekster" on public.site_content;
create policy "Alle kan lese tekster" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "Redaktører kan endre tekster" on public.site_content;
create policy "Redaktører kan endre tekster" on public.site_content
  for all to authenticated
  using ((select public.is_editor()))
  with check ((select public.is_editor()));

-- team_members
drop policy if exists "Alle kan lese spillere" on public.team_members;
create policy "Alle kan lese spillere" on public.team_members
  for select to anon, authenticated using (true);

drop policy if exists "Redaktører kan endre spillere" on public.team_members;
create policy "Redaktører kan endre spillere" on public.team_members
  for all to authenticated
  using ((select public.is_editor()))
  with check ((select public.is_editor()));

-- contact_links
drop policy if exists "Alle kan lese kontaktlenker" on public.contact_links;
create policy "Alle kan lese kontaktlenker" on public.contact_links
  for select to anon, authenticated using (true);

drop policy if exists "Redaktører kan endre kontaktlenker" on public.contact_links;
create policy "Redaktører kan endre kontaktlenker" on public.contact_links
  for all to authenticated
  using ((select public.is_editor()))
  with check ((select public.is_editor()));

-- posts: publiserte er offentlige, utkast kun for redaktører
drop policy if exists "Alle kan lese publiserte innlegg" on public.posts;
create policy "Alle kan lese publiserte innlegg" on public.posts
  for select to anon, authenticated
  using (status = 'published' or (select public.is_editor()));

drop policy if exists "Redaktører kan opprette innlegg" on public.posts;
create policy "Redaktører kan opprette innlegg" on public.posts
  for insert to authenticated with check ((select public.is_editor()));

drop policy if exists "Redaktører kan endre innlegg" on public.posts;
create policy "Redaktører kan endre innlegg" on public.posts
  for update to authenticated
  using ((select public.is_editor()))
  with check ((select public.is_editor()));

drop policy if exists "Redaktører kan slette innlegg" on public.posts;
create policy "Redaktører kan slette innlegg" on public.posts
  for delete to authenticated using ((select public.is_editor()));

-- ---------------------------------------------------------------------------
-- Bilder (Supabase Storage)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Redaktører kan laste opp bilder" on storage.objects;
create policy "Redaktører kan laste opp bilder" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_editor()));

drop policy if exists "Redaktører kan endre bilder" on storage.objects;
create policy "Redaktører kan endre bilder" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_editor()));

drop policy if exists "Redaktører kan slette bilder" on storage.objects;
create policy "Redaktører kan slette bilder" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_editor()));

-- ---------------------------------------------------------------------------
-- Startdata: dagens spillere og kontaktlenker
-- ---------------------------------------------------------------------------
insert into public.team_members (id, name, role, pdga, image_url, sort_order, bio) values
  ('morten-dahlberg', 'Morten Dahlberg', 'Teamleder', 222425, '/images/morten.webp', 1,
   'Morten er en engasjert og jovial kar som legger ned enormt mye arbeid for diskgolf på Vestlandet. Han er en sentral figur i miljøet gjennom sin rolle som arrangør av flere store vestlandsturneringer som Vestkysttouren 2025, Bergen Diskgolf Marathon og stemningsfulle halloween-turneringer med glødende discer.

Med et ønske om å løfte spillere i Bergen og omegn til norgestoppen, tok Morten initiativet til å opprette Team Bergen?.'),
  ('eirik-lauritsen', 'Eirik Lauritsen', 'Sponsor- og arrangementsansvarlig', 278349, null, 2,
   'Eirik har på kort tid gjort seg bemerket i diskgolfmiljøet i Bergen. Han er aktiv lokalt og er blant annet primus motor bak Vestkyst Touren, der han har gjort en formidabel jobb med å stable en gammel storhet på beina igjen. En av hans store bidrag er arbeidet med å innhente gode sponsorer til deltakerne på touren.'),
  ('olav-breistein', 'Olav Breistein', 'Spiller', 59468, '/images/olav.webp', 3,
   'Olav er godt kjent både lokalt og nasjonalt i diskgolfmiljøet. Han er engasjert i det som skjer hjemme i Bergen, og er du ute etter tips og triks, er Olav personen å spørre. Han er som regel å finne i toppen av konkurransene på Vestlandet, og klatrer ofte mot toppen nasjonalt. I 2021 ble han tatt ut til å representere Norge i EM.'),
  ('michael-white', 'Michael White', 'Spiller', 196859, null, 4,
   'Michael begynte med diskgolf i 2023 og har på kort tid utviklet seg til en sterk spiller. Med bakgrunn fra badminton på internasjonalt nivå har han overført mange av sine ferdigheter til diskgolf. Michael er opptatt av at alle skal trives med sporten på sin måte, og tar seg gjerne tid til en prat med alle han ser på banen. Han har begynt å hevde seg i toppen på Vestlandet og sikter høyt nasjonalt for kommende sesong.'),
  ('erlend-johnsen', 'Erlend Johnsen', 'Spiller', 94422, '/images/erlend.webp', 5,
   'Erlend er en trygg og imøtekommende person som er sentral i diskgolfmiljøet i Bergen. Alle som har spilt ukesgolf i Lynghaugparken vet hvem Erlend er - både fordi han er med på å arrangere, og fordi han som regel kjemper om seieren. Han legger ned mange timer for å forbedre sitt eget og andres spill, og har blant annet utviklet diskgolf-appen dgputt.')
on conflict (id) do nothing;

insert into public.contact_links (icon, label, href, external, sort_order)
select v.icon, v.label, v.href, v.external, v.sort_order
from (values
  ('email', 'teambergendg@gmail.com', 'mailto:teambergendg@gmail.com', false, 1),
  ('instagram', '@teambergendg', 'https://www.instagram.com/teambergendg/', true, 2),
  ('youtube', 'Team Bergen DG', 'https://www.youtube.com/@teambergendg', true, 3),
  ('tiktok', '@teambergendg', 'https://www.tiktok.com/@teambergendg', true, 4),
  ('snapchat', 'teambergen', 'https://www.snapchat.com/add/teambergen', true, 5),
  ('spotify', 'Team Bergen? Podcast', 'https://open.spotify.com/show/1B3UjZ9W9QT6WpAO8WMlut', true, 6),
  ('discord', 'Discord-serveren', 'https://discord.gg/jaTEbUNuJe', true, 7)
) as v (icon, label, href, external, sort_order)
where not exists (select 1 from public.contact_links);
