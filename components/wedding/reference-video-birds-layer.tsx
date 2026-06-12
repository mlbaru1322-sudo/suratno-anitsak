'use client'

import Image from 'next/image'

const base = '/reference-video-opening'

export function ReferenceVideoBirdsLayer({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="reference-video-bird-drift absolute left-[8%] top-[10%] z-20 w-[6.25rem] opacity-55 sm:w-[8rem]">
        <Image
          src={`${base}/birds/birds-flock-01.svg`}
          alt=""
          width={280}
          height={90}
          className="reference-video-bird-flap h-auto w-full"
        />
      </div>
      <div className="reference-video-bird-drift-reverse absolute right-[8%] top-[17%] z-20 w-[5.25rem] opacity-45 sm:w-[6.75rem]">
        <Image
          src={`${base}/birds/birds-flock-02.svg`}
          alt=""
          width={220}
          height={72}
          className="reference-video-bird-flap-reverse h-auto w-full"
        />
      </div>
    </div>
  )
}
