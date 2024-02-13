'use client'

import { buttonVariants } from '@/components/ui/button'
import { useFabricCanvas } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { fabric } from 'fabric'
import Image from 'next/image'

export default function ImageButton({ index }: { index: number }) {
  const { fabricCanvas, isMounted } = useFabricCanvas('.canvas-wrapper')
  const imageUrl = `/assets/images/image${index + 1}.png`

  const handleClick = () => {
    isMounted &&
      fabric.Image.fromURL(imageUrl, (image) => {
        image.scale(0.5)
        fabricCanvas.centerObject(image)
        fabricCanvas.add(image)
      })
  }

  return (
    <button
      className={cn(
        buttonVariants({ variant: 'default' }),
        'relative h-full w-full overflow-hidden'
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
