'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getApprovedWishes,
  isSupabaseConfigured,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'

type DisplayWish = {
  id: string | number
  name: string
  message: string
}

const WISHES_PER_PAGE = 4

function GuestBookDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/20" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/50 bg-ivory" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/20" />
    </div>
  )
}

function chunkWishes(wishes: DisplayWish[]) {
  const pages: DisplayWish[][] = []

  for (let index = 0; index < wishes.length; index += WISHES_PER_PAGE) {
    pages.push(wishes.slice(index, index + WISHES_PER_PAGE))
  }

  return pages
}

function mapApprovedWishes(
  approvedWishes: Awaited<ReturnType<typeof getApprovedWishes>>,
): DisplayWish[] {
  return approvedWishes
    .filter((wish) => wish.message?.trim())
    .map((wish) => ({
      id: wish.id,
      name: wish.guest_name,
      message: wish.message?.trim() || '',
    }))
}

export function WishesSection({ enabled = true }: { enabled?: boolean }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [wishes, setWishes] = useState<DisplayWish[]>([])
  const [activePage, setActivePage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [refreshIndex, setRefreshIndex] = useState(0)
  const pages = useMemo(() => chunkWishes(wishes), [wishes])

  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    async function load() {
      setHasError(false)

      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setWishes([])
          setIsLoading(false)
        }
        return
      }

      if (!cancelled) {
        setIsLoading(true)
      }

      try {
        const approved = await getApprovedWishes()
        if (!cancelled) {
          setWishes(mapApprovedWishes(approved))
          setActivePage(0)
          scrollRef.current?.scrollTo({ left: 0 })
        }
      } catch {
        if (!cancelled) {
          setWishes([])
          setHasError(true)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [enabled, refreshIndex])

  useEffect(() => {
    if (!enabled) return

    function handleRefresh() {
      setRefreshIndex((value) => value + 1)
    }

    window.addEventListener('wedding-wish-submitted', handleRefresh)

    return () => {
      window.removeEventListener('wedding-wish-submitted', handleRefresh)
    }
  }, [enabled])

  function handleScroll() {
    const element = scrollRef.current
    if (!element) return

    const pageWidth = element.clientWidth
    if (pageWidth === 0) return

    setActivePage(Math.round(element.scrollLeft / pageWidth))
  }

  function goToPage(pageIndex: number) {
    const element = scrollRef.current
    if (!element) return

    element.scrollTo({
      left: pageIndex * element.clientWidth,
      behavior: 'smooth',
    })
    setActivePage(pageIndex)
  }

  return (
    <section
      className="ornamental-section paper-texture relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Ucapan dan doa tamu"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(216,187,133,0.20),transparent_26rem),radial-gradient(circle_at_88%_86%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.08),rgba(232,223,201,0.16)_52%,rgba(245,241,231,0.10))]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading subtitle="Doa & Harapan" title="Ucapan Tamu" />

        <div className="relative mt-12">
          {isLoading ? (
            <div className="rounded-[10px] border border-gold/28 bg-ivory/68 px-5 py-7 text-center shadow-[0_14px_38px_-34px_rgba(43,26,18,0.62)]">
              <GuestBookDivider />
              <p className="mt-5 text-sm text-taupe" aria-live="polite">
                Memuat ucapan tamu...
              </p>
            </div>
          ) : null}

          {!isLoading && hasError ? (
            <div className="rounded-[10px] border border-gold/28 bg-ivory/68 px-5 py-7 text-center shadow-[0_14px_38px_-34px_rgba(43,26,18,0.62)]">
              <GuestBookDivider />
              <p className="mt-5 text-sm leading-relaxed text-taupe">
                Ucapan belum dapat dimuat. Silakan coba beberapa saat lagi.
              </p>
            </div>
          ) : null}

          {!isLoading && !hasError && wishes.length === 0 ? (
            <div className="rounded-[10px] border border-gold/28 bg-ivory/68 px-5 py-7 text-center shadow-[0_14px_38px_-34px_rgba(43,26,18,0.62)]">
              <GuestBookDivider />
              <p className="mt-5 font-serif text-lg text-espresso">
                Belum ada ucapan.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-taupe">
                Jadilah yang pertama mengirim doa terbaik.
              </p>
            </div>
          ) : null}

          {pages.length > 0 ? (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Halaman ucapan tamu"
              >
                {pages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="grid min-w-full snap-start gap-4 px-1 pr-10 sm:gap-5 sm:px-2 sm:pr-2"
                  >
                    {page.map((wish, wishIndex) => (
                      <motion.figure
                        key={wish.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        viewport={{ once: true, amount: 0.15 }}
                        className={`relative min-w-0 overflow-hidden rounded-[12px] border border-gold/28 bg-ivory/76 px-5 py-5 shadow-[0_16px_38px_-34px_rgba(43,26,18,0.72),inset_0_1px_0_rgba(255,255,255,0.58)] sm:px-6 ${
                          wishIndex % 2 === 1
                            ? 'ml-5 sm:ml-10'
                            : 'mr-5 sm:mr-10'
                        }`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.52),transparent_14rem),linear-gradient(135deg,rgba(216,187,133,0.10),transparent_45%,rgba(90,59,46,0.06))]" />
                        <div className="pointer-events-none absolute inset-2 rounded-[9px] border border-gold/12" />

                        <div className="relative">
                          <p className="text-[0.95rem] leading-[1.72] text-espresso text-pretty sm:text-base">
                            {wish.message}
                          </p>
                          <figcaption className="mt-3 text-right font-serif text-sm font-medium leading-tight text-taupe sm:text-[0.95rem]">
                            <span aria-hidden="true">- </span>
                            {wish.name}
                          </figcaption>
                        </div>
                      </motion.figure>
                    ))}
                  </div>
                ))}
              </div>

              {pages.length > 1 ? (
                <div
                  className="mt-6 flex justify-center gap-2 pr-8 sm:pr-0"
                  aria-label="Navigasi halaman ucapan"
                >
                  {pages.map((_, pageIndex) => (
                    <button
                      key={pageIndex}
                      type="button"
                      onClick={() => goToPage(pageIndex)}
                      aria-label={`Tampilkan halaman ${pageIndex + 1}`}
                      aria-current={activePage === pageIndex ? 'true' : undefined}
                      className={`size-2.5 rounded-full border border-gold/45 transition-colors ${
                        activePage === pageIndex
                          ? 'bg-gold'
                          : 'bg-ivory/70 hover:bg-gold/35'
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
