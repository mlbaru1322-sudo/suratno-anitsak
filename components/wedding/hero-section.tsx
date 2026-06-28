'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { ReferenceVideoOpeningScene } from './reference-video-opening-scene'
import { REFERENCE_VIDEO_OPENING_TIMELINE } from './reference-video-opening-timeline'
import { VintageJawaPhotoFrame } from './vintage-jawa-final-scene'

const vintageBase = '/ornaments/vintage-jawa-final'
const revealEase = [0.22, 1, 0.36, 1] as const

const HERO_TIMELINE = {
  card: { duration: 1.5, delay: 0.5 },
  label: { duration: 1.5, delay: 0.5 },
} as const

function AmbientTrees({ active = false }: { active?: boolean }) {
  const flowers = [
    { num: 1, scale: 1.1, rot: 5, left: '-5%', mb: '-2%', z: 26 },
    { num: 2, scale: 0.95, rot: -5, left: '15%', mb: '-4%', z: 27 },
    { num: 5, scale: 1, rot: 8, left: '30%', mb: '-1%', z: 26 },
    { num: 2, scale: 0.95, rot: 5, left: '40%', mb: '-3%', z: 28 },
    { num: 4, scale: 1.15, rot: -8, left: '58%', mb: '0%', z: 26 },
    { num: 6, scale: 0.9, rot: 12, left: '75%', mb: '-4%', z: 27 },
    { num: 7, scale: 1.25, rot: -15, left: '90%', mb: '-2%', z: 26 },
  ]

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {/* POHON KIRI (Rama Side) */}
      <img
        src="/ornaments/pohon/pohon_06_palem_rimbun.png"
        className="absolute bottom-[-1%] left-[-8%] z-30 h-auto w-[58%] max-w-[260px] object-contain pointer-events-none sm:left-[-4%] sm:w-[36vw] sm:max-w-[340px]"
        alt="pohon kiri"
      />

      {/* POHON KANAN (Sinta Side) */}
      <img
        src="/ornaments/pohon/pohon_07_palem_ukiran_multi_batang.png"
        className="absolute bottom-[-1%] right-[-8%] z-30 h-auto w-[54%] max-w-[240px] object-contain pointer-events-none sm:right-[-4%] sm:w-[34vw] sm:max-w-[320px]"
        alt="pohon kanan"
      />

      {/* Semak Bunga Bawah */}
      <div className="absolute bottom-0 left-0 z-[32] h-[15vh] w-full">
        {flowers.map((flower, i) => (
          <motion.div
            key={i}
            className="absolute origin-bottom"
            style={{ 
              left: flower.left, 
              bottom: flower.mb, 
              zIndex: flower.z
            }}
            initial={{ rotate: flower.rot, scale: flower.scale, opacity: 0, y: 40 }}
            animate={active ? { rotate: [flower.rot, flower.rot + 4, flower.rot], opacity: 1, y: 0 } : { rotate: flower.rot, opacity: 0, y: 40 }}
            transition={{ 
              rotate: { duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              opacity: { duration: 1.5, ease: 'easeOut', delay: active ? 5.0 + (i * 0.05) : 0 },
              y: { duration: 1.5, ease: 'easeOut', delay: active ? 5.0 + (i * 0.05) : 0 }
            }}
          >
            <img 
              src={`/ornaments/bunga/bunga_${flower.num.toString().padStart(2, '0')}.png`} 
              alt="" 
              className="h-[18vh] sm:h-[22vh] w-auto opacity-90 sepia-[.15] drop-shadow-md" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FallingLeaves() {
  const leaves = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      // Gunakan Math.random untuk variasi natural karena sudah dibungkus useMemo
      const num = Math.floor(Math.random() * 48) + 1; // Valid bunga_01.png to bunga_48.png
      const isSmall = Math.random() > 0.6;
      const isLarge = Math.random() > 0.8;
      const startX = Math.random() * 100;
      const duration = Math.random() * 10 + 12; // 12s - 22s
      const delay = Math.random() * 10;
      const swayRange = isLarge ? 80 : 40;
      const swayDirection = Math.random() > 0.5 ? 1 : -1;
      
      return { id: i, num, isSmall, isLarge, startX, duration, delay, swayRange, swayDirection };
    });
  }, []); // KUNCI UTAMA: dependency kosong menghentikan infinite re-render loop

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <motion.img
          key={leaf.id}
          src={`/ornaments/bunga/bunga_${leaf.num.toString().padStart(2, '0')}.png`}
          alt=""
          className={`absolute object-contain opacity-60 drop-shadow-sm ${
            leaf.isSmall ? 'w-3 h-3 sm:w-4 sm:h-4 blur-[1px] opacity-40' : 
            leaf.isLarge ? 'w-6 h-6 sm:w-8 sm:h-8 opacity-75' : 
            'w-4 h-4 sm:w-6 sm:h-6'
          }`}
          style={{ left: `${leaf.startX}%`, top: '-10%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [
              0, 
              leaf.swayRange * leaf.swayDirection, 
              -leaf.swayRange * leaf.swayDirection * 0.8, 
              leaf.swayRange * leaf.swayDirection * 0.5,
              0
            ],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            y: { duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: leaf.duration * 0.8, delay: leaf.delay, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection({
  data = weddingData,
  active = false,
}: {
  data?: WeddingData
  active?: boolean
}) {
  const { bride, groom, portraitPhoto } = data
  const reduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const t = (duration: number, delay: number) =>
    reduceMotion
      ? { duration: 0.35, delay: 0, ease: revealEase }
      : { duration, delay, ease: revealEase }

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-transparent px-5 py-16 sm:px-6 sm:py-24"
      aria-label="Mempelai"
    >
      <div className="reference-video-hero-stage pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <ReferenceVideoOpeningScene active={active} showBackground={false} className="h-full w-full" />
      </div>

      <AmbientTrees active={active} />
      {isMounted && active && <FallingLeaves />}

      <div className="relative z-40 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <motion.div
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: HERO_TIMELINE.label.duration, delay: HERO_TIMELINE.label.delay }}
          className="flex flex-col items-center"
        >
          <p 
            className="text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8] sm:text-xs"
            style={{ textShadow: '0 1px 4px rgba(42,25,14,0.45)' }}
          >
            We Are Getting Married
          </p>
          {/* <Image
            src={`${vintageBase}/dividers/divider-batik-line.svg`}
            alt=""
            width={360}
            height={48}
            className="mt-3 w-32 opacity-55 brightness-110 sm:w-36"
          /> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 2.0, ease: "easeOut", delay: active ? 7.0 : 0 }}
          className="mt-8 flex w-[90%] max-w-[400px] flex-col items-center"
        >
          <motion.div
            animate={active ? { y: [0, -10, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
            className="relative flex w-full flex-col items-center overflow-hidden rounded-t-[1000px] rounded-b-3xl bg-[#E5D3B3]/80 backdrop-blur-md pt-10 px-6 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#5c4033]/30"
          >
            {/* Soft inner glow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(252,250,242,0.5)] pointer-events-none" />
            
            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Arch Photo Frame */}
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-t-[1000px] rounded-b-xl border-[3px] border-[#cbb387] shadow-[0_10px_20px_rgba(60,40,30,0.2)] bg-[#d8c3a5]">
                <Image
                  src={portraitPhoto}
                  alt={`Foto ${bride.shortName} dan ${groom.shortName}`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 76vw, 312px"
                />
                {/* Subtle vintage overlay */}
                <div className="absolute inset-0 bg-[#5c4033]/5 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(92,64,51,0.3)] rounded-t-[1000px] rounded-b-xl pointer-events-none" />
              </div>

              {/* Typography */}
              <div className="mt-8 flex flex-col items-center">
                <p className="mb-2 font-serif text-[0.65rem] uppercase tracking-[0.35em] text-[#A67C00] font-medium">
                  The Wedding Of
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#4E342E] tracking-wide drop-shadow-sm">
                  {groom.shortName} & {bride.shortName}
                </h2>
                <p className="mt-5 font-serif text-[0.8rem] tracking-[0.25em] text-[#A67C00]">
                  11 . 06 . 2027
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
