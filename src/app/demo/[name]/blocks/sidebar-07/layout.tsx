import type React from "react"
import type { Metadata } from "next"

import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { ActiveThemeProvider } from "@/components/active-theme"
import { Toaster } from "@/components/ui/sonner"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Linderlabs",
    template: `%s - Linderlabs`,
  },
  description: "A example registry for distributing code using shadcn.",
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
    title: "Linderlabs",
    description: "A example registry for distributing code using shadcn.",
    siteName: "Linderlabs",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Linderlabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linderlabs",
    description: "A example registry for distributing code using shadcn.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`],
    creator: "@linderlabs",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
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
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "text-foreground group/body theme-default overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables,
        )}
      >
        <ActiveThemeProvider initialTheme="default">
          <LayoutProvider>
            {children}
            <Toaster position="top-center" />
          </LayoutProvider>
        </ActiveThemeProvider>
      </body>
    </html>
  )
}
