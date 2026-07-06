'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Toaster } from '@/components/ui/sonner'
import {
  getWeddingBankAccounts,
  getWeddingEvents,
  getWeddingSettings,
} from '@/lib/services/wedding-service'
import { type WeddingData } from '@/lib/wedding-data'
import { mergeSupabaseWeddingData } from '@/lib/wedding-data-mapper'
import { OpeningCover } from './opening-cover'
import { HeroSection } from './hero-section'
import { GreetingSection } from './greeting-section'
import { QuoteSection } from './quote-section'
import { CoupleSection } from './couple-section'
import { CountdownSection } from './countdown-section'
import { EventSection } from './event-section'
import { MapsSection } from './maps-section'
import { LoveStorySection } from './love-story-section'
import { GallerySection } from './gallery-section'
import { RsvpSection } from './rsvp-section'
import { WishesSection } from './wishes-section'
import { DigitalGiftSection } from './digital-gift-section'
import { ClosingSection } from './closing-section'
import {
  FloatingMusicButton,
  WEDDING_MUSIC_PLAY_EVENT,
} from './floating-music-button'
import { BackToTopButton } from './back-to-top-button'
import { SectionDivider } from './ornaments'

const HERO_REVEAL_START_DELAY_MS = 5800

export function InvitationPage() {
  const [opened, setOpened] = useState(false)
  const [heroActive, setHeroActive] = useState(false)
  const heroRevealTimerRef = useRef<number | null>(null)
  const [data, setData] = useState<WeddingData | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [guestName, setGuestName] = useState<string | null>(null)

  const publicData = useMemo<WeddingData | null>(() => {
    if (!data) return null

    const cleanGuestName = guestName?.trim()

    if (!cleanGuestName) return data

    return {
      ...data,
      guest: {
        ...data.guest,
        name: cleanGuestName,
      },
    } as WeddingData
  }, [data, guestName])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const queryGuestName = params.get('to')

    setGuestName(queryGuestName)

    async function loadSupabaseData() {
      try {
        const [settings, events, bankAccounts] = await Promise.all([
          getWeddingSettings(),
          getWeddingEvents(),
          getWeddingBankAccounts(),
        ])

        const mergedData =
          mergeSupabaseWeddingData({
            settings,
            events,
            bankAccounts,
            guestName: queryGuestName,
          })

        if (mergedData) {
          setData(mergedData)
        } else {
          setLoadError(true)
        }
      } catch {
        setLoadError(true)
      }
    }

    void loadSupabaseData()
  }, [])

  useEffect(() => {
    return () => {
      if (heroRevealTimerRef.current !== null) {
        window.clearTimeout(heroRevealTimerRef.current)
      }
    }
  }, [])

  function handleOpen() {
    window.dispatchEvent(new Event(WEDDING_MUSIC_PLAY_EVENT))
    setOpened(true)
    setHeroActive(false)
    if (heroRevealTimerRef.current !== null) {
      window.clearTimeout(heroRevealTimerRef.current)
    }
    heroRevealTimerRef.current = window.setTimeout(() => {
      setHeroActive(true)
      heroRevealTimerRef.current = null
    }, HERO_REVEAL_START_DELAY_MS)
    document.body.style.overflow = ''
    window.scrollTo({ top: 0 })
  }

  if (!publicData) {
    return (
      <main className="vintage-public-page relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#1f120c] px-6 text-center text-ivory">
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute top-0 h-full w-[125%] -left-[12.5%] scale-[1.08] sm:w-full sm:left-0">
            <Image
              src="/reference-video-opening/images/landscape-background.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center contrast-[1.08] brightness-[1.04] saturate-[1.08]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,7,4,0.76),rgba(28,17,11,0.58),rgba(10,6,4,0.84))]" />
        </div>
        <div className="relative z-10 max-w-sm">
          <p className="text-xs uppercase tracking-[0.28em] text-champagne/80">
            Wedding Invitation
          </p>
          <p className="mt-4 font-serif text-2xl text-ivory">
            {loadError ? 'Undangan belum dapat dimuat.' : 'Memuat undangan...'}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="vintage-public-page relative isolate min-h-screen overflow-hidden bg-[#1f120c]">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 h-full w-[125%] -left-[12.5%] scale-[1.08] sm:w-full sm:left-0">
          <Image
            src="/reference-video-opening/images/landscape-background.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center contrast-[1.08] brightness-[1.04] saturate-[1.08]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,236,0.04),rgba(43,26,18,0.08)_44%,rgba(18,10,6,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,6,0.12)_0%,rgba(18,10,6,0.03)_32%,rgba(18,10,6,0.08)_70%,rgba(18,10,6,0.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,7,4,0.74)_0%,rgba(33,20,13,0.34)_24%,rgba(43,26,18,0.18)_50%,rgba(28,17,11,0.36)_74%,rgba(10,6,4,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,241,231,0.12)_0%,rgba(89,55,35,0.1)_38%,rgba(18,10,6,0.72)_100%)]" />
      </div>
      <OpeningCover
        data={publicData}
        open={opened}
        onOpen={handleOpen}
      />

      <div
        aria-hidden={!heroActive}
        className={`relative z-10 overflow-x-hidden ${!heroActive ? 'h-screen overflow-hidden pointer-events-none' : ''}`}
      >
        <HeroSection data={publicData} active={heroActive} />
        <SectionDivider />
        <GreetingSection data={publicData} />
        <SectionDivider />
        <QuoteSection data={publicData} />
        <SectionDivider />
        <CoupleSection data={publicData} />
        <CountdownSection data={publicData} />
        <SectionDivider />
        <EventSection data={publicData} />
        <SectionDivider />
        <MapsSection data={publicData} />
        <SectionDivider />
        <LoveStorySection />
        <GallerySection />
        <SectionDivider />
        <RsvpSection data={publicData} />
        <SectionDivider />
        <WishesSection enabled={opened} />
        <DigitalGiftSection data={publicData} />
        <SectionDivider />
        <ClosingSection data={publicData} />
      </div>

      <FloatingMusicButton active={opened} data={publicData} />
      <BackToTopButton active={opened} />
      <Toaster position="top-center" />
    </main>
  )
}
