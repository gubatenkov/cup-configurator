'use client'

import type { ElementRef } from 'react'

import { useFabricCanvas } from '@/lib/hooks'
import { PaperclipIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

export default function UploadImageButton() {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const { canvas } = useFabricCanvas()

  // Listen to the input for the image load event, and then display it on the canvas
  useEffect(() => {
    const inputElement = inputRef.current
    if (!inputElement) return

    const handleUploadedImage = (e: Event) => {
      const eventTarget = e.target as HTMLInputElement
      const fileList = eventTarget.files
      if (!fileList || fileList.length === 0) return
      const reader = new FileReader()
      const loadedImageFile = fileList[0]

      reader.onload = (e) => {
        const data = e.target!.result
        fabric.Image.fromURL(data as string, (img) => {
          if (!canvas) return
          const scaleTo = canvas.width && img.width && canvas.width / img.width
          const imageObject = img.scale(scaleTo || 0.5)
          canvas.centerObject(imageObject).add(imageObject).renderAll()
        })
      }
      reader.readAsDataURL(loadedImageFile)
    }

    inputElement.addEventListener('change', handleUploadedImage)

    return () => inputElement.removeEventListener('change', handleUploadedImage)
  }, [canvas])

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
