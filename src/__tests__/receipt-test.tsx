import Receipt from '@/components/screen/receipt';
import { render, screen } from '@/test-utils';

describe('Receipt', () => {
  test('renders receipt details', (): void => {
    render(<Receipt />);

    expect(screen.getByText(/transaction receipt/i)).toBeOnTheScreen();
    expect(screen.getByText(/1st november, 2024 1:20:22 pm/i)).toBeOnTheScreen();
    expect(screen.getByText(/transaction amount/i)).toBeOnTheScreen();
    expect(screen.getByText(/n 63, 250\.00/i)).toBeOnTheScreen();
    expect(screen.getByText(/disclaimer/i)).toBeOnTheScreen();
  });
});
