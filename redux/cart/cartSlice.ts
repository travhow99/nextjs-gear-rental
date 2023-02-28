import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type State = String | null;

export const cartSlice = createSlice({
	name: 'cart',
	initialState: Cookies.get('cartId') || null,
	reducers: {
		createCart: (state: State, action: PayloadAction<String>) => {
			state = action.payload;

			console.log('set state!', action.payload);

			Cookies.set('cartId', action.payload);
		},
		deleteCart: (state) => {
			state.cartId = null;

			Cookies.remove('cartId');
		},
	},
});

export const { createCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
