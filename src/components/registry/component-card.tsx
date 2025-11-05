"use client";

import { Check, Copy, Component as ComponentIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

import { OpenInV0Button } from "@/components/registry/open-in-v0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://${baseUrl}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const IconComponent = component.icon && LucideIcons[component.icon as keyof typeof LucideIcons]
    ? (LucideIcons[component.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : ComponentIcon;

  return (
    <section>
      <Card id="starting-kit" className="border-border py-2 gap-4">
        <CardHeader className="border-b [.border-b]:pb-0">
          <div className="flex flex-col gap-4">
        
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
              <div className="flex flex-col gap-2">
                <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  {component.title || component.name}
                </CardTitle>
              </div>

              <div className="flex items-center gap-1 sm:ml-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent className="font-mono">
                      Copy npx command
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="p-4"
                        aria-label="Copy npx command to clipboard"
                      >
                        {copied ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>

                <OpenInV0Button
                  registryUrl={registryUrl}
                  title={`${component.title} Kit`}
                  prompt={prompt}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 px-4">
          <div
            className={
              "h-[800px] w-full overflow-hidden p-0"
            }
          >
            <iframe
              id="iframe"
              src={`/demo/${component.name}`}
              className="h-full w-full"
              title="Page Preview"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}