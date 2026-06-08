Lanjutkan project wedding invitation yang sudah ada.

Fokus: pasang asset Vintage Jawa final yang sudah tersedia, bukan generate ulang ornamen.

Jangan ubah backend, Supabase, admin, atau schema. Jangan commit.

Asset sudah tersedia di:
- public/ornaments/vintage-jawa-final/
- components/wedding/vintage-jawa-final-scene.tsx

Tujuan:
1. Ubah OpeningCover agar mengikuti referensi video Vintage Jawa.
2. OpeningCover jangan lagi memakai foto pengantin full-screen background.
3. Gunakan `VintageJawaOpeningScene` sebagai background ilustratif coklat vintage.
4. Letakkan foto pengantin di HeroSection dalam `VintageJawaPhotoFrame` arch/oval.
5. Gunakan divider dan card corners dari asset final.
6. Pastikan mobile rapi dan tidak ada ornament menutupi wajah.

Validasi: tsc --noEmit, next build, route / 200.
