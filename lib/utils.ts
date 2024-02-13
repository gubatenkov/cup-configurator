import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadCanvasAsImage(canvas: HTMLCanvasElement) {
  let downloadLink = document.createElement('a')
  downloadLink.setAttribute('download', 'cup-configuration.png')
  canvas.toBlob(function (blob) {
    if (!blob) return
    let url = URL.createObjectURL(blob)
    downloadLink.setAttribute('href', url)
    downloadLink.click()
  })
}
