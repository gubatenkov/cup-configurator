'use client'

import type {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  ReactNode,
} from 'react'

import {
  ArrowDownFromLineIcon,
  ChevronRightCircle,
  XSquareIcon,
  LucideProps,
  LucideIcon,
  XIcon,
} from 'lucide-react'
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip'
import { ButtonProps, Button } from '@/components/ui/button'
import { useEffect, useState, useMemo } from 'react'
import WithTooltip from '@/components/WithTooltip'
import { useCanvasBackground } from '@/lib/hooks'
import { CanvasTexture, Texture } from 'three'
import { useFabricCanvas } from '@/lib/hooks'
import { cn } from '@/lib/utils'

import IntrinsicAttributes = React.JSX.IntrinsicAttributes

type Props = {
  textureRef: MutableRefObject<undefined | Texture>
}

export default function Draw2DCanvas({ textureRef }: Props) {
  const { fabricCanvas, isMounted } = useFabricCanvas('.canvas-wrapper')
  useCanvasBackground('/assets/backgrounds/defaultBg.jpg')

  useEffect(() => {
    if (!isMounted) return
    // Create texture from canvas and assign it to the parent ref
    textureRef.current = new CanvasTexture(fabricCanvas.lowerCanvasEl)
    // eslint-disable-next-line
  }, [fabricCanvas, isMounted])

  return (
    <>
      <div className="absolute left-4 top-4 z-50 flex items-center gap-2">
        <CanvasActions />
      </div>
      <div
        className={cn(
          'canvas-wrapper h-full w-full overflow-hidden border-none',
          'opacity-0 transition-opacity duration-1000',
          {
            'opacity-100': isMounted,
          }
        )}
      />
    </>
  )
}

type TCanvasAction = {
  component: {
    element: ForwardRefExoticComponent<
      ButtonProps & RefAttributes<HTMLButtonElement>
    >
    props: ButtonProps
  }
  icon: { props: IntrinsicAttributes & LucideProps; element: LucideIcon }
  name: string
}

const CanvasActions = () => {
  const { fabricCanvas, isMounted } = useFabricCanvas('.canvas-wrapper')
  const [isActionsVisible, setIsActionsVisible] = useState(false)
  const actions: TCanvasAction[] = useMemo(
    () =>
      [
        {
          component: {
            props: {
              onClick: () => {
                if (!isMounted) return
                // Remove all objects from fabric canvas
                fabricCanvas.remove(...fabricCanvas.getObjects())
                // Clear canvas background
                fabricCanvas.setBackgroundImage(
                  // @ts-expect-error
                  null,
                  fabricCanvas.renderAll.bind(fabricCanvas)
                )
              },
              className: cn(
                'h-10 w-10 rounded-full p-0 border border-background/50',
                'transition-all duration-150 linear'
              ),
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XIcon,
          },
          name: 'Clear canvas',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!isMounted) return
                // Clear canvas background
                fabricCanvas.setBackgroundImage(
                  // @ts-expect-error
                  null,
                  fabricCanvas.renderAll.bind(fabricCanvas)
                )
              },
              className: cn(
                'h-10 w-10 rounded-full p-0 border border-background/50',
                'transition-all duration-150 linear'
              ),
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XSquareIcon,
          },
          name: 'Remove background',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!isMounted) return
                const activeObject = fabricCanvas.getActiveObject()
                if (!activeObject) return
                fabricCanvas.sendToBack(activeObject).discardActiveObject()
              },
              className: cn(
                'h-10 w-10 rounded-full p-0 border border-background/50',
                'transition-all duration-150 linear'
              ),
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          name: 'Send selection to back',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!isMounted) return
                const activeObject = fabricCanvas.getActiveObject()
                if (!activeObject) return
                fabricCanvas.bringToFront(activeObject).discardActiveObject()
              },
              className: cn(
                'h-10 w-10 rounded-full p-0 border border-background/50',
                'transition-all duration-150 linear'
              ),
            },
            element: Button,
          },
          icon: {
            props: {
              className: 'rotate-180',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          name: 'Bring selection to front',
        },
      ] satisfies TCanvasAction[],
    [fabricCanvas, isMounted]
  )

  const handleToggleActions = () => {
    setIsActionsVisible(!isActionsVisible)
  }

  return (
    <>
      {/* Toggle Button */}
      <WithTooltip tip={isActionsVisible ? 'Hide actions' : 'Show actions'}>
        <Button
          className="z-50 h-10 w-10 rounded-full border border-background/50 p-0 opacity-65"
          onClick={handleToggleActions}
        >
          <ChevronRightCircle
            className={cn(
              'transition-transform duration-150 ease-in-out',
              isActionsVisible && 'rotate-180'
            )}
            size={16}
          />
        </Button>
      </WithTooltip>

      {/* Actions List */}
      {actions.map(
        (
          {
            component: { props: componentProps, element: Element },
            icon: { element: Icon, props },
            name,
          },
          index
        ) => (
          <WithTooltip tip={name} key={name}>
            <Element
              {...componentProps}
              style={{
                transform: isActionsVisible
                  ? 'translateX(0%)'
                  : `translateX(calc(-${(index + 1) * 100}% - 0.5rem))`,
                opacity: isActionsVisible ? 0.65 : 0,
              }}
            >
              <Icon {...props} />
            </Element>
          </WithTooltip>
        )
      )}
    </>
  )
}
