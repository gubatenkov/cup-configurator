import GenerateAiImageDialog from '@/components/GenerateAiImageDialog'
import { Card } from '@/components/ui/card'
import Panels from '@/components/Panels'

export default function Home() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-4">
      <Panels />
      <Card className="flex h-full w-full items-center justify-center">
        <GenerateAiImageDialog />
      </Card>
    </div>
  )
}
