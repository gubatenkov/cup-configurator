'use client'

import type { AlignValue } from '@/lib/types'

import { Separator } from '@/components/ui/separator'
import { useStore } from '@/lib/store'

import ToggleAlignGroup from './ToggleAlignGroup'
import ToggleStyleGroup from './ToggleStyleGroup'

export default function ToggleAlignAndStyleTextGroups() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  const handleAlignValueChange = (value: AlignValue) => {}

  const handleStyleValueChange = (styles: string[]) => {}

  const getFontStyleValue = (): string[] => {
    const styles: string[] = []
    return styles
  }

  return (
    <>
      <ToggleAlignGroup
        value={(textSettings.textAlign ?? 'left') as AlignValue}
        onValueChange={handleAlignValueChange}
      />
      <Separator className="mx-4 h-4 2xl:mx-6 2xl:h-6" orientation="vertical" />
      <ToggleStyleGroup
        onValueChange={handleStyleValueChange}
        value={getFontStyleValue()}
      />
    </>
  )
}
