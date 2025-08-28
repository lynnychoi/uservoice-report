import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const navigationVariants = cva(
  "flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row space-x-1",
        vertical: "flex-col space-y-1",
      },
      variant: {
        default: "",
        pills: "",
        underline: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
)

const navigationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2",
        pills: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-4 py-2",
        underline: "text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 px-3 py-2",
      },
      size: {
        sm: "text-xs px-2 py-1",
        default: "text-sm px-3 py-2",
        lg: "text-base px-4 py-3",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: true,
        className: "bg-primary-50 text-primary-600 hover:bg-primary-100",
      },
      {
        variant: "pills",
        active: true,
        className: "bg-primary-600 text-white hover:bg-primary-700",
      },
      {
        variant: "underline",
        active: true,
        className: "border-primary-600 text-primary-600 hover:border-primary-700",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      active: false,
    },
  }
)

export interface NavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationVariants> {}

export interface NavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navigationItemVariants> {
  href?: string
  asChild?: boolean
}

const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ className, orientation, variant, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(navigationVariants({ orientation, variant, className }))}
      {...props}
    />
  )
)
Navigation.displayName = "Navigation"

const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ className, variant, size, active, href, children, ...props }, ref) => {
    const Comp = href ? "a" : "div"
    
    return (
      <Comp
        ref={ref as any}
        href={href}
        className={cn(navigationItemVariants({ variant, size, active, className }))}
        {...(props as any)}
      >
        {children}
      </Comp>
    )
  }
)
NavigationItem.displayName = "NavigationItem"

// Breadcrumb Components
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("hover:text-gray-900 transition-colors", className)}
    {...props}
  />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("text-gray-400", className)}
    {...props}
  >
    {children || "/"}
  </li>
))
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export { 
  Navigation, 
  NavigationItem,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  navigationVariants,
  navigationItemVariants
}