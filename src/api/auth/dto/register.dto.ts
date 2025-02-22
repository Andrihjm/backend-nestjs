import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['user', 'admin']).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
