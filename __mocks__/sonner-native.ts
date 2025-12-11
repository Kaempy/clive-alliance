// Mock toast functions
const mockToast = jest.fn(() => ({
  id: 'mock-toast-id',
  dismiss: jest.fn(),
  update: jest.fn(),
}));

export const toast = Object.assign(mockToast, {
  success: mockToast,
  error: mockToast,
  info: mockToast,
  warning: mockToast,
  loading: mockToast,
  promise: mockToast,
  custom: mockToast,
  message: mockToast,
  dismiss: jest.fn(),
});

// Mock Toaster component
export const Toaster = jest.fn(() => null);
