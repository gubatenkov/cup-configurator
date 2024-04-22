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
  // const { fabricCanvas } = useFabricCanvas()

  return (
    <ImageButton
      onClick={() => console.log('handle click')}
      imageUrl={imageUrl}
      index={index}
    />
  )
}
