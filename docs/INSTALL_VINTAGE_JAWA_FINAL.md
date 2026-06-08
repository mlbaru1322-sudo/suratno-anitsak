# Vintage Jawa Final Assets

Paket ini dibuat agar ornamen tidak digabung dalam satu gambar besar. Setiap ornamen ada di file terpisah sehingga nanti bisa dipilih/ganti mudah di Codex.

## Struktur

- `public/ornaments/vintage-jawa-final/backgrounds/` — background kertas, batik, lanskap
- `public/ornaments/vintage-jawa-final/frames/` — gebyok, page frame, photo frame
- `public/ornaments/vintage-jawa-final/corners/` — ukiran sudut
- `public/ornaments/vintage-jawa-final/gunungan/` — gunungan variants
- `public/ornaments/vintage-jawa-final/wayang/` — wayang & kuda silhouette
- `public/ornaments/vintage-jawa-final/trees/` — pohon kelapa / pohon
- `public/ornaments/vintage-jawa-final/birds/` — animasi burung/flock variants
- `public/ornaments/vintage-jawa-final/dividers/` — pembatas section
- `public/ornaments/vintage-jawa-final/sparkles/` — gold dust
- `public/ornaments/vintage-jawa-final/patterns/` — batik swatches
- `components/wedding/vintage-jawa-final-scene.tsx` — helper komponen React
- `styles/vintage-jawa-final.css` — CSS animasi tambahan

## Cara pasang singkat

1. Copy folder `public/ornaments/vintage-jawa-final` ke project.
2. Copy `components/wedding/vintage-jawa-final-scene.tsx` ke `components/wedding/`.
3. Copy isi `styles/vintage-jawa-final.css` ke bawah `app/globals.css`.
4. Import komponen di `opening-cover.tsx`:

```tsx
import { VintageJawaOpeningScene } from "./vintage-jawa-final-scene"
```

5. Di dalam opening cover, taruh scene layer paling bawah:

```tsx
<VintageJawaOpeningScene variant="landscape" />
```

6. Untuk style mirip referensi video, jangan pakai foto pengantin sebagai background opening. Letakkan foto pengantin di HeroSection dengan `VintageJawaPhotoFrame`.

## Rekomendasi penggunaan

Opening cover:
- `VintageJawaOpeningScene variant="landscape"`
- `gunungan/gunungan-01.svg` kecil di atas title
- `dividers/divider-gunungan-01.svg` di bawah nama

Hero setelah klik buka:
- `VintageJawaPhotoFrame type="arch"` atau `type="oval"`
- panel cream di atas background coklat

Section:
- `VintageJawaDivider variant={1..5}` antar section
- `VintageJawaCardCorners` untuk card penting

## Catatan performa

Semua asset SVG ringan dan bisa di-cache browser. Animasi CSS sudah memakai `prefers-reduced-motion`.
