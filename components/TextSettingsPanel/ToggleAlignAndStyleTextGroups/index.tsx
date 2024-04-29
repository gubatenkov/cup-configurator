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

  return (
    <>
      <ToggleAlignGroup
        onValueChange={(value) => {
          if (!value) return
          setTextSettings({
            textAlign: value,
          })
        }}
        value={(textSettings.textAlign ?? 'left') as AlignValue}
      />
      <Separator className="mx-4 h-4 2xl:mx-6 2xl:h-6" orientation="vertical" />
      <ToggleStyleGroup
        value={((): string[] => {
          const styles = []
          if (textSettings.fontWeight === 'bold') {
            styles.push('bold')
          }
          if (textSettings.fontStyle === 'italic') {
            styles.push('italic')
          }
          if (textSettings.underline) {
            styles.push('underline')
          }
          return styles
        })()}
        onValueChange={(styles) => {
          setTextSettings({
            fontStyle: styles.includes('italic') ? 'italic' : 'normal',
            fontWeight: styles.includes('bold') ? 'bold' : 'normal',
            underline: styles.includes('underline'),
          })
        }}
      />
    </>
  )
}
