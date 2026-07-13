import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Customer } from '../../types';
import { supabase } from '../../app/supabase';

interface CustomersState {
  items: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = { items: [], loading: false, error: null };

export const fetchCustomers = createAsyncThunk('customers/fetch', async () => {
  const { data, error } = await supabase.from('customers').select('*');
  if (error) throw new Error(error.message);
  return data as Customer[];
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCustomers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCustomers.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to fetch'; });
  },
});

export default customersSlice.reducer;