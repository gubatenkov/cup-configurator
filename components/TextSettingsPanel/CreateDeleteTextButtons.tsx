'use client'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useFabricCanvas } from '@/lib/hooks'
import { useStore } from '@/lib/store'
import { fabric } from 'fabric'

export default function CreateDeleteTextButtons() {
  const { textSettings } = useStore(({ panels }) => ({
    textSettings: panels.text.data.textSettings,
  }))
  const { canvas } = useFabricCanvas()

  const handleCreateText = () => {
    if (!canvas || textSettings.text === undefined) return
    const textbox = new fabric.Textbox(textSettings.text, textSettings)
    // Apply some adjustments
    canvas.centerObject(textbox).setActiveObject(textbox).add(textbox)
    // Set focus on created textbox
    textbox.setSelectionEnd(textSettings.text.length)
    textbox.enterEditing()
  }

  const handleRemoveText = () => {
    if (!canvas) return
    const selectedObject = canvas.getActiveObject()
    if (selectedObject instanceof fabric.Textbox) {
      canvas.remove(selectedObject)
    }
  }

  return (
    <>
      <Button
        className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
        onClick={handleCreateText}
      >
        Add Text
      </Button>
      <Separator className="mx-1 h-4 2xl:mx-2 2xl:h-6" orientation="vertical" />
      <Button
        className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
        onClick={handleRemoveText}
      >
        Delete Selected
      </Button>
    </>
  )
}
