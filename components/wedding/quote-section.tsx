'use client'

import { motion } from 'framer-motion'
import { type WeddingData } from '@/lib/wedding-data'

const quoteLabel = 'QS. Ar-Rum Ayat 21'
const quoteText =
  'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.'
const quoteSource = 'QS. Ar-Rum: 21'
const batikBackground = '/ornaments/batik/background-batik.webp'

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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.24),transparent_30rem),radial-gradient(circle_at_12%_86%,rgba(70,42,28,0.22),transparent_24rem),linear-gradient(180deg,rgba(85,52,35,0.94)_0%,rgba(126,84,54,0.88)_48%,rgba(78,46,31,0.94)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-repeat opacity-[0.16] mix-blend-soft-light"
        style={{ backgroundImage: `url('${batikBackground}')`, backgroundSize: '520px auto' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-[linear-gradient(180deg,rgba(35,20,13,0.36),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-[linear-gradient(0deg,rgba(35,20,13,0.38),transparent)]" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-gold/35 bg-ivory/82 px-6 py-10 text-center shadow-[0_24px_64px_-40px_rgba(24,13,8,0.82),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-[2px] sm:rounded-[2rem] sm:px-12 sm:py-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.76),transparent_18rem),linear-gradient(135deg,rgba(216,187,133,0.16),transparent_38%,rgba(90,59,46,0.10))]" />
          <div
            className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.045]"
            style={{ backgroundImage: `url('${batikBackground}')`, backgroundSize: '420px auto' }}
          />
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

            <blockquote className="mx-auto my-8 max-w-2xl font-serif text-[1.18rem] italic leading-[1.85] text-espresso text-pretty sm:text-[1.45rem] sm:leading-[1.8] md:text-[1.58rem]">
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
