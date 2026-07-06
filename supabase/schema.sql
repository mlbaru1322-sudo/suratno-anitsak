-- Initial Supabase schema for a single wedding invitation website.
-- Run this file in the Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists wedding_settings (
  id uuid primary key default gen_random_uuid(),
  bride_name text not null,
  groom_name text not null,
  bride_short_name text,
  groom_short_name text,
  wedding_date date,
  cover_photo_url text,
  portrait_photo_url text,
  bride_photo_url text,
  groom_photo_url text,
  quote text,
  greeting_title text,
  greeting_body text,
  music_url text,
  rsvp_whatsapp text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists wedding_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  event_date date,
  start_time text,
  end_time text,
  venue_name text,
  address text,
  maps_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists wedding_gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists wedding_love_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  story_date text,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists wedding_bank_accounts (
  id uuid primary key default gen_random_uuid(),
  bank_name text not null,
  account_number text not null,
  account_holder text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists wedding_wishes (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attendance_status text,
  guest_count integer default 1,
  message text,
  is_approved boolean default true,
  created_at timestamptz default now()
);

create table if not exists wedding_guests (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  phone text,
  guest_token text unique,
  sent_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists message_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_wedding_settings_updated_at on wedding_settings;
create trigger set_wedding_settings_updated_at
before update on wedding_settings
for each row
execute function update_updated_at_column();

drop trigger if exists set_message_templates_updated_at on message_templates;
create trigger set_message_templates_updated_at
before update on message_templates
for each row
execute function update_updated_at_column();

insert into wedding_settings (
  bride_name,
  groom_name,
  bride_short_name,
  groom_short_name,
  wedding_date,
  cover_photo_url,
  portrait_photo_url,
  bride_photo_url,
  groom_photo_url,
  quote,
  greeting_title,
  greeting_body,
  music_url,
  rsvp_whatsapp,
  is_published
)
select
  'Tri Rahayu',
  'Mardian Ifan Rizkyadi',
  'Rahayu',
  'Mardian',
  '2026-09-12',
  '/images/couple-portrait.png',
  '/images/couple-portrait.png',
  '/images/bride.png',
  '/images/groom.png',
  'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
  'Assalamu''alaikum Wr. Wb.',
  'Bismillahirrahmanirrahim. Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.',
  '/music/music.mp3',
  null,
  true
where not exists (
  select 1 from wedding_settings
  where bride_name = 'Tri Rahayu'
    and groom_name = 'Mardian Ifan Rizkyadi'
);

insert into wedding_events (
  type,
  title,
  event_date,
  start_time,
  end_time,
  venue_name,
  address,
  maps_url,
  sort_order
)
select
  'akad',
  'Akad Nikah',
  '2026-09-12',
  '08.00 WIB',
  '10.00 WIB',
  'Masjid Agung Al-Falah',
  'Jl. Sultan Thaha No. 1, Jambi',
  'https://maps.google.com',
  1
where not exists (select 1 from wedding_events where type = 'akad');

insert into wedding_events (
  type,
  title,
  event_date,
  start_time,
  end_time,
  venue_name,
  address,
  maps_url,
  sort_order
)
select
  'resepsi',
  'Resepsi',
  '2026-09-12',
  '11.00 WIB',
  '14.00 WIB',
  'Ballroom Hotel Aston',
  'Jl. Sultan Agung No. 99, Jambi',
  'https://maps.google.com',
  2
where not exists (select 1 from wedding_events where type = 'resepsi');

insert into wedding_gallery (image_url, alt_text, sort_order)
select item.image_url, item.alt_text, item.sort_order
from (
  values
    ('/images/gallery-1.png', 'Foto prewedding 1', 1),
    ('/images/gallery-2.png', 'Foto prewedding 2', 2),
    ('/images/gallery-3.png', 'Foto prewedding 3', 3),
    ('/images/gallery-4.png', 'Foto prewedding 4', 4),
    ('/images/gallery-5.png', 'Foto prewedding 5', 5),
    ('/images/gallery-6.png', 'Foto prewedding 6', 6)
) as item(image_url, alt_text, sort_order)
where not exists (
  select 1 from wedding_gallery
  where wedding_gallery.image_url = item.image_url
);

insert into wedding_love_stories (title, story_date, description, sort_order)
select item.title, item.story_date, item.description, item.sort_order
from (
  values
    (
      'Awal Bertemu',
      '2019',
      'Pertemuan pertama kami terjadi di sebuah acara kampus. Sebuah perkenalan sederhana yang menjadi awal dari segalanya.',
      1
    ),
    (
      'Lamaran',
      '2024',
      'Setelah melewati banyak cerita bersama, kami memutuskan untuk melangkah ke tahap yang lebih serius melalui sebuah lamaran yang penuh haru.',
      2
    ),
    (
      'Menuju Hari Bahagia',
      '2026',
      'Dengan restu kedua keluarga, kami siap menyatukan dua hati dalam ikatan pernikahan yang suci.',
      3
    )
) as item(title, story_date, description, sort_order)
where not exists (
  select 1 from wedding_love_stories
  where wedding_love_stories.title = item.title
);

insert into wedding_bank_accounts (
  bank_name,
  account_number,
  account_holder,
  sort_order
)
select item.bank_name, item.account_number, item.account_holder, item.sort_order
from (
  values
    ('Bank BNI', '1819877496', 'Anitsak Nur Anggraini', 1)
) as item(bank_name, account_number, account_holder, sort_order)
where not exists (
  select 1 from wedding_bank_accounts
  where wedding_bank_accounts.account_number = item.account_number
);

insert into wedding_wishes (
  guest_name,
  attendance_status,
  guest_count,
  message,
  is_approved
)
select item.guest_name, item.attendance_status, item.guest_count, item.message, true
from (
  values
    (
      'Andi Pratama',
      'Hadir',
      1,
      'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu.'
    ),
    (
      'Siti Nurhaliza',
      'Hadir',
      1,
      'Turut berbahagia atas pernikahan kalian. Semoga langgeng sampai kakek nenek ya. Aamiin.'
    ),
    (
      'Budi Santoso',
      'Masih Ragu',
      1,
      'Selamat ya Rahayu & Mardian! Semoga diberikan kelancaran di hari bahagia. Doa terbaik dari kami.'
    )
) as item(guest_name, attendance_status, guest_count, message)
where not exists (
  select 1 from wedding_wishes
  where wedding_wishes.guest_name = item.guest_name
);

insert into wedding_guests (guest_name, phone, guest_token)
select 'Bapak Hadi Sekeluarga', null, 'bapak-hadi-sekeluarga'
where not exists (
  select 1 from wedding_guests
  where guest_token = 'bapak-hadi-sekeluarga'
);

insert into message_templates (title, content, is_active)
select
  'Undangan WhatsApp Utama',
  'Kepada Yth.
Bapak/Ibu/Saudara/i
{nama_tamu}

Assalamu''alaikum Wr. Wb.

Bismillahirrahmanirrahim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

Tri Rahayu
&
Mardian Ifan Rizkyadi

Berikut link untuk informasi lengkap acara kami:

{link_undangan}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Wassalamu''alaikum Wr. Wb.

Terima kasih.

Hormat kami,
Rahayu & Mardian

Catatan:
Simpan nomor ini jika link tidak dapat disentuh, atau salin link ke Chrome/browser untuk membuka undangan.',
  true
where not exists (
  select 1 from message_templates
  where title = 'Undangan WhatsApp Utama'
);
