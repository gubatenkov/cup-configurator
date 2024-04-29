'use client'

// import { Pattern, Image } from 'fabric/fabric-impl'
import ImageButton from '@/components/ImageButton'
// import { useFabricCanvas } from '@/lib/hooks'

export default function SetPatternButton({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) {
  // const { canvas } = useFabricCanvas()

  return (
    <ImageButton
      onClick={() => console.log('SetPatternButton click')}
      imageUrl={imageUrl}
      index={index}
    />
  )
}
