# Testing Documentation

Aligned to `TODO.md`: six+ unit/component suites today, with a roadmap for integration, performance, accessibility, and E2E coverage on the mobile flows.

## Stack

- Jest 29.7 with `jest-expo`
- `@testing-library/react-native` for component behavior
- TypeScript strict mode; ESLint + Prettier + Husky hooks

## Current coverage (6 suites in `src/__tests__`)

- `button-test.tsx`: onPress firing and disabled guard.
- `formfield-test.tsx`: label/value update and password visibility toggle (a11y button).
- `formselect-test.tsx`: renders label/optional tag, updates selected option.
- `home-test.tsx`: hero sections render (greeting, balance, recent transactions).
- `login-test.tsx`: renders login form; flow test to OTP is skipped pending timer/network stabilization.
- `receipt-test.tsx`: renders receipt headline, timestamp, amount, and disclaimer.

## How to run

```bash
npm test           # watch mode
npm run test:ci    # coverage, CI-safe workers
```

## Mocks and fixtures

- Native/Expo modules mocked in `jest.setup.js`; FlashList, gesture handler, and router hooks included.
- Asset imports stubbed via `__mocks__/fileMock.js`.
- Toasts (`sonner-native`) and MMKV storage mocked for deterministic tests.
- Transactions JSON reused in pagination tests to keep memory predictable.

## Gaps and next steps

- **Unskip login flow** once timers and network mocks are stable to assert OTP advance.
- **Integration (high):** login → OTP → tabs; transactions pagination + pull-to-refresh; transfer submission with disabled states.
- **Performance (high):** assert 3k+ transaction render without OOM; profile scroll FPS on low-RAM emulator.
- **Accessibility (medium):** roles/labels across primary flows; OTP focus order.
- **E2E (medium):** Detox/Maestro for login → transactions → transfer happy path.
