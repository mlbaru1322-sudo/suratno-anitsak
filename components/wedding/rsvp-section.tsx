'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  isSupabaseConfigured,
  submitWeddingWish,
} from '@/lib/services/wedding-service'
import { SectionHeading } from './section-heading'
import { Reveal } from './motion-helpers'

type Attendance = 'hadir' | 'tidak' | 'ragu'

function FormDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/20" />
      <span className="size-2 rotate-45 rounded-[2px] border border-gold/50 bg-ivory" />
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/20" />
    </div>
  )
}

export function RsvpSection() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('hadir')
  const [guests, setGuests] = useState('1')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const guestName = name.trim()
    const guestCount = Number(guests)

    if (!guestName) {
      toast.error('Nama wajib diisi')
      return
    }

    if (!attendance) {
      toast.error('Status kehadiran wajib dipilih')
      return
    }

    if (!Number.isFinite(guestCount) || guestCount < 1) {
      toast.error('Jumlah tamu minimal 1')
      return
    }

    setIsSubmitting(true)

    try {
      await submitWeddingWish({
        guest_name: guestName,
        attendance_status:
          attendance === 'hadir'
            ? 'Hadir'
            : attendance === 'tidak'
              ? 'Tidak Hadir'
              : 'Masih Ragu',
        guest_count: guestCount,
        message,
      })

      toast.success('Konfirmasi terkirim', {
        description: isSupabaseConfigured()
          ? 'Terima kasih, ucapan Anda sudah tersimpan.'
          : 'Mode demo aktif karena env Supabase belum diisi.',
      })

      window.dispatchEvent(new Event('wedding-wish-submitted'))
      setName('')
      setGuests('1')
      setMessage('')
      setAttendance('hadir')
    } catch (error) {
      toast.error('Konfirmasi gagal dikirim', {
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
      aria-label="Konfirmasi kehadiran"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,248,236,0.42),transparent_28rem),radial-gradient(circle_at_12%_88%,rgba(90,59,46,0.10),transparent_20rem),linear-gradient(180deg,rgba(245,241,231,0.16),rgba(216,187,133,0.10)_48%,rgba(245,241,231,0.18))]" />
      <div className="relative z-10 mx-auto max-w-xl">
        <SectionHeading subtitle="Konfirmasi Kehadiran" title="RSVP" />

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-md text-center">
          <p className="text-sm leading-relaxed text-taupe">
            Mohon berkenan mengisi konfirmasi kehadiran dan menitipkan doa
            terbaik untuk kami.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-b-[1.75rem] rounded-t-[3rem] border border-gold/35 bg-ivory/76 px-5 py-8 shadow-[0_22px_58px_-42px_rgba(43,26,18,0.76),inset_0_1px_0_rgba(255,255,255,0.58)] sm:px-8 sm:py-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,187,133,0.20),transparent_14rem),linear-gradient(135deg,rgba(255,248,236,0.48),transparent_42%,rgba(90,59,46,0.08))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

            <div className="relative space-y-6">
              <FormDivider />

              <div className="space-y-2">
                <Label htmlFor="rsvp-name" className="text-sm font-medium text-espresso">
                  Nama
                </Label>
                <Input
                  id="rsvp-name"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="h-12 rounded-xl border-gold/35 bg-cream/45 px-4 text-espresso placeholder:text-taupe/60 focus-visible:border-gold/70 focus-visible:ring-gold/20 disabled:bg-cream/35 disabled:text-taupe"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-espresso">Kehadiran</Label>
                <RadioGroup
                  value={attendance}
                  onValueChange={(v) => setAttendance(v as Attendance)}
                  disabled={isSubmitting}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {[
                    { value: 'hadir', label: 'Hadir' },
                    { value: 'tidak', label: 'Tidak Hadir' },
                    { value: 'ragu', label: 'Masih Ragu' },
                  ].map((opt) => (
                    <Label
                      key={opt.value}
                      htmlFor={`att-${opt.value}`}
                      className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-gold/30 bg-cream/42 px-4 py-3 text-sm leading-snug text-espresso transition-colors has-[:checked]:border-gold/70 has-[:checked]:bg-gold/16 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
                    >
                      <RadioGroupItem
                        id={`att-${opt.value}`}
                        value={opt.value}
                        className="border-gold/45 text-espresso focus-visible:border-gold/70 focus-visible:ring-gold/20 data-checked:border-gold data-checked:bg-espresso"
                      />
                      {opt.label}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rsvp-guests" className="text-sm font-medium text-espresso">
                  Jumlah Tamu
                </Label>
                <Input
                  id="rsvp-guests"
                  type="number"
                  min={1}
                  max={10}
                  disabled={isSubmitting}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-12 rounded-xl border-gold/35 bg-cream/45 px-4 text-espresso focus-visible:border-gold/70 focus-visible:ring-gold/20 disabled:bg-cream/35 disabled:text-taupe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rsvp-message" className="text-sm font-medium text-espresso">
                  Ucapan & Doa
                </Label>
                <Textarea
                  id="rsvp-message"
                  disabled={isSubmitting}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda"
                  rows={4}
                  className="min-h-32 rounded-xl border-gold/35 bg-cream/45 px-4 py-3 text-espresso placeholder:text-taupe/60 focus-visible:border-gold/70 focus-visible:ring-gold/20 disabled:bg-cream/35 disabled:text-taupe"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 w-full gap-2 rounded-xl border border-gold/55 bg-espresso px-5 text-sm font-medium uppercase tracking-[0.1em] text-ivory shadow-[0_14px_34px_-26px_rgba(43,26,18,0.82)] transition-colors hover:bg-batik-brown disabled:bg-espresso/60 disabled:text-ivory/80"
              >
                <Send className="size-4" aria-hidden="true" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
