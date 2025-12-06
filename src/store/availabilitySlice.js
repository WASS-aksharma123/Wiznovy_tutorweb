import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { availabilityService } from '../services/availabilityService';

export const createAvailability = createAsyncThunk(
  'availability/create',
  async (availabilityData, { rejectWithValue }) => {
    try {
      const response = await availabilityService.createAvailability(availabilityData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    loading: false,
    error: null,
    availabilities: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availabilities.push(action.payload);
      })
      .addCase(createAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default availabilitySlice.reducer;