import type { GLTF } from 'three-stdlib'

import {
  MeshStandardMaterial,
  BufferGeometry,
  CanvasTexture,
  Texture,
  Group,
  Mesh,
} from 'three'
import { useTexture, useGLTF, Shadow } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useStore } from '@/lib/store'
import { useRef } from 'react'

type GLTFResult = GLTF & {
  materials: {
    DecalMaterial: MeshStandardMaterial
    Porcelan: MeshStandardMaterial
  }
  nodes: {
    CupDrawArea: Mesh
    Cup: Mesh
  }
}

type CupDrawAreaMesh = Mesh<BufferGeometry, MeshStandardMaterial>

const cupModelPath = '/models/cup.glb'
const baseTexturesPath = '/textures'

export default function Cup() {
  const { materials, nodes } = useGLTF(cupModelPath, true) as GLTFResult
  const props = useTexture({
    displacementMap: `${baseTexturesPath}/displacement.jpg`,
    roughnessMap: `${baseTexturesPath}/roughness.jpg`,
    normalMap: `${baseTexturesPath}/normalDX.jpg`,
    map: `${baseTexturesPath}/color.jpg`,
  })

  const canvas = useStore(({ fabricCanvas }) => fabricCanvas)
  const texture = canvas && new CanvasTexture(canvas.lowerCanvasEl)

  const cupDrawAreaRef = useRef<CupDrawAreaMesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    // Prepare texture settings
    if (texture) {
      texture.flipY = false
      texture.anisotropy = 2
    }

    // Assign texture to the target material
    if (cupDrawAreaRef.current) {
      cupDrawAreaRef.current.material.map = texture
      ;(cupDrawAreaRef.current.material.map as Texture).needsUpdate = true
    }

    // Scale cup animation
    if (groupRef.current && groupRef.current.scale.x < 1) {
      groupRef.current.scale.x += 0.01
      groupRef.current.scale.y += 0.01
      groupRef.current.scale.z += 0.01
    }
  })

  return (
    <group {...props} dispose={null} ref={groupRef} scale={0}>
      <mesh
        geometry={nodes.Cup.geometry}
        material={materials.Porcelan}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial {...props} displacementScale={0} />
      </mesh>
      <mesh
        geometry={nodes.CupDrawArea.geometry}
        material={materials.DecalMaterial}
        ref={cupDrawAreaRef}
        receiveShadow
        castShadow
      />
      <Shadow
        position={[-0.35, 0, -0.25]}
        color="black"
        opacity={1}
        scale={2.5}
      />
    </group>
  )
}

useGLTF.preload(cupModelPath)
