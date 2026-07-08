import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import customersReducer from '../features/customers/customersSlice';

export const store = configureStore({
    reducer:{
        products: productsReducer,
        orders: ordersReducer,
        customers: customersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;