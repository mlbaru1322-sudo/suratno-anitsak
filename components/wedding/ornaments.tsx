import Image from 'next/image'
import { cn } from '@/lib/utils'

const vintageBase = '/ornaments/vintage-jawa-final'

// Lightweight Javanese-inspired ornamental divider.
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3', className)}
      aria-hidden="true"
    >
      <span className="h-px w-12 gold-divider sm:w-20" />
      <GununganMark className="h-8 w-8 text-gold" />
      <span className="h-px w-12 gold-divider sm:w-20" />
    </div>
  )
}

export function GununganMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={cn('text-gold', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 3c9 12 16 24 16 34 0 10-7 16-16 16S8 47 8 37C8 27 15 15 24 3Z"
        fill="currentColor"
        opacity="0.32"
      />
      <path
        d="M24 4c9 12 16 24 16 34 0 9-7 15-16 15S8 47 8 38C8 28 15 16 24 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M24 13c4 6 7 12 7 17 0 4-3 7-7 7s-7-3-7-7c0-5 3-11 7-17Z"
        stroke="currentColor"
        strokeWidth="1.35"
        opacity="0.9"
      />
      <path
        d="M15 41c4-3 7-3 9 0 2-3 5-3 9 0M18 29h12M20 23h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.95"
      />
      <circle cx="24" cy="45" r="2" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

export function BatikMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 28"
      className={cn('text-gold', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M48 4c5 6 5 14 0 20-5-6-5-14 0-20Z"
        fill="currentColor"
        opacity="0.32"
      />
      <path
        d="M8 14h26m28 0h26M48 5c6 6 6 12 0 18-6-6-6-12 0-18Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <path
        d="M25 14c5-6 10-6 15 0-5 6-10 6-15 0Zm31 0c5-6 10-6 15 0-5 6-10 6-15 0Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.9"
      />
      <circle cx="48" cy="14" r="2" fill="currentColor" />
    </svg>
  )
}

export function GebyokArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 80"
      className={cn('text-champagne', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 72h196M28 72V42c0-20 17-34 38-34h88c21 0 38 14 38 34v30"
        stroke="currentColor"
        strokeWidth="2.4"
        opacity="0.95"
      />
      <path
        d="M44 72V45c0-14 11-23 25-23h82c14 0 25 9 25 23v27"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.72"
      />
      <path
        d="M66 22c11 11 18 25 19 50M154 22c-11 11-18 25-19 50M110 11v61"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.68"
      />
      <path
        d="M83 30c9-7 18-7 27 0 9-7 18-7 27 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
        opacity="0.82"
      />
    </svg>
  )
}

export function GoldDust({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'gold-dust animate-soft-pulse pointer-events-none absolute inset-0',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function CornerCarving({ className }: { className?: string }) {
  return <CornerOrnament className={cn('card-carving', className)} />
}

export function FloralMark({ className }: { className?: string }) {
  return (
    <svg
        viewBox="0 0 72 24"
        fill="none"
      className={cn('text-gold', className)}
      aria-hidden="true"
    >
      <path
        d="M36 4c6 7 6 11 0 18-6-7-6-11 0-18Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M5 12h20m22 0h20M36 5c6 6 6 9 0 14-6-5-6-8 0-14Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.72"
      />
      <path
        d="M22 12c5-5 9-5 14 0-5 5-9 5-14 0Zm14 0c5-5 9-5 14 0-5 5-9 5-14 0Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.58"
      />
      <circle cx="36" cy="12" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none relative z-10 -my-7 flex h-16 items-center justify-center overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src={`${vintageBase}/dividers/divider-batik-line.svg`}
        alt=""
        width={900}
        height={90}
        className="animate-divider-reveal absolute w-[92vw] max-w-3xl opacity-80"
      />
      <span className="soft-badge flex size-14 items-center justify-center rounded-full bg-[#f5f1e7] shadow-luxe">
        <Image
          src={`${vintageBase}/gunungan/gunungan-01.svg`}
          alt=""
          width={56}
          height={56}
          className="h-11 w-11"
        />
      </span>
    </div>
  )
}

// Small floating ukiran/leaf accent (CSS animated)
export function FloralAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('text-gold-soft', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 95C50 60 30 40 10 30c20 0 40 10 40 40M50 95c0-35 20-55 40-65-20 0-40 10-40 40"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <path
        d="M50 70c-8-6-18-8-28-8M50 55c8-5 16-7 26-7M50 82c-6-4-13-5-20-5M50 44c-3-9-3-18 0-29"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}

export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      className={cn('text-gold-soft', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 82V38C8 21 21 8 38 8h44"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.75"
      />
      <path
        d="M18 72V41c0-13 10-23 23-23h31"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M23 58c18-3 30-15 33-33M24 41c9-2 15-8 17-17M42 66c11-5 18-12 23-23M19 29h47M30 18v45"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M56 25c7 0 13-4 17-10 0 8-5 14-13 17M40 24c-6 0-11-3-15-8 0 7 4 12 10 15M65 43c6 1 11-1 15-6-1 7-6 11-13 12"
        fill="currentColor"
        opacity="0.32"
      />
    </svg>
  )
}

export function SectionOrnaments() {
  return (
    <>
      <div className="javanese-section-frame" aria-hidden="true" />
      <div className="batik-pattern pointer-events-none absolute inset-0 z-0 opacity-[0.1]" />
    </>
  )
}

export function JavaneseFloatingOrnaments() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden opacity-70"
      aria-hidden="true"
    >
      <Image
        src={`${vintageBase}/patterns/kawung-pattern.svg`}
        alt=""
        width={360}
        height={360}
        className="animate-javanese-drift absolute -left-20 top-[18vh] w-44 opacity-[0.08] sm:w-60"
      />
      <Image
        src={`${vintageBase}/flowers/leaf-accent.svg`}
        alt=""
        width={180}
        height={180}
        className="animate-javanese-drift-alt absolute -right-12 bottom-[18vh] w-28 opacity-20 sm:right-2 sm:w-36"
      />
    </div>
  )
}
