import GeometryList from '@/components/GeometryList'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="pattern" prevPath="" />
      </div>
      <div className="relative grid h-full w-full grid-cols-4 grid-rows-2 gap-4">
        <GeometryList />
      </div>
    </>
  )
}
