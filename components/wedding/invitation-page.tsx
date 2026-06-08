'use client'

import { useEffect, useMemo, useState } from 'react'
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
    <main className="vintage-public-page relative bg-background">
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
      ? 'overflow-x-hidden opacity-100'
      : 'pointer-events-none h-screen overflow-hidden opacity-0'
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
