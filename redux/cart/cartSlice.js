import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CartHelper from '../../utils/helpers/CartHelper';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: Cookies.get('cartItems')
			? JSON.parse(Cookies.get('cartItems'))
			: [],
	},
	reducers: {
		/**
		 * @todo add uuid for unique?
		 */
		addItem: (state, action) => {
			console.log('recd additem action', action);
			const newProduct = action.payload;

			const cartCopy = [...state.cartItems];

			console.log('pre methodo', cartCopy);
			const { cartItems, status } = CartHelper.addProductToCart(
				cartCopy,
				newProduct
			);

			console.log('got add2cart response:', cartItems, status);

			debugger;

			console.log('updating cart', newProduct, cartItems);

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
