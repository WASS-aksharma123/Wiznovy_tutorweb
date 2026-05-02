import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTutorSessions, getUpcomingSessions, getPendingBookings } from '../services/scheduleService.js';

export const fetchTutorSessions = createAsyncThunk(
  'schedule/fetchTutorSessions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await getTutorSessions(params);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpcomingSessions = createAsyncThunk(
  'schedule/fetchUpcomingSessions',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getUpcomingSessions();
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingBookings = createAsyncThunk(
  'schedule/fetchPendingBookings',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getPendingBookings();
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  sessions: [],
  upcomingSessions: [],
  pendingBookings: [],
  total: 0,
  loading: false,
  upcomingLoading: false,
  bookingsLoading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSessions: (state) => {
      state.sessions = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.result || action.payload.sessions || [];
        state.total = action.payload.total || action.payload.count || 0;
      })
      .addCase(fetchTutorSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUpcomingSessions.pending, (state) => {
        state.upcomingLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingSessions.fulfilled, (state, action) => {
        state.upcomingLoading = false;
        state.upcomingSessions = action.payload.result || action.payload.sessions || [];
      })
      .addCase(fetchUpcomingSessions.rejected, (state, action) => {
        state.upcomingLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPendingBookings.pending, (state) => {
        state.bookingsLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false;
        state.pendingBookings = action.payload.result || action.payload.bookings || [];
      })
      .addCase(fetchPendingBookings.rejected, (state, action) => {
        state.bookingsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSessions } = scheduleSlice.actions;
export default scheduleSlice.reducer;