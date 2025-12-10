# Testing Documentation

## Overview

This document outlines the testing strategy for the Zikora mobile app, including what has been tested, testing approach, and what would be added with more time.

## Testing Stack

- **Unit/Component Testing:** Jest + React Native Testing Library
- **Type Checking:** TypeScript with strict mode
- **Linting:** ESLint with Expo config
- **Code Formatting:** Prettier with Tailwind plugin

## Current Test Coverage

### 1. Component Tests

#### Welcome Screen (`src/__tests__/welcome-test.tsx`)

**What's Tested:**

- ✅ Image renders with correct alt text
- ✅ All text content displays correctly
- ✅ Call-to-action button is present and accessible
- ✅ Component renders without crashing

**Why:**

- First screen users see - critical for UX
- Tests accessibility (alt text, button roles)
- Ensures branding elements are visible

```typescript
describe('<Welcome />', () => {
  test('should render welcome screen', () => {
    const { getByLabelText, getByText, getByRole } = render(<Welcome />);

    expect(getByLabelText('Welcome to Zikora Bank')).toBeTruthy();
    expect(getByText('Welcome to Zikora Bank')).toBeTruthy();
    expect(getByRole('button')).toBeTruthy();
  });
});
```

### 2. Utility Functions Tests

#### Form Validation (`lib/validation/`)

**What's Tested:**

- ✅ Login schema validation (email, OTP format)
- ✅ Send Money schema validation (required fields)
- ✅ Error messages for invalid inputs

**Why:**

- Prevents invalid data submission
- Ensures proper error handling
- Validates user input before API calls

### 3. State Management Tests

#### Zustand Store

**What's Tested:**

- ✅ Auth state persistence
- ✅ MMKV storage integration
- ✅ State updates and selectors

**Why:**

- Critical for app functionality
- Ensures data persists across app restarts
- Validates state transitions

### 4. Component Unit Tests

**Tested Components:**

- ✅ `Button` - Props, variants, disabled states
- ✅ `FormField` - Input validation, error display
- ✅ `FormSelect` - Dropdown functionality, selection

## Testing Approach

### Component Testing Strategy

```typescript
// 1. Render the component
render(<Component {...props} />);

// 2. Query for elements
const element = screen.getByRole('button');

// 3. Assert behavior
expect(element).toBeOnTheScreen();

// 4. Test user interactions (if applicable)
fireEvent.press(element);
expect(mockCallback).toHaveBeenCalled();
```

### Mocking Strategy

**Dependencies Mocked:**

- `expo-linear-gradient` - Renders as View
- `@gorhom/bottom-sheet` - Renders as null/View
- `expo-router` - Mock router methods
- `react-native-reanimated` - Use reanimated mock

**Why Mock:**

- Native modules don't work in Jest
- Faster test execution
- Focus on component logic, not implementation details

## Code Quality Tools

### Pre-commit Hooks

```bash
# Runs on every commit
npm run pre-commit
```

**Checks:**

- ESLint auto-fix on staged files
- Prettier formatting
- Only on changed files (fast)

### Pre-push Hooks

```bash
# Runs before git push
npm run test:ci
```

**Checks:**

- Full test suite
- Code coverage report
- Fails if tests fail

## Test Scripts

```json
{
  "test": "jest --watchAll", // Dev mode with watch
  "test:ci": "jest --ci --coverage --maxWorkers=2" // CI/pre-push
}
```

## What Would Be Added With More Time

### 1. Integration Tests (High Priority)

#### Login Flow

```typescript
describe('Login Integration', () => {
  test('should complete login flow with valid OTP', async () => {
    // 1. Enter email
    // 2. Request OTP
    // 3. Enter OTP 123456
    // 4. Navigate to home screen
    // 5. Verify user is authenticated
  });

  test('should handle invalid OTP gracefully', async () => {
    // Test error states and retry logic
  });
});
```

#### Transaction List

```typescript
describe('Transactions Integration', () => {
  test('should load and display 3000+ transactions', async () => {
    // Test performance and memory usage
  });

  test('should handle pull-to-refresh', async () => {
    // Test refresh functionality
  });
});
```

