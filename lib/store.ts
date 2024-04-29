import type { PartialTextSettings, FabricCanvas } from '@/types'

import { create } from 'zustand'

type Panel = Record<
  'background' | 'geometry' | 'pattern' | 'image' | 'text',
  {
    data: Record<string, any>
    label: string
    path: string
    id: number
  }
>

type Store = {
  setTextSettings: (partialTextSettings: PartialTextSettings) => void
  setFabricCanvas: (canvas: FabricCanvas) => void
  fabricCanvas: FabricCanvas | null
  panels: Panel
}

export const useStore = create<Store>((set) => ({
  panels: {
    text: {
      data: {
        textSettings: {
          fontStyle: 'normal' as 'oblique' | 'normal' | 'italic' | '',
          backgroundColor: '#ff000000',
          text: 'Start edit me!',
          fontWeight: 'normal',
          fontFamily: 'Lato',
          textAlign: 'left',
          originX: 'center',
          originY: 'center',
          underline: false,
          fill: '#ffffff',
          lineHeight: 1,
          fontSize: 36,
          width: 200,
        } satisfies PartialTextSettings,
      },
      label: 'Text',
      path: 'text',
      id: 1,
    },
    background: {
      label: 'Backgrounds',
      path: 'background',
      data: {},
      id: 5,
    },
    geometry: {
      label: 'Geometry',
      path: 'geometry',
      data: {},
      id: 3,
    },
    pattern: {
      label: 'Patterns',
      path: 'pattern',
      data: {},
      id: 4,
    },
    image: {
      label: 'Images',
      path: 'image',
      data: {},
      id: 2,
    },
  },
  setTextSettings: (partialTextSettings: PartialTextSettings) =>
    set((prevState) => ({
      panels: {
        ...prevState.panels,
        text: {
          ...prevState.panels['text'],
          data: {
            ...prevState.panels['text'].data,
            textSettings: {
              ...prevState.panels['text'].data.textSettings,
              ...structuredClone(partialTextSettings),
            },
          },
        },
      },
    })),
  setFabricCanvas: (fabricCanvas) => set({ fabricCanvas }),
  fabricCanvas: null,
}))
