-- Phase 0 admin authorization patch.
-- Run manually in Supabase SQL Editor after creating the Supabase Auth admin user.
-- This patch is additive/non-destructive for data rows, but it replaces RLS
-- policies on project tables so authenticated users are no longer admins by
-- default.

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

alter table wedding_settings enable row level security;
alter table wedding_events enable row level security;
alter table wedding_gallery enable row level security;
alter table wedding_love_stories enable row level security;
alter table wedding_bank_accounts enable row level security;
alter table wedding_wishes enable row level security;
alter table wedding_guests enable row level security;
alter table message_templates enable row level security;
alter table admin_users enable row level security;

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
        'message_templates',
        'admin_users'
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

create policy "Authenticated users can read their own admin membership"
on admin_users
for select
to authenticated
using (user_id = auth.uid());

create policy "Authenticated admin can manage wedding settings"
on wedding_settings
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can manage wedding events"
on wedding_events
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can manage wedding gallery"
on wedding_gallery
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can manage wedding love stories"
on wedding_love_stories
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can manage wedding bank accounts"
on wedding_bank_accounts
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can read all wedding wishes"
on wedding_wishes
for select
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can update wedding wishes"
on wedding_wishes
for update
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can delete wedding wishes"
on wedding_wishes
for delete
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Authenticated admin can manage wedding guests"
on wedding_guests
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (
  exists (select 1 from admin_users where user_id = auth.uid())
  and guest_name is not null
  and length(btrim(guest_name)) > 0
);

create policy "Authenticated admin can manage message templates"
on message_templates
for all
to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (
  exists (select 1 from admin_users where user_id = auth.uid())
  and title is not null
  and length(btrim(title)) > 0
  and content is not null
  and length(btrim(content)) > 0
);

-- After confirming the admin user's auth.users.id, add exactly that user:
-- insert into admin_users (user_id, email)
-- values ('00000000-0000-0000-0000-000000000000', 'admin@example.com')
-- on conflict (user_id) do update set email = excluded.email;

notify pgrst, 'reload schema';
