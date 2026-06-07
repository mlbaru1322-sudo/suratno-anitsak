# Admin Auth Setup

Admin area memakai Supabase Auth email/password untuk login sederhana.
Public invitation tetap bebas diakses.

## Membuat Admin User

1. Buka Supabase Dashboard.
2. Masuk ke Authentication > Users.
3. Klik Add user.
4. Isi email dan password admin.
5. Pastikan user sudah terbuat dan email/password tersebut digunakan di `/admin/login`.

Jangan hardcode email atau password di source code.

## Environment

Pastikan `.env.local` berisi:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Catatan:
- Client hanya memakai `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `SUPABASE_SERVICE_ROLE_KEY` tidak boleh dipakai di client component.

## Login dan Logout

- Buka `/admin/login`.
- Masuk memakai email dan password Supabase Auth.
- Setelah login, user diarahkan ke `/admin`.
- Tombol Logout tersedia di admin shell.

## RLS Production Hardening

Beberapa policy dev sebelumnya mungkin masih mengizinkan `anon` untuk membaca atau mengubah data admin.
Sebelum production, ganti policy admin dev-only dengan policy berbasis `authenticated`.

Rekomendasi:

```sql
-- Public invitation
-- Tetap boleh:
-- - read wedding_settings yang is_published = true
-- - read wedding_events
-- - read approved wedding_wishes
-- - insert wedding_wishes

-- Admin data
-- Ganti anon admin policies untuk wedding_guests dan message_templates.
-- Contoh arah production:

drop policy if exists "Dev admin can read guests" on wedding_guests;
drop policy if exists "Dev admin can insert guests" on wedding_guests;
drop policy if exists "Dev admin can update guests" on wedding_guests;
drop policy if exists "Dev admin can delete guests" on wedding_guests;

create policy "Authenticated admin can read guests"
on wedding_guests
for select
to authenticated
using (true);

create policy "Authenticated admin can insert guests"
on wedding_guests
for insert
to authenticated
with check (guest_name is not null and length(trim(guest_name)) > 0);

create policy "Authenticated admin can update guests"
on wedding_guests
for update
to authenticated
using (true)
with check (guest_name is not null and length(trim(guest_name)) > 0);

create policy "Authenticated admin can delete guests"
on wedding_guests
for delete
to authenticated
using (true);

drop policy if exists "Dev admin can update message templates" on message_templates;
drop policy if exists "Dev admin can insert message templates" on message_templates;

create policy "Authenticated admin can update message templates"
on message_templates
for update
to authenticated
using (true)
with check (
  title is not null
  and length(trim(title)) > 0
  and content is not null
  and length(trim(content)) > 0
);

create policy "Authenticated admin can insert message templates"
on message_templates
for insert
to authenticated
with check (
  title is not null
  and length(trim(title)) > 0
  and content is not null
  and length(trim(content)) > 0
);

notify pgrst, 'reload schema';
```

Untuk role admin yang lebih ketat, tambahkan tabel profile/roles atau custom claims di tahap berikutnya.
