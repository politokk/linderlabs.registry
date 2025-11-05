"use client"

import { Check, Clipboard } from "lucide-react"
import { toast } from "sonner"

import { type Color } from "@/lib/colors"
import { trackEvent } from "@/lib/events"
import { useColors } from "@/hooks/use-colors"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface CopyColorProps {
  color: Color
  children?: React.ReactNode
  className?: string
}

export function CopyColor({ color, children, className }: CopyColorProps) {
  const { format, setLastCopied, lastCopied } = useColors()
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 0 })

  const handleCopy = () => {
    copyToClipboard(color[format])
    trackEvent({
      name: "copy_color",
      properties: {
        color: color.id,
        value: color[format],
        format,
      },
    })
    setLastCopied(color[format])
    toast.success(`Copied ${color[format]} to clipboard.`)
  }

  return (
    <button
      className={className}
      data-last-copied={lastCopied === color[format]}
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className="group-hover:opacity-100 group-data-[last-copied=true]:opacity-100" />
      ) : (
        <Clipboard className="group-hover:opacity-100" />
      )}
      {children}
    </button>
  )
}

