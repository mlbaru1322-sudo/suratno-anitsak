'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { weddingData } from '@/lib/wedding-data'
import {
  getApprovedWishes,
  isSupabaseConfigured,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'
import { fadeUp } from './motion-helpers'
import { CornerCarving, CornerOrnament, SectionOrnaments } from './ornaments'

type DisplayWish = {
  id: string | number
  name: string
  status: string
  message: string
}

const dummyWishes: DisplayWish[] = weddingData.wishes.map((wish) => ({
  id: wish.id,
  name: wish.name,
  status: wish.status,
  message: wish.message,
}))

function mapApprovedWishes(
  approvedWishes: Awaited<ReturnType<typeof getApprovedWishes>>,
): DisplayWish[] {
  if (approvedWishes.length === 0) {
    return dummyWishes
  }

  return approvedWishes.map((wish) => ({
    id: wish.id,
    name: wish.guest_name,
    status: wish.attendance_status ?? 'Hadir',
    message: wish.message || 'Terima kasih atas doa dan restunya.',
  }))
}

export function WishesSection({ enabled = true }: { enabled?: boolean }) {
  const [wishes, setWishes] = useState<DisplayWish[]>(dummyWishes)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    async function load() {
      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setWishes(dummyWishes)
          setIsLoading(false)
        }
        return
      }

      if (!cancelled) {
        setIsLoading(true)
      }

      try {
        const approved = await getApprovedWishes()
        if (!cancelled) {
          setWishes(mapApprovedWishes(approved))
        }
      } catch {
        if (!cancelled) {
          setWishes(dummyWishes)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [enabled, refreshIndex])

  useEffect(() => {
    if (!enabled) return

    function handleRefresh() {
      setRefreshIndex((value) => value + 1)
    }

    window.addEventListener('wedding-wish-submitted', handleRefresh)

    return () => {
      window.removeEventListener('wedding-wish-submitted', handleRefresh)
    }
  }, [enabled])

  return (
    <section
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Ucapan dan doa"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="Doa & Harapan" title="Ucapan Tamu" />

        <div className="relative mt-14">
          {isLoading ? (
            <p
              className="mb-6 text-center text-sm text-taupe"
              aria-live="polite"
            >
              Memuat ucapan tamu...
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            {wishes.map((wish) => (
              <motion.figure
                key={wish.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="ornate-card rounded-2xl px-6 py-6"
              >
                <CornerOrnament className="absolute right-3 top-3 w-12 rotate-90 opacity-35" />
                <CornerCarving className="left-3 bottom-3 -rotate-90 opacity-35" />
                <span className="flex size-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Quote className="size-5" aria-hidden="true" />
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-espresso text-pretty">
                  {wish.message}
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-lg text-espresso">
                    {wish.name}
                  </span>
                  <span className="soft-badge rounded-full px-3 py-1 text-xs text-gold">
                    {wish.status}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}