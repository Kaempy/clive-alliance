# Mobile Developer Challenge (React Native)

## Overview

You'll build a small Fintech-style mobile app using our Zikora Figma designs.

**The goal is to see how well you can:**

- Implement existing designs faithfully (no redesigns)
- Write clean, performant React Native code that runs smoothly on low-RAM Android phones
- Handle basic networking, edge cases, and testing

## ⏱️ Timebox

Spend about **2 hours total**. Deliver what works best within that limit.

## 🛠️ Tech Requirements

- **Framework:** React Native (TypeScript). Expo allowed.
- **Designs:** Use the [Zikora Figma](https://www.figma.com/design/6uJ0kItHvi9IB5nW4uRjXL/Clive-Assessments?node-id=47-1478&t=5bQlM5dxHys9kIt1-0) provided — do not change layouts or create new screens.
- **Engine:** Enable Hermes for Android builds (better memory use).
- **Data:** Use the provided mock JSON files for accounts, transactions, and beneficiaries.
- **Testing:** Jest + React Native Testing Library. Optional end-to-end test (Detox or Maestro).

## 📱 Devices to Support

- **Android 10+** with ≤ 3 GB RAM (simulate with Android Studio → Advanced → RAM = 2048 MB)
- iOS simulator optional but welcome

## 🎯 What to Build

### 1. Login (Email + 6-digit OTP)

- Accept OTP `123456`
- Handle invalid OTP, resend timer, and network-error toast

### 2. Home / Accounts

- Show balance
- Pull-to-refresh with short mock delay

### 3. Transactions List

- Render 3,000+ items from `transactions.json`
- Infinite scroll or pagination — must not crash on low-RAM Android
- Use `FlatList` (or `FlashList`) with proper virtualization (e.g., `getItemLayout`, `removeClippedSubviews`)

### 4. Transfer (Send Money)

- Fields: recipient, amount, description
- Disable button while sending; show success/fail states; prevent double-submit

### 5. Beneficiaries

- List existing + add new (local-only)

## 🚀 Non-Functional Requirements

### Performance

- Must run without crash or frame stutter on low-RAM Android
- Optimize lists; use profiling tools (Flipper or similar)
- Submit a short video showing smooth scroll and no OOM

### Reliability & UX

- Handle offline/failed network gracefully
- Inputs labeled for accessibility; sensitive fields masked
- No secrets or keys in repo

### Testing

- At least **6 unit/component tests**
- Optional: one small E2E flow (login → transactions → transfer)

## 📦 What to Submit

A public or private Git repo (GitHub/GitLab) containing:

1. `/app` code (TypeScript) with setup instructions
2. Hermes enabled for Android release
3. Scripts: `lint`, `typecheck`, `test`
4. 2–5 min screen-recording (cold start, list scroll, transfer demo)
5. `PERF.md`: short note on list-optimization choices
6. `TESTS.md`: what you tested and what you'd add with more time

## 📝 Notes

- Keep it simple and faithful — no new UI or libraries beyond what's needed
- Aim for real-world stability, not just "it runs on simulator"
- This test checks that your app won't crash on a 2 GB phone and still looks like the Figma

**Good luck — we're excited to see what you build!** 🚀
