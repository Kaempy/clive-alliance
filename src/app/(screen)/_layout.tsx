import { Stack } from 'expo-router';
import React from 'react';

const ScreenLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Stack.Screen name="pay" />
      <Stack.Screen name="receipt" options={{ title: 'Receipt' }} />
    </Stack>
  );
};

export default ScreenLayout;
