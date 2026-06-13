'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { ReferenceVideoOpeningScene } from './reference-video-opening-scene'
import { REFERENCE_VIDEO_OPENING_TIMELINE } from './reference-video-opening-timeline'
import { VintageJawaPhotoFrame } from './vintage-jawa-final-scene'

const vintageBase = '/ornaments/vintage-jawa-final'
const revealEase = [0.22, 1, 0.36, 1] as const

const HERO_TIMELINE = {
  panel: { duration: 0.5, delay: 0 },
  frame: { duration: 0.5, delay: 0 },
  photo: { duration: 0.5, delay: 0 },
  label: { duration: 0.5, delay: 0 },
} as const

export function HeroSection({
  data = weddingData,
  active = false,
}: {
  data?: WeddingData
  active?: boolean
}) {
  const { bride, groom, portraitPhoto } = data
  const reduceMotion = useReducedMotion()

  const t = (duration: number, delay: number) =>
    reduceMotion
      ? { duration: 0.35, delay: 0, ease: revealEase }
      : { duration, delay, ease: revealEase }

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-transparent px-5 py-16 sm:px-6 sm:py-24"
      aria-label="Mempelai"
    >
      <div className="reference-video-hero-stage pointer-events-none absolute inset-0" aria-hidden="true">
        <ReferenceVideoOpeningScene active={active} showBackground={false} className="h-full w-full" />
      </div>

      <div className="relative z-40 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <motion.div
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: HERO_TIMELINE.label.duration, delay: HERO_TIMELINE.label.delay }}
          className="flex flex-col items-center"
        >
          <p 
            className="text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8] sm:text-xs"
            style={{ textShadow: '0 1px 4px rgba(42,25,14,0.45)' }}
          >
            We Are Getting Married
          </p>
          <Image
            src={`${vintageBase}/dividers/divider-batik-line.svg`}
            alt=""
            width={360}
            height={48}
            className="mt-3 w-32 opacity-55 brightness-110 sm:w-36"
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: HERO_TIMELINE.panel.duration, delay: HERO_TIMELINE.panel.delay }}
          className="relative mt-7 w-full max-w-[19rem] overflow-hidden rounded-[1.75rem] border border-[#c9a96e]/35 bg-[rgba(232,223,201,0.38)] px-4 py-5 shadow-[0_20px_48px_-16px_rgba(28,17,11,0.55)] backdrop-blur-[3px] sm:mt-8 sm:max-w-[22rem] sm:px-5 sm:py-6"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e7]/25 to-transparent" />
          <motion.div
            initial={false}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: HERO_TIMELINE.frame.duration, delay: HERO_TIMELINE.frame.delay }}
            className="relative z-10"
          >
            <VintageJawaPhotoFrame
              type="arch"
              className="mx-auto aspect-[3/4] w-[min(72vw,17rem)] max-w-[17rem] shadow-[0_12px_28px_-8px_rgba(28,17,11,0.4)] sm:max-w-[19.5rem]"
            >
              <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: HERO_TIMELINE.photo.duration, delay: HERO_TIMELINE.photo.delay }}
              >
                <Image
                  src={portraitPhoto}
                  alt={`Foto ${bride.shortName} dan ${groom.shortName}`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 76vw, 312px"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(28,17,11,0.28)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c110b]/65 via-[#1c110b]/5 to-transparent" />
                <div className="absolute inset-0 rounded-t-full rounded-b-3xl ring-1 ring-inset ring-[#e8dfc9]/35" />
              </motion.div>
            </VintageJawaPhotoFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