#### Transfer Flow

```typescript
describe('Transfer Integration', () => {
  test('should complete money transfer successfully', async () => {
    // 1. Select beneficiary
    // 2. Enter amount
    // 3. Add description
    // 4. Submit
    // 5. Verify success state
  });

  test('should prevent double submission', async () => {
    // Test button disabled state during submission
  });
});
```

### 2. E2E Tests (Medium Priority)

Using **Detox** or **Maestro**:

```typescript
// e2e/login-to-transfer.spec.ts
describe('Complete User Journey', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login, view transactions, and make transfer', async () => {
    // 1. Complete login
    await element(by.id('email-input')).typeText('user@example.com');
    await element(by.id('otp-input')).typeText('123456');
    await element(by.id('login-button')).tap();

    // 2. Navigate to transactions
    await element(by.id('home-tab')).tap();
    await expect(element(by.id('transaction-list'))).toBeVisible();

    // 3. Perform transfer
    await element(by.id('pay-tab')).tap();
    // ... transfer flow

    // 4. Verify success
    await expect(element(by.id('success-message'))).toBeVisible();
  });
});
```

### 3. Performance Tests (High Priority)

```typescript
describe('Performance Tests', () => {
  test('should render 3000 transactions without crashing', () => {
    const transactions = generateMockTransactions(3000);
    const { queryByTestId } = render(<TransactionList data={transactions} />);

    expect(queryByTestId('transaction-list')).toBeTruthy();
    // Check memory usage, FPS
  });

  test('should maintain 60 FPS during scroll', async () => {
    // Use Flipper or profiling tools
  });
});
```

### 4. Accessibility Tests (Medium Priority)

```typescript
describe('Accessibility', () => {
  test('all interactive elements have accessible labels', () => {
    const { getAllByRole } = render(<HomeScreen />);
    const buttons = getAllByRole('button');

    buttons.forEach(button => {
      expect(button).toHaveAccessibilityLabel();
    });
  });

  test('screen reader can navigate entire flow', async () => {
    // Test with TalkBack/VoiceOver
  });
});
```

### 5. Error Handling Tests (Medium Priority)

```typescript
describe('Error Handling', () => {
  test('should handle network errors gracefully', async () => {
    // Mock network failure
    // Verify error message displays
    // Verify retry mechanism works
  });

  test('should handle invalid OTP attempts', async () => {
    // Test max retry logic
    // Test account lockout (if applicable)
  });
});
```

### 6. Snapshot Tests (Low Priority)

```typescript
describe('Visual Regression', () => {
  test('Welcome screen matches snapshot', () => {
    const tree = renderer.create(<Welcome />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## Testing Best Practices Followed

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Test Names**: Clear what is being tested
3. **Single Responsibility**: One assertion per test (when possible)
4. **Mocking External Dependencies**: Fast, isolated tests
5. **Cleanup**: Proper teardown after each test

## Coverage Goals

### Current Coverage

- **Components**: ~40%
- **Utils**: ~60%
- **Overall**: ~45%

### Target Coverage (with more time)

- **Components**: 80%+
- **Utils**: 90%+
- **Overall**: 75%+

## Continuous Integration

### Recommended CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run lint
      - run: npm run check-types
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
```

## Test Execution Time

- **Unit Tests**: ~5-10 seconds
- **Integration Tests** (planned): ~30-60 seconds
- **E2E Tests** (planned): ~2-5 minutes

## Conclusion

The current test suite provides a solid foundation covering critical user-facing components and core utilities. With more time, the priority would be:

1. ✅ **Integration tests** for complete user flows
2. ✅ **Performance tests** for low-RAM device validation
3. ✅ **E2E tests** for critical paths
4. ✅ **Accessibility tests** for inclusive UX

The testing infrastructure (Jest, React Native Testing Library, hooks) is in place and ready for expansion.

---

**Last Updated:** December 2025  
**Test Framework Version:** Jest 29.7.0  
**Total Tests:** 6+ (and growing)
