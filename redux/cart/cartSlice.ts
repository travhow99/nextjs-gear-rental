import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type State = {
	cartId: string | null;
	paymentMethod: string | null;
};

const initialState = {
	cartId: Cookies.get('cartId') || null,
	paymentMethod: Cookies.get('paymentMethod') || null,
} as State;

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		createCart: (state: State, action: PayloadAction<string>) => {
			state.cartId = action.payload;

			console.log('set state!', action.payload);

			Cookies.set('cartId', action.payload);
		},
		deleteCart: (state) => {
			state.cartId = null;

			Cookies.remove('cartId');
		},
		setPaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;

			Cookies.set('paymentMethod', action.payload);
		},
	},
});

export const { createCart, deleteCart, setPaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
