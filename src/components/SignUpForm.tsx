"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
export function SignUpForm({
  className,
  ...props
  
}: React.ComponentPropsWithoutRef<"form">) {

  
    const [role, setRole] = useState('');
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up for an Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Create a new account by filling out the form below
        </p>
      </div>
      <div className="grid gap-6">
        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        {/* First Name & Last Name in the same row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" placeholder="Doe" required />
          </div>
        </div>
        {/* Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        {/* Confirm Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <Input id="confirmPassword" type="password" required />
        </div>

        <div className="grid gap-2">
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
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  )
}
