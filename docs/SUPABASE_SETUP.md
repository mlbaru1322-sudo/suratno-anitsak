# Supabase Setup

Dokumen ini menyiapkan fondasi Supabase untuk website undangan pernikahan.
Tahap ini hanya setup struktur awal, belum mencakup admin dashboard, auth, upload foto, atau WhatsApp automation.

## 1. Buat Project Supabase

1. Login ke Supabase.
2. Buat project baru.
3. Simpan `Project URL` dan `anon public key` dari menu Project Settings > API.
4. Simpan `service_role key` hanya untuk server-side usage yang benar-benar membutuhkan akses admin.

## 2. Isi Environment Variables

Salin `.env.example` menjadi `.env.local`, lalu isi nilainya:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Catatan:
- `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` boleh dipakai di client.
- `SUPABASE_SERVICE_ROLE_KEY` tidak boleh dipakai atau diexpose ke client.
- Jangan commit `.env.local`.
- Helper read-only di `lib/services/wedding-service.ts` akan mengembalikan `null` atau array kosong jika env Supabase belum diisi.

## 3. Jalankan Schema SQL

1. Buka Supabase Dashboard.
2. Masuk ke SQL Editor.
3. Salin isi `supabase/schema.sql`.
4. Jalankan script tersebut.

Script ini akan membuat tabel awal:
- `wedding_settings`
- `wedding_events`
- `wedding_gallery`
- `wedding_love_stories`
- `wedding_bank_accounts`
- `wedding_wishes`
- `wedding_guests`
- `message_templates`

Script juga menambahkan trigger `updated_at` untuk `wedding_settings` dan `message_templates`, serta seed data dummy dari project saat ini.

## 4. Helper Read-Only

Project sudah menyiapkan helper dasar:

- `getWeddingSettings()`
- `getWeddingEvents()`
- `getWeddingGallery()`
- `getWeddingLoveStories()`
- `getWeddingBankAccounts()`
- `getApprovedWishes()`
- `getActiveMessageTemplate()`

## 5. Storage Foto

Storage bucket untuk foto cover, mempelai, gallery, dan upload akan dikerjakan di tahap berikutnya.
Untuk sekarang schema masih menyimpan URL gambar dalam kolom `text`.

## 6. Admin dan Auth

Admin dashboard, login/auth, CRUD data undangan, approval ucapan, upload foto, dan WhatsApp logic belum dikerjakan di tahap ini.
Fondasi ini hanya menyiapkan struktur agar fitur tersebut bisa dibangun berikutnya.
