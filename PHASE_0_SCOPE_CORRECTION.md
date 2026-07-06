# Phase 0 Scope Correction

## Project Goal

Project ini adalah satu website undangan pernikahan untuk keluarga, bukan SaaS, bukan platform multi-client, dan bukan sistem multi-tenant.

Prioritas project setelah Phase 0 adalah tampilan, mobile experience, konsep visual, asset dekoratif, animasi yang nyaman, fitur utama yang berjalan, dan loading yang tetap wajar.

## Phase 0 Review

### Keep

- `ignoreBuildErrors` tetap dihapus dari `next.config.mjs`.
- `admin_users` tetap dipertahankan sebagai allowlist sederhana: admin atau bukan admin.
- RLS berbasis `admin_users` tetap dipertahankan karena ini proteksi paling penting untuk admin mutation.
- Middleware `/admin/:path*` tetap dipertahankan karena memberi route guard server-side tanpa membuat sistem role yang rumit.
- Custom HttpOnly admin cookie tetap dipertahankan karena middleware tidak bisa membaca Supabase browser session dari localStorage. Cookie ini adalah jembatan kecil, bukan enterprise session architecture.
- `/admin/unauthorized` tetap dipertahankan karena memberi state jelas untuk user valid tapi bukan admin.
- Client-side check di `AdminShell` tetap dipertahankan sebagai UX guard tambahan, bukan security boundary utama.
- SQL patch `supabase/phase-0-admin-authorization.sql` tetap dipertahankan untuk existing Supabase project.

### Simplify

NONE

Tidak ada bagian yang perlu disederhanakan saat ini. Menghapus custom admin cookie akan membuat route guard server-side hilang atau memaksa pemasangan auth SSR baru, yang justru lebih besar risikonya untuk project single-use ini.

### Remove

NONE

Tidak ada source code Phase 0 yang dihapus.

## Final Admin Flow

1. Admin membuka `/admin`.
2. Middleware mengecek cookie admin HttpOnly.
3. Jika belum login, user diarahkan ke `/admin/login`.
4. Login memakai Supabase email/password.
5. Setelah login, server route `/api/admin/session` memverifikasi token dan mengecek `admin_users`.
6. Jika user ada di `admin_users`, cookie admin dibuat dan dashboard bisa dibuka.
7. Jika user tidak ada di `admin_users`, user ditolak ke `/admin/unauthorized`.
8. Admin mutation tetap dibatasi RLS Supabase dengan check `admin_users`.

## Final Security Level

Security level saat ini cukup untuk website undangan single-use:

- Anonymous tidak bisa masuk admin.
- User Supabase biasa tidak otomatis menjadi admin.
- Admin mutation dibatasi oleh RLS, bukan hanya tombol/UI.
- Service role key tidak dipakai di browser.
- Tidak ada role hierarchy, permission matrix, tenant, organization, atau sistem enterprise.

Catatan jujur: patch SQL Phase 0 tetap harus dijalankan di Supabase, dan user admin pertama harus dimasukkan ke `admin_users`.

## Files Changed

- `PHASE_0_SCOPE_CORRECTION.md` - laporan review scope correction.

Tidak ada source code aplikasi yang diubah dalam scope correction ini.

## Validation

Typecheck:
PASS

Command:
`.\node_modules\.bin\tsc.cmd --noEmit --incremental false`

Exit code:
0

Build:
PASS

Command:
`cmd /c "npm run build > phase0-scope-build-output.log 2>&1 & echo EXIT_CODE:%ERRORLEVEL%"`

Exit code:
0

## Deferred

Pekerjaan berikutnya kembali ke:

VISUAL AND UI IMPROVEMENT

Deferred items:

- visual polish,
- mobile layout refinement,
- animation comfort,
- decorative asset quality,
- public wedding section consistency,
- feature UX polish,
- loading/performance polish,
- single source wedding data,
- RSVP/wishes spam protection,
- guest token,
- Save the Date,
- image optimization,
- lint tooling,
- repository cleanup.
