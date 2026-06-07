'use client'

import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import { CornerOrnament, OrnamentDivider, SectionOrnaments } from './ornaments'
import { SectionHeading } from './section-heading'

export function GreetingSection({ data = weddingData }: { data?: WeddingData }) {
  const { greeting } = data

  return (
    <section
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Salam pembuka"
    >
      <SectionOrnaments />

      <div className="relative mx-auto max-w-2xl">
        <SectionHeading subtitle="Dengan Hormat" title="Salam Pembuka" />
        <Reveal className="mt-12">
          <div className="ornate-card rounded-[2rem] px-7 py-12 text-center sm:px-12 sm:py-14">
            <CornerOrnament className="absolute left-3 top-3 w-16 opacity-60" />
            <CornerOrnament className="absolute bottom-3 right-3 w-16 rotate-180 opacity-60" />

            <p className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
              {greeting.opening}
            </p>
            <OrnamentDivider className="my-7" />
            <p className="text-sm uppercase tracking-[0.26em] text-gold sm:text-base">
              {greeting.basmalah}
            </p>
            <p className="mx-auto mt-7 max-w-md text-base leading-8 text-taupe sm:text-lg">
              {greeting.message}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
