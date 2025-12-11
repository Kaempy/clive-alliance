/**
 * Theme configuration for the app. Uses a light theme with Inter and Raleway fonts.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  primary: '#66A681',
  text: '#A5A5A5',
  background: '#fff',
  tint: '#66A681',
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: '#66A681',
};

export const Fonts = Platform.select({
  ios: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    serif: "Raleway, 'Times New Roman', serif",
    rounded: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    serif: 'Raleway, serif',
    rounded: 'Inter, system-ui, sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Raleway, Georgia, 'Times New Roman', serif",
    rounded: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
