import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Customer } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

interface CustomersState {
  items: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk('customers/fetch', async () => {
  try {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) throw new Error('Server error');
    return (await response.json()) as Customer[];
  } catch {
    return [
      { id: '1', name: 'Asha Patel', email: 'asha@email.com', totalOrders: 5 },
      { id: '2', name: 'Rohan Mehta', email: 'rohan@email.com', totalOrders: 3 },
      { id: '3', name: 'Maya Iyer', email: 'maya@email.com', totalOrders: 8 },
      { id: '4', name: 'Arjun Shah', email: 'arjun@email.com', totalOrders: 1 },
    ] as Customer[];
  }
});

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch customers";
      });
  },
});

export default customersSlice.reducer;
