'use client'

import { MapPin, Navigation } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'
import { SectionOrnaments } from './ornaments'

export function MapsSection({ data = weddingData }: { data?: WeddingData }) {
  const { events, maps } = data
  const primaryEvent = events[1] ?? events[0]

  return (
    <section
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Lokasi"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="Lokasi Acara" title="Denah Lokasi" />

        <Reveal className="mt-14">
          <div className="ornate-card overflow-hidden rounded-[2rem] p-3">
            {/* Map placeholder (no real map API) */}
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.5rem] bg-champagne/40 sm:h-72">
              <div
                className="batik-pattern absolute inset-0 opacity-20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--gold-soft) 1px, transparent 1px), linear-gradient(90deg, var(--gold-soft) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-gold/90 text-ivory shadow-luxe">
                  <MapPin className="size-7" aria-hidden="true" />
                </span>
                <p className="mt-4 font-serif text-lg text-espresso">
                  {maps.label}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-taupe">
                  {primaryEvent.address}
                </p>
              </div>
            </div>

            <div className="px-6 py-6 text-center">
              <a
                href={maps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-button inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-transform hover:-translate-y-0.5"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Buka Lokasi
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
