'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { ReferenceVideoOpeningScene } from './reference-video-opening-scene'
import { REFERENCE_VIDEO_OPENING_TIMELINE } from './reference-video-opening-timeline'

const revealEase = [0.22, 1, 0.36, 1] as const

const HERO_TIMELINE = {
  ornamentStartDelay: 0.2,
  treeStagger: 0.4,
  treeRevealDuration: 1.5,
  flowerStartDelay: 1.1,
  flowerStagger: 0.05,
  flowerRevealDuration: 1.5,
  fallingLeavesStartDelay: 1.5,
  cardRevealDelay: 4.9,
  cardRevealDuration: 2.0,
  cardFloatDelay: 5.8,
  label: { duration: 1.4, delay: 4.75 },
} as const

const FLOWER_ASSET_BASE = '/ornaments/bunga/optimized'

function AmbientTrees({ active = false }: { active?: boolean }) {
  const trees = [
    {
      src: '/ornaments/pohon/optimized/pohon_07_palem_ukiran_multi_batang.webp',
      alt: 'pohon palem kanan bawah',
      className:
        'bottom-[-2%] right-[-25%] w-[48%] max-w-[220px] sm:right-[-11%] sm:w-[26vw] sm:max-w-[300px]',
      delay: HERO_TIMELINE.ornamentStartDelay,
      initialRotate: -10,
      swayRotate: 1.4,
      swayX: 2,
      duration: 4.6,
    },
    {
      src: '/ornaments/pohon/optimized/pohon_02_dua_pohon_kelapa.webp',
      alt: 'dua pohon kelapa kiri bawah',
      className:
        'bottom-[-4%] left-[-30%] w-[54%] max-w-[240px] sm:left-[-12%] sm:w-[28vw] sm:max-w-[320px]',
      delay: HERO_TIMELINE.ornamentStartDelay + HERO_TIMELINE.treeStagger,
      initialRotate: 10,
      swayRotate: 1.6,
      swayX: -2,
      duration: 4.2,
    },
    {
      src: '/ornaments/pohon/optimized/pohon_03_kelapa_minimal_vintage.webp',
      alt: 'pohon kelapa minimal kiri tengah',
      className:
        'top-[16%] left-[-17%] w-[42%] max-w-[180px] sm:top-[32%] sm:left-[-7%] sm:w-[19vw] sm:max-w-[240px]',
      delay: HERO_TIMELINE.ornamentStartDelay + HERO_TIMELINE.treeStagger * 2,
      initialRotate: 4,
      swayRotate: 1.3,
      swayX: 2,
      duration: 5,
    },
    {
      src: '/ornaments/pohon/optimized/pohon_09_kelapa_lengkung_vintage.webp',
      alt: 'pohon kelapa lengkung kanan atas',
      className:
        'top-[20%] right-[-20%] w-[40%] max-w-[170px] sm:top-[14%] sm:right-[-8%] sm:w-[17vw] sm:max-w-[220px]',
      delay: HERO_TIMELINE.ornamentStartDelay + HERO_TIMELINE.treeStagger * 3,
      initialRotate: -7,
      swayRotate: 1.2,
      swayX: -2,
      duration: 4.8,
    },
  ]

  const flowers = [
    { num: 1, scale: 1.1, rot: 5, left: '-5%', mb: '-2%', z: 26 },
    { num: 6, scale: 0.78, rot: 10, left: '5%', mb: '-6%', z: 25 },
    { num: 2, scale: 0.95, rot: -5, left: '15%', mb: '-4%', z: 27 },
    { num: 4, scale: 0.82, rot: -10, left: '24%', mb: '-5%', z: 25 },
    { num: 5, scale: 1, rot: 8, left: '30%', mb: '-1%', z: 26 },
    { num: 2, scale: 0.95, rot: 5, left: '40%', mb: '-3%', z: 28 },
    { num: 4, scale: 1.15, rot: -8, left: '58%', mb: '0%', z: 26 },
    { num: 1, scale: 0.8, rot: 7, left: '68%', mb: '-5%', z: 25 },
    { num: 6, scale: 0.9, rot: 12, left: '75%', mb: '-4%', z: 27 },
    { num: 2, scale: 0.84, rot: -9, left: '84%', mb: '-6%', z: 25 },
    { num: 7, scale: 1.25, rot: -15, left: '90%', mb: '-2%', z: 26 },
  ]

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {trees.map((tree) => (
        <motion.div
          key={tree.src}
          className={`absolute z-30 origin-bottom pointer-events-none will-change-transform ${tree.className}`}
          initial={{ opacity: 0, y: 0, scale: 0.98, rotate: tree.initialRotate }}
          animate={
            active
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: [
                    tree.initialRotate,
                    tree.initialRotate + tree.swayRotate,
                    tree.initialRotate - tree.swayRotate,
                    tree.initialRotate,
                  ],
                  x: [0, tree.swayX, -tree.swayX, 0],
                }
              : { opacity: 0, y: 0, scale: 0.98, rotate: tree.initialRotate, x: 0 }
          }
          transition={{
            opacity: { duration: HERO_TIMELINE.treeRevealDuration, ease: 'easeOut', delay: active ? tree.delay : 0 },
            y: { duration: HERO_TIMELINE.treeRevealDuration, ease: 'easeOut', delay: active ? tree.delay : 0 },
            scale: { duration: HERO_TIMELINE.treeRevealDuration, ease: 'easeOut', delay: active ? tree.delay : 0 },
            rotate: {
              duration: tree.duration,
              repeat: active ? Infinity : 0,
              ease: 'easeInOut',
              delay: active ? tree.delay + HERO_TIMELINE.treeRevealDuration : 0,
            },
            x: {
              duration: tree.duration,
              repeat: active ? Infinity : 0,
              ease: 'easeInOut',
              delay: active ? tree.delay + HERO_TIMELINE.treeRevealDuration : 0,
            },
          }}
        >
          <img
            src={tree.src}
            className="h-auto w-full object-contain drop-shadow-[0_12px_22px_rgba(28,17,11,0.28)]"
            alt={tree.alt}
          />
        </motion.div>
      ))}

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
            initial={{ rotate: flower.rot, scale: flower.scale * 0.98, opacity: 0, y: 0 }}
            animate={
              active
                ? { rotate: [flower.rot, flower.rot + 4, flower.rot], scale: flower.scale, opacity: 1, y: 0 }
                : { rotate: flower.rot, scale: flower.scale * 0.98, opacity: 0, y: 0 }
            }
            transition={{ 
              rotate: { duration: 5 + (i % 3), repeat: active ? Infinity : 0, ease: 'easeInOut', delay: i * 0.4 },
              opacity: {
                duration: HERO_TIMELINE.flowerRevealDuration,
                ease: 'easeOut',
                delay: active ? HERO_TIMELINE.flowerStartDelay + (i * HERO_TIMELINE.flowerStagger) : 0,
              },
              scale: {
                duration: HERO_TIMELINE.flowerRevealDuration,
                ease: 'easeOut',
                delay: active ? HERO_TIMELINE.flowerStartDelay + (i * HERO_TIMELINE.flowerStagger) : 0,
              },
            }}
          >
            <img 
              src={`${FLOWER_ASSET_BASE}/bunga_${flower.num.toString().padStart(2, '0')}.webp`} 
              alt="" 
              className="h-[18vh] sm:h-[22vh] w-auto opacity-90 sepia-[.15] drop-shadow-md" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FallingLeaves({
  compact = false,
  startDelay = 0,
}: {
  compact?: boolean
  startDelay?: number
}) {
  const leaves = useMemo(() => {
    const leafCount = compact ? 6 : 14

    return Array.from({ length: leafCount }).map((_, i) => {
      // Gunakan Math.random untuk variasi natural karena sudah dibungkus useMemo
      const num = Math.floor(Math.random() * 48) + 1; // Valid bunga_01.png to bunga_48.png
      const isSmall = Math.random() > 0.6;
      const isLarge = Math.random() > 0.8;
      const startX = Math.random() * 100;
      const duration = compact ? Math.random() * 8 + 18 : Math.random() * 10 + 12;
      const delay = startDelay + (compact ? Math.random() * 8 : Math.random() * 10);
      const swayRange = compact ? (isLarge ? 34 : 22) : (isLarge ? 80 : 40);
      const swayDirection = Math.random() > 0.5 ? 1 : -1;
      
      return { id: i, num, isSmall, isLarge, startX, duration, delay, swayRange, swayDirection };
    });
  }, [compact, startDelay]); // KUNCI UTAMA: hanya berubah saat mode viewport berubah

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <motion.img
          key={leaf.id}
          src={`${FLOWER_ASSET_BASE}/bunga_${leaf.num.toString().padStart(2, '0')}.webp`}
          alt=""
          className={`absolute object-contain opacity-60 drop-shadow-sm ${
            leaf.isSmall ? 'w-3 h-3 sm:w-4 sm:h-4 opacity-40' : 
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
  const { bride, groom, portraitPhoto, weddingDateISO } = data
  const reduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  const [isCompactViewport, setIsCompactViewport] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const heroInView = useInView(heroRef, {
    amount: 0.05,
    margin: '240px 0px 240px 0px',
  })
  const heroMotionActive = active && (!isMounted || heroInView)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const updateViewport = () => setIsCompactViewport(media.matches)

    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  const t = (duration: number, delay: number) =>
    reduceMotion
      ? { duration: 0.35, delay: 0, ease: revealEase }
      : { duration, delay, ease: revealEase }

  const heroDate = useMemo(() => {
    const date = new Date(weddingDateISO)

    if (Number.isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    })
      .format(date)
      .replace(/\//g, ' . ')
  }, [weddingDateISO])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-transparent px-5 py-16 sm:px-6 sm:py-24"
      aria-label="Mempelai"
    >
      <div className="reference-video-hero-stage pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <ReferenceVideoOpeningScene active={heroMotionActive} showBackground={false} className="h-full w-full" />
      </div>

      <AmbientTrees active={heroMotionActive} />
      {isMounted && heroMotionActive && (
        <FallingLeaves compact={isCompactViewport} startDelay={HERO_TIMELINE.fallingLeavesStartDelay} />
      )}

      <div className="relative z-40 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <motion.div
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: HERO_TIMELINE.label.duration, delay: active ? HERO_TIMELINE.label.delay : 0 }}
          className="flex flex-col items-center"
        >
          <p 
            className="text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8] sm:text-xs"
            style={{ textShadow: '0 1px 4px rgba(42,25,14,0.45)' }}
          >
            We Are Getting Married
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 0 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 0 }}
          transition={{
            duration: HERO_TIMELINE.cardRevealDuration,
            ease: "easeOut",
            delay: active ? HERO_TIMELINE.cardRevealDelay : 0,
          }}
          className="mt-8 flex w-[90%] max-w-[400px] flex-col items-center"
        >
          <motion.div
            animate={heroMotionActive ? { y: [0, -10, 0] } : { y: 0 }}
            transition={{
              repeat: heroMotionActive ? Infinity : 0,
              duration: 6,
              ease: 'easeInOut',
              delay: HERO_TIMELINE.cardFloatDelay,
            }}
            className="relative flex w-full flex-col items-center overflow-hidden rounded-t-[1000px] rounded-b-3xl bg-[#E5D3B3]/80 backdrop-blur-md pt-10 px-6 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#5c4033]/30 will-change-transform"
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
                {heroDate ? (
                  <p className="mt-5 font-serif text-[0.8rem] tracking-[0.25em] text-[#A67C00]">
                    {heroDate}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
