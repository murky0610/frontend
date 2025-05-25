import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string().min(8, 'Invalid Password, Must be at least 8 characters'),
  role: z.string().nonempty('Category cannot be empty'),
});

export type UserRegisterInterface = z.infer<typeof userRegisterSchema>;
