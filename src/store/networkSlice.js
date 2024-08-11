import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../util/api';

export const fetchnetworks = createAsyncThunk('network/fetchnetworks', async () => {
    const networks = await apiService.getAll('network');
    return networks;
});

export const addnetwork = createAsyncThunk('network/addnetwork', async (networkData) => {
    const newnetwork = await apiService.create('network', networkData);
    return newnetwork;
});

export const updatenetwork = createAsyncThunk('network/updatenetwork', async ({ id, networkData }) => {
    const updatednetwork = await apiService.update('network', id, networkData);
    return updatednetwork;
});

export const deletenetwork = createAsyncThunk('network/deletenetwork', async (id) => {
    await apiService.remove('network', id);
    return id;
});

const networkSlice = createSlice({
    name: 'network',
    initialState: {
        networks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchnetworks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchnetworks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.networks = action.payload;
            })
            .addCase(fetchnetworks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addnetwork.fulfilled, (state, action) => {
                state.networks.push(action.payload);
            })
            .addCase(updatenetwork.fulfilled, (state, action) => {
                const index = state.networks.findIndex(network => network.id === action.payload.id);
                state.networks[index] = action.payload;
            })
            .addCase(deletenetwork.fulfilled, (state, action) => {
                state.networks = state.networks.filter(network => network.id !== action.payload);
            });
    },
});

export default networkSlice.reducer;
