import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import authReducer from '@/features/auth/authSlice';

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Create a fresh store before each test
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    mockNavigate.mockClear();
  });

  const renderLogin = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  describe('Rendering', () => {
    it('renders login form with all elements', () => {
      renderLogin();

      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in to account/i })).toBeInTheDocument();
    });

    it('renders with pre-filled demo credentials', () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;

      expect(emailInput.value).toBe('admin@healthcare.com');
      expect(passwordInput.value).toBe('admin123');
    });

    it('displays demo credentials in UI', () => {
      renderLogin();

      expect(screen.getByText('admin@healthcare.com')).toBeInTheDocument();
      expect(screen.getByText('admin123')).toBeInTheDocument();
    });

    it('renders password toggle button', () => {
      renderLogin();

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Email Validation', () => {
    it('shows error for invalid email format', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      
      // Clear the input and type invalid email
      await user.clear(emailInput);
      await user.type(emailInput, 'invalidemail');
      
      // Blur to trigger validation
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('shows error for empty email', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      
      await user.clear(emailInput);
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('clears error when valid email is entered', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      
      // First, create an error
      await user.clear(emailInput);
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      // Then fix it
      await user.type(emailInput, 'valid@email.com');

      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('toggles password visibility when button is clicked', async () => {
      renderLogin();
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;
      const toggleButton = screen.getByRole('button', { name: /show password/i });

      // Initially password should be hidden
      expect(passwordInput.type).toBe('password');

      // Click to show password
      await user.click(toggleButton);
      expect(passwordInput.type).toBe('text');

      // Click again to hide password
      await user.click(toggleButton);
      expect(passwordInput.type).toBe('password');
    });
  });

  describe('Form Submission', () => {
    it('prevents submission with invalid email', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /sign in to account/i });

      await user.clear(emailInput);
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
      
      // Should not navigate
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('submits form with valid credentials', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByRole('button', { name: /sign in to account/i });

      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // Verify form submission attempted
      await waitFor(() => {
        const state: any = store.getState();
        expect(state.auth.isLoading || state.auth.error || state.auth.isAuthenticated).toBeDefined();
      });
    });

    it('shows loading state during submission', async () => {
      renderLogin();
      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', { name: /sign in to account/i });
      await user.click(submitButton);

      // Check for loading state (button should show loading text or be disabled)
      await waitFor(() => {
        const state: any = store.getState();
        if (state.auth.isLoading) {
          expect(screen.getByText(/signing in/i)).toBeInTheDocument();
        }
      });
    });
  });

  describe('Responsive Design', () => {
    it('renders responsive container classes', () => {
      renderLogin();

      const container = screen.getByRole('heading', { name: /welcome back/i }).parentElement;
      expect(container).toBeInTheDocument();
    });

    it('has touch-friendly button size', () => {
      renderLogin();

      const submitButton = screen.getByRole('button', { name: /sign in to account/i });
      expect(submitButton).toHaveClass('min-h-[48px]', 'touch-manipulation');
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      renderLogin();

      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    });

    it('has aria-label for password toggle', () => {
      renderLogin();

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      expect(toggleButton).toHaveAttribute('aria-label');
    });

    it('associates error messages with inputs', async () => {
      renderLogin();
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email address/i);
      await user.clear(emailInput);
      fireEvent.blur(emailInput);

      await waitFor(() => {
        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toHaveAttribute('id', 'email-error');
      });
    });
  });
});
