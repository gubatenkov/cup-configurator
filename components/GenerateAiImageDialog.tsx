'use client'

import {
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  Dialog,
} from '@/components/ui/dialog'
import { SparklesIcon, Loader2Icon, Wand2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFabricCanvas } from '@/lib/hooks'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { fabric } from 'fabric'

type TResponse = {
  replicate: {
    items: Array<{ image_resource_url: string; image: string }>
    status: string
    cost: number
  }
}

const initialConfig: RequestInit = {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  method: 'POST',
}

export default function GenerateAiImageDialog() {
  const { fabricCanvas, isMounted } = useFabricCanvas()
  const [prompt, setPrompt] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const generateImageFromPrompt = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_AI_API_ENDPOINT as string,
          {
            ...initialConfig,
            body: JSON.stringify({
              providers: 'replicate',
              resolution: '512x512',
              text: prompt,
            }),
            signal,
          }
        )
        const data = (await response.json()) as TResponse

        if (data.replicate.status === 'success') {
          const imageUrl = data.replicate.items[0].image_resource_url
          if (!isMounted) return
          // Paste generated image on canvas
          fabric.Image.fromURL(imageUrl, (image) => {
            fabricCanvas.add(image).centerObject(image).renderAll()
          })
        }
      } catch (e) {
        setError(true)
      } finally {
        setIsGenerating(false)
        setIsDialogOpen(false)
      }
    }

    // Run generation when user click on button
    if (isGenerating) generateImageFromPrompt()

    // Abort request on dialog unmount
    return () => {
      controller.abort()
    }
  }, [fabricCanvas, isGenerating, isMounted, prompt])

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className="h-full w-full" variant="ghost">
          <p className="flex items-center gap-2">
            <Wand2Icon className="text-violet-500" size={14} />
            AI
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-transparent shadow-none sm:max-w-lg [&>button]:hidden">
        <DialogHeader className="text-xs text-background">
          Note: This feature is experimental and uses the free version of the
          public API. Therefore, the generation time and result may be
          unexpected.
        </DialogHeader>
        <div className="relative">
          <SparklesIcon
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-violet-500"
            size={16}
          />
          <Input
            className={cn('w-full py-1 pl-8', isGenerating ? 'pr-11' : 'pr-20')}
            placeholder="Enter a prompt to generate an image"
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            value={prompt}
          />
          <button
            className="absolute right-0 top-0 flex h-full items-center px-2 py-0 text-sm hover:bg-transparent"
            onClick={() => setIsGenerating(true)}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate'
            )}
          </button>
        </div>
        {isError && (
          <DialogDescription>
            An error occurred or you have reached the limit of free API calls.
            Please try again later.
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  )
}
