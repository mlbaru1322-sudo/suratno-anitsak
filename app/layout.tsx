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
  title: 'The Wedding of Rahayu & Mardian',
  description:
    'Undangan pernikahan Tri Rahayu & Mardian Ifan Rizkyadi. Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
