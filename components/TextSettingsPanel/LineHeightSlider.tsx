'use client'

import { Slider } from '@/components/ui/slider'
import { useStore } from '@/lib/store'

export default function LineHeightSlider() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  const handleLineHeightChange = (lineHeightValue: [number]) => {
    setTextSettings({
      lineHeight: lineHeightValue[0],
    })
  }

  return (
    <Slider
      onValueChange={handleLineHeightChange}
      value={[textSettings.lineHeight ?? 1]}
      step={0.1}
      min={0.1}
      max={2}
    />
  )
}
