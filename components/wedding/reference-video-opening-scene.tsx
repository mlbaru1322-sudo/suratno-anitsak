'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { REFERENCE_VIDEO_OPENING_TIMELINE } from './reference-video-opening-timeline'

const base = '/reference-video-opening'
const ease = [0.22, 1, 0.36, 1] as const

/**
 * Komponen referensi visual untuk style video contoh.
 * Bukan pengganti langsung HeroSection project, tapi file pendukung
 * supaya implementer/Grok bisa memindahkan layer dan timing dengan lebih mudah.
 */
export function ReferenceVideoOpeningScene({
  active = false,
  className = '',
  showCurtain: _showCurtain = false,
  coverMode = false,
  showBackground = true,
}: {
  active?: boolean
  className?: string
  showCurtain?: boolean
  coverMode?: boolean
  showBackground?: boolean
}) {
  const reduceMotion = useReducedMotion()

  const t = (duration: number, delay: number) =>
    reduceMotion ? { duration: 0.35, delay: 0, ease } : { duration, delay, ease }

  const idleT = (duration: number, delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: 'easeInOut' as const, repeat: Infinity }

  return (
    <div className={`relative isolate overflow-hidden ${showBackground ? 'bg-[#2b1a12]' : 'bg-transparent'} ${className}`}>
      {/* Background gunung bisa dimatikan saat scene dipakai di atas persistent page background. */}
      {showBackground ? (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={
            active || coverMode
              ? { x: reduceMotion ? 0 : [-2, 2, -2], y: reduceMotion ? 0 : [0, -4, 0], scale: reduceMotion ? 1.08 : [1.08, 1.095, 1.08] }
              : { x: 0, y: 0, scale: 1.08 }
          }
          transition={idleT(28, coverMode ? 0 : REFERENCE_VIDEO_OPENING_TIMELINE.landscapeLive.start)}
        >
          <Image
            src={`${base}/images/landscape-background.jpg`}
            alt=""
            fill
            priority
            className="object-cover object-center contrast-[1.08] brightness-[1.04] saturate-[1.08]"
            sizes="100vw"
          />
        </motion.div>
      ) : null}

      {/* overlay tone vintage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,236,0.04),rgba(43,26,18,0.08)_44%,rgba(18,10,6,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,6,0.12)_0%,rgba(18,10,6,0.03)_32%,rgba(18,10,6,0.08)_70%,rgba(18,10,6,0.3)_100%)]" />



      {/* sparkle/particle hint */}
      <motion.div
        initial={false}
        animate={active || coverMode ? { opacity: coverMode ? 0.1 : 0.18 } : { opacity: 0 }}
        transition={t(1, REFERENCE_VIDEO_OPENING_TIMELINE.landscapeLive.start + 0.35)}
        className="absolute inset-0 z-10"
      >
        {/* SVG dihapus sesuai instruksi minimal */}
      </motion.div>

    </div>
  )
}
