import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';
import payPalReducer from './paypal/payPalSlice';
import adminReducer from './admin/adminSlice';
import sellerReducer from './seller/sellerSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    paypal: payPalReducer,
    admin: adminReducer,
    seller: sellerReducer,
  },
});
