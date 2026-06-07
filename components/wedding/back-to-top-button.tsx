'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTopButton({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!active || !visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      className="fixed bottom-20 right-6 z-40 flex size-12 items-center justify-center rounded-full border border-gold/40 bg-ivory/90 text-espresso shadow-luxe backdrop-blur transition-colors hover:bg-cream"
    >
      <ChevronUp className="size-5" aria-hidden="true" />
    </button>
  )
}
