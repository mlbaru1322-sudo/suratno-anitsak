'use client'

import { motion } from 'framer-motion'
import { AtSign } from 'lucide-react'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { staggerContainer, fadeUp } from './motion-helpers'
import { FloralMark, GununganMark } from './ornaments'

type Person = {
  name: string
  photo: string
  parents: string
  instagram: string
}

function CoupleCard({ person }: { person: Person }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex min-w-0 flex-col items-center px-2 text-center"
    >
      <div className="relative mb-6">
        <span className="pointer-events-none absolute -inset-2 rounded-[50%] border border-[#C5A880]/25" />
        <div className="relative mx-auto h-[260px] w-[190px] overflow-hidden rounded-[50%] border-[2px] border-[#C5A880] sm:h-[300px] sm:w-[220px]">
          <span className="batik-pattern pointer-events-none absolute inset-0 z-10 opacity-[0.08]" />
          <Image
            src={person.photo}
            alt={person.name}
            fill
            className="scale-[1.1] object-cover object-[center_35%]"
            sizes="(max-width: 640px) 190px, 220px"
          />
        </div>
      </div>
      <FloralMark className="mb-3 h-5 w-20 opacity-80" />
      <h3 className="mt-1 text-center font-serif text-[1.65rem] font-semibold leading-tight text-[#4A3525] sm:text-3xl">
        {person.name}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-taupe">
        {person.parents}
      </p>
      <a
        href={`https://instagram.com/${person.instagram.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-espresso"
      >
        <AtSign className="size-4" aria-hidden="true" />
        {person.instagram}
      </a>
    </motion.div>
  )
}

export function CoupleSection({ data = weddingData }: { data?: WeddingData }) {
  const { bride, groom } = data
  const bridePhoto = weddingData.bride.photo
  const groomPhoto = weddingData.groom.photo

  return (
    <section
      id="couple"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Pasangan mempelai"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,241,231,0.18),rgba(255,248,236,0.08)_45%,rgba(245,241,231,0.16))]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading subtitle="Bismillahirrahmanirrahim" title="Mempelai" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid items-start gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8"
        >
          <CoupleCard person={{ ...bride, photo: bridePhoto }} />
          <motion.div
            variants={fadeUp}
            className="mx-auto flex items-center justify-center pt-1 font-serif text-4xl text-gold/80 md:pt-24 md:text-5xl"
            aria-hidden="true"
          >
            <GununganMark className="mb-[-0.35rem] h-7 w-7 opacity-70" />
            &
          </motion.div>
          <CoupleCard person={{ ...groom, photo: groomPhoto }} />
        </motion.div>
      </div>
    </section>
  )
}
