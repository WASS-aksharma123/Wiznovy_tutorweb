import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTutorProfile } from '../services/profileService.js';

export const getTutorProfile = createAsyncThunk(
  'profile/getTutorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetchTutorProfile();
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
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTutorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTutorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getTutorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;