import Receipt from '@/components/screen/receipt';
import { render, screen } from '@/test-utils';

describe('Receipt', () => {
  test('renders receipt details', (): void => {
    render(<Receipt />);

    expect(screen.getByText(/transaction receipt/i)).toBeOnTheScreen();
    expect(screen.getByText(/01 november, 2024/i)).toBeOnTheScreen();
    expect(screen.getByLabelText('transaction-amount')).toHaveTextContent('₦63,250.00');
    expect(screen.getByLabelText('transaction-type')).toHaveTextContent(/inter-bank/i);
    expect(screen.getByLabelText('sender')).toHaveTextContent(/nnamdi okeke/i);
    expect(screen.getByLabelText('beneficiary')).toBeOnTheScreen();
    expect(screen.getByLabelText('reference')).toBeOnTheScreen();
    expect(screen.getByText(/disclaimer/i)).toBeOnTheScreen();
  });
});
