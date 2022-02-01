import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
  },
});
