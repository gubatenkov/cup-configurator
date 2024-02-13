'use client'

import {
  DialogDescription,
  DialogContent,
  DialogTrigger,
  Dialog,
} from '@/components/ui/dialog'
import { SparklesIcon, Wand2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function GenerateAiImageDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full" variant="ghost">
          <p className="flex items-center gap-2">
            <Wand2Icon className="text-violet-500" size={14} />
            AI
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-transparent shadow-none sm:max-w-lg [&>button]:hidden">
        <div className="relative">
          <SparklesIcon
            className="absolute left-2.5 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            placeholder="Enter a prompt to generate an image"
            className="w-full py-1 pl-8 pr-20"
          />
          <button className="absolute right-0 top-0 h-full px-2 py-0 text-sm hover:bg-transparent">
            Generate
          </button>
        </div>
        <DialogDescription>
          You have reached the limit of free API calls. Please try again later.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
