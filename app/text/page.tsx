import ToggleAlignAndStyleTextGroups from '@/components/TextSettingsPanel/ToggleAlignAndStyleTextGroups'
import BackgroundColorListItems from '@/components/TextSettingsPanel/BackgroundColorListItems'
import CreateDeleteTextButtons from '@/components/TextSettingsPanel/CreateDeleteTextButtons'
import FontColorListItems from '@/components/TextSettingsPanel/FontColorListItems'
import LineHeightSlider from '@/components/TextSettingsPanel/LineHeightSlider'
import FontFamilySelect from '@/components/TextSettingsPanel/FontFamilySelect'
import FontSizeSlider from '@/components/TextSettingsPanel/FontSizeSlider'
import HexColorInput from '@/components/TextSettingsPanel/HexColorInput'
import TextSettingsPanel from '@/components/TextSettingsPanel'
import Nav from '@/components/Nav'

export default function Page() {
  return (
    <>
      <div className="absolute -top-9 left-2 z-50">
        <Nav nextPath="image" prevPath="" />
      </div>

      <TextSettingsPanel>
        <div className="space-y-4 pt-8 2xl:space-y-6">
          <div className="group flex items-center gap-4">
            <CreateDeleteTextButtons />
          </div>

          <div className="group">
            <p className="mb-1 text-sm 2xl:mb-2 2xl:text-base">
              Text Align & Style
            </p>

            <div className="flex items-center">
              <ToggleAlignAndStyleTextGroups />
            </div>
          </div>

          <div className="group">
            <p className="mb-2 text-sm 2xl:text-base">Font Size</p>
            <FontSizeSlider />
          </div>

          <div className="group">
            <p className="mb-2 text-sm 2xl:text-base">Line Height</p>
            <LineHeightSlider />
          </div>

          <div className="group">
            <p className="mb-2 text-sm 2xl:text-base">Font Family</p>
            <FontFamilySelect />
          </div>
        </div>

        <div className="space-y-4 2xl:space-y-6">
          <div className="group">
            <div className="group">
              <p className="mb-2 text-sm 2xl:text-base">Text Color</p>
              <ul className="mb-3 flex flex-wrap items-center gap-2 2xl:mb-4">
                <FontColorListItems />
              </ul>
              <div className="flex items-center gap-2">
                <HexColorInput name="fill" />
              </div>
            </div>
          </div>

          <div className="group">
            <p className="mb-2 text-sm 2xl:text-base">Background Fill</p>
            <ul className="mb-3 flex flex-wrap items-center gap-2">
              <BackgroundColorListItems />
            </ul>
            <div className="flex items-center gap-2">
              <HexColorInput name="backgroundColor" />
            </div>
          </div>
        </div>
      </TextSettingsPanel>
    </>
  )
}
