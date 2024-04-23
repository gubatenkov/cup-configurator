'use client'

import type { MutableRefObject } from 'react'

import { use2DCanvasBackground } from '@/lib/hooks'
import { CanvasTexture, Texture } from 'three'
import { useFabricCanvas } from '@/lib/hooks'
// import { useEffect } from 'react'
import { cn } from '@/lib/utils'

// import Canvas2DActions from './Canvas2DActions'

type Props = {
  textureRef: MutableRefObject<undefined | Texture>
}

export default function Draw2DCanvas({ textureRef }: Props) {
  const { fabricCanvas, isMounted } = useFabricCanvas()
  // Load default cup configuration
  use2DCanvasBackground('/assets/backgrounds/default-cup-configuration.png')

  return (
    <>
      <div className="absolute left-4 top-4 z-50 flex items-center gap-2">
        {/* <Canvas2DActions /> */}
      </div>
      <div
        className={cn(
          'canvas-wrapper h-full w-full overflow-hidden border-none',
          'opacity-0 transition-opacity duration-1000',
          {
            'opacity-100': isMounted,
          }
        )}
      />
    </>
  )
}
