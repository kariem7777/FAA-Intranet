import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {

    // Base styles
    let classes = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

    // Variants
    switch (variant) {
      case "default":
        classes += " bg-primary text-primary-foreground hover:bg-primary/90";
        break;
      case "destructive":
        classes += " bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
        break;
      case "outline":
        classes += " border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
        break;
      case "secondary":
        classes += " bg-secondary text-secondary-foreground hover:bg-secondary/80";
        break;
      case "ghost":
        classes += " hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
        break;
      case "link":
        classes += " text-primary underline-offset-4 hover:underline";
        break;
    }

    // Sizes
    switch (size) {
      case "default":
        classes += " h-9 px-4 py-2 has-[>svg]:px-3";
        break;
      case "sm":
        classes += " h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5";
        break;
      case "lg":
        classes += " h-10 rounded-md px-6 has-[>svg]:px-4";
        break;
      case "icon":
        classes += " size-9 rounded-md";
        break;
    }

    // Append custom className
    if (className) {
      classes += ` ${className}`;
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }