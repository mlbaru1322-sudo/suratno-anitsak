// Centralized wedding data used as static fallback for this invitation.

export const weddingData = {
  // Couple
  bride: {
    name: 'Anitsak Nur Anggraini, S.Ak',
    shortName: 'Anitsak',
    photo: '/images/optimized/bride.webp',
    parents: 'Putri dari Bapak Suharno & Ibu Umaidah',
    instagram: '@trirahayu',
  },
  groom: {
    name: 'Suratno',
    shortName: 'Suratno',
    photo: '/images/optimized/groom.webp',
    parents: 'Putra dari Bapak Arjo Pono & Ibu Suwarti',
    instagram: '@mardian.ifan',
  },

  // Display
  coupleShort: 'Anitsak & Suratno',
  coverPhoto: '/images/optimized/cover-opening.webp',
  coverPhotoPositionMobile: '43% center',
  coverPhotoPositionDesktop: 'center center',
  portraitPhoto: '/images/optimized/couple-portrait.webp',
  closingPhoto: '/images/optimized/closing-bg.webp',
  // ISO date used for the countdown and display
  weddingDateISO: '2026-09-12T08:00:00+07:00',
  weddingDateDisplay: 'Sabtu, 12 September 2026',

  // Guest (would come from query param later)
  guest: {
    label: 'Kepada Yth.',
    recipient: 'Bapak/Ibu/Saudara/i',
    salutation: 'Kepada Yth. Bapak/Ibu/Saudara/i',
    name: 'Bapak Hadi Sekeluarga',
  },

  // Quote
  quote: {
    text: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },

  // Greeting
  greeting: {
    opening: "Assalamu'alaikum Wr. Wb.",
    basmalah: 'Bismillahirrahmanirrahim.',
    message:
      'Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.',
  },

  // Events
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      date: 'Sabtu, 12 September 2026',
      time: '08.00 - 10.00 WIB',
      venue: 'Masjid Agung Al-Falah',
      address: 'Jl. Sultan Thaha No. 1, Jambi',
      mapsUrl: 'https://maps.google.com',
    },
    {
      id: 'resepsi',
      title: 'Resepsi',
      date: 'Sabtu, 12 September 2026',
      time: '11.00 - 14.00 WIB',
      venue: 'Ballroom Hotel Aston',
      address: 'Jl. Sultan Agung No. 99, Jambi',
      mapsUrl: 'https://maps.google.com',
    },
  ],

  // Maps (single primary location)
  maps: {
    label: 'Ballroom Hotel Aston, Jambi',
    url: 'https://maps.google.com',
  },

  // Love story timeline
  loveStory: [
    {
      id: 1,
      title: 'Awal Bertemu',
      date: '2025',
      description:
        'Berawal dari dikenalkan lewat teman. Sebuah perkenalan sederhana tanpa ada bayangan kedepannya yang menjadi awal dari segalanya.',
    },
    {
      id: 2,
      title: 'Lamaran',
      date: '2025',
      description:
        'Hubungan yang diawali tanpa ada kata pacaran ternyata membawa kami melangkah ke tahap yang lebih serius melalui sebuah lamaran yang berlangsung dalam suasana hangat, penuh haru, serta dikelilingi doa dan restu keluarga.',
    },
    {
      id: 3,
      title: 'Menuju Hari Bahagia',
      date: '2026',
      description:
        'Atas restu kedua keluarga, kami siap menyatukan dua manusia, dua hati, dua jiwa dan dua keluarga dalam sebuah ikatan pernikahan yang suci.',
    },
  ],

  // Gallery
  gallery: [
    '/images/optimized/gallery-1.webp',
    '/images/optimized/gallery-2.webp',
    '/images/optimized/gallery-3.webp',
    '/images/optimized/gallery-4.webp',
    '/images/optimized/gallery-5.webp',
    '/images/optimized/gallery-6.webp',
    '/images/optimized/gallery-7.webp',
    '/images/optimized/gallery-8.webp',
  ],

  // Wishes (dummy testimonials)
  wishes: [
    {
      id: 1,
      name: 'Andi Pratama',
      status: 'Hadir',
      message:
        'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu.',
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      status: 'Hadir',
      message:
        'Turut berbahagia atas pernikahan kalian. Semoga langgeng sampai kakek nenek ya. Aamiin.',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      status: 'Masih Ragu',
      message:
        'Selamat ya Anitsak & Suratno! Semoga diberikan kelancaran di hari bahagia. Doa terbaik dari kami.',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      status: 'Hadir',
      message:
        'Barakallahu lakuma wa baraka alaikuma. Semoga menjadi pasangan yang saling melengkapi selamanya.',
    },
  ],

  // Digital gift
  gifts: [
    {
      id: 'bni-anitsak',
      bank: 'Bank BNI',
      accountNumber: '1819877496',
      accountHolder: 'Anitsak Nur Anggraini',
    },
  ],

  // Closing
  closing: {
    message:
      'Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
    thanks: 'Terima kasih.',
  },

  // Audio
  music: {
    src: '/music/music.mp3',
    title: 'Wedding Song',
  },
} as const

export type WeddingData = typeof weddingData
