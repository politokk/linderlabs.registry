"use client"

import * as React from "react"
import { Check, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { useThemeConfig } from "@/components/active-theme"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Orb } from "@/components/orb"

const DEFAULT_THEMES = [
  { name: "Default", value: "default" },
] as const

const COLOR_THEMES = [
  { name: "Red", value: "red" },
  { name: "Orange", value: "orange" },
  { name: "Amber", value: "amber" },
  { name: "Yellow", value: "yellow" },
  { name: "Lime", value: "lime" },
  { name: "Green", value: "green" },
  { name: "Emerald", value: "emerald" },
  { name: "Teal", value: "teal" },
  { name: "Cyan", value: "cyan" },
  { name: "Sky", value: "sky" },
  { name: "Blue", value: "blue" },
  { name: "Indigo", value: "indigo" },
  { name: "Violet", value: "violet" },
  { name: "Purple", value: "purple" },
  { name: "Fuchsia", value: "fuchsia" },
  { name: "Pink", value: "pink" },
  { name: "Rose", value: "rose" },
] as const

const NEUTRAL_THEMES = [
  { name: "Slate", value: "slate" },
  { name: "Gray", value: "gray" },
  { name: "Zinc", value: "zinc" },
  { name: "Neutral", value: "neutral" },
  { name: "Stone", value: "stone" },
] as const

const ALL_THEMES = [...DEFAULT_THEMES, ...NEUTRAL_THEMES, ...COLOR_THEMES]

/** Base orb image (measured base hue ≈ 205°) */
const ORB_SRC = "/orbs/orb-5.webp"

