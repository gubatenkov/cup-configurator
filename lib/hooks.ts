'use client'

import type { FabricCanvas } from '@/types'

import { useLayoutEffect, useCallback, ElementRef, useRef } from 'react'
import { fabric } from 'fabric'

import { useStore } from './store'

export const useInitFabricCanvas = () => {
  const containerRef = useRef<ElementRef<'div'> | null>(null)
  const { setCanvas, canvas } = useStore(
    ({ setFabricCanvas, fabricCanvas }) => ({
      setCanvas: setFabricCanvas,
      canvas: fabricCanvas,
    })
  )

  // Init fabric canvas before before the browser repaints the screen
  useLayoutEffect(() => {
    const initCanvas = () => {
      const container = containerRef.current

      if (!container) return

      const { height, width } = container.getBoundingClientRect()

      // Create canvas with default options
      const fabricCanvas = new fabric.Canvas(document.createElement('canvas'), {
        backgroundColor: '#f2f2f2',
        height,
        width,
      }) as FabricCanvas

      // Set a link for the canvas object to the store
      setCanvas(fabricCanvas)

      // Render both - lower and upper canvases
      fabricCanvas.renderAll()

      // Append canvas node to the provided wrapper element
      container.appendChild(fabricCanvas.wrapperEl)
    }

    // Make sure that the fabric canvas has been initialized only once
    if (!canvas) initCanvas()
  }, [canvas, setCanvas])

  return containerRef
}

export const useFabricCanvas = () => {
  const { canvas } = useStore(({ fabricCanvas }) => ({
    canvas: fabricCanvas,
  }))
  const isMounted = Boolean(canvas)

  const unlockCanvasTextboxes = useCallback(() => {
    if (!canvas) return
    const textboxes = canvas.getObjects('textbox') as fabric.Textbox[]
    textboxes.forEach((tb) =>
      tb.set({
        selectable: true,
        editable: true,
      })
    )
  }, [canvas])

  const lockCanvasTextboxes = useCallback(() => {
    if (!canvas) return
    const textboxes = canvas.getObjects('textbox') as fabric.Textbox[]
    textboxes.forEach((tb) => {
      tb.exitEditing()
      tb.set({
        ...tb,
        selectable: false,
        editable: false,
        selected: false,
      })
    })
    canvas.discardActiveObject().renderAll()
  }, [canvas])

  const setCanvasBackgroundByUrl = useCallback(
    (imageUrl: `${string}.${'png' | 'jpg'}`) => {
      fabric.Image.fromURL(imageUrl as string, (image) => {
        if (!canvas) return
        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
          scaleY: (canvas.height ?? 1) / (image.height ?? 1),
          scaleX: (canvas.width ?? 1) / (image.width ?? 1),
        })
      })
    },
    [canvas]
  )

  return {
    setCanvasBackgroundByUrl,
    unlockCanvasTextboxes,
    lockCanvasTextboxes,
    isMounted,
    canvas,
  } as const
}
