'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

function EventDivider() {
  return (
    <div
      className="mx-auto my-8 flex w-full max-w-md items-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/54 to-gold/28" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/65 bg-gold/18" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/54 to-gold/28" />
    </div>
  )
}

export function EventSection({ data = weddingData }: { data?: WeddingData }) {
  const { events } = data

  return (
    <section
      id="event"
      className="ornamental-section relative overflow-hidden bg-[#24150f] px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Acara pernikahan"
    >
      <div className="javanese-section-frame" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(216,187,133,0.18),transparent_25rem),radial-gradient(circle_at_12%_72%,rgba(111,71,47,0.28),transparent_22rem),linear-gradient(180deg,rgba(43,26,18,0.94),rgba(31,18,12,0.9)_48%,rgba(18,10,6,0.96))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,236,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,248,236,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl [&_.soft-badge]:border-gold/34 [&_.soft-badge]:bg-ivory/10 [&_.soft-badge]:text-champagne [&_h2]:text-ivory [&_h2]:drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
        <SectionHeading subtitle="Save The Date" title="Rangkaian Acara" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.18 }}
          className="mt-14 grid gap-10"
        >
          {events.map((event, index) => (
            <motion.section
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative min-w-0 text-center"
            >
              <div className="relative mx-auto flex max-w-2xl flex-col items-center">
                <span className="mb-4 flex size-11 items-center justify-center text-gold/80">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-[1.85rem] font-semibold leading-tight text-ivory sm:text-[2.15rem]">
                  {event.title}
                </h3>
                <EventDivider />

                <ul className="w-full space-y-4 text-ivory/86">
                  <li className="flex items-center justify-center gap-2 text-sm leading-relaxed sm:text-base">
                    <CalendarDays
                      className="size-4 shrink-0 text-gold/82"
                      aria-hidden="true"
                    />
                    <span>{event.date}</span>
                  </li>
                  <li className="flex items-center justify-center gap-2 text-sm leading-relaxed sm:text-base">
                    <Clock className="size-4 shrink-0 text-gold/82" aria-hidden="true" />
                    <span>{event.time}</span>
                  </li>
                  <li className="mx-auto max-w-xl">
                    <span className="flex items-center justify-center gap-2 font-medium leading-relaxed text-champagne">
                      <MapPin className="size-4 shrink-0 text-gold/82" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-ivory/72">
                      {event.address}
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-gold/50 bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:bg-ivory/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/36 sm:w-auto"
                  >
                    <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                    Simpan Tanggal
                  </button>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-gold/58 bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-champagne shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/36 sm:w-auto"
                  >
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    Lihat Lokasi
                  </a>
                </div>
              </div>
              {index < events.length - 1 ? (
                <div className="pt-2" aria-hidden="true">
                  <EventDivider />
                </div>
              ) : null}
            </motion.section>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
