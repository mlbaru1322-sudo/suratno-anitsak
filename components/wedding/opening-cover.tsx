'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import {
  CornerOrnament,
  FloralAccent,
  FloralMark,
  OrnamentDivider,
} from './ornaments'

export function OpeningCover({
  data = weddingData,
  open,
  onOpen,
}: {
  data?: WeddingData
  open: boolean
  onOpen: () => void
}) {
  const {
    coupleShort,
    coverPhoto,
    coverPhotoPositionDesktop,
    coverPhotoPositionMobile,
    weddingDateDisplay,
    guest,
  } = data
  const [isDesktopCrop, setIsDesktopCrop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const updateCrop = () => setIsDesktopCrop(mediaQuery.matches)

    updateCrop()
    mediaQuery.addEventListener('change', updateCrop)
    return () => mediaQuery.removeEventListener('change', updateCrop)
  }, [])

  return (
    <AnimatePresence>
      {!open ? (
        <motion.section
          key="cover"
          className="fixed inset-0 z-50 h-[100dvh] overflow-hidden bg-espresso"
          exit={{ opacity: 0, y: -36, scale: 1.02 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Sampul undangan"
        >
          <div className="absolute inset-0">
            <Image
              src={coverPhoto}
              alt=""
              fill
              priority
              className="animate-cover-zoom object-cover"
              sizes="100vw"
              style={{
                objectPosition: isDesktopCrop
                  ? coverPhotoPositionDesktop
                  : coverPhotoPositionMobile,
              }}
            />
            <div className="photo-vignette absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-espresso/18 via-espresso/16 to-espresso/86" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-espresso via-espresso/60 to-transparent" />
            <div className="paper-texture absolute inset-0 opacity-[0.055]" />
          </div>

          <div className="pointer-events-none absolute inset-3 border border-champagne/55 sm:inset-7" />
          <div className="pointer-events-none absolute inset-5 border border-champagne/25 sm:inset-10" />
          <div className="pointer-events-none absolute left-1/2 top-5 flex -translate-x-1/2 flex-col items-center text-champagne sm:top-10">
            <FloralMark className="h-6 w-24 opacity-90 sm:h-7 sm:w-28" />
            <span className="mt-2 h-10 w-px bg-gradient-to-b from-champagne/65 to-transparent sm:h-14" />
          </div>
          <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 rotate-180 flex-col items-center text-champagne opacity-75 sm:bottom-10">
            <FloralMark className="h-6 w-24 sm:h-7 sm:w-28" />
          </div>
          <FloralAccent className="animate-float-slow pointer-events-none absolute -left-10 top-1/3 w-24 text-champagne opacity-30 sm:w-40" />
          <FloralAccent className="animate-float-slower pointer-events-none absolute -right-10 bottom-1/3 w-24 rotate-180 text-champagne opacity-30 sm:w-40" />
          <CornerOrnament className="pointer-events-none absolute left-4 top-4 w-20 text-champagne opacity-75 sm:left-8 sm:top-8 sm:w-32" />
          <CornerOrnament className="pointer-events-none absolute right-4 top-4 w-20 rotate-90 text-champagne opacity-75 sm:right-8 sm:top-8 sm:w-32" />
          <CornerOrnament className="pointer-events-none absolute bottom-4 left-4 w-20 -rotate-90 text-champagne opacity-65 sm:bottom-8 sm:left-8 sm:w-32" />
          <CornerOrnament className="pointer-events-none absolute bottom-4 right-4 w-20 rotate-180 text-champagne opacity-65 sm:bottom-8 sm:right-8 sm:w-32" />

          <div className="relative flex h-full flex-col items-center justify-end px-5 pb-9 pt-16 text-center text-ivory sm:justify-center sm:px-6 sm:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-[0.68rem] uppercase tracking-[0.32em] text-champagne drop-shadow sm:text-base"
            >
              The Wedding of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.1 }}
              className="mt-3 max-w-[18rem] font-serif text-[2.8rem] font-semibold leading-[0.95] text-balance drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)] sm:mt-4 sm:max-w-none sm:text-6xl md:text-7xl"
            >
              {coupleShort}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.9 }}
            >
              <OrnamentDivider className="mt-4 sm:mt-6 [&_*]:text-champagne" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="mt-4 text-xs uppercase tracking-[0.2em] text-ivory/90 drop-shadow sm:mt-6 sm:text-lg"
            >
              {weddingDateDisplay}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9 }}
              className="mt-6 w-full max-w-[18.5rem] rounded-3xl border border-champagne/35 bg-espresso/42 px-5 py-4 shadow-luxe backdrop-blur-sm sm:mt-9 sm:max-w-sm sm:py-5"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ivory/78 sm:text-xs">
                {guest.label}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-ivory/78 sm:text-xs">
                {guest.recipient}
              </p>
              <p className="mt-1 font-serif text-xl text-champagne sm:text-2xl">
                {guest.name}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.9 }}
              onClick={onOpen}
              className="gold-button animate-gentle-glow mt-6 inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5 sm:mt-9 sm:px-8 sm:text-sm"
            >
              <Mail className="size-4" aria-hidden="true" />
              Buka Undangan
            </motion.button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}
