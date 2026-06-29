'use client'

import { motion } from 'framer-motion'
import { type WeddingData } from '@/lib/wedding-data'

const quoteLabel = 'QS. Ar-Rum Ayat 21'
const quoteText =
  'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.'
const quoteSource = 'QS. Ar-Rum: 21'

function QuoteDivider() {
  return (
    <div
      className="mx-auto flex w-full max-w-[17rem] items-center gap-3 sm:max-w-sm sm:gap-4"
      aria-hidden="true"
    >
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/55 to-gold/25" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/60 bg-ivory shadow-[0_0_0_4px_rgba(185,151,107,0.08)]" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/55 to-gold/25" />
    </div>
  )
}

export function QuoteSection(_props: { data?: WeddingData }) {
  return (
    <section
      className="relative isolate overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Kutipan Doa"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.26),transparent_34rem),radial-gradient(circle_at_12%_84%,rgba(90,59,46,0.12),transparent_22rem),linear-gradient(180deg,rgba(245,241,231,0.94)_0%,rgba(232,223,201,0.88)_48%,rgba(245,241,231,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(180deg,rgba(101,67,45,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-[linear-gradient(0deg,rgba(101,67,45,0.10),transparent)]" />
      <div className="batik-pattern pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-gold/35 bg-ivory/72 px-6 py-10 text-center shadow-[0_22px_60px_-42px_rgba(43,26,18,0.74),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-[2px] sm:rounded-[2rem] sm:px-12 sm:py-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.72),transparent_18rem),linear-gradient(135deg,rgba(216,187,133,0.12),transparent_38%,rgba(90,59,46,0.08))]" />
          <span
            className="pointer-events-none absolute -left-6 bottom-8 h-28 w-14 rounded-t-full bg-batik-brown/10 [clip-path:polygon(50%_0,86%_18%,72%_100%,50%_82%,28%_100%,14%_18%)] sm:h-36 sm:w-16"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-6 top-8 h-28 w-14 rounded-t-full bg-gold/10 [clip-path:polygon(50%_0,86%_18%,72%_100%,50%_82%,28%_100%,14%_18%)] sm:h-36 sm:w-16"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold sm:text-sm">
              {quoteLabel}
            </p>

            <QuoteDivider />

            <blockquote className="mx-auto my-8 max-w-2xl font-serif text-[1.35rem] italic leading-[1.85] text-espresso text-pretty sm:text-2xl sm:leading-[1.8] md:text-[1.7rem]">
              {quoteText}
            </blockquote>

            <QuoteDivider />

            <p className="mt-7 text-xs font-medium uppercase tracking-[0.22em] text-batik-brown/75 sm:text-sm">
              {quoteSource}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
