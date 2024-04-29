'use client'

import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'
import { fabric } from 'fabric'

export default function SetImageButton({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) {
  const { canvas } = useFabricCanvas()

  const handleClick = () => {
    if (!canvas) return
    fabric.Image.fromURL(imageUrl, (image) => {
      image.scale(0.5)
      canvas.centerObject(image)
      canvas.add(image)
    })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
