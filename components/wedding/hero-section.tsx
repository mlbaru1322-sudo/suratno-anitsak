'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import {
  VintageJawaHeroBackdrop,
  VintageJawaPhotoFrame,
} from './vintage-jawa-final-scene'

const vintageBase = '/ornaments/vintage-jawa-final'
const revealEase = [0.22, 1, 0.36, 1] as const

export function HeroSection({
  data = weddingData,
  active = false,
}: {
  data?: WeddingData
  active?: boolean
}) {
  const { bride, groom, portraitPhoto, weddingDateDisplay } = data
  const reduceMotion = useReducedMotion()

  const t = (duration: number, delay: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: revealEase }

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#1f120c] px-5 py-16 sm:px-6 sm:py-24"
      aria-label="Mempelai"
    >
      <VintageJawaHeroBackdrop active={active} />

      <div className="relative z-40 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={false}
          animate={
            active
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: reduceMotion ? 0 : 14 }
          }
          transition={t(0.85, 0.9)}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={false}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={t(0.7, 0.88)}
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
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: reduceMotion ? 0 : 48, scale: reduceMotion ? 1 : 0.94 }
          }
          transition={t(1.1, 0.55)}
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
          <Image
            src={`${vintageBase}/corners/corner-carving-small.svg`}
            alt=""
            width={120}
            height={90}
            className="pointer-events-none absolute left-1.5 top-1.5 z-10 w-10 opacity-70"
          />
          <Image
            src={`${vintageBase}/corners/corner-carving-small.svg`}
            alt=""
            width={120}
            height={90}
            className="pointer-events-none absolute right-1.5 top-1.5 z-10 w-10 -scale-x-100 opacity-70"
          />
          <Image
            src={`${vintageBase}/corners/corner-carving-small.svg`}
            alt=""
            width={120}
            height={90}
            className="pointer-events-none absolute bottom-1.5 left-1.5 z-10 w-10 -scale-y-100 opacity-70"
          />
          <Image
            src={`${vintageBase}/corners/corner-carving-small.svg`}
            alt=""
            width={120}
            height={90}
            className="pointer-events-none absolute bottom-1.5 right-1.5 z-10 w-10 -scale-100 opacity-70"
          />

          <motion.div
            initial={false}
            animate={
              active
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: reduceMotion ? 1 : 0.88, y: reduceMotion ? 0 : 12 }
            }
            transition={t(1, 0.75)}
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
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: reduceMotion ? 1 : 1.08 }
                }
                transition={t(1.15, 0.92)}
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

        <motion.div
          initial={false}
          animate={
            active
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: reduceMotion ? 0 : 10 }
          }
          transition={t(0.8, 1.05)}
          className="mt-5 flex flex-col items-center sm:mt-6"
          aria-hidden="true"
        >
          <Image
            src={`${vintageBase}/flowers/jasmine-cluster.svg`}
            alt=""
            width={160}
            height={80}
            className="w-24 opacity-65 sm:w-28"
          />
        </motion.div>

        <motion.h1
          initial={false}
          animate={
            active
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.97 }
          }
          transition={t(0.95, 1.05)}
          className="relative z-50 mt-7 font-serif text-3xl font-semibold leading-tight text-[#f5f1e7] text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] sm:mt-8 sm:text-5xl md:text-6xl"
        >
          {bride.name}
          <span className="my-2 block text-2xl text-[#c9a96e] sm:text-4xl">
            &
          </span>
          {groom.name}
        </motion.h1>

        <motion.div
          initial={false}
          animate={
            active
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 0, scaleX: reduceMotion ? 1 : 0.72 }
          }
          transition={t(1, 1.2)}
          className="relative z-50 mt-6 w-full max-w-md origin-center"
        >
          <Image
            src={`${vintageBase}/dividers/divider-gunungan-01.svg`}
            alt=""
            width={720}
            height={100}
            className={`mx-auto w-full opacity-85 ${active && !reduceMotion ? 'vintage-divider-reveal' : ''}`}
          />
        </motion.div>

        <motion.p
          initial={false}
          animate={
            active
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: reduceMotion ? 0 : 10 }
          }
          transition={t(0.85, 1.35)}
          className="relative z-50 mt-6 text-sm uppercase tracking-[0.14em] text-[#d4c4a8]/92 sm:text-base"
        >
          {weddingDateDisplay}
        </motion.p>

        <motion.div
          initial={false}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={t(0.75, 1.45)}
          className="relative z-50 mt-4"
          aria-hidden="true"
        >
          <Image
            src={`${vintageBase}/gunungan/gunungan-01.svg`}
            alt=""
            width={56}
            height={68}
            className="mx-auto w-9 opacity-55"
          />
        </motion.div>
      </div>
    </section>
  )
}