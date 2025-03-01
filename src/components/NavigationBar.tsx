"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import Image from "next/image"
import { Label } from "./ui/label"
const components = [
  { title: "What We Do", href: "/docs/primitives/alert-dialog" },
  { title: "Who We Are", href: "/docs/primitives/hover-card" },
  { title: "Our Collaborators", href: "/docs/primitives/progress" },
  { title: "Our Projects", href: "/docs/primitives/scroll-area" },
]

const features = [
  { title: "Cost Calculator", href: "/docs/primitives/alert-dialog" },
  { title: "MPO", href: "/docs/primitives/hover-card" },
]

export default function NavigationMenuDemo() {
  return (
    <div className="w-full flex items-center justify-between px-4">
      {/* Logo on the left */}
      <Link href="/home">
      <Image
        src="/VC Lab Logo PNG.png"
        alt="AAVC Logo"
        width={400}
        height={200}
        className="object-cover"
      />
      </Link>
      {/* <Label>
        AAVCLAB
      </Label> */}
      
      {/* Navigation Menu in the center */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[300px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[300px]">
                {features.map((feature) => (
                  <ListItem
                    key={feature.title}
                    title={feature.title}
                    href={feature.href}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/prejects" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Projects
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
      
        </NavigationMenuList>
      </NavigationMenu>

      {/* Login/Signup buttons on the right */}
      <div className="flex gap-2">
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"