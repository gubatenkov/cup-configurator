'use client'

import { useFabricCanvas } from '@/lib/hooks'
import { fabric } from 'fabric'

export default function ImageList() {
  const fabricCanvas = useFabricCanvas('.canvas-wrapper')

  const handleAddCircle = () => {
    const ellipse = new fabric.Ellipse({
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
      rx: 50,
      ry: 50,
    })
    fabricCanvas.centerObject(ellipse)
    fabricCanvas.add(ellipse)
  }

  const handleAddTriangle = () => {
    const triangle = new fabric.Triangle({
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
    })
    fabricCanvas.centerObject(triangle)
    fabricCanvas.add(triangle)
  }

  const handleAddRectangle = () => {
    const rectangle = new fabric.Rect({
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
      height: 100,
      width: 100,
    })
    fabricCanvas.centerObject(rectangle)
    fabricCanvas.add(rectangle)
  }

  const handleAddLine = () => {
    const line = new fabric.Line([125, 250, 175, 250], {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'black',
    })
    fabricCanvas.centerObject(line)
    fabricCanvas.add(line)
  }

  const handleAddChild = () => {
    const svgStr = `<svg
        xmlns="http://www.w3.org/2000/svg"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        viewBox="0 0 24 24"
        stroke-width="2"
        height="50"
        fill="none"
        width="50"
      >
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
      </svg>`.toString()
    fabric.loadSVGFromString(svgStr, (results) => {
      const group = fabric.util.groupSVGElements(results)
      fabricCanvas.centerObject(group)
      fabricCanvas.add(group)
    })
  }

  const handleAddSun = () => {
    const svgStr =
      `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`.toString()
    fabric.loadSVGFromString(svgStr, (results) => {
      const group = fabric.util.groupSVGElements(results)
      fabricCanvas.centerObject(group)
      fabricCanvas.add(group)
    })
  }

  const handleAddHeart = () => {
    const svgStr =
      `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`.toString()
    fabric.loadSVGFromString(svgStr, (results) => {
      const group = fabric.util.groupSVGElements(results)
      fabricCanvas.centerObject(group)
      fabricCanvas.add(group)
    })
  }

  const handleAddSmile = () => {
    const svgStr =
      `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`.toString()
    fabric.loadSVGFromString(svgStr, (results) => {
      const group = fabric.util.groupSVGElements(results)
      fabricCanvas.centerObject(group)
      fabricCanvas.add(group)
    })
  }

  return <div></div>
}
