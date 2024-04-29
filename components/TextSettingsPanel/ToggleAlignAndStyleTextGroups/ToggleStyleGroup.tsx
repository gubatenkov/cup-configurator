import { ToggleGroupItem, ToggleGroup } from '@/components/ui/toggle-group'
import { Underline, Italic, Bold } from 'lucide-react'

type Props = {
  onValueChange: (value: string[]) => void
  value: string[]
}

export default function ToggleStyleGroup(props: Props) {
  return (
    <ToggleGroup type="multiple" {...props}>
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle bold"
        value="bold"
      >
        <Bold className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle italic"
        value="italic"
      >
        <Italic className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-8 w-8 px-2 2xl:h-10 2xl:w-10"
        aria-label="Toggle underline"
        value="underline"
      >
        <Underline className="h-3 w-3 2xl:h-4 2xl:w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
