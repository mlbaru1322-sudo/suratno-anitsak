'use client'

import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import {
  CornerOrnament,
  JavaSideOrnament,
  OrnamentDivider,
  SectionOrnaments,
} from './ornaments'
import { SectionHeading } from './section-heading'

export function GreetingSection({ data = weddingData }: { data?: WeddingData }) {
  const { greeting } = data

  return (
    <section
      className="ornamental-section paper-texture relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Salam pembuka"
    >
      <SectionOrnaments />
      <JavaSideOrnament
        side="left"
        className="-left-24 top-16 w-36 opacity-35 sm:-left-16 sm:top-20 sm:w-48 md:w-56"
      />
      <JavaSideOrnament
        side="right"
        className="-right-24 bottom-12 w-36 opacity-30 sm:-right-16 sm:bottom-14 sm:w-48 md:w-56"
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionHeading subtitle="Dengan Hormat" title="Salam Pembuka" />
        <Reveal className="mt-9 sm:mt-11">
          <div className="ornate-card rounded-[1.75rem] px-6 py-10 text-center sm:rounded-[2rem] sm:px-10 sm:py-12">
            <CornerOrnament className="absolute left-3 top-3 w-14 opacity-60 sm:w-16" />
            <CornerOrnament className="absolute bottom-3 right-3 w-14 rotate-180 opacity-60 sm:w-16" />

            <p className="font-serif text-[1.55rem] font-semibold leading-tight text-espresso sm:text-[2rem]">
              {greeting.opening}
            </p>
            <OrnamentDivider className="my-6" />
            <p className="text-xs uppercase tracking-[0.22em] text-gold sm:text-sm sm:tracking-[0.25em]">
              {greeting.basmalah}
            </p>
            <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-7 text-taupe sm:text-base sm:leading-8">
              {greeting.message}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
