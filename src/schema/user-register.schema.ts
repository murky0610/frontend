import { z } from "zod";


export const userRegisterSchema = z.object({
  email: z.string().email("Please provide correct email"),
  first_name: z.string().nonempty("First Name cannot be empty"),
  last_name: z.string().nonempty("Last Name cannot be empty"),
  password: z.string().min(8,"Invalid Password, Must be at least 8 characters"), 
  role:z.string().nonempty("Category cannot be empty"),
})

export type UserRegisterInterface = z.infer<typeof userRegisterSchema>;