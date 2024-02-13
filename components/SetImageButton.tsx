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
  const { fabricCanvas, isMounted } = useFabricCanvas()

  const handleClick = () => {
    isMounted &&
      fabric.Image.fromURL(imageUrl, (image) => {
        image.scale(0.5)
        fabricCanvas.centerObject(image)
        fabricCanvas.add(image)
      })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
