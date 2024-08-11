import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../util/api';

export const fetchBanks = createAsyncThunk('bank/fetchBanks', async () => {
    const banks = await apiService.getAll('bank');
    return banks;
});

export const addBank = createAsyncThunk('bank/addBank', async (bankData) => {
    const newBank = await apiService.create('bank', bankData);
    return newBank;
});

export const updateBank = createAsyncThunk('bank/updateBank', async ({ id, bankData }) => {
    const updatedBank = await apiService.update('bank', id, bankData);
    return updatedBank;
});

export const deleteBank = createAsyncThunk('bank/deleteBank', async (id) => {
    await apiService.remove('bank', id);
    return id;
});

const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        banks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBanks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.banks = action.payload;
            })
            .addCase(fetchBanks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addBank.fulfilled, (state, action) => {
                state.banks.push(action.payload);
            })
            .addCase(updateBank.fulfilled, (state, action) => {
                const index = state.banks.findIndex(bank => bank.id === action.payload.id);
                state.banks[index] = action.payload;
            })
            .addCase(deleteBank.fulfilled, (state, action) => {
                state.banks = state.banks.filter(bank => bank.id !== action.payload);
            });
    },
});

export default bankSlice.reducer;
