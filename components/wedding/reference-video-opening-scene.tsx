'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { REFERENCE_VIDEO_OPENING_TIMELINE } from './reference-video-opening-timeline'

const base = '/reference-video-opening'
const vintageBase = '/ornaments/vintage-jawa-final'
const ease = [0.22, 1, 0.36, 1] as const

/**
 * Komponen referensi visual untuk style video contoh.
 * Bukan pengganti langsung HeroSection project, tapi file pendukung
 * supaya implementer/Grok bisa memindahkan layer dan timing dengan lebih mudah.
 */
export function ReferenceVideoOpeningScene({
  active = false,
  className = '',
  showCurtain = true,
  coverMode = false,
}: {
  active?: boolean
  className?: string
  showCurtain?: boolean
  coverMode?: boolean
}) {
  const reduceMotion = useReducedMotion()

  const t = (duration: number, delay: number) =>
    reduceMotion ? { duration: 0.35, delay: 0, ease } : { duration, delay, ease }

  const idleT = (duration: number, delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: 'easeInOut' as const, repeat: Infinity }

  return (
    <div className={`relative isolate overflow-hidden bg-[#2b1a12] ${className}`}>
      {/* Background gunung sudah ada dari awal */}
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

      {/* overlay tone vintage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,236,0.04),rgba(43,26,18,0.08)_44%,rgba(18,10,6,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,6,0.12)_0%,rgba(18,10,6,0.03)_32%,rgba(18,10,6,0.08)_70%,rgba(18,10,6,0.3)_100%)]" />

      {/* wayang kanan bawah clean SVG, dipertahankan sebagai aksen ringan */}
      <motion.div
        initial={false}
        animate={active || coverMode ? { opacity: coverMode ? 0.42 : 0.62, y: 0 } : { opacity: 0.44, y: 0 }}
        transition={t(0.8, 0)}
        className="absolute bottom-[7%] right-[4%] z-20 w-[4.75rem] sm:w-[6.25rem]"
      >
        <motion.div
          initial={false}
          animate={
            active && !reduceMotion
              ? { y: [0, -5, 0], rotate: [0, -0.8, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={idleT(9, REFERENCE_VIDEO_OPENING_TIMELINE.decorReveal.end)}
        >
          <Image
            src={`${base}/wayang/horse-wayang.svg`}
            alt=""
            width={240}
            height={240}
            className="h-auto w-full"
          />
        </motion.div>
      </motion.div>

      {!coverMode ? (
        <>
          <motion.div
            initial={false}
            animate={
              active
                ? { opacity: 0.34, x: 0, y: 0, rotate: 0 }
                : { opacity: 0, x: reduceMotion ? 0 : -16, y: reduceMotion ? 0 : 18, rotate: -1.5 }
            }
            transition={t(1.25, REFERENCE_VIDEO_OPENING_TIMELINE.decorReveal.start)}
            className="absolute bottom-[1%] left-[-2.25rem] z-10 w-[12rem] sm:left-[-1rem] sm:w-[15rem]"
          >
            <motion.div
              initial={false}
              animate={
                active && !reduceMotion
                  ? { x: [0, 3, 0], y: [0, -4, 0], rotate: [-0.6, 1.1, -0.6] }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={idleT(10, REFERENCE_VIDEO_OPENING_TIMELINE.decorReveal.end)}
            >
              <Image
                src={`${vintageBase}/trees/palm-left.svg`}
                alt=""
                width={320}
                height={360}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={
              active
                ? { opacity: 0.28, x: 0, y: 0, rotate: 0 }
                : { opacity: 0, x: reduceMotion ? 0 : 16, y: reduceMotion ? 0 : 18, rotate: 1.5 }
            }
            transition={t(1.25, REFERENCE_VIDEO_OPENING_TIMELINE.decorReveal.start + 0.18)}
            className="absolute bottom-[2%] right-[-2.75rem] z-10 w-[12rem] sm:right-[-1.5rem] sm:w-[15rem]"
          >
            <motion.div
              initial={false}
              animate={
                active && !reduceMotion
                  ? { x: [0, -3, 0], y: [0, -4, 0], rotate: [0.6, -1.1, 0.6] }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={idleT(10.5, REFERENCE_VIDEO_OPENING_TIMELINE.decorReveal.end + 0.15)}
            >
              <Image
                src={`${vintageBase}/trees/palm-left.svg`}
                alt=""
                width={320}
                height={360}
                className="h-auto w-full -scale-x-100"
              />
            </motion.div>
          </motion.div>
        </>
      ) : null}

      {showCurtain ? (
        <>
          <motion.div
            initial={false}
            animate={
              active
                ? reduceMotion
                  ? { opacity: 0, x: 0 }
                  : { opacity: 0.08, x: '-46%' }
                : { opacity: 0.58, x: '0%' }
            }
            transition={t(
              REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.end -
                REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.start,
              REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.start,
            )}
            className="absolute inset-y-[18%] left-0 z-30 w-[56%] rounded-r-[2rem] bg-[linear-gradient(180deg,rgba(91,59,43,0.78),rgba(54,32,22,0.7))] shadow-[18px_0_42px_rgba(0,0,0,0.18)] backdrop-blur-[1px]"
          />
          <motion.div
            initial={false}
            animate={
              active
                ? reduceMotion
                  ? { opacity: 0, x: 0 }
                  : { opacity: 0.08, x: '46%' }
                : { opacity: 0.58, x: '0%' }
            }
            transition={t(
              REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.end -
                REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.start,
              REFERENCE_VIDEO_OPENING_TIMELINE.centerCurtainReveal.start,
            )}
            className="absolute inset-y-[18%] right-0 z-30 w-[56%] rounded-l-[2rem] bg-[linear-gradient(180deg,rgba(91,59,43,0.78),rgba(54,32,22,0.7))] shadow-[-18px_0_42px_rgba(0,0,0,0.18)] backdrop-blur-[1px]"
          />
        </>
      ) : null}

      {/* sparkle/particle hint */}
      <motion.div
        initial={false}
        animate={active || coverMode ? { opacity: coverMode ? 0.1 : 0.18 } : { opacity: 0 }}
        transition={t(1, REFERENCE_VIDEO_OPENING_TIMELINE.landscapeLive.start + 0.35)}
        className="absolute inset-0 z-10"
      >
        <Image
          src={`${base}/sparkles/gold-dust-soft.svg`}
          alt=""
          fill
          className="object-cover reference-video-gold-drift"
          sizes="100vw"
        />
      </motion.div>

    </div>
  )
}
