import { createSlice } from '@reduxjs/toolkit';

export const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    brandRequest: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    brandFail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    brandSuccess: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.brands = action.payload;
    },
    // selectBrand:
  },
});

export const { brandRequest, brandFail, brandSuccess } = brandSlice.actions;

export default brandSlice.reducer;
