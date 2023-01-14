import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    orderRequest: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    orderFail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    orderSucces: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.orders = action.payload;
    },
    // selectOrder:
  },
});

export const { orderRequest, orderFail, orderSucces } = orderSlice.actions;

export default orderSlice.reducer;
