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

    const handleUpdateActiveTextbox = () => {
      // Get selected canvas object
      const activeObj = canvas.getActiveObject()
      // Check if this is fabric Text
      if (activeObj instanceof fabric.IText) {
        // Apply updates to text
        activeObj.set({
          ...textSettings,
          text: activeObj.text,
        })
        // Render updates on fabric canvas
        canvas.renderAll()
      }
    }

    handleUpdateActiveTextbox()
  }, [canvas, textSettings])

  // Watch current text selection
  useEffect(() => {
    const handleCurrentSelection = (e: fabric.IEvent<MouseEvent>) => {
      // When no active objects on canvas
      if (!e.selected?.length) return

      const selection = e.selected[0]
      // Continue if selection is fabric.Textbox
      if (selection instanceof fabric.Textbox) {
        const {
          backgroundColor,
          fontWeight,
          fontFamily,
          lineHeight,
          textAlign,
          underline,
          fontStyle,
          fontSize,
          text,
          fill,
        } = selection

        setTextSettings({
          backgroundColor,
          fontWeight,
          fontFamily,
          lineHeight,
          textAlign,
          underline,
          fontStyle,
          fontSize,
          text,
          fill,
        })
      }
    }

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
