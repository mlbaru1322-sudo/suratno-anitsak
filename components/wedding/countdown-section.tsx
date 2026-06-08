'use client'

import { useEffect, useState } from 'react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'
import { SectionOrnaments } from './ornaments'

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
      className="ornamental-section javanese-warmth px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Hitung mundur"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-4xl">
        <SectionHeading subtitle="Menuju Hari Bahagia" title="Hitung Mundur" />

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-lg text-center">
          <p className="text-sm leading-relaxed text-taupe sm:text-base">
            Dengan memohon rahmat Allah SWT, kami menantikan hari bahagia yang
            insya Allah akan menjadi awal perjalanan baru kami.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="ornate-card batik-pattern animate-gentle-glow flex min-h-28 flex-col items-center justify-center rounded-2xl px-2 py-6 sm:min-h-36 sm:py-8"
              >
                <span className="font-serif text-3xl font-semibold tabular-nums text-espresso sm:text-5xl">
                  {mounted ? String(unit.value).padStart(2, '0') : '--'}
                </span>
                <span className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-taupe sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-sm text-taupe sm:text-base">
            {data.weddingDateDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
