import GenerateAiImageDialog from '@/components/GenerateAiImageDialog'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { panelItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-4">
      {/* Panel */}
      {panelItems.map(({ label, path, id }) => (
        <Card className="h-full w-full" key={id}>
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex h-full w-full items-center justify-center text-base'
            )}
            href={`/${path}`}
          >
            {label}
          </Link>
        </Card>
      ))}
      {/* End of Panel */}
      <Card className="flex h-full w-full items-center justify-center">
        <GenerateAiImageDialog />
      </Card>
    </div>
  )
}
