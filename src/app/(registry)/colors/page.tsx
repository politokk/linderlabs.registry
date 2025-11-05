import { getColors } from "@/lib/colors"
import { ColorPalette } from "@/components/color-palette"
import { RegistryHeader } from "@/components/registry/registry-header";

export const dynamic = "force-static"
export const revalidate = false

export default function ColorsPage() {
  const colors = getColors()

  return (
    <div className="flex flex-col min-h-full w-full">
    <RegistryHeader componentTitle="Design Tokens" componentIcon="LayoutGrid" />

    <div className="container p-5 md:p-10">
      <div className="mb-8">
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
       </div>
       </div>
    </div>
  )
}
