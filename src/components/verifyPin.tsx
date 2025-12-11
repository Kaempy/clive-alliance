import { otpSchema, OtpSchema } from '@/lib/validation/login';
import { verifyOTP } from '@/services/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { toast } from 'sonner-native';
import Button from './ui/Button';
import CustomOtpInput from './ui/CustomOtpInput';

const VerifyPin = ({ onDismiss }: { onDismiss: () => void }) => {
  const form = useForm<OtpSchema>({
    mode: 'onBlur',
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(otpSchema),
  });
  const { control, setValue, handleSubmit } = form;
  const { mutate, isPending } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      toast.success('OTP verified successfully', {
        description: data.message,
      });
      onDismiss();
      router.replace('/(tabs)');
    },
    onError: (error) => {
      toast.error('Failed to verify OTP', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },
  });
  const onSubmit = async (data: OtpSchema) => {
    mutate(data);
  };

  return (
    <View className="flex- p-4">
      <View className="w-full max-w-[300px]">
        <Text className="text-primary-title text-2xl font-semibold">Enter OTP</Text>
        <Text className="text-sm text-secondary">Enter the OTP sent to your email</Text>
      </View>
      <FormProvider {...form}>
        <KeyboardAvoidingView behavior="padding" className="gap-6">
          <Controller
            name="otp"
            control={control}
            render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
              <View className="gap-0.5">
                <CustomOtpInput
                  onTextChange={onChange}
                  onBlur={onBlur}
                  autoFocus
                  onFilled={(value: string) => {
                    setValue('otp', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  secureTextEntry
                />
                {error ? <Text className="text-sm text-[firebrick]">{error.message}</Text> : null}
              </View>
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? 'Verifying...' : 'Continue'}
          </Button>
        </KeyboardAvoidingView>
      </FormProvider>
    </View>
  );
};

export default memo(VerifyPin);
