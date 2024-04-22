'use client'

import type { ElementRef } from 'react'

// import { useFabricCanvas } from '@/lib/hooks'
import { PaperclipIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
// import { fabric } from 'fabric'

export default function UploadImageButton() {
  // const { isMounted: isCanvasMounted, fabricCanvas } = useFabricCanvas()
  const inputRef = useRef<ElementRef<'input'>>(null)

  return (
    <Card className="relative flex h-full w-full items-center justify-center">
      <input
        className="absolute h-full w-full cursor-pointer opacity-0"
        ref={inputRef}
        type="file"
      />
      <PaperclipIcon className="h-6 w-6 2xl:h-8 2xl:w-8" />
    </Card>
  )
}
