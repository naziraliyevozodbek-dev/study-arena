import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-1 active:border-b-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover border-b-4 border-primary-border pb-1",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover border-b-4 border-secondary-border pb-1",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover border-b-4 border-destructive-border pb-1",
        outline: "border-2 border-border bg-background hover:bg-muted border-b-4 pb-1",
        ghost: "hover:bg-muted hover:text-foreground active:translate-y-0 active:border-b-0 pb-0",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Note: since we don't have radix-ui installed, we fallback to standard button if asChild is not needed, but we should install it or just use a standard button for now.
    // For simplicity, I'm omitting Slot and using standard button.
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
