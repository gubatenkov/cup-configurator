'use client'

import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'
import { type ChangeEvent, useEffect, useState } from 'react'
import ToggleStyleGroup from '@/components/ToggleStyleGroup'
import ToggleAlignGroup from '@/components/ToggleAlignGroup'
import { Separator } from '@/components/ui/separator'
import { fillColors, fontColors } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useFabricCanvas } from '@/lib/hooks'
import { Input } from '@/components/ui/input'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fabric } from 'fabric'

const defaultTextOptions = {
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
}

type TextOptions = typeof defaultTextOptions

export default function TextOptions() {
  const { isMounted: canvasIsMounted, fabricCanvas } = useFabricCanvas()
  const [textOptions, setTextOptions] =
    useState<TextOptions>(defaultTextOptions)
  const [colorInputs, setColorInputs] = useState({
    backgroundColor: '',
    fill: '',
  })

  useEffect(() => {
    if (!canvasIsMounted) return

    // Unlock all canvas textboxes when user enters text editor
    const textboxes = fabricCanvas.getObjects('textbox') as fabric.Textbox[]
    textboxes.forEach((tb) => tb.set({ selectable: true, editable: true }))

    // Lock when leaves
    return () => {
      const textboxes = fabricCanvas.getObjects('textbox') as fabric.Textbox[]
      textboxes.forEach((tb) => {
        tb.exitEditing()
        tb.set({
          ...tb,
          selectable: false,
          editable: false,
          selected: false,
        })
      })
      fabricCanvas.discardActiveObject().renderAll()
    }
  }, [canvasIsMounted, fabricCanvas])

  // Watch changes of textOptions and render them on canvas
  useEffect(() => {
    if (!canvasIsMounted) return

    const handleUpdateActiveTextbox = () => {
      // Get selected canvas object
      const activeObj = fabricCanvas.getActiveObject()
      // Check if this is fabric Text
      if (activeObj instanceof fabric.IText) {
        // Apply updates to text
        activeObj.set({ ...textOptions, text: activeObj.text })
        // Render updates on fabric canvas
        fabricCanvas.renderAll()
      }
    }

    handleUpdateActiveTextbox()
  }, [canvasIsMounted, fabricCanvas, textOptions])

  // Listen to canvas events
  useEffect(() => {
    if (!canvasIsMounted) return

    fabricCanvas
      .on('selection:created', handleSelection)
      .on('selection:updated', handleSelection)
  }, [fabricCanvas, canvasIsMounted])

  const handleSelection = (e: fabric.IEvent<MouseEvent>) => {
    // When no active objects on canvas
    if (!e.selected?.length) return
    const selection = e.selected[0]

    // Continue if selection is fabric.Textbox
    if (selection instanceof fabric.Textbox) {
      const {
        backgroundColor,
        fontWeight,
        fontFamily,
        lineHeight,
        textAlign,
        underline,
        fontStyle,
        fontSize,
        text,
        fill,
      } = selection

      setTextOptions({
        backgroundColor,
        fontWeight,
        fontFamily,
        lineHeight,
        textAlign,
        underline,
        fontStyle,
        fontSize,
        text,
        fill,
        /** Tell the compiler that we're being type safe here because
         *  we defined all these default props at the very beginning  **/
      } as TextOptions)
    }
  }

  const handleAddText = () => {
    if (!canvasIsMounted) return
    const textbox = new fabric.Textbox(textOptions.text, textOptions)
    // Apply some adjustments
    fabricCanvas.centerObject(textbox).setActiveObject(textbox).add(textbox)
    // Set focus on created textbox
    textbox.setSelectionEnd(textOptions.text.length)
    textbox.enterEditing()
  }

  const handleRemoveText = () => {
    if (!canvasIsMounted) return
    const activeObject = fabricCanvas.getActiveObject()
    if (activeObject instanceof fabric.Textbox) {
      fabricCanvas.remove(activeObject)
    }
  }

  const updateFontColor = (color: string) => {
    setTextOptions((prevOpt) => ({ ...prevOpt, fill: color }))
  }

  const updateBackgroundColor = (color: string) => {
    setTextOptions((prevOpt) => ({ ...prevOpt, backgroundColor: color }))
  }

  const handleFontSizeChange = (fontSizeValue: [number]) => {
    setTextOptions((prevOpt) => ({
      ...prevOpt,
      fontSize: fontSizeValue[0],
    }))
  }

  const handleLineHeightChange = (lineHeightValue: [number]) => {
    setTextOptions((prevOpt) => ({
      ...prevOpt,
      lineHeight: lineHeightValue[0],
    }))
  }

  const handleChangeColorInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setColorInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleApplyColorClick = (inputName: keyof typeof colorInputs) => {
    const validHexColorRegexp = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i
    // Check if user entered valid hex string
    if (validHexColorRegexp.test('#AABBCC80')) {
      setTextOptions((prevOpts) => ({
        ...prevOpts,
        [inputName]: colorInputs[inputName],
      }))
    }
  }

  return (
    <>
      <div className="space-y-4 pt-8 2xl:space-y-6">
        <div className="group flex items-center gap-4">
          <Button
            className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
            onClick={handleAddText}
          >
            Add Text
          </Button>
          <Separator
            className="mx-1 h-4 2xl:mx-2 2xl:h-6"
            orientation="vertical"
          />
          <Button
            className="h-auto w-full px-4 py-2 text-xs 2xl:text-sm"
            onClick={handleRemoveText}
          >
            Delete Selected
          </Button>
        </div>

        <div className="group">
          <p className="mb-1 text-sm 2xl:mb-2 2xl:text-base">
            Text Align & Style
          </p>
          <div className="flex items-center">
            <ToggleAlignGroup
              onValueChange={(value) => {
                if (!value) return
                setTextOptions((prevState) => ({
                  ...prevState,
                  textAlign: value,
                }))
              }}
              value={textOptions.textAlign}
            />
            <Separator
              className="mx-4 h-4 2xl:mx-6 2xl:h-6"
              orientation="vertical"
            />
            <ToggleStyleGroup
              value={((): string[] => {
                const styles = []
                if (textOptions.fontWeight === 'bold') {
                  styles.push('bold')
                }
                if (textOptions.fontStyle === 'italic') {
                  styles.push('italic')
                }
                if (textOptions.underline) {
                  styles.push('underline')
                }
                return styles
              })()}
              onValueChange={(styles) => {
                setTextOptions((prevState) => {
                  return {
                    ...prevState,
                    fontStyle: styles.includes('italic') ? 'italic' : 'normal',
                    fontWeight: styles.includes('bold') ? 'bold' : 'normal',
                    underline: styles.includes('underline'),
                  }
                })
              }}
            />
          </div>
        </div>

        <div className="group">
          <p className="mb-2 text-sm 2xl:text-base">Font Size</p>
          <Slider
            onValueChange={handleFontSizeChange}
            value={[textOptions.fontSize]}
            max={100}
            step={1}
            min={1}
          />
        </div>

        <div className="group">
          <p className="mb-2 text-sm 2xl:text-base">Line Height</p>
          <Slider
            onValueChange={handleLineHeightChange}
            value={[textOptions.lineHeight]}
            step={0.1}
            min={0.1}
            max={2}
          />
        </div>

        <div className="group">
          <p className="mb-2 text-sm 2xl:text-base">Font Family</p>

          <Select
            onValueChange={(fontFamily) => {
              setTextOptions((prevOpts) => ({
                ...prevOpts,
                fontFamily,
              }))
            }}
            value={textOptions.fontFamily}
          >
            <SelectTrigger className="h-8 w-full 2xl:h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="font-lato" value="Lato">
                  Lato
                </SelectItem>
                <SelectItem className="font-caveat" value="Caveat">
                  Caveat
                </SelectItem>
                <SelectItem className="font-merienda" value="Merienda">
                  Merienda
                </SelectItem>
                <SelectItem className="font-lemonada" value="Lemonada">
                  Lemonada
                </SelectItem>
                <SelectItem
                  className="font-dancing-script"
                  value="Dancing Script"
                >
                  Dancing Script
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 2xl:space-y-6">
        <div className="group">
          <div className="group">
            <p className="mb-2 text-sm 2xl:text-base">Text Color</p>

            <ul className="mb-3 flex flex-wrap items-center gap-2 2xl:mb-4">
              {fontColors.map((fontColor, index) => (
                <li
                  className="relative h-7 w-7 shrink-0 cursor-pointer rounded-full border border-zinc-300 2xl:h-10 2xl:w-10"
                  onClick={() => updateFontColor(fontColor)}
                  style={{ backgroundColor: fontColor }}
                  key={index}
                >
                  <div
                    className={cn(
                      fontColor === textOptions.fill ? 'flex' : 'hidden',
                      'h-full w-full items-center justify-center rounded-full bg-black/30',
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                    )}
                  >
                    <CheckIcon className="text-gray-200" size={16} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Input
                className="h-8 placeholder:text-xs 2xl:h-9 2xl:placeholder:text-sm"
                placeholder="HEX string e.g. #ffffff"
                onChange={handleChangeColorInputs}
                value={colorInputs.fill}
                type="string"
                name="fill"
              />
              <Button
                className="h-auto px-4 py-2 text-xs 2xl:text-sm"
                onClick={() => handleApplyColorClick('fill')}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="group">
          <p className="mb-2 text-sm 2xl:text-base">Background Fill</p>

          <ul className="mb-3 flex flex-wrap items-center gap-2">
            {fillColors.map((backgroundColor, index) => (
              <li
                className="relative h-7 w-7 shrink-0 cursor-pointer rounded-full border border-zinc-300 2xl:h-10 2xl:w-10"
                onClick={() => updateBackgroundColor(backgroundColor)}
                style={{ backgroundColor }}
                key={index}
              >
                <div
                  className={cn(
                    backgroundColor === textOptions.backgroundColor
                      ? 'flex'
                      : 'hidden',
                    'h-full w-full items-center justify-center rounded-full bg-black/30',
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  )}
                >
                  <CheckIcon className="text-gray-200" size={16} />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Input
              className="h-8 placeholder:text-xs 2xl:h-9 2xl:placeholder:text-sm"
              placeholder="HEX string e.g. #ffffff"
              value={colorInputs.backgroundColor}
              onChange={handleChangeColorInputs}
              name="backgroundColor"
              type="string"
            />
            <Button
              onClick={() => handleApplyColorClick('backgroundColor')}
              className="h-auto px-4 py-2 text-xs 2xl:text-sm"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
