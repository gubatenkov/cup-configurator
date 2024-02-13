'use client'

import type { TooltipProps } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip'

type Props = {
  children: ReactNode
  tip: string
} & TooltipProps

export default function WithTooltip({ children, tip, ...props }: Props) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
