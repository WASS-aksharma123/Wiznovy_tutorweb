import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTutorSessions } from '../services/scheduleService.js';

export const fetchTutorSessions = createAsyncThunk(
  'schedule/fetchTutorSessions',
  async ({ date, limit = 20, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const result = await getTutorSessions(date, limit, offset);
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
  total: 0,
  loading: false,
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
      });
  },
});

export const { clearError, clearSessions } = scheduleSlice.actions;
export default scheduleSlice.reducer;