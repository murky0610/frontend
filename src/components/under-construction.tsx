"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import { useRouter } from "next/navigation"



export default function UnderConstruction() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-full max-w-md p-6 rounded-lg border-2 border-dashed border-primary/50 bg-background">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Under Construction</h1>
          <p className="text-muted-foreground">This page is currently under construction. Please check back soon!</p>
        </div>


        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => router.push("/home")}>Return Home</Button>
        </div>
      </div>
    </div>
  )
}
