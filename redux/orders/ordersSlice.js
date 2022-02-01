import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    request: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    fail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    succes: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.orders = action.payload;
    },
    // selectOrder:
  },
});

export const { request, fail, succes } = orderSlice.actions;

export default orderSlice.reducer;
