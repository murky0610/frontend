"use client"
import dynamic from "next/dynamic";
import { useMemo } from "react";
export default function DirectoryPages (){
const ComplementaryProjects = useMemo(() => dynamic(
        () => import('@/components/client/ComplementProjects'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    return(
    <div className="relative mx-auto my-5 w-4/5 h-[calc(100vh-4rem)]">
      {/* Map sits behind the fixed navbar (4rem height) */}
      <div className="absolute inset-0 z-0">
        <ComplementaryProjects posix={[7.207573, 125.395874]} />
      </div>
      {/* Optional overlay/content can go here with higher z-index */}
    </div>
    );
   
}