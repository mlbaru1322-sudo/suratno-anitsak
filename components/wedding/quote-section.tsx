'use client'

import { Quote } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import {
  CornerCarving,
  CornerOrnament,
  OrnamentDivider,
  SectionOrnaments,
} from './ornaments'
import { SectionHeading } from './section-heading'

export function QuoteSection({ data = weddingData }: { data?: WeddingData }) {
  const { quote } = data

  return (
    <section
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Kutipan"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="Ayat Suci" title="Kutipan Cinta" />
        <Reveal className="mt-12">
          <div className="ornate-card rounded-[2rem] px-7 py-12 text-center sm:px-12 sm:py-16">
            <CornerOrnament className="absolute left-4 top-4 w-16 opacity-60" />
            <CornerOrnament className="absolute bottom-4 right-4 w-16 rotate-180 opacity-60" />
            <CornerCarving className="right-4 top-4 rotate-90" />
            <span className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
              <Quote className="size-6" aria-hidden="true" />
            </span>
            <OrnamentDivider className="mb-8" />
            <blockquote className="font-serif text-xl leading-relaxed text-espresso sm:text-2xl md:text-3xl text-pretty">
              {`"${quote.text}"`}
            </blockquote>
            <p className="mt-8 text-sm uppercase tracking-[0.25em] text-gold">
              {quote.source}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
