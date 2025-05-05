'use client';
import { DisplayMyRepositories } from "@/components/auth/DisplayMyRepositories";
import { getCurrentUser } from "@/api/api";
import { useEffect, useState } from "react";

export default function DisplayMyRepositoriesPage (){
    const [userId, setUserId]= useState<number>();
    const fetchUserData = async () => {
      try{
        const response = await getCurrentUser();
        console.log("this is the resposne: ", response);
        setUserId(response.id);

      }
      catch(error){
        console.error("Failed to fetch user details: ", error);
      }
    }
        useEffect(() =>{
          fetchUserData();
        },[]);
  return(
    <div>
      <DisplayMyRepositories userId={userId}/>
    </div>
  )
}