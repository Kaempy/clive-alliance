import { Colors } from '@/constants/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { render, type RenderOptions } from '@testing-library/react-native';
import React, { type JSX, type ReactElement } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

type SafeAreaMetrics = Metrics;

const initialWindowMetrics: SafeAreaMetrics = {
  frame: { x: 0, y: 0, width: 360, height: 640 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

// Custom light theme with white background for tests
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.background,
  },
};

interface ProvidersProps {
  readonly children: React.ReactNode;
}

/**
 * Test wrapper component that provides all necessary context providers
 * in the same order as the app's root layout for consistency.
 *
 * Provider order (outermost to innermost):
 * 1. ThemeProvider - Navigation theme context
 * 2. SafeAreaProvider - Safe area insets context
 * 3. GestureHandlerRootView - Gesture handler root context
 * 4. BottomSheetModalProvider - Bottom sheet modal context
 * 5. Toaster - Toast notification provider (mocked in tests)
 *
 * Note: Stack and StatusBar are NOT included because:
 * - Stack: Used for navigation/routing, not needed for component unit tests (already mocked in jest.setup.js)
 * - StatusBar: System-level component for device status bar, not relevant in test environment
 */
const Providers = ({ children }: ProvidersProps): JSX.Element => {
  return (
    <ThemeProvider value={LightTheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.background }}>
          <BottomSheetModalProvider>
            {children}
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
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

/**
 * Custom render function that wraps components with all necessary providers.
 *
 * @param ui - The React element to render
 * @param options - Optional render options (excluding 'wrapper' which is handled internally)
 * @returns The result of the render function with providers applied
 */
const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof render> => {
  return render(ui, { wrapper: Providers, ...options });
};

// Re-export all testing utilities from @testing-library/react-native
export * from '@testing-library/react-native';

// Export the custom render function as the default render
export { renderWithProviders as render };
