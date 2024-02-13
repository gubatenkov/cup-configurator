import UploadImageButton from '@/components/UploadImageButton'
import SetImageButton from '@/components/SetImageButton'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="geometry" prevPath="" />
      </div>
      <div className="grid h-full w-full grid-cols-5 grid-rows-2 gap-4">
        <UploadImageButton />
        {Array.from({ length: 9 }).map((_, index) => (
          <SetImageButton
            imageUrl={`/assets/images/image${index + 1}.png`}
            index={index}
            key={index}
          />
        ))}
      </div>
    </>
  )
}
