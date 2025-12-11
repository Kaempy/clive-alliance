import FormField from '@/components/ui/FormField';
import React, { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { fireEvent, render, screen } from '@/test-utils';

const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const methods = useForm<{ email: string; password: string }>({
    defaultValues: { email: '', password: '' },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormField', () => {
  test('renders label and updates value', (): void => {
    render(
      <Wrapper>
        <FormField name="email" label="Email" inputProps={{ placeholder: 'Email' }} />
      </Wrapper>,
    );

    const input = screen.getByPlaceholderText(/email/i);
    expect(screen.getByText(/email/i)).toBeOnTheScreen();

    fireEvent.changeText(input, 'user@example.com');

    expect(screen.getByDisplayValue('user@example.com')).toBeOnTheScreen();
  });

  test('toggles password visibility', async (): Promise<void> => {
    render(
      <Wrapper>
        <FormField
          name="password"
          label="Password"
          isPassword
          inputProps={{ placeholder: 'Password' }}
        />
      </Wrapper>,
    );

    const input = screen.getByPlaceholderText(/password/i);
    expect(input.props.secureTextEntry).toBe(true);

    // Find the toggle button - it should have accessibilityRole="button"
    const toggle = screen.getByRole('button');
    fireEvent.press(toggle);

    // Wait for state update and re-query the input
    const updatedInput = await screen.findByPlaceholderText(/password/i);
    expect(updatedInput.props.secureTextEntry).toBe(false);
  });
});
