'use client'

import type { MouseEventHandler } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function ImageButton({
  onClick: handleClick,
  imageUrl,
  index,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  imageUrl: string
  index: number
}) {
  return (
    <button
      className={cn(
        buttonVariants({ variant: 'default' }),
        'relative h-full w-full overflow-hidden bg-background'
      )}
      onClick={handleClick}
      key={index}
    >
      <Image
        style={{
          objectFit: 'cover',
        }}
        sizes="(min-width: 1024px) 12.5vw"
        src={imageUrl}
        alt=""
        fill
      />
    </button>
  )
}
