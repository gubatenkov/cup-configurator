'use client'

import { ElementRef, useEffect, useState, useRef } from 'react'
import { baseCanvasBackgroundColor } from '@/lib/data'
import { fabric } from 'fabric'

type FabricCanvas = fabric.Canvas & {
  lowerCanvasEl: HTMLCanvasElement
  wrapperEl: HTMLDivElement
}

let fabricCanvas: FabricCanvas

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
      if (!wrapperRef?.current) {
        throw new Error(
          "Can't find container node. Please, provide valid container selector!"
        )
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
    }

    // Make sure there is always only one instance
    if (!fabricCanvas) initCanvas()

    // Trigger update
    setIsMounted(true)

    // TO-DO: implement resizing logic for canvas
    // function handleCanvasResize() {
    // wrapperBoundaries.recalculate()
    // fabricRef.current?.setDimensions({
    //   height: wrapperBoundaries.height - 1,
    //   width: wrapperBoundaries.width - 1,
    // })
    // textureRef.current!.needsUpdate = true
    // }

    // return () => {
    //   // Clear canvas and listeners
    //   fabricRef.current?.dispose()
    //   window.removeEventListener('resize', handleCanvasResize)
    // }
  }, [containerClass])

  return { fabricCanvas, isMounted }
}

export function useCanvasBackground<TUrl extends `${string}.${'png' | 'jpg'}`>(
  imageUrl: TUrl
) {
  const { fabricCanvas, isMounted } = useFabricCanvas()

  // Load image by provided url, adjust and set it as fabric canvas background
  useEffect(() => {
    isMounted &&
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
  }, [fabricCanvas, isMounted, imageUrl])
}
