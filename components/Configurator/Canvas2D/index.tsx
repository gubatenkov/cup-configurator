'use client'

import { useInitFabricCanvas, useFabricCanvas } from '@/lib/hooks'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

import Actions from './Actions'

export default function Canvas2D() {
  const textPanelPathname = useStore((state) => state.panels.text.path)
  const containerRef = useInitFabricCanvas()
  const currentPathname = usePathname()
  const {
    setCanvasBackgroundByUrl,
    unlockCanvasTextboxes,
    lockCanvasTextboxes,
    isMounted,
  } = useFabricCanvas()

  // Set default canvas background
  useEffect(() => {
    setCanvasBackgroundByUrl(
      '/assets/backgrounds/default-cup-configuration.png'
    )
  }, [setCanvasBackgroundByUrl])

  // Watch current path and lock the Text Panel when the user leaves it
  useEffect(() => {
    currentPathname === `/${textPanelPathname}`
      ? unlockCanvasTextboxes()
      : lockCanvasTextboxes()
  }, [
    unlockCanvasTextboxes,
    lockCanvasTextboxes,
    textPanelPathname,
    currentPathname,
  ])

  return (
    <>
      <div className="absolute left-4 top-4 z-50 flex items-center gap-2">
        <Actions />
      </div>
      <div
        className={cn(
          'h-full w-full overflow-hidden border-none',
          'opacity-0 transition-opacity duration-1000',
          {
            'opacity-100': isMounted,
          }
        )}
        ref={containerRef}
      />
    </>
  )
}
