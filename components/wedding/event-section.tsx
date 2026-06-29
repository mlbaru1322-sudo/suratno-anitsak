'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { SectionBackdrop } from './section-backdrop'

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
      className="ornamental-section relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Acara pernikahan"
    >
      <SectionBackdrop variant="event" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.44),transparent_28rem),linear-gradient(180deg,rgba(245,241,231,0.14),rgba(101,67,45,0.06)_52%,rgba(245,241,231,0.16))]" />
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
              className="relative flex min-w-0 flex-col items-center overflow-hidden rounded-b-[1.6rem] rounded-t-[3.25rem] border border-gold/42 bg-ivory/80 px-5 py-9 text-center shadow-[0_24px_62px_-44px_rgba(43,26,18,0.78),inset_0_1px_0_rgba(255,255,255,0.60)] sm:px-7 sm:py-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.20),transparent_14rem),linear-gradient(135deg,rgba(255,248,236,0.42),transparent_44%,rgba(90,59,46,0.08))]" />
              <div className="pointer-events-none absolute inset-2 rounded-b-[1.2rem] rounded-t-[2.8rem] border border-batik-brown/18" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

              <div className="relative flex w-full flex-1 flex-col items-center">
                <span className="mb-4 flex size-12 items-center justify-center rounded-t-[1.35rem] rounded-b-xl border border-gold/40 bg-cream/70 text-gold shadow-[0_12px_28px_-24px_rgba(43,26,18,0.72)]">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-3xl font-semibold leading-tight text-espresso sm:text-[2.15rem]">
                  {event.title}
                </h3>
                <EventDivider />

                <ul className="w-full space-y-3.5 text-taupe">
                  <li className="flex items-center justify-center gap-2 rounded-xl border border-gold/25 bg-cream/48 px-4 py-3 text-sm leading-relaxed text-espresso/82">
                    <CalendarDays
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{event.date}</span>
                  </li>
                  <li className="flex items-center justify-center gap-2 rounded-xl border border-gold/25 bg-cream/48 px-4 py-3 text-sm leading-relaxed text-espresso/82">
                    <Clock className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{event.time}</span>
                  </li>
                  <li className="rounded-xl border border-gold/30 bg-ivory/72 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.54)]">
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
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gold/45 bg-ivory/80 px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-espresso transition-colors hover:bg-gold/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 sm:w-auto"
                  >
                    <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                    Simpan Tanggal
                  </button>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gold/55 bg-espresso px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-ivory shadow-[0_14px_34px_-26px_rgba(43,26,18,0.82)] transition-colors hover:bg-batik-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 sm:w-auto"
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
