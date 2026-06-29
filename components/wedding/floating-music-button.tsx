'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import { type WeddingData } from '@/lib/wedding-data'
import { cn } from '@/lib/utils'

const LOCAL_MUSIC_SRC = '/music/music.mp3'
export const WEDDING_MUSIC_PLAY_EVENT = 'wedding:play-music'

export function FloatingMusicButton({
  active,
}: {
  active: boolean
  data?: WeddingData
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasTriedAutoplayRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const audioSrc = LOCAL_MUSIC_SRC

  const playMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audio.paused) return

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false)
      })
  }, [])

  const tryAutoplayOnce = useCallback(() => {
    if (hasTriedAutoplayRef.current) return

    hasTriedAutoplayRef.current = true
    playMusic()
  }, [playMusic])

  useEffect(() => {
    window.addEventListener(WEDDING_MUSIC_PLAY_EVENT, tryAutoplayOnce)
    return () => window.removeEventListener(WEDDING_MUSIC_PLAY_EVENT, tryAutoplayOnce)
  }, [tryAutoplayOnce])

  // Fallback attempt after the invitation is opened. Run only once, so pause stays paused.
  useEffect(() => {
    if (!active) return
    tryAutoplayOnce()
  }, [active, tryAutoplayOnce])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false)
        })
    } else {
      audio.pause()
    }
  }

  return (
    <>
      {/* Local invitation music. */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {active ? (
        <button
          onClick={toggle}
          aria-label={playing ? 'Jeda musik' : 'Putar musik'}
          aria-pressed={playing}
          className={cn(
            "fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-gold text-espresso shadow-luxe transition-colors hover:bg-gold-soft",
            playing && "wedding-slow-rotate"
          )}
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
      ) : null}
    </>
  )
}
