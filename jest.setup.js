/* eslint-env jest, node */
// Jest setup file - consolidates all mocks in one place

// Mock react-native-worklets FIRST (required by react-native-reanimated)
// Mock react-native-safe-area-context
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-worklets', () => ({
  createWorklet: jest.fn((fn) => fn),
  runOnJS: jest.fn((fn) => fn),
  runOnUI: jest.fn((fn) => fn),
  createSerializable: jest.fn((value) => value),
  isWorkletFunction: jest.fn(() => false),
  isSharedValue: jest.fn(() => false),
}));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// Mock React Native Reanimated (single mock, keep virtual for module resolution)
jest.mock(
  'react-native-reanimated',
  () => {
    const mockReactNative = require('react-native');
    const Reanimated = require('react-native-reanimated/mock');

    // keep helpers expected in our code/tests
    Reanimated.useSharedValue = jest.fn(() => ({ value: 0 }));
    Reanimated.useAnimatedStyle = jest.fn(() => ({}));
    Reanimated.withTiming = jest.fn((value) => value);
    Reanimated.withSpring = jest.fn((value) => value);
    Reanimated.runOnJS = jest.fn((fn) => fn);
    Reanimated.runOnUI = jest.fn((fn) => fn);
    Reanimated.interpolate = jest.fn();
    Reanimated.Extrapolate = { CLAMP: 'clamp' };
    Reanimated.setUpTests = jest.fn();

    // ensure default export exists for default imports
    Reanimated.default = {
      ...Reanimated.default,
      View: mockReactNative.View,
      Text: mockReactNative.Text,
      Image: mockReactNative.Image,
      ScrollView: mockReactNative.ScrollView,
      FlatList: mockReactNative.FlatList,
      call: () => {},
    };

    return Reanimated;
  },
  { virtual: true },
);

// Mock expo-router
jest.mock('expo-router', () => {
  const mockReactNative = require('react-native');
  const mockReact = require('react');
  return {
    Link: ({ children }) => mockReact.createElement(mockReactNative.Text, null, children),
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
      isReady: true,
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    }),
    useLocalSearchParams: () => ({}),
    useGlobalSearchParams: () => ({}),
    Stack: {
      Screen: ({ children }) => children,
    },
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const mockReactNative = require('react-native');
  const mockReact = require('react');
  return {
    GestureHandlerRootView: ({ children }) =>
      mockReact.createElement(mockReactNative.View, { style: { flex: 1 } }, children),
    gestureHandlerRootHOC: (Component) => (props) => mockReact.createElement(Component, props),
    Swipeable: mockReactNative.View,
    DrawerLayout: mockReactNative.View,
    State: {},
    ScrollView: mockReactNative.ScrollView,
    FlatList: mockReactNative.FlatList,
    Directions: {},
  };
});

// Mock react-native-svg (proper mock, not reanimated/mock)
jest.mock('react-native-svg', () => {
  const ReactNative = require('react-native');
  return {
    __esModule: true,
    default: ReactNative.View,
    Svg: ReactNative.View,
    Circle: ReactNative.View,
    Ellipse: ReactNative.View,
    G: ReactNative.View,
    Text: ReactNative.Text,
    TSpan: ReactNative.Text,
    TextPath: ReactNative.View,
    Path: ReactNative.View,
    Polygon: ReactNative.View,
    Polyline: ReactNative.View,
    Line: ReactNative.View,
    Rect: ReactNative.View,
    Use: ReactNative.View,
    Image: ReactNative.Image,
    Symbol: ReactNative.View,
    Defs: ReactNative.View,
    LinearGradient: ReactNative.View,
    RadialGradient: ReactNative.View,
    Stop: ReactNative.View,
    ClipPath: ReactNative.View,
    Pattern: ReactNative.View,
    Mask: ReactNative.View,
    Marker: ReactNative.View,
    ForeignObject: ReactNative.View,
  };
});

// Mock react-native-mmkv (using __mocks__ directory)
jest.mock('react-native-mmkv');

// Mock sonner-native (using __mocks__ directory)
jest.mock('sonner-native');

