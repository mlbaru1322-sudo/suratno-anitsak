'use client'

import { useEffect, useMemo, useState } from 'react'
import { Copy, Loader2, RotateCcw, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
} from '@/components/admin/admin-shell'
import {
  createDefaultMessageTemplateIfMissing,
  getActiveMessageTemplate,
  updateMessageTemplate,
} from '@/lib/services/wedding-service'
import type { MessageTemplate } from '@/lib/types/wedding'
import { weddingData } from '@/lib/wedding-data'

const defaultTemplateTitle = 'Undangan WhatsApp Utama'

const defaultTemplateContent = `Kepada Yth.
Bapak/Ibu/Saudara/i
{nama_tamu}

Assalamu'alaikum Wr. Wb.

Bismillahirrahmanirrahim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

Anitsak Nur Anggraini, S.Ak
&
Suratno

Berikut link untuk informasi lengkap acara kami:

{link_undangan}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Wassalamu'alaikum Wr. Wb.

Terima kasih.

Hormat kami,
Anitsak & Suratno

Catatan:
Simpan nomor ini jika link tidak dapat disentuh, atau salin link ke Chrome/browser untuk membuka undangan.`

const variables = [
  { token: '{nama_tamu}', description: 'Nama penerima undangan' },
  { token: '{link_undangan}', description: 'Link undangan personal' },
  { token: '{nama_pria}', description: 'Nama lengkap mempelai pria' },
  { token: '{nama_wanita}', description: 'Nama lengkap mempelai wanita' },
  { token: '{nama_pendek}', description: 'Nama pendek pasangan' },
]

export default function AdminMessageTemplatePage() {
  const [template, setTemplate] = useState<MessageTemplate | null>(null)
  const [title, setTitle] = useState(defaultTemplateTitle)
  const [content, setContent] = useState(defaultTemplateContent)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [creatingDefault, setCreatingDefault] = useState(false)

  useEffect(() => {
    async function loadTemplate() {
      try {
        const activeTemplate = await getActiveMessageTemplate()

        if (activeTemplate) {
          setTemplate(activeTemplate)
          setTitle(activeTemplate.title)
          setContent(activeTemplate.content)
        }
      } catch {
        setTemplate(null)
      } finally {
        setLoading(false)
      }
    }

    void loadTemplate()
  }, [])

  const preview = useMemo(() => renderPreview(content), [content])

  async function handleSave() {
    if (!title.trim()) {
      toast.error('Judul template wajib diisi')
      return
    }

    if (!content.trim()) {
      toast.error('Isi template wajib diisi')
      return
    }

    setSaving(true)

    try {
      let savedTemplate: MessageTemplate | null

      if (template) {
        savedTemplate = await updateMessageTemplate(template.id, {
          title,
          content,
          is_active: true,
        })
      } else {
        savedTemplate = await createDefaultMessageTemplateIfMissing({
          title,
          content,
          is_active: true,
        })
      }

      if (savedTemplate) {
        setTemplate(savedTemplate)
        setTitle(savedTemplate.title)
        setContent(savedTemplate.content)
      }

      toast.success('Template berhasil disimpan')
    } catch (error) {
      toast.error('Template gagal disimpan', {
        description:
          error instanceof Error
            ? error.message
            : 'Periksa RLS policy message_templates.',
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleCreateDefault() {
    setCreatingDefault(true)

    try {
      const savedTemplate = await createDefaultMessageTemplateIfMissing({
        title: defaultTemplateTitle,
        content: defaultTemplateContent,
        is_active: true,
      })

      if (savedTemplate) {
        setTemplate(savedTemplate)
        setTitle(savedTemplate.title)
        setContent(savedTemplate.content)
        toast.success('Template default siap digunakan')
      } else {
        setTitle(defaultTemplateTitle)
        setContent(defaultTemplateContent)
        toast.success('Template default dimuat di form')
      }
    } catch (error) {
      toast.error('Template default gagal dibuat', {
        description:
          error instanceof Error
            ? error.message
            : 'Periksa RLS policy message_templates.',
      })
    } finally {
      setCreatingDefault(false)
    }
  }

  function resetToDefault() {
    setTitle(defaultTemplateTitle)
    setContent(defaultTemplateContent)
    toast.success('Template default dimuat')
  }

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(preview)
      toast.success('Preview pesan disalin')
    } catch {
      toast.error('Preview gagal disalin')
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Template Pesan WhatsApp"
        description="Edit template aktif untuk preview pesan manual di daftar tamu. Belum ada blast otomatis."
      />

      {loading ? (
        <EmptyState message="Memuat template pesan aktif..." />
      ) : !template ? (
        <AdminCard className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-espresso">
                Template aktif belum ada
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Buat template default atau isi form di bawah lalu simpan.
              </p>
            </div>
            <Button
              type="button"
              className="gap-2"
              disabled={creatingDefault}
              onClick={handleCreateDefault}
            >
              {creatingDefault ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <RotateCcw className="size-4" aria-hidden="true" />
              )}
              Buat Default
            </Button>
          </div>
        </AdminCard>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
        <div className="grid gap-6">
          <AdminCard>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="template-title">Judul template</Label>
                <Input
                  id="template-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Undangan WhatsApp Utama"
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-content">Isi template</Label>
                <Textarea
                  id="template-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="min-h-[28rem] font-mono text-sm leading-relaxed"
                  disabled={saving}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  className="gap-2"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Save className="size-4" aria-hidden="true" />
                  )}
                  Simpan Template
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  disabled={saving}
                  onClick={resetToDefault}
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Reset ke Default
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={copyPreview}
                >
                  <Copy className="size-4" aria-hidden="true" />
                  Copy Preview
                </Button>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Variable tersedia
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {variables.map((variable) => (
                <div
                  key={variable.token}
                  className="rounded-2xl border bg-muted/30 p-3"
                >
                  <code className="text-sm font-semibold text-espresso">
                    {variable.token}
                  </code>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {variable.description}
                  </p>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Preview Pesan
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-espresso">
                Bapak Hadi Sekeluarga
              </h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={copyPreview}
            >
              <Copy className="size-4" aria-hidden="true" />
              Copy
            </Button>
          </div>
          <pre className="mt-4 max-h-[42rem] overflow-auto whitespace-pre-wrap rounded-2xl border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
            {preview}
          </pre>
        </AdminCard>
      </div>
    </>
  )
}

function renderPreview(template: string) {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const link = `${origin}/?to=${encodeURIComponent('Bapak Hadi Sekeluarga')}`

  return template
    .replaceAll('{nama_tamu}', 'Bapak Hadi Sekeluarga')
    .replaceAll('{link_undangan}', link)
    .replaceAll('{nama_pria}', weddingData.groom.name)
    .replaceAll('{nama_wanita}', weddingData.bride.name)
    .replaceAll('{nama_pendek}', weddingData.coupleShort)
}
