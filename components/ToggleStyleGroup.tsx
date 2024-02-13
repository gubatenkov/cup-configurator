import type { TextOptions } from 'fabric/fabric-impl'

import { ToggleGroupItem, ToggleGroup } from '@/components/ui/toggle-group'
import { Underline, Italic, Bold } from 'lucide-react'

type Props = {
  onValueChange: (value: NonNullable<TextOptions['fontWeight']>) => void
  value: NonNullable<TextOptions['fontWeight']>
}

export default function ToggleWeightGroup(props: Props) {
  return (
    <ToggleGroup type="multiple" {...props}>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
