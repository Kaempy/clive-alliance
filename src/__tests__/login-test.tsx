import Login from '@/components/login';
import { render, screen } from '@/test-utils';
import { userEvent } from '@testing-library/react-native';
import React from 'react';

describe('Login Component', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders essential fields and actions', () => {
    render(<Login onDismiss={mockOnDismiss} />);

    expect(screen.getByText('Login to your account')).toBeOnTheScreen();
    expect(screen.getByText('Email')).toBeOnTheScreen();
    expect(screen.getByText('Password')).toBeOnTheScreen();
    expect(screen.getByText('Login')).toBeOnTheScreen();
  });

  test.skip('calls onDismiss once when form is submitted', async () => {
    userEvent.setup();
    render(<Login onDismiss={mockOnDismiss} />);

    await userEvent.type(
      screen.getByPlaceholderText('Enter  your email address'),
      'test@example.com',
    );
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'password123');

    const button = await userEvent.press(screen.getByLabelText('submit-button'));

    expect(button).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
