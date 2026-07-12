import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

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
  searchQuery: "",
  selectedCategory: "",
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Server error');
    return (await response.json()) as Product[];
  } catch {
    // fallback static data
    return [
      { id: '1', name: 'Wireless Mouse', price: 25.99, stock: 120, category: 'Electronics' },
      { id: '2', name: 'Mechanical Keyboard', price: 79.99, stock: 45, category: 'Electronics' },
      { id: '3', name: 'Office Chair', price: 149.99, stock: 12, category: 'Furniture' },
      { id: '4', name: 'Desk Lamp', price: 19.99, stock: 80, category: 'Furniture' },
    ] as Product[];
  }
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Omit<Product, "id">) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return (await response.json()) as Product;
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    return id;
  },
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async (product: Product) => {
    const response = await fetch(
      `${API_URL}/products/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      },
    );
    return (await response.json()) as Product;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
