import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    sales: [],
    requestLoading: false,
    requestError: '',
    uploadRequestLoading: false,
    uploadRequestError: '',
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
    sellerUploadRequest: (state) => {
      state.uploadRequestLoading = true;
      state.uploadRequestError = '';
    },
    sellerUploadFail: (state, action) => {
      state.uploadRequestLoading = false;
      state.uploadRequestError = action.payload;
    },
    sellerUploadSuccess: (state, action) => {
      state.uploadRequestLoading = false;
      state.uploadRequestError = '';
    },

    // selectSeller:
  },
});

export const { sellerSalesRequest, sellerSalesFail, sellerSalesSuccess } =
  sellerSlice.actions;

export default sellerSlice.reducer;
