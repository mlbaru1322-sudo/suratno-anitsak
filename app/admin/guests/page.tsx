'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Check,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  Loader2,
  MessageCircle,
  Plus,
  Send,
  Trash2,
  X,
} from 'lucide-react'
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
  createWeddingGuest,
  deleteWeddingGuest,
  getActiveMessageTemplate,
  getWeddingGuests,
  markGuestAsSent,
  updateWeddingGuest,
} from '@/lib/services/wedding-service'
import type { MessageTemplate, WeddingGuest } from '@/lib/types/wedding'
import { weddingData } from '@/lib/wedding-data'

const fallbackTemplate = `Kepada Yth.
Bapak/Ibu/Saudara/i
{nama_tamu}

Assalamu'alaikum Wr. Wb.

Bismillahirrahmanirrahim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

Anitsak Nur Anggraini, S.Ak
&
Suratno

Berikut link untuk informasi lengkap acara kami:

{link_undangan}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Wassalamu'alaikum Wr. Wb.

Terima kasih.

Hormat kami,
Anitsak & Suratno

Catatan:
Simpan nomor ini jika link tidak dapat disentuh, atau salin link ke Chrome/browser untuk membuka undangan.`

type BusyAction =
  | 'create'
  | `update:${string}`
  | `delete:${string}`
  | `sent:${string}`
  | null

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<WeddingGuest[]>([])
  const [template, setTemplate] = useState<MessageTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [busyAction, setBusyAction] = useState<BusyAction>(null)
  const [guestName, setGuestName] = useState('')
  const [phone, setPhone] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [previewGuest, setPreviewGuest] = useState<WeddingGuest | null>(null)

  const templateContent = template?.content || fallbackTemplate

  const loadGuests = useCallback(async () => {
    try {
      const [guestRows, activeTemplate] = await Promise.all([
        getWeddingGuests(),
        getActiveMessageTemplate(),
      ])
      setGuests(guestRows)
      setTemplate(activeTemplate)
    } catch (error) {
      setGuests([])
      setTemplate(null)
      toast.error('Data tamu gagal dimuat', {
        description:
          error instanceof Error ? error.message : 'Periksa koneksi Supabase.',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadGuests()
  }, [loadGuests])

  const selectedPreview = useMemo(() => {
    if (!previewGuest) return null
    const link = generateInvitationLink(previewGuest)
    const message = renderMessageTemplate(templateContent, previewGuest, link)

    return {
      guest: previewGuest,
      link,
      message,
      whatsappUrl: generateWhatsAppUrl(previewGuest.phone, message),
    }
  }, [previewGuest, templateContent])

  async function handleCreateGuest(e: React.FormEvent) {
    e.preventDefault()

    if (!guestName.trim()) {
      toast.error('Nama tamu wajib diisi')
      return
    }

    setBusyAction('create')

    try {
      await createWeddingGuest({
        guest_name: guestName,
        phone: normalizeWhatsAppPhone(phone) || null,
        guest_token: generateGuestToken(guestName),
      })
      toast.success('Tamu berhasil ditambahkan')
      setGuestName('')
      setPhone('')
      await loadGuests()
    } catch (error) {
      showGuestMutationError(error)
    } finally {
      setBusyAction(null)
    }
  }

  function startEdit(guest: WeddingGuest) {
    setEditingId(guest.id)
    setEditName(guest.guest_name)
    setEditPhone(guest.phone ?? '')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
    setEditPhone('')
  }

  async function handleUpdateGuest(id: string) {
    if (!editName.trim()) {
      toast.error('Nama tamu wajib diisi')
      return
    }

    setBusyAction(`update:${id}`)

    try {
      await updateWeddingGuest(id, {
        guest_name: editName,
        phone: normalizeWhatsAppPhone(editPhone) || null,
      })
      toast.success('Data tamu diperbarui')
      cancelEdit()
      await loadGuests()
    } catch (error) {
      showGuestMutationError(error)
    } finally {
      setBusyAction(null)
    }
  }

  async function handleDeleteGuest(guest: WeddingGuest) {
    const confirmed = window.confirm(`Hapus tamu "${guest.guest_name}"?`)
    if (!confirmed) return

    setBusyAction(`delete:${guest.id}`)

    try {
      await deleteWeddingGuest(guest.id)
      toast.success('Tamu dihapus')
      await loadGuests()
    } catch (error) {
      showGuestMutationError(error)
    } finally {
      setBusyAction(null)
    }
  }

  async function handleMarkSent(guest: WeddingGuest) {
    setBusyAction(`sent:${guest.id}`)

    try {
      await markGuestAsSent(guest.id)
      toast.success('Tamu ditandai sudah dikirim')
      await loadGuests()
    } catch (error) {
      showGuestMutationError(error)
    } finally {
      setBusyAction(null)
    }
  }

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} disalin`)
    } catch {
      toast.error(`${label} gagal disalin`)
    }
  }

  function openWhatsApp(guest: WeddingGuest) {
    const link = generateInvitationLink(guest)
    const message = renderMessageTemplate(templateContent, guest, link)
    const whatsappUrl = generateWhatsAppUrl(guest.phone, message)

    if (!whatsappUrl) {
      toast.error('Nomor WhatsApp belum valid')
      return
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <AdminPageHeader
        title="Daftar Tamu"
        description="Kelola tamu dan kirim undangan manual via WhatsApp. Belum ada auth, gunakan untuk lokal/dev dulu."
      />

      <AdminCard className="mb-6">
        <form onSubmit={handleCreateGuest} className="grid gap-4 lg:grid-cols-[1fr_18rem_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="guest-name">Nama tamu</Label>
            <Input
              id="guest-name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Bapak/Ibu/Saudara/i"
              disabled={busyAction === 'create'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guest-phone">Nomor WhatsApp</Label>
            <Input
              id="guest-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08123456789"
              disabled={busyAction === 'create'}
            />
          </div>
          <Button
            type="submit"
            className="h-10 gap-2"
            disabled={busyAction === 'create'}
          >
            {busyAction === 'create' ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="size-4" aria-hidden="true" />
            )}
            Tambah Tamu
          </Button>
        </form>
      </AdminCard>

      {loading ? (
        <EmptyState message="Memuat daftar tamu..." />
      ) : guests.length === 0 ? (
        <EmptyState message="Belum ada tamu. Tambahkan tamu pertama dari form di atas." />
      ) : (
        <div className="grid gap-4">
          {guests.map((guest) => {
            const isEditing = editingId === guest.id
            const invitationLink = generateInvitationLink(guest)
            const message = renderMessageTemplate(
              templateContent,
              guest,
              invitationLink,
            )
            const normalizedPhone = normalizeWhatsAppPhone(guest.phone ?? '')
            const whatsappUrl = generateWhatsAppUrl(guest.phone, message)

            return (
              <AdminCard key={guest.id}>
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] xl:items-start">
                  <div className="space-y-4">
                    {isEditing ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-name-${guest.id}`}>
                            Nama tamu
                          </Label>
                          <Input
                            id={`edit-name-${guest.id}`}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-phone-${guest.id}`}>
                            Nomor WhatsApp
                          </Label>
                          <Input
                            id={`edit-phone-${guest.id}`}
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-serif text-2xl font-semibold text-espresso">
                          {guest.guest_name}
                        </p>
                        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                          <Info
                            label="WhatsApp"
                            value={normalizedPhone || '-'}
                          />
                          <Info
                            label="Status"
                            value={guest.sent_at ? 'Terkirim' : 'Belum'}
                          />
                          <Info
                            label="Token"
                            value={guest.guest_token ?? '-'}
                          />
                        </div>
                      </div>
                    )}

                    <div className="rounded-2xl border bg-muted/30 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Link personal
                      </p>
                      <a
                        href={invitationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all text-sm font-medium text-espresso underline-offset-4 hover:underline"
                      >
                        {invitationLink}
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-2">
                    {isEditing ? (
                      <>
                        <Button
                          type="button"
                          className="gap-2"
                          disabled={busyAction === `update:${guest.id}`}
                          onClick={() => handleUpdateGuest(guest.id)}
                        >
                          {busyAction === `update:${guest.id}` ? (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Check className="size-4" aria-hidden="true" />
                          )}
                          Simpan
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={cancelEdit}
                        >
                          <X className="size-4" aria-hidden="true" />
                          Batal
                        </Button>
                      </>
                    ) : (
                      <>
                        <ActionButton onClick={() => setPreviewGuest(guest)}>
                          <Eye className="size-4" aria-hidden="true" />
                          Preview
                        </ActionButton>
                        <ActionButton
                          onClick={() => copyText(message, 'Pesan undangan')}
                        >
                          <Copy className="size-4" aria-hidden="true" />
                          Copy Pesan
                        </ActionButton>
                        <ActionButton
                          onClick={() =>
                            copyText(invitationLink, 'Link undangan')
                          }
                        >
                          <ExternalLink className="size-4" aria-hidden="true" />
                          Copy Link
                        </ActionButton>
                        <ActionButton
                          disabled={!whatsappUrl}
                          onClick={() => openWhatsApp(guest)}
                        >
                          <MessageCircle className="size-4" aria-hidden="true" />
                          Kirim WA
                        </ActionButton>
                        <ActionButton
                          disabled={busyAction === `sent:${guest.id}`}
                          onClick={() => handleMarkSent(guest)}
                        >
                          {busyAction === `sent:${guest.id}` ? (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Send className="size-4" aria-hidden="true" />
                          )}
                          Tandai
                        </ActionButton>
                        <ActionButton onClick={() => startEdit(guest)}>
                          <Edit3 className="size-4" aria-hidden="true" />
                          Edit
                        </ActionButton>
                        <Button
                          type="button"
                          variant="destructive"
                          className="gap-2 sm:col-span-2"
                          disabled={busyAction === `delete:${guest.id}`}
                          onClick={() => handleDeleteGuest(guest)}
                        >
                          {busyAction === `delete:${guest.id}` ? (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Trash2 className="size-4" aria-hidden="true" />
                          )}
                          Hapus
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </AdminCard>
            )
          })}
        </div>
      )}

      {selectedPreview ? (
        <div
          className="fixed inset-0 z-50 flex items-end bg-espresso/45 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Preview pesan undangan"
        >
          <div className="max-h-[88vh] w-full max-w-2xl overflow-auto rounded-3xl border bg-background p-5 shadow-luxe">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Preview Pesan
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-espresso">
                  {selectedPreview.guest.guest_name}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setPreviewGuest(null)}
                aria-label="Tutup preview"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-4 rounded-2xl border bg-muted/30 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Link undangan
              </p>
              <p className="mt-1 break-all text-sm font-medium">
                {selectedPreview.link}
              </p>
            </div>

            <Textarea
              readOnly
              value={selectedPreview.message}
              rows={16}
              className="mt-4 rounded-2xl"
            />

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() =>
                  copyText(selectedPreview.message, 'Pesan undangan')
                }
              >
                <Copy className="size-4" aria-hidden="true" />
                Copy Pesan
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => copyText(selectedPreview.link, 'Link undangan')}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Copy Link
              </Button>
              <Button
                type="button"
                className="gap-2"
                disabled={!selectedPreview.whatsappUrl}
                onClick={() => openWhatsApp(selectedPreview.guest)}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Buka WA
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  )
}

function ActionButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="gap-2"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function normalizeWhatsAppPhone(value: string | null | undefined) {
  const digits = (value ?? '').replace(/[^\d+]/g, '').replace(/^\+/, '')

  if (!digits) return ''
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  if (digits.startsWith('62')) return digits
  return digits
}

function generateGuestToken(name: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return `${slug || 'guest'}-${Math.random().toString(36).slice(2, 8)}`
}

function generateInvitationLink(guest: WeddingGuest) {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const params = new URLSearchParams({
    to: guest.guest_name,
  })

  if (guest.guest_token) {
    params.set('g', guest.guest_token)
  }

  return `${origin}/?${params.toString()}`
}

function renderMessageTemplate(
  template: string,
  guest: WeddingGuest,
  invitationLink: string,
) {
  return template
    .replaceAll('{nama_tamu}', guest.guest_name)
    .replaceAll('{link_undangan}', invitationLink)
    .replaceAll('{nama_pria}', weddingData.groom.name)
    .replaceAll('{nama_wanita}', weddingData.bride.name)
    .replaceAll('{nama_pendek}', weddingData.coupleShort)
}

function generateWhatsAppUrl(phone: string | null, message: string) {
  const normalizedPhone = normalizeWhatsAppPhone(phone)
  if (!normalizedPhone) return ''

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}

function showGuestMutationError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Aksi gagal.'

  toast.error('Aksi tamu gagal', {
    description: message,
  })
}
