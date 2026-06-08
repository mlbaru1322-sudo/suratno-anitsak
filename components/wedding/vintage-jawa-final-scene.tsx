"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

const base = "/ornaments/vintage-jawa-final"
const revealEase = [0.22, 1, 0.36, 1] as const

export function VintageJawaBirdsLayer({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <Image
        src={`${base}/birds/birds-flock-01.svg`}
        alt=""
        width={280}
        height={90}
        className="vintage-bird-drift absolute top-[10%] z-20 w-[5.5rem] opacity-60 sm:top-[12%] sm:w-[7.5rem]"
      />
      <Image
        src={`${base}/birds/birds-flock-02.svg`}
        alt=""
        width={220}
        height={72}
        className="vintage-bird-drift-reverse absolute top-[16%] z-20 w-[4.5rem] opacity-50 sm:top-[18%] sm:w-[6rem]"
      />
    </div>
  )
}

export type VintageOpeningVariant = "landscape" | "arch-card" | "wayang" | "minimal"

export function VintageJawaOpeningScene({
  variant = "landscape",
  className,
}: {
  variant?: VintageOpeningVariant
  className?: string
}) {
  const bg =
    variant === "wayang"
      ? `${base}/backgrounds/wayang-silhouette-bg.svg`
      : `${base}/backgrounds/bg-paper-brown.svg`
  const landscape =
    variant === "minimal"
      ? `${base}/backgrounds/landscape-sawah-desa.svg`
      : `${base}/backgrounds/landscape-joglo-gunung.svg`

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden vintage-jawa-scene",
        className,
      )}
      aria-hidden="true"
    >
      <Image src={bg} alt="" fill priority className="object-cover" sizes="100vw" />
      <Image
        src={`${base}/patterns/parang-pattern.svg`}
        alt=""
        fill
        className="object-cover opacity-[0.12] mix-blend-soft-light"
        sizes="100vw"
      />
      <Image
        src={`${base}/frames/gebyok-top-01.svg`}
        alt=""
        width={1200}
        height={250}
        className="absolute inset-x-0 top-0 z-10 w-full opacity-95"
        priority
      />
      <Image
        src={`${base}/frames/gebyok-bottom-01.svg`}
        alt=""
        width={1200}
        height={250}
        className="absolute inset-x-0 bottom-0 z-10 w-full opacity-95"
        priority
      />
      <Image
        src={`${base}/corners/corner-carving-tl.svg`}
        alt=""
        width={240}
        height={180}
        className="absolute left-2 top-7 z-20 w-24 opacity-85 sm:left-6 sm:top-8 sm:w-36"
      />
      <Image
        src={`${base}/corners/corner-carving-tr.svg`}
        alt=""
        width={240}
        height={180}
        className="absolute right-2 top-7 z-20 w-24 opacity-85 sm:right-6 sm:top-8 sm:w-36"
      />
      <Image
        src={`${base}/corners/corner-carving-bl.svg`}
        alt=""
        width={240}
        height={180}
        className="absolute bottom-7 left-2 z-20 w-24 opacity-80 sm:bottom-8 sm:left-6 sm:w-36"
      />
      <Image
        src={`${base}/corners/corner-carving-br.svg`}
        alt=""
        width={240}
        height={180}
        className="absolute bottom-7 right-2 z-20 w-24 opacity-80 sm:bottom-8 sm:right-6 sm:w-36"
      />
      <Image
        src={landscape}
        alt=""
        width={1400}
        height={500}
        className="vintage-parallax-slow absolute inset-x-0 bottom-[8dvh] z-0 w-full min-w-[46rem] -translate-x-[18%] opacity-76 sm:bottom-[10dvh] sm:min-w-0 sm:translate-x-0"
        priority
      />
      <Image
        src={`${base}/trees/palm-pair.svg`}
        alt=""
        width={520}
        height={440}
        className="absolute bottom-[8dvh] left-1/2 z-10 w-[34rem] max-w-none -translate-x-1/2 opacity-80 sm:bottom-[9dvh] sm:w-[42rem]"
      />
      <Image
        src={`${base}/wayang/horse-wayang.svg`}
        alt=""
        width={360}
        height={360}
        className="absolute bottom-[10dvh] left-[-3.5rem] z-20 w-48 opacity-82 sm:left-10 sm:w-64"
      />
      <Image
        src={`${base}/gunungan/gunungan-01.svg`}
        alt=""
        width={180}
        height={220}
        className="animate-vintage-soft-reveal absolute bottom-[14dvh] right-2 z-20 w-24 opacity-82 sm:right-16 sm:w-32"
      />
      <Image
        src={`${base}/sparkles/gold-dust-soft.svg`}
        alt=""
        fill
        className="vintage-gold-drift object-cover opacity-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,241,231,0.08),rgba(43,26,18,0.23)_55%,rgba(18,10,6,0.42))]" />
    </div>
  )
}

