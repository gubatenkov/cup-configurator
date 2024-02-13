'use client'

import type { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </TooltipProvider>
  )
}
