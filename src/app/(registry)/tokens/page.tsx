"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";

import { FontBlock } from "@/app/(registry)/tokens/font-block";
import { Button } from "@/components/ui/button";
import { ColorBlock } from "./color-block";
import { RegistryHeader } from "@/components/registry/registry-header";

export default function TokensPage() {
  return (
    <div className="flex flex-col min-h-full w-full">
    <RegistryHeader componentTitle="Design Tokens" componentIcon="LayoutGrid" />

    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="font-bold text-3xl tracking-tight">Design Tokens</h1>
        <p className="mt-1 text-muted-foreground">
          A comprehensive overview of all color tokens used in the design system
        </p>
      </div>

      {/* Fonts */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Fonts</h2>
        <p className="mb-6 text-muted-foreground">
          The core font families that define the primary typography.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <FontBlock className="font-sans" />
          <FontBlock className="font-serif" />
          <FontBlock className="font-mono" />
        </div>
      </section>

      {/* Primary Theme */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Primary Theme</h2>
        <p className="mb-6 text-muted-foreground">
          The core colors that define the primary theme and overall look of the
          interface.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ColorBlock name="Background" className="bg-background" />
          <ColorBlock name="Foreground" className="bg-foreground" />
          <ColorBlock name="Primary" className="bg-primary" />
          <ColorBlock
            name="Primary Foreground"
            className="bg-primary-foreground"
          />
            <ColorBlock name="Secondary" className="bg-secondary" />
          <ColorBlock
            name="Secondary Foreground"
            className="bg-secondary-foreground"
          />
          <ColorBlock name="Accent" className="bg-accent" />
          <ColorBlock
            name="Accent Foreground"
            className="bg-accent-foreground"
          />
        </div>
      </section>

      {/* Muted */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Muted</h2>
        <p className="mb-6 text-muted-foreground">
          Colors used for muted elements.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ColorBlock name="Muted" className="bg-muted" />
          <ColorBlock name="Muted Secondary" className="bg-muted-secondary" />
          <ColorBlock name="Muted Foreground" className="bg-muted-foreground" />
        </div>
      </section>
       {/* UI Component */}
       <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">UI Component</h2>
        <p className="mb-6 text-muted-foreground">
          Colors used for specific UI components like cards, popovers, and muted
          elements.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ColorBlock name="Card" className="bg-card" />
          <ColorBlock name="Card Foreground" className="bg-card-foreground" />
          <ColorBlock name="Border" className="bg-border" />
          <ColorBlock name="Input" className="bg-input" />
          <ColorBlock name="Ring" className="bg-ring" />
          <ColorBlock name="Tooltip" className="bg-tooltip" />
          <ColorBlock name="Selection" className="bg-selection" />
          <ColorBlock name="Selection Foreground" className="bg-selection-foreground" />
        </div>
      </section>

      {/* Status & Feedback */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Status & Feedback</h2>
        <p className="mb-6 text-muted-foreground">
          Colors used to indicate different states and provide feedback to
          users.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ColorBlock name="Destructive" className="bg-destructive" />
          <ColorBlock
            name="Destructive Foreground"
            className="bg-destructive-foreground"
          />
          <ColorBlock name="Success" className="bg-success" />
          <ColorBlock
            name="Success Foreground"
            className="bg-success-foreground"
          />
          <ColorBlock name="Warning" className="bg-warning" />
          <ColorBlock
            name="Warning Foreground"
            className="bg-warning-foreground"
          />
          <ColorBlock name="Info" className="bg-info" />
          <ColorBlock
            name="Info Foreground"
            className="bg-info-foreground"
          />
        </div>
      </section>

      {/* Chart & Visualization */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Chart & Visualization</h2>
        <p className="mb-6 text-muted-foreground">
          Colors used for data visualization and charts.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-8">
          <ColorBlock name="Chart 1" className="bg-chart-1" />
          <ColorBlock name="Chart 2" className="bg-chart-2" />
          <ColorBlock name="Chart 3" className="bg-chart-3" />
          <ColorBlock name="Chart 4" className="bg-chart-4" />
          <ColorBlock name="Chart 5" className="bg-chart-5" />
          <ColorBlock name="Chart 6" className="bg-chart-6" />
          <ColorBlock name="Chart 7" className="bg-chart-7" />
          <ColorBlock name="Chart 8" className="bg-chart-8" />
          <ColorBlock name="Chart 9" className="bg-chart-9" />
          <ColorBlock name="Chart 10" className="bg-chart-10" />
          <ColorBlock name="Chart 11" className="bg-chart-11" />
        </div>
      </section>

      {/* Sidebar & Navigation */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Sidebar & Navigation</h2>
        <p className="mb-6 text-muted-foreground">
          Colors specific to the sidebar and navigation components.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ColorBlock name="Sidebar" className="bg-sidebar" />
          <ColorBlock
            name="Sidebar Foreground"
            className="bg-sidebar-foreground"
          />
          <ColorBlock name="Sidebar Primary" className="bg-sidebar-primary" />
          <ColorBlock
            name="Sidebar Primary Foreground"
            className="bg-sidebar-primary-foreground"
          />
          <ColorBlock name="Sidebar Accent" className="bg-sidebar-accent" />
          <ColorBlock
            name="Sidebar Accent Foreground"
            className="bg-sidebar-accent-foreground"
          />
          <ColorBlock name="Sidebar Border" className="bg-sidebar-border" />
          <ColorBlock name="Sidebar Ring" className="bg-sidebar-ring" />
        </div>
      </section>
    </div>
    </div>
  );
}
