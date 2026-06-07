import { cn } from '@/lib/utils'

// Elegant gold ornamental divider
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3', className)}
      aria-hidden="true"
    >
      <span className="h-px w-12 gold-divider sm:w-20" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold"
      >
        <path
          d="M12 2c1.5 3 1.5 5 0 7-1.5-2-1.5-4 0-7Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M12 22c-1.5-3-1.5-5 0-7 1.5 2 1.5 4 0 7Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M2 12c3-1.5 5-1.5 7 0-2 1.5-4 1.5-7 0Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M22 12c-3 1.5-5 1.5-7 0 2-1.5 4-1.5 7 0Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
      <span className="h-px w-12 gold-divider sm:w-20" />
    </div>
  )
}

export function FloralMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 24"
      className={cn('text-gold', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M36 12c-5-8-11-8-18 0 7 8 13 8 18 0Zm0 0c5-8 11-8 18 0-7 8-13 8-18 0Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M5 12h18m26 0h18M36 4c3 4 3 8 0 12-3-4-3-8 0-12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.72"
      />
      <circle cx="36" cy="12" r="2.2" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none relative z-10 -my-5 flex h-10 items-center justify-center overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute h-px w-[80vw] max-w-3xl gold-divider" />
      <span className="soft-badge flex size-10 rotate-45 items-center justify-center rounded-xl bg-ivory">
        <span className="size-3 rounded-full bg-gold/75" />
      </span>
    </div>
  )
}

// Small floating leaf/floral accent (CSS animated)
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
        d="M50 70c-8-6-18-8-28-8M50 55c8-5 16-7 26-7M50 82c-6-4-13-5-20-5"
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
        strokeWidth="1.5"
        opacity="0.75"
      />
      <path
        d="M18 72V41c0-13 10-23 23-23h31"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M23 58c18-3 30-15 33-33M24 41c9-2 15-8 17-17M42 66c11-5 18-12 23-23"
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
      <div className="batik-pattern pointer-events-none absolute inset-0 -z-10 opacity-[0.08]" />
      <FloralAccent className="animate-float-slow pointer-events-none absolute -left-10 top-16 w-32 opacity-35 sm:w-44" />
      <FloralAccent className="animate-float-slower pointer-events-none absolute -right-10 bottom-16 w-32 rotate-180 opacity-35 sm:w-44" />
    </>
  )
}
