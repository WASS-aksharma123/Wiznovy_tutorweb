import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTutorFAQs } from '../services/faqService.js';

export const fetchFAQs = createAsyncThunk(
    'faq/fetchFAQs',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTutorFAQs();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const faqSlice = createSlice({
    name: 'faq',
    initialState: {
        faqs: [],
        total: 0,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFAQs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFAQs.fulfilled, (state, action) => {
                state.loading = false;
                state.faqs = action.payload.result || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchFAQs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = faqSlice.actions;
export default faqSlice.reducer;