/** Hue values for all themes (relative to base ≈ 205°) */
const HUE_BY_THEME: Record<string, number> = {
  // defaults
  default: 40,
  // colors
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

const NEUTRAL_THEMES_LIST = ["slate", "gray", "zinc", "neutral", "stone"]

const NEUTRAL_BRIGHTNESS: Record<string, number> = {
  slate: 0.85,
  gray: 1.0,
  zinc: 0.75,
  neutral: 1.15,
  stone: 0.65,
}

type ThemeOverride = {
  img?: React.CSSProperties
  wrapper?: React.CSSProperties
  src?: string
}

const THEME_OVERRIDES: Record<string, ThemeOverride> = {
  emerald: {
    src: "/orbs/orb-2.webp",
    img: {
      color: "transparent",
      filter: "hue-rotate(316deg) saturate(120%)",
      transform: "rotate(316deg)",
      objectFit: "cover",
      objectPosition: "center center",
    },
  },
  pink: {
    img: {
      color: "transparent",
      filter: "hue-rotate(101deg) saturate(120%)",
      transform: "rotate(101deg)",
      objectFit: "cover",
      objectPosition: "center center",
    },
  },
}

function ColorOrb({ themeValue, size = 18 }: { themeValue: string; size?: number }) {
  const override = THEME_OVERRIDES[themeValue]
  const hue = HUE_BY_THEME[themeValue]
  const isNeutral = NEUTRAL_THEMES_LIST.includes(themeValue)

  // Handle neutral themes with desaturation
  if (isNeutral) {
    const brightness = NEUTRAL_BRIGHTNESS[themeValue] ?? 1.0
    return (
      <Orb
        src={override?.src ?? ORB_SRC}
        size={size}
        hueDeg={0}
        saturate={0.15}
        rotateDeg={0}
        imgStyle={{
          filter: `saturate(0.15) brightness(${brightness})`,
          ...override?.img,
        }}
        wrapperStyle={override?.wrapper}
        imgClassName="pointer-events-none select-none"
      />
    )
  }

  // Handle color themes with hue rotation
  const hasMapping = hue !== undefined || override
  return (
    <Orb
      src={override?.src ?? ORB_SRC}
      size={size}
      hueDeg={hasMapping ? (hue ?? 0) : 0}
      saturate={1.2}
      rotateDeg={149}
      imgStyle={override?.img}
      wrapperStyle={override?.wrapper}
      imgClassName="pointer-events-none select-none"
    />
  )
}

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme } = useThemeConfig()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"list" | "palette">("list")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const selectedTheme = ALL_THEMES.find((t) => t.value === activeTheme)
  const showOrb =
    mounted &&
    activeTheme != null &&
    (HUE_BY_THEME[activeTheme] !== undefined || 
     THEME_OVERRIDES[activeTheme] !== undefined ||
     NEUTRAL_THEMES_LIST.includes(activeTheme))

  const handleThemeSelect = React.useCallback((themeValue: string) => {
    setActiveTheme(themeValue)
    setOpen(false)
  }, [setActiveTheme])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        {/* === TRIGGER: JUST THE ORB WITH TOOLTIP === */}
        <TooltipProvider>
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  id="theme-selector"
                  variant="outline"
                  aria-label={selectedTheme ? `${selectedTheme.name} theme` : "Select theme"}
                  className="text-secondary-foreground border-none shadow-none h-6 w-6 p-0 rounded-full flex items-center justify-center"
                >
                  {/* if there is a mapping/override show configured orb; else show base orb */}
                  {showOrb ? (
                    <ColorOrb key={activeTheme} themeValue={activeTheme!} size={18} />
                  ) : (
                    <Orb src={ORB_SRC} size={18} hueDeg={0} saturate={1.0} rotateDeg={0} />
                  )}
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent sideOffset={8}>
              {selectedTheme ? selectedTheme.name : "Select theme"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* === POPOVER CONTENT === */}
        <PopoverContent className="size-auto gap-0 overflow-hidden p-0" align="end">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "palette")} className="gap-0">
            <div className="flex items-center justify-between gap-4">
              <div className="ml-2 flex items-center gap-1.5">
                <span className="text-muted-foreground text-sm">Themes</span>
              </div>

              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-input/25 size-8 p-0 data-[state=active]:shadow-none"
                >
                  <List className="size-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="palette"
                  className="data-[state=active]:bg-input/25 size-8 p-0 data-[state=active]:shadow-none"
                >
                  <LayoutGrid className="size-4" />
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />

            {/* LIST VIEW */}
            <TabsContent value="list" className="my-0 min-w-[300px]">
              <Command className="flex h-84 flex-col">
                <CommandInput className="h-10" placeholder="Search theme..." />
                <ScrollArea className="flex-1 overflow-hidden">
                  <CommandList>
                    <CommandEmpty>No theme found.</CommandEmpty>

                    {/* DEFAULT THEMES */}
                    <CommandGroup>
                      {DEFAULT_THEMES.map((theme) => (
                        <CommandItem
                          key={theme.value}
                          value={theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        >
                          <div className="flex items-center gap-2">
                            {(HUE_BY_THEME[theme.value] !== undefined ||
                              THEME_OVERRIDES[theme.value] ||
                              NEUTRAL_THEMES_LIST.includes(theme.value)) && <ColorOrb themeValue={theme.value} />}
                            <span>{theme.name}</span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              activeTheme === theme.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator />

                    {/* COLOR THEMES */}
                    <CommandGroup heading="Colors">
                      {COLOR_THEMES.map((theme) => (
                        <CommandItem
                          key={theme.value}
                          value={theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        >
                          <div className="flex items-center gap-2">
                            {(HUE_BY_THEME[theme.value] !== undefined ||
                              THEME_OVERRIDES[theme.value] ||
                              NEUTRAL_THEMES_LIST.includes(theme.value)) && <ColorOrb themeValue={theme.value} />}
                            <span>{theme.name}</span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              activeTheme === theme.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator />

                    {/* NEUTRAL THEMES */}
                    <CommandGroup heading="Neutrals">
                      {NEUTRAL_THEMES.map((theme) => (
                        <CommandItem
                          key={theme.value}
                          value={theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        >
                          <div className="flex items-center gap-2">
                            {(HUE_BY_THEME[theme.value] !== undefined ||
                              THEME_OVERRIDES[theme.value] ||
                              NEUTRAL_THEMES_LIST.includes(theme.value)) && <ColorOrb themeValue={theme.value} />}
                            <span>{theme.name}</span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              activeTheme === theme.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </ScrollArea>
              </Command>
            </TabsContent>

            {/* PALETTE/GRID VIEW */}
            <TabsContent value="palette" className="my-0 w-full">
              <ScrollArea className="h-84 w-full">
                <div className="flex flex-col gap-4 p-4">
                  {/* Default Theme */}
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-xs font-medium">Default</span>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_THEMES.map((theme) => (
                        <ThemeOrb
                          key={theme.value}
                          theme={theme}
                          isSelected={activeTheme === theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Color Themes */}
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-xs font-medium">Colors</span>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_THEMES.map((theme) => (
                        <ThemeOrb
                          key={theme.value}
                          theme={theme}
                          isSelected={activeTheme === theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Neutral Themes */}
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-xs font-medium">Neutrals</span>
                    <div className="flex flex-wrap gap-2">
                      {NEUTRAL_THEMES.map((theme) => (
                        <ThemeOrb
                          key={theme.value}
                          theme={theme}
                          isSelected={activeTheme === theme.value}
                          onSelect={() => handleThemeSelect(theme.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ThemeOrbProps {
  theme: { name: string; value: string }
  isSelected: boolean
  onSelect: () => void
}

function ThemeOrb({ theme, isSelected, onSelect }: ThemeOrbProps) {
  return (
    <button
      onClick={onSelect}
      aria-label={`Select ${theme.name} theme`}
      title={theme.name}
      className={cn(
        "group relative cursor-pointer rounded-md transition-all hover:z-10 hover:scale-110",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <ColorOrb themeValue={theme.value} size={32} />
      <div className="group-hover:ring-foreground/50 absolute inset-0 rounded-[inherit] ring-2 ring-transparent transition-all duration-200" />
    </button>
  )
}