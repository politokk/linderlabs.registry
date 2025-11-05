import { AlertCircleIcon, ArrowRightIcon, AlertTriangleIcon, ArrowRight, CheckIcon, InfoIcon, LinkIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
      <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="muted">Muted</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="success"><CheckIcon /> Success</Badge>
    <Badge variant="warning"><AlertTriangleIcon /> Warning</Badge>
    <Badge variant="info"><InfoIcon /> Info</Badge>
    <Badge variant="error"><AlertCircleIcon /> Error</Badge>
    <Badge variant="inProgress"><Loader2Icon className="animate-spin" /> In Progress</Badge>
    <Badge variant="link" asChild><Link href="#"><LinkIcon /> Link <ArrowRight className="size-3" /> </Link></Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          99
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    </div>
  )
}