import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  ArrowDownFromLineIcon,
  ChevronRightCircle,
  FileDownIcon,
  XSquareIcon,
  LucideProps,
  LucideIcon,
  XIcon,
} from 'lucide-react'
import { ButtonProps, Button } from '@/components/ui/button'
import { downloadCanvasAsImage, cn } from '@/lib/utils'
import WithTooltip from '@/components/WithTooltip'
import { useFabricCanvas } from '@/lib/hooks'
import { Image } from 'fabric/fabric-impl'
import { useState, useMemo } from 'react'

import IntrinsicAttributes = JSX.IntrinsicAttributes

type CanvasAction = {
  component: {
    element: ForwardRefExoticComponent<
      ButtonProps & RefAttributes<HTMLButtonElement>
    >
    props: ButtonProps
  }
  icon: { props: IntrinsicAttributes & LucideProps; element: LucideIcon }
  name: string
}

export default function Canvas2DActions() {
  const [isActionsVisible, setIsActionsVisible] = useState(false)
  const { canvas } = useFabricCanvas()
  const actions: CanvasAction[] = useMemo(
    () =>
      [
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                // Remove all objects from fabric canvas
                canvas
                  .remove(...canvas.getObjects())
                  // Clear canvas background
                  .setBackgroundImage(
                    null as unknown as Image,
                    canvas.renderAll.bind(canvas)
                  )
                  // Patterns are set as the background color, so don't forget to clear them too
                  .setBackgroundColor('#f2f2f2', () => {})
                  .renderAll()
              },
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
                if (!canvas) return
                // Clear canvas background
                canvas
                  .setBackgroundImage(
                    null as unknown as Image,
                    canvas.renderAll.bind(canvas)
                  )
                  .setBackgroundColor(
                    // The patterns are the background, so clean it up as well.
                    '#f2f2f2',
                    () => {}
                  )
                  .renderAll()
              },
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
                if (!canvas) return
                const activeObject = canvas.getActiveObject()
                if (!activeObject) return
                canvas.sendToBack(activeObject).discardActiveObject()
              },
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
                if (!canvas) return
                const activeObject = canvas.getActiveObject()
                if (!activeObject) return
                canvas.bringToFront(activeObject).discardActiveObject()
              },
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
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                downloadCanvasAsImage(canvas.lowerCanvasEl)
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: FileDownIcon,
          },
          name: 'Save canvas as image',
        },
      ] satisfies CanvasAction[],
    [canvas]
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
              className={cn(
                'h-10 w-10 rounded-full border border-background/50 p-0',
                'linear transition-all duration-150',
                componentProps.className
              )}
            >
              <Icon {...props} />
            </Element>
          </WithTooltip>
        )
      )}
    </>
  )
}
