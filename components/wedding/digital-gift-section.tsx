'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { staggerContainer, fadeUp } from './motion-helpers'
import { motion } from 'framer-motion'
import { SectionOrnaments } from './ornaments'

export function DigitalGiftSection() {
  const { gifts } = weddingData
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function copyNumber(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      console.log('[v0] Clipboard copy failed')
    }
  }

  return (
    <section
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Hadiah digital"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="Wedding Gift" title="Amplop Digital" />

        <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-taupe">
          Doa restu Anda merupakan karunia yang sangat berarti. Namun jika
          memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui:
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              variants={fadeUp}
              className="ornate-card rounded-2xl px-6 py-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full border border-gold/35 bg-gold/90 text-ivory shadow-luxe">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    Rekening
                  </span>
                  <p className="font-serif text-xl text-espresso">{gift.bank}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gold/25 bg-ivory/65 px-4 py-4">
                <p className="font-mono text-lg tracking-widest text-espresso">
                  {gift.accountNumber}
                </p>
                <p className="mt-1 text-sm text-taupe">
                  a.n. {gift.accountHolder}
                </p>
              </div>

              <button
                onClick={() => copyNumber(gift.id, gift.accountNumber)}
                className="gold-button mt-5 inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
              >
                {copiedId === gift.id ? (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden="true" />
                    Salin Nomor Rekening
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
