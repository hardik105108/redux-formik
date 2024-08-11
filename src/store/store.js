import { configureStore } from '@reduxjs/toolkit';
import bankReducer from './bankSlice';
import networkReducer from './networkSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
    reducer: {
        bank: bankReducer,
        network: networkReducer,
        category: categoryReducer,
    },
});

export default store;
