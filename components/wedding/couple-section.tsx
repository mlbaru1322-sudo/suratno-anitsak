'use client'

import { motion } from 'framer-motion'
import { AtSign } from 'lucide-react'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { staggerContainer, fadeUp } from './motion-helpers'
import {
  CornerOrnament,
  CornerCarving,
  FloralMark,
  GununganMark,
  SectionOrnaments,
} from './ornaments'
import { SectionBackdrop } from './section-backdrop'

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
      className="ornate-card flex flex-col items-center rounded-[2rem] px-6 py-10 text-center"
    >
      <CornerOrnament className="absolute left-4 top-4 w-14 opacity-55" />
      <CornerOrnament className="absolute bottom-4 right-4 w-14 rotate-180 opacity-55" />
      <CornerCarving className="right-4 top-4 rotate-90" />
      <div className="soft-badge mb-6 rounded-full p-2">
        <div className="relative h-48 w-40 overflow-hidden rounded-t-full rounded-b-[5rem] border-[6px] border-ivory outline outline-2 outline-gold/45 shadow-luxe sm:h-56 sm:w-48">
          <span className="batik-pattern pointer-events-none absolute inset-0 z-10 opacity-[0.08]" />
          <Image
            src={person.photo || '/placeholder.svg'}
            alt={person.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 160px, 192px"
          />
        </div>
      </div>
      <FloralMark className="mb-3 h-5 w-20 opacity-80" />
      <h3 className="font-serif text-2xl font-semibold text-espresso sm:text-3xl">
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

  return (
    <section
      id="couple"
      className="ornamental-section relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Pasangan mempelai"
    >
      <SectionBackdrop variant="couple" />
      <SectionOrnaments />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading subtitle="Bismillahirrahmanirrahim" title="Mempelai" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8"
        >
          <CoupleCard person={bride} />
          <motion.div
            variants={fadeUp}
            className="soft-badge mx-auto flex size-20 flex-col items-center justify-center rounded-full bg-ivory/85 font-serif text-5xl text-gold shadow-luxe md:size-24 md:text-6xl"
            aria-hidden="true"
          >
            <GununganMark className="mb-[-0.35rem] h-7 w-7 opacity-70" />
            &
          </motion.div>
          <CoupleCard person={groom} />
        </motion.div>
      </div>
    </section>
  )
}
