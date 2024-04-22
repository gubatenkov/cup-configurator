'use client'

import { ElementRef, useEffect, useState, useRef } from 'react'
import { baseCanvasBackgroundColor } from '@/lib/data'
import { fabric } from 'fabric'

type FabricCanvas = fabric.Canvas & {
  lowerCanvasEl: HTMLCanvasElement
  wrapperEl: HTMLDivElement
}

let fabricCanvas: FabricCanvas | undefined

export const useFabricCanvas = () => {
  const [isMounted, setIsMounted] = useState(Boolean(fabricCanvas))
  const wrapperRef = useRef<ElementRef<'div'> | null>()
  const containerClass = '.canvas-wrapper'

  useEffect(() => {
    // window.addEventListener('resize', handleCanvasResize)
    wrapperRef.current =
      document.querySelector<HTMLDivElement>(containerClass) ?? null

    const wrapperBoundaries = {
      recalculate: function () {
        this.height = wrapperRef.current?.getBoundingClientRect().height ?? 0
        this.width = wrapperRef.current?.getBoundingClientRect().width ?? 0
      },
      height: 0,
      width: 0,
    }

    const initCanvas = () => {
      if (!wrapperRef.current) {
        // There is no need to throw an error in the starter, so we just exit the function
        setIsMounted(false)
        return
        // throw new Error(
        //   "Can't find container node. Please, provide valid container selector!"
        // )
      }

      // Calculate initial size of canvas wrapper
      wrapperBoundaries.recalculate()

      // Create canvas with options
      fabricCanvas = new fabric.Canvas(document.createElement('canvas'), {
        backgroundColor: baseCanvasBackgroundColor,
        height: wrapperBoundaries.height,
        width: wrapperBoundaries.width,
      }) as FabricCanvas

      // Render both - lower and upper canvases
      fabricCanvas.renderAll()

      // Append canvas node to the provided wrapper element
      wrapperRef.current.appendChild(fabricCanvas.wrapperEl)

      // Trigger update
      setIsMounted(true)
    }

    // Make sure there is always only one instance
    if (!fabricCanvas) initCanvas()

    // TO-DO: implement resizing logic for canvas
    // const handleCanvasResize = () => {}
  }, [containerClass])

  return { fabricCanvas, isMounted }
}

export function use2DCanvasBackground<
  TUrl extends `${string}.${'png' | 'jpg'}`,
>(imageUrl: TUrl) {
  const { fabricCanvas } = useFabricCanvas()

  // Load image by provided url, adjust and set it as fabric canvas background
  useEffect(() => {
    if (!fabricCanvas) return
    fabric.Image.fromURL(imageUrl as string, (image) => {
      fabricCanvas.setBackgroundImage(
        image,
        fabricCanvas.renderAll.bind(fabricCanvas),
        {
          scaleY: (fabricCanvas.height ?? 1) / (image.height ?? 1),
          scaleX: (fabricCanvas.width ?? 1) / (image.width ?? 1),
        }
      )
    })
  }, [fabricCanvas, imageUrl])
}
