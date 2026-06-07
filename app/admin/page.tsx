'use client'

import { useEffect, useState } from 'react'
import {
  getActiveMessageTemplate,
  getAllWishesForAdmin,
  getWeddingGuests,
} from '@/lib/services/wedding-service'
import type { MessageTemplate, WeddingGuest, WeddingWish } from '@/lib/types/wedding'
import { AdminCard, AdminPageHeader } from '@/components/admin/admin-shell'

export default function AdminPage() {
  const [wishes, setWishes] = useState<WeddingWish[]>([])
  const [guests, setGuests] = useState<WeddingGuest[]>([])
  const [template, setTemplate] = useState<MessageTemplate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSummary() {
      try {
        const [wishRows, guestRows, activeTemplate] = await Promise.all([
          getAllWishesForAdmin(),
          getWeddingGuests(),
          getActiveMessageTemplate(),
        ])

        setWishes(wishRows)
        setGuests(guestRows)
        setTemplate(activeTemplate)
      } catch {
        setWishes([])
        setGuests([])
        setTemplate(null)
      } finally {
        setLoading(false)
      }
    }

    void loadSummary()
  }, [])

  const cards = [
    {
      label: 'Total Ucapan / RSVP',
      value: loading ? '...' : String(wishes.length),
      description: 'Seluruh data dari wedding_wishes.',
    },
    {
      label: 'Total Tamu',
      value: loading ? '...' : String(guests.length),
      description: 'Data read-only dari wedding_guests.',
    },
    {
      label: 'Template Pesan Aktif',
      value: loading ? '...' : template ? 'Ada' : 'Belum Ada',
      description: template?.title ?? 'Belum ada template aktif atau env belum siap.',
    },
  ]

  return (
    <>
      <AdminPageHeader
        title="Overview"
        description="Ringkasan dev admin untuk RSVP, daftar tamu, dan template pesan."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <AdminCard key={card.label}>
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-3 font-serif text-4xl font-semibold text-espresso">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>
          </AdminCard>
        ))}
      </div>
    </>
  )
}
