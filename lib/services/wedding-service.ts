import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type {
  MessageTemplate,
  WeddingBankAccount,
  WeddingEvent,
  WeddingGallery,
  WeddingGuest,
  WeddingLoveStory,
  WeddingSettings,
  WeddingWish,
} from '@/lib/types/wedding'

export type SubmitWeddingWishInput = {
  guest_name: string
  attendance_status?: string | null
  guest_count?: number | null
  message?: string
}

export type WeddingGuestInput = {
  guest_name: string
  phone?: string | null
  guest_token?: string | null
}

export type MessageTemplateInput = {
  title: string
  content: string
  is_active?: boolean
}

export type WeddingSettingsInput = Partial<{
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
}>

export type WeddingEventInput = Partial<{
  type: string
  title: string
  event_date: string | null
  start_time: string | null
  end_time: string | null
  venue_name: string | null
  address: string | null
  maps_url: string | null
  sort_order: number
}>

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}

function getSupabase() {
  try {
    return createSupabaseBrowserClient()
  } catch {
    return null
  }
}

export async function getWeddingSettings() {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('wedding_settings')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as WeddingSettings | null
}

export async function getWeddingSettingsForAdmin() {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('wedding_settings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as WeddingSettings | null
}

export async function updateWeddingSettings(
  id: string,
  input: WeddingSettingsInput,
) {
  const supabase = getSupabase()
  if (!supabase) return null

  const patch: WeddingSettingsInput = {}

  if (input.bride_name !== undefined) {
    const brideName = input.bride_name.trim()
    if (!brideName) throw new Error('Nama mempelai wanita wajib diisi.')
    patch.bride_name = brideName
  }

  if (input.groom_name !== undefined) {
    const groomName = input.groom_name.trim()
    if (!groomName) throw new Error('Nama mempelai pria wajib diisi.')
    patch.groom_name = groomName
  }

  for (const key of [
    'bride_short_name',
    'groom_short_name',
    'wedding_date',
    'cover_photo_url',
    'portrait_photo_url',
    'bride_photo_url',
    'groom_photo_url',
    'quote',
    'greeting_title',
    'greeting_body',
    'music_url',
    'rsvp_whatsapp',
  ] as const) {
    if (input[key] !== undefined) {
      patch[key] = input[key]?.trim() || null
    }
  }

  if (input.is_published !== undefined) {
    patch.is_published = input.is_published
  }

  const { data, error } = await supabase
    .from('wedding_settings')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingSettings
}

export async function getWeddingEvents() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_events')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as WeddingEvent[]
}

export async function updateWeddingEvent(id: string, input: WeddingEventInput) {
  const supabase = getSupabase()
  if (!supabase) return null

  const patch: WeddingEventInput = {}

  if (input.type !== undefined) {
    const type = input.type.trim()
    if (!type) throw new Error('Tipe acara wajib diisi.')
    patch.type = type
  }

  if (input.title !== undefined) {
    const title = input.title.trim()
    if (!title) throw new Error('Judul acara wajib diisi.')
    patch.title = title
  }

  for (const key of [
    'event_date',
    'start_time',
    'end_time',
    'venue_name',
    'address',
    'maps_url',
  ] as const) {
    if (input[key] !== undefined) {
      patch[key] = input[key]?.trim() || null
    }
  }

  if (input.sort_order !== undefined) {
    patch.sort_order = Number(input.sort_order) || 0
  }

  const { data, error } = await supabase
    .from('wedding_events')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingEvent
}

export async function createDefaultWeddingEvents() {
  const supabase = getSupabase()
  if (!supabase) return []

  const defaults = [
    {
      type: 'akad',
      title: 'Akad Nikah',
      event_date: null,
      start_time: '08.00 WIB',
      end_time: '10.00 WIB',
      venue_name: '',
      address: '',
      maps_url: '',
      sort_order: 1,
    },
    {
      type: 'resepsi',
      title: 'Resepsi',
      event_date: null,
      start_time: '11.00 WIB',
      end_time: '14.00 WIB',
      venue_name: '',
      address: '',
      maps_url: '',
      sort_order: 2,
    },
  ]

  const existingEvents = await getWeddingEvents()
  const existingTypes = new Set(existingEvents.map((event) => event.type))
  const missingEvents = defaults.filter((event) => !existingTypes.has(event.type))

  if (missingEvents.length === 0) return existingEvents

  const { error } = await supabase.from('wedding_events').insert(missingEvents)

  if (error) throw error
  return getWeddingEvents()
}

