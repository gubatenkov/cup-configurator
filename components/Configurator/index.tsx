'use client'

import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'

import Canvas3D from './Canvas3D'
import Canvas2D from './Canvas2D'
import Cup from './Cup'

export default function Configurator({ children }: { children: ReactNode }) {
  return (
    <>
      <Card className="relative overflow-hidden border-none">
        <Canvas3D>
          <Cup />
        </Canvas3D>
      </Card>
      <div className="grid grid-rows-2 gap-4">
        <Card className="relative overflow-hidden">
          <Canvas2D />
        </Card>
        {/* Render each Settings Pannel item as a child node */}
        <div className="relative">{children}</div>
      </div>
    </>
  )
}
