'use client'

import { type ElementRef, useEffect, useRef } from 'react'
import { useFabricCanvas } from '@/lib/hooks'
import { PaperclipIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { fabric } from 'fabric'

export default function UploadImageButton() {
  const { isMounted: isCanvasMounted, fabricCanvas } = useFabricCanvas()
  const inputRef = useRef<ElementRef<'input'>>(null)

  // Listen to the input for the image load event, and then display it on the canvas
  useEffect(() => {
    const inputElement = inputRef.current
    if (!inputElement) return

    // Init listener
    isCanvasMounted &&
      inputElement.addEventListener('change', handleUploadedImage)

    // Handle image upload
    function handleUploadedImage(e: Event) {
      const eventTarget = e.target as HTMLInputElement
      const fileList = eventTarget.files
      if (!fileList || fileList.length === 0) return
      const reader = new FileReader()
      const loadedImageFile = fileList[0]

      reader.onload = (e) => {
        const data = e.target!.result
        fabric.Image.fromURL(data as string, (img) => {
          const scaleTo =
            fabricCanvas.width && img.width && fabricCanvas.width / img.width
          const imageObject = img.scale(scaleTo || 0.5)
          fabricCanvas.centerObject(imageObject).add(imageObject).renderAll()
        })
      }
      reader.readAsDataURL(loadedImageFile)
    }

    // Default cleanup
    return () => inputElement.removeEventListener('change', handleUploadedImage)
  }, [fabricCanvas, isCanvasMounted])

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
