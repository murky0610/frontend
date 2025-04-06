"use client"
import { useState, useEffect } from "react"
import { Calendar, SquareChartGantt, Inbox, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/api/api"

const items = [
  { title: "Overview", url: "/dashboard", icon: SquareChartGantt },
  { title: "Repositories", url: "/repository", icon: Inbox },
  { title: "My Repositories", url: "/my-repository", icon: Calendar },
  { title: "Manage Users", url: "/user-profile", icon: User },
];

export function AppSidebar() {
  const [userRole, setUserRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser()
        setUserRole(response.role)
      } catch (error) {
        console.error("Failed to fetch user details:", error)
      }finally {
        setIsLoading(false); 
      }
    }
    fetchUserData()
  }, [])
  if (isLoading) {
    return null; 
  }
  const filteredItems = items.filter((item) =>
    item.title === "Manage Users" ? userRole === "admin" : true
  );

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-lg font-semibold">AAVCLAB</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>  
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
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