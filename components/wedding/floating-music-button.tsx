'use client'

import { useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { cn } from '@/lib/utils'

export function FloatingMusicButton({
  active,
  data = weddingData,
}: {
  active: boolean
  data?: WeddingData
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  // Try to start music once the invitation is opened
  useEffect(() => {
    if (!active || !audioRef.current) return
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay may be blocked; user can tap the button instead
        setPlaying(false)
      })
  }, [active])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  if (!active) return null

  return (
    <>
      {/* Dummy audio path with safe fallback (file may not exist) */}
      <audio ref={audioRef} src={data.music.src} loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        aria-pressed={playing}
        className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-gold text-espresso shadow-luxe transition-colors hover:bg-gold-soft"
      >
        {playing ? (
          <Pause className="size-5" aria-hidden="true" />
        ) : (
          <Music
            className={cn('size-5', playing && 'animate-spin-slow')}
            aria-hidden="true"
          />
        )}
        {playing ? (
          <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-ivory/60" />
        ) : null}
      </button>
    </>
  )
}
