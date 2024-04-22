import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import Configurator from '@/components/Configurator'
import { fontsPathsToPreload } from '@/lib/data'
import Providers from '@/components/Providers'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3D Cup Configurator',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {fontsPathsToPreload.map((path) => (
          <link
            crossOrigin="anonymous"
            rel="preload"
            href={path}
            key={path}
            as="font"
          />
        ))}
      </head>
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>
          <Header />
          {/* Hide configurator on all devices up to breakpoint :lg */}
          <main className="main mx-auto hidden h-[calc(100%-var(--nav-height))] w-full grid-cols-2 gap-4 p-4 lg:grid">
            <Configurator>{children}</Configurator>
          </main>
        </Providers>
      </body>
    </html>
  )
}
