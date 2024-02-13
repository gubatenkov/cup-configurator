'use client'

import { type ReactNode, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Texture } from 'three'

import Result3DCanvas from './Result3DCanvas'
import Draw2DCanvas from './Draw2DCanvas'
import Cup from './Cup'

export default function Configurator({ children }: { children: ReactNode }) {
  const textureRef = useRef<Texture>()

  return (
    <>
      <Card className="relative overflow-hidden border-none">
        <Result3DCanvas>
          <Cup textureRef={textureRef} />
        </Result3DCanvas>
      </Card>
      <div className="grid grid-rows-2 gap-4">
        <Card className="relative overflow-hidden">
          <Draw2DCanvas textureRef={textureRef} />
        </Card>
        <div className="relative">{children}</div>
      </div>
    </>
  )
}
