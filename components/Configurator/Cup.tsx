import type { MutableRefObject } from 'react'
import type { GLTF } from 'three-stdlib'

import {
  MeshStandardMaterial,
  BufferGeometry,
  Texture,
  Group,
  Mesh,
} from 'three'
import { useTexture, useGLTF, Shadow } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
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

type Props = {
  textureRef: MutableRefObject<undefined | Texture>
}

const baseTexturesPath = '/textures'

export default function Cup({ textureRef }: Props) {
  const { materials, nodes } = useGLTF('/models/cup.glb', true) as GLTFResult
  const props = useTexture({
    displacementMap: `${baseTexturesPath}/displacement.jpg`,
    roughnessMap: `${baseTexturesPath}/roughness.jpg`,
    normalMap: `${baseTexturesPath}/normalDX.jpg`,
    map: `${baseTexturesPath}/color.jpg`,
  })
  const cupDrawAreaRef =
    useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null)
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!textureRef.current || !groupRef.current || !cupDrawAreaRef.current)
      return

    // Prepare texture then assign to model material
    textureRef.current.flipY = false
    textureRef.current.anisotropy = 2
    cupDrawAreaRef.current.material.map = textureRef.current
    cupDrawAreaRef.current.material.map.needsUpdate = true

    // Scale cup on mount animation
    if (groupRef.current.scale.x < 1) {
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

useGLTF.preload('/models/cup.glb')
