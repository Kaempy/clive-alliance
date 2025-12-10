import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import '../global.css';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1">
          <BottomSheetModalProvider>
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
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(screen)" />
            </Stack>
          </BottomSheetModalProvider>

          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
