import { weddingData, type WeddingData } from '@/lib/wedding-data'
import type { WeddingEvent, WeddingSettings } from '@/lib/types/wedding'

type PublicWeddingData = WeddingData

export function mergeSupabaseWeddingData({
  settings,
  events,
  guestName,
}: {
  settings: WeddingSettings | null
  events: WeddingEvent[]
  guestName?: string | null
}): PublicWeddingData {
  if (!settings) {
    return getFallbackWeddingData(guestName)
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
      name: clean(guestName) || weddingData.guest.name,
    },
    quote: {
      ...weddingData.quote,
      text: clean(settings?.quote) || weddingData.quote.text,
    },
    greeting: mapGreeting(settings),
    events: mappedEvents,
    maps: mapMaps(mappedEvents),
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
      name: clean(guestName) || weddingData.guest.name,
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
  if (events.length === 0) return weddingData.events

  return [...events]
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((event) => ({
      id: event.type || event.id,
      title: clean(event.title) || event.type || 'Acara',
      date: event.event_date ? formatWeddingDate(event.event_date) : fallbackDate,
      time: formatEventTime(event),
      venue: clean(event.venue_name) || weddingData.events[0]?.venue || '-',
      address: clean(event.address) || weddingData.events[0]?.address || '-',
      mapsUrl: clean(event.maps_url) || 'https://maps.google.com',
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

  if (!primaryEvent) return weddingData.maps

  return {
    label: primaryEvent.venue || weddingData.maps.label,
    url: primaryEvent.mapsUrl || weddingData.maps.url,
  }
}

function formatEventTime(event: WeddingEvent) {
  const start = clean(event.start_time)
  const end = clean(event.end_time)

  if (start && end) return `${start} - ${end}`
  return start || end || weddingData.events[0]?.time || '-'
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
