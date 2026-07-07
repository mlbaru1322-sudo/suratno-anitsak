'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SectionHeading } from './section-heading'
import { JavaOrnamentDivider } from './ornaments'

const galleryFiles = [
  'Salinan IMG_0973.JPG.webp',
  'Salinan IMG_0977.JPG.webp',
  'Salinan IMG_0993.JPG.webp',
  'Salinan IMG_1023.JPG.webp',
  'Salinan IMG_1029.webp',
  'Salinan IMG_1034 (1).JPG.webp',
  'Salinan IMG_1034.JPG.webp',
  'Salinan IMG_1055.JPG.webp',
  'Salinan IMG_1062.JPG.webp',
  'Salinan IMG_1081.webp',
  'Salinan IMG_1090.JPG.webp',
  'Salinan IMG_1116.webp',
  'Salinan IMG_1150.JPG.webp',
  'Salinan IMG_1163.JPG.webp',
  'Salinan IMG_1168.JPG.webp',
  'Salinan IMG_1178.JPG.webp',
  'Salinan IMG_1186.JPG.webp',
  'Salinan IMG_1191.JPG.webp',
] as const

const galleryPhotos = galleryFiles.map((file, index) => ({
  id: file,
  alt: `Foto prewedding ${index + 1}`,
  displaySrc: encodeURI(`/images/optimized/galery/${file}`),
  thumbSrc: encodeURI(`/images/optimized/galery/thumbs/${file}`),
}))

const topGalleryImages = galleryPhotos.slice(0, 8)
const bottomGalleryImages = galleryPhotos.slice(8, 16)

type LightboxGroup = 'top' | 'bottom'

