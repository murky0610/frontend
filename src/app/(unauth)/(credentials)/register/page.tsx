'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { userRegister } from "@/app/endpoint/api";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SignupPage() {

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = () =>{
    userRegister(role, email, password)
  }
  
  return (
    <div className="flex items-center justify-center m-20">
      {/* LEFT SIDE - IMAGE */}
      <div className="w-full flex items-center justify-center">
        <Image 
          src="/aavc_left_column.jpg" // Ensure the image is in `public/`
          alt="AAVC Left Column"
          width={1500} 
          height={1500}
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* RIGHT SIDE - SIGN UP FORM */}
      <div className="w-full min-w-lg flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center p-10">
          
          {/* Logo */}
          <Image 
            src="/logo-v2.png"
            alt="AAVC Logo"
            width={300}
            height={200}
            className="object-cover"
          />

          {/* Header */}
          <div className="w-full p-5 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Create Your AAVC Lab Account!
            </h1>
          </div>

          {/* Email Input */}
          <div className="w-full p-5 flex justify-center">
            <div className="w-full max-w-sm">
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" className="w-full" 
                onChange={(e) => setEmail(e.target.value)} value={email}
              />
            </div>
          </div>
          <div className="w-full p-5  justify-center flex flex-row">
            <div className=" max-w-sm ">
              <Label>First Name</Label>
              <Input type="name" placeholder="Enter your First Name" className="w-full" 
                onChange={(e) => setEmail(e.target.value)} value={email}
              />
        </div>
       
            <div className=" max-w-sm">
              <Label>Last Name</Label>
              <Input type="name" placeholder="Enter your Last Name" className="w-full" 
                onChange={(e) => setEmail(e.target.value)} value={email}
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="w-full p-5 flex justify-center">
            <div className="w-full max-w-sm">
              <Label>Password</Label>
              <Input type="password" placeholder="Create a password" className="w-full"
              onChange={(e) => setPassword(e.target.value)} value={password}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="w-full p-5 flex justify-center">
            <div className="w-full max-w-sm">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm your password" className="w-full" />
            </div>





          </div>
                   {/* Role Selection */}
                   <div className="w-full p-5 flex justify-center">
            <div className="w-full max-w-sm">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
  

          {/* Sign Up Button */}
          <div className="w-full p-5 flex justify-center">
            <Button className="w-full max-w-sm bg-[var(--rs-primary-900)] text-white hover:bg-[var(--rs-primary-50)]"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </div>

          {/* Already have an account? */}
          <h1 className="text-center">
            Already have an account?  
            <a href="/login" className="text-[var(--rs-primary-50)] hover:underline cursor-pointer ml-1">
              Login Here
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

