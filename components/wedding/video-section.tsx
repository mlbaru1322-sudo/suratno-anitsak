'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { weddingData } from '@/lib/wedding-data'
import { Reveal } from './motion-helpers'
import { SectionHeading } from './section-heading'
import { CornerOrnament, SectionOrnaments } from './ornaments'

export function VideoSection() {
  const { video } = weddingData

  return (
    <section
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Video pernikahan"
    >
      <SectionOrnaments />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading subtitle="Prewedding Video" title={video.title} />

        <Reveal className="mt-12">
          <div className="ornate-card rounded-[2rem] p-3 sm:p-4">
            <CornerOrnament className="absolute left-4 top-4 z-10 w-16 opacity-65" />
            <CornerOrnament className="absolute bottom-4 right-4 z-10 w-16 rotate-180 opacity-65" />
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-espresso">
              <Image
                src={video.thumbnail}
                alt=""
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-espresso/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
                <span className="soft-badge mb-4 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-champagne">
                  Prewedding Video
                </span>
                <span className="flex size-16 items-center justify-center rounded-full border border-champagne/70 bg-ivory/15 text-champagne shadow-luxe backdrop-blur-sm sm:size-20">
                  <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
                </span>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/85 sm:text-base">
                  {video.caption}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
