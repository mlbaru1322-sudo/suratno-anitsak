'use client'

import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { type WeddingData } from '@/lib/wedding-data'
import {
  isSupabaseConfigured,
  submitWeddingWish,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'

function FormDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/45 to-gold/20" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/55 bg-ivory" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/45 to-gold/20" />
    </div>
  )
}

export function RsvpSection({ data }: { data?: WeddingData }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const guestName = data?.guest.name?.trim()
    const genericGuest = data?.guest.recipient?.trim()

    if (!name && guestName && guestName !== genericGuest) {
      setName(guestName)
    }
  }, [data?.guest.name, data?.guest.recipient, name])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const guestName = name.trim()
    const cleanMessage = message.trim()

    if (!guestName) {
      toast.error('Nama tamu wajib diisi')
      return
    }

    if (!cleanMessage) {
      toast.error('Ucapan dan doa wajib diisi')
      return
    }

    setIsSubmitting(true)
    setSubmitted(false)

    try {
      await submitWeddingWish({
        guest_name: guestName,
        message: cleanMessage,
      })

      toast.success('Ucapan terkirim', {
        description: isSupabaseConfigured()
          ? 'Terima kasih, ucapan dan doa Anda sudah kami terima.'
          : 'Mode demo aktif karena env Supabase belum diisi.',
      })

      window.dispatchEvent(new Event('wedding-wish-submitted'))
      setMessage('')
      setSubmitted(true)
    } catch (error) {
      toast.error('Ucapan gagal dikirim', {
        description:
          error instanceof Error
            ? error.message
            : 'Silakan coba beberapa saat lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="ornamental-section relative overflow-hidden bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Ucapan dan doa"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.42),transparent_28rem),radial-gradient(circle_at_12%_88%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.16),rgba(216,187,133,0.10)_48%,rgba(245,241,231,0.18))]" />
      <div className="relative z-10 mx-auto max-w-xl">
        <SectionHeading subtitle="Guestbook" title="Ucapan & Doa" />

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-md text-center">
          <p className="text-sm leading-relaxed text-taupe">
            Tuliskan ucapan dan doa terbaik untuk kedua mempelai.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[14px] border border-gold/35 bg-ivory/78 px-5 py-8 shadow-[0_18px_46px_-36px_rgba(43,26,18,0.76),inset_0_1px_0_rgba(255,255,255,0.58)] sm:px-8 sm:py-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.18),transparent_14rem),linear-gradient(135deg,rgba(255,248,236,0.50),transparent_42%,rgba(90,59,46,0.08))]" />
            <div className="pointer-events-none absolute inset-3 rounded-[10px] border border-gold/18" />

            <div className="relative space-y-6">
              <FormDivider />

              {submitted ? (
                <div
                  className="rounded-[12px] border border-gold/28 bg-cream/45 px-4 py-4 text-center"
                  aria-live="polite"
                >
                  <p className="font-serif text-xl font-semibold text-espresso">
                    Terima kasih
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-taupe">
                    Ucapan dan doa Anda telah kami terima.
                  </p>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label
                  htmlFor="wish-name"
                  className="text-sm font-medium text-espresso"
                >
                  Nama Tamu
                </Label>
                <Input
                  id="wish-name"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="h-12 rounded-[10px] border-gold/35 bg-cream/48 px-4 text-espresso placeholder:text-taupe/60 focus-visible:border-gold/70 focus-visible:ring-gold/20 disabled:bg-cream/35 disabled:text-taupe"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="wish-message"
                  className="text-sm font-medium text-espresso"
                >
                  Ucapan & Doa
                </Label>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute right-4 top-2 font-serif text-7xl leading-none text-gold/10"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <Textarea
                    id="wish-message"
                    required
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                    rows={6}
                    className="min-h-40 rounded-[10px] border-gold/35 bg-cream/48 px-4 py-3 text-espresso leading-relaxed placeholder:text-taupe/60 focus-visible:border-gold/70 focus-visible:ring-gold/20 disabled:bg-cream/35 disabled:text-taupe"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 w-full gap-2 rounded-[10px] border border-gold/45 bg-espresso px-5 text-sm font-medium uppercase tracking-[0.1em] text-ivory shadow-[0_12px_28px_-24px_rgba(43,26,18,0.82)] transition-colors hover:bg-batik-brown disabled:bg-espresso/60 disabled:text-ivory/80"
              >
                <Send className="size-4" aria-hidden="true" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
