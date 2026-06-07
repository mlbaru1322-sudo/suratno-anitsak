-- Final production RLS policies for the wedding invitation project.
-- Run this manually in Supabase SQL Editor after creating the admin user in
-- Supabase Auth. Do not run this from the Next.js app.

-- ---------------------------------------------------------------------------
-- PRODUCTION NOTES
-- ---------------------------------------------------------------------------
-- This project treats every Supabase Auth user with role `authenticated` as an
-- admin. Before using this for multiple clients/admin roles, add stricter role
-- checks through profiles/custom claims.
--
-- Never expose SUPABASE_SERVICE_ROLE_KEY in client components. The public app
-- should use only NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

-- ---------------------------------------------------------------------------
-- ENABLE RLS
-- ---------------------------------------------------------------------------

alter table wedding_settings enable row level security;
alter table wedding_events enable row level security;
alter table wedding_gallery enable row level security;
alter table wedding_love_stories enable row level security;
alter table wedding_bank_accounts enable row level security;
alter table wedding_wishes enable row level security;
alter table wedding_guests enable row level security;
alter table message_templates enable row level security;

-- ---------------------------------------------------------------------------
-- DEV POLICY CLEANUP
-- ---------------------------------------------------------------------------
-- RLS policies are additive. Drop every existing policy on the project tables
-- first so old DEV ONLY anon/admin policies cannot keep granting access.

do $$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = any(array[
        'wedding_settings',
        'wedding_events',
        'wedding_gallery',
        'wedding_love_stories',
        'wedding_bank_accounts',
        'wedding_wishes',
        'wedding_guests',
        'message_templates'
      ])
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- PUBLIC POLICIES
-- ---------------------------------------------------------------------------
-- Anonymous visitors can only read public invitation data and submit RSVP/wish
-- entries. They cannot manage admin-only data.

create policy "Public can read published wedding settings"
on wedding_settings
for select
to anon
using (is_published = true);

create policy "Public can read wedding events"
on wedding_events
for select
to anon
using (true);

create policy "Public can read wedding gallery"
on wedding_gallery
for select
to anon
using (true);

create policy "Public can read wedding love stories"
on wedding_love_stories
for select
to anon
using (true);

create policy "Public can read wedding bank accounts"
on wedding_bank_accounts
for select
to anon
using (true);

create policy "Public can read approved wedding wishes"
on wedding_wishes
for select
to anon
using (is_approved = true);

create policy "Public can submit wedding wishes"
on wedding_wishes
for insert
to anon
with check (
  guest_name is not null
  and length(btrim(guest_name)) > 0
  and coalesce(guest_count, 1) >= 1
);

create policy "Public can read active message templates"
on message_templates
for select
to anon
using (is_active = true);

-- ---------------------------------------------------------------------------
-- ADMIN AUTHENTICATED POLICIES
-- ---------------------------------------------------------------------------
-- In this one-site version, authenticated Supabase Auth users are admins.

create policy "Authenticated admin can manage wedding settings"
on wedding_settings
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can manage wedding events"
on wedding_events
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can manage wedding gallery"
on wedding_gallery
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can manage wedding love stories"
on wedding_love_stories
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can manage wedding bank accounts"
on wedding_bank_accounts
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can read all wedding wishes"
on wedding_wishes
for select
to authenticated
using (true);

create policy "Authenticated admin can update wedding wishes"
on wedding_wishes
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can delete wedding wishes"
on wedding_wishes
for delete
to authenticated
using (true);

create policy "Authenticated admin can manage wedding guests"
on wedding_guests
for all
to authenticated
using (true)
with check (
  guest_name is not null
  and length(btrim(guest_name)) > 0
);

create policy "Authenticated admin can manage message templates"
on message_templates
for all
to authenticated
using (true)
with check (
  title is not null
  and length(btrim(title)) > 0
  and content is not null
  and length(btrim(content)) > 0
);

notify pgrst, 'reload schema';
