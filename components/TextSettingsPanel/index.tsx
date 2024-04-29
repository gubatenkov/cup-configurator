'use client'

import { useFabricCanvas } from '@/lib/hooks'
import { ReactNode, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { fabric } from 'fabric'

type Props = {
  children: ReactNode
}

export default function TextSettingsPanel({ children }: Props) {
  const { canvas } = useFabricCanvas()
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  // Rerender textSettings on change
  useEffect(() => {
    if (!canvas) return

    const handleUpdateActiveTextbox = () => {}

    handleUpdateActiveTextbox()
  }, [canvas, textSettings])

  // Watch current text selection
  useEffect(() => {
    const handleCurrentSelection = (e: fabric.IEvent<MouseEvent>) => {}

    canvas
      ?.on('selection:created', handleCurrentSelection)
      ?.on('selection:updated', handleCurrentSelection)
  }, [canvas, setTextSettings])

  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 2xl:gap-8">
      {children}
    </div>
  )
}
