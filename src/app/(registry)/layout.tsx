import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

import {
  RegistrySidebar,
} from "@/components/registry/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ActiveThemeProvider } from "@/components/active-theme"

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ActiveThemeProvider>
    <SidebarProvider>
      <RegistrySidebar />
      <main className="flex w-full justify-center">{children}</main>
      <Toaster />
    </SidebarProvider>
    </ActiveThemeProvider>
  );
}
