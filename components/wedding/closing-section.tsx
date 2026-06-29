'use client'

import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import { SectionBackdrop } from './section-backdrop'

export function ClosingSection({ data = weddingData }: { data?: WeddingData }) {
  const { closing, coupleShort, coverPhoto } = data

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
        <div className="absolute inset-0 bg-espresso/64" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(216,187,133,0.22),transparent_24rem),linear-gradient(180deg,rgba(43,26,18,0.42),rgba(43,26,18,0.24)_48%,rgba(18,10,6,0.76))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,10,6,0.48),transparent_28%,transparent_72%,rgba(18,10,6,0.48))]" />
      </div>

      <div className="pointer-events-none absolute inset-5 border border-champagne/38 sm:inset-8" />
      <div className="pointer-events-none absolute inset-8 border border-champagne/16 sm:inset-12" />
      <SectionBackdrop variant="closing" />

      <Reveal className="relative mx-auto max-w-2xl text-center text-ivory">
        <div className="relative overflow-hidden rounded-b-[1.75rem] rounded-t-[3.25rem] border border-champagne/42 bg-espresso/48 px-6 py-10 shadow-[0_28px_72px_-46px_rgba(0,0,0,0.82),inset_0_1px_0_rgba(255,255,255,0.16)] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.22),transparent_18rem),linear-gradient(135deg,rgba(255,248,236,0.08),transparent_42%,rgba(90,59,46,0.18))]" />
          <div className="pointer-events-none absolute inset-2 rounded-b-[1.25rem] rounded-t-[2.8rem] border border-champagne/18" />

          <div className="relative">
            <span className="mx-auto mb-7 block h-px w-44 max-w-full bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
            <p className="text-base leading-relaxed text-ivory/90 sm:text-lg text-pretty">
              {closing.message}
            </p>
            <p className="mt-6 text-base text-ivory/90">{closing.thanks}</p>

            <h2 className="mt-10 font-serif text-4xl font-semibold leading-tight text-champagne sm:text-5xl">
              {coupleShort}
            </h2>
            <span className="mx-auto mt-8 block h-px w-44 max-w-full bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />

            <p className="mt-10 text-xs uppercase tracking-[0.25em] text-ivory/62">
              Made with love
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
