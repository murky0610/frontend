"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { userRegister } from "@/api/api"; // Assuming this is your API call function
import { UserRegisterInterface, userRegisterSchema } from "@/schema/user-register.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();
  const [role, setRole] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true); // Set loading at the beginning
    const currentErrors: Record<string, string> = {}; // Object to accumulate errors

    // Password confirmation check
    if (password !== confirmPassword) {
      currentErrors.confirmPassword = "Passwords do not match";
    }

    // Create user data object for Zod validation
    const userData: UserRegisterInterface = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      role,
    };

    // Zod validation
    const validationResult = userRegisterSchema.safeParse(userData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        const fieldName = error.path[0] as string; // Zod path items are usually strings for object keys
        // Map schema field names to form field names if they differ
        switch (fieldName) {
          case 'first_name':
            currentErrors.firstName = error.message;
            break;
          case 'last_name':
            currentErrors.lastName = error.message;
            break;
          default:
            // For fields like email, password, role where schema name matches state variable name
            currentErrors[fieldName] = error.message;
        }
      });
    }

    // If there are any errors (from password mismatch or Zod validation)
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setLoading(false); // Stop loading
      return; // Stop the function execution
    }

    // If all validations passed, clear any existing errors before the API call
    setErrors({});

    // API call
    try {
      const response = await userRegister(userData); // Pass validated data
      if (response.status === 201) {
        toast.success('User Registered Successfully');
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Handle other non-201 success statuses or structured errors if your API returns them
        const errorData = response.data || { message: 'An error occurred while registering.' };
        toast.error(errorData.message || 'An error occurred while registering.');
        setErrors({ general: errorData.message || 'An error occurred while registering.' });
      }
    } catch (error) {
      console.error("Registration error:", error);
    
    } finally {
      setLoading(false); // Ensure loading is always stopped
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up for an Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Create a new account by filling out the form below
        </p>
      </div>
      
      {errors.general && <p className="text-red-500 text-center text-sm">{errors.general}</p>}

      <div className="grid gap-6">
        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Role Selection */}
        <div className="grid gap-2">
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole} disabled={loading}>
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
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={handleRegister}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}