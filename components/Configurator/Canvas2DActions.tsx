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
import WithTooltip from '@/components/WithTooltip'
import { useFabricCanvas } from '@/lib/hooks'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

import IntrinsicAttributes = JSX.IntrinsicAttributes

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

export default function Canvas2DActions() {
  const [isActionsVisible, setIsActionsVisible] = useState(false)
  const { fabricCanvas } = useFabricCanvas()
  const actions: TCanvasAction[] = useMemo(
    () =>
      [
        {
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XIcon,
          },
          component: {
            props: {
              onClick: () => {},
            },
            element: Button,
          },
          name: 'Clear canvas',
        },
        {
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XSquareIcon,
          },
          component: {
            props: {
              onClick: () => {},
            },
            element: Button,
          },
          name: 'Remove background',
        },
        {
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          component: {
            props: {
              onClick: () => {},
            },
            element: Button,
          },
          name: 'Send selection to back',
        },
        {
          icon: {
            props: {
              className: 'rotate-180',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          component: {
            props: {
              onClick: () => {},
            },
            element: Button,
          },
          name: 'Bring selection to front',
        },
        {
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: FileDownIcon,
          },
          component: {
            props: {
              onClick: () => {},
            },
            element: Button,
          },
          name: 'Save canvas as image',
        },
      ] satisfies TCanvasAction[],
    [fabricCanvas]
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
