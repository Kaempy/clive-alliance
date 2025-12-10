import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z
    .string({ message: 'Password is required' })
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginSchema };
