import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/AppSideBar"
import { Toaster } from "@/components/ui/sonner";
import NavigationBarAuth from "@/components/client/NavigationBarAuth";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
  
      <main>

        <NavigationBarAuth/>
          
        {/* <SidebarTrigger /> */}
        {children}
      </main>
      <Toaster/>
    </SidebarProvider>
  )
}
