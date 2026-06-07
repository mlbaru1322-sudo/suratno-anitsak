'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { CornerOrnament, FloralAccent, OrnamentDivider } from './ornaments'

export function HeroSection({ data = weddingData }: { data?: WeddingData }) {
  const { bride, groom, portraitPhoto, weddingDateDisplay } = data

  return (
    <section
      id="hero"
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-28"
      aria-label="Mempelai"
    >
      <FloralAccent className="animate-float-slow pointer-events-none absolute -left-6 top-10 w-28 opacity-50 sm:w-40" />
      <FloralAccent className="animate-float-slower pointer-events-none absolute -right-6 bottom-10 w-28 rotate-180 opacity-50 sm:w-40" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.35em] text-gold sm:text-sm"
        >
            We Are Getting Married
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="ornate-card mt-8 w-full max-w-sm rounded-[2rem] p-3 sm:max-w-md"
        >
          <CornerOrnament className="absolute left-4 top-4 z-10 w-16 opacity-70" />
          <CornerOrnament className="absolute bottom-4 right-4 z-10 w-16 rotate-180 opacity-70" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={portraitPhoto}
              alt={`Foto ${bride.shortName} dan ${groom.shortName}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 90vw, 448px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-9 font-serif text-4xl font-semibold leading-tight text-espresso text-balance sm:text-5xl md:text-6xl"
        >
          {bride.name}
          <span className="my-2 block text-3xl text-gold sm:text-4xl">&</span>
          {groom.name}
        </motion.h1>

        <OrnamentDivider className="mt-8" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-base leading-relaxed text-taupe sm:text-lg"
        >
          {weddingDateDisplay}
        </motion.p>
      </div>
    </section>
  )
}
