import { createSlice, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CartHelper from '../../utils/helpers/CartHelper';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: Cookies.get('cartItems')
			? JSON.parse(Cookies.get('cartItems'))
			: [],
		paymentMethod: Cookies.get('paymentMethod') || '',
	},
	reducers: {
		/**
		 * @todo add uuid for unique?
		 */
		addItem: (state, action) => {
			console.log(
				'recd additem action',
				action,
				'current:',
				current(state)
			);
			const newProduct = action.payload;

			const cartCopy = [...state.cartItems];

			console.log('pre methodo', cartCopy);
			const { cartItems, status } = CartHelper.addProductToCart(
				cartCopy,
				newProduct
			);

			console.log('got add2cart response:', cartItems, status);

			console.log('updating cart', newProduct, cartItems);

			state.cartItems = cartItems;

			if (
				!Cookies.get('cartItems') ||
				JSON.stringify(cartItems) !==
					JSON.parse(Cookies.get('cartItems'))
			) {
				Cookies.set('cartItems', JSON.stringify(cartItems));
			}
		},
		removeItem: (state, action) => {
			const cartItems = state.cartItems.filter(
				(item) => item.uuid !== action.payload.uuid
			);

			console.log('rmv', action, cartItems);

			state.cartItems = cartItems;

			if (
				JSON.stringify(cartItems) !==
				JSON.parse(Cookies.get('cartItems'))
			) {
				Cookies.set('cartItems', JSON.stringify(cartItems));
			}
		},
		clearCart: (state) => {
			state.cartItems = [];

			Cookies.remove('cartItems');
		},
		// selectCart:
		setPaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;

			console.log('set state!', action.payload);

			Cookies.set('paymentMethod', action.payload);
		},
	},
});

export const { addItem, removeItem, clearCart, setPaymentMethod } =
	cartSlice.actions;

export default cartSlice.reducer;
