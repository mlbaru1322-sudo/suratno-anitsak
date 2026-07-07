'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { motion } from 'framer-motion'
import { JavaOrnamentDivider, JavaSideOrnament } from './ornaments'

type GiftItem = {
  id: string
  bank: string
  accountNumber: string
  accountHolder: string
}

export function DigitalGiftSection({
  data = weddingData,
}: {
  data?: WeddingData
}) {
  const gifts = data.gifts as readonly GiftItem[]
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (gifts.length === 0) return null

  async function copyNumber(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      console.log('Clipboard copy failed')
    }
  }

  return (
    <section
      className="ornamental-section relative overflow-hidden bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Hadiah digital"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.42),transparent_28rem),radial-gradient(circle_at_12%_88%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.16),rgba(216,187,133,0.10)_48%,rgba(245,241,231,0.18))]" />
      <JavaSideOrnament
        side="left"
        className="-left-28 bottom-4 w-40 opacity-30 sm:-left-16 sm:bottom-8 sm:w-52 md:w-60"
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <JavaOrnamentDivider className="mb-6 py-0 [&_img]:!w-[min(50vw,10rem)] [&_img]:!opacity-70 sm:mb-7 sm:[&_img]:!w-[12rem]" />
        <SectionHeading subtitle="Wedding Gift" title="Amplop Digital" />

        <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-taupe">
          Doa restu Anda merupakan karunia yang sangat berarti. Namun jika
          memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui:
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.14 }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative min-w-0 overflow-hidden rounded-b-[1.5rem] rounded-t-[2.75rem] border border-gold/34 bg-ivory/76 px-5 py-7 shadow-[0_22px_58px_-44px_rgba(43,26,18,0.76),inset_0_1px_0_rgba(255,255,255,0.58)] sm:px-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.50),transparent_14rem),linear-gradient(135deg,rgba(216,187,133,0.10),transparent_45%,rgba(90,59,46,0.07))]" />
              <div className="pointer-events-none absolute inset-2 rounded-b-[1.1rem] rounded-t-[2.25rem] border border-batik-brown/14" />

              <div className="relative flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-t-[1.3rem] rounded-b-xl border border-gold/40 bg-espresso text-ivory shadow-[0_14px_34px_-26px_rgba(43,26,18,0.82)]">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    Rekening
                  </span>
                  <p className="font-serif text-xl leading-tight text-espresso">
                    {gift.bank}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 rounded-xl border border-gold/28 bg-cream/48 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.52)]">
                <p className="break-all font-mono text-lg tracking-[0.18em] text-espresso">
                  {gift.accountNumber}
                </p>
                <p className="mt-1 text-sm text-taupe">
                  a.n. {gift.accountHolder}
                </p>
              </div>

              <button
                onClick={() => copyNumber(gift.id, gift.accountNumber)}
                className="relative mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gold/55 bg-espresso px-4 py-3 text-sm font-medium uppercase tracking-[0.08em] text-ivory shadow-[0_14px_34px_-26px_rgba(43,26,18,0.82)] transition-colors hover:bg-batik-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
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
