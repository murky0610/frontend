import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/AppSideBar"
import { Toaster } from "@/components/ui/sonner";
import NavigationBarAuth from "@/components/client/NavigationBarAuth";
import NavigationBar from "@/components/client/NavigationBar";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavigationBarAuth />
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
      
      <Toaster position="bottom-right" expand={true} />
    </SidebarProvider>
  )
}
