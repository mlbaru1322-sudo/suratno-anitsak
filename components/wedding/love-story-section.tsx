'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { CornerOrnament, SectionOrnaments } from './ornaments'

export function LoveStorySection() {
  const { loveStory } = weddingData

  return (
    <section
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Kisah cinta"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-4xl">
        <SectionHeading subtitle="Our Journey" title="Cerita Cinta" />

        <ol className="relative mt-14 grid gap-8 md:gap-10">
          <span
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent md:left-1/2 md:block"
            aria-hidden="true"
          />
          {loveStory.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                index % 2 === 0
                  ? 'relative md:grid md:grid-cols-[1fr_3rem_1fr]'
                  : 'relative md:grid md:grid-cols-[1fr_3rem_1fr]'
              }
            >
              <span className="absolute -left-0 top-6 z-10 flex size-8 items-center justify-center rounded-full border border-gold/50 bg-gold/90 text-ivory shadow-luxe md:left-1/2 md:-translate-x-1/2">
                <Heart className="size-3.5" aria-hidden="true" />
              </span>
              <div
                className={
                  index % 2 === 0
                    ? 'ornate-card ml-12 rounded-2xl px-6 py-6 md:ml-0 md:col-start-1'
                    : 'ornate-card ml-12 rounded-2xl px-6 py-6 md:ml-0 md:col-start-3'
                }
              >
                <CornerOrnament className="absolute right-3 top-3 w-12 rotate-90 opacity-40" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold">
                  {item.date}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-espresso">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-taupe">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
