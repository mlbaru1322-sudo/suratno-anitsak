export interface WeddingSettings {
  id: string
  bride_name: string
  groom_name: string
  bride_short_name: string | null
  groom_short_name: string | null
  wedding_date: string | null
  cover_photo_url: string | null
  portrait_photo_url: string | null
  bride_photo_url: string | null
  groom_photo_url: string | null
  quote: string | null
  greeting_title: string | null
  greeting_body: string | null
  music_url: string | null
  rsvp_whatsapp: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface WeddingEvent {
  id: string
  type: string
  title: string
  event_date: string | null
  start_time: string | null
  end_time: string | null
  venue_name: string | null
  address: string | null
  maps_url: string | null
  sort_order: number
  created_at: string
}

export interface WeddingGallery {
  id: string
  image_url: string
  alt_text: string | null
  sort_order: number
  created_at: string
}

export interface WeddingLoveStory {
  id: string
  title: string
  story_date: string | null
  description: string | null
  sort_order: number
  created_at: string
}

export interface WeddingBankAccount {
  id: string
  bank_name: string
  account_number: string
  account_holder: string
  sort_order: number
  created_at: string
}

export interface WeddingWish {
  id: string
  guest_name: string
  attendance_status: string | null
  guest_count: number
  message: string | null
  is_approved: boolean
  created_at: string
}

export interface WeddingGuest {
  id: string
  guest_name: string
  phone: string | null
  guest_token: string | null
  sent_at: string | null
  created_at: string
}

export interface MessageTemplate {
  id: string
  title: string
  content: string
  is_active: boolean
  created_at: string
  updated_at: string
}
