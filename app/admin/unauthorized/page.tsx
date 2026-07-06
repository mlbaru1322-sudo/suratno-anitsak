import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export default function AdminUnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border bg-background p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive">
          <ShieldAlert className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-espresso">
          Akses Ditolak
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Akun Supabase ini berhasil login, tetapi belum terdaftar sebagai
          admin undangan.
        </p>
        <Link
          href="/admin/login"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Kembali ke Login
        </Link>
      </section>
    </main>
  )
}
