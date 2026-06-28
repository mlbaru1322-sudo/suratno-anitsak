'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { CalendarPlus, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
} from '@/components/admin/admin-shell'
import {
  createDefaultWeddingEvents,
  getWeddingEvents,
  getWeddingSettingsForAdmin,
  updateWeddingEvent,
  updateWeddingSettings,
} from '@/lib/services/wedding-service'
import type { WeddingEvent, WeddingSettings } from '@/lib/types/wedding'

type SettingsForm = {
  bride_name: string
  groom_name: string
  bride_short_name: string
  groom_short_name: string
  wedding_date: string
  quote: string
  greeting_title: string
  greeting_body: string
  music_url: string
  rsvp_whatsapp: string
  is_published: boolean
  cover_photo_url: string
  portrait_photo_url: string
  bride_photo_url: string
  groom_photo_url: string
}

type EventForm = {
  id: string
  type: string
  title: string
  event_date: string
  start_time: string
  end_time: string
  venue_name: string
  address: string
  maps_url: string
  sort_order: string
}

const emptySettingsForm: SettingsForm = {
  bride_name: '',
  groom_name: '',
  bride_short_name: '',
  groom_short_name: '',
  wedding_date: '',
  quote: '',
  greeting_title: '',
  greeting_body: '',
  music_url: '',
  rsvp_whatsapp: '',
  is_published: false,
  cover_photo_url: '',
  portrait_photo_url: '',
  bride_photo_url: '',
  groom_photo_url: '',
}

