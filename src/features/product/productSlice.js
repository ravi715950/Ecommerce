import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilter } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const data = await fetchAllProducts();
    return data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async (filter) => {
    const data = await fetchProductsByFilter(filter);
    return data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Assign the fetched products to state
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Assign the fetched products to state
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message
      });
  },
});

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
