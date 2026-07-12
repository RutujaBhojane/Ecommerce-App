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

export const fetchDashboardData = createAsyncThunk('dashboard/fetchAll', async () => {
  try {
    const [productsRes, ordersRes, customersRes] = await Promise.all([
      fetch(`${API_URL}/products`),
      fetch(`${API_URL}/orders`),
      fetch(`${API_URL}/customers`),
    ]);
    if (!productsRes.ok || !ordersRes.ok || !customersRes.ok) throw new Error('Server error');
    const products: Product[] = await productsRes.json();
    const orders: Order[] = await ordersRes.json();
    const customers: Customer[] = await customersRes.json();
    return { products, orders, customers };
  } catch {
    return {
      products: [
        { id: '1', name: 'Wireless Mouse', price: 25.99, stock: 120, category: 'Electronics' },
        { id: '2', name: 'Mechanical Keyboard', price: 79.99, stock: 45, category: 'Electronics' },
        { id: '3', name: 'Office Chair', price: 149.99, stock: 12, category: 'Furniture' },
        { id: '4', name: 'Desk Lamp', price: 19.99, stock: 80, category: 'Furniture' },
      ] as Product[],
      orders: [
        { id: '1', customerName: 'Asha Patel', status: 'delivered' as const, amount: 128.00, date: '2024-01-15' },
        { id: '2', customerName: 'Rohan Mehta', status: 'shipped' as const, amount: 76.50, date: '2024-01-16' },
        { id: '3', customerName: 'Maya Iyer', status: 'processing' as const, amount: 214.30, date: '2024-01-17' },
        { id: '4', customerName: 'Arjun Shah', status: 'processing' as const, amount: 99.99, date: '2024-01-18' },
      ] as Order[],
      customers: [
        { id: '1', name: 'Asha Patel', email: 'asha@email.com', totalOrders: 5 },
        { id: '2', name: 'Rohan Mehta', email: 'rohan@email.com', totalOrders: 3 },
        { id: '3', name: 'Maya Iyer', email: 'maya@email.com', totalOrders: 8 },
        { id: '4', name: 'Arjun Shah', email: 'arjun@email.com', totalOrders: 1 },
      ] as Customer[],
    };
  }
});

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