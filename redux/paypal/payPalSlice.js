import { createSlice } from '@reduxjs/toolkit';

export const payPalSlice = createSlice({
  name: 'order',
  initialState: {
    paySuccess: false,
    payLoading: false,
    payError: '',
  },
  reducers: {
    payRequest: (state) => {
      state.payLoading = true;
      state.payError = '';
    },
    payFail: (state, action) => {
      state.payLoading = false;
      state.payError = action.payload;
    },
    paySucces: (state, action) => {
      state.payLoading = false;
      state.payError = '';
      state.paySuccess = true;
    },
    payReset: (state) => {
      state = { ...initialState };
    },
  },
});

export const { payRequest, payFail, paySucces, payReset } = payPalSlice.actions;

export default payPalSlice.reducer;
