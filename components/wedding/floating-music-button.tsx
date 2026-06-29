'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import { weddingData, type WeddingData } from '@/lib/wedding-data'
import { cn } from '@/lib/utils'

const LOCAL_MUSIC_SRC = '/music/music.mp3'
const LEGACY_MUSIC_SRC = `/${['audio', 'song.mp3'].join('/')}`
export const WEDDING_MUSIC_PLAY_EVENT = 'wedding:play-music'

function getMusicSrc(src?: string) {
  const cleanSrc = src?.trim()
  if (!cleanSrc || cleanSrc === LEGACY_MUSIC_SRC) return LOCAL_MUSIC_SRC
  return cleanSrc
}

export function FloatingMusicButton({
  active,
  data = weddingData,
}: {
  active: boolean
  data?: WeddingData
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const audioSrc = getMusicSrc(data.music.src)

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

  useEffect(() => {
    window.addEventListener(WEDDING_MUSIC_PLAY_EVENT, playMusic)
    return () => window.removeEventListener(WEDDING_MUSIC_PLAY_EVENT, playMusic)
  }, [playMusic])

  // Fallback attempt after the invitation is opened.
  useEffect(() => {
    if (!active) return
    playMusic()
  }, [active, playMusic])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      playMusic()
    }
  }

  return (
    <>
      {/* Local invitation music. */}
      <audio ref={audioRef} src={audioSrc} loop preload="none" />
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
