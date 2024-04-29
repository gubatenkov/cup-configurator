'use client'

import {
  TriangleIcon,
  CircleIcon,
  SquareIcon,
  LucideIcon,
  MinusIcon,
  HeartIcon,
  SmileIcon,
  BabyIcon,
  SunIcon,
} from 'lucide-react'
import { useFabricCanvas } from '@/lib/hooks'
import { Card } from '@/components/ui/card'
import { useMemo } from 'react'
import { fabric } from 'fabric'

type GeometryItem = {
  handleAddItem: () => void
  icon: LucideIcon
}

export default function GeometryList() {
  const { canvas } = useFabricCanvas()
  const geometryItems = useMemo<GeometryItem[]>(
    () =>
      [
        {
          handleAddItem: () => {},
          icon: MinusIcon,
        },
        {
          handleAddItem: () => {},
          icon: CircleIcon,
        },
        {
          handleAddItem: () => {},
          icon: TriangleIcon,
        },
        {
          handleAddItem: () => {},
          icon: SquareIcon,
        },
        {
          handleAddItem: () => {},
          icon: BabyIcon,
        },
        {
          handleAddItem: () => {},
          icon: SunIcon,
        },
        {
          handleAddItem: () => {},
          icon: HeartIcon,
        },
        {
          handleAddItem: () => {},
          icon: SmileIcon,
        },
      ] satisfies GeometryItem[],
    [canvas]
  )

  return geometryItems.map(({ handleAddItem, icon: Icon }, index) => (
    <Card
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onClick={handleAddItem}
      key={index}
    >
      <Icon size={32} />
    </Card>
  ))
}
