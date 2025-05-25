'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { LogOut, Home, UserRound } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCurrentUser, editCurrentUser, userLogout } from '@/api/api';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UserDetail {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userId: number;
  avatarUrl?: string;
}

export default function NavigationBarAuth() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const pathname = usePathname();
  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      console.log('this is the resposne: ', response);
      const userData: UserDetail = {
        userId: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        role: response.role,
        avatarUrl: 'https://github.com/shadcn.png', //Default avatar
      };

      setUserDetail(userData);
      setEditFirstName(response.first_name ?? '');
      setEditLastName(response.last_name ?? '');
      setEditEmail(response.email ?? '');
    } catch (error) {
      console.error('Failed to fetch user details: ', error);
    }
  };

  const editUserData = async () => {
    try {
      const response = await editCurrentUser(
        editFirstName,
        editLastName,
        editEmail,
        userDetail?.userId,
      );
      console.log('this is edit values: ', response);
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to edit user details:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const logoutUserData = async () => {
    try {
      const response = await userLogout();
      console.log('user logout successfully', response);

      toast.success('Logged out successfully!');
      setUserDetail(null);
      router.push('/home');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left Side - Dynamic Page Title */}
      <div className="flex items-center gap-3">
        {pathname === '/repository' ? (
          <p className="text-2xl font-bold text-gray-800 drop-shadow-md">
            Explore <span className="text-indigo-600">All Repositories</span>
          </p>
        ) : pathname === '/my-repository' ? (
          <p className="text-2xl font-bold text-gray-800 drop-shadow-md">
            My <span className="text-indigo-600">Repositories</span>
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-800 drop-shadow-md">
            Welcome Back, <span className="text-indigo-600">AAVC Personnel</span>
          </p>
        )}
      </div>

      {/* Login/Signup buttons on the right */}
      <div className="flex gap-4 items-center">
        {userDetail && (
          <DropdownMenu>
            {/* Clicking the Avatar opens the dropdown */}
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>
                {userDetail.firstName} {userDetail.lastName}
              </DropdownMenuLabel>
              {/* <DropdownMenuLabel>{userDetail.email}</DropdownMenuLabel> */}
              <DropdownMenuLabel>
                <div className="text-center">
                  {userDetail.role.charAt(0).toUpperCase() + userDetail.role.slice(1)}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push('/home')}
                className="cursor-pointer flex items-center"
              >
                {' '}
                <Home />
                Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsUserProfileOpen(true)}>
                <UserRound />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logoutUserData()}>
                {' '}
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* ✅ Dialog that only opens when "My Profile" is clicked */}
      <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue={editFirstName}
                className="col-span-3"
                onChange={(e) => setEditFirstName(e.target.value)}
              />
              <Label htmlFor="name" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue={editLastName}
                className="col-span-3"
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue={editEmail}
                className="col-span-3"
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                const success = await editUserData();
                if (success) {
                  await fetchUserData();
                  setIsUserProfileOpen(false);
                }
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
