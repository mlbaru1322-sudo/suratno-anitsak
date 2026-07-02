'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

const frameStyles = [
  'row-span-3 rounded-t-[3rem] rounded-b-[1.25rem] rotate-[-0.7deg] sm:col-span-2 sm:row-span-4',
  'row-span-2 rounded-[1.35rem] rotate-[0.6deg] sm:col-span-2 sm:row-span-3',
  'row-span-3 rounded-t-[2.5rem] rounded-b-[1.15rem] rotate-[0.4deg] sm:col-span-2 sm:row-span-4',
  'row-span-2 rounded-[1.25rem] rotate-[-0.4deg] sm:col-span-2 sm:row-span-3',
  'row-span-2 rounded-t-[2.75rem] rounded-b-[1.2rem] rotate-[0.7deg] sm:col-span-2 sm:row-span-3',
  'row-span-3 rounded-[1.35rem] rotate-[-0.6deg] sm:col-span-2 sm:row-span-4',
  'row-span-2 rounded-t-[2.25rem] rounded-b-[1.1rem] rotate-[0.45deg] sm:col-span-2 sm:row-span-3',
  'row-span-3 rounded-[1.35rem] rotate-[-0.35deg] sm:col-span-2 sm:row-span-4',
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
        <div
          className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/42 to-gold/24" />
          <span className="size-2.5 rotate-45 rounded-[2px] border border-gold/55 bg-ivory shadow-[0_0_0_4px_rgba(255,248,236,0.35)]" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/42 to-gold/24" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-11 grid auto-rows-[5.6rem] grid-cols-2 grid-flow-dense gap-3 sm:auto-rows-[4.6rem] sm:grid-cols-6 sm:gap-4 md:auto-rows-[5.2rem]"
        >
          {gallery.map((src, index) => (
            <motion.figure
              key={src}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`group relative min-w-0 overflow-hidden border-[7px] border-ivory bg-ivory shadow-[0_22px_52px_-40px_rgba(43,26,18,0.78),0_0_0_1px_rgba(185,151,107,0.34)] transition-transform duration-500 hover:rotate-0 ${frameStyles[index % frameStyles.length]}`}
            >
              <span className="pointer-events-none absolute inset-2 z-10 rounded-[inherit] border border-gold/22" />
              {index === 0 || index === 3 || index === 5 ? (
                <>
                  <span className="pointer-events-none absolute left-3 bottom-3 z-20 h-10 w-10 border-b border-l border-gold/38" />
                  <span className="pointer-events-none absolute right-3 top-3 z-20 h-10 w-10 border-r border-t border-gold/38" />
                </>
              ) : null}
              <Image
                src={src || '/placeholder.svg'}
                alt={`Foto prewedding ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover sepia-[0.16] saturate-[0.9] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.035] group-active:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(216,187,133,0.16),rgba(90,59,46,0.08))] mix-blend-multiply" />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/6" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
