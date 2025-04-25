
import NavigationBar from "@/components/client/NavigationBar";
import { Toaster } from "@/components/ui/sonner";
export default function RootMarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
       <NavigationBar />
         
        {children}
        <Toaster/>
</>
  );
}
