
import { Calendar, Home, Inbox, Search, Settings, User, X } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Repositories",
    url: "/repository",
    icon: Inbox,
  },
  {
    title: "My Repositories",
    url: "my-repository",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "user-profile",
    icon: User,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export function AppSidebar() {
  return (
    <Sidebar >
     
        {/* Sidebar Header with Close Button in a Separate Row */}
        <SidebarHeader className="flex items-center justify-between px-4 py-2 border-b">
          <span className="text-lg font-semibold">AAVCLAB</span>

        </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>  
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
