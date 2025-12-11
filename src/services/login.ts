import { LoginSchema, OtpSchema } from '@/lib/validation/login';

type LoginResponse = {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
};

type VerifyOtpResponse = {
  success: boolean;
  message: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const login = async (data: LoginSchema): Promise<LoginResponse> => {
  const { email, password } = data;
  // simulate network delay
  await delay(750);
  // simple validation + mock failure path
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }

  return {
    token: 'mock-token',
    refresh_token: 'mock-refresh-token',
    user: {
      id: '1234567890',
      email,
      name: 'Richard',
    },
    message: 'Please check your email for the OTP to verify your account',
  };
};

const verifyOTP = async (data: OtpSchema): Promise<VerifyOtpResponse> => {
  const { otp } = data;
  // simulate network delay
  await delay(750);

  if (otp !== '123456') {
    throw new Error('Invalid OTP');
  }

  return { success: true, message: 'You can now access your account' };
};

export { login, verifyOTP };
