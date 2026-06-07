'use client'

import { useEffect, useState } from 'react'
import { getAllWishesForAdmin } from '@/lib/services/wedding-service'
import type { WeddingWish } from '@/lib/types/wedding'
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
} from '@/components/admin/admin-shell'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function AdminWishesPage() {
  const [wishes, setWishes] = useState<WeddingWish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWishes() {
      try {
        setWishes(await getAllWishesForAdmin())
      } catch {
        setWishes([])
      } finally {
        setLoading(false)
      }
    }

    void loadWishes()
  }, [])

  return (
    <>
      <AdminPageHeader
        title="RSVP & Ucapan"
        description="Daftar read-only data wedding_wishes. Approval dan delete belum tersedia di tahap ini."
      />

      {loading ? (
        <EmptyState message="Memuat data RSVP dan ucapan..." />
      ) : wishes.length === 0 ? (
        <EmptyState message="Belum ada data RSVP, env Supabase belum diisi, atau RLS belum mengizinkan read." />
      ) : (
        <div className="grid gap-4">
          {wishes.map((wish) => (
            <AdminCard key={wish.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_8rem_7rem_9rem_7rem] lg:items-start">
                <div>
                  <p className="font-serif text-xl font-semibold text-espresso">
                    {wish.guest_name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {wish.message || 'Tidak ada pesan.'}
                  </p>
                </div>
                <Info label="Kehadiran" value={wish.attendance_status ?? '-'} />
                <Info label="Jumlah" value={String(wish.guest_count ?? 1)} />
                <Info label="Submit" value={formatDate(wish.created_at)} />
                <Info
                  label="Approved"
                  value={wish.is_approved ? 'Ya' : 'Belum'}
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
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}
