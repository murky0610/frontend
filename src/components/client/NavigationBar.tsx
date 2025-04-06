"use client"
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import Image from "next/image"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { LogOut, LayoutDashboard, UserRound } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser, editCurrentUser } from "@/api/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserDetail {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userId: number;
  avatarUrl?: string;
}

const components = [
  { title: "What We Do", href: "/about-us/what-we-do" },
  { title: "Who We Are", href: "/about-us/who-we-are" },
  { title: "Our Collaborators", href: "/about-us/collaborators" },
]

const features = [
  { title: "Cost Calculator", href: "/docs/primitives/alert-dialog" },
  { title: "MPO", href: "/docs/primitives/hover-card" },
]

export default function NavigationMenuDemo() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      const userData: UserDetail = {
        userId: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        role: response.role,
        avatarUrl: "https://github.com/shadcn.png",
      };
      setUserDetail(userData);
      setEditFirstName(response.first_name ?? '');
      setEditLastName(response.last_name ?? '');
      setEditEmail(response.email ?? '');
    } catch (error) {
      console.error("Failed to fetch user details: ", error);
    }
  }

  const editUserData = async () => {
    try {
      const response = await editCurrentUser(
        editFirstName,
        editLastName,
        editEmail,
        userDetail?.userId
      );
      console.log("Success editing information: ", response);
      fetchUserData(); // Refresh user data after edit
    } catch (error) {
      console.error("Failed to edit user details: ", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-4 bg-[#991B1B]">
      {/* Logo on the left */}
      <Link href="/home">
        <Image
          src="/VC Lab Logo PNG.png"
          alt="AAVC Logo"
          width={200}
          height={50}
          className="object-cover"
        />
      </Link>

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
            <Link href="/projects" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Projects
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact-us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Section */}
      <div className="flex gap-4 items-center">
        {userDetail ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                  {userDetail.firstName[0]}{userDetail.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userDetail.firstName} {userDetail.lastName}</DropdownMenuLabel>
              <DropdownMenuLabel><div className="text-center"> 
                    {userDetail.role.charAt(0).toUpperCase() + userDetail.role.slice(1)}
                    
                    </div></DropdownMenuLabel> 
          <DropdownMenuSeparator />
          <DropdownMenuItem
      onClick={() => router.push("/dashboard")} // Navigate programmatically
      className="cursor-pointer flex items-center"
    ><LayoutDashboard/>Dashboard</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsUserProfileOpen(true)}>
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Profile Edit Dialog */}
      <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={editFirstName}
                className="col-span-3"
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={editLastName}
                className="col-span-3"
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editEmail}
                className="col-span-3"
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              editUserData();
              setIsUserProfileOpen(false);
            }}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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