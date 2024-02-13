import SetPatternButton from '@/components/SetPatternButton'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="background" prevPath="" />
      </div>
      <div className="grid h-full w-full grid-cols-10 grid-rows-4 gap-4">
        {Array.from({ length: 40 }).map((_, index) => (
          <SetPatternButton
            imageUrl={`/assets/patterns/${index + 1}.png`}
            index={index}
            key={index}
          />
        ))}
      </div>
    </>
  )
}
