'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'
import { staggerContainer } from './motion-helpers'
import { CornerOrnament, SectionOrnaments } from './ornaments'

export function GallerySection() {
  const { gallery } = weddingData

  return (
    <section
      id="gallery"
      className="ornamental-section paper-texture px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Galeri foto"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-5xl">
        <SectionHeading subtitle="Moments" title="Galeri" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4"
        >
          {gallery.map((src, index) => (
            <motion.figure
              key={src}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={
                index === 0 || index === 5
                  ? 'group relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border-[6px] border-ivory outline outline-1 outline-gold/35 shadow-luxe sm:col-span-2 sm:row-span-2'
                  : 'group relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border-[6px] border-ivory outline outline-1 outline-gold/35 shadow-luxe sm:col-span-2'
              }
            >
              <CornerOrnament className="absolute left-1 top-1 z-10 w-10 text-champagne opacity-75" />
              <Image
                src={src || '/placeholder.svg'}
                alt={`Foto prewedding ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-105"
              />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
