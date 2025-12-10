import { router, Stack } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

const ReceiptLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: ({ children }: { children: React.ReactNode }) => (
          <Text className="text-[1.25rem] font-semibold text-header1">{children}</Text>
        ),
        headerTitleAlign: 'center',
        headerRight: () => (
          <Pressable onPress={() => router.navigate('/(tabs)')}>
            <Text className="text-sm font-medium text-black">Close</Text>
          </Pressable>
        ),
      }}>
      <Stack.Screen name="index" options={{ title: '' }} />
    </Stack>
  );
};

export default ReceiptLayout;
