"use client"

import * as React from "react"

import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/libs/utils"

const Root = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    setBackgroundColorOnScale={false}
    {...props}
  />
)
Root.displayName = "Drawer"

const Trigger = DrawerPrimitive.Trigger

const Close = DrawerPrimitive.Close

const Overlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
Overlay.displayName = DrawerPrimitive.Overlay.displayName

export interface ContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  isScrollable?: boolean
}
const Content = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, ContentProps>(
  ({ isScrollable = false, className, children, ...props }, ref) => (
    <DrawerPrimitive.Portal>
      <Overlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "group fixed bottom-0 z-50 max-h-[calc(100dvh-3rem)] rounded-t-medium bg-background outline-none",
          "data-[vaul-drawer-direction=right]:bottom-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:top-2 data-[vaul-drawer-direction=right]:max-h-[calc(100dvh-1rem)] data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-medium data-[vaul-drawer-direction=right]:after:hidden",
          isScrollable && "h-full",
          className
        )}
        {...props}
      >
        <div className="absolute left-1/2 top-1 z-50 mx-auto h-2 w-10 -translate-x-1/2 rounded-full bg-default-400/50 group-data-[vaul-drawer-direction=right]:hidden" />
        <div className={cn(isScrollable && "h-full max-h-full overflow-y-auto")}>{children}</div>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
)
Content.displayName = "DrawerContent"

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
)
Header.displayName = "DrawerHeader"

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
Footer.displayName = "DrawerFooter"

const Title = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
Title.displayName = DrawerPrimitive.Title.displayName

const Description = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
Description.displayName = DrawerPrimitive.Description.displayName

export { Root, Overlay, Trigger, Close, Content, Header, Footer, Title, Description }
