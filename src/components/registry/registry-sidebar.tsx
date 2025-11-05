"use client";

import {
  Blocks,
  ChevronDown,
  ChevronRight,
  Component,
  Home,
  ToyBrick,
  Palette,
  type LucideIcon,
  Lightbulb,
  Paintbrush,
  Book,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { RegistryLogo } from "@/components/registry/registry-logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getBlocks, getComponents, getUIPrimitives } from "@/lib/registry";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
const data = {
  user: {
    name: "Linder",
    email: "hello@linderlabs.com",
    avatar: "/linderavatar.png",
  },
  teams: [
    {
      name: "LinderLabs",
      accent: "UI",
      avatar: "/orbs/orb-3.mp4",
      plan: "Free",
    }
  ],
};


const uiItems = getUIPrimitives();
const componentItems = getComponents();
const blockItems = getBlocks();

// Function to get icon component from registry data
function getIconComponent(component: any): LucideIcon {
  if (component.icon && LucideIcons[component.icon as keyof typeof LucideIcons]) {
    return LucideIcons[component.icon as keyof typeof LucideIcons] as LucideIcon;
  }
  
  // Fallback icons based on component type
  switch (component.type) {
    case "registry:block":
      return Blocks;
    case "registry:component":
      return Component;
    case "registry:ui":
      return ToyBrick;
    default:
      return Component;
  }
}

export const gettingStartedItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Design Tokens", path: "/tokens", icon: Palette },
  { title: "Registry", path: "/registry", icon: Book },
  { title: "Colors", path: "/colors", icon: Paintbrush },
];

export function RegistrySidebar() {
  const pathname = usePathname();

  const { setOpenMobile } = useSidebar();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUiItems, setFilteredUiItems] = useState(uiItems);
  const [filteredComponents, setFilteredComponents] = useState(componentItems);
  const [filteredBlocks, setFilteredBlocks] = useState(blockItems);

  useEffect(() => {
    if (searchTerm) {
      setFilteredUiItems(
        uiItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredComponents(
        componentItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredBlocks(
        blockItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredUiItems(uiItems);
      setFilteredComponents(componentItems);
      setFilteredBlocks(blockItems);
    }
  }, [searchTerm]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
      <ScrollArea className="h-full w-full group-data-[collapsible=icon]:p-0 px-1.5" suppressHydrationWarning>          <Collapsible defaultOpen={true} className="group/collapsible" id="getting-started">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="relative flex min-w-0 items-center">
                    <Lightbulb className="size-3 flex-shrink-0 transition-opacity duration-200 group-hover/collapsible:opacity-0" />
                    <ChevronDown className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:block group-data-[state=closed]/collapsible:hidden" />
                    <ChevronRight className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:hidden group-data-[state=closed]/collapsible:block" />
                    <span className="ml-2 opacity-100 transition-all duration-200 group-data-[collapsible=icon]:opacity-0">
                      Getting Started
                    </span>
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {gettingStartedItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.path}
                            tooltip={item.title}
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={item.path}
                              className="flex items-center gap-2"
                            >
                              <Icon className="size-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen={true} className="group/collapsible" id="blocks">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="relative flex min-w-0 items-center">
                    <Blocks className="size-3 flex-shrink-0 transition-opacity duration-200 group-hover/collapsible:opacity-0" />
                    <ChevronDown className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:block group-data-[state=closed]/collapsible:hidden" />
                    <ChevronRight className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:hidden group-data-[state=closed]/collapsible:block" />
                    <span className="ml-2 transition-all duration-200 group-data-[collapsible=icon]:opacity-0">
                      Blocks
                    </span>
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredBlocks.map((item) => {
                      const Icon = getIconComponent(item);
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === `/registry/${item.name}`}
                            tooltip={item.title}
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={`/registry/${item.name}`}
                              className="flex items-center gap-2"
                            >
                              <Icon className="size-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen={true} className="group/collapsible" id="components">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="relative flex min-w-0 items-center">
                    <Component className="size-3 flex-shrink-0 transition-opacity duration-200 group-hover/collapsible:opacity-0" />
                    <ChevronDown className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:block group-data-[state=closed]/collapsible:hidden" />
                    <ChevronRight className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:hidden group-data-[state=closed]/collapsible:block" />
                    <span className="ml-2 transition-all duration-200 group-data-[collapsible=icon]:opacity-0">
                      Components
                    </span>
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredComponents.map((item) => {
                      const Icon = getIconComponent(item);
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === `/registry/${item.name}`}
                            tooltip={item.title}
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={`/registry/${item.name}`}
                              className="flex items-center gap-2"
                            >
                              <Icon className="size-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen={true} className="group/collapsible" id="ui-primitives">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="relative flex min-w-0 items-center">
                    <ToyBrick className="size-3 flex-shrink-0 transition-opacity duration-200 group-hover/collapsible:opacity-0" />
                    <ChevronDown className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:block group-data-[state=closed]/collapsible:hidden" />
                    <ChevronRight className="absolute size-3 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:hidden group-data-[state=closed]/collapsible:block" />
                    <span className="ml-2 transition-all duration-200 group-data-[collapsible=icon]:opacity-0">
                      UI
                    </span>
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredUiItems.map((item) => {
                      const Icon = getIconComponent(item);
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === `/registry/${item.name}`}
                            tooltip={item.title}
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={`/registry/${item.name}`}
                              className="flex items-center gap-2"
                            >
                              <Icon className="size-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-end">
        <NavUser user={data.user} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}