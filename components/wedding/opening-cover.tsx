'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weddingData, type WeddingData } from '@/lib/wedding-data'

export function OpeningCover({
  data = weddingData,
  open,
  onOpen,
}: {
  data?: WeddingData
  open: boolean
  onOpen: () => void
}) {
  const { coupleShort, guest } = data
  const [isOpened, setIsOpened] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!open) {
      setHidden(false)
      return
    }

    const timer = window.setTimeout(() => setHidden(true), 5800)
    return () => window.clearTimeout(timer)
  }, [open])

  function handleOpenClick() {
    if (isOpened) return

    setIsOpened(true)
    onOpen()
  }

  if (hidden) return null

  return (
    <motion.section
      className={`fixed inset-0 mx-auto z-50 h-[100dvh] w-full max-w-[480px] overflow-hidden bg-[#1a0f0a] shadow-2xl ${
        open ? 'pointer-events-none' : ''
      }`}
      initial={false}
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 1.2, delay: open ? 4.5 : 0, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Sampul undangan"
    >
      {/* Background Pemandangan (z-0) - DIKUNCI */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/reference-video-opening/images/landscape-background.jpg" 
              alt="Landscape Background"
              className="absolute inset-0 w-full h-full object-cover object-bottom" 
            />
            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* LAYER GAPURA UKIRAN (z-30) */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none origin-center"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: isOpened ? 8 : 1, opacity: isOpened ? 0 : 1 }}
            transition={{ delay: 2, duration: 3, ease: 'easeIn' }}
          >
            {/* Frame Atas */}
            <img 
              src="/assets/java_vintage_frame_TRANSPARENT_FIXED.png" 
              alt="" 
              className="absolute top-0 left-0 w-full h-auto opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" 
            />
            {/* Frame Bawah */}
            <img 
              src="/assets/java_vintage_frame_TRANSPARENT_FIXED.png" 
              alt="" 
              className="absolute bottom-0 left-0 w-full h-auto opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] rotate-180" 
            />
          </motion.div>

          {/* LAYER WAYANG KIRI & KANAN (z-40) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] max-w-[380px] z-40 pointer-events-none">
            {/* Wayang Kiri */}
            <motion.img
              src="/assets/java_vintage_wayang_rama_sinta_TRANSPARENT_FIXED.png" 
              alt="Wayang Kiri" 
              className="absolute inset-0 w-full h-auto opacity-75 sepia-[.2] drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
              style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
              initial={{ x: '0%' }}
              animate={{ x: isOpened ? "-100%" : "0%" }}
              transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
            />

            {/* Wayang Kanan */}
            <motion.img
              src="/assets/java_vintage_wayang_rama_sinta_TRANSPARENT_FIXED.png" 
              alt="Wayang Kanan" 
              className="absolute inset-0 w-full h-auto opacity-75 sepia-[.2] drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
              style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
              initial={{ x: '0%' }}
              animate={{ x: isOpened ? "100%" : "0%" }}
              transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
            />
            
            {/* Invisible image to maintain container aspect ratio */}
            <img 
                src="/assets/java_vintage_wayang_rama_sinta_TRANSPARENT_FIXED.png" 
                alt="" 
                className="w-full h-auto opacity-0"
            />
          </div>

          {/* LAYER TEKS & TOMBOL (z-50) */}
          <div className="absolute inset-0 z-50 flex h-full min-h-0 flex-col items-center justify-center px-5 text-center sm:px-6 py-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpened ? 0 : 1 }}
              transition={{ duration: 1 }}
              className={`flex w-full max-w-[22rem] flex-col items-center sm:max-w-md pointer-events-auto ${isOpened ? 'pointer-events-none' : ''}`}
            >
              <p className="mb-4 text-[0.62rem] uppercase tracking-[0.32em] text-[#d4c4a8]/88 sm:text-xs">
                Wedding Invitation
              </p>

              <h1 className="font-serif text-[clamp(2.4rem,10vw,3.25rem)] font-medium leading-[0.95] text-[#f5f1e7] text-balance drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
                {coupleShort}
              </h1>

              {/* Jarak spasi vertikal ke kotak Kepada Yth */}
              <div className="h-10 sm:h-12" aria-hidden="true" />

              <div className="w-full max-w-[18rem] rounded-xl border border-[#d8bb85]/20 bg-[rgba(38,23,15,0.15)] px-6 py-5 shadow-[0_18px_48px_-34px_rgba(0,0,0,0.9)] backdrop-blur-[4px]">
                <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#c9b89a]/80">
                  {guest.label}
                </p>
                <p className="mt-2.5 font-serif text-[1.35rem] font-medium leading-snug text-[#f0e8d8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {guest.name}
                </p>
              </div>

              <p className="mt-4 max-w-[16rem] text-[0.58rem] leading-relaxed text-[#a89478]/85">
                Mohon maaf apabila ada kesalahan penulisan nama/gelar.
              </p>

              <button
                onClick={handleOpenClick}
                className="mt-6 inline-flex min-h-[48px] w-[80%] max-w-[14rem] items-center justify-center rounded-[8px] border border-[#a6803c] bg-[linear-gradient(135deg,rgba(232,223,201,0.95),rgba(201,169,110,0.9))] px-6 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#3b281d] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Buka Undangan
              </button>
            </motion.div>
          </div>
      </motion.section>
  )
}
