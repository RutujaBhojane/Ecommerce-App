import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, Order, Customer } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

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

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchAll',
  async () => {
    const [productsRes, ordersRes, customersRes] = await Promise.all([
      fetch(`${API_URL}/products`),
      fetch(`${API_URL}/orders`),
      fetch(`${API_URL}/customers`),
    ]);
    const products: Product[] = await productsRes.json();
    const orders: Order[] = await ordersRes.json();
    const customers: Customer[] = await customersRes.json();
    return { products, orders, customers };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        const { products, orders, customers } = action.payload;
        state.loading = false;
        state.totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
        state.totalOrders = orders.length;
        state.totalCustomers = customers.length;
        state.lowStockProducts = products.filter((p) => p.stock < 20).length;
        state.recentOrders = orders.slice(-3);
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch dashboard data';
      });
  },
});

export default dashboardSlice.reducer;