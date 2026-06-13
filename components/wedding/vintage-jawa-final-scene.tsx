'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

const base = '/ornaments/vintage-jawa-final'

/**
 * Frame foto estetik jawa klasik
 */
export function VintageJawaPhotoFrame({
  children,
  type = 'arch',
  className,
}: {
  children: React.ReactNode
  type?: 'arch' | 'oval'
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden bg-[#e8dfc9] p-[0.55rem]",
        type === "oval" ? "rounded-full" : "rounded-t-full rounded-b-3xl",
        className
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
        className="pointer-events-none object-cover opacity-60 mix-blend-multiply"
      />
    </div>
  )
}