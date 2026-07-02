'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

function EventDivider() {
  return (
    <div
      className="my-6 flex w-full items-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/45 to-gold/25" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/55 bg-ivory" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/45 to-gold/25" />
    </div>
  )
}

export function EventSection({ data = weddingData }: { data?: WeddingData }) {
  const { events } = data

  return (
    <section
      id="event"
      className="ornamental-section relative overflow-hidden bg-transparent px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Acara pernikahan"
    >
      <div className="javanese-section-frame" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.12),transparent_26rem),linear-gradient(180deg,rgba(245,241,231,0.04),transparent_45%,rgba(43,26,18,0.05))]" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading subtitle="Save The Date" title="Rangkaian Acara" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.14 }}
          className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative flex min-w-0 flex-col items-center overflow-hidden rounded-b-[1.15rem] rounded-t-[3.75rem] border border-gold/48 bg-[#fff8ea]/86 px-5 py-9 text-center shadow-[0_22px_58px_-40px_rgba(43,26,18,0.76),inset_0_1px_0_rgba(255,255,255,0.64)] sm:rounded-t-[4.5rem] sm:px-7 sm:py-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.18),transparent_14rem),linear-gradient(135deg,rgba(255,248,236,0.34),transparent_44%,rgba(90,59,46,0.07))]" />
              <div className="pointer-events-none absolute inset-2 rounded-b-[0.95rem] rounded-t-[3.25rem] border border-batik-brown/20 sm:rounded-t-[3.9rem]" />
              <div className="pointer-events-none absolute inset-4 rounded-b-[0.7rem] rounded-t-[2.65rem] border border-gold/18 sm:rounded-t-[3.25rem]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
              <span
                className="pointer-events-none absolute left-6 top-7 h-12 w-8 rounded-t-full border-l border-t border-gold/24"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute right-6 top-7 h-12 w-8 rounded-t-full border-r border-t border-gold/24"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-1/2 top-5 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex w-full flex-1 flex-col items-center">
                <span className="mb-4 flex size-12 items-center justify-center rounded-t-[1.15rem] rounded-b-lg border border-gold/42 bg-cream/74 text-gold shadow-[0_12px_28px_-24px_rgba(43,26,18,0.72)]">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-[1.8rem] font-semibold leading-tight text-espresso sm:text-[2rem]">
                  {event.title}
                </h3>
                <EventDivider />

                <ul className="w-full space-y-3.5 text-taupe">
                  <li className="flex items-center justify-center gap-2 rounded-lg border border-gold/28 bg-cream/54 px-4 py-3 text-sm leading-relaxed text-espresso/86">
                    <CalendarDays
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{event.date}</span>
                  </li>
                  <li className="flex items-center justify-center gap-2 rounded-lg border border-gold/28 bg-cream/54 px-4 py-3 text-sm leading-relaxed text-espresso/86">
                    <Clock className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{event.time}</span>
                  </li>
                  <li className="rounded-lg border border-gold/34 bg-ivory/78 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.56)]">
                    <span className="flex items-center justify-center gap-2 font-medium leading-relaxed text-espresso">
                      <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-taupe">
                      {event.address}
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-gold/50 bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-espresso shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 sm:w-auto"
                  >
                    <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                    Simpan Tanggal
                  </button>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-gold/58 bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-espresso shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] transition-colors hover:bg-batik-brown/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 sm:w-auto"
                  >
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    Lihat Lokasi
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
