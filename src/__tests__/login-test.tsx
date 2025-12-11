import Login from '@/components/login';
import { render, screen, waitFor } from '@/test-utils';
import { userEvent } from '@testing-library/react-native';
import React from 'react';

describe('Login Component', () => {
  const mockOnDismiss = jest.fn();
  const mockSetNext = jest.fn();
  const mockNext = false;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('renders essential fields and actions', () => {
    render(<Login onDismiss={mockOnDismiss} setNext={mockSetNext} next={mockNext} />);

    expect(screen.getByText('Login to your account')).toBeOnTheScreen();
    expect(screen.getByText('Email')).toBeOnTheScreen();
    expect(screen.getByText('Password')).toBeOnTheScreen();
    expect(screen.getByText('Login')).toBeOnTheScreen();
  });

  test.skip('sets next to true after successful submit', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup();
    render(<Login onDismiss={mockOnDismiss} setNext={mockSetNext} next={mockNext} />);

    await user.type(screen.getByPlaceholderText('Enter  your email address'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123');

    await user.press(screen.getByLabelText('submit-button'));

    jest.advanceTimersByTime(1100); // match the 1s mock delay in onSubmit

    await waitFor(() => {
      expect(mockSetNext).toHaveBeenCalledWith(true);
    });

    jest.useRealTimers();
  });
});