export async function getWeddingGallery() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_gallery')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as WeddingGallery[]
}

export async function getWeddingLoveStories() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_love_stories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as WeddingLoveStory[]
}

export async function getWeddingBankAccounts() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_bank_accounts')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as WeddingBankAccount[]
}

export async function getApprovedWishes() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_wishes')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as WeddingWish[]
}

export async function getAllWishesForAdmin() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_wishes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as WeddingWish[]
}

export async function getWeddingGuests() {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('wedding_guests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as WeddingGuest[]
}

export async function createWeddingGuest(input: WeddingGuestInput) {
  const supabase = getSupabase()
  if (!supabase) return null

  const guestName = input.guest_name.trim()

  if (!guestName) {
    throw new Error('Nama tamu wajib diisi.')
  }

  const { data, error } = await supabase
    .from('wedding_guests')
    .insert({
      guest_name: guestName,
      phone: input.phone?.trim() || null,
      guest_token: input.guest_token || null,
    })
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingGuest
}

export async function updateWeddingGuest(
  id: string,
  input: Partial<WeddingGuestInput>,
) {
  const supabase = getSupabase()
  if (!supabase) return null

  const patch: Partial<WeddingGuestInput> = {}

  if (input.guest_name !== undefined) {
    const guestName = input.guest_name.trim()
    if (!guestName) throw new Error('Nama tamu wajib diisi.')
    patch.guest_name = guestName
  }

  if (input.phone !== undefined) {
    patch.phone = input.phone?.trim() || null
  }

  if (input.guest_token !== undefined) {
    patch.guest_token = input.guest_token || null
  }

  const { data, error } = await supabase
    .from('wedding_guests')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingGuest
}

export async function deleteWeddingGuest(id: string) {
  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase.from('wedding_guests').delete().eq('id', id)

  if (error) throw error
}

export async function markGuestAsSent(id: string) {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('wedding_guests')
    .update({ sent_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingGuest
}

export async function submitWeddingWish(input: SubmitWeddingWishInput) {
  const guestName = input.guest_name.trim()
  const attendanceStatus = input.attendance_status?.trim() || null
  const guestCount =
    input.guest_count === undefined || input.guest_count === null
      ? undefined
      : Math.max(1, Number(input.guest_count) || 1)
  const message = input.message?.trim() || null

  if (!guestName) {
    throw new Error('Nama tamu wajib diisi.')
  }

  if (!message) {
    throw new Error('Ucapan dan doa wajib diisi.')
  }

  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('wedding_wishes')
    .insert({
      guest_name: guestName,
      attendance_status: attendanceStatus,
      ...(guestCount === undefined ? {} : { guest_count: guestCount }),
      message,
      is_approved: true,
    })
    .select('*')
    .single()

  if (error) throw error
  return data as WeddingWish
}

export async function getActiveMessageTemplate() {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('message_templates')
    .select('*')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data as MessageTemplate | null
}

export async function updateMessageTemplate(
  id: string,
  input: Partial<MessageTemplateInput>,
) {
  const supabase = getSupabase()
  if (!supabase) return null

  const patch: Partial<MessageTemplateInput> = {}

  if (input.title !== undefined) {
    const title = input.title.trim()
    if (!title) throw new Error('Judul template wajib diisi.')
    patch.title = title
  }

  if (input.content !== undefined) {
    const content = input.content.trim()
    if (!content) throw new Error('Isi template wajib diisi.')
    patch.content = content
  }

  if (input.is_active !== undefined) {
    patch.is_active = input.is_active
  }

  const { data, error } = await supabase
    .from('message_templates')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as MessageTemplate
}

export async function createDefaultMessageTemplateIfMissing(
  input: MessageTemplateInput,
) {
  const existingTemplate = await getActiveMessageTemplate()
  if (existingTemplate) return existingTemplate

  const supabase = getSupabase()
  if (!supabase) return null

  const title = input.title.trim()
  const content = input.content.trim()

  if (!title) throw new Error('Judul template wajib diisi.')
  if (!content) throw new Error('Isi template wajib diisi.')

  const { data, error } = await supabase
    .from('message_templates')
    .insert({
      title,
      content,
      is_active: input.is_active ?? true,
    })
    .select('*')
    .single()

  if (error) throw error
  return data as MessageTemplate
}
