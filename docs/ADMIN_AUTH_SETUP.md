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

`supabase/production-policies.sql` adalah file policy final untuk semua tabel wedding invitation.
File ini membersihkan semua policy lama pada tabel project, lalu membuat ulang policy public dan admin dari satu tempat.

Jalankan setelah admin user dibuat di Supabase Auth:

```sql
-- Supabase SQL Editor
-- paste isi file supabase/production-policies.sql
```

File tersebut akan:
- enable RLS untuk semua tabel project;
- drop semua policy lama/dev-only pada tabel project;
- membuat public policy yang hanya membuka data undangan publik;
- membuat authenticated admin policy untuk mengelola data admin;
- menjalankan `notify pgrst, 'reload schema';`.

Public/anon tetap boleh:
- read `wedding_settings` dengan `is_published = true`;
- read `wedding_events`;
- read `wedding_gallery`;
- read `wedding_love_stories`;
- read `wedding_bank_accounts`;
- read `wedding_wishes` yang `is_approved = true`;
- insert `wedding_wishes` dengan `guest_name` wajib dan `guest_count >= 1`;
- read active `message_templates`.

Anon tidak boleh lagi:
- read/insert/update/delete `wedding_guests`;
- insert/update/delete `message_templates`;
- update/delete `wedding_wishes`;
- insert/update/delete `wedding_settings`, `wedding_events`, `wedding_gallery`, `wedding_love_stories`, dan `wedding_bank_accounts`;
- read unapproved wishes.

Authenticated admin boleh:
- select/insert/update/delete `wedding_settings`;
- select/insert/update/delete `wedding_events`;
- select/insert/update/delete `wedding_gallery`;
- select/insert/update/delete `wedding_love_stories`;
- select/insert/update/delete `wedding_bank_accounts`;
- select/update/delete `wedding_wishes`;
- read/insert/update/delete `wedding_guests`;
- read/insert/update/delete `message_templates`.

Untuk role admin yang lebih ketat, tambahkan tabel profile/roles atau custom claims di tahap berikutnya.

## Query Pengecekan Policy

Cek daftar policy aktif:

```sql
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'wedding_settings',
    'wedding_events',
    'wedding_gallery',
    'wedding_love_stories',
    'wedding_bank_accounts',
    'wedding_wishes',
    'wedding_guests',
    'message_templates'
  )
order by tablename, policyname;
```

Cek via client anon setelah SQL dijalankan:

```js
// Anon harus mengembalikan 0 row atau error RLS.
await supabase.from('wedding_guests').select('*')

// Anon harus gagal karena hanya authenticated admin yang boleh update.
await supabase
  .from('message_templates')
  .update({ title: 'Should Fail' })
  .eq('is_active', true)

// Public RSVP harus tetap berhasil jika input valid.
await supabase.from('wedding_wishes').insert({
  guest_name: 'Test Public RSVP',
  attendance_status: 'Hadir',
  guest_count: 1,
  message: 'Tes public insert'
})
```

Setelah login sebagai admin di `/admin/login`, cek manual:
- `/admin` bisa dibuka;
- `/admin/guests` bisa read/create/update/delete guest;
- `/admin/message-template` bisa read/update template;
- `/admin/wishes` bisa membaca semua wishes untuk kebutuhan moderation.
