import { configureStore } from '@reduxjs/toolkit';
import brandReducer from './brand/brandSlice';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';
import payPalReducer from './paypal/payPalSlice';
import adminReducer from './admin/adminSlice';
import sellerReducer from './seller/sellerSlice';

export default configureStore({
  reducer: {
    brand: brandReducer,
    cart: cartReducer,
    orders: ordersReducer,
    paypal: payPalReducer,
    admin: adminReducer,
    seller: sellerReducer,
  },
});
