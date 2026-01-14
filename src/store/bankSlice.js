import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchBankDetails, createBankAccount, uploadPassbookDocument, uploadIdDocument, deleteBankAccount, updateBankAccount} from '../services/bankService.js';


// Fetch bank details
export const fetchBankDetail = createAsyncThunk(
    'bank/fetchBankDetails',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchBankDetails();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create bank account
export const createBankAccounts = createAsyncThunk(
    'bank/createBankAccount',
    async (bankData, { rejectWithValue }) => {
        try {
            return await createBankAccount(bankData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Upload passbook document
export const uploadPassbookDocuments = createAsyncThunk(
    'bank/uploadPassbookDocument',
    async ({ accountId, file }, { rejectWithValue }) => {
        try {
            return await uploadPassbookDocument(accountId, file);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Upload ID document
export const uploadIdDocuments = createAsyncThunk(
    'bank/uploadIdDocument',
    async ({ accountId, file }, { rejectWithValue }) => {
        try {
            return await uploadIdDocument(accountId, file);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete bank account
export const deleteBankDetails = createAsyncThunk(
    'bank/deleteBankAccount',
    async (bankDetailId, { rejectWithValue }) => {
        try {
            return await deleteBankAccount(bankDetailId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update bank account
export const updateBankDetails = createAsyncThunk(
    'bank/updateBankAccount',
    async ({ bankDetailId, bankData }, { rejectWithValue }) => {
        try {
            return await updateBankAccount(bankDetailId, bankData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        bankAccounts: [],
        currentAccountId: null,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentAccountId: (state, action) => {
            state.currentAccountId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch bank details
            .addCase(fetchBankDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBankDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.bankAccounts = action.payload;
            })
            .addCase(fetchBankDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Create bank account
            .addCase(createBankAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBankAccounts.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Full API response:', action.payload);
                
                // Extract ID from the bankDetail object
                const accountId = action.payload?.bankDetail?.id;
                
                if (accountId) {
                    state.currentAccountId = accountId;
                    console.log('Bank account created with ID:', accountId);
                } else {
                    console.error('No account ID found in response:', action.payload);
                    state.error = 'Account created but ID not found in response';
                }
            })
            .addCase(createBankAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            // Upload passbook document
            .addCase(uploadPassbookDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPassbookDocuments.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(uploadPassbookDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            // Upload ID document
            .addCase(uploadIdDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadIdDocuments.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(uploadIdDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            // Delete bank account
            .addCase(deleteBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBankDetails.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            // Update bank account
            .addCase(updateBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBankDetails.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            });
    }
});

export const { clearError, setCurrentAccountId } = bankSlice.actions;
export default bankSlice.reducer;