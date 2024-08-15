import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../util/api';

export const fetchcategorys = createAsyncThunk('category/fetchcategorys', async () => {
    const categorys = await apiService.getAll('category');
    return categorys;
});

export const fetchCategoryById = createAsyncThunk('category/fetchCategoryById', async (id) => {
    const category = await apiService.getOne('category', id);
    return category;
});

export const addcategory = createAsyncThunk('category/addcategory', async (categoryData) => {
    const newcategory = await apiService.create('category', categoryData);
    return newcategory;
});

export const updatecategory = createAsyncThunk('category/updatecategory', async ({ id, categoryData }) => {
    const updatedcategory = await apiService.update('category', id, categoryData);
    return updatedcategory;
});

export const deletecategory = createAsyncThunk('category/deletecategory', async (id) => {
    await apiService.remove('category', id);
    return id;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categorys: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchcategorys.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchcategorys.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categorys = action.payload;
            })
            .addCase(fetchcategorys.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addcategory.fulfilled, (state, action) => {
                state.categorys.push(action.payload);
            })
            .addCase(updatecategory.fulfilled, (state, action) => {
                const index = state.categorys.findIndex(category => category.id === action.payload.id);
                state.categorys[index] = action.payload;
            })
            .addCase(deletecategory.fulfilled, (state, action) => {
                state.categorys = state.categorys.filter(category => category.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;
