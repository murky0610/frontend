
import NavigationBar from "@/components/NavigationBar";
import { Toaster } from "@/components/ui/sonner";
export default function CredentialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
       
      >   
       <NavigationBar />
         
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
