'use client'

import { CheckIcon } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const fillColors = [
  '#ff000000',
  '#1fbc9c',
  '#1ca085',
  '#2ecc70',
  '#27af60',
  '#3398db',
  '#2980b9',
  '#a463bf',
  '#8e43ad',
  '#3d556e',
  '#222f3d',
  '#f2c511',
  '#f39c19',
  '#e84b3c',
] as const

export default function BackgroundColorListItems() {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )

  const updateBackgroundColor = (color: string) => {
    setTextSettings({
      backgroundColor: color,
    })
  }

  return fillColors.map((color, index) => (
    <li
      className="relative h-7 w-7 shrink-0 cursor-pointer rounded-full border border-zinc-300 2xl:h-10 2xl:w-10"
      style={{
        backgroundColor: color,
      }}
      onClick={() => updateBackgroundColor(color)}
      key={index}
    >
      <div
        className={cn(
          color === textSettings.backgroundColor ? 'flex' : 'hidden',
          'h-full w-full items-center justify-center rounded-full bg-black/30',
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <CheckIcon className="text-gray-200" size={16} />
      </div>
    </li>
  ))
}
