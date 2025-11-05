"use client";

import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { MiniBlockPreview } from "./mini-block-preview";
import { Icons } from "@/components/icons/icons";

interface RegistryNavigationProps {
  prevComponent?: {
    name: string;
    title: string;
    description?: string;
    icon?: string;
  } | null;
  nextComponent?: {
    name: string;
    title: string;
    description?: string;
    icon?: string;
  } | null;
  variant?: "default" | "compact";
}

// Function to get icon component from icon name
function getIconComponent(iconName?: string): LucideIcon | null {
  if (!iconName) return null;
  
  if (LucideIcons[iconName as keyof typeof LucideIcons]) {
    return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  }
  
  return null;
}

export function RegistryNavigation({ 
  prevComponent, 
  nextComponent, 
  variant = "default" 
}: RegistryNavigationProps) {
  const PrevIcon = prevComponent ? getIconComponent(prevComponent.icon) : null;
  const NextIcon = nextComponent ? getIconComponent(nextComponent.icon) : null;

  // Compact variant for header navigation
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {prevComponent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="iconXs"
                  className="extend-touch-target shadow-none"
                  asChild
                >
                  <Link href={`/registry/${prevComponent.name}`}>
                    <Icons.arrowLeft />
                    <span className="sr-only">Previous</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{prevComponent.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {nextComponent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="iconXs"
                  className="extend-touch-target shadow-none"
                  asChild
                >
                  <Link href={`/registry/${nextComponent.name}`}>
                    <span className="sr-only">Next</span>
                    <Icons.arrowRight />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{nextComponent.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  }

  // Default variant for footer navigation
  return (
    <div className="bottom-0 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-t border-white/20 dark:border-white/10 shadow-lg mt-auto">
      <div className="px-2 py-1.5 border-t border-border">
        <div className="flex items-center justify-between">
          {prevComponent ? (
            <HoverCard>
              <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" asChild className="hover:text-primary">
              <Link href={`/registry/${prevComponent.name}`} className="flex items-center gap-2">
                  <ArrowLeft className="size-3.5" />
                  {PrevIcon && <PrevIcon className="size-3.5" />}
                  <span className="text-xs font-default hover:text-primary">{prevComponent.title}</span>
                </Link>
              </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="start" side="top">
                <div className="space-y-3">
                  <MiniBlockPreview componentName={prevComponent.name} />
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div />
          )}
          
          {nextComponent ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                  <Link href={`/registry/${nextComponent.name}`} className="flex items-center gap-2">
                  {NextIcon && <NextIcon className="size-3" />}
                    <span className="text-xs font-default">{nextComponent.title}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="end" side="top">
                <div className="space-y-3">
                  <MiniBlockPreview componentName={nextComponent.name} />
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}