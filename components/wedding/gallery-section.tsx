'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

const frameStyles = [
  'rounded-t-[3rem] rounded-b-[1.25rem] rotate-[-0.7deg]',
  'rounded-[1.35rem] rotate-[0.6deg]',
  'rounded-t-[2.5rem] rounded-b-[1.15rem] rotate-[0.4deg]',
  'rounded-[1.25rem] rotate-[-0.4deg]',
  'rounded-t-[2.75rem] rounded-b-[1.2rem] rotate-[0.7deg]',
  'rounded-[1.35rem] rotate-[-0.6deg]',
]

export function GallerySection() {
  const { gallery } = weddingData

  return (
    <section
      id="gallery"
      className="ornamental-section paper-texture relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Galeri foto"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(216,187,133,0.18),transparent_26rem),radial-gradient(circle_at_10%_86%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.08),rgba(232,223,201,0.14)_52%,rgba(245,241,231,0.10))]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading subtitle="Moments" title="Galeri" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4"
        >
          {gallery.map((src, index) => (
            <motion.figure
              key={src}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`group relative min-w-0 overflow-hidden border-[7px] border-ivory bg-ivory shadow-[0_22px_52px_-40px_rgba(43,26,18,0.78),0_0_0_1px_rgba(185,151,107,0.34)] transition-transform duration-500 hover:rotate-0 ${
                index === 0 || index === 5
                  ? 'aspect-[3/4] sm:col-span-2 sm:row-span-2'
                  : 'aspect-[3/4] sm:col-span-2'
              } ${frameStyles[index % frameStyles.length]}`}
            >
              <span className="pointer-events-none absolute inset-2 z-10 rounded-[inherit] border border-gold/22" />
              <Image
                src={src || '/placeholder.svg'}
                alt={`Foto prewedding ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-active:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(216,187,133,0.10),rgba(90,59,46,0.05))] mix-blend-multiply" />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/6" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
