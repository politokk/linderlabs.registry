"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { RegistryBreadcrumb } from "@/components/registry/registry-breadcrumb"
import { ThemeSelector } from "@/components/theme-selector"
import { ModeSwitcher } from "@/components/registry/mode-switcher"
import { cn } from "@/lib/utils"

interface RegistryHeaderProps {
  componentTitle: string;
  componentIcon?: string;
}
export function RegistryHeader({ componentTitle, componentIcon }: RegistryHeaderProps) {
  const { state } = useSidebar()
  
  return (
    <header
     className={cn(
       "px-3 py-2 border-b fixed bg-background/80 backdrop-blur-sm flex items-center transition-[width] duration-200 ease-linear",
       "w-full",
       state === "collapsed" 
         ? "md:w-[calc(100%-var(--sidebar-width-icon))]" 
         : "md:w-[calc(100%-var(--sidebar-width))]"
     )}
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-4 ml-2 !h-4" />
      <RegistryBreadcrumb componentTitle={componentTitle} componentIcon={componentIcon} />
      <div className="ml-auto flex items-center gap-2">
        <ModeSwitcher />
        <ThemeSelector />
      </div>
    </header>
  )
}