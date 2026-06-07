'use client'

import { useEffect, useState } from 'react'
import { getWeddingGuests } from '@/lib/services/wedding-service'
import type { WeddingGuest } from '@/lib/types/wedding'
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
} from '@/components/admin/admin-shell'

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<WeddingGuest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGuests() {
      try {
        setGuests(await getWeddingGuests())
      } catch {
        setGuests([])
      } finally {
        setLoading(false)
      }
    }

    void loadGuests()
  }, [])

  return (
    <>
      <AdminPageHeader
        title="Daftar Tamu"
        description="Placeholder struktur tamu untuk tahap berikutnya. CRUD dan import belum dibuat."
      />

      {loading ? (
        <EmptyState message="Memuat daftar tamu..." />
      ) : guests.length === 0 ? (
        <EmptyState message="Belum ada tamu, env Supabase belum diisi, atau RLS belum mengizinkan read." />
      ) : (
        <div className="grid gap-4">
          {guests.map((guest) => (
            <AdminCard key={guest.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_12rem_1fr_9rem] lg:items-start">
                <Info label="Nama Tamu" value={guest.guest_name} />
                <Info label="WhatsApp" value={guest.phone ?? '-'} />
                <Info
                  label="Token / Link"
                  value={guest.guest_token ? `?to=${guest.guest_token}` : '-'}
                />
                <Info
                  label="Status Terkirim"
                  value={guest.sent_at ? 'Terkirim' : 'Belum'}
                />
              </div>
            </AdminCard>
          ))}
        </div>
      )}
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
