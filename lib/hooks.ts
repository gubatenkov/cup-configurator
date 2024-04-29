'use client'

import type { MutableRefObject } from 'react'
// import type { FabricCanvas } from '@/types'

import { useLayoutEffect, useCallback, ElementRef, useRef } from 'react'
// import { fabric } from 'fabric'

import { useStore } from './store'

export const useInitFabricCanvas =
  (): MutableRefObject<HTMLDivElement | null> => {
    const containerRef = useRef(null)
    return containerRef
  }

export const useFabricCanvas = () => {
  const { canvas } = useStore(({ fabricCanvas }) => ({
    canvas: fabricCanvas,
  }))
  const isMounted = Boolean(canvas)

  const unlockCanvasTextboxes = useCallback(() => {}, [canvas])

  const lockCanvasTextboxes = useCallback(() => {}, [canvas])

  const setCanvasBackgroundByUrl = useCallback(
    (imageUrl: `${string}.${'png' | 'jpg'}`) => {},
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
