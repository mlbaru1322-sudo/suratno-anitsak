// Centralized wedding data. Replace with Supabase data later.
// Keeping all dummy content here makes it easy to swap for real data.

export const weddingData = {
  // Couple
  bride: {
    name: 'Tri Rahayu',
    shortName: 'Rahayu',
    photo: '/images/optimized/bride.webp',
    parents: 'Putri dari Bapak Suparman & Ibu Sulastri',
    instagram: '@trirahayu',
  },
  groom: {
    name: 'Mardian Ifan Rizkyadi',
    shortName: 'Mardian',
    photo: '/images/optimized/groom.webp',
    parents: 'Putra dari Bapak Hartono & Ibu Mardiana',
    instagram: '@mardian.ifan',
  },

  // Display
  coupleShort: 'Rahayu & Mardian',
  coverPhoto: '/images/optimized/couple-portrait.webp',
  coverPhotoPositionMobile: '43% center',
  coverPhotoPositionDesktop: 'center center',
  portraitPhoto: '/images/optimized/couple-portrait.webp',
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
      date: '2019',
      description:
        'Pertemuan pertama kami terjadi di sebuah acara kampus. Sebuah perkenalan sederhana yang menjadi awal dari segalanya.',
    },
    {
      id: 2,
      title: 'Lamaran',
      date: '2024',
      description:
        'Setelah melewati banyak cerita bersama, kami memutuskan untuk melangkah ke tahap yang lebih serius melalui sebuah lamaran yang penuh haru.',
    },
    {
      id: 3,
      title: 'Menuju Hari Bahagia',
      date: '2026',
      description:
        'Dengan restu kedua keluarga, kami siap menyatukan dua hati dalam ikatan pernikahan yang suci.',
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
        'Selamat ya Rahayu & Mardian! Semoga diberikan kelancaran di hari bahagia. Doa terbaik dari kami.',
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
      id: 'bca',
      bank: 'Bank BCA',
      accountNumber: '1234567890',
      accountHolder: 'Tri Rahayu',
    },
    {
      id: 'mandiri',
      bank: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountHolder: 'Mardian Ifan Rizkyadi',
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
