import Home from '@/components/tabs/home';
import { render, screen } from '@/test-utils';

describe('Home', () => {
  test('renders Home screen sections', async (): Promise<void> => {
    render(<Home />);

    expect(await screen.findByText(/good afternoon shalom/i)).toBeOnTheScreen();
    expect(screen.getByText(/your balance/i)).toBeOnTheScreen();
    expect(screen.getByText(/recent transactions/i)).toBeOnTheScreen();
  });
});
