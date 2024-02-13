'use client'

import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Nav({
  prevPath,
  nextPath,
}: {
  prevPath: string
  nextPath: string
}) {
  const pathname = usePathname()

  if (pathname === '/') return

  return (
    <nav className="flex list-none items-center gap-2">
      <li>
        <Link
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-14 w-14 rounded-full'
          )}
          href={`/${prevPath}`}
        >
          <ArrowLeft size={24} />
        </Link>
      </li>
      <li>
        <Link
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-14 w-14 rounded-full'
          )}
          href={`/${nextPath}`}
        >
          <ArrowRight size={24} />
        </Link>
      </li>
    </nav>
  )
}
