"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getInitials } from "@/lib/utils"
import { useThemeConfig } from "@/components/active-theme"

const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
}

// Map themes to orb videos
const THEME_TO_ORB: Record<string, string> = {
  // orb-1.mp4 - Blue orb for cool blues
  blue: "/orbs/orb-1.mp4",
  cyan: "/orbs/orb-1.mp4",
  sky: "/orbs/orb-1.mp4",
  teal: "/orbs/orb-1.mp4",
  
  // orb-2.mp4 - Blue/purple gradient for purples and default
  default: "/orbs/orb-1.mp4",
  indigo: "/orbs/orb-1.mp4",
  violet: "/orbs/orb-1.mp4",
  purple: "/orbs/orb-1.mp4",
  
  // orb-3.mp4 - Pink/orange/purple gradient for warm colors
  pink: "/orbs/orb-1.mp4",
  rose: "/orbs/orb-1.mp4",
  fuchsia: "/orbs/orb-1.mp4",
  red: "/orbs/orb-1.mp4",
  orange: "/orbs/orb-1.mp4",
  amber: "/orbs/orb-1.mp4",
  yellow: "/orbs/orb-1.mp4",
  
  // Green themes - use orb-1 (can adjust if preferred)
  lime: "/orbs/orb-1.mp4",
  green: "/orbs/orb-1.mp4",
  emerald: "/orbs/orb-1.mp4",
  
  // Neutral themes - use orb-2 (subtle default)
  slate: "/orbs/orb-1.mp4",
  gray: "/orbs/orb-1.mp4",
  zinc: "/orbs/orb-1.mp4",
  neutral: "/orbs/orb-1.mp4",
  stone: "/orbs/orb-1.mp4",
}

// Hue rotation values for tinting (same as static orbs)
const HUE_BY_THEME: Record<string, number> = {
  default: 40,
  red: 155,
  orange: 185,
  amber: 200,
  yellow: 215,
  lime: 230,
  green: 275,
  emerald: 295,
  teal: 335,
  cyan: 345,
  sky: 355,
  blue: 5,
  indigo: 40,
  violet: 65,
  purple: 85,
  fuchsia: 105,
  pink: 125,
  rose: 145,
}

const NEUTRAL_THEMES = ["slate", "gray", "zinc", "neutral", "stone"]

const NEUTRAL_BRIGHTNESS: Record<string, number> = {
  slate: 0.85,
  gray: 1.0,
  zinc: 0.75,
  neutral: 1.15,
  stone: 0.65,
}

const TeamAvatar = ({ 
  src, 
  name, 
  className 
}: { 
  src: string
  name: string
  className?: string 
}) => {
  const { activeTheme } = useThemeConfig()
  const [mounted, setMounted] = React.useState(false)
  const isVideo = isVideoUrl(src)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Use theme-specific orb if it's a video and we have a theme
  const videoSrc = isVideo && activeTheme 
    ? (THEME_TO_ORB[activeTheme] || src)
    : src
  
  // Calculate filters based on theme
  let videoStyle: React.CSSProperties = {}
  if (isVideo && activeTheme && mounted) {
    const isNeutral = NEUTRAL_THEMES.includes(activeTheme)
    
    if (isNeutral) {
      const brightness = NEUTRAL_BRIGHTNESS[activeTheme] ?? 1.0
      videoStyle = {
        filter: `saturate(0.15) brightness(${brightness})`,
      }
    } else {
      const hue = HUE_BY_THEME[activeTheme]
      if (hue !== undefined) {
        videoStyle = {
          filter: `hue-rotate(${hue}deg) saturate(1.2)`,
        }
      }
    }
  }
  
  return (
    <Avatar className={className}>
      {isVideo ? (
        <video
          key={mounted ? activeTheme : 'loading'}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={videoStyle}
          className="h-full w-full object-cover rounded-[inherit]"
        />
      ) : (
        <AvatarImage src={src || undefined} alt={name} />
      )}
      <AvatarFallback className="rounded-[inherit]">{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    accent?: string
    avatar: string
    plan: string
  }[]
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const { isMobile } = useSidebar()

  if (!activeTeam) {
    return null
  }

  // If only one team, render without dropdown
  if (teams.length === 1) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="/">
              <TeamAvatar 
                src={activeTeam.avatar} 
                name={activeTeam.name}
                className="h-8 w-8 rounded-lg"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-1">
                  <span className="truncate font-normal">{activeTeam.name}</span>
                  {activeTeam.accent && (
                    <span className="truncate text-primary font-medium">
                      {activeTeam.accent}
                    </span>
                  )}
                </div>
                <Badge variant="secondary" className="w-fit h-4 px-1 py-0 text-[10px]">
                  {activeTeam.plan}
                </Badge>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // Multiple teams - render with dropdown
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <TeamAvatar 
                src={activeTeam.avatar} 
                name={activeTeam.name}
                className="h-8 w-8 rounded-lg"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-1">
                  <span className="truncate font-normal">{activeTeam.name}</span>
                  {activeTeam.accent && (
                    <span className="truncate text-primary font-medium">
                      {activeTeam.accent}
                    </span>
                  )}
                </div>
                <Badge variant="secondary" className="w-fit h-4 px-1 py-0 text-[10px]">
                  {activeTeam.plan}
                </Badge>
              </div>
              <ChevronsUpDown className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <TeamAvatar 
                  src={team.avatar} 
                  name={team.name}
                  className="h-6 w-6 rounded-md"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-normal">{team.name}</span>
                    {team.accent && (
                      <span className="truncate text-primary font-medium text-xs">
                        {team.accent}
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}