'use client'

import { useEffect, useState } from 'react'
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
  const [data, setData] = useState<WeddingData>(() => getFallbackWeddingData())

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const guestName = params.get('to')

    setData(getFallbackWeddingData(guestName))

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
            guestName,
          }),
        )
      } catch {
        setData(getFallbackWeddingData(guestName))
      }
    }

    void loadSupabaseData()
  }, [])

  function handleOpen() {
    setOpened(true)
    // Prevent the page behind the cover from scrolling while closed
    document.body.style.overflow = ''
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="relative bg-background">
      <OpeningCover data={data} open={opened} onOpen={handleOpen} />

      <div
        aria-hidden={!opened}
        className={
          opened
            ? 'opacity-100 transition-opacity duration-700'
            : 'pointer-events-none h-screen overflow-hidden opacity-0'
        }
      >
        <HeroSection data={data} />
        <SectionDivider />
        <GreetingSection data={data} />
        <SectionDivider />
        <QuoteSection data={data} />
        <SectionDivider />
        <CoupleSection data={data} />
        <SectionDivider />
        <CountdownSection data={data} />
        <SectionDivider />
        <EventSection data={data} />
        <SectionDivider />
        <MapsSection data={data} />
        <SectionDivider />
        <LoveStorySection />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <VideoSection />
        <SectionDivider />
        <RsvpSection />
        <SectionDivider />
        <WishesSection />
        <SectionDivider />
        <DigitalGiftSection />
        <SectionDivider />
        <ClosingSection data={data} />
      </div>

      <FloatingMusicButton active={opened} data={data} />
      <BackToTopButton active={opened} />
      <Toaster position="top-center" />
    </main>
  )
}
