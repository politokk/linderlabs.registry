import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { ActiveThemeProvider } from "@/components/active-theme"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { RootProvider } from 'fumadocs-ui/provider/next';

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "shadcn"],
  authors: [
    {
      name: "linderlabs",
      url: "https://linderlabs.com",
    },
  ],
  creator: "linderlabs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`],
    creator: "@linderlabs",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Hide content until theme is loaded
                document.body.classList.add('theme-loading')

                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
                if (localStorage['active-theme']) {
                  document.body.classList.add('theme-' + localStorage['active-theme'])
                }

                // Show content after theme is applied
                document.body.classList.remove('theme-loading')
              } catch (_) {
                // Fallback: show content even if theme loading fails
                document.body.classList.remove('theme-loading')
              }
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
        <meta
          name="robots"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "text-foreground group/body theme-default overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <RootProvider>
          <ThemeProvider>
            <LayoutProvider>
              <ActiveThemeProvider initialTheme="default">
                {children}
                <TailwindIndicator />
                <Toaster position="top-center" />
              </ActiveThemeProvider>
            </LayoutProvider>
          </ThemeProvider>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}