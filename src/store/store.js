import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import bankReducer from './bankSlice';
import networkReducer from './networkSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
    reducer: {
        loading:loadingReducer,
        bank: bankReducer,
        network: networkReducer,
        category: categoryReducer,
    },
});

export default store;
