import { cn } from '@/lib';
import { loginSchema, LoginSchema } from '@/lib/validation/login';
import { login } from '@/services/login';
import { useStoreSelectors } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Phone } from 'lucide-react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { toast } from 'sonner-native';
import Button from './ui/Button';
import FormField from './ui/FormField';
import VerifyPin from './verifyPin';

interface LoginProps {
  onDismiss: () => void;
  setNext: Dispatch<SetStateAction<boolean>>;
  next: boolean;
}
const tabs = [
  { label: 'Personal Account', value: 'personal' },
  {
    label: 'Business Account',
    value: 'business',
  },
];
const Login = ({ onDismiss, setNext, next }: LoginProps) => {
  const { setCredentials } = useStoreSelectors();
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = form;
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.info('OTP sent', {
        description: data.message,
      });
      setNext(true);
    },
    onError: (error) => {
      toast.error('Failed to login', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },
  });
  const onSubmit = async (data: LoginSchema) => {
    mutate(data);
  };

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['value']>('personal');
  const handleTabPress = (value: (typeof tabs)[number]['value']) => {
    setActiveTab(value);
  };
  return next ? (
    <VerifyPin onDismiss={onDismiss} />
  ) : (
    <View className="flex-1 justify-between gap-4 p-4 pb-8">
      <View className="flex-row items-center justify-center gap-2 rounded-full bg-[#E7E7E7] p-1">
        {tabs.map((tab) => (
          <Pressable
            key={tab.value}
            className={cn(
              'flex-1 items-center justify-center rounded-full border border-transparent p-4',
              activeTab === tab.value ? 'border-[#50976E] bg-primary' : 'bg-transparent',
            )}
            onPress={() => handleTabPress(tab.value)}>
            <Text
              className={cn(
                'text-sm',
                activeTab === tab.value ? 'font-medium text-white' : 'text-[#848383]',
              )}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="gap-6">
        <FormProvider {...form}>
          <Text className="text-2xl font-semibold">Login to your account</Text>
          <FormField
            name="email"
            label="Email"
            inputProps={{
              placeholder: 'Enter  your email address',
              textContentType: 'emailAddress',
              keyboardType: 'email-address',
            }}
          />
          <View className="gap-1">
            <FormField
              name="password"
              isPassword
              label="Password"
              inputProps={{
                placeholder: 'Enter your password',
                textContentType: 'password',
                autoCapitalize: 'none',
                autoComplete: 'password',
              }}
            />
            <Link
              href="/#forgot-password"
              className="text-medium self-end text-sm text-primary underline">
              Forgot Password?
            </Link>
          </View>
          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="my-8"
            accessibilityLabel="submit-button">
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </FormProvider>
      </View>
      <View className="flex-1 items-center justify-between gap-4">
        <View className="w-full gap-12">
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-1 flex-1 border border-x-0 border-b border-t-0 border-dashed border-[#D8D8D8]" />
            <Text className="text-xs text-[#A0A0A0]">Don&apos;t have an account?</Text>
            <View className="h-1 flex-1 border border-x-0 border-b border-t-0 border-dashed border-[#D8D8D8]" />
          </View>
          <Button variant="outline">Create an account</Button>
        </View>
        <Link href="/#contact-support">
          <View className="flex-row items-center justify-center gap-2">
            <Phone color="#DA7E11" size={16} strokeWidth={1.5} />
            <Text className="text-sm text-[#848383]">Contact Support</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default Login;
