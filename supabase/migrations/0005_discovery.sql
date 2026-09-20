-- Persist progression-index discoveries across devices.
alter table public.profiles
  add column if not exists discovered_powers text[] not null default '{}',
  add column if not exists discovered_shop_items text[] not null default '{}';