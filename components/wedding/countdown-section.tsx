'use client'

import { Fragment, useEffect, useState } from 'react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'
import { JavaOrnamentDivider } from './ornaments'

const batikBackground = '/ornaments/batik/background-batik.webp'

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
      className="ornamental-section relative overflow-hidden bg-[#6f472f] px-5 py-20 sm:px-6 sm:py-24"
      style={{
        backgroundImage: `url('${batikBackground}')`,
        backgroundPosition: 'center top',
        backgroundRepeat: 'repeat',
        backgroundSize: '520px auto',
      }}
      aria-label="Hitung mundur"
    >
      <div className="javanese-section-frame" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.16),transparent_24rem),linear-gradient(180deg,rgba(245,241,231,0.08),rgba(70,42,28,0.08)_46%,rgba(43,26,18,0.14))]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(35,20,13,0.14),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,rgba(35,20,13,0.16),transparent)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <JavaOrnamentDivider className="mb-6 py-0 [&_img]:!w-[min(50vw,10rem)] [&_img]:!opacity-70 sm:mb-7 sm:[&_img]:!w-[12rem]" />
        <div className="mx-auto max-w-2xl rounded-b-[1.35rem] rounded-t-[2.35rem] border border-gold/36 bg-[#fff3d8]/78 px-5 py-7 text-center shadow-[0_20px_54px_-38px_rgba(24,13,8,0.8),inset_0_1px_0_rgba(255,255,255,0.52)] backdrop-blur-[1px] sm:px-8 sm:py-8 [&_.soft-badge]:border [&_.soft-badge]:border-gold/36 [&_.soft-badge]:bg-[#6f472f]/12 [&_.soft-badge]:text-[#7a5529]">
          <SectionHeading subtitle="Menuju Hari Bahagia" title="Hitung Mundur" />

          <Reveal delay={0.1} className="mx-auto mt-5 max-w-lg text-center">
            <p className="text-sm leading-relaxed text-[#4b2d1f] sm:text-[0.95rem]">
              Dengan memohon rahmat Allah SWT, kami menantikan hari bahagia yang
              insya Allah akan menjadi awal perjalanan baru kami.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-b-[1.75rem] rounded-t-[3.25rem] border border-gold/36 bg-ivory/84 px-5 py-8 shadow-[0_24px_64px_-42px_rgba(24,13,8,0.82),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-[1px] sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.62),transparent_18rem),linear-gradient(135deg,rgba(216,187,133,0.14),transparent_42%,rgba(90,59,46,0.08))]" />
            <div
              className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.035]"
              style={{ backgroundImage: `url('${batikBackground}')`, backgroundSize: '420px auto' }}
            />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
            <span
              className="pointer-events-none absolute bottom-7 left-3 top-9 hidden w-5 border-y border-l border-gold/28 sm:block"
              aria-hidden="true"
            >
              <span className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border border-gold/45 bg-ivory" />
              <span className="absolute left-2 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
            </span>
            <span
              className="pointer-events-none absolute bottom-7 right-3 top-9 hidden w-5 border-y border-r border-gold/28 sm:block"
              aria-hidden="true"
            >
              <span className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border border-gold/45 bg-ivory" />
              <span className="absolute right-2 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
            </span>

            <div className="relative grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center">
              {units.map((unit, index) => (
                <Fragment key={unit.label}>
                  <div
                    className="flex min-w-0 flex-col items-center justify-center px-1 text-center"
                  >
                    <span className="font-serif text-[2.2rem] font-semibold leading-none tabular-nums text-espresso sm:text-5xl md:text-[3.6rem]">
                      {mounted ? String(unit.value).padStart(2, '0') : '--'}
                    </span>
                    <span className="mt-3 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-taupe sm:text-[0.68rem] sm:tracking-[0.24em]">
                      {unit.label}
                    </span>
                  </div>
                  {index < units.length - 1 ? (
                    <span
                      className="mx-1 h-14 w-px bg-gradient-to-b from-transparent via-gold/42 to-transparent sm:mx-4 sm:h-20"
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
            className="mx-auto w-fit rounded-lg border border-gold/28 bg-ivory/78 px-4 py-2 text-sm text-taupe shadow-[0_12px_30px_-26px_rgba(43,26,18,0.7)] sm:text-base"
          >
            {data.weddingDateDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
