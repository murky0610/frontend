import { Toaster } from 'sonner';
export default function CredentialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Toaster expand={true} />
    </div>
  );
}
