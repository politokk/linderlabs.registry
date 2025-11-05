import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-none hover:bg-accent hover:text-accent-foreground hover:[&_svg]:text-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondaryOutline:
          "bg-background text-secondary-foreground hover:bg-secondary/80 hover:text-primary hover:[&_svg]:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        foreground:
          "bg-primary-foreground text-primary [&_svg]:text-primary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:[&_svg]:text-primary",
        link: "hover:text-link underline-offset-4 hover:underline",
        dislike:
          "hover:bg-destructive/5 hover:text-destructive focus:[&_svg]:text-destructive hover:[&_svg]:text-destructive  dark:hover:bg-accent/50",
        like: "hover:bg-green-50 hover:text-emerald-500 focus:[&_svg]:text-emerald-500 hover:[&_svg]:text-emerald-500   dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-8",
        iconSm: "size-8",
        iconXs: "size-6",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xs": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }