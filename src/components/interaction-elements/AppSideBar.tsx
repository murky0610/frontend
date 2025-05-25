'use client';
import { useState, useEffect } from 'react';
import { Calendar, SquareChartGantt, Inbox, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { getCurrentUser } from '@/api/api';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const items = [
  { title: 'Overview', url: '/dashboard', icon: SquareChartGantt },
  { title: 'My Repositories', url: '/my-repository', icon: Calendar },
  { title: 'Manage Users', url: '/user-profile', icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUserRole(response.role);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);
  if (isLoading) {
    return null;
  }
  const filteredItems = items.filter((item) =>
    item.title === 'Manage Users' ? userRole === 'admin' : true,
  );

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-2 border-b">
        <Link href="/home">
          <Image
            src="/VC Lab Logo PNG.png"
            alt="AAVC Logo"
            width={200}
            height={50}
            className="object-cover"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-green-100 text-green-700 font-semibold border-r-4 border-green-500'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-2 w-full">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
