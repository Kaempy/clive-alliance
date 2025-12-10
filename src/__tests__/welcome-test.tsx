import Welcome from '@/components/welcome';
import { render, screen } from '@testing-library/react-native';

describe('<Welcome />', () => {
  test('should render welcome screen', () => {
    render(<Welcome />);

    // Test image with alt text
    const badgeText = screen.getByText('Welcome to Zikora Bank');
    expect(badgeText).toBeOnTheScreen();

    // Test specific text content
    expect(screen.getByText('Welcome to Zikora Bank')).toBeOnTheScreen();
    expect(
      screen.getByText('Manage your finances effortlessly with our intuitive app.'),
    ).toBeOnTheScreen();
    expect(screen.getByText(/open an account from the comfort of your home/)).toBeOnTheScreen();

    // Test button
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeOnTheScreen();
  });
});
