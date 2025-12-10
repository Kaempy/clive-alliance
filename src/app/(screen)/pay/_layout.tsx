import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text } from 'react-native';

const PayLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: ({ children }: { children: React.ReactNode }) => (
          <Text className="text-[1.25rem] font-semibold text-header1">{children}</Text>
        ),
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Pressable onPress={router.back}>
            <ChevronLeft size={24} color="#032211" />
          </Pressable>
        ),
      }}>
      <Stack.Screen name="index" options={{ title: 'Send Money' }} />
    </Stack>
  );
};

export default PayLayout;
