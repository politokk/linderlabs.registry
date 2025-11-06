"use client"

import { Check, Terminal } from "lucide-react"
import { toast } from "sonner"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NPXInstallButtonProps {
  itemName: string
  variant?: "icon" | "default"
}

export function NPXInstallButton({
  itemName,
  variant = "default",
}: NPXInstallButtonProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const handleClick = () => {
    const command = `npx aiui@latest add ${itemName}`
    copyToClipboard(command)

    // Show toast notification
    toast.success(`@${itemName} copied to clipboard!`)
  }

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="size-6.5 rounded-sm p-0 shadow-none"
              onClick={handleClick}
            >
              {isCopied ? <Check /> : <Terminal />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>copy npx aiui@latest add {itemName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button
      variant="outline"
      className="w-fit gap-1 px-2 shadow-none"
      size="iconSm"
      onClick={handleClick}
    >
      {isCopied ? <Check /> : <Terminal />}
      <span>npx shadcn add {itemName}</span>
    </Button>
  )
}   