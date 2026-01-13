import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';

// Dummy Credentials [cite: 23, 24]
const DUMMY_CREDS = {
  email: 'admin@healthcare.com',
  password: 'admin123'
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async Thunk to simulate API Login
// This adds the "loading" state automatically
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    // 1. Simulate Network Delay (800ms) for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 2. Validate Credentials
    if (
      credentials.email === DUMMY_CREDS.email && 
      credentials.password === DUMMY_CREDS.password
    ) {
      // Success: Return a mock user object
      const user: User = {
        id: 'u_001',
        name: 'Dr. Admin',
        email: credentials.email,
        role: 'admin',
        avatar: 'https://github.com/shadcn.png', // Placeholder avatar
      };
      // Persist to localStorage for "Remember Me" feel
      localStorage.setItem('healthcare_user', JSON.stringify(user));
      return user;
    }

    // Failure
    return rejectWithValue('Invalid email or password');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    // Hydrate state from localStorage on refresh
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      return { ...initialState, isAuthenticated: true, user: JSON.parse(savedUser) };
    }
    return initialState;
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('healthcare_user'); // Clear persistence
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Loading State
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Success State
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // Error State
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;