import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    sales: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    sellerSalesRequest: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    sellerSalesFail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    sellerSalesSuccess: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.sales = action.payload;
    },
    // selectSeller:
  },
});

export const { sellerSalesRequest, sellerSalesFail, sellerSalesSuccess } =
  sellerSlice.actions;

export default sellerSlice.reducer;
