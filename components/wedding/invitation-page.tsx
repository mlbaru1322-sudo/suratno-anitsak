'use client'

import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
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

  function handleOpen() {
    setOpened(true)
    // Prevent the page behind the cover from scrolling while closed
    document.body.style.overflow = ''
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="relative bg-background">
      <OpeningCover open={opened} onOpen={handleOpen} />

      <div
        aria-hidden={!opened}
        className={
          opened
            ? 'opacity-100 transition-opacity duration-700'
            : 'pointer-events-none h-screen overflow-hidden opacity-0'
        }
      >
        <HeroSection />
        <SectionDivider />
        <GreetingSection />
        <SectionDivider />
        <QuoteSection />
        <SectionDivider />
        <CoupleSection />
        <SectionDivider />
        <CountdownSection />
        <SectionDivider />
        <EventSection />
        <SectionDivider />
        <MapsSection />
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
        <ClosingSection />
      </div>

      <FloatingMusicButton active={opened} />
      <BackToTopButton active={opened} />
      <Toaster position="top-center" />
    </main>
  )
}
