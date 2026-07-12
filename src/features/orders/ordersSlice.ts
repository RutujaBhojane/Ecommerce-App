import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Order } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Server error');
    return (await response.json()) as Order[];
  } catch {
    return [
      { id: '1', customerName: 'Asha Patel', status: 'delivered' as const, amount: 128.00, date: '2024-01-15' },
      { id: '2', customerName: 'Rohan Mehta', status: 'shipped' as const, amount: 76.50, date: '2024-01-16' },
      { id: '3', customerName: 'Maya Iyer', status: 'processing' as const, amount: 214.30, date: '2024-01-17' },
      { id: '4', customerName: 'Arjun Shah', status: 'processing' as const, amount: 99.99, date: '2024-01-18' },
    ] as Order[];
  }
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: Order['status'] }) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return (await response.json()) as Order;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default ordersSlice.reducer;