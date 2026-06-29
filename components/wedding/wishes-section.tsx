'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { weddingData } from '@/lib/wedding-data'
import {
  getApprovedWishes,
  isSupabaseConfigured,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'

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

function GuestBookDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/20" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/50 bg-ivory" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/20" />
    </div>
  )
}

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
      className="ornamental-section paper-texture relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Ucapan dan doa"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(216,187,133,0.20),transparent_26rem),radial-gradient(circle_at_88%_86%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.08),rgba(232,223,201,0.16)_52%,rgba(245,241,231,0.10))]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading subtitle="Doa & Harapan" title="Ucapan Tamu" />

        <div className="relative mt-14 overflow-hidden rounded-b-[1.75rem] rounded-t-[3rem] border border-gold/30 bg-ivory/62 px-4 py-5 shadow-[0_22px_58px_-44px_rgba(43,26,18,0.72),inset_0_1px_0_rgba(255,255,255,0.54)] sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.50),transparent_18rem),linear-gradient(135deg,rgba(216,187,133,0.10),transparent_45%,rgba(90,59,46,0.07))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

          <div className="relative">
            <GuestBookDivider />

            {isLoading ? (
              <p
                className="my-6 text-center text-sm text-taupe"
                aria-live="polite"
              >
                Memuat ucapan tamu...
              </p>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {wishes.map((wish) => (
                <motion.figure
                  key={wish.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="relative min-w-0 overflow-hidden rounded-xl border border-gold/28 bg-cream/48 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.50)]"
                >
                  <span
                    className="mb-4 flex size-9 items-center justify-center rounded-t-[1rem] rounded-b-lg border border-gold/35 bg-ivory/70 font-serif text-xl leading-none text-gold"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <blockquote className="text-sm leading-relaxed text-espresso text-pretty">
                    {wish.message}
                  </blockquote>
                  <figcaption className="mt-5 flex flex-col gap-2 border-t border-gold/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-serif text-lg font-semibold leading-tight text-espresso">
                      {wish.name}
                    </span>
                    <span className="w-fit rounded-lg border border-gold/30 bg-ivory/60 px-3 py-1 text-xs font-medium text-gold">
                      {wish.status}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
