'use client'

import { CheckIcon } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const fontColors = [
  '#ffffff',
  '#ed120f',
  '#e98860',
  '#ffee58',
  '#00e676',
  '#1e88e5',
  '#8e43ad',
  '#111111',
] as const

export default function FontColorListItems() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  const updateFontColor = (color: string) => {
    setTextSettings({
      fill: color,
    })
  }

  return fontColors.map((color, index) => (
    <li
      className="relative h-7 w-7 shrink-0 cursor-pointer rounded-full border border-zinc-300 2xl:h-10 2xl:w-10"
      style={{
        backgroundColor: color,
      }}
      onClick={() => updateFontColor(color)}
      key={index}
    >
      <div
        className={cn(
          color === textSettings.fill ? 'flex' : 'hidden',
          'h-full w-full items-center justify-center rounded-full bg-black/30',
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <CheckIcon className="text-gray-200" size={16} />
      </div>
    </li>
  ))
}
