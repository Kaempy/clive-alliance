import Button from '@/components/ui/Button';
import React from 'react';
import { fireEvent, render, screen } from '@/test-utils';

describe('Button', () => {
  test('calls onPress when enabled', (): void => {
    const handlePress = jest.fn();

    render(<Button onPress={handlePress}>Tap me</Button>);

    fireEvent.press(screen.getByText(/tap me/i));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test('does not call onPress when disabled', (): void => {
    const handlePress = jest.fn();

    render(
      <Button onPress={handlePress} disabled>
        Disabled
      </Button>,
    );

    fireEvent.press(screen.getByText(/disabled/i));

    expect(handlePress).not.toHaveBeenCalled();
  });
});
