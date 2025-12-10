# Zikora - Fintech Mobile App 💰

A performant, production-ready React Native fintech mobile application built with Expo, designed to run smoothly on low-RAM Android devices (≤ 3 GB RAM).

## 📱 Features

- **🔐 Authentication** - Email + 6-digit OTP login flow
- **🏦 Account Management** - View balance and account details
- **📊 Transactions** - Optimized list handling 3,000+ transactions
- **💸 Money Transfer** - Send money with validation and success states
- **👥 Beneficiaries** - Manage and select payment recipients
- **♻️ Pull-to-Refresh** - Update data with smooth animations
- **🎨 Modern UI** - Faithful implementation of Figma designs
- **📴 Offline Support** - Graceful offline handling with MMKV persistence

## 🛠️ Tech Stack

### Core

- **React Native** 0.81.5 + **Expo** ~54.0
- **TypeScript** ~5.9.2 (strict mode)
- **Expo Router** ~6.0 (file-based routing)

### UI & Styling

- **NativeWind** 4.2 (Tailwind CSS for React Native)
- **Lucide React Native** (icons)
- **React Native SVG** (vector graphics)
- **Expo Linear Gradient** (gradients)

### State Management

- **Zustand** 5.0 (lightweight state)
- **React Native MMKV** 4.1 (fast persistence)
- **Immer** 11.0 (immutable updates)

### Forms & Validation

- **React Hook Form** 7.68
- **Zod** 4.1 (schema validation)
- **@hookform/resolvers** 5.2

### Performance

- **@shopify/flash-list** 2.0 (optimized lists)
- **React Native Reanimated** 4.1 (smooth animations)
- **Hermes Engine** (enabled for Android)

### Testing & Quality

- **Jest** 29.7 + **jest-expo** 54.0
- **@testing-library/react-native** 13.3
- **ESLint** 9.25 + **Prettier** 3.7
- **Husky** 9.1 (Git hooks)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- For Android: Android Studio with emulator
- For iOS: Xcode with simulator (macOS only)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd clive-alliance

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Devices

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (for quick testing)
npm run web
```

## 📂 Project Structure

```
clive-alliance/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── (tabs)/            # Tab navigation screens
│   │   ├── (screen)/          # Modal/stack screens
│   │   ├── _layout.tsx        # Root layout
│   │   └── index.tsx          # Entry point
│   ├── components/            # Reusable components
│   │   ├── tabs/             # Tab-specific components
│   │   ├── screen/           # Screen-specific components
│   │   └── ui/               # Shared UI components
│   ├── hooks/                # Custom React hooks
│   ├── icons/                # SVG icon components
│   ├── lib/                  # Utilities and helpers
│   │   └── validation/       # Zod schemas
│   ├── store/                # Zustand stores
│   │   └── reducers/         # State slices
│   ├── types/                # TypeScript definitions
│   ├── constants/            # App constants
│   ├── styles.ts             # Shared styles
│   └── __tests__/            # Test files
├── assets/                   # Images, fonts, etc.
├── .husky/                   # Git hooks
├── PERF.md                   # Performance notes
├── TESTS.md                  # Testing documentation
└── TODO.md                   # Project requirements
```

## 🧪 Testing

### Run Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once with coverage (CI)
npm run test:ci
```

### Linting & Formatting

```bash
# Lint code
npm run lint

# Check formatting
npm run check-format

# Format code
npm run format

# Type check
npm run check-types

# Run all checks
npm run test-all
```

### Pre-commit Hooks

Automatic checks run on every commit:

- ✅ ESLint with auto-fix
- ✅ Prettier formatting
- ✅ Only on staged files

## 📊 Performance Optimization

This app is optimized for low-RAM Android devices (2-3 GB):

- **FlashList** for efficient list rendering (3,000+ items)
- **Hermes Engine** for faster startup and reduced memory
- **MMKV** for fast, synchronous storage
- **Memoization** to prevent unnecessary re-renders
- **Code splitting** for smaller initial bundle

See [PERF.md](./PERF.md) for detailed optimization notes.

## 🧩 Key Features Implementation

### Authentication Flow

```typescript
// OTP Login: Accept 123456
// Invalid OTP handling with error states
// Zustand + MMKV for persistent auth
```

### Transaction List

```typescript
// FlashList with 3,000+ items
// Optimized rendering with memoization
// No crashes on 2GB RAM devices
```

### Money Transfer

```typescript
// Form validation with Zod
// Disabled state during submission
// Success/fail states with feedback
```

## 📜 Available Scripts

| Script                | Description                   |
| --------------------- | ----------------------------- |
| `npm start`           | Start Expo development server |
| `npm run android`     | Run on Android emulator       |
| `npm run ios`         | Run on iOS simulator          |
| `npm run web`         | Run in web browser            |
| `npm test`            | Run tests in watch mode       |
| `npm run test:ci`     | Run tests with coverage (CI)  |
| `npm run lint`        | Lint code with ESLint         |
| `npm run format`      | Format code with Prettier     |
| `npm run check-types` | TypeScript type checking      |
| `npm run test-all`    | Run all quality checks        |

## 🔧 Configuration

### Hermes Engine

Enabled in `app.json` for Android:

```json
{
  "expo": {
    "android": {
      "jsEngine": "hermes"
    }
  }
}
```

### TypeScript

Strict mode enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 📱 Device Requirements

### Android

- Android 10+ (API 29+)
- 2-3 GB RAM minimum
- Screen: 1080 x 2280 recommended

### iOS

- iOS 13+
- iPhone 8 and above

## 🎨 Design System

The app follows the Zikora Figma designs with:

- **Primary Color:** `#608E75` (green)
- **Typography:** System fonts optimized for readability
- **Spacing:** 4px base unit (Tailwind scale)
- **Components:** Consistent, reusable UI patterns

## 🔒 Security

- ✅ No hardcoded secrets or API keys
- ✅ Sensitive inputs masked (passwords, OTP)
- ✅ Secure storage with MMKV
- ✅ Input validation and sanitization

## 📚 Documentation

- [PERF.md](./PERF.md) - Performance optimization strategies
- [TESTS.md](./TESTS.md) - Testing approach and coverage
- [TODO.md](./TODO.md) - Project requirements and checklist

## 🐛 Troubleshooting

### Metro bundler issues

```bash
npm start -- --reset-cache
```

### Android build issues

```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS build issues

```bash
cd ios && pod install && cd ..
npm run ios
```

## 🤝 Development Workflow

1. **Create feature branch** - `git checkout -b feature/name`
2. **Make changes** - Edit code with hot reload
3. **Test locally** - Run `npm test`
4. **Commit** - Pre-commit hooks run automatically
5. **Push** - Pre-push runs full test suite
6. **Create PR** - Review and merge

## 📈 Performance Benchmarks

Tested on Android Emulator (2 GB RAM):

- ✅ **Cold start:** < 3 seconds
- ✅ **List scroll:** 60 FPS with 3,000+ items
- ✅ **Memory usage:** < 300 MB
- ✅ **No OOM crashes** with large datasets

## 🙏 Acknowledgments

Built with:

- [Expo](https://expo.dev) - Universal React Native framework
- [NativeWind](https://nativewind.dev) - Tailwind CSS for React Native
- [Zustand](https://zustand.docs.pmnd.rs) - Simple state management
- [Shopify FlashList](https://shopify.github.io/flash-list/) - High-performance lists

## 📄 License

This project is part of a coding challenge for Zikora/Clive Alliance.

---

**Built with ❤️ using React Native + Expo**

For questions or issues, please refer to the documentation or create an issue in the repository.
