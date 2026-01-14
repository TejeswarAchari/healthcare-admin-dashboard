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
  { id: 'p_1', name: 'Ramesh Kumar', status: 'Active', lastVisit: '2026-01-05', age: 46, assignedDoctor: 'Dr. Anil Sharma' },
  { id: 'p_2', name: 'Sita Reddy', status: 'Recovered', lastVisit: '2026-01-02', age: 34, assignedDoctor: 'Dr. Kavita Rao' },
  { id: 'p_3', name: 'Arjun Verma', status: 'Critical', lastVisit: '2026-01-11', age: 29, assignedDoctor: 'Dr. Rohit Mehta' },
  { id: 'p_4', name: 'Lakshmi Narayan', status: 'Active', lastVisit: '2026-01-08', age: 52, assignedDoctor: 'Dr. Sunita Iyer' },
  { id: 'p_5', name: 'Vikram Singh', status: 'Recovered', lastVisit: '2026-01-01', age: 41, assignedDoctor: 'Dr. Pankaj Gupta' },
  { id: 'p_6', name: 'Ananya Choudhary', status: 'Active', lastVisit: '2026-01-10', age: 26, assignedDoctor: 'Dr. Neha Malhotra' },
  { id: 'p_7', name: 'Mahesh Patil', status: 'Critical', lastVisit: '2026-01-12', age: 58, assignedDoctor: 'Dr. Sanjay Kulkarni' },
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