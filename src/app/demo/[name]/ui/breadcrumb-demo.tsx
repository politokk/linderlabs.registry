import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Home, FileText, Palette, GithubIcon, Component, Heart } from "lucide-react";
  export function BreadcrumbDemo() {
    return (
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#home" className="flex items-center gap-1">
            <Home className="size-3.5" />
            Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <FileText className="size-3.5" />
                  Documentation</DropdownMenuItem>
                <DropdownMenuItem>
                  <Palette className="size-3.5" />
                  Themes</DropdownMenuItem>
                <DropdownMenuItem>
                  <GithubIcon className="size-3.5" />
                  GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#components" className="flex items-center gap-1">
            <Component className="size-3.5" />
            Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Heart className="size-3.5" />
              Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  } 