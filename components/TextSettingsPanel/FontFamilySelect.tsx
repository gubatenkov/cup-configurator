'use client'

import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'
import { useStore } from '@/lib/store'

export default function FontFamilySelect() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  return (
    <Select
      onValueChange={(fontFamily) =>
        setTextSettings({
          fontFamily,
        })
      }
      value={textSettings.fontFamily}
    >
      <SelectTrigger className="h-8 w-full 2xl:h-10">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="font-lato" value="Lato">
            Lato
          </SelectItem>
          <SelectItem className="font-caveat" value="Caveat">
            Caveat
          </SelectItem>
          <SelectItem className="font-merienda" value="Merienda">
            Merienda
          </SelectItem>
          <SelectItem className="font-lemonada" value="Lemonada">
            Lemonada
          </SelectItem>
          <SelectItem className="font-dancing-script" value="Dancing Script">
            Dancing Script
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
