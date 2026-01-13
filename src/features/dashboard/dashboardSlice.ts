import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// --- Types ---
export interface Patient {
  id: string;
  name: string;
  status: 'Active' | 'Recovered' | 'Critical';
  lastVisit: string;
  age: number;
  assignedDoctor: string;
}

export interface DashboardData {
  stats: {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    activeClinics: number;
  };
  recentPatients: Patient[];
}

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

// --- Dummy Data ---
const MOCK_DATA: DashboardData = {
  stats: {
    totalPatients: 1240,
    totalDoctors: 85,
    totalAppointments: 320,
    activeClinics: 12,
  },
  recentPatients: [
    { id: 'p_1', name: 'Sarah Connor', status: 'Active', lastVisit: '2023-10-24', age: 45, assignedDoctor: 'Dr. Silberman' },
    { id: 'p_2', name: 'John Doe', status: 'Recovered', lastVisit: '2023-10-22', age: 32, assignedDoctor: 'Dr. House' },
    { id: 'p_3', name: 'Jane Smith', status: 'Critical', lastVisit: '2023-10-25', age: 28, assignedDoctor: 'Dr. Strange' },
    { id: 'p_4', name: 'Ellen Ripley', status: 'Active', lastVisit: '2023-10-20', age: 35, assignedDoctor: 'Dr. McCoy' },
    { id: 'p_5', name: 'Bruce Wayne', status: 'Recovered', lastVisit: '2023-10-18', age: 40, assignedDoctor: 'Dr. Quinn' },
  ],
};

// --- Thunk ---
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulate randomness or failure if you wanted to test error states
    // if (Math.random() < 0.1) return rejectWithValue('Failed to fetch data');

    return MOCK_DATA;
  }
);

// --- Slice ---
const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;