type LightboxState = {
  group: LightboxGroup
  index: number
} | null

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const [mounted, setMounted] = useState(false)
  const activePhoto = topGalleryImages[activeIndex]
  const lightboxImages =
    lightbox?.group === 'top' ? topGalleryImages : bottomGalleryImages
  const lightboxPhoto = lightbox === null ? null : lightboxImages[lightbox.index]

  function showPrevious() {
    setLightbox((current) => {
      if (current === null) return current

      const images =
        current.group === 'top' ? topGalleryImages : bottomGalleryImages

      return {
        ...current,
        index: (current.index - 1 + images.length) % images.length,
      }
    })
  }

  function showNext() {
    setLightbox((current) => {
      if (current === null) return current

      const images =
        current.group === 'top' ? topGalleryImages : bottomGalleryImages

      return {
        ...current,
        index: (current.index + 1) % images.length,
      }
    })
  }

  function closeLightbox() {
    setLightbox(null)
  }

  useEffect(() => {
    if (lightbox !== null) return

    const timer = window.setInterval(() => {
      if (document.hidden) return

      setActiveIndex((current) => (current + 1) % topGalleryImages.length)
    }, 5000)

    return () => {
      window.clearInterval(timer)
    }
  }, [activeIndex, lightbox])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (lightbox === null) return

    const scrollY = window.scrollY
    const previousPosition = document.body.style.position
    const previousTop = document.body.style.top
    const previousLeft = document.body.style.left
    const previousRight = document.body.style.right
    const previousWidth = document.body.style.width
    const previousOverflow = document.body.style.overflow

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = previousPosition
      document.body.style.top = previousTop
      document.body.style.left = previousLeft
      document.body.style.right = previousRight
      document.body.style.width = previousWidth
      document.body.style.overflow = previousOverflow
      window.scrollTo(0, scrollY)
    }
  }, [lightbox !== null])

  useEffect(() => {
    if (lightbox === null) return


    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox])

  const lightboxPortal = mounted
    ? createPortal(
        <AnimatePresence>
          {lightboxPhoto ? (
            <motion.div
              className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center bg-[#120b08]/94 px-4 py-6 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Galeri foto layar penuh"
              onClick={closeLightbox}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  closeLightbox()
                }}
                aria-label="Tutup galeri"
                className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-ivory/18 bg-ivory/10 text-ivory outline-none transition hover:bg-ivory/18 focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrevious()
                }}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/18 bg-ivory/10 text-ivory outline-none transition hover:bg-ivory/18 focus-visible:ring-2 focus-visible:ring-gold/60 sm:left-5"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>

              <motion.div
                key={lightboxPhoto.id}
                initial={{ opacity: 0.84, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative h-[82dvh] w-full max-w-5xl"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={lightboxPhoto.displaySrc}
                  alt={lightboxPhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/18 bg-ivory/10 text-ivory outline-none transition hover:bg-ivory/18 focus-visible:ring-2 focus-visible:ring-gold/60 sm:right-5"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>

              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-ivory/14 bg-ivory/10 px-4 py-2 text-sm tabular-nums text-ivory/90">
                {(lightbox?.index ?? 0) + 1} / {lightboxImages.length}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null

  return (
    <>
      <section
        id="gallery"
        className="ornamental-section paper-texture relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24"
        aria-label="Galeri foto"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(216,187,133,0.18),transparent_26rem),radial-gradient(circle_at_10%_86%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.08),rgba(232,223,201,0.14)_52%,rgba(245,241,231,0.10))]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <JavaOrnamentDivider className="mb-6 py-0 [&_img]:!w-[min(50vw,10rem)] [&_img]:!opacity-70 sm:mb-7 sm:[&_img]:!w-[12rem]" />
          <SectionHeading subtitle="Moments" title="Galeri" />
          <div
            className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/42 to-gold/24" />
            <span className="size-2.5 rotate-45 rounded-[2px] border border-gold/55 bg-ivory shadow-[0_0_0_4px_rgba(255,248,236,0.35)]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/42 to-gold/24" />
          </div>

        <div className="mt-11">
          <motion.button
            type="button"
            key={activePhoto.id}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            onClick={() => setLightbox({ group: 'top', index: activeIndex })}
            className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border border-gold/24 bg-espresso/10 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:aspect-[16/9]"
            aria-label={`Buka ${activePhoto.alt}`}
          >
            <Image
              src={activePhoto.displaySrc}
              alt={activePhoto.alt}
              fill
              priority
              sizes="(max-width: 640px) 92vw, 960px"
              className="object-cover sepia-[0.08] saturate-[0.95] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.018]"
            />
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(43,26,18,0.02),rgba(43,26,18,0.20))]" />
          </motion.button>

          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Pilih foto galeri"
          >
            {topGalleryImages.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Tampilkan ${photo.alt}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-md border bg-cream/50 outline-none transition sm:h-20 sm:w-16 ${
                  activeIndex === index
                    ? 'border-gold opacity-100 ring-2 ring-gold/35'
                    : 'border-gold/18 opacity-62 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-gold/45'
                }`}
              >
                <Image
                  src={photo.thumbSrc}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-2 gap-2 overflow-hidden sm:gap-3"
        >
          {bottomGalleryImages.map((photo, index) => (
            <div
              key={photo.id}
              className="relative min-w-0 overflow-hidden rounded-[10px] border border-gold/18 bg-espresso/8"
            >
              <button
                type="button"
                onClick={() => setLightbox({ group: 'bottom', index })}
                className="group relative block aspect-[2/3] h-full w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
                aria-label={`Buka ${photo.alt}`}
              >
                <Image
                  src={photo.thumbSrc}
                  alt={photo.alt}
                  fill
                  loading={index < 4 ? 'eager' : 'lazy'}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 44vw, 460px"
                  className="object-contain sepia-[0.08] saturate-[0.95] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(216,187,133,0.04),rgba(62,39,35,0.08))] opacity-70 mix-blend-multiply" />
              </button>
            </div>
          ))}
        </motion.div>
        </div>
      </section>
      {lightboxPortal}
    </>
  )
}
