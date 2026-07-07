import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Montserrat,
  Pinyon_Script,
} from 'next/font/google'
import './globals.css'

const fontScript = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const fontSerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-premium',
  display: 'swap',
})

const fontSans = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-premium',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Undangan Pernikahan Anitsak & Suratno',
  description:
    'Undangan pernikahan Anitsak dan Suratno. Kami mengundang Anda untuk hadir dan memberikan doa terbaik.',
  openGraph: {
    title: 'Undangan Pernikahan Anitsak & Suratno',
    description:
      'Undangan pernikahan Anitsak dan Suratno. Kami mengundang Anda untuk hadir dan memberikan doa terbaik.',
    siteName: 'Undangan Pernikahan Anitsak & Suratno',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Undangan Pernikahan Anitsak & Suratno',
    description:
      'Undangan pernikahan Anitsak dan Suratno. Kami mengundang Anda untuk hadir dan memberikan doa terbaik.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background" suppressHydrationWarning>
      <body
        className={`${fontScript.variable} ${fontSerif.variable} ${fontSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
