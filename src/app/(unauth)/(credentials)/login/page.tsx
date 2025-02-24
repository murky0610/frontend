/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { userLogin } from "@/app/endpoint/api";

import { useRouter } from "next/navigation"; 

export default function LoginPage() { 
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 

    const handleLogin = async () => {
        const response = await userLogin(email, password);

        if (response === true) {
            router.push('/dashboard'); 
        }
    };
    return (
        
        <div className="flex items-center justify-center m-20">
           
        {/* LEFT SIDE OF COLUMN */}
 
        <div className="w-full min-w-lg  flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center p-10">
          <Image src="/logo-v2.png" // Ensure the image is placed in `public/`
          alt="AAVC Right Column"
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          className="object-cover" />
            <div className="w-full p-5 text-center">
              <h1 className="text-3xl md:text-4xl font-bold">
                Let's Login to your AAVC Lab Account First!
              </h1>
            </div>
      
            {/* Email Input */}
            <div className="w-full p-2 flex justify-center">
              <div className="w-full max-w-sm">
                <Label>Email</Label>
                <Input type="email" placeholder="Email" className="w-full" onChange={(e) => setUserEmail(e.target.value)} value={email} />
              </div>
            </div>
      
            {/* Password Input */}
            <div className="w-full p-2 flex justify-center">
              <div className="w-full max-w-sm">
                <Label>Password</Label>
                <Input type="password" placeholder="Password" className="w-full" onChange={(e) => setPassword(e.target.value)} value={password}/>
              </div>
            </div>
      
      {/* Hide forgot password functionality as of now */}
            {/* Forgot Password Link */}
            <div className="w-full flex flex-row-reverse p-5">
              {/* <Label className="text-[var(--rs-primary-50)] hover:underline cursor-pointer ">
                Forgot Password?
              </Label> */}
            </div>
      
            {/* Login Button */}
            <div className="w-full p-5 flex justify-center">
            <Button className="w-full max-w-sm"
            onClick={handleLogin}
            >
                Login</Button>
            </div>
      

 {/* <div className="w-full p-5 flex justify-center items-center">
                        <hr className="w-full border-t border-gray-300" />
                        <span className="px-2 text-gray-500">OR</span>
                        <hr className="w-full border-t border-gray-300" />
                    </div>

       
                    <div className="w-full p-5 flex flex-col items-center space-y-3">
                        <div className="w-full max-w-sm">
                            <GoogleLoginButton onClick={() => alert("Google Login")} />
                        </div>
                        <div className="w-full max-w-sm">
                            <FacebookLoginButton onClick={() => alert("Facebook Login")} />
                        </div>
                    </div> */}

        
            <h1 className="text-center">
            Already have an account?  
            <a href="/register" className="text-[var(--rs-primary-50)] hover:underline cursor-pointer ml-1">
              Register Here
            </a>
          </h1>
  
            </div>

            </div>

          {/* RIGHT SIDE OF THE COLUMN (Image) */}
      <div className="w-full">
        <Image 
          src="/aavc_right_column.jpg" // Ensure the image is placed in `public/`
          alt="AAVC Right Column"
          width={1500} // Adjust width as needed
          height={1500} // Adjust height as needed
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
        </div>
    )
}