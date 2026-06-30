'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

export function LoveStorySection() {
  const { loveStory } = weddingData

  return (
    <section
      className="ornamental-section relative overflow-hidden bg-[#5a3b2e] px-5 py-20 sm:px-6 sm:py-24"
      style={{
        backgroundImage: "url('/images/optimized/love-story-bg.webp')",
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 92%',
      }}
      aria-label="Kisah cinta"
    >
      <div className="javanese-section-frame" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,35,23,0.18)_0%,rgba(88,54,36,0.20)_48%,rgba(61,35,23,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(216,187,133,0.10),transparent_28rem),radial-gradient(circle_at_50%_62%,rgba(44,25,16,0.16),transparent_34rem)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl [&_.soft-badge]:border [&_.soft-badge]:border-gold/30 [&_.soft-badge]:bg-ivory/82 [&_h2]:text-ivory [&_h2]:drop-shadow-[0_2px_12px_rgba(35,20,13,0.75)]">
        <SectionHeading subtitle="Our Journey" title="Cerita Cinta" />

        <ol className="relative mt-14 grid gap-7 md:gap-10">
          <span
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent md:left-1/2"
            aria-hidden="true"
          />
          {loveStory.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                index % 2 === 0
                  ? 'relative md:grid md:grid-cols-[1fr_3rem_1fr]'
                  : 'relative md:grid md:grid-cols-[1fr_3rem_1fr]'
              }
            >
              <span className="absolute left-0 top-7 z-10 flex size-8 items-center justify-center rounded-full border border-gold/45 bg-ivory shadow-[0_10px_28px_-22px_rgba(43,26,18,0.75)] md:left-1/2 md:-translate-x-1/2">
                <span className="size-2.5 rounded-full bg-gold/80" />
              </span>
              <div
                className={
                  index % 2 === 0
                    ? 'relative ml-12 overflow-hidden rounded-b-[1.4rem] rounded-t-[2.5rem] border border-gold/42 bg-[#fff7e8]/78 px-5 py-6 shadow-[0_20px_52px_-34px_rgba(43,26,18,0.88),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-[1px] md:col-start-1 md:ml-0 md:px-6'
                    : 'relative ml-12 overflow-hidden rounded-b-[1.4rem] rounded-t-[2.5rem] border border-gold/42 bg-[#fff7e8]/78 px-5 py-6 shadow-[0_20px_52px_-34px_rgba(43,26,18,0.88),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-[1px] md:col-start-3 md:ml-0 md:px-6'
                }
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.50),transparent_14rem),linear-gradient(135deg,rgba(216,187,133,0.10),transparent_45%,rgba(90,59,46,0.07))]" />
                <div className="pointer-events-none absolute inset-2 rounded-b-[1rem] rounded-t-[2.05rem] border border-batik-brown/14" />
                <span
                  className="pointer-events-none absolute right-4 top-4 h-12 w-6 bg-batik-brown/8 [clip-path:polygon(50%_0,88%_22%,70%_100%,50%_80%,30%_100%,12%_22%)]"
                  aria-hidden="true"
                />

                <div className="relative">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-gold">
                    {item.date}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-espresso sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <span
                    className="my-4 block h-px w-full bg-gradient-to-r from-gold/45 via-batik-brown/16 to-transparent"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-taupe text-pretty">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
