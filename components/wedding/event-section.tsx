'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { JavaSideOrnament } from './ornaments'

function EventDivider() {
  return (
    <div
      className="my-10 flex items-center justify-center gap-4"
      aria-hidden="true"
    >
      <div className="h-[1px] w-16 bg-[#C5A880]/70" />
      <div className="h-3 w-3 rotate-45 border border-[#C5A880]/70" />
      <div className="h-[1px] w-16 bg-[#C5A880]/70" />
    </div>
  )
}

export function EventSection({ data = weddingData }: { data?: WeddingData }) {
  const { events } = data

  return (
    <section
      id="event"
      className="ornamental-section relative overflow-hidden bg-[#3E2723] px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Acara pernikahan"
    >
      <div className="javanese-section-frame" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(197,168,128,0.16),transparent_25rem),radial-gradient(circle_at_12%_72%,rgba(111,71,47,0.24),transparent_22rem),linear-gradient(180deg,rgba(62,39,35,0.96),rgba(47,29,25,0.94)_48%,rgba(31,18,12,0.98))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,236,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,248,236,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>
      <JavaSideOrnament
        side="right"
        className="-right-28 top-20 w-40 opacity-25 sm:-right-16 sm:top-24 sm:w-56 md:w-64"
      />
      <div className="relative z-10 mx-auto max-w-4xl [&_.soft-badge]:border-[#C5A880]/52 [&_.soft-badge]:bg-[#F6EFE2]/92 [&_.soft-badge]:font-semibold [&_.soft-badge]:text-[#6F4A2E] [&_.soft-badge]:shadow-[0_10px_26px_-18px_rgba(0,0,0,0.85)] [&_h2]:text-[#F5E6D3] [&_h2]:drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
        <SectionHeading subtitle="Save The Date" title="Rangkaian Acara" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.18 }}
          className="mt-14 grid gap-0"
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
              <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
                <span className="mb-4 flex size-11 items-center justify-center text-[#C5A880]">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-[1.85rem] font-semibold leading-tight text-[#F5E6D3] sm:text-3xl">
                  {event.title}
                </h3>

                <ul className="mt-7 w-full space-y-4 text-[#F5E6D3]">
                  <li className="flex items-center justify-center gap-2 text-sm leading-relaxed sm:text-base">
                    <CalendarDays
                      className="size-4 shrink-0 text-[#C5A880]"
                      aria-hidden="true"
                    />
                    <span className="uppercase tracking-[0.18em] text-[#C5A880]">{event.date}</span>
                  </li>
                  <li className="flex items-center justify-center gap-2 text-sm leading-relaxed sm:text-base">
                    <Clock className="size-4 shrink-0 text-[#C5A880]" aria-hidden="true" />
                    <span>{event.time}</span>
                  </li>
                  <li className="mx-auto max-w-xl">
                    <span className="flex items-center justify-center gap-2 font-medium leading-relaxed text-[#F5E6D3]">
                      <MapPin className="size-4 shrink-0 text-[#C5A880]" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[#E8D2B8]">
                      {event.address}
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#C5A880] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#C5A880] transition-colors hover:bg-[#C5A880]/10 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/40 sm:w-auto"
                  >
                    <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                    Simpan Tanggal
                  </button>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!event.mapsUrl}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#C5A880] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#C5A880] transition-colors hover:bg-[#C5A880]/10 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/40 sm:w-auto"
                    onClick={(eventClick) => {
                      if (!event.mapsUrl) eventClick.preventDefault()
                    }}
                  >
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {event.mapsUrl ? 'Lihat Lokasi' : 'Lokasi Menyusul'}
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
