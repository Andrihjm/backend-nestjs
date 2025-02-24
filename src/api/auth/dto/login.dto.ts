import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginDto = z.infer<typeof LoginDto>;
