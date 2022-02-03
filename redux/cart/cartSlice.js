import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      console.log('recd additem action', action);
      const newItem = action.payload;

      const itemAlreadyExists = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = itemAlreadyExists
        ? state.cartItems.map((item) =>
            item.title === itemAlreadyExists.title ? newItem : item
          )
        : [...state.cartItems, newItem];

      console.log('updating cart', newItem, cartItems);

      state.cartItems = cartItems;

      Cookies.set('cartItems', JSON.stringify(cartItems));
    },
    removeItem: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      console.log('rmv', action, cartItems);

      state.cartItems = cartItems;

      Cookies.set('cartItems', JSON.stringify(cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];

      Cookies.remove('cartItems');
    },
    // selectCart:
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
