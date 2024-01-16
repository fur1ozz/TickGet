import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/app/components/Header";
import { Providers } from './providers'


export const metadata: Metadata = {
  title: 'TickGet',
  description: 'Get you events in the best ticket selling site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <Providers>
              <Header />
              {children}
          </Providers>
      </body>
    </html>
  )
}
