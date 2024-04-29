'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Panels() {
  const panels = useStore((state) => state.panels)

  return (
    Object.values(panels)
      // Sort by id in ascending order
      .sort((a, b) => a.id - b.id)
      .map(({ label, path, id }) => (
        <Card className="h-full w-full" key={id}>
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex h-full w-full items-center justify-center text-base'
            )}
            href={`/${path}`}
          >
            {label}
          </Link>
        </Card>
      ))
  )
}
