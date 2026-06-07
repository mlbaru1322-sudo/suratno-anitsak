'use client'

import Image from 'next/image'
import { weddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import { CornerOrnament, FloralAccent, FloralMark, OrnamentDivider } from './ornaments'

export function ClosingSection() {
  const { closing, coupleShort, coverPhoto } = weddingData

  return (
    <section
      className="relative overflow-hidden px-6 py-28 sm:py-36"
      aria-label="Penutup"
    >
      <div className="absolute inset-0">
        <Image
          src={coverPhoto}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="photo-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-espresso/62" />
      </div>

      <div className="pointer-events-none absolute inset-5 border border-champagne/45 sm:inset-8" />
      <div className="pointer-events-none absolute inset-8 border border-champagne/20 sm:inset-12" />
      <CornerOrnament className="absolute left-6 top-6 w-24 text-champagne opacity-70 sm:w-32" />
      <CornerOrnament className="absolute bottom-6 right-6 w-24 rotate-180 text-champagne opacity-70 sm:w-32" />
      <FloralAccent className="animate-float-slow absolute -left-8 bottom-16 w-36 text-champagne opacity-35 sm:w-52" />
      <FloralAccent className="animate-float-slower absolute -right-8 top-16 w-36 rotate-180 text-champagne opacity-35 sm:w-52" />

      <Reveal className="relative mx-auto max-w-2xl text-center text-ivory">
        <FloralMark className="mx-auto mb-6 h-8 w-28 text-champagne" />
        <OrnamentDivider className="mb-8 [&_*]:text-champagne" />
        <p className="text-base leading-relaxed text-ivory/90 sm:text-lg text-pretty">
          {closing.message}
        </p>
        <p className="mt-6 text-base text-ivory/90">{closing.thanks}</p>

        <h2 className="mt-10 font-serif text-4xl font-semibold text-champagne sm:text-5xl">
          {coupleShort}
        </h2>
        <OrnamentDivider className="mt-8 [&_*]:text-champagne" />

        <p className="mt-12 text-xs uppercase tracking-[0.25em] text-ivory/60">
          Made with love
        </p>
      </Reveal>
    </section>
  )
}
