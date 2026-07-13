import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { supabase } from '../../app/supabase';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);
  return data as Product[];
});

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: Omit<Product, 'id'>) => {
    const { data, error } = await supabase.from('products').insert([product]).select().single();
    if (error) throw new Error(error.message);
    return data as Product;
  }
);

export const editProduct = createAsyncThunk(
  'products/edit',
  async (product: Product) => {
    const { data, error } = await supabase
      .from('products')
      .update({ name: product.name, price: product.price, stock: product.stock, category: product.category })
      .eq('id', product.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setSelectedCategory: (state, action) => { state.selectedCategory = action.payload; },
    setSelectedProduct: (state, action) => { state.selectedProduct = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to fetch'; })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;