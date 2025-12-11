import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text } from 'react-native';

const options = [
  {
    name: 'pay',
    title: 'Send Money',
    headerLeft: () => (
      <Pressable onPress={router.back}>
        <ChevronLeft size={24} color="#032211" />
      </Pressable>
    ),
  },
  {
    name: 'receipt',
    title: 'Receipt',
    headerRight: () => (
      <Pressable onPress={() => router.navigate('/(tabs)')}>
        <Text className="text-sm font-medium text-black">Close</Text>
      </Pressable>
    ),
  },
];
const ScreenLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitle: ({ children }: { children: React.ReactNode }) => (
          <Text className="text-[1.25rem] font-semibold text-header1">{children}</Text>
        ),
      }}>
      {options.map((option) => (
        <Stack.Screen
          key={option.name}
          name={option.name}
          options={{
            title: option.title,
            headerLeft: option.headerLeft,
            headerRight: option.headerRight,
          }}
        />
      ))}
    </Stack>
  );
};

export default ScreenLayout;
