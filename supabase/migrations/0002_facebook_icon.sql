-- Legger til Facebook som ikon for kontaktlenker.
-- Kjør i Supabase → SQL Editor hvis 0001_cms.sql allerede er kjørt.
alter table public.contact_links drop constraint if exists contact_links_icon_check;
alter table public.contact_links add constraint contact_links_icon_check check (
  icon in ('email', 'instagram', 'facebook', 'youtube', 'tiktok', 'snapchat', 'spotify', 'discord', 'link')
);
