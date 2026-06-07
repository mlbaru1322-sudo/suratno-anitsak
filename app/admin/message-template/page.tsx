'use client'

import { useEffect, useMemo, useState } from 'react'
import { getActiveMessageTemplate } from '@/lib/services/wedding-service'
import type { MessageTemplate } from '@/lib/types/wedding'
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
} from '@/components/admin/admin-shell'

export default function AdminMessageTemplatePage() {
  const [template, setTemplate] = useState<MessageTemplate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTemplate() {
      try {
        setTemplate(await getActiveMessageTemplate())
      } catch {
        setTemplate(null)
      } finally {
        setLoading(false)
      }
    }

    void loadTemplate()
  }, [])

  const preview = useMemo(() => {
    if (!template) return ''

    return template.content
      .replaceAll('{nama_tamu}', 'Bapak Hadi Sekeluarga')
      .replaceAll('{link_undangan}', 'https://contoh-domain.com/?to=bapak-hadi')
  }, [template])

  return (
    <>
      <AdminPageHeader
        title="Template Pesan WhatsApp"
        description="Preview read-only template aktif. Edit dan save akan dikerjakan di tahap berikutnya."
      />

      {loading ? (
        <EmptyState message="Memuat template pesan aktif..." />
      ) : !template ? (
        <EmptyState message="Belum ada template aktif, env Supabase belum diisi, atau RLS belum mengizinkan read." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
          <AdminCard>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Template Aktif
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-espresso">
              {template.title}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Variable tersedia:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['{nama_tamu}', '{link_undangan}'].map((variable) => (
                <code
                  key={variable}
                  className="rounded-full border bg-muted px-3 py-1 text-xs"
                >
                  {variable}
                </code>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Preview
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
              {preview}
            </pre>
          </AdminCard>
        </div>
      )}
    </>
  )
}
