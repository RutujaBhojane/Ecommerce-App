import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Order } from '../../types';
import { supabase } from '../../app/supabase';

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = { items: [], loading: false, error: null };

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) throw new Error(error.message);
  return data as Order[];
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: Order['status'] }) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Order;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to fetch'; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default ordersSlice.reducer;