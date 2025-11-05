"use client"

import { type Color } from "@/lib/colors"
import { CopyColor } from "@/components/copy-color"
import { ColorSelectorPopover } from "@/components/color-selector-popover"

export function Color({ color }: { color: Color }) {
  return (
    <CopyColor
      color={color}
      className="group relative flex aspect-[3/1] w-full flex-1 cursor-pointer flex-col gap-2 text-(--text) sm:aspect-[2/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:top-4 [&>svg]:right-4 [&>svg]:z-10 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
    >
      <div className="absolute left-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <ColorSelectorPopover
          currentColor={color.oklch}
          onChange={(newColor) => {
            // Handle color change
            console.log("Color changed to:", newColor)
          }}
        />
      </div>
      <div
        key={color.hex}
        className="border-ghost after:border-input w-full flex-1 rounded-md bg-(--bg) after:rounded-lg md:rounded-lg"
        style={
          {
            "--bg": `${color.oklch}`,
            "--text": color.foreground,
          } as React.CSSProperties
        }
      />
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <span className="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary font-mono text-xs tabular-nums transition-colors sm:hidden xl:flex">
          {color.label ?? color.scale}
        </span>
        <span className="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary hidden font-mono text-xs tabular-nums transition-colors sm:flex xl:hidden">
          {color.scale}
        </span>
      </div>
    </CopyColor>
  )
}
