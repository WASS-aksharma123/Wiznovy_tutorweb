import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWalletBalance, fetchWalletTransactions, fetchTutorPayouts, createPayoutRequest } from '../services/walletService.js';

// Fetch wallet balance
export const fetchBalance = createAsyncThunk(
    'wallet/fetchBalance',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchWalletBalance();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch wallet transactions
export const fetchTransactions = createAsyncThunk(
    'wallet/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchWalletTransactions();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch tutor payouts
export const fetchPayouts = createAsyncThunk(
    'wallet/fetchPayouts',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTutorPayouts();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create payout request
export const createPayout = createAsyncThunk(
    'wallet/createPayout',
    async (payoutData, { rejectWithValue }) => {
        try {
            return await createPayoutRequest(payoutData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        balance: 0,
        transactions: [],
        payouts: [],
        payout: null,
        loading: false,
        payoutLoading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearPayout: (state) => {
            state.payout = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch balance
            .addCase(fetchBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.balance || 0;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.transactions || [];
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch payouts
            .addCase(fetchPayouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayouts.fulfilled, (state, action) => {
                state.loading = false;
                state.payouts = action.payload || [];
            })
            .addCase(fetchPayouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create payout
            .addCase(createPayout.pending, (state) => {
                state.payoutLoading = true;
                state.error = null;
            })
            .addCase(createPayout.fulfilled, (state, action) => {
                state.payoutLoading = false;
                state.payout = action.payload.payout;
            })
            .addCase(createPayout.rejected, (state, action) => {
                state.payoutLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, clearPayout } = walletSlice.actions;
export default walletSlice.reducer;