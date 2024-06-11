import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchBrands, fetchCategories, fetchProductsByFilter } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
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
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
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
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;

export default productSlice.reducer;
