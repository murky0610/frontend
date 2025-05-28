"use client"
import dynamic from "next/dynamic";
import { useMemo } from "react";
export default function ComplementProjectsPage (){
const ComplementaryProjects = useMemo(() => dynamic(
        () => import('@/components/client/ComplementProjects'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    return(
         <div className="bg-white-700 mx-auto my-5 w-[80%] h-[580px]">
                <ComplementaryProjects posix={[7.207573, 125.395874]} />
            </div>
    );
   
}