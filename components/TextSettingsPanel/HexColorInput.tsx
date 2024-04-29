'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ElementRef, useRef } from 'react'
import { useStore } from '@/lib/store'

type Props = { name: 'backgroundColor' | 'fill' }

export default function HexColorInput({ name }: Props) {
  const { setTextSettings, textSettings } = useStore(
    ({ setTextSettings, panels }) => ({
      textSettings: panels.text.data.textSettings,
      setTextSettings,
    })
  )
  const inputRef = useRef<ElementRef<'input'>>(null)

  const handleClick = () => {
    let inputValue = inputRef.current?.value
    inputValue ??= ''
    const inputName = name
    const validHexColorRegexp = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i
    // Check if user entered a valid hex string
    if (validHexColorRegexp.test(inputValue)) {
      setTextSettings({
        [inputName]: inputValue,
      })
    }
  }

  return (
    <>
      <Input
        className="h-8 placeholder:text-xs 2xl:h-9 2xl:placeholder:text-sm"
        placeholder="HEX string e.g. #ffffff"
        // onChange={handleChangeColorInputs}
        // value={colorInputs.fill}
        ref={inputRef}
        type="string"
        name={name}
      />

      <Button
        className="h-auto px-4 py-2 text-xs 2xl:text-sm"
        onClick={handleClick}
      >
        Apply
      </Button>
    </>
  )
}
