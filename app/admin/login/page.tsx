'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LockKeyhole } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.access_token) {
        const sessionEstablished = await establishAdminServerSession(
          session.access_token,
        )

        if (sessionEstablished) {
          router.replace(getNextAdminPath())
          return
        }

        await supabase.auth.signOut()
        await clearAdminServerSession()
        setCheckingSession(false)
        return
      }

      setCheckingSession(false)
    }

    void checkExistingSession()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const {
        data: { session },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError) {
        throw signInError
      }

      if (!session?.access_token) {
        throw new Error('Session login tidak tersedia. Silakan coba lagi.')
      }

      const sessionEstablished = await establishAdminServerSession(
        session.access_token,
      )

      if (!sessionEstablished) {
        await supabase.auth.signOut()
        await clearAdminServerSession()
        throw new Error('Sesi admin tidak dapat dibuat. Silakan coba lagi.')
      }

      toast.success('Login berhasil')
      router.replace(getNextAdminPath())
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Login gagal. Periksa email dan password.'
      setError(message)
      toast.error('Login gagal', {
        description: message,
      })
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 text-sm text-muted-foreground">
        Memeriksa sesi admin...
      </div>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
            <LockKeyhole className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-espresso">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Admin Undangan Rahayu & Mardian
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              disabled={loading}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
              className="h-11"
            />
          </div>

          {error ? (
            <p className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="h-11 w-full gap-2" disabled={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <LockKeyhole className="size-4" aria-hidden="true" />
            )}
            Masuk
          </Button>
        </form>
      </section>
    </main>
  )
}

function getNextAdminPath() {
  if (typeof window === 'undefined') return '/admin'

  const nextPath = new URLSearchParams(window.location.search).get('next')

  if (!nextPath?.startsWith('/admin') || nextPath.startsWith('/admin/login')) {
    return '/admin'
  }

  return nextPath
}

async function establishAdminServerSession(accessToken: string) {
  const response = await fetch('/api/admin/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
  })

  return response.ok
}

async function clearAdminServerSession() {
  await fetch('/api/admin/session', { method: 'DELETE' })
}
