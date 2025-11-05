// components/registry/registry-badges.tsx
"use client";
import { Component, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RegistryBadgesProps = {
  /** e.g. "registry:ui" | "registry:block" | "registry:page" */
  type: string;
  /** the registry item name (slug), e.g. "button" */
  name: string;
  /** optional icon name from lucide-react */
  icon?: string;
  /** optional className to position the badges row */
  className?: string;
};

function stripRegistryPrefix(type: string) {
  return type?.replace(/^registry:/, "") ?? "";
}

// Function to get icon component from icon name
function getIconComponent(iconName?: string): LucideIcon {
  if (iconName && LucideIcons[iconName as keyof typeof LucideIcons]) {
    return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  }
  
  // Fallback to Component icon
  return Component;
}

export function RegistryBadges({ type, name, icon, className }: RegistryBadgesProps) {
  const ComponentIcon = getIconComponent(icon);

  return (
    <div className={cn("flex gap-2", className)}>
      <Badge variant="default" className="uppercase">
        {stripRegistryPrefix(type)}
      </Badge>
      <Badge variant="defaultOutline" className="gap-1 capitalize">
        <ComponentIcon className="size-3" />
        {name}
      </Badge>
    </div>
  );
}