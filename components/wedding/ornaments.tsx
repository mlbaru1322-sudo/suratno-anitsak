import Image from 'next/image'

const javaOrnaments = {
  left: '/ornaments/gambar-1-ornamen-kiri-transparent.png',
  right: '/ornaments/gambar-1-ornamen-kanan-transparent.png',
  divider: '/ornaments/gambar-2-garis-pembatas-transparent.png',
} as const

export function OrnamentDivider({ className }: { className?: string }) { return null }
export function GununganMark({ className }: { className?: string }) { return null }
export function BatikMark({ className }: { className?: string }) { return null }
export function GebyokArch({ className }: { className?: string }) { return null }
export function GoldDust({ className }: { className?: string }) { return null }
export function CornerCarving({ className }: { className?: string }) { return null }
export function FloralMark({ className }: { className?: string }) { return null }
export function SectionDivider({ className }: { className?: string }) { return null }
export function FloralAccent({ className }: { className?: string }) { return null }
export function CornerOrnament({ className }: { className?: string }) { return null }
export function SectionOrnaments() { return null }
export function JavaneseFloatingOrnaments() { return null }

export function JavaSideOrnament({
  side,
  className = '',
}: {
  side: 'left' | 'right'
  className?: string
}) {
  return (
    <Image
      src={javaOrnaments[side]}
      alt=""
      width={side === 'left' ? 635 : 632}
      height={940}
      aria-hidden="true"
      className={`pointer-events-none absolute z-[1] select-none ${className}`}
      sizes="(max-width: 640px) 42vw, 240px"
    />
  )
}

export function JavaOrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative z-[2] flex justify-center overflow-hidden px-6 py-2 ${className}`}
      aria-hidden="true"
    >
      <Image
        src={javaOrnaments.divider}
        alt=""
        width={2172}
        height={724}
        className="h-auto w-[min(78vw,21rem)] select-none opacity-80 sm:w-[24rem]"
        sizes="(max-width: 640px) 78vw, 384px"
      />
    </div>
  )
}
