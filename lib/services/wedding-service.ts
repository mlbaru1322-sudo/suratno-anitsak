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
  attendance_status: string
  guest_count: number
  message?: string
}

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

export async function submitWeddingWish(input: SubmitWeddingWishInput) {
  const guestName = input.guest_name.trim()
  const attendanceStatus = input.attendance_status.trim()
  const guestCount = Math.max(1, Number(input.guest_count) || 1)
  const message = input.message?.trim() || null

  if (!guestName) {
    throw new Error('Nama tamu wajib diisi.')
  }

  if (!attendanceStatus) {
    throw new Error('Status kehadiran wajib dipilih.')
  }

  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('wedding_wishes')
    .insert({
      guest_name: guestName,
      attendance_status: attendanceStatus,
      guest_count: guestCount,
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