export default function AdminWeddingPage() {
  const [settings, setSettings] = useState<WeddingSettings | null>(null)
  const [settingsForm, setSettingsForm] =
    useState<SettingsForm>(emptySettingsForm)
  const [events, setEvents] = useState<EventForm[]>([])
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [savingEventId, setSavingEventId] = useState<string | null>(null)
  const [creatingDefaults, setCreatingDefaults] = useState(false)

  const settingsHasChanges = useMemo(() => {
    if (!settings) return false
    return JSON.stringify(settingsForm) !== JSON.stringify(toSettingsForm(settings))
  }, [settings, settingsForm])

  const orderedEvents = useMemo(
    () =>
      [...events].sort(
        (first, second) =>
          Number(first.sort_order || 0) - Number(second.sort_order || 0),
      ),
    [events],
  )

  const loadWeddingData = useCallback(async () => {
    try {
      const [settingsRow, eventRows] = await Promise.all([
        getWeddingSettingsForAdmin(),
        getWeddingEvents(),
      ])

      setSettings(settingsRow)
      setSettingsForm(settingsRow ? toSettingsForm(settingsRow) : emptySettingsForm)
      setEvents(eventRows.map(toEventForm))
    } catch (error) {
      setSettings(null)
      setSettingsForm(emptySettingsForm)
      setEvents([])
      toast.error('Data undangan gagal dimuat', {
        description:
          error instanceof Error ? error.message : 'Periksa koneksi Supabase.',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadWeddingData()
  }, [])

  function updateSettingsField<K extends keyof SettingsForm>(
    key: K,
    value: SettingsForm[K],
  ) {
    setSettingsForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function updateEventField<K extends keyof EventForm>(
    id: string,
    key: K,
    value: EventForm[K],
  ) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              [key]: value,
            }
          : event,
      ),
    )
  }

  async function handleSaveSettings() {
    if (!settings) {
      toast.error('Data wedding_settings belum ada')
      return
    }

    setSavingSettings(true)

    try {
      const savedSettings = await updateWeddingSettings(settings.id, {
        bride_name: settingsForm.bride_name,
        groom_name: settingsForm.groom_name,
        bride_short_name: settingsForm.bride_short_name,
        groom_short_name: settingsForm.groom_short_name,
        wedding_date: settingsForm.wedding_date,
        quote: settingsForm.quote,
        greeting_title: settingsForm.greeting_title,
        greeting_body: settingsForm.greeting_body,
        music_url: settingsForm.music_url,
        rsvp_whatsapp: settingsForm.rsvp_whatsapp,
        is_published: settingsForm.is_published,
        cover_photo_url: settingsForm.cover_photo_url,
        portrait_photo_url: settingsForm.portrait_photo_url,
        bride_photo_url: settingsForm.bride_photo_url,
        groom_photo_url: settingsForm.groom_photo_url,
      })

      if (savedSettings) {
        setSettings(savedSettings)
        setSettingsForm(toSettingsForm(savedSettings))
      }

      toast.success('Data undangan berhasil disimpan')
    } catch (error) {
      toast.error('Data undangan gagal disimpan', {
        description:
          error instanceof Error
            ? error.message
            : 'Periksa sesi login admin dan RLS policy wedding_settings.',
      })
    } finally {
      setSavingSettings(false)
    }
  }

  async function handleSaveEvent(eventForm: EventForm) {
    setSavingEventId(eventForm.id)

    try {
      const savedEvent = await updateWeddingEvent(eventForm.id, {
        title: eventForm.title,
        event_date: eventForm.event_date,
        start_time: eventForm.start_time,
        end_time: eventForm.end_time,
        venue_name: eventForm.venue_name,
        address: eventForm.address,
        maps_url: eventForm.maps_url,
        sort_order: Number(eventForm.sort_order) || 0,
      })

      if (savedEvent) {
        setEvents((current) =>
          current.map((event) =>
            event.id === savedEvent.id ? toEventForm(savedEvent) : event,
          ),
        )
      }

      toast.success(`${eventForm.title || 'Acara'} berhasil disimpan`)
    } catch (error) {
      toast.error('Data acara gagal disimpan', {
        description:
          error instanceof Error
            ? error.message
            : 'Periksa sesi login admin dan RLS policy wedding_events.',
      })
    } finally {
      setSavingEventId(null)
    }
  }

  async function handleCreateDefaultEvents() {
    setCreatingDefaults(true)

    try {
      const eventRows = await createDefaultWeddingEvents()
      setEvents(eventRows.map(toEventForm))
      toast.success('Default Akad dan Resepsi siap diedit')
    } catch (error) {
      toast.error('Default acara gagal dibuat', {
        description:
          error instanceof Error
            ? error.message
            : 'Periksa RLS policy wedding_events.',
      })
    } finally {
      setCreatingDefaults(false)
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Data Undangan"
        description="Kelola data utama mempelai, salam, media URL, publish, dan jadwal acara dari Supabase."
      />

      {loading ? (
        <EmptyState message="Memuat data undangan..." />
      ) : !settings ? (
        <EmptyState message="Data wedding_settings belum ditemukan. Jalankan schema seed atau buat data awal di Supabase." />
      ) : (
        <div className="grid gap-6">
          <div className="sticky top-[5.5rem] z-20 rounded-2xl border bg-background/95 p-3 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {settingsHasChanges
                  ? 'Ada perubahan belum disimpan'
                  : 'Data undangan sudah tersimpan'}
              </p>
              <Button
                type="button"
                className="gap-2"
                disabled={savingSettings || !settingsHasChanges}
                onClick={handleSaveSettings}
              >
                {savingSettings ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="size-4" aria-hidden="true" />
                )}
                Simpan Data Undangan
              </Button>
            </div>
          </div>

          <AdminCard>
            <SectionTitle
              title="Data Mempelai"
              description="Nama lengkap dan nama pendek yang tampil di undangan."
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextInput
                id="bride-name"
                label="Nama mempelai wanita"
                value={settingsForm.bride_name}
                onChange={(value) => updateSettingsField('bride_name', value)}
              />
              <TextInput
                id="groom-name"
                label="Nama mempelai pria"
                value={settingsForm.groom_name}
                onChange={(value) => updateSettingsField('groom_name', value)}
              />
              <TextInput
                id="bride-short-name"
                label="Nama pendek wanita"
                value={settingsForm.bride_short_name}
                onChange={(value) =>
                  updateSettingsField('bride_short_name', value)
                }
              />
              <TextInput
                id="groom-short-name"
                label="Nama pendek pria"
                value={settingsForm.groom_short_name}
                onChange={(value) =>
                  updateSettingsField('groom_short_name', value)
                }
              />
              <TextInput
                id="wedding-date"
                label="Tanggal pernikahan"
                type="date"
                value={settingsForm.wedding_date}
                onChange={(value) => updateSettingsField('wedding_date', value)}
              />
            </div>
            <CardActionFooter>
              <SaveSettingsButton
                saving={savingSettings}
                hasChanges={settingsHasChanges}
                onClick={handleSaveSettings}
              />
            </CardActionFooter>
          </AdminCard>

          <AdminCard>
            <SectionTitle
              title="Salam & Quote"
              description="Teks pembuka dan kutipan utama untuk public invitation."
            />
            <div className="mt-5 grid gap-4">
              <TextInput
                id="greeting-title"
                label="Judul salam"
                value={settingsForm.greeting_title}
                onChange={(value) => updateSettingsField('greeting_title', value)}
              />
              <div className="space-y-2">
                <Label htmlFor="greeting-body">Isi salam</Label>
                <Textarea
                  id="greeting-body"
                  rows={5}
                  value={settingsForm.greeting_body}
                  onChange={(event) =>
                    updateSettingsField('greeting_body', event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote">Quote</Label>
                <Textarea
                  id="quote"
                  rows={5}
                  value={settingsForm.quote}
                  onChange={(event) =>
                    updateSettingsField('quote', event.target.value)
                  }
                />
              </div>
            </div>
            <CardActionFooter>
              <SaveSettingsButton
                saving={savingSettings}
                hasChanges={settingsHasChanges}
                onClick={handleSaveSettings}
              />
            </CardActionFooter>
          </AdminCard>

          <AdminCard>
            <SectionTitle
              title="Media URL"
              description="Masukkan path public image atau URL eksternal. Upload/storage belum dibuat di tahap ini."
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextInput
                id="cover-photo-url"
                label="Cover photo URL"
                value={settingsForm.cover_photo_url}
                onChange={(value) =>
                  updateSettingsField('cover_photo_url', value)
                }
              />
              <TextInput
                id="portrait-photo-url"
                label="Portrait photo URL"
                value={settingsForm.portrait_photo_url}
                onChange={(value) =>
                  updateSettingsField('portrait_photo_url', value)
                }
              />
              <TextInput
                id="bride-photo-url"
                label="Bride photo URL"
                value={settingsForm.bride_photo_url}
                onChange={(value) => updateSettingsField('bride_photo_url', value)}
              />
              <TextInput
                id="groom-photo-url"
                label="Groom photo URL"
                value={settingsForm.groom_photo_url}
                onChange={(value) => updateSettingsField('groom_photo_url', value)}
              />
              <TextInput
                id="music-url"
                label="Music URL"
                value={settingsForm.music_url}
                onChange={(value) => updateSettingsField('music_url', value)}
              />
            </div>
            <CardActionFooter>
              <SaveSettingsButton
                saving={savingSettings}
                hasChanges={settingsHasChanges}
                onClick={handleSaveSettings}
              />
            </CardActionFooter>
          </AdminCard>

          <AdminCard>
            <SectionTitle
              title="RSVP & Publish"
              description="Nomor RSVP dan status publikasi undangan."
            />
            <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
              <TextInput
                id="rsvp-whatsapp"
                label="Nomor RSVP WhatsApp"
                value={settingsForm.rsvp_whatsapp}
                onChange={(value) => updateSettingsField('rsvp_whatsapp', value)}
              />
              <label className="flex min-h-10 items-center gap-3 rounded-2xl border bg-muted/30 px-4 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={settingsForm.is_published}
                  onChange={(event) =>
                    updateSettingsField('is_published', event.target.checked)
                  }
                  className="size-4 accent-gold"
                />
                Publish undangan
              </label>
            </div>
            <CardActionFooter>
              <SaveSettingsButton
                saving={savingSettings}
                hasChanges={settingsHasChanges}
                onClick={handleSaveSettings}
              />
            </CardActionFooter>
          </AdminCard>

          <AdminCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <SectionTitle
                title="Data Acara"
                description="Edit data Akad Nikah dan Resepsi dari tabel wedding_events."
              />
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={creatingDefaults}
                onClick={handleCreateDefaultEvents}
              >
                {creatingDefaults ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <CalendarPlus className="size-4" aria-hidden="true" />
                )}
                Buat Default
              </Button>
            </div>

            {orderedEvents.length === 0 ? (
              <div className="mt-5">
                <EmptyState message="Belum ada data acara. Klik Buat Default untuk membuat Akad Nikah dan Resepsi." />
              </div>
            ) : (
              <div className="mt-5 grid gap-5">
                {orderedEvents.map((eventForm) => (
                  <div
                    key={eventForm.id}
                    className="rounded-2xl border bg-muted/20 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {eventForm.type}
                        </p>
                        <h3 className="mt-1 font-serif text-2xl font-semibold text-espresso">
                          {eventForm.title || 'Data Acara'}
                        </h3>
                      </div>
                      <Button
                        type="button"
                        className="gap-2"
                        disabled={savingEventId === eventForm.id}
                        onClick={() => handleSaveEvent(eventForm)}
                      >
                        {savingEventId === eventForm.id ? (
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <Save className="size-4" aria-hidden="true" />
                        )}
                        Simpan Acara
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <TextInput
                        id={`event-title-${eventForm.id}`}
                        label="Judul acara"
                        value={eventForm.title}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'title', value)
                        }
                      />
                      <TextInput
                        id={`event-date-${eventForm.id}`}
                        label="Tanggal acara"
                        type="date"
                        value={eventForm.event_date}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'event_date', value)
                        }
                      />
                      <TextInput
                        id={`event-start-${eventForm.id}`}
                        label="Jam mulai"
                        value={eventForm.start_time}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'start_time', value)
                        }
                      />
                      <TextInput
                        id={`event-end-${eventForm.id}`}
                        label="Jam selesai"
                        value={eventForm.end_time}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'end_time', value)
                        }
                      />
                      <TextInput
                        id={`event-venue-${eventForm.id}`}
                        label="Nama venue"
                        value={eventForm.venue_name}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'venue_name', value)
                        }
                      />
                      <TextInput
                        id={`event-sort-${eventForm.id}`}
                        label="Urutan"
                        type="number"
                        value={eventForm.sort_order}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'sort_order', value)
                        }
                      />
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`event-address-${eventForm.id}`}>
                          Alamat
                        </Label>
                        <Textarea
                          id={`event-address-${eventForm.id}`}
                          rows={3}
                          value={eventForm.address}
                          onChange={(event) =>
                            updateEventField(
                              eventForm.id,
                              'address',
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <TextInput
                        id={`event-maps-${eventForm.id}`}
                        label="Maps URL"
                        value={eventForm.maps_url}
                        onChange={(value) =>
                          updateEventField(eventForm.id, 'maps_url', value)
                        }
                        className="md:col-span-2"
                      />
                    </div>
                    <CardActionFooter>
                      <Button
                        type="button"
                        className="gap-2"
                        disabled={savingEventId === eventForm.id}
                        onClick={() => handleSaveEvent(eventForm)}
                      >
                        {savingEventId === eventForm.id ? (
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <Save className="size-4" aria-hidden="true" />
                        )}
                        Simpan Acara
                      </Button>
                    </CardActionFooter>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        </div>
      )}
    </>
  )
}

