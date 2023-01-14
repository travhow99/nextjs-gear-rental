import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    sales: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    adminSalesRequest: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    adminSalesFail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    adminSalesSuccess: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.sales = action.payload;
    },
    // selectAdmin:
  },
});

export const { adminSalesRequest, adminSalesFail, adminSalesSuccess } =
  adminSlice.actions;

export default adminSlice.reducer;
