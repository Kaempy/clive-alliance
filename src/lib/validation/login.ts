import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z
    .string({ message: 'Password is required' })
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
const otpSchema = z.object({
  otp: z.string({ message: 'OTP is required' }).trim().min(6, { message: 'OTP must be 6 digits' }),
});
type OtpSchema = z.infer<typeof otpSchema>;
type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, otpSchema };
export type { LoginSchema, OtpSchema };
