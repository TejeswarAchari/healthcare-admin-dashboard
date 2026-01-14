import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';

// 1. Setup Default Admin List (Simulating Database)
const DEFAULT_USERS: User[] = [
  {
    id: 'u_001',
    name: 'Dr. Admin',
    email: 'admin@healthcare.com',
    role: 'admin',
    avatar: 'https://github.com/shadcn.png',
    // In a real app, password would be hashed. For this demo, we store it here.
    // We add a custom property to the type locally or just handle it in logic
    // @ts-ignore: Adding password for demo purposes
    password: 'admin123' 
  }
];

// Helper to load users
const loadUsers = (): User[] => {
  const saved = localStorage.getItem('healthcare_users');
  return saved ? JSON.parse(saved) : DEFAULT_USERS;
};

// 2. Update State Interface to include the list
interface ExtendedAuthState extends AuthState {
  registeredUsers: User[];
}

const initialState: ExtendedAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registeredUsers: loadUsers(), // Load on start
};

// 3. Updated Login Logic
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { getState, rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Get current list of users from Redux state
    const state = getState() as { auth: ExtendedAuthState };
    const users = state.auth.registeredUsers;

    // Check if any user matches credentials
    const foundUser = users.find((u: any) => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      // Remove password before saving to session
      const { password, ...safeUser } = foundUser;
      localStorage.setItem('healthcare_user', JSON.stringify(safeUser));
      return safeUser as User;
    }

    return rejectWithValue('Invalid email or password');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    // Hydrate login session
    const savedUser = localStorage.getItem('healthcare_user');
    const baseState = { ...initialState, registeredUsers: loadUsers() };
    
    if (savedUser) {
      return { ...baseState, isAuthenticated: true, user: JSON.parse(savedUser) };
    }
    return baseState;
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('healthcare_user');
    },
    clearError: (state) => {
      state.error = null;
    },
    // 4. NEW ACTION: Register User
    registerUser: (state, action: PayloadAction<User & { password?: string }>) => {
      state.registeredUsers.push(action.payload);
      // Persist the updated list
      localStorage.setItem('healthcare_users', JSON.stringify(state.registeredUsers));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, registerUser } = authSlice.actions;
export default authSlice.reducer;