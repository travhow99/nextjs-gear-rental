import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';
import payPalReducer from './paypal/payPalSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    paypal: payPalReducer,
  },
});
