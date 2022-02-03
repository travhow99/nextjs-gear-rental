import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';
import payPalReducer from './paypal/payPalSlice';
import adminReducer from './admin/adminSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    paypal: payPalReducer,
    admin: adminReducer,
  },
});
