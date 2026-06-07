'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { weddingData } from '@/lib/wedding-data'
import {
  getApprovedWishes,
  isSupabaseConfigured,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'
import { staggerContainer, fadeUp } from './motion-helpers'
import { CornerOrnament, SectionOrnaments } from './ornaments'

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

export function WishesSection() {
  const [wishes, setWishes] = useState<DisplayWish[]>(dummyWishes)
  const [isLoading, setIsLoading] = useState(false)

  const loadWishes = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setWishes(dummyWishes)
      return
    }

    setIsLoading(true)

    try {
      const approvedWishes = await getApprovedWishes()

      setWishes(
        approvedWishes.map((wish) => ({
          id: wish.id,
          name: wish.guest_name,
          status: wish.attendance_status ?? 'Hadir',
          message: wish.message || 'Terima kasih atas doa dan restunya.',
        })),
      )
    } catch {
      setWishes(dummyWishes)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadWishes()

    const refreshWishes = () => {
      void loadWishes()
    }

    window.addEventListener('wedding-wish-submitted', refreshWishes)
    return () =>
      window.removeEventListener('wedding-wish-submitted', refreshWishes)
  }, [loadWishes])

  return (
    <section
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Ucapan dan doa"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="Doa & Harapan" title="Ucapan Tamu" />

        {isLoading ? (
          <p className="mt-6 text-center text-sm text-taupe">
            Memuat ucapan tamu...
          </p>
        ) : null}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {wishes.map((wish) => (
            <motion.figure
              key={wish.id}
              variants={fadeUp}
              className="ornate-card rounded-2xl px-6 py-6"
            >
              <CornerOrnament className="absolute right-3 top-3 w-12 rotate-90 opacity-35" />
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
        </motion.div>
      </div>
    </section>
  )
}
