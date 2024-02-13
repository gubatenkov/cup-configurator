'use client'

import { Pattern, Image } from 'fabric/fabric-impl'
import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'

export default function SetPatternButton({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) {
  const { fabricCanvas, isMounted } = useFabricCanvas()

  const handleClick = () => {
    if (!isMounted) return

    // Clear canvas background
    fabricCanvas.setBackgroundImage(
      null as unknown as Image,
      fabricCanvas.renderAll.bind(fabricCanvas)
    )
    // Add new canvas background
    fabricCanvas.setBackgroundColor(
      { source: imageUrl, repeat: 'repeat' } as Pattern,
      fabricCanvas.renderAll.bind(fabricCanvas)
    )
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
