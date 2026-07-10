import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("http://localhost:5000/products");
  return (await response.json()) as Product[];
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Omit<Product, "id">) => {
    const response = await fetch("http://localhost:5000/products", {
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
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    return id;
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
      });
  },
});

export const { setSearchQuery, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
