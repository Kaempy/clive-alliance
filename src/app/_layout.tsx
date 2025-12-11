import { Colors } from '@/constants/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import '../global.css';

export const unstable_settings = {
  anchor: '(tabs)/index.tsx',
  initialRouteName: '(tabs)/index.tsx',
};

// Custom light theme with white background
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.background,
  },
};

const RootLayout = () => {
  return (
    <ThemeProvider value={LightTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1" style={{ backgroundColor: Colors.background }}>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background },
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(screen)" />
            </Stack>
            <Toaster
              position="bottom-center"
              richColors
              autoWiggleOnUpdate="toast-change"
              duration={2000}
              theme="light"
              visibleToasts={1}
              swipeToDismissDirection="left"
              offset={100}
            />
          </BottomSheetModalProvider>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
