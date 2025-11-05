"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"
import {
  Announcement as AnnouncementBase,
  AnnouncementOrb,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/announcement"
import { useThemeConfig } from "@/components/active-theme"

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

const THEME_OVERRIDES: Record<string, { hueDeg: number; saturate: number; rotateDeg: number; filter?: string }> = {
  emerald: {
    hueDeg: 316,
    saturate: 1.2,
    rotateDeg: 316,
  },
  pink: {
    hueDeg: 101,
    saturate: 1.2,
    rotateDeg: 101,
  },
}

export function OrbAnnouncement() {
  const { activeTheme } = useThemeConfig()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine orb properties based on active theme
  const isNeutral = activeTheme && NEUTRAL_THEMES.includes(activeTheme)
  const override = activeTheme ? THEME_OVERRIDES[activeTheme] : undefined
  const hue = activeTheme ? HUE_BY_THEME[activeTheme] : undefined
  
  let orbProps = {
    hueDeg: 40,
    saturate: 1.2,
    rotateDeg: 149,
  }
  
  if (mounted && isNeutral) {
    // Neutral themes use desaturation
    orbProps = {
      hueDeg: 0,
      saturate: 0.15,
      rotateDeg: 0,
    }
  } else if (mounted && override) {
    // Use override if available
    orbProps = override
  } else if (mounted && hue !== undefined) {
    // Use hue rotation for color themes
    orbProps = {
      hueDeg: hue,
      saturate: 1.2,
      rotateDeg: 149,
    }
  }

  return (
    <AnnouncementBase className="mb-1.5" asChild>
      <Link href="/docs/components/matrix">
        <AnnouncementTag className="flex items-center gap-2">
          <AnnouncementOrb
            key={mounted ? activeTheme : 'loading'}
            src="/orbs/orb-1.mp4"
            hueDeg={orbProps.hueDeg}
            saturate={orbProps.saturate}
            rotateDeg={orbProps.rotateDeg}
          />
          New
        </AnnouncementTag>
        <AnnouncementTitle>
        Chatbot w/ SDK 6! <ArrowDownIcon className="size-3" />
        </AnnouncementTitle>
      </Link>
    </AnnouncementBase>
  )
}