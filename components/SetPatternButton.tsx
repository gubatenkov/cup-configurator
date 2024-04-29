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
  const { canvas } = useFabricCanvas()

  const handleClick = () => {
    if (!canvas) return

    // Clear canvas background
    canvas.setBackgroundImage(
      null as unknown as Image,
      canvas.renderAll.bind(canvas)
    )

    // Add new canvas background
    canvas.setBackgroundColor(
      { source: imageUrl, repeat: 'repeat' } as Pattern,
      canvas.renderAll.bind(canvas)
    )
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