export function VintageJawaHeroBackdrop({ active = false }: { active?: boolean }) {
  const reduceMotion = useReducedMotion()

  const motionT = (duration: number, delay: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: revealEase }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={active ? { opacity: 0.5 } : { opacity: 0.38 }}
        transition={motionT(0.6, 0)}
      >
        <Image
          src={`${base}/backgrounds/bg-paper-brown.svg`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10"
        initial={false}
        animate={
          active
            ? { opacity: 0.44, y: 0, scale: 1 }
            : { opacity: 0, y: 24, scale: 1.04 }
        }
        transition={motionT(1.4, 0.2)}
      >
        <Image
          src={`${base}/backgrounds/landscape-joglo-gunung.svg`}
          alt=""
          width={1400}
          height={500}
          className="vintage-landscape-drift w-full min-w-[38rem] sm:min-w-0"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[6%] left-[-1.5rem] z-20 sm:left-6"
        initial={false}
        animate={
          active
            ? { opacity: 0.34, y: 0, x: 0 }
            : { opacity: 0, y: 20, x: -12 }
        }
        transition={motionT(1.2, 0.4)}
      >
        <Image
          src={`${base}/wayang/horse-wayang.svg`}
          alt=""
          width={280}
          height={280}
          className="vintage-soft-float w-36 sm:w-48"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] right-[-1rem] z-20 sm:right-4"
        initial={false}
        animate={
          active
            ? { opacity: 0.26, y: 0, x: 0 }
            : { opacity: 0, y: 20, x: 12 }
        }
        transition={motionT(1.2, 0.5)}
      >
        <Image
          src={`${base}/trees/palm-pair.svg`}
          alt=""
          width={320}
          height={280}
          className="vintage-soft-float w-40 sm:w-52"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20"
        initial={false}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={motionT(0.9, 0.3)}
      >
        <VintageJawaBirdsLayer />
      </motion.div>

      <div className="absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_center,rgba(43,26,18,0.1)_0%,rgba(24,14,9,0.48)_68%,rgba(12,7,4,0.78)_100%)]" />
      <div className="absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(18,10,6,0.38)_0%,transparent_30%,transparent_70%,rgba(18,10,6,0.46)_100%)]" />
    </div>
  )
}

export function VintageJawaArchPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[#b9976b]/70 bg-[#f5f1e7]/92 shadow-2xl",
        className,
      )}
    >
      <Image
        src={`${base}/backgrounds/bg-batik-cream.svg`}
        alt=""
        fill
        className="pointer-events-none object-cover opacity-[0.08]"
      />
      <Image
        src={`${base}/frames/frame-page-arch-01.svg`}
        alt=""
        fill
        className="pointer-events-none object-fill opacity-70"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function VintageJawaDivider({
  className,
  variant = 1,
}: {
  className?: string
  variant?: 1 | 2 | 3 | 4 | 5
}) {
  return (
    <Image
      src={`${base}/dividers/divider-gunungan-0${variant}.svg`}
      alt=""
      width={900}
      height={100}
      className={cn("mx-auto w-full max-w-xl opacity-90", className)}
    />
  )
}

export function VintageJawaCardCorners() {
  return (
    <>
      <Image
        src={`${base}/corners/corner-carving-tl.svg`}
        alt=""
        width={240}
        height={180}
        className="pointer-events-none absolute left-0 top-0 w-16 opacity-65"
      />
      <Image
        src={`${base}/corners/corner-carving-tr.svg`}
        alt=""
        width={240}
        height={180}
        className="pointer-events-none absolute right-0 top-0 w-16 opacity-65"
      />
      <Image
        src={`${base}/corners/corner-carving-bl.svg`}
        alt=""
        width={240}
        height={180}
        className="pointer-events-none absolute bottom-0 left-0 w-16 opacity-65"
      />
      <Image
        src={`${base}/corners/corner-carving-br.svg`}
        alt=""
        width={240}
        height={180}
        className="pointer-events-none absolute bottom-0 right-0 w-16 opacity-65"
      />
    </>
  )
}

export function VintageJawaPhotoFrame({
  children,
  className,
  type = "oval",
}: {
  children: React.ReactNode
  className?: string
  type?: "oval" | "arch"
}) {
  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden bg-[#e8dfc9] p-[0.55rem]",
        type === "oval" ? "rounded-full" : "rounded-t-full rounded-b-3xl",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden",
          type === "oval" ? "rounded-full" : "rounded-t-full rounded-b-3xl",
        )}
      >
        {children}
      </div>
      <Image
        src={`${base}/frames/${type === "oval" ? "frame-photo-oval" : "frame-photo-arch"}.svg`}
        alt=""
        fill
        className="pointer-events-none z-10 object-fill"
      />
    </div>
  )
}