'use client'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
// import { useFabricCanvas } from '@/lib/hooks'
// import { useStore } from '@/lib/store'
// import { fabric } from 'fabric'

export default function CreateDeleteTextButtons() {
  // const { textSettings } = useStore(({ panels }) => ({
  //   textSettings: panels.text.data.textSettings,
  // }))
  // const { canvas } = useFabricCanvas()

  // const handleCreateText = () => {}

  // const handleRemoveText = () => {}

  return (
    <>
      <Button
        className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
        // onClick={handleCreateText}
      >
        Add Text
      </Button>
      <Separator className="mx-1 h-4 2xl:mx-2 2xl:h-6" orientation="vertical" />
      <Button
        className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
        // onClick={handleRemoveText}
      >
        Delete Selected
      </Button>
    </>
  )
}
