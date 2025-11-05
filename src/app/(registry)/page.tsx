import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { OrbAnnouncement } from "@/components/orb-announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { RegistryHeader } from "@/components/registry/registry-header";

const title = "LinderLabs UI"
const description =
  "AI Tools, Blocks, & Components for your projects."


export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-col min-h-full w-full">
    <RegistryHeader componentTitle={title} />
    <div className="flex-1 p-5 sm:mt-16 md:mt-12 sm:p-5 md:p-10">
    <div className="flex flex-1 flex-col">
      <PageHeader className="relative">
          <OrbAnnouncement />
          <PageHeaderHeading className="max-w-4xl">
            <span className="flex items-baseline gap-2 sm:gap-3">
              <span className="font-waldenburg-ht leading-[0.95] font-bold tracking-[-0.03em]">
                LinderLabs
              </span>
              <span className="font-waldenburg text-primary font-normal tracking-[-0.02em] opacity-90">
                UI
              </span>
            </span>
          </PageHeaderHeading>
          <PageHeaderDescription>{description}</PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <Link href="/blocks">Explore Tools</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/docs/components">View Components</Link>
            </Button>
          </PageActions>
        </PageHeader>
      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]">
            <Image
              src="/r/styles/new-york-v4/dashboard-01-light.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="block dark:hidden"
              priority
            />
            <Image
              src="/r/styles/new-york-v4/dashboard-01-dark.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="hidden dark:block"
              priority
            />
          </section>
          <section className="theme-container hidden md:block">
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
    </div>
    </div>
  
  )
}
