'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { FloralMark } from './ornaments'

type Person = {
  name: string
  shortName: string
  photo: string
  parents: string
}

function CoupleProfile({
  person,
  imagePriority = false,
}: {
  person: Person
  imagePriority?: boolean
}) {
  return (
    <div className="relative text-center font-serif">
      <div className="relative mx-auto h-[258px] w-[188px] rounded-[50%] border border-[#8B5E3C]/32 p-1.5 sm:h-[296px] sm:w-[216px]">
        <div className="relative h-full w-full overflow-hidden rounded-[50%] border-[1.5px] border-[#C5A880] bg-[#F6EFE2] p-1 shadow-[0_18px_42px_-34px_rgba(74,53,37,0.78)]">
          <span className="batik-pattern pointer-events-none absolute inset-0 z-10 opacity-[0.07]" />
          <Image
            src={person.photo}
            alt={person.name}
            fill
            priority={imagePriority}
            className="scale-[1.1] rounded-[50%] object-cover object-[center_35%]"
            sizes="(max-width: 640px) 188px, 216px"
          />
        </div>
      </div>
      <p className="mt-5 text-lg font-medium italic leading-none tracking-[0.02em] text-[#8B5E3C] sm:text-xl">
        {person.shortName}
      </p>
      <h3 className="mt-2 text-center text-[1.45rem] font-semibold leading-tight text-[#4A3525] sm:text-[1.8rem]">
        {person.name}
      </h3>
      <FloralMark className="mx-auto mt-3 h-4 w-20 opacity-65" />
      <p className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-[#6E5644]">
        {person.parents}
      </p>
    </div>
  )
}

export function CoupleSection({ data = weddingData }: { data?: WeddingData }) {
  const { bride, groom } = data
  const bridePhoto = weddingData.bride.photo
  const groomPhoto = weddingData.groom.photo

  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-[#3A241A] px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Pasangan mempelai"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,128,0.18),transparent_28rem),linear-gradient(180deg,rgba(58,36,26,0.96),rgba(43,26,18,0.9)_48%,rgba(31,18,12,0.96))]" />
      <div className="batik-pattern pointer-events-none absolute inset-y-0 left-[-18%] w-[46%] opacity-[0.06] sm:left-[-8%] sm:w-[28%]" />
      <div className="batik-pattern pointer-events-none absolute inset-y-0 right-[-18%] w-[46%] opacity-[0.06] sm:right-[-8%] sm:w-[28%]" />
      <div className="pointer-events-none absolute left-5 top-28 h-36 w-px bg-gradient-to-b from-transparent via-[#C5A880]/35 to-transparent sm:left-12" />
      <div className="pointer-events-none absolute right-5 bottom-28 h-36 w-px bg-gradient-to-b from-transparent via-[#C5A880]/35 to-transparent sm:right-12" />

      <div className="relative z-10 mx-auto max-w-5xl [&_.soft-badge]:border-[#C5A880]/34 [&_.soft-badge]:bg-ivory/10 [&_.soft-badge]:text-[#C5A880] [&_h2]:text-[#F5E6D3] [&_h2]:drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
        <SectionHeading subtitle="Bismillahirrahmanirrahim" title="Mempelai" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-[360px] overflow-hidden rounded-[2.4rem] border border-[#8B5E3C]/45 bg-[#F6EFE2] px-5 py-8 font-serif text-[#4A3525] shadow-[0_30px_78px_-58px_rgba(0,0,0,0.9),0_0_0_1px_rgba(197,168,128,0.12),inset_0_1px_0_rgba(255,255,255,0.58)] sm:max-w-md sm:px-8 sm:py-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,128,0.16),transparent_18rem),linear-gradient(135deg,rgba(255,248,236,0.42),transparent_42%,rgba(139,94,60,0.08))]" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(74,53,37,0.035)_0,rgba(74,53,37,0.035)_1px,transparent_1px,transparent_14px)] opacity-45" />
          <div className="pointer-events-none absolute inset-3 rounded-[1.95rem] border border-[#C5A880]/30" />
          <div className="pointer-events-none absolute inset-5 rounded-[1.55rem] border border-[#8B5E3C]/10" />

          <div className="relative">
            <CoupleProfile
              person={{ ...bride, photo: bridePhoto }}
              imagePriority
            />

            <div
              className="mx-auto my-5 flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-[#C5A880]/55" />
              <span className="h-2 w-2 rotate-45 border border-[#C5A880]/70" />
              <span className="h-px w-12 bg-[#C5A880]/55" />
            </div>

            <div
              className="mx-auto my-6 flex items-center justify-center gap-4"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/45 to-[#C5A880]/22" />
              <span className="text-4xl font-medium leading-none text-[#8B5E3C]/82 sm:text-5xl">
                &
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A880]/45 to-[#C5A880]/22" />
            </div>

            <CoupleProfile person={{ ...groom, photo: groomPhoto }} />

            <div
              className="mx-auto mt-5 flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-[#C5A880]/55" />
              <span className="h-2 w-2 rotate-45 border border-[#C5A880]/70" />
              <span className="h-px w-12 bg-[#C5A880]/55" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
