import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

const items = [
  {
    name: 'pay',
    options: {
      title: 'Send Money',
      headerLeft: () => (
        <Pressable onPress={router.back}>
          <ChevronLeft size={24} color="#032211" />
        </Pressable>
      ),
    },
  },
  {
    name: 'receipt',
    options: {
      title: '',
      headerBackVisible: false,
      headerLeft: () => null,
      headerRight: () => (
        <Pressable onPress={() => router.navigate('/(tabs)')}>
          <Text className="text-sm font-medium text-black">Close</Text>
        </Pressable>
      ),
    },
  },
];
const ScreenLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitle: ({ children }: { children: ReactNode }) => (
          <Text className="text-[1.25rem] font-semibold text-header1">{children}</Text>
        ),
      }}>
      {items.map((item) => (
        <Stack.Screen key={item.name} name={item.name} options={item.options} />
      ))}
    </Stack>
  );
};

export default ScreenLayout;