function SectionTitle({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h3 className="font-serif text-2xl font-semibold text-espresso">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function SaveSettingsButton({
  saving,
  hasChanges,
  onClick,
}: {
  saving: boolean
  hasChanges: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      className="gap-2"
      disabled={saving || !hasChanges}
      onClick={onClick}
    >
      {saving ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Save className="size-4" aria-hidden="true" />
      )}
      Simpan Data Undangan
    </Button>
  )
}

function CardActionFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
      {children}
    </div>
  )
}

function TextInput({
  id,
  label,
  value,
  onChange,
  className,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
  type?: string
}) {
  return (
    <div className={className ? `space-y-2 ${className}` : 'space-y-2'}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

function toSettingsForm(settings: WeddingSettings): SettingsForm {
  return {
    bride_name: settings.bride_name,
    groom_name: settings.groom_name,
    bride_short_name: settings.bride_short_name ?? '',
    groom_short_name: settings.groom_short_name ?? '',
    wedding_date: settings.wedding_date ?? '',
    quote: settings.quote ?? '',
    greeting_title: settings.greeting_title ?? '',
    greeting_body: settings.greeting_body ?? '',
    music_url: settings.music_url ?? '',
    rsvp_whatsapp: settings.rsvp_whatsapp ?? '',
    is_published: settings.is_published,
    cover_photo_url: settings.cover_photo_url ?? '',
    portrait_photo_url: settings.portrait_photo_url ?? '',
    bride_photo_url: settings.bride_photo_url ?? '',
    groom_photo_url: settings.groom_photo_url ?? '',
  }
}

function toEventForm(event: WeddingEvent): EventForm {
  return {
    id: event.id,
    type: event.type,
    title: event.title,
    event_date: event.event_date ?? '',
    start_time: event.start_time ?? '',
    end_time: event.end_time ?? '',
    venue_name: event.venue_name ?? '',
    address: event.address ?? '',
    maps_url: event.maps_url ?? '',
    sort_order: String(event.sort_order ?? 0),
  }
}
