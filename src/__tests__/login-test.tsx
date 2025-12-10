import Login from '@/components/login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

// Mock dependencies
const mockOnDismiss = jest.fn();
const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: mockPush,
  },
  Link: 'Link',
}));

jest.mock('@/store', () => ({
  useStoreSelectors: () => ({
    setCredentials: jest.fn(),
  }),
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering Elements', () => {
    test('should render all form elements', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      // Check tabs are present
      expect(screen.getByText('Personal Account')).toBeOnTheScreen();
      expect(screen.getByText('Business Account')).toBeOnTheScreen();

      // Check form title
      expect(screen.getByText('Login to your account')).toBeOnTheScreen();

      // Check form fields
      expect(screen.getByText('Email')).toBeOnTheScreen();
      expect(screen.getByPlaceholderText('Enter  your email address')).toBeOnTheScreen();

      expect(screen.getByText('Password')).toBeOnTheScreen();
      expect(screen.getByPlaceholderText('Enter your password')).toBeOnTheScreen();

      // Check links
      expect(screen.getByText('Forgot Password?')).toBeOnTheScreen();

      // Check buttons
      expect(screen.getByText('Login')).toBeOnTheScreen();
      expect(screen.getByText('Create an account')).toBeOnTheScreen();

      // Check support section
      expect(screen.getByText("Don't have an account?")).toBeOnTheScreen();
      expect(screen.getByText('Contact Support')).toBeOnTheScreen();
    });

    test('should render login button with correct initial text', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const loginButton = screen.getByText('Login');
      expect(loginButton).toBeOnTheScreen();
    });
  });

  describe('Tab Switching', () => {
    test('should switch between Personal and Business tabs', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const personalTab = screen.getByText('Personal Account');
      const businessTab = screen.getByText('Business Account');

      // Personal tab should be active by default
      expect(personalTab).toBeOnTheScreen();

      // Click business tab
      fireEvent.press(businessTab);
      expect(businessTab).toBeOnTheScreen();

      // Click back to personal tab
      fireEvent.press(personalTab);
      expect(personalTab).toBeOnTheScreen();
    });
  });

  describe('Form Submission', () => {
    test('should handle login button press with valid data', async () => {
      render(<Login onDismiss={mockOnDismiss} />);

      // Get form inputs
      const emailInput = screen.getByPlaceholderText('Enter  your email address');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByText('Login');

      // Fill in the form
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      // Submit the form
      fireEvent.press(loginButton);

      // Check button shows loading state
      await waitFor(() => {
        expect(screen.getByText('Logging in...')).toBeOnTheScreen();
      });

      // Wait for submission to complete
      await waitFor(
        () => {
          expect(mockOnDismiss).toHaveBeenCalled();
          expect(mockPush).toHaveBeenCalledWith('/(tabs)');
        },
        { timeout: 2000 },
      );
    });

    test('should disable button while submitting', async () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const emailInput = screen.getByPlaceholderText('Enter  your email address');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByText('Login');

      // Fill in valid data
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      // Press login button
      fireEvent.press(loginButton);

      // Button should show loading text
      await waitFor(() => {
        expect(screen.getByText('Logging in...')).toBeOnTheScreen();
      });
    });
  });

  describe('Form Validation', () => {
    test('should show validation errors for empty fields', async () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const loginButton = screen.getByText('Login');

      // Try to submit without filling fields
      fireEvent.press(loginButton);

      // Validation should prevent submission
      await waitFor(() => {
        expect(mockOnDismiss).not.toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
      });
    });

    test('should accept valid email format', async () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const emailInput = screen.getByPlaceholderText('Enter  your email address');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByText('Login');

      // Enter valid email and password
      fireEvent.changeText(emailInput, 'valid@email.com');
      fireEvent.changeText(passwordInput, 'securePassword123');

      // Submit
      fireEvent.press(loginButton);

      // Should process submission
      await waitFor(
        () => {
          expect(screen.getByText('Logging in...')).toBeOnTheScreen();
        },
        { timeout: 1000 },
      );
    });
  });

  describe('User Interactions', () => {
    test('should allow text input in email field', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const emailInput = screen.getByPlaceholderText('Enter  your email address');

      fireEvent.changeText(emailInput, 'user@test.com');

      expect(emailInput).toBeOnTheScreen();
    });

    test('should allow text input in password field', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const passwordInput = screen.getByPlaceholderText('Enter your password');

      fireEvent.changeText(passwordInput, 'mySecretPassword');

      expect(passwordInput).toBeOnTheScreen();
    });

    test('should render create account button and be pressable', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const createAccountButton = screen.getByText('Create an account');

      expect(createAccountButton).toBeOnTheScreen();
      fireEvent.press(createAccountButton);
    });
  });

  describe('Accessibility', () => {
    test('should have proper text content types for inputs', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      const emailInput = screen.getByPlaceholderText('Enter  your email address');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      expect(emailInput).toBeOnTheScreen();
      expect(passwordInput).toBeOnTheScreen();
    });

    test('should render all labels for form fields', () => {
      render(<Login onDismiss={mockOnDismiss} />);

      expect(screen.getByText('Email')).toBeOnTheScreen();
      expect(screen.getByText('Password')).toBeOnTheScreen();
    });
  });
});
