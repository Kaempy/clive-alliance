/** @type {import('jest').Config} */

module.exports = {
  preset: 'jest-expo',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '@shopify/flash-list/jestSetup',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    // Allow these ESM packages in node_modules to be transformed by Babel/Jest
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo-modules-core/.*|expo-router/.*|expo-router|expo(nent)?|@expo(nent)?/.*|expo-clipboard|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-safe-area-context|react-native-screens|react-native-reanimated|react-native-gesture-handler|react-native-css-interop|@gorhom/bottom-sheet|sonner-native|@shopify/flash-list|lucide-react-native|@testing-library|immer|zustand|react-native-mmkv|react-native-worklets|nativewind)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
