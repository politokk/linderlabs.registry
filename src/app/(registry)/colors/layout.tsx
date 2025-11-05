import { Metadata } from "next"
import { ColorsNav } from "@/components/colors-nav"
const title = "Tailwind Colors in Every Format"
const description =
  "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full p-0">
      <div className="hidden">
        <div className="container-wrapper">
          <div className="container flex items-center justify-between gap-8 py-4">
            <ColorsNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
          </div>
        </div>
      </div>
      <div className="container-wrapper">
          <section id="colors" className="scroll-mt-20">
            {children}
          </section>
      </div>
    </div>
  )
}
