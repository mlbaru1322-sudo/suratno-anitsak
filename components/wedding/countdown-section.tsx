'use client'

import { Fragment, useEffect, useState } from 'react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function CountdownSection({ data = weddingData }: { data?: WeddingData }) {
  const target = new Date(data.weddingDateISO).getTime()
  const [time, setTime] = useState(() => getTimeLeft(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds },
  ]

  return (
    <section
      className="ornamental-section javanese-warmth relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Hitung mundur"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.36),transparent_28rem),linear-gradient(180deg,rgba(245,241,231,0.12),rgba(216,187,133,0.10)_50%,rgba(245,241,231,0.14))]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading subtitle="Menuju Hari Bahagia" title="Hitung Mundur" />

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-lg text-center">
          <p className="text-sm leading-relaxed text-taupe sm:text-base">
            Dengan memohon rahmat Allah SWT, kami menantikan hari bahagia yang
            insya Allah akan menjadi awal perjalanan baru kami.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-b-[1.75rem] rounded-t-[3rem] border border-gold/30 bg-ivory/64 px-4 py-7 shadow-[0_22px_58px_-44px_rgba(43,26,18,0.72),inset_0_1px_0_rgba(255,255,255,0.54)] sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.50),transparent_18rem),linear-gradient(135deg,rgba(216,187,133,0.10),transparent_45%,rgba(90,59,46,0.07))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

            <div className="relative grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center">
              {units.map((unit, index) => (
                <Fragment key={unit.label}>
                  <div
                    className="flex min-w-0 flex-col items-center justify-center px-1 text-center"
                  >
                    <span className="font-serif text-[2rem] font-semibold leading-none tabular-nums text-espresso sm:text-5xl md:text-6xl">
                      {mounted ? String(unit.value).padStart(2, '0') : '--'}
                    </span>
                    <span className="mt-3 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-taupe sm:text-xs sm:tracking-[0.24em]">
                      {unit.label}
                    </span>
                  </div>
                  {index < units.length - 1 ? (
                    <span
                      className="mx-1 h-14 w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent sm:mx-4 sm:h-20"
                      aria-hidden="true"
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p
            className="mx-auto w-fit rounded-lg border border-gold/25 bg-ivory/52 px-4 py-2 text-sm text-taupe sm:text-base"
          >
            {data.weddingDateDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
