import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, Order, Customer } from '../../types';
import { supabase } from '../../app/supabase';

interface DashboardState {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
  recentOrders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  totalRevenue: 0,
  totalOrders: 0,
  totalCustomers: 0,
  lowStockProducts: 0,
  recentOrders: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchAll', async () => {
  const [productsRes, ordersRes, customersRes] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.from('orders').select('*'),
    supabase.from('customers').select('*'),
  ]);
  if (productsRes.error) throw new Error(productsRes.error.message);
  if (ordersRes.error) throw new Error(ordersRes.error.message);
  if (customersRes.error) throw new Error(customersRes.error.message);
  return {
    products: productsRes.data as Product[],
    orders: ordersRes.data as Order[],
    customers: customersRes.data as Customer[],
  };
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        const { products, orders, customers } = action.payload;
        state.loading = false;
        state.totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
        state.totalOrders = orders.length;
        state.totalCustomers = customers.length;
        state.lowStockProducts = products.filter((p) => p.stock < 20).length;
        state.recentOrders = orders.slice(-3);
      })
      .addCase(fetchDashboardData.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to fetch'; });
  },
});

export default dashboardSlice.reducer;