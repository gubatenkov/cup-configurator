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
  const { fabricCanvas, isMounted } = useFabricCanvas('.canvas-wrapper')

  const handleClick = () => {
    isMounted &&
      fabric.Image.fromURL(imageUrl, (image) => {
        fabricCanvas.setBackgroundImage(
          image,
          fabricCanvas.renderAll.bind(fabricCanvas),
          {
            scaleY: (fabricCanvas.height ?? 1) / (image.height ?? 1),
            scaleX: (fabricCanvas.width ?? 1) / (image.width ?? 1),
          }
        )
      })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
