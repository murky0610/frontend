import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, FolderTree } from 'lucide-react';
import Link from 'next/link';

export default function KnowledgeManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Knowledge Management Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/services/repository" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full border-2 hover:border-primary/50 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle>Repository</CardTitle>
              </div>
              <CardDescription>Centralized storage for all your knowledge assets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Store, organize, and manage your documents, files, and digital resources in a
                structured environment. The Repository provides version control, search
                capabilities, and secure access to your organization's knowledge base.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/services/directory" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full border-2 hover:border-primary/50 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FolderTree className="h-6 w-6 text-primary" />
                <CardTitle>Directory</CardTitle>
              </div>
              <CardDescription>Navigate and discover organizational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore your organization's structure, find experts, and locate resources through an
                intuitive directory system. The Directory service helps connect people with the
                right information and subject matter experts across your organization.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
