import type { TextOptions } from 'fabric/fabric-impl'

import { AlignCenterIcon, AlignRightIcon, AlignLeftIcon } from 'lucide-react'
import { ToggleGroupItem, ToggleGroup } from '@/components/ui/toggle-group'

type Props = {
  onValueChange: (value: NonNullable<TextOptions['textAlign']>) => void
  value: NonNullable<TextOptions['textAlign']>
}

export default function ToggleAlignGroup(props: Props) {
  return (
    <ToggleGroup {...props} type="single">
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle align left"
        value="left"
      >
        <AlignLeftIcon className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle align center"
        value="center"
      >
        <AlignCenterIcon className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle align right"
        value="right"
      >
        <AlignRightIcon className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
