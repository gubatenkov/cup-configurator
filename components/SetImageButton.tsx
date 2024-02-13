'use client'

import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'
import { fabric } from 'fabric'

export default function PasteImageButton({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) {
  const { fabricCanvas, isMounted } = useFabricCanvas('.canvas-wrapper')

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
