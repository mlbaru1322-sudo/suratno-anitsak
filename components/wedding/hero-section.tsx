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
  panel: { duration: 1.2, delay: REFERENCE_VIDEO_OPENING_TIMELINE.panelReveal.start },
  frame: { duration: 0.95, delay: REFERENCE_VIDEO_OPENING_TIMELINE.photoReveal.start },
  photo: { duration: 0.95, delay: REFERENCE_VIDEO_OPENING_TIMELINE.photoReveal.start + 0.22 },
  label: { duration: 0.75, delay: REFERENCE_VIDEO_OPENING_TIMELINE.textReveal.start },
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
          animate={
            active
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: reduceMotion ? 0 : 16, filter: 'blur(8px)' }
          }
          transition={t(HERO_TIMELINE.label.duration, HERO_TIMELINE.label.delay)}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={false}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={t(0.7, HERO_TIMELINE.label.delay - 0.04)}
          >
            <Image
              src={`${vintageBase}/gunungan/gunungan-01.svg`}
              alt=""
              width={72}
              height={88}
              className="mb-3 w-11 opacity-80 sm:w-12"
            />
          </motion.div>
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8]/90 sm:text-xs">
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
          animate={
            active
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  clipPath: 'inset(0% 0% 0% 0% round 1.75rem)',
                }
              : {
                  opacity: 0,
                  y: reduceMotion ? 0 : 48,
                  scale: reduceMotion ? 1 : 0.94,
                  filter: reduceMotion ? 'blur(0px)' : 'blur(12px)',
                  clipPath: reduceMotion
                    ? 'inset(0% 0% 0% 0% round 1.75rem)'
                    : 'inset(16% 12% 16% 12% round 1.75rem)',
                }
          }
          transition={t(HERO_TIMELINE.panel.duration, HERO_TIMELINE.panel.delay)}
          className="relative mt-7 w-full max-w-[19rem] overflow-hidden rounded-[1.75rem] border border-[#b9976b]/58 px-4 py-5 shadow-[0_24px_60px_-34px_rgba(12,7,4,0.88)] sm:mt-8 sm:max-w-[22rem] sm:px-5 sm:py-6"
        >
          <Image
            src={`${vintageBase}/backgrounds/bg-paper-cream.svg`}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-[0.92]"
          />
          <Image
            src={`${vintageBase}/backgrounds/bg-batik-cream.svg`}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-[0.1] mix-blend-multiply"
          />
          <motion.div
            initial={false}
            animate={
              active
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    clipPath: 'inset(0% 0% 0% 0% round 999px 999px 1.5rem 1.5rem)',
                  }
                : {
                    opacity: 0,
                    scale: reduceMotion ? 1 : 0.88,
                    y: reduceMotion ? 0 : 14,
                    clipPath: reduceMotion
                      ? 'inset(0% 0% 0% 0% round 999px 999px 1.5rem 1.5rem)'
                      : 'inset(0% 50% 0% 50% round 999px 999px 1.5rem 1.5rem)',
                  }
            }
            transition={t(HERO_TIMELINE.frame.duration, HERO_TIMELINE.frame.delay)}
            className="relative z-10"
          >
            <VintageJawaPhotoFrame
              type="arch"
              className="mx-auto aspect-[3/4] w-full max-w-[17rem] sm:max-w-[19.5rem]"
            >
              <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={
                  active
                    ? {
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        clipPath: 'inset(0% 0% 0% 0%)',
                      }
                    : {
                        opacity: 0,
                        scale: reduceMotion ? 1 : 1.08,
                        filter: reduceMotion ? 'blur(0px)' : 'blur(10px)',
                        clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(10% 0% 18% 0%)',
                      }
                }
                transition={t(HERO_TIMELINE.photo.duration, HERO_TIMELINE.photo.delay)}
              >
                <Image
                  src={portraitPhoto}
                  alt={`Foto ${bride.shortName} dan ${groom.shortName}`}
                  fill
                  priority
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 640px) 76vw, 312px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1a12]/28 via-transparent to-[#2b1a12]/8" />
              </motion.div>
            </VintageJawaPhotoFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
