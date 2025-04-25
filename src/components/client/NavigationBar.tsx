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
import { getCurrentUser, editCurrentUser, userLogout } from "@/api/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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
  { title: "Research and Development", href: "/about-us/research-development" },
  { title: "Partnerships and Linkages", href: "/about-us/partnership-linkages" },

]

const services = [
  {
    title: "Mobile App",
    href: "/services/mobile-app", // Example parent link for the overall Mobile App section
    children: [ // First level children: Coffee and Cacao
      {
        title: "Coffee",
        href: "/services/mobile-app/coffee", // Link for the Coffee Mobile App section (optional)
        children: [ // Second level children: Cost Calculator and MPO for Coffee
          { title: "Cost Calculator", href: "/services/mobile-app/coffee/cost-calculator" },
          { title: "Market Profit Optimizer", href: "/services/mobile-app/coffee/mpo" },
        ]
      },
      {
        title: "Cacao",
        href: "/services/mobile-app/cacao", // Link for the Cacao Mobile App section (optional)
        children: [ // Second level children: Cost Calculator and MPO for Cacao
          { title: "Cost Calculator", href: "/services/mobile-app/cacao/cost-calculator" },
          { title: "Market Profit Optimizer", href: "/services/mobile-app/cacao/mpo" },
        ]
      },
    ]
  },
  { title: "Repository", href: "/services/repository" },
  { title: "Directory", href: "/services/directory" },
  // Note: Cost Calculator and MPO are now nested within Coffee and Cacao under Mobile App
];

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
  const logoutUserData = async () => {
    try {
      const response = await userLogout();
      console.log("user logout successfully", response);
      
      toast.success("Logged out successfully!");
      setUserDetail(null);
      router.push('/home');
      
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out. Please try again.");
    }
  }
  return (
<div className="w-full flex items-center justify-between px-12 py-4 bg-white border-b border-gray-200">
{/* Left Logo / Brand */}
<div className="flex items-center gap-2 cursor-pointer">
    <Link href="/home" legacyBehavior>

        <Image
          src="/VC Lab Logo PNG.png" // Replace with your brand logo
          alt="AAVC Logo"
          width={150}
          height={50}
          className="object-contain"
        />
  
    </Link>
    </div>
    {/* Center Nav Menu */}
    <NavigationMenu>
    <NavigationMenuList className="flex items-center space-x-4 text-black">
  <NavigationMenuItem>
    <NavigationMenuTrigger className="hover:text-gray-600 transition-colors">
      About Us
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[300px] gap-3 p-4 text-gray-700">
        {components.map((component) => (
          <li key={component.title}>
            <div className="text-sm hover:underline">
            <Link href={component.href} legacyBehavior>
              {component.title}
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
          {/* Add mobile apps menu content */}
   
<NavigationMenuItem>
  <NavigationMenuTrigger className="hover:text-gray-600 transition-colors">
    Services
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    {/* Adjusted grid width if needed, but main change is list structure */}
    {/* Removed grid classes here to allow list items to control width based on content/indentation */}
    <ul className="w-[300px] gap-3 p-4"> {/* Removed grid classes, using basic ul/li structure */}
      {services.map((service) => (
        // Use React.Fragment to render multiple list items for parent and children
        <React.Fragment key={service.title}>
          {/* Render the top-level item (e.g., Mobile App, Repository, Directory) */}
          <li>
            <Link href={service.href} passHref legacyBehavior> {/* Use passHref with Link inside components */}
              {/* You might use NavigationMenuLink here for shadcn styling */}
              {/* Style top-level parents */}
              <div className="text-sm font-semibold hover:underline">
                  {service.title}
              </div>
            </Link>
          </li>

          {/* Render the first level children (e.g., Coffee, Cacao) if they exist */}
          {service.children && service.children.map((firstLevelChild) => (
            <React.Fragment key={firstLevelChild.title}>
              {/* Render the first level child item */}
              <li className="ml-4"> {/* Add margin-left for first level indentation */}
                 {/* Decide if this is a link or just a visual heading */}
                 {/* Rendering as a link based on the data structure having href */}
                 <Link href={firstLevelChild.href} passHref legacyBehavior> {/* Use passHref */}
                   {/* Style first-level children */}
                   <div className="text-sm font-medium hover:underline"> {/* Slightly less bold than parent */}
                       {firstLevelChild.title}
                   </div>
                 </Link>
              </li>

              {/* Render the second level children (e.g., Cost Calculator, MPO) if they exist */}
              {firstLevelChild.children && firstLevelChild.children.map((secondLevelChild) => (
                <li key={secondLevelChild.title} className="ml-8"> {/* Add more margin-left for second level indentation */}
                   <Link href={secondLevelChild.href} passHref legacyBehavior> {/* Use passHref */}
                     {/* Style second-level children */}
                     <div className="text-sm hover:underline"> {/* Standard text for the final links */}
                         {secondLevelChild.title}
                     </div>
                   </Link>
                </li>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/projects" passHref legacyBehavior>
            <NavigationMenuLink className="hover:text-gray-600 transition-colors">
              Published Papers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
              {/* Add Later */}
              {/* for news page */}
        {/* <NavigationMenuItem>
          <Link href="/news" passHref legacyBehavior>
            <NavigationMenuLink className="hover:text-gray-600 transition-colors">
              News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {/* For publications page */}
               {/* <NavigationMenuItem>
          <Link href="/publications" passHref legacyBehavior>
            <NavigationMenuLink className="hover:text-gray-600 transition-colors">
              Publications
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link href="/contact-us" passHref legacyBehavior>
            <NavigationMenuLink className="hover:text-gray-600 transition-colors">
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    {/* Right Auth Section */}
    <div className="flex items-center gap-4">
      {userDetail ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-300 transition duration-200">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {userDetail.firstName[0]}
                {userDetail.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-semibold">
              {userDetail.firstName} {userDetail.lastName}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="text-center text-sm text-gray-500">
                {userDetail.role.charAt(0).toUpperCase() + userDetail.role.slice(1)}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsUserProfileOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <UserRound className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logoutUserData()}> <LogOut/>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/login" className="text-gray-700 hover:underline" legacyBehavior>
            Sign In
          </Link>
          <Button variant="outline" asChild>
            <Link href="/register" legacyBehavior>Sign Up</Link>
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
            Make changes to your profile here. Click save when you’re done.
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
          <Button
            onClick={() => {
              editUserData();
              setIsUserProfileOpen(false);
            }}
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
  href: string; // Make href required
  title: string;
  children: React.ReactNode;
  className?: string;
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          legacyBehavior
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"