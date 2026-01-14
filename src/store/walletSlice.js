// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchWalletBalance, fetchWalletTransactions } from '../services/walletService.js';

// // Fetch wallet balance
// export const fetchBalance = createAsyncThunk(
//     'wallet/fetchBalance',
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchWalletBalance();
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // Fetch wallet transactions
// export const fetchTransactions = createAsyncThunk(
//     'wallet/fetchTransactions',
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchWalletTransactions();
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const walletSlice = createSlice({
//     name: 'wallet',
//     initialState: {
//         balance: 0,
//         transactions: [],
//         loading: false,
//         error: null
//     },
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch balance
//             .addCase(fetchBalance.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchBalance.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.balance = action.payload.balance || 0;
//             })
//             .addCase(fetchBalance.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             // Fetch transactions
//             .addCase(fetchTransactions.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchTransactions.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.transactions = action.payload.transactions || [];
//             })
//             .addCase(fetchTransactions.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     }
// });

// export const { clearError } = walletSlice.actions;
// export default walletSlice.reducer;