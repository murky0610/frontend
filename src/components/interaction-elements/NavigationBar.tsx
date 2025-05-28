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
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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
import { getCurrentUser, editCurrentUser, userLogout } from "@/api/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
interface UserDetail {
  firstName: string
  lastName: string
  email: string
  role: string
  userId: number
  avatarUrl?: string
}

const components = [
  { title: "What We Do", href: "/about-us/what-we-do" },
  { title: "Who We Are", href: "/about-us/who-we-are" },
  { title: "Research and Development", href: "/about-us/research-development" },
  { title: "Partnerships and Linkages", href: "/about-us/partnership-linkages" },
]

const services = [
  {
    title: "Mobile App",
    href: "/services/mobile-app", // Example parent link for the overall Mobile App section
  },
  {title: "Research and Development", href: "/services/research-development"},
  { title: "Capacity Building", href: "/services/capacity-building" },  
  //{ title: "Knowledge Management", href: "" },  
  // { title: "Repository", href: "/services/repository" },
  // { title: "Directory", href: "/services/directory" },
  // Note: Cost Calculator and MPO are now nested within Coffee and Cacao under Mobile App
]

const knowledgeManagements =[
  { title: "Repository", href: "/services/repository" },
  { title: "Directory", href: "/services/directory" },
]

export default function NavigationMenuDemo() {
  const router = useRouter()
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const [editFirstName, setEditFirstName] = useState("")
  const [editLastName, setEditLastName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser()
      const userData: UserDetail = {
        userId: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        role: response.role,
        avatarUrl: "https://github.com/shadcn.png",
      }
      setUserDetail(userData)
      setEditFirstName(response.first_name ?? "")
      setEditLastName(response.last_name ?? "")
      setEditEmail(response.email ?? "")
    } catch (error) {
      console.error("Failed to fetch user details: ", error)
    }
  }

  const editUserData = async () => {
    try {
      const response = await editCurrentUser(editFirstName, editLastName, editEmail, userDetail?.userId)
      console.log("Success editing information: ", response)
      fetchUserData() // Refresh user data after edit
    } catch (error) {
      console.error("Failed to edit user details: ", error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  const logoutUserData = async () => {
    try {
      const response = await userLogout()
      console.log("user logout successfully", response)

      toast.success("Logged out successfully!")
      setUserDetail(null)
      router.push("/home")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out. Please try again.")
    }
  }
  return (
    <div className="w-full flex items-center justify-between px-6 md:px-12 py-3 bg-white border-b border-gray-200 shadow-sm">
      {/* Left Logo / Brand */}
      <div className="flex items-center gap-2">
        <Link href="/home" className="flex items-center">
          <Image src="/VC Lab Logo PNG.png" alt="AAVC Logo" width={150} height={50} className="object-contain" />
        </Link>
      </div>
      {/* Center Nav Menu */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="flex items-center space-x-6 text-gray-800 font-medium">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              About Us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                {components.map((component) => (
                  <li key={component.title}>
                    <Link
                      href={component.href}
                      className="block px-3 py-2 text-sm hover:bg-gray-50 hover:text-emerald-700 rounded-md transition-colors"
                    >
                      {component.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link
                      href={service.href}
                      className="block px-3 py-2 text-sm hover:bg-gray-50 hover:text-emerald-700 rounded-md transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/news-events" className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              News and Events
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/projects" className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              Publications
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/knowledge-management" className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              Knowledge Management
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <Link href="/complement-projects" className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              Complementary Projects
            </Link>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <Link href="/contact-us" className="px-1 py-1.5 hover:text-emerald-700 transition-colors">
              Contact Us
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Button - Add this */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Right Auth Section */}
      <div className="flex items-center gap-4">
        {userDetail ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-emerald-100 transition duration-200">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {userDetail.firstName[0]}
                  {userDetail.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuLabel className="font-semibold text-gray-800 px-2 py-1.5">
                {userDetail.firstName} {userDetail.lastName}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="px-2 py-0.5 pb-1.5">
                <div className="text-xs text-gray-500 font-normal">
                  {userDetail.role.charAt(0).toUpperCase() + userDetail.role.slice(1)}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsUserProfileOpen(true)}
                className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => logoutUserData()}
                className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Sign In
            </Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/register" className="text-white">
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Profile Edit Dialog */}
      <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Edit Profile</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right text-gray-700">
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
              <Label htmlFor="lastName" className="text-right text-gray-700">
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
              <Label htmlFor="email" className="text-right text-gray-700">
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
            <Button
              onClick={() => {
                editUserData()
                setIsUserProfileOpen(false)
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Inherit standard anchor props like target, rel, etc.
  href: string // Make href required
  title: string
  children: React.ReactNode
  className?: string
}
const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
            legacyBehavior
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
