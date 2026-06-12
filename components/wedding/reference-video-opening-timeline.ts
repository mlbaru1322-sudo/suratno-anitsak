export const REFERENCE_VIDEO_OPENING_DURATION = 10

export const REFERENCE_VIDEO_OPENING_TIMELINE = {
  coverExit: { start: 0.0, end: 1.0, note: 'Cover exit premium + white wash lembut' },
  frameHold: { start: 1.0, end: 2.0, note: 'Gapura atas, border bawah, wayang kanan bawah tetap membingkai scene' },
  centerCurtainReveal: { start: 2.0, end: 3.5, note: 'Layer tengah warna coklat fade + geser ke samping, menampilkan gunung' },
  landscapeLive: { start: 3.5, end: 5.0, note: 'Background gunung tampil penuh, burung dan atmosfer mulai hidup' },
  decorReveal: { start: 5.0, end: 6.5, note: 'Pohon/palm/bunga pendukung masuk halus, jangan terlalu ramai' },
  panelReveal: { start: 6.5, end: 7.8, note: 'Panel inti undangan mulai reveal' },
  photoReveal: { start: 7.8, end: 8.8, note: 'Frame/foto couple mulai muncul' },
  textReveal: { start: 8.8, end: 9.5, note: 'Label, nama pasangan, divider, tanggal' },
  settle: { start: 9.5, end: 10.0, note: 'Semua settle, hanya bird drift/particle halus yang tetap hidup' },
} as const

export const REFERENCE_VIDEO_ELEMENT_MAP = {
  fromStart: ['background gunung', 'gapura/pintu Jawa atas', 'bottom border', 'wayang kanan bawah'],
  curtainLayer: ['panel penutup tengah warna coklat/sepia'],
  afterReveal: ['burung', 'partikel halus', 'palm tree samping', 'dekor bunga ringan'],
  lastReveal: ['panel utama', 'frame/foto', 'teks wedding'],
} as const
