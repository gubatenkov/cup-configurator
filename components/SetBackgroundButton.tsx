'use client'

import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'
import { fabric } from 'fabric'

export default function SetBackgroundButton({
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
      canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
        scaleY: (canvas.height ?? 1) / (image.height ?? 1),
        scaleX: (canvas.width ?? 1) / (image.width ?? 1),
      })
    })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
