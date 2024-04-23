import type { ReactNode } from 'react'

import { OrbitControls, Sparkles, Stage } from '@react-three/drei'
import WithTooltip from '@/components/WithTooltip'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Canvas } from '@react-three/fiber'
import { NoToneMapping } from 'three'
import { useState } from 'react'

export default function Result3DCanvas({ children }: { children: ReactNode }) {
  const [isRotating, setIsRotating] = useState(true)

  return (
    <>
      {/* Actions with tooltips*/}
      <WithTooltip tip="Toggle model rotation">
        <Button
          className="absolute bottom-4 right-4 z-50 h-10 w-10 !rounded-full !p-0 opacity-60"
          onClick={() => setIsRotating(!isRotating)}
        >
          {isRotating ? (
            <PauseIcon size={18} />
          ) : (
            <PlayIcon className="translate-x-0.5" size={18} />
          )}
        </Button>
      </WithTooltip>
      {/* Canvas element */}
      <Canvas
        camera={{
          position: [0, 2, 5],
          near: 0.1,
          far: 10,
          fov: 50,
        }}
        gl={{ toneMapping: NoToneMapping, antialias: true }}
        className="result-canvas"
        linear
      >
        <ambientLight intensity={0.2} />
        {/* <Sparkles
          position={[0, 3, 0]}
          speed={0.4}
          count={48}
          scale={5}
          size={4}
        /> */}
        <Stage adjustCamera={false} environment="sunset" intensity={0.2}>
          {children}
        </Stage>
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate={isRotating}
          autoRotateSpeed={-1}
          target={[0, 1, 0]}
          enableZoom={false}
          enablePan={false}
          makeDefault
        />
      </Canvas>
    </>
  )
}
