'use client'

import ImageButton from '@/components/ImageButton'
// import { useFabricCanvas } from '@/lib/hooks'
// import { fabric } from 'fabric'

export default function SetImageButton({
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
