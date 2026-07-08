import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import customersReducer from '../features/customers/customersSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer:{
        products: productsReducer,
        orders: ordersReducer,
        customers: customersReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;