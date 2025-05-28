import { Toaster } from "@/components/ui/sonner";
export default function CredentialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div>
     
        {children}
         <Toaster/>
    </div>
  );
}
