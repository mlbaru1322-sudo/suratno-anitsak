import { weddingData, type WeddingData } from '@/lib/wedding-data'
import type {
  WeddingBankAccount,
  WeddingEvent,
  WeddingSettings,
} from '@/lib/types/wedding'

type PublicWeddingData = WeddingData | null

export function mergeSupabaseWeddingData({
  settings,
  events,
  bankAccounts = [],
  guestName,
}: {
  settings: WeddingSettings | null
  events: WeddingEvent[]
  bankAccounts?: WeddingBankAccount[]
  guestName?: string | null
}): PublicWeddingData {
  if (!settings) {
    return null
  }

  const brideShortName =
    clean(settings?.bride_short_name) || weddingData.bride.shortName
  const groomShortName =
    clean(settings?.groom_short_name) || weddingData.groom.shortName
  const weddingDateISO = toWeddingDateISO(settings?.wedding_date)
  const weddingDateDisplay = settings?.wedding_date
    ? formatWeddingDate(settings.wedding_date)
    : weddingData.weddingDateDisplay
  const mappedEvents = mapEvents(events, weddingDateDisplay)

  return {
    ...weddingData,
    bride: {
      ...weddingData.bride,
      name: clean(settings?.bride_name) || weddingData.bride.name,
      shortName: brideShortName,
      photo: clean(settings?.bride_photo_url) || weddingData.bride.photo,
    },
    groom: {
      ...weddingData.groom,
      name: clean(settings?.groom_name) || weddingData.groom.name,
      shortName: groomShortName,
      photo: clean(settings?.groom_photo_url) || weddingData.groom.photo,
    },
    coupleShort: `${brideShortName} & ${groomShortName}`,
    coverPhoto: clean(settings?.cover_photo_url) || weddingData.coverPhoto,
    portraitPhoto:
      clean(settings?.portrait_photo_url) || weddingData.portraitPhoto,
    weddingDateISO,
    weddingDateDisplay,
    guest: {
      ...weddingData.guest,
      name: clean(guestName) || weddingData.guest.recipient,
    },
    quote: {
      ...weddingData.quote,
      text: clean(settings?.quote) || weddingData.quote.text,
    },
    greeting: mapGreeting(settings),
    events: mappedEvents,
    maps: mapMaps(mappedEvents),
    gifts: mapBankAccounts(bankAccounts),
    music: {
      ...weddingData.music,
      src: clean(settings?.music_url) || weddingData.music.src,
    },
  } as unknown as PublicWeddingData
}

export function getFallbackWeddingData(guestName?: string | null) {
  return {
    ...weddingData,
    guest: {
      ...weddingData.guest,
      name: clean(guestName) || weddingData.guest.recipient,
    },
  } as unknown as PublicWeddingData
}

function mapGreeting(settings: WeddingSettings | null) {
  const greetingTitle = clean(settings?.greeting_title)
  const greetingBody = clean(settings?.greeting_body)

  if (!greetingBody) {
    return {
      ...weddingData.greeting,
      opening: greetingTitle || weddingData.greeting.opening,
    }
  }

  const bodyWithoutBasmalah = greetingBody
    .replace(/^Bismillahirrahmanirrahim\.?\s*/i, '')
    .trim()

  return {
    ...weddingData.greeting,
    opening: greetingTitle || weddingData.greeting.opening,
    basmalah: weddingData.greeting.basmalah,
    message: bodyWithoutBasmalah || weddingData.greeting.message,
  }
}

function mapEvents(events: WeddingEvent[], fallbackDate: string) {
  if (events.length === 0) return []

  return [...events]
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((event) => ({
      id: event.type || event.id,
      title: clean(event.title) || event.type || 'Acara',
      date: event.event_date ? formatWeddingDate(event.event_date) : fallbackDate,
      time: formatEventTime(event),
      venue: clean(event.venue_name) || 'Lokasi menyusul',
      address: clean(event.address) || 'Alamat menyusul',
      mapsUrl: clean(event.maps_url) || '',
    }))
}

function mapMaps(
  events: ReadonlyArray<{
    venue: string
    address: string
    mapsUrl: string
  }>,
) {
  const primaryEvent =
    events.find((event) => /resepsi/i.test(event.venue)) ??
    events[1] ??
    events[0]

  if (!primaryEvent) {
    return {
      label: 'Lokasi acara',
      url: '',
    }
  }

  return {
    label: primaryEvent.venue || 'Lokasi acara',
    url: primaryEvent.mapsUrl || '',
  }
}

function mapBankAccounts(bankAccounts: WeddingBankAccount[]) {
  return bankAccounts
    .filter((account) => {
      return (
        clean(account.bank_name) &&
        clean(account.account_number) &&
        clean(account.account_holder)
      )
    })
    .map((account) => ({
      id: account.id,
      bank: account.bank_name.trim(),
      accountNumber: account.account_number.trim(),
      accountHolder: account.account_holder.trim(),
    }))
}

function formatEventTime(event: WeddingEvent) {
  const start = clean(event.start_time)
  const end = clean(event.end_time)

  if (start && end) return `${start} - ${end}`
  return start || end || 'Waktu menyusul'
}

function toWeddingDateISO(date: string | null | undefined) {
  return date ? `${date}T08:00:00+07:00` : weddingData.weddingDateISO
}

function formatWeddingDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00+07:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return weddingData.weddingDateDisplay
  }

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(parsedDate)
}

function clean(value: string | null | undefined) {
  return value?.trim() || ''
}