// Mock zustand (using __mocks__ directory)
jest.mock('zustand');

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const ReactNative = require('react-native');
  return {
    __esModule: true,
    default: ReactNative.View,
    BottomSheetModalProvider: ({ children }) => children,
    BottomSheetModal: ReactNative.View,
    BottomSheet: ReactNative.View,
    BottomSheetView: ReactNative.View,
    BottomSheetScrollView: ReactNative.ScrollView,
    BottomSheetFlatList: ReactNative.FlatList,
    BottomSheetSectionList: ReactNative.SectionList,
    BottomSheetTextInput: ReactNative.TextInput,
    BottomSheetBackdrop: ReactNative.View,
    BottomSheetHandle: ReactNative.View,
    useBottomSheet: jest.fn(() => ({
      snapToIndex: jest.fn(),
      snapToPosition: jest.fn(),
      close: jest.fn(),
      expand: jest.fn(),
      collapse: jest.fn(),
      forceClose: jest.fn(),
    })),
    useBottomSheetModal: jest.fn(() => ({
      present: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    })),
  };
});

// Mock nativewind
jest.mock('nativewind', () => ({
  style: jest.fn((styles) => styles),
}));

// Mock lucide-react-native
jest.mock('lucide-react-native', () => {
  const mockReactNative = require('react-native');
  const mockReact = require('react');
  return new Proxy(
    {},
    {
      get: () => (props) => mockReact.createElement(mockReactNative.View, props),
    },
  );
});

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: jest.fn(() => null),
  setStatusBarBackgroundColor: jest.fn(),
  setStatusBarStyle: jest.fn(),
  setStatusBarNetworkActivityIndicatorVisible: jest.fn(),
  setStatusBarHidden: jest.fn(),
  setStatusBarTranslucent: jest.fn(),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {},
    manifest: {},
    executionEnvironment: 'standalone',
  },
}));

// Mock expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
  parse: jest.fn(),
  resolve: jest.fn(),
  useURL: jest.fn(() => null),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock expo-clipboard
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
  getStringAsync: jest.fn(() => Promise.resolve('')),
  hasStringAsync: jest.fn(() => Promise.resolve(false)),
}));

// Mock react-native-css-interop
jest.mock('react-native-css-interop', () => ({
  cssInterop: jest.fn((Component) => Component),
}));

// Mock @shopify/flash-list
jest.mock('@shopify/flash-list', () => {
  const mockReactNative = require('react-native');
  return {
    FlashList: mockReactNative.FlatList,
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const mockReactNative = require('react-native');
  return {
    LinearGradient: mockReactNative.View,
  };
});

// Mock clsx (support default and named export)
jest.mock('clsx', () => {
  const clsx = jest.fn((...args) => args.filter(Boolean).join(' '));
  return {
    __esModule: true,
    default: clsx,
    clsx,
  };
});

jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn((str) => str),
}));

// Mock class-variance-authority
jest.mock('class-variance-authority', () => ({
  cva: jest.fn(() => jest.fn(() => 'mocked-class')),
}));

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '20 minutes ago'),
  subMinutes: jest.fn(() => new Date()),
}));

// Mock react-native-dropdown-picker (align with default import usage)
jest.mock('react-native-dropdown-picker', () => {
  const mockReactNative = require('react-native');
  const mockReact = require('react');

  const MockDropdownPicker = jest.fn(
    ({ items = [], value, setValue, placeholder, open, setOpen, setItems, ...props }) =>
      mockReact.createElement(
        mockReactNative.View,
        { testID: 'dropdown-picker', ...props },
        placeholder && mockReact.createElement(mockReactNative.Text, null, placeholder),
        items.map((item) =>
          mockReact.createElement(
            mockReactNative.Pressable,
            {
              key: item.value,
              onPress: () => setValue && setValue(() => item.value),
            },
            mockReact.createElement(mockReactNative.Text, null, item.label),
          ),
        ),
        value && mockReact.createElement(mockReactNative.Text, { testID: 'selected-value' }, value),
      ),
  );

  MockDropdownPicker.displayName = 'MockDropdownPicker';

  return { __esModule: true, default: MockDropdownPicker };
});

// Mock store
jest.mock('@/store', () => ({
  useStoreSelectors: () => ({
    setCredentials: jest.fn(),
    user: null,
    token: null,
  }),
}));

// Mock @hookform/resolvers
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => jest.fn()),
}));

// Mock zod
jest.mock('zod', () => {
  const createChainableMock = () => ({
    trim: jest.fn(() => createChainableMock()),
    min: jest.fn(() => createChainableMock()),
    toLowerCase: jest.fn(() => createChainableMock()),
    email: jest.fn(() => createChainableMock()),
    optional: jest.fn(() => createChainableMock()),
  });

  return {
    z: {
      object: jest.fn(() => createChainableMock()),
      string: jest.fn(() => createChainableMock()),
      email: jest.fn(() => createChainableMock()),
      infer: jest.fn(),
    },
  };
});
