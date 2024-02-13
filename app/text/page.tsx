import TextOptions from '@/components/TextOptions'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="image" prevPath="" />
      </div>
      <div className="grid h-full w-full grid-cols-2 gap-4 2xl:gap-8">
        <TextOptions />
      </div>
    </>
  )
}
