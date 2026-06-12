'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Toaster } from '@/components/ui/sonner'
import {
  getWeddingEvents,
  getWeddingSettings,
} from '@/lib/services/wedding-service'
import { type WeddingData } from '@/lib/wedding-data'
import {
  getFallbackWeddingData,
  mergeSupabaseWeddingData,
} from '@/lib/wedding-data-mapper'
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
import { VideoSection } from './video-section'
import { RsvpSection } from './rsvp-section'
import { WishesSection } from './wishes-section'
import { DigitalGiftSection } from './digital-gift-section'
import { ClosingSection } from './closing-section'
import { FloatingMusicButton } from './floating-music-button'
import { BackToTopButton } from './back-to-top-button'
import { SectionDivider } from './ornaments'

export function InvitationPage() {
  const [opened, setOpened] = useState(false)
  const [heroActive, setHeroActive] = useState(false)
  const [data, setData] = useState<WeddingData>(() =>
    getFallbackWeddingData(null),
  )
  const [guestName, setGuestName] = useState<string | null>(null)

  const publicData = useMemo<WeddingData>(() => {
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
    setData(getFallbackWeddingData(queryGuestName))

    async function loadSupabaseData() {
      try {
        const [settings, events] = await Promise.all([
          getWeddingSettings(),
          getWeddingEvents(),
        ])

        setData(
          mergeSupabaseWeddingData({
            settings,
            events,
            guestName: queryGuestName,
          }),
        )
      } catch {
        setData(getFallbackWeddingData(queryGuestName))
      }
    }

    void loadSupabaseData()
  }, [])

  function handleOpen() {
    setHeroActive(false)
    setOpened(true)
    document.body.style.overflow = ''
    window.scrollTo({ top: 0 })
  }

  function handleCoverExitComplete() {
    // setHeroActive(true)
    window.setTimeout(() => {
    setHeroActive(true)
  }, 60)
  }

  return (
    <main className="vintage-public-page relative isolate min-h-screen overflow-hidden bg-[#1f120c]">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 scale-[1.08]">
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
        onExitComplete={handleCoverExitComplete}
      />

      <div
        aria-hidden={!heroActive}
        className={
          heroActive
            ? 'relative z-10 overflow-x-hidden opacity-100'
            : 'pointer-events-none relative z-10 h-screen overflow-hidden opacity-0'
        }
      >
        <HeroSection data={publicData} active={heroActive} />
        <SectionDivider />
        <GreetingSection data={publicData} />
        <SectionDivider />
        <QuoteSection data={publicData} />
        <SectionDivider />
        <CoupleSection data={publicData} />
        <SectionDivider />
        <CountdownSection data={publicData} />
        <SectionDivider />
        <EventSection data={publicData} />
        <SectionDivider />
        <MapsSection data={publicData} />
        <SectionDivider />
        <LoveStorySection />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <VideoSection />
        <SectionDivider />
        <RsvpSection />
        <SectionDivider />
        <WishesSection enabled={opened} />
        <SectionDivider />
        <DigitalGiftSection />
        <SectionDivider />
        <ClosingSection data={publicData} />
      </div>

      <FloatingMusicButton active={opened} data={publicData} />
      <BackToTopButton active={opened} />
      <Toaster position="top-center" />
    </main>
  )
}
