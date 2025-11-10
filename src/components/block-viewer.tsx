"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  ChevronRight,
  Clipboard,
  Code,
  Eye,
  File,
  Folder,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
} from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Type definitions
export interface RegistryFile {
  path: string
  target?: string
  type: string
  content?: string
  highlightedContent?: string
}

export interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  files?: RegistryFile[]
  meta?: {
    iframeHeight?: number
    containerClassName?: string
    mobile?: "component" | "image"
  }
}

export interface FileTree {
  name: string
  path?: string
  children?: FileTree[]
}

type BlockViewerContext = {
  item: RegistryItem
  view: "code" | "preview"
  setView: (view: "code" | "preview") => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null> | null
  tree: FileTree[] | null
  highlightedFiles: RegistryFile[] | null
  iframeKey?: number
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) {
    throw new Error("useBlockViewer must be used within a BlockViewerProvider.")
  }
  return context
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview")
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >(highlightedFiles?.[0]?.target ?? null)
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null)
  const [iframeKey, setIframeKey] = React.useState(0)

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
        tree,
        highlightedFiles,
        iframeKey,
        setIframeKey,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className="group/block-view-wrapper flex min-w-0 max-w-full scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
        style={
          {
            "--height": item.meta?.iframeHeight ?? "600px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  )
}

type BlockViewerProps = Pick<
  BlockViewerContext,
  "item" | "tree" | "highlightedFiles"
> & {
  children: React.ReactNode
  hideToolbar?: boolean
  registryUrl?: string
}

function BlockViewerToolbar({ registryUrl }: { registryUrl?: string }) {
  const { setView, view, item, resizablePanelRef, setIframeKey } =
    useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const views = [
    ["preview", Eye, "Preview"] as const,
    ["code", Code, "Code"] as const,
  ]

  return (
    <div className="hidden w-full mt-0 items-center gap-2 px-2 lg:flex overflow-x-auto">
      <TooltipProvider>
        <div className="inline-flex items-center rounded-lg border p-0 shrink-0" data-view-toggle="">
          {views.map(([key, Icon, tooltipText]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={tooltipText}
                  className={cn(
                    "size-8 rounded-full p-1.5",
                    view === key
                      ? "bg-primary-foreground text-primary [&_svg]:text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setView(key)}
                >
                  <Icon className="size-full" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="h-8 items-center gap-1.5 rounded-md border p-1 shadow-none shrink-0">
          <ToggleGroup
            type="single"
            defaultValue="100"
            onValueChange={(value) => {
              setView("preview")
              if (resizablePanelRef?.current) {
                resizablePanelRef.current.resize(parseInt(value))
              }
            }}
            className="gap-1"
          >
            <ToggleGroupItem value="100" title="Desktop" className="size-6">
              <Monitor className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="60" title="Tablet" className="size-6">
              <Tablet className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="30" title="Mobile" className="size-6">
              <Smartphone className="size-4" />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <Link href={`/demo/${item.name}`} target="_blank">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen className="size-4" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              title="Refresh Preview"
              onClick={() => {
                if (setIframeKey) {
                  setIframeKey((k) => k + 1)
                }
              }}
            >
              <RotateCw className="size-4" />
              <span className="sr-only">Refresh Preview</span>
            </Button>
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}

function BlockViewerIframe({ className }: { className?: string }) {
  const { item, iframeKey } = useBlockViewer()

  return (
    <iframe
      key={iframeKey}
      src={`/demo/${item.name}`}
      height={item.meta?.iframeHeight ?? 600}
      loading="lazy"
      className={cn(
        "bg-background no-scrollbar relative z-20 w-full",
        className
      )}
    />
  )
}

function BlockViewerView() {
  const { resizablePanelRef } = useBlockViewer()

  return (
    <div className="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex">
      <div className="relative w-full">
        <div className="absolute inset-0 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"></div>
        <ResizablePanelGroup
          direction="horizontal"
          className="after:bg-surface/50 relative after:absolute after:inset-0 after:z-0 after:rounded-xl"
        >
          <ResizablePanel
            ref={resizablePanelRef}
            className="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
            defaultSize={100}
            minSize={30}
          >
            <BlockViewerIframe />
          </ResizablePanel>
          <ResizableHandle className="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function BlockViewerMobile({ children }: { children: React.ReactNode }) {
  const { item } = useBlockViewer()

  return (
    <div className="flex flex-col gap-2 lg:hidden">
      <div className="flex items-center gap-2 px-2">
        <div className="line-clamp-1 text-sm font-medium">
          {item.description}
        </div>
        <div className="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
          {item.name}
        </div>
      </div>
      {item.meta?.mobile === "component" ? (
        children
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">Mobile preview coming soon</p>
          </div>
        </div>
      )}
    </div>
  )
}

function BlockViewerCode() {
  const { activeFile, highlightedFiles } = useBlockViewer()
  const { state } = useSidebar()

  const file = React.useMemo(() => {
    return highlightedFiles?.find((file) => file.target === activeFile)
  }, [highlightedFiles, activeFile])

  if (!file) {
    return null
  }

  const language = file.path.split(".").pop() ?? "tsx"

  return (
    <div 
      className={cn(
        "bg-muted/50 flex w-full overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)",
        "transition-[width] duration-200 ease-linear"
      )}
    >
      <div className="w-60 flex flex-col h-full shrink-0 overflow-hidden lg:w-72">
        <BlockViewerFileTree />
      </div>
      <figure
        data-rehype-pretty-code-figure=""
        className="!mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none overflow-hidden"
      >
        <figcaption
          className="flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2"
          data-language={language}
        >
          <File className="size-4 opacity-70" />
          {file.target}
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </figcaption>
        <div className="flex-1 overflow-auto">
          {file.highlightedContent ? (
            <div
              key={file?.path}
              dangerouslySetInnerHTML={{ __html: file?.highlightedContent ?? "" }}
              className="[&_pre]:!overflow-x-auto [&_pre]:!max-w-full [&_code]:!break-normal"
            />
          ) : (
            <pre className="p-4 overflow-x-auto">
              <code>{file.content}</code>
            </pre>
          )}
        </div>
      </figure>
    </div>
  )
}

export function BlockViewerFileTree() {
  const { tree } = useBlockViewer()

  if (!tree) {
    return null
  }

  return (
    <div className="flex h-full flex-col border-r">
      <div className="flex h-12 shrink-0 items-center border-b px-4">
        <span className="text-sm font-medium">Files</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarProvider className="h-full">
          <Sidebar collapsible="none" className="w-full">
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="translate-x-0 gap-1.5">
                  {tree.map((file, index) => (
                    <Tree key={index} item={file} index={1} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Sidebar>
        </SidebarProvider>
      </div>
    </div>
  )
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer()

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="hover:bg-primary/5 focus:bg-primary/5 focus-visible:bg-primary/5 active:bg-primary/5 data-[active=true]:bg-primary/5 rounded-none whitespace-nowrap"
          style={
            {
              paddingLeft: `${index * 1.2}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="hover:bg-primary/5 focus:bg-primary/5 focus-visible:bg-primary/5 active:bg-primary/5 data-[active=true]:bg-primary/5 rounded-none whitespace-nowrap"
            style={
              {
                paddingLeft: `${index * (index === 1 ? 1 : 1.2)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function BlockCopyCodeButton() {
  const { activeFile, item } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const file = React.useMemo(() => {
    return item.files?.find((file) => file.target === activeFile)
  }, [activeFile, item.files])

  const content = file?.content

  if (!content) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => {
        copyToClipboard(content)
      }}
    >
      {isCopied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
    </Button>
  )
}

function BlockViewer({
  item,
  tree,
  highlightedFiles,
  children,
  hideToolbar = false,
  registryUrl,
  ...props
}: BlockViewerProps) {
  return (
    <BlockViewerProvider
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      {...props}
    >
      {!hideToolbar && <BlockViewerToolbar registryUrl={registryUrl} />}
      <BlockViewerView />
      <BlockViewerCode />
      <BlockViewerMobile>{children}</BlockViewerMobile>
    </BlockViewerProvider>
  )
}

export { BlockViewer }