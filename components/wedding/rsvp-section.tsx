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
import { CornerOrnament, SectionOrnaments } from './ornaments'

type Attendance = 'hadir' | 'tidak' | 'ragu'

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
      className="ornamental-section bg-layered-ivory px-5 py-20 sm:px-6 sm:py-24"
      aria-label="Konfirmasi kehadiran"
    >
      <SectionOrnaments />
      <div className="mx-auto max-w-xl">
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
            className="ornate-card space-y-6 rounded-[2rem] px-7 py-9 sm:px-10"
          >
            <div className="space-y-2">
              <Label htmlFor="rsvp-name" className="text-espresso">
                Nama
              </Label>
              <Input
                id="rsvp-name"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className="h-12 rounded-2xl border-gold/35 bg-ivory/70 px-4"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-espresso">Kehadiran</Label>
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
                    className="flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border border-gold/30 bg-ivory/60 px-4 py-3 text-sm text-espresso transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/15"
                  >
                    <RadioGroupItem id={`att-${opt.value}`} value={opt.value} />
                    {opt.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvp-guests" className="text-espresso">
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
                className="h-12 rounded-2xl border-gold/35 bg-ivory/70 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvp-message" className="text-espresso">
                Ucapan & Doa
              </Label>
              <Textarea
                id="rsvp-message"
                disabled={isSubmitting}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik Anda"
                rows={4}
                className="rounded-2xl border-gold/35 bg-ivory/70 px-4 py-3"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="gold-button min-h-12 w-full gap-2 rounded-full bg-gold text-espresso hover:bg-gold-soft"
            >
              <Send className="size-4" aria-hidden="true" />
              {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </Button>

            <CornerOrnament className="absolute left-4 top-4 w-14 opacity-55" />
            <CornerOrnament className="absolute bottom-4 right-4 w-14 rotate-180 opacity-55" />
          </form>
        </Reveal>
      </div>
    </section>
  )
}
