'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { staggerContainer, fadeUp } from './motion-helpers'
import { CornerOrnament, OrnamentDivider, SectionOrnaments } from './ornaments'

export function EventSection() {
  const { events } = weddingData

  return (
    <section
      id="event"
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Acara pernikahan"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-5xl">
        <SectionHeading subtitle="Save The Date" title="Rangkaian Acara" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={fadeUp}
              className="ornate-card flex flex-col items-center rounded-[2rem] px-7 py-10 text-center"
            >
              <CornerOrnament className="absolute left-4 top-4 w-14 opacity-55" />
              <CornerOrnament className="absolute bottom-4 right-4 w-14 rotate-180 opacity-55" />
              <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-2xl font-semibold text-espresso sm:text-3xl">
                {event.title}
              </h3>
              <OrnamentDivider className="my-5" />

              <ul className="w-full space-y-4 text-taupe">
                <li className="soft-badge flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm">
                  <CalendarDays
                    className="size-4 text-gold"
                    aria-hidden="true"
                  />
                  {event.date}
                </li>
                <li className="soft-badge flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm">
                  <Clock className="size-4 text-gold" aria-hidden="true" />
                  {event.time}
                </li>
                <li className="rounded-2xl border border-gold/25 bg-ivory/55 px-4 py-4">
                  <span className="flex items-center gap-2 font-medium text-espresso">
                    <MapPin className="size-4 text-gold" aria-hidden="true" />
                    {event.venue}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed">
                    {event.address}
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/45 bg-ivory/70 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-espresso transition-colors hover:bg-gold/15"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Simpan Tanggal
                </button>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Lihat Lokasi
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
