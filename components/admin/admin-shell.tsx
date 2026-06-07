'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AlertTriangle, Home, MessageSquareText, UsersRound } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Overview', icon: Home },
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
              Area admin belum diproteksi auth. Gunakan untuk lokal/dev dulu.
            </p>
          </div>

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
