import SetBackgroundButton from '@/components/SetBackgroundButton'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="text" prevPath="" />
      </div>
      <div className="relative grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <SetBackgroundButton
            imageUrl={`/assets/backgrounds/bg${index + 1}.jpg`}
            index={index}
            key={index}
          />
        ))}
      </div>
    </>
  )
}
