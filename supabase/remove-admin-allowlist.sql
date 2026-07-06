-- Remove admin allowlist authorization for this single wedding website.
-- Run manually in Supabase SQL Editor only if the previous admin_users
-- allowlist policies were already applied and authenticated admin edits are
-- still rejected after login.

drop policy if exists "Authenticated admin can manage wedding settings" on wedding_settings;
drop policy if exists "Authenticated admin can manage wedding events" on wedding_events;
drop policy if exists "Authenticated admin can manage wedding gallery" on wedding_gallery;
drop policy if exists "Authenticated admin can manage wedding love stories" on wedding_love_stories;
drop policy if exists "Authenticated admin can manage wedding bank accounts" on wedding_bank_accounts;
drop policy if exists "Authenticated admin can read all wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated admin can update wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated admin can delete wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated admin can manage wedding guests" on wedding_guests;
drop policy if exists "Authenticated admin can manage message templates" on message_templates;
drop policy if exists "Authenticated users can manage wedding settings" on wedding_settings;
drop policy if exists "Authenticated users can manage wedding events" on wedding_events;
drop policy if exists "Authenticated users can manage wedding gallery" on wedding_gallery;
drop policy if exists "Authenticated users can manage wedding love stories" on wedding_love_stories;
drop policy if exists "Authenticated users can manage wedding bank accounts" on wedding_bank_accounts;
drop policy if exists "Authenticated users can read all wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated users can update wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated users can delete wedding wishes" on wedding_wishes;
drop policy if exists "Authenticated users can manage wedding guests" on wedding_guests;
drop policy if exists "Authenticated users can manage message templates" on message_templates;

create policy "Authenticated users can manage wedding settings"
on wedding_settings
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage wedding events"
on wedding_events
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage wedding gallery"
on wedding_gallery
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage wedding love stories"
on wedding_love_stories
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage wedding bank accounts"
on wedding_bank_accounts
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can read all wedding wishes"
on wedding_wishes
for select
to authenticated
using (true);

create policy "Authenticated users can update wedding wishes"
on wedding_wishes
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete wedding wishes"
on wedding_wishes
for delete
to authenticated
using (true);

create policy "Authenticated users can manage wedding guests"
on wedding_guests
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage message templates"
on message_templates
for all
to authenticated
using (true)
with check (true);
