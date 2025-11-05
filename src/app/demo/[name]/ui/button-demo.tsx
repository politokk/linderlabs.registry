import { CopyIcon, Loader2Icon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-row gap-2">
    <Button variant="default" size="sm">Primary</Button>
    <Button variant="secondary" size="sm" >Secondary</Button>
    <Button variant="outline" size="sm">Outline</Button>
    <Button variant="foreground" size="sm">Foreground</Button>
    <Button variant="destructive" size="sm">Destructive</Button>
    <Button variant="ghost" size="sm">Ghost</Button>
    <Button variant="link" size="sm">Link</Button>
    <Button variant="dislike" size="sm"><ThumbsDownIcon className="size-3.5" /> Dislike</Button>
    <Button variant="like" size="sm"><ThumbsUpIcon className="size-3.5" /> Like</Button>
    <Button variant="outline" size="sm"><Loader2Icon className="animate-spin size-3.5" /> Loading</Button>
    <Button variant="outline" size="iconSm"><CopyIcon className="size-3.5" /> </Button>
    </div>
  )
}