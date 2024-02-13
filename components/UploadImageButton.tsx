'use client'

import {
  SyntheticEvent,
  ChangeEvent,
  ElementRef,
  useEffect,
  useState,
  useRef,
} from 'react'
import { useFabricCanvas } from '@/lib/hooks'
import { PaperclipIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { fabric } from 'fabric'

export default function LoadImageButton() {
  const { isMounted: isCanvasMounted, fabricCanvas } =
    useFabricCanvas('.canvas-wrapper')
  const inputRef = useRef<ElementRef<'input'>>(null)

  useEffect(() => {
    const inputElement = inputRef.current
    if (!inputElement) return

    isCanvasMounted &&
      inputElement.addEventListener('change', handleChangeInput)

    function handleChangeInput(e: Event) {
      const eventTarget = e.target as HTMLInputElement
      const fileList = eventTarget.files
      if (!fileList || fileList.length === 0) return
      const reader = new FileReader()
      const loadedImageFile = fileList[0]

      reader.onload = function (f) {
        const data = f.target!.result
        fabric.Image.fromURL(data as string, function (img) {
          const scaleTo =
            fabricCanvas.width && img.width && fabricCanvas.width / img.width
          const imageObject = img.scale(scaleTo ?? 0.5)
          fabricCanvas.centerObject(imageObject).add(imageObject).renderAll()
        })
      }
      reader.readAsDataURL(loadedImageFile)
    }

    return () => inputElement.removeEventListener('change', handleChangeInput)
  }, [fabricCanvas, isCanvasMounted])

  return (
    <Card className="relative flex h-full w-full items-center justify-center">
      <input
        className="absolute h-full w-full cursor-pointer opacity-0"
        ref={inputRef}
        type="file"
      />
      <PaperclipIcon size={32} />
    </Card>
  )
}
