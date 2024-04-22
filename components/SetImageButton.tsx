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
  // const { fabricCanvas } = useFabricCanvas()

  return (
    <ImageButton
      onClick={() => console.log('handle click')}
      imageUrl={imageUrl}
      index={index}
    />
  )
}
