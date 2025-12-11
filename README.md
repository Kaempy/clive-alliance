# Zikora - Fintech Mobile App

React Native + Expo mobile challenge aligned to the requirements in `TODO.md`: low-RAM Android support, OTP login, paginated transactions, money transfer, and testing.

**Preview demo:** [Jam recording](https://jam.dev/c/32015a0b-bdc9-4838-8aeb-0cd4f8bd4a53)

## What’s inside (mapped to TODO.md)

- **Authentication:** Email + password to request OTP, then 6-digit OTP verification (`123456` mock) with error toasts and disabled loading state.
- **Home / Accounts:** Balance card with last-updated indicator and pull-to-refresh.
- **Transactions:** Virtualized `FlatList` over the 3,000+ item mock dataset with pagination via React Query; `getItemLayout`, `removeClippedSubviews`, and tuned render windows to avoid memory churn.
- **Transfer (Send Money):** Form validation with Zod + React Hook Form and disabled submit during mutation.
- **Beneficiaries & quick actions:** Shortcuts to pay/transfer flows; reusable UI components for consistent theming.
- **Testing:** Six component/unit tests covering buttons, form fields/selects, home, login, and receipt screens.
- **Docs:** `PERF.md` for performance choices; `TESTS.md` for coverage and next steps.

## Tech Stack

- **Core:** React Native 0.81.5, Expo ~54, TypeScript (strict), Expo Router.
- **UI:** NativeWind (Tailwind), Lucide icons, SVG, gradients.
- **State & Data:** Zustand + MMKV wrapper, TanStack Query for mock network/pagination.
- **Forms & Validation:** React Hook Form, Zod + `@hookform/resolvers`.
- **Testing & Quality:** Jest + `@testing-library/react-native`, ESLint, Prettier, Husky hooks.

## Quick start

```bash
git clone <repository-url>
cd clive-alliance
npm install
npm start             # Expo dev server
npm run android       # Android device/emulator
npm run ios           # iOS simulator
npm run web           # Web preview
```

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm start`            | Start Expo dev server (clears cache) |
| `npm run android`      | Build/run Android app                |
| `npm run ios`          | Build/run iOS app                    |
| `npm run web`          | Start web preview                    |
| `npm test`             | Jest in watch mode                   |
| `npm run test:ci`      | Jest with coverage, CI-safe          |
| `npm run lint`         | Expo lint over `src`                 |
| `npm run check-types`  | TypeScript `--noEmit`                |
| `npm run check-format` | Prettier check                       |
| `npm run test-all`     | Format check → lint → typecheck      |

## Project structure

```
src/
├── app/             # Expo Router routes
├── components/      # Screens + reusable UI
├── hooks/           # Custom hooks (pagination, theme)
├── lib/             # Utilities + validation schemas
├── services/        # Mock APIs (login, transactions, transfer)
├── store/           # Zustand store + selectors
├── types/           # Shared types
└── __tests__/       # Jest + RTL tests
assets/              # Images & icons
PERF.md              # Performance decisions
TESTS.md             # Test coverage and plans
TODO.md              # Challenge requirements
```

## Performance notes (high level)

- Hermes enabled for Android in `app.json`.
- `FlatList` tuned for low-RAM devices: `getItemLayout`, `removeClippedSubviews`, `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and stable `keyExtractor`.
- Pagination via React Query (`useTransactionsPagination`) with 50-item pages to cap memory and network cost.
- Memoized transaction rows and lightweight theming to reduce re-renders. Details in `PERF.md`.

## Testing

- Six Jest tests in `src/__tests__` covering Button, FormField, FormSelect, Home, Login, and Receipt.
- Run locally: `npm test` (watch) or `npm run test:ci` (coverage). See `TESTS.md` for what’s covered and gaps (integration/E2E plans).

## Security & reliability

- No secrets committed; mock APIs only.
- Inputs validated with Zod; OTP uses secure entry.
- Toasted error paths for login/OTP; pagination requests avoid retries on repeated failures.
- Follow Expo lint + Prettier via Husky pre-commit.

## Deliverables checklist (from TODO.md)

- Hermes on Android, low-RAM friendly lists, OTP 123456 acceptance.
- Uses provided mock JSON for transactions/beneficiaries.
- `PERF.md` (list optimizations) and `TESTS.md` (coverage + future work).
- Scripts for lint, typecheck, and tests.
- Recordings/screenshots can be attached when submitting the challenge.

## Troubleshooting

- Metro cache: `npm start -- --reset-cache`
- Android clean: `cd android && ./gradlew clean && cd ..`
- iOS pods: `cd ios && pod install && cd ..`

This project is for the Zikora/Clive Alliance mobile challenge. Contributions and feedback are welcome while keeping to the supplied Figma and requirements.
