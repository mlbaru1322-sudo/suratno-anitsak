'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import {
  VintageJawaBirdsLayer,
  VintageJawaOpeningScene,
} from './vintage-jawa-final-scene'

const vintageBase = '/ornaments/vintage-jawa-final'

export function OpeningCover({
  data = weddingData,
  open,
  onOpen,
}: {
  data?: WeddingData
  open: boolean
  onOpen: () => void
}) {
  const { coupleShort, guest } = data

  return (
    <AnimatePresence>
      {!open ? (
        <motion.section
          key="cover"
          className="fixed inset-0 z-50 h-[100dvh] overflow-hidden bg-[#1a0f0a]"
          exit={{
            opacity: 0,
            y: -36,
            scale: 1.035,
            filter: 'blur(2px)',
          }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Sampul undangan"
        >
          <VintageJawaOpeningScene variant="landscape" />

          <div
            className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(12,7,4,0.62)_0%,rgba(18,10,6,0.18)_24%,rgba(18,10,6,0.12)_50%,rgba(18,10,6,0.22)_76%,rgba(12,7,4,0.68)_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(18,10,6,0.28)_52%,rgba(10,6,4,0.62)_100%)]"
            aria-hidden="true"
          />

          <VintageJawaBirdsLayer className="z-[25]" />

          <div className="relative z-30 flex h-full min-h-0 flex-col items-center justify-center px-5 pb-[clamp(5.5rem,14dvh,8rem)] pt-[clamp(5.5rem,14dvh,8rem)] text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="flex w-full max-w-[22rem] flex-col items-center sm:max-w-md"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8]/88 sm:text-xs"
              >
                Wedding Invitation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 1 }}
                className="mt-3 font-serif text-[2.75rem] font-semibold leading-[0.92] text-[#f5f1e7] text-balance drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-6xl"
              >
                {coupleShort}
              </motion.h1>

              <Image
                src={`${vintageBase}/dividers/divider-batik-line.svg`}
                alt=""
                width={480}
                height={60}
                className="mx-auto mt-5 w-36 opacity-55 brightness-125 sm:mt-6 sm:w-44"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-6 w-full max-w-[18rem] rounded-lg border border-[#b9976b]/32 bg-[rgba(43,26,18,0.42)] px-4 py-3 backdrop-blur-[2px] sm:mt-7 sm:max-w-[20rem] sm:px-5 sm:py-3.5"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#c9b89a]/90 sm:text-[0.68rem]">
                  {guest.label}
                </p>
                <p className="mt-2 font-serif text-lg font-semibold leading-snug text-[#f0e8d8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] sm:text-xl">
                  {guest.name}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.8 }}
                className="mt-3 max-w-[16rem] text-[0.58rem] leading-relaxed text-[#a89478]/85 sm:max-w-[18rem] sm:text-[0.62rem]"
              >
                Mohon maaf apabila ada kesalahan penulisan nama/gelar.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.8 }}
                onClick={onOpen}
                className="mt-5 inline-flex min-h-9 items-center rounded-full border border-[#c9a96e]/55 bg-[linear-gradient(135deg,rgba(232,223,201,0.94),rgba(201,169,110,0.88))] px-5 py-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#3b281d] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5 sm:mt-6 sm:min-h-10 sm:px-6 sm:text-[0.68rem]"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}