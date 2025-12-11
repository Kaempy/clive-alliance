# Performance Optimization Notes

Focus: satisfy `TODO.md` on low-RAM Android (≤3 GB) while rendering the 3k+ transaction dataset smoothly and predictably.

## Lists & pagination

- **Virtualized `FlatList`:** stable `keyExtractor`, `getItemLayout`, `removeClippedSubviews`, `initialNumToRender`, `maxToRenderPerBatch`, and `windowSize` tuned for small memory windows.
- **Pagination:** `useTransactionsPagination` uses TanStack Query with 50-item pages, cached pages, and `getNextPageParam` to avoid over-fetching.
- **Item rendering:** lightweight transaction rows with memoized icon/color lookup; separator component prevents inline element creation during scroll.
- **Layout sizing:** constant `ITEM_HEIGHT` feeds `getItemLayout` for faster scroll metrics and fewer layout passes.

## Networking & data

- Mock services simulate ~750 ms latency to exercise loading states.
- React Query caches pages and surfaces `refetch` for pull-to-refresh without tearing down the list.
- Errors toast to the user; retries disabled by default to prevent request storms on flaky networks.

## State & forms

- Zustand store kept small; selector helpers prevent broad re-renders.
- Auth + OTP flows validated with Zod schemas; React Hook Form keeps inputs uncontrolled to limit renders.
- MMKV-backed storage wrapper available for persistence without blocking the JS thread.

## Assets & styling

- NativeWind for compile-time Tailwind styles (no runtime style allocations).
- Vector icons and right-sized images to keep decode/memory overhead low.

## Runtime configuration

- Hermes enabled for Android (`app.json`) for lower memory and faster startup.
- Metro minifier drops `console` in production builds.

## Testing for performance regressions

- Run on Android emulator with 2 GB RAM to mirror target constraints.
- Verify smooth scroll on the transactions list after multiple pagination fetches.
- Watch memory in Flipper/Android Studio; ensure no leaks when repeatedly refreshing and paginating.

## Next improvements (if time allows)

- Swap in FlashList for tighter recycling if bundle size allows.
- Image lazy loading and skeleton placeholders on heavy screens.
- Background prefetch for the next page when nearing the end of the current page.
- Add perf assertions (FPS/memory) to automated test runs via profiling hooks.

**Last Updated:** December 2025
