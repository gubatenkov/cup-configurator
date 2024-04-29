'use client'

import { Slider } from '@/components/ui/slider'
import { useStore } from '@/lib/store'

export default function FontSizeSlider() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  const handleFontSizeChange = (fontSizeValue: [number]) => {
    setTextSettings({
      fontSize: fontSizeValue[0],
    })
  }

  return (
    <Slider
      value={[textSettings.fontSize ?? 14]}
      onValueChange={handleFontSizeChange}
      max={100}
      step={1}
      min={1}
    />
  )
}
