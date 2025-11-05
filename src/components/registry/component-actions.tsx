"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/icons/icons";

/* ----- Shared helper from OpenInV0Button ----- */
function buildV0Url(registryUrl: string, title?: string, prompt?: string) {
  const params = new URLSearchParams();
  params.append("url", registryUrl);

  if (title != null) {
    params.append("title", title);
  }

  if (prompt != null) {
    params.append("prompt", prompt);
  }

  return `https://v0.dev/chat/api/open?${params.toString()}`;
}

/* ----- Types ----- */
interface ComponentActionsProps {
  component: {
    name: string;
    title: string;
    description?: string;
    type: string;
  };
  markdown: string;
}

/* ----- Helpers for the other menu items (ChatGPT/Claude, etc.) ----- */
function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this shadcn/ui component: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
  )}`;
}

/* ----- Stateless renderers for simple items ----- */
const menuItems = {
  registry: (registryUrl: string) => (
    <a href={registryUrl} target="_blank" rel="noopener noreferrer">
      <Icons.FileJson />
      View Registry JSON
    </a>
  ),
  markdown: (markdown: string) => (
    <button
      onClick={() => {
        navigator.clipboard.writeText(markdown);
        toast.success("Markdown copied to clipboard");
      }}
      className="w-full"
    >
      <Icons.md />
      Copy as Markdown
    </button>
  ),
  chatgpt: (componentUrl: string) => (
    <a
      href={getPromptUrl("https://chatgpt.com", componentUrl)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icons.chatgpt />
      Open in ChatGPT
    </a>
  ),
  claude: (componentUrl: string) => (
    <a
      href={getPromptUrl("https://claude.ai/new", componentUrl)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icons.claude />
      Open in Claude
    </a>
  ),
};

/* ----- MenuList now contains the v0 logic matching OpenInV0Button ----- */
function MenuList({
  registryUrl,
  markdown,
  componentUrl,
  title,
}: {
  registryUrl: string;
  markdown: string;
  componentUrl: string;
  title: string;
}) {
  const handleOpenInV0 = useCallback(() => {
    const url = buildV0Url(registryUrl, title);

    if (process.env.NODE_ENV === "development") {
      toast.warning("You're on localhost", {
        description:
          "Open in v0 does not work in development mode, please deploy first.",
      });
      return;
    }

    // Safe open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  }, [registryUrl, title]);

  return (
    <Command>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem key="registry" asChild>
            {menuItems.registry(registryUrl)}
          </CommandItem>

          <CommandItem key="markdown" asChild>
            {menuItems.markdown(markdown)}
          </CommandItem>

          {/* Updated v0 item: matches OpenInV0Button behavior */}
          <CommandItem
            key="v0"
            onSelect={handleOpenInV0}
            className="cursor-pointer"
          >
            <Icons.v0 className="size-4.5 -translate-x-px" />
            <span className="-translate-x-[2px]">Open in v0</span>
          </CommandItem>

          <CommandItem key="chatgpt" asChild>
            {menuItems.chatgpt(componentUrl)}
          </CommandItem>

          <CommandItem key="claude" asChild>
            {menuItems.claude(componentUrl)}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function ComponentActions({ component, markdown }: ComponentActionsProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "";

  const registryUrl = `${origin}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;
  const componentUrl = `${origin}/registry/${component.name}`;

  const trigger = (
    <Button
      variant="secondaryOutline"
      size="sm"
      className="peer -ml-0.5 size-7 shadow-none text-sm"
      aria-label="Open actions"
    >
      <Icons.chevronDown className="sm:rotate-0" />
    </Button>
  );

  return (
    <div className="border border-border group/buttons relative flex rounded-lg *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
      {/* Copy Install Command button */}
      <Button
        variant="secondaryOutline"
        size="sm"
        className="h-7 shadow-none text-sm"
        onClick={() => {
          copyToClipboard(npxCommand);
          toast.success("Install command copied to clipboard");
        }}
      >
        {isCopied ? (
          <Icons.check className="h-3.5 w-3.5" />
        ) : (
          <Icons.copy className="h-3.5 w-3.5" />
        )}
        <span className="text-muted-foreground hover:text-primary">
          Copy Install
        </span>
      </Button>

      {/* Desktop Popover (Command) */}
      <Popover>
        <PopoverTrigger asChild className="hidden sm:flex">
          {trigger}
        </PopoverTrigger>
        <PopoverContent align="end" className="hidden w-56 p-0 shadow-sm sm:block">
          <MenuList
            registryUrl={registryUrl}
            markdown={markdown}
            componentUrl={componentUrl}
            title={component.title}
          />
        </PopoverContent>
      </Popover>

      {/* Divider between copy and trigger */}
      <Separator
        orientation="vertical"
        className="!bg-foreground/10 absolute right-7 top-0 z-0 !h-7"
      />

      {/* Mobile Popover (Command) */}
      <Popover>
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/70 dark:bg-background/60 w-52 !origin-center rounded-lg p-0 shadow-sm backdrop-blur-sm sm:hidden"
          align="end"
        >
          <MenuList
            registryUrl={registryUrl}
            markdown={markdown}
            componentUrl={componentUrl}
            title={component.title}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
