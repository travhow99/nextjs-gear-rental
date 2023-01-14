import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    requestLoading: false,
    requestError: '',
  },
  reducers: {
    categoryRequest: (state) => {
      state.requestLoading = true;
      state.requestError = '';
    },
    categoryFail: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    categorySuccess: (state, action) => {
      state.requestLoading = false;
      state.requestError = '';
      state.categories = action.payload;
    },
    // selectcategory:
  },
});

export const { categoryRequest, categoryFail, categorySuccess } =
  categorySlice.actions;

export default categorySlice.reducer;
