'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  AlertTriangle,
  CalendarHeart,
  Home,
  LogOut,
  MessageSquareText,
  UsersRound,
} from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Overview', icon: Home },
  { href: '/admin/wedding', label: 'Data Undangan', icon: CalendarHeart },
  { href: '/admin/wishes', label: 'RSVP & Ucapan', icon: MessageSquareText },
  { href: '/admin/guests', label: 'Tamu', icon: UsersRound },
  {
    href: '/admin/message-template',
    label: 'Template Pesan',
    icon: MessageSquareText,
  },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setCheckingSession(false)
      return
    }

    const supabase = createSupabaseBrowserClient()
    let mounted = true

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!mounted) return

      if (!user) {
        router.replace('/admin/login')
        return
      }

      setUserEmail(user.email ?? null)
      setCheckingSession(false)
    }

    void checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace('/admin/login')
        return
      }

      setUserEmail(session.user.email ?? null)
      setCheckingSession(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [isLoginPage, router])

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster position="top-center" />
      </>
    )
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 text-center text-sm text-muted-foreground">
        Memeriksa sesi admin...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-2xl font-semibold text-espresso">
                Wedding Admin
              </h1>
              <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-gold">
                Dev Admin
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="size-4 text-gold" aria-hidden="true" />
              Area admin sudah memakai Supabase Auth. Lengkapi policy production
              sebelum live.
            </p>
            {userEmail ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Login sebagai {userEmail}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
                      active
                        ? 'border-gold/50 bg-gold/15 text-espresso'
                        : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <Button
              type="button"
              variant="outline"
              className="w-fit gap-2"
              onClick={handleLogout}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  )
}

export function AdminPageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-3xl font-semibold text-espresso">
        {title}
      </h2>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-background p-5 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed bg-muted/30 px-5 py-10 text-center text-sm text-muted-foreground">
      {message}
    </div>
  )
}